import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import HomePage from './screens/HomePage';
import MyBooksPage from './screens/MyBooksPage';
import AboutUsPage from './screens/AboutUsPage';
import ErrorPage from './screens/ErrorPage';
import LandingPage from './screens/LandingPage';
import { useState, useEffect } from 'react';
import GenresPage from './screens/GenresPage';
import LogInPage from './screens/LogInPage';
import RegisterPage from './screens/RegisterPage';
import RecommendationsPage from './screens/RecommendationsPage';
import ListopiaPage from './screens/ListopiaPage';
import ExplorePage from './screens/ExplorePage';
import NewsPage from './screens/NewsPage';
import QuotesPage from './screens/QuotesPage';
import ProfilePage from './screens/ProfilePage';
import DiscussionsPage from './screens/DiscussionsPage';
import FriendsPage from './screens/FriendsPage';
import UserCommentsPage from './screens/UserCommentsPage';
import UserQuotesPage from './screens/UserQuotesPage';
import FavoriteGenresPage from './screens/FavoriteGenresPage';
import UserSettingsPage from './screens/UserSettingsPage';
import MessagesPage from './screens/MessagesPage';
import SearchResultsPage from './screens/SearchResultsPage';
import BookPage from './screens/BookPage';
import AuthorPage from './screens/AuthorPage';
import FriendProfilePage from './screens/FriendProfilePage';
import {Header} from './assets/components/Header';
import {Footer} from './assets/components/Footer';
import Main from "./Main";
import BlueBanner from "./assets/components/BlueBanner";

function App() {
  //temporary solution
  const [userLogged, setUserLogged] = useState(Boolean(localStorage.loggedUser));
  const navigate = useNavigate();

  const handleLogIn =  () => {
    setUserLogged(true);
    navigate("/home");
  }
  // useEffect(() => {return (<Header/>)}, [userLogged]);


  return (
    <>
      {userLogged && <> <BlueBanner/> <Header logged={userLogged}/> </>}
      <Main logged={userLogged} handle={handleLogIn}/>
      {userLogged && <Footer direction="row"/>}
    </>
  );
}

export default App;
