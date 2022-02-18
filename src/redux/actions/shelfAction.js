export const ADD_SHELF = "ADD_SHELF";
export const DELETE_SHELF = "DELETE_SHELF";
export const ADD_BOOK_TO_SHELF = "ADD_BOOK_TO_SHELF";
export const REMOVE_BOOK_FROM_SHELF = "REMOVE_BOOK_FROM_SHELF";

export const addBookToShelf = (name, book) => {
    return {
        type: ADD_BOOK_TO_SHELF,
        payload: {
            name: name,
            book : book,
            uuid : book.uuid
        }
    }
}

export const addShelf = (name) => {
    return {
        type: ADD_SHELF,
        payload: {
            name: name,
        }
    }
}

export const removeBookFromShelf = (name, uuid) => {
    return {
        type: REMOVE_BOOK_FROM_SHELF,
        payload: {
            name,
            uuid
        }
    }
}

export const deleteShelf = (name) => {
    return {
        type: DELETE_SHELF,
        payload: {
            name: name,
        }
    }
}