import { useParams } from "react-router-dom"

export default function BookPage() {
    const params = useParams();
    const bookId = params.bookId;
    return (
        <>
            <h1>Book page</h1>
            <h2>{bookId}</h2>
        </>
    )
  }