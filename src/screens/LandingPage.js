import { Divider, Stack } from "@mui/material";
import discoverImg from "../assets/images/landing-discover.png";
import styles from "./landingPageStyles.module.css";
import "../assets/components/styles.css";
import SocialLoginButton from "../assets/components/SocialLoginButton";
import GoodLink from "../assets/components/GoodLink";
import GoodReadsLogo from "../assets/components/GoodReadsLogo";
import { Footer } from "../assets/components/Footer";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGoToRegister = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <div className={styles.hero}></div>
      <Stack
        direction="row"
        gap={3}
        sx={{ width: "fit-content", margin: "auto" }}
      >
        <main className={styles.main}>
          <GoodReadsLogo className={styles.logo}></GoodReadsLogo>
          <div className={styles.mainContent}>
            <Stack direction="row" gap={2}>
              <div className={styles.info}>
                <p className={styles.infoHeader}>Deciding what to read next?</p>
                <p className={styles.infoText}>
                  You’re in the right place. Tell us what titles or genres
                  you’ve enjoyed in the past, and we’ll give you surprisingly
                  insightful recommendations.{" "}
                </p>
              </div>
              <div className={styles.info}>
                <p className={styles.infoHeader}>What are your friends reading?</p>
                <p className={styles.infoText}>
                  Chances are your friends are discussing their favorite (and
                  least favorite) books on Goodreads.{" "}
                </p>
              </div>
            </Stack>
            <img src={discoverImg} alt="dsicover" />
          </div>
        </main>
        <aside className={styles.paperPosition}>
          <div className={styles.paper}>
            <Stack gap={1.5} alignItems="center">
              <h3 className="meriR grBrown">Discover & read more</h3>
              <SocialLoginButton
                className={styles.button}
                type="facebook"
              ></SocialLoginButton>
              <SocialLoginButton
                className={styles.button}
                type="amazon"
              ></SocialLoginButton>
              <SocialLoginButton
                className={styles.button}
                type="apple"
              ></SocialLoginButton>
              <SocialLoginButton
                className={styles.button}
                type="regular"
                onClick={handleGoToRegister}
              ></SocialLoginButton>

              <div className={styles.loginBottom}>
                <p className={`${styles.legal} latoR grGrey`}>
                  By creating an account, you agree to the Goodreads
                  <GoodLink
                    titleText="Terms of Service"
                    classes={`${styles.goodlink} latoR grGreen`}
                  />
                  and
                  <GoodLink
                    titleText="Privacy Policy"
                    classes={`${styles.goodlink} latoR grGreen`}
                  />
                  .
                </p>
                <Divider></Divider>
                <p className={styles.infoText}>
                  Already a member?{" "}
                  <GoodLink
                    titleText="Sign in"
                    to="/sign-in"
                    classes="latoR grGreen"
                  ></GoodLink>
                </p>
              </div>
            </Stack>
          </div>
        </aside>
      </Stack>
      <Footer direction="row"></Footer>
    </>
  );
}
