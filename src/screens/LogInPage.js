import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import { userManager } from "../model/UserManagerService";
import { useState } from 'react';
import styles from "./loginRegister.module.css";
import GoodReadsLogo from "../assets/components/GoodReadsLogo";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/styles.css";
import FooterCopy from "../assets/components/FooterCopy";
import Container from '@mui/material/Container';
import GoodButton from "../assets/components/GoodButton";
import SocialLoginButton from "../assets/components/SocialLoginButton";
import { getFromStorageAndParse } from "../utility";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { loadAllBooksAction } from "../redux/actions/allBooksAction";
import { loadGenresAction } from "../redux/actions/allGenresAction";
import { loadAuthorsAction } from "../redux/actions/allAuthorsAction";

export default function LogInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //need to add error component
  const [errorIsVisible, setErrorIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogAttempt = () => {
    const form = document.getElementById("login-form");
    let formIsValid = form.checkValidity();

    if(formIsValid){
      const users = getFromStorageAndParse("users");
      const authenticate =  (email, password) => users.some(user => user.email === email && user.password === password);

      if(authenticate(email, password)){
        setErrorIsVisible(false);
        const user = users.find(user => user.email === email);
        dispatch(loginAction(user));
        dispatch(loadAllBooksAction());
        dispatch(loadGenresAction());
        dispatch(loadAuthorsAction());
        navigate("/");
      }

      else {
        setErrorIsVisible(true);
      }
    }
    else {
      form.reportValidity();
    }
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value.trim());
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value.trim());
  }

  return (
    <div className={styles.signUpBackground}>
      <GoodReadsLogo className={styles.logo} height="30px" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: "auto",
            mt: "20px",
            mb: 5
          },
          justifyContent: "space-between"
        }}
      >
        <Paper elevation={2} sx={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, width: "600px", boxSizing: "border-box"}}>
        <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h6" gutterBottom component="div" className="meriB grBrown" textAlign="center">
              Sign in to GoodReads
         </Typography>
          <Stack spacing={2} >
            <SocialLoginButton type="facebook"/>
            <SocialLoginButton type="amazon"/>
            <SocialLoginButton type="apple"/>
            <SocialLoginButton type="google"/>
          </Stack>
          <form id="login-form">
          <Stack spacing={1}>
            <div>
            <Typography variant="subtitle2" gutterBottom component="div" className="latoB grBlack">
              Email address
            </Typography>
            <TextField id="outlined-basic" type="email" variant="outlined" size="small" placeholder="you@yours.com" value={email} onInput={handleEmailInput} style={{width: "300px"}}/>
            </div>
            <div>
            <Typography variant="subtitle2" gutterBottom component="div" className="latoB grBlack">
              Password
            </Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="password" value={password} onInput={handlePasswordInput} style={{width: "300px"}}/>
            </div>
          </Stack>
          </form>
          <Box>
            <GoodButton title="Sign in" onClick={handleLogAttempt} padding="12px 24px" style={{marginRight: "20px"}}/>
            <GoodLink titleText="Forgot password" classes="latoR grGreen" size="13px" />
            </Box>
            <Box sx={{textAlign: "center"}}>
            <span className="latoR grBlack" style={{fontSize: "12px", marginRight: "10px"}}>
              Not a memeber?
            </span>
            <GoodLink titleText="Sign up" classes="latoR grGreen" size="12px" to="/sign-up" />
          </Box>
          </Stack>
        </Paper>
      </Box>
      <div className={styles.footer}>
        <Box className={styles.footerText}>
          <FooterCopy />
        </Box>
        <div className={styles.footerBackground} style={{padding: 0}}>
          </div>
      </div>
    </div>
  );
}
