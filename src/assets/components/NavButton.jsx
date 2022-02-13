import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    button: {
        borderRadius: 0,
        padding: '15px 5px',
        color: "#382110",
        fontSize: "1em",
        background: "none",
            '&:hover': {
                background: "#382110",
                color: "white"
            },
    },
    icon:{
        height: 30,
        border: "none",
        borderRadius: "25px",
        background: "none"
    }
    
  });


export default function NavButton(props){
    const classes = useStyles();
    return (
        <Button className={classes.button} onClick={props.onClick}>
            {props.children}
            <img className={classes.icon} src={props.src}></img>
        </Button>
    );
}