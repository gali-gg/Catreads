import GoodLink from "./GoodLink";
import x from "../images/X.png";
import GoodBookCover from "./GoodBookCover";
import "./styles.css";
import { Divider } from "@mui/material";
import GoodRating from "./GoodRating";
import BookReviewModal from "./BookReviewModal";
import {useNavigate} from "react-router-dom";

export default function MyBooksTableRow (props) {
    const navigate = useNavigate()
    const book = props.book;
    return (
        <>
        <tr style={{textAlign: "left", verticalAlign: "top"}} >
            <td>
                <GoodBookCover onClick={() => navigate(`/books/${book.uuid}`)} height="80px" book={book}></GoodBookCover>
            </td>
            <td><GoodLink to={`/books/${book.uuid}`} titleText={book.title} titleInfo={book.title} classes="latoR grGreen" style={{textAlign: "left"}}></GoodLink></td>
            <td>{props.authorName}</td>
            <td>{book.status.rating}</td>
            <td>
                <GoodRating rating={props.userRating} size="small" />
            </td>
            <td>
                {props.shelves.map((shelf, index) => <GoodLink key={`shelf${index}`} titleText={shelf} classes="latoR grGreen"/>)}
            </td>
            <td>
                {props.dateRead}
            </td>
            <td>
                {props.dateAdded}
            </td>
            <td>
                <BookReviewModal
                    type="link"
                    clickTitle="edit"
                    rating={props.userRating}
                    cover={book.cover}
                    title={book.title}
                    author={props.authorName}
                ></BookReviewModal>
                <GoodLink titleText="view" classes="latoR grGreen"></GoodLink>
            </td>
            <td>
                <div onClick={props.onRemove}>
                    <img src={x} alt="remove-book" />
                </div>
            </td>
        </tr>
        <tr>
            <td colSpan="10">
                <Divider></Divider>
            </td>
        </tr>
        </>
    )
}