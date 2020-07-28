/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import {
  addReceiveItemsUrl,
  updateReceiveItemsUrl,
  addReceiveRequestFUUrl,
  updateReceiveRequestFUUrl,
} from "../../public/endpoins";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/business_Unit.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import InputLabelComponent from "../../components/InputLabel/inputLabel";

import BootstrapInput from "../../components/Dropdown/dropDown.js";

const statusArray = [
  { key: "Partially Received", value: "Partially Received" },
  { key: "Received", value: "Received" },
];

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   paddingLeft: 5,
  //   paddingRight: 5,
  // },

  // buttonContainer: {
  //   marginTop: 25,
  // },

  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
    // backgroundColor: "white",
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },

  styleForLabel: {
    fontWeight: "700",
    color: "white",
  },

  inputContainerForDate: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    height: 45,
    paddingLeft: 10,
    paddingTop: 8,
  },
};
const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function ReceiveItems(props) {
  const classes = useStyles();

  const initialState = {
    requiredQty: "",
    receivedQty: "",
    bonusQty: "0",
    batchNumber: "123",
    lotNo: "123",
    unit: "kg",
    discount: "0",
    uniyDiscount: "kg",
    discountAmount: "0",
    tax: "0",
    taxAmount: "0",
    finalUnitPrice: "1000",
    discountAmount2: "0",
    subTotal: "1000",
    totalPrice: "1000",
    invoice: "123",
    date: "",
    receivedDate: new Date(),
    expiryDate: "",
    discountPercentage: "0",

    _id: "",
    requestNo: "",
    generatedBy: "",
    dateGenerated: "",
    vendorId: "",
    status: "to_do",
    itemId: "",
    itemCode: "",
    itemName: "",
    description: "",
    currentQty: "",
    requestedQty: "",
    comments: "",
    vendors: [],
    statues: [],
    items: [],
    selectedRow: "",
    reason: "",

    generated: "Manual",

    requesterName: "",
    department: "",
    orderType: "",
    maximumLevel: "",

    committeeStatus: "",

    vendorsArray: [],

    recieptUnit: "",
    issueUnit: "",
    fuItemCost: "",
    fuId: "",
    to: "",
    from: "",
    approvedBy: "",
    commentNote: "",
    secondStatus: "",

    notes: "Some Comments",

    replenishmentRequestStatus: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    requiredQty,
    receivedQty,
    bonusQty,
    batchNumber,
    lotNo,
    unit,
    discount,
    uniyDiscount,
    discountAmount,
    tax,
    taxAmount,
    finalUnitPrice,
    subTotal,
    totalPrice,
    discountAmount2,
    invoice,
    date,
    receivedDate,
    expiryDate,
    discountPercentage,

    _id,
    requestNo,
    generatedBy,
    generated,
    dateGenerated,
    vendorId,
    status,
    itemCode,
    itemId,
    itemName,
    description,
    currentQty,
    requestedQty,
    comments,
    vendors,
    statues,
    items,
    selectedRow,
    reason,
    requesterName,
    department,
    orderType,

    maximumLevel,

    committeeStatus,

    vendorsArrayForItems,

    recieptUnit,
    issueUnit,
    fuItemCost,
    fuId,
    to,
    from,
    approvedBy,
    commentNote,
    secondStatus,
    notes,
    replenishmentRequestStatus,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function onChangeDate(value, type) {
    dispatch({ field: type, value });
  }

  const [comingFor, setcomingFor] = useState("");

  const [vendorsArray, setVendors] = useState("");

  const [generatedArray, setGeneratedArray] = useState("");

  const [paymentTermsArray, setPaymentTermsArray] = useState("");

  const [shippingTerms, setShippingTerms] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  const [vendor, setVendor] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setGeneratedArray(props.history.location.state.generatedArray);

    setPaymentTermsArray(props.history.location.state.paymentTerms);

    const selectedRec = props.history.location.state.selectedItem;

    if (selectedRec) {
      setSelectedItem(selectedRec);
    }

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          dispatch({ field: key, value: val._id });
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
  }, []);

  function validateForm() {
    return (
      receivedQty.length > 0 &&
      bonusQty.length > 0 &&
      batchNumber.length > 0 &&
      lotNo.length > 0 &&
      expiryDate !== "" &&
      unit.length > 0 &&
      discount.length > 0 &&
      uniyDiscount.length > 0 &&
      discountAmount.length > 0 &&
      tax.length > 0 &&
      taxAmount.length > 0 &&
      finalUnitPrice.length > 0 &&
      subTotal.length > 0 &&
      discountAmount2.length > 0 &&
      totalPrice.length > 0 &&
      invoice.length > 0 &&
      date !== "" &&
      receivedDate !== "" &&
      notes.length > 0 &&
      replenishmentRequestStatus !== "" &&
      receivedQty <= requestedQty
      // discountPercentage.length > 0
    );
  }

  const handleAdd = () => {
    if (validateForm()) {
      let params = {
        itemId: selectedItem.itemId._id,
        currentQty: currentQty,
        requestedQty: requestedQty,
        receivedQty,
        bonusQty,
        batchNumber,
        lotNumber: lotNo,
        expiryDate,
        unit,
        discount: discount,
        unitDiscount: uniyDiscount,
        discountAmount,
        tax,
        taxAmount,
        finalUnitPrice,
        subTotal,
        discountAmount2,
        totalPrice,
        invoice,
        dateInvoice: date,
        dateReceived: receivedDate,
        notes,
        replenishmentRequestId: _id,
        replenishmentRequestStatus,
        fuId: fuId,
      };

      console.log("params for add", params);

      axios
        .post(addReceiveRequestFUUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding purchase request", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the purchase request");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      let params = {
        _id,
        itemCode,
        itemName,
        currentQty,
        requiredQty,
        receivedQty,
        bonusQty,
        batchNumber,
        lotNo,
        unit,
        discount,
        uniyDiscount,
        discountAmount,
        tax,
        taxAmount,
        finalUnitPrice,
        subTotal,
        totalPrice,
        invoice,
        date,
        comments,
        expiryDate,
        discountPercentage,
        replenishmentRequestId: _id,
        replenishmentRequestStatus,
        fuId: fuId,
      };
      axios
        .put(updateReceiveRequestFUUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after updating purchase request", e);
          setOpenNotification(true);
          setErrorMsg("Error while editing the purchase request");
        });
    }
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  console.log("vendor id in receive items", selectedItem);

  return (
    <div
      style={{
        backgroundColor: "#60d69f",
        position: "fixed",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flex: 1,
        overflowY: "scroll",
      }}
    >
      <Header />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>{comingFor === "add" ? "Receive Items" : "Receive Items"}</h4>
          </div>

          <div>
            {/* <img onClick={() => props.history.goBack()} src={Add_New} /> */}
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div className="col-md-6">
              <div style={styles.inputContainerForTextField}>
                {/* <InputLabel style={styles.styleForLabel} id="generated-label">
                  Item Code
                </InputLabel> */}

                <InputLabelComponent>Item Code</InputLabelComponent>

                <input
                  // type="number"
                  disabled={true}
                  placeholder="Item Code"
                  name={"itemCode"}
                  value={selectedItem && selectedItem.itemId.itemCode}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Item Name
                </InputLabel>
                <input
                  type="text"
                  disabled={true}
                  placeholder="Item Name"
                  name={"itemName"}
                  value={selectedItem && selectedItem.itemId.name}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Current Qty
                </InputLabel>

                <input
                  disabled={true}
                  type="number"
                  placeholder="Current Qty"
                  name={"currentQty"}
                  value={selectedItem && currentQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Required Qty
                </InputLabel>
                <input
                  type="number"
                  disabled={true}
                  placeholder="Required Qty"
                  name={"requiredQty"}
                  value={selectedItem && selectedItem.requestedQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Received Qty
                </InputLabel>
                <input
                  type="number"
                  placeholder="Received Qty"
                  name={"receivedQty"}
                  value={receivedQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                  style={{
                    borderColor:
                      ((receivedQty > requestedQty ||
                        receivedQty < requestedQty) &&
                        replenishmentRequestStatus === "Received") ||
                      (receivedQty >= requestedQty &&
                        replenishmentRequestStatus === "Partially Recieved")
                        ? "red"
                        : null,

                    borderWidth:
                      ((receivedQty > requestedQty ||
                        receivedQty < requestedQty) &&
                        replenishmentRequestStatus === "Received") ||
                      (receivedQty >= requestedQty &&
                        replenishmentRequestStatus === "Partially Recieved")
                        ? 2.5
                        : null,
                  }}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Bonus Qty
                </InputLabel>
                <input
                  type="number"
                  placeholder="Bonus Qty"
                  name={"bonusQty"}
                  value={bonusQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Batch Number
                </InputLabel>
                <input
                  type="number"
                  placeholder="Batch Number"
                  name={"batchNumber"}
                  value={batchNumber}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  LOT No
                </InputLabel>
                <input
                  type="number"
                  placeholder="LOT No"
                  name={"lotNo"}
                  value={lotNo}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div
              className="col-md-4"
              style={(styles.inputContainerForTextField, { marginTop: 35 })}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Expiry Date
              </InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  // inputVariant="outlined"
                  style={styles.inputContainerForDate}
                  fullWidth={true}
                  format="dd/MM/yyyy"
                  // label="Expiry Date"
                  onChange={(val) => onChangeDate(val, "expiryDate")}
                  value={
                    comingFor === "add"
                      ? expiryDate
                        ? expiryDate
                        : null
                      : expiryDate
                  }
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Unit
                </InputLabel>
                <input
                  type="text"
                  placeholder="Unit"
                  name={"unit"}
                  value={unit}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Discount %
                </InputLabel>
                <input
                  type="number"
                  placeholder="Discount %"
                  name={"discount"}
                  value={discount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Unit Discount
                </InputLabel>
                <input
                  placeholder="Unit Discount"
                  name={"uniyDiscount"}
                  value={uniyDiscount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Discount Amount
                </InputLabel>
                <input
                  type="number"
                  placeholder="Discount Amount"
                  name={"discountAmount"}
                  value={discountAmount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Tax %
                </InputLabel>

                <input
                  type="number"
                  placeholder="Tax %"
                  name={"tax"}
                  value={tax}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Tax Amount
                </InputLabel>
                <input
                  type="number"
                  placeholder="Tax Amount"
                  name={"taxAmount"}
                  value={taxAmount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Final Unit Price
                </InputLabel>
                <input
                  type="number"
                  placeholder="Final Unit Price"
                  name={"finalUnitPrice"}
                  value={finalUnitPrice}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Sub Total
                </InputLabel>
                <input
                  type="number"
                  placeholder="Sub Total"
                  name={"subTotal"}
                  value={subTotal}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Total Price
                </InputLabel>
                <input
                  type="number"
                  placeholder="Total Price"
                  name={"totalPrice"}
                  value={totalPrice}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Discount Amount
                </InputLabel>
                <input
                  type="number"
                  placeholder="Discount Amount"
                  name={"discountAmount2"}
                  value={discountAmount2}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Invoice
                </InputLabel>
                <input
                  type="number"
                  placeholder="Invoice"
                  name={"invoice"}
                  value={invoice}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div
                style={(styles.inputContainerForTextField, { marginTop: 35 })}
              >
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Date/Time Invoice
                </InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    // inputVariant="outlined"
                    fullWidth={true}
                    // label="Date/Time Invoice"
                    onChange={(val) => onChangeDate(val, "date")}
                    style={styles.inputContainerForDate}
                    value={comingFor === "add" ? (date ? date : null) : date}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <div className="col-md-4">
              <div
                style={(styles.inputContainerForTextField, { marginTop: 35 })}
              >
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Date/Time received
                </InputLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    // inputVariant="outlined"
                    fullWidth={true}
                    // label="Date/Time Received"
                    onChange={(val) => onChangeDate(val, "receivedDate")}
                    style={styles.inputContainerForDate}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    value={
                      comingFor === "add"
                        ? receivedDate
                          ? receivedDate
                          : null
                        : receivedDate
                    }
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.styleForLabel} id="generated-label">
                  Notes
                </InputLabel>
                <input
                  placeholder="Notes"
                  name={"notes"}
                  value={notes}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div style={styles.inputContainerForDropDown}>
                <InputLabel id="status-label" style={styles.styleForLabel}>
                  Status
                </InputLabel>
                <Select
                  fullWidth
                  id="replenishmentRequestStatus"
                  name="replenishmentRequestStatus"
                  value={replenishmentRequestStatus}
                  onChange={onChangeValue}
                  label="Status"
                  className="dropDownStyle"
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {statusArray.map((val) => {
                    return (
                      <MenuItem
                        disabled={
                          receivedQty &&
                          ((val.key === "Received" &&
                            receivedQty < requestedQty) ||
                            (val.key === "Partially Recieved" &&
                              receivedQty >= requestedQty))
                        }
                        key={val.key}
                        value={val.key}
                      >
                        {val.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 50,
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              {comingFor === "add" ? (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    height: 50,
                    justifyContent: "flex-end",
                    marginTop: "2%",
                    marginBottom: "2%",
                    flexDirection: "row",
                  }}
                >
                  {/* <Button
                    style={{ minWidth: "20%", marginRight: 30 }}
                    // disabled={true}
                    // onClick={handleAdd}
                    variant="contained"
                  >
                    Upload Invoice
                  </Button> */}

                  <Button
                    style={{ minWidth: "10%" }}
                    disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Receive
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    height: 50,
                    justifyContent: "space-between",
                    marginTop: "2%",
                    marginBottom: "2%",
                    flexDirection: "row",
                  }}
                >
                  {/* <Button
                    style={{ minWidth: "20%" }}
                    // disabled={true}
                    // onClick={handleAdd}
                    variant="contained"
                    // color="primary"
                  >
                    Upload Invoice
                  </Button> */}
                  <Button
                    style={{ minWidth: "10%" }}
                    disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Receive
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ marginBottom: 20, marginTop: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 60, height: 40, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReceiveItems;
