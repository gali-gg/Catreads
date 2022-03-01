import * as React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import "./css/styles.css";


const useStyles = makeStyles({
    link: {
        textDecoration: 'inherit',
        color: "inherit",
        textTransform: "none",
        cursor: "pointer"
    },
    disabled: {
        cursor: "not-allowed"
    }
});

export default function StyledRouterLink(props) {
    const classes = useStyles();

    return (
        <Link
            className={`${props.className} latoR ${(props.href ? classes.link : classes.disabled)} `}
            to={props.href || "#"} onClick={props.onClick}
        >
            {props.title}
        </Link>
    )
}
