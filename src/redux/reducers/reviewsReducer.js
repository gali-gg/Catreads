import { ADD_REVIEW, REMOVE_REVIEW } from "../actions/openBookAction"
import _ from "lodash";
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
        default:
            return state;
    }
}