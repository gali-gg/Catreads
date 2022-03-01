import { applyMiddleware, compose, createStore } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { shelfReducer } from './reducers/shelfReducer';
import { userReducer } from './reducers/userReducer';
import {openBookReducer} from "./reducers/openBookReducer";
import { reviewsReducer } from './reducers/reviewsReducer';
import { allGenresReducer } from './reducers/allGenresReducer';
import { allAuthorsReducer } from './reducers/allAuthorsReducer';
import { allBooksReducer } from './reducers/allBooksReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { activitiesReducer } from './reducers/activitiesReducer';

const rootReducer = combineReducers({
    userData : userReducer,
    shelves : shelfReducer,
    openBook : openBookReducer,
    reviews: reviewsReducer,
    genres: allGenresReducer,
    authors: allAuthorsReducer,
    books: allBooksReducer,
    activities: activitiesReducer
});

const persistConfig = {
    key: "redux-store",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const persistor = persistStore(store);
export default store;
export {persistor};