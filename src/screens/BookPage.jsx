import { useParams } from "react-router-dom";
import {default as allBooks} from "../data/books.js";
import {default as allGenres} from "../data/genres.js";
import genres from "../data/genres.js";
import authors from "../data/authors.js";
import { Container, Rating, Stack, Divider } from "@mui/material";
import styles from "./bookPageStyles.module.css";
import "../assets/components/styles.css";
import { useEffect, useState } from "react";
import GoodLink from "../assets/components/GoodLink.jsx";
import GoodButton from "../assets/components/GoodButton.jsx";
import AuthorInfoBox from "../assets/components/AuthorInfoBox.jsx";
import { formatNumber } from "../utility.js";
import { useSelect } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { addReviewAction, loadBookAction, removeReviewAction } from "../redux/actions/openBookAction.js";
import BookReview from "../assets/components/BookReview.jsx";

export default function BookPage(props) {
  const params = useParams();
  const bookId = params.bookId;
  const dispatch = useDispatch();
  const bookObj = allBooks.find((book) => book.uuid === bookId);
  const authorObj = authors.find(author => author.uuid === bookObj.author);
  const similarBooksArr = [];

  const userID = useSelector(state => state.userData.id);

  bookObj.similarBooks.forEach(id => {
    let book = allBooks.find((book) => book.uuid === id);
    similarBooksArr.push(book);
  })

  const selectedBookGenres = useSelector(state => {
    let genreIDs = state.openBook.genresIDs;
    return genreIDs.map(genreID => allGenres.find(genre => genre.uuid === genreID));
  });

  useEffect (() => {
    dispatch(loadBookAction(bookObj, authorObj));
  }, []);

  const book = useSelector(state => state.openBook);
  const bookIsLoaded = useSelector(state => state.openBook.loaded);

  const [descClass, setDescClass] = useState(styles.description);
  const [showMore, setShowMore] = useState("more");

  const handleShowMore = () => {
    if (descClass) {
      setDescClass("");
      setShowMore("(less)");
    } else {
      setDescClass(styles.description);
      setShowMore("more");
    }
  };

  const reviews = useSelector(state => state.openBook.reviews);
  const [reviewBody, setReviewBody] = useState("");

  const handleReviewInput = (e) => {
    let text = e.target.value;
    setReviewBody(text);
  }

  const handleAddReview = () => {
    setReviewBody("");
    setUserRating(0);
    dispatch(addReviewAction(userID, reviewBody, userRating));
  }

  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (e) => {
    setUserRating(e.target.value);
  }

  return (
    <>
    {bookIsLoaded && <Container maxWidth="lg" sx={{ mt: 2, mb: 5 }}>
    <Stack direction="row" spacing={5}>
      <main className={styles.main}>
        <Stack direction="row" spacing={3}>
          <div>
            <img
              className={styles.cover}
              src={book.cover}
              alt={`${book.title}-cover`}
            />
          </div>

          <Stack>
            <h1 className="meriR" style={{ fontSize: "1.5em" }}>
              {book.title}
            </h1>
            <div>
              by&nbsp;
              <GoodLink
                titleText={book.author.name}
                classes="meriR grBrown"
              ></GoodLink>
              <Stack
                direction="row"
                gap={1}
                divider={<span>•</span>}
                className={`grGrey f-08`}
              >
                <Rating
                  precision={0.5}
                  name="read-only"
                  size="small"
                  value={book.status.rating}
                  readOnly
                />
                {book.status.rating}
                <GoodLink
                  classes="latoR grGreen"
                  titleText={`${formatNumber(book.status.ratingsCount)} ratings`}
                ></GoodLink>
                <GoodLink
                  classes="latoR grGreen"
                  titleText={`${formatNumber(book.status.reviewsCount)} reviews`}
                ></GoodLink>
              </Stack>
              <span className={`${descClass} meriR f-1`}>
                {book.description}
              </span>
              <GoodLink
                onClick={handleShowMore}
                titleText={showMore}
                classes="meriR grGreen"
              ></GoodLink>
              <Divider></Divider>
              <span className="latoB grBrown f-09">GET A COPY</span>
              <Stack direction="row" gap={1}>
                <GoodButton title="Amazon"></GoodButton>
                <GoodButton title="Online Stores"></GoodButton>
                <GoodButton title="Libraries"></GoodButton>
              </Stack>
              <Divider></Divider>
              <span className="latoR grGrey f-09">
                Published {(`${book.published?.month} ${book.published?.day} ${book.published?.year}`) || "n/a"} by{" "}
                {book.published?.publisher || "Unknown"}
              </span>
            </div>
          </Stack>
        </Stack>

        <Stack>
          <p>How many stars?</p>
          <select value={userRating} onChange={handleRatingChange}>
            <option value={0}>How many stars?</option>
            <option value={1}>1</option>
            <option  value={2}>2</option>
            <option  value={3}>3</option>
            <option  value={4}>4</option>
            <option  value={5}>5</option>
          </select>
          <textarea placeholder="Write review..." value={reviewBody} onInput={handleReviewInput}>
          </textarea>
          <button onClick={handleAddReview}>Post</button>

          <Divider></Divider>
          {reviews.map(review => <BookReview rating={userRating} review={review}></BookReview>)}

        </Stack>

      </main>
      <aside className={styles.aside}>
          <Stack gap={3}>
          <div>
          <span className="latoB grBrown f-09">GENRES</span>
          <Divider></Divider>
          {selectedBookGenres.map((genre, index) => {
            if (index < selectedBookGenres.length - 1) {
              return (
                <>
                  <GoodLink key={"bookgenre" + index}
                    titleText={genre.genre}
                    classes="grGreen latoR"
                  ></GoodLink>
                  <Divider></Divider>
                </>
              );
            } else if (index === selectedBookGenres.length - 1) {
              return (
                <GoodLink key={"bookgenre" + index}
                  titleText={genre.genre}
                  classes="grGreen latoR"
                ></GoodLink>
              );
            }
          })}
        </div>
          <AuthorInfoBox author={book.author}></AuthorInfoBox>
          </Stack>
      </aside>
    </Stack>
  </Container> }
  </>
  );
}
