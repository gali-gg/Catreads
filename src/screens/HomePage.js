import { makeStyles } from '@mui/styles';
 import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SideMenuEl from '../assets/components/SideMenuEl';
import SideMenuImageEl from '../assets/components/SideMenuImageEl';
import books from '../data/books';
import RecommendBookLayout from '../assets/components/RecommendBookLayout';
import { Footer } from '../assets/components/Footer';
import Post from '../assets/components/Post';
import NewsPost from '../assets/components/NewsPost';
import Title from '../assets/components/Title';
import settingsIcon from "../assets/images/icon_settings.svg";
import GoodLink from '../assets/components/GoodLink';

const useStyles = makeStyles({
    main: {
        background: "#F9F7F4",
        paddingTop: "10px"
    }
});


export default function HomePage () {
    const classes = useStyles();

    const chooseBook = () => books[Math.ceil(Math.random()*8)];
    const [book, setBook] = useState(chooseBook());

    const handleNewBook = () => {
        setBook(chooseBook());
    }

  return (
    <div className={classes.main}>
        <Container sx={{maxWidth: "1220px"}} style={{padding:0}}>
            <Stack direction="row" style={{padding:0}} spacing={2}>
                <Stack style={{paddingRight:"5px", width: "25%"}}>
                        <SideMenuEl 
                            title="currently reading" 
                            imgSrc="https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg"
                            text="What are you reading?"
                            searchBox={true}
                            hrefs={[ "Recommendations", "General update"]}
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
                        <SideMenuEl 
                            title="want to read" 
                            imgSrc="https://s.gr-assets.com/assets/react_components/shelf_display/icn_default_wtr_leftrail-62c079d4573e5db15651d273fc72d1d2.svg"
                            text="What do you want to read next?"
                            hrefs={["Recommendations"]}
                        />
                        <SideMenuEl 
                            title="bookshelves" 
                            divider={false}
                            status={[{
                                title: "Want to Read",
                                num: 0,
                            },{
                                title: "Currently Reading",
                                num : 2,
                            },{
                            title: "Read",
                            num : 26,
                            },{
                                title:"User Shelf",
                                num : 1,
                            }]}
                        />
                </Stack>
                
                <Stack sx={{width: "45%"}} spacing={2}>
                    <NewsPost 
                        src="https://images.gr-assets.com/misc/1643153495-1643153495_goodreads_misc.png"
                        title="Celebrate Romance Week on Goodreads!"
                        subTitle="Be our Valentine with these sweet and sexy reads."
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Title title="Updates" className="grBlack text-upper f-095 latoB"/>
                        <Stack direction="row" alignItems="center" sx={{gap:"3px"}}>
                            <img src={settingsIcon} height="15" alt="settings-icon" />
                            <GoodLink titleText="Customize" classes="grGrey f-095"/>
                        </Stack>
                    </Stack>
                    <Post 
                        profileImg="https://images.gr-assets.com/authors/1596216614p5/1077326.jpg"
                        name="J.K. Rowling"
                        postText="Sed condimentum fringilla consectetur. Vivamus eu orci quis elit imperdiet pretium. Morbi vel odio viverra, efficitur odio interdum <3"
                        date="12 May"
                        likes="Yali and 117 other people liked this"
                        links={["Like", "Comment"]}
                    />
                    <Post 
                        profileImg="https://images.gr-assets.com/authors/1610567480p5/7353006.jpg"
                        name="Nicola Yoon"
                        postText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget nibh ante. Fusce ut ultricies urna. Sed purus quam, cursus vel arcu id, cursus pretium sem."
                        date="26 April"
                        likes="Many and 826 other people liked this"
                        links={["Like", "Comment"]}
                    />
                    <span className="latoR grBlack f-09 text-center">No More Updates</span>
                </Stack>
                
                <Container maxWidth="xs" sx={{width: "29%"}}>
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
                        <RecommendBookLayout handleNewBook={handleNewBook} book={book} secondBook={chooseBook().title} />
                        <Footer direction="row" width="100%" titleColor="#382110"></Footer>
                </Container>
            </Stack>
        </Container>
    </div>
  );
}
