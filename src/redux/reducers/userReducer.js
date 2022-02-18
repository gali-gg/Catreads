import { RATE_BOOK, REMOVE_FAVE_GENRE, ADD_FAVE_GENRE, CHANGE_AVATAR, CHANGE_NAME, LOGIN, LOGOUT } from "../actions/userAction";

const INITIAL_STATE = {
    id: null,
    logged: false,
    name: null,
    avatar: null,
    favouriteGenres: [],
    ratedBooks: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                logged: true,
                id: action.payload.id,
                name: action.payload.name,
                avatar: action.payload.avatar,
                favouriteGenres: action.payload.favouriteGenres,
                ratedBooks: action.payload.ratedBooks
            }
        case LOGOUT:
            return {
                ...state,
                logged: false,
                id: null,
                name: null,
                avatar: null,
                favouriteGenres: [],
                ratedBooks: []
            }
        case CHANGE_NAME:
            return {
                ...state,
                name: action.payload
            }
        
        case CHANGE_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }
        case ADD_FAVE_GENRE:
            const favourite = state.favouriteGenres.some( genre => genre.id === action.payload.id) 
                ? 
                   state.favouriteGenres
                :
                    [...state.favouriteGenres, action.payload]
            return {
                ...state,
                favouriteGenres : favourite
            }
        case REMOVE_FAVE_GENRE:
            return {
                ...state,
                favouriteGenres: state.favouriteGenres.filter(genre => {
                    return genre.id !== action.payload
                })
            }
        case RATE_BOOK:
            let bookAlreadyRated = state.ratedBooks.some(ratingArr => ratingArr[0] === action.payload[0]);
            if(bookAlreadyRated){
                return {
                    ...state,
                    ratedBooks: state.ratedBooks.map(ratingArr => {
                        if(ratingArr[0] === action.payload[0]){
                            return [...action.payload];
                        }
                        return ratingArr;
                    })
                }
            }
            return {
                ...state,
                ratedBooks: [
                    ...state.ratedBooks,
                    action.payload
                ]
            }   
        default:
            return state;

    }
}
