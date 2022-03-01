import "./css/styles.css";
import styles from "./css-modules/goodbutton.module.css"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    disabled: {
        cursor: "not-allowed"
    }
});

export default function GoodButton (props) {
    const classes = useStyles();

    let buttonStyles = styles.btn;
    if(props.disabled){
        buttonStyles=styles.buttonNormal;
    }
    return (
        <button disabled={props.disabled || false} onClick={props.onClick} className={`${buttonStyles} ${props.className} ${!props.onClick ? classes.disabled : ""}`} style={{...props.style, fontSize: props.fontSize, padding: props.padding || "8px 12px"}}>
              {props.title}
        </button>
    );
}