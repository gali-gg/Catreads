import { Autocomplete, Stack } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import { GenreContainer } from '../assets/components/GenreContainer';
import SideMenulist from '../assets/components/SideMenuList';
import { useSelector } from 'react-redux';
import { debounce, getFavouriteGenres } from '../utility';
import _ from "lodash";

const useStyles = makeStyles({
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
    optionsContainer: {
        borderBottom: "1px solid #ddd",
        padding: "7px 0",
        "&:hover": {
            background: "#eee",
            cursor: "pointer"
        }
    }
});

export default function AllGenresContent(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const user = useSelector(state => state.userData);
    const genres = useSelector(state => state.genres.genres, _.isEqual);
    const allGenres = genres.map(genre => genre.genre);

    const [genresResults, setGenresResults] = useState([]);

    const handleSearchInput = debounce((event) => {
        let searchString = event.target.value.toLowerCase().trim();
        if (!searchString) {
            setGenresResults([]);
            return;
        }
        let newGenresResults = allGenres.filter(genre => genre.toLowerCase().includes(searchString));
        setGenresResults(newGenresResults);
    }, 500);



    if (props.sideMenu) {
        return (
            <SideMenulist title="My favourite genres" link="edit" hrefs={getFavouriteGenres(user)} />
        );
    } else {
        return (
            <Stack spacing={2}>
                <Stack className={classes.searchContainer} direction="row" spacing={1}>
                    <label>
                        <Autocomplete
                            className={`${classes.input} latoR`}
                            id="input-search-genres"
                            options={genresResults}
                            renderOption={(props, genre) => (
                                <Stack className={classes.optionsContainer} key={genre} >
                                    <span key={genre} className={` latoR f-09`} onClick={() => navigate(`/genres/${genre}`)}>
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
                                            onInput={(event) => {
                                                handleSearchInput(event)
                                            }}
                                        />
                                    </div>
                                )
                            }}
                        />
                    </label>
                    <button className={`${classes.button} latoR f-09 grBrown`}>Find Genre</button>
                </Stack>

                    <GenreContainer navigate={true} genres={genres}/>
            </Stack>
        )
    }
}
