import { Divider, Stack } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useSelector } from "react-redux";
import GoodLink from "../assets/components/GoodLink";
import ProfileListEl from "../assets/components/ProfileListEl";
import "../assets/components/styles.css";
import Title from "../assets/components/Title";
import GenreTitle from "../assets/components/GenreTitle";
import UserBooksLayout from "../assets/components/UserBooksLayout";


const useStyles = makeStyles({
  container: {
    padding: "20px 0",
    minHeight: "80vh",
    maxWidth: "900px",
    margin: "auto",
  },
  avatar: {
    borderRadius: "50%",
    height: "150px",
    width: "150px"
  },
  titleName: {
    fontSize: "1.4em",
    textTransform: "capitalize"
  },
  littleLink: {
    fontSize: "0.7em",
  }
});

export default function ProfilePage() {
  const classes = useStyles();
  const user = useSelector(state => state.userData);
  const shelves = useSelector(state => state.shelves);
  const userShelves = useSelector(state => state.shelves.userShelves);
  const allBooks = useSelector(state => state.books.books);
  const wantToReadBooks = useSelector(state => state.shelves.wantToRead.books);
  const shelvesNames = [];
  let userShelvesNames = [];

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
    if(shelves){
      return shelves[shelfName].books.map(shelfBook => {
        return allBooks.filter(book => book.uuid === shelfBook)[0]
      });
    }else{
      return [];
    }
  })

  return (
    <Stack className={classes.container} spacing={4}>
      <Stack direction="row" spacing={4}>
        <Stack justifyContent="center" alignItems="center">
          <img src={user.avatar} alt="user-avatar" className={classes.avatar} />
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <GoodLink titleText="23 ratings" classes="latoR grGreen"></GoodLink>
            <GoodLink titleText="(5.00 avg)" classes="latoR grGreen"></GoodLink>
          </Stack>
          <GoodLink titleText="0 reviews" classes="latoR grGreen"></GoodLink>
        </Stack>
        <Stack style={{ width: "350px" }}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Title title={user.name.first} className={`${classes.titleName} meriB grBrown`} />
            <GoodLink titleText="(edit profile)" classes={`${classes.littleLink} grGreen latoB`} />
          </Stack>
          <Divider />
          <table>
            <tbody>
              <ProfileListEl title="Details" text="Radomir" />
              <ProfileListEl title="Activity" text="Joined in February 2022" />
            </tbody>
          </table>
        </Stack>
      </Stack>
      <Stack spacing={1} >
        <GenreTitle title={`${user.name.first}\`s favourite books`} ></GenreTitle>
        <Stack direction="row" spacing={1}>
          {getAllBooksFromShelf("read").map(book =>
            <img src={book.cover} alt={book.title} key={book.uuid} height="100px" />
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

  )
}