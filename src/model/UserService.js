export default class User {
    constructor(username, password, profilePicture, detailsObj = {}, faveGenresArr = []) {
        this.username = username;
        this.password = password;
        this.profilePicture = profilePicture || "https://s.gr-assets.com/assets/nophoto/user/u_225x300-c928cbb998d4ac6dd1f0f66f31f74b81.png";
        this.details = {
            birthday: detailsObj.birthday || null,
            names: {
                first: getNames(detailsObj.name)[0],
                middle: getNames(detailsObj.name)[1],
                last: getNames(detailsObj.name)[2]
            },
            age: detailsObj.age || null,
            gender: detailsObj.gender || null,
            country: detailsObj.country || null,
            website: detailsObj.website || null
        }
        this.favorites = {
            books: [],
            genres: faveGenresArr,
            authors: []
        }
        this.savedQuotes = [];
        this.groups = [];
        this.friends = [];
        this.commentsByFriends = [];
        this.bookshelves = {
            allBooks: [],
            read: [],
            currentlyReading: [],
            wantToRead: []
        }
        this.messages = [];
    }
}

function getNames (namesString) {
    let names = namesString.split(" ").filter(el => el);

    switch (names.length) {
        case 1 :
            return [...names, null, null];
        case 2 :
            return [names[0], null, names[1]];
        default:
            let [first, middle, ...rest] = names;
            return [first, middle, rest.join(" ")];
    }
}