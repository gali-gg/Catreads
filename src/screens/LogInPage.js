import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import styles from "./cssModules/loginRegister.module.css";
import GoodReadsLogo from "../assets/components/GoodReadsLogo";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/css/styles.css";
import FooterCopy from "../assets/components/FooterCopy";
import GoodButton from "../assets/components/GoodButton";
import SocialLoginButton from "../assets/components/SocialLoginButton";
import { getFromStorageAndParse, setStorage } from "../utility";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { loadAllBooksAction } from "../redux/actions/allBooksAction";
import { loadGenresAction } from "../redux/actions/allGenresAction";
import { loadAuthorsAction } from "../redux/actions/allAuthorsAction";
import * as EmailValidator from 'email-validator';
import { loadFakeReviewsAction } from "../redux/actions/reviewsActions";
import { loadShelvesAction } from "../redux/actions/shelfAction";

const paperStyles = {
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 5,
  paddingRight: 5,
  width: "600px",
  boxSizing: "border-box"
}

const boxStyles = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: "auto",
    mt: "20px",
    mb: 5
  },
  justifyContent: "space-between"
}

const paperStyles = {
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 5,
  paddingRight: 5,
  width: "600px",
  boxSizing: "border-box"
}

const boxStyles = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: "auto",
    mt: "20px",
    mb: 5
  },
  justifyContent: "space-between"
}

export default function LogInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorIsVisible, setEmailErrorIsVisible] = useState(false);
  const [credentialsErrorIsVisible, setCredentialsErrorIsVisible] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogAttempt = () => {
    if (EmailValidator.validate(email)) {
      let users = getFromStorageAndParse("users");
      const authenticate = (email, password) =>
        users.some(
          (user) => user.email === email && user.password === password
        );

      if (authenticate(email, password)) {
        setEmailErrorIsVisible(false);
        let user = users.find((user) => user.email === email);
        setStorage("loggedUser", user.id);
        dispatch(loginAction(user));
        if(user.shelves){
          dispatch(loadShelvesAction(user.shelves));
        }
        dispatch(loadAllBooksAction());
        dispatch(loadGenresAction());
        dispatch(loadAuthorsAction());
        dispatch(loadFakeReviewsAction());
        navigate("/");
      } else {
        setEmailErrorIsVisible(false);
        setCredentialsErrorIsVisible(true);
      }
    } else {
      setEmailErrorIsVisible(true);
      setCredentialsErrorIsVisible(false);
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value.trim());
  };

  return (
    <div className={styles.signUpBackground}>
      <GoodReadsLogo className={styles.logo} height="30px" />
      <Box sx={boxStyles}>
        <Paper elevation={2} sx={paperStyles}>
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className="meriB grBrown"
              textAlign="center"
            >
              Sign in to GoodReads
            </Typography>
            <Stack spacing={2}>
              <SocialLoginButton type="facebook" />
              <SocialLoginButton type="amazon" />
              <SocialLoginButton type="apple" />
              <SocialLoginButton type="google" />
            </Stack>
            <form id="login-form">
              <Stack spacing={1}>
                {emailErrorIsVisible && (
                  <p className={styles.error}>Please enter a valid email!</p>
                )}
                {credentialsErrorIsVisible && (
                  <p className={styles.error}>Wrong email/password!</p>
                )}
                <div>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    component="div"
                    className="latoB grBlack"
                  >
                    Email address
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    type="email"
                    variant="outlined"
                    size="small"
                    placeholder="you@yours.com"
                    value={email}
                    onInput={handleEmailInput}
                    className={styles.textField}
                  />
                </div>
                <div>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    component="div"
                    className="latoB grBlack"
                  >
                    Password
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    type="password"
                    value={password}
                    onInput={handlePasswordInput}
                    className={styles.textField}
                  />
                </div>
              </Stack>
            </form>
            <Box>
              <GoodButton
                title="Sign in"
                onClick={handleLogAttempt}
                padding="12px 24px"
                style={{ marginRight: "20px" }}
              />
              <GoodLink
                titleText="Forgot password"
                classes="latoR grGreen"
                size="13px"
              />
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <span className={`${styles.notMember} latoR grBlack`}>
                Not a member?
              </span>
              <GoodLink
                titleText="Sign up"
                classes="latoR grGreen"
                size="12px"
                to="/sign-up"
              />
            </Box>
          </Stack>
        </Paper>
      </Box>
      <div className={styles.footer}>
        <Box className={styles.footerText}>
          <FooterCopy />
        </Box>
        <div className={styles.footerBackground} style={{ padding: 0 }}></div>
      </div>
    </div>
  );
}
