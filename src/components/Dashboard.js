import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import axios from "axios";
import MuiAppBar from "@mui/material/AppBar";
import Alert from "@mui/material/Alert";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import SpendChart from "../components/charts/SpendChartPie";
import SpendChartBar from "../components/charts/SpendChartBar";
import CreditChart from "./CreditChart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Feedback from "./FeedBack";
import MoreChartAnalysis from "./MoreChartAnalysis";
import Modal from "@mui/material/Modal";
import AddTransaction from "./AddTransaction";

let data =[
  {
    "id": "scala",
    "label": "scala",
    "value": 400,
    "color": "hsl(144, 70%, 50%)"
  },
  {
    "id": "make",
    "label": "make",
    "value": 154,
    "color": "hsl(347, 70%, 50%)"
  },
  {
    "id": "java",
    "label": "java",
    "value": 467,
    "color": "hsl(272, 70%, 50%)"
  },
  {
    "id": "python",
    "label": "python",
    "value": 201,
    "color": "hsl(250, 70%, 50%)"
  },
  {
    "id": "c",
    "label": "c",
    "value": 134,
    "color": "hsl(6, 70%, 50%)"
  }
]

const stylepassword = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white ",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const themeLight = createTheme({
  palette: {
    background: {
      default: "#fbfcf8",
    },
  },
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#90EE90 ",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


