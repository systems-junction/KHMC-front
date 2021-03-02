/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import axios from "axios";
import {
  updateEDR,
  getSingleIPRPatient,
  getAllExternalConsultantsUrl,
  addECRUrl,
  getDischargeIPRUrl,
  getDischargeByIdURL,
  updateDischargeIPRUrl,
  updateDischargeByIdURL,
} from "../../../../public/endpoins";
import cookie from "react-cookies";
import Header from "../../../../components/Header/Header";
import dischargeIcon from "../../../../assets/img/Discharge Medication.png";
import Back from "../../../../assets/img/Back_Arrow.png";
import "../../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import CustomTable from "../../../../components/Table/Table";
// import ViewSingleRequest from './viewRequest'
import InputLabelComponent from "../../../../components/InputLabel/inputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ErrorMessage from "../../../../components/ErrorMessage/errorMessage";
import Notification from "../../../../components/Snackbar/Notification.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import BootstrapInput from "../../../../components/Dropdown/dropDown.js";
import Loader from "react-loader-spinner";
import "../../../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const tableHeadingForPharmacy = [
  "Medicine Name",
  "Quantity",
  "Unit Price ( JD)",
  "Total Price ( JD)",
  "",
];
const tableDataKeysForPharmacy = [
  "medicineName",
  "requestedQty",
  // "unitPrice",
  // "totalPrice",
  "issueUnitCost",
  "total",
];

const statusArray = [
  {
    key: "pending",
    value: "Pending",
  },
  {
    key: "completed",
    value: "Completed",
  },
];

