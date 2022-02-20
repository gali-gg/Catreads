import Stack from '@mui/material/Stack';
import authors from "../../data/authors";
import "./styles.css";
import GoodLink from './GoodLink';
import { makeStyles } from '@mui/styles';
import { Button, Divider, Rating } from '@mui/material';
import IconCaretRight from "../images/icon_caret_right.svg";
import Title from './Title';



const useStyles = makeStyles({
    title:{
        textTransform: "uppercase",
    },
    container:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    button: {
        background: "#409D69",
        color: "white",
        textAlign: "left",
        textTransform: "none",
        width: "75%",
        "&:hover":{
            background: "#3D9363",
            cursor: "pointer",
        }
    },
    ratingContainer:{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: "15px",
    },
    littleRatingText:{
        fontSize: "0.8em",
        color: "grey"
    }


});

export default function RecommendBookLayout(props){
    const classes = useStyles();
    let author = authors.filter(author => author.uuid === props.book.author)[0].name;
    return (
        <>
            <Title title={props.title} className={`${classes.title} latoB grBrown f-09`}></Title>
            <p></p>
            <Stack direction="row" spacing={2}>
                <img width="100" src={props.book.cover} alt={`${props.book.title}-img`} />
               <Stack direction="row">
                <div className={classes.container}>
                        <span className="meriB f-09 grBrown" >{props.book.title}</span>
                        <span className="meriR f-08 grBrown">by {author}</span>
                        <div className={classes.ratingContainer}>
                            <Rating name="read-only" size="small" value={Math.floor(props.book.status.rating)} readOnly/>
                            <span className={classes.littleRatingText}>{props.book.status.rating}</span>
                        </div>
                        <Button className={classes.button} onClick={props.handleClick} disableRipple>
                            Want to Read
                        </Button>
                    </div>
                    <img 
                        onClick={props.handleNewBook} 
                        width="15px" src={IconCaretRight} 
                        alt="icon-right" 
                        style={{cursor:"pointer"}} 
                    />
               </Stack>
            </Stack>
            <p className="latoR grBrown">
                {props.book.description.substring(0, 150)}
                ...<GoodLink titleText="Continue Reading" classes="grGreen latoR f-09"/>
            </p>
            <GoodLink titleText={`View all books similar to ${props.secondBook}`} classes="text-left f-09 latoR grGreen"/>
            <Divider sx={{p:"10px 0"}}/>
        </>
        
    )
}