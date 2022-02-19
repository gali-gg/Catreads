import { Divider, Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
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
    }
});

export default function SideMenuImagesMosaic(props){
    const shelves = useSelector(state => state.shelves);
    const classes = useStyles();
    let wantToReadLength = shelves["Want to Read"].length;
    let books = [];
    if(wantToReadLength <= 6){
        books = shelves["Want to Read"];
    }else{
        books = shelves["Want to Read"].slice(wantToReadLength-6);
    }

    return (
        <>
            <Title title={props.title} className={`${classes.title} grBrown latoB f-095`}></Title>
            <Stack direction="row" className={classes.container}>
            {
                books.map(book => (<img key={book.uuid} src={book.cover} alt={book.title} height="120"/>))
            }
            
            </Stack>
            <GoodLink 
                size="0.9em"
                classes={` ${classes.link} grGreen latoR`}
                titleText={props.href}
            />
            <Divider></Divider>
        </>
    )
}