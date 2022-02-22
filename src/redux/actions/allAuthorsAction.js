export const LOAD_AUTHORS = "LOAD_AUTHORS";

export const loadAuthorsAction = (authors) => {
    return (dispatch) => {
        fetch("server/allAuthors.json")
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                    type: LOAD_AUTHORS,
                    payload: data
                });
        })
    }
}