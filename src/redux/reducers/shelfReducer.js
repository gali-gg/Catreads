import { v4 as uuidv4 } from 'uuid';
import { ADD_BOOK_TO_SHELF, ADD_SHELF, DELETE_SHELF, EDIT_SHELF } from "../actions/shelfAction";

const INITIAL_STATE = {
    wantToRead: {
        id: 1, 
        books: []
    },
    currentlyReading: {
        id: 2, 
        books: []
    },
    read: {
        id: 3, 
        books: []
    },
};

export const shelfReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { 
        case ADD_SHELF:
            return {
                ...state, 
                userShelf : {
                    id: uuidv4(),
                    books: []
                },
            };
            /*
        case ADD_BOOK_TO_SHELF:
            return{

            };
        case EDIT_SHELF:
            return {
                ...state,
                
            };
        case DELETE_SHELF:
            return {
                ...state.filter(state => state.id !== action.payload),
            };*/
        default: return state;
    }
};