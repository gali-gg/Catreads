import { useParams } from "react-router-dom";

export default function AuthorPage() {
    const params = useParams();
    const author = params.authorName;
    return (
        <>
            <h1>Author page</h1>
            <h2>{author}</h2>
        </>
    )
  }