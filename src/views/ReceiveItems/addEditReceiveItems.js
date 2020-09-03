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
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
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
// const useStyles = makeStyles(tableStyles);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 4,
    "&:placeholder": {
      // color: "gray",
      // fontWeight: "400",
    },
    "&:before": {
      borderBottomWidth: "0px",
    },
    "&:after": {
      color: "black",
    },
  },
}));

const DATE = new Date();

const time = DATE.getHours();

function ReceiveItems(props) {
  // const classes = useStyles();

  const classes = useStyles();

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

    // setcomingFor(props.history.location.state.comingFor);

    // setVendors(props.history.location.state.vendors);

    // setGeneratedArray(props.history.location.state.generatedArray);

    // setPaymentTermsArray(props.history.location.state.paymentTerms);

    // const selectedRec = props.history.location.state.selectedItem;

    // if (selectedRec) {
    //   setSelectedItem(selectedRec);
    // }

    // if (selectedRec) {
    //   Object.entries(selectedRec).map(([key, val]) => {
    //     if (val && typeof val === "object") {
    //       dispatch({ field: key, value: val._id });
    //     } else {
    //       dispatch({ field: key, value: val });
    //     }
    //   });
    // }
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
        itemId: selectedItem.itemId._id,
        currentQty: selectedItem.currQty,
        requestedQty: selectedItem.reqQty,
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
        materialId: props.materialReceivingId,
        vendorId: selectedItem.itemId.vendorId,
        prId: selectedItem.prId,
        status: statusForReceivingItem,
      };

      console.log("params send while receiving data", params);

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

  // console.log("selectedItem", selectedItem);

  const handleAddReturnRequest = () => {
    console.log("rec", selectedItem);
    let path = `/home/wms/warehouse/materialreceiving/viewpo/externalreturn/add`;
    // /home/wms/warehouse/materialreceiving/viewpo
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

  useEffect(() => {
    setSelectedItem(props.selectedItem);
  }, [props.selectedItem]);

  return (
    <div
      style={
        {
          // backgroundColor: "#60d69f",
          // position: "fixed",
          // display: "flex",
          // width: "100%",
          // height: "100%",
          // flexDirection: "column",
          // flex: 1,
          // overflowY: "scroll",
        }
      }
    >
      {/* <Header /> */}
      <div>
        {/* <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>{comingFor === "add" ? "Receive Items" : "Receive Items"}</h4>
          </div>

          <div>
          </div>
        </div> */}

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                // type="number"
                disabled={true}
                label="Item Code"
                name={"itemCode"}
                value={selectedItem && selectedItem.itemId.itemCode}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="text"
                disabled={true}
                label="Item Name"
                name={"itemName"}
                value={selectedItem && selectedItem.itemId.name}
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

          <div className="row">
            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled={true}
                type="number"
                label="Current Qty"
                name={"currentQty"}
                value={selectedItem && selectedItem.currQty}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                disabled={true}
                label="Required Qty"
                name={"requiredQty"}
                value={selectedItem && selectedItem.reqQty}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
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
          </div>

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
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

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
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

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  inputVariant="filled"
                  fullWidth
                  format="dd/MM/yyyy"
                  label="Expiry Date"
                  onChange={(val) => onChangeDate(val, "expiryDate")}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={expiryDate === "" && isFormSubmitted}
                  value={expiryDate ? expiryDate : null}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="text"
                label="Unit"
                name={"unit"}
                value={unit}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={unit === "" && isFormSubmitted}
              />
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Discount %"
                name={"discount"}
                variant={"filled"}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                label="Unit Discount"
                name={"uniyDiscount"}
                value={uniyDiscount}
                variant={"filled"}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Discount Amount"
                name={"discountAmount"}
                value={discountAmount}
                variant={"filled"}
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
          </div>

          <div className="row">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Tax %"
                name={"tax"}
                value={tax}
                variant={"filled"}
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

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Tax Amount"
                name={"taxAmount"}
                variant={"filled"}
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
          </div>

          <div className="row">
            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Final Unit Price"
                name={"finalUnitPrice"}
                value={finalUnitPrice}
                variant={"filled"}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Sub Total"
                name={"subTotal"}
                value={subTotal}
                variant={"filled"}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Total Price"
                name={"totalPrice"}
                value={totalPrice}
                variant={"filled"}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Discount Amount"
                name={"discountAmount2"}
                value={discountAmount2}
                variant={"filled"}
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
          </div>

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="number"
                label="Invoice"
                name={"invoice"}
                value={invoice}
                variant={"filled"}
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

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  inputVariant="filled"
                  fullWidth={true}
                  label="Date/Time Invoice"
                  className="textInputStyle"
                  onChange={(val) => onChangeDate(val, "date")}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={date === "" && isFormSubmitted}
                  value={date ? date : null}
                />
              </MuiPickersUtilsProvider>
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  inputVariant="filled"
                  fullWidth
                  label="Date/Time Received"
                  className="textInputStyle"
                  onChange={(val) => onChangeDate(val, "receivedDate")}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={receivedDate === "" && isFormSubmitted}
                  value={receivedDate ? receivedDate : null}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                label="Comments"
                name={"comments"}
                value={comments}
                variant={"filled"}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={comments === "" && isFormSubmitted}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                variant={"filled"}
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
            </div>
          </div>

          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 50,
                marginTop: "1%",
                marginBottom: "1%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: 50,
                  justifyContent: "flex-end",
                  marginTop: "1%",
                  marginBottom: "1%",
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
                    receivedQty <= selectedItem.reqQty
                      ? handleAdd
                      : handleExtraQty
                  }
                  variant="contained"
                  color="primary"
                >
                  Receive
                </Button>
              </div>
              {/* ) : (
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
                </div> */}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          {/* <div style={{ marginBottom: 20, marginTop: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 60, height: 40, cursor: "pointer" }}
            />
          </div> */}

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
