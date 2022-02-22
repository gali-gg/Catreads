import { useDispatch } from "react-redux";
import { removeReviewAction } from "../../redux/actions/openBookAction";
import GoodRating from "./GoodRating";

export default function BookReview (props){
    const dispatch = useDispatch();

    const handleRemoveReview = (e) => {
        let reviewID = e.target.id;
        console.log(reviewID);
        dispatch(removeReviewAction(reviewID));
    }

    return (
        <>
        <GoodRating rating={props.review.rating} size="small"></GoodRating>
        <p>{props.review.body}</p>
        <div id={props.review.id} onClick={handleRemoveReview}>remove review</div>
        </>
    )
}