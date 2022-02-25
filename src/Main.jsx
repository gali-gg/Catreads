import { Routes, Route} from "react-router-dom";
import HomePage from './screens/HomePage';
import MyBooksPage from './screens/MyBooksPage';
import AboutUsPage from './screens/AboutUsPage';
import ErrorPage from './screens/ErrorPage';
import LandingPage from './screens/LandingPage';
import GenresPage from './screens/GenresPage';
import LogInPage from './screens/LogInPage';
import RegisterPage from './screens/RegisterPage';
import QuotesPage from './screens/QuotesPage';
import ProfilePage from './screens/ProfilePage';
import FavoriteGenresPage from './screens/FavoriteGenresPage';
import BookPage from './screens/BookPage';
import AuthorPage from './screens/AuthorPage';
import { useDispatch, useSelector } from "react-redux";
import { getFromStorageAndParse } from "./utility";
import { loginAction } from "./redux/actions/userAction";
import { loadAllBooksAction } from "./redux/actions/allBooksAction";
import { loadAuthorsAction } from "./redux/actions/allAuthorsAction";
import { loadGenresAction } from "./redux/actions/allGenresAction";
import { loadFakeReviewsAction } from "./redux/actions/reviewsActions";
import { useEffect } from "react";

export default function Main (props) {
  const logged = useSelector(state => state.userData.logged);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(localStorage.getItem("users")){
  //     let users = getFromStorageAndParse("users");
  //     let user = users.find(user => user.id === localStorage.getItem("loggedUser"));

  //     dispatch(loginAction(user));
  //     dispatch(loadAllBooksAction());
  //     dispatch(loadAuthorsAction());
  //     dispatch(loadGenresAction());
  //     dispatch(loadFakeReviewsAction());
  //   }
  // }, []);

  return (
        <>
      <Routes>
        {!logged && (
          <>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<LandingPage/>} />
          <Route path='/sign-in' element={<LogInPage />} />
          <Route path='/sign-up' element={<RegisterPage onRegister={props.handle}/>} />
          </>
        )}
        {logged && (
          <>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/home' element={<HomePage/>} />
          <Route path='/myBooks' element={<MyBooksPage/>} />
          <Route path='/quotes' element={<QuotesPage/>} />
          <Route path='/genres' element={<GenresPage/>} />
          <Route path='/genres/:gname' element={<GenresPage/>} />
          <Route path='/user' element={<ProfilePage/>} />
          <Route path='/user/favoriteGenres' element={<FavoriteGenresPage/>} />
          <Route path='/books/:bookId' element={<BookPage/>} />
          <Route path='/authors/:authorName' element={<AuthorPage/>} />
          </>
        )}
        <Route path='/aboutUs' element={<AboutUsPage/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
    );
}