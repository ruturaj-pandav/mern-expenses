import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Title from "./Title";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";

import Checkbox from "@mui/material/Checkbox";

import axios from "axios";
import TextField from "@mui/material/TextField";

const moment = require("moment");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#96ffb2",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};
function preventDefault(event) {
  event.preventDefault();
}


const names = [
  "Test",
  "Coffee",
  "Rent",
  "Food",
  "Auto",
  "Electronics",
  "Bus",
  "Mobile Recharge",
  "Movie",
  "Internship",
  "Stationary",
  "Books",
  "Online Shopping",
  "Other",
];

export default function AddTransaction({
  addTransactionFunction,
  addRandomTransactionFunction,
}) {
  const [transactions, settransactions] = useState("");
  // const [tags, settags] = React.useState([]);
  const [amount, setamount] = React.useState(0);
  const [title, settitle] = React.useState("");

  const [showguidelines, setshowguidelines] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // window.location.reload();
  };
  const [tags , setTags] = React.useState('');

  const handleChange = (event) => {
    setTags(event.target.value);
  };


  async function addTransaction() {
    let frombudget = JSON.parse(sessionStorage.getItem("from_budget"))
    let payload = {
      amount: amount,
      title: title,
      tags: tags,
    };

    
    if (tags && amount && title && title.length > 3 && amount != 0) {
      setshowguidelines(false);
      let frombudget = JSON.parse(sessionStorage.getItem("from_budget"))
    if (frombudget) {
      console.log("user record in localstorage")
      let userid = frombudget.user.id
      console.log(userid)
      console.log("this is userid"  , userid)
      payload.userid = userid;
      console.log("this is the payload that will be sent " , payload)
      addTransactionFunction(payload);
    }
    } else {
      setshowguidelines(true);
    }
  }
  return (
    <React.Fragment>
      <Title>ADD A TRANSACTION</Title>
     
      <br />
      <Grid container spacing={2}>
        <Grid item xs={3}>
       
          <input type="number" required className="addTransactionInputField"    onChange={(e) => {
              setamount(e.target.value);
            }}/>
        </Grid>
        <Grid item xs={3}>
  
          <input type="text" required className="addTransactionInputField"    onChange={(e) => {
              settitle(e.target.value);
            }}/>
        </Grid>

        <Grid item xs={3}>
          
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">tags</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tags}
              label="tags"
              className="optionTag"
              onChange={handleChange}
            >
              <MenuItem value={"coffee"}>coffee</MenuItem>
              <MenuItem value={"tea"}>tea</MenuItem>
              <MenuItem value={"rent"}>rent</MenuItem>
              <MenuItem value={"food"}>food</MenuItem>
              <MenuItem value={"auto"}>auto</MenuItem>
              <MenuItem value={"electronics"}>electronics</MenuItem>
              <MenuItem value={"bus"}>bus</MenuItem>
              <MenuItem value={" recharge"}> recharge</MenuItem>
              <MenuItem value={"movie"}>movie</MenuItem>
              <MenuItem value={"internship"}>internship</MenuItem>
              <MenuItem value={"medical"}>medical</MenuItem>
              <MenuItem value={"stationary"}>stationary</MenuItem>
              <MenuItem value={"books"}>books</MenuItem>
              <MenuItem value={"online shopping"}>online shopping</MenuItem>
              <MenuItem value={"basic"}>basic</MenuItem>
              <MenuItem value={"other"}>other</MenuItem>
           
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              addTransaction(amount, title, tags);
            }}
            variant="contained"
            color="success"
            size="large"
            sx={{ py: 2, px: 4 }}
          >
            add
          </Button>
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <center>Transaction Added Successfully</center>
            </Typography>
            <br />

            <center>
              <small className="text-muted">
                click any where outside the box to close this
              </small>
            </center>
          </Box>
        </Modal>
      </Grid>
      <br />
      {showguidelines == true ? (
        <Alert severity="error">
          <span>All information should be provided</span> <br />
          <span>Title must be atleast 3 characters long</span>
          <br />
          <span>Amount must not be 0</span>
        </Alert>
      ) : null}

      <br />
    </React.Fragment>
  );
}
