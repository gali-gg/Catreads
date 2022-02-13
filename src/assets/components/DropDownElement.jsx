import * as React from 'react';
import StyledRouterLink from './StyledRouterLink';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';

const useStyles = makeStyles({
    notClickedButton: {
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
});

export default function BoxFlex(props){
    let bgColor = props.bgColor;
    const classes = useStyles();
    return(
        <Stack
            direction = "column"
            spacing={2}
            sx={{
                padding: "5px 10px 20px 10px",
                background: bgColor
            }}
        >
            {props.hrefs.map(link => (
                <StyledRouterLink 
                    className = {classes.link}
                    key={link} 
                    title={link} 
                    href={"/"+link.toLowerCase()} 
                />
            ))}
        </Stack>
    );
}