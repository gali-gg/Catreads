import { Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GenreTitle from "./GenreTitle";
import GoodLink from "./GoodLink";
  
      
const useStyles = makeStyles({
    link: {
        marginTop: "10px",
        float: "right",
    },
  });

export default function GenreContainer(props){
    const classes = useStyles();

    return(
        <Stack>
            <GenreTitle title={props.genre}></GenreTitle>
            <br></br>
            <Stack direction="row" spacing={1}>
            {props.books.map(book => (
                    <img width="120" key={book.uuid} src={book.cover} alt="cover"/>
            ))}
            </Stack>

            <GoodLink classes={`${classes.link} latoB grGreen`} titleText={`More ${props.genre.toLowerCase()} ...`} />
        </Stack>
    )
}