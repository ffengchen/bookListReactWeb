import Axios from "axios";

function requestNewHaveRead() {
  return {
    type: "REQUEST_NEW_HaveRead"
  }
}

function receiveNewHaveReadSuccess(newBook) {
  return {
    type: "RESPONSE_NEW_HaveRead_SUCCESS",
    newBook
  }
}

function receiveNewHaveReadError() {
  return {
    type: "RESPONSE_NEW_HaveRead_ERROR"
  }
}

export function postHaveRead(bookInfo) {
  return function(dispatch) {
    dispatch(requestNewHaveRead());
    return Axios.post("/api/book/haveRead", bookInfo)
    .then(
        response => dispatch(receiveNewHaveReadSuccess(response.data.newBook)),
        receiveNewHaveReadError
    );
  }
}

function requestHaveReadList() {
  console.log("request list!")
  return {
    type: "REQUEST_HaveRead_LIST"
  }
}

function receiveHaveReadList(bookList) {
  console.log("receive list!");
  return {
    type: "RECEIVE_HaveRead_LIST",
    bookList
  }
}

export function deleteHaveRead(bookId) {
  console.log("delete!"+bookId)
  return function(dispatch) {
    return Axios.delete("/api/book/haveRead/"+bookId)
    .then(
        dispatch(fetchHaveReadList()),
    );
  }
}

export function fetchHaveReadList() {
  console.log("fetch!")
  return function(dispatch) {

    dispatch(requestHaveReadList());

    return Axios.get(`/api/book/haveRead`)
    .then(response => dispatch(receiveHaveReadList(response.data)),

        error => console.log('An error occurred.', error)
    );
  }
}