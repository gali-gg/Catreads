import { Container } from "@mui/material";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/styles.css"
import books from "../data/books.js";
import MyBooksTableRow from "../assets/components/MyBooksTableRow";
import {authorManager} from "../model/AuthorManagerService";
import GoodButton from "../assets/components/GoodButton";
import styles from "./myBooksStyles.module.css"

export default function MyBooksPage () {
    const fontSize = "1em";
    return (
        <Container maxWidth="lg" sx={{mt: 2, mb: 5}}>
            <div className={styles.pageHeading}>
                <GoodLink size="1.5em" titleText="My Books" classes="meriB grGreen"></GoodLink>
                <div className={styles.headingSide}>
                <input type="search" placeholder="Search books"/>
                <GoodLink titleText="Batch Edit" classes="latoR grGreen"></GoodLink>
                <GoodLink titleText="Settings" classes="latoR grGreen"></GoodLink>
                <GoodLink titleText="Stats" classes="latoR grGreen"></GoodLink>
                <GoodLink titleText="Print" classes="latoR grGreen"></GoodLink>
                </div>
            </div>
            <hr></hr>
            <div className={styles.mainContent}>
                <ul className={styles.sideList}>
                    <li><GoodLink size={fontSize} titleText="Bookshelves" classes="latoB grBrown"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="All" classes="latoR grGrey"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Read" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Currently Reading" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Want to Read" classes="latoR grGreen"></GoodLink></li>
                    <hr></hr>
                    <GoodButton title="Add shelf" padding="5px 15px" fontSize="12px" style={{height: "30px"}}></GoodButton>
                    <hr></hr>
                    <li><GoodLink size={fontSize} titleText="Your reading activity" classes="latoB grBrown"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Review Drafts" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Kindle Notes & Highlights" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Reading Challenge" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Year in Books" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Reading Stats" classes="latoR grGreen"></GoodLink></li>

                    <li><GoodLink size={fontSize} titleText="Add books" classes="latoB grBrown"></GoodLink></li>

                    <li><GoodLink size={fontSize} to="/recommendations" titleText="Recommendations" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Explore" classes="latoR grGreen"></GoodLink></li>

                    <li><GoodLink size={fontSize} titleText="Tools" classes="latoB grBrown"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Owned Books" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Find Duplicates" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Widgets" classes="latoR grGreen"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Import and export" classes="latoR grGreen"></GoodLink></li>
                </ul>
            <table className="text-left">
                <thead >
                    <tr>
                    <th>
                        <GoodLink titleText="cover" classes="latoB grBrown"/>
                    </th>
                    <th>
                        <GoodLink titleText="title" classes="latoB grBrown"/>
                    </th>
                    <th>
                        <GoodLink titleText="author" classes="latoB grBrown"/>
                    </th>
                    <th>
                        <GoodLink titleText="avg rating" classes="latoB grBrown text-left"/>
                    </th>
                    <th>
                        <GoodLink titleText="rating" classes="latoB grBrown"/>
                    </th>
                    <th>
                        <GoodLink titleText="shelves" classes="latoB grBrown"/>
                    </th>
                    <th>
                        <GoodLink titleText="date read" classes="latoB grBrown"/>
                    </th>
                    <th>
                        <GoodLink titleText="date added" classes="latoB grBrown"/>
                    </th>
                    <th>
                    </th>
                    <th>
                    </th>
                    </tr>
                </thead>
                <tbody>
                {books.map(book => {
                        return <MyBooksTableRow key={book.uuid}
                            book={book}
                            authorName = {authorManager.getNameById(book.author)}
                            userRating = {Math.random()*6}
                            dateRead = "Feb 12, 2022"
                            dateAdded = "Feb 10, 2022"
                            shelves={["to-read", "best-books"]}
                        ></MyBooksTableRow>

                    })}
                </tbody>
            </table>
            </div>
        </Container>

    )
}