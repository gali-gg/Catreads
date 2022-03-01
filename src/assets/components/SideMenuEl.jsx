import Title from "./Title";
import SearchBox from "./SearchBox";
import GoodLink from "./GoodLink";
import Stack from '@mui/material/Stack';
import { Divider } from "@mui/material";
import "./css/styles.css";


export default function SideMenuEl(props){
    return (
        <>
            <Stack spacing={2}>
                <Title title={props.title} color="#382110"></Title>
                {props.imgSrc && props.text && 
                    <Stack direction="row" spacing={1} alignItems="center">
                        {props.imgSrc && <img src={props.imgSrc} alt={`${props.title}-img`}/>}
                    {props.text && <span className={props.textClass || "latoR grBrown"}>{props.text}</span>}
                    </Stack>
                }
                {props.searchBox && (<SearchBox width="250px" />)}

                {props.hrefs && (
                    <Stack direction="row" spacing={1}>
                        {props.hrefs.map(href => (<GoodLink classes="latoR grGreen" size="0.85em" key={href} titleText={href}/>))}
                    </Stack>
                )}

                {props.status && (
                    <Stack direction="column" style={{margin:0}}>
                        {props.status.map(stat => (
                            <Stack key={stat.title} direction="row" spacing={1}>
                                <GoodLink classes="latoR grGreen" size="0.9em" key={stat.num} titleText={stat.num}/>
                                <GoodLink classes="latoR grGreen" size="0.9em" key={stat.title} titleText={stat.title}/>
                            </Stack>
                        ))}
                    </Stack>
                )}

            </Stack>
            {props.divider && <Divider />}
        </>
    )
};