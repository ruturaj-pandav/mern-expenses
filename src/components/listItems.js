import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import LoadingSpin from "react-loading-spin";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { saveAs } from "file-saver";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
let generatingreport = false;
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>{/* <ShoppingCartIcon /> */}</ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

function createPDF(mode) {
  generatingreport = true
  axios
    .post("https://mern-expenses.herokuapp.com/create-pdf", {mode})
    .then(() => axios.get("https://mern-expenses.herokuapp.com/fetch-pdf", { responseType: "blob" }))
    .then((response) => {

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "newPdf.pdf");
      generatingreport = false
    });;
}
// function createPDF(mode) {
//   axios.post("http://localhost:8000/create-pdf", { mode: mode }).then((response) => {

//     axios.get("http://localhost:8000/fetch-pdf", { responseType: "blob" })
//       .then((response) => {

//         const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//         saveAs(pdfBlob, "newPdf.pdf");
//       });
//   });
// }

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Current month
    </ListSubheader>
    <ListItemButton
      onClick={() => {
        createPDF("debit");
      }}
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="  Spends" />
    </ListItemButton>
    <ListItemButton
      onClick={() => {
        createPDF("credit");
      }}
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary=" Credit" />
    </ListItemButton>
    <ListItemButton
      onClick={() => {
        createPDF("all");
      }}
    >
      {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary=" Cumulative " />
    </ListItemButton>
    <div    >
       <center>
        {generatingreport &&  <LoadingSpin


duration="0.1s"
primaryColor="white"
secondaryColor="#cdcbcb"
direction="alternate"
width="3px"
numberOfRotationsInAnimation={10}
timingFunction="ease-in-out"
/>}
       </center>
    </div>
  </React.Fragment>
);
