import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

export const ADD_SHELF_ACTIVITY = "ADD_SHELF_ACTIVITY";
export const ADD_RATING_ACTIVITY = "ADD_RATING_ACTIVITY";
export const ADD_REVIEW_ACTIVITY = "ADD_REVIEW_ACTIVITY";
export const ADD_BOOK_TO_SHELF_ACTIVITY = "ADD_BOOK_TO_SHELF_ACTIVITY";
export const CLEAR_ACTIVITIES = "CLEAR_ACTIVITIES";
export const LOAD_ACTIVITIES = "LOAD_ACTIVITIES";

export const addBookToShelfActivity = (shelfName, bookID) => {
    let doing;

    switch (shelfName) {
        case "Want to Read":
            doing = "wants to read";
            break;
        case "Read":
            doing = "finished reading";
            break;
        case "Currently Reading":
            doing = "is currently reading";
            break;
        default:
            doing = `added to shelf ${shelfName}`;
            break;
    }

    return {
        type: ADD_BOOK_TO_SHELF_ACTIVITY,
        payload: {
            uuid: uuidv4(),
            shelfName: shelfName,
            doing: doing,
            bookID: bookID,
            date: moment.now()
        }
    }
}

export const addShelfActivity = (shelfName) => {
    return {
        type: ADD_SHELF_ACTIVITY,
        payload: {
            uuid: uuidv4(),
            shelfName: shelfName,
            doing: "added shelf",
            date: moment.now()
        }
    }
}

export const addReviewActivity = (reviewBody, senderID, bookID) => {
    return {
        type: ADD_REVIEW_ACTIVITY,
        payload: {
            uuid: uuidv4(),
            reviewBody: reviewBody,
            senderID: senderID,
            bookID: bookID,
            doing: "added a review for",
            date: moment.now()
        }
    }
}

export const addRatingActivity = (ratingValue, senderID, bookID) => {
    return {
        type: ADD_RATING_ACTIVITY,
        payload: {
            uuid: uuidv4(),
            ratingValue: ratingValue,
            senderID: senderID,
            bookID: bookID,
            doing: `ratted with ${ratingValue} stars`,
            date: moment.now()
        }
    }
}

export const clearActivitiesAction = () => {
    return {
        type: CLEAR_ACTIVITIES
    }
}

export const loadActivitiesAction = (activitiesObj) => {
    return {
        type: LOAD_ACTIVITIES,
        payload: activitiesObj
    }
}