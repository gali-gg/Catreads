import { Divider, Stack } from "@mui/material";
import Title from "./Title";
import { makeStyles } from '@mui/styles';
import GoodLink from "./GoodLink";
import "./styles.css";


const useStyles = makeStyles({
    container: {
        borderBottom: "1px solid #ddd",
        background: "white",
        padding: "12px 10px 10px 35px",
        position: "relative"
    },
    likesContainer:{
        background: "#F3F3F3",
    },
    authorImg:{
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        position: "absolute",
        top: "8px",
        left: "-25px",
        border: "1px solid #ddd"
    },
    link:{
        paddingLeft: "10px",
    },
    userAvatar:{
        backgroundImage: "url('https://s.gr-assets.com/assets/nophoto/user/u_60x60-267f0ca0ea48fd3acfd44b95afa64f01.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        height: "32px",
        width: "35px",
        borderRadius: "50%",
        border: "1px solid #ddd",
    },
    comments:{
        width: "95%",
        height: "22px",
        border: "1px solid #ddd",
        borderRadius: "3px"
    }
});

export default function Post(props){
    const classes = useStyles();

    return(
        <Stack sx={{border:"1px solid #ddd"}}>
            <Stack direction="column" className={classes.container} spacing={1}>
                <img src={props.profileImg} alt={`${props.title}-img`} className={classes.authorImg}/>
                <Stack justifyContent="space-between" direction="row" alignItems="center">
                    <Title title={props.name} className="latoB f-09" />
                    <GoodLink titleText={props.date} classes="latoR f-08 grGrey" />
                </Stack>
                <span className="latoR f-09 grBrown">
                    {props.postText}
                </span>
                <Stack direction="row" spacing={1}>
                    {props.links.map(link => (
                        <GoodLink titleText={link} key={link} classes="grGreen latoR f-095" />
                    ))}
                </Stack>
            </Stack>
            <Stack className={classes.likesContainer} spacing={0}>
                <GoodLink titleText={props.likes} classes={`${classes.link} grBrown latoR f-09`}></GoodLink>
                <Divider></Divider>
                <Stack 
                    sx={{p:"10px"}} 
                    spacing={1} 
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <span className={classes.userAvatar} />
                    <textarea
                        placeholder="Write a comment ..." 
                        className={`${classes.comments} latoR f-095`}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
} 