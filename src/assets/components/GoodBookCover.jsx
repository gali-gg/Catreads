import BookHoverInfo from "./BookHoverInfo";
import { authorManager } from "../../model/AuthorManagerService";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import "./tippyStyles.css";

export default function GoodBookCover(props) {
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
          author={authorManager.getNameById(props.book.author)}
          rating={props.book.status.rating}
          ratingsCount={props.book.status.ratingsCount}
          description={props.book.description}
          published={props.book.published.year}
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