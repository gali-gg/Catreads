import { useParams } from "react-router-dom";
import books from "../data/books.js";
import genres from "../data/genres.js";
import authors from "../data/authors.js";
import { Container, Rating, Stack, Divider } from "@mui/material";
import styles from "./bookPageStyles.module.css";
import "../assets/components/styles.css";
import { useState } from "react";
import GoodLink from "../assets/components/GoodLink.jsx";
import GoodButton from "../assets/components/GoodButton.jsx";
import AuthorInfoBox from "../assets/components/AuthorInfoBox.jsx";

export default function BookPage(props) {
  const params = useParams();
  const bookId = params.bookId;

  const book = books.find((book) => book.uuid === bookId);
  const author = authors.find(author => author.uuid === book.author);

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
    <Container maxWidth="lg" sx={{ mt: 2, mb: 5 }}>
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
                  titleText={author.name}
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
                    titleText={`${book.status.ratingsCount} ratings`}
                  ></GoodLink>
                  <GoodLink
                    classes="latoR grGreen"
                    titleText={`${book.status.reviewsCount} reviews`}
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
                  Published {book.published?.date || "n/a"} by{" "}
                  {book.published?.publisher || "Unknown"}
                </span>
              </div>
            </Stack>
          </Stack>
        </main>
        <aside className={styles.aside}>
            <Stack gap={3}>
            <div>
            <span className="latoB grBrown f-09">GENRES</span>
            <Divider></Divider>
            {genres.map((genre, index) => {
              if (index < 9) {
                return (
                  <>
                    <GoodLink key={"bookgenre" + index}
                      titleText={genre.genre}
                      classes="grGreen latoR"
                    ></GoodLink>
                    <Divider></Divider>
                  </>
                );
              } else if (index === 9) {
                return (
                  <GoodLink key={"bookgenre" + index}
                    titleText={genre.genre}
                    classes="grGreen latoR"
                  ></GoodLink>
                );
              }
            })}
          </div>
            <AuthorInfoBox author={author}></AuthorInfoBox>
            </Stack>
        </aside>
      </Stack>
    </Container>
  );
}
