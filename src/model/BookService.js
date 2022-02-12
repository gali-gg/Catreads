export default class Book {
    constructor(title, author, illustrator, translator, cover, genres, ratingDetails, description, similarBooks, quotes) {
        this.title = title;
        this.author = author;
        this.illustrator = illustrator || null,
        this.translator = translator || null,
        this.cover = cover;
        this.genres = genres;
        this.status = {
            rating : ratingDetails.rating,
            ratingCount : ratingDetails.ratingCount,
            reviewsCount : ratingDetails.reviewsCount
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
