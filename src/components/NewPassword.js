import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
export default function NewPassword() {
  const location = useLocation();
  const [password, setpassword] = React.useState("");
  const [confpassword, setconfpassword] = React.useState("");
  const navigate = useNavigate();

  const [passworddontmatch , setpassworddontmatch] = React.useState()

  async function setPasswordFunction() {

    if (password === confpassword) {
      setpassworddontmatch(false)

      let email = location.state.email;
      let response = await axios.post("https://mern-expenses.herokuapp.com/updatePassword", {
        password,
        email,
      });
      if (response.data.passwordchange) {
        
        navigate("/signin");
      } 
    } else {
      setpassworddontmatch(true)
    }
  }
  return (
    <div>
      <div className="newPasswordDiv">
        <h2>Enter your new password</h2>
      <TextField
      onChange={(e) => {
        setpassword(e.target.value);
      }}
          id="outlined-password-input"
          label="Password" sx = {{mt :1 }}
          type="password"
          autoComplete="current-password"
        />
         <TextField
          sx = {{mt :3 , mb: 3}}
          onChange={(e) => {
            setconfpassword(e.target.value);
          }}
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
     
      {passworddontmatch == true && <span className="passwordShouldMatchText"> Passwords should match </span>}
      <br/>
     
      <Button
        onClick={() => {
          setPasswordFunction();
        }}
        variant="contained"
        color="success"
      >
        set
      </Button>
      </div>
    </div>
  );
}
