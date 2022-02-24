import { Dialog, Divider, Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from "react-redux";
import GoodLink from "../assets/components/GoodLink";
import ProfileListEl from "../assets/components/ProfileListEl";
import "../assets/components/styles.css";
import Title from "../assets/components/Title";
import GenreTitle from "../assets/components/GenreTitle";
import UserBooksLayout from "../assets/components/UserBooksLayout";
import SideMenuImageEl from "../assets/components/SideMenuImageEl";
import { useNavigate } from "react-router-dom";
import SideMenuEl from "../assets/components/SideMenuEl";
import { useState } from "react";
import ProfileModal from "../assets/components/ProfileModal";


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
  const genres = useSelector(state => state.genres.genres);
  const shelves = useSelector(state => state.shelves);
  const userShelves = useSelector(state => state.shelves.userShelves);
  const allBooks = useSelector(state => state.books.books);
  const shelvesNames = [];
  let userShelvesNames = [];
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getAllBooksFromShelf = ((shelfName) => {
    if (shelves) {
      return shelves[shelfName].books.map(shelfBook => {
        return allBooks.filter(book => book.uuid === shelfBook)[0]
      });
    } else {
      return [];
    }
  })

  let favouriteGenres = user.favouriteGenres.map(genre => {
    return { title: genres.find(g => g.uuid === genre).genre }
  })

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Stack direction="row" className={classes.container} spacing={3}>
      <Stack spacing={4} sx={{ minWidth: "700px" }}>
        <Stack direction="row" spacing={4}>
          <Stack justifyContent="center" alignItems="center">
            <img src={user.avatar} alt="user-avatar" className={classes.avatar} />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <GoodLink titleText="23 ratings" classes="latoR grGreen"></GoodLink>
              <GoodLink titleText="(5.00 avg)" classes="latoR grGreen"></GoodLink>
            </Stack>
            <GoodLink titleText="0 reviews" classes="latoR grGreen"></GoodLink>
          </Stack>
          <Stack style={{ width: "100%" }}>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
              <Title
                title={`${user.name.first} ${user.name.last ? user.name.last : ""}`}
                className={`${classes.titleName} meriB grBrown`} />
              <GoodLink titleText="(edit profile)" classes={`${classes.littleLink} grGreen latoB`} onClick={handleOpenModal} />
            </Stack>
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <ProfileModal onClose={handleCloseModal}></ProfileModal>
            </Dialog>
            <Divider />
            <table>
              <tbody>
                <ProfileListEl title="Details" location={true} />
                <ProfileListEl title="Joined" date={true} />
              </tbody>
            </table>
          </Stack>
        </Stack>
        <Stack spacing={1} >
          <GenreTitle title={`${user.name.first}\`s favourite books`} ></GenreTitle>
          <Stack direction="row" spacing={1}>
            {getAllBooksFromShelf("read").map(book =>
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
          {getAllBooksFromShelf("currentlyReading").map(book =>
            <UserBooksLayout
              key={`${book.uuid}-cr`}
              doing="is currently reading"
              book={book}
            />
          )}
        </Stack>

        <Stack spacing={1}>
          <GenreTitle title={`${user.name.first} recent updates`} ></GenreTitle>
          {getAllBooksFromShelf("read").map(book =>
            <UserBooksLayout
              key={`${book.uuid}-r`}
              doing="has read"
              book={book}
            />
          )}
          {shelves && getAllBooksFromShelf("wantToRead").map(book =>
            <UserBooksLayout
              key={`${book.uuid}-wr`}
              doing="wants to read"
              book={book}
            />
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
        <SideMenuEl
          title="favourite genres"
          divider={false}
          status={favouriteGenres}
        />
      </Stack>
    </Stack>

  )
}