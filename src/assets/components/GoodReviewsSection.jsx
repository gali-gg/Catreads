import { Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import BookReviewModal from "./BookReviewModal";
import GoodLink from "./GoodLink";
import GoodRating from "./GoodRating";
import BookReviewComment from "./BookReviewComment";
import "./styles.css";
import _ from "lodash"
import { getFromStorageAndParse } from "../../utility";

export default function GoodReviewsSection(props) {
  let userPhoto = useSelector((state) => state.userData.avatar);
  let book = useSelector((state) => state.openBook);
  let user = useSelector(state => state.userData);
  //   let reviews = useSelector(state => state.reviews.reviews.filter(review => review.bookID === book.id));

  const [rating, setRating] = useState(0);

  const handleChangeRating = (ratingValue) => {
    setRating(ratingValue);
  };

  const getUser = (senderID) => {
    let users = getFromStorageAndParse("users");
    return users.find(user => user.id === senderID);
  }

  return (
    <>
      <Stack direction="horizontal" gap={2}>
        <img src={userPhoto} alt="user-avatar" width="70px"></img>
        <div>
          <h4 className="latoR f-09 grBrown">
            <GoodLink
              classes="latoR grGreen"
              size="0.9em"
              titleText={user.name.first}
            ></GoodLink>{" "}
            start your review of {book.title}
          </h4>
          <Stack direction="horizontal" gap={5}>
            <GoodRating
              size="large"
              rating={rating}
              onRating={handleChangeRating}
            ></GoodRating>
            <BookReviewModal
              type="button"
              clickTitle="Write a review"
              rating={rating}
              cover={book.cover}
              title={book.title}
              author={book.author.name}
              book={book}
            ></BookReviewModal>
          </Stack>
        </div>
      </Stack>
      <Stack>
        {[...props.reviews].map(review => <BookReviewComment review={review} name={getUser(review.senderID).details.names.first}
        avatar={getUser(review.senderID).avatar}></BookReviewComment>)}

        {/* <BookReviewComment
          review={}

        ></BookReviewComment> */}
      </Stack>
    </>
  );
}
