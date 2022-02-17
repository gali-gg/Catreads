import { makeStyles } from '@mui/styles';
import "./styles.css";

const useStyles = makeStyles({
    title: {
        fontSize: "0.9em",
        textTransform: "uppercase",
        margin: "5px 0",
        color: "#767676",
        fontFamily: "Lato Bold",
    },
});


export default function Title(props){
    const classes = useStyles();

    return (
        <span 
            className={`${props.className || classes.title}`} 
            style={{color: props.color}}
        >{props.title}</span>
    );
}