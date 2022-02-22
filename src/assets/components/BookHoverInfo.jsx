import GoodLink from "./GoodLink"
import GoodRating from "./GoodRating"
import styles from "./css-modules/bookHoverInfo.module.css"
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { formatNumber } from "../../utility";
import { useDispatch } from "react-redux";
import { addBookToShelf } from "../../redux/actions/shelfAction";

export default function BookHoverInfo (props) {
    const dispatch = useDispatch();
    const [descClass, setDescClass] = useState(styles.description);
    const [showMore, setShowMore] = useState("more");
    // const [chosenShelfName, setChosenShelfName] = useState("");

    const handleShowMore= () => {
        if(descClass){
            setDescClass("");
            setShowMore("(less)");
        }
        else {
            setDescClass(styles.description);
            setShowMore("more");
        }
    }

    const handleSelectShelf = (e) => {
        if(e.target.value){
            dispatch(addBookToShelf(false, e.target.value, props.book, props.book.uuid));
        }
    }

    return (
        <div  className={styles.container} style={{backgroundColor: "white"}}>
            <h3 className={styles.title}><GoodLink size="1em" titleText={props.title} classes="meriB grBrown"/></h3>

            <span>by&nbsp;
                <GoodLink titleText={props.author} classes="meriR grBrown"></GoodLink>
                <div className={`${styles.top} grGrey f-08`}>
                    <Rating precision={0.5} name="read-only" size="small" value={props.rating} readOnly />
                    {props.rating} avg rating - &nbsp;
                    {formatNumber(props.ratingsCount)} ratings - published&nbsp;
                    {props.published || "n/a"}
                </div>

                <span className={`${descClass} meriR f-1`}>
                    "{props.description}"
                </span>
                <GoodLink onClick={handleShowMore} titleText={showMore} classes="meriR grGreen"></GoodLink>
                <div className={styles.bottom}>
                    <select onChange={handleSelectShelf}>
                        <option value="">Add to shelf</option>
                        <option value={"Read"}>Read</option>
                        <option value={"Currently Reading"}>Currently reading</option>
                        <option value={"Want to Read"}>Want to read</option>
                    </select>

                    <span className="f-08">Rate this book</span>
                    <GoodRating size="small"></GoodRating>
                </div>
            </span>
        </div>
    )
}