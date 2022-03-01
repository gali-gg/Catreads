import { Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import "./css/styles.css";
import StyledRouterLink from "./StyledRouterLink";
import X from "../images/X.png";
import { useState } from "react";
import Moment from "react-moment";
import Title from "./Title";


const useStyles = makeStyles({
    container: {
        borderBottom: "1px solid #ddd",
        padding: "10px 0 15px 0",
        width: "720px",
    },
    userName: {
        padding: "20px 0",
        background: "#daf",
        minHeight: "80vh",
        maxWidth: "900px",
        margin: "auto",
    },
    links: {
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    X: {
        alignSelf: "flex-end",
        paddingBottom: "10px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    pointer: {
        cursor: "pointer"
    }
});

export default function UserShelfLayout(props) {
    const [isClosed, setIsClosed] = useState(false);
    const classes = useStyles();
    const user = useSelector(state => state.userData);

    const handleClose = () => {
        setIsClosed(true);
    }

    return !isClosed && (
        <Stack direction="row" flexWrap="wrap" className={classes.container} justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center" sx={{ gap: "5px" }}>
                <StyledRouterLink
                    className={`${classes.links} latoB f-09 grGreen`}
                    href="/user"
                    title={user.name.first}
                />
                <span className="latoR f-08">{props.doing}</span>
            </Stack>
            <Title title={props.shelfName} />
            <span className="latoR grGrey f-1">
                <Moment format="D MMM, YYYY HH:mm A">{props.date}</Moment>
            </span>
            <img src={X} alt="close-icon" width="10" height="10" onClick={handleClose} className={classes.X} />
        </Stack>
    )
}