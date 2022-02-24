import { ADD_REVIEW, REMOVE_REVIEW } from "../actions/openBookAction"
import _ from "lodash";
import { DISLIKE_REVIEW, LIKE_REVIEW, LOAD_REVIEWS } from "../actions/reviewsActions";
const INITIAL_STATE = {
    reviews: []
}

export const reviewsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){

        case ADD_REVIEW:
            let newReview = action.payload;
            return {
                ...state,
                reviews: _.uniqWith([newReview, ...state.reviews],
                    (review1, review2) =>
                      review1.senderID === review2.senderID &&
                      review2.bookID === review1.bookID
                  )
            }

        case REMOVE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.payload)
            }

        case LOAD_REVIEWS:
            return {
                ...state,
                reviews: [...state.reviews, ...action.payload]
            }

        case LIKE_REVIEW:
            let review = state.reviews.find(review => review.id === action.payload);
            review.likes = review.likes + 1;
            return {
                ...state,
                reviews: _.uniqBy([review, ...state.reviews], "id")
            }

        case DISLIKE_REVIEW:
            let review2 = state.reviews.find(review => review.id === action.payload);
            review2.likes = review2.likes - 1;
            return {
                ...state,
                reviews: _.uniqBy([review2, ...state.reviews], "id")
            }
        default:
            return state;
    }
}