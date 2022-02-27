import { Dialog, Divider, Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import GoodLink from "../assets/components/GoodLink";
import ProfileListEl from "../assets/components/ProfileListEl";
import "../assets/components/css/styles.css";
import Title from "../assets/components/Title";
import GenreTitle from "../assets/components/GenreTitle";
import UserBooksLayout from "../assets/components/UserBooksLayout";
import SideMenuImageEl from "../assets/components/SideMenuImageEl";
import { useNavigate } from "react-router-dom";
import SideMenuEl from "../assets/components/SideMenuEl";
import { useEffect, useState } from "react";
import ProfileModal from "../assets/components/ProfileModal";
import SideMenulist from "../assets/components/SideMenuList";
import { getAllBooksFromShelf, getFavouriteGenres } from "../utility";


const useStyles = makeStyles({
  container: {
    padding: "20px 0",
    minHeight: "80vh",
    maxWidth: "1020px",
    margin: "auto",
  },
  avatar: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
    objectFit: "cover",
  },
  titleName: {
    fontSize: "1.4em",
    textTransform: "capitalize"
  },
  littleLink: {
    fontSize: "0.7em",
  },
  smallCover: {
    height: "100px",
    cursor: "pointer"
  }
});

export default function ProfilePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useSelector(state => state.userData);
  const shelves = useSelector(state => state.shelves);
  const allBooks = useSelector(state => state.books.books);
  const userShelves = useSelector(state => state.shelves.userShelves);
  const shelvesNames = [];
  let userShelvesNames = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const reviews = useSelector(state => {
    return state.reviews.reviews.filter(review => review.senderID === user.id);
  });

  for (let shelf in shelves) {
    if (shelf === "userShelves") {
      if (userShelves.length > 0) {
        userShelvesNames = userShelves.map(userShelf => {
          return { name: userShelf.name, books: userShelf.books }
        });
      }
      continue;
    }
    shelvesNames.push({ name: shelves[shelf].name, key: shelf })
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  function findBookByID(bookID) {
    if (allBooks) {
      return allBooks.filter(book => book.uuid === bookID)[0];
    }
  }

  useEffect(() => {
    let allRatings = 0;
    let allRatingsCount = 0;
    let allReviews = 0;
    reviews.forEach(review => {
      if (review.rating !== 0) {
        if (review.body.length > 0) {
          allReviews += 1;
        }
        allRatings += review.rating;
        allRatingsCount += 1;
      } else if (review.body.length > 0) {
        allReviews += 1;
      }
    });
    let avg = allRatingsCount === 0 ? 0 : allRatings / allRatingsCount;
    setAvgRating(avg);
    setReviewsCount(allReviews);
  }, [reviews]);

  return (
    <Stack direction="row" className={classes.container} spacing={3}>
      <Stack spacing={4} sx={{ minWidth: "700px" }}>
        <Stack direction="row" spacing={4}>
          <Stack justifyContent="center" alignItems="center">
            <img src={user.avatar} alt="user-avatar" className={classes.avatar} />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <GoodLink
                titleText={`${reviews && reviews.length} ${reviews.length > 1 ? "ratings" : "rating"}`}
                classes="latoR grGreen" />
              <GoodLink titleText={`(${avgRating.toFixed(2)} avg)`} classes="latoR grGreen" />
            </Stack>
            <GoodLink titleText={`${reviewsCount} reviews`} classes="latoR grGreen" />
          </Stack>
          <Stack style={{ width: "100%" }}>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Title
                title={`${user.name.first} ${user.name.last ? user.name.last : ""}`}
                className={`${classes.titleName} meriB grBrown`} />
              <GoodLink titleText="(edit profile)" classes={`${classes.littleLink} grGreen latoB`} onClick={handleOpenModal} />
            </Stack>
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <ProfileModal onClose={handleCloseModal} />
            </Dialog>
            <Divider />
            <table>
              <tbody>
                <ProfileListEl title="Details" location={user.location} />
                <ProfileListEl title="Joined" joined={user.joined} />
              </tbody>
            </table>
          </Stack>
        </Stack>
        <Stack spacing={1} >
          <GenreTitle title={`${user.name.first}\`s favourite books`} ></GenreTitle>
          <Stack direction="row" spacing={1}>
            {getAllBooksFromShelf("read", false).map(book =>
              <img
                src={book.cover}
                alt={book.title}
                key={book.uuid}
                className={classes.smallCover}
                title={book.title}
                onClick={() => navigate(`/books/${book.uuid}`)} />
            ).slice(0, 7)}
          </Stack>
          <span className="text-right">
            <GoodLink titleText="More ..." to="/myBooks" classes="f-08 grGreen latoB"></GoodLink>
          </span>
        </Stack>

        <Stack spacing={1}>
          <GenreTitle title={`${user.name.first}\`s bookshelves`} ></GenreTitle>
          <Stack direction="row" spacing={4} flexWrap="wrap">
            {
              shelvesNames.map(shelfName =>
                <GoodLink
                  to="/myBooks"
                  key={shelfName.key}
                  titleText={`${shelfName.name}(${shelves[shelfName.key].books.length})`}
                  classes="f-09 grGreen latoR"
                />
              )
            }

            {
              userShelvesNames.map(userShelfName =>
                <GoodLink
                  to="/myBooks"
                  key={userShelfName.name}
                  titleText={`${userShelfName.name}(${userShelfName.books.length})`}
                  classes="f-09 grGreen latoR"
                />
              )
            }
          </Stack>
          <span className="text-right">
            <GoodLink titleText="More ..." to="/myBooks" classes="f-08 grGreen latoB"></GoodLink>
          </span>
        </Stack>

        <Stack spacing={1}>
          <GenreTitle title={`${user.name.first} is currently reading`} ></GenreTitle>
          {getAllBooksFromShelf("currentlyReading", false).map(book =>
            <UserBooksLayout
              key={`${book.uuid}-cr`}
              doing="is currently reading"
              book={book}
            />
          )}
        </Stack>

        <Stack spacing={1}>
          <GenreTitle title={`${user.name.first} recent updates`} ></GenreTitle>
          {getAllBooksFromShelf("read", false).map(book =>
            <UserBooksLayout
              key={`${book.uuid}-r`}
              doing="has read"
              book={book}
            />
          )}
          {shelves && getAllBooksFromShelf("wantToRead", false).map(book =>
            <UserBooksLayout
              key={`${book.uuid}-wr`}
              doing="wants to read"
              book={book}
            />
          )}
          {shelves && shelves.userShelves.length > 0 &&
            shelves.userShelves.map(userShelf =>
              getAllBooksFromShelf(userShelf.name, true).map(books =>
                books.map(book =>
                  <UserBooksLayout
                    key={`${book.uuid}-ub`}
                    doing={`Add to shelf ${userShelf.name}`}
                    book={book}
                  />)
              )
            )}
          {reviews && reviews.map(review => {
            let book = findBookByID(review.bookID)
            if (review.rating > 0) {
              return (
                <UserBooksLayout
                  key={`${book.uuid}-ub`}
                  doing={`Rated a book with ${review.rating} stars`}
                  book={book}
                />
              );
            } else {
              return (
                <UserBooksLayout
                  key={`${book.uuid}-ub`}
                  doing={`Added review for`}
                  book={book}
                />
              );
            }
          }
          )}
        </Stack>
      </Stack>
      <Stack sx={{ width: "300px" }}>
        <SideMenuImageEl
          textStaus={true}
          width="35%"
          imgHeight="40"
          imgWidth="80"
          color="#e87400"
          direction="row"
          bigTitle="2022 reading challenge"
          title="2022"
          subTitle="reading challenge"
          imgSrc="https://s.gr-assets.com/assets/challenges/yearly/img_RCBook-626ef5100b911207af0c4d84f02df03a.svg"
        />
        <SideMenuEl
          title={`${user.name.first}\` year in books`}
          imgSrc="https://s.gr-assets.com/assets/yyib/2021/yyib_badge-97eebbbc6f4a367998521da5ae5e422b.png"
          text="Take a look at Your Year in Books. The good, the bad, the long, the short—it’s all here."
          textClass="latoR f-08 grBrown"
          divider={true}
          hrefs={["Go to Your 2021 Year in Books"]}
        />
        <SideMenulist title="Favourite genres" link="" hrefs={getFavouriteGenres(user)} />

      </Stack>
    </Stack>

  )
}