import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Link from "@mui/material/Link";
import {useLocation} from 'react-router-dom';



import axios from "axios"
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}
export default function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userotp, setuserotp] = useState("");
  const [accountcreated, setaccountcreated] = useState(false);
  async function verifyOTPFunction() {
    let sentotp = location.state.sentotp;
    if (userotp == sentotp) {

      let userdata = location.state.userdata ; 
      
      let response = await axios.post(`https://mern-expenses.herokuapp.com/feedToDatabase` , {userdata: userdata})
      if (response.data.userAdded) {
        setaccountcreated(true)
      }
      else {
        setaccountcreated(false)
      }
      // let response_from_mail = await axios.post(
      //   "http://localhost:8000/sendmail"
      // );
      // navigate("/signin");
    } else {
      
    }
   
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <TextField
          sx={{ mx: 1 }}
          id="outlined-password-input"
          label="otp"
          type="password"
          disabled = {accountcreated}
          onChange={(e) => {
            setuserotp(e.target.value);
          }}
          autoComplete="current-password"
        />
        <Button
        disabled = {accountcreated}
          onClick={(e) => {
            e.preventDefault();
            verifyOTPFunction();
          }}
          variant="contained"
          color="success"
        >
          Success
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
       {accountcreated &&  <Alert severity="success">
          <Link href="/signin" color="inherit" underline="none" sx={{ my: 8 }}>
            Account Created . Click to go to login now
          </Link>
        </Alert>}
      </Box>
    </div>
  );
}
