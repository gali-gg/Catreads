import _ from "lodash";

export const ADD_REVIEW = "ADD_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";

export const addReviewAction = (reviewID, userID, bookID, rating, body) => {
    return {
        type: ADD_REVIEW,
        payload: {
            id: reviewID,
            senderID: userID,
            bookID,
            rating,
            body,
            date: _.now()
        }
    }
}

export const removeReviewAction = (reviewID) => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewID
    }
}