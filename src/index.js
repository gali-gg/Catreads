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