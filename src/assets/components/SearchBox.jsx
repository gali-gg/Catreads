import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import "./css/styles.css";
import Title from './Title';
import { debounce, Stack } from '@mui/material';
import serachIcon from "../images/icn_nav_search.svg";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {useState} from "react";



const useStyles = makeStyles({
  autocomplete: {
    display: 'inline-block',
    '& input': {
      height: 20,
      border: "1px solid #ddd",
      padding: "5px",
      borderRadius: "3px",
      fontFamily: "Lato Regular",
      fontSize: "0.95em",
    }
  },
  searchIcon: {
    height: "20px",
    position: "absolute",
    right: "5px",
    cursor: "pointer"
  },
});

export default function CustomInputAutocomplete(props) {
  const classes = useStyles();
  const books = useSelector(state => state.books.books);
  const authors = useSelector(state => state.authors.authors);
  const navigate = useNavigate();

  const [bookResults, setBookresults] = useState([]);

  const handleSearchInput = debounce((event) => {
    let searchString = event.target.value.toLowerCase().trim();
    if(!searchString){
      setBookresults([]);
      return;
    }
    let newBooks = books.filter(book => book.title.toLowerCase().includes(searchString));
    setBookresults(newBooks);
  }, 500);

  return (
    <label>
      <Autocomplete
        className={classes.autocomplete}
        sx={{
          '& input': {
            width: props.width || "300px"
          }
        }}
        id="custom-input-demo"
        options={bookResults}
        getOptionLabel={(option) => option.title}
        renderOption={(props, book) => (
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            key={book.uuid}
            borderBottom="1px solid #ddd"
            component="div"
            {...props}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
              key={book.uuid}
              onClick={() => {
                navigate(`/books/${book.uuid}`)
              }} >
              <img
                loading="lazy"
                width="30"
                src={book.cover}
                alt={book.title}
              />
              <Stack direction="column" alignItems="flex-start">
                <Title title={book.title} className="meriB grBrown f-08"></Title>
                <span className="meriR grBrown f-08">by {authors.find(author => author.uuid === book.author).name}</span>
              </Stack>
            </Stack>
          </Stack>
        )}
        renderInput={(params) => (
          <Stack ref={params.InputProps.ref} direction="row" alignItems="center" position="relative">
            <input
              type="text"
              placeholder="Search books"
              className="latoB f-1"
              {...params.inputProps}
              onInput={(event) => {
                handleSearchInput(event)}}
            />
            <img src={serachIcon} className={classes.searchIcon} alt="search-icon" />
          </Stack>
        )}
      />
    </label>
  );
}
