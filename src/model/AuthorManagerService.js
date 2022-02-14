import authors from "../data/authors";
import Author from "./AuthorService";

class AuthorManager {
    constructor (authors) {
        this.authors = authors.map(author => new Author({...author}));
    }

    getNameById (id) {
        return this.authors.find(author => author.uuid === id).name;
    }
}

export const authorManager = new AuthorManager(authors);