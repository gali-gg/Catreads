import { Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import BookReviewModal from "./BookReviewModal";
import GoodLink from "./GoodLink";
import GoodRating from "./GoodRating";
import BookReviewComment from "./BookReviewComment";
import "./styles.css";
import _ from "lodash"

export default function GoodReviewsSection(props) {
  let userPhoto = useSelector((state) => state.userData.avatar);
  let book = useSelector((state) => state.openBook);
  let user = useSelector(state => state.userData);
  //   let reviews = useSelector(state => state.reviews.reviews.filter(review => review.bookID === book.id));

  const [rating, setRating] = useState(0);

  const handleChangeRating = (ratingValue) => {
    setRating(ratingValue);
  };
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
        {[...props.reviews, {
            rating: 4.5,
            body: "When I heard the premise I expected a light robot killer story from the PoV from the robot. Probably a PI mystery kind of thing because that seems to be pretty hot right now. I can rattle off a handful of titles like this right now. So. What did I get? A fun and light robot murderer who hacks herself to have free will and she stops murdering to watch SF sitcoms instead. :) Honestly, that's pretty cool. Yeah, her official bruiser job is still there but her mechanical heart isn't really into it.",
            date: _.now()
        }].map(review => <BookReviewComment review={review} name="Bradley"
        avatar="https://images.gr-assets.com/users/1508811508p2/4213258.jpg"></BookReviewComment>)}

        {/* <BookReviewComment
          review={}

        ></BookReviewComment> */}
      </Stack>
    </>
  );
}
