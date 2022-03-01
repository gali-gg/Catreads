import { Container, Stack } from '@mui/material';
import React from 'react';
import Title from '../assets/components/Title';
import SideMenulist from '../assets/components/SideMenuList';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import SingleGenreContent from './SingleGenreContent';
import AllGenresContent from './AllGenresContent';


const useStyles = makeStyles({
    bigTitle: {
        fontSize: "1.3em",
        margin: "0 0  20px 80px"
    },
})

export default function SingleGenrePage(props) {
    const classes = useStyles();
    const genres = useSelector(state => state.genres.genres);
    const allGenres = genres.map(genre => genre.genre);
    const firstHalfGenres = allGenres.slice(0, Math.floor(allGenres.length / 2));
    const secondHalfGenres = allGenres.slice(Math.round(allGenres.length / 2), allGenres.length - 1);

    return (
        <Container sx={{ p: "15px 0" }}>
            <Stack direction="column" justifyContent="center" >
                <Title
                    title={props.gname ? props.gname : "Genres"}
                    className={`${classes.bigTitle} meriB grBrown`}
                />
                <Stack direction="row" spacing={3} justifyContent="center">
                    {props.gname ? <SingleGenreContent gname={props.gname} /> : <AllGenresContent />}
                    <Stack spacing={3}>
                        {props.gname ? <SingleGenreContent gname={props.gname} sideMenu={true} /> : <AllGenresContent sideMenu={true} />}

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
