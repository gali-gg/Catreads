import { LOAD_BOOKS } from "../actions/allBooksAction";

const INITIAL_STATE = {
    books: []
}

export const allBooksReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_BOOKS:
            return {
                ...state,
                books: [...state.books, ...action.payload]
            }
        default:
            return state;
    }
}