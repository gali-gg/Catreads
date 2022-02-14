import Rating from "./GoodRating";
import GoodLink from "./GoodLink";
import x from "../images/X.png"
import GoodBookCover from "./GoodBookCover";
import "./styles.css";

export default function MyBooksTableRow (props) {
    const book = props.book;
    return (
        <tr style={{textAlign: "left", verticalAlign: "top"}}>
            <td>
                {/* {props.cover} */}
                <GoodBookCover height="100px" book={book}></GoodBookCover>
            </td>
            <td>{book.title}</td>
            <td>{props.authorName}</td>
            <td>{book.status.rating}</td>
            <td>
                <Rating rating={props.userRating} size="small" />
            </td>
            <td>
                {props.shelves.map(shelf => <GoodLink titleText={shelf} classes="latoR grGreen"/>)}
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
                <button onClick={props.onClick} styles={{all: "unset"}}>
                    <img src={x} alt="remove-book" />
                </button>
            </td>
        </tr>
    )
}