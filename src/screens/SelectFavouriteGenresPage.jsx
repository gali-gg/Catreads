import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoodButton from "../assets/components/GoodButton";
import User from "../model/UserService";
import { loginAction } from "../redux/actions/userAction";
import { getFromStorageAndParse, setStorage } from "../utility";
import styles from "./cssModules/selectFavouriteGenres.module.css";
import logo from "../assets/images/goodreads_logo.svg";
import { loadGenresAction } from "../redux/actions/allGenresAction";
import { loadAuthorsAction } from "../redux/actions/allAuthorsAction";
import { loadAllBooksAction } from "../redux/actions/allBooksAction";
import { loadFakeReviewsAction } from "../redux/actions/reviewsActions";

export default function SelectFavouriteGenresPage(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let allGenres = useSelector((state) => state.genres.genres);
  let currentUser = useSelector((state) => state.userData);

  let userNames = props.userDetails.name;

  const [genres, setGenres] = useState(null);
  const [checkState, setCheckState] = useState(null);
  const [numberSelectedGenres, setNumberSelectedGenres] = useState(0);

  useEffect(() => {
    if (allGenres.length > 0) {
      setGenres(allGenres);
      let genresIDs = allGenres.map(genre => genre.uuid);
      let checkObj = {};
      genresIDs.forEach((id) => (checkObj[id] = false));
      setCheckState(checkObj);
    }
  }, [allGenres]);

  const handleCheck = (event) => {
    setCheckState({
      ...checkState,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setNumberSelectedGenres(numberSelectedGenres + 1);
    } else {
      setNumberSelectedGenres(numberSelectedGenres - 1);
    }
  };

  const handleSubmit = () => {
    let selectedGenres = [];

    for (let key in checkState) {
      if (checkState[key]) {
        selectedGenres.push(Number(key));
      }
    }

    const users = getFromStorageAndParse("users");
    const user = new User(
      props.userDetails.email,
      props.userDetails.password,
      { name: userNames },
      null,
      selectedGenres
    );
    user.location = currentUser.location;
    user.joined = currentUser.joined;

    users.push(user);
    setStorage("users", users);
    dispatch(loginAction(user));
    dispatch(loadAllBooksAction());
    dispatch(loadGenresAction());
    dispatch(loadAuthorsAction());
    dispatch(loadFakeReviewsAction());
    navigate("/");
  };
  return (
    <>
      {genres && checkState && (
        <>
          <div className={styles.header}></div>
          <Stack gap={3} className={styles.container}>
            <div className={styles.logoPlace}>
              <img src={logo} alt="goodreads-logo" width="180px"></img>
            </div>
            <h2 className="meriR grBrown">
              Next, select your favourite genres.
            </h2>
            <div className={styles.informationBox}>
              We use your favourite genres to make better book recommendations.
            </div>
            <div className={styles.checkBoxGrid}>
              {genres.map((genre) => {
                return (
                  <div className={styles.checkBoxWrapper} key={genre.uuid}>
                    <input
                      type="checkbox"
                      name={genre.uuid}
                      id={genre.uuid}
                      checked={checkState[genre.uuid]}
                      onChange={handleCheck}
                    ></input>
                    <label className={styles.label} htmlFor={genre.uuid}>
                      {genre.genre}
                    </label>
                  </div>
                );
              })}
            </div>
            <div>
              <p className={styles.info}>
                Select at least one genre to continue
              </p>
              <GoodButton
                disabled={numberSelectedGenres > 0 ? false : true}
                title="Continue"
                onClick={handleSubmit}
                className={styles.button}
              ></GoodButton>
            </div>
          </Stack>
        </>
      )}
    </>
  );
}
