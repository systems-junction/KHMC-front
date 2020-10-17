/*eslint-disable*/
import React, { useState, useEffect } from "react";

import cookie from "react-cookies";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { withStyles } from "@material-ui/core/styles";

const CustomTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};

const tableDataKeysForCommittee = [
  "requestNo",
  "createdAt",
  "generated",
  ["vendorId", "englishName"],
  ["approvedBy", "firstName"],
  "committeeStatus",
];

const tableHeadingToPrint = [
  "Ser.",
  "Item Code",
  "Item Name",
  //   "Balance",
  "Unit",
  "Price(JD)",
  //   "Consumption",
  "Return Reason",
  //   "Vendor",
  //   "Last Price",
  //   "Requested Qty",
  //   "Current Qty",
];

export default function PurchaseRequest(props) {
  const customColumnStyle = {
    wordWrap: "break-word",
    maxWidth: "4px",
    backgroundColor: "green",
  };

  let count = 1;

  return (
    <Table
      id="my_tableForPO"
      aria-label="simple table"
      style={{ display: "none" }}
    >
      <TableHead>
        <TableRow>
          {tableHeadingToPrint.map((h, index) => {
            return <TableCell key={index}>{h}</TableCell>;
          })}
        </TableRow>
      </TableHead>

      <TableBody>
        {/* {props.selectedPRToPrint &&
          props.selectedPRToPrint.purchaseRequestId.map((po, index) => {
            return ( */}
        <TableRow>
          <TableCell>{count}</TableCell>
          <TableCell>
            {props.selectedPRToPrint && props.selectedPRToPrint.itemId.itemCode}
          </TableCell>
          <TableCell>
            {props.selectedPRToPrint && props.selectedPRToPrint.itemId.name}
          </TableCell>
          <TableCell>
            {props.selectedPRToPrint &&
              props.selectedPRToPrint.itemId.receiptUnit}
          </TableCell>

          <TableCell>
            {props.selectedPRToPrint &&
              props.selectedPRToPrint.itemId.receiptUnitCost.toFixed(4)}
            &nbsp; JD
          </TableCell>

          <TableCell>
            {props.selectedPRToPrint && props.selectedPRToPrint.reasonToDisplay}
          </TableCell>
          {/* <TableCell>{pr.currQty}</TableCell> */}
        </TableRow>
        {/* );
          })} */}
      </TableBody>
    </Table>
  );
}
