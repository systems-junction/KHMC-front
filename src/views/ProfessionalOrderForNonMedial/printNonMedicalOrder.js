/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components

import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

const tableHeadingToPrint = [
  "No.",
  "Item Code",
  "Item Name",
  //   "Item Type",
  //   "Balance",
  //   "Unit",
  //   "Consumption",
  //   "Vendor",
  "Price",
  //   "Unit",
  "Req Qty",
  "Curr Qty",
];

export default function PurchaseRequest(props) {
  const customColumnStyle = {
    wordWrap: "break-word",
    maxWidth: "4px",
    backgroundColor: "green",
  };

  let count = 0;

  return (
    <Table
      id="my_tableForMedicalOrder"
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
        {props.selectedPRToPrint &&
          props.selectedPRToPrint.item.map((pr, index) => {
            console.log(pr);
            count++;
            return (
              <TableRow key={index}>
                <TableCell>{count}</TableCell>
                <TableCell>{pr.itemId.itemCode}</TableCell>
                <TableCell>{pr.itemId.name}</TableCell>
                <TableCell>{pr.itemId.issueUnitCost.toFixed(4)}JD</TableCell>
                {/* <TableCell>{pr.itemId.medClass}</TableCell> */}
                <TableCell>{pr.requestedQty}</TableCell>
                <TableCell>{pr.currentQty}</TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
