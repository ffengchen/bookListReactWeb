export function toRead(
    state = [],
    action
) {
  switch (action.type) {
    case "RESPONSE_NEW_ToRead_SUCCESS":
      return [...state, action.newBook];
    case "RECEIVE_ToRead_LIST":
      return action.bookList;
    default:
      return state
  }
}


export default toRead;