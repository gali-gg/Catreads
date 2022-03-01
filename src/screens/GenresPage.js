import { Autocomplete, Container, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Title from '../assets/components/Title';
import { makeStyles } from '@mui/styles';
import { GenreContainer } from '../assets/components/GenreContainer';
import SideMenulist from '../assets/components/SideMenuList';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import GenreTitle from '../assets/components/GenreTitle';
import { getAllGenresBooks, getFavouriteGenres } from '../utility';

const useStyles = makeStyles({
  bigTitle: {
    fontSize: "1.3em",
    margin: "0 0  20px 80px"
  },
  searchContainer: {
    borderRadius: "3px",
    padding: "10px",
    background: "#EEEEEE",
  },
  button: {
    width: "100px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    padding: "5px",
    background: "#ede6d6",
    "&:hover": {
      background: "#D6D0C4",
      cursor: "pointer"
    }
  },
  input: {
    display: 'inline-block',
    "& input": {
      width: "450px",
      padding: "6px 10px",
      borderRadius: "3px",
      border: "1px solid #ccc",
      fontSize: "0.9em"
    },
  },
  description: {
    paddingBottom: "20px",
    textAlign: "justify"
  },
  link: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  },
  smallCover: {
    borderRadius: "3px",
    border: "1px solid #ddd"
  },
  optionsContainer: {
    borderBottom: "1px solid #ddd",
    padding: "7px 0",
    "&:hover": {
      background: "#eee",
      cursor: "pointer"
    }
  }
});

export default function GenresPage() {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();
  const allBooks = useSelector(state => state.books.books);
  const user = useSelector(state => state.userData);
  const authors = useSelector(state => state.authors.authors);
  const genres = useSelector(state => state.genres.genres);
  const allGenres = genres.map(genre => genre.genre);
  const firstHalfGenres = allGenres.slice(0, Math.floor(allGenres.length / 2));
  const secondHalfGenres = allGenres.slice(Math.round(allGenres.length / 2), allGenres.length - 1);
  let genreObj = genres.filter(genre => genre.genre === params.gname)[0];
  let allAuthors;

  if (genreObj) {
    allAuthors = authors.filter(author => {
      return author.genres.some(genre => genre === genreObj.uuid);
    });
  }

  const [text, setText] = useState(null);
  const [isMore, setIsMore] = useState(false);
  const handleMoreText = () => {
    if (isMore) {
      setText(genreObj.description.slice(0, 500));
      setIsMore(false);
    } else {
      setText(genreObj.description);
      setIsMore(true);
    }
  }

  useEffect(() => {
    if (params.gname) {
      setText(genreObj.description.slice(0, 500));
    }
  }, [params.gname]);

  const genreBooks = (genre) => {
    let genreBooksData = allBooks.filter(book => {
      return book.genres.some(someGenre => someGenre === genre.uuid);
    });
    let randomNum = Math.ceil(Math.random() * (genreBooksData.length - 5));

    return genreBooksData.length > 5 ? genreBooksData.slice(randomNum, randomNum + 5) : false;
  }

  return (
    <Container sx={{ p: "15px 0" }}>
      <Stack direction="column" justifyContent="center" >
        <Title
          title={params.gname ? params.gname : "Genres"}
          className={`${classes.bigTitle} meriB grBrown`}
        />
        <Stack direction="row" spacing={3} justifyContent="center">
          {params.gname &&
            <>
              <Stack sx={{ width: "750px" }}>
                <span className={classes.description}>
                  {text}
                  <span
                    className={`${classes.link} latoB grGreen f-09`}
                    onClick={handleMoreText}
                  >
                    {isMore ? "...less" : "...more"}
                  </span>
                </span>
                <Stack>
                  {genreObj &&
                    <GenreContainer
                      key={uuidv4()}
                      genre={`${params.gname} books`}
                      books={getAllGenresBooks(genreObj)}
                      coverHeight="220px"
                      navigate={false}
                    />}
                </Stack>
              </Stack>
            </>}
          {!params.gname &&
            <Stack spacing={2}>
              <Stack className={classes.searchContainer} direction="row" spacing={1}>
                <label>
                  <Autocomplete
                    className={`${classes.input} latoR`}
                    id="input-search-genres"
                    options={allGenres}
                    renderOption={(props, genre) => (
                      <Stack className={classes.optionsContainer}>
                        <span className={` latoR f-09`} onClick={() => navigate(`/genres/${genre}`)}>
                          {genre}
                        </span>
                      </Stack>
                    )}
                    renderInput={(params) => {
                      return (
                        <div ref={params.InputProps.ref}>
                          <input
                            type="text"
                            {...params.inputProps}
                            placeholder="Find a genre by name"
                          />
                        </div>
                      )
                    }}
                  />
                </label>
                <button className={`${classes.button} latoR f-09 grBrown`}>Find Genre</button>
              </Stack>

              {genres.map(genre =>
              (genreBooks(genre) &&
                <GenreContainer
                  key={uuidv4()}
                  genre={genre.genre}
                  books={genreBooks(genre)}
                  navigate={true}
                />
              ))}
            </Stack>
          }
          <Stack spacing={3}>
            {params.gname &&
              <SideMenulist title="Related genres" link="" hrefs={allGenres.slice(0, 5)} />
            }
            {params.gname && genreObj &&
              <Stack>
                <GenreTitle title="Popular authors"></GenreTitle>
                <Stack direction="row" spacing={1} paddingTop="10px">
                  {allAuthors.map(author =>
                    <img
                      height="90px"
                      src={author.profileImage}
                      alt={author.name}
                      key={author.uuid}
                      className={classes.smallCover}
                      title={author.name}
                    />
                  ).slice(0, 3)}
                </Stack>
              </Stack>
            }

            {!params.gname &&
              <SideMenulist title="My favourite genres" link="edit" hrefs={getFavouriteGenres(user)} />
            }
            <SideMenulist
              title="Browse"
              downLink="More genres..."
              hrefs={firstHalfGenres}
              secondHrefs={secondHalfGenres}
              dividedHrefs={true} />
          </Stack>
        </Stack>
      </Stack>
    </Container >
  )
}
