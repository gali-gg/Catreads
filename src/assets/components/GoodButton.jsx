import "./styles.css";
import styles from "./css-modules/goodbutton.module.css"

export default function GoodButton (props) {
    let buttonStyles = styles.btn;
    if(props.disabled){
        buttonStyles=styles.buttonNormal;
    }
    return (
        <button disabled={props.disabled || false} onClick={props.onClick} className={`${buttonStyles} ${props.className}`} style={{...props.style, fontSize: props.fontSize, padding: props.padding || "8px 12px"}}>
              {props.title}
        </button>
    );
}