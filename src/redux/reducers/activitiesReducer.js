import { ADD_BOOK_TO_SHELF_ACTIVITY, ADD_RATING_ACTIVITY, ADD_REVIEW_ACTIVITY, ADD_SHELF_ACTIVITY, CLEAR_ACTIVITIES, LOAD_ACTIVITIES } from "../actions/activitiesAction";

const INITIAL_STATE = {
    ratingsActivity: [],
    reviewsActivity: [],
    addShelfActivity: [],
    addBookToShelfActivity: []
}

export const activitiesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_RATING_ACTIVITY:
            return {
                ...state,
                ratingsActivity: [...state.ratingsActivity, action.payload]
            }
        case ADD_REVIEW_ACTIVITY:
            return {
                ...state,
                reviewsActivity: [...state.reviewsActivity, action.payload]
            }
        case ADD_SHELF_ACTIVITY:
            return {
                ...state,
                addShelfActivity: [...state.addShelfActivity, action.payload]
            }
        case ADD_BOOK_TO_SHELF_ACTIVITY:
            return {
                ...state,
                addBookToShelfActivity: [...state.addBookToShelfActivity, action.payload]
            }
        case LOAD_ACTIVITIES:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_ACTIVITIES:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}