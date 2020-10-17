/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import cookie from "react-cookies";

import axios from "axios";
import {
  getPurchaseRequestUrl,
  deletePurchaseRequestUrl,
  socketUrl,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import purchase_request from "../../assets/img/purchase request.png";
import plus_icon from "../../assets/img/Plus.png";
import Back from "../../assets/img/Back_Arrow.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import LogoPatientSummaryInvoice from "../../assets/img/logoPatientSummaryInvoice.png";

import Fingerprint from "../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../assets/img/Bar Code.png";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import socketIOClient from "socket.io-client";

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
  "PR No",
  "Item Code",
  //   "Item Name",
  //   "Balance",
  //   "Unit",
  //   "Consumption",
  "Vendor",
  //   "Last Price",
  //   "Unit",
  "Requested Qty",
  "Current Qty",
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
          props.selectedPRToPrint.purchaseRequestId.map((po) => {
            return po.item.map((pr, index) => {
              console.log(pr);
              count++;
              return (
                <TableRow key={index}>
                  <TableCell>{count}</TableCell>
                  <TableCell>{po.requestNo}</TableCell>
                  <TableCell>{pr.itemCode}</TableCell>
                  <TableCell>
                    {props.selectedPRToPrint.vendorId.englishName}
                  </TableCell>
                  <TableCell>{pr.reqQty}</TableCell>
                  <TableCell>{pr.currQty}</TableCell>
                </TableRow>
              );
            });
          })}
      </TableBody>
    </Table>
  );
}
