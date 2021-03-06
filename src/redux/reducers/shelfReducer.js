import { ADD_BOOK_TO_SHELF, ADD_SHELF, DELETE_SHELF, REMOVE_BOOK_FROM_SHELF, LOAD_SHELVES, CLEAR_SHELVES } from '../actions/shelfAction';
import _ from "lodash";

const INITIAL_STATE = {
    wantToRead:{
        name: "Want to Read",
        books: []
    },
    currentlyReading:{
        name: "Currently Reading",
        books: [],
    },
    read:{
        name: "Read",
        books: [],
    },
    userShelves: []
};

export const shelfReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_SHELVES:
            if(action.payload){
                return {
                    ...state,
                    ...action.payload
                }
            }
            return {
                ...state
            }
        case ADD_SHELF:
            return {
                ...state,
                userShelves : _.uniqBy([...state.userShelves,
                    {
                    name: action.payload.name,
                    books: [],
                    }
                ], "name")
            };

        case ADD_BOOK_TO_SHELF:
            let shelf;
            if(action.payload.isUserShelf){
                shelf = state.userShelves.filter(shelf => shelf.name === action.payload.name)[0];
            }else{
                let key = _.findKey(state, (obj) => obj.name === action.payload.name);
                shelf = state[key];
            }

            shelf.books = shelf.books.some( bookUuid => bookUuid === action.payload.uuid)
                ?
                   shelf.books
                :
                    [...shelf.books, action.payload.uuid]
            return{
                ...state,
            };

        case REMOVE_BOOK_FROM_SHELF:
            let bookShelf;
            if(action.payload.isUserShelf){
                bookShelf = state.userShelves.filter(shelf => shelf.name === action.payload.name)[0];
            }else{
                let key = _.findKey(state, (obj) => obj.name === action.payload.name);
                bookShelf = state[key];
            }

            bookShelf.books = bookShelf.books.filter( bookUuid => bookUuid !== action.payload.uuid)
            return{
                ...state,
            };

        case DELETE_SHELF:
            let deletedShelfName = state.userShelves.filter(shelf => shelf.name === action.payload.name)[0];
            let indexOfDeletedShelf = state.userShelves.indexOf(deletedShelfName);

            state.userShelves.splice(indexOfDeletedShelf);
            return {
                ...state
            };

        case CLEAR_SHELVES:
            return {
                ...state,
                ...INITIAL_STATE
            };
        default: return state;
    }
};