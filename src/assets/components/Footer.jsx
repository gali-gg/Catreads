import { Stack } from "@mui/material";
import ListEl from "./ListEl";
import React from "react";
import { companyHrefs, connectIconHrefs, mediaHrefs, mediaIconsHrefs, workHrefs } from "../../data/hrefs";
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
    footer: {
        fontSize: "0.95em",
        padding: "10px 0 60px 0",
        alignItems: "flex-start",
        background: "#F9F8F4",
        flexWrap: "wrap"
    },
});

export const Footer = React.memo(function Footer(props) {
    const classes = useStyles();
    return (
        <Stack direction={props.direction} className={classes.footer} width={props.width || "auto"} justifyContent={props.width ? "flex-start" : "space-around"}>
            <Stack direction="row" spacing={6} flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start">
                <ListEl titleColor={props.titleColor} hrefs={companyHrefs} title="Company" direction="column" />
                <ListEl titleColor={props.titleColor} hrefs={workHrefs} title="Work with us" direction="column" />
                <ListEl titleColor={props.titleColor} icons={connectIconHrefs} title="Conect" direction="row" />
            </Stack>
            <ListEl icons={mediaIconsHrefs} hrefs={mediaHrefs} copyRight={true} direction="column" />
        </Stack>
    )
}
);
