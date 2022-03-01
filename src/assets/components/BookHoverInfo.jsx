import GoodLink from "./GoodLink"
import styles from "./css-modules/bookHoverInfo.module.css"
import { useState } from "react";
import { Rating } from "@mui/material";
import GoodGreenButton from "./GoodGreenButton"
import { useNavigate } from "react-router-dom";


export default function BookHoverInfo (props) {
    const navigate = useNavigate();

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

    const handleBookTitleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/books/${props.book.uuid}`)
    }

    return (
        <div  className={styles.container} style={{backgroundColor: "white"}}>
            <h3 className={styles.title}><GoodLink size="1em" titleText={props.title} classes="meriB grBrown" onClick={handleBookTitleClick}/></h3>

            <span>by&nbsp;
                <GoodLink titleText={props.author} classes="meriR grBrown"></GoodLink>
                <div className={`${styles.top} grGrey f-08`}>
                    <Rating precision={0.5} name="read-only" size="small" value={props.rating} readOnly />
                    {props.rating} avg rating - &nbsp;
                    {props.ratingsCount} ratings - published&nbsp;
                    {props.published || "n/a"}
                </div>

                <span className={`${descClass} meriR f-1`}>
                    "{props.description}"
                </span>
                <GoodLink onClick={handleShowMore} titleText={showMore} classes="meriR grGreen"></GoodLink>
                <div className={styles.bottom}>
                    <GoodGreenButton bookUuid={props.book.uuid} styled={false}/>
                </div>
            </span>
        </div>
    );
}