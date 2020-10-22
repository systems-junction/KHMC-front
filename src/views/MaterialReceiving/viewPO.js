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
  addMaterialReceivingUrl,
  updateMaterialReceivingUrl,
  getSingleMaterialReceivingUrl,
} from "../../public/endpoins";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import VIewAll from "../../assets/img/view_all.png";
import business_Unit from "../../assets/img/Receive Item.png";
import view_all from "../../assets/img/Eye.png";
import Back from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AddedPurchaseRequestTable from "../PurchaseOrders/addedPurchaseRequestTable";
import ViewItems from "./viewItems";

import ViewSingleItem from "../PurchaseOrders/viewItem";

const tableHeadingForPR = [
  "Purchase Request No",
  "Date/Time",
  "Status",
  "Action",
];
const tableDataKeysForPR = [
  ["id", "requestNo"],
  ["id", "createdAt"],
  "statusForPR",
];

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   paddingLeft: 5,
  //   paddingRight: 5,
  // },

  // buttonContainer: {
  //   marginTop: 25,
  // },

  // inputContainerForTextField: {
  //   marginTop: 25,
  // },
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },

  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  buttonContainer: {
    marginTop: 25,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },
};

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
});

// const useStyles = makeStyles(tableStyles)
const useStyles = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:disabled": {
      color: "gray",
    },
  },
  multilineColor: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:hover": {
      backgroundColor: "white",
    },
    "&:after": {
      borderBottomColor: "black",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));

const DATE = new Date();

const time = DATE.getHours();

function AddEditPurchaseRequest(props) {
  const classes = useStyles();
  const classesForTabs = useStylesForTabs();

  const initialState = {
    _id: "",
    itemCode: "",
    itemName: "",
    prId: "",
    poId: "",
    vendorId: "",
    status: "",
    poSentDate: "",
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
    prId,
    poId,
    vendorId,
    status,
    poSentDate,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "poSentDate", value });
  };

  function validateForm() {
    // return (
    //   vendorId.length > 0 &&
    //   status.length > 0 &&
    //   poId.length > 0 &&
    //   prId.length > 0 &&
    //   itemName.length > 0 &&
    //   itemCode.length > 0 &&
    //   poSentDate !== ""
    // );

    return true;
  }

  const [comingFor, setcomingFor] = useState("");

  const [vendorsArray, setVendors] = useState("");

  const [statues, setStatusArray] = useState("");

  const [purchaseRequest, setPurchaseRequests] = useState([]);

  const [purchaseOrders, setPurchaseOrders] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  const [vendors, setVendor] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [value, setValue] = React.useState(1);

  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [item, setItem] = useState("");

  const [selectedItem, setSelectedItem] = useState("");

  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState("");

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setStatusArray(props.history.location.state.statues);

    setPurchaseRequests(props.history.location.state.purchaseRequests);

    setPurchaseOrders(props.history.location.state.purchaseOrders);

    const selectedRec = props.history.location.state.selectedItem;

    setSelectedItem(props.history.location.state.selectedItem);

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          if (key === "prId") {
            var temp = [];
            for (let i = 0; i < val.length; i++) {
              const obj = {
                ...val[i],
                statusForPR: val[i].id.status,
              };
              temp.push(obj);
            }
            dispatch({ field: key, value: temp });
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

    getSingleMaterialReceiving();
  }, []);

  function getSingleMaterialReceiving() {
    axios
      .get(
        getSingleMaterialReceivingUrl +
          "/" +
          props.history.location.state.selectedItem._id
      )
      .then((res) => {
        if (res.data.success) {
          console.log("response after getting the PO details", res.data.data);
          setPurchaseOrderDetails(res.data.data.poId.purchaseRequestId);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function viewItem(item) {
    if (item !== "") {
      setOpenItemDialog(true);
      setItem(item.id.item);
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
      <Header history={props.history}/>

      <div className={`cPadding`}>
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Order Receiving / Return</h4>
          </div>

          {/* <div>
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
          </div> */}
        </div>

        {/* <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="null"
            centered
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 0 ? "#2c6ddd" : undefined,
              }}
              label="PO Details"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 1 ? "#2c6ddd" : undefined,
              }}
              label="Items"
            />
          </Tabs>
        </div> */}

        {value === 0 ? (
          <div
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              // marginTop: "25px",
            }}
            className="container-fluid"
          >
            {/* <div className="row">
              <div
                className="col-md-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label="Item Name"
                  name={"itemName"}
                  value={poId && poId.purchaseOrderNo}
                  // error={poId.purchaseOrderNo === '' && isFormSubmitted}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    disabled={true}
                    label="Date/Time Generated"
                    inputVariant="filled"
                    onChange={onChangeDate}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    value={poId.createdAt}
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    disabled={true}
                    label="Date/Time Sent"
                    inputVariant="filled"
                    onChange={onChangeDate}
                    fullWidth
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    value={poId.sentAt}
                  />
                </MuiPickersUtilsProvider>
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
                  disabled={true}
                  label="Generated"
                  name={"itemName"}
                  value={poId && poId.generated}
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
                  label=" Vendor Name"
                  name={"itemName"}
                  value={selectedItem && selectedItem.vendorId.englishName}
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
                <TextField
                  disabled={true}
                  label="  Contact Person"
                  name={"itemName"}
                  value={
                    selectedItem && selectedItem.vendorId.contactPersonName
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
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label="Contact Number"
                  name={"itemName"}
                  value={
                    selectedItem && selectedItem.vendorId.contactPersonTelephone
                  }
                  // error={selectedItem.vendorId.contactPersonTelephone === '' && isFormSubmitted}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div> */}

            {/* <div style={{ marginTop:10 }}>
              {prId.length !== 0 ? (
                <AddedPurchaseRequestTable
                  tableData={prId}
                  // vendors={vendorsArray}
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
            </div> */}

            {/* <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div style={styles.buttonContainer}>
            <Button onClick={handleCancel} variant="contained">
             Back
            </Button>
          </div>
          </div> */}

            <div style={{ marginBottom: 20 }}>
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{ width: 45, height: 35, cursor: "pointer" }}
              />
            </div>

            {openItemDialog ? (
              <ViewSingleItem
                item={item}
                openItemDialog={openItemDialog}
                viewItem={viewItem}
              />
            ) : (
              undefined
            )}
          </div>
        ) : (
          <div
            // style={{ flex: 4, display: "flex", flexDirection: "column" , width:'100%'}}
            className="container-fluid"
          >
            <ViewItems
              history={props.history}
              items={purchaseOrderDetails}
              materialReceivingId={selectedItem._id}
            />
            </div>
        )}
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
