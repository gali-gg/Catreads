import { makeStyles } from '@mui/styles';
import "./css/styles.css";

const useStyles = makeStyles({
    button: {
        border: "none",
        borderRadius: 0,
        letterSpacing: "0em",
        padding: '9px 5px',
        color: "#382110",
        fontSize: "1em",
        background: "none",
        '&:hover': {
            background: "#382110",
            color: "white"
        },
    },
    icon: {
        height: "30px",
        margin: "0 10px",
        border: "none",
        borderRadius: "25px",
        background: "none",
    }

});


export default function NavButton(props) {
    const classes = useStyles();
    return (
        <button className={`${classes.button} latoR`} onClick={props.onClick}>
            {props.children}
            {props.src && <img className={classes.icon} src={props.src} alt="icons" />}
        </button>
    );
}