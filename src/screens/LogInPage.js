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
import logo from "../assets/images/goodreads-logo.jpg";

export default function LogInPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogAttempt = () => {
    if(userManager.login(username, password)){
      props.onLogin();
    }
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value.trim());
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value.trim());
  }

  return (
    <>
      <Box
        className={styles.signUpBackground}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: "auto",
            mt: "20px",
            padding: 10,
          },
          justifyContent: "space-between"
        }}
      >
        <Paper elevation={2}>

        <Stack spacing={2}>
        <Typography variant="h4" gutterBottom component="div">
              Sign in to GoodReads
         </Typography>
          <Box>
            <Typography variant="subtitle2" gutterBottom component="div">
              Email
            </Typography>
            <TextField id="outlined-basic" type="email" variant="outlined" size="small" value={username} onInput={handleUsernameInput}/>
            <Typography variant="subtitle2" gutterBottom component="div">
              Password
            </Typography>
            <TextField id="outlined-basic" variant="outlined" size="small" type="password" value={password} onInput={handlePasswordInput}/>
          </Box>
          <Button variant="outlined" size="large" onClick={handleLogAttempt}>
            Sign In
          </Button>
          </Stack>
        </Paper>
        <div className={styles.footerBackground} style={{padding: 0}}>
        </div>
      </Box>
    </>
  );
}
