import * as React from 'react';
import StyledRouterLink from './StyledRouterLink';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/material';

const useStyles = makeStyles({
    link: {
        fontSize: "0.9em",
        textDecoration: 'inherit',
        color : "inherit",
        textTransform: "none",
          '&:hover': {
            textDecoration : "underline",
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