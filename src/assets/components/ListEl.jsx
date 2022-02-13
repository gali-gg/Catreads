import GoodLink from "./GoodLink";
import { makeStyles } from '@mui/styles';
import StyledRouterLink from "./StyledRouterLink";
import { Stack } from "@mui/material";


const useStyles = makeStyles({
    link: {
        fontSize : "0.9em",
        color : "#382110",
        textDecoration : "none",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    title: {
        textTransform: "uppercase",
        color: "darkgray",
        fontWeight: 500
    },
    icon: {
        cursor: "pointer",
        marginRight: "10px"
    }
});


export default function ListEl(props){
    const classes = useStyles();

    return(
        <Stack direction="column">
            <h4 className={classes.title}>{props.title}</h4>
            
            <Stack direction="row">
                {props.icons && props.icons.map(icon => (
                    <img key={icon} src={icon} className={classes.icon}></img>   
                ))}
            </Stack>
            <Stack direction={props.direction}>
                {props.hrefs && props.hrefs.map(href => (
                    <StyledRouterLink key={href} title={href} href={"/" + href.toLowerCase()} className={classes.link}></StyledRouterLink>
                ))}
            </Stack>
        </Stack>
    )
}