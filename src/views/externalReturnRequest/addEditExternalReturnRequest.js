/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  addExternalReturnRequest,
  updateExternalReturnRequest,
} from "../../public/endpoins";

import Paper from "@material-ui/core/Paper";

import cookie from "react-cookies";

import Dialog from "@material-ui/core/Dialog";
import { tr } from "date-fns/locale";

import Header from "../../components/Header/Header";
import view_all from "../../assets/img/view_all.png";
import purchase_request from "../../assets/img/Return Item.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import Add_New from "../../assets/img/Add_New.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import dateTimeFormat from "../../constants/dateTimeFormat.js";

const reasonArray = [
  { key: "jit", value: "JIT" },
  { key: "new_item", value: "New Item" },
  { key: "Reactivated Items", value: "Reactivated Items" },
  {
    key: "The System is Malfunctioning",
    value: "The System is Malfunctioning",
  },
];

const statusArrayApprovalMember = [
  { key: "approved", value: "Approved" },
  { key: "reject", value: "Reject" },
];

const statusArrayForWareHouseDeliveryMan = [
  { key: "approved", value: "Approved" },
  // { key: "Unfulfillment Initiated", value: "Unfulfillment Initiated" },
];

const statusArrayForFUInventoryKeeper = [
  { key: "Recieved", value: "Recieved" },
  { key: "Partially Recieved", value: "Partially Recieved" },
];

const generatedArray = [
  { key: "Manual", value: "Manual" },
  { key: "System", value: "System" },
];

const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },

  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },

  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
};

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

