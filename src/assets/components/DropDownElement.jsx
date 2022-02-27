import * as React from 'react';
import StyledRouterLink from './StyledRouterLink';
import Title from './Title';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import "./css/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from "../../redux/actions/userAction"
import { getFromStorageAndParse, setStorage } from '../../utility';

const useStyles = makeStyles({
    container: {
        padding: "5px 10px 20px 10px",
    },
    link: {
        fontSize: "0.9em",
        textDecoration: 'inherit',
        color: "inherit",
        textTransform: "none",
        '&:hover': {
            textDecoration: "underline",
            cursor: "pointer"
        },
    },
    title: {
        margin: 0,
        textTransform: "uppercase",
    }
});

export default function BoxFlex(props) {
    let bgColor = props.bgColor;
    const user = useSelector(state => state.userData);
    const allUsers = getFromStorageAndParse("users");
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleAction = (action) => {
        dispatch(userAction.logoutAction);
        
        let newUsers = allUsers.map(someUser => {
            let newUser = someUser;
            if(someUser.id === user.id){
                newUser ={...someUser, ...user};
            }
            return newUser;
        })
        setStorage("users", JSON.stringify(newUsers));
        localStorage.removeItem("loggedUser");
    }
    return (
        <Stack
            wrap="flexWrap"
            direction="column"
            sx={{ background: bgColor }}
            spacing={2}
            className={classes.container}
        >
            {props.title && 
                <Title 
                    title={props.title} 
                    className={`${classes.title} latoB grBrown`} 
                    fontSize={props.titleSize} 
                />}
            {props.hrefs.map(link => {
                if (link.dispatch) {
                    return (
                        <span
                            key={link.title}
                            className={`${classes.link} latoR`}
                            onClick={() => handleAction(link.action)}
                        >
                            {link.title}
                        </span>
                    )
                }
                else {
                    return (
                        <StyledRouterLink
                            className={`${classes.link} latoR`}
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