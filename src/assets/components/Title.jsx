import { makeStyles } from '@mui/styles';
import "./css/styles.css";

const useStyles = makeStyles({
    title: {
        display: "inline-block",
        fontSize: "0.9em",
        textTransform: "uppercase",
        margin: "5px 0",
        color: "#767676",
        fontFamily: "Lato Bold",
    },
});


export default function Title(props) {
    const classes = useStyles();

    return (
        <span
            onClick={props.onClick}
            className={`${props.className || classes.title}`}
            style={{ color: props.color, fontSize: props.fontSize || "0.9em" }}
        >{props.title}</span>
    );
}