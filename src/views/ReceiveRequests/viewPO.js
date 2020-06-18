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

import Back_Arrow from "../../assets/img/Back_Arrow.png";

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
const tableDataKeysForPR = ["requestNo", "createdAt", "status"];

const generatedArrayForPO = [
  { key: "approve", value: "Approve" },
  { key: "reject", value: "Reject" },
  {
    key: "pending_approval_from_accounts",
    value: "Pending approval from accounts",
  },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 60,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
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

const useStyles = makeStyles(tableStyles);

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
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "poSentDate", value });
  };

  function validateForm() {
    return status.length > 0 && comments.length > 0;

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
    // console.log("purchase request", purchaseRequest);
    if (validateForm()) {
      let params = {
        _id,
        mrId: mrId._id,
        vendorId: vendorId._id,
        status,
        comments,
        dateTimeReceived: updatedAt,
      };
      console.log(params);

      axios
        .put(updateReceiveRequestsUrl, params)
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
            <h4>Purchase Order</h4>
          </div>

          <div>
            <img onClick={() => props.history.goBack()} src={VIewAll} />
            {/* <img src={Search} /> */}
          </div>
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
                color: "white",
                borderRadius: 15,
                backgroundColor: value === 0 ? "#2c6ddd" : undefined,
              }}
              label="PO Details"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                backgroundColor: value === 1 ? "#2c6ddd" : undefined,
              }}
              label="Items"
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          >
            <div className="row">
              <div className="col-md-12">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    PO Number
                  </InputLabel>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Item Name"
                    name={"itemName"}
                    value={poId.purchaseOrderNo}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Date/Time Generated
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      disabled={true}
                      inputVariant="outlined"
                      onChange={onChangeDate}
                      fullWidth
                      style={{ borderRadius: 10, backgroundColor: "white" }}
                      value={poId.createdAt}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>

              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Date/Time Sent
                  </InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      disabled={true}
                      inputVariant="outlined"
                      onChange={onChangeDate}
                      fullWidth
                      style={{ borderRadius: 10, backgroundColor: "white" }}
                      value={poId.sentAt}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Generated
                  </InputLabel>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Generated"
                    name={"itemName"}
                    value={poId.generated}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Vendor Name
                  </InputLabel>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Venor Name"
                    name={"itemName"}
                    value={selectedItem && selectedItem.vendorId.englishName}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Contact Person
                  </InputLabel>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Item Name"
                    name={"Contact Person"}
                    value={
                      selectedItem && selectedItem.vendorId.contactPersonName
                    }
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Contact Number
                  </InputLabel>
                  <input
                    disabled={true}
                    type="text"
                    placeholder="Contact Number"
                    name={"itemName"}
                    value={
                      selectedItem &&
                      selectedItem.vendorId.contactPersonTelephone
                    }
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div style={styles.inputContainerForDropDown}>
                  <InputLabel
                    style={styles.stylesForLabel}
                    id="generated-label"
                  >
                    Status
                  </InputLabel>
                  <Select
                    fullWidth
                    id="status"
                    name="status"
                    value={status}
                    onChange={onChangeValue}
                    label="Status"
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

              <div className="col-md-6">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Comments
                  </InputLabel>
                  <input
                    type="text"
                    placeholder="Comments"
                    name={"comments"}
                    value={comments}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "5%" }}>
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
            </div>

            <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
              <Button
                disabled={!validateForm()}
                style={{ width: "70%", paddingTop: 10, paddingBottom: 10 }}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </div>

            <div style={{ marginBottom: 20, marginTop: 50 }}>
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 60, height: 40, cursor: "pointer" }}
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
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
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
