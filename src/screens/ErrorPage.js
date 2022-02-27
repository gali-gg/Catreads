import { Container, Stack } from "@mui/material";
import "../assets/components/css/styles.css";
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {errorQuotes} from "../data/errorQuotes";


const useStyles = makeStyles({
  mainContainer:{
    minHeight: "100vh",
    padding:"30px 0",
  },
  button: {
    border: "1px solid #D6D0C4",
    borderRadius: "3px",
    background: "#F4F1EA",
    padding: "5px 20px",
    color: "#333",
    textTransform: "none",
    "&:hover": {
      background: "#ede6d6",
      cursor: "pointer"
    }
  },
  container: {
    position: "relative",
  },
  avatar: {
    position: "absolute",
    left: "-30px",
    bottom: "-15px",
    borderRadius: "50%",
    height: "80px",
    width: "80px",
    objectFit: "cover",
  }
});

export default function ErrorPage() {
  const navigate = useNavigate();
  const classes = useStyles();


  let chance = Math.floor(Math.random() * errorQuotes.length);
  const [error, setError] = useState(null);
  useEffect(() => setError(errorQuotes[chance]), []);
  
  return error &&
    <Container maxWidth="md" className={classes.mainContainer}>
      <Stack direction="row"  justifyContent="center" sx={{ height:"80vh"}} alignItems="center" spacing={10}>
        <Stack justifyContent="center" width="350px" alignItems="center"  spacing={2}>
          <span className="latoR grBrown f-1" key={error.title}>
            {error.title}
          </span>
          <span className="meriR grGrey f-09">
            {error.body.split("\n").map(text => <span key={text}>{text}<br/></span>)}
          </span>
          <span className="meriR grGrey f-09">
            — {error.author}, <em>{error.book}</em>
          </span>
          <button 
            className={`${classes.button} latoR f-1`} 
            onClick={() => navigate(`/`)}
          >
            Back to Goodreads homepage
          </button>
        </Stack>
        <div className={classes.container}>
          <img src={error.cover} alt="cover" />
          <img className={classes.avatar} src={error.authorImage} alt="avatar" />
        </div>
      </Stack>
    </Container>
}
