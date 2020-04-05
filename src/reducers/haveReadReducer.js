export function haveRead(
    state = [],
    action
) {
  switch (action.type) {
    case "RESPONSE_NEW_HaveRead_SUCCESS":
      return [...state, action.newBook];
    case "RECEIVE_HaveRead_LIST":
      return action.bookList;
    default:
      return state
  }
}


export default haveRead;