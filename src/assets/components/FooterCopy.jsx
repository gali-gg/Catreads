import "./css/styles.css";

export default function FooterCopy (props) {
    const date = new Date();

    return (
        <span className={props.className || "grGrey latoR"} style={{fontSize: props.fontSize || "12px"}}> &copy; {date.getFullYear()} Goodreads, Inc</span>
    );
}