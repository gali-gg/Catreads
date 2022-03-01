import { Divider, Stack } from "@mui/material";
import Title from "./Title";
import { makeStyles } from '@mui/styles';
import GoodLink from "./GoodLink";
import "./css/styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    mainContainer:{
        border: "1px solid #ddd",
    },
    container: {
        borderBottom: "1px solid #ddd",
        background: "white",
        padding: "12px 10px 10px 35px",
        position: "relative"
    },
    likesContainer: {
        background: "#F3F3F3",
    },
    authorImg: {
        height: "50px",
        width: "50px",
        objectFit: "cover",
        borderRadius: "50%",
        position: "absolute",
        top: "8px",
        left: "-25px",
        border: "1px solid #ddd"
    },
    userAvatar: {
        height: "35px",
        width: "35px",
        objectFit: "cover",
        borderRadius: "50%",
        border: "1px solid #ddd",
    },
    comments: {
        width: "95%",
        height: "22px",
        border: "1px solid #ddd",
        borderRadius: "3px"
    },
    commentContainer:{
        padding: "10px"
    }
});

export default function Post(props) {
    let avatar = useSelector(state => state.userData.avatar);
    let authors = useSelector(state => state.authors.authors);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        if (authors.length > 0) {
            setAuthor(authors.filter(author => author.uuid === props.author)[0]);
        }
    }, [authors, props.author]);

    const [likes, setLikes] = useState(props.likes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (!isLiked) {
            setLikes(likes + 1);
            setIsLiked(true);
        } else {
            setLikes(likes - 1);
            setIsLiked(false);
        }
    }
    const classes = useStyles();

    return author && (
        <Stack className={classes.mainContainer}>
            <Stack direction="column" className={classes.container} spacing={1}>
                <img src={author.profileImage} alt={`${props.title}-img`} className={classes.authorImg} />
                <Stack justifyContent="space-between" direction="row" alignItems="center">
                    <Title title={author.name} className="latoB f-09" />
                </Stack>
                <span className="latoR f-09 grBrown">
                    {props.postText}
                </span>
                <Stack direction="row" spacing={1}>
                    <GoodLink onClick={handleLike} titleText={isLiked ? "Unlike" : "Like"} key={"like"} classes="grGreen latoR f-095" />
                    <GoodLink titleText={"Comment"} key={"comment"} classes="grGreen latoR f-095" />
                </Stack>
            </Stack>
            <Stack className={classes.likesContainer} spacing={0}>
                <GoodLink titleText={likes + " likes"} classes={`grBrown latoR f-09`} />
                <Divider />
                <Stack
                    className={classes.commentContainer}
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img src={avatar} className={classes.userAvatar} alt="avatar" />
                    <textarea
                        placeholder="Write a comment ..."
                        className={`${classes.comments} latoR f-095`}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
} 