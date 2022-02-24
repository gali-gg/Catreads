import { Stack } from "@mui/material";
import GenreTitle from "./GenreTitle";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import GoodLink from "./GoodLink";

const useStyles = makeStyles({
    downLink: {
        marginTop: "10px",
        float: "right",
    },
    link:{
        padding: "3px 0",
        "&:hover":{
            textDecoration: "underline",
            cursor: "pointer"
        }
    }
  });

export default function SideMenulist(props){
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Stack >
            <GenreTitle title={props.title} link={props.link}/>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Stack>
                    {props.hrefs.map(href => 
                        <span 
                            key={href} 
                            className={`${classes.link} latoR grGreen f-09`} 
                            onClick={() => navigate(`/genres/${href}`)}
                        >{href}</span>
                    )}
                </Stack>
                {props.dividedHrefs && 
                    <Stack>
                        {props.secondHrefs.map(href => 
                            <span 
                            key={href} 
                            className={`${classes.link} latoR grGreen f-09`} 
                            onClick={() => navigate(`/genres/${href}`)}
                        >{href}</span>
                        )}
                    </Stack>}
            </Stack>
            <GoodLink classes={`${classes.downLink} latoB grGreen`} titleText={props.downLink} />
        </Stack>
    );
}