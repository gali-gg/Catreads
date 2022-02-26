import _ from "lodash";
import store from "./redux/store";

function getFromStorageAndParse (key) {
    return JSON.parse(localStorage.getItem(key));
}

function setStorage (key, data) {
    if(typeof data === "string"){
        localStorage.setItem(key, data);
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function debounce (func, delay) {
    let timerID;
    return function (...args){
        clearTimeout(timerID);
        timerID = setTimeout(func, delay, ...args);
    }
}

function formatNumber (number) {
    let numArr = number.toString().split("");
    numArr.reverse();
    let chunkedReversedNumArr = _.chunk(numArr, 3);

    let revNumArrJoinedDeep = chunkedReversedNumArr.map(arr => {
        arr.reverse();
        return arr.join("")
    });

    revNumArrJoinedDeep.reverse();

    return revNumArrJoinedDeep.join(",");
}

function getRatingsStats (bookID) {
    let reviewsCount = 0;
    let ratingsTotal = 0;

    let bookReviews = getBookReviews(bookID);

    let ratingsCount = bookReviews.length;

    bookReviews.forEach(review => {
        ratingsTotal += review.rating;

        if(review.body){
            reviewsCount++
        }
    })
    let rating;
    if(ratingsCount){
        rating =  Math.round( (ratingsTotal / ratingsCount) * 100 + Number.EPSILON ) / 100;
    }
    else {
        rating = 0;
    }
    return {rating, reviewsCount, ratingsCount}
}

store.subscribe(getBookReviews);

function getBookReviews (bookID) {
    let allReviews = store.getState().reviews.reviews;

    return allReviews.filter(review => review.bookID === bookID);
}

export {getFromStorageAndParse, setStorage, debounce, formatNumber, getRatingsStats, getBookReviews};