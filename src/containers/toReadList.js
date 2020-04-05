import React from "react";
import {connect} from 'react-redux';
import {
  deleteToRead,
  fetchToReadList,
  moveFromToReadToHaveRead
} from "../actions/toReadActions";
import {Link} from "react-router-dom";
import {postHaveRead} from "../actions/haveReadActions";


class ToReadListViewer extends React.Component {

    componentDidMount() {
      this.props.onMount();
    }

    render() {
        return (<div>
          <div align={"center"}><button><Link exact to={"/book/search"}> Go to Search </Link></button>&nbsp;&nbsp;<button><Link exact to={"/book/haveRead"}> Go to Have-Read List </Link></button></div>
            <h1 align={"center"}>To-Read List</h1>
            <div>{this._renderToReadList()}</div>
        </div>);
    }

    _renderToReadList() {
        if (!this.props.bookList || this.props.bookList.length === 0) {
            return (<div align={"center"}><p>No result!</p></div>);
        }

        const bookRows = this.props.bookList.map(bookItem => (
            <tr key={bookItem.bookId}>
                <td align={"center"}>{bookItem.title}</td>
                <td align={"center"}>{bookItem.authors || "N/A"}</td>
                <td align={"center"}>
                  <button onClick={()=>this.props.handleMovetoHaveReadClick(bookItem, this.props.haveReadList)}>I've read it</button>
                  <button onClick={()=>this.props.handleDeleteToRead(bookItem.bookId)}>Remove</button>
                </td>
            </tr>));
        return (<table border={"2"} align={"center"}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Operation</th>
            </tr>
            </thead>
            <tbody>
            {bookRows}
            </tbody>
        </table>)

    }

  

}
function mapDispatchToProps(dispatch, props) {
    return {
      onMount: () => dispatch(fetchToReadList()),
      handleMovetoHaveReadClick: (bookItem, haveReadList) => {
        let flag = false;
        for(var i = 0; i<haveReadList.length; i++) {
          if (haveReadList[i].bookId === bookItem.bookId)
            flag = true;
        }
        if(!flag)
          dispatch(moveFromToReadToHaveRead(bookItem))
        else
          dispatch(deleteToRead(bookItem.bookId))
      },
      handleDeleteToRead: (bookId) => dispatch(deleteToRead(bookId))
    }
  };

function mapStateToProps(state, props) {
  return {
    bookList: state.toReadList,
    haveReadList: state.haveReadList
  }
};



export default ToReadListViewer = connect(
    mapStateToProps,
    mapDispatchToProps

)(ToReadListViewer);