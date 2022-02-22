import { LOAD_BOOK} from "../actions/openBookAction";

const INITIAL_STATE = {
    loaded: false,
    uuid: null,
    title: null,
    cover: null,
    description: null,
    published: null,
    author: null,
    similarBooksIDs: [],
    genresIDs: [],
};

export const openBookReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_BOOK:
            return {
                ...state,
                uuid: action.payload.uuid,
                title: action.payload.title,
                cover: action.payload.cover,
                description: action.payload.description,
                published: action.payload.published,
                author: action.payload.author,
                status: action.payload.status,
                similarBooksIDs: [...action.payload.similarBooksIDs],
                genresIDs: [...action.payload.genresIDs],
                loaded: true
            };
        default:
            return state;
    }
};