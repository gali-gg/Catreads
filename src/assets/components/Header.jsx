import * as React from 'react';
import "./css/styles.css";
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import DropDownMenu from "./DropDownMenu";
import Stack from '@mui/material/Stack';
import StyledRouterLink from './StyledRouterLink';
import GoodReadsLogo from './GoodReadsLogo';
import { useSelector } from 'react-redux';
import { browseHrefs, communityHrefs, profileHrefsFirst, profileHrefsSecond } from '../../data/hrefs';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
    stackHeader: {
        background: "#f4f1ea",
        padding: 0,
    }
});


export const Header = function Header(props) {
    const classes = useStyles();
    const user = useSelector(state => state.userData);
    if (props.logged) {
        return (
            <Stack
                className={classes.stackHeader}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <GoodReadsLogo width="140px" />
                <Stack direction="row" spacing={2}>
                    <NavButton><StyledRouterLink href="/home" title="Home" /></NavButton>
                    <NavButton><StyledRouterLink href="/myBooks" title="My Books" /></NavButton>
                    <DropDownMenu title="Browse" hrefs={browseHrefs} hrefsLeftSide={true} />
                    <DropDownMenu title="Community" hrefs={communityHrefs} />
                </Stack>
                <SearchBox />
                <Stack direction="row">
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_notifications.svg" />
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_discussions.svg" />
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_msgs.svg" />
                    <NavButton src="https://s.gr-assets.com/assets/layout/header/icn_nav_friend.svg" />
                    <DropDownMenu
                        src={user.avatar}
                        userName={`${user.name.first} ${user.name.last ? user.name.last : ""}`}
                        hrefs={profileHrefsFirst}
                        hrefsSecond={profileHrefsSecond}
                        side="right"
                    />
                </Stack>
            </Stack>
        )
    }
    else {
        return null;
    }
};