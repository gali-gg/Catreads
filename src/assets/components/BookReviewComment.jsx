import { Rating, Stack } from "@mui/material";
import GoodLink from "./GoodLink";
import styles from "./css-modules/bookReviewComment.module.css";
import "./styles.css";
import moment from "moment";
import GoodButton from "./GoodButton";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {likeReviewAction, dislikeReviewAction} from "../../redux/actions/reviewsActions";

export default function BookReviewComment(props) {
  const dispatch = useDispatch();

  let name = props.name;
  let avatar = props.avatar;
  let rating = props.review.rating;
  let reviewBody = props.review.body;
  let date = props.review.date;
  let numberOfLikes = props.review.likes;

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
      if(!isLiked){
        dispatch(likeReviewAction(props.review.id));
        setIsLiked(!isLiked);
      }
      else {
        dispatch(dislikeReviewAction(props.review.id));
        setIsLiked(!isLiked);
      }
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
          <GoodLink titleText={isLiked ? "dislike" : "like"} classes="grGreen latoR f-09" onClick={handleLike}></GoodLink>
        </Stack>
        </div>
      </div>
    </>
  );
}
