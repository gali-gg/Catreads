export const LOAD_POSTS = "LOAD_POSTS";

export const loadPosts = () => {
    return function(dispatch){
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => dispatch({type : LOAD_POSTS, payload : data}));
    }
}