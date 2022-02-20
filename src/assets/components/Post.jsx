import { Divider, Stack } from "@mui/material";
import Title from "./Title";
import { makeStyles } from '@mui/styles';
import GoodLink from "./GoodLink";
import "./styles.css";
import store from "../../redux/store";
import authors from "../../data/authors";

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
    let author = authors.filter(author => author.uuid === props.author)[0];
    const links = ["Like", "Comment"]
    const classes = useStyles();

    return(
        <Stack sx={{border:"1px solid #ddd"}}>
            <Stack direction="column" className={classes.container} spacing={1}>
                <img src={author.profileImage} alt={`${props.title}-img`} className={classes.authorImg}/>
                <Stack justifyContent="space-between" direction="row" alignItems="center">
                    <Title title={author.name} className="latoB f-09" />
                </Stack>
                <span className="latoR f-09 grBrown">
                    {props.postText}
                </span>
                <Stack direction="row" spacing={1}>
                    {links.map(link => (
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
                    <img src={store.getState().userData.avatar} className={classes.userAvatar} alt="avatar"/>
                    <textarea
                        placeholder="Write a comment ..." 
                        className={`${classes.comments} latoR f-095`}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
} 