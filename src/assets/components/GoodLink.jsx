import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import {Link as RouterLink} from "react-router-dom";
import "./css/styles.css"

const useStyles = makeStyles({
    disabled: {
        cursor: "not-allowed"
    }
});

export default function GoodLink (props) {
    const classes = useStyles();
    return(
        <RouterLink to={props.to || ""}>
            <Link component="button" underline="hover" className={`${props.classes} ${!props.to && !props.onClick ? classes.disabled : ""}`} fontSize={props.size} onClick={props.onClick} style={{...props.style}} title={props.titleInfo} id={props.id}>
                {props.titleText}
            </Link>
        </RouterLink>
    );
}