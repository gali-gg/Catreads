import GoodLink from "./GoodLink";
import x from "../images/X.png";
import GoodBookCover from "./GoodBookCover";
import "./css/styles.css";
import { Divider } from "@mui/material";
import GoodRating from "./GoodRating";
import BookReviewModal from "./BookReviewModal";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { getRatingsStats } from "../../utility";

export default function MyBooksTableRow (props) {
    const navigate = useNavigate()
    const book = props.book;

    let bookAvgRating = useSelector(state => {
        let reviews = state.reviews.reviews.filter(review => review.bookID === book.uuid);
        if(reviews.length > 0){
            return getRatingsStats(reviews).rating;
        }
        else {
            return 0;
        }
    });

    let userRating = useSelector(state =>  {
        if(state.reviews.reviews.length){
            let review = state.reviews.reviews.find(review => {
                let correctSender = review.senderID === props.userID;
                let correctBook = review.bookID === book.uuid

                return correctSender && correctBook;
            });
            let rating = review ? review.rating : null;

            return rating;
        }
    });
    return (
        <>
        <tr style={{textAlign: "left", verticalAlign: "top"}}>
            <td>
                <GoodBookCover onClick={() => navigate(`/books/${book.uuid}`)} height="80px" book={book}></GoodBookCover>
            </td>
            <td><GoodLink to={`/books/${book.uuid}`} titleText={book.title} titleInfo={book.title} classes="latoR grGreen" style={{textAlign: "left"}}></GoodLink></td>
            <td>{props.authorName}</td>
            <td>{bookAvgRating}</td>
            <td>
                <GoodRating rating={userRating ?? 0} name="read-only" size="small" />
            </td>
            <td>
                <BookReviewModal
                    type="link"
                    clickTitle="edit"
                    rating={userRating ?? 0}
                    cover={book.cover}
                    title={book.title}
                    author={props.authorName}
                    book={book}
                ></BookReviewModal>
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