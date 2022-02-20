import { Container } from "@mui/material";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/styles.css"
import books from "../data/books.js";
import GoodButton from "../assets/components/GoodButton";
import styles from "./myBooksStyles.module.css"
import MyBooksTable from "../assets/components/MyBooksTable";
import { useState } from "react";
import { debounce } from "../utility";
import icon from "../assets/images/search-icon-small.png";

export default function MyBooksPage () {
    const [listBooks, setListBooks] = useState(books);

    const handleSearch = debounce((e) => {
        let searchString = e.target.value.trim().toLowerCase();
        if(searchString){
            let filteredBooks = listBooks.filter(book => book.title.toLowerCase().includes(searchString));
            setListBooks(filteredBooks);
        }
        else {
            setListBooks(books);
        }
    }, 300);

    const fontSize = "1em";
    return (
        <Container maxWidth="lg" sx={{mt: 2, mb: 5}}>
            <div className={styles.pageHeading}>
                <GoodLink size="1.5em" titleText="My Books" classes="meriB grGreen"></GoodLink>
                <div className={styles.headingSide}>
                <div className={styles.searchBox}>
                <input className={styles.searchInput} type="search" placeholder="Search books" onInput={handleSearch}/>
                <img className={styles.searchImg} src={icon} alt=""/>
                </div>
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
                <MyBooksTable books={listBooks}></MyBooksTable>
                </div>
                </Container>
    )
}