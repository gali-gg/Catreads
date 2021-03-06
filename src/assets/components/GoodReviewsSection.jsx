import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import BookReviewModal from "./BookReviewModal";
import GoodLink from "./GoodLink";
import BookReviewComment from "./BookReviewComment";
import "./css/styles.css";
import { getFromStorageAndParse } from "../../utility";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function GoodReviewsSection(props) {
  const navigate = useNavigate();

  let userPhoto = useSelector((state) => state.userData.avatar);
  let book = useSelector((state) => state.openBook);
  let user = useSelector(state => state.userData);
  let userRating = useSelector(state => {
    let userReview = state.reviews.reviews.find(review => review.bookID === book.uuid && review.senderID === user.id);

    if(userReview) {
      return userReview.rating;
    }
  });

  const sortedReviews = [...props.reviews].sort((review1, review2) => moment(review2.date).valueOf() - moment(review1.date).valueOf());

  const getUser = (senderID) => {
    let users = getFromStorageAndParse("users");
    return users.find(user => user.id === senderID);
  }

  const handleGoToProfile = () => {
      navigate("/user");
  }

  return (
    <>
      <Stack direction="row" gap={2}>
        <img src={userPhoto} alt="user-avatar" width="70px"></img>
        <div>
          <div className={`latoR f-1 grBrown`} style={{ marginBottom: "5px" }}>
            <GoodLink
              classes="latoR grGreen"
              size="1.1em"
              titleText={user.name.first}
              onClick={handleGoToProfile}
            ></GoodLink>{" "}
            start your review of {book.title}
          </div>
          <Stack direction="row" gap={5}>
            <BookReviewModal
              type="button"
              clickTitle="Write a review"
              rating={userRating ?? 0}
              cover={book.cover}
              title={book.title}
              author={book.author.name}
              book={book}
            ></BookReviewModal>
          </Stack>
        </div>
      </Stack>
      <Stack>
        {sortedReviews.map((review) => (
          <BookReviewComment
            key={review.id}
            review={review}
            name={review.senderID === user.id ? user.name.first :getUser(review.senderID).details.names.first}
            avatar={review.senderID === user.id ? user.avatar : getUser(review.senderID).avatar}
          ></BookReviewComment>
        ))}
      </Stack>
    </>
  );
}
