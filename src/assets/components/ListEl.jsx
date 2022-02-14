import { makeStyles } from '@mui/styles';
import StyledRouterLink from "./StyledRouterLink";
import { Stack } from "@mui/material";
import FooterCopy from "./FooterCopy";
import Title from "./Title";
import "./styles.css";

const useStyles = makeStyles({
    link: {
        fontSize : "0.9em",
        color : "#382110",
        textDecoration : "none",
        margin: "2px",
        "&:hover": {
            textDecoration: "underline",
        }
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
            <Title title={props.title}></Title>
            
            <Stack direction="row" sx={{mb: "10px"}}>
                {props.icons && props.icons.map(icon => (
                    <img key={icon} src={icon} className={classes.icon}></img>   
                ))}
            </Stack>

            {props.copyRight && <FooterCopy fontSize="0.9em" className="grBlack latoR"/>}

            <Stack direction={props.direction}>
                {props.hrefs && props.hrefs.map(href => (
                    <StyledRouterLink 
                        key={href} 
                        title={href} 
                        href={"/" + href.toLowerCase()} 
                        className={classes.link}>
                    </StyledRouterLink>
                ))}
                
            </Stack>
        </Stack>
    )
}