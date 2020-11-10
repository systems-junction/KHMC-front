/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../../components/Snackbar/Notification.js";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import {
  updateIPR,
  notifyDischarge,
  updateEdrIpr,
  getSearchedPharmaceuticalItemsUrl,
  getSearchedItemsNonPharmaceuticalUrl,
} from "../../../public/endpoins";
import InputLabelComponent from "../../../components/InputLabel/inputLabel";
import BootstrapInput from "../../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../../components/ErrorMessage/errorMessage";
import Paper from "@material-ui/core/Paper";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import Header from "../../../components/Header/Header";
import plus_icon from "../../../assets/img/Plus.png";
import purchase_request from "../../../assets/img/Doctor - Discharge.png";
import Back from "../../../assets/img/Back_Arrow.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import CustomTable from "../../../components/Table/Table";
import Loader from 'react-loader-spinner'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import stylesForPaper from "../../../assets/jss/material-dashboard-react/components/paper.js";

const scheduleArray = [
  { key: "Now", value: "Now/Immediate" },
  // { key: "Immediate", value: "Immediate" },
];
const priorityArray = [
  { key: "Emergency", value: "Emergency" },
  { key: "Regular", value: "Regular" },
  { key: "PRN", value: "PRN" },
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

const tableHeadingForPharmacyReq = [
  "Medicine Name",
  "Quantity",
  "Unit Price ( JD)",
  "Total Price ( JD)",
  "Action",
];
const tableDataKeysForPharmacyReq = [
  "medicineName",
  "requestedQty",
  "unitPrice",
  "totalPrice",
];
const actions = { edit: true };
const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  inputField: {
    outline: "none",
  },
  inputContainerForTextField: {
    marginTop: 10,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  inputContainerForDropDown: {
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: 25,
  },
};
// const useStyles = makeStyles(tableStyles)

const useStyles = makeStyles((theme) => ({
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

function AddEditEDR(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const initialState = {
    date: new Date(),
    status: "pending",
    requester: "",
    itemId: "",
    medicineName: "",
    priority: "",
    schedule: "",
    dosage: "",
    frequency: "",
    duration: "",
    requestedQty: "",
    unitPrice: "",
    totalPrice: "",
    dischargeMedicines: "",
    dischargeRequest: "",
    requestType: "",

    make_model: "",
    size: "",

    selectedItemToSearch: "pharmaceutical",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    date = new Date(),
    status = "pending",
    itemId,
    medicineName,
    priority,
    schedule,
    dosage,
    frequency,
    duration,
    requestedQty,
    unitPrice,
    totalPrice,
    dischargeMedicines,
    dischargeRequest,
    requestType,

    selectedItemToSearch,

    make_model,
    size,
  } = state;

  const onChangeValue = (e) => {
    var pattern = /^[0-9]*$/;
    if (
      e.target.name === "frequency" ||
      e.target.name === "dosage" ||
      e.target.name === "duration"
    ) {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w.\s]/gi, ""),
    });
  };

  const [comingFor, setcomingFor] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [, setSelectedItem] = useState("");
  const [selectItemToEditId, setSelectItemToEditId] = useState("");
  const [id, setId] = useState("");
  const [, setrequestNo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemFound, setItemFound] = useState("");
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [patientId, setpatientId] = useState("");
  const [enableSave, setEnableSave] = useState(true);
  const [dischargeNotes, setdischargeNotes] = useState("");
  const [otherNotes, setotherNotes] = useState("");
  const [timer, setTimer] = useState(null)
  const [loadSearchedData, setLoadSearchedData] = useState(false)

  useEffect(() => {
    // const soc = socketIOClient(socketUrl);
    // setSocket(soc);
    // soc.emit("connection");
    setCurrentUser(cookie.load("current_user"));

    setcomingFor(props.history.location.state.comingFor);

    const selectedRec = props.history.location.state.selectedItem;
    console.log("Other... ", props.history.location.state.otherNotes);
    console.log("Discharge... ", props.history.location.state.dischargeNotes);

    setpatientId(selectedRec.patientId._id);
    setotherNotes(props.history.location.state.otherNotes);
    setdischargeNotes(props.history.location.state.dischargeNotes);
    setId(selectedRec._id);
    setrequestNo(selectedRec.requestNo);

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          if (key === "dischargeRequest") {
            Object.entries(val).map(([key1, val1]) => {
              if (key1 === "dischargeMedication") {
                Object.entries(val1).map(([key2, val2]) => {
                  if (key2 === "medicine") {
                    val2.map(
                      (d) => (
                        (d.unitPrice = d.unitPrice.toFixed(4)),
                        (d.totalPrice = d.totalPrice.toFixed(4))
                      )
                    );
                    dispatch({ field: "dischargeMedicines", value: val2 });
                  }
                });
              }
            });
            dispatch({ field: "dischargeRequest", value: val });
          }
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
    // return () => soc.disconnect();
  }, []);

  const handleAdd = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    var dateNow = new Date();
    var YYYY = dateNow
      .getFullYear()
      .toString()
      .substr(-2);
    var HH = dateNow.getHours();
    var mm = dateNow.getMinutes();
    let ss = dateNow.getSeconds();

    const DischargeNo = "DCN" + day + YYYY + HH + mm + ss;
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    let medicineData = [];

    for (let i = 0; i < dischargeMedicines.length; i++) {
      medicineData = [
        ...medicineData,
        {
          itemId: dischargeMedicines[i].itemId,
          medicineName: dischargeMedicines[i].medicineName,
          duration: dischargeMedicines[i].duration,
          dosage: dischargeMedicines[i].dosage,
          priority: dischargeMedicines[i].priority,
          schedule: dischargeMedicines[i].schedule,
          frequency: dischargeMedicines[i].frequency,
          requestedQty: dischargeMedicines[i].requestedQty,
          unitPrice: dischargeMedicines[i].unitPrice,
          totalPrice: dischargeMedicines[i].totalPrice,
          itemType: dischargeMedicines[i].itemType,
          make_model: dischargeMedicines[i].make_model,
          size: dischargeMedicines[i].size,
          // totalPrice: dischargeMedicines[i].totalPrice,
        },
      ];
    }

    let dischargeMedicationObject = {
      date: date,
      status: status,
      requester: currentUser.staffId,
      medicine: medicineData,
    };

    const params = {
      _id: id,
      requestType,
      dischargeRequest: {
        dischargeSummary: { otherNotes, dischargeNotes },
        dischargeMedication: dischargeMedicationObject,
      },
    };
    console.log("params", params);
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response while adding Medicine Req", res.data.data);
          notifyForDischarge(patientId);
          props.history.push({
            pathname: "success",
            state: {
              // request #
              message: `Pharmacy Request for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
            },
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
          setErrorMsg("Error while adding the Medicine request");
        }
      })
      .catch((e) => {
        console.log("error after adding Medicine request", e);
        setOpenNotification(true);
        setErrorMsg("Error after adding the medicine request");
      });
    //   }
    // }
  };

  const notifyForDischarge = (id) => {
    axios
      .get(notifyDischarge + "/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("error after notify", e);
        setOpenNotification(true);
        setErrorMsg(e);
      });
  };

  // const handleEdit = () => {
  //   if (!validateForm()) {
  //     setIsFormSubmitted(true);
  //     setOpenNotification(true);
  //     setErrorMsg("Please fill the fields properly");
  //   } else {
  //     if (validateForm()) {
  //       let requestedItems = [];

  //       for (let i = 0; i < requestedItemsArray.length; i++) {
  //         requestedItems = [
  //           ...requestedItems,
  //           {
  //             itemId: requestedItemsArray[i].itemId._id,
  //             currentQty: requestedItemsArray[i].currentQty,
  //             requestedQty: requestedItemsArray[i].requestedQty,
  //             status: requestedItemsArray[i].status,
  //             secondStatus: requestedItemsArray[i].secondStatus,
  //             dosage: requestedItemsArray[i].dosage,
  //             noOfTimes: requestedItemsArray[i].noOfTimes,
  //             duration: requestedItemsArray[i].duration,
  //           },
  //         ];
  //       }
  //       const obj = {
  //         _id,
  //         requestNo,
  //         generatedBy,
  //         dateGenerated,
  //         generated,
  //         status:
  //           currentUser.staffTypeId.type === "FU Member" &&
  //           status === "pending" &&
  //           secondStatus === "in_progress"
  //             ? "in_progress"
  //             : currentUser.staffTypeId.type === "FU Member" &&
  //               status === "in_progress" &&
  //               secondStatus === "Delivery in Progress"
  //             ? "Delivery in Progress"
  //             : currentUser.staffTypeId.type === "BU Nurse" &&
  //               status === "Delivery in Progress" &&
  //               secondStatus === "pending_administration"
  //             ? "pending_administration"
  //             : currentUser.staffTypeId.type === "BU Inventory Keeper" &&
  //               status === "pending_administration" &&
  //               secondStatus === "complete"
  //             ? "complete"
  //             : status,
  //         comments,
  //         item: requestedItems,
  // currentQty,
  // requestedQty,
  // description,
  //         commentNote,
  //         fuId: fuId,
  //         secondStatus,
  //         buId: buId,
  //         requesterName,
  //         department,
  //         orderType,
  //         patientReferenceNo,
  //         orderFor,
  //         orderBy,
  //       };

  //       axios
  //         .put(updateReplenishmentRequestUrlBU, obj)
  //         .then((res) => {
  //           if (res.data.success) {
  //             props.history.goBack();
  //           } else if (!res.data.success) {
  //             setOpenNotification(true);
  //           }
  //         })
  //         .catch((e) => {
  //           console.log("error after updating purchase request", e);
  //           setOpenNotification(true);
  //           setErrorMsg("Error while editing the purchase request");
  //         });
  //     }
  //   }
  // };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function hideDialog() {
    setDialogOpen(false);
    setSelectedItem("");
    setSelectItemToEditId("");

    dispatch({ field: "itemId", value: "" });
    dispatch({ field: "priority", value: "" });
    dispatch({ field: "schedule", value: "" });
    dispatch({ field: "dosage", value: "" });
    dispatch({ field: "frequency", value: "" });
    dispatch({ field: "duration", value: "" });
    dispatch({ field: "requestedQty", value: "" });
    dispatch({ field: "medicineName", value: "" });
    dispatch({ field: "unitPrice", value: "" });
    dispatch({ field: "totalPrice", value: "" });

    dispatch({ field: "make_model", value: "" });
    dispatch({ field: "size", value: "" });
    dispatch({ field: "selectedItemToSearch", value: "pharmaceutical" });
  }

  function validateItemsForm() {
    // return (
    //   itemId &&
    //   itemId.length > 0 &&
    //   medicineName &&
    //   medicineName.length > 0 &&
    //   priority &&
    //   priority.length > 0 &&
    //   schedule &&
    //   schedule.length > 0 &&
    //   duration &&
    //   duration.length > 0 &&
    //   frequency &&
    //   frequency.length > 0 &&
    //   dosage &&
    //   dosage.length > 0
    // );

    let checkForpharma = true;
    let checkForNonpharma = true;

    if (selectedItemToSearch === "non_pharmaceutical") {
      checkForpharma =
        requestedQty !== "" &&
        requestedQty !== 0 &&
        size !== "" &&
        make_model !== "";
    }

    if (selectedItemToSearch === "pharmaceutical") {
      checkForpharma =
        dosage !== "" &&
        frequency !== "" &&
        duration !== "" &&
        dosage !== "0" &&
        frequency !== "0" &&
        duration !== "0";
      // && schedule !== "" &&
      // priority !== "" &&
      // form !== "";
    }

    return (
      itemId &&
      itemId.length > 0 &&
      medicineName &&
      medicineName.length > 0 &&
      // maximumLevel >= requestedQty &&
      checkForpharma &&
      checkForNonpharma
    );
  }

  const addSelectedItem = () => {
    // setIsFormSubmitted(true);
    if (validateItemsForm()) {
      setDialogOpen(false);

      let found =
        dischargeMedicines &&
        dischargeMedicines.find((item) => item.itemId === itemId);

      if (found) {
        setOpenNotification(true);
        setErrorMsg("This Medicine has already been added.");
      } else {
        dispatch({
          field: "dischargeMedicines",
          value: [
            ...dischargeMedicines,
            {
              itemId,
              priority,
              schedule,
              dosage,
              frequency,
              duration,
              requestedQty:
                selectedItemToSearch === "pharmaceutical"
                  ? frequency * dosage * duration
                  : requestedQty,
              medicineName,
              itemType: selectedItemToSearch,
              make_model,
              size,
              // unitPrice: unitPrice,
              unitPrice: parseFloat(unitPrice).toFixed(4),
              // totalPrice: unitPrice * frequency * dosage * duration,
              totalPrice: parseFloat(
                unitPrice * frequency * dosage * duration
              ).toFixed(4),
            },
          ],
        });
      }
    }

    dispatch({ field: "itemId", value: "" });
    dispatch({ field: "priority", value: "" });
    dispatch({ field: "schedule", value: "" });
    dispatch({ field: "dosage", value: "" });
    dispatch({ field: "frequency", value: "" });
    dispatch({ field: "duration", value: "" });
    dispatch({ field: "requestedQty", value: "" });
    dispatch({ field: "medicineName", value: "" });
    dispatch({ field: "unitPrice", value: "" });
    dispatch({ field: "totalPrice", value: "" });
    dispatch({ field: "make_model", value: "" });
    dispatch({ field: "size", value: "" });
    dispatch({ field: "selectedItemToSearch", value: "pharmaceutical" });
    setEnableSave(false);
  };

  const editSelectedItem = () => {
    // if (validateItemsForm()) {
    console.log("unitprice", unitPrice);
    setDialogOpen(false);
    let temp = [];

    for (let i = 0; i < dischargeMedicines.length; i++) {
      if (dischargeMedicines[i].itemId === selectItemToEditId) {
        let obj = {
          itemId,
          priority,
          schedule,
          dosage,
          frequency,
          duration,
          requestedQty:
            selectedItemToSearch === "pharmaceutical"
              ? frequency * dosage * duration
              : requestedQty,
          medicineName,
          itemType: selectedItemToSearch,
          make_model,
          size,
          // unitPrice: unitPrice,
          unitPrice: parseFloat(unitPrice).toFixed(4),
          // totalPrice: unitPrice * frequency * dosage * duration,
          totalPrice: parseFloat(
            unitPrice * frequency * dosage * duration
          ).toFixed(4),
        };
        temp[i] = obj;
      } else {
        temp = [...temp, dischargeMedicines[i]];
      }
    }

    dispatch({
      field: "dischargeMedicines",
      value: temp,
    });
    // }

    setDialogOpen(false);
    setSelectedItem("");
    setSelectItemToEditId("");

    dispatch({ field: "itemId", value: "" });
    dispatch({ field: "priority", value: "" });
    dispatch({ field: "schedule", value: "" });
    dispatch({ field: "dosage", value: "" });
    dispatch({ field: "frequency", value: "" });
    dispatch({ field: "duration", value: "" });
    dispatch({ field: "requestedQty", value: "" });
    dispatch({ field: "medicineName", value: "" });
    dispatch({ field: "unitPrice", value: "" });
    dispatch({ field: "totalPrice", value: "" });
    dispatch({ field: "make_model", value: "" });
    dispatch({ field: "size", value: "" });
    dispatch({ field: "selectedItemToSearch", value: "pharmaceutical" });
    setEnableSave(false);
  };

  function handleRequestedItemEdit(i) {
    console.log(i);
    // if (i.status === "pending") {
    setDialogOpen(true);
    setSelectedItem(i.itemId);
    setSelectItemToEditId(i.itemId);

    dispatch({ field: "itemId", value: i.itemId });
    dispatch({ field: "priority", value: i.priority });
    dispatch({ field: "schedule", value: i.schedule });
    dispatch({ field: "dosage", value: i.dosage });
    dispatch({ field: "frequency", value: i.frequency });
    dispatch({ field: "duration", value: i.duration });
    dispatch({ field: "requestedQty", value: i.requestedQty });
    dispatch({ field: "medicineName", value: i.medicineName });
    dispatch({ field: "unitPrice", value: i.unitPrice });
    dispatch({ field: "totalPrice", value: i.totalPrice });
    dispatch({ field: "make_model", value: i.make_model });
    dispatch({ field: "size", value: i.size });
    dispatch({ field: "selectedItemToSearch", value: i.itemType });
    // } else {
    //   setOpenNotification(true);
    //   setErrorMsg("Item can not be updated once it is in progess");
    // }
  }

  const triggerMedChange = (a) => {
    handleSearch(a)
  }

  const handlePauseMedSearch = (e) => {
    setLoadSearchedData(true)
    clearTimeout(timer)

    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchQuery(a)

    setTimer(
      setTimeout(() => {
        triggerMedChange(a)
      }, 600)
    )
  }

  const handleSearch = (e) => {

    if (e.length >= 1) {
      let url = "";
      if (selectedItemToSearch === "pharmaceutical") {
        url = getSearchedPharmaceuticalItemsUrl;
      } else {
        url = getSearchedItemsNonPharmaceuticalUrl;
      }
      axios
        .get(url + "/" + e)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              console.log("price data", res.data.data);
              setItemFoundSuccessfully(true);
              setItemFound(res.data.data.items);
              setLoadSearchedData(false)
            } else {
              setItemFoundSuccessfully(false);
              setItemFound("");
              setLoadSearchedData(false)
            }
          }
        })
        .catch((e) => {
          console.log("error while searching medicine", e);
        });
    }
  };

  function handleAddItem(i) {
    console.log("selected med", i);

    dispatch({ field: "itemId", value: i._id });
    dispatch({ field: "medicineName", value: i.name });
    dispatch({ field: "unitPrice", value: i.issueUnitCost });
    // dispatch({ field: 'totalPrice', value: i.purchasePrice + i.tax })

    setSearchQuery("");
  }

  const onChangeRadio = (e) => {
    dispatch({ field: "selectedItemToSearch", value: e.target.name });
    setItemFoundSuccessfully(false);
    setItemFound("");
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(19 213 159)",
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
        <div className="subheader" style={{ marginLeft: "-14px" }}>
          <div>
            <img src={purchase_request} />
            <h4>{comingFor === "add" ? " Discharge" : " Discharge"}</h4>
          </div>

          <div style={{ marginRight: "-14px" }}>
            <Button
              onClick={() => setDialogOpen(true)}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img className="icon-style" src={plus_icon} />
              &nbsp;&nbsp;
              <strong style={{ fontSize: "12px" }}>Add New</strong>
            </Button>
          </div>
        </div>

        <div
          style={{ flex: 4, display: "flex", flexDirection: "column" }}
          className="container-fluid"
        >
          <div className="row" style={{ marginTop: "20px" }}>
            {dischargeMedicines !== 0 ? (
              <CustomTable
                tableData={dischargeMedicines}
                tableDataKeys={tableDataKeysForPharmacyReq}
                tableHeading={tableHeadingForPharmacyReq}
                action={actions}
                handleEdit={handleRequestedItemEdit}
                borderBottomColor={"#60d69f"}
                borderBottomWidth={20}
              />
            ) : (
                undefined
              )}
          </div>

          <div
            className="row"
            style={{ marginTop: "25px", marginBottom: "25px" }}
          >
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ paddingLeft: "1px" }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{ width: 45, height: 35, cursor: "pointer" }}
              />
            </div>

            <div
              className="col-md-6 col-sm-6 col-6 d-flex justify-content-end"
              style={{ paddingRight: "1px" }}
            >
              <Button
                style={styles.stylesForPurchaseButton}
                // disabled={!validateForm()}
                disabled={enableSave}
                onClick={handleAdd}
                variant="contained"
                color="primary"
              >
                <strong style={{ fontSize: "12px" }}>Save</strong>
              </Button>
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <Dialog
            aria-labelledby="form-dialog-title"
            open={dialogOpen}
            maxWidth="xl"
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: "rgb(19 213 159)" }}>
              <DialogTitle
                id="simple-dialog-title"
                style={{ color: "white", marginLeft: -19 }}
              >
                Add Medicine
              </DialogTitle>
              <div className={`${"container-fluid"} ${classes.root}`}>
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
                      height: matches ? 55: 155,
                      paddingLeft : matches ? 0 : 10,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 5,
                      paddingTop: 8,
                    }}
                  >
                    <h6
                      className="col-md-4"
                      style={{ verticalAlign: "center" }}
                    >
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
                            selectedItemToSearch === "pharmaceutical"
                              ? true
                              : false
                          }
                          disabled={selectItemToEditId ? true : false}
                        />

                        <FormControlLabel
                          // value={selectedItemToSearch}
                          name={"non_pharmaceutical"}
                          control={<Radio color="primary" />}
                          label="Non-Pharmaceutical"
                          onChange={onChangeRadio}
                          checked={
                            selectedItemToSearch === "non_pharmaceutical"
                              ? true
                              : false
                          }
                          disabled={selectItemToEditId ? true : false}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                {selectedItemToSearch === "pharmaceutical" ? (
                  <div>
                    <>
                      {selectItemToEditId === "" ? (
                        <div className="row" style={{ marginTop: 15 }}>
                          <div
                            className="col-md-12 col-sm-12 col-12"
                            style={{
                              ...styles.textFieldPadding,
                              ...styles.inputContainerForTextField,
                            }}
                          >
                            <TextField
                              required
                              type="text"
                              label="Search Medicine by Name"
                              name={"searchQuery"}
                              value={searchQuery}
                              onChange={handlePauseMedSearch}
                              className="textInputStyle"
                              variant="filled"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                                className: classes.input,
                                classes: { input: classes.input },
                              }}
                              InputLabelProps={{
                                className: classes.label,
                                classes: { label: classes.label },
                              }}
                            />
                            {/* <InputLabelComponent>Search Medicine</InputLabelComponent>
                    <input
                      type='text'
                      placeholder='Search medicine by name'
                      name={'searchQuery'}
                      value={searchQuery}
                      onChange={handleSearch}
                      className='textInputStyle'
                    /> */}
                          </div>
                        </div>
                      ) : (
                          undefined
                        )}
                    </>

                    {searchQuery ? (
                      <div
                        style={{
                          zIndex: 3,
                          marginTop: 5,
                          marginLeft: -8,
                          width: '101.5%',
                        }}
                      >
                        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                          {itemFoundSuccessfull && itemFound !== '' ? (
                            <Table size='small'>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Medicine Name</TableCell>
                                  <TableCell>Scientific Name</TableCell>
                                  <TableCell>Item Code</TableCell>
                                  <TableCell>Unit Price (JD)</TableCell>
                                  {/* <TableCell>Total Price</TableCell> */}
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {itemFound.map((i) => {
                                  return (
                                    <TableRow
                                      key={i.itemCode}
                                      onClick={() => handleAddItem(i)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <TableCell>{i.tradeName}</TableCell>
                                      <TableCell>{i.scientificName}</TableCell>
                                      <TableCell>{i.itemCode}</TableCell>
                                      <TableCell>
                                        {i.issueUnitCost.toFixed(4)}
                                      </TableCell>
                                      {/* <TableCell>
                                      {i.purchasePrice + i.tax}
                                    </TableCell> */}
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          ) : loadSearchedData ? (
                            <div style={{ textAlign: 'center' }}>
                              <Loader
                                type='TailSpin'
                                color='#2c6ddd'
                                height={25}
                                width={25}
                                style={{
                                  display: 'inline-block',
                                  padding: '10px',
                                }}
                              />
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '10px',
                                }}
                              >
                                <h4> Searching Medicine...</h4>
                              </span>
                            </div>
                          ) : searchQuery && !itemFoundSuccessfull ? (
                            <div
                              style={{ textAlign: 'center', padding: '10px' }}
                            >
                              <h4>No Medicine Found !</h4>
                            </div>
                          ) : (
                                  undefined
                                )}
                        </Paper>
                      </div>
                    ) : (
                        undefined
                      )}

                    <div className="row" style={{ marginTop: 15 }}>
                      <div
                        className="col-md-4 col-sm-4 col-12"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        <TextField
                          required
                          label="Item Name"
                          name={"medicineName"}
                          value={medicineName}
                          disabled
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                        />
                      </div>
                      <div
                        className="col-md-4 col-sm-4 col-12"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        <TextField
                          required
                          select
                          label="Schedule"
                          name={"schedule"}
                          value={schedule}
                          onChange={onChangeValue}
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
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
                        <ErrorMessage
                          name={schedule}
                          isFormSubmitted={isFormSubmitted}
                        />
                      </div>

                      <div
                        className="col-md-4 col-sm-4 col-12"
                        style={{
                          ...styles.inputContainerForTextField,
                          ...styles.textFieldPadding,
                        }}
                      >
                        <TextField
                          required
                          select
                          fullWidth
                          id="priority"
                          name="priority"
                          value={priority}
                          onChange={onChangeValue}
                          label="Priority"
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
                          {priorityArray.map((val) => {
                            return (
                              <MenuItem key={val.key} value={val.key}>
                                {val.value}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                        <ErrorMessage
                          name={priority}
                          isFormSubmitted={isFormSubmitted}
                        />
                        {/* <InputLabelComponent>Priority*</InputLabelComponent>
                    <Select
                      fullWidth
                      id='priority'
                      name='priority'
                      value={priority}
                      onChange={onChangeValue}
                      label='Priority'
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {priorityArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                    <ErrorMessage
                      name={priority}
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                      </div>
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
                          label="Dosage"
                          name={"dosage"}
                          value={dosage}
                          onChange={onChangeValue}
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                        />
                        <ErrorMessage
                          name={dosage}
                          isFormSubmitted={isFormSubmitted}
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
                          label="Duration"
                          name={"duration"}
                          value={duration}
                          onChange={onChangeValue}
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                        />

                        <ErrorMessage
                          name={duration}
                          isFormSubmitted={isFormSubmitted}
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
                          label="Frequency"
                          name={"frequency"}
                          value={frequency}
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
                          required
                          disabled
                          label="Requested Quantity"
                          name={"requestedQty"}
                          value={dosage * duration * frequency}
                          onChange={onChangeValue}
                          className="textInputStyle"
                          variant="filled"
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                        />

                        <ErrorMessage
                          name={requestedQty}
                          isFormSubmitted={isFormSubmitted}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                    <div>
                      <div className="row" style={{ marginTop: 15 }}>
                        {selectItemToEditId === "" ? (
                          <>
                            <div
                              className="col-md-12"
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
                                onChange={handlePauseMedSearch}
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
                          </>
                        ) : (
                            undefined
                          )}
                      </div>

                      {searchQuery ? (
                        <div
                          style={{
                            zIndex: 3,
                            marginTop: 5,
                            marginLeft: -8,
                            width: '101.5%',
                          }}
                        >
                          <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                            {itemFoundSuccessfull && itemFound !== '' ? (
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
                            ) : loadSearchedData ? (
                              <div style={{ textAlign: 'center' }}>
                                <Loader
                                  type='TailSpin'
                                  color='#2c6ddd'
                                  height={25}
                                  width={25}
                                  style={{
                                    display: 'inline-block',
                                    padding: '10px',
                                  }}
                                />
                                <span
                                  style={{
                                    display: 'inline-block',
                                    padding: '10px',
                                  }}
                                >
                                  <h4> Searching Medicine...</h4>
                                </span>
                              </div>
                            ) : searchQuery && !itemFoundSuccessfull ? (
                              <div
                                style={{ textAlign: 'center', padding: '10px' }}
                              >
                                <h4>No Medicine Found !</h4>
                              </div>
                            ) : (
                                    undefined
                                  )}
                          </Paper>
                        </div>
                      ) : (
                          undefined
                        )}

                      <div className="row" style={{ marginTop: 15 }}>
                        <div
                          className="col-md-3"
                          style={{
                            ...styles.inputContainerForTextField,
                            ...styles.textFieldPadding,
                          }}
                        >
                          <TextField
                            required
                            id="medicineName"
                            label="Item Name"
                            name={"medicineName"}
                            disabled={true}
                            type="text"
                            value={medicineName}
                            onChange={onChangeValue}
                            variant="filled"
                            className="textInputStyle"
                            InputProps={{
                              className: classes.input,
                              classes: { input: classes.input },
                            }}
                            error={medicineName === "" && isFormSubmitted}
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
                    </div>
                  )}

                <div
                  class="row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                >
                  <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                    <Button
                      onClick={() => hideDialog()}
                      style={styles.stylesForButton}
                      variant="contained"
                    >
                      <strong>Cancel</strong>
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
                        style={{
                          color: "white",
                          cursor: "pointer",
                          borderRadius: 5,
                          backgroundColor: "#2c6ddd",
                          width: "140px",
                          height: "50px",
                          outline: "none",
                          paddingLeft: 30,
                          paddingRight: 30,
                        }}
                        disabled={!validateItemsForm()}
                        onClick={addSelectedItem}
                        variant="contained"
                        color="primary"
                      >
                        Add
                      </Button>
                    ) : (
                        <Button
                          style={{
                            color: "white",
                            cursor: "pointer",
                            borderRadius: 5,
                            backgroundColor: "#2c6ddd",
                            width: "140px",
                            height: "50px",
                            outline: "none",
                            paddingLeft: 30,
                            paddingRight: 30,
                          }}
                          // disabled={!validateItemsForm()}
                          onClick={editSelectedItem}
                          variant="contained"
                          color="primary"
                        >
                          {" "}
                        Edit
                        </Button>
                      )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
export default AddEditEDR;
