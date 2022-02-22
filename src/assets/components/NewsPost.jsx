import { Stack } from "@mui/material";
import Title from "./Title";
import { makeStyles } from '@mui/styles';
import GoodLink from "./GoodLink";
import "./styles.css";


const useStyles = makeStyles({
    container: {
        marginLeft: "25px",
        border: "1px solid #ddd",
        background: "white",
    },
    textContainer:{
        margin: "10px"
    }

});

export default function Post(props){
    const classes = useStyles();

    return(
        <Stack direction="column" className={classes.container}>
            <img src={props.src} alt={`${props.title}-img`}></img>
            <Stack className={classes.textContainer} spacing={0}>
                <GoodLink titleText={props.title} classes="grBrown meriR f-1"></GoodLink>
                <Title title={props.subTitle} className="meriR f-09 grGrey"></Title>
            </Stack>
        </Stack>
    )
} 