import { Container } from "@mui/material";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/css/styles.css";
import GoodButton from "../assets/components/GoodButton";
import styles from "./cssModules/myBooksStyles.module.css"
import MyBooksTable from "../assets/components/MyBooksTable";
import { useState } from "react";
import { debounce, getBookReviews, getRatingsStats } from "../utility";
import icon from "../assets/images/search-icon-small.png";
import { useSelector } from "react-redux";
import _ from "lodash";
import AddShelfInput from "./AddShelfInput";

export default function MyBooksPage () {
    const shelves = useSelector(state => state.shelves);

    let userShelves;

    for (let shelf in shelves) {
        if (shelf === "userShelves") {
          if (shelves[shelf].length > 0) {
            userShelves = shelves[shelf].map(userShelf => {
              return { name: userShelf.name, books: userShelf.books }
            });
          }
        }
    }

    let allBooks = useSelector(state => {
        let {userShelves, ...regularShelves} = state.shelves;

        let allBooks = [];

        for (let key in regularShelves) {
            allBooks.push(...regularShelves[key].books);
        }

        userShelves.forEach(shelf => {
            allBooks.push(...shelf.books);
        });

        let allUserBooks = allBooks.map(bookID => state.books.books.find(book => bookID === book.uuid));
        return _.uniqBy(allUserBooks, "uuid");

    });

    const [listBooks, setListBooks] = useState(allBooks);

    function getSelectedBooks(isSelectedObj) {
        let books;
        if (isSelectedObj.all) {
            books = allBooks;
        } else if (isSelectedObj.wantToRead) {
            books = getAllBooksFromShelf("wantToRead");
        } else if (isSelectedObj.currentlyReading) {
            books = getAllBooksFromShelf("currentlyReading");
        } else if (isSelectedObj.read) {
            books = getAllBooksFromShelf("read");
        }

        return books || [];
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

    const [isSearching, setIsSearching] = useState(false);
    const handleSearch = debounce((e) => {
        setIsSearching(true);
        let booksToSearch = getSelectedBooks(isSelected);
        let searchString = e.target.value.trim().toLowerCase();
        if (searchString) {
            let filteredBooks = booksToSearch.filter(book => book.title.toLowerCase().includes(searchString));
            setListBooks(filteredBooks);
        } else {
            setIsSearching(false);
        }
    }, 300);

    const handleDisplayShelf = (e) => {
        setUserShelfSelected(false);
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

    const getAllBooksFromShelf = ((shelfName) => {
        if(shelves && allBooks){
          return shelves[shelfName].books.map(shelfBook => {
            return allBooks.find(book => book.uuid === shelfBook);
          });
        }else{
          return [];
        }
    });

    const [addShelfOpen, setAddShelfOpen] = useState(false);
    const handleAddShelfClick = () => {
        setAddShelfOpen(true);
    }

    const [userShelfSelected, setUserShelfSelected] = useState(false);

    const handleDisplayUserShelfBooks = (e) => {
        setUserShelfSelected(true);
        let shelfName = e.target.id;

        let bookIDs = userShelves.find(shelf => shelf.name === shelfName).books;
        let books = bookIDs.map(bookID => allBooks.find(book => book.uuid === bookID));
        setListBooks(books);
    }

    const [ascending, setAscending] = useState(false);

    const handlePickAscending= () => {
        setAscending(true);
    }

    const handlePickDescending= () => {
        setAscending(false);
    }

    const [sortBy, setSortBy] = useState("title");

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    }

    const authors = useSelector(state => state.authors.authors);
    const userID = useSelector (state => state.userData.id);
    function sortBooks (booksArr, sortBy = "title", ascending = false){
        //sortBy value can be "title", "author", "rating", "userRating"
        let books = [...booksArr];

        if(sortBy === "title"){
            if(ascending) {
                return books.sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));
            }
            return books.sort((bookA, bookB) => bookB.title.localeCompare(bookA.title));
        }

        else if (sortBy === "author") {
            books.sort((bookA, bookB) => {
                let bookAauthor = authors.find(author => author.uuid === bookA.author).name;
                let bookBauthor = authors.find(author => author.uuid === bookB.author).name;

                if(ascending) {
                    return bookAauthor.localeCompare(bookBauthor);
                }
                return bookBauthor.localeCompare(bookAauthor);
            });
        }
        else if (sortBy === "rating"){

            books.sort((bookA, bookB) => {
                if(ascending){
                    return getRatingsStats(bookA.uuid).rating - getRatingsStats(bookB.uuid).rating;
                }
                return getRatingsStats(bookB.uuid).rating - getRatingsStats(bookA.uuid).rating;
            });
        }
        else if (sortBy === "userRating") {

            books.sort((bookA, bookB) => {
                let bookAuserReview = getBookReviews(bookA.uuid).find(review => review.senderID === userID) || {rating: 0};
                let bookBuserReview = getBookReviews(bookB.uuid).find(review => review.senderID === userID) || {rating: 0};

                if(ascending) {
                    return bookAuserReview.rating - bookBuserReview.rating
                }
                return bookBuserReview.rating - bookAuserReview.rating
            })
        }

        return books;
    }

    return (
        <Container maxWidth="lg" sx={{mt: 2, mb: 5}}>
            <div className={styles.pageHeading}>
                <GoodLink size="1.5em" titleText="My Books" classes="meriB grGreen"></GoodLink>
                <div className={styles.headingSide}>
                    Sort by:
                    <select value={sortBy} onChange={handleSortByChange}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="rating">Average rating</option>
                        <option value="userRating">My rating</option>
                    </select>
                    <GoodLink titleText="▲" titleInfo="Sort ascending" classes={`latoR f-1 ${ascending ? "grBrown" : "grLight"}`} onClick={handlePickAscending}></GoodLink>
                    <GoodLink titleText="▼" titleInfo="Sort descending" classes={`latoR f-1 ${ascending ? "grLight" : "grBrown"}`} onClick={handlePickDescending}></GoodLink>

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
                    <li><GoodLink size={fontSize} titleText={`All (${allBooks.length})`} classes={`latoR ${isSelected.all ? "grGrey" : "grGreen"}`} id="lall" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Read" classes={`latoR ${isSelected.read ? "grGrey" : "grGreen"}`} id="lread" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Currently Reading" classes={`latoR ${isSelected.currentlyReading ? "grGrey" : "grGreen"}`} id="lcurrentlyReading" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText="Want to Read" classes={`latoR ${isSelected.wantToRead ? "grGrey" : "grGreen"}`} id="lwantToRead" onClick={handleDisplayShelf}></GoodLink></li>

                    {userShelves && <><hr></hr>
                           { userShelves.map(shelf => <><GoodLink key={shelf.name} titleText={shelf.name} classes="latoR grGreen f-1" id={shelf.name} onClick={handleDisplayUserShelfBooks}></GoodLink><br></br></>)}</>
                    }
                    <hr></hr>
                    <GoodButton title="Add shelf" padding="5px 15px" fontSize="12px" style={{height: "30px"}} onClick={handleAddShelfClick}></GoodButton>
                    {addShelfOpen && <AddShelfInput/>}
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
                {!userShelfSelected && <MyBooksTable books={isSearching ? sortBooks(listBooks, sortBy, ascending) : sortBooks(getSelectedBooks(isSelected), sortBy, ascending)} shelfName={shelfName}></MyBooksTable>}
                {userShelfSelected && <MyBooksTable books={sortBooks(listBooks, sortBy, ascending)} shelfName={shelfName}></MyBooksTable>}
                </div>
                </Container>
    )
}