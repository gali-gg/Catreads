import { Stack } from "@mui/material";
import ListEl from "./ListEl";
import React from "react";

const companyHrefs = [
    "About us",
    "Careers",
    "Terms",
    "Privacy",
    "Interest Based Ads",
    "Ad Preferences",
    "Help",
];
const workHrefs = [
    "Authors",
    "Advertise",
    "Authors & ads blog",
    "API",
];
const connectIconHrefs = [
    "https://s.gr-assets.com/assets/site_footer/footer_facebook-ea4ab848f8e86c5f5c98311bc9495a1b.svg",
    "https://s.gr-assets.com/assets/site_footer/footer_twitter-126b3ee80481a763f7fccb06ca03053c.svg",
    "https://s.gr-assets.com/assets/site_footer/footer_instagram-d59e3887020f12bcdb12e6c539579d85.svg",
    "https://s.gr-assets.com/assets/site_footer/footer_linkedin-5b820f4703eff965672594ef4d10e33c.svg",
];
const mediaIconsHrefs = [
    "https://s.gr-assets.com/assets/app/badge-ios-desktop-homepage-6ac7ae16eabce57f6c855361656a7540.svg",
    "https://s.gr-assets.com/assets/app/badge-android-desktop-home-0f517cbae4d56c88a128d27a7bea1118.png",
];
const mediaHrefs = [
    "Mobile version",
] ;

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
