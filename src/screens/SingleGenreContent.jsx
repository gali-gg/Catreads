import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { GenreContainer } from '../assets/components/GenreContainer';
import SideMenulist from '../assets/components/SideMenuList';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import GenreTitle from '../assets/components/GenreTitle';
import { getAllGenresBooks } from '../utility';

const useStyles = makeStyles({
  bigTitle: {
    fontSize: "1.3em",
    margin: "0 0  20px 80px"
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
});

export default function SingleGenreContent(props) {
  const classes = useStyles();
  const authors = useSelector(state => state.authors.authors);
  const genres = useSelector(state => state.genres.genres);
  const allGenres = genres.map(genre => genre.genre);
  let genreObj = genres.filter(genre => genre.genre === props.gname)[0];
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
    if (props.gname) {
      setText(genreObj.description.slice(0, 500));
    }
  }, [props.gname, genreObj.description]);


  if (props.sideMenu) {
    return (
      <>
        {
          props.gname &&
          <SideMenulist title="Related genres" link="" hrefs={allGenres.slice(0, 5)} />
        }
        {
          props.gname && genreObj &&
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
      </>
    )
  } else {
    return (
      <>
        {props.gname &&
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
                  genre={`${props.gname} books`}
                  books={getAllGenresBooks(genreObj)}
                  coverHeight="220px"
                  navigate={false}
                  genres={[genreObj]}
                />}
            </Stack>
          </Stack>
        }
      </>
    )
  }
}
