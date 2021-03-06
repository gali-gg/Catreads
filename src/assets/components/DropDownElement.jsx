import * as React from 'react';
import StyledRouterLink from './StyledRouterLink';
import Title from './Title';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import "./css/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from "../../redux/actions/userAction"
import { getFromStorageAndParse, setStorage } from '../../utility';
import { clearShelvesAction } from '../../redux/actions/shelfAction';
import { useNavigate } from 'react-router-dom';
import { clearActivitiesAction } from '../../redux/actions/activitiesAction';

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
    const shelves = useSelector(state => state.shelves);
    const userActivity = useSelector(state => state.activities);
    const navigate = useNavigate();

    const handleAction = () => {
        dispatch(userAction.logoutAction);
        navigate("/");
        let newUsers = allUsers.map(someUser => {
            let newUser = someUser;
            if(someUser.id === user.id){
                let {logged, id, name, ...restUser} = user;
                newUser ={...someUser, ...restUser, shelves: shelves, details: {...someUser.details, names: {...name}}, activities: userActivity};
            }
            return newUser;
        })
        setStorage("users", JSON.stringify(newUsers));
        dispatch(clearShelvesAction());
        dispatch(clearActivitiesAction());
    }
    return (
        <Stack
            flexWrap="wrap"
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
                            onClick={() => handleAction()}
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