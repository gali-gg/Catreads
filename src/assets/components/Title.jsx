import { makeStyles } from '@mui/styles';
import "./styles.css";

const useStyles = makeStyles({
    title: {
        fontSize: "0.9em",
        textTransform: "uppercase",
        margin: "5px 0",
    },
});


export default function Title(props){
    const classes = useStyles();

    return (
        <p 
            className={`${props.className || classes.title} latoB grGrey`} 
            style={{color: props.color}}
        >{props.title}</p>
    );
}