import * as React from 'react';
import { Link } from "react-router-dom";

export default function StyledRouterLink(props){
    return(
        <Link 
            style={{
                textDecoration: 'inherit',
                color : "inherit",
                textTransform: "none"
            }} 
            to={props.href}
        >
            {props.title}
        </Link>
    )
}
