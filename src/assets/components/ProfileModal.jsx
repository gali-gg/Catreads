import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./styles.css";
import { Stack } from '@mui/material';
import DropPreview from "./DropPreview"
import { changeNameAction } from '../../redux/actions/userAction';
import { useDispatch } from 'react-redux';


export default function ProfileModal(props) {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = React.useState(null);
    const [middleName, setMiddleName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [isNameErrorShow, setIsNameErrorShow] = React.useState(false);

    const submitForm = () => {
        if(firstName.length > 2){
            setIsNameErrorShow(false);
            dispatch(changeNameAction(firstName, middleName, lastName));
            props.onClose();
        }else{
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
                <Stack direction="row" spacing={4}>
                    <Stack direction="column" spacing={1} padding="10px 0" wrap="FlexWrap" sx={{width:"200px"}}>
                        {isNameErrorShow && <span style={{color:"red"}}>First name shoud be at least 3 characters</span>}
                        <label className="grGrey latoR f-09">First Name:</label>
                        <input 
                            type="text" 
                            value={firstName} 
                            onChange={(ev) => setFirstName(ev.target.value.trim()) }
                        ></input>

                        <label className="grGrey latoR f-09">Middle Name:</label>
                        <input 
                            type="text" 
                            value={middleName}
                            onChange={(ev) => setMiddleName(ev.target.value.trim()) }
                        ></input>

                        <label className="grGrey latoR f-09">Last Name:</label>
                        <input 
                            type="text" 
                            value={lastName}
                            onChange={(ev) => setLastName(ev.target.value.trim()) }
                        ></input>
                    </Stack>
                    <DropPreview></DropPreview>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={submitForm}>Submit</Button>
            </DialogActions>
        </>
    );
}
