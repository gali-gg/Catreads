import * as React from 'react';
import Menu from '@mui/material/Menu';
import DropDownElement from './DropDownElement';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';
import SubDownMenu from './SubDownMenu';
import "./css/styles.css";
import { useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const useStyles = makeStyles({
  notClickedButton: {
    border:"none",
    display: "flex",
    alignItems: "center",
    fontSize: "1em",
    borderRadius: 0,
    background: "none",
    color: "#382110",
    textTransform: "none",
    padding: '13px 5px',
        '&:hover': {
            background: "#382110",
            color: "white"
        },
  },
  clickedButton: {
    border:"none",
    display: "flex",
    alignItems: "center",
    fontSize: "1em",
    background: "#382110",
    color: "white",
    borderRadius: 0,
    textTransform: "none",
    padding: '13px 5px',
  },
  icon:{
    height: 30,
    width: 30,
    objectFit: "cover",
    border: "none",
    borderRadius: "25px",
    margin: "0 10px",
    background: "none"
  },
});

export default function BasicMenu(props) {
  const classes = useStyles();
  const user = useSelector(state => state.userData);
  const genres = useSelector(state => state.genres.genres);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let side = props.side || "left";

  const [favGenres, setFavGenres] = React.useState(null);

  React.useEffect(() => {
    if(genres.length > 0 && user){
      let allFavouriteGenres = user.favouriteGenres.map( genre => {
        let name = genres.find(g => g.uuid === genre).genre;
        return {
          title: name, 
          href: `/genres/${name}`}
      });
      allFavouriteGenres.push({
        title: "All genres",
         href: `/genres`
        });
      setFavGenres(allFavouriteGenres);
    }
  }, [genres, user]);

  return (
    <>
        <button
          className = {`${anchorEl ? classes.clickedButton :  classes.notClickedButton} latoR`}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {props.title ? 
            <>
              {props.title} 
              <ArrowDropDownIcon />
            </>  
            :
            (<img src={props.src} className={classes.icon} alt="header-icon" />)}
          
        </button>

      <Menu
        style={{padding:0}}
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
        <Stack direction={props.hrefsSecond ? "column" : "row"} flexWrap="wrap">
            <DropDownElement hrefs={props.hrefs} title={props.userName} titleSize={"1em"}/>
            {props.hrefsLeftSide && user && genres && favGenres &&(
              <SubDownMenu 
                orientation="vertical" 
                bgColor="#F6F6F6" 
                hrefs={favGenres}  
                title="Favourite genres" 
                titleSize={"0.8em"}
              />
            )}
            {props.hrefsSecond && (
              <SubDownMenu hrefs={props.hrefsSecond}/>
            )}
        </Stack>
      </Menu>
    </>
  );
}

