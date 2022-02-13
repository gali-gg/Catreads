export default class Genre{
    constructor(uuid, genre){
        this.uuid = uuid;
        this.genre = genre;
        this.books = [];
    }
}