import { Container } from "@mui/material";
import GoodLink from "../assets/components/GoodLink";
import "../assets/components/css/styles.css";
import GoodButton from "../assets/components/GoodButton";
import styles from "./cssModules/myBooksStyles.module.css"
import MyBooksTable from "../assets/components/MyBooksTable";
import { useEffect, useState } from "react";
import { debounce, getBookReviews, getRatingsStats } from "../utility";
import icon from "../assets/images/search-icon-small.png";
import { useSelector } from "react-redux";
import _ from "lodash";
import AddShelfInput from "./AddShelfInput";

export default function MyBooksPage () {
    const fontSize = "1em";
    const authors = useSelector(state => state.authors.authors);
    const userID = useSelector (state => state.userData.id);
    const shelves = useSelector(state => state.shelves, _.isEqual);

    let userShelves = shelves.userShelves;

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

    const initialShelvesSelection = {
        all: true,
        wantToRead: false,
        currentlyReading: false,
        read: false
    }

    useEffect(() => {
        shelves.userShelves.forEach(shelf => {
            initialShelvesSelection[shelf.name] = false;
        });
    }, [shelves]);

    const [isSelected, setIsSelected] = useState(initialShelvesSelection);
    const [sortBy, setSortBy] = useState("title");
    const [ascending, setAscending] = useState(false);
    const [userShelfSelected, setUserShelfSelected] = useState(false);
    const [addShelfOpen, setAddShelfOpen] = useState(false);
    const [shelfName, setShelfName] = useState("All");
    const [listBooks, setListBooks] = useState(allBooks);
    const [isSearching, setIsSearching] = useState(false);

    function getSelectedBooks(isSelectedObj) {
        let books;

        for (let key in isSelectedObj){
            if(isSelectedObj[key]){
                books = getAllBooksFromShelf(key, userShelfSelected);
                break;
            }
        }
        return books || [];
    }

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
        let shelfName = e.target.id;
        if(!shelves[shelfName] && shelfName !== "all"){
            setUserShelfSelected(true);
        }
        let isSelectedCopy = {
            ...isSelected
        };

        for (let key in isSelected) {
            if (isSelected[key]) {
                isSelectedCopy[key] = !isSelectedCopy[key];
            }
        }

        isSelectedCopy[shelfName] = true;

        setIsSelected(isSelectedCopy);
        setShelfName(shelfName);
    }

    const getAllBooksFromShelf = ((shelfName, isUserShelf) => {
        if(shelves && allBooks){
            if(shelfName === "all"){
                return allBooks;
            }
            if(isUserShelf){
                let books = userShelves.find(shelf => shelf.name === shelfName).books;
                return books.map(shelfBook => {
                    return allBooks.find(book => book.uuid === shelfBook);
                  });
            }
          return shelves[shelfName].books.map(shelfBook => {
            return allBooks.find(book => book.uuid === shelfBook);
          });
        }else{
          return [];
        }
    });

    const handleAddShelfClick = () => {
        setAddShelfOpen(true);
    }

    const handlePickAscending= () => {
        setAscending(true);
    }

    const handlePickDescending= () => {
        setAscending(false);
    }

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    }

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
                    <li><GoodLink size={fontSize} titleText={`All (${allBooks.length})`} classes={`latoR ${isSelected.all ? "grGrey" : "grGreen"}`} id="all" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText={`Read (${shelves.read.books.length})`} classes={`latoR ${isSelected.read ? "grGrey" : "grGreen"}`} id="read" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText={`Currently Reading (${shelves.currentlyReading.books.length})`} classes={`latoR ${isSelected.currentlyReading ? "grGrey" : "grGreen"}`} id="currentlyReading" onClick={handleDisplayShelf}></GoodLink></li>
                    <li><GoodLink size={fontSize} titleText={`Want to Read (${shelves.wantToRead.books.length})`} classes={`latoR ${isSelected.wantToRead ? "grGrey" : "grGreen"}`} id="wantToRead" onClick={handleDisplayShelf}></GoodLink></li>

                    {userShelves.length > 0 && <><hr></hr>
                           { userShelves.map(shelf => <div key={shelf.name}><GoodLink titleText={`${shelf.name} (${shelf.books.length})`} classes={`latoR f-1 ${shelfName === shelf.name ? "grGrey" : "grGreen"}`} id={shelf.name} onClick={handleDisplayShelf}></GoodLink><br></br></div>)}</>
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
                <MyBooksTable books={isSearching ? sortBooks(listBooks, sortBy, ascending) : sortBooks(getSelectedBooks(isSelected), sortBy, ascending)} shelfName={shelfName} isUserShelf={userShelfSelected}></MyBooksTable>
                </div>
                </Container>
    )
}