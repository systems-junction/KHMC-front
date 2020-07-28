/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import InputLabelComponent from "../../components/InputLabel/inputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import "./PurchaseOrders.css";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import {
  addPurchaseOrderUrl,
  getPurchasingRequestItemUrl,
  getShippingTermUrl,
  updatePurchaseOrderUrl,
} from "../../public/endpoins";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import purchase_order from "../../assets/img/Purchase Order.png";
import view_all from "../../assets/img/Eye.png";
import Back from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import AddPurchaseRequest from "./modalForPurchaseRequest";
import PurchaseRequest from "../PurchaseRequest/purchaseRequest.jsx";
import { Redirect } from "react-router-dom";

import AddedPurchaseRequestTable from "./addedPurchaseRequestTable";
import ViewItem from "./viewItem";
import BootstrapInput from "../../components/Dropdown/dropDown.js";

const tableHeading = [
  "Request No",
  "Date",
  "Generated By",
  "Vendor",
  "Status",
  "Action",
];
const tableDataKeys = [
  "requestNo",
  "createdAt",
  "generatedBy",
  ["vendorId", "englishName"],
  "status",
];

const tableHeadingForPR = [
  "Request No",
  "Generated By",
  "Vendor",
  "Status",
  "Action",
];
const tableDataKeysForPR = [
  "requestNo",
  "generated",
  "vendorId",
  "committeeStatus",
];

const actions = { add: true };

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   marginLeft: 5,
  //   marginRight: 5
  // },

  // buttonContainer: {
  //   marginTop: 25
  // }
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2c6ddd",
    width: "115px",
    height: "40px",
    outline: "none",
  },
  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2c6ddd",
    width: "60%",
    height: "40px",
    outline: "none",
  },
  stylesForPurchaseButton2: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2c6ddd",
    height: "40px",
    outline: "none",
  },

  inputContainerForTextField: {
    marginTop: 25,
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
};

const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

const statusArray = [
  { key: "reject", value: "Reject" },
  { key: "hold", value: "Hold" },
  { key: "modify", value: "Modify" },
  { key: "approved", value: "Approved" },
];

