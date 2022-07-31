import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import axios from "axios";
import LoadingSpin from "react-loading-spin";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { decryptData, encryptData } from "../commonFunctions";

var crypto = require("crypto-js");


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/homepage">
        Budget
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  
  const navigate = useNavigate();

  const [wrongpassword , setwrongpassword ] = useState(false)
  const [showloader , setshowloader ] = useState(true)

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = {
      email: data.get("email"),
      // password : data.get("password"),
      password: encryptData(data.get("password"), "tester_key"),
    };

    let response = await axios.post("https://mern-expenses.herokuapp.com/signin", {
      payload,
    });
    if (response.data.userFound) {
      setwrongpassword(false)
      // navigate("/dashboard");

      let token = response.data.token
      let user = response.data.details


      let from_budget = {
        allowed_to_login : true   ,
        token : token   ,
        user : user
      }
      sessionStorage.removeItem("from_budget")
    // sessionStorage.setItem(JSON.stringify("from_budget" , from_budget))

    // var objJSON = JSON.stringify(from_budget);
sessionStorage.setItem("from_budget", JSON.stringify(from_budget));
  navigate("/dashboard" , {
    tester: 49
    // otherParam: 'anything you want here',
  });
    } else {
      setwrongpassword(true)
    }
    
  }

  return (
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            
             {wrongpassword  && <Alert variant="filled" severity="error">Invalid Credentials</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
