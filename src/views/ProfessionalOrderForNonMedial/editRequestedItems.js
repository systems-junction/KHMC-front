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

import Add_New from "../../assets/img/Add_New.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

import Loader from "react-loader-spinner";

import add_new from "../../assets/img/Plus.png";

import TableForAddedItems from "./tableforAddedItems";

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

  stylesForLabel: {
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

function AddEditPurchaseRequest(props) {
  const classes = useStyleforinput();
  // const classes = useStyles();
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
    orderFor: "",
    orderBy: "",
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
    orderFor,
    orderBy,
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
      .get(getFUFromBUUrl + "/" + buId)
      .then((res) => {
        if (res.data.success) {
          console.log("FU array", res.data.data);
          setFUs(res.data.data);
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

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    // let jit = true;
    // let qtyIsLess = true;
    // if (reason === "jit") {
    //   jit = requesterName !== "" && department !== "" && orderType !== "";
    // }
    return (
      // comments !== "" &&
      requestedItemsArray !== "" && requestedItemsArray.length > 0
      // dateGenerated !== "" &&
      // itemCode !== "" &&
      // description !== "" &&
      // itemName !== "" &&
      // requestedQty !== "" &&
      // currentQty !== "" &&
      // fuItemCost !== "" &&
      // reason !== "" &&
      // fuId !== "" &&
      // jit &&
      // patientReferenceNo !== ""

      //  && receiptUnit !== ""
      // && issueUnit !== ""
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

          fuId: fuArray[0]._id,
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
    if (!validateForm()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        let requestedItems = [];

        for (let i = 0; i < requestedItemsArray.length; i++) {
          if (requestedItemsArray[i]._id === selectedRequestedItem) {
            let obj = {
              itemId: itemId._id,
              currentQty: currentQty,
              requestedQty: requestedQty,
              status:
                currentUser.staffTypeId.type === "FU Member" &&
                status === "pending" &&
                secondStatus === "in_progress"
                  ? "in_progress"
                  : currentUser.staffTypeId.type === "FU Member" &&
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

        axios
          .put(updateReplenishmentRequestUrlBU, obj)
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
            <img src={purchase_request} />
            <h4>
              {/* {comingFor === "add"
                ? " Add Replenishment Request For BU"
                : comingFor === "edit"
                ? " Edit Replenishment Request For BU"
                : comingFor === "view"
                ? "Replenishment Request Details"
                : undefined} */}

              {comingFor === "add"
                ? "Professional Request  Details"
                : comingFor === "edit"
                ? "Professional Request  Details "
                : comingFor === "view"
                ? "Professional Request Details"
                : undefined}
            </h4>
          </div>

          <div>
            {/* <img onClick={() => props.history.goBack()} src={view_all} /> */}
            {/* <img src={Search} /> */}

            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img src={view_all} style={styles.stylesForIcon} />
              &nbsp;&nbsp;
              <strong>View All</strong>
            </Button>
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
                  {/* <InputLabelComponent>Request No</InputLabelComponent> */}
                  <TextField
                    id="requestNo"
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
                  {/* <input
                    disabled={true}
                    placeholder="Request No"
                    name={"requestNo"}
                    value={requestNo}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  /> */}
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
                {/* <InputLabelComponent id="status-label">
                  Generated By
                </InputLabelComponent> */}
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
                {/* <input
                  disabled={true}
                  type="text"
                  placeholder="Generated By"
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
                /> */}
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
                {/* <InputLabelComponent>Date Generated</InputLabelComponent> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="filled"
                    // onChange={onChangeDate}
                    disabled={
                      // currentUser && currentUser.staffTypeId.type === "BU Member"
                      //   ? false
                      //   : true
                      true
                    }
                    label="Date"
                    fullWidth
                    // style={{
                    //   backgroundColor: "white",
                    //   borderRadius: 10,
                    //   borderWidth: 0,
                    //   height: 47,
                    //   marginTop: 5,
                    //   paddingLeft: 10,
                    //   paddingTop: 9,
                    // }}
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
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
                  />
                </MuiPickersUtilsProvider>
              </div>

              {comingFor === "edit" || comingFor === "view" ? (
                <div
                  className="col-md-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent id="status-label">
                      Requested FU
                    </InputLabelComponent> */}

                  {fuArray &&
                    fuArray.map((val) => {
                      if (val._id === fuId) {
                        return (
                          <TextField
                            disabled={true}
                            type="text"
                            label="Fu Id"
                            name={"fuId"}
                            value={val.fuName}
                            onChange={onChangeValue}
                            className="textInputStyle"
                            error={fuId === "" && isFormSubmitted}
                            variant="filled"
                            InputProps={{
                              className: classes.input,
                              classes: { input: classes.input },
                            }}
                          />
                        );
                      }
                    })}

                  {/* <ErrorMessage name={fuId} isFormSubmitted={isFormSubmitted} /> */}
                </div>
              ) : (
                undefined
              )}

              {comingFor === "edit" || comingFor === "view" ? (
                <div
                  className="col-md-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent id="status-label">
                    Order By
                  </InputLabelComponent> */}
                  <TextField
                    disabled={true}
                    type="text"
                    label="Order By"
                    name={"orderBy"}
                    value={orderBy}
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

              {/* {comingFor === "edit" || comingFor === "view" ? (
                <div
                  className="col-md-4"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent id="status-label">
                    Order Type
                  </InputLabelComponent>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Order Type"
                    name={generatedBy}
                    value={orderFor}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              ) : (
                undefined
              )} */}
            </div>

            <div className="row">
              <div
                className="col-md-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Comments</InputLabelComponent> */}
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
                  error={comments === "" && isFormSubmitted}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />

                {/* <ErrorMessage
                  name={comments}
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
            </div>

            {/* {currentQty && description ? ( */}
            <div>
              <h4 style={{ color: "white", fontWeight: "700", marginTop: 30 }}>
                Item details
              </h4>
              <div className="row">
                <div
                  className="col-md-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Item Code</InputLabelComponent> */}
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
                  className="col-md-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Item Name</InputLabelComponent> */}
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

                {/* <div
                  className="col-md-4"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Item Type</InputLabelComponent>
                  <input
                    type="text"
                    disabled={true}
                    placeholder="Item Type"
                    name={"itemType"}
                    value={
                      itemType === "non_medical" ? "Non Medical" : itemType
                    }
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div> */}

                <div
                  className="col-md-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Requested Qty</InputLabelComponent> */}
                  <TextField
                    disabled={true}
                    type="number"
                    label="Requested Qty"
                    name={"requestedQty"}
                    value={requestedQty}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    error={requestedQty === "" && isFormSubmitted}
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                  {/* <ErrorMessage
                    name={requestedQty}
                    isFormSubmitted={isFormSubmitted}
                  /> */}
                </div>
              </div>

              {/* <div className="row">
                <div
                  className="col-md-6"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Current Qty</InputLabelComponent>
                  <input
                    type="number"
                    disabled={true}
                    placeholder="Current Qty"
                    name={"currentQty"}
                    value={currentQty}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>

                <div
                  className="col-md-4"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Receipt Unit</InputLabelComponent>
                  <input
                    disabled={true}
                    placeholder="Receipt Unit"
                    name={"receiptUnit"}
                    value={receiptUnit}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>

                <div
                  className="col-md-4"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Issue Unit</InputLabelComponent>

                  <input
                    disabled={true}
                    placeholder="Issue Unit"
                    name={"issueUnit"}
                    value={issueUnit}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div> */}

              {/* <div className="row">
                <div
                  className="col-md-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Description</InputLabelComponent>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Description"
                    name={"description"}
                    value={description}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div> */}
            </div>
            {/* ) : (
              undefined
            )} */}

            {comingFor === "edit" &&
            (currentUser.staffTypeId.type === "admin" ||
              currentUser.staffTypeId.type === "FU Member" ||
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
                  {/* <InputLabelComponent>Status*</InputLabelComponent> */}
                  {currentUser.staffTypeId.type === "admin" ? (
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
                        {/* <TextField
                          required
                          select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          // className="dropDownStyle"
                          // input={<BootstrapInput />}
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={secondStatus === "" && isFormSubmitted}
                        > */}
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
                      {/* <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        /> */}
                    </>
                  ) : currentUser.staffTypeId.type === "FU Member" ? (
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
                        {/* <TextField
                          required
                          select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          // className="dropDownStyle"
                          // input={<BootstrapInput />}
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={secondStatus === "" && isFormSubmitted}
                        > */}
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
                      {/* <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        /> */}
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
                        {/* <TextField
                          select
                          required
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          // className="dropDownStyle"
                          // input={<BootstrapInput />}
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={secondStatus === "" && isFormSubmitted}
                        > */}
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
                      {/* <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        /> */}
                    </>
                  ) : currentUser.staffTypeId.type === "BU Nurse" ? (
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
                        {/* <TextField
                          select
                          required
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          variant="filled"
                          // className="dropDownStyle"
                          // input={<BootstrapInput />}
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={secondStatus === "" && isFormSubmitted}
                        > */}
                        {/* <TextField
                          required
                          select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          // className="dropDownStyle"
                          // input={<BootstrapInput />}
                          className="textInputStyle"
                          inputvariant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={secondStatus === "" && isFormSubmitted}
                        > */}
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {statusArrayForBUNurse.map((val) => {
                          return (
                            <MenuItem key={val.key} value={val.key}>
                              {val.value}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                      {/* <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        /> */}
                    </>
                  ) : currentUser.staffTypeId.type === "BU Inventory Keeper" ? (
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
                        {/* <TextField
                          required
                          select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          // className="dropDownStyle"
                          // input={<BootstrapInput />}
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          error={secondStatus === "" && isFormSubmitted}
                        > */}
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {statusArrayForBUInventoryKeeper.map((val) => {
                          return (
                            <MenuItem key={val.key} value={val.key}>
                              {val.value}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                      {/* <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        /> */}
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
                  {/* <InputLabelComponent>Comment Note</InputLabelComponent> */}
                  <TextField
                    id="comments"
                    variant="filled"
                    type="text"
                    label="Notes/Comments"
                    name={"comments"}
                    value={commentNote}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    // input={<BootstrapInput />}

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

            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: 50,
                  justifyContent: "center",
                  marginTop: "2%",
                  marginBottom: "2%",
                }}
              >
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
                  currentUser.staffTypeId.type === "FU Member" ? (
                  <Button
                    style={styles.stylesForPurchaseButton}
                    // disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Update Professional Request
                  </Button>
                ) : comingFor === "view" ? (
                  undefined
                ) : (
                  undefined
                )}
              </div>
            </div>

            <Notification msg={errorMsg} open={openNotification} />

            <div style={{ marginBottom: 20 }}>
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 60, height: 40, cursor: "pointer" }}
              />
            </div>
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
