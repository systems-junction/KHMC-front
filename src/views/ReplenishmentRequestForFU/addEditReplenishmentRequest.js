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
import purchase_request from "../../assets/img/FuncU Fulfillment.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Add_New from "../../assets/img/Add_New.png";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import InputLabelComponent from "../../components/InputLabel/inputLabel";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import add_new from "../../assets/img/Plus.png";
// import MUIStyleForinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";
import MUIStyleForInputForCurrency from "../../../src/assets/jss/material-dashboard-react/inputStylesForCurrency.js";

import ViewAllBtn from "../../components/ViewAllBtn/viewAll";
import TableForAddedItems from "./tableforAddedItems";

import stylesForPaper from "../../assets/jss/material-dashboard-react/components/paper.js";
import dateTimeFormat from "../../constants/dateTimeFormat.js";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import messageTimeOut from "../../constants/messageTimeOut";

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
  {
    key: "Partial Fulfillment Initiated",
    value: "Partial  Fulfillment Initiated",
  },
];

const statusArrayForWareHouseDeliveryMan = [
  { key: "Fulfillment Initiated", value: "Fulfillment Initiated" },
  {
    key: "Partial Fulfillment Initiated",
    value: "Partial  Fulfillment Initiated",
  },
  { key: "Delivery in Progress", value: "Delivery in Progress" },
  {
    key: "Partial Delivery in Progress",
    value: "Partial Delivery in Progress",
  },
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

  stylesForWHButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    // backgroundColor: "#2c6ddd",
    backgroundColor: "#845EC2",
    // width: "30%",
    width: "160px",
    height: "45px",
    outline: "none",
  },

  inputContainerForTextField: {
    marginTop: 6,
    marginBottom: 20,
  },

  inputContainerForDropDown: {
    marginTop: 6,
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
    borderRadius: 5,
    background: "#2c6ddd",
    width: "120px",
    height: "40px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

// const useStyles = makeStyles((theme) => ({
//   margin: {
//     margin: theme.spacing(0),
//   },
//   input: {
//     backgroundColor: "white",
//     borderRadius: 4,
//     "&:placeholder": {
//       // color: "gray",
//       // fontWeight: "400",
//     },
//     "&:before": {
//       borderBottomWidth: "0px",
//     },
//     "&:after": {
//       color: "black",
//     },
//   },
// }));

const MUIStyleForinput = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
      borderRadius: 5,
    },
  },
  multilineColor: {
    boxShadow: "none",
    backgroundColor: "white",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "none",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
      boxShadow: "none",
    },
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
  },
}));
function AddEditPurchaseRequest(props) {
  const classes = MUIStyleForinput();
  const classesForInputForCurrency = MUIStyleForInputForCurrency();

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

    requestedItemsArray: "",
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

    requestedItemsArray,
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
          } else if (key === "items") {
            dispatch({ field: "requestedItemsArray", value: val });
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

  const onBlurChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/,/g, ""),
    });
  };

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

  const onChangeCurrency = (e) => {
    console.log(e.target.value, typeof e.target.value);
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "dateGenerated", value });
  };

  function validateForm() {
    console.log("lenght", requestedItemsArray, requestedItemsArray.length);

    let jit = true;
    // let qtyIsLess = true;
    if (reason === "jit") {
      jit = requesterName !== "" && department !== "" && orderType !== "";
    }
    return (
      reason !== "" &&
      comments !== "" &&
      // dateGenerated !== "" &&
      // fuItemCost !== "" &&
      // itemCode !== "" &&
      // itemName !== "" &&
      // requestedQty !== "" &&
      // currentQty !== "" &&
      // recieptUnit !== "" &&
      // issueUnit !== "" &&
      // requestedQty <= currentQty &&
      jit &&
      requestedItemsArray !== "" &&
      requestedItemsArray.length !== 0
    );
  }

  // const handleAdd = () => {
  //   if (!validateForm()) {
  //     setIsFormSubmitted(true);
  //     setOpenNotification(true);
  //     setErrorMsg("Please fill the fields properly");
  //   } else {
  //     if (validateForm()) {
  //       const params = {
  //         requestNo,
  //         generatedBy: currentUser.name,
  //         dateGenerated: new Date(),
  //         generated,
  //         status: "pending",
  //         reason,
  //         comments,

  //         itemId: itemId,
  //         currentQty,
  //         requestedQty,
  //         description,
  //         issueUnit,
  //         recieptUnit,
  //         fuItemCost,
  //         to: "Warehouse",
  //         from: "FU",
  //         commentNote: "",
  //         fuId: fuObj._id,

  //         requesterName,
  //         orderType,
  //         department,
  //       };

  //       console.log("params", params);

  //       axios
  //         .post(addReplenishmentRequestUrl, params)
  //         .then((res) => {
  //           if (res.data.success) {
  //             console.log("response after adding RR", res.data);
  //             props.history.goBack();
  //           } else if (!res.data.success) {
  //             setOpenNotification(true);
  //           }
  //         })
  //         .catch((e) => {
  //           console.log("error after adding purchase request", e);
  //           setOpenNotification(true);
  //           setErrorMsg("Error while adding the replenishment request");
  //         });
  //     }
  //   }
  // };

  const handleAdd = () => {
    if (requestedItemsArray === "" || requestedItemsArray.length === 0) {
      setOpenNotification(true);
      setErrorMsg("Please add some items first before creating an order");
      return;
    }

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
              ...requestedItemsArray[i],
              itemId: requestedItemsArray[i].itemId._id,
            },
          ];
        }

        const params = {
          requestNo,
          generatedBy: currentUser.name,
          dateGenerated: new Date(),
          generated,
          status: "pending",
          reason,
          comments,

          items: requestedItems,
          to: "Warehouse",
          from: "FU",
          commentNote: "",
          // fuId: fuObj._id,
          fuId: currentUser.functionalUnit._id,

          requesterName,
          orderType,
          department,
        };

        console.log("params for add request", params);

        axios
          .post(addReplenishmentRequestUrl, params)
          .then((res) => {
            if (res.data.success) {
              console.log("response after adding RR", res.data);
              // props.history.goBack();
              props.history.replace({
                pathname: "/home/wms/fus/medicinalorder/success",
                state: {
                  message: `Replenisment Request: ${res.data.data.requestNo} has been addded successfully`,
                },
              });
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

  // const handleEdit = () => {
  //   if (!validateForm()) {
  //     setIsFormSubmitted(true);
  //     setOpenNotification(true);
  //     setErrorMsg("Please fill the fields properly");
  //   } else {
  //     if (validateForm()) {
  //       if (
  //         status === "pending" ||
  //         currentUser.staffTypeId.type !== "FU Inventory Keeper"
  //       ) {
  //         const obj = {
  //           _id,
  //           requestNo,
  //           generatedBy,
  //           dateGenerated,
  //           generated,
  //           status:
  //             (currentUser.staffTypeId.type === "Warehouse Member" ||
  //               currentUser.staffTypeId.type === "admin") &&
  //             status === "pending" &&
  //             secondStatus === "Fulfillment Initiated"
  //               ? "Fulfillment Initiated"
  //               : (currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ||
  //                   currentUser.staffTypeId.type === "admin") &&
  //                 status === "Fulfillment Initiated" &&
  //                 secondStatus === "Delivery in Progress"
  //               ? "Delivery in Progress"
  //               : (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
  //                   currentUser.staffTypeId.type === "admin") &&
  //                 status === "Delivery in Progress" &&
  //                 secondStatus === "Received"
  //               ? "Received"
  //               : status,
  //           reason,
  //           comments,

  //           itemId,
  //           currentQty,
  //           requestedQty,
  //           description,
  //           issueUnit,
  //           recieptUnit,
  //           fuItemCost,
  //           to: to,
  //           from: from,
  //           commentNote,
  //           fuId: fuId._id,
  //           secondStatus,

  //           requesterName,
  //           orderType,
  //           department,
  //         };

  //         let params;

  //         if (
  //           currentUser.staffTypeId.type === "Warehouse Member" ||
  //           currentUser.staffTypeId.type === "admin"
  //         ) {
  //           params = {
  //             ...obj,
  //             approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
  //           };
  //         } else {
  //           params = {
  //             ...obj,
  //             approvedBy: approvedBy === "" ? "" : approvedBy,
  //           };
  //         }

  //         console.log("params for edit rep request FU", params);

  //         axios
  //           .put(updateReplenishmentRequestUrl, params)
  //           .then((res) => {
  //             if (res.data.success) {
  //               props.history.goBack();
  //             } else if (!res.data.success) {
  //               setOpenNotification(true);
  //             }
  //           })
  //           .catch((e) => {
  //             console.log("error after updating purchase request", e);
  //             setOpenNotification(true);
  //             setErrorMsg("Error while editing the purchase request");
  //           });
  //       } else {
  //         setOpenNotification(true);
  //         setErrorMsg("Request can not be updated once it is in progress");
  //       }
  //     }
  //   }
  // };

  const handleEdit = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        if (
          status === "pending" ||
          currentUser.staffTypeId.type !== "FU Inventory Keeper"
        ) {
          let requestedItems = [];

          for (let i = 0; i < requestedItemsArray.length; i++) {
            requestedItems = [
              ...requestedItems,
              {
                ...requestedItemsArray[i],
                itemId: requestedItemsArray[i].itemId._id,
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
              (currentUser.staffTypeId.type === "Warehouse Member" ||
                currentUser.staffTypeId.type === "admin") &&
              status === "pending" &&
              secondStatus === "Fulfillment Initiated"
                ? "Fulfillment Initiated"
                : (currentUser.staffTypeId.type ===
                    "Warehouse Inventory Keeper" ||
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

            // itemId,
            // currentQty,
            // requestedQty,
            // description,
            // issueUnit,
            // recieptUnit,
            // fuItemCost,
            items: requestedItems,
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
          } else if (approvedBy === "") {
            params = {
              ...obj,
              // approvedBy: approvedBy === "" ? "" : approvedBy,
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

  function validateInitiateForm() {
    return (
      secondStatus === "Fulfillment Initiated" ||
      secondStatus === "Partial Fulfillment Initiated"
    );
  }

  function validateDeliveryForm() {
    return (
      secondStatus === "Delivery in Progress" ||
      secondStatus === "Partial Delivery in Progress"
    );
  }

  const handleInitiate = () => {
    if (!(validateInitiateForm() || validateDeliveryForm())) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        if (
          status === "pending" ||
          currentUser.staffTypeId.type !== "FU Inventory Keeper"
        ) {
          let requestedItems = [];

          for (let i = 0; i < requestedItemsArray.length; i++) {
            requestedItems = [
              ...requestedItems,
              {
                ...requestedItemsArray[i],
                itemId: requestedItemsArray[i].itemId._id,
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
              (currentUser.staffTypeId.type === "Warehouse Member" ||
                currentUser.staffTypeId.type === "admin" ||
                currentUser.staffTypeId.type ===
                  "Warehouse Inventory Keeper") &&
              status === "pending" &&
              secondStatus === "Fulfillment Initiated"
                ? "Fulfillment Initiated"
                : (currentUser.staffTypeId.type ===
                    "Warehouse Inventory Keeper" ||
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

            // itemId,
            // currentQty,
            // requestedQty,
            // description,
            // issueUnit,
            // recieptUnit,
            // fuItemCost,
            items: requestedItems,
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
            currentUser.staffTypeId.type === "Warehouse Inventory Keeper"
          ) {
            params = {
              ...obj,
              approvedBy: approvedBy === "" ? currentUser.staffId : approvedBy,
            };
          } else if (approvedBy === "") {
            params = {
              ...obj,
              // approvedBy: approvedBy === "" ? "" : approvedBy,
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
                props.history.replace({
                  pathname: "/home/wms/fus/medicinalorder/success",
                  state: {
                    message: `Replenishment Request: ${requestNo} is set to ${secondStatus}`,
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
      console.log("called open notification");
      setErrorMsg("");
    }, messageTimeOut);
  }

  function hideNotification() {
    setOpenNotification(false);
    setErrorMsg("");
  }

  const handleSearch = (e) => {
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 1) {
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
    }
  };

  const getCurrentQty = (id) => {
    const params = {
      itemId: id,
      fuId: currentUser.functionalUnit._id,
    };
    console.log("params for curr qty", params);

    // axios
    //   .get(getPurchaseRequestItemQtyUrl + "/" + id)
    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log("current quantity", res.data.data);
    //       if (res.data.data) {
    //         dispatch({ field: "currentQty", value: res.data.data.qty });
    //       } else {
    //         dispatch({ field: "currentQty", value: 0 });
    //       }
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("error after adding purchase request", e);
    //     setOpenNotification(true);
    //     setErrorMsg("Error while adding the purchase request");
    //   });
    axios
      .post(getCurrentQtyForFURepRequestUrl, params)
      .then((res) => {
        if (res.data.success) {
          console.log("current quantity", res.data.data);
          if (res.data.data) {
            dispatch({ field: "currentQty", value: res.data.data.qty });
            dispatch({
              field: "maximumLevel",
              value: res.data.data.maximumLevel,
            });
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
    // console.log("selected item", i);
    getCurrentQty(i._id);
    // setDialogOpen(true);
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
      currentQty !== 0 &&
      requestedQty !== "0" &&
      fuItemCost !== "0"
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
      dispatch({ field: "maximumLevel", value: "" });

      // dispatch({ field: "maximumLevel", value: "" });
    } else {
      setDialogOpen(false);
      setSelectedItem("");
      setSelectItemToEditId("");
    }
  }

  const addSelectedItem = () => {
    setDialogOpen(false);
    setItemAdded(true);
    if (validateItemsForm()) {
      setDialogOpen(false);
      setItemAdded(true);
    }
    if (!validateItemsForm()) {
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
      return;
    }

    if (requestedQty > maximumLevel - currentQty) {
      setErrorMsg(
        `You can not add qty more than ${maximumLevel -
          currentQty} as it exceeds the maximum level.`
      );
      setOpenNotification(true);
      return;
    }

    if (validateItemsForm()) {
      setDialogOpen(false);
      let found =
        requestedItemsArray &&
        requestedItemsArray.find((item) => item.itemId._id === itemId);
      if (found) {
        setOpenNotification(true);
        setErrorMsg("This item has already been added");
      } else {
        // if (found) {
        //   // setOpenNotification(true);
        //   // setErrorMsg("The patient is allergic with this medicine");
        //   return;
        // }
        dispatch({
          field: "requestedItemsArray",
          value: [
            ...requestedItemsArray,
            {
              itemId: {
                _id: itemId,
                itemCode,
                name: itemName,
                vendorId,
                description,
                issueUnit,
                recieptUnit: recieptUnit,
              },
              requestedQty: requestedQty,
              maximumLevel,
              currentQty,
              status: "pending",
              secondStatus: "pending",
              fuItemCost,
              issueUnit,
              recieptUnit: recieptUnit,
              description,
            },
          ],
        });
      }
      setSelectedItem("");
      setSelectItemToEditId("");

      dispatch({ field: "itemId", value: "" });
      dispatch({ field: "description", value: "" });
      dispatch({ field: "currentQty", value: "" });
      dispatch({ field: "reqQty", value: "" });
      dispatch({ field: "itemName", value: "" });
      dispatch({ field: "itemCode", value: "" });
      dispatch({ field: "vendorId", value: "" });
      dispatch({ field: "issueUnit", value: "" });
      dispatch({ field: "recieptUnit", value: "" });
      dispatch({ field: "requestedQty", value: "" });
      dispatch({ field: "fuItemCost", value: "" });
      dispatch({ field: "maximumLevel", value: "" });
    }
  };

  function handleRequestedItemEdit(i) {
    console.log(i);
    if (i.status === "pending") {
      // setDialogOpen(true);
      setSelectedItem(i);
      setSelectItemToEditId(i);
      // dispatch({ field: "itemId", value: "" });
      dispatch({ field: "itemCode", value: i.itemId.itemCode });
      dispatch({ field: "itemName", value: i.itemId.name });
      dispatch({ field: "vendorId", value: i.itemId.vendorId });
      dispatch({ field: "description", value: i.itemId.description });
      dispatch({ field: "maximumLevel", value: i.maximumLevel });
      dispatch({ field: "issueUnit", value: i.itemId.issueUnit });
      dispatch({ field: "recieptUnit", value: i.itemId.recieptUnit });
      dispatch({ field: "currentQty", value: i.currentQty });
      dispatch({ field: "requestedQty", value: i.requestedQty });
      dispatch({ field: "fuItemCost", value: i.fuItemCost });
    } else {
      setOpenNotification(true);
      setErrorMsg("Item can not be updated once it is in progess");
    }
  }

  function handleItemDelete(item) {
    console.log(item);
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

  const editSelectedItem = () => {
    if (!validateItemsForm()) {
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    }
    if (validateItemsForm()) {
      if (requestedQty > maximumLevel - currentQty) {
        setErrorMsg(
          `You can not add qty more than ${maximumLevel -
            currentQty} as it exceeds the maximum level.`
        );
        setOpenNotification(true);
        return;
      }

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
              vendorId,
              description,
              issueUnit,
              recieptUnit: recieptUnit,
            },
            requestedQty: requestedQty,
            currentQty,
            status: requestedItemsArray[i].status,
            secondStatus: requestedItemsArray[i].secondStatus,
            fuItemCost,
            maximumLevel,
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

      setDialogOpen(false);
      setSelectedItem("");
      setSelectItemToEditId("");

      dispatch({ field: "itemId", value: "" });
      dispatch({ field: "description", value: "" });
      dispatch({ field: "currentQty", value: "" });
      dispatch({ field: "reqQty", value: "" });
      dispatch({ field: "itemName", value: "" });
      dispatch({ field: "itemCode", value: "" });
      dispatch({ field: "vendorId", value: "" });
      dispatch({ field: "issueUnit", value: "" });
      dispatch({ field: "recieptUnit", value: "" });
      dispatch({ field: "requestedQty", value: "" });
      dispatch({ field: "fuItemCost", value: "" });
      dispatch({ field: "maximumLevel", value: "" });
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
      <Header history={props.history}/>
      <div className="cPadding">
        <div className="subheader">
          <div style={{ marginLeft: "-6px" }}>
            <img src={purchase_request} />
            <h4>
              {comingFor === "add"
                ? " Add Replenishment Request"
                : " Edit Replenishment Request"}
            </h4>
          </div>

          {/* <ViewAllBtn history={props.history} /> */}
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
          className="container-fluid"
        >
          {comingFor === "edit" ? (
            <div className={`row ${classes.root}`}>
              <div
                className="col-md-4"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
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
              </div>

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
              </div>
            </div>
          ) : (
            undefined
          )}

          <div className={`row ${classes.root}`}>
            <div
              className={
                currentUser &&
                currentUser.staffTypeId.type === "Warehouse Inventory Keeper"
                  ? "col-md-4"
                  : "col-md-6"
              }
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  disabled
                  // ampm={false}
                  inputVariant="filled"
                  onChange={onChangeDate}
                  // disabled={true}
                  fullWidth
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
                  label={"Date (DD-MM-YYYY)"}
                  // format="MM/dd/yyyy HH:mm a"
                  format={dateTimeFormat}
                />
              </MuiPickersUtilsProvider>
            </div>

            <div
              className={
                currentUser &&
                currentUser.staffTypeId.type === "Warehouse Inventory Keeper"
                  ? "col-md-4"
                  : "col-md-6"
              }
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                disabled={
                  currentUser &&
                  (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
                // className="dropDownStyle"
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
            </div>

            {currentUser &&
            currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ? (
              <div
                className={"col-md-4"}
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label="Requested Functional Unit"
                  name={"requestNo"}
                  value={fuId.fuName}
                  // onChange={onBlurChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  // currencySymbol="JD"
                  // outputFormat="number"
                  // decimalPlaces="4"
                  error={requestNo === "" && isFormSubmitted}
                />
              </div>
            ) : (
              undefined
            )}
          </div>

          {reason === "jit" ? (
            <div className={`row ${classes.root}`}>
              <div
                className="col-md-4"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
                  error={requesterName === "" && isFormSubmitted}
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
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
                  select
                  fullWidth
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
              </div>
            </div>
          ) : (
            undefined
          )}

          <div className={`row ${classes.root}`}>
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type="text"
                disabled={
                  currentUser &&
                  (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
            </div>
          </div>
          {/* 
          {currentQty !== "" &&
          description !== "" &&
          issueUnit !== "" &&
          recieptUnit !== "" ? ( */}

          {currentUser &&
          currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
            <div>
              <div className="row">
                <h5
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginTop: 20,
                    marginLeft: 7,
                  }}
                >
                  Add Item
                </h5>
              </div>

              {selectItemToEditId === "" ? (
                <div className={`row ${classes.root}`}>
                  <div
                    className="col-md-12"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      label="Search Item"
                      name={"searchQuery"}
                      value={searchQuery}
                      // error={searchQuery === "" && isFormSubmitted}
                      onChange={handleSearch}
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
                {searchQuery ? (
                  // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                  <div
                    style={{
                      zIndex: 3,
                      position: "absolute",
                      // width: "100%",
                      width: "96%",
                      left: "2%",
                      marginTop: 5,
                    }}
                  >
                    <Paper style={{ ...stylesForPaper.paperStyle }}>
                      {itemFoundSuccessfull ? (
                        itemFound && (
                          <Table size="small" stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell>Item Code</TableCell>

                                <TableCell>Name</TableCell>
                                {/* <TableCell align="center">
                                  Purchase Price
                                </TableCell> */}
                                <TableCell>Description</TableCell>
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
                                    <TableCell>{i.itemCode}</TableCell>
                                    <TableCell col={3}>{i.name}</TableCell>
                                    {/* <TableCell align="center">
                                      {i.purchasePrice}
                                    </TableCell> */}
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
              </div>

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
                    type="text"
                    disabled={true}
                    label="Maximum Level"
                    name={"maximumLevel"}
                    value={maximumLevel}
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

              <div className={`row ${classes.root}`}>
                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
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
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
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
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
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
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled={
                      currentUser &&
                      (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
                    onKeyDown={(evt) => {
                      (evt.key === "e" ||
                        evt.key === "E" ||
                        evt.key === "-" ||
                        evt.key === "+") &&
                        evt.preventDefault();
                    }}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              </div>

              <div className={`row ${classes.root}`}>
                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {/* <TextField
                    disabled={
                      currentUser &&
                      (currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                        currentUser.staffTypeId.type === "admin")
                        ? false
                        : true
                    }
                    type="number"
                    label="Functional Unit  Cost"
                    name={"fuItemCost"}
                    value={fuItemCost}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    onKeyDown={(evt) => {
                      (evt.key === "e" ||
                        evt.key === "E" ||
                        evt.key === "-" ||
                        evt.key === "+") &&
                        evt.preventDefault();
                    }}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  /> */}

                  <CurrencyTextField
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id="fuItemCost"
                    label="Functional Unit  Cost"
                    name={"fuItemCost"}
                    value={fuItemCost}
                    // onBlur={onChangeCurrency}
                    onChange={(event, value) => {
                      dispatch({ field: "fuItemCost", value: value });
                    }}
                    variant="filled"
                    textAlign="left"
                    decimalPlaces={4}
                    InputProps={{
                      className: classesForInputForCurrency.input,
                      classes: { input: classesForInputForCurrency.input },
                    }}
                    InputLabelProps={{
                      className: classesForInputForCurrency.label,
                      classes: { label: classesForInputForCurrency.label },
                    }}
                    currencySymbol="JD"
                    // outputFormat="string"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
                  />
                </div>
                <div
                  className="col-md-9"
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
                  style={{
                    display: "flex",
                    flex: 1,
                    // height: 50,
                    justifyContent: "flex-end",
                    marginTop: "2%",
                    // marginBottom: "1%",
                    marginRight: "6px",
                  }}
                >
                  {selectItemToEditId === "" ? (
                    <Button
                      onClick={addSelectedItem}
                      style={styles.stylesForButton}
                      variant="contained"
                      color="primary"
                    >
                      <strong style={{ fontSize: "12px" }}>Add Item</strong>
                    </Button>
                  ) : (
                    <Button
                      onClick={editSelectedItem}
                      style={styles.stylesForButton}
                      variant="contained"
                      color="primary"
                    >
                      <strong style={{ fontSize: "12px" }}>Update Item</strong>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            undefined
          )}

          {comingFor === "edit" &&
          (currentUser.staffTypeId.type === "Warehouse Member" ||
            currentUser.staffTypeId.type === "Warehouse Inventory Keeper") ? (
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
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
                ) : currentUser.staffTypeId.type ===
                  "Warehouse Inventory Keeper" ? (
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
                        <MenuItem
                          key={val.key}
                          value={val.key}
                          disabled={
                            status === "Fulfillment Initiated" &&
                            val.key === "Fulfillment Initiated"
                              ? true
                              : status === "Fulfillment Initiated" &&
                                val.key === "Partial Fulfillment Initiated"
                              ? true
                              : status === "pending" &&
                                val.key === "Delivery in Progress"
                              ? true
                              : status === "pending" &&
                                val.key === "Partial Delivery in Progress"
                              ? true
                              : false
                          }
                        >
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

          {requestedItemsArray && (
            <div className="row">
              <h5
                style={{
                  color: "white",
                  marginTop: 15,
                  marginBottom: 15,
                  fontWeight: "700",
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

          <div className="row">
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 50,
                justifyContent: "space-between",
                marginTop: "2%",
                marginBottom: "2%",
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{
                  width: 45,
                  height: 35,
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              />
              {comingFor === "add" ? (
                <Button
                  style={{ ...styles.stylesForWHButton, marginRight: "5px" }}
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Submit</strong>
                </Button>
              ) : currentUser &&
                currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                comingFor === "edit" ? (
                <Button
                  style={styles.stylesForWHButton}
                  // disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Update</strong>
                </Button>
              ) : currentUser &&
                currentUser.staffTypeId.type === "Warehouse Member" &&
                comingFor === "edit" ? (
                <Button
                  style={styles.stylesForWHButton}
                  disabled={!validateInitiateForm()}
                  onClick={handleInitiate}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Submit</strong>
                </Button>
              ) : currentUser &&
                currentUser.staffTypeId.type === "Warehouse Inventory Keeper" &&
                comingFor === "edit" ? (
                <Button
                  style={styles.stylesForWHButton}
                  disabled={!(validateInitiateForm() || validateDeliveryForm())}
                  onClick={handleInitiate}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Submit</strong>
                </Button>
              ) : (
                undefined
              )}
            </div>
          </div>

          <Notification
            msg={errorMsg}
            open={openNotification}
            hideNotification={hideNotification}
          />
        </div>
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
