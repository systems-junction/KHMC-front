// /* eslint-disable react/jsx-wrap-multilines */
// /* eslint-disable array-callback-return */
// /* eslint-disable react/jsx-indent */
// import React, { useEffect, useState, useReducer } from "react";
// import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
// import axios from "axios";
// import Notification from "../../components/Snackbar/Notification.js";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   DateTimePicker,
//   MuiPickersUtilsProvider,
//   TimePicker,
//   DatePicker,
// } from "@material-ui/pickers";
// import {
//   addMaterialReceivingUrl,
//   updateMaterialReceivingUrl,
// } from "../../public/endpoins";

// import cookie from "react-cookies";

// import Header from "../../components/Header/Header";

// import VIewAll from "../../assets/img/view_all.png";
// import business_Unit from "../../assets/img/Purchase Order.png";

// import Back_Arrow from "../../assets/img/Back_Arrow.png";

// import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

// import Paper from "@material-ui/core/Paper";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// import AddedPurchaseRequestTable from "../PurchaseOrders/addedPurchaseRequestTable";

// import CustomTable from "../../components/Table/Table";

// const tableHeading = [
//   "Item Code",
//   "Item Name",
//   "Description",
//   "Current Quantity",
//   "Requested Quantity",
//   "Action",
// ];
// const tableDataKeys = [
//   "itemCode",
//   "itemName",
//   'description',
//   'currentQty',
//   'requestedQty',
// ];

// const actions = { receiveItem: true };

// const styles = {

//   inputContainerForTextField: {
//     marginTop: 25,
//   },

//   inputContainerForDropDown: {
//     marginTop: 25,
//     backgroundColor: "white",
//     borderRadius: 10,
//     paddingLeft: 10,
//     paddingRight: 10,
//     paddingTop: 2,
//   },

//   buttonContainer: {
//     marginTop: 25,
//   },
// };

// const useStyles = makeStyles(tableStyles);

// function AddEditPurchaseRequest(props) {
//   const classes = useStyles();

//   const initialState = {
//     _id: "",
//     itemCode: "",
//     itemName: "",
//     prId: "",
//     poId: "",
//     vendorId: "",
//     status: "",
//     poSentDate: "",
//   };

//   function reducer(state, { field, value }) {
//     return {
//       ...state,
//       [field]: value,
//     };
//   }

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const {
//     _id,
//     itemCode,
//     itemName,
//     prId,
//     poId,
//     vendorId,
//     status,
//     poSentDate,
//   } = state;

//   const [comingFor, setcomingFor] = useState("");

//   const [vendorsArray, setVendors] = useState("");

//   const [statues, setStatusArray] = useState("");

//   const [purchaseRequest, setPurchaseRequests] = useState([]);

//   const [purchaseOrders, setPurchaseOrders] = useState("");

//   const [currentUser, setCurrentUser] = useState("");

//   const [vendors, setVendor] = useState("");

//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   const [errorMsg, setErrorMsg] = useState("");
//   const [openNotification, setOpenNotification] = useState(false);

//   const [value, setValue] = React.useState(0);

//   const [openItemDialog, setOpenItemDialog] = useState(false);
//   const [item, setItem] = useState("");

//   useEffect(() => {
//     setCurrentUser(cookie.load("current_user"));

//     setcomingFor(props.history.location.state.comingFor);

//     setVendors(props.history.location.state.vendors);

//     setStatusArray(props.history.location.state.statues);

//     setPurchaseRequests(props.history.location.state.purchaseRequests);

//     setPurchaseOrders(props.history.location.state.purchaseOrders);

//     const selectedRec = props.history.location.state.selectedItem;

//     if (selectedRec) {
//       Object.entries(selectedRec).map(([key, val]) => {
//         if (val && typeof val === "object") {
//           dispatch({ field: key, value: val._id });
//         } else {
//           dispatch({ field: key, value: val });
//         }
//       });
//     }
//     if (props.history.location.state.vendors) {
//       dispatch({
//         field: "vendors",
//         value: props.history.location.state.vendors,
//       });
//     }
//     if (props.history.location.state.statues) {
//       dispatch({
//         field: "statues",
//         value: props.history.location.state.statues,
//       });
//     }
//   }, []);

//   function handleView(rec) {
//     let path = `/home/controlroom/wms/receiveitems/add`;
//     props.history.push({
//       pathname: path,
//       state: {
//         comingFor: "add",
//         selectedItem: rec,
//         vendors,
//         statues,
//         purchaseRequest,
//         purchaseOrders,
//       },
//     });
//   }

//   return (
//     <div

//     >

//       <CustomTable
//         tableData={purchaseRequest}
//         tableDataKeys={tableDataKeys}
//         tableHeading={tableHeading}
//         action={actions}
//         receiveItem={handleView}
//         borderBottomColor={"#60d69f"}
//         borderBottomWidth={20}
//       />

//       <div style={{ marginBottom: 20, marginTop: 50 }}>
//         <img
//           onClick={() => props.history.goBack()}
//           src={Back_Arrow}
//           style={{ width: 60, height: 40, cursor: "pointer" }}
//         />
//       </div>

//     </div>
//   );
// }
// export default AddEditPurchaseRequest;

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

const tableHeading = [
  "Item Code",
  "Item Name",
  "Description",
  "Current Quantity",
  "Requested Quantity",
];
const tableDataKeys = [
  ["itemId", "itemCode"],
  ["itemId", "name"],
  ["itemId", "description"],
  "currQty",
  "reqQty",
];

const actions = { receiveItem: "" };

function AddEditPurchaseRequest(props) {

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

  useEffect(() => {
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

  function handleView(rec) {
    console.log("rec", rec);
    let path = `/home/controlroom/wms/receiveitems/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: rec,
        vendors,
        statues,
        purchaseRequest,
        purchaseOrders,
        materialReceivingId: props.materialReceivingId,
      },
    });
  }

  console.log("po details in items", props.items);

  return (
    <div>
      <CustomTable
        tableData={props.items}
        tableDataKeys={tableDataKeys}
        tableHeading={tableHeading}
        action={actions}
        receiveItem={handleView}
        borderBottomColor={"#60d69f"}
        borderBottomWidth={20}
      />

      <div style={{ marginBottom: 20, marginTop: 50 }}>
        <img
          onClick={() => props.history.goBack()}
          src={Back_Arrow}
          style={{ width: 60, height: 40, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