const generatedArrayForPO = [
  { key: "Manual", value: "Manual" },
  { key: "System", value: "System" },
];

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

  const initialState = {
    _id: "",
    purchaseOrderNo: "",
    generated: "Manual",
    status: "po_created",
    paymentTerm: "",
    shippingTerm: "",

    generatedBy: "",

    purchaseRequest: [],

    date: new Date(),
    vendorId: "",
    name: "",
    description: "",
    comments: "",
    vendors: [],
    statues: [],

    committeeStatus: "",
    purchaseRequestId: [],
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
    purchaseOrderNo,
    generated,
    purchaseRequest,
    generatedBy,

    paymentTerm,
    shippingTerm,

    date,
    vendorId,
    status,
    vendors,
    statues,

    purchaseRequestId,

    committeeStatus,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "date", value });
  };

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

  const [openPRDialog, setOpenPRDialog] = useState(false);

  const [addedPurchaseRequest, setPurchaseRequest] = useState("");

  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    if (props.history.location.state.pr) {
      dispatch({
        field: "purchaseRequest",
        value: props.history.location.state.pr,
      });
    }

    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setGeneratedArray(props.history.location.state.generatedArray);

    setPaymentTermsArray(props.history.location.state.paymentTerms);

    const selectedRec = props.history.location.state.selectedItem;

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (key === "purchaseRequestId") {
          console.log("PR", val);
          dispatch({ field: "purchaseRequest", value: val });
        }
        if (val && typeof val === "object") {
          dispatch({ field: key, value: val._id });
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
  }, []);

  const handleAdd = () => {
    if (validateForm()) {
      // let v;

      let purchaseRequestIdArray = [];
      for (let i = 0; i < purchaseRequest.length; i++) {
        purchaseRequestIdArray.push(purchaseRequest[i]._id);
      }

      let params = {
        // vendorId,
        status,
        // paymentTerm,
        generated,
        purchaseRequestId: purchaseRequestIdArray,
        generatedBy: currentUser.name,
        // shippingTerm,
        date: new Date(),
        vendorId: purchaseRequest[0].vendorId._id,
        // vendorEmail: v.contactEmail,
        // vendorPhoneNo: v.telephone1,
        // vendorAddress: v.address,
      };
      axios
        .post(addPurchaseOrderUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding purchase order", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the purchase order");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    // console.log("purchase request", purchaseRequest);
    if (validateForm()) {
      let temp = [];

      for (let i = 0; i < purchaseRequest.length; i++) {
        temp.push({ id: purchaseRequest[i]._id });
      }

      let params = "";

      if (currentUser.staffTypeId.type === "Committe Member") {
        // if (
        //   currentUser.permission.add === false &&
        //   currentUser.permission.edit === true
        // ) {
        params = {
          _id,
          status,
          generated,
          purchaseRequestId: purchaseRequest,
          generatedBy: generatedBy,
          date: new Date(),
          vendorId: vendorId,
          sentAt: "",
          committeeStatus:
            currentUser.staffTypeId.type === "Committe Member"
              ? committeeStatus
              : "po_created",

          // committeeStatus:
          //  ( currentUser.permission.add === false &&
          //   currentUser.permission.edit === true)
          //     ? committeeStatus
          //     : "po_created",
          prId: temp,
        };
      } else {
        params = {
          _id,
          status,
          generated,
          purchaseRequestId: purchaseRequest,
          generatedBy: generatedBy,
          date: new Date(),
          vendorId: vendorId,
          sentAt: "",
          committeeStatus:
            currentUser.staffTypeId.type === "Committe Member"
              ? committeeStatus
              : "po_created",

          // committeeStatus:
          //   currentUser.permission.add === false &&
          //   currentUser.permission.edit === true
          //     ? committeeStatus
          //     : "po_created",
        };
      }

      axios
        .put(updatePurchaseOrderUrl, params)
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

  function validateForm() {
    return (
      // vendorId.length > 0 &&
      // status.length > 0 &&
      // shippingTerm.length > 0 &&
      // paymentTerm.length > 0 &&
      // generated.length > 0
      purchaseRequest && purchaseRequest !== ""
    );
  }

  function handleAddPR(prArray) {
    // if (prArray.length === 0) {
    //   setOpenPRDialog(false);
    // }
    // else {

    dispatch({ field: "purchaseRequest", value: prArray });
    setOpenPRDialog(false);
    console.log("PR Array", prArray);
    // }
  }

  function viewItem(item) {
    if (item !== "") {
      console.log("called", item);
      setOpenItemDialog(true);
      setItem(item.item);
    } else {
      setOpenItemDialog(false);
      setItem("");
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
            <img src={purchase_order} />
            <h4>
              {comingFor === "add"
                ? " Add Purchase Order"
                : " Edit Purchase Order"}
            </h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img className="icon-view" src={view_all} />
              &nbsp;&nbsp;
              <strong style={{ fontSize: "12px" }}>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: 25 }} className="row">
            <div className="col-md-4" style={styles.inputContainerForTextField}>
              <InputLabelComponent>PO No*</InputLabelComponent>
              <input
                disabled={true}
                // type="number"
                placeholder="PO No"
                name={"purchaseOrderNo"}
                value={purchaseOrderNo}
                onChange={onChangeValue}
                className="textInputStyle"
              />
            </div>

            <div className="col-md-4" style={styles.inputContainerForDropDown}>
              <InputLabelComponent>Generated*</InputLabelComponent>
              <div>
                <Select
                  fullWidth
                  disabled={true}
                  id="generated"
                  name="generated"
                  value={generated}
                  onChange={onChangeValue}
                  label="Generated"
                  className="dropDownStyle"
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {generatedArrayForPO &&
                    generatedArrayForPO.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
            </div>

            <div className="col-md-4" style={styles.inputContainerForTextField}>
              <InputLabelComponent>Super admin*</InputLabelComponent>
              <input
                disabled={true}
                // type="text"
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
              />
            </div>
          </div>

          {comingFor === "edit" &&
          (currentUser.staffTypeId.type === "admin" ||
            currentUser.staffTypeId.type === "Committe Member") ? (
            <div className="col-md-12" style={styles.inputContainerForDropDown}>
              <InputLabelComponent>Status</InputLabelComponent>
              {currentUser.staffTypeId.type === "Committe Member" ? (
                <Select
                  fullWidth
                  id="committeeStatus"
                  name="committeeStatus"
                  value={committeeStatus}
                  onChange={onChangeValue}
                  label="Status"
                  className="dropDownStyle"
                  input={<BootstrapInput />}
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
                </Select>
              ) : (
                <Select
                  fullWidth
                  id="status"
                  name="status"
                  value={status}
                  onChange={onChangeValue}
                  label="Status"
                  className="dropDownStyle"
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {statues.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
          ) : (
            undefined
          )}

          {/* {comingFor === "edit" &&

          currentUser.permission.edit ? (
            <div className="col-md-12" style={styles.inputContainerForDropDown}>
              <InputLabelComponent>Status</InputLabelComponent>
              {!currentUser.permission.add && currentUser.permission.edit ? (
                <Select
                  fullWidth
                  id="committeeStatus"
                  name="committeeStatus"
                  value={committeeStatus}
                  onChange={onChangeValue}
                  label="Status"
                  className="dropDownStyle"
                  input={<BootstrapInput />}
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
                </Select>
              ) : (
                <Select
                  fullWidth
                  id="status"
                  name="status"
                  value={status}
                  onChange={onChangeValue}
                  label="Status"
                  className="dropDownStyle"
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {statues.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
          ) : (
            undefined
          )} */}

          <AddPurchaseRequest
            handleAddPR={handleAddPR}
            openPRDialog={openPRDialog}
            history={props.history}
          />

          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 50,
                justifyContent: "flex-end",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              {comingFor === "add" ? (
                <Button
                  style={styles.stylesForPurchaseButton2}
                  //className='purchaseStyle'
                  // disabled={!validateForm()}
                  onClick={() => setOpenPRDialog(true)}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>
                    Add Purchase Request
                  </strong>
                </Button>
              ) : (
                // <Button
                //   style={{ width: "60%" }}
                //   disabled={!validateForm()}
                //   onClick={handleEdit}
                //   variant="contained"
                //   color="primary"
                // >
                //   Edit Purchase Request
                // </Button>
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
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>
                    {" "}
                    Add Purchase Order
                  </strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>
                    Update Purchase Order
                  </strong>
                </Button>
              )}
            </div>
          </div>

          {purchaseRequest.length !== 0 ? (
            <AddedPurchaseRequestTable
              tableData={purchaseRequest}
              vendors={vendors}
              tableDataKeys={tableDataKeysForPR}
              tableHeading={tableHeadingForPR}
              // action={actions}
              viewItem={viewItem}
              borderBottomColor={"#60d69f"}
              borderBottomWidth={20}
            />
          ) : (
            undefined
          )}

          {openItemDialog ? (
            <ViewItem
              item={item}
              openItemDialog={openItemDialog}
              viewItem={viewItem}
            />
          ) : (
            undefined
          )}

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back}
              style={{ width: 45, height: 35, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
