import { Divider, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GoodLink from "./GoodLink";
import Title from "./Title";


const useStyles = makeStyles({
    title: {
        textTransform: "uppercase",
        "&:hover":{
            textDecoration: "underline",
            cursor: "pointer"
        }
    },
    divider: {
        margin: "5px 0 5px 0",
    }
  });

export default function GenreTitle(props){
    const classes = useStyles();

    return(
        <>
            <Stack 
                direction="row" 
                justifyContent="flex-start"
                alignItems="center" 
                spacing={props.together ? 1 : 16}
            >
                <Title title={props.title} className={`${classes.title} latoB f-08 grBrown`} onClick={props.onClick}/>
                {props.link && <GoodLink classes="latoR grGrey f-08" titleText={props.link} to={props.to || ""}/>}
            </Stack>
            <Divider className={classes.divider}/>
        </>
    )
}