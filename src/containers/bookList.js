import React from "react";
import {connect} from 'react-redux';
import {postToRead} from "../actions/toReadActions";
import {postHaveRead} from "../actions/haveReadActions";

class BookListViewer extends React.Component {

    render() {

        return (<div>
            <h3 align={"center"}>TOP 10 Results:</h3>
            <div>{this._renderFoodList()}</div>
        </div>);
    }

    _renderFoodList() {
        if (!this.props.bookList || this.props.bookList.length === 0) {
            return (<div align={"center"}><p>No result!</p></div>);
        }

        const bookRows = this.props.bookList.map(bookItem => (
            <tr key={bookItem.id}>
                <td align={"center"}>{bookItem.volumeInfo.title}</td>
                <td align={"center"}>{bookItem.volumeInfo.authors || "N/A"}</td>
                <td align={"center"}><button onClick={()=>this.props.handleToReadClick({bookId:bookItem.id, title: bookItem.volumeInfo.title, authors: bookItem.volumeInfo.authors || "N/A"}, this.props.toReadList)}>Add to toRead list!</button>
                    <button onClick={()=>this.props.handleHaveReadClick({bookId:bookItem.id, title: bookItem.volumeInfo.title, authors: bookItem.volumeInfo.authors || "N/A"}, this.props.haveReadList)}>Add to haveRead list!</button>
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
        // onMount: () => {
        //     dispatch(fetchToReadList());
        //     dispatch(fetchHaveReadList());
        // },
        handleToReadClick: (bookInfo, toReadList) => {
            let flag = false;
            for(var i = 0; i<toReadList.length; i++) {
                if (toReadList[i].bookId === bookInfo.bookId)
                    flag = true;
            }
            if(!flag)
                dispatch(postToRead(bookInfo))
        },
        handleHaveReadClick: (bookInfo, haveReadList) => {
            let flag = false;
            for(var i = 0; i<haveReadList.length; i++) {
                if (haveReadList[i].bookId === bookInfo.bookId)
                    flag = true;
            }
            if(!flag)
                dispatch(postHaveRead(bookInfo))
        },
    }
};


function mapStateToProps(state, props) {
    return {
        bookList: state.searchResult.searchBookList,
        haveReadList: state.haveReadList,
        toReadList: state.toReadList,
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookListViewer)