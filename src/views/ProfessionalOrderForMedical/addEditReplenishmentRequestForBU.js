import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import InputAdornment from "@material-ui/core/InputAdornment";
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
  getSearchedpatient,
} from "../../public/endpoins";

import Paper from "@material-ui/core/Paper";
import cookie from "react-cookies";

import Chip from "@material-ui/core/Chip";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import Dialog from "@material-ui/core/Dialog";
import { tr } from "date-fns/locale";

import Header from "../../components/Header/Header";
import view_all from "../../assets/img/Eye.png";
import purchase_request from "../../assets/img/Medication Order.png";
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
import Fingerprint from "../../assets/img/fingerprint.png";

import TableForAddedItems from "./tableforAddedItems";

import PatientDetails from "./patientDetailsDialog";
import AllergicConfirmationDialog from "./allergicConfirmationDialog";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { ThemeProvider } from "@material-ui/styles";

import BarCode from "../../assets/img/Bar Code.png";

import stylesForPaper from "../../assets/jss/material-dashboard-react/components/paper.js";

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
  { key: "Recieved", value: "Recieved" },
  { key: "Partially Recieved", value: "Partially Recieved" },
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

const formArray = [
  { key: "Tablet", value: "Tablet" },
  { key: "Powder", value: "Powder" },
  { key: "Syrup", value: "Syrup" },
  { key: "Capsule", value: "Capsule" },
  { key: "Liquid", value: "Liquid" },
];

const sizeArray = [
  { key: "Small", value: "Small" },
  { key: "Medium", value: "Medium" },
  { key: "Large", value: "Large" },
  { key: "Extra Large", value: "Extra Large" },
];

