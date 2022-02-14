import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import DropDownElement from './DropDownElement';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import SubDownMenu from './SubDownMenu';
import "./styles.css";

const useStyles = makeStyles({
  notClickedButton: {
    fontSize: "1em",
    borderRadius: 0,
    background: "none",
    color: "#382110",
    textTransform: "none",
    padding: '15px 5px',
        '&:hover': {
            background: "#382110",
            color: "white"
        },
  },
  clickedButton: {
    fontSize: "1em",
    background: "#382110",
    color: "white",
    borderRadius: 0,
    textTransform: "none",
    padding: '15px 5px',
  },
  icon:{
    height: 30,
    border: "none",
    borderRadius: "25px",
    padding: 0,
    background: "none"
  },
});

export default function BasicMenu(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let side = props.side || "left";

  return (
    <>
        <Button
          className = {`${anchorEl ? classes.clickedButton :  classes.notClickedButton} latoR`}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {props.title  || (<img src={props.src} className={classes.icon}></img>)}
        </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: side,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: side ,
        }}
      >
        <Stack direction={props.hrefsSecond ? "column" : "row"}>
            <DropDownElement hrefs={props.hrefs} userName={props.userName}/>
            {props.hrefsLeftSide && (
              <SubDownMenu orientation="vertical" bgColor="#F6F6F6" hrefs={props.hrefs} />
            )}
            {props.hrefsSecond && (
              <SubDownMenu hrefs={props.hrefsSecond} />
            )}
        </Stack>
      </Menu>
    </>
  );
}

