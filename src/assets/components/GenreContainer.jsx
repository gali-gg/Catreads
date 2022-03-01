import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import GenreTitle from "./GenreTitle";
import GoodBookCover from "./GoodBookCover";
import "./css/styles.css";
import { useSelector } from "react-redux";


const useStyles = makeStyles({
    link: {
        marginTop: "10px",
        textAlign: "right",
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        }
    },
});

export const GenreContainer = React.memo((props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const allBooks = useSelector(state => state.books.books);


    function genreBooks(genre) {
        let genreBooksData = allBooks.filter(book => {
            return book.genres.some(someGenre => someGenre === genre.uuid);
        });
        let randomNum = Math.ceil(Math.random() * (genreBooksData.length - 5));

        return genreBooksData.length > 5 ? genreBooksData.slice(randomNum, randomNum + 5) : false;
    }

    return (
        <Stack>
            {props.genres.map(genre =>
                genreBooks(genre) &&
                <Stack key={genre.uuid}>
                    {props.navigate ?
                        <GenreTitle
                            title={genre.genre}
                            onClick={() => navigate(`/genres/${genre.genre}`)}
                        />
                        :
                        <GenreTitle title={genre.genre} />
                    }

                    <br></br>
                    <Stack direction="row" flexWrap="wrap" width="670px" gap="10px">
                        {genreBooks(genre).map(book => (
                            <GoodBookCover
                                onClick={() => navigate(`/books/${book.uuid}`)}
                                height={props.coverHeight || "170px"}
                                book={book}
                                key={book.uuid}
                            />
                        ))}
                    </Stack>
                    {!props.coverHeight &&
                        <span
                            onClick={() => navigate(`/genres/${genre.genre}`)}
                            className={`${classes.link} latoB grGreen f-09`}
                        >
                            {`More ${genre.genre.toLowerCase()} ...`}
                        </span>}
                </Stack>
            )}
        </Stack>
    )
});