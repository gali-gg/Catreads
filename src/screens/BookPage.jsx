import { useParams } from "react-router-dom";
import {default as allBooks} from "../data/books.js";
import {default as allGenres} from "../data/genres.js";
import { Container, Rating, Stack, Divider } from "@mui/material";
import styles from "./bookPageStyles.module.css";
import "../assets/components/styles.css";
import { useEffect, useState } from "react";
import GoodLink from "../assets/components/GoodLink.jsx";
import GoodButton from "../assets/components/GoodButton.jsx";
import AuthorInfoBox from "../assets/components/AuthorInfoBox.jsx";
import { formatNumber, getRatingsStats } from "../utility.js";
import { useDispatch, useSelector } from "react-redux";
import { loadBookAction } from "../redux/actions/openBookAction.js";
import GoodReviewsSection from "../assets/components/GoodReviewsSection.jsx";
import BookReviewComment from "../assets/components/BookReviewComment.jsx";

export default function BookPage(props) {
  const params = useParams();
  const bookId = params.bookId;
  const dispatch = useDispatch();
  const bookObj = useSelector(state => state.books.books.find(book => book.uuid === bookId));
  const authorObj = useSelector(state => {
    if(bookObj){
      return state.authors.authors.find(author => author.uuid === bookObj.author);
    }
  });
  const similarBooksArr = [];

  const reviews = useSelector(state => {
    return state.reviews.reviews.filter(review => review.bookID === bookId);
  });

  const ratingStats = getRatingsStats(reviews);

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
  }, [bookObj, authorObj]);

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

              <GoodLink
                titleText={`by ${book.author.name}`}
                classes={`${styles.authorName} meriR grBrown`}
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
                  value={ratingStats.rating}
                  readOnly
                />
                {ratingStats.rating}
                <GoodLink
                  classes="latoR grGreen"
                  titleText={`${formatNumber(ratingStats.ratingsCount)} ratings`}
                ></GoodLink>
                <GoodLink
                  classes="latoR grGreen"
                  titleText={`${formatNumber(ratingStats.reviewsCount)} reviews`}
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
          <span className="latoB grBrown f-09">COMMUNITY REVIEWS</span>
          <Divider></Divider>
          {/* {reviews.map(review => <BookReviewComment rating={userRating} review={review} name="Test" avatar="https://images.gr-assets.com/users/1307934801p2/3978225.jpg"></BookReviewComment>)} */}
          <GoodReviewsSection reviews={reviews}></GoodReviewsSection>

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
