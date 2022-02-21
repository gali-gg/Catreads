import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
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
    
        return(
            <Stack>
                <GenreTitle title={props.genre}></GenreTitle>
                <br></br>
                <Stack direction="row" spacing={1}>
                {props.books.map(book => (
                    <GoodBookCover height="180px" book={book} key={book.uuid}></GoodBookCover>
                        //<img width="120" key={book.uuid} src={book.cover} alt="cover"/>
                ))}
                </Stack>
    
                <GoodLink classes={`${classes.link} latoB grGreen`} titleText={`More ${props.genre.toLowerCase()} ...`} />
            </Stack>
        )
    }
)