import * as React from "react";
import styles from "./loginRegister.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import { userManager } from "../model/UserManagerService";
import { useState } from 'react';
import GoodReadsLogo from "../assets/components/GoodReadsLogo";
import GoodLink from "../assets/components/GoodLink";

export default function RegisterPage(props) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegAttempt = () => {
    if(userManager.register(username, password, name)){
      userManager.login(username, password)
      props.onRegister();
    }
  }

  const handleNameInput = (e) => {
    setName(e.target.value);
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value.trim());
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value.trim());
  }

  return (
    <div className={styles.signUpBackground}>
    <GoodReadsLogo className={styles.logo} height="40px"/>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: "auto",
            mt: "20px",
            padding: 10,
          },
        }}
      >

        <Paper elevation={2}>

        <Stack spacing={2}>
        <Typography variant="h5" gutterBottom component="div" className="meriB grBrown">
              Sign up for GoodReads
         </Typography>
          <Box>
          <Typography variant="subtitle2" gutterBottom component="div">
              Name
            </Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" placeholder="Name" value={name} onInput={handleNameInput}/>
            <Typography variant="subtitle2" gutterBottom component="div">
              Email
            </Typography>
            <TextField id="outlined-basic" variant="outlined" type="email" size="small" placeholder="you@yours.com" value={username} onInput={handleUsernameInput}/>
            <Typography variant="subtitle2" gutterBottom component="div">
              Password
            </Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="password" value={password} onInput={handlePasswordInput}/>
          </Box>

          <Button variant="outlined" size="large" onClick={handleRegAttempt}>
            Sign up
          </Button>
          <Box>
            <span className="latoR grBlack" style={{fontSize: "12px"}}>
              Already a memeber?
            </span>
            <GoodLink titleText="Sign in" classes="latoR grGreen" size="12px" to="/sign-in" />
          </Box>
          </Stack>
        </Paper>
        <div className={styles.footerBackground} style={{padding: 0}}>
        </div>
      </Box>
      </div>
  );
}