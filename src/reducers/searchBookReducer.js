export function searchBook(
    state = {
      requestStatus: "NONE",
      inFlight: false,
      searchBookList: [],
    },
    action
) {
  switch (action.type) {
    case "REQUEST_SEARCH_BOOK":
      return Object.assign({}, state, {
        requestStatus: "SENDING",
        inFlight: true,
      });
    case "RESPONSE_SEARCH_BOOK_ERROR":
      return Object.assign({}, state, {
        requestStatus: "ERROR",
        inFlight: false,
      });
    case "RESPONSE_SEARCH_BOOK_SUCCESS":
      return Object.assign({}, state, {
        requestStatus: "SUCCESS",
        inFlight: false,
        searchBookList: action.payload,
      });
    default:
      return state
  }
}


export default searchBook;