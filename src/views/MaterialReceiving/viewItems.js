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
  getReceiveItemsUrl,
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

import CustomTable from "../../components/Table/Table";

import AddEditReceiveItems from "./addEditReceiveItems";

const tableHeading = [
  "Item Code",
  "Item Name",
  "Requested Quantity",
  "Status",
  "Action",
];
const tableDataKeys = [
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "reqQty",
  "status",
];

const actions = { receiveItem: true };

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },

  buttonContainer: {
    marginTop: 25,
  },
};

const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

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

  const [receivedItems, setReceivedItems] = useState("");

  const [items, setItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState("");

  function getReceivedItems() {
    axios
      .get(getReceiveItemsUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("received Items", res.data.data.receiveItems);
          setReceivedItems(res.data.data.receiveItems);
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
    getReceivedItems();

    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setStatusArray(props.history.location.state.statues);

    setPurchaseRequests(props.history.location.state.purchaseRequests);

    setPurchaseOrders(props.history.location.state.purchaseOrders);

    const selectedRec = props.history.location.state.selectedItem;

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
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

  useEffect(() => {
    console.log(props.items);

    let temp = [];
    for (let i = 0; i < props.items.length; i++) {
      for (let j = 0; j < props.items[i].item.length; j++) {
        // console.log(props.items[i]);
        temp.push({ ...props.items[i].item[j], prId: props.items[i]._id });
      }
    }
    console.log(temp);
    setItems(temp);
  }, [props.items]);

  function handleReceive(rec) {
    let found = false;
    // console.log("received item in function", receivedItems);
    console.log(rec);

    for (let i = 0; i < receivedItems.length; i++) {
      if (
        receivedItems[i].prId._id === rec.prId &&
        receivedItems[i].itemId._id === rec.itemId._id
      ) {
        found = true;
        break;
      }
    }

    if (found) {
      setErrorMsg("Item has already been received");
      setOpenNotification(true);
      return;
    } else {
      let path = `viewpo/receiveitems/add`;

      setSelectedItem(rec);
      // props.history.push({
      //   pathname: path,
      //   state: {
      //     comingFor: "add",
      //     selectedItem: rec,
      //     vendors,
      //     statues,
      //     purchaseRequest,
      //     purchaseOrders,
      //     materialReceivingId: props.materialReceivingId,
      //   },
      // });
    }
  }

  // function handleAddReturnRequest(rec) {
  //   console.log("rec", rec);
  //   let path = `viewpo/externalreturn/add`;
  //   props.history.push({
  //     pathname: path,
  //     state: {
  //       comingFor: "add",
  //       selectedItem: rec,
  //     },
  //   });
  // }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  return (
    <div>
      <div className="row">
        <CustomTable
          tableData={items}
          tableDataKeys={tableDataKeys}
          tableHeading={tableHeading}
          action={actions}
          receiveItem={handleReceive}
          // addReturnRequest={handleAddReturnRequest}
          borderBottomColor={"#60d69f"}
          borderBottomWidth={20}
        />
      </div>

      <Notification msg={errorMsg} open={openNotification} />

      {selectedItem ? (
        <AddEditReceiveItems
          selectedItem={selectedItem}
          purchaseRequest={purchaseRequest}
          purchaseOrders={purchaseOrders}
          materialReceivingId={props.materialReceivingId}
          history={props.history}
        />
      ) : (
        undefined
      )}

      <div className="row" style={{ marginBottom: 20, marginTop: 10 }}>
        <img
          onClick={() => props.history.goBack()}
          src={Back_Arrow}
          style={{ width: 45, height: 35, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
