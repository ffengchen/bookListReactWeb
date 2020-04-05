import { combineReducers } from 'redux'
import searchBook from "./searchBookReducer";
import toRead from "./toReadReducer";
import haveRead from "./haveReadReducer";

const rootReducer = combineReducers({
  searchResult: searchBook,
  haveReadList: haveRead,
  toReadList: toRead,
});

export default rootReducer