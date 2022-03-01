import * as React from 'react';
import Divider from '@mui/material/Divider';
import DropDownElement from './DropDownElement';

export default function SubDownMenu(props) {
    return (
        <>
            <Divider orientation={props.orientation || undefined} flexItem></Divider>
            <DropDownElement
                hrefs={props.hrefs}
                bgColor={props.bgColor || ""}
                title={props.title || undefined}
                titleSize={props.titleSize || undefined}
            />
        </>
    )
}