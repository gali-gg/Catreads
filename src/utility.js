import _ from "lodash";

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

export {getFromStorageAndParse, setStorage, debounce, formatNumber};