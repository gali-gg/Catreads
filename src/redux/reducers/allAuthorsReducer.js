import { LOAD_AUTHORS } from "../actions/allAuthorsAction";

const INITIAL_STATE = {
    authors: []
}

export const allAuthorsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_AUTHORS:
            return {
                ...state,
                authors: [...state.authors, ...action.payload]
            }
        default:
            return state;
    }
}