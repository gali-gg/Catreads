import { Avatar, Divider, Stack } from "@mui/material";
import { useState } from "react";
import styles from "./css-modules/authorInfoBox.module.css";
import GoodButton from "./GoodButton";
import GoodBookCover from "./GoodBookCover";
import GoodLink from "./GoodLink";
import books from "../../data/books.js";
import { useNavigate } from "react-router-dom";

export default function AuthorInfoBox(props) {
  const navigate = useNavigate();
  const author = props.author;
  const authorBooks = books
    .filter((book) => book.author === author.uuid)
    .splice(0, 5);

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

  const handleClickBook = (bookID) => {
    navigate(`/books/${bookID}`);
  }

  return (
    <div>
      <span className="latoB grBrown f-09">
        ABOUT {author.name.toUpperCase()}
      </span>
      <Divider></Divider>
      <Avatar src={author.profileImage} sx={{ width: 75, height: 75 }}></Avatar>
      <div className={`${styles.authorName} meriR grBrown`}>{author.name}</div>
      <GoodButton title="Follow Author"></GoodButton>
      <div className={styles.descriptionContainer}>
      <span className={`${descClass} meriR f-1`}>{author.description}</span>
      <GoodLink
        onClick={handleShowMore}
        titleText={showMore}
        classes="meriR grGreen"
      ></GoodLink>
      </div>
      <div>
        <span className="latoB grBrown f-09">
          BOOKS BY {author.name.toUpperCase()}
        </span>
        <Divider></Divider>
        <Stack direction="row" gap={0.5}>
          {authorBooks.map((book, index) => {
            return <GoodBookCover key={"bookcover" + index} book={book} width="50px" tippyPlacement="bottom-start" onClick={() => handleClickBook(book.uuid)}></GoodBookCover>;
          })}
        </Stack>
      </div>
    </div>
  );
}
