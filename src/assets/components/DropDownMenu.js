import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import DropDownElement from './DropDownElement.js';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';


const useStyles = makeStyles({
  button: {
    background: 'inherit',
    color: '#382110',
    textTransform: "none"
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

  return (
    <>
      <Button
        className = {classes.button}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack direction="row">
            <DropDownElement hrefs={props.hrefs} />
            {props.hrefsLeftSide && (
              <>
                <Divider orientation="vertical" flexItem></Divider>
                <DropDownElement hrefs={props.hrefs} bgColor="#F6F6F6" />
              </>
            )}
        </Stack>
      </Menu>
    </>
  );
}

