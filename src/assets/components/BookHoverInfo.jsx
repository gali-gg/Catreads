import GoodLink from "./GoodLink"
import GoodRating from "./GoodRating"
import styles from "./css-modules/bookHoverInfo.module.css"

export default function BookHoverInfo (props) {
    return (
        <div onMouseLeave={props.onMouseLeave} className={styles.container} style={{backgroundColor: "white"}}>
            <GoodLink size="1em" titleText={props.title} classes="meriB grBrown"/>
            <span>by
                <GoodLink titleText={props.author} classes="meriR grBrown"></GoodLink>
                <div>
                    {props.rating} avg rating - &nbsp;
                    {props.ratingsCount} ratings - published &nbsp;
                    {props.published || "n/a"}
                </div>
                <div className={styles.description}>
                    {props.description}
                </div>
                <div>
                    <select>
                        <option>Read</option>
                        <option>Currently reading</option>
                        <option>Want to read</option>
                    </select>

                    <span>Rate this book</span>
                    <GoodRating></GoodRating>
                </div>
            </span>
        </div>
    )
}