const modalArray = [
  { key: "Old", value: "Old" },
  { key: "New", value: "New" },
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
    borderRadius: 5,
    backgroundColor: "#2C6DDD",
    // width: "140px",
    height: "54px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    // backgroundColor: "#2C6DDD",
    backgroundColor: "#845EC2",
    width: "180px",
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

  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
};

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
  // label: {
  //   "&:focused": {
  //     color: "black",
  //   },
  //   "&:after": {
  //     color: "black",
  //   },
  // },
}));

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
    make_model: "",
    size: "",
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
    make_model,
    size,
  } = state;

  const [comingFor, setcomingFor] = useState("");
  const [vendorsArray, setVendors] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [itemFound, setItem] = useState("");
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(
    false
  );
  const [patientFound, setpatientFound] = useState("");

  const [selectedItemsArray, setSelectedItemsArray] = useState([]);
  const [selectedPatientArray, setSelectedPatientArray] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

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

    const selectedPatientforPharm = props.history.location.state.selectedPatientForPharma;
     
    if(selectedPatientforPharm)
    {
      setPatientDetails(selectedPatientforPharm);
      setSelectedPatient(selectedPatientforPharm)
      openPatientDetailsDialog(true);
      dispatch({field:"patientReferenceNo", value:selectedPatientforPharm.profileNo})
    }

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

  const onChangeRadio = (e) => {
    dispatch({ field: "selectedItemToSearch", value: e.target.name });
    setItemFoundSuccessfully(false);
    setItem("");
  };

  const onChangeDate = (value) => {
    dispatch({ field: "dateGenerated", value });
  };

  function validateForm() {
    return (
      requestedItemsArray !== "" &&
      requestedItemsArray.length > 0 &&
      patientReferenceNo !== ""
    );
  }

  const handleAdd = () => {
    // console.log(requestedItemsArray, patientReferenceNo)
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
              make_model: requestedItemsArray[i].make_model,
              size: requestedItemsArray[i].size,
              comments: requestedItemsArray[i].comments,
            },
          ];
        }

        const params = {
          // requestNo,
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
          // fuId: fuArray[0]._id,
          fuId: currentUser.functionalUnit._id,
          orderFor: "Medical",
          orderBy,
          pId: selectedPatient._id,
        };
        console.log("params", params);
        axios
          .post(addReplenishmentRequestUrlBU, params)
          .then((res) => {
            if (res.data.success) {
              console.log("response after adding RR", res.data);
              props.history.replace({
                pathname: "/home/wms/fus/medicinalorder/success",
                state: {
                  // order #
                  message: `Medical Order # ${res.data.data.requestNo} for patient with MRN ${patientDetails.profileNo} has been placed succesfully`,
                },
              });
            } else if (!res.data.success) {
              setOpenNotification(true);
            }
          })
          .catch((e) => {
            console.log("error after adding purchase request", e);
            setOpenNotification(true);
            setErrorMsg("Error while generating the order");
          });
      }
    }
  };

  console.log(currentUser);

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
              make_model: requestedItemsArray[i].make_model,
              size: requestedItemsArray[i].size,
              comments: requestedItemsArray[i].comments,
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
            currentUser.staffTypeId.type === "FU Inventory Keeper" &&
            status === "pending" &&
            secondStatus === "in_progress"
              ? "in_progress"
              : currentUser.staffTypeId.type === "FU Inventory Keeper" &&
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
        console.log("updating the medical request obj", obj);

        axios
          .put(updateReplenishmentRequestUrlBU, obj)
          .then((res) => {
            if (res.data.success) {
              props.history.replace({
                pathname: "/home/wms/fus/medicinalorder/success",
                state: {
                  // order #
                  message: `Medical Order for patient with MRN ${patientDetails.profileNo} has been updated`,
                },
              });
            } else if (!res.data.success) {
              setOpenNotification(true);
            }
          })
          .catch((e) => {
            console.log("error after updating purchase request", e);
            setOpenNotification(true);
            setErrorMsg("Error while updating the order");
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

  const handlePatientSearch = (e) => {
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }

    setSearchPatientQuery(e.target.value);
    if (e.target.value.length >= 1) {
      axios
        .get(
          getSearchedpatient +
            "/" +
            currentUser.functionalUnit._id +
            "/" +
            e.target.value
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              setpatientFoundSuccessfully(true);
              setpatientFound(res.data.data);
            } else {
              setpatientFoundSuccessfully(false);
              setpatientFound("");
            }
          }
        })
        .catch((e) => {
          console.log("error after searching patient request", e);
        });
    }
  };

  function handleAddPatient(i) {
    // setDialogOpen(true);
    setSelectedPatient(i);
    dispatch({ field: "patientReferenceNo", value: i.profileNo });

    // dispatch({ field: "itemCode", value: i.itemCode });
    // dispatch({ field: "itemName", value: i.name });
    // dispatch({ field: "itemType", value: i.cls });
    // dispatch({ field: "vendorId", value: i.vendorId });
    // dispatch({ field: "description", value: i.description });
    // dispatch({ field: "maximumLevel", value: i.maximumLevel });
    // dispatch({ field: "issueUnit", value: i.issueUnit });
    // dispatch({ field: "receiptUnit", value: i.receiptUnit });
    // dispatch({ field: "form", value: i.form });
    // dispatch({ field: "medClass", value: i.medClass });
    // dispatch({ field: "scientificName", value: i.scientificName });
    // dispatch({ field: "tradeName", value: i.tradeName });

    setPatientDetails(i);
    openPatientDetailsDialog(true);

    const obj = {
      itemCode: i.itemCode,
    };

    setSelectedPatientArray((pervState) => [...pervState, obj]);
    setSearchPatientQuery("");
  }

  const handleSearch = (e) => {
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }

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
    axios
      .post(getCurrentQtyForFURepRequestUrl, params)
      .then((res) => {
        if (res.data.success) {
          // console.log("received qty", res.data.data.qty);
          dispatch({ field: "currentQty", value: res.data.data.qty });
        }
      })
      .catch((e) => {
        console.log("error while getting the current quantity", e);
        // setOpenNotification(true);
        // setErrorMsg("Error while adding the purchase request");
      });
  };

  function ignoreAllery() {
    setAllergic("");
    openAllergicDialog(false);
  }

  function handleAddItem(i) {
    console.log("selected item", i);

    if (patientDetails) {
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
    } else {
      setOpenNotification(true);
      setErrorMsg("Please add patient details first");
      setSearchQuery("");
    }
  }

  function validateItemsForm() {
    let checkForpharma = true;
    let checkForNonpharma = true;

    if (selectedItemToSearch === "non_pharmaceutical") {
      checkForpharma = requestedQty !== "" && requestedQty !== 0;
      // && size !== "" &&
      // make_model !== "";
    }

    if (selectedItemToSearch === "pharmaceutical") {
      checkForpharma =
        dosage !== "" &&
        noOfTimes !== "" &&
        duration !== "" &&
        dosage !== "0" &&
        noOfTimes !== "0" &&
        duration !== "0";
      // && schedule !== "" &&
      // priority !== "" &&
      // form !== "";
    }

    return (
      itemCode !== "" &&
      description !== "" &&
      itemName !== "" &&
      tradeName !== "" &&
      scientificName !== "" &&
      // maximumLevel >= requestedQty &&
      checkForpharma &&
      checkForNonpharma
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

    if (!validateItemsForm()) {
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
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
              make_model,
              size,
              comments,
            },
          ],
        });
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
      dispatch({ field: "size", value: "" });
      dispatch({ field: "make_model", value: "" });
      dispatch({ field: "comments", value: "" });
    }
  };

  const editSelectedItem = () => {
    if (!validateItemsForm()) {
      setOpenNotification(true);
      setErrorMsg("Please add the item first");
    }
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
            make_model,
            size,
            comments,
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
      dispatch({ field: "selectedItemToSearch", value: "pharmaceutical" });
      dispatch({ field: "size", value: "" });
      dispatch({ field: "make_model", value: "" });
      dispatch({ field: "comments", value: "" });
    }
  };

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

  function handleRequestedItemEdit(i) {
    console.log(i);
    if (i.status === "pending") {
      if (i.dosage === "" && i.noOfTimes === "" && i.duration === "") {
        dispatch({
          field: "selectedItemToSearch",
          value: "non_pharmaceutical",
        });
      } else if (i.dosage !== "" && i.noOfTimes !== "" && i.duration !== "") {
        dispatch({
          field: "selectedItemToSearch",
          value: "pharmaceutical",
        });
      }

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
      dispatch({ field: "make_model", value: i.make_model });
      dispatch({ field: "size", value: i.size });
      dispatch({ field: "comments", value: i.comments });
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
        <div className="row">
          <div className="subheader">
            <div>
              <img src={purchase_request} />
              <h4>
                {comingFor === "add"
                  ? "Add Order Items (Medical)"
                  : comingFor === "edit"
                  ? "Update Order Items (Medical)"
                  : comingFor === "view"
                  ? "Order Items (Medical) Details"
                  : undefined}
              </h4>
            </div>

            <Button
              onClick={() =>
                props.history.push("/home/wms/fus/medicinalorder/view")
              }
              style={{ ...styles.stylesForButton, height: 50 }}
              variant="contained"
              color="primary"
            >
              <img src={view_all} style={styles.stylesForIcon} />
              &nbsp;&nbsp;
              <strong>View All</strong>
            </Button>
          </div>
        </div>

        <div style={{ marginTop: "5px", marginBottom: "5px" }}>
          {comingFor === "add" ? (
            <div>
              <div className="row">
                {/* <span class="fa fa-search"></span> */}
                <div
                  className="col-md-10 col-sm-12"
                  style={styles.textFieldPadding}
                >
                  <TextField
                    className="textInputStyle"
                    id="searchPatientQuery"
                    type="text"
                    variant="filled"
                    label="Search Patient by Name / MRN / National ID / Mobile Number"
                    name={"searchPatientQuery"}
                    value={searchPatientQuery}
                    onChange={handlePatientSearch}
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

                <div
                  className="col-md-1 col-sm-6"
                  style={{
                    ...styles.textFieldPadding,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 5,
                      height: 55,
                    }}
                  >
                    <img src={BarCode} style={{ width: 80, height: 75 }} />
                  </div>
                </div>

                <div
                  className="col-md-1 col-sm-6"
                  style={{
                    ...styles.textFieldPadding,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 4,
                  }}
                >
                  <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
                </div>
              </div>

              {searchPatientQuery ? (
                <div
                  style={{
                    zIndex: 3,
                    position: "absolute",
                    width: "96%",
                    left: "2%",
                    marginTop: 5,
                  }}
                >
                  <Paper style={{ ...stylesForPaper.paperStyle }}>
                    {patientFoundSuccessfull ? (
                      patientFound && (
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>MRN Number</TableCell>
                              <TableCell>Patient Name</TableCell>
                              <TableCell>Gender</TableCell>
                              <TableCell>Age</TableCell>
                              <TableCell>Payment Method</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {patientFound.map((i) => {
                              return (
                                <TableRow
                                  key={i._id}
                                  onClick={() => handleAddPatient(i)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <TableCell>{i.profileNo}</TableCell>
                                  <TableCell>
                                    {i.firstName + ` ` + i.lastName}
                                  </TableCell>
                                  <TableCell>{i.gender}</TableCell>
                                  <TableCell>{i.age}</TableCell>
                                  <TableCell>{i.paymentMethod}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      )
                    ) : (
                      <h4
                        style={{ textAlign: "center" }}
                        onClick={() => setSearchPatientQuery("")}
                      >
                        Patient Not Found
                      </h4>
                    )}
                  </Paper>
                </div>
              ) : (
                undefined
              )}
            </div>
          ) : (
            undefined
          )}
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
            <h5 style={{ fontWeight: "bold", color: "white", marginTop: 25 }}>
              Order Item
            </h5>

            <div
              className="container-fluid"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <div
                className="row"
                style={{
                  backgroundColor: "white",
                  height: 55,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 5,
                  paddingTop: 8,
                }}
              >
                <h6 className="col-md-4" style={{ verticalAlign: "center" }}>
                  Item Type
                </h6>

                <FormControl className="col-md-8" component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    // defaultValue="top"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      // value={selectedItemToSearch}
                      name={"pharmaceutical"}
                      control={<Radio color="primary" />}
                      label="Pharmaceutical"
                      onChange={onChangeRadio}
                      checked={
                        selectedItemToSearch === "pharmaceutical" ? true : false
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
                </FormControl>
              </div>
            </div>

            {selectedItemToSearch === "pharmaceutical" ? (
              <div>
                <div className="row">
                  {selectItemToEditId === "" ? (
                    <>
                      <div
                        className="col-md-9"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        {/* <div className="search"> */}
                        {/* <span class="fa fa-search"></span> */}
                        <TextField
                          type="text"
                          label="Trade Name / Scientific Name / Manufacturer / Vendor"
                          name={"searchQuery"}
                          value={searchQuery}
                          onChange={handleSearch}
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
                        {/* </div> */}
                      </div>
                      <div
                        className="col-md-3"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        {/* <span class="fa fa-search"></span> */}
                        <TextField
                          id="indication"
                          variant="filled"
                          type="text"
                          label="Indication"
                          name={"searchQuery"}
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
                    </>
                  ) : (
                    undefined
                  )}
                </div>

                <div>
                  {searchQuery ? (
                    // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                    <div
                      style={{
                        zIndex: 3,
                        position: "absolute",
                        width: "96%",
                        left: "2%",
                        marginTop: 5,
                      }}
                    >
                      <Paper style={{ ...stylesForPaper.paperStyle }}>
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
                                    Scientific Name
                                  </TableCell>

                                  {/* <TableCell
                                    align="center"
                                    style={styles.forTableCell}
                                  >
                                    Form
                                  </TableCell> */}

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

                                      {/* <TableCell align="center">
                                        {i.form}
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
                </div>

                <div className="row">
                  <div
                    className="col-md-3"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      id="tradeName"
                      label="Trade/Scientific Name"
                      name={"tradeName"}
                      disabled={true}
                      type="text"
                      value={tradeName}
                      onChange={onChangeValue}
                      variant="filled"
                      className="textInputStyle"
                      error={tradeName === "" && isFormSubmitted}
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
                      disabled
                      // required
                      select
                      fullWidth
                      id="Form"
                      name="form"
                      value={form}
                      onChange={onChangeValue}
                      label="Form"
                      variant="filled"
                      // className="dropDownStyle"
                      // input={<BootstrapInput />}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      // error={form === "" && isFormSubmitted}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {formArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>

                  <div
                    className="col-md-3"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      // required
                      select
                      fullWidth
                      id="priority"
                      name="priority"
                      value={priority}
                      onChange={onChangeValue}
                      label="Priority"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      // error={priority === "" && isFormSubmitted}
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
                    </TextField>
                  </div>

                  <div
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                    className="col-md-3"
                  >
                    <TextField
                      // required
                      select
                      fullWidth
                      id="schedule"
                      name="schedule"
                      value={schedule}
                      onChange={onChangeValue}
                      label="Schedule"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      // error={schedule === "" && isFormSubmitted}
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
                    </TextField>
                  </div>
                </div>

                {/* <div> */}
                <div className="row">
                  <div
                    className="col-md-3"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      id="dosage"
                      label="Dosage"
                      name={"dosage"}
                      type="number"
                      value={dosage}
                      onChange={onChangeValue}
                      variant="filled"
                      className="textInputStyle"
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
                        min: "0",
                      }}
                      error={dosage === "" && isFormSubmitted}
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
                      required
                      id="noOfTimes"
                      label="Frequency"
                      name={"noOfTimes"}
                      type="number"
                      value={noOfTimes}
                      onChange={onChangeValue}
                      variant="filled"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={noOfTimes === "" && isFormSubmitted}
                      onKeyDown={(evt) => {
                        (evt.key === "e" ||
                          evt.key === "E" ||
                          evt.key === "-" ||
                          evt.key === "+") &&
                          evt.preventDefault();
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
                      required
                      id="duration"
                      label="Duration"
                      name={"duration"}
                      type="number"
                      value={duration}
                      onChange={onChangeValue}
                      variant="filled"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      onKeyDown={(evt) => {
                        (evt.key === "e" ||
                          evt.key === "E" ||
                          evt.key === "-" ||
                          evt.key === "+") &&
                          evt.preventDefault();
                      }}
                      error={duration === "" && isFormSubmitted}
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
                      required
                      disabled
                      id="requestedQty"
                      label="Requested Qty"
                      name={"requestedQty"}
                      type="number"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      value={
                        selectedItemToSearch === "pharmaceutical"
                          ? dosage * noOfTimes * duration
                          : requestedQty
                      }
                      onChange={onChangeValue}
                      variant="filled"
                      onKeyDown={(evt) => {
                        (evt.key === "e" ||
                          evt.key === "E" ||
                          evt.key === "-" ||
                          evt.key === "+") &&
                          evt.preventDefault();
                      }}
                      error={requestedQty === "" && isFormSubmitted}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-9"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      id="Notes"
                      type="text"
                      label="Notes"
                      name={"comments"}
                      value={comments}
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
                    style={styles.inputContainerForTextField}
                  >
                    {selectItemToEditId === "" ? (
                      <Button
                        //   disabled={!validateItemsForm()}
                        onClick={addSelectedItem}
                        style={{ ...styles.stylesForButton }}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        <strong>Add Item</strong>
                      </Button>
                    ) : (
                      <Button
                        disabled={!validateItemsForm()}
                        onClick={editSelectedItem}
                        style={{ ...styles.stylesForButton }}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        <strong>Update Item</strong>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="row">
                  {selectItemToEditId === "" ? (
                    <>
                      <div
                        className="col-md-9"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        <TextField
                          type="text"
                          label="Item Name / Manufacturer / Vendor"
                          name={"searchQuery"}
                          value={searchQuery}
                          onChange={handleSearch}
                          className={classes.margin}
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          className="textInputStyle"
                        />
                        {/* </div> */}
                      </div>
                      <div
                        className="col-md-3"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        <TextField
                          id="indication"
                          variant="filled"
                          type="text"
                          label="Indication"
                          name={"searchQuery"}
                          //  value={searchQuery}
                          //  onChange={handleSearch}
                          className={classes.margin}
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          className="textInputStyle"
                        />
                      </div>
                    </>
                  ) : (
                    undefined
                  )}
                </div>

                {searchQuery ? (
                  <div style={{ zIndex: 3 }}>
                    <Paper style={{ ...stylesForPaper.paperStyle }}>
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
                                  Scientific Name
                                </TableCell>

                                {/* <TableCell
                                  align="center"
                                  style={styles.forTableCell}
                                >
                                  Form
                                </TableCell> */}

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

                                    {/* <TableCell align="center">
                                      {i.form}
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
                  <div
                    className="col-md-3"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      id="itemName"
                      label="Item Name"
                      name={"itemName"}
                      disabled={true}
                      type="text"
                      value={itemName}
                      onChange={onChangeValue}
                      variant="filled"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={itemName === "" && isFormSubmitted}
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
                      select
                      // required
                      fullWidth
                      id="make_model"
                      name="make_model"
                      value={make_model}
                      onChange={onChangeValue}
                      label="Make/Model"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={make_model === "" && isFormSubmitted}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {modalArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>

                  <div
                    className="col-md-3"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      select
                      // required
                      fullWidth
                      id="size"
                      name="size"
                      value={size}
                      onChange={onChangeValue}
                      label="Size"
                      variant="filled"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      error={size === "" && isFormSubmitted}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {sizeArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </div>

                  <div
                    className="col-md-3"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      id="requestedQty"
                      label="Quantity"
                      name={"requestedQty"}
                      type="number"
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
                      error={requestedQty === "" && isFormSubmitted}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-9"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      id="Notes"
                      type="text"
                      label="Notes"
                      name={"comments"}
                      value={comments}
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
                    style={styles.inputContainerForTextField}
                  >
                    {selectItemToEditId === "" ? (
                      <Button
                        //   disabled={!validateItemsForm()}
                        onClick={addSelectedItem}
                        style={{ ...styles.stylesForButton }}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        <strong>Add Item</strong>
                      </Button>
                    ) : (
                      <Button
                        disabled={!validateItemsForm()}
                        onClick={editSelectedItem}
                        style={{ ...styles.stylesForButton }}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        <strong>Update Item</strong>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {requestedItemsArray && (
              <div className="row">
                <h5
                  style={{
                    color: "white",
                    marginTop: 10,
                    marginBottom: 10,
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

            <div
              className="row"
              style={{
                marginBottom: "25px",
                marginTop: "25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 45, height: 35, cursor: "pointer" }}
              />
              {comingFor === "add" ? (
                <Button
                  style={styles.stylesForPurchaseButton}
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  Generate Order
                </Button>
              ) : comingFor === "edit" ? (
                <Button
                  style={styles.stylesForPurchaseButton}
                  // disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  Update Order
                </Button>
              ) : comingFor === "view" ? (
                undefined
              ) : (
                undefined
              )}
            </div>
            {/* </div> */}

            <Notification msg={errorMsg} open={openNotification} />

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
