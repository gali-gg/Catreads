import { makeStyles } from '@mui/styles';
 import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SideMenuEl from '../assets/components/SideMenuEl';
import SideMenuImageEl from '../assets/components/SideMenuImageEl';
import books from '../data/books';
import RecommendBookLayout from '../assets/components/RecommendBookLayout';
import { Footer } from '../assets/components/Footer';

const useStyles = makeStyles({
    main: {
    background: "#F9F7F4",
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
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
            <Stack direction="row" style={{padding:0}} spacing={2}>
                <Container style={{padding:0, width: "25%"}}>
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
                </Container>
                <Container sx={{bgcolor:"#ccc", height:"200vh", width: "45%"}}/>
                <Container maxWidth="xs" sx={{width: "30%"}}>
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
        </React.Fragment>
    </div>
  );
}
