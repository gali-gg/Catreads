import { LOAD_BOOK, ADD_REVIEW, REMOVE_REVIEW } from "../actions/openBookAction";
import _ from "lodash";

const INITIAL_STATE = {
    loaded: false,
    uuid: null,
    title: null,
    cover: null,
    description: null,
    published: null,
    author: null,
    status: null,
    reviews: [],
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
                reviews: [],
                similarBooksIDs: [...action.payload.similarBooksIDs],
                genresIDs: [...action.payload.genresIDs],
                loaded: true
            };
        case ADD_REVIEW:
            let newReview = {
                id: action.payload.id,
                bookID: action.payload.bookID,
                senderID: action.payload.senderID,
                rating: action.payload.rating,
                body: action.payload.body || ""
            }

            let previouslyReviewedByUser = state.reviews.some(review => review.senderID === action.payload.senderID);

            let newRating;
            let newReviewsCount;
            let newRatingsCount;
            let review;

            if(previouslyReviewedByUser){
                review = state.reviews.find(review => review.senderID === action.payload.senderID);
                newRating = (state.status.rating * state.status.ratingsCount - review.rating + action.payload.rating) / state.ratingsCount;
                newRatingsCount = state.status.ratingsCount;

                if(review.body){
                    newReviewsCount = action.payload.body ? state.status.reviewsCount : state.status.reviewsCount - 1;
                }
                else {
                    newReviewsCount = action.payload.body ? state.status.reviewsCount + 1 : state.status.reviewsCount;
                }
            }
            else {
                newRatingsCount = state.status.ratingsCount + 1;
                newRating = (state.status.rating * state.status.ratingsCount + action.payload.rating) / (state.ratingsCount + 1);
                newReviewsCount = action.payload.body ? state.status.reviewsCount + 1 : state.status.reviewsCount;
            }

            return {
                ...state,
                status: {
                    rating: newRating,
                    ratingsCount: newRatingsCount,
                    reviewsCount: newReviewsCount
                },
                reviews: _.uniqBy([newReview, ...state.reviews], "senderID")
            }

        case REMOVE_REVIEW:
            let reviewToBeRemoved = state.reviews.find(review => review.id === action.payload);
            let newReviewsArr = state.reviews.filter(review => review.id !== action.payload);

            let ratingAfterRemove = (state.status.rating * state.status.ratingsCount - reviewToBeRemoved.rating) / (state.ratingsCount - 1);
            let reviewsCountAfterRemove = reviewToBeRemoved.body ? state.status.reviewsCount - 1 : state.status.reviewsCount;

            return {
                ...state,
                status: {
                    rating: ratingAfterRemove,
                    ratingsCount: state.status.ratingsCount - 1,
                    reviewsCount: reviewsCountAfterRemove
                },
                reviews: [...newReviewsArr]
            }

        default: return state;
    }
};