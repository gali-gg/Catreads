import { Container, Rating, Stack, Divider, Modal, Paper } from "@mui/material";
import styles from "./cssModules/bookPageStyles.module.css";
import "../assets/components/css/styles.css";
import { useEffect, useState } from "react";
import GoodLink from "../assets/components/GoodLink.jsx";
import GoodButton from "../assets/components/GoodButton.jsx";
import AuthorInfoBox from "../assets/components/AuthorInfoBox.jsx";
import { formatNumber, getRatingsStats } from "../utility.js";
import { useDispatch, useSelector } from "react-redux";
import { loadBookAction } from "../redux/actions/openBookAction.js";
import GoodReviewsSection from "../assets/components/GoodReviewsSection.jsx";
import {v4 as uuidv4} from "uuid";
import GoodGreenButton from "../assets/components/GoodGreenButton.jsx";

const paperStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    boxSizing: "border-box",
    width: "fit-content"
};

export default function BookPageContent (props) {
  const dispatch = useDispatch();
  const allGenres = useSelector(state => state.genres.genres);
  const allBooks = useSelector(state => state.books.books);

  const authorObj = useSelector(state => {
    if(props.bookObj){
      return state.authors.authors.find(author => author.uuid === props.bookObj.author);
    }
  });
  const similarBooksArr = [];

  const reviews = useSelector(state => {
    return state.reviews.reviews.filter(review => review.bookID === props.bookId);
  });

  const ratingStats = getRatingsStats(props.bookObj.uuid);

  props.bookObj.similarBooks.forEach(id => {
    let book = allBooks.find((book) => book.uuid === id);
    similarBooksArr.push(book);
  })

  const selectedBookGenres = useSelector(state => {
    let genreIDs = state.openBook.genresIDs;
    return genreIDs.map(genreID => allGenres.find(genre => genre.uuid === genreID));
  });

  useEffect (() => {
    dispatch(loadBookAction(props.bookObj, authorObj));
  }, [props.bookObj, authorObj, dispatch]);

  const book = useSelector(state => state.openBook);
  const bookIsLoaded = useSelector(state => state.openBook.loaded);

  const [descClass, setDescClass] = useState(styles.description);
  const [showMore, setShowMore] = useState("more");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      {bookIsLoaded && (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 5 }}>
          <Stack direction="row" spacing={5}>
            <main className={styles.main}>
              <Stack direction="row" spacing={3} className={styles.topSection}>
                <div className={styles.bookCoverContainer}>
                  <img
                    className={styles.cover}
                    src={book.cover}
                    alt={`${book.title}-cover`}
                    onClick={handleOpen}
                    title="Enlarge cover"
                  />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Paper style={paperStyle}>
                    <img
                    src={book.cover}
                    alt={`${book.title}-cover`}
                    className={styles.largeCover}
                    />
                    </Paper>

                  </Modal>
                  <GoodGreenButton
                    bookUuid={book.uuid}
                    styled={true}
                  ></GoodGreenButton>
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
                        titleText={`${formatNumber(
                          ratingStats.ratingsCount
                        )} ratings`}
                      ></GoodLink>
                      <GoodLink
                        classes="latoR grGreen"
                        titleText={`${formatNumber(
                          ratingStats.reviewsCount
                        )} reviews`}
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
                    <Stack direction="row" gap={1} className={styles.buttons}>
                      <GoodButton title="Amazon"></GoodButton>
                      <GoodButton title="Online Stores"></GoodButton>
                      <GoodButton title="Libraries"></GoodButton>
                    </Stack>
                    <Divider></Divider>
                    <span className="latoR grGrey f-09">
                      Published{" "}
                      {`${book.published?.month} ${book.published?.day} ${book.published?.year}` ||
                        "n/a"}{" "}
                      by {book.published?.publisher || "Unknown"}
                    </span>
                  </div>
                </Stack>
              </Stack>

              <Stack>
                <span className="latoB grBrown f-09">COMMUNITY REVIEWS</span>
                <Divider></Divider>
                <GoodReviewsSection reviews={reviews}></GoodReviewsSection>
              </Stack>
            </main>
            <aside className={styles.aside}>
              <Stack gap={3}>
                <div>
                  <span className="latoB grBrown f-09">GENRES</span>
                  <Divider></Divider>
                  {selectedBookGenres.map((genre, index) => {
                      return (
                        <div key={uuidv4()}>
                          <GoodLink
                            titleText={genre.genre}
                            classes="grGreen latoR"
                            to={`/genres/${genre.genre}`}
                          ></GoodLink>
                          {index !== selectedBookGenres.length - 1 ? <Divider></Divider> : ""}
                        </div>
                      );
                  })}
                </div>
                <AuthorInfoBox author={book.author}></AuthorInfoBox>
              </Stack>
            </aside>
          </Stack>
        </Container>
      )}
    </>
  );
}