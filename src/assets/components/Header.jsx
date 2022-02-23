import * as React from 'react';
import "./styles.css";
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import DropDownMenu from "./DropDownMenu";
import Stack from '@mui/material/Stack';
import StyledRouterLink from './StyledRouterLink';
import GoodReadsLogo from './GoodReadsLogo';
import {useSelector} from 'react-redux';
import { browseHrefs, communityHrefs, profileHrefsFirst, profileHrefsSecond } from '../../data/hrefs';

export const Header = function Header (props){
    const name = useSelector(state => state.userData.name.first);
    const avatar = useSelector(state => state.userData.avatar);
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
                        src = {avatar}
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