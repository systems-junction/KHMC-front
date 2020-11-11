/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/Receive Item.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import MUIInputStyle from "../../assets/jss/material-dashboard-react/inputStyle.js";
import MUIInputStyleForCurrency from "../../assets/jss/material-dashboard-react/inputStylesForCurrency";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import dateTimeFormat from "../../constants/dateTimeFormat";
import dateFormat from "../../constants/dateFormat";

import TableforAddedQtyFU from "../ReplenishmentRequestForFU/tableforAddedQtyFU";

const statusArray = [
  // { key: "complete", value: "Complete" },
  { key: "Received", value: "Received" },
  // { key: "Partially Received", value: "Partially Received" },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
    marginBottom: 20,
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
    paddingLeft: 5,
    paddingRight: 5,
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#845DC2",
    width: "140px",
    height: "54px",
    outline: "none",
  },
};

const DATE = new Date();

const time = DATE.getHours();

function ReceiveItems(props) {
  const classesForInput = MUIInputStyle();
  const classesForInputForCurrency = MUIInputStyleForCurrency();

  const initialState = {
    requiredQty: "",
    receivedQty: "",
    bonusQty: "0",
    batchNumber: "12",
    lotNo: "12",
    unit: "kg",
    discount: "0",
    uniyDiscount: "10",
    discountAmount: "0",
    tax: "",
    taxAmount: "",
    finalUnitPrice: "",
    discountAmount2: "0",
    subTotal: "",
    totalPrice: "",
    invoice: "",
    date: "",
    receivedDate: new Date(),
    expiryDate: "",
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

    qualityRate: "",
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
    qualityRate,
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

    console.log(selectedRec, "selected rec");

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

  function validateForm() {
    return (
      receivedQty !== "" &&
      parseInt(receivedQty) > 0 &&
      bonusQty.length > 0 &&
      // batchNumber.length > 0 &&
      // lotNo.length > 0 &&
      // expiryDate !== "" &&
      // unit.length > 0 &&
      discount !== "" &&
      parseInt(discount) <= 100 &&
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
      receivedQty <= requestedQty &&
      qualityRate !== "" &&
      parseInt(qualityRate) <= 100
      // discountPercentage.length > 0
    );
  }

  console.log(selectedItem, "selec");

  const handleAdd = () => {
    if (validateForm()) {
      if (date > receivedDate) {
        setOpenNotification(true);
        setErrorMsg("Invoice date can not be greater than received date");
        return;
      }

      if (parseInt(receivedQty) !== parseInt(requestedQty)) {
        setOpenNotification(true);
        setErrorMsg("Received qty must be same as that of requested qty.");
        return;
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
        unit: selectedItem.itemId.issueUnit,
        discount: discount,
        unitDiscount: selectedItem.itemId.issueUnit,
        discountAmount,
        tax: selectedItem.itemId.issueUnitCost,
        taxAmount,
        finalUnitPrice: selectedItem.itemId.issueUnitCost,
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
        qualityRate: parseInt(qualityRate),

        batchArray: batchArray,
      };

      console.log("params", params);

      axios
        .post(addReceiveRequestBUUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Medical Order: ${requestNo} with item ${selectedItem.itemId.name} has been received successfully`,
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

  console.log(batchArray);

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
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Receive Items</h4>
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled={true}
                className="textInputStyle"
                id="itemCode"
                type="text"
                variant="filled"
                label="Item Code"
                name={"itemCode"}
                value={selectedItem && selectedItem.itemId.itemCode}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled={true}
                className="textInputStyle"
                id="itemName"
                type="text"
                variant="filled"
                label="Item Name"
                name={"itemName"}
                value={selectedItem && selectedItem.itemId.name}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                disabled={true}
                className="textInputStyle"
                id="lotNo"
                type={"number"}
                variant="filled"
                label="Lot No"
                name={"lotNo"}
                value={lotNo}
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
                disabled={true}
                className="textInputStyle"
                id="currentQty"
                type="number"
                variant="filled"
                label="Current Qty"
                name={"currentQty"}
                value={selectedItem && currentQty}
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled={true}
                className="textInputStyle"
                id="requiredQty"
                type="number"
                variant="filled"
                label="Required Qty"
                name={"requiredQty"}
                value={selectedItem && selectedItem.requestedQty}
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
                id="receivedQty"
                type="number"
                variant="filled"
                label="Received Qty"
                name={"receivedQty"}
                value={receivedQty}
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
                className="textInputStyle"
                id="bonusQty"
                type="number"
                variant="filled"
                label="Bonus Qty"
                name={"bonusQty"}
                value={bonusQty}
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

          {/* <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                disabled={true}
                className="textInputStyle"
                id="batchNumber"
                variant="filled"
                label="Batch Number"
                name={"batchNumber"}
                value={batchNumber}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  required
                  format={dateFormat}
                  inputVariant="filled"
                  fullWidth={true}
                  // format="MM/dd/yyyy"
                  label="Expiry Date (DD-MM-YYY)"
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
                    className: classesForInput.input,
                    classes: { input: classesForInput.input },
                  }}
                  InputLabelProps={{
                    className: classesForInput.label,
                    classes: { label: classesForInput.label },
                  }}
                />
              </MuiPickersUtilsProvider>
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

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                // disabled
                className="textInputStyle"
                type={"number"}
                id="discount"
                variant="filled"
                label="Discount %"
                name={"discount"}
                value={discount}
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
                className="textInputStyle"
                id="discountAmount"
                type={"number"}
                variant="filled"
                label="Discount Amount"
                name={"discountAmount"}
                value={discountAmount}
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
              /> */}
              <CurrencyTextField
                decimalPlaces={4}
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
                  // readOnly: true,
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
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
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

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                disabled
                className="textInputStyle"
                id="taxAmount"
                type={"number"}
                variant="filled"
                label="Tax Amount"
                name={"taxAmount"}
                value={taxAmount}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                className="textInputStyle"
                id="finalUnitPrice"
                type={"number"}
                variant="filled"
                label="Final Unit Price"
                name={"finalUnitPrice"}
                value={finalUnitPrice}
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
              /> */}

              <CurrencyTextField
                decimalPlaces={4}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
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
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              /> */}
              <CurrencyTextField
                decimalPlaces={4}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                className="textInputStyle"
                id="totalPrice"
                type={"number"}
                variant="filled"
                label="Total Price"
                name={"totalPrice"}
                value={totalPrice}
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
              /> */}

              <CurrencyTextField
                decimalPlaces={4}
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

            {/* <div
              className="col-md-3"
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
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
            </div> */}
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
                // disabled
                className="textInputStyle"
                id="invoice"
                // type={"number"}
                variant="filled"
                label="Invoice"
                name={"invoice"}
                value={invoice}
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

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  // format="MM/dd/yyyy HH:mm a"
                  format={dateTimeFormat}
                  required
                  inputVariant={"filled"}
                  fullWidth={true}
                  disableFuture
                  label="Date/Time Invoice (DD-MM-YYYY)"
                  onChange={(val) => onChangeDate(val, "date")}
                  // style={styles.styleForDate}
                  value={comingFor === "add" ? (date ? date : null) : date}
                  InputProps={{
                    className: classesForInput.input,
                    classes: { input: classesForInput.input },
                  }}
                  // InputLabelProps={{
                  //   className: classesForInput.label,
                  //   classes: { label: classesForInput.label },
                  // }}
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
                  // format="MM/dd/yyyy HH:mm a"
                  format={dateTimeFormat}
                  required
                  inputVariant={"filled"}
                  fullWidth={true}
                  label="Date/Time Received (DD-MM-YYYY)"
                  onChange={(val) => onChangeDate(val, "receivedDate")}
                  value={
                    comingFor === "add"
                      ? receivedDate
                        ? receivedDate
                        : null
                      : receivedDate
                  }
                  disableFuture
                  InputProps={{
                    className: classesForInput.input,
                    classes: { input: classesForInput.input },
                  }}
                  InputLabelProps={{
                    className: classesForInput.label,
                    classes: { label: classesForInput.label },
                  }}
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
                required
                className="textInputStyle"
                id="notes"
                variant="filled"
                label="Notes"
                name={"notes"}
                value={notes}
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
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type={"number"}
                className="textInputStyle"
                id="qualityRate"
                variant="filled"
                label="Rate item quality out of 100"
                name={"qualityRate"}
                value={qualityRate}
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
              className="col-md-6"
              style={{
                ...styles.inputContainerForDropDown,
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
                // input={<BootstrapInput />}
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                // InputLabelProps={{
                //   className: classesForInput.label,
                //   classes: { label: classesForInput.label },
                // }}
                // error={form === "" && isFormSubmitted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {statusArray.map((val) => {
                  return (
                    <MenuItem
                      // disabled={
                      //   receivedQty &&
                      //   ((val.key === "Received" &&
                      //     receivedQty < requestedQty) ||
                      //     (val.key === "Partially Recieved" &&
                      //       receivedQty >= requestedQty))
                      // }
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

          <div
            className="row"
            style={{ paddingLeft: "0.1rem", paddingRight: "0.1rem" }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 60, height: 40, cursor: "pointer" }}
              />

              {comingFor === "add" ? (
                <Button
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                  style={{ ...styles.stylesForButton }}
                >
                  Receive
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Button variant="contained">Upload Invoice</Button>
                  <Button
                    disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                    style={{ ...styles.stylesForButton }}
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

{
  /* <Button
                    // disabled={true}
                    // onClick={handleAdd}
                    variant="contained"
                    style={{ height: 54, marginRight: 6 }}
                  >
                    Upload Invoice
                  </Button> */
}
