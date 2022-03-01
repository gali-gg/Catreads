import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookPageContent from "./BookPageContent";
import ErrorPage from "./ErrorPage";

export default function BookPage(props) {
  const params = useParams();
  const bookId = params.bookId;
  const bookObj = useSelector(state => state.books.books.find(book => book.uuid === bookId));

  const [renderComponent, setRenderComponent] = useState(<ErrorPage/>);

  useEffect(() => {
    let book = bookObj;
    if(book){
      setRenderComponent(<BookPageContent bookObj={book} bookId={bookId}/>);
    }
    else {
      setRenderComponent(<ErrorPage/>)
    }
  }, [bookObj, bookId]);

  return renderComponent;
}