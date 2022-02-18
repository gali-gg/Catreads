import { Stack } from "@mui/material";
import ListEl from "./ListEl";
import React from "react";
import { companyHrefs, connectIconHrefs, mediaHrefs, mediaIconsHrefs, workHrefs } from "../../data/hrefs";

export const Footer = React.memo(function Footer(props){
        return (
            <Stack direction={props.direction} sx={{
                fontSize: "0.95em",
                width: props.width || "auto",
                padding: "10px 0 60px 0",
                justifyContent : props.width ? "flex-start" : "space-around",
                alignItems: "flex-start",
                background: "#F9F8F4",
                flexWrap: "wrap"
            }}>
                <Stack direction="row" spacing={6} flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start">
                    <ListEl titleColor={props.titleColor} hrefs={companyHrefs} title="Company" direction="column"></ListEl>
                    <ListEl titleColor={props.titleColor} hrefs={workHrefs} title="Work with us" direction="column"></ListEl>
                    <ListEl titleColor={props.titleColor} icons={connectIconHrefs} title="Conect" direction="row"></ListEl>
                </Stack>
                    <ListEl icons={mediaIconsHrefs} hrefs={mediaHrefs} copyRight={true} direction="column"></ListEl>
            </Stack>
        )
    }
);
