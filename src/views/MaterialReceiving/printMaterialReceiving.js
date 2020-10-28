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
  "PR No",
  "Item Code",
  "Batch",
  "Expiry Date",
  "Unit",
  "Qty",
  //   "Price(JD)",
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
        {props.selectedPRToPrint &&
          props.selectedPRToPrint.prId.map((po) => {
            return po.id.item.map((pr, index) => {
              console.log(pr);
              count++;
              return (
                <TableRow key={index}>
                  <TableCell>{count}</TableCell>
                  <TableCell>{po.id.requestNo}</TableCell>
                  <TableCell>{pr.itemId.itemCode}</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>{pr.itemId.receiptUnit}</TableCell>

                  {/* <TableCell>
                    {props.selectedPRToPrint.vendorId.englishName}
                  </TableCell> */}
                  <TableCell>{pr.reqQty}</TableCell>
                  {/* <TableCell>{pr.currQty}</TableCell> */}
                  {/* <TableCell>
                    {pr.itemId.receiptUnitCost.toFixed(4)} JD
                  </TableCell> */}
                </TableRow>
              );
            });
          })}
      </TableBody>
    </Table>
  );
}
