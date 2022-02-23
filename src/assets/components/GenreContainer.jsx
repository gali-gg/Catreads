import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import GenreTitle from "./GenreTitle";
import GoodBookCover from "./GoodBookCover";
import GoodLink from "./GoodLink";
  
      
const useStyles = makeStyles({
    link: {
        marginTop: "10px",
        float: "right",
    },
  });

export const GenreContainer = React.memo( (props) => 
    {
        const classes = useStyles();
        const navigate = useNavigate();

    
        return(
            <Stack>
                <GenreTitle title={props.genre}></GenreTitle>
                <br></br>
                <Stack direction="row" spacing={1}>
                {props.books.map(book => (
                    <GoodBookCover 
                        onClick={() => navigate(`/books/${book.uuid}`)} 
                        height="180px" 
                        book={book}  
                        key={book.uuid}
                    />
                ))}
                </Stack>
    
                <GoodLink classes={`${classes.link} latoB grGreen`} titleText={`More ${props.genre.toLowerCase()} ...`} />
            </Stack>
        )
    }
)