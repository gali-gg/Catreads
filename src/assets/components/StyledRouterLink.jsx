import * as React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import "./styles.css";


const useStyles = makeStyles({
    link: {
        textDecoration: 'inherit',
        color : "inherit",
        textTransform: "none"
    }
});

export default function StyledRouterLink(props){
    const classes = useStyles();

    return(
        <Link 
            className={`${props.className || classes.link} latoR`}
            to={props.href} onClick={props.onClick}
        >
            {props.title}
        </Link>
    )
}
