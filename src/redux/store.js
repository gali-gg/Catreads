import { applyMiddleware, compose, createStore } from 'redux';
import { combineReducers } from 'redux';
import { postReducer } from './reducers/postReducer';
import thunk from 'redux-thunk'
import { shelfReducer } from './reducers/shelfReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    userData : userReducer,
    shelves : shelfReducer,
    posts : postReducer,
});

const store = createStore(
    rootReducer, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;