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
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import {
  addInternalReturnRequest,
  updateInternalReturnRequest,
  getReceiveRequestFUUrl,
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
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

import BootstrapInput from "../../components/Dropdown/dropDown.js";

import Loader from "react-loader-spinner";

import InputLabelComponent from "../../components/InputLabel/inputLabel";

import dateFormat from "../../constants/dateFormat";
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

const statusArrayApprovalMember = [
  { key: "approved", value: "Approved" },
  { key: "reject", value: "Reject" },
];

const statusArrayForWareHouseDeliveryMan = [
  { key: "Delivery in Progress", value: "Delivery in Progress" },
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
    // backgroundColor: "white",
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },

  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  inputContainerForDate: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0,
    height: 47,
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

function AddEditPurchaseRequest(props) {
  // const classes = useStyles();
  const classes = useStyleforinput();
  const initialState = {
    _id: "",
    returnRequestNo: "",
    generatedBy: "",
    dateGenerated: "",
    expiryDate: "",
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

    returnedQty: "",
    receivedQty: "",
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

    returnedQty,

    receivedQty,
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

  const [receiveRequests, setReceiveRequests] = useState("");

  useEffect(() => {
    getReceiveRequestsForFU();

    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);
    setVendors(props.history.location.state.vendors);
    setFUObj(props.history.location.state.fuObj);

    const selectedRec = props.history.location.state.selectedItem;
    console.log(selectedRec);
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          if (key === "itemId") {
            dispatch({ field: "itemId", value: val });
            dispatch({ field: "itemName", value: val.name });
            dispatch({ field: "itemCode", value: val.itemCode });
            dispatch({ field: "description", value: val.description });
          } else if (key === "fuId") {
            dispatch({ field: "fuId", value: val });
          } else if (key === "damageReport") {
            dispatch({ field: "causedBy", value: val.causedBy });
            dispatch({ field: "date", value: val.date });
            dispatch({ field: "totalDamageCost", value: val.totalDamageCost });
            dispatch({ field: "itemCostPerUnit", value: val.itemCostPerUnit });
          } else {
            dispatch({ field: key, value: val });
          }
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
    if (props.history.location.state.vendors) {
      dispatch({
        field: "vendors",
        value: props.history.location.state.vendors,
      });
    }
    if (props.history.location.state.statues) {
      dispatch({
        field: "statues",
        value: props.history.location.state.statues,
      });
    }
    if (props.history.location.state.items) {
      dispatch({ field: "items", value: props.history.location.state.items });
    }
  }, []);

  function getReceiveRequestsForFU() {
    axios
      .get(getReceiveRequestFUUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("receive requests", res.data.data.receiveItems);
          const receivedItems = res.data.data.receiveItems;

          for (let i = 0; i < receivedItems.length; i++) {
            if (
              (receivedItems[i].replenishmentRequestId ===
                props.history.location.state.selectedItem._id &&
                receivedItems[i].itemId ===
                  props.history.location.state.selectedItem.itemId._id) ||
              (props.history.location.state.selectedItem
                .replenishmentRequestFU &&
                receivedItems[i].replenishmentRequestId ===
                  props.history.location.state.selectedItem
                    .replenishmentRequestFU._id)
            ) {
              dispatch({
                field: "receivedQty",
                value: receivedItems[i].receivedQty,
              });
            }
          }
          setReceiveRequests(res.data.data.receiveItems);
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

  const handleCheckBox = (e) => {
    if (e.target.name === "Damaged") {
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
      //   comments !== "" &&
      expiryDate !== "" &&
      //   fuItemCost !== "" &&
      //   itemCode !== "" &&
      //   description !== "" &&
      //   itemName !== ""
      //   requestedQty !== "" &&
      //   currentQty !== ""
      //   recieptUnit !== "" &&
      //   issueUnit !== ""
      returnedQty !== "" &&
      returnedQty > 0
      // && returnedQty <= receivedQty
    );
  }

  function validateApproveForm() {
    return status === "approved" || status === "reject";
  }

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      if (returnedQty > receivedQty) {
        setOpenNotification(true);
        setErrorMsg("Return qty can not greater than received qty");
        return;
      }
      const params = {
        returnRequestNo,
        generatedBy: currentUser.name,
        dateGenerated: new Date(),
        expiryDate,
        to: "Warehouse",
        from: "FU",
        currentQty,
        itemId: itemId._id,
        description,
        fuId: fuId._id,
        reason,
        reasonDetail,
        damageReport: {
          causedBy: reason === "damaged" ? causedBy : "",
          totalDamageCost: reason === "damaged" ? totalDamageCost : "",
          date: reason === "damaged" ? date : "",
          itemCostPerUnit: reason === "damaged" ? itemCostPerUnit : "",
        },

        status:
          reason === "Approval Not Required" ? "approved" : "pending_approval",
        replenishmentRequestFU: _id,
        // comments,
        // requestedQty,
        returnedQty,
      };

      console.log("params", params);

      axios
        .post(addInternalReturnRequest, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response after adding RR", res.data);
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Internal Return Request: ${res.data.data.returnRequestNo} has been generated successfully`,
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
      if (returnedQty > receivedQty) {
        setOpenNotification(true);
        setErrorMsg("Return qty can not greater than received qty");
        return;
      }

      const obj = {
        _id,
        returnRequestNo,
        generatedBy,
        dateGenerated,
        expiryDate,
        to,
        from,
        currentQty,
        itemId: itemId._id,
        description,
        fuId: fuId._id,
        reason,
        reasonDetail,
        damageReport: {
          causedBy: reason === "damaged" ? causedBy : "",
          totalDamageCost: reason === "damaged" ? totalDamageCost : "",
          date: reason === "damaged" ? date : "",
          itemCostPerUnit: reason === "damaged" ? itemCostPerUnit : "",
        },

        status,
        replenishmentRequestFU: replenishmentRequestFU._id,
        commentNote,
        returnedQty,
      };

      let params;

      if (
        currentUser.staffTypeId.type ===
          "FU Internal Request Return Approval Member" ||
        currentUser.staffTypeId.type === "admin"
      ) {
        params = {
          ...obj,
          approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
        };
      } else {
        if (approvedBy) {
          params = {
            ...obj,
            approvedBy: approvedBy ? approvedBy : "",
          };
        } else {
          params = {
            ...obj,
          };
        }
      }

      console.log(params);

      axios
        .put(updateInternalReturnRequest, params)
        .then((res) => {
          if (res.data.success) {
            // props.history.goBack();
            console.log("response after adding RR", res.data);
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Internal Return Request: ${res.data.data.returnRequestNo} has been updated successfully`,
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
  };

  const handleApprove = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const obj = {
        _id,
        returnRequestNo,
        generatedBy,
        dateGenerated,
        expiryDate,
        to,
        from,
        currentQty,
        itemId: itemId._id,
        description,
        fuId: fuId._id,
        reason,
        reasonDetail,
        damageReport: {
          causedBy: reason === "damaged" ? causedBy : "",
          totalDamageCost: reason === "damaged" ? totalDamageCost : "",
          date: reason === "damaged" ? date : "",
          itemCostPerUnit: reason === "damaged" ? itemCostPerUnit : "",
        },

        status,
        replenishmentRequestFU: replenishmentRequestFU._id,
        commentNote,
        returnedQty,
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
      }

      console.log(params);

      axios
        .put(updateInternalReturnRequest, params)
        .then((res) => {
          if (res.data.success) {
            // props.history.goBack();
            console.log("response after adding RR", res.data);
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Internal Return Request: ${res.data.data.returnRequestNo} has been updated successfully`,
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
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  //   const handleSearch = (e) => {
  //     setSearchQuery(e.target.value);
  //     if (e.target.value.length >= 3) {
  //       axios
  //         .get(getSearchedItemUrl + "/" + e.target.value)
  //         .then((res) => {
  //           if (res.data.success) {
  //             if (res.data.data.items.length > 0) {
  //               console.log(res.data.data.items);
  //               setItemFoundSuccessfully(true);
  //               setItem(res.data.data.items);
  //             } else {
  //               setItemFoundSuccessfully(false);
  //               setItem("");
  //             }
  //           }
  //         })
  //         .catch((e) => {
  //           console.log("error after adding purchase request", e);
  //           setOpenNotification(true);
  //           setErrorMsg("Error while adding the purchase request");
  //         });
  //     }
  //   };

  //   const getCurrentQty = (id) => {
  //     axios
  //       .get(getPurchaseRequestItemQtyUrl + "/" + id)
  //       .then((res) => {
  //         if (res.data.success) {
  //           console.log(res.data.data);
  //           dispatch({ field: "currentQty", value: res.data.data.qty });
  //         }
  //       })
  //       .catch((e) => {
  //         console.log("error after adding purchase request", e);
  //         setOpenNotification(true);
  //         setErrorMsg("Error while adding the purchase request");
  //       });
  //   };

  //   function handleAddItem(i) {
  //     console.log("selected item", i);

  //     getCurrentQty(i._id);
  //     setDialogOpen(true);
  //     setSelectedItem(i);

  //     dispatch({ field: "itemId", value: i._id });
  //     dispatch({ field: "itemCode", value: i.itemCode });
  //     dispatch({ field: "itemName", value: i.name });
  //     dispatch({ field: "vendorId", value: i.vendorId });
  //     dispatch({ field: "description", value: i.description });
  //     dispatch({ field: "maximumLevel", value: i.maximumLevel });
  //     const obj = {
  //       itemCode: i.itemCode,
  //     };

  //     setSelectedItemsArray((pervState) => [...pervState, obj]);
  //     setSearchQuery("");
  //   }

  function validateItemsForm() {
    return (
      // itemCode !== "" &&
      // description !== "" &&
      // itemName !== "" &&
      causedBy &&
      causedBy !== "" &&
      totalDamageCost &&
      totalDamageCost !== "" &&
      itemCostPerUnit &&
      itemCostPerUnit !== "" &&
      date &&
      date !== "" &&
      totalDamageCost !== "0" &&
      itemCostPerUnit !== "0"
    );
  }

  function hideDialog() {
    dispatch({ field: "reason", value: "" });
    setDialogOpen(false);
    setSelectedItem("");
    setSelectItemToEditId("");
  }

  const addSelectedItem = () => {
    setDialogOpen(false);
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
            <img src={purchase_request} />
            <h4>
              {comingFor === "add"
                ? " Add Internal Return Request"
                : comingFor === "view"
                ? "View Internal Return Request"
                : " Edit Internal Return Request"}
            </h4>
          </div>
        </div>

        {receivedQty ? (
          <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
            {comingFor === "edit" ? (
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
                    label=" Return Request No"
                    name={"returnRequestNo"}
                    value={returnRequestNo}
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
            ) : (
              undefined
            )}

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
                className="col-md-4"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  type="number"
                  disabled={true}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="filled"
                    onChange={(val) => onChangeDate(val, "dateGenerated")}
                    name={"dateGenerated"}
                    label="Date Generated (MM/DD/YYYY)"
                    disabled={true}
                    fullWidth
                    // format="MM/dd/yyyy hh:mm a"
                    format={dateTimeFormat}
                    // style={styles.inputContainerForDate}

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
                    inputVariant="filled"
                    onChange={(val) => onChangeDate(val, "expiryDate")}
                    name={"expiryDate"}
                    label="Expiry Date (MM/DD/YYYY)"
                    // format="MM/dd/yyyy hh:mm a"
                    format={dateFormat}
                    disabled={
                      currentUser &&
                      (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                        currentUser.staffTypeId.type === "admin") &&
                      comingFor !== "view"
                        ? false
                        : true
                    }
                    fullWidth
                    // style={styles.inputContainerForDate}

                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    value={
                      comingFor === "add"
                        ? expiryDate
                          ? expiryDate
                          : null
                        : expiryDate
                    }
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
                <TextField
                  required
                  type="number"
                  label="Return Qty"
                  name={"returnedQty"}
                  value={returnedQty}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                      currentUser.staffTypeId.type === "admin") &&
                    comingFor !== "view"
                      ? false
                      : true
                  }
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
                label="Notes/Comments"
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
                <TextField
                  disabled={true}
                  type="text"
                  label="Description"
                  name={"description"}
                  value={description}
                  onChange={handleCheckBox}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: 30,
              }}
            >
              <h4 style={{ fontWeight: "700" }}>Reason</h4>

              <FormGroup
                row
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={reason === "Expired" ? true : false}
                      onChange={handleCheckBox}
                      name="Expired"
                      color="primary"
                      disabled={
                        currentUser &&
                        (currentUser.staffTypeId.type ===
                          "FU Inventory Keeper" ||
                          currentUser.staffTypeId.type === "admin") &&
                        comingFor !== "view"
                          ? false
                          : true
                      }
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  }
                  label="Expired"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={reason === "Damaged" ? true : false}
                      onChange={handleCheckBox}
                      name="Damaged"
                      color="primary"
                      disabled={
                        currentUser &&
                        (currentUser.staffTypeId.type ===
                          "FU Inventory Keeper" ||
                          currentUser.staffTypeId.type === "admin") &&
                        comingFor !== "view"
                          ? false
                          : true
                      }
                    />
                  }
                  label="Damaged"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={reason === "Count Mismatch" ? true : false}
                      onChange={handleCheckBox}
                      name="Count Mismatch"
                      color="primary"
                      disabled={
                        currentUser &&
                        (currentUser.staffTypeId.type ===
                          "FU Inventory Keeper" ||
                          currentUser.staffTypeId.type === "admin") &&
                        comingFor !== "view"
                          ? false
                          : true
                      }
                    />
                  }
                  label="Count does not match desired quantity"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        reason === "Approval Not Required" ? true : false
                      }
                      onChange={handleCheckBox}
                      name="Approval Not Required"
                      color="primary"
                      disabled={
                        currentUser &&
                        (currentUser.staffTypeId.type ===
                          "FU Inventory Keeper" ||
                          currentUser.staffTypeId.type === "admin") &&
                        comingFor !== "view"
                          ? false
                          : true
                      }
                    />
                  }
                  label="Do not need approval"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={reason === "Other" ? true : false}
                      onChange={handleCheckBox}
                      name="Other"
                      color="primary"
                      disabled={
                        currentUser &&
                        (currentUser.staffTypeId.type ===
                          "FU Inventory Keeper" ||
                          currentUser.staffTypeId.type === "admin") &&
                        comingFor !== "view"
                          ? false
                          : true
                      }
                    />
                  }
                  label="Other"
                />
              </FormGroup>
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
                  // multiline
                  required
                  rows={4}
                  label="Details"
                  name={"reasonDetail"}
                  value={reasonDetail}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                      currentUser.staffTypeId.type === "admin") &&
                    comingFor !== "view"
                      ? false
                      : true
                  }
                />
              </div>
            </div>

            {comingFor === "edit" &&
            (currentUser.staffTypeId.type === "admin" ||
              currentUser.staffTypeId.type ===
                "FU Internal Request Return Approval Member" ||
              currentUser.staffTypeId.type === "Warehouse Incharge") ? (
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {currentUser.staffTypeId.type ===
                    "FU Internal Request Return Approval Member" ||
                  currentUser.staffTypeId.type === "admin" ? (
                    // <Select
                    //   fullWidth
                    //   id="status"
                    //   name="status"
                    //   value={status}
                    //   onChange={onChangeValue}
                    //   label="Status"
                    //   className="dropDownStyle"
                    //   input={<BootstrapInput />}
                    // >

                    <TextField
                      required
                      select
                      fullWidth
                      id="status"
                      name="status"
                      value={status}
                      onChange={onChangeValue}
                      label="Status"
                      variant="filled"
                      // className="dropDownStyle"
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
                    style={{ width: "60%" }}
                    disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Generate
                  </Button>
                ) : comingFor === "edit" &&
                  currentUser &&
                  currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                  status !== "reject" &&
                  status !== "Item Returned to Warehouse" ? (
                  <Button
                    style={{ width: "60%" }}
                    disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                ) : currentUser &&
                  currentUser.staffTypeId.type ===
                    "FU Internal Request Return Approval Member" ? (
                  <Button
                    style={{ width: "60%" }}
                    disabled={!validateApproveForm()}
                    onClick={handleApprove}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                ) : (
                  undefined
                )}
              </div>
            </div>

            <Notification msg={errorMsg} open={openNotification} />

            <Dialog
              aria-labelledby="form-dialog-title"
              open={dialogOpen}
              maxWidth="xl"
              fullWidth={true}
              // fullScreen
            >
              <DialogContent style={{ backgroundColor: "#31e2aa" }}>
                <DialogTitle
                  id="simple-dialog-title"
                  style={{ color: "white" }}
                >
                  Damage Details
                </DialogTitle>
                <div className="container-fluid">
                  {/* <div className="row">
                  <div
                    className="col-md-12"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabel
                      id="generated-label"
                      style={styles.stylesForLabel}
                    >
                      Search
                    </InputLabel>

                    <input
                      type="text"
                      label="Search Items by name or code"
                      name={"searchQuery"}
                      value={searchQuery}
                      onChange={handleSearch}
                      className="textInputStyle"
                    />
                  </div>
                </div> */}

                  <div className="row">
                    <div
                      className="col-md-4"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Damage Cause By</InputLabelComponent>

                      <input
                        type="text"
                        label="Damage Cause"
                        name={"causedBy"}
                        value={causedBy}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                    </div>

                    <div
                      className="col-md-4"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Code</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        label="Item Code"
                        name={"itemCode"}
                        value={itemCode}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                    </div>
                    <div
                      className="col-md-4"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Name</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        label="Item Name"
                        name={"itemName"}
                        value={itemName}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Description</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        label="Description"
                        name={"description"}
                        value={description}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                    </div>

                    <div
                      className="col-md-6"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Sub Class</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        label="Description"
                        name={"description"}
                        value={itemId.subClass}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>
                        Item Cost Per Unit
                      </InputLabelComponent>

                      <input
                        type="number"
                        label="Item Cost Per Unit"
                        name={"itemCostPerUnit"}
                        value={itemCostPerUnit}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        onKeyDown={(evt) =>
                          evt.key === "e" && evt.preventDefault()
                        }
                      />
                    </div>

                    <div
                      className="col-md-6"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>
                        Total Damage Cost
                      </InputLabelComponent>

                      <input
                        type="number"
                        label="Total Damage Cost"
                        name={"totalDamageCost"}
                        value={totalDamageCost}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        onKeyDown={(evt) =>
                          evt.key === "e" && evt.preventDefault()
                        }
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>FU Name</InputLabelComponent>
                      <input
                        disabled={true}
                        label="FU Name"
                        name={"fuName"}
                        value={fuId.fuName}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                    </div>

                    <div className="col-md-6" style={{ marginTop: 35 }}>
                      <InputLabelComponent>
                        Date/Time (MM/DD/YYYY)
                      </InputLabelComponent>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                          inputVariant="outlined"
                          onChange={(val) => onChangeDate(val, "date")}
                          name={"date"}
                          // format="MM/dd/yyyy hh:mm a"
                          format={dateTimeFormat}
                          disabled={
                            (currentUser &&
                              currentUser.staffTypeId.type ===
                                "FU Inventory Keeper") ||
                            currentUser.staffTypeId.type === "admin"
                              ? false
                              : true
                          }
                          fullWidth
                          style={{
                            backgroundColor: "white",
                            borderRadius: 10,
                            borderWidth: 0,
                          }}
                          value={
                            comingFor === "add" ? (date ? date : null) : date
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                      <Button onClick={() => hideDialog()} variant="contained">
                        Cancel
                      </Button>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "2%",
                        marginBottom: "2%",
                      }}
                    >
                      {selectItemToEditId === "" ? (
                        <Button
                          style={{ paddingLeft: 30, paddingRight: 30 }}
                          disabled={!validateItemsForm()}
                          onClick={addSelectedItem}
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          style={{ paddingLeft: 30, paddingRight: 30 }}
                          disabled={!validateItemsForm()}
                          // onClick={editSelectedItem}
                          variant="contained"
                          color="primary"
                        >
                          {" "}
                          Edit{" "}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className='row' style={{ marginBottom: 20 }}>
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
