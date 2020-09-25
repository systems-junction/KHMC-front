/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import tableStyles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import Fingerprint from "../../../assets/img/Bar Code.png";
import BarCode from "../../../assets/img/Bar Code.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  updateRROPRById,
  uploadsUrl,
  updateEDR,
  updateOPR,
  getOPRById,
  getAllExternalConsultantsUrl,
  addECRUrl,
} from "../../../public/endpoins";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import business_Unit from "../../../assets/img/Out Patient.png";
import Back from "../../../assets/img/Back_Arrow.png";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomTable from "../../../components/Table/Table";
import plus_icon from "../../../assets/img/Plus.png";
import ViewSingleRequest from "./viewRequest";
import InputLabelComponent from "../../../components/InputLabel/inputLabel";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ErrorMessage from "../../../components/ErrorMessage/errorMessage";
import Notification from "../../../components/Snackbar/Notification.js";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import BootstrapInput from "../../../components/Dropdown/dropDown.js";

import Loader from "react-loader-spinner";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const tableHeadingForResident = [
  "Date/Time",
  "Description",
  "Doctor Ref",
  "Action",
];
const tableDataKeysForResident = [
  "date",
  "description",
  ["doctor", "firstName"],
];
const tableHeadingForConsultation = [
  "Consultation ID",
  "Date/Time",
  "Description",
  "Doctor Ref",
  "Action",
];
const tableDataKeysForConsultation = [
  "consultationNo",
  "date",
  "description",
  ["requester", "firstName"],
];
const tableHeadingForPharmacy = [
  "Request ID",
  "Date/Time",
  "Requester",
  "Status",
  "Action",
];
const tableDataKeysForPharmacy = [
  "_id",
  "date",
  ["requester", "firstName"],
  "status",
];
const tableHeadingForLabReq = [
  "Test Code",
  "Test",
  "Requester",
  "Price",
  "Status",
  "Action",
];
const tableDataKeysForLabReq = [
  "serviceCode",
  "serviceName",
  "requesterName",
  ["serviceId", "price"],
  "status",
];
const tableHeadingForRadiology = [
  "Service Code",
  "Service Name",
  "Requester",
  "Status",
  "Action",
];
const tableDataKeysForRadiology = [
  "serviceCode",
  "serviceName",
  "requesterName",
  "status",
];
// const actions = { view: true, }
const actions = { edit: true };
const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: "20px",
  },
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  upload: {
    backgroundColor: "white",
    border: "0px solid #ccc",
    borderRadius: "5px",
    color: "gray",
    width: "100%",
    height: "55px",
    cursor: "pointer",
    padding: "15px",
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  input: {
    display: "none",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    height: "50px",
    // width: '140px',
    outline: "none",
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "gray",
  },
};

