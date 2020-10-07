/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getPurchaseRequestUrl,
  deletePurchaseRequestUrl,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import purchase_request from "../../assets/img/purchase request.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";

import cookie from "react-cookies";

const stylesB = {
  stylesForActive: {
    verticalAlign: "center",
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "auto",
    height: "35px",
    outline: "none",
    fontSize: "0.6rem",
  },
  stylesForInActive: {
    verticalAlign: "center",
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#845DC2",
    width: "auto",
    height: "35px",
    outline: "none",
    fontSize: "0.6rem",
  },
  stylesForReceived: {
    verticalAlign: "center",
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#845DC2",
    width: "auto",
    height: "35px",
    outline: "none",
    fontSize: "0.6rem",
  },
};

const useStyles = makeStyles(styles);

const tableHeading = ["Item Code", "Item Name", "Requested Qty", "Action"];
const tableDataKeys = ["itemCode", "name", "reqQty"];

const actions = { add: true };

export default function PurchaseRequest(props) {
  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [selectedPurchaseRequests, setSelectedPurchaseRequest] = useState([]);

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  const classes = useStyles();

  const handleAdd = (prObj) => {};

  const replaceSlugToTitle = (val) => {
    if (val === "in_active") {
      return (
        <Button
          style={stylesB.stylesForInActive}
          variant="contained"
          color="primary"
        >
          <strong>In active</strong>
        </Button>
      );
    } else if (val === "active") {
      return (
        <Button
          style={stylesB.stylesForActive}
          variant="contained"
          color="primary"
        >
          <strong>Active</strong>
        </Button>
      );
    }
    if (val === "pending" || val === "to_do") {
      if (currentUser && currentUser.staffTypeId.type === "Committe Member") {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : (
              ""
            )}
          </>
        );
      } else {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            )}
          </>
        );
      }
    } else if (val === "in_progress") {
      return (
        <>
          <Button
            style={stylesB.stylesForReceived}
            variant="contained"
            color="primary"
          >
            <strong>In Progress</strong>
          </Button>
        </>
      );
    } else if (val === "complete" || val === "approved") {
      return (
        <>
          {val === "complete" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          )}
        </>
      );
    }

    return val;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return (
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " " +
      d.toLocaleTimeString()
    );
  };

  function checkAvailability(prObj) {
    for (let i = 0; i < selectedPurchaseRequests.length; i++) {
      if (prObj._id === selectedPurchaseRequests[i]._id) {
        return false;
      }
    }
    return true;
  }

  function handleDone() {
    props.handleAddPR(selectedPurchaseRequests);
  }

  console.log(props.items);

  return (
    <Dialog
      onClose={() => props.viewItem("")}
      fullWidth={true}
      maxWidth={"lg"}
      //   fullScreen={true}
      aria-labelledby="simple-dialog-title"
      open={props.openItemDialog}
    >
      <DialogContent style={{ backgroundColor: "#60d69f" }}>
        <div>
          <h5 style={{ color: "white", fontWeight:'bold' }}>
            Added Items
          </h5>
        </div>
     
            <Table>
              <TableHead
                className={classes["TableHeader"]}
                style={{
                  backgroundColor: "#2873cf",
                }}
              >
                <TableRow>
                  {tableHeading &&
                    tableHeading.map((prop, index) => {
                      return (
                        <>
                          <TableCell
                            className={classes.tableHeadCell}
                            style={{
                              color: "white",
                              fontWeight: "700",
                              // textAlign: "center",
                              borderTopLeftRadius: index === 0 ? 5 : 0,
                              borderTopRightRadius:
                                index === tableHeading.length - 1 ? 5 : 0,
                            }}
                            key={prop}
                          >
                            {prop}
                          </TableCell>
                        </>
                      );
                    })}
                </TableRow>
              </TableHead>

              <TableBody>
                {props.items &&
                  props.items.map((prop, index) => {
                    return (
                      <TableRow
                        key={index}
                        className={classes.tableBodyRow}
                        style={{
                          backgroundColor: "white",
                          cursor: "pointer",
                        }}
                      >
                        {tableDataKeys
                          ? tableDataKeys.map((val, key) => {
                              return (
                                <TableCell
                                  className={classes.tableCell}
                                  key={key}
                                  onClick={() => handleClick(prop, val)}
                                  style={{
                                    // textAlign: "center",
                                    cursor: props.handleModelMaterialReceiving
                                      ? "pointer"
                                      : "",
                                  }}
                                >
                                  {Array.isArray(val)
                                    ? prop[val[0]]
                                      ? prop[val[0]][val[1]]
                                      : null
                                    : val.toLowerCase() === "timestamp"
                                    ? new Intl.DateTimeFormat(
                                        "en-US",
                                        dateOptions
                                      ).format(Date.parse(prop[val]))
                                    : replaceSlugToTitle(prop[val])}
                                </TableCell>
                              );
                            })
                          : null}
                        <TableCell
                          className={classes.tableHeadCell}
                          style={{
                            color: "white",
                            fontWeight: "700",
                            textAlign: "center",
                            borderTopLeftRadius: index === 0 ? 5 : 0,
                            borderTopRightRadius:
                              index === tableHeading.length - 1 ? 5 : 0,
                          }}
                          key={prop}
                        >
                          {prop}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
      </DialogContent>
    </Dialog>
  );
}
