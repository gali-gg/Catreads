//import { v4 as uuidv4 } from 'uuid';

export default class Book {
constructor({uuid, title, author, illustrator, translator, cover, genres, status, description, similarBooks, quotes}) {
        //this.uuid = uuidv4();
        this.uuid = uuid;
        this.title = title;
        this.author = author;
        this.illustrator = illustrator || null;
        this.translator = translator || null;
        this.cover = cover;
        this.genres = genres;
        this.status = {
            rating : status.rating,
            ratingsCount : status.ratingsCount,
            reviewsCount : status.reviewsCount,
        }
        this.description = description;
        this.similarBooks = similarBooks;
        this.quotes = quotes;
        this.comments = [];
        this.lists = [];
        this.reviews = [];
        this.videosAbout = [];
        this.articles = [];
        this.trivias = [];
    }
}
