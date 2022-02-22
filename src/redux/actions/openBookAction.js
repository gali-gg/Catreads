export const LOAD_BOOK = "LOAD_BOOK";
export const ADD_REVIEW = "ADD_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";

export function loadBookAction(bookObj, authorObj){

    let {uuid, title, cover, description, published, similarBooks, genres} = bookObj;

    return {
        type: LOAD_BOOK,
        payload: {
            uuid,
            title,
            description,
            similarBooksIDs: similarBooks,
            genresIDs: genres,
            author: authorObj,
            cover,
            published
        }
    }
}