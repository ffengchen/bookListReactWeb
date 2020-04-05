import React from 'react';
import ReactDOM from 'react-dom';
import BookFinder from './containers/bookFinder'
import ToReadListViewer from './containers/toReadList'
import HaveReadListViewer from './containers/haveReadList'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/bookReducers";
import thunkMiddleware from 'redux-thunk';
import {
  BrowserRouter, Switch,
  Route, Redirect
} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/book/search" component={BookFinder}/>
          <Route exact path="/book/toRead" component={ToReadListViewer}/>
          <Route exact path="/book/haveRead" component={HaveReadListViewer}/>
          <Redirect exact from="/" to="book/search" />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);