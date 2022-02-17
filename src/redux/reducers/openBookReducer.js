import { LOAD_BOOK } from "../actions/openBookAction";


const INITIAL_STATE = {
    id: null,
    title: null,
    description: null,
    author: null,
    rating: null,
    comments: [],
    similarBooks: [],
    genres: [],
};

export const openBookReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_BOOK:
            return {
                ...state, 
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                author: action.payload.author,
                rating: action.payload.rating,
                comments: [],
                similarBooks: [],
                genres: [],
            };
        
        default: return state;
    }
};