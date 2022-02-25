import { LOAD_AUTHORS } from "../actions/allAuthorsAction";
import _ from "lodash";

const INITIAL_STATE = {
    authors: []
}

export const allAuthorsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_AUTHORS:
            return {
                ...state,
                authors: _.uniqBy([...state.authors, ...action.payload], "uuid")
            }
        default:
            return state;
    }
}