class DashboardContent extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      openChangePasswordModalOne: false,
      color: "red",
      userLoggedOut: 0,
      shortpassword: null,
      currentpassword: "",
      transactionDeletedModal: false,
      transactionAddedModal: false,
      thisUser: null,
      passwordverified: null,
      newpassword: "",
      newconfirmpassword: "",
      logoutModalOpen: false,
      deleteModalOpen: false,
      notmatchingpassword: null,
      passwordchangedsuccessfully: null,
      feedbackAdded: null,
      transactions: "",
      credit: 0,
      debit: 0,
      spendAnalysisDataForChart: [],
      spendAnalysisGroupByTags: [],
      creditDetails: null,
    };
  }
  toggleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  // gets called on start ,, equivalent to useEffect
  componentDidMount() {
    this.validateUserOnLogin();
    this.getexpenses();
    this.getSpendChartData();
    this.getCreditChartData();
  }

  addTransactionFunction = async (payload) => {
    let response = await axios.post(
      "https://mern-expenses.herokuapp.com/create-transaction",
      { payload }
    );

    if (response.data.entryCreated) {
      this.handleTransactionAddedOpen();
    }
  };
  addFeedbackFunction = async (payload) => {
    console.log("trying to add feedback");
    console.log("this is the payload we will send");
    console.log(payload);
    let response = await axios.post("https://mern-expenses.herokuapp.com/send-feedback", {
      payload,
    });

    if (response.data.feedbackSent) {
      // this.handleTransactionAddedOpen();
      console.log("feedback sent to databse");
      this.setState({feedbackAdded : true})
    }
  };
  addRandomTransactionFunction = async () => {
    let response = await axios.post(
      "https://mern-expenses.herokuapp.com/create-random-transaction"
    );

    if (response.data.entryCreated) {
      this.handleTransactionAddedOpen();
    }
  };

  // ---------------------
  validateUserOnLogin = () => {
    let from_budget = JSON.parse(sessionStorage.getItem("from_budget"));

    if (from_budget) {
      this.setState({ thisUser: from_budget });
    } else {
      this.setState({ thisUser: 0 });
    }
  };
  handleLogoutOpen = () => {
    this.setState({ logoutModalOpen: true });
  };
  handleLogoutClose = () => {
    this.setState({ logoutModalOpen: false });
  };
  // ------------------
  handleDeleteOpen = () => {
    this.setState({ deleteModalOpen: true });
  };
  handleDeleteClose = () => {
    this.setState({ deleteModalOpen: false });
  };
  handleTransactionDeletedOpen = () => {
    this.setState({ transactionDeletedModal: true });
  };
  handleTransactionDeletedClose = () => {
    this.setState({ transactionDeletedModal: false });
    this.getexpenses();
    this.getSpendChartData();
    this.getCreditChartData();
    // this.getexpenses();
  };

  //--------------------------

  handleTransactionAddedOpen = () => {
    this.setState({ transactionAddedModal: true });
  };
  handleTransactionAddedClose = () => {
    this.getexpenses();
    this.getSpendChartData();
    this.getCreditChartData();
    this.setState({ transactionAddedModal: false });
  };

  //--------------------------

  // gets all transaction details from the database
  getexpenses = () => {
    let credit = 0;
    let debit = 0;
    let frombudget= JSON.parse(sessionStorage.getItem("from_budget"))

   if (frombudget){
    let userid = frombudget.user.id;
    if (userid ) {
      console.log("userid fround " ,userid)
      console.log("can now call get expenses")
      axios.post("https://mern-expenses.herokuapp.com/get-transactions" , {userid : userid}).then((data) => {
        let final = data.data.data;
        if (final != undefined && final.length > 0) {
          this.setState({ transactions: final });
          final.map((record, index) => {
            if (record.amount > 0) {
              credit = record.amount + credit;
            } else {
              debit = record.amount + debit;
            }
          });
        }
  
        this.setState({ credit: credit, debit: debit });
      });
    }
   }

 
  };

  getSpendChartData = () => {
    let frombudget= JSON.parse(sessionStorage.getItem("from_budget"))

    if (frombudget){
      let userid = frombudget.user.id;
      if (userid ) {
        console.log("userid fround " ,userid)
        console.log("can now call get expenses")
        axios
        .post("https://mern-expenses.herokuapp.com/get-spend-transaction-data" , {userid : userid })
        .then((data) => {
          let spendAnalysisDataForChart = data.data.spendAnalysisDataForChart;
          let spendAnalysisGroupByTags = data.data.spendAnalysisGroupByTags;
  
          if (
            spendAnalysisDataForChart.length > 0 &&
            spendAnalysisGroupByTags.length > 0
          ) {
            this.setState({
              spendAnalysisDataForChart: spendAnalysisDataForChart,
            });
            this.setState({ spendAnalysisGroupByTags: spendAnalysisGroupByTags });
          }
        });
      }
     }

  };
  getCreditChartData = () => {
    axios
      .get("https://mern-expenses.herokuapp.com/get-credit-transaction-data")
      .then((data) => {
        let final = data.data.data;

        let finallength = data.data.dataLength;

        if (finallength > 0) {
          this.setState({ creditDetails: final });
        }
      });
  };
  logoutFunction = () => {
    ///this doesnt work .. check once

    this.setState({ userLoggedOut: 1 });
    sessionStorage.removeItem("from_budget");
    // return <Navigate to="/signin" replace={true} />
  };
  /*-----------------*/
  // to delete a single transaction
  deleteTransaction = async (id) => {
    let url = `https://mern-expenses.herokuapp.com/delete-transaction/${id}`;

    let response = await axios.delete(url);
    if (response.data.deleted) {
      this.handleTransactionDeletedOpen();
    }
  };

  handleOpenChangePasswordModalOne = () => {
    this.setState({ openChangePasswordModalOne: true });
  };
  verify2 = async () => {
    let from_budget = JSON.parse(sessionStorage.getItem("from_budget"));

    let email = from_budget.user.email;

    let response_from_verification = await axios.post(
      "https://mern-expenses.herokuapp.com/verify-current-password",
      { currentpassword: this.state.currentpassword, email }
    );
    if (response_from_verification.data.passwordVerified) {
      this.setState({ passwordverified: true });
      // setpasswordverified(true);
    } else {
      this.setState({ passwordverified: false });
      // setpasswordverified(false);
    }
  };

  handleCloseChangePasswordModalOne = () => {
    this.setState({ openChangePasswordModalOne: false });
    // setpasswordchangedsuccessfully()
    // setpasswordverified();
    // setOpenChangePasswordModalOne(false);
  };

  updatePasswordFunction = async () => {
    if (this.state.newpassword === this.state.newconfirmpassword) {
      this.setState({ notmatchingpassword: false });
      if (this.state.newpassword.length > 5) {
        let from_budget = JSON.parse(sessionStorage.getItem("from_budget"));
        let email = from_budget.user.email;

        let response = await axios.post(
          "https://mern-expenses.herokuapp.com/updatePassword",
          {
            password: this.state.newpassword,
            email,
          }
        );
        if (response.data.passwordchange) {
          // navigate("/signin");
          this.setState({ passwordchangedsuccessfully: true });
          this.setState({ shortpassword: false });
          this.setState({ notmatchingpassword: false });
        } else {
        }
      } else {
        this.setState({ shortpassword: true });
      }
    } else {
      this.setState({ shortpassword: false });
      this.setState({ notmatchingpassword: true });
      // setnotmatchingpassword(true);
    }
  };

  /*-----------------*/
  render() {
    if (this.state.thisUser == 0) {
      return <Navigate to="/signin" replace={true} />;
    }
    if (this.state.userLoggedOut == 1) {
      return <Navigate to="/signin" replace={true} />;
    }

    return (
      <ThemeProvider theme={themeLight}>
        <><Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="absolute" open={this.state.open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(this.state.open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar> */}
        <Drawer variant="permanent" open={this.state.open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={this.toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#ffffff"
                : "323223",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Feedback addFeedbackFunction={this.addFeedbackFunction} feedbackAdded  = {this.state.feedbackAdded}/>
          </Paper> */}
          <Container maxWidth="lg" >
            <Grid container spacing={3}>
              <Grid item xs={12}>
             
                  <AddTransaction
                    addTransactionFunction={this.addTransactionFunction}
                    addRandomTransactionFunction={
                      this.addRandomTransactionFunction
                    }
                  />
                {/* </Paper> */}
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 400,
                  }}
                >
                  <div className="chartDiv">
                    <div>
                      <SpendChart
                        spendAnalysisDataForChart={
                          this.state.spendAnalysisDataForChart
                          // data
                        }
                      />
                    </div>
                    <div>
                      <SpendChartBar
                     
                      />
                    </div>
                   
                  </div>
                </Paper>
              </Grid> */}

              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 400,
                  }}
                >
                  <Deposits
                    credit={this.state.credit}
                    debit={this.state.debit}
                  />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper
                  sx={{  display: "flex", flexDirection: "column" }}
                >
                  <Orders
                    deleteTransaction={this.deleteTransaction}
                    getexpenses={this.getexpenses}
                    transactions={this.state.transactions}
                  />
                </Paper>
              </Grid>
              {this.state.spendAnalysisGroupByTags.length > 0 && (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <MoreChartAnalysis
                      spendAnalysisGroupByTags={
                        this.state.spendAnalysisGroupByTags
                      }
                    />
                  </Paper>
                </Grid>
              )}
            </Grid>
            <br />

            <br />
            <button
              onClick={this.handleLogoutOpen}

              className="logoutButtonOnDashboard"
            >
              Log out
            </button>
            
            <button
            className="changePasswordOnDashboard"
              onClick={this.handleOpenChangePasswordModalOne}
            >
              Change Password
            </button>
            <button
              className="deleteAccountOnDashboard"
              onClick={this.handleDeleteOpen}
            >
              Delete account
            </button>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
      <Modal
        open={this.state.openChangePasswordModalOne}
        onClose={this.handleCloseChangePasswordModalOne}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...stylepassword, width: 400 }}>
          {!this.state.passwordverified && (
            <div>
              <p id="parent-modal-description">
                <h2>Change Password ?</h2>
                Enter current password first :
                <br />
                <br />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  onChange={(e) => {
                    this.setState({ currentpassword: e.target.value });
                    // setcurrentpassword(e.target.value);
                  }}
                />
                {/* <TextField
                          label="current password"
                          id="outlined-size-small"
                          defaultValue="newpass"
                          onChange={(e) => {
                            setcurrentpassword(e.target.value);
                          }}
                          size="small"
                        /> */}
              </p>
              <Button
                onClick={this.handleCloseChangePasswordModalOne}
                variant="outlined"
                color="error"
              >
                Close
              </Button>

              <Button
                sx={{ mx: 1 }}
                color="success"
                onClick={this.verify2}
                variant="outlined"
              >
                Verify Password
              </Button>
              {this.state.passwordverified == true ? (
                <Alert severity="success">Password Correct</Alert>
              ) : null}
            </div>
          )}
          <br />
          {/* <ChildModal email = {email} handleCloseChangePasswordModalOne = {handleCloseChangePasswordModalOne} /> */}

          {this.state.passwordverified == false ? (
            <Alert severity="error">Please doesn't match our records</Alert>
          ) : null}

          {this.state.passwordverified && (
            <div>
              <h2 id="child-modal-title">Enter new passsword</h2>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                disabled={this.state.passwordchangedsuccessfully}
                onChange={(e) => {
                  this.setState({ newpassword: e.target.value });
                  // setnewpassword(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                disabled={this.state.passwordchangedsuccessfully}
                onChange={(e) => {
                  this.setState({ newconfirmpassword: e.target.value });
                  // setnewconfirmpassword(e.target.value);
                }}
              />
              <br />
              <br />
              {this.state.notmatchingpassword && (
                <Alert severity="error">Password's dont match</Alert>
              )}
              {this.state.shortpassword && (
                <Alert severity="error">
                  Password length must be min 6 characters
                </Alert>
              )}{" "}
              {this.state.passwordchangedsuccessfully == true && (
                <Alert severity="success">
                  Password Changed Successfully
                </Alert>
              )}{" "}
              <br />
              <Button
                onClick={this.handleCloseChangePasswordModalOne}
                variant="contained"
                color="error"
              >
                Close
              </Button>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                disabled={this.state.passwordchangedsuccessfully}
                onClick={this.updatePasswordFunction}
                color="success"
              >
                Change Password{" "}
              </Button>
            </div>
          )}
        </Box>
      </Modal>
      <Modal
        // open={true}
        open={this.state.transactionAddedModal}
        onClose={this.handleTransactionAddedClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <center>
              <h2>Added - Success</h2>
            </center>
          </Typography>
          <center>
            <Typography id="modal-modal-description">
              Transaction successfully added
            </Typography>
          </center>
          {/* <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={8}> */}
          <br />
          <br />
          <center>
            {" "}
            <Button
              variant="contained"
              color="error"
              onClick={this.handleTransactionAddedClose}
            >
              Close
            </Button>
          </center>
          {/* </Grid>
            
          </Grid> */}
        </Box>
      </Modal>
      <Modal
        // open={true}
        open={this.state.transactionDeletedModal}
        onClose={this.handleTransactionDeletedClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <center>
              <h2>Delete - Success</h2>
            </center>
          </Typography>
          <center>
            <Typography id="modal-modal-description">
              Transaction successfully deleted
            </Typography>
          </center>
          {/* <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={8}> */}
          <br />
          <br />
          <center>
            {" "}
            <Button
              variant="contained"
              color="error"
              onClick={this.handleTransactionDeletedClose}
            >
              Close
            </Button>
          </center>
          {/* </Grid>
            
          </Grid> */}
        </Box>
      </Modal>

      <Modal
        open={this.state.deleteModalOpen}
        onClose={this.handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm your action
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete your account ?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={8}>
              <Button variant="outlined" onClick={this.handleDeleteClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  // navigate("/delete-account", {
                  //   state: {
                  //     id: this.state.thisUser.user.id,
                  //     email: this.state.thisUser.user.email,
                  //   },
                  // });
                }}
              >
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={this.state.logoutModalOpen}
        onClose={this.handleLogoutClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2>Logout ?</h2>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            are you sure you want to log out ?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={8}>
              <Button variant="outlined" onClick={this.handleLogoutClose}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  this.logoutFunction();
                }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal></>
      </ThemeProvider>
    );
  }
}
export default DashboardContent;
