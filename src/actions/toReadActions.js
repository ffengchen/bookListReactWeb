import Axios from "axios"
import {postHaveRead} from "./haveReadActions";

function requestNewToRead() {
  console.log("request new!")
  return {
    type: "REQUEST_NEW_ToRead"
  }
}

function receiveNewToReadSuccess(newBook) {
  console.log("receive new!")
  return {
    type: "RESPONSE_NEW_ToRead_SUCCESS",
    newBook
  }
}

function receiveNewToReadError() {
  return {
    type: "RESPONSE_NEW_ToRead_ERROR"
  }
}

function requestToReadList() {
  console.log("request list!")
  return {
    type: "REQUEST_ToRead_LIST"
  }
}

function receiveToReadList(bookList) {
  console.log("receive list!");
  return {
    type: "RECEIVE_ToRead_LIST",
    bookList
  }
}

function deleteToReadSuccess() {
  return {
    type: "DELETE_ToRead_SUCCESS"
  }
}

export function postToRead(bookInfo) {
  console.log("post!")
  return function(dispatch) {
    dispatch(requestNewToRead());
    return Axios.post("/api/book/toRead", bookInfo)
    .then(
        response => dispatch(receiveNewToReadSuccess(response.data.newBook)),
        receiveNewToReadError
    );
  }
}

export function deleteToRead(bookId) {
  console.log("delete!"+bookId)
  return function(dispatch) {
    return Axios.delete("/api/book/toRead/"+bookId)
    .then(
        dispatch(fetchToReadList()),
    );
  }
}

export function moveFromToReadToHaveRead(bookItem) {

  return function (dispatch) {
    dispatch(postHaveRead(bookItem));
    dispatch(deleteToRead(bookItem.bookId));
  }
}

export function fetchToReadList() {
  console.log("fetch!")
  return function(dispatch) {

    dispatch(requestToReadList());

    return Axios.get(`/api/book/toRead`)
    .then(response => dispatch(receiveToReadList(response.data)),

        error => console.log('An error occurred.', error)
    );
  }
}