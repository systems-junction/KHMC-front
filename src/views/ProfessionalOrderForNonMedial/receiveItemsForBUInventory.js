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
  addReceiveRequestBUUrl,
  updateReceiveRequestBUUrl,
} from "../../public/endpoins";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/Receive Item.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";

const statusArray = [
  // { key: "pending_administration", value: "Pending Administration" },
  // { key: "Received", value: "Received" },
  { key: "complete", value: "Complete" },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },

  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: "700",
    color: "white",
  },

  styleForDate: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 46,
    marginTop: 5,
    paddingLeft: 10,
    paddingTop: 8,
  },

  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    // backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },
};
const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function ReceiveItems(props) {
  // const classes = useStyles();
  // const classesForInput = MUIInputStyle();
  const classes = useStyleforinput();

  const initialState = {
    requiredQty: "",
    receivedQty: "",
    bonusQty: "0",
    batchNumber: "12",
    lotNo: "12",
    unit: "kg",
    discount: "10",
    uniyDiscount: "10",
    discountAmount: "10",
    tax: "",
    taxAmount: "",
    finalUnitPrice: "",
    discountAmount2: "",
    subTotal: "",
    totalPrice: "",
    invoice: "FUINV-0091",
    date: "Mon June 31 2020 16:07:47 GMT+0500 (Pakistan Standard Time)",
    receivedDate: new Date(),
    expiryDate: "Mon Sep 30 2020 16:07:47 GMT+0500 (Pakistan Standard Time)",
    discountPercentage: "",

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
    buId: "",
    to: "",
    from: "",
    approvedBy: "",
    commentNote: "",
    secondStatus: "",

    notes: "Some notes",

    replenishmentRequestStatus: "",

    replenishmentRequestId: "",

    rrBUId: "",
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
    buId,
    to,
    from,
    approvedBy,
    commentNote,
    secondStatus,
    notes,
    replenishmentRequestStatus,

    replenishmentRequestId,

    rrBUId,
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
      // tax.length > 0 &&
      // taxAmount.length > 0 &&
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
        replenishmentRequestId: replenishmentRequestId,
        replenishmentRequestStatus,
        fuId: fuId,
        buId: buId,

        rrBUId: replenishmentRequestId,
        replenishmentRequestItemId: _id,
      };

      console.log("params", params);

      axios
        .post(addReceiveRequestBUUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `${selectedItem.itemId.name} has been received successfully`,
              },
            });
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
      };
      axios
        .put(updateReceiveRequestBUUrl, params)
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
            <h4>Receive Item</h4>
          </div>
        </div>

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
                id="itemCode"
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
                value={selectedItem && currentQty}
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
                value={selectedItem && selectedItem.requestedQty}
                onChange={onChangeValue}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
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
                required
                type="number"
                label="Received Qty"
                name={"receivedQty"}
                value={receivedQty}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                style={{
                  borderColor:
                    receivedQty > requestedQty ||
                    (replenishmentRequestStatus &&
                      replenishmentRequestStatus === "Received" &&
                      receivedQty !== requestedQty)
                      ? "red"
                      : null,
                  borderWidth:
                    receivedQty > requestedQty ||
                    (replenishmentRequestStatus &&
                      replenishmentRequestStatus === "Received" &&
                      receivedQty !== requestedQty)
                      ? 2.5
                      : null,
                }}
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
                required
                type="number"
                label="Bonus Qty"
                name={"bonusQty"}
                value={bonusQty}
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

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type="number"
                label="Batch Number"
                name={"batchNumber"}
                value={batchNumber}
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
              className="col-md-4"
              // <div
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type="number"
                label="LOT No"
                name={"lotNo"}
                value={lotNo}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  required
                  inputVariant="filled"
                  fullWidth={true}
                  // format="dd/MM/yyyy"
                  label="Expiry Date"
                  onChange={(val) => onChangeDate(val, "expiryDate")}
                  style={{ borderRadius: 10, backgroundColor: "white" }}
                  value={
                    comingFor === "add"
                      ? expiryDate
                        ? expiryDate
                        : null
                      : expiryDate
                  }
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
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
                required
                className="textInputStyle"
                id="unit"
                variant="filled"
                label="Unit"
                name={"unit"}
                value={unit}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
              />
              {/* <TextField
                id="unit"
                type="text"
                label="Unit"
                name={"unit"}
                value={unit}
                onChange={onChangeValue}
                className="textInputStyle"
                Variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              /> */}
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                className="textInputStyle"
                type={"number"}
                id="discount"
                variant="filled"
                label="Discount %"
                name={"discount"}
                value={discount}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
              {/* <TextField
                id="discount"
                type="number"
                label="Discount %"
                name={"discount"}
                value={discount}
                onChange={onChangeValue}
                className="textInputStyle"
                Variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              /> */}
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                className="textInputStyle"
                id="uniyDiscount"
                variant="filled"
                label="Unit Discount"
                name={"uniyDiscount"}
                value={uniyDiscount}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
              />
              {/* <TextField
                id="uniyDiscount"
                label="Unit Discount"
                name={"uniyDiscount"}
                value={uniyDiscount}
                onChange={onChangeValue}
                className="textInputStyle"
                Variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              /> */}
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                className="textInputStyle"
                id="discountAmount"
                type={"number"}
                variant="filled"
                label="Discount Amount"
                name={"discountAmount"}
                value={discountAmount}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
              {/* <TextField
                type="number"
                label="Discount Amount"
                name={"discountAmount"}
                value={discountAmount}
                onChange={onChangeValue}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                Variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }} */}
              {/* /> */}
            </div>
          </div>

          {/* <div className="row">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                 required
                className="textInputStyle"
                id="tax"
                type={"number"}
                variant="filled"
                label="Tax %"
                name={"tax"}
                value={tax}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
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
                 required
                id="taxAmount"
                type="number"
                label="Tax Amount"
                name={"taxAmount"}
                value={taxAmount}
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
          </div> */}

          <div className="row">
            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                className="textInputStyle"
                id="finalUnitPrice"
                type={"number"}
                label="Final Unit Price"
                name={"finalUnitPrice"}
                value={finalUnitPrice}
                onChange={onChangeValue}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
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
                required
                className="textInputStyle"
                id="subTotal"
                type={"number"}
                variant="filled"
                label="Sub Total"
                name={"subTotal"}
                value={subTotal}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
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
                required
                className="textInputStyle"
                type="number"
                id="totalPrice"
                variant="filled"
                label="Total Price"
                name={"totalPrice"}
                value={totalPrice}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
            </div>

            <div
              className="col-md-3"
              // <div
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                className="textInputStyle"
                id="discountAmount2"
                type={"number"}
                variant="filled"
                label="Discount Amount"
                name={"discountAmount2"}
                value={discountAmount2}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
            </div>
            {/* </div> */}
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
                required
                className="textInputStyle"
                id="invoice"
                variant="filled"
                label="Invoice"
                name={"invoice"}
                value={invoice}
                onChange={onChangeValue}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
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
                  required
                  inputVariant={"filled"}
                  fullWidth={true}
                  label="Date/Time Invoice"
                  onChange={(val) => onChangeDate(val, "date")}
                  // style={styles.styleForDate}
                  value={comingFor === "add" ? (date ? date : null) : date}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
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
                  required
                  inputVariant={"filled"}
                  fullWidth={true}
                  label="Date/Time Received"
                  onChange={(val) => onChangeDate(val, "receivedDate")}
                  // style={styles.styleForDate}
                  value={
                    comingFor === "add"
                      ? receivedDate
                        ? receivedDate
                        : new Date()
                      : receivedDate
                  }
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </MuiPickersUtilsProvider>
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
                required
                className="textInputStyle"
                id="notes"
                variant="filled"
                label="Notes"
                name={"notes"}
                value={notes}
                onChange={onChangeValue}
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
                required
                select
                fullWidth
                id="replenishmentRequestStatus"
                name="replenishmentRequestStatus"
                value={replenishmentRequestStatus}
                onChange={onChangeValue}
                label="Status"
                variant="filled"
                // className="dropDownStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
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
              </TextField>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            marginBottom: 20,
            marginTop: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{}}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 60, height: 40, cursor: "pointer" }}
            />
          </div>

          <div>
            {comingFor === "add" ? (
              <div style={{}}>
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
                  style={styles.stylesForButton}
                >
                  Receive
                </Button>
              </div>
            ) : (
              <div style={{}}>
                <Button
                  style={{ minWidth: "20%" }}
                  // disabled={true}
                  // onClick={handleAdd}
                  variant="contained"
                  // color="primary"
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
      </div>
    </div>
  );
}
export default ReceiveItems;
