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
  updateReceiveRequestsUrl,
  getSingleMaterialReceivingUrl,
} from "../../public/endpoins";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import VIewAll from "../../assets/img/view_all.png";
import business_Unit from "../../assets/img/Purchase Order.png";
import ViewAllBtn from "../../components/ViewAllBtn/viewAll";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AddedPurchaseRequestTable from "../PurchaseOrders/addedPurchaseRequestTable";
import ViewItems from "./viewItems";

import ViewSingleItem from "../PurchaseOrders/viewItem";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";
import dateTimeFormat from "../../constants/dateTimeFormat.js";

const tableHeadingForPR = [
  "Purchase Request No",
  "Date/Time",
  "Status",
  "Action",
];
const tableDataKeysForPR = ["requestNo", "createdAt", "status"];

const generatedArrayForPO = [
  { key: "approve", value: "Approve" },
  { key: "reject", value: "Reject" },
  // {
  //   key: "pending_approval_from_accounts",
  //   value: "Pending approval from accounts",
  // },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
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

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function AddEditPurchaseRequest(props) {
  // const classes = useStyles();
  const classesForTabs = useStylesForTabs();

  const classes = useStyleforinput();

  const initialState = {
    _id: "",
    itemCode: "",
    itemName: "",
    prId: "",
    poId: "",
    status: "",
    poSentDate: "",

    comments: "",

    mrId: "",
    vendorId: "",
    dateTimeReceived: "",
    updatedAt: "",
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

    mrId,
    dateTimeReceived,
    comments,
    updatedAt,
  } = state;

  const onChangeValue = (e) => {
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "poSentDate", value });
  };

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

  const [value, setValue] = React.useState(0);

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
          dispatch({ field: key, value: val });
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

  if (purchaseOrderDetails === "") {
    getSingleMaterialReceiving();
  }

  function getSingleMaterialReceiving() {
    console.log("mr id in funciton", props.history.location.state.mrId);
    axios
      .get(
        getSingleMaterialReceivingUrl + "/" + props.history.location.state.mrId
      )
      .then((res) => {
        if (res.data.success) {
          console.log("response after getting the PO details", res.data.data);

          let temp = [];
          for (
            let i = 0;
            i < res.data.data.poId.purchaseRequestId.length;
            i++
          ) {
            for (
              let j = 0;
              j < res.data.data.poId.purchaseRequestId[i].item.length;
              j++
            ) {
              temp = [...temp, res.data.data.poId.purchaseRequestId[i].item[j]];
            }
          }
          console.log("temp", temp);
          setPurchaseOrderDetails(temp);
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
      console.log(item.item);
      setOpenItemDialog(true);
      setItem(item.item);
    } else {
      setOpenItemDialog(false);
      setItem("");
    }
  }

  const handleEdit = () => {
    setIsFormSubmitted(true);
    console.log("purchase request", purchaseRequest);

    if (!validateForm()) {
      let params = {
        _id,
        mrId: mrId._id,
        vendorId: vendorId._id,
        status,
        comments,
        dateTimeReceived: updatedAt,
      };
      console.log("params for update to be send", params);

      axios
        .put(updateReceiveRequestsUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log("updated", res.data);
            // props.history.goBack();
            props.history.replace({
              pathname: "/home/wms/fus/medicinalorder/success",
              state: {
                message: `Purchase Order ${poId.purchaseOrderNo} has been set to status ${status} successfully`,
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

  function validateForm() {
    return status !== "approve" && status !== "reject";
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
            <img src={business_Unit} />
            <h4>Approve Purchase Order</h4>
          </div>

          <ViewAllBtn history={props.history} />
        </div>

        <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            centered
          >
            <Tab
              style={{
                color: value === 0 ? "#052766" : "#3B988C",
              }}
              label="PO Details"
            />
            <Tab
              style={{
                color: value === 1 ? "#052766" : "#3B988C",
              }}
              label="Items"
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container-fluid"
          >
            <div className="row">
              <div
                className="col-md-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  name={"itemName"}
                  disabled={true}
                  label="PO Number"
                  value={poId.purchaseOrderNo}
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
                    disabled
                    inputVariant="filled"
                    fullWidth={true}
                    // format="MM/dd/yyyy hh:mm a"
                    format={dateTimeFormat}
                    label="Date/Time Generated (DD-MM-YYYY)"
                    style={{ borderRadius: 10, backgroundColor: "white" }}
                    value={poId.createdAt}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
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
                    disabled
                    inputVariant="filled"
                    fullWidth={true}
                    // format="MM/dd/yyyy hh:mm a"
                    format={dateTimeFormat}
                    label="Date/Time Sent (MM-DD-YYYY)"
                    style={{ borderRadius: 10, backgroundColor: "white" }}
                    value={poId.sentAt}
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
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  name={"itemName"}
                  disabled={true}
                  label="Generated"
                  value={poId.generated}
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
                  name={"itemName"}
                  disabled={true}
                  label="Venor Name"
                  value={selectedItem && selectedItem.vendorId.englishName}
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
                  name={"itemName"}
                  disabled={true}
                  label="Contact Person"
                  value={
                    selectedItem && selectedItem.vendorId.contactPersonName
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
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  name={"itemName"}
                  disabled={true}
                  label="Contact Number"
                  value={
                    selectedItem && selectedItem.vendorId.contactPersonTelephone
                  }
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
                  select
                  fullWidth
                  id="status"
                  name="status"
                  value={status}
                  onChange={onChangeValue}
                  label="Status"
                  variant="filled"
                  // className="dropDownStyle"
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
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  name={"comments"}
                  label="Comments"
                  value={comments}
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

            {/* <div style={{ marginTop: "5%" }}>
              {poId && poId.purchaseRequestId.length !== 0 ? (
                <AddedPurchaseRequestTable
                  tableData={poId.purchaseRequestId}
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

            <div class="row">
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  marginBottom: 40,
                  marginTop: 20,
                }}
              >
                <div style={{}}>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back_Arrow}
                    style={{ width: 60, height: 40, cursor: "pointer" }}
                  />
                </div>
                <Button
                  disabled={validateForm()}
                  style={{
                    width: 140,
                    height: 45,
                    color: "white",
                    backgroundColor: "#845ec2",
                  }}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </div>
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
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container-fluid"
          >
            <ViewItems
              history={props.history}
              items={purchaseOrderDetails}
              materialReceivingId={mrId._id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
