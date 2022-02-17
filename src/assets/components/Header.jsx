import * as React from 'react';
import "./styles.css";
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import DropDownMenu from "./DropDownMenu";
import Stack from '@mui/material/Stack';
import StyledRouterLink from './StyledRouterLink';
import GoodReadsLogo from './GoodReadsLogo';
import {useSelector, useDispatch} from 'react-redux'
import store from '../../redux/store';
import * as userAction from "../../redux/actions/userAction"

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

const profileHrefsFirst = [
    "Profile",
    "Friends",
    "Groups",
    "Discussions",
    "Comments",
    "Reading Challenge",
    "Kindle Notes & Highlights",
    "Quotes",
    'Favorite genres',
    "Friends’ recommendations",
];

const profileHrefsSecond = [
    "Account settings",
    "Help",
    "Sign out",
];

export const Header = function Header (props){
    const name = useSelector(state => state.userData.name.first);
    if(props.logged){
        return (
            <Stack
                className="stackHeader"
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ borderBottom: "2px solid #ddd", maxHeight: "50px" }}
            >
               <GoodReadsLogo  width="140px"/>
                <Stack direction="row" spacing={2}>
                    <NavButton><StyledRouterLink href="/home" title="Home" /></NavButton>
                    <NavButton><StyledRouterLink href="/myBooks" title="My Books" /></NavButton>
                    <DropDownMenu title="Browse" hrefs={browseHrefs} hrefsLeftSide={true}></DropDownMenu>
                    <DropDownMenu title="Community" hrefs={communityHrefs}></DropDownMenu>
                </Stack>
                <SearchBox></SearchBox>
                <ul>
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_notifications.svg"></NavButton>
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_discussions.svg"></NavButton>
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_msgs.svg"></NavButton>
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_friend.svg"></NavButton>
                    <DropDownMenu
                        src="https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png"
                        userName={name}
                        hrefs={profileHrefsFirst}
                        hrefsSecond={profileHrefsSecond}
                        side="right"
                    >
                    </DropDownMenu>

                </ul>
            </Stack>
        )
    }
    else {
        return null;
    }
};