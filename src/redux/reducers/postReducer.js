import { LOAD_POSTS } from "../actions/postAction";

const INITIAL_STATE = {
    posts : [],
};

export const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state, 
                posts : action.payload
            };
        default: return state;
    }
};