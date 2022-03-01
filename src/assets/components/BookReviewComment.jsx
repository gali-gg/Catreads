import { Rating, Stack } from "@mui/material";
import GoodLink from "./GoodLink";
import styles from "./css-modules/bookReviewComment.module.css";
import "./css/styles.css";
import moment from "moment";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {likeReviewAction, dislikeReviewAction, removeReviewAction} from "../../redux/actions/reviewsActions";
import { addLikedReviewAction, removeLikedReviewAction } from "../../redux/actions/userAction";

export default function BookReviewComment(props) {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.userData.id);
  let name = props.name;
  let avatar = props.avatar;
  let rating = props.review.rating;
  let reviewBody = props.review.body;
  let date = props.review.date;
  let numberOfLikes = props.review.likes;
  let liked = useSelector(state => state.userData.likedReviews.some(reviewID => reviewID === props.review.id));

  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = () => {
      if(!isLiked){
        dispatch(addLikedReviewAction(props.review.id));
        dispatch(likeReviewAction(props.review.id));
        setIsLiked(!isLiked);
      }
      else {
        dispatch(removeLikedReviewAction(props.review.id));
        dispatch(dislikeReviewAction(props.review.id));
        setIsLiked(!isLiked);
      }
  }

  const handleRemove = () => {
    dispatch(removeReviewAction(props.review.id));
  }

  return (
    <>
      <div className={styles.commentWrapper}>
        <div className={styles.img}>
          <img src={avatar} alt={`${name}-avatar`} width="50px"></img>
        </div>
        <div style={{flexGrow: 1}}>
          <div className={styles.reviewHeaderStyles}>
            <Stack direction="row" gap={2} style={{ margin: "0" }}>
              <span className="latoR f-1">
                <GoodLink
                  titleText={name}
                  size="1em"
                  classes="latoB grGreen"
                ></GoodLink>{" "}
                rated it
              </span>{" "}
              <Rating
                precision={0.5}
                value={rating}
                size="small"
                readOnly
              ></Rating>
            </Stack>
            <div className="latoR grLight">{moment(date).format("MMM DD, YYYY")}</div>
          </div>
          <div className={styles.reviewBody}>{reviewBody}</div>
          <Stack gap={1} direction="row" divider={<span>•</span>} className="grGrey" sx={{alignItems: "center"}}>
          <p className={`${styles.likes} latoR grGreen f-09`}>{numberOfLikes} Likes</p>
          {props.review.senderID !== userID && <GoodLink titleText={isLiked ? "dislike" : "like"} classes="grGreen latoR f-09" onClick={handleLike}></GoodLink>}
          {props.review.senderID === userID && <GoodLink titleText="remove" classes="grGreen latoR f-09" onClick={handleRemove}></GoodLink>}
        </Stack>
        </div>
      </div>
    </>
  );
}
