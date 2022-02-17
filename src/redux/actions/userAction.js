export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_AVATAR = "CHANGE_AVATAR";
export const ADD_FAVE_GENRE = "ADD_FAVE_GENRE";
export const REMOVE_FAVE_GENRE = "REMOVE_FAVE_GENRE";
export const RATE_BOOK = "RATE_BOOK";

export const loginAction = (user) => {
    return {
        type: LOGIN,
        payload: {
            id: user.id,
            name: user.details.names,
            avatar: user.avatar,
            favouriteGenres: user.favouriteGenres,
            ratedBooks: user.ratedBooks
        }
    }
}

export const logoutAction = {
    type: LOGOUT
}

export const changeNameAction = (first, middle, last) => {
    return {
        type: CHANGE_NAME,
        payload: {
            first,
            middle,
            last
        }
    }
}

export const changeAvatarAction = avatar => {
    return {
        type: CHANGE_AVATAR,
        payload: avatar
    }
}

export const addFaveGenreAction = genre => {
    return {
        type : ADD_FAVE_GENRE,
        payload: genre
    }
}

export const removeFaveGenreAction = genreID => {
    return {
        type: REMOVE_FAVE_GENRE,
        payload: genreID
    }
}

export const rateBookAction = (bookId, rating) => {
    return {
        type: RATE_BOOK,
        payload: [bookId, rating]
    }
}