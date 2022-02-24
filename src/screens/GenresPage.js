import { Autocomplete, Container, Stack } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Title from '../assets/components/Title';
import { makeStyles } from '@mui/styles';
import {GenreContainer} from '../assets/components/GenreContainer';
import SideMenulist from '../assets/components/SideMenuList';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

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
     "&:hover":{
       background: "#D6D0C4",
       cursor: "pointer"
     }
  },
  input:{
    display: 'inline-block',
    "& input": {
      width: "450px",
      padding: "6px 10px",
      borderRadius: "3px",
      border: "1px solid #ccc",
      fontSize: "0.9em"
    },
  }
});

export default function GenresPage() {
    const classes = useStyles();
    const params = useParams();
    const allBooks = useSelector(state => state.books.books);
    const user = useSelector(state => state.userData);
    const genres = useSelector(state => state.genres.genres);
    const allGenres = genres.map(genre => genre.genre);
    const firstHalfGenres = allGenres.slice(0, Math.floor(allGenres.length/2));
    const secondHalfGenres = allGenres.slice(Math.round(allGenres.length/2), allGenres.length-1);
    const [favouriteGenres, setFavouriteGenres] = useState(null);

    const genreBooks = (genre) => {
      let genreBooksData = allBooks.filter(book => {
        return book.genres.some(someGenre => someGenre === genre.uuid);
      });
      let randomNum = Math.ceil(Math.random()*(genreBooksData.length-5));

      return genreBooksData.length > 5 ? genreBooksData.slice(randomNum, randomNum+5) : false;
    }

    React.useEffect(() => {
      setFavouriteGenres(user.favouriteGenres.map( genre => {
        return genres.filter(g => g.uuid === genre)[0].genre
      }))
    }, [genres, user]);
    
  return (
    <>
    {params.gname &&
        <h1>{params.gname} page</h1>
    }
    {!params.gname &&
        <Container sx={{p:"15px 0"}}>
          <Stack direction="column" justifyContent="center" >
          <Title title="Genres" className={`${classes.bigTitle} meriB grBrown`}></Title>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Stack spacing={2}>
              
              <Stack className={classes.searchContainer} direction="row" spacing={1}>
              <label>
              <Autocomplete
                className={`${classes.input} latoR`}
                id="input-search-genres"
                options={allGenres}
                renderInput={(params) => {
                  return (
                    <div ref={params.InputProps.ref}>
                      <input type="text" {...params.inputProps} placeholder="Find a genre by name"/>
                    </div>
                  )
                }}
              />
            </label>
                <button className={`${classes.button} latoR f-09 grBrown`}>Find Genre</button>
              </Stack>

              {genres.map(genre => 
                (genreBooks(genre) && 
                    <GenreContainer key={uuidv4()} genre={genre.genre} books={genreBooks(genre) }/>
                ))}

            </Stack>
            <Stack spacing={3}>
            {favouriteGenres && <SideMenulist title="My favourite genres" link="edit" hrefs={favouriteGenres}/>}

                <SideMenulist 
                  title="Browse" 
                  downLink="More genres..." 
                  hrefs={firstHalfGenres} 
                  secondHrefs={secondHalfGenres} 
                  dividedHrefs={true}/>
            </Stack>
          </Stack>
          </Stack>
        </Container>
    }
    </>
  )
}
