import { Rating, Stack } from "@mui/material";
import GoodLink from "./GoodLink";
import styles from "./css-modules/bookReviewComment.module.css";
import "./styles.css"


export default function BookReviewComment(props) {
  let name = props.name;
  let avatar = props.avatar;
  let rating = props.review.rating;
  let reviewBody = props.review.body;
  let date = props.review.date;
  return (
    <>
      <Stack gap={2} direction="horizontal" className={styles.commentWrapper}>
          <div>
          <img src={avatar} alt={`${name}-avatar`} width="50px"></img>
          </div>

        <div>
          <div className={styles.reviewHeaderStyles}>
            <Stack direction="horizontal" gap={2} style={{margin: "0"}}>
            <span className="latoR f-1"><GoodLink titleText={name} size="1em" classes="latoB grGreen"></GoodLink> rated it</span>{" "}
              <Rating precision={0.5} value={rating} size="small" readOnly></Rating>
            </Stack>
            <span>{date}</span>
          </div>

          <p className={styles.reviewBody}>{reviewBody}</p>
        </div>
      </Stack>
    </>
  );
}
