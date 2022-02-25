import { LOAD_BOOKS } from "../actions/allBooksAction";
import _ from "lodash";

const INITIAL_STATE = {
    books: []
}

export const allBooksReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_BOOKS:
            return {
                ...state,
                books: _.uniqBy([...state.books, ...action.payload], "uuid")
            }
        default:
            return state;
    }
}