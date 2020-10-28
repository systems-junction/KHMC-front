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

const tableHeadingToPrint = [
  "No.",
  "Item Code",
  "Item Name",
    "Balance",
  "Unit",
  "Consumption",
  "Last Supplier",
  "Last Price(JD)",
  "Unit",
  "Qty",
  // "Vendor",
  //   "Last Price",
  //   "Unit",
  // "Req Qty",
  // "Curr Qty",
];

export default function PurchaseRequest(props) {
  const customColumnStyle = {
    wordWrap: "break-word",
    maxWidth: "4px",
    backgroundColor: "green",
  };

  return (
    <Table id="my_table" aria-label="simple table" style={{ display: "none" }}>
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
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>;
                <TableCell>{pr.itemId.itemCode}</TableCell>;
                <TableCell> {pr.itemId.name}</TableCell>
                <TableCell>--</TableCell>
                <TableCell>{pr.itemId.receiptUnit}</TableCell>;
                <TableCell>--</TableCell>
                <TableCell>
                  {props.selectedPRToPrint.vendorId.englishName}
                </TableCell>
                <TableCell>{pr.itemId.receiptUnitCost.toFixed(4)}JD </TableCell>
                <TableCell>{pr.itemId.receiptUnit}</TableCell>;
                <TableCell>{pr.reqQty}</TableCell>
                {/* <TableCell>{pr.currQty}</TableCell> */}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
