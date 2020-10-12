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
import business_Unit from "../../assets/img/Receive Item.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import MUIInputStyles from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";
import MUIInputStylesForCurrency from "../../../src/assets/jss/material-dashboard-react/inputStylesForCurrency.js";

import InputLabelComponent from "../../components/InputLabel/inputLabel";

import BootstrapInput from "../../components/Dropdown/dropDown.js";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import dateTimeFormat from "../../constants/dateTimeFormat.js";
import dateFormat from "../../constants/dateFormat.js";

import TableforAddedQtyFU from "./tableforAddedQtyFU";

const statusArray = [
  { key: "Partially Received", value: "Partially Received" },
  { key: "Received", value: "Received" },
];

const inputStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    "&": {
      backgroundColor: "white",
    },
    "&:after": {
      backgroundColor: "white",
    },

    "&:hover": {
      backgroundColor: "white",
    },

    "&:focus": {
      boxShadow: "none",
      backgroundColor: "white",
    },
  },
}));

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 25,
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
  const classes = MUIInputStyles();
  const classesForInput = MUIInputStyles();
  const classesForInputForCurrency = MUIInputStylesForCurrency();

  const initialState = {
    requiredQty: "",
    receivedQty: "",
    bonusQty: "0",
    batchNumber: "",
    lotNo: "123",
    unit: "kg",
    discount: "5",
    uniyDiscount: "kg",
    discountAmount: "",
    tax: "",
    taxAmount: "",
    finalUnitPrice: "",
    discountAmount2: "0",
    subTotal: "",
    totalPrice: "",
    invoice: "FU-INV-123",
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
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }

    if (e.target.type === "number") {
      if (e.target.value < 0) {
        return;
      }
    }
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
  const [batchArray, setBatchArray] = useState([]);

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setGeneratedArray(props.history.location.state.generatedArray);

    setPaymentTermsArray(props.history.location.state.paymentTerms);

    const selectedRec = props.history.location.state.selectedItem;

    if (selectedRec) {
      setSelectedItem(selectedRec);
      setBatchArray(selectedRec.batchArray);
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

  // function validateForm() {
  //   return (
  //     receivedQty.length > 0 &&
  //     bonusQty.length > 0 &&
  //     batchNumber.length > 0 &&
  //     lotNo.length > 0 &&
  //     expiryDate !== "" &&
  //     unit.length > 0 &&
  //     discount.length > 0 &&
  //     uniyDiscount.length > 0 &&
  //     discountAmount.length > 0 &&
  //     tax.length > 0 &&
  //     taxAmount.length > 0 &&
  //     finalUnitPrice.length > 0 &&
  //     subTotal.length > 0 &&
  //     discountAmount2.length > 0 &&
  //     totalPrice.length > 0 &&
  //     invoice.length > 0 &&
  //     date !== "" &&
  //     receivedDate !== "" &&
  //     notes.length > 0 &&
  //     replenishmentRequestStatus !== "" &&
  //     receivedQty <= requestedQty
  //     // discountPercentage.length > 0
  //   );
  // }

  function validateForm() {
    return (
      receivedQty.length > 0 &&
      bonusQty.length > 0 &&
      // batchNumber.length > 0 &&
      // lotNo.length > 0 &&
      // expiryDate !== "" &&
      // unit.length > 0 &&
      // discount.length > 0 &&
      // uniyDiscount.length > 0 &&
      // discountAmount.length > 0 &&
      // tax.length > 0 &&
      // taxAmount.length > 0 &&
      // finalUnitPrice !== "" &&
      // subTotal !== "" &&
      // discountAmount2.length > 0 &&
      totalPrice !== "" &&
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
    if (date > receivedDate) {
      setOpenNotification(true);
      setErrorMsg("Inovice date can not be greater then received date");
      return;
    }

    if (validateForm()) {
      if (date > receivedDate) {
        setOpenNotification(true);
        setErrorMsg("Invoice date can not be greater than received date");
      }
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
            // props.history.goBack();
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Replenishment Request: ${requestNo} with item ${selectedItem.itemId.name} has been received`,
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

  function calculateTotal() {
    if (receivedQty && receivedQty !== "0") {
      let taxValueAmountForSingleItem =
        (selectedItem.itemId.tax * selectedItem.itemId.issueUnitCost) / 100;

      let totalTax = receivedQty * taxValueAmountForSingleItem;

      let subTotal = receivedQty * selectedItem.itemId.issueUnitCost + totalTax;

      let discountedAmount = (discount * subTotal) / 100;
      let totalPrice = subTotal - discountedAmount;

      dispatch({ field: "subTotal", value: subTotal });
      dispatch({ field: "taxAmount", value: totalTax });
      dispatch({ field: "totalPrice", value: totalPrice });
      dispatch({ field: "discountAmount", value: discountedAmount });
    }
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
            <h4>Order Receiving / Return</h4>
          </div>
        </div>

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div className="row" style={{ marginBottom: 15 }}>
            {batchArray.length > 0 ? (
              <>
                <h5
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Added Batches With Quantities
                </h5>
                <TableforAddedQtyFU returnBatchArray={batchArray} />
              </>
            ) : (
              undefined
            )}
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
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
                onBlur={calculateTotal}
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              />
            </div>
          </div>

          <div className="row">
            {/* <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              />
            </div> */}

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              />
            </div>

            {/* <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  required
                  inputVariant="filled"
                  fullWidth={true}
                  // format="MM/dd/yyyy"
                  format={dateFormat}
                  label="Expiry Date"
                  // variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  onChange={(val) => onChangeDate(val, "expiryDate")}
                  value={
                    comingFor === "add"
                      ? expiryDate
                        ? expiryDate
                        : null
                      : expiryDate
                  }
                />
              </MuiPickersUtilsProvider>
            </div> */}

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
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
              /> */}

              <TextField
                required
                disabled
                className="textInputStyle"
                id="unit"
                variant="filled"
                label="Unit"
                name={"unit"}
                value={selectedItem && selectedItem.itemId.issueUnit}
                onChange={onChangeValue}
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
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
                disabled
                required
                type="number"
                label="Discount %"
                name={"discount"}
                value={discount}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
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
              {/* <TextField
                required
                label="Unit Discount"
                name={"uniyDiscount"}
                value={uniyDiscount}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              /> */}

              <TextField
                required
                disabled
                className="textInputStyle"
                id="uniyDiscount"
                variant="filled"
                label="Unit Discount"
                name={"uniyDiscount"}
                value={selectedItem && selectedItem.itemId.issueUnit}
                onChange={onChangeValue}
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
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
              {/* <TextField
                required
                type="number"
                label="Discount Amount"
                name={"discountAmount"}
                value={discountAmount}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              /> */}
              <CurrencyTextField
                disabled
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="discountAmount"
                label="Discount Amount"
                name={"discountAmount"}
                value={discountAmount}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
              />
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                type="number"
                label="Tax %"
                name={"tax"}
                value={tax}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              /> */}

              <TextField
                required
                disabled
                className="textInputStyle"
                id="tax"
                type={"number"}
                variant="filled"
                label="Tax %"
                name={"tax"}
                value={selectedItem && selectedItem.itemId.tax}
                onChange={onChangeValue}
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
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
                required
                disabled
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
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
              {/* <TextField
                required
                type="number"
                label="Final Unit Price"
                name={"finalUnitPrice"}
                value={finalUnitPrice}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              /> */}

              <CurrencyTextField
                disabled
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="finalUnitPrice"
                label="Final Unit Price"
                name={"finalUnitPrice"}
                // value={finalUnitPrice}
                value={selectedItem && selectedItem.itemId.issueUnitCost}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
              />
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                type="number"
                label="Sub Total"
                name={"subTotal"}
                value={subTotal}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              /> */}
              <CurrencyTextField
                disabled
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="subTotal"
                label="Sub Total"
                name={"subTotal"}
                value={subTotal}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
              />
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                type="number"
                label="Total Price"
                name={"totalPrice"}
                value={totalPrice}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              /> */}

              <CurrencyTextField
                disabled
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="totalPrice"
                label="Total Price"
                name={"totalPrice"}
                value={totalPrice}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
              />
            </div>
          </div>

          <div className="row">
            {/* <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type="number"
                label="Discount Amount"
                name={"discountAmount2"}
                value={discountAmount2}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
              />
            </div> */}
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                disabled
                label="Invoice"
                name={"invoice"}
                value={invoice}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  required
                  disableFuture
                  inputVariant="filled"
                  fullWidth={true}
                  label="Date/Time Invoice (MM/DD/YYYY)"
                  // format="MM/dd/yyyy HH:mm a"
                  format={dateTimeFormat}
                  onChange={(val) => onChangeDate(val, "date")}
                  // style={styles.inputContainerForDate}
                  value={comingFor === "add" ? (date ? date : null) : date}
                  // variant="filled"
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
                  inputVariant="filled"
                  fullWidth={true}
                  label="Date/Time Received (MM/DD/YYYY)"
                  // format="MM/dd/yyyy HH:mm a"
                  format={dateTimeFormat}
                  disableFuture
                  onChange={(val) => onChangeDate(val, "receivedDate")}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
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
                label="Notes"
                name={"notes"}
                value={notes}
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
                required
                select
                fullWidth
                id="replenishmentRequestStatus"
                name="replenishmentRequestStatus"
                value={replenishmentRequestStatus}
                onChange={onChangeValue}
                label="Status"
                className="dropDownStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // input={<BootstrapInput />}
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

          <div className="row">
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 60, height: 40, cursor: "pointer" }}
              />

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
                    style={{ width: 100, height: 50 }}
                    disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Receive
                  </Button>
                </div>
              ) : (
                <div style={{}}>
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
                    style={{ width: 100, height: 50 }}
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
    </div>
  );
}
export default ReceiveItems;
