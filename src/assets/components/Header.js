import * as React from 'react';
import "./styles.css";
import SearchBox from './SearchBox.js'
import NavButton from './NavButton.js'
import DropDownMenu from "./DropDownMenu.js";
import Stack from '@mui/material/Stack';
import StyledRouterLink from './StyledRouterLink';
import GoodReadsLogo from './GoodReadsLogo';


const browseHrefs = [
    "Recommendations",
    "Choice Awards",
    "Giveaways",
    "New Releases",
    "Lists",
    "Explore",
    "News & Interviews"
];

const communityHrefs = [
    "Groups",
    "Discussions",
    "Quotes",
    "Ask the Author",
    "Trivia",
    "Quizzes",
    "Creative Writing",
    "People"
];
export default function Header(){
    return (
        <Stack
            className="stackHeader"
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
           <GoodReadsLogo height="50px" width="140px"/>
            <nav>
                <NavButton><StyledRouterLink href="/home" title="Home" /></NavButton>
                <NavButton><StyledRouterLink href="/myBooks" title="My Books" /></NavButton>
                <DropDownMenu title="Browse" hrefs={browseHrefs} hrefsLeftSide={true}></DropDownMenu>
                <DropDownMenu title="Community" hrefs={communityHrefs}></DropDownMenu>
            </nav>
            <SearchBox></SearchBox>
            <ul>
                <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_notifications.svg"></NavButton>
                <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_discussions.svg"></NavButton>
                <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_msgs.svg"></NavButton>
                <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_friend.svg"></NavButton>
                <NavButton src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"></NavButton>
            </ul>
        </Stack>
    )
}