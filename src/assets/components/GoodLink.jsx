import Link from '@mui/material/Link';
import {Link as RouterLink} from "react-router-dom";
import "./styles.css"

export default function GoodLink (props) {
    return(
        <RouterLink to={props.to ||}>
            <Link component="button" underline="hover" className={props.classes} fontSize={props.size}>
                {props.titleText}
            </Link>
        </RouterLink>
    );
}