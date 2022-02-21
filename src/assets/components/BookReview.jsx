import { useDispatch } from "react-redux";
import { removeReviewAction } from "../../redux/actions/openBookAction";

export default function BookReview (props){
    const dispatch = useDispatch();

    const handleRemoveReview = (e) => {
        let reviewID = e.target.id;
        console.log(reviewID);
        dispatch(removeReviewAction(reviewID));
    }

    return (
        <>
        <p>{props.review.body}</p>
        <div id={props.review.id} onClick={handleRemoveReview}>remove review</div>
        </>
    )
}