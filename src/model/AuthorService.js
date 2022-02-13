import { v4 as uuidv4 } from 'uuid';


export default class Author {
    constructor( {uuid, name, isGoodReadsAuthor, profileImage, born, died, website, twitter, genres, memberSince, description, books, bookshelves = [], friends = [], currentlyReading = null, groups = [], favouriteAuthors = [], friendsComments = []}) {
        //this.uuid = uuidv4();
        this.uuid = uuid;
        this.name = name;
        this.isGoodReadsAuthor = isGoodReadsAuthor;
        this.profileImage = profileImage;
        this.born = born;
        this.died = died || null;
        this.website = website || null;
        this.twitter = twitter || null;
        this.genres = genres;
        this.memberSince = memberSince || null;
        this.description = description;
        this.books = books;
        this.bookshelves = bookshelves || null;
        this.friends = friends || null;
        this.currentlyReading = currentlyReading || null;
        this.groups = groups || null;
        this.favouriteAuthors = favouriteAuthors || null;
        this.friendsComments = friendsComments || null;
        this.followers = [];
        this.videos = [];
        this.quotes = [];
        //this.pools = []; ?
        this.topics = [];
        this.comments = [];
        this.reviews = [];
    }
}
