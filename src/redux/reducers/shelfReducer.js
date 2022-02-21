import { ADD_BOOK_TO_SHELF, ADD_SHELF, DELETE_SHELF, REMOVE_BOOK_FROM_SHELF } from '../actions/shelfAction';
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
        case ADD_SHELF:
            return {
                ...state,
                userShelves : [...state.userShelves,
                    {
                    name: action.payload.name,
                    books: [],
                    }
                ]
            };

        case ADD_BOOK_TO_SHELF:
            let shelf;
            if(action.payload.isUserShelf){
                shelf = state.userShelves.filter(shelf => shelf.name === action.payload.name)[0];
            }else{
                let key = _.findKey(state, (obj) => obj.name === action.payload.name);
                shelf = state[key];
            }

            shelf.books = shelf.books.some( book => book.uuid === action.payload.uuid)
                ?
                   shelf.books
                :
                    [...shelf.books, action.payload.book]
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

            bookShelf.books = bookShelf.books.filter( book => book.uuid !== action.payload.uuid)
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
        default: return state;
    }
};