import { Routes, Route, Link } from "react-router-dom";
import HomePage from './screens/HomePage';
import MyBooksPage from './screens/MyBooksPage';
import AboutUsPage from './screens/AboutUsPage';
import ErrorPage from './screens/ErrorPage';
import LandingPage from './screens/LandingPage';
import { useState } from 'react';
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
import Header from './assets/components/Header';

function App() {
  //temporary solution
  const [userLogged, setUserLogged] = useState(true);

  return (
    
    <>
      <Header />

      <Routes>
        {!userLogged && (
          <>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<LandingPage/>} />
          <Route path='/sign-in' element={<LogInPage/>} />
          <Route path='/sign-up' element={<RegisterPage/>} />
          </>
        )}
        {userLogged && (
          <>
          <Route path='/' element={<HomePage/>} />
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

export default App;
