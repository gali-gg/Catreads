import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { shelfReducer } from './reducers/shelfReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    userData : userReducer,
    shelves : shelfReducer,
});

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;