import {Header} from './assets/components/Header';
import {Footer} from './assets/components/Footer';
import Main from "./Main";
import BlueBanner from "./assets/components/BlueBanner";
import {useSelector} from "react-redux";

function App() {
  const userLogged = useSelector(state => state.userData.logged);

  return (
    <>
      {userLogged && <> <BlueBanner/> <Header logged={userLogged}/> </>}
      <Main logged={userLogged}/>
      {userLogged && <Footer direction="row"/>}
    </>
  );
}

export default App;
