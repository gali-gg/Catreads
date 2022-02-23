import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import "./styles.css";
import Title from './Title';
import authors from '../../data/authors';
import { Stack } from '@mui/material';
import serachIcon from "../images/icn_nav_search.svg";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';



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
  const navigate = useNavigate()

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
        options={books}
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
                console.log("click" + book.uuid);
                navigate(`/books/${book.uuid}`)
              }} >
              <img
                loading="lazy"
                width="30"
                src={book.cover}
                alt={book.title}
              />
              <Stack direction="column" alignItems="flex-start">
                <Title title={book.title} className="meriB grBrown f-09"></Title>
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
            />
            <img src={serachIcon} className={classes.searchIcon} alt="search-icon" />
          </Stack>
        )}
      />
    </label>
  );
}
