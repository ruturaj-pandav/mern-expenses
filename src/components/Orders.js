import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const moment = require("moment");
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#90EE90',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Orders({transactions , getexpenses , deleteTransaction}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open, setOpen] = React.useState(false);



  async function deleteFunction(id) {
    deleteTransaction(id)
  }

  
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      
          <Table size="small">
          {transactions.length >  0  ? <TableHead>
            <TableRow>
              <TableCell><strong>Created</strong></TableCell>
              <TableCell><strong>Place</strong></TableCell>
  
              <TableCell><strong>Tags</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell align="right"> <strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead> : null}
          <TableBody>
          {transactions.length >  0  
         
            ? transactions.map((expense, index) => {
                return (
                  <>
                    <TableRow
                      key={index}
                      className={`banner ${
                        expense.amount >= 0
                          ? "transaction-credit"
                          : "transaction-debit"
                      }`}
                    >
                      <TableCell>

                        {/* {moment(expense.created).format("MMMM d, YYYY")} */}
                        {moment(expense.created).format("MMM Do YY" ) }
                      </TableCell>
                      <TableCell>{expense.place}</TableCell>
                      <TableCell>[ {expense.tags} ]</TableCell>
                      <TableCell>{expense.amount}</TableCell>
                      <TableCell align="right">
                        <button
                          className="deleteTransactionButton"
                          onClick={() => {
                            deleteFunction(expense._id);
                          }}
                        >
                          delete
                        </button>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })
            :<><center><h3>No Data Found</h3></center></>}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Transaction successfully deleted from the records
          </Typography>
          <br/>
          <center><small className="text-muted">click any where outside the box to close this</small></center>

        </Box>
      </Modal>

    </React.Fragment>
  );
}
