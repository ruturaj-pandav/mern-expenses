import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import axios from "axios";
import LoadingSpin from "react-loading-spin";
import { useHistory } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

let userdata;
let sentotp;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Budget
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const themeLight = createTheme({
  palette: {
    background: {
      default: "#fbfcf8",
    },
  },
});

export default function SignUp() {
  // let history = useHistory();
  const navigate = useNavigate();

  const [incomplete, setincomplete] = useState();
  const [shortpassword, setshortpassword] = useState();
  const [mailsent, setmailsent] = useState();
  const [accountAlreadyExist, setAccountAlreadyExist] = useState(false);
  const [showsignup, setshowsignup] = useState(true);
  const [showcontinue, setshowcontinue] = useState(false);
  const [sendingmail, setsendingmail] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get("email"),
      password: data.get("password"),
      lastname: data.get("lastName"),
      firstname: data.get("firstName"),
    };

    userdata = payload;

    if (
      !payload.password ||
      !payload.lastname ||
      !payload.firstname ||
      !payload.email
    ) {
      setincomplete(true);
    } else {
      setincomplete(false);
      if (payload.password.length < 6) {
        setshortpassword(true);
      } else {
        setshortpassword(false);
        setsendingmail(true);
        setAccountAlreadyExist(false);
        // let otp = 1234
        var otp = Math.floor(1000 + Math.random() * 9000);
        sentotp = otp;
        let useremail = payload.email;

        let datatosend = {
          email: useremail,
          otp: otp,
        };

        let response_from_mail = await axios.post(
          "https://mern-expenses.herokuapp.com/sendmail",
          datatosend
        );

        if (response_from_mail.data.accountAlreadyExist) {
          setAccountAlreadyExist(true);
          setmailsent(false);
          setsendingmail(false);
        } else {
          setAccountAlreadyExist(false);
          if (response_from_mail.data.emailsent) {

            setmailsent(true);
            setsendingmail(false);
            setshowsignup(false);
            setshowcontinue(true);
          } else {
            setmailsent(false);
            setsendingmail(false);
          }
        }
      }
    }
  }

  function goToOTP() {
    navigate("/verify-account", {
      state: { userdata: userdata, sentotp: sentotp },
    });

  }

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                {incomplete && (
                  <Alert severity="error">
                    Please provide all the required information
                  </Alert>
                )}
                {accountAlreadyExist && (
                  <Alert severity="error">
                    email already exists.. try login or continue with different
                    email
                  </Alert>
                )}

                {shortpassword && (
                  <Alert severity="error">
                    Password must atleast be 6 characters
                  </Alert>
                )}
                {!!sendingmail == true && (
                  <div className={"ExampleOfUsage my-3"}>
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
                    <Alert variant="filled" severity="warning">
                      <center> Sending mail .. please wait </center>
                    </Alert>
                  </div>
                )}
                {/* {incomplete == false  ? <Alert severity="success">We can now go ahead</Alert> : null } */}

                {mailsent && (
                  <Alert
                    variant="filled"
                    severity="success"
                    onClick={() => {
                      goToOTP();
                    }}
                  >
                    {/* <Link
                      href="/verify-account"
                      color="inherit"
                      underline="none"
                      sx={{ my: 8 }}
                    > */}
                    Mail sent. Click continue to go to OTP Verification Page
                    {/* </Link> */}
                    {/* <Link to='/signin'>Home</Link>  */}
                    {/* <span sx={{ mx: 3 }}>&#8594;</span> */}
                  </Alert>
                )}

                {!sendingmail && mailsent && !accountAlreadyExist == false && (
                  <Alert variant="filled" severity="error">
                    mail not sent .. please try again
                  </Alert>
                )}
              </Grid>
            </Grid>

            {showcontinue && (
              <center>
                <Button
                  sx={{ my: 3 }}
                  onClick={() => goToOTP()}
                  variant="contained"
                  color="success"
                >
                  Continue
                </Button>
              </center>
            )}
            {/* {showcontinue && <button onClick={() => goToOTP()}> continue</button>} */}
            {!sendingmail && showsignup ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            ) : null}
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ my: 4 }}>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
