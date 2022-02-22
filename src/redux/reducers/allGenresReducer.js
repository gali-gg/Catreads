import { LOAD_GENRES } from "../actions/allGenresAction";

const INITIAL_STATE = {
    genres: []
}

export const allGenresReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_GENRES:
            return {
                ...state,
                genres: [...state.genres, ...action.payload]
            }
        default:
            return state;
    }
}