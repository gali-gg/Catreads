import { Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import authors from "../../data/authors";
import GoodGreenButton from "./GoodGreenButton";
import "./styles.css";
import Title from "./Title";
import StyledRouterLink from "./StyledRouterLink";
import GoodRating from "./GoodRating";
import X from "../images/X.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookReviewModal from "./BookReviewModal";
import { getRatingsStats } from "../../utility";

const useStyles = makeStyles({
    subContainer: {
        width: "350px",
        gap: "5px"
    },
    userName: {
        padding: "20px 0",
        background: "#daf",
        minHeight: "80vh",
        maxWidth: "900px",
        margin: "auto",
    },
    links: {
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    spanDate: {
        marginTop: "10px"
    },
    X: {
        alignSelf: "flex-end",
        paddingBottom: "10px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    pointer:{
        cursor: "pointer"
    }
});

export default function UserBooksLayout(props) {
    const [isClosed, setIsClosed] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const user = useSelector(state => state.userData);
    const shelves = useSelector(state => state.shelves);
    let bookShelves = [];
    let bookReviews = useSelector(state => state.reviews.reviews.filter(review => review.bookID === props.book.uuid));
    let bookRating = getRatingsStats(bookReviews);

    for (let shelf in shelves) {
        if (shelf === "userShelves") {
            shelves.userShelves.forEach(uShelf => {
                if (uShelf.books.some(uBook => uBook === props.book.uuid)) {
                    bookShelves.push(uShelf.name);
                }
            })
            continue;
        }
        if (shelves[shelf].books.some(book => book === props.book.uuid)) {
            bookShelves.push(shelf);
        }
    }

    let author = authors.filter(author => author.uuid === props.book.author)[0];

    const handleClose = () => {
        setIsClosed(true)
    }

    return !isClosed && (
        <Stack direction="row" spacing={3} flexWrap="wrap" borderBottom="1px solid #ddd" padding="5px 0">
            <img
                src={props.book.cover}
                alt={props.book.title}
                width="90"
                className={classes.pointer}
                title={props.book.title}
                onClick={() => navigate(`/books/${props.book.uuid}`)}
            />
            <Stack className={classes.subContainer}>
                <Stack direction="row" alignItems="center" sx={{ gap: "5px" }}>
                    <StyledRouterLink
                        className={`${classes.links} latoB f-09 grGreen`}
                        href="/user"
                        title={user.name.first}
                    />
                    <span className="latoR f-08">{props.doing}</span>
                </Stack>
                <Title
                    title={props.book.title}
                    className={`${classes.pointer} meriB grBrown`}
                    onClick={() => navigate(`/books/${props.book.uuid}`)}
                />
                <span className="meriR f-075">by {author.name}</span>
                <Stack direction="row" spacing={1} alignItems="center">
                    <span className="latoR f-08 grBrouwn">bookshelves: </span>
                    {bookShelves.map(bShelf =>
                        <StyledRouterLink
                            key={bShelf}
                            title={bShelf}
                            href="/myBooks"
                            className={`${classes.links} latoR f-08 grGreen`}
                        />
                    )}
                </Stack>
                <span className={`${classes.spanDate} latoR grGrey f-1`}>Feb 21, 2022 12:43AM </span>
            </Stack>
            <Stack alignItems="center" gap={0.5}>
                <GoodGreenButton styled={true} bookUuid={props.book.uuid}></GoodGreenButton>
                <BookReviewModal type="link" clickTitle="Rate this book" cover={props.book.cover} title={props.book.title} author={author.name} book={props.book} rating={bookRating.rating} className="f-08 latoR grGrey"></BookReviewModal>
            </Stack>
            <img src={X} alt="close-icon" width="10" height="10" onClick={handleClose} className={classes.X} />
        </Stack>
    )
}