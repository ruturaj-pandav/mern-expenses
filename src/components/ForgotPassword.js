import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import LoadingSpin from "react-loading-spin";
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
let sentotp;
export default function ForgotPassword() {
  const [email, setemail] = React.useState("");
  const [otp, setotp] = React.useState("");
  const navigate = useNavigate();

  const [sendingmail, setsendingmail] = React.useState(false);
  const [mailsent, setmailsent] = React.useState(false);
  const [incorrectOTP, setincorrectOTP] = React.useState(false);

  async function sendForgotPasswordMail() {
    if (email) {
      setsendingmail(true)
      let thisotp = Math.floor(1000 + Math.random() * 9000);
      sentotp = thisotp;
      let response = await axios.post(
        "https://mern-expenses.herokuapp.com/forgotPasswordMail",
        { email, thisotp }
      );
      
      if (response.data.emailsent) {
        setmailsent(true);
        setsendingmail(false)
      }
    } else {
    }
   
  }
  function otpVerifyFunction() {
    
    if (otp == sentotp) {
      
      // navigate("/newpassword")
      navigate("/newpassword", { state: { email } });
    } else {
      setincorrectOTP(true)
     
    }
  }
  return (
    <div>
      <div className="askingMailDiv">
        <h2>Enter your email. An OTP will be sent to it</h2>

        <TextField
          label="Email"
          id="outlined-size-small"
          placeholder="Enter your email"
          disabled={mailsent}
          sx={{ mt: 3, mb: 3 }}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <Button
          disabled={mailsent}
          onClick={() => {

            sendForgotPasswordMail();
          }}
          variant="contained"
          color="success"
        >
          Send OTP
        </Button>
      </div>
      {sendingmail && <div>
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
      </div>}

      {mailsent && (
        <div className="enterOTPDiv">
          <h3>Enter the OTP sent to the mail entered above</h3>
          <TextField
            required
            id="outlined-required"
            label="OTP"
            size="small"
            sx={{ mt: 2, mb: 2 }}
            onChange={(e) => {
              setotp(e.target.value);
            }}
          />
      {incorrectOTP && <Box sx={{ color: 'error.main', mb : 2 }}>Invalid OTP</Box>}
          <Button
            onClick={() => {

              otpVerifyFunction();
            }}
            variant="contained"
            size="large"
          >
            Verify OTP
          </Button>
          {/* <Button
            onClick={() => {

              otpVerifyFunction();
            }}
            variant="contained"
            color="success"
          >
            Verify OTP
          </Button> */}
        </div>
      )}
    </div>
    // <div>ForgotPassword</div>
  );
}
