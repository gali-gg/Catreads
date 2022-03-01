import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SideMenuEl from '../assets/components/SideMenuEl';
import SideMenuImageEl from '../assets/components/SideMenuImageEl';
import RecommendBookLayout from '../assets/components/RecommendBookLayout';
import { Footer } from '../assets/components/Footer';
import NewsPost from '../assets/components/NewsPost';
import Title from '../assets/components/Title';
import settingsIcon from "../assets/images/icon_settings.svg";
import GoodLink from '../assets/components/GoodLink';
import { useSelector, useDispatch } from 'react-redux';
import { addBookToShelf } from '../redux/actions/shelfAction';
import SideMenuImagesMosaic from '../assets/components/SideMenuImagesMosaic';
import { PostsLayout } from '../assets/components/PostsLayout';
import { addBookToShelfActivity } from '../redux/actions/activitiesAction';

const useStyles = makeStyles({
    main: {
        background: "#F9F7F4",
        paddingTop: "10px"
    },
    leftSideMenu: {
        paddingRight: "5px",
        width: "25%"
    },
    rightSideMenu: {
        width: "29%",
        marginLeft: "25px"
    },
    settingsContainer:{
        paddingLeft: "25px"
    }
});

export default function HomePage() {
    const dispatch = useDispatch();
    const shelves = useSelector(state => state.shelves);
    let allBooks = useSelector(state => state.books.books);

    let shelvesStatus = [];
    for (let shelf in shelves) {
        if (shelf === 'userShelves') {
            shelves[shelf].forEach(userShelf => {
                if (userShelf) {
                    shelvesStatus.push({ title: userShelf.name, num: userShelf.books.length })
                }
            })
            continue;
        }
        shelvesStatus.push({ title: shelves[shelf].name, num: shelves[shelf].books.length })
    }

    const handleAddBookToShelfWantToRead = (book) => {
        dispatch(addBookToShelf(false, "Want to Read", book.uuid));
        dispatch(addBookToShelfActivity("Want to Read", book.uuid));

        setBook(chooseBook());
    };

    const chooseBook = () => {
        if (allBooks.length > 0) {
            let book = allBooks[Math.ceil(Math.random() * allBooks.length - 1)];
            if (shelves.wantToRead.books.some(readBook => readBook === book.uuid)) {
                if (numBooks === allBooks.length) {
                    return;
                }
                return chooseBook();
            }
            setNumBooks(numBooks + 1);
            return book;
        }
    };
    const [book, setBook] = useState(null);
    const [numBooks, setNumBooks] = useState(0);

    useEffect(() => {
        setBook(chooseBook())
    }, [allBooks]);

    const handleNewBook = () => {
        setBook(chooseBook());
    }

    const classes = useStyles();

    return (
        <div className={classes.main}>
            <Container sx={{ maxWidth: "1220px" }} style={{ padding: 0 }}>
                <Stack direction="row" >
                    <Stack className={classes.leftSideMenu}>
                        <SideMenuEl
                            title="currently reading"
                            imgSrc="https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg"
                            text="What are you reading?"
                            searchBox={true}
                            hrefs={["Recommendations", "General update"]}
                            divider={true}
                        />
                        <SideMenuImageEl
                            textStaus={true}
                            width="35%"
                            imgHeight="30"
                            imgWidth="80"
                            color="#e87400"
                            direction="row"
                            bigTitle="2022 reading challenge"
                            title="2022"
                            subTitle="reading challenge"
                            imgSrc="https://s.gr-assets.com/assets/challenges/yearly/img_RCBook-626ef5100b911207af0c4d84f02df03a.svg"
                        />
                        {shelves.wantToRead.books.length === 0
                            ?
                            (<SideMenuEl
                                title="want to read"
                                imgSrc="https://s.gr-assets.com/assets/react_components/shelf_display/icn_default_wtr_leftrail-62c079d4573e5db15651d273fc72d1d2.svg"
                                text="What do you want to read next?"
                                divider={true}
                                hrefs={["Recommendations"]}
                            />)
                            :
                            (<SideMenuImagesMosaic
                                title="want to read"
                                href="View all books"
                                to="/myBooks"
                            />)
                        }
                        <SideMenuEl
                            title="bookshelves"
                            divider={false}
                            status={shelvesStatus}
                        />
                    </Stack>

                    <Stack sx={{ width: "45%" }} spacing={2}>
                        <NewsPost
                            src="https://images.gr-assets.com/misc/1643153495-1643153495_goodreads_misc.png"
                            title="Celebrate Romance Week on Goodreads!"
                            subTitle="Be our Valentine with these sweet and sexy reads."
                        />
                        <Stack className={classes.settingsContainer} direction="row" justifyContent="space-between" alignItems="center">
                            <Title title="Updates" className="grBlack text-upper f-095 latoB" />
                            <Stack direction="row" alignItems="center" sx={{ gap: "3px" }}>
                                <img src={settingsIcon} height="15" alt="settings-icon" />
                                <GoodLink titleText="Customize" classes="grGrey f-095" />
                            </Stack>
                        </Stack>
                        <PostsLayout/>
                    </Stack>

                    <Stack className={classes.rightSideMenu}>
                        <SideMenuImageEl
                            color="#32362D"
                            width="300px"
                            imgHeight="175"
                            imgWidth="300"
                            direction="column"
                            bigTitle="GoodReads choice awards"
                            subSubTitle="Announcing the Best Books of 2021"
                            imgSrc="https://s.gr-assets.com/assets/award/2021/choice-logo-home-module-medium-d1fd6c874fdf7f40c63631315522cb8b.png"
                            button="See the Winners"
                            status="4,756,261 Votes Cast"
                        />
                        {book && <RecommendBookLayout
                            title="Recommendation"
                            handleNewBook={handleNewBook}
                            book={book}
                            handleClick={() => handleAddBookToShelfWantToRead(book)}
                        />
                        }
                        <Footer direction="row" width="100%" titleColor="#382110" />
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
