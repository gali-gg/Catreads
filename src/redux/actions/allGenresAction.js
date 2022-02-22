export const LOAD_GENRES = "LOAD_GENRES";

export const loadGenresAction = (genres) => {
    return (dispatch) => {
        fetch("server/allGenres.json")
        .then(resp => resp.json())
        .then(data => {
            dispatch({
                    type: LOAD_GENRES,
                    payload: data
                });
        })
    }
}