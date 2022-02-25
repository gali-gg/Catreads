import { Routes, Route} from "react-router-dom";
import HomePage from './screens/HomePage';
import MyBooksPage from './screens/MyBooksPage';
import AboutUsPage from './screens/AboutUsPage';
import ErrorPage from './screens/ErrorPage';
import LandingPage from './screens/LandingPage';
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
          <Route path='/recommendations' element={<RecommendationsPage/>} />
          <Route path='/lists' element={<ListopiaPage/>} />
          <Route path='/explore' element={<ExplorePage/>} />
          <Route path='/news' element={<NewsPage/>} />
          <Route path='/quotes' element={<QuotesPage/>} />
          <Route path='/genres' element={<GenresPage/>} />
          <Route path='/genres/:gname' element={<GenresPage/>} />
          <Route path='/user' element={<ProfilePage/>} />
          <Route path='/user/discussions' element={<DiscussionsPage/>} />
          <Route path='/user/discussions/:discId' element={<DiscussionsPage/>} />
          <Route path='/user/friends' element={<FriendsPage/>} />
          <Route path='/user/friends/:friendId' element={<FriendProfilePage/>} />
          <Route path='/user/comments' element={<UserCommentsPage/>} />
          <Route path='/user/quotes' element={<UserQuotesPage/>} />
          <Route path='/user/favoriteGenres' element={<FavoriteGenresPage/>} />
          <Route path='/user/settings' element={<UserSettingsPage/>} />
          <Route path='/user/messages' element={<MessagesPage/>} />

          <Route path='/search' element={<SearchResultsPage/>} />
          <Route path='/books/:bookId' element={<BookPage/>} />
          {/* <Route path='/review/new/:bookId' element={<WriteReviewPage/>} /> */}
          <Route path='/authors/:authorName' element={<AuthorPage/>} />
          </>
        )}
        <Route path='/aboutUs' element={<AboutUsPage/>} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
    );
}