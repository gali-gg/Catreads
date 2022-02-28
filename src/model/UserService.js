import { v4 as uuidv4 } from 'uuid';

export default class User {
    constructor(email, password, detailsObj = {}, profilePicture, faveGenresArr = []) {
        this.id = uuidv4();
        this.joined = null;
        this.location = null;
        this.email = email;
        this.password = password;
        this.avatar = profilePicture || "https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png";
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
        this.favouriteGenres = faveGenresArr;
        this.ratedBooks = [];
        this.savedQuotes = [];
        this.groups = [];
        this.friends = [];
        this.commentsByFriends = [];
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