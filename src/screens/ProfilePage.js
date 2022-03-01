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
import _ from "lodash";
import UserShelfLayout from "../assets/components/UserShelfLayout";


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
  const activities = useSelector(state => state.activities);
  const [allActivities, setAllActivities] = useState([]);
  const shelvesNames = [];
  let userShelvesNames = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const reviews = useSelector(state => {
    return state.reviews.reviews.filter(review => review.senderID === user.id);
  });

  function loadAllHistory() {
    if (activities) {
      let uniqActivities = [];
      for (let activity in activities) {
        uniqActivities.push(...activities[activity].map(someActivity => someActivity));
      }
      setAllActivities(_.uniqBy(uniqActivities, "uuid").sort((e1, e2) => e2.date - e1.date));
    }
  }

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

  const handleFiltersClick = (activity) => {
    if (activities) {
      let uniqRatingsActivities = [...activities[activity].map(someActivity => someActivity)];
      setAllActivities(_.uniqBy(uniqRatingsActivities, "uuid").sort((e1, e2) => e2.date - e1.date));
    }
  }

  const handleAllClick = () => {
    if (activities) {
      loadAllHistory()
    }
  }

  useEffect(() => {
    if (activities) {
      loadAllHistory();
    }
  }, [activities]);

  useEffect(() => {
    let allRatings = 0;
    let allRatingsCount = 0;
    let allReviews = 0;
    reviews.forEach(review => {
      if (review.body.length > 0) {
        allReviews += 1;
      }
      allRatings += review.rating;
      allRatingsCount += 1;

    });
    let avg = allRatingsCount === 0 ? 0 : allRatings / allRatingsCount;
    setAvgRating(avg);
    setReviewsCount(allReviews);
  }, [reviews]);

  return (
    <Stack direction="row" className={classes.container} spacing={3}>
      <Stack spacing={4} sx={{ minWidth: "720px" }}>
        <Stack direction="row" spacing={4}>
          <Stack justifyContent="center" alignItems="center">
            <img src={user.avatar} alt="user-avatar" className={classes.avatar} />
            <GoodLink
              titleText={`${reviews && reviews.length} ${reviews.length > 1 ? "ratings" : "rating"} (${avgRating.toFixed(2)} avg)`}
              classes="latoR grGreen"
              onClick={() => handleFiltersClick("ratingsActivity")}
            />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <GoodLink titleText={`${reviewsCount} reviews`} classes="latoR grGreen" onClick={() => handleFiltersClick("reviewsActivity")} />
              <GoodLink titleText="see all" classes="latoB grGreen" onClick={handleAllClick} />
            </Stack>
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
          <Stack direction="column" spacing={2}>
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
            </Stack>
            <Stack direction="row" spacing={4} flexWrap="wrap">
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
          </Stack>
          <span className="text-right">
            <GoodLink titleText="More ..." to="/myBooks" classes="f-08 grGreen latoB" />
          </span>
        </Stack>

        <Stack spacing={1}>
          <GenreTitle title={`${user.name.first} is currently reading`} />
          {activities && allActivities.length > 0 &&
            allActivities.filter(activity => activity.shelfName === "Currently Reading").map(activity =>
              <UserBooksLayout
                key={activity.uuid}
                book={allBooks.filter(book => book.uuid === activity.bookID)[0]}
                doing={activity.doing}
                shelfName={activity.shelfName || null}
                date={activity.date}
              />
            )}
        </Stack>

        <Stack spacing={1}>
          <GenreTitle title={`${user.name.first} recent updates`} />
          {activities && allActivities.length > 0 && allActivities.map(activity => {
            if (activity.bookID) {
              return <UserBooksLayout
                key={activity.uuid}
                book={activity.bookID && allBooks.filter(book => book.uuid === activity.bookID)[0]}
                doing={activity.doing}
                shelfName={activity.shelfName || null}
                date={activity.date}
              />
            } else {
              return <UserShelfLayout
                key={activity.uuid}
                doing={activity.doing}
                shelfName={activity.shelfName}
                date={activity.date}
              />
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