const useStyles = makeStyles((theme) => ({
  scroller: {
    flexGrow: "0",
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

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

  const initialState = {
    labServiceId: "",
    labServiceCode: "",
    labRequestArray: "",
    labServiceName: "",
    labServiceStatus: "",
    labComments: "",
    sampleID: "",

    radioServiceId: "",
    radioServiceCode: "",
    radioServiceName: "",
    radiologyRequestArray: "",
    radioServiceStatus: "",
    radioComments: "",
    DateTime: new Date().toISOString().substr(0, 10),

    results: "",

    consultationNoteArray: "",
    consultationNo: "",
    date: new Date(),
    description: "",
    consultationNotes: "",
    requester: cookie.load("current_user").name,

    residentNoteArray: "",
    rdescription: "",
    note: "",
    doctor: cookie.load("current_user").name,

    pharmacyRequestArray: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    labServiceId,
    labServiceCode,
    labRequestArray,
    labServiceName,
    labServiceStatus,
    labComments,
    sampleID,

    radioServiceId,
    radioServiceCode,
    radioServiceName,
    radiologyRequestArray,
    radioServiceStatus,
    radioComments,
    DateTime = new Date().toISOString().substr(0, 10),
    results,

    consultationNoteArray,
    consultationNo,
    // date = new Date(),
    description,
    consultationNotes,
    requester = cookie.load("current_user").name,
    date,
    residentNoteArray,
    rdescription,
    note,
    doctor = cookie.load("current_user").name,

    pharmacyRequestArray,
  } = state;

  const onChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w\s]/gi, ""),
    });
  };

  const [currentUser, setCurrentUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [value, setValue] = React.useState(0);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false);
  const [openAddResidentDialog, setOpenAddResidentDialog] = useState(false);
  const [item, setItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [requestNo, setrequestNo] = useState("");
  const [labRequest, setlabRequest] = useState("");
  const [radiologyRequest, setradiologyRequest] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemFound, setItemFound] = useState("");
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [selectedSearchedItem, setSelectedSearchedItem] = useState("");
  const [selectedSearchedRadioItem, setSelectedSearchedRadioItem] = useState(
    ""
  );
  const [selectedLabArray, setSelectedLabArray] = useState([]);
  const [selectedRadioArray, setSelectedRadioArray] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [id, setId] = useState("");
  const [searchRadioQuery, setSearchRadioQuery] = useState("");
  const [radioItemFoundSuccessfull, setRadioItemFoundSuccessfully] = useState(
    ""
  );
  const [imagePreview, setImagePreview] = useState("");
  const [pdfView, setpdfView] = useState("");
  const [slipUpload, setSlipUpload] = useState("");
  const [radioItemFound, setRadioItemFound] = useState("");
  const [addLabRequest, setaddLabRequest] = useState(false);
  const [addRadioRequest, setaddRadioRequest] = useState(false);
  const [enableSave, setEnableSave] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [rowId, setRowId] = useState("");

  const [externalConsultant, setExternalConsultant] = useState("");

  const [allExternalConsultants, setAllExternalConsultants] = useState([]);

  const [
    openExtenalConsultantDialog,
    setOpenExtenalConsultantDialog,
  ] = useState(false);

  const [statusBoolean, setStatusBoolean] = useState(false);
  const getEDRById = (id) => {
    axios
      .get(getOPRById + "/" + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log("res.data.data[0]", res.data.data[0]);

            if (res.data.data[0].status === "completed") {
              setStatusBoolean(true);
            }

            setIsLoading(false);

            Object.entries(res.data.data[0]).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "patientId") {
                  dispatch({ field: "patientId", value: val._id });
                } else if (key === "labRequest") {
                  dispatch({ field: "labRequestArray", value: val });
                } else if (key === "radiologyRequest") {
                  dispatch({ field: "radiologyRequestArray", value: val });
                } else if (key === "consultationNote") {
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 == "requester") {
                      dispatch({ field: "requester", value: val1._id });
                    } else {
                      dispatch({ field: key1, value: val1 });
                    }
                  });
                  dispatch({ field: "consultationNoteArray", value: val });
                } else if (key === "residentNotes") {
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 == "doctor") {
                      dispatch({ field: "doctor", value: val1._id });
                    } else {
                      dispatch({ field: key1, value: val1 });
                    }
                  });
                  dispatch({ field: "residentNoteArray", value: val });
                } else if (key === "pharmacyRequest") {
                  dispatch({ field: "pharmacyRequestArray", value: val });
                }
              } else {
                dispatch({ field: key, value: val });
              }
            });
          }
        }
      })
      .catch((e) => {
        console.log("error while searching req", e);
      });
  };

  const getAllExternalConsultants = () => {
    axios
      .get(getAllExternalConsultantsUrl)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data, "status data");
            setAllExternalConsultants(res.data.data);
          }
        }
      })
      .catch((e) => {
        console.log("error while searching req", e);
      });
  };

  useEffect(() => {
    getAllExternalConsultants();
    getEDRById(props.history.location.state.selectedItem._id);

    setCurrentUser(cookie.load("current_user"));

    const selectedRec = props.history.location.state.selectedItem;

    setId(props.history.location.state.selectedItem._id);
    setSelectedItem(props.history.location.state.selectedItem);
    setrequestNo(props.history.location.state.selectedItem.requestNo);
    setSelectedPatient(props.history.location.state.selectedItem.patientId);

    // if (selectedRec) {
    //   Object.entries(selectedRec).map(([key, val]) => {
    //     if (val && typeof val === "object") {
    //       if (key === "patientId") {
    //         dispatch({ field: "patientId", value: val._id });
    //       } else if (key === "labRequest") {
    //         dispatch({ field: "labRequestArray", value: val });
    //       } else if (key === "radiologyRequest") {
    //         dispatch({ field: "radiologyRequestArray", value: val });
    //       } else if (key === "consultationNote") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 == "requester") {
    //             dispatch({ field: "requester", value: val1._id });
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //         dispatch({ field: "consultationNoteArray", value: val });
    //       } else if (key === "residentNotes") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 == "doctor") {
    //             dispatch({ field: "doctor", value: val1._id });
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //         dispatch({ field: "residentNoteArray", value: val });
    //       } else if (key === "pharmacyRequest") {
    //         dispatch({ field: "pharmacyRequestArray", value: val });
    //       }
    //     } else {
    //       dispatch({ field: key, value: val });
    //     }
    //   });
    // }
  }, []);

  // For dummy Data
  // function getEDRdetails() {
  // axios.get(
  //   getSingleEDRPatient +
  //   '/' +
  //   props.history.location.state.selectedItem._id
  // )
  //   .then((res) => {
  //     if (res.data.success) {
  //       console.log('response after getting the EDR details', res.data.data)
  // setPurchaseOrderDetails(res.data.data.poId.purchaseRequestId)
  //   } else if (!res.data.success) {
  //     setErrorMsg(res.data.error)
  //     setOpenNotification(true)
  //   }
  //   return res
  // })
  // .catch((e) => {
  //   console.log('error: ', e)
  // })
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeExternalConsultant = (event) => {
    setExternalConsultant(event.target.value);
  };

  // function viewItem(item) {
  //   if (item !== '') {
  //     setOpenItemDialog(true)
  //     setItem(item)
  //   } else {
  //     setOpenItemDialog(false)
  //     setItem('')
  //   }
  // }

  function handleView(rec) {
    let path = `viewOPR/updatelr`;

    console.log("rec", rec);
    if (rec.serviceId === rowId) {
      setOpenNotification(true);
      setErrorMsg("Please save the new added lab service first");
    } else {
      props.history.push({
        pathname: path,
        state: {
          id: id,
          selectedItem: rec,
          comingFor: "opr",
        },
      });
    }
  }

  function addConsultRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    let consultationNote = [];

    consultationNote = [
      ...consultationNoteArray,
      {
        consultationNo: id,
        description: description,
        consultationNotes: consultationNotes,
        requester: currentUser.staffId,
        date: date,
      },
    ];

    const params = {
      _id: id,
      consultationNote: consultationNote,
    };

    // console.log("params", params);
    axios
      .put(updateEDR, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response while adding Consult Req", res.data.data);
          props.history.goBack();
        } else if (!res.data.success) {
          setOpenNotification(true);
          setErrorMsg("Error while adding the Consultation request");
        }
      })
      .catch((e) => {
        console.log("error after adding Consultation request", e);
        setOpenNotification(true);
        setErrorMsg("Error after adding the Consultation request");
      });
    //   }
    // }
  }

  function addResidentRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {
    if (validateItemsForm()) {
      let residentNote = [];

      residentNote = [
        ...residentNoteArray,
        {
          date: date,
          description: rdescription,
          doctor: currentUser.staffId,
          note: note,
        },
      ];

      const params = {
        _id: id,
        residentNotes: residentNote,
      };

      // console.log("params", params);
      axios
        .put(updateEDR, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response while adding Resident Req", res.data.data);
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
            setErrorMsg("Error while adding the Resident request");
          }
        })
        .catch((e) => {
          console.log("error after adding Resident request", e);
          setOpenNotification(true);
          setErrorMsg("Error after adding the Resident request");
        });
      //   }
    }
  }

  const addNewRequest = () => {
    let path = `viewOPR/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: selectedItem,
        pharmacyRequestArray,
      },
    });
  };

  function hideDialog() {
    setOpenAddConsultDialog(false);
    setOpenAddResidentDialog(false);

    dispatch({ field: "consultationNo", value: "" });
    dispatch({ field: "description", value: "" });
    dispatch({ field: "consultationNotes", value: "" });
    dispatch({ field: "rdescription", value: "" });
    dispatch({ field: "note", value: "" });
  }

  const handleSearch = (e) => {
    const a = e.target.value.replace(/[^\w-\s]/gi, "");
    setSearchQuery(a);
    if (a.length >= 3) {
      axios
        .get(getSearchedLaboratoryService + "/" + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              setItemFoundSuccessfully(true);
              setItemFound(res.data.data);
            } else {
              setItemFoundSuccessfully(false);
              setItemFound("");
            }
          }
        })
        .catch((e) => {
          console.log("error while searching req", e);
        });
    }
  };

  function handleAddItem(i) {
    console.log("selected item", i);

    dispatch({ field: "labServiceId", value: i._id });
    dispatch({ field: "labServiceCode", value: i.serviceNo });
    dispatch({ field: "labServiceName", value: i.name });
    dispatch({ field: "labServiceStatus", value: i.status });

    setSearchQuery("");
    setaddLabRequest(true);
  }

  const addSelectedLabItem = () => {
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

    const LRrequestNo = "LR" + day + YYYY + HH + mm + ss;
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {

    let found =
      labRequestArray &&
      labRequestArray.find((item) => item.serviceId === labServiceId);

    if (statusBoolean) {
      setOpenNotification(true);
      setErrorMsg(
        "Lab request cannot be added because OPR status is already completed"
      );
    } else {
      if (found) {
        setOpenNotification(true);
        setErrorMsg("This Service has already been added.");
      } else {
        dispatch({
          field: "labRequestArray",
          value: [
            ...labRequestArray,
            {
              serviceId: labServiceId,
              serviceCode: labServiceCode,
              serviceName: labServiceName,
              requester: currentUser.staffId,
              requesterName: requester,
              status: labServiceStatus,
              comments: labComments,
              sampleId: sampleID,
              results: results,
              LRrequestNo: LRrequestNo,
            },
          ],
        });
        // }
      }
    }

    dispatch({ field: "labServiceId", value: "" });
    dispatch({ field: "labServiceName", value: "" });
    dispatch({ field: "labServiceStatus", value: "" });
    dispatch({ field: "labServiceCode", value: "" });
    dispatch({ field: "labComments", value: "" });
    dispatch({ field: "results", value: "" });
    dispatch({ field: "sampleID", value: "" });

    setRowId(labServiceId);

    setaddLabRequest(false);
    setEnableSave(false);
  };

  const saveLabReq = () => {
    // console.log("THIS IS ARRAY",labRequestArray)

    let labItems = [];
    for (let i = 0; i < labRequestArray.length; i++) {
      labItems = [
        ...labItems,
        {
          serviceId: labRequestArray[i].serviceId,
          serviceCode: labRequestArray[i].serviceCode,
          requesterName: labRequestArray[i].requesterName,
          requester: labRequestArray[i].requester,
          serviceName: labRequestArray[i].serviceName,
          status: labRequestArray[i].status,
          comments: labRequestArray[i].comments,
          sampleId: labRequestArray[i].sampleId,
          results: labRequestArray[i].results,
          LRrequestNo: labRequestArray[i].LRrequestNo,
        },
      ];
    }
    const params = {
      _id: id,
      labRequest: labItems,
    };
    console.log("params", params);
    axios
      .put(updateOPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response after adding Lab Request", res.data);
          // props.history.goBack()
          props.history.push({
            pathname: "viewOPR/success",
            state: {
              message: `Lab Request # ${
                res.data.data.labRequest[res.data.data.labRequest.length - 1]
                  .LRrequestNo
              } for patient MRN ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
            },
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch((e) => {
        console.log("error after adding Lab Request", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the Lab Request");
      });
  };

  const onSlipUpload = (event) => {
    var file = event.target.files[0];
    var fileType = file.name.slice(file.name.length - 3);

    // console.log("Selected file : ", file.name)
    // console.log("file type : ", fileType)

    setSlipUpload(file);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function() {
      if (fileType === "pdf") {
        setpdfView(file.name);
      } else {
        setImagePreview([reader.result]);
      }
    };
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }
  function validateItemsForm() {
    return rdescription && rdescription.length > 0 && note && note.length > 0;
  }

  function handleGenerateECR() {
    const params = {
      edrId: id,
      // iprId,
      generatedBy: currentUser.staffId,
      generatedFor: externalConsultant,
      patient: selectedItem.patientId._id,
      generatedFrom: "EDR",
    };
    console.log("params", params);
    axios
      .post(addECRUrl, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response after adding Radio Request", res.data);
          props.history.goBack();
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch((e) => {
        console.log("error after adding  external consultation request", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the external consultation request");
      });
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

      {!isLoading ? (
        <div className="cPadding">
          <div className="subheader" style={{ marginLeft: "-10px" }}>
            <div>
              <img src={business_Unit} />
              <h4>OPR - Lab Service</h4>
            </div>
          </div>
          <div
            style={{
              height: "20px",
            }}
          />
          <div
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              paddingLeft: "10px",
            }}
            className={`${"container-fluid"} ${classes.root}`}
          >
            <div className="row">
              <div
                className="col-md-11 col-sm-11 col-11"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  type="text"
                  label="Search by Lab test name"
                  name={"searchQuery"}
                  value={searchQuery}
                  onChange={handleSearch}
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
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>
              <div className="col-md-1 col-sm-2 col-2">
                <div
                  style={{
                    ...styles.inputContainerForTextField,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 5,
                    height: 55,
                    marginRight: "-6px",
                  }}
                >
                  <img src={Fingerprint} style={{ maxWidth: 70, height: 60 }} />
                </div>
              </div>
            </div>

            {searchQuery ? (
              <div
                style={{
                  zIndex: 10,
                  width: "93%",
                  marginLeft: "-11px",
                  marginTop: "10px",
                }}
              >
                <Paper style={{ maxHeight: 200, overflow: "auto" }}>
                  {setItemFoundSuccessfully ? (
                    itemFound && (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Service Number</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="center">Description</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {itemFound.map((i, index) => {
                            return (
                              <TableRow
                                key={i.serviceNo}
                                onClick={() => handleAddItem(i)}
                                style={{ cursor: "pointer" }}
                              >
                                <TableCell>{i.name}</TableCell>
                                <TableCell>{i.serviceNo}</TableCell>
                                <TableCell>{i.price}</TableCell>
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
                      onClick={() => setSearchQuery("")}
                    >
                      Service Not Found
                    </h4>
                  )}
                </Paper>
              </div>
            ) : (
              undefined
            )}

            <div style={{ marginTop: "20px" }} className="row">
              <div
                className="col-md-5 col-sm-10 col-6"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                  paddingRight: "15px",
                }}
              >
                <TextField
                  disabled
                  label="Selected Service"
                  variant="filled"
                  placeholder="Search from above..."
                  name={"labServiceName"}
                  value={labServiceName}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>

              <div
                className="col-md-5 col-sm-5 col-3"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  // disabled={enableForm}
                  label="Comments / Notes"
                  name={"labComments"}
                  value={labComments}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                />
              </div>

              <div className="col-md-2 col-sm-2 col-6">
                <Button
                  style={{
                    ...styles.stylesForButton,
                    marginTop: "25px",
                    backgroundColor: "#AD6BBF",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: 5,
                    backgroundColor: "rgb(173, 107, 191)",
                    height: 56,
                    outline: "none",
                    marginTop: 7,
                    width: "104%",
                  }}
                  disabled={!addLabRequest}
                  onClick={addSelectedLabItem}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add
                </Button>
              </div>
            </div>

            <div
              className="row"
              style={{
                marginTop: "20px",
                paddingLeft: "5px",
                paddingRight: "10px",
              }}
            >
              {labRequestArray !== 0 ? (
                <CustomTable
                  tableData={labRequestArray}
                  tableDataKeys={tableDataKeysForLabReq}
                  tableHeading={tableHeadingForLabReq}
                  handleEdit={handleView}
                  action={actions}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}
            </div>

            <div className="row" style={{ marginBottom: "25px" }}>
              <div className="col-md-6 col-sm-6 col-6">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: "pointer",
                    marginLeft: "-10px",
                  }}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                <Button
                  disabled={enableSave}
                  onClick={saveLabReq}
                  style={{ ...styles.stylesForButton, width: "140px" }}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Save</strong>
                </Button>
              </div>
            </div>
          </div>

          <Dialog
            aria-labelledby="form-dialog-title"
            open={openAddConsultDialog}
            maxWidth="xl"
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: "#31e2aa" }}>
              <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                Add Consultation Note
              </DialogTitle>
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-md-12 col-sm-12 col-12"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Description*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type="text"
                      placeholder="Enter Your description"
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
                </div>

                <div className="row">
                  <div
                    className="col-md-12"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>
                      Consultation Note*
                    </InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type="text"
                      placeholder="Add your consultation here..."
                      name={"consultationNotes"}
                      value={consultationNotes}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                    <ErrorMessage
                      name={consultationNotes}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Date*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type="text"
                      placeholder="Date"
                      name={"date"}
                      value={date}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Requester*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type="text"
                      placeholder="Requester"
                      name={"requester"}
                      value={requester}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                    <Button
                      style={{
                        color: "white",
                        cursor: "pointer",
                        borderRadius: 15,
                        backgroundColor: "#2c6ddd",
                        width: "140px",
                        height: "50px",
                        outline: "none",
                        paddingLeft: 30,
                        paddingRight: 30,
                      }}
                      // disabled={!validateItemsForm()}
                      onClick={addConsultRequest}
                      variant="contained"
                      color="primary"
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            aria-labelledby="form-dialog-title"
            open={openAddResidentDialog}
            maxWidth="xl"
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: "#31e2aa" }}>
              <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                Add Resident Note
              </DialogTitle>
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-md-12 col-sm-12 col-12"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Description*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type="text"
                      placeholder="Enter Your description"
                      name={"rdescription"}
                      value={rdescription}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                    <ErrorMessage
                      name={rdescription}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-12"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Note*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type="text"
                      placeholder="Add your note here..."
                      name={"note"}
                      value={note}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                    <ErrorMessage
                      name={note}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Date*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type="text"
                      placeholder="Date"
                      name={"date"}
                      value={date}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Doctor*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type="text"
                      placeholder="Doctor"
                      name={"doctor"}
                      value={doctor}
                      onChange={onChangeValue}
                      className="textInputStyle"
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                    <Button
                      style={{
                        color: "white",
                        cursor: "pointer",
                        borderRadius: 15,
                        backgroundColor: "#2c6ddd",
                        width: "140px",
                        height: "50px",
                        outline: "none",
                        paddingLeft: 30,
                        paddingRight: 30,
                      }}
                      disabled={!validateItemsForm()}
                      onClick={addResidentRequest}
                      variant="contained"
                      color="primary"
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            aria-labelledby="form-dialog-title"
            open={openExtenalConsultantDialog}
            maxWidth="xs"
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: "#31e2aa" }}>
              <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                Add External Consultant
              </DialogTitle>
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-md-12 col-sm-12 col-12"
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>
                      External Consultant*
                    </InputLabelComponent>
                    <Select
                      style={styles.inputField}
                      fullWidth
                      labelId="receiptUnit-label"
                      id="externalConsultant"
                      name="externalConsultant"
                      value={externalConsultant}
                      onChange={handleChangeExternalConsultant}
                      label="External Consultant"
                      className="dropDownStyle"
                      input={<BootstrapInput />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allExternalConsultants.map((val) => {
                        return (
                          <MenuItem key={val._id} value={val._id}>
                            {val.firstName + " " + val.lastName}
                          </MenuItem>
                        );
                      })}
                    </Select>

                    <ErrorMessage
                      name={externalConsultant}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginTop: "2%", marginBottom: "2%" }}>
                    <Button
                      onClick={() => setOpenExtenalConsultantDialog(false)}
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
                    <Button
                      style={{
                        color: "white",
                        cursor: "pointer",
                        borderRadius: 15,
                        backgroundColor: "#2c6ddd",
                        width: "140px",
                        height: "50px",
                        outline: "none",
                        paddingLeft: 30,
                        paddingRight: 30,
                      }}
                      // disabled={!validateItemsForm()}
                      onClick={handleGenerateECR}
                      disabled={!externalConsultant}
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      ) : (
        <div className="LoaderStyle">
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )}
    </div>
  );
}
export default AddEditPurchaseRequest;
