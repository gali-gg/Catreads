import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import "./assets/fonts/LatoLatin-Italic.woff2";
import "./assets/fonts/LatoLatin-Bold.woff2";
import "./assets/fonts/LatoLatin-Regular.woff2";
import "./assets/fonts/merriweather-bold.woff2";
import "./assets/fonts/merriweather-italic.woff2";
import "./assets/fonts/merriweather-regular.woff2";
import { Provider } from 'react-redux';
import store from './redux/store';
import { getFromStorageAndParse, setStorage } from './utility';
import User from './model/UserService';

let users=[];
if(localStorage.users){
  users = getFromStorageAndParse("users");
}
else {
  fetch("server/fakeUsers.json")
  .then(resp => resp.json())
  .then(data => {
    users.push(new User("test@test.com", "test", {name: "Harry Potter"}, null, [1, 5, 16]), ...data);
    setStorage("users", users);
  });
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);