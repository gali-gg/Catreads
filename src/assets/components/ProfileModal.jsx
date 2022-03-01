import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./css/styles.css";
import { Stack } from '@mui/material';
import DropPreview from "./DropPreview"
import { changeNameAction } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    input: {
        border: "1px solid #ccc",
        borderRadius: "3px",
        padding: "5px"
    },
    error: {
        color: "red",
    },
    button: {
        border: "1px solid #D6D0C4",
        background: "#F4F1EA",
        padding: "5px 20px",
        color: "#333",
        borderRadius: "3px",
        textTransform: "none",
        "&:hover": {
            background: "#ede6d6",
            cursor: "pointer"
        }
    }
});

export default function ProfileModal(props) {
    const classes = useStyles();
    const userName = useSelector(state => state.userData.name);

    const dispatch = useDispatch();
    const [firstName, setFirstName] = React.useState(userName.first);
    const [middleName, setMiddleName] = React.useState(userName.middle || undefined);
    const [lastName, setLastName] = React.useState(userName.last || undefined);
    const [aboutMe, setAboutMe] = React.useState(null);
    const [isNameErrorShow, setIsNameErrorShow] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [isSubmit, setIsSubmit] = React.useState(false);

    const submitForm = () => {
        if (firstName) {
            if (firstName.length > 2) {
                setIsNameErrorShow(false);
                setIsSubmit(true);
                dispatch(changeNameAction(firstName, middleName, lastName));
                props.onClose();
            } else {
                setErrorMessage("First name shoud be at least 3 characters!");
                setIsNameErrorShow(true);
            }
        } else {
            setErrorMessage("First name is required field!");
            setIsNameErrorShow(true);
        }
    }
    return (
        <>
            <DialogTitle className="meriB grBrown">Account settings</DialogTitle>
            <DialogContent>
                <DialogContentText className="latoB grBrown f-1">
                    Change you name
                </DialogContentText>
                <Stack direction="row" spacing={4} alignItems="center">
                    <Stack direction="column" spacing={1} padding="10px 0" wrap="FlexWrap" sx={{ width: "200px" }}>
                        {isNameErrorShow && <span className={`${classes.error} latoB`}>{errorMessage}</span>}
                        <label className="grGrey latoR f-09">
                            First Name :
                            <span className={classes.error} title="required field"> *</span>
                        </label>
                        <input
                            required
                            className={`${classes.input} latoR f-09`}
                            type="text"
                            value={firstName}
                            onChange={(ev) => setFirstName(ev.target.value.trim())}
                        ></input>

                        <label className="grGrey latoR f-09">Middle Name:</label>
                        <input
                            className={`${classes.input} latoR f-09`}
                            type="text"
                            value={middleName}
                            onChange={(ev) => setMiddleName(ev.target.value.trim())}
                        ></input>

                        <label className="grGrey latoR f-09">Last Name:</label>
                        <input
                            className={`${classes.input} latoR f-09`}
                            type="text"
                            value={lastName}
                            onChange={(ev) => setLastName(ev.target.value.trim())}
                        ></input>
                    </Stack>
                    <DropPreview isSubmit={isSubmit}></DropPreview>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ margin: "auto" }}>
                <Button className={`${classes.button} latoR`} onClick={props.onClose} disableRipple>Cancel</Button>
                <Button className={`${classes.button} latoR`} onClick={submitForm} disableRipple>Submit</Button>
            </DialogActions>
        </>
    );
}
