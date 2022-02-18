import Rating from "./GoodRating";
import GoodLink from "./GoodLink";
import x from "../images/X.png";
import GoodBookCover from "./GoodBookCover";
import "./styles.css";
import { Divider } from "@mui/material";
import GoodRating from "./GoodRating";

export default function MyBooksTableRow (props) {
    const book = props.book;
    return (
        <>
        <tr style={{textAlign: "left", verticalAlign: "top"}} >
            <td>
                <GoodBookCover height="80px" book={book}></GoodBookCover>
            </td>
            <td><GoodLink to={`/books/${book.title}`} titleText={book.title} titleInfo={book.title} classes="latoR grGreen" style={{textAlign: "left"}}></GoodLink></td>
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
                <GoodLink titleText="edit" classes="latoR grGreen"></GoodLink>
                <GoodLink titleText="view" classes="latoR grGreen"></GoodLink>
            </td>
            <td>
                <div onClick={props.onClick} styles={{all: "unset"}}>
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