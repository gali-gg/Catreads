import { Divider, Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoodLink from "./GoodLink";
import Title from "./Title";


const useStyles = makeStyles({
    container: {
        flexWrap: "wrap", 
        gap : "10px"
    },
    link:{
        padding: "10px 0"
    },
    title:{
        textTransform: "uppercase",
        padding : "10px 0"
    },
    cover:{
        width: "80px",
        "&:hover":{
            cursor: "pointer"
        }
    }
});

export default function SideMenuImagesMosaic(props){
    const navigate = useNavigate();
    const allBooks = useSelector(state => state.books.books);
    const shelves = useSelector(state => state.shelves);
    const classes = useStyles();
    let wantToReadLength = shelves.wantToRead.books.length;
    let books = [];
    if(wantToReadLength <= 6){
        books = shelves.wantToRead.books.map(shelfBook => allBooks.filter(book => book.uuid === shelfBook)[0]);
    }else{
        books = shelves.wantToRead.books.map(shelfBook => allBooks.filter(book => book.uuid === shelfBook)[0]).slice(wantToReadLength-6);
    }
    return (
        <>
            <Title title={props.title} className={`${classes.title} grBrown latoB f-095`}></Title>
            <Stack direction="row" className={classes.container} key={Date.now()}>
            {
                books.map(book => (
                    <img 
                        title={book.title}
                        key={book.uuid}
                        onClick={() => navigate(`/books/${book.uuid}`)} 
                        src={book.cover} 
                        alt={book.title} 
                        className={classes.cover}
                    />))
            }
            
            </Stack>
            <GoodLink 
                size="0.9em"
                classes={` ${classes.link} grGreen latoR`}
                titleText={props.href}
                to={props.to}
            />
            <Divider />
        </>
    )
}