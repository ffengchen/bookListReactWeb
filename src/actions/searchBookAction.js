import Axios from 'axios'

function requestSearchBook() {
  return {
    type: "REQUEST_SEARCH_BOOK"
  }
}

function receiveSearchBookSuccess(bookList) {
  // console.log("SUCCESS DISPATCHED");
  return {
    type: "RESPONSE_SEARCH_BOOK_SUCCESS",
    payload: bookList
  }
}

function receiveSearchBookError() {
  return {
    type: "RESPONSE_SEARCH_BOOK_ERROR"
  }
}

export function searchBook(query) {
  return function(dispatch) {
    dispatch(requestSearchBook());
    return Axios.get("https://www.googleapis.com/books/v1/volumes?q="+query)
    .then(
        response => dispatch(receiveSearchBookSuccess(response.data.items)),
        receiveSearchBookError
    );
  }
}