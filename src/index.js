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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);