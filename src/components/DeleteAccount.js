import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingSpin from "react-loading-spin";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
let sendotp;
export default function DeleteAccount() {
  const location = useLocation();

  const [otp, setotp] = React.useState("");
  const [sendingmail, setsendingmail] = React.useState(false);
  const [mailsent, setmailsent] = React.useState(false);
  const [accountdeletedsuccessfully, setaccountdeletedsuccessfully] = React.useState();

  let email = location.state.email;

  const navigate = useNavigate();

  // send random generated OTP here
  async function otpVerifyFunction() {
 
    if (otp == sendotp) {
    
      let response = await axios.post(
        "https://mern-expenses.herokuapp.com/confirmDeleteAccount",
        { deleteid: location.state.id }
      );
      if (response.data.accountDeleted) {
    
        sessionStorage.removeItem("from_budget");
        // navigate("/signup");
        setaccountdeletedsuccessfully(true)
      } else {
      }
    } else {
     
    }
  }

  async function sendDeleteAccountMail() {
    if (email) {
      var otp = Math.floor(1000 + Math.random() * 9000);
      sendotp = otp;
      setsendingmail(true);
      let response = await axios.post(
        "https://mern-expenses.herokuapp.com/deleteAccountMail",
        { email , otp}
      );
      if (response.data.emailsent) {
        setmailsent(true);
        setsendingmail(false);
      }
    } else {
    }
  }
  return (
    <div>
      <center><h3 className="deleteAccountWarning">  Know that this action is permanent. <br/>You can not restore your account once
        deleted</h3></center>
      <div className="askingMailDiv">
        <h2>
          Click on 'go ahead', we will send a confirmation code to your mail
          that we have
        </h2>
        <TextField
          required
          id="outlined-required"
          label="email"
          disabled={true}
          value={email}
          sx={{ mb: 2 }}
          // onChange={(e) => {
          //   setemail(e.target.value);
          // }}
        />
        <Button
          onClick={() => {
           
            sendDeleteAccountMail();
          }}
          disabled={mailsent}
          variant="contained"
          color="success"
        >
          Go ahead
        </Button>
      </div>
      {sendingmail && (
        <div>
          <center>
            <LoadingSpin
              duration="0.1s"
              primaryColor="#0cc3c1"
              secondaryColor="orange"
              direction="alternate"
              width="3px"
              numberOfRotationsInAnimation={1}
              timingFunction="ease-in-out"
            />
          </center>
          <br />

          <center> Sending mail .. please wait </center>
        </div>
      )}
      {mailsent && (
        <div className="enterOTPDiv">
          <TextField
            required
            disabled = {accountdeletedsuccessfully}
            id="outlined-required"
            label="OTP"
            sx={{ mb: 2 }}
            onChange={(e) => {
              setotp(e.target.value);
            }}
          />
          <Button
            onClick={() => {
         
              otpVerifyFunction();
            }}
            disabled = {accountdeletedsuccessfully}
            variant="contained"
            color="success"
          >
            Verify OTP
          </Button>
          {accountdeletedsuccessfully == true && "account successfully deleted .. go to signup to create new account"}
        </div>
      )}
    </div>
    // <div>ForgotPassword</div>
  );
}
