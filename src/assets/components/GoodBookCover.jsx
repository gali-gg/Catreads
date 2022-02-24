import BookHoverInfo from "./BookHoverInfo";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import "./tippyStyles.css";
import { getRatingsStats } from "../../utility";
import {useSelector} from "react-redux";

export default function GoodBookCover(props) {
  let bookReviews = useSelector(state => state.reviews.reviews.filter(review => review.bookID === props.book.uuid));
  let bookRating = getRatingsStats(bookReviews);
  let authorName = useSelector(state => state.authors.authors.find(author => author.uuid === props.book.author).name);
  return (
    <Tippy
      className="tippy-box"
      theme="goodreads"
      interactive={true}
      placement={props.tippyPlacement || "auto-start"}
      arrow={true}
      delay={[200, 0]}
      offset={[0, 15]}
      animation={false}
      content={
        <BookHoverInfo
          title={props.book.title}
          author={authorName || "Unknown"}
          rating={bookRating.rating ?? 0}
          ratingsCount={bookRating.ratingsCount ?? 0}
          description={props.book.description}
          published={props.book.published.year}
          book={props.book}
        />
      }
    >
      <img
        src={props.book.cover}
        alt={`${props.book.title}-cover`}
        width={props.width || "auto"}
        height={props.height || "auto"}
        onClick={props.onClick}
      />
    </Tippy>
  );
}