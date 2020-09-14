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
import ViewPRItems from "./viewPRItems";

import BootstrapInput from "../../components/Dropdown/dropDown.js";

import ViewAllBtn from "../../components/ViewAllBtn/viewAll";

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
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "180px",
    height: "45px",
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
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  // textFieldPadding: {
  //   paddingLeft: 3,
  //   paddingRight: 3,
  // },

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
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  textFieldPaddingNew: {
    paddingLeft: 15,
    paddingRight: 15,
  },
};

// const useStyles = makeStyles(tableStyles);
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

    selectedVendor: "",
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

    selectedVendor,
    comments,
  } = state;

  const onChangeValue = (e) => {
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        console.log("tested");
        return;
      }
    }
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
  const [openSingleItemDialog, setOpenSingleItemDialog] = useState(false);

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
        if (val && typeof val === "object" && key === "vendorId") {
          dispatch({ field: "selectedVendor", value: val._id });
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
        comments,
      };
      axios
        .post(addPurchaseOrderUrl, params)
        .then((res) => {
          if (res.data.success) {
            // props.history.goBack();
            console.log(res.data);
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Purchase order ${res.data.data.purchaseOrderNo} has been added successfully`,
              },
            });
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding purchase order", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the purchase order");
        });
    } else {
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
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
          comments,
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
          // committeeStatus:
          //   currentUser.staffTypeId.type === "Committe Member"
          //     ? committeeStatus
          //     : "po_created",
          committeeStatus: committeeStatus,
          comments,

          // committeeStatus:
          //   currentUser.permission.add === false &&
          //   currentUser.permission.edit === true
          //     ? committeeStatus
          //     : "po_created",
        };
      }

      console.log("params", params);

      axios
        .put(updatePurchaseOrderUrl, params)
        .then((res) => {
          if (res.data.success) {
            let message = `Purchase order ${res.data.data.purchaseOrderNo} has been updated successfully`;
            if (currentUser.staffTypeId.type === "Committe Member") {
              message = `Purchase order ${res.data.data.purchaseOrderNo} has been set to ${committeeStatus}`;
            }

            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: message,
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

  function validateForm() {
    return (
      // vendorId.length > 0 &&
      // status.length > 0 &&
      // shippingTerm.length > 0 &&
      // paymentTerm.length > 0 &&
      // generated.length > 0
      purchaseRequest.length > 0
    );
  }

  function validateApprovalForm() {
    return (
      committeeStatus !== "approved" &&
      committeeStatus !== "reject" &&
      committeeStatus !== "modify" &&
      committeeStatus !== "hold"
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

  function viewSingleItem(item) {
    setOpenItemDialog(false);
    if (item !== "") {
      console.log("called", item);
      setOpenSingleItemDialog(true);
      setItem(item);
    } else {
      setOpenSingleItemDialog(false);
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
      <div className={"cPadding"}>
        <div className="subheader">
          <div>
            <img src={purchase_order} />
            <h4>
              {comingFor === "add"
                ? " Add Purchase Order"
                : " Edit Purchase Order"}
            </h4>
          </div>

          <ViewAllBtn history={props.history} />
        </div>

        <div className="row">
          <div
            className="col-md-12"
            style={{
              ...styles.inputContainerForTextField,
              ...styles.textFieldPaddingNew,
            }}
          >
            <TextField
              disabled={comingFor === "edit" ? true : false}
              required
              select
              fullWidth
              id="selectedVendor"
              name="selectedVendor"
              value={selectedVendor}
              // error={generated === "" && isFormSubmitted}
              onChange={onChangeValue}
              label="Vendor"
              variant="filled"
              className="dropDownStyle"
              InputProps={{
                className: classes.input,
                classes: { input: classes.input },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {vendorsArray &&
                vendorsArray.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.englishName}
                    </MenuItem>
                  );
                })}
            </TextField>
          </div>
        </div>

        <div
          style={{ flex: 4, display: "flex", flexDirection: "column" }}
          // className="container-fluid"
        >
          {currentUser && currentUser.staffTypeId.type === "Committe Member" ? (
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
                  label="PO No"
                  name={"purchaseOrderNo"}
                  value={purchaseOrderNo}
                  error={purchaseOrderNo === "" && isFormSubmitted}
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
                  disabled={true}
                  select
                  fullWidth
                  id="generated"
                  name="generated"
                  value={generated}
                  error={generated === "" && isFormSubmitted}
                  onChange={onChangeValue}
                  label="Generated"
                  variant="filled"
                  className="dropDownStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
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
                </TextField>
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
                  disabled
                  id="generatedBy"
                  label="Super admin"
                  name={"generatedBy"}
                  value={
                    comingFor === "add"
                      ? currentUser
                        ? currentUser.name
                        : ""
                      : generatedBy
                  }
                  error={generatedBy === "" && isFormSubmitted}
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
            {comingFor === "edit" &&
            (currentUser.staffTypeId.type === "admin" ||
              currentUser.staffTypeId.type === "Committe Member") ? (
              <div
                className="col-md-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <InputLabelComponent>Status</InputLabelComponent> */}
                {currentUser.staffTypeId.type === "Committe Member" ? (
                  <>
                    <TextField
                      required
                      select
                      fullWidth
                      id="committeeStatus"
                      name="committeeStatus"
                      value={committeeStatus}
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

                      {statusArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </>
                ) : (
                  <>
                    <TextField
                      required
                      select
                      fullWidth
                      id="status"
                      name="status"
                      value={status}
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

                      {statues.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </>
                )}
              </div>
            ) : (
              undefined
            )}
            {/* <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 50,
                justifyContent: "center",
                marginTop: "2%",
                marginBottom: "2%",
                 }}
               > */}
            {/* <div
              className="col-md-3 col-sm-3 col-3"
              style={styles.inputContainerForTextField}
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
            </div> */}
          </div>
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

          {comingFor &&
          currentUser &&
          currentUser.staffTypeId.type !== "Committe Member" ? (
            <div style={{ marginTop: 10 }}>
              <AddPurchaseRequest
                handleAddPR={handleAddPR}
                openPRDialog={openPRDialog}
                history={props.history}
                selectedVendor={selectedVendor}
                addedPRs={purchaseRequest}
                comingFor={comingFor}
              />
            </div>
          ) : (
            undefined
          )}

          {/* <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
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
          </div> */}

          {currentUser && currentUser.staffTypeId.type !== "Committe Member" ? (
            <div className="row">
              <div
                className="col-md-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPaddingNew,
                }}
              >
                <TextField
                  // required
                  fullWidth
                  type="text"
                  id="comments"
                  name="comments"
                  value={comments}
                  // error={generated === "" && isFormSubmitted}
                  onChange={onChangeValue}
                  label="Comments/Notes"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  // multiline={true}
                  // rows={3}
                ></TextField>
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
                justifyContent: "flex-end",
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
                  <strong style={{ fontSize: "12px" }}>
                    {" "}
                    Add Purchase Order
                  </strong>
                </Button>
              ) : comingFor === "edit" &&
                currentUser.staffTypeId.type === "Purchasing Manager" ? (
                <Button
                  style={{ ...styles.stylesForPurchaseButton, width: 200 }}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>
                    Update Purchase Order
                  </strong>
                </Button>
              ) : comingFor === "edit" &&
                currentUser.staffTypeId.type === "Committe Member" ? (
                <Button
                  style={{ ...styles.stylesForPurchaseButton, width: 200 }}
                  disabled={validateApprovalForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>
                    Update Purchase Order
                  </strong>
                </Button>
              ) : (
                undefined
              )}
            </div>
          </div>

          {purchaseRequest.length !== 0 ? (
            <div>
              <h6 style={{ color: "white", fontWeight: "700" }}>
                Added Purchase Requests
              </h6>
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
            </div>
          ) : (
            undefined
          )}

          {openItemDialog ? (
            // <ViewItem
            //   item={item}
            //   openItemDialog={openItemDialog}
            //   viewItem={viewItem}
            // />
            <ViewPRItems
              items={item}
              openItemDialog={openItemDialog}
              viewItem={viewItem}
              viewSingleItem={viewSingleItem}
            />
          ) : (
            undefined
          )}

          {openSingleItemDialog ? (
            <ViewItem
              item={item}
              openItemDialog={openSingleItemDialog}
              viewItem={viewSingleItem}
            />
          ) : (
            undefined
          )}

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ marginBottom: 20, marginTop: 20 }}>
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
