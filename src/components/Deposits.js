import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Divider from "@mui/material/Divider";


export default function Deposits({credit , debit}) {

  return (
    <React.Fragment>
      <>
        <Title>Credit</Title>
        <Typography component="p" variant="h4" style={{ color: "green" }}>
          <strong> &#8377;{credit}</strong>
        </Typography>
      </>
      <br />
      <Divider />
      <br />
      <>
        <Title>Debit </Title>
        <Typography component="p" variant="h4" style={{ color: "red" }}>
          <strong>&#8377; {debit}</strong>
        </Typography>
      </>
      <br />
      <Divider />
      <br />
      <>
        <Title>Total </Title>
        <Typography component="p" variant="h4" style={{ color: "red" }}>
          <strong>&#8377; {credit-Math.abs(debit)}</strong>
        </Typography>
      </>
   
    </React.Fragment>
  );
}
