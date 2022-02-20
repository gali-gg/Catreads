import { Container } from "@mui/material";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/styles.css"
import books from "../data/books.js";
import GoodButton from "../assets/components/GoodButton";
import styles from "./myBooksStyles.module.css"
import MyBooksTable from "../assets/components/MyBooksTable";
import { useEffect, useState } from "react";
import { debounce } from "../utility";
import icon from "../assets/images/search-icon-small.png";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import _ from "lodash";

export default function MyBooksPage () {
    const dispatch = useDispatch();

    let allBooks = useSelector(state => {
        let allBooks = [];
        for (let key in state.shelves) {
            allBooks.push(...state.shelves[key]);
        }
        return _.uniqBy(allBooks, "uuid");
    }, shallowEqual);

    let wantToReadBooks = useSelector(state => {
        return state.shelves["Want to Read"];
    }, shallowEqual);

    let currentlyReadingBooks = useSelector(state => {
        return state.shelves["Currently Reading"];
    }, shallowEqual);

    let readBooks = useSelector(state => {
        return state.shelves["Read"];
    }, shallowEqual);

    const [listBooks, setListBooks] = useState(allBooks);

    function getSelectedBooks(isSelectedObj) {
        let books;
        if (isSelectedObj.all) {
            books = allBooks;
        } else if (isSelectedObj.wantToRead) {
            books = wantToReadBooks;
        } else if (isSelectedObj.currentlyReading) {
            books = currentlyReadingBooks;
        } else if (isSelectedObj.read) {
            books = readBooks;
        }

        return books;
    }

    function getSelectedShelfName (isSelectedObj) {
        let shelfName;
        if (isSelectedObj.all) {
            shelfName = "All";
        } else if (isSelectedObj.wantToRead) {
            shelfName = "Want to Read";
        } else if (isSelectedObj.currentlyReading) {
            shelfName = "Currently Reading";
        } else if (isSelectedObj.read) {
            shelfName = "Read";
        }
        return shelfName;
    }

    const handleSearch = debounce((e) => {
        let booksToSearch = getSelectedBooks(isSelected);
        let searchString = e.target.value.trim().toLowerCase();
        if (searchString) {
            let filteredBooks = booksToSearch.filter(book => book.title.toLowerCase().includes(searchString));
            setListBooks(filteredBooks);
        } else {
            setListBooks(booksToSearch);
        }
    }, 300);

    const handleDisplayShelf = (e) => {
        let isSelectedCopy = {
            ...isSelected
        };

        for (let key in isSelected) {
            if (isSelected[key]) {
                isSelectedCopy[key] = !isSelectedCopy[key];
            }
        }

        let keyName = e.target.id.slice(1);
        isSelectedCopy[keyName] = true;

        setIsSelected(isSelectedCopy);
        setListBooks(getSelectedBooks(isSelectedCopy));
        setShelfName(getSelectedShelfName(isSelectedCopy));
    }

    const [isSelected, setIsSelected] = useState({
        all: true,
        wantToRead: false,
        currentlyReading: false,
        read: false
    });

    const [shelfName, setShelfName] = useState("All");

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
                <GoodLink titleText="Settings" classes="latoR grGreen" ></GoodLink>
                <GoodLink titleText="Stats" classes="latoR grGreen"></GoodLink>
                <GoodLink titleText="Print" classes="latoR grGreen"></GoodLink>
                </div>
            </div>
            <hr></hr>
            <div className={styles.mainContent}>
                <ul className={styles.sideList}>
                    <li><GoodLink size={fontSize} titleText="Bookshelves" classes="latoB grBrown"></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="All" classes={`latoR ${isSelected.all ? "grGrey" : "grGreen"}`} id="lall" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Read" classes={`latoR ${isSelected.read ? "grGrey" : "grGreen"}`} id="lread" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Currently Reading" classes={`latoR ${isSelected.currentlyReading ? "grGrey" : "grGreen"}`} id="lcurrentlyReading" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Want to Read" classes={`latoR ${isSelected.wantToRead ? "grGrey" : "grGreen"}`} id="lwantToRead" onClick={handleDisplayShelf}></GoodLink></li>
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
                <MyBooksTable books={listBooks} shelfName={shelfName}></MyBooksTable>
                </div>
                </Container>
    )
}