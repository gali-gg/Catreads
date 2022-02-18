import * as React from 'react';
import StyledRouterLink from './StyledRouterLink';
import Title from './Title';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import "./styles.css";
import { useDispatch } from 'react-redux';
import * as userAction from "../../redux/actions/userAction"

const useStyles = makeStyles({
    link: {
        fontSize: "0.9em",
        textDecoration: 'inherit',
        color : "inherit",
        textTransform: "none",
          '&:hover': {
            textDecoration : "underline",
            cursor: "pointer"
          },
    },
    title: {
        margin:0,
        textTransform: "uppercase",
    }
});

export default function BoxFlex(props){
    let bgColor = props.bgColor;
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleAction = (action) => {
        dispatch(userAction.logoutAction);
    }
    return(
        <Stack
            direction = "column"
            spacing={2}
            sx={{
                padding: "5px 10px 20px 10px",
                background: bgColor
            }}
        >   
            {props.userName && <Title title={props.userName}  className ={`${classes.title} latoR`}></Title>}
            {props.hrefs.map(link => {
                if (link.dispatch){
                    return (
                        <span 
                            key={link.title}
                            className = {`${classes.link} latoR`} 
                            onClick={() => handleAction(link.action)}
                        >
                            {link.title}
                        </span>
                    )
                }
                else{
                    return (
                    <StyledRouterLink 
                        className = {`${classes.link} latoR`}
                        key={link.title} 
                        title={link.title} 
                        href={link.href || ""} 
                    />
                    )
                }
            })}
        </Stack>
    );
}