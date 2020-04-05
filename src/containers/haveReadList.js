import React from "react";
import {connect} from 'react-redux';
import {deleteHaveRead, fetchHaveReadList} from "../actions/haveReadActions";
import {Link} from "react-router-dom";

class HaveReadListViewer extends React.Component {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (<div>
            <div align={"center"}><button><Link exact to={"/book/search"}> Go to Search </Link></button>&nbsp;&nbsp;<button><Link exact to={"/book/toRead"}> Go to my To-Read List </Link></button></div>
            <h1 align={"center"}>Have-Read List</h1>
            <div>{this._renderHaveReadList()}</div>
        </div>);
    }

    _renderHaveReadList() {
        if (!this.props.bookList || this.props.bookList.length === 0) {
            return (<div align={"center"}><p>No result!</p></div>);
        }

        const bookRows = this.props.bookList.map(bookItem => (
            <tr key={bookItem.bookId}>
                <td align={"center"}>{bookItem.title}</td>
                <td align={"center"}>{bookItem.authors || "N/A"}</td>
                <td align={"center"}><button onClick={()=>this.props.handleDeleteHaveRead(bookItem.bookId)}>Remove</button></td>

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
        onMount: () => dispatch(fetchHaveReadList()),

        handleDeleteHaveRead: (bookId) => dispatch(deleteHaveRead(bookId))
    }
};

function mapStateToProps(state, props) {
    return {
        bookList: state.haveReadList,
    }
};



export default HaveReadListViewer = connect(
    mapStateToProps,
    mapDispatchToProps

)(HaveReadListViewer);
