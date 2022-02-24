import { LOAD_GENRES } from "../actions/allGenresAction";
import _ from "lodash";

const INITIAL_STATE = {
    genres: []
}

export const allGenresReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_GENRES:
            return {
                ...state,
                genres: _.uniqBy([...action.payload], "uuid")
            }
        default:
            return state;
    }
}