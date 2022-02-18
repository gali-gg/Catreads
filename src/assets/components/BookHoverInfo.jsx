import GoodLink from "./GoodLink"
import GoodRating from "./GoodRating"
import styles from "./css-modules/bookHoverInfo.module.css"
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";

export default function BookHoverInfo (props) {
    const [descClass, setDescClass] = useState(styles.description);
    const [showMore, setShowMore] = useState("more");

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

    return (
        <div  className={styles.container} style={{backgroundColor: "white"}}>
            <h3 className={styles.title}><GoodLink size="1em" titleText={props.title} classes="meriB grBrown"/></h3>

            <span>by&nbsp;
                <GoodLink titleText={props.author} classes="meriR grBrown"></GoodLink>
                <div className={`${styles.top} grGrey f-08`}>
                    <Rating precision={0.5} name="read-only" size="small" value={props.rating} readOnly />
                    {props.rating} avg rating - &nbsp;
                    {props.ratingsCount} ratings - published &nbsp;
                    {props.published || "n/a"}
                </div>

                <span className={`${descClass} meriR f-1`}>
                    "{props.description}"
                </span>
                <GoodLink onClick={handleShowMore} titleText={showMore} classes="meriR grGreen"></GoodLink>
                <div className={styles.bottom}>
                    <select>
                        <option>Read</option>
                        <option>Currently reading</option>
                        <option>Want to read</option>
                    </select>

                    <span className="f-08">Rate this book</span>
                    <GoodRating size="small"></GoodRating>
                </div>
            </span>
        </div>
    )
}