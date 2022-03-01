import { RATE_BOOK, REMOVE_FAVE_GENRE, ADD_FAVE_GENRE, CHANGE_AVATAR, CHANGE_NAME, LOGIN, LOGOUT, ADD_JOINED_DATE, ADD_LOCATION, ADD_LIKED_REVIEW, REMOVE_LIKED_REVIEW } from "../actions/userAction";
import _ from "lodash";

const INITIAL_STATE = {
    id: null,
    logged: false,
    name: null,
    avatar: null,
    favouriteGenres: [],
    ratedBooks: [],
    joined : null,
    location: null,
    likedReviews: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LOGIN:
            let newLikedReviews = [];
            if(action.payload.likedReviews){
                newLikedReviews = action.payload.likedReviews;
            }

            return {
                ...state,
                logged: true,
                id: action.payload.id,
                name: action.payload.name,
                avatar: action.payload.avatar,
                favouriteGenres: action.payload.favouriteGenres,
                ratedBooks: action.payload.ratedBooks,
                joined : action.payload.joined,
                location: action.payload.location,
                likedReviews: newLikedReviews
            }
        case LOGOUT:
            return {
                ...state,
                logged: false,
                id: null,
                name: null,
                avatar: null,
                favouriteGenres: [],
                ratedBooks: [],
                joined : null,
                location: null,
                likedReviews: []
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
            return {
                ...state,
                favouriteGenres : _.uniq([...state.favouriteGenres, ...action.payload])
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
        case ADD_JOINED_DATE:
            return {
                ...state,
                joined: action.payload
            }

        case ADD_LOCATION:
            return {
                ...state,
                location: action.payload
            }

        case ADD_LIKED_REVIEW:
            return {
                ...state,
                likedReviews: _.uniq([...state.likedReviews, action.payload])
            }
        case REMOVE_LIKED_REVIEW:
            return {
                ...state,
                likedReviews: state.likedReviews.filter(reviewID => reviewID !== action.payload)
            }
        default:
            return state;

    }
}
