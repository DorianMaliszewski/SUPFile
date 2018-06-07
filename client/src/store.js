import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

let middleware;

let initialState = {
    storages: [],
    files: []
};

if (process && process.env && (process.env.NODE_ENV === 'production')) {
    middleware = applyMiddleware(thunk, promise, routerMiddleware(history));
} else {
    middleware = applyMiddleware(thunk, promise, logger, routerMiddleware(history));
}

export const store = createStore(rootReducer, initialState, middleware);