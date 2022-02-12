import * as React from 'react';
import StyledRouterLink from './StyledRouterLink';
import { Stack } from '@mui/material';

export default function BoxFlex(props){
    let bgColor = props.bgColor;
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
                     key={link} 
                     title={link} 
                     href={"/"+link.toLowerCase()} 
                />
            ))}
        </Stack>
    );
}