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
  getSearchedPharmaceuticalItemsUrl,
  getSearchedItemsNonPharmaceuticalUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
  getCurrentQtyForBUUrl,
  getFUFromBUUrl,
  getCurrentQtyForBURepRequestUrl,
  getCurrentQtyForFURepRequestUrl,
  getPatientByProfileNo,
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

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import Add_New from "../../assets/img/Add_New.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import Loader from "react-loader-spinner";

import add_new from "../../assets/img/Plus.png";

import TableForAddedItems from "./tableforAddedItems";

import PatientDetails from "./patientDetailsDialog";
import AllergicConfirmationDialog from "./allergicConfirmationDialog";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

const itemToSearch = [
  { key: "pharmaceutical", value: "Pharmaceutical" },
  { key: "non_pharmaceutical", value: "Non Pharmaceutical" },
];

const scheduleArray = [
  { key: "Now", value: "Now/Immediate" },
  // { key: "Immediate", value: "Immediate" },
];

const priorityArray = [
  { key: "Emergency", value: "Emergency" },
  { key: "Regular", value: "Regular" },
  { key: "PRN", value: "PRN" },
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

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
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

  stylesForPatientButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "45px",
    // outline: "none",
    // alignSelf:'center'
    marginTop: 30,
  },

  headingStyles: {
    fontWeight: "700",
    color: "grey",
  },
};
const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  const classes = useStyles();
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

    orderBy: "",

    dosage: "",
    noOfTimes: "",
    duration: "",

    form: "",
    medClass: "",

    selectedItemToSearch: "pharmaceutical",

    schedule: "",
    priority: "",
    tradeName: "",
    scientificName: "",
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

    dosage,
    noOfTimes,
    duration,

    form,
    medClass,
    selectedItemToSearch,

    schedule,
    priority,
    tradeName,
    scientificName,
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

  const [patientDetails, setPatientDetails] = useState("");

  const [patientDetailsDialog, openPatientDetailsDialog] = useState(false);

  const [allergicDialog, openAllergicDialog] = useState(false);
  const [allergic, setAllergic] = useState("");

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

  function getPatientDetails() {
    axios
      .get(getPatientByProfileNo + "/" + patientReferenceNo)
      .then((res) => {
        if (res.data.success) {
          console.log("Patient Data", res.data.data[0]);
          if (res.data.data[0]) {
            setPatientDetails(res.data.data[0]);
            openPatientDetailsDialog(true);
          } else {
            setErrorMsg("No patient record found against that MRN");
            setOpenNotification(true);
            setPatientDetails("");
          }
        } else if (!res.data.success) {
          setPatientDetails("");
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
            dispatch({ field: "tradeName", value: val.tradeName });
            dispatch({ field: "scientificName", value: val.scientificName });
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

  if (comingFor === "edit" && patientReferenceNo && patientDetails === "") {
    getPatientDetails();
  }

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeRadio = (e) => {
    dispatch({ field: "selectedItemToSearch", value: e.target.name });
    setItemFoundSuccessfully(false);
    setItem("");
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
      requestedItemsArray !== "" &&
      requestedItemsArray.length > 0 &&
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
      patientReferenceNo !== ""

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
              dosage: requestedItemsArray[i].dosage,
              noOfTimes: requestedItemsArray[i].noOfTimes,
              duration: requestedItemsArray[i].duration,
              status: "pending",
              secondStatus: "pending",
              schedule: requestedItemsArray[i].schedule,
              priority: requestedItemsArray[i].priority,
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
          orderFor: "Medical",
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
              dosage: requestedItemsArray[i].dosage,
              noOfTimes: requestedItemsArray[i].noOfTimes,
              duration: requestedItemsArray[i].duration,
              // form: requestedItemsArray[i].itemId.form,
              // medClass: requestedItemsArray[i].itemId.medClass,
              schedule: requestedItemsArray[i].schedule,
              priority: requestedItemsArray[i].priority,
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
    }, 2600);
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // if (e.target.value.length >= 3) {
    let url = "";
    if (selectedItemToSearch === "pharmaceutical") {
      url = getSearchedPharmaceuticalItemsUrl;
    } else {
      url = getSearchedItemsNonPharmaceuticalUrl;
    }
    axios
      .get(url + "/" + e.target.value)
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

  function ignoreAllery() {
    setAllergic("");
    openAllergicDialog(false);
  }

  function handleAddItem(i) {
    getCurrentQty(i._id);
    // setDialogOpen(true);
    setSelectedItem(i);

    let found = false;

    for (let k = 0; k < patientDetails.drugAllergy.length; k++) {
      for (let j = 0; j < i.drugAllergy.length; j++) {
        if (patientDetails.drugAllergy[k] === i.drugAllergy[j]) {
          found = true;
          setAllergic(patientDetails.drugAllergy[k]);
          openAllergicDialog(true);
        }
      }
    }

    dispatch({ field: "itemId", value: i._id });
    dispatch({ field: "itemCode", value: i.itemCode });
    dispatch({ field: "itemName", value: i.name });
    dispatch({ field: "itemType", value: i.cls });
    dispatch({ field: "vendorId", value: i.vendorId });
    dispatch({ field: "description", value: i.description });
    dispatch({ field: "maximumLevel", value: i.maximumLevel });
    dispatch({ field: "issueUnit", value: i.issueUnit });
    dispatch({ field: "receiptUnit", value: i.receiptUnit });
    dispatch({ field: "form", value: i.form });
    dispatch({ field: "medClass", value: i.medClass });
    dispatch({ field: "scientificName", value: i.scientificName });
    dispatch({ field: "tradeName", value: i.tradeName });

    const obj = {
      itemCode: i.itemCode,
    };

    setSelectedItemsArray((pervState) => [...pervState, obj]);
    setSearchQuery("");
  }

  function validateItemsForm() {
    let checkForpharma = true;
    let checkForNonpharma = true;

    if (selectedItemToSearch === "non_pharmaceutical") {
      checkForpharma = requestedQty !== "" && requestedQty !== 0;
    }

    if (selectedItemToSearch === "pharmaceutical") {
      checkForpharma =
        dosage !== "" &&
        noOfTimes !== "" &&
        duration !== "" &&
        schedule !== "" &&
        priority !== "";
    }

    return (
      itemCode !== "" &&
      description !== "" &&
      itemName !== "" &&
      tradeName !== "" &&
      scientificName !== "" &&
      // requestedQty !== "" &&
      // requestedQty !== "0" &&
      // dosage !== "" &&
      // noOfTimes !== "" &&
      // duration !== "" &&
      // && fuItemCost !== ""
      // currentQty.length > 0 &&
      maximumLevel >= requestedQty &&
      checkForpharma &&
      checkForNonpharma

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
    dispatch({ field: "dosage", value: "" });
    dispatch({ field: "noOfTimes", value: "" });
    dispatch({ field: "duration", value: "" });
    dispatch({ field: "form", value: "" });
    dispatch({ field: "medClass", value: "" });
    dispatch({ field: "scientificName", value: "" });
    dispatch({ field: "tradeName", value: "" });
    dispatch({ field: "priority", value: "" });
    dispatch({ field: "schedule", value: "" });

    ignoreAllery();
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
                cls: itemType,
                vendorId,
                description,
                maximumLevel,
                issueUnit,
                receiptUnit,
                form,
                medClass,
                tradeName,
                scientificName,
              },
              requestedQty:
                selectedItemToSearch === "pharmaceutical"
                  ? dosage * noOfTimes * duration
                  : requestedQty,
              dosage,
              noOfTimes,
              duration,
              currentQty,
              status: "pending",
              secondStatus: "pending",
              schedule,
              priority,
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
    dispatch({ field: "dosage", value: "" });
    dispatch({ field: "noOfTimes", value: "" });
    dispatch({ field: "duration", value: "" });
    dispatch({ field: "form", value: "" });
    dispatch({ field: "medClass", value: "" });
    dispatch({ field: "tradeName", value: "" });
    dispatch({ field: "scientificName", value: "" });
    dispatch({ field: "priority", value: "" });
    dispatch({ field: "schedule", value: "" });
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
              form,
              medClass,
              tradeName,
              scientificName,
            },
            requestedQty:
              selectedItemToSearch === "pharmaceutical"
                ? dosage * noOfTimes * duration
                : requestedQty,
            dosage,
            noOfTimes,
            duration,
            currentQty,
            schedule,
            priority,
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
    dispatch({ field: "dosage", value: "" });
    dispatch({ field: "noOfTimes", value: "" });
    dispatch({ field: "duration", value: "" });
    dispatch({ field: "form", value: "" });
    dispatch({ field: "medClass", value: "" });
    dispatch({ field: "tradeName", value: "" });
    dispatch({ field: "scientificName", value: "" });
    dispatch({ field: "priority", value: "" });
    dispatch({ field: "schedule", value: "" });
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
    console.log(i);
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
      dispatch({ field: "dosage", value: i.dosage });
      dispatch({ field: "noOfTimes", value: i.noOfTimes });
      dispatch({ field: "duration", value: i.duration });
      dispatch({ field: "form", value: i.itemId.form });
      dispatch({ field: "medClass", value: i.itemId.medClass });
      dispatch({ field: "tradeName", value: i.itemId.tradeName });
      dispatch({ field: "scientificName", value: i.itemId.scientificName });
      dispatch({ field: "priority", value: i.priority });
      dispatch({ field: "schedule", value: i.schedule });
    } else {
      setOpenNotification(true);
      setErrorMsg("Item can not be updated once it is in progess");
    }
  }

  function showPatientDetails() {
    openPatientDetailsDialog(false);
  }

  function addNewItem() {
    if (patientDetails || comingFor === "edit") {
      setDialogOpen(true);
    } else {
      setOpenNotification(true);
      setErrorMsg("You need to add the patient MRN first and get its details");
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
                ? " Add Medication Order"
                : comingFor === "edit"
                ? " Update Medication Order"
                : comingFor === "view"
                ? "Medication Order Details"
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

        {patientDetails && patientDetailsDialog ? (
          <PatientDetails
            patientDetails={patientDetails}
            showPatientDetails={showPatientDetails}
          />
        ) : (
          undefined
        )}

        {fuArray && fuArray !== "" ? (
          <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
            {comingFor === "edit" || comingFor === "view" ? (
              <div className="row">
                <div
                  className="col-md-7"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Request No</InputLabelComponent>
                  <input
                    disabled={true}
                    placeholder="Request No"
                    name={"requestNo"}
                    value={requestNo}
                    onChange={onChangeValue}
                    className="textInputStyle"
                  />
                </div>

                <div
                  className={"col-md-5"}
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent id="status-label">
                    Generated By
                  </InputLabelComponent>
                  <input
                    disabled={true}
                    type="text"
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

                {/* <div
                  className={"col-md-3"}
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Order Type</InputLabelComponent>
                  <input
                    className="textInputStyle"
                    disabled={true}
                    value={"Medical Order"}
                  />
                </div> */}
              </div>
            ) : (
              undefined
            )}

            <div className="row">
              {comingFor === "edit" || comingFor === "view" ? (
                <>
                  <div
                    className={"col-md-3"}
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Date Generated</InputLabelComponent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        // inputVariant="outlined"
                        onChange={onChangeDate}
                        disabled={true}
                        fullWidth
                        style={{
                          backgroundColor: "white",
                          borderRadius: 10,
                          borderWidth: 0,
                          height: 47,
                          marginTop: 5,
                          paddingLeft: 10,
                          paddingTop: 9,
                        }}
                        InputProps={{
                          disableUnderline: true,
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

                  <div className="col-md-3">
                    <div style={styles.inputContainerForDropDown}>
                      <InputLabelComponent id="status-label">
                        Requested FU
                      </InputLabelComponent>

                      {fuArray &&
                        fuArray.map((val) => {
                          if (val._id === fuId) {
                            return (
                              <input
                                disabled={true}
                                type="text"
                                placeholder="Fu Id"
                                name={"fuId"}
                                value={val.fuName}
                                onChange={onChangeValue}
                                className="textInputStyle"
                              />
                            );
                          }
                        })}
                    </div>
                    <ErrorMessage
                      name={fuId}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </>
              ) : (
                undefined
              )}

              <div className={comingFor === "edit" ? "col-md-3" : "col-md-5"}>
                <div style={styles.inputContainerForDropDown}>
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
                    name={orderBy}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div>

              <div
                className={comingFor === "edit" ? "col-md-3" : "col-md-5"}
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
              </div>

              {comingFor === "add" ? (
                <div
                  className={"col-md-2"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={getPatientDetails}
                    style={styles.stylesForPatientButton}
                    variant="contained"
                    color="primary"
                  >
                    {/* <img src={view_all} style={styles.stylesForIcon} /> */}
                    &nbsp;&nbsp;
                    <strong>Get Details</strong>
                  </Button>
                </div>
              ) : (
                undefined
              )}
            </div>

            <div className="row">
              <div
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
                />

                <ErrorMessage
                  name={comments}
                  isFormSubmitted={isFormSubmitted}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              {requestedItemsArray && (
                <TableForAddedItems
                  items={requestedItemsArray}
                  onDelete={handleItemDelete}
                  onEdit={handleRequestedItemEdit}
                />
              )}
            </div>

            {comingFor === "edit" &&
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
                {comingFor === "add" ||
                (currentUser &&
                  currentUser.staffTypeId.type === "BU Member") ? (
                  <Button
                    // disabled={patientDetails ? false : true}
                    onClick={() => addNewItem()}
                    style={styles.stylesForButton}
                    variant="contained"
                    color="primary"
                  >
                    <img src={add_new} style={styles.stylesForIcon} />
                    &nbsp;&nbsp;
                    <strong>Add Item</strong>
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
                    style={styles.stylesForPurchaseButton}
                    // disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                  >
                    Generate Medication Order
                  </Button>
                ) : comingFor === "edit" ? (
                  <Button
                    style={styles.stylesForPurchaseButton}
                    // disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Update Medication Order
                  </Button>
                ) : comingFor === "view" ? (
                  undefined
                ) : (
                  undefined
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
                <div className="container-fluid">
                  <h4
                    id="simple-dialog-title"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Add Item
                  </h4>
                  {selectItemToEditId === "" ? (
                    <div
                      className="row"
                      style={styles.inputContainerForTextField}
                    >
                      <div className="col-md-12">
                        {/* <div style={styles.inputContainerForDropDown}>
                          <InputLabelComponent>Search For*</InputLabelComponent>
                          <Select
                            fullWidth
                            id="selectedItemToSearch"
                            name="selectedItemToSearch"
                            value={selectedItemToSearch}
                            onChange={onChangeValue}
                            label="Search For"
                            className="dropDownStyle"
                            input={<BootstrapInput />}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>

                            {itemToSearch.map((val) => {
                              return (
                                <MenuItem key={val.key} value={val.key}>
                                  {val.value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </div> */}

                        <FormControl
                          component="fieldset"
                          style={{ width: "100%" }}
                        >
                          <FormLabel
                            component="legend"
                            style={{ color: "white", fontWeight: "bold" }}
                          >
                            Search For
                          </FormLabel>
                          <div
                            style={{
                              display: "flex",
                              // justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <RadioGroup
                              row
                              aria-label="position"
                              name="position"
                              // defaultValue="top"
                            >
                              <FormControlLabel
                                // value={selectedItemToSearch}
                                name={"pharmaceutical"}
                                control={<Radio color="primary" />}
                                label="Pharmaceutical"
                                onChange={onChangeRadio}
                                checked={
                                  selectedItemToSearch === "pharmaceutical"
                                    ? true
                                    : false
                                }
                              />

                              <FormControlLabel
                                // value={selectedItemToSearch}
                                name={"non_pharmaceutical"}
                                control={<Radio color="primary" />}
                                label="Non Pharmaceutical"
                                onChange={onChangeRadio}
                                checked={
                                  selectedItemToSearch === "non_pharmaceutical"
                                    ? true
                                    : false
                                }
                              />
                            </RadioGroup>
                          </div>
                        </FormControl>
                      </div>
                    </div>
                  ) : (
                    undefined
                  )}

                  <div style={styles.inputContainerForTextField}>
                    {selectItemToEditId === "" ? (
                      <div className="row">
                        <div className="col-md-12">
                          <InputLabelComponent>Search</InputLabelComponent>

                          <input
                            type="text"
                            placeholder="Search Items by name or code"
                            name={"searchQuery"}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="textInputStyle"
                          />
                        </div>
                      </div>
                    ) : (
                      undefined
                    )}
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
                                    Trade Name
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={styles.forTableCell}
                                  >
                                    Sceintific Name
                                  </TableCell>

                                  <TableCell
                                    align="center"
                                    style={styles.forTableCell}
                                  >
                                    Form
                                  </TableCell>

                                  <TableCell
                                    style={styles.forTableCell}
                                    align="center"
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
                                      <TableCell align="center">
                                        {i.tradeName}
                                      </TableCell>
                                      <TableCell align="center">
                                        {i.scientificName}
                                      </TableCell>

                                      <TableCell align="center">
                                        {i.form}
                                      </TableCell>

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

                  <div
                    className="row"
                    style={styles.inputContainerForTextField}
                  >
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

                    <div className="col-md-4">
                      <InputLabelComponent>Trade Name*</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        placeholder="Trade Name"
                        name={"tradeName"}
                        value={tradeName}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />
                      <ErrorMessage
                        name={tradeName}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div>

                    <div
                      className="col-md-4"
                      // style={styles.inputContainerForDropDown}
                    >
                      <InputLabelComponent>Priority*</InputLabelComponent>
                      <Select
                        fullWidth
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={onChangeValue}
                        label="Priority"
                        className="dropDownStyle"
                        input={<BootstrapInput />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {priorityArray.map((val) => {
                          return (
                            <MenuItem key={val.key} value={val.key}>
                              {val.value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <ErrorMessage
                        name={priority}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div>

                    <div
                      // style={styles.inputContainerForDropDown}
                      className="col-md-4"
                    >
                      <InputLabelComponent>Schedule*</InputLabelComponent>
                      <Select
                        fullWidth
                        id="schedule"
                        name="schedule"
                        value={schedule}
                        onChange={onChangeValue}
                        label="Schedule Array"
                        className="dropDownStyle"
                        input={<BootstrapInput />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {scheduleArray.map((val) => {
                          return (
                            <MenuItem key={val.key} value={val.key}>
                              {val.value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <ErrorMessage
                        name={schedule}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div>

                    {/* <div
                      className="col-md-3"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Type*</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        placeholder="Item Type"
                        name={"itemType"}
                        value={itemType === "medical" ? "Medical" : itemType}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />

                      <ErrorMessage
                        name={itemType}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div>

                    <div
                      className="col-md-3"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Form*</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        placeholder="Form"
                        name={"form"}
                        value={form}
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />

                      <ErrorMessage
                        name={form}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div>

                    <div
                      className="col-md-3"
                      style={styles.inputContainerForTextField}
                    >
                      <InputLabelComponent>Item Class*</InputLabelComponent>

                      <input
                        type="text"
                        disabled={true}
                        placeholder="Item Class"
                        name={""}
                        value={
                          medClass === "pharmaceutical"
                            ? "Pharmaceutical"
                            : medClass === "non_pharmaceutical"
                            ? "Non Pharmaceutical"
                            : ""
                        }
                        onChange={onChangeValue}
                        className="textInputStyle"
                      />

                      <ErrorMessage
                        name={medClass}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </div> */}
                  </div>

                  <div style={{ marginTop: 10 }}>
                    {selectedItemToSearch === "pharmaceutical" ? (
                      <div className="row">
                        <div
                          className="col-md-3"
                          // style={styles.inputContainerForTextField}
                        >
                          <InputLabelComponent>Dosage*</InputLabelComponent>
                          <input
                            type="number"
                            placeholder="Dosage"
                            name={"dosage"}
                            value={dosage}
                            onChange={onChangeValue}
                            className="textInputStyle"
                            onKeyDown={(evt) => {
                              (evt.key === "e" ||
                                evt.key === "E" ||
                                evt.key === "-" ||
                                evt.key === "+") &&
                                evt.preventDefault();
                            }}
                          />
                          <ErrorMessage
                            name={dosage}
                            isFormSubmitted={isFormSubmitted}
                          />
                        </div>

                        <div
                          className="col-md-3"
                          // style={styles.inputContainerForTextField}
                        >
                          <InputLabelComponent>Frequency*</InputLabelComponent>
                          <input
                            type="number"
                            placeholder="Frequency"
                            name={"noOfTimes"}
                            value={noOfTimes}
                            onChange={onChangeValue}
                            className="textInputStyle"
                            onKeyDown={(evt) => {
                              (evt.key === "e" ||
                                evt.key === "E" ||
                                evt.key === "-" ||
                                evt.key === "+") &&
                                evt.preventDefault();
                            }}
                          />
                          <ErrorMessage
                            name={noOfTimes}
                            isFormSubmitted={isFormSubmitted}
                          />
                        </div>

                        <div
                          className="col-md-3"
                          // style={styles.inputContainerForTextField}
                        >
                          <InputLabelComponent>Duration*</InputLabelComponent>
                          <input
                            type="number"
                            placeholder="Duration"
                            name={"duration"}
                            value={duration}
                            onChange={onChangeValue}
                            className="textInputStyle"
                            onKeyDown={(evt) => {
                              (evt.key === "e" ||
                                evt.key === "E" ||
                                evt.key === "-" ||
                                evt.key === "+") &&
                                evt.preventDefault();
                            }}
                          />
                          <ErrorMessage
                            name={duration}
                            isFormSubmitted={isFormSubmitted}
                          />
                        </div>
                        <div
                          className="col-md-3"
                          // style={styles.inputContainerForTextField}
                        >
                          <InputLabelComponent>
                            Requested Qty*
                          </InputLabelComponent>
                          <input
                            disabled
                            type="number"
                            placeholder="Req Qty"
                            name={"requestedQty"}
                            value={
                              selectedItemToSearch === "pharmaceutical"
                                ? dosage * noOfTimes * duration
                                : requestedQty
                            }
                            onChange={onChangeValue}
                            className="textInputStyle"
                            onKeyDown={(evt) => {
                              (evt.key === "e" ||
                                evt.key === "E" ||
                                evt.key === "-" ||
                                evt.key === "+") &&
                                evt.preventDefault();
                            }}
                          />
                          <ErrorMessage
                            name={requestedQty}
                            isFormSubmitted={isFormSubmitted}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div
                          className="col-md-12"
                          // style={styles.inputContainerForTextField}
                        >
                          <InputLabelComponent>
                            Requested Qty*
                          </InputLabelComponent>
                          <input
                            type="number"
                            placeholder="Req Qty"
                            name={"requestedQty"}
                            value={requestedQty}
                            onChange={onChangeValue}
                            className="textInputStyle"
                            onKeyDown={(evt) => {
                              (evt.key === "e" ||
                                evt.key === "E" ||
                                evt.key === "-" ||
                                evt.key === "+") &&
                                evt.preventDefault();
                            }}
                          />
                          <ErrorMessage
                            name={requestedQty}
                            isFormSubmitted={isFormSubmitted}
                          />
                        </div>
                      </div>
                    )}
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
                          Edit Item{" "}
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

            {allergicDialog ? (
              <AllergicConfirmationDialog
                allergic={allergic}
                // showPatientDetails={showPatientDetails}
                ignoreAllery={ignoreAllery}
                hideDialog={hideDialog}
              />
            ) : (
              undefined
            )}
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
