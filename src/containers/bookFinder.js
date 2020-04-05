import React from "react";
import {connect} from 'react-redux';
import {searchBook} from "../actions/searchBookAction";
import BookListViewer from "./bookList";
import {Link} from "react-router-dom";

class BookFinder extends React.Component {

  render() {
    let bookTitle = "";

    return (
        <div>
          <div>
            {/*<ToReadListViewer />*/}
            {/*<HaveReadListViewer />*/}
            <div align={"center"}><button><Link exact to={"/book/toRead"}> Go to my To-Read List </Link></button>&nbsp;&nbsp;<button><Link exact to={"/book/haveRead"}> Go to my Have-Read List </Link></button></div>
            <br/>
            <h1 align={"center"}> Welcome to my library! </h1>
            <div align={"center"}>
              <label>Book Title </label>
              <input onChange={(e) => bookTitle = e.target.value} name="name" component="input" type="text"
                     placeholder="Book title here..."/>&nbsp;
              <button color="primary" type="submit" onClick={() => this.props.handleClick(bookTitle)}>Search</button>
            </div>
          </div>
          <hr/>
          <BookListViewer />
        </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleClick: (query) => dispatch(searchBook(query))
  }
};

function mapStateToProps(state, props) {
  return {
    requestStatus: state.searchResult.requestStatus,
    inFlight: state.searchResult.inFlight,
  }
};

export default BookFinder = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookFinder);