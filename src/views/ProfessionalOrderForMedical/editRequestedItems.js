import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  addReplenishmentRequestUrlBU,
  updateReplenishmentRequestUrlBU,
  getSearchedItemUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
  getCurrentQtyForBUUrl,
  getFUFromBUUrl,
  getCurrentQtyForBURepRequestUrl,
  getCurrentQtyForFURepRequestUrl,
  getFunctionalUnitUrl,
} from "../../public/endpoins";

import Paper from "@material-ui/core/Paper";

import cookie from "react-cookies";

import Chip from "@material-ui/core/Chip";

import Dialog from "@material-ui/core/Dialog";
import { tr } from "date-fns/locale";

import Header from "../../components/Header/Header";
import view_all from "../../assets/img/Eye.png";
import purchase_request from "../../assets/img/purchase request.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import ViewAllBtn from "../../components/ViewAllBtn/viewAll";

import Add_New from "../../assets/img/Add_New.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import Loader from "react-loader-spinner";

import add_new from "../../assets/img/Plus.png";

import TableForAddedItems from "./tableforAddedItems";

import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

import dateTimeFormat from "../../constants/dateTimeFormat";

const reasonArray = [
  { key: "jit", value: "JIT" },
  { key: "new_item", value: "New Item" },
  { key: "Reactivated Items", value: "Reactivated Items" },
  {
    key: "The System is Malfunctioning",
    value: "The System is Malfunctioning",
  },
];

const statusArrayForFUMember = [
  { key: "in_progress", value: "In Progress" },
  { key: "Delivery in Progress", value: "Delivery in Progress" },
  // { key: "Unfulfillment Initiated", value: "Unfulfillment Initiated" },
];

const statusArrayForFUIncharge = [
  { key: "Delivery in Progress", value: "Delivery in Progress" },
  // { key: "Unfulfillment Initiated", value: "Unfulfillment Initiated" },
];

const statusArrayForBUNurse = [
  { key: "pending_administration", value: "Pending Administration" },
  // { key: "Unfulfillment Initiated", value: "Unfulfillment Initiated" },
];

const statusArrayForBUInventoryKeeper = [
  { key: "complete", value: "Complete" },
  // { key: "Partially Recieved", value: "Partially Recieved" },
];

const orderArray = [
  { key: "maintance_order", value: "Maintance Order" },
  { key: "doctor_order", value: "Doctor Order" },
];

const generatedArray = [
  { key: "Manual", value: "Manual" },
  { key: "System", value: "System" },
];

const sizeArray = [
  { key: "Small", value: "Small" },
  { key: "Medium", value: "Medium" },
  { key: "Large", value: "Large" },
  { key: "Extra Large", value: "Extra Large" },
];

const modalArray = [
  { key: "Old", value: "Old" },
  { key: "New", value: "New" },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
    marginBottom: 10,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  // stylesForButton: {
  //   color: "white",
  //   cursor: "pointer",
  //   borderRadius: 15,
  //   backgroundColor: "#2C6DDD",
  //   width: "140px",
  //   height: "50px",
  //   outline: "none",
  // },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    // backgroundColor: "#2C6DDD",
    // width: "60%",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 4,
    paddingRight: 4,
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2C6DDD",
    // width: "140px",
    height: "50px",
    outline: "none",
  },
};
const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  // const classes = useStyles();

  const classes = useStyleforinput();

  const initialState = {
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

    receiptUnit: "",
    issueUnit: "",
    fuItemCost: "",
    fuId: "",
    buId: "",
    to: "",
    from: "",
    approvedBy: "",
    commentNote: "",
    secondStatus: "",
    itemType: "",

    patientReferenceNo: "",

    requestedItemsArray: "",

    selectedRequestedItem: "",

    item: "",

    dosage: "",
    noOfTimes: "",
    duration: "",

    orderBy: "",

    schedule: "",
    priority: "",

    make_model: "",
    size: "",
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

    receiptUnit,
    issueUnit,
    fuItemCost,
    fuId,
    buId,
    to,
    from,
    approvedBy,
    commentNote,
    secondStatus,
    itemType,

    patientReferenceNo,

    requestedItemsArray,

    selectedRequestedItem,

    item,
    dosage,
    noOfTimes,
    duration,

    orderBy,

    schedule,
    priority,
    make_model,
    size,
  } = state;

  const [comingFor, setcomingFor] = useState("");
  const [vendorsArray, setVendors] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [itemFound, setItem] = useState("");

  const [selectedItemsArray, setSelectedItemsArray] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  const [selectItemToEditId, setSelectItemToEditId] = useState("");

  const [buObj, setBUObj] = useState("");

  const [fuArray, setFUs] = useState("");

  function getFUsFromBU(buId) {
    axios
      // .get(getFUFromBUUrl + "/" + buId)

      .get(getFunctionalUnitUrl)

      .then((res) => {
        if (res.data.success) {
          console.log("FU array", res.data.data.functionalUnits);
          setFUs(res.data.data.functionalUnits);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  console.log(fuArray);

  useEffect(() => {
    const selectedRec = props.history.location.state.selectedItem;

    if (!selectedRec) {
      getFUsFromBU(props.history.location.state.buObj._id);
    } else if (selectedRec) {
      getFUsFromBU(selectedRec.buId._id);
    }

    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);
    setVendors(props.history.location.state.vendors);
    setBUObj(props.history.location.state.buObj);

    console.log(selectedRec);
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          if (key === "selectedRequestedItem") {
            dispatch({ field: "selectedRequestedItem", value: val._id });
            dispatch({ field: "itemId", value: val.itemId });
            // dispatch({ field: "currentQty", value: val.currQty });
            // dispatch({ field: "requestedQty", value: val.requestedQty });
            // dispatch({ field: "comments", value: val.comments });
            dispatch({ field: "description", value: val.itemId.description });
            dispatch({ field: "itemName", value: val.itemId.name });
            dispatch({ field: "itemCode", value: val.itemId.itemCode });
            dispatch({ field: "itemType", value: val.itemId.cls });
            dispatch({ field: "issueUnit", value: val.itemId.issueUnit });
            dispatch({ field: "receiptUnit", value: val.itemId.receiptUnit });
          } else if (key === "fuId") {
            dispatch({ field: "fuId", value: val._id });
          } else if (key === "buId") {
            dispatch({ field: "buId", value: val._id });
          } else if (key === "item") {
            dispatch({ field: "requestedItemsArray", value: val });
          }
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
  }, []);

  console.log("comments", comments);

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    return (
      // comments !== "" &&
      requestedItemsArray !== "" &&
      requestedItemsArray.length > 0 &&
      patientReferenceNo !== ""
    );
  }

  function validateConfirmRequest() {
    let statusChanged = false;

    if (status === "pending") {
      if (
        currentUser.staffTypeId.type === "FU Inventory Keeper" &&
        status === "pending" &&
        secondStatus === "in_progress"
      ) {
        statusChanged = true;
      }
    } else if (status === "in_progress") {
      if (
        currentUser.staffTypeId.type === "FU Inventory Keeper" &&
        status === "in_progress" &&
        secondStatus === "Delivery in Progress"
      ) {
        statusChanged = true;
      }
    }

    return (
      requestedItemsArray !== "" &&
      requestedItemsArray.length > 0 &&
      patientReferenceNo !== "" &&
      statusChanged
    );
  }

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        let requestedItems = [];

        for (let i = 0; i < requestedItemsArray.length; i++) {
          requestedItems = [
            ...requestedItems,
            {
              itemId: requestedItemsArray[i].itemId._id,
              currentQty: requestedItemsArray[i].currentQty,
              requestedQty: requestedItemsArray[i].requestedQty,
              status: "pending",
              secondStatus: "pending",
            },
          ];
        }

        const params = {
          requestNo,
          generatedBy: currentUser.name,
          dateGenerated: new Date(),
          generated,
          // status: "pending",
          comments,
          item: requestedItems,
          // currentQty,
          // requestedQty,
          // description,
          commentNote: "",
          buId: buObj._id,
          // secondStatus: "pending",
          requesterName,
          department,
          orderType,
          reason,

          patientReferenceNo,

          fuId: currentUser.functionalUnit._id,
        };

        console.log("params", params);

        axios
          .post(addReplenishmentRequestUrlBU, params)
          .then((res) => {
            if (res.data.success) {
              console.log("response after adding RR", res.data);
              props.history.goBack();
            } else if (!res.data.success) {
              setOpenNotification(true);
            }
          })
          .catch((e) => {
            console.log("error after adding purchase request", e);
            setOpenNotification(true);
            setErrorMsg("Error while adding the replenishment request");
          });
      }
    }
  };

  const handleEdit = () => {
    if (!validateConfirmRequest()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateConfirmRequest()) {
        let requestedItems = [];

        for (let i = 0; i < requestedItemsArray.length; i++) {
          if (requestedItemsArray[i]._id === selectedRequestedItem) {
            let obj = {
              itemId: itemId._id,
              currentQty: currentQty,
              requestedQty: requestedQty,
              dosage: dosage,
              noOfTimes: noOfTimes,
              duration: duration,
              priority: priority,
              schedule: schedule,
              make_model,
              size,
              status:
                currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                status === "pending" &&
                secondStatus === "in_progress"
                  ? "in_progress"
                  : currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                    status === "in_progress" &&
                    secondStatus === "Delivery in Progress"
                  ? "Delivery in Progress"
                  : currentUser.staffTypeId.type === "BU Nurse" &&
                    status === "Delivery in Progress" &&
                    secondStatus === "pending_administration"
                  ? "pending_administration"
                  : currentUser.staffTypeId.type === "BU Inventory Keeper" &&
                    status === "pending_administration" &&
                    secondStatus === "complete"
                  ? "complete"
                  : status,
              secondStatus,
            };
            requestedItems.push(obj);
          } else {
            requestedItems.push(requestedItemsArray[i]);
          }
        }

        const obj = {
          _id,
          requestNo,
          generatedBy,
          dateGenerated,
          generated,
          comments,
          item: requestedItems,
          // currentQty,
          // requestedQty,
          // description,
          commentNote,
          fuId: fuId,
          secondStatus,
          buId: buId,
          requesterName,
          department,
          orderType,
          patientReferenceNo,
        };

        // let params;

        // if (currentUser.staffTypeId.type === "Warehouse Member") {
        //   params = {
        //     ...obj,
        //     approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
        //   };
        // } else {
        //   params = {
        //     ...obj,
        //     approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
        //   };
        // }
        console.log(obj);

        let selectedStatus = "";
        if (secondStatus === "in_progress") {
          selectedStatus = "In Progess";
        } else if (secondStatus === "Delivery in Progress") {
          selectedStatus = "Delivery in Progress";
        }

        axios
          .put(updateReplenishmentRequestUrlBU, obj)
          .then((res) => {
            if (res.data.success) {
              props.history.replace({
                pathname: "/home/wms/fus/medicinalorder/success",
                state: {
                  message: `Medical Order: ${requestNo} with item name ${itemName} is set to ${selectedStatus}`,
                },
              });
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
        <div className="row" style={{ paddingRight: 2 }}>
          <div className="subheader">
            <div>
              <img src={purchase_request} />
              <h4>
                {comingFor === "add"
                  ? "Add Request"
                  : comingFor === "edit"
                  ? "Order Details (Medical)"
                  : comingFor === "view"
                  ? "Order Details (Medical)"
                  : undefined}
              </h4>
            </div>
            <ViewAllBtn history={props.history} />
          </div>
        </div>

        {fuArray && fuArray !== "" ? (
          <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
            <div className="row">
              {comingFor === "edit" || comingFor === "view" ? (
                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled={true}
                    label="Request No"
                    name={"requestNo"}
                    value={requestNo}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              ) : (
                undefined
              )}

              <div
                className={
                  comingFor === "edit" || comingFor === "view"
                    ? "col-md-6"
                    : "col-md-12"
                }
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  type="text"
                  label="Generated By"
                  name={generatedBy}
                  value={
                    comingFor === "add"
                      ? currentUser
                        ? currentUser.name
                        : ""
                      : generatedBy
                  }
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
                className={comingFor === "add" ? "col-md-12" : "col-md-4"}
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="filled"
                    disabled={true}
                    ampm={false}
                    fullWidth
                    // format="MM/dd/yyyy hh:mm a"
                    format={dateTimeFormat}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    value={
                      comingFor === "add"
                        ? dateGenerated
                          ? dateGenerated
                          : new Date()
                        : dateGenerated
                    }
                    label={"Date Generated (DD-MM-YYYY)"}
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
                {fuArray &&
                  fuArray.map((val) => {
                    if (val._id === fuId) {
                      return (
                        <TextField
                          disabled={true}
                          type="text"
                          label="Functional Unit Name"
                          name={"fuId"}
                          value={val.fuName}
                          onChange={onChangeValue}
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={fuId === "" && isFormSubmitted}
                        />
                      );
                    }
                  })}
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
                  type="text"
                  label="Patient MRN"
                  name={"patientReferenceNo"}
                  value={patientReferenceNo}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={patientReferenceNo === "" && isFormSubmitted}
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
                  type="text"
                  disabled={true}
                  rows={4}
                  label="Notes/Comments"
                  name={"comments"}
                  value={comments}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={comments === "" && isFormSubmitted}
                />
              </div>
            </div>

            <div>
              <div className="row">
                <h5
                  style={{ color: "white", fontWeight: "700", marginTop: 20 }}
                >
                  Item Details
                </h5>
              </div>

              <div className="row">
                <div
                  className={
                    currentUser &&
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? "col-md-3"
                      : "col-md-4"
                  }
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled={true}
                    type="text"
                    label="Item Code"
                    name={"itemCode"}
                    value={itemCode}
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
                  className={
                    currentUser &&
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? "col-md-3"
                      : "col-md-4"
                  }
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
                    value={itemName}
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
                  className={
                    currentUser &&
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? "col-md-3"
                      : "col-md-4"
                  }
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled={true}
                    type="number"
                    label="Requested Qty"
                    name={"requestedQty"}
                    value={requestedQty}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    error={requestedQty === "" && isFormSubmitted}
                  />
                </div>

                {currentUser &&
                currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
                  <div
                    className={
                      currentUser &&
                      currentUser.staffTypeId.type === "FU Inventory Keeper"
                        ? "col-md-3"
                        : "col-md-4"
                    }
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
                      value={currentQty}
                      onChange={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={currentQty === "" && isFormSubmitted}
                    />
                  </div>
                ) : (
                  undefined
                )}
              </div>

              {currentUser &&
              currentUser.staffTypeId.type !== "FU Inventory Keeper" ? (
                dosage && noOfTimes && duration ? (
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
                        type="number"
                        label="Dosage"
                        name={"dosage"}
                        value={dosage}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        variant="filled"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        error={dosage === "" && isFormSubmitted}
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
                        type="number"
                        label="No of times"
                        name={"noOfTimes"}
                        value={noOfTimes}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        variant="filled"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        error={noOfTimes === "" && isFormSubmitted}
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
                        type="number"
                        label="Duration"
                        name={"duration"}
                        value={duration}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        variant="filled"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        error={duration === "" && isFormSubmitted}
                      />
                    </div>
                  </div>
                ) : (
                  undefined
                )
              ) : (
                undefined
              )}
            </div>

            {currentUser &&
            currentUser.staffTypeId.type !== "FU Inventory Keeper" ? (
              priority && schedule ? (
                <div className="row">
                  <div
                    className="col-md-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label="Priority"
                      name={"priority"}
                      value={priority}
                      onChange={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      // error={secondStatus === "" && isFormSubmitted}
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
                      disabled={true}
                      label={"Schedule"}
                      name={"schedule"}
                      value={schedule}
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
              ) : (
                undefined
              )
            ) : (
              undefined
            )}

            {make_model && size ? (
              <div className="row">
                <div
                  className="col-md-6 col-sm-6 col-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    select
                    disabled
                    fullWidth
                    id="make_model"
                    name="make_model"
                    value={make_model}
                    onChange={onChangeValue}
                    label="Make/Model"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    error={make_model === "" && isFormSubmitted}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {modalArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>

                <div
                  className="col-md-6 col-sm-6 col-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    select
                    disabled
                    fullWidth
                    id="size"
                    name="size"
                    value={size}
                    onChange={onChangeValue}
                    label="Size"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    error={size === "" && isFormSubmitted}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {sizeArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </div>
              </div>
            ) : (
              undefined
            )}

            {comingFor === "edit" &&
            (currentUser.staffTypeId.type === "admin" ||
              currentUser.staffTypeId.type === "FU Inventory Keeper" ||
              currentUser.staffTypeId.type === "FU Incharge" ||
              currentUser.staffTypeId.type === "BU Nurse" ||
              currentUser.staffTypeId.type === "BU Inventory Keeper") ? (
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
                    <>
                      <TextField
                        required
                        select
                        fullWidth
                        id="secondStatus"
                        name="secondStatus"
                        // value={country}
                        // error={country === '' && isFormSubmitted}
                        onChange={onChangeValue}
                        label="Status"
                        variant="filled"
                        className="dropDownStyle"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        error={secondStatus === "" && isFormSubmitted}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {statusArrayForFUMember.map((val) => {
                          return (
                            <MenuItem
                              disabled={
                                (status === "pending" &&
                                  val.key === "Delivery in Progress") ||
                                (status === "in_progress" &&
                                  val.key === "in_progress")
                                  ? true
                                  : false
                              }
                              key={val.key}
                              value={val.key}
                            >
                              {val.value}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </>
                  ) : currentUser.staffTypeId.type === "FU Incharge" ? (
                    <>
                      <TextField
                        required
                        select
                        fullWidth
                        id="secondStatus"
                        name="secondStatus"
                        // value={country}
                        // error={country === '' && isFormSubmitted}
                        onChange={onChangeValue}
                        label="Status"
                        variant="filled"
                        className="dropDownStyle"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        error={secondStatus === "" && isFormSubmitted}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {statusArrayForFUIncharge.map((val) => {
                          return (
                            <MenuItem key={val.key} value={val.key}>
                              {val.value}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </>
                  ) : (
                    undefined
                  )}
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
                    label="Comment Note"
                    name={"commentNote"}
                    value={commentNote}
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
            ) : (
              undefined
            )}

            <div className="row">
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "2%",
                  marginBottom: "2%",
                }}
              >
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ width: 60, height: 40, cursor: "pointer" }}
                />

                {comingFor === "add" ? (
                  <Button
                    style={styles.stylesForPurchaseButton}
                    // disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Generate Professional Request
                  </Button>
                ) : comingFor === "edit" &&
                  currentUser &&
                  currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
                  <Button
                    style={styles.stylesForPurchaseButton}
                    disabled={!validateConfirmRequest()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Confirm
                  </Button>
                ) : comingFor === "view" ? (
                  undefined
                ) : (
                  undefined
                )}
              </div>
            </div>

            <Notification msg={errorMsg} open={openNotification} />
          </div>
        ) : (
          <div className="LoaderStyle">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
        )}
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
