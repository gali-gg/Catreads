import "./styles.css";
import styles from "./css-modules/goodbutton.module.css"

export default function GoodButton (props) {
    return (
        <button onClick={props.onClick} className={`${styles.btn} grBlack latoR`} style={{...props.style, fontSize: props.fontSize, padding: props.padding}}>
              {props.title}
        </button>
    );
}