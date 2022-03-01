import { Routes, Route} from "react-router-dom";
import HomePage from './screens/HomePage';
import MyBooksPage from './screens/MyBooksPage';
import ErrorPage from './screens/ErrorPage';
import LandingPage from './screens/LandingPage';
import GenresPage from './screens/GenresPage';
import LogInPage from './screens/LogInPage';
import RegisterPage from './screens/RegisterPage';
import ProfilePage from './screens/ProfilePage';
import BookPage from './screens/BookPage';
import { useSelector } from "react-redux";

export default function Main (props) {
  const logged = useSelector(state => state.userData.logged);

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
          <Route path='/genres' element={<GenresPage/>} />
          <Route path='/genres/:gname' element={<GenresPage/>} />
          <Route path='/user' element={<ProfilePage/>} />
          <Route path='/books/:bookId' element={<BookPage/>} />
          </>
        )}
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </>
    );
}