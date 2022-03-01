import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeReviewAction } from "../../redux/actions/reviewsActions";

export default function BookReview (props){
    const dispatch = useDispatch();

    const handleRemoveReview = (e) => {
        let reviewID = e.target.id;
        dispatch(removeReviewAction(reviewID));
    }

    return (
        <>
        <Rating value={props.review.rating} size="small" name="read-only" readOnly></Rating>
        <p>{props.review.rating}</p>
        <p>{props.review.body}</p>
        <div id={props.review.id} onClick={handleRemoveReview}>remove review</div>
        </>
    )
}