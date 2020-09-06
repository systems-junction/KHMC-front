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
  getSearchedNonPharmaceuticalItemsUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
  getCurrentQtyForBUUrl,
  getFUFromBUUrl,
  getCurrentQtyForFURepRequestUrl,
} from "../../public/endpoins";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

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

const orderByArray = [
  { key: "Doctor", value: "Doctor" },
  { key: "Nurse", value: "Nurse" },
  { key: "Clinical Pharmacist", value: "Clinical Pharmacist" },
  { key: "Admin", value: "Admin" },
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
    borderRadius: 5,
    backgroundColor: "#2C6DDD",
    // width: "140px",
    height: "54px",
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

  forTableCell: {
    color: "black",
    fontSize: 14,
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

    item: "",

    orderFor: "",
    orderBy: "Admin",
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
          if (key === "itemId") {
            dispatch({ field: "itemId", value: val._id });
            // dispatch({ field: "currentQty", value: val.currQty });
            // dispatch({ field: "requestedQty", value: val.requestedQty });
            // dispatch({ field: "comments", value: val.comments });
            // dispatch({ field: "description", value: val.description });
            dispatch({ field: "itemName", value: val.name });
            dispatch({ field: "itemCode", value: val.itemCode });
            dispatch({ field: "itemType", value: val.cls });
            dispatch({ field: "issueUnit", value: val.issueUnit });
            dispatch({ field: "receiptUnit", value: val.receiptUnit });
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

          orderFor: "Non Medical",
          orderBy,
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
          requestedItems = [
            ...requestedItems,
            {
              itemId: requestedItemsArray[i].itemId._id,
              currentQty: requestedItemsArray[i].currentQty,
              requestedQty: requestedItemsArray[i].requestedQty,
              status: requestedItemsArray[i].status,
              secondStatus: requestedItemsArray[i].secondStatus,
            },
          ];
        }
        const obj = {
          _id,
          requestNo,
          generatedBy,
          dateGenerated,
          generated,
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
          orderFor,
          orderBy,
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // if (e.target.value.length >= 3) {
    axios
      .get(getSearchedNonPharmaceuticalItemsUrl + "/" + e.target.value)
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
        // setOpenNotification(true);
        // setErrorMsg("Error while adding the purchase request");
      });
    // }
  };

  const getCurrentQty = (id) => {
    const params = {
      itemId: id,
      // buId: buObj._id,
      fuId: fuArray[0]._id,
    };
    console.log("parasm", params);
    axios
      .post(getCurrentQtyForFURepRequestUrl, params)
      .then((res) => {
        if (res.data.success) {
          // console.log("received qty", res.data.data.qty);
          dispatch({ field: "currentQty", value: res.data.data.qty });
        }
      })
      .catch((e) => {
        // console.log("error after adding purchase request", e);
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
    dispatch({ field: "itemType", value: i.cls });
    dispatch({ field: "vendorId", value: i.vendorId });
    dispatch({ field: "description", value: i.description });
    dispatch({ field: "maximumLevel", value: i.maximumLevel });
    dispatch({ field: "issueUnit", value: i.issueUnit });
    dispatch({ field: "receiptUnit", value: i.receiptUnit });

    const obj = {
      itemCode: i.itemCode,
    };

    setSelectedItemsArray((pervState) => [...pervState, obj]);
    setSearchQuery("");
  }

  function validateItemsForm() {
    return (
      itemCode !== "" &&
      description !== "" &&
      itemName !== "" &&
      requestedQty !== "" &&
      requestedQty !== "0" &&
      // && fuItemCost !== ""
      // currentQty.length > 0 &&
      maximumLevel >= requestedQty
      //  &&requestedQty < currentQty
    );
  }

  function hideDialog() {
    setDialogOpen(false);
    setSelectedItem("");
    setSelectItemToEditId("");

    dispatch({ field: "itemId", value: "" });
    dispatch({ field: "itemCode", value: "" });
    dispatch({ field: "itemName", value: "" });
    dispatch({ field: "itemType", value: "" });
    dispatch({ field: "vendorId", value: "" });
    dispatch({ field: "description", value: "" });
    dispatch({ field: "maximumLevel", value: "" });
    dispatch({ field: "issueUnit", value: "" });
    dispatch({ field: "receiptUnit", value: "" });
    dispatch({ field: "requestedQty", value: "" });
  }

  const addSelectedItem = () => {
    // setIsFormSubmitted(true);
    if (validateItemsForm()) {
      setDialogOpen(false);

      let found =
        requestedItemsArray &&
        requestedItemsArray.find((item) => item.itemId._id === itemId);

      if (found) {
        setOpenNotification(true);
        setErrorMsg("This item has already been added");
      } else {
        dispatch({
          field: "requestedItemsArray",
          value: [
            ...requestedItemsArray,
            {
              itemId: {
                _id: itemId,
                itemCode,
                name: itemName,
                cls: itemType,
                vendorId,
                description,
                maximumLevel,
                issueUnit,
                receiptUnit,
              },
              requestedQty,
              currentQty,
              status: "pending",
              secondStatus: "pending",
            },
          ],
        });
      }
    }

    dispatch({ field: "itemId", value: "" });
    dispatch({ field: "itemCode", value: "" });
    dispatch({ field: "itemName", value: "" });
    dispatch({ field: "itemType", value: "" });
    dispatch({ field: "vendorId", value: "" });
    dispatch({ field: "description", value: "" });
    dispatch({ field: "maximumLevel", value: "" });
    dispatch({ field: "issueUnit", value: "" });
    dispatch({ field: "receiptUnit", value: "" });
    dispatch({ field: "requestedQty", value: "" });
    dispatch({ field: "currentQty", value: "" });
  };

  const editSelectedItem = () => {
    if (validateItemsForm()) {
      setDialogOpen(false);
      let temp = [];

      for (let i = 0; i < requestedItemsArray.length; i++) {
        if (
          requestedItemsArray[i].itemId._id === selectItemToEditId.itemId._id
        ) {
          let obj = {
            itemId: {
              _id: requestedItemsArray[i].itemId._id,
              itemCode,
              name: itemName,
              cls: itemType,
              vendorId,
              description,
              maximumLevel,
              issueUnit,
              receiptUnit,
            },
            requestedQty,
            currentQty,
            status: requestedItemsArray[i].status,
            secondStatus: requestedItemsArray[i].secondStatus,
          };
          temp[i] = obj;
        } else {
          temp = [...temp, requestedItemsArray[i]];
        }
      }

      dispatch({
        field: "requestedItemsArray",
        value: temp,
      });
    }

    setDialogOpen(false);
    setSelectedItem("");
    setSelectItemToEditId("");

    dispatch({ field: "itemId", value: "" });
    dispatch({ field: "itemCode", value: "" });
    dispatch({ field: "itemName", value: "" });
    dispatch({ field: "itemType", value: "" });
    dispatch({ field: "vendorId", value: "" });
    dispatch({ field: "description", value: "" });
    dispatch({ field: "maximumLevel", value: "" });
    dispatch({ field: "issueUnit", value: "" });
    dispatch({ field: "receiptUnit", value: "" });
    dispatch({ field: "requestedQty", value: "" });
  };

  function handleItemDelete(item) {
    if (item.status === "pending") {
      let temp = requestedItemsArray.filter(
        (i) => i.itemId._id !== item.itemId._id
      );

      dispatch({
        field: "requestedItemsArray",
        value: [...temp],
      });
    } else {
      setOpenNotification(true);
      setErrorMsg("Items can not be deleted once they are in progess");
    }
  }

  function handleRequestedItemEdit(i) {
    if (i.status === "pending") {
      setDialogOpen(true);
      setSelectedItem(i);
      setSelectItemToEditId(i);
      // dispatch({ field: "itemId", value: "" });
      dispatch({ field: "itemCode", value: i.itemId.itemCode });
      dispatch({ field: "itemName", value: i.itemId.name });
      dispatch({ field: "itemType", value: i.itemId.cls });
      dispatch({ field: "vendorId", value: i.itemId.vendorId });
      dispatch({ field: "description", value: i.itemId.description });
      dispatch({ field: "maximumLevel", value: i.itemId.maximumLevel });
      dispatch({ field: "issueUnit", value: i.itemId.issueUnit });
      dispatch({ field: "receiptUnit", value: i.itemId.receiptUnit });
      dispatch({ field: "currentQty", value: i.currentQty });
      dispatch({ field: "requestedQty", value: i.requestedQty });
    } else {
      setOpenNotification(true);
      setErrorMsg("Item can not be updated once it is in progess");
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
                ? " Add Professional Order"
                : comingFor === "edit"
                ? " Update Professional Order"
                : comingFor === "view"
                ? "Professional Request Order"
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
            {comingFor === "edit" || comingFor === "view" ? (
              <div className="row">
                <div
                  className="col-md-5"
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
                </div>

                <div
                  className="col-md-4"
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
                </div>

                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Order Type</InputLabelComponent> */}
                  <TextField
                    className="textInputStyle"
                    disabled={true}
                    value={"Non Medical Order"}
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

            {/* {comingFor === "edit" || comingFor === "view" ? (
                <div className="col-md-4">
                  <div style={styles.inputContainerForDropDown}>
                    <InputLabelComponent>Generated</InputLabelComponent>
                    {generatedArray &&
                      generatedArray.map((val) => {
                        if (generated === val.key) {
                          return (
                            <input
                              className="textInputStyle"
                              disabled={true}
                              value={val.key}
                            />
                          );
                        }
                      })}
                  </div>
                </div>
              ) : (
                undefined

              )} */}

            <div className="row">
              {comingFor === "edit" || comingFor === "view" ? (
                <>
                  <div
                    className={"col-md-4"}
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {/* <InputLabelComponent>Date Generated</InputLabelComponent> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        inputVariant="filled"
                        onChange={onChangeDate}
                        // disabled={true}
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
                        // variant="filled"
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

                    {/* <ErrorMessage
                      name={fuId}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>
                </>
              ) : (
                undefined
              )}

              <div
                className={comingFor === "edit" ? "col-md-4" : "col-md-12"}
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Form*</InputLabelComponent> */}
                <TextField
                  required
                  select
                  fullWidth
                  id="orderBy"
                  name="orderBy"
                  value={orderBy}
                  onChange={onChangeValue}
                  label="Order By"
                  variant="filled"
                  // className="dropDownStyle"
                  // input={<BootstrapInput />}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  error={secondStatus === "" && isFormSubmitted}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {orderByArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
                </TextField>

                {/* {form === "" && isFormSubmitted ? (
                      <ErrorMessage
                        name={form}
                        isFormSubmitted={isFormSubmitted}
                      />
                    ) : (
                      undefined
                    )} */}

                {/* <div style={styles.inputContainerForDropDown}>
                  <InputLabelComponent>Order By*</InputLabelComponent>
                  <Select
                    fullWidth
                    id="orderBy"
                    name="orderBy"
                    value={orderBy}
                    onChange={onChangeValue}
                    label="Order By"
                    className="dropDownStyle"
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {orderByArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <ErrorMessage
                    name={secondStatus}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div> */}
              </div>

              {/* <div
                className={comingFor === "edit" ? "col-md-3" : "col-md-6"}
                style={styles.inputContainerForTextField}
              >
                <InputLabelComponent id="status-label">
                  Patient MRN*
                </InputLabelComponent>
                <input
                  disabled={
                    currentUser &&
                    currentUser.staffTypeId.type === "BU Member" &&
                    comingFor &&
                    comingFor !== "view"
                      ? false
                      : true
                  }
                  type="text"
                  placeholder="Patient MRN"
                  name={"patientReferenceNo"}
                  value={patientReferenceNo}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
                <ErrorMessage
                  name={patientReferenceNo}
                  isFormSubmitted={isFormSubmitted}
                />
              </div> */}
            </div>

            <div className="row">
              <div
                className="col-md-12 col-sm-12 col-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <span class="fa fa-search"></span> */}
                <TextField
                  id="comments"
                  variant="filled"
                  type="text"
                  label="Notes/Comments"
                  name={"comments"}
                  //  value={searchQuery}
                  //  onChange={handleSearch}
                  className={classes.margin}
                  variant="filled"
                  InputProps={{
                    // endAdornment: (
                    //   <InputAdornment position="end">
                    //     <AccountCircle />
                    //   </InputAdornment>
                    // ),
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  className="textInputStyle"
                />
              </div>
              {/* <div
                className="col-md-12"
                style={styles.inputContainerForTextField}
              >
                <InputLabelComponent>Comments</InputLabelComponent>
                <input
                  type="text"
                  disabled={
                    currentUser &&
                    currentUser.staffTypeId.type === "BU Member" &&
                    comingFor &&
                    comingFor !== "view"
                      ? false
                      : true
                  }
                  rows={4}
                  placeholder="Notes/Comments"
                  name={"comments"}
                  value={comments}
                  onChange={onChangeValue}
                  className="textInputStyle"
                /> */}

              {/* <ErrorMessage
                  name={comments}
                  isFormSubmitted={isFormSubmitted}
                /> */}
            </div>

            <div style={{ marginTop: 30 }}>
              <h3 style={{ color: "white", fontWeight: "700" }}>
                Add New Item
              </h3>
              <div className="row">
                <div className="col-sm-12" style={styles.textFieldPadding}>
                  <TextField
                    className="textInputStyle"
                    id="searchQuery"
                    type="text"
                    variant="filled"
                    label="Search Items by name or code"
                    name={"searchQuery"}
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <AccountCircle />
                      //   </InputAdornment>
                      // ),
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    InputLabelProps={{
                      className: classes.label,
                      classes: { label: classes.label },
                    }}
                  />
                </div>
                {/* <div
                  className="col-md-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Search</InputLabelComponent>

                  <input
                    type="text"
                    placeholder="Search Items by name or code"
                    name={"searchQuery"}
                    value={searchQuery}
                    onChange={handleSearch}
                    className="textInputStyle"
                  />
                </div> */}
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
                              <TableCell
                                align="center"
                                style={styles.forTableCell}
                              >
                                Name
                              </TableCell>
                              <TableCell
                                align="center"
                                style={styles.forTableCell}
                              >
                                Item Code
                              </TableCell>
                              {/* <TableCell
                                align="center"
                                style={styles.forTableCell}
                              >
                                Class
                              </TableCell> */}
                              <TableCell
                                align="center"
                                style={styles.forTableCell}
                              >
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
                                  <TableCell align="center">{i.name}</TableCell>
                                  <TableCell align="center">
                                    {i.itemCode}
                                  </TableCell>
                                  {/* <TableCell align="center">
                                    {i.cls === "non_medical"
                                      ? "Non Medical"
                                      : ""}
                                  </TableCell> */}
                                  <TableCell align="center">
                                    {i.description}
                                  </TableCell>
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
                {/* <div
                      className="col-md-4"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Code*</InputLabelComponent>
                      <input
                        type="text"
                        disabled={true}
                        placeholder="Item Code"
                        name={"itemCode"}
                        value={itemCode}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />

                      <ErrorMessage
                        name={itemCode}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div> */}

                {/* <div
                      className="col-md-4"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Type*</InputLabelComponent>

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

                      <ErrorMessage
                        name={itemType}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div> */}
                <div
                  className="col-md-4 col-sm-4 col-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Item Name*</InputLabelComponent> */}

                  <TextField
                    required
                    id="itemName"
                    type="text"
                    disabled={true}
                    label="itemName"
                    name={"itemName"}
                    value={itemName}
                    onChange={onChangeValue}
                    variant="filled"
                    className="textInputStyle"
                    error={itemName === "" && isFormSubmitted}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
                <div
                  className="col-md-4 col-sm-4 col-4"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <InputLabelComponent>Requested Qty*</InputLabelComponent> */}
                  {/* <span class="fa fa-search"></span> */}
                  <TextField
                    required
                    id="comments"
                    variant="filled"
                    type="number"
                    label="Req Qty"
                    name={"requestedQty"}
                    value={requestedQty}
                    onChange={onChangeValue}
                    className={classes.margin}
                    variant="filled"
                    className="textInputStyle"
                    InputProps={{
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <AccountCircle />
                      //   </InputAdornment>
                      // ),
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    error={requestedQty === "" && isFormSubmitted}
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
                  className=" col-sm-4"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Requested Qty*</InputLabelComponent>
                  <input
                    type="number"
                    placeholder="Req Qty"
                    name={"requestedQty"}
                    value={requestedQty}
                    onKeyDown={(evt) => {
                      (evt.key === "e" ||
                        evt.key === "E" ||
                        evt.key === "-" ||
                        evt.key === "+") &&
                        evt.preventDefault();
                    }}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                  <ErrorMessage
                    name={requestedQty}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div> */}

                <div
                  className="col-md-4 col-sm-4 col-4"
                  style={styles.inputContainerForTextField}
                >
                  {/* <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                  <Button onClick={() => hideDialog()} variant="contained">
                    Cancel
                  </Button>
                </div> */}

                  {selectItemToEditId === "" ? (
                    // <Button
                    //   style={{ paddingLeft: 30, paddingRight: 30 }}
                    //   disabled={!validateItemsForm()}
                    //   onClick={addSelectedItem}
                    //   variant="contained"
                    //   color="primary"
                    // >
                    //   Add Item
                    // </Button>
                    <Button
                      disabled={!validateItemsForm()}
                      onClick={addSelectedItem}
                      style={{ ...styles.stylesForButton }}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      <strong>Add Item</strong>
                    </Button>
                  ) : (
                    // <Button
                    //   onClick={addSelectedItem}
                    //   style={{ ...styles.stylesForButton }}
                    //   variant="contained"
                    //   color="primary"
                    //   fullWidth
                    //   disabled={!validateItemsForm()}
                    // >
                    //   <strong>Add Item</strong>
                    // </Button>
                    // <Button
                    //   style={{ paddingLeft: 30, paddingRight: 30 }}
                    //   disabled={!validateItemsForm()}
                    //   onClick={editSelectedItem}
                    //   variant="contained"
                    //   color="primary"
                    // >
                    //   {" "}
                    //   Edit Item{" "}
                    // </Button>

                    <Button
                      onClick={editSelectedItem}
                      style={{ ...styles.stylesForButton }}
                      variant="contained"
                      color="primary"
                      disabled={!validateItemsForm()}
                      fullWidth
                    >
                      <strong>Edit Item</strong>
                    </Button>
                  )}
                </div>
              </div>

              {/* <div className="row">
                <div
                  className="col-md-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Description*</InputLabelComponent>

                  <input
                    type="text"
                    disabled={true}
                    placeholder="Description"
                    name={"description"}
                    value={description}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                  <ErrorMessage
                    name={description}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div> */}
            </div>

            {requestedItemsArray && (
              <div className="row">
                <h5
                  style={{
                    color: "white",
                    marginTop: 10,
                    marginBottom: 10,
                    fontWeight: "700",
                    borderRadius: "5px",
                  }}
                >
                  Items Ordered
                </h5>
                <TableForAddedItems
                  items={requestedItemsArray}
                  onDelete={handleItemDelete}
                  onEdit={handleRequestedItemEdit}
                />
              </div>
            )}

            {/* {comingFor === "edit" &&
            (currentUser.staffTypeId.type === "admin" ||
              currentUser.staffTypeId.type === "FU Member" ||
              currentUser.staffTypeId.type === "FU Incharge" ||
              currentUser.staffTypeId.type === "BU Nurse" ||
              currentUser.staffTypeId.type === "BU Inventory Keeper") ? (
              <div className="row">
                <div className="col-md-6">
                  <div style={styles.inputContainerForDropDown}>
                    <InputLabelComponent>Status*</InputLabelComponent>
                    {currentUser.staffTypeId.type === "FU Member" ? (
                      <>
                        <Select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          className="dropDownStyle"
                          input={<BootstrapInput />}
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
                        </Select>
                        <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        />
                      </>
                    ) : currentUser.staffTypeId.type === "FU Incharge" ? (
                      <>
                        <Select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          className="dropDownStyle"
                          input={<BootstrapInput />}
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
                        </Select>
                        <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        />
                      </>
                    ) : currentUser.staffTypeId.type === "BU Nurse" ? (
                      <>
                        <Select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          className="dropDownStyle"
                          input={<BootstrapInput />}
                        >
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
                        </Select>
                        <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        />
                      </>
                    ) : currentUser.staffTypeId.type ===
                      "BU Inventory Keeper" ? (
                      <>
                        <Select
                          fullWidth
                          id="secondStatus"
                          name="secondStatus"
                          value={secondStatus}
                          onChange={onChangeValue}
                          label="Status"
                          className="dropDownStyle"
                          input={<BootstrapInput />}
                        >
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
                        </Select>
                        <ErrorMessage
                          name={secondStatus}
                          isFormSubmitted={isFormSubmitted}
                        />
                      </>
                    ) : (
                      undefined
                    )}
                  </div>
                </div>

                <div
                  className="col-md-6"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Comment Note</InputLabelComponent>
                  <input
                    type="text"
                    placeholder="Comment Note"
                    name={"commentNote"}
                    value={commentNote}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>
            ) : (
              undefined
            )} */}

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
                {/* {comingFor === "add" ||
                (currentUser &&
                  currentUser.staffTypeId.type === "BU Member") ? (
          
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
                )} */}
              </div>
            </div>

            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              {/* <div
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
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Generate Professional Request
                  </Button>
                ) : comingFor === "edit" ? (
                  <Button
                    style={{ width: "60%" }}
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
              </div> */}

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
                    Generate Professional Order
                  </Button>
                ) : comingFor === "edit" ? (
                  <Button
                    style={styles.stylesForPurchaseButton}
                    // disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Update Professional Order
                  </Button>
                ) : comingFor === "view" ? (
                  undefined
                ) : (
                  undefined
                )}
              </div>
            </div>

            <Notification msg={errorMsg} open={openNotification} />

            {/* <Dialog
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
                  Add Item
                </DialogTitle> */}

            {/* </DialogContent>
            </Dialog> */}

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
