import _ from "lodash";

export const ADD_REVIEW = "ADD_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const LOAD_REVIEWS = "LOAD_REVIEWS";
export const LIKE_REVIEW = "LIKE_REVIEW";
export const DISLIKE_REVIEW = "DISLIKE_REVIEW";

export const addReviewAction = (reviewID, userID, bookID, rating, body) => {
    return {
        type: ADD_REVIEW,
        payload: {
            id: reviewID,
            senderID: userID,
            bookID,
            rating,
            body,
            date: _.now(),
            likes: 0
        }
    }
}

export const removeReviewAction = (reviewID) => {
    return {
        type: REMOVE_REVIEW,
        payload: reviewID
    }
}

export const loadFakeReviewsAction = () => {
    return (dispatch) => {
        fetch("server/reviewsFromFakeUsers.json")
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                    type: LOAD_REVIEWS,
                    payload: data
                });
        })
    }
}

export const likeReviewAction = (reviewID) => {
    return {
        type: LIKE_REVIEW,
        payload: reviewID
    }
}

export const dislikeReviewAction = (reviewID) => {
    return {
        type: DISLIKE_REVIEW,
        payload: reviewID
    }
}