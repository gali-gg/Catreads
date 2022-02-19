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

export {getFromStorageAndParse, setStorage, debounce};