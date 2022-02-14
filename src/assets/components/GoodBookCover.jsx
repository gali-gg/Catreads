import { useState } from "react";
import BookHoverInfo from "./BookHoverInfo";
import { authorManager } from "../../model/AuthorManagerService";

export default function GoodBookCover(props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleHover = () => {
    setIsVisible(!isVisible);
  }

  return (
    <div style={{position: "relative"}}>
      <img
        src={props.book.cover}
        alt={`${props.book.title}-cover`}
        width={props.width || "auto"}
        height={props.height || "auto"}
        onClick={props.onClick}
        onMouseEnter={handleHover}
        // onMouseLeave={handleHover}
      />
      {isVisible && (
        <BookHoverInfo
        onMouseLeave={handleHover}
          title={props.book.title}
          author={authorManager.getNameById(props.book.author)}
          rating={props.book.status.rating}
          ratingsCount={props.book.status.ratingsCount}
          description={props.book.description}
        />
      )}
    </div>
  );
}
