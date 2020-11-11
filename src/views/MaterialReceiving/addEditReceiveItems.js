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
import MUIStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";
import MUIStyleForInputForCurrency from "../../../src/assets/jss/material-dashboard-react/inputStylesForCurrency.js";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import TableforAddedQty from "./tableforAddedQty";
import dateFormat from "../../constants/dateFormat";
import dateTimeFormat from "../../constants/dateTimeFormat";

const statusArray = [
  { key: "received", value: "Received" },
  { key: "rejected", value: "Rejected" },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
    marginTop: 20,
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
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const DATE = new Date();

const time = DATE.getHours();

function ReceiveItems(props) {
  const classes = MUIStyleforinput();
  const classesForInput = MUIStyleForInputForCurrency();

  const initialState = {
    _id: "",
    itemCode: "",
    itemName: "",
    currentQty: "",
    requiredQty: "",
    receivedQty: 0,
    bonusQty: "0",
    lotNo: "",
    unit: "",
    discount: "0",
    uniyDiscount: "",
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
    comments: "",
    discountPercentage: "",
    statusForReceivingItem: "",

    selectedBatch: "",

    quantity: "",
    batchNumber: "",
    expiryDate: "",
    price: "",

    batchStatus: "",

    returnedQty: 0,
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
    discountPercentage,
    statusForReceivingItem,

    selectedBatch,

    quantity,
    batchNumber,
    expiryDate,
    price,

    batchStatus,

    returnedQty,
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

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  const [vendor, setVendor] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  const [addRetrunRequest, setAddReturnRequest] = useState(false);
  const [receivedExceeds, setReceivedExceeds] = useState(false);

  const [batchArray, setBatchArray] = useState([]);

  const [selectItemToEditId, setSelectItemToEditId] = useState("");

  const [rejectedBatches, setRejectedBatches] = useState("");

  useEffect(() => {
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
      // receivedQty !== 0 &&
      bonusQty.length > 0 &&
      // batchNumber.length > 0 &&
      lotNo !== "" &&
      // expiryDate !== "" &&
      // unit.length > 0 &&
      discount !== "" &&
      parseInt(discount) <= 100 &&
      // uniyDiscount.length > 0 &&
      // discountAmount.length > 0 &&
      // tax.length > 0 &&
      // taxAmount.length > 0 &&
      // finalUnitPrice.length > 0 &&
      // subTotal.length > 0 &&
      // discountAmount2.length > 0 &&
      // totalPrice !== "" &&
      invoice !== "" &&
      date !== "" &&
      receivedDate !== "" &&
      comments !== "" &&
      // statusForReceivingItem.length > 0 &&
      batchArray.length > 0
    );
  }

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      if (date > receivedDate) {
        setOpenNotification(true);
        setErrorMsg("Invoice date can not be greater than received date");
        return;
      }

      let statusForRequest = "rejected";

      let generateReturn = false;

      let batchArrayWithReceivedStatus = [];
      let batchArrayWithRejectedStatus = [];

      for (let i = 0; i < batchArray.length; i++) {
        if (batchArray[i].batchStatus === "received") {
          batchArrayWithReceivedStatus.push(batchArray[i]);
          statusForRequest = "received";
        } else if (batchArray[i].batchStatus === "rejected") {
          batchArrayWithRejectedStatus.push(batchArray[i]);
          generateReturn = true;
        }
      }

      let params = {
        itemId: selectedItem.itemId._id,
        currentQty: selectedItem.currQty,
        requestedQty: selectedItem.reqQty,
        receivedQty,
        bonusQty,
        batchNumber,
        lotNumber: lotNo,
        expiryDate,
        unit: selectedItem.itemId.issueUnit,
        discount: discount,
        unitDiscount: selectedItem.itemId.issueUnit,
        discountAmount,
        tax: selectedItem.itemId.tax,
        taxAmount,
        finalUnitPrice: selectedItem.itemId.issueUnitCost,
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
        // status: statusForReceivingItem,
        status: statusForRequest,
        batchArray: batchArrayWithReceivedStatus,
        returnedQty,
      };

      console.log("params send while receiving data", params);

      axios
        .post(addReceiveItemsUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data);
            if (generateReturn) {
              setAddReturnRequest(true);
              setRejectedBatches(batchArrayWithRejectedStatus);
            } else {
              // props.history.goBack();
              props.history.replace({
                pathname: "/home/wms/fus/medicinalorder/success",
                state: {
                  message: `Purchase Order:${props.selectedItem.requestNo} with item ${selectedItem.itemId.name} has been received successfully`,
                },
              });
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
        batchArray: batchArray,
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

  const handleAddReturnRequest = () => {
    console.log("rec", selectedItem);
    let path = `/home/wms/warehouse/materialreceiving/viewpo/externalreturn/add`;
    // /home/wms/warehouse/materialreceiving/viewpo
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: selectedItem,
        batchArray: rejectedBatches,
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

  function calculateTotal() {
    if (receivedQty && receivedQty !== "0") {
      let taxValueAmountForSingleItem =
        (selectedItem.itemId.tax * selectedItem.itemId.receiptUnitCost) / 100;

      let totalTax = receivedQty * taxValueAmountForSingleItem;

      let subTotal =
        receivedQty * selectedItem.itemId.receiptUnitCost + totalTax;

      let discountedAmount = (discount * subTotal) / 100;
      let totalPrice = subTotal - discountedAmount;

      dispatch({ field: "subTotal", value: subTotal });
      dispatch({ field: "taxAmount", value: totalTax });
      dispatch({ field: "totalPrice", value: totalPrice });
      dispatch({ field: "discountAmount", value: discountedAmount });
    }
  }

  function validateBatchForm() {
    return (
      batchNumber &&
      batchNumber !== "" &&
      quantity &&
      quantity !== "" &&
      parseInt(quantity) !== 0 &&
      price !== "" &&
      expiryDate &&
      expiryDate !== "" &&
      batchStatus !== ""
    );
  }

  const addNew = () => {
    // if (quantity > selectedItem.reqQty) {
    //   setOpenNotification(true);
    //   setErrorMsg(
    //     "Received quantity can not exceed from the requested quantity"
    //   );
    //   return;
    // }

    if (
      parseInt(receivedQty) + parseInt(quantity) + parseInt(returnedQty) >
      selectedItem.reqQty
    ) {
      setOpenNotification(true);
      setErrorMsg(
        "Received quantity can not exceed from the requested quantity"
      );
      return;
    }

    let found =
      batchArray && batchArray.find((item) => item.batchNumber === batchNumber);
    if (found) {
      setOpenNotification(true);
      setErrorMsg("Qty from that batch has already been added");
      return;
    }

    setBatchArray([
      ...batchArray,
      {
        quantity,
        batchNumber,
        expiryDate,
        price,
        batchStatus,
      },
    ]);

    if (batchStatus === "received") {
      dispatch({
        field: "receivedQty",
        value: parseInt(receivedQty) + parseInt(quantity),
      });
    } else if (batchStatus === "rejected") {
      dispatch({
        field: "returnedQty",
        value: parseInt(returnedQty) + parseInt(quantity),
      });
    }

    dispatch({ field: "batchNumber", value: "" });
    dispatch({ field: "quantity", value: "" });
    dispatch({ field: "expiryDate", value: "" });
    dispatch({ field: "price", value: "" });
    dispatch({ field: "batchStatus", value: "" });
  };

  useEffect(() => {
    if (receivedQty !== 0) {
      // console.log("sdsd", receivedQty);
      calculateTotal();
    }
  }, [receivedQty]);

  function handleItemDelete(item) {
    // console.log(item);
    dispatch({
      field: "receivedQty",
      value: parseInt(receivedQty) - parseInt(item.quantity),
    });
    // if (status === "pending_approval") {
    let temp = batchArray.filter((i) => i.batchNumber !== item.batchNumber);

    setBatchArray([...temp]);
    // dispatch({
    //   field: "returnBatchArray",
    //   value: [...temp],
    // });
    // } else {
    //   setOpenNotification(true);
    //   setErrorMsg("Items can not be deleted once they are in progess");
    // }
  }

  function handleRequestedItemEdit(i) {
    // console.log(i);
    // if (status === "pending") {
    // setDialogOpen(true);
    // setSelectedItem(i);
    setSelectItemToEditId(i);

    // dispatch({
    //   field: "receivedQty",
    //   value: parseInt(receivedQty) - parseInt(i.quantity),
    // });

    if (i.batchStatus === "received") {
      dispatch({
        field: "receivedQty",
        value: parseInt(receivedQty) - parseInt(i.quantity),
      });
    } else if (i.batchStatus === "rejected") {
      dispatch({
        field: "returnedQty",
        value: parseInt(returnedQty) - parseInt(i.quantity),
      });
    }

    dispatch({ field: "batchNumber", value: i.batchNumber });
    dispatch({ field: "quantity", value: i.quantity });
    dispatch({ field: "expiryDate", value: i.expiryDate });
    dispatch({ field: "price", value: i.price });
    dispatch({ field: "batchStatus", value: i.batchStatus });

    // } else {
    //   setOpenNotification(true);
    //   setErrorMsg("Item can not be updated once it is in progess");
    // }
  }

  const editSelectedItem = () => {
    if (!validateBatchForm()) {
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
      return;
    }

    if (
      parseInt(receivedQty) + parseInt(quantity) + parseInt(returnedQty) >
      selectedItem.reqQty
    ) {
      setOpenNotification(true);
      setErrorMsg(
        "Received quantity can not exceed from the requested quantity"
      );
      return;
    }

    // let found =
    //   batchArray && batchArray.find((item) => item.batchNumber === batchNumber);
    // if (found) {
    //   setOpenNotification(true);
    //   setErrorMsg("Qty from that batch has already been added");
    //   return;
    // }

    if (validateBatchForm()) {
      // setDialogOpen(false);
      let temp = [];

      for (let i = 0; i < batchArray.length; i++) {
        if (batchArray[i].batchNumber === selectItemToEditId.batchNumber) {
          temp[i] = {
            quantity,
            batchNumber,
            expiryDate,
            price,
            batchStatus,
          };
        } else {
          temp = [...temp, batchArray[i]];
        }
      }

      // dispatch({
      //   field: "requestedItemsArray",
      //   value: temp,
      // });

      setBatchArray([...temp]);

      // dispatch({
      //   field: "receivedQty",
      //   value: parseInt(receivedQty) + parseInt(quantity),
      // });

      if (batchStatus === "received") {
        dispatch({
          field: "receivedQty",
          value: parseInt(receivedQty) + parseInt(quantity),
        });
      } else if (batchStatus === "rejected") {
        dispatch({
          field: "returnedQty",
          value: parseInt(returnedQty) + parseInt(quantity),
        });
      }
      // setSelectedItem("");
      setSelectItemToEditId("");
      dispatch({ field: "quantity", value: "" });
      dispatch({ field: "expiryDate", value: "" });
      dispatch({ field: "batchNumber", value: "" });
      dispatch({ field: "price", value: "" });
      dispatch({ field: "batchStatus", value: "" });
    }
  };

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
      {/* <Header history={props.history}/> */}
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
          {currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ? (
            <>
              <div className="row">
                <h6
                  style={{
                    fontWeight: "700",
                    color: "white",
                    paddingLeft: 3,
                    marginTop: 15,
                  }}
                >
                  Add Batch With Received Quantity(Per Batch)
                </h6>
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
                    labelId="label"
                    disabled={selectItemToEditId ? true : false}
                    type="Select"
                    name="batchNumber"
                    value={batchNumber}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    label="Batch Number"
                  ></TextField>
                </div>

                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      required
                      inputVariant="filled"
                      // onChange={(val) => onChangeDate(val, "expiryDatePerBatch")}
                      name={"expiryDate"}
                      label="Expiry Date Per Batch(DD - MM - YYYY)"
                      // format="MM/dd/yyyy hh:mm a"
                      format={dateFormat}
                      onChange={(val) => onChangeDate(val, "expiryDate")}
                      fullWidth
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      value={expiryDate ? expiryDate : null}
                    />
                  </MuiPickersUtilsProvider>
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
                    type={"number"}
                    name={"quantity"}
                    value={quantity}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    label="Received Quantity"
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
                  className="col-md-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    required
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id="price"
                    label="Price"
                    name={"price"}
                    value={price}
                    // onBlur={onChangeCurrency}
                    onChange={(event, value) => {
                      dispatch({ field: "price", value: value });
                    }}
                    decimalPlaces={4}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                    }}
                    currencySymbol="JD"
                    // outputFormat="number"
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
                  <TextField
                    required
                    variant={"filled"}
                    select
                    fullWidth
                    id="batchStatus"
                    name="batchStatus"
                    value={batchStatus}
                    onChange={onChangeValue}
                    label="Batch Status"
                    className="dropDownStyle"
                    // input={<BootstrapInput />}
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
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </div>

              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                  // marginBottom: 4,
                }}
              >
                {selectItemToEditId === "" ? (
                  <Button
                    onClick={addNew}
                    style={{
                      ...styles.stylesForButton,
                      borderRadius: 5,
                    }}
                    disabled={!validateBatchForm()}
                    variant="contained"
                    color="primary"
                  >
                    <strong style={{ fontSize: "12px" }}>Add New</strong>
                  </Button>
                ) : (
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      borderRadius: 5,
                    }}
                    disabled={!validateBatchForm()}
                    variant="contained"
                    color="primary"
                    onClick={editSelectedItem}
                  >
                    <strong style={{ fontSize: "12px" }}>Update</strong>
                  </Button>
                )}
              </div>
            </>
          ) : (
            undefined
          )}

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
                <TableforAddedQty
                  returnBatchArray={batchArray}
                  onDelete={handleItemDelete}
                  onEdit={handleRequestedItemEdit}
                  comingFor={comingFor}
                />
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
                required
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
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
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                // disabled={selectedItem ? false : true}
                disabled={true}
                type="number"
                label="Total Received Qty"
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
                // error={receivedQty.includes("e", 0)}
                onBlur={calculateTotal}
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
                // disabled={selectedItem ? false : true}
                disabled={true}
                type="number"
                label="Total Returned Qty"
                name={"returnedQty"}
                value={returnedQty}
                onChange={onChangeValue}
                className="textInputStyle"
                error={returnedQty === "" && isFormSubmitted}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                disabled={selectedItem ? false : true}
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
                // disabled={true}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  required
                  disabled={selectedItem ? false : true}
                  inputVariant="filled"
                  fullWidth
                  // format="DD-MM-YYYY"
                  format={dateFormat}
                  label="Expiry Date (DD-MM-YYYY)"
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
                disabled={true}
                type="text"
                label="Unit"
                name={"unit"}
                value={selectedItem && selectedItem.itemId.receiptUnit}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // error={unit === "" && isFormSubmitted}
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
                disabled={selectedItem ? false : true}
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
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
                disabled={true}
                label="Unit Discount"
                name={"uniyDiscount"}
                value={selectedItem && selectedItem.itemId.receiptUnit}
                variant={"filled"}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // error={uniyDiscount === "" && isFormSubmitted}
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
                disabled={true}
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
                decimalPlaces={4}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                decimalPlaces="4"
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
                disabled={true}
                type="number"
                label="Tax %"
                name={"tax"}
                decimalPlaces={4}
                value={selectedItem && selectedItem.itemId.tax}
                variant={"filled"}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                // error={tax === "" && isFormSubmitted}
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
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                disabled={true}
                type="number"
                label="Tax Amount"
                decimalPlaces={4}
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
                id="taxAmount"
                label="Tax Amount"
                name={"taxAmount"}
                value={taxAmount}
                decimalPlaces={4}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
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
                disabled={selectedItem ? false : true}
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
                value={selectedItem && selectedItem.itemId.receiptUnitCost}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                decimalPlaces={4}
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                decimalPlaces="4"
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
                disabled={selectedItem ? false : true}
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
                decimalPlaces={4}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                decimalPlaces="4"
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
                disabled={selectedItem ? false : true}
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
                decimalPlaces={4}
                onBlur={onChangeValue}
                variant="filled"
                textAlign="left"
                InputProps={{
                  className: classesForInput.input,
                  classes: { input: classesForInput.input },
                }}
                InputLabelProps={{
                  className: classesForInput.label,
                  classes: { label: classesForInput.label },
                }}
                currencySymbol="JD"
                outputFormat="number"
                decimalPlaces="4"
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
                disabled={selectedItem ? false : true}
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
                onKeyDown={(evt) => {
                  (evt.key === "e" ||
                    evt.key === "E" ||
                    evt.key === "-" ||
                    evt.key === "+") &&
                    evt.preventDefault();
                }}
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
                // disabled={true}
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
                  // format="dd-mm-yyyy HH:mm a"
                  format={dateTimeFormat}
                  required
                  inputVariant="filled"
                  disabled={selectedItem ? false : true}
                  fullWidth={true}
                  label="Date/Time Invoice (DD-MM-YYYY)"
                  className="textInputStyle"
                  onChange={(val) => onChangeDate(val, "date")}
                  disableFuture
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
                  required
                  disableFuture
                  // format="dd-mm-yyyy HH:mm a"
                  format={dateTimeFormat}
                  inputVariant="filled"
                  fullWidth
                  disabled={selectedItem ? false : true}
                  label="Date/Time Received (DD-MM-YYYY)"
                  className="textInputStyle (DD-MM-YYYY)"
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
                required
                disabled={selectedItem ? false : true}
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

          {/* <div className="row">
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled={selectedItem ? false : true}
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
          </div> */}

          <div
            className="row"
            style={{
              display: "flex",
              flex: 1,
              marginTop: "2%",
              marginBottom: "1%",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
                marginRight: "5px",
              }}
            >
              {/* <Button
                style={{ minWidth: "20%", marginRight: 30, height: 50 }}
                disabled={true}
                // onClick={handleAdd}
                variant="contained"
              >
                Upload Invoice
              </Button> */}

              <Button
                style={{ minWidth: "10%", height: 50 }}
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
                While rejecting, all the received batches will be returned.
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
