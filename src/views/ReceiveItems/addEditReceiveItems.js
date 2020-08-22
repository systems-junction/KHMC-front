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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  addReceiveItemsUrl,
  updateReceiveItemsUrl,
} from "../../public/endpoins";

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/business_Unit.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

const statusArray = [
  { key: "received", value: "Received" },
  { key: "rejected", value: "Rejected" },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 35,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },

  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: "700",
    color: "white",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "60%",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
};
const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function ReceiveItems(props) {
  // const classes = useStyles();
  const classes = useStyleforinput();

  const initialState = {
    _id: "",
    itemCode: "",
    itemName: "",
    currentQty: "",
    requiredQty: "",
    receivedQty: "",
    bonusQty: "0",
    batchNumber: "123",
    lotNo: "123",
    unit: "kg",
    discount: "0",
    uniyDiscount: "0",
    discountAmount: "0",
    tax: "0",
    taxAmount: "0",
    finalUnitPrice: "1000",
    discountAmount2: "0",
    subTotal: "1000",
    totalPrice: "1000",
    invoice: "12345",
    date: "",
    receivedDate: new Date(),
    comments: "Some comments for receiving",
    expiryDate: "",
    discountPercentage: "",
    statusForReceivingItem: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
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
    discountAmount2,
    invoice,
    date,
    receivedDate,
    comments,
    expiryDate,
    discountPercentage,
    statusForReceivingItem,
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

  const [addRetrunRequest, setAddReturnRequest] = useState(false);
  const [receivedExceeds, setReceivedExceeds] = useState(false);

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
      comments.length > 0 &&
      statusForReceivingItem.length > 0
    );
  }

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      let params = {
        itemId: selectedItem.item.itemId._id,
        currentQty: selectedItem.item.currQty,
        requestedQty: selectedItem.item.reqQty,
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
        notes: comments,
        materialId: props.history.location.state.materialReceivingId,
        vendorId: selectedItem.vendorId,
        prId: selectedItem._id,
        status: statusForReceivingItem,
      };

      console.log("params", params);

      axios
        .post(addReceiveItemsUrl, params)
        .then((res) => {
          if (res.data.success) {
            if (statusForReceivingItem === "rejected") {
              setAddReturnRequest(true);
            } else {
              props.history.goBack();
            }
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
        status: statusForReceivingItem,
      };
      axios
        .put(updateReceiveItemsUrl, params)
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

  const handleAddReturnRequest = () => {
    console.log("rec", selectedItem);
    let path = `/home/wms/materialreceiving/viewpo/externalreturn/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: selectedItem,
      },
    });
  };

  const handleExtraQty = () => {
    if (receivedQty > selectedItem.item.reqQty) {
      setReceivedExceeds(true);
    }
  };

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
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabel style={styles.styleForLabel} id="generated-label">
                  Item Code
                </InputLabel> */}

                <TextField
                  // type="number"
                  disabled={true}
                  label="Item Code"
                  name={"itemCode"}
                  value={selectedItem && selectedItem.item.itemCode}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabel style={styles.styleForLabel} id="generated-label">
                  Item Name
                </InputLabel> */}
                <TextField
                  type="text"
                  disabled={true}
                  label="Item Name"
                  name={"itemName"}
                  value={selectedItem && selectedItem.item.name}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabel style={styles.styleForLabel} id="generated-label">
                  Current Qty
                </InputLabel> */}

                <TextField
                  disabled={true}
                  type="number"
                  label="Current Qty"
                  name={"currentQty"}
                  value={selectedItem && selectedItem.item.currQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabel style={styles.styleForLabel} id="generated-label">
                  Required Qty
                </InputLabel> */}
                <TextField
                  type="number"
                  disabled={true}
                  label="Required Qty"
                  name={"requiredQty"}
                  value={selectedItem && selectedItem.item.reqQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Received Qty*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Received Qty"
                  name={"receivedQty"}
                  value={receivedQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  error={receivedQty === "" && isFormSubmitted}
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                  // error={receivedQty.includes("e", 0)}
                />
              </div>
              {/* <ErrorMessage
                name={receivedQty}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>

            <div className="col-md-3">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Bonus Qty*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Bonus Qty"
                  name={"bonusQty"}
                  value={bonusQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  error={bonusQty === "" && isFormSubmitted}
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage name={bonusQty} isFormSubmitted={isFormSubmitted} /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Batch Number*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Batch Number"
                  name={"batchNumber"}
                  value={batchNumber}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  error={batchNumber === "" && isFormSubmitted}
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={batchNumber}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>

            <div className="col-md-4">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>LOT No*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="LOT No"
                  name={"lotNo"}
                  value={lotNo}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  error={lotNo === "" && isFormSubmitted}
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage name={lotNo} isFormSubmitted={isFormSubmitted} /> */}
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Expiry Date*</InputLabelComponent> */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  inputVariant="filled"
                  fullWidth
                  format="dd/MM/yyyy"
                  // label="Expiry Date"
                  onChange={(val) => onChangeDate(val, "expiryDate")}
                  // style={{
                  //   borderRadius: 10,
                  //   backgroundColor: "white",
                  //   height: 47,
                  //   marginTop: 5,
                  //   paddingTop:9,
                  //   paddingLeft:10
                  // }}

                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={expiryDate === "" && isFormSubmitted}
                  value={
                    comingFor === "add"
                      ? expiryDate
                        ? expiryDate
                        : null
                      : expiryDate
                  }

                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                />
              </MuiPickersUtilsProvider>
              {/* <ErrorMessage
                name={expiryDate}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Unit*</InputLabelComponent> */}
                <TextField
                  type="text"
                  label="Unit"
                  name={"unit"}
                  value={unit}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={unit === "" && isFormSubmitted}
                />
              </div>
              {/* <ErrorMessage name={unit} isFormSubmitted={isFormSubmitted} /> */}
            </div>

            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Discount %*</InputLabelComponent> */}
                <input
                  type="number"
                  label="Discount %"
                  name={"discount"}
                  value={discount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={discount === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage name={discount} isFormSubmitted={isFormSubmitted} /> */}
            </div>

            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Unit Discount*</InputLabelComponent> */}
                <TextField
                  label="Unit Discount"
                  name={"uniyDiscount"}
                  value={uniyDiscount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={uniyDiscount === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={uniyDiscount}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>

            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Discount Amount*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Discount Amount"
                  name={"discountAmount"}
                  value={discountAmount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={discountAmount === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={discountAmount}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Tax %*</InputLabelComponent> */}

                <TextField
                  type="number"
                  label="Tax %"
                  name={"tax"}
                  value={tax}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={tax === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage name={tax} isFormSubmitted={isFormSubmitted} /> */}
            </div>

            <div className="col-md-6">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Tax Amount*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Tax Amount"
                  name={"taxAmount"}
                  value={taxAmount}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={taxAmount === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={taxAmount}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Final Unit Price*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Final Unit Price"
                  name={"finalUnitPrice"}
                  value={finalUnitPrice}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={finalUnitPrice === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={finalUnitPrice}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>

            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Sub Total*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Sub Total"
                  name={"subTotal"}
                  value={subTotal}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={subTotal === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage name={subTotal} isFormSubmitted={isFormSubmitted} /> */}
            </div>

            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Total Price*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Total Price"
                  name={"totalPrice"}
                  value={totalPrice}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={totalPrice === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={totalPrice}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>

            <div className="col-md-3">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Amount Discount*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Discount Amount"
                  name={"discountAmount2"}
                  value={discountAmount2}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={discountAmount2 === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage
                name={discountAmount2}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Invoice*</InputLabelComponent> */}
                <TextField
                  type="number"
                  label="Invoice"
                  name={"invoice"}
                  value={invoice}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={invoice === "" && isFormSubmitted}
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                />
              </div>
              {/* <ErrorMessage name={invoice} isFormSubmitted={isFormSubmitted} /> */}
            </div>

            <div className="col-md-4">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Date/Time Invoice*</InputLabelComponent> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="filled"
                    fullWidth={true}
                    // label="Date/Time Invoice"
                    onChange={(val) => onChangeDate(val, "date")}
                    // style={{
                    //   backgroundColor: "white",
                    //   borderRadius: 10,
                    //   height: 47,
                    //   marginTop: 5,
                    //   paddingTop:9,
                    //   paddingLeft:10
                    // }}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    error={date === "" && isFormSubmitted}
                    value={comingFor === "add" ? (date ? date : null) : date}
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                  />
                </MuiPickersUtilsProvider>
                {/* <ErrorMessage name={date} isFormSubmitted={isFormSubmitted} /> */}
              </div>
            </div>

            <div className="col-md-4">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Date/Time Recieved*</InputLabelComponent> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="filled"
                    fullWidth
                    // label="Date/Time Received"
                    onChange={(val) => onChangeDate(val, "receivedDate")}
                    // style={{
                    //   backgroundColor: "white",
                    //   borderRadius: 10,
                    //   height: 47,
                    //   marginTop: 5,
                    //   paddingTop:9,
                    //   paddingLeft:10
                    // }}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    error={receivedDate === "" && isFormSubmitted}
                    value={
                      comingFor === "add"
                        ? receivedDate
                          ? receivedDate
                          : null
                        : receivedDate
                    }
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                  />
                </MuiPickersUtilsProvider>
                {/* <ErrorMessage
                  name={receivedDate}
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Comments*</InputLabelComponent> */}
                <TextField
                  label="Comments"
                  name={"comments"}
                  value={comments}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={comments === "" && isFormSubmitted}
                />
              </div>
              {/* <ErrorMessage name={comments} isFormSubmitted={isFormSubmitted} /> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div
                syle={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Status*</InputLabelComponent> */}
                <TextField
                  required
                  select
                  fullWidth
                  id="statusForReceivingItem"
                  name="statusForReceivingItem"
                  value={statusForReceivingItem}
                  onChange={onChangeValue}
                  label="Status"
                  className="dropDownStyle"
                  // input={<BootstrapInput />}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={statusForReceivingItem === "" && isFormSubmitted}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {statusArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {/* <ErrorMessage
                  name={statusForReceivingItem}
                  isFormSubmitted={isFormSubmitted}
                /> */}
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
                  <Button
                    style={{ minWidth: "20%", marginRight: 30 }}
                    disabled={true}
                    // onClick={handleAdd}
                    variant="contained"
                  >
                    Upload Invoice
                  </Button>

                  <Button
                    style={{ minWidth: "10%" }}
                    disabled={!validateForm()}
                    onClick={
                      receivedQty <= selectedItem.item.reqQty
                        ? handleAdd
                        : handleExtraQty
                    }
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
                  <Button
                    style={{ minWidth: "20%" }}
                    disabled={true}
                    // onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Upload Invoice
                  </Button>
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

          <Dialog
            open={addRetrunRequest}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Rejected Receiving Item?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                While rejecting the return request you need to create the return
                request for that.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleAddReturnRequest}
                color="primary"
                autoFocus
              >
                Genrate Return Request
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={receivedExceeds}
            onClose={() => {}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Received quantity exceeds than requested?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Received quantity is greater than the requested quantity. Return
                request for the additional quantity will be automatically
                created.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setReceivedExceeds(false)}
                color="primary"
                autoFocus
              >
                Cancel
              </Button>
              <Button onClick={handleAdd} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
export default ReceiveItems;
