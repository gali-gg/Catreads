import * as React from "react";
import styles from "./loginRegister.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import GoodReadsLogo from "../assets/components/GoodReadsLogo";
import GoodLink from "../assets/components/GoodLink";
import GoodButton from "../assets/components/GoodButton";
import FooterCopy from "../assets/components/FooterCopy";
import SocialLoginButton from "../assets/components/SocialLoginButton";
import { useDispatch } from "react-redux";
import * as userActions from "../redux/actions/userAction"
import { getFromStorageAndParse, setStorage } from "../utility";
import User from "../model/UserService";
import { useNavigate } from "react-router-dom";
import * as EmailValidator from 'email-validator';

export default function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrorIsVisible, setEmailErrorIsVisible] = useState(false);
  const [passwordErrorIsVisible, setPasswordErrorIsVisible] = useState(false);
  const [emailTakenErrorIsVisible, setEmailTakenErrorIsVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegAttempt = () => {
    if(EmailValidator.validate(email) && name && password){
      setPasswordErrorIsVisible(false);
      setEmailErrorIsVisible(false);
      setEmailTakenErrorIsVisible(false);
      const users = getFromStorageAndParse("users");
      const emailFree = !users.some(user => user.email === email);
      if(emailFree){
        if(password.length > 7){
          const user = new User(email, password, {name});
          users.push(user);
          setStorage("users", users);
          dispatch(userActions.loginAction(user));
          navigate("/");
        }
        else{
          setPasswordErrorIsVisible(true);
        }
      }
      else {
        setEmailTakenErrorIsVisible(true);
      }

    } else {
      setEmailErrorIsVisible(true);
    }
  }

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value.trim());
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value.trim());
  }

  return (
    <div className={styles.signUpBackground}>
    <GoodReadsLogo className={styles.logo} height="30px"/>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: "auto",
            mt: "20px",
            mb: 5
          },
        }}
      >

        <Paper elevation={2} sx={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, width: "600px", boxSizing: "border-box"}}>

        <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h6" gutterBottom component="div" className="meriB grBrown" textAlign="center">
              Sign up for GoodReads
         </Typography>
        <div className="latoR grBlack" style={{textAlign: "center"}}>Sign up to see what your friends are reading, get book&nbsp;recommendations,
        and join the world’s largest community of readers. </div>

          <Stack spacing={2} >
            <SocialLoginButton type="facebook"/>
            <SocialLoginButton type="amazon"/>
            <SocialLoginButton type="apple"/>
          </Stack>
          <form id="register-form">
          <Stack spacing={1}>
            {emailErrorIsVisible && <p className={styles.error}>Please enter a valid email!</p>}
            {passwordErrorIsVisible && <p className={styles.error}>Password must be at least 8 symbols.</p>}
            {emailTakenErrorIsVisible && <p className={styles.error}>This email is already taken!</p>}
          <div>
          <Typography variant="subtitle2" gutterBottom component="div" className="latoB grBlack">
              Name
            </Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" placeholder="Name" value={name} onInput={handleNameInput} style={{width: "300px"}}/>
            </div>
            <div>
            <Typography variant="subtitle2" gutterBottom component="div" className="latoB grBlack">
              Email address
            </Typography>
            <TextField id="outlined-basic" variant="outlined" type="email" size="small" placeholder="you@yours.com" value={email} onInput={handleEmailInput} style={{width: "300px"}}/>
            </div>
            <div>
            <Typography variant="subtitle2" gutterBottom component="div" className="latoB grBlack">
              Password
            </Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="password" value={password} onInput={handlePasswordInput} style={{width: "300px"}}/>
            </div>
            </Stack>
            </form>
          <Box style={{marginBottom: "10px"}}>
          <GoodButton title="Sign up" onClick={handleRegAttempt} padding="12px 24px" style={{marginRight: "20px"}}/>
            <span className="latoR grBlack" style={{fontSize: "12px", marginRight: "10px"}}>
              Already a memeber?
            </span>
            <GoodLink titleText="Sign in" classes="latoR grGreen" size="12px" to="/sign-in" />
          </Box>
          </Stack>
          <div className="grLight latoR" style={{fontSize: "12px", textAlign: "center"}}>
          By clicking “Sign up” I agree to the Goodreads
            <GoodLink titleText="Terms of Service" size="12px" classes="latoR grGreen" style={{margin: "5px"}}/>
           and confirm that I am at least 13 years of age.
           <GoodLink titleText="Read our Privacy Policy." size="12px" classes="latoR grGreen" style={{margin: "5px"}}/>
          </div>
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