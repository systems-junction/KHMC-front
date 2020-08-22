/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
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
  addReplenishmentRequestUrl,
  updateReplenishmentRequestUrl,
  getSearchedItemUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
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
import Add_New from "../../assets/img/Add_New.png";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import InputLabelComponent from "../../components/InputLabel/inputLabel";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import add_new from "../../assets/img/Plus.png";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

const reasonArray = [
  { key: "jit", value: "JIT" },
  { key: "new_item", value: "New Item" },
  { key: "reactivated_items", value: "Reactivated Items" },
  {
    key: "The System is Malfunctioning",
    value: "The System is Malfunctioning",
  },
];

const statusArrayForWareHouseMember = [
  { key: "Fulfillment Initiated", value: "Fulfillment Initiated" },
  // { key: "Unfulfillment Initiated", value: "Unfulfillment Initiated" },
];

const statusArrayForWareHouseDeliveryMan = [
  { key: "Delivery in Progress", value: "Delivery in Progress" },
  // { key: "Unfulfillment Initiated", value: "Unfulfillment Initiated" },
];

const statusArrayForFUInventoryKeeper = [
  { key: "Recieved", value: "Recieved" },
  { key: "Partially Recieved", value: "Partially Recieved" },
];

const statusArrayForAdmin = [
  { key: "Fulfillment Initiated", value: "Fulfillment Initiated" },
  { key: "Delivery in Progress", value: "Delivery in Progress" },
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
  // inputContainer: {
  //   marginTop: 10,
  //   // backgroundColor: "white",
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   marginLeft: 5,
  //   marginRight: 5,
  // },
  inputContainer: {
    marginTop: 20,
  },

  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 25,
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

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2C6DDD",
    // width: "140px",
    height: "54px",
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

    recieptUnit: "",
    issueUnit: "",
    fuItemCost: "",
    fuId: "",
    to: "",
    from: "",
    approvedBy: "",
    commentNote: "",
    secondStatus: "",
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

    recieptUnit,
    issueUnit,
    fuItemCost,
    fuId,
    to,
    from,
    approvedBy,
    commentNote,
    secondStatus,
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

  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
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
            dispatch({ field: "itemId", value: val._id });
            // dispatch({ field: "currentQty", value: val.currQty });
            // dispatch({ field: "requestedQty", value: val.requestedQty });
            // dispatch({ field: "comments", value: val.comments });
            // dispatch({ field: "description", value: val.description });
            dispatch({ field: "itemName", value: val.name });
            dispatch({ field: "itemCode", value: val.itemCode });
          } else if (key === "vendorId") {
            dispatch({ field: "vendorId", value: val._id });
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

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "dateGenerated", value });
  };

  function validateForm() {
    let jit = true;
    // let qtyIsLess = true;
    if (reason === "jit") {
      jit = requesterName !== "" && department !== "" && orderType !== "";
    }
    return (
      reason !== "" &&
      comments !== "" &&
      // dateGenerated !== "" &&
      fuItemCost !== "" &&
      itemCode !== "" &&
      itemName !== "" &&
      requestedQty !== "" &&
      currentQty !== "" &&
      recieptUnit !== "" &&
      issueUnit !== "" &&
      // requestedQty <= currentQty &&
      jit
    );
  }

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        const params = {
          requestNo,
          generatedBy: currentUser.name,
          dateGenerated: new Date(),
          generated,
          status: "pending",
          reason,
          comments,

          itemId: itemId,
          currentQty,
          requestedQty,
          description,
          issueUnit,
          recieptUnit,
          fuItemCost,
          to: "Warehouse",
          from: "FU",
          commentNote: "",
          fuId: fuObj._id,

          requesterName,
          orderType,
          department,
        };

        console.log("params", params);

        axios
          .post(addReplenishmentRequestUrl, params)
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
        if (
          status === "pending" ||
          currentUser.staffTypeId.type !== "FU Member"
        ) {
          const obj = {
            _id,
            requestNo,
            generatedBy,
            dateGenerated,
            generated,
            status:
              (currentUser.staffTypeId.type === "Warehouse Member" ||
                currentUser.staffTypeId.type === "admin") &&
              status === "pending" &&
              secondStatus === "Fulfillment Initiated"
                ? "Fulfillment Initiated"
                : (currentUser.staffTypeId.type === "Warehouse Incharge" ||
                    currentUser.staffTypeId.type === "admin") &&
                  status === "Fulfillment Initiated" &&
                  secondStatus === "Delivery in Progress"
                ? "Delivery in Progress"
                : (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                    currentUser.staffTypeId.type === "admin") &&
                  status === "Delivery in Progress" &&
                  secondStatus === "Received"
                ? "Received"
                : status,
            reason,
            comments,

            itemId,
            currentQty,
            requestedQty,
            description,
            issueUnit,
            recieptUnit,
            fuItemCost,
            to: to,
            from: from,
            commentNote,
            fuId: fuId._id,
            secondStatus,

            requesterName,
            orderType,
            department,
          };

          let params;

          if (
            currentUser.staffTypeId.type === "Warehouse Member" ||
            currentUser.staffTypeId.type === "admin"
          ) {
            params = {
              ...obj,
              approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
            };
          } else {
            params = {
              ...obj,
              approvedBy: approvedBy === "" ? "" : approvedBy,
            };
          }

          console.log("params for edit rep request FU", params);

          axios
            .put(updateReplenishmentRequestUrl, params)
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
        } else {
          setOpenNotification(true);
          setErrorMsg("Request can not be updated once it is in progress");
        }
      }
    }
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // if (e.target.value.length >= 3) {
    axios
      .get(getSearchedItemUrl + "/" + e.target.value)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.items.length > 0) {
            console.log(res.data.data.items);
            setItemFoundSuccessfully(true);
            setItem(res.data.data.items);
          } else {
            setItemFoundSuccessfully(false);
            setItem("");
          }
        }
      })
      .catch((e) => {
        console.log("error after adding purchase request", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the purchase request");
      });
    // }
  };

  const getCurrentQty = (id) => {
    // const params = {
    //   itemId: id,
    //   // fuId: fuObj._id,
    // };
    // console.log("params for curr qty", params);

    axios
      .get(getPurchaseRequestItemQtyUrl + "/" + id)
      .then((res) => {
        if (res.data.success) {
          console.log("current quantity", res.data.data);
          if (res.data.data) {
            dispatch({ field: "currentQty", value: res.data.data.qty });
          } else {
            dispatch({ field: "currentQty", value: 0 });
          }
        }
      })
      .catch((e) => {
        console.log("error after adding purchase request", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the purchase request");
      });
  };

  function handleAddItem(i) {
    console.log("selected item", i);

    getCurrentQty(i._id);
    setDialogOpen(true);
    setSelectedItem(i);

    dispatch({ field: "itemId", value: i._id });
    dispatch({ field: "itemCode", value: i.itemCode });
    dispatch({ field: "itemName", value: i.name });
    dispatch({ field: "vendorId", value: i.vendorId });
    dispatch({ field: "description", value: i.description });
    dispatch({ field: "maximumLevel", value: i.maximumLevel });
    dispatch({ field: "issueUnit", value: i.issueUnit });
    dispatch({ field: "recieptUnit", value: i.receiptUnit });

    const obj = {
      itemCode: i.itemCode,
    };

    setSelectedItemsArray((pervState) => [...pervState, obj]);
    setSearchQuery("");
  }

  function validateItemsForm() {
    return (
      itemCode !== "" &&
      itemName !== "" &&
      requestedQty !== "" &&
      fuItemCost !== "" &&
      currentQty !== 0
      // && requestedQty <= currentQty
      // currentQty.length > 0 &&
      // maximumLevel >= requestedQty &&
    );
  }

  function hideDialog() {
    if (!itemAdded) {
      setDialogOpen(false);
      setSelectedItem("");
      setSelectItemToEditId("");

      dispatch({ field: "itemId", value: "" });
      dispatch({ field: "description", value: "" });
      dispatch({ field: "currentQty", value: "" });
      dispatch({ field: "comments", value: "" });
      dispatch({ field: "reqQty", value: "" });
      dispatch({ field: "itemName", value: "" });
      dispatch({ field: "itemCode", value: "" });
      dispatch({ field: "vendorId", value: "" });
      dispatch({ field: "issueUnit", value: "" });
      dispatch({ field: "recieptUnit", value: "" });
      dispatch({ field: "requestedQty", value: "" });
      dispatch({ field: "fuItemCost", value: "" });

      // dispatch({ field: "maximumLevel", value: "" });
    } else {
      setDialogOpen(false);
      setSelectedItem("");
      setSelectItemToEditId("");
    }
  }

  const addSelectedItem = () => {
    // setDialogOpen(false);
    // setItemAdded(true);

    if (validateItemsForm()) {
      setDialogOpen(false);
      setItemAdded(true);
    }
  };

  const editSelectedItem = () => {};

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
                ? " Add Replenishment Request For FU"
                : " Update Replenishment Request For FU"} */}
              {comingFor === "add"
                ? " Add Replenishment Request For FU"
                : " Update Replenishment Request For FU"}
            </h4>
          </div>

          <div>
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

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Request No</InputLabelComponent> */}
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
                error={requestNo === "" && isFormSubmitted}
              />
              {/* <ErrorMessage
                name={requestNo}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Generated</InputLabelComponent> */}
              <TextField
                required
                select
                fullWidth
                disabled={true}
                id="generated"
                name="generated"
                value={generated}
                onChange={onChangeValue}
                label="Generated"
                variant="filled"
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
                {generatedArray &&
                  generatedArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
              </TextField>
              {/* <ErrorMessage
                  name={generated}
                  isFormSubmitted={isFormSubmitted}
                /> */}
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Generated By</InputLabelComponent> */}
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
                error={generatedBy === "" && isFormSubmitted}
              />
              {/* <ErrorMessage
                name={generatedBy}
                isFormSubmitted={isFormSubmitted}
              /> */}
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <InputLabelComponent>Date Generated</InputLabelComponent> */}
                <DateTimePicker
                  // inputVariant="outlined"
                  inputVariant="filled"
                  onChange={onChangeDate}
                  disabled={
                    // currentUser && currentUser.staffTypeId.type === "FU Member"
                    //   ? false
                    //   : true
                    true
                  }
                  fullWidth
                  // style={{
                  //   backgroundColor: "white",
                  //   borderRadius: 10,
                  //   borderWidth: 0,
                  //   height: 47,
                  //   marginTop: 5,
                  //   paddingTop: 9,
                  //   paddingLeft: 15,
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
                  label={""}
                  // InputProps={{
                  //   disableUnderline: true,
                  // }}
                />
              </MuiPickersUtilsProvider>
            </div>

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Manual RR Reason*</InputLabelComponent> */}

              <TextField
                required
                select
                fullWidth
                disabled={
                  currentUser &&
                  (currentUser.staffTypeId.type === "FU Member" ||
                    currentUser.staffTypeId.type === "admin")
                    ? false
                    : true
                }
                fullWidth
                id="reason"
                name="reason"
                value={reason}
                onChange={onChangeValue}
                label="Reason"
                className="dropDownStyle"
                // input={<BootstrapInput />}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={reason === "" && isFormSubmitted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {reasonArray.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
                })}
              </TextField>

              {/* <ErrorMessage name={reason} isFormSubmitted={isFormSubmitted} /> */}
            </div>
          </div>

          {reason === "jit" ? (
            <div className="row">
              <div
                className="col-md-4"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Requester*</InputLabelComponent> */}
                <TextField
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Member" ||
                      currentUser.staffTypeId.type === "admin")
                      ? false
                      : true
                  }
                  label="Requester"
                  name={"requesterName"}
                  value={requesterName}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  verror={requesterName === "" && isFormSubmitted}
                />
                {/* <ErrorMessage
                  name={requesterName}
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>

              <div
                className="col-md-4"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Department*</InputLabelComponent> */}
                <TextField
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Member" ||
                      currentUser.staffTypeId.type === "admin")
                      ? false
                      : true
                  }
                  label="Department"
                  name={"department"}
                  value={department}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={department === "" && isFormSubmitted}
                />
                {/* <ErrorMessage
                    name={department}
                    isFormSubmitted={isFormSubmitted}
                  /> */}
              </div>

              <div
                className="col-md-4"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Order Type*</InputLabelComponent> */}
                <TextField
                  required
                  select
                  fullWidth
                  fullWidth
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Member" ||
                      currentUser.staffTypeId.type === "admin")
                      ? false
                      : true
                  }
                  id="orderType"
                  name="orderType"
                  value={orderType}
                  onChange={onChangeValue}
                  label="Order Type"
                  className="dropDownStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={orderType === "" && isFormSubmitted}
                  // input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {orderArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {/* <ErrorMessage
                    name={orderType}
                    isFormSubmitted={isFormSubmitted}
                  /> */}
              </div>
            </div>
          ) : (
            undefined
          )}

          <div className="row">
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Notes/Comments*</InputLabelComponent> */}
              <TextField
                type="text"
                disabled={
                  currentUser &&
                  (currentUser.staffTypeId.type === "FU Member" ||
                    currentUser.staffTypeId.type === "admin")
                    ? false
                    : true
                }
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
              {/* <ErrorMessage name={comments} isFormSubmitted={isFormSubmitted} /> */}
            </div>
          </div>

          {currentQty !== "" &&
          description !== "" &&
          issueUnit !== "" &&
          recieptUnit !== "" ? (
            <div>
              <h4 style={{ color: "white", fontWeight: "700", marginTop: 30 }}>
                Item details
              </h4>
              <div className="row">
                <div
                  className="col-md-6"
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
                  className="col-md-6"
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
              </div>

              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Current Qty</InputLabelComponent> */}

                  <TextField
                    type="number"
                    disabled={true}
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
                  />
                </div>

                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Requested Qty*</InputLabelComponent> */}

                  <TextField
                    disabled={
                      currentUser &&
                      (currentUser.staffTypeId.type === "FU Member" ||
                        currentUser.staffTypeId.type === "admin")
                        ? false
                        : true
                    }
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
                  {/* <InputLabelComponent>Receipt Unit</InputLabelComponent> */}

                  <TextField
                    disabled={true}
                    label="Receipt Unit"
                    name={"recieptUnit"}
                    value={recieptUnit}
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
                  {/* <InputLabelComponent>Issue Unit</InputLabelComponent> */}

                  <TextField
                    disabled={true}
                    label="Issue Unit"
                    name={"issueUnit"}
                    value={issueUnit}
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
                  {/* <InputLabelComponent>FU Item Cost*</InputLabelComponent> */}

                  <TextField
                    disabled={
                      currentUser &&
                      (currentUser.staffTypeId.type === "FU Member" ||
                        currentUser.staffTypeId.type === "admin")
                        ? false
                        : true
                    }
                    type="number"
                    label="FU Item Cost"
                    name={"fuItemCost"}
                    value={fuItemCost}
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
                  className="col-md-12"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Description</InputLabelComponent> */}

                  <TextField
                    disabled={true}
                    type="text"
                    label="Description"
                    name={"description"}
                    value={description}
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
          ) : (
            undefined
          )}

          {comingFor === "edit" &&
          (currentUser.staffTypeId.type === "admin" ||
            currentUser.staffTypeId.type === "Warehouse Member" ||
            currentUser.staffTypeId.type === "Warehouse Incharge" ||
            currentUser.staffTypeId.type === "FU Inventory Keeper") ? (
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Status</InputLabelComponent> */}
                {currentUser.staffTypeId.type === "Warehouse Member" ? (
                  <TextField
                    required
                    select
                    fullWidth
                    id="secondStatus"
                    name="secondStatus"
                    value={secondStatus}
                    onChange={onChangeValue}
                    label="Status"
                    className="dropDownStyle"
                    // input={<BootstrapInput />}
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {statusArrayForWareHouseMember.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                ) : currentUser.staffTypeId.type === "Warehouse Incharge" ? (
                  // <Select
                  //   fullWidth
                  //   id="secondStatus"
                  //   name="secondStatus"
                  //   value={secondStatus}
                  //   onChange={onChangeValue}
                  //   label="Status"
                  //   className="dropDownStyle"
                  //   input={<BootstrapInput />}
                  // >
                  <TextField
                    required
                    select
                    fullWidth
                    id="secondStatus"
                    name="secondStatus"
                    value={secondStatus}
                    onChange={onChangeValue}
                    label="Status"
                    className="dropDownStyle"
                    // input={<BootstrapInput />}
                    variant="filled"
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
                ) : currentUser.staffTypeId.type === "admin" ? (
                  // <Select
                  //   fullWidth
                  //   id="secondStatus"
                  //   name="secondStatus"
                  //   value={secondStatus}
                  //   onChange={onChangeValue}
                  //   label="Status"
                  //   className="dropDownStyle"
                  //   input={<BootstrapInput />}
                  // >
                  <TextField
                    required
                    select
                    fullWidth
                    id="secondStatus"
                    name="secondStatus"
                    value={secondStatus}
                    onChange={onChangeValue}
                    label="Status"
                    className="dropDownStyle"
                    // input={<BootstrapInput />}
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {statusArrayForAdmin.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                ) : (
                  // <Select
                  //   fullWidth
                  //   id="secondStatus"
                  //   name="secondStatus"
                  //   value={secondStatus}
                  //   onChange={onChangeValue}
                  //   label="Status"
                  //   className="dropDownStyle"
                  //   input={<BootstrapInput />}
                  // >
                  <TextField
                    required
                    select
                    fullWidth
                    id="secondStatus"
                    name="secondStatus"
                    value={secondStatus}
                    onChange={onChangeValue}
                    label="Status"
                    className="dropDownStyle"
                    // input={<BootstrapInput />}
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {statusArrayForFUInventoryKeeper.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </TextField>
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
                // height: 50,
                justifyContent: "flex-end",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              {comingFor === "add" ? (
                <Button
                  onClick={() => setDialogOpen(true)}
                  style={styles.stylesForButton}
                  variant="contained"
                  color="primary"
                >
                  <img src={add_new} style={styles.stylesForIcon} />
                  &nbsp;&nbsp;
                  <strong>Add New</strong>
                </Button>
              ) : (
                undefined
              )}
            </div>
          </div>

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
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  Generate Replenishment Request
                </Button>
              ) : (
                <Button
                  style={{ width: "60%" }}
                  // disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  {currentUser &&
                  currentUser.staffTypeId.type === "Warehouse Incharge"
                    ? "Confirm Request"
                    : "Update Replenishment Request"}
                </Button>
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
              <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                Add Item
              </DialogTitle>
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> Search *</InputLabelComponent> */}

                    <TextField
                      type="text"
                      label="Search Items by name or code"
                      name={"searchQuery"}
                      value={searchQuery}
                      onChange={handleSearch}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={searchQuery === "" && isFormSubmitted}
                    />
                    {/* <ErrorMessage
                      name={searchQuery}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>
                </div>

                {searchQuery ? (
                  // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                  <div style={{ zIndex: 3 }}>
                    <Paper>
                      {itemFoundSuccessfull ? (
                        itemFound && (
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Puschase Price</TableCell>
                                <TableCell align="center">
                                  Description
                                </TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {itemFound.map((i, index) => {
                                return (
                                  <TableRow
                                    key={i.itemCode}
                                    onClick={() => handleAddItem(i)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <TableCell>{i.name}</TableCell>
                                    <TableCell>{i.itemCode}</TableCell>
                                    <TableCell>{i.purchasePrice}</TableCell>
                                    <TableCell>{i.description}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        )
                      ) : (
                        <h4
                          style={{ textAlign: "center" }}
                          onClick={() => console.log("ddf")}
                        >
                          Item Not Found
                        </h4>
                      )}
                    </Paper>
                  </div>
                ) : (
                  undefined
                )}

                <div className="row">
                  <div
                    className="col-md-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> Item Code *</InputLabelComponent> */}

                    <TextField
                      type="text"
                      disabled={true}
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
                      error={itemCode === "" && isFormSubmitted}
                    />
                    {/* <ErrorMessage
                      name={itemCode}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>
                  <div
                    className="col-md-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> Item Name *</InputLabelComponent> */}

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
                      error={itemName === "" && isFormSubmitted}
                    />
                  </div>
                  {/* <ErrorMessage
                    name={itemName}
                    isFormSubmitted={isFormSubmitted}
                  /> */}
                </div>

                <div className="row">
                  <div
                    className="col-md-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> Current Qty *</InputLabelComponent> */}

                    <TextField
                      type="number"
                      disabled={true}
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
                    {/* <ErrorMessage
                      name={currentQty}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>

                  <div
                    className="col-md-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> Requested Qty *</InputLabelComponent> */}

                    <TextField
                      type="number"
                      label="Req Qty"
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
                    {/* <ErrorMessage
                      name={requestedQty}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
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
                    {/* <InputLabelComponent> Receipt Unit *</InputLabelComponent> */}

                    <TextField
                      disabled={true}
                      placeholder="Receipt Unit"
                      name={"recieptUnit"}
                      value={recieptUnit}
                      onChange={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={recieptUnit === "" && isFormSubmitted}
                    />
                    {/* <ErrorMessage
                      name={recieptUnit}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>

                  <div
                    className="col-md-4"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> Issue Unit *</InputLabelComponent> */}

                    <TextField
                      disabled={true}
                      label="Issue Unit"
                      name={"issueUnit"}
                      value={issueUnit}
                      onChange={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={issueUnit === "" && isFormSubmitted}
                    />
                    {/* <ErrorMessage
                      name={issueUnit}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>

                  <div
                    className="col-md-4"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent> FU Item Cost *</InputLabelComponent> */}

                    <TextField
                      type="number"
                      label="FU Item Cost"
                      name={"fuItemCost"}
                      value={fuItemCost}
                      onChange={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={fuItemCost === "" && isFormSubmitted}
                    />
                    {/* <ErrorMessage
                      name={fuItemCost}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
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
                    {/* <InputLabelComponent> Description *</InputLabelComponent> */}

                    <TextField
                      type="text"
                      disabled={true}
                      label="Description"
                      name={"description"}
                      value={description}
                      onChange={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={description === "" && isFormSubmitted}
                    />
                    {/* <ErrorMessage
                      name={description}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
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
                        Add Item
                      </Button>
                    ) : (
                      <Button
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        disabled={!validateItemsForm()}
                        onClick={editSelectedItem}
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

          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 60, height: 40, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
