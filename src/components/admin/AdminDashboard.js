import React, { Component } from 'react'
import AdminUsers from "./AdminUsers"
import AdminFeedback from "./AdminFeedback"
import AdminDeletedAccounts from "./AdminDeletedAccounts"
import axios from "axios"

export default class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
    
            userInformation : [] ,
            feedbackInformation: [] ,
            deletedAccountsInformation : [] ,
            displayWhat : "users"
          
        };
      }
    componentDidMount() {
        this.getUsersInformation()
        this.getFeedbackInformation()
        // this.getDeletedAccountsInformation()
    }

  
    getUsersInformation= () => {
    
      axios.get("https://mern-expenses.herokuapp.com/admin-users-information").then((response) => {
       this.setState({userInformation : response.data.data})
      });
    };
    getFeedbackInformation= () => {
      
        axios.get("https://mern-expenses.herokuapp.com/admin-feedback-information").then((response) => {
          console.log("this feedback info got")
          
          this.setState({feedbackInformation : response.data.feedbacks})

        });
      };
      getDeletedAccountsInformation= () => {
      
        axios.get("https://mern-expenses.herokuapp.com/admin-deleted-accounts-information").then((data) => {
        
    
        });
      };
    
  render() {
    return (
      <div>
        {/* <ResponsiveDrawer/> */}
        adminDashboard

        <div>

            <button onClick={() => {
              this.setState({displayWhat : "users"})
            }}>users</button>
            <button onClick={() => {
              this.setState({displayWhat : "feedback"})
            }}>feedback</button>
            <button onClick={() => {
              this.setState({displayWhat : "deletedAccounts"})
            }}>deletedAccounts</button>
           
           
        </div>

        <div>

            {this.state.displayWhat == "users"  && <AdminUsers userInformation = {this.state.userInformation}/>}
            {this.state.displayWhat == "feedback"  && <AdminFeedback feedbackInformation = {this.state.feedbackInformation}/>}
            {this.state.displayWhat == "deletedAccounts"  && <AdminDeletedAccounts deletedAccountsInformation = {this.state.deletedAccountsInformation}/>}
           
           
        </div>

      </div>
    )
  }
}
