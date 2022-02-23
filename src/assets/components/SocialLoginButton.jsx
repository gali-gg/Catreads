import styles from "./css-modules/socialbtn.module.css"

export default function SocialLoginButton (props) {
    return (
        <button className={`${styles[props.type]} ${styles.btn} ${props.className}`} onClick={props.onClick}>
            {props.type !== "regular" ? <><div className={styles[props.type+"Icon"]}></div>
            Continue with {props.type[0].toUpperCase() + props.type.slice(1)}</>
            : "Sign up with email"}
        </button>
    );
}

