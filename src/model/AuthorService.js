export default class AuthorService {
    constructor(name, isGoodReadsAuthor, profileImage, born, died, website, genres, memberSince, description, books, bookshelves = [], friends = [], currentlyReading = null, groups = [], favouriteAuthors = [], friendsComments = []) {
        this.name = name;
        this.isGoodReadsAuthor = isGoodReadsAuthor;
        this.profileImage = profileImage;
        this.born = born;
        this.died = died;
        this.website = website || null;
        this.genres = genres;
        this.memberSince = memberSince || null;
        this.description = description;
        this.books = books;
        this.bookshelves = bookshelves;
        this.friends = friends;
        this.currentlyReading = currentlyReading;
        this.groups = groups;
        this.favouriteAuthors = favouriteAuthors;
        this.friendsComments = friendsComments;
        this.followers = [];
        this.videos = [];
        this.quotes = [];
        //this.pools = []; ?
        this.topics = [];
        this.comments = [];
        this.reviews = [];
    }
}
