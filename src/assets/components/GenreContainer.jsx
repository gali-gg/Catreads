import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import GenreTitle from "./GenreTitle";
import GoodBookCover from "./GoodBookCover";
import "./styles.css";


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


    return (
        <Stack >
            {props.navigate ?
                <GenreTitle
                    title={props.genre}
                    onClick={() => navigate(`/genres/${props.genre}`)}
                />
                :
                <GenreTitle title={props.genre} />
            }

            <br></br>
            <Stack direction="row" flexWrap="wrap" width="670px" gap="10px">
                {props.books.map(book => (
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
                    onClick={() => navigate(`/genres/${props.genre}`)}
                    className={`${classes.link} latoB grGreen f-09`}
                >
                    {`More ${props.genre.toLowerCase()} ...`}
                </span>}
        </Stack>
    )
}
)