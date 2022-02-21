import { v4 as uuidv4 } from 'uuid';

export const LOAD_BOOK = "LOAD_BOOK";
export const ADD_REVIEW = "ADD_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";

export function loadBookAction({uuid, title, cover, description, published, status, similarBooks, genres}, author){
    return {
        type: LOAD_BOOK,
        payload: {
            uuid,
            title,
            description,
            status,
            similarBooksIDs: similarBooks,
            genresIDs: genres,
            author,
            cover,
            published
        }
    }
}

export function addReviewAction (userID, reviewBody, rating) {
    return {
        type: ADD_REVIEW,
        payload: {
            id: uuidv4(),
            senderID: userID,
            rating,
            body: reviewBody
        }
    }
}

export function removeReviewAction (reviewID) {
    return {
        type: REMOVE_REVIEW,
        payload: reviewID
    }
}