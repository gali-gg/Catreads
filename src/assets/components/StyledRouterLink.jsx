import * as React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    link: {
        textDecoration: 'inherit',
        color : "inherit",
        textTransform: "none"
    },
});

export default function StyledRouterLink(props){
    const classes = useStyles();

    return(
        <Link 
            className={props.className || classes.link}
            to={props.href}
        >
            {props.title}
        </Link>
    )
}
