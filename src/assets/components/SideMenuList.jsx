import { Stack } from "@mui/material";
import GenreTitle from "./GenreTitle";
import { makeStyles } from "@mui/styles";
import GoodLink from "./GoodLink";

const useStyles = makeStyles({
    downLink: {
        marginTop: "10px",
        float: "right",
    },
  });

export default function SideMenulist(props){
    const classes = useStyles();
    return (
        <Stack >
            <GenreTitle title={props.title} link={props.link}/>
            <Stack direction="row" justifyContent="space-between">
                <Stack>
                    {props.hrefs.map(href => 
                        <GoodLink key={href} classes="latoR grGreen" titleText={href}/>
                    )}
                </Stack>
                {props.dividedHrefs && 
                    <Stack>
                        {props.secondHrefs.map(href => 
                            <GoodLink key={href} classes="latoR grGreen" titleText={href}/>
                        )}
                    </Stack>}
            </Stack>
            <GoodLink classes={`${classes.downLink} latoB grGreen`} titleText={props.downLink} />
        </Stack>
    );
}