function AddEditPurchaseRequest(props) {
  const classes = useStyles();
  const initialState = {
    _id: "",
    returnRequestNo: "",
    generatedBy: "",
    dateGenerated: "",
    expiryDate: "",
    vendorId: "",
    item: "",
    status: "to_do",
    itemId: "",
    prId: "",
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

    generated: "Manual",

    requesterName: "",
    department: "",
    orderType: "",
    maximumLevel: "",

    committeeStatus: "",

    vendorsArray: [],

    reason: "",
    reasonDetail: "",

    causedBy: "",
    itemCostPerUnit: "",
    totalDamageCost: "",
    date: "",

    fuId: "",
    buId: "",
    to: "",
    from: "",
    approvedBy: "",
    commentNote: "",
    secondStatus: "",

    damageReport: "",
    replenishmentRequestFU: "",
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
    returnRequestNo,
    generatedBy,
    generated,
    dateGenerated,
    expiryDate,
    vendorId,
    item,
    status,
    itemCode,
    itemId,
    prId,
    itemName,
    description,
    currentQty,
    requestedQty,
    comments,
    vendors,
    statues,
    items,
    selectedRow,
    requesterName,
    department,
    orderType,

    maximumLevel,

    committeeStatus,

    vendorsArrayForItems,

    reason,
    reasonDetail,

    causedBy,
    itemCostPerUnit,
    totalDamageCost,
    date,

    fuId,
    buId,
    to,
    from,
    approvedBy,
    commentNote,
    secondStatus,

    damageReport,
    replenishmentRequestFU,
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

  const [purchaseRequestItems, setPurchaseRequestItems] = useState("");

  const [selectItemToEditId, setSelectItemToEditId] = useState("");

  const [fuObj, setFUObj] = useState("");

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);
    setVendors(props.history.location.state.vendors);
    setFUObj(props.history.location.state.fuObj);

    const selectedRec = props.history.location.state.selectedItem;
    setSelectedItem(props.history.location.state.selectedItem);
    console.log(selectedRec);
    if (selectedRec) {
      if (props.history.location.state.comingFor === "add") {
        Object.entries(selectedRec).map(([key, val]) => {
          if (val && typeof val === "object") {
            if (key === "item") {
              dispatch({ field: "itemId", value: val.itemId });
              dispatch({ field: "itemName", value: val.name });
              dispatch({ field: "itemCode", value: val.itemCode });
              dispatch({ field: "currentQty", value: val.currQty });
              dispatch({ field: "description", value: val.description });
            } else if (key === "fuId") {
              dispatch({ field: "fuId", value: val });
            } else if (key === "damageReport") {
              dispatch({ field: "causedBy", value: val.causedBy });
              dispatch({ field: "date", value: val.date });
              dispatch({
                field: "totalDamageCost",
                value: val.totalDamageCost,
              });
              dispatch({
                field: "itemCostPerUnit",
                value: val.itemCostPerUnit,
              });
            } else {
              dispatch({ field: key, value: val });
            }
          } else {
            dispatch({ field: key, value: val });
          }
        });
      } else {
        Object.entries(selectedRec).map(([key, val]) => {
          if (val && typeof val === "object") {
            if (key === "itemId") {
              dispatch({ field: "itemId", value: val });
              dispatch({ field: "itemName", value: val.name });
              dispatch({ field: "itemCode", value: val.itemCode });
            } else if (key === "fuId") {
              dispatch({ field: "fuId", value: val });
            } else if (key === "damageReport") {
              dispatch({ field: "causedBy", value: val.causedBy });
              dispatch({ field: "date", value: val.date });
              dispatch({
                field: "totalDamageCost",
                value: val.totalDamageCost,
              });
              dispatch({
                field: "itemCostPerUnit",
                value: val.itemCostPerUnit,
              });
            } else {
              dispatch({ field: key, value: val });
            }
          } else {
            dispatch({ field: key, value: val });
          }
        });
      }
    }
  }, []);

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleCheckBox = (e) => {
    if (e.target.name === "damaged") {
      setDialogOpen(true);
    }
    dispatch({ field: "reason", value: e.target.name });
  };

  const onChangeDate = (value, field) => {
    // console.log(value);
    dispatch({ field: field, value });
  };

  function validateForm() {
    return (
      reason !== "" &&
      reasonDetail !== "" &&
      (reason === "expired" ? expiryDate !== "" : true)
    );
    //   itemCode !== "" &&
    //   description !== "" &&
    //   itemName !== ""
  }

  function validateApproveForm() {
    return status !== "approved" && status !== "rejected";
  }

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        generatedBy: currentUser.name,
        dateGenerated: new Date(),
        generated: "Manual",
        expiryDate,
        currentQty: selectedItem.currQty,
        itemId: itemId._id,
        description,
        prId: selectedItem.prId,
        reason,
        reasonDetail,
        status:
          reason === "poorQuality" ||
          reason === "others" ||
          reason === "expired"
            ? "pending_approval"
            : "approved",
      };

      console.log("params", params);

      axios
        .post(addExternalReturnRequest, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response after adding RR", res.data);
            // props.history.replace(
            //   "/home/wms/warehouse/materialreceiving/viewpo/externalreturn"
            // );

            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `External Return request ${res.data.data.returnRequestNo} for patient MRN ${res.data.data.patientId} has been generated successfully`,
              },
            });
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding return request", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the return request");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const obj = {
        _id,
        returnRequestNo,
        generatedBy,
        generated,
        dateGenerated,
        expiryDate,
        currentQty,
        itemId: itemId._id,
        description,
        prId: prId,
        reason,
        reasonDetail,
        status:
          currentUser && currentUser.staffTypeId.type === "admin"
            ? reason === "poorQuality" ||
              reason === "others" ||
              reason === "expired"
              ? "pending_approval"
              : "approved"
            : status,
        commentNote,
      };

      let params;

      if (
        currentUser.staffTypeId.type ===
        "FU Internal Request Return Approval Member"
      ) {
        params = {
          ...obj,
          approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
        };
      } else {
        params = {
          ...obj,
          approvedBy: approvedBy ? approvedBy : null,
        };
      }

      console.log(params);

      axios
        .put(updateExternalReturnRequest, params)
        .then((res) => {
          if (res.data.success) {
            if (currentUser.staffTypeId.type === "Purchasing Officer") {
              props.history.replace({
                pathname: "/home/wms/fus/medicinalorder/success",
                state: {
                  message: `External Return request ${res.data.data.returnRequestNo} for patient MRN ${res.data.data.patientId.profileNo} has been ${status}`,
                },
              });
            } else {
              props.history.goBack();
            }
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

  console.log(selectedItem);

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
              {comingFor === "add"
                ? " Add External Return Request"
                : comingFor === "edit"
                ? " Edit External Return Request"
                : "View External Return Request"}
            </h4>
          </div>
          {/* 
          <div>
            <img onClick={() => props.history.goBack()} src={view_all} />
          </div> */}
        </div>

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <input
                disabled={true}
                placeholder=" Return Request No"
                name={"returnRequestNo"}
                value={returnRequestNo}
                onChange={onChangeValue}
                className="textInputStyle"
              /> */}

              <TextField
                disabled={true}
                label="Return Request No"
                name={"returnRequestNo"}
                value={returnRequestNo}
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

              <TextField
                disabled={true}
                label="Generated By"
                name={generatedBy}
                value={
                  comingFor === "add"
                    ? currentUser
                      ? currentUser.name
                      : ""
                    : generatedBy
                }
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
                  inputVariant="filled"
                  // format="MM/dd/yyyy hh:mm a"
                  format={dateTimeFormat}
                  onChange={(val) => onChangeDate(val, "dateGenerated")}
                  name={"dateGenerated"}
                  disabled={true}
                  fullWidth
                  value={
                    comingFor === "add"
                      ? dateGenerated
                        ? dateGenerated
                        : new Date()
                      : dateGenerated
                  }
                  label={"Date Generated (MM/DD/YYYY)"}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="row">
            {/* <div className="col-md-4" style={styles.inputContainerForTextField}>
              <InputLabel id="generated-label" style={styles.stylesForLabel}>
                Current Qty
              </InputLabel>
              <input
                type="number"
                disabled={true}
                placeholder="Current Qty"
                name={"currentQty"}
                value={currentQty}
                onChange={onChangeValue}
                className="textInputStyle"
              />
            </div> */}
          </div>

          <div className="row">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <input
                disabled={true}
                type="text"
                placeholder="Item Code"
                name={"itemCode"}
                value={itemCode}
                onChange={onChangeValue}
                className="textInputStyle"
              /> */}

              <TextField
                disabled={true}
                label="Item Code"
                name={itemCode}
                value={itemCode}
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
              {/* <input
                type="text"
                disabled={true}
                placeholder="Item Name"
                name={"itemName"}
                value={itemName}
                onChange={onChangeValue}
                className="textInputStyle"
              /> */}

              <TextField
                disabled={true}
                label="Item Name"
                name={"itemName"}
                value={itemName}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>
          </div>

          {/* <div className="row">
            <div
              className="col-md-12"
              style={styles.inputContainerForTextField}
            >
              <input
                type="text"
                disabled={
                  currentUser && currentUser.staffTypeId.type === "FU Member"
                    ? false
                    : true
                }
                rows={4}
                placeholder="Notes/Comments"
                name={"comments"}
                value={comments}
                onChange={onChangeValue}
                className="textInputStyle"
              />
            </div>
          </div> */}

          <div className="row">
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <input
                disabled={true}
                type="text"
                placeholder="Description"
                name={"description"}
                value={description}
                onChange={handleCheckBox}
                className="textInputStyle"
              /> */}

              <TextField
                disabled={true}
                label="Description"
                name={"description"}
                value={description}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>
          </div>

          <div>
            <h5 style={{ color: "white", fontWeight: "700", marginTop: 20 }}>
              Returning Reason
            </h5>

            <div className="row">
              <div className="col-md-4">
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reason === "expired" ? true : false}
                        onChange={handleCheckBox}
                        name="expired"
                        color="primary"
                        disabled={
                          currentUser &&
                          (currentUser.staffTypeId.type === "admin" ||
                            currentUser.staffTypeId.type ===
                              "Warehouse Inventory Keeper") &&
                          comingFor !== "view"
                            ? false
                            : true
                        }
                      />
                    }
                    label="Expired"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reason === "rejected" ? true : false}
                        onChange={handleCheckBox}
                        name="rejected"
                        color="primary"
                        disabled={
                          currentUser &&
                          (currentUser.staffTypeId.type === "admin" ||
                            currentUser.staffTypeId.type ===
                              "Warehouse Inventory Keeper") &&
                          comingFor !== "view"
                            ? false
                            : true
                        }
                      />
                    }
                    label="Rejected from Accounts"
                  />
                </FormGroup>
              </div>

              <div className="col-md-4">
                <FormGroup column>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reason === "poorQuality" ? true : false}
                        onChange={handleCheckBox}
                        name="poorQuality"
                        color="primary"
                        disabled={
                          currentUser &&
                          (currentUser.staffTypeId.type === "admin" ||
                            currentUser.staffTypeId.type ===
                              "Warehouse Inventory Keeper") &&
                          comingFor !== "view"
                            ? false
                            : true
                        }
                      />
                    }
                    label="Poor Quality"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reason === "others" ? true : false}
                        onChange={handleCheckBox}
                        name="others"
                        color="primary"
                        disabled={
                          currentUser &&
                          (currentUser.staffTypeId.type === "admin" ||
                            currentUser.staffTypeId.type ===
                              "Warehouse Inventory Keeper") &&
                          comingFor !== "view"
                            ? false
                            : true
                        }
                      />
                    }
                    label="Others"
                  />
                </FormGroup>
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
                    // format="MM/dd/yyyy hh:mm a"
                  format={dateTimeFormat}

                    inputVariant="filled"
                    onChange={(val) => onChangeDate(val, "expiryDate")}
                    name={"expiryDate"}
                    disabled={
                      currentUser &&
                      (currentUser.staffTypeId.type === "admin" ||
                        currentUser.staffTypeId.type ===
                          "Warehouse Inventory Keeper") &&
                      comingFor !== "view" &&
                      reason === "expired"
                        ? false
                        : true
                    }
                    fullWidth
                    value={
                      comingFor === "add"
                        ? expiryDate
                          ? expiryDate
                          : null
                        : expiryDate
                    }
                    label={"Expiry Date (MM/DD/YYYY)"}
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
                className="col-md-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <textarea
                  rows={4}
                  placeholder="Details"
                  name={"reasonDetail"}
                  value={reasonDetail}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "admin" ||
                      currentUser.staffTypeId.type ===
                        "Warehouse Inventory Keeper") &&
                    comingFor !== "view"
                      ? false
                      : true
                  }
                /> */}

                <TextField
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "admin" ||
                      currentUser.staffTypeId.type ===
                        "Warehouse Inventory Keeper") &&
                    comingFor !== "view"
                      ? false
                      : true
                  }
                  label="Details"
                  name={"reasonDetail"}
                  value={reasonDetail}
                  className="textInputStyle"
                  variant="filled"
                  onChange={onChangeValue}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>
          </div>

          {comingFor === "edit" &&
          (currentUser.staffTypeId.type ===
            "FU Internal Request Return Approval Member" ||
            currentUser.staffTypeId.type === "Purchasing Officer") ? (
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {currentUser.staffTypeId.type ===
                "FU Internal Request Return Approval Member" ? (
                  <TextField
                    required
                    variant={"filled"}
                    select
                    fullWidth
                    id="status"
                    name="status"
                    value={status}
                    onChange={onChangeValue}
                    label="Status"
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

                    {statusArrayApprovalMember.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                ) : currentUser.staffTypeId.type === "Purchasing Officer" &&
                  comingFor === "edit" ? (
                  <TextField
                    required
                    variant={"filled"}
                    select
                    fullWidth
                    id="status"
                    name="status"
                    value={status}
                    onChange={onChangeValue}
                    label="Status"
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

                    {statusArrayForWareHouseDeliveryMan.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
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
                {/* <input
                  type="text"
                  placeholder="Comment Note"
                  name={"commentNote"}
                  value={commentNote}
                  onChange={onChangeValue}
                  className="textInputStyle"
                /> */}

                <TextField
                  label="Comment Note"
                  name={"commentNote"}
                  value={commentNote}
                  className="textInputStyle"
                  variant="filled"
                  onChange={onChangeValue}
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

          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              marginTop: "2%",
              marginBottom: "2%",
              alignItems: "center",
            }}
          >
            <div>
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 60, height: 40, cursor: "pointer" }}
              />
            </div>
            <div style={{}}>
              {comingFor === "add" &&
              currentUser &&
              currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ? (
                <Button
                  style={{ height: 50 }}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  Generate
                </Button>
              ) : currentUser &&
                currentUser.staffTypeId.type === "Warehouse Inventory Keeper" &&
                comingFor === "edit" ? (
                <Button
                  style={{ height: 50 }}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  Confirm
                </Button>
              ) : currentUser &&
                currentUser.staffTypeId.type === "Purchasing Officer" &&
                comingFor === "edit" ? (
                <Button
                  style={{ height: 50 }}
                  disabled={validateApproveForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  Confirm
                </Button>
              ) : (
                undefined
              )}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
