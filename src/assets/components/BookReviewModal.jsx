import { Divider, Paper } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import GoodButton from "./GoodButton";
import GoodLink from "./GoodLink";
import GoodRating from "./GoodRating";
import "./styles.css";
import x from "../images/X.png";

const paperStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 3,
  paddingRight: 3,
  width: "900px",
  boxSizing: "border-box",
  fontFamily: "Lato Regular"
};

const closeStyle = {
  cursor: "pointer",
  position: "absolute",
  top: 0,
  right: 0,
};

const sectionStyle = {
  marginTop: "10px",
  marginBottom: "15px",
};

const dFlex = {
    display: "flex",
    gap: "5px",
    alignItems: "center"
};

export default function BookReviewModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
      setRating(props.rating)
      setOpen(false)
    };

  const [rating, setRating] = useState(props.rating);
  const handleClearRating = () => {
    setRating(0);
  }

  return (
    <>
      {props.type === "link" && (
        <GoodLink
          classes="grGreen latoR"
          titleText={props.clickTitle}
          onClick={handleOpen}
        />
      )}
      {props.type === "button" && (
        <GoodButton title={props.clickTitle} onClick={handleOpen}></GoodButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={2} sx={paperStyle}>
          <div style={{ position: "relative" }}>
            <img src={x} alt="close" onClick={handleClose} style={closeStyle} />
            <div style={{ display: "flex", gap: "10px", ...sectionStyle }}>
              <img
                src={props.cover}
                alt={`${props.title}-cover`}
                height="80px"
              />
              <div>
                <GoodLink
                  titleText={props.title}
                  classes="meriB grBlack f-11"
                ></GoodLink>
                <br />
                by&nbsp;
                <GoodLink
                  titleText={props.author}
                  classes="meriB grBlack"
                ></GoodLink>
              </div>
            </div>
            <Divider></Divider>
            <div style={sectionStyle}>
              <div style={{...dFlex, marginBottom: "10px"}}>
                My rating:
                <GoodRating size="small" rating={rating}></GoodRating>
                <span className="grGrey f-08 latoR" style={{cursor: "pointer"}} onClick={handleClearRating}>Clear</span>
              </div>

              <div style={dFlex}>
                Bookshelves/tags:
                <select>
                  <option>Want to read</option>
                  <option>Currently reading</option>
                  <option>Read</option>
                </select>
              </div>
            </div>

            <Divider></Divider>
            <div style={sectionStyle}>
              <p>What did you think?</p>
              <textarea
                rows="12"
                placeholder="Enter your review (optional)"
                style={{ width: "100%" }}
              ></textarea>
            </div>
            <Divider></Divider>
            <div style={sectionStyle}>
              <div>
                <span className="latoB">Dates read</span>
                <br />
                <span className="latoR grGrey f-08">
                  Rereading?
                  <br />
                  Now you can track all the times you have read a book. Make
                  sure to fill in the year finished to have it added to your
                  Reading Challenge!
                </span>
              </div>
              <div style={{ ...dFlex, gap: "30px", marginTop: "10px" }}>
                <div>
                  Date started <span className="grLight latoR">(optional)</span>
                  <div style={{...dFlex, marginTop: "10px"}}>
                    <input type="date" />
                    <GoodButton fontSize="0.95em" title="Set to today"></GoodButton>
                  </div>
                </div>
                <div>
                  Date finished&nbsp;
                  <span className="grLight latoR">(optional)</span>
                  <div style={{...dFlex, marginTop: "10px"}}>
                    <input type="date"/>
                    <GoodButton fontSize="0.95em" title="Set to today"></GoodButton>
                  </div>
                </div>
              </div>
            </div>

            <Divider></Divider>
            <GoodButton title="Post" fontSize="0.95em" style={sectionStyle}></GoodButton>
          </div>
        </Paper>
      </Modal>
    </>
  );
}
