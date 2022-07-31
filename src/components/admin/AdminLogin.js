import React from 'react'
import "./AdminLogin.css"
import {useState} from "react"
import axios from "axios"

import Alert from "@mui/material/Alert";
import { decryptData, encryptData } from "../../commonFunctions";


import { useNavigate } from "react-router-dom";


export default function Admin() {
  const navigate = useNavigate();

  const [adminemail , setadminemail ] = useState("admin@gmail.com");
  const [adminpassword , setadminpassword ] = useState("adminpassword");
  const [wrongpassword , setwrongpassword ] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault();
   

    const payload = {
      email: adminemail,
      password: encryptData(adminpassword, "tester_key"),
    };

    let response = await axios.post("https://mern-expenses.herokuapp.com/admin-signin", {
      payload,
    });
    if (response.data.adminFound) {
      setwrongpassword(false)
      let token = response.data.token
      let user = response.data.details

      let admindetails = {
        allowed_to_login : true   ,
        token : token   ,
        user : user
      }
      sessionStorage.removeItem("admindetails")
    // sessionStorage.setItem(JSON.stringify("from_budget" , from_budget))

    // var objJSON = JSON.stringify(from_budget);
sessionStorage.setItem("admindetails", JSON.stringify(admindetails));
  navigate("/admin-dashboard" , {
    tester: 49
    // otherParam: 'anything you want here',
  });
    } else {
      setwrongpassword(true)
    }
    
  }
  return (
<div className="login">
  <div className="form">
    <form className="login-form">
      <span className="material-icons">admin</span>
      <br/>
      <br/>
      <input onChange = {(e) => {
        setadminemail(e.target.value)
      }}   type="text"  value={adminemail} placeholder="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
      <input  onChange = {(e) => {
        setadminpassword(e.target.value)
      }}  type="password"  value={adminpassword} placeholder="password" required />
      <button onClick= {handleSubmit}>login</button>
    </form>  
    <br/>
    {wrongpassword  && <Alert variant="outlined" severity="error">Invalid Credentials</Alert>}
  </div>
</div>
  )
}