const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: "20px",
  },
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
  input: {
    display: "none",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    height: "50px",
    outline: "none",
    width: "140px",
  },
  stylesForDropdown: {
    marginTop: 0,
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
    borderRadius: 5,
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
    borderRadius: 5,
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

    radioServiceId: "",
    radioServiceCode: "",
    radioServiceName: "",
    radiologyRequestArray: "",
    radioServiceStatus: "",

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
    medicineDataArray: "",

    name: "",
    price: "",
    status: "",
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

    radioServiceId,
    radioServiceCode,
    radioServiceName,
    radiologyRequestArray,
    radioServiceStatus,

    consultationNoteArray,
    date = new Date(),
    description,
    consultationNotes,
    requester = cookie.load("current_user").name,

    residentNoteArray,
    rdescription,
    note,
    doctor = cookie.load("current_user").name,

    pharmacyRequestArray,
    medicineDataArray,

    name,
    price,
    status,
  } = state;

  const onChangeValue = (e) => {
    console.log(e, "e");
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const [currentUser, setCurrentUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [, setValue] = React.useState(0);
  const [, setOpenItemDialog] = useState(false);
  const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false);
  const [openAddResidentDialog, setOpenAddResidentDialog] = useState(false);
  const [, setItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [requestNo, setrequestNo] = useState("");
  const [, setSearchQuery] = useState("");
  const [, setItemFound] = useState("");
  const [, setItemFoundSuccessfully] = useState(false);
  const [isFormSubmitted] = useState(false);
  const [id, setId] = useState("");
  const [, setSearchRadioQuery] = useState("");
  const [, setRadioItemFoundSuccessfully] = useState("");
  const [, setRadioItemFound] = useState("");
  const [, setaddLabRequest] = useState(false);
  const [, setaddRadioRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [externalConsultant, setExternalConsultant] = useState("");
  const [allExternalConsultants, setAllExternalConsultants] = useState([]);
  const [
    openExtenalConsultantDialog,
    setOpenExtenalConsultantDialog,
  ] = useState(false);

  const getEDRById = (id) => {
    axios
      .get(getSingleIPRPatient + "/" + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data[0]);

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

  const getLRByIdURI = (id) => {
    axios
      .get(getDischargeByIdURL + "/" + id)
      .then((res) => {
        if (res.data.success) {
          console.log(
            res.data.data.dischargeRequest.dischargeMedication.medicine,
            "data"
          );
          res.data.data.dischargeRequest.dischargeMedication.medicine.map(
            (d) => (
              (d.issueUnitCost = d.itemId.issueUnitCost.toFixed(4)),
              (d.total = (d.itemId.issueUnitCost * d.requestedQty).toFixed(4))
            )
          );
          // res.data.data.dischargeRequest.dischargeMedication.medicine.map(
          //   (d) =>
          //     (d.total = (d.itemId.issueUnitCost * d.requestedQty).toFixed(4))
          // )
          if (res.data.data) {
            setIsLoading(false);

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "dischargeRequest") {
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 == "dischargeMedication") {
                      Object.entries(val1).map(([key2, val2]) => {
                        if (key2 === "medicine") {
                          dispatch({ field: "medicineDataArray", value: val2 });
                        }
                      });
                    }
                  });
                  dispatch({ field: "status", value: val.status });
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

  const updateLRByIdURI = () => {
    const params = {
      _id: id,
      status: status,
    };
    console.log(params, "params");
    axios
      .put(updateDischargeByIdURL, params)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "data");
          if (res.data.data) {
            console.log(res.data.data, "data2");
            // setIsLoading(false);
            props.history.push({
              pathname: "success",
              state: {
                //of Request No ${res.data.data.dischargeRequest.dischargeMedication.requester}
                message: `Medication order: ${
                  res.data.data.requestNo
                } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} updated successfully`,
              },
            });
          } else if (!res.data.success) {
            setOpenNotification(true);
            setErrorMsg("Error while updating");
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
    // getEDRById(props.history.location.state.selectedItem._id)
    getLRByIdURI(props.history.location.state.selectedItem._id);

    setCurrentUser(cookie.load("current_user"));

    const selectedRec = props.history.location.state.selectedItem._id;
    console.log(selectedRec, "rec");
    setId(props.history.location.state.selectedItem._id);
    setSelectedItem(props.history.location.state.selectedItem);
    setrequestNo(props.history.location.state.selectedItem.requestNo);
    setSelectedPatient(props.history.location.state.selectedItem.patientId);
    console.log(props.history.location.state.selectedItem.patientId, "patient");
  }, []);

  const handleChangeExternalConsultant = (event) => {
    setExternalConsultant(event.target.value);
  };

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

  function hideDialog() {
    setOpenAddConsultDialog(false);
    setOpenAddResidentDialog(false);

    dispatch({ field: "consultationNo", value: "" });
    dispatch({ field: "description", value: "" });
    dispatch({ field: "consultationNotes", value: "" });
    dispatch({ field: "rdescription", value: "" });
    dispatch({ field: "note", value: "" });
  }

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

  // console.log(medicineDataArray, 'medicineArray')

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
      <Header history={props.history} />

      {!isLoading ? (
        <div className={`cPadding ${classes.root}`}>
          <div className="subheader" style={{ marginLeft: "-10px" }}>
            <div>
              <img src={dischargeIcon} />
              <h4>Discharge</h4>
            </div>
          </div>
          <div
            style={{
              height: "20px",
            }}
          />
          <div className="container-fluid" style={styles.patientDetails}>
            <div className="row">
              <div className="col-md-12">
                <h4 style={{ color: "#2c6ddd", fontWeight: "600" }}>
                  Patient Details
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Patient Name
                  </InputLabel>
                  <span>
                    {selectedPatient.firstName + ` ` + selectedPatient.lastName}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Gender
                  </InputLabel>
                  <span>{selectedPatient.gender}</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Age
                  </InputLabel>
                  <span>{selectedPatient.age}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    MRN
                  </InputLabel>
                  <span className="mrnUpperCase">
                    {selectedPatient.profileNo}
                  </span>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Insurance No
                  </InputLabel>
                  <span>
                    {selectedPatient.insuranceNo
                      ? selectedPatient.insuranceNo
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Request No
                  </InputLabel>
                  <span>{requestNo}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              height: "20px",
            }}
          />
          <div className="container-fluid">
            <div className="row" style={{ marginTop: "5px" }}>
              <div
                className="col-md-12 col-sm-12"
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  fullWidth
                  select
                  labelId="status-label"
                  id="status"
                  variant="filled"
                  name="status"
                  value={status}
                  onChange={(e) => onChangeValue(e)}
                  label="Status"
                  className="dropDownStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  input={<BootstrapInput />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {statusArray &&
                    statusArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
            </div>
          </div>

          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container-fluid"
          >
            <div className="row" style={{ marginTop: "5px" }}>
              {medicineDataArray !== 0 ? (
                <CustomTable
                  tableData={medicineDataArray}
                  tableDataKeys={tableDataKeysForPharmacy}
                  tableHeading={tableHeadingForPharmacy}
                  // handleView={viewItem}
                  // action={actions}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}
            </div>
          </div>

          <div
          // style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
          // className={`${'container-fluid'} ${classes.root}`}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                marginTop: "2%",
                marginBottom: "2%",
                paddingRight: "2px",
              }}
            >
              <Button
                onClick={updateLRByIdURI}
                style={styles.stylesForButton}
                variant="contained"
                color="primary"
              >
                <strong style={{ fontSize: "12px" }}>Update</strong>
              </Button>
            </div>

            <br />
            <div className="row" style={{ marginBottom: "25px" }}>
              <div className="col-md-6 col-sm-6 col-6">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: "pointer" }}
                />
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
                        borderRadius: 5,
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
                        borderRadius: 5,
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
                        borderRadius: 5,
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
