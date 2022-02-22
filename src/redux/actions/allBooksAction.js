export const LOAD_BOOKS = "LOAD_BOOKS";

export const loadAllBooksAction = () => {
    return (dispatch) => {
        fetch("server/allBooks.json")
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                    type: LOAD_BOOKS,
                    payload: data
                });
        })
    }
}