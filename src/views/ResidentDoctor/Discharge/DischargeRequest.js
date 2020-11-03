import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import TextField from "@material-ui/core/TextField";
import business_Unit from "../../../assets/img/Doctor - Discharge.png";
import Back from "../../../assets/img/Back_Arrow.png";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import PatientDetails from "../../../components/PatientDetails/PatientDetailsRCM";
import { jsPDF } from "jspdf";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomTable from "../../../components/Table/Table";
import plus_icon from "../../../assets/img/Plus.png";
import ViewSingleRequest from "./viewRequest";
import Notification from "../../../components/Snackbar/Notification.js";
import TextArea from "../../../components/common/TextArea";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Fingerprint from "../../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../../assets/img/Bar Code.png";
import {
  updateIPR,
  updateEdrIpr,
  getSingleIPRPatient,
  getSearchedpatient,
  searchpatient,
  notifyDischarge,
  AddDischargeRequestUrl,
  audioURL,
} from "../../../public/endpoins";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import {
  funForReducer,
  setPatientDetailsForReducer,
} from "../../../actions/Checking";
import logoPatientSummaryInvoice from "../../../assets/img/logoPatientSummaryInvoice.png";

const tableHeadingForDischargeMed = [
  "Request ID",
  "Date/Time",
  "Status",
  "Action",
];
const tableDataKeysForDischargeMed = [["requester", "_id"], "date", "status"];
const actions = { view: true, print: true };
const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: "20px",
  },
  headingStyles: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 12,
  },

  textStyles: {
    fontWeight: "700",
    color: "black",
    fontSize: 14,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
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
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "130px",
    height: "45px",
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

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
});

const useStylesForInput = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
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
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
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
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
    "& .MuiFormLabel-root": {
      fontSize: "12px",

      paddingRight: "50px",
    },
  },
  label: {
    "&$focusedLabel": {
      color: "red",
      display: "none"
    },
    // "&$erroredLabel": {
    //   color: "orange"
    // }
  },
  focusedLabel: {},
}));

function DischargeRequest(props) {
  const classesForTabs = useStylesForTabs();
  const classes = useStylesForInput();

  const initialState = {
    dischargeMedArray: "",
    dischargeReportArray: "",
    dischargeRequest: "",
    dischargeSummary: "",
    otherNotes: "",
    dischargeNotes: "",
    requestType: "",
    patientId: "",
    diagnosisArray: "",
    medicationArray: "",
    firstName: "",
    lastName: "",
    profileNo: "",
    createdAt: "", //admittedOn
    QR: "",
    requestNo: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    dischargeMedArray,
    dischargeReportArray,
    dischargeRequest,
    dischargeSummary,
    otherNotes,
    dischargeNotes,
    requestType,
    patientId,
    diagnosisArray,
    medicationArray,
    firstName,
    lastName,
    profileNo,
    createdAt, //admittedOn
    QR,
    requestNo,
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
  const [item, setItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [id, setId] = useState("");
  const [searchPatientQuery, setSearchPatientQuery] = useState("");
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(
    false
  );
  const [patientFound, setpatientFound] = useState("");
  const [patientDetails, setPatientDetails] = useState("");
  const [selectedPatientArray, setSelectedPatientArray] = useState([]);
  const [patientDetailsDialog, openPatientDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [enableForm, setenableForm] = useState(true);
  const [backIsEmpty, setBackIsEmpty] = useState(false);
  const [dischargeForm, setDischargeForm] = useState(false);
  const [timer, setTimer] = useState(null);
  const [loadSearchedData, setLoadSearchedData] = useState(false);

  useEffect(() => {
    if (props.patientDetails) {
      setPatientDetails(props.patientDetails);
      getPatientByInfo(props.patientDetails._id);
      openPatientDetailsDialog(true);
    }
    setCurrentUser(cookie.load("current_user"));

    // console.log(props.history.location.state.selectedItem)

    // const selectedRec = props.history.location.state.selectedItem
    // setSelectedItem(props.history.location.state.selectedItem)
    // setId(props.history.location.state.selectedItem._id)
    // setrequestNo(props.history.location.state.selectedItem.requestNo)
    // setSelectedPatient(props.history.location.state.selectedItem.patientId)

    // getEDRdetails()
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function viewItem(item) {
    if (item !== "") {
      setOpenItemDialog(true);

      for (let i = 0; i < item.medicine.length; i++) {
        if (item.medicine[i].itemType === "non_pharmaceutical") {
          item.medicine[i] = {
            ...item.medicine[i],
            dosage: "--",
            frequency: "--",
            duration: "--",
            itemType: "Non Pharmaceutical",
          };
        }
      }
      setItem(item);
    } else {
      setOpenItemDialog(false);
      setItem("");
    }
  }

  const formatDate = (date) => {
    const d = new Date(date);

    let minutes = "";

    if (d.getHours().toString().length === 1) {
      minutes = "0" + d.getHours();
    } else {
      minutes = d.getHours();
    }
    return (
      // d.getDate() +
      d.getDate() +
      " - " +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      " - " +
      // (d.getMonth() + 1) +
      d.getFullYear() +
      " " +
      // d.toLocaleTimeString()
      minutes +
      ":" +
      ("00" + d.getMinutes()).slice(-2)
    );
  };

  function printPDFReport(item) {
    console.log("printing item", item);

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

    var dischargeNo = "DR" + day + YYYY + HH + mm + ss;

    var doc = new jsPDF();

    var logo = new Image();
    logo.src = logoPatientSummaryInvoice;

    // header
    doc.setFontSize(15);
    doc.addImage(logo, "PNG", 10, 5, 50, 28);
    doc.text(60, 15, "Al-Khalidi Hospital & Medical Center");
    doc.line(73, 18, 135, 18);
    doc.text(78, 24.5, "Discharge Medication");
    doc.line(73, 28, 135, 28);
    doc.setFontSize(12);
    doc.text(170, 8, "Amman Jordan");

    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 20, "F");

    // information of patient
    // labels
    doc.setFontSize(10);
    doc.setFont("times", "bold");
    doc.text(12, 50, "Patient Name:");
    doc.text(12, 55, "Visit Date:");
    doc.text(12, 60, "Patient MRN:");
    doc.text(120, 50, "Request No:");
    doc.text(120, 55, "Request Date");
    doc.text(120, 60, "Visit No:");

    // dynamic data of patient
    doc.setFont("times", "normal");
    doc.text(47, 50, firstName + " " + lastName); // Patient Name
    doc.text(47, 55, createdAt !== "" ? formatDate(createdAt) : "--");
    doc.text(47, 60, profileNo.toUpperCase());
    doc.text(155, 50, dischargeNo);
    doc.text(155, 55, formatDate(dateNow));
    doc.text(155, 60, `${requestNo}`);

    // table
    doc.autoTable({
      margin: { top: 70, right: 10, left: 10 },
      tableWidth: "auto",
      headStyles: { fillColor: [44, 109, 221] },
      html: "#dischargeRequestForm",
    });

    // footer
    doc.text(10, 243, "Signature & Stamp");
    doc.line(10, 250, 75, 250);

    doc.line(0, 260, 210, 260);
    doc.text(10, 290, `Prepared by: ${currentUser.name}`);
    if (QR) {
      var img = new Image();
      img.src = `${audioURL + QR}`;
      doc.addImage(img, "PNG", 172.9, 266, 25, 25);
    }

    doc.save(`Discharge Request ${dischargeNo}.pdf`);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      triggerChange();
    }
  };

  const triggerChange = (a) => {
    handlePatientSearch(a);
  };

  const handlePauseSearch = (e) => {
    setLoadSearchedData(true);
    clearTimeout(timer);

    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchPatientQuery(a);

    setTimer(
      setTimeout(() => {
        triggerChange(a);
      }, 600)
    );
  };

  const handlePatientSearch = (e) => {
    if (e.length >= 3) {
      axios
        .get(
          getSearchedpatient + "/" + currentUser.functionalUnit._id + "/" + e
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              setpatientFoundSuccessfully(true);
              setpatientFound(res.data.data);
              setLoadSearchedData(false);
            } else {
              setpatientFoundSuccessfully(false);
              setpatientFound("");
              setLoadSearchedData(false);
            }
          }
        })
        .catch((e) => {
          console.log("error after searching patient request", e);
        });
    }
  };

  function handleAddPatient(i) {
    dispatch({ field: "diagnosisArray", value: "" });
    dispatch({ field: "medicationArray", value: "" });
    // setDialogOpen(true);
    console.log("selected banda : ", i);

    props.setPatientDetailsForReducer(i);

    dispatch({ field: "dischargeNotes", value: "" });
    dispatch({ field: "otherNotes", value: "" });
    setPatientDetails(i);
    getPatientByInfo(i._id);
    openPatientDetailsDialog(true);

    const obj = {
      itemCode: i.itemCode,
    };

    setSelectedPatientArray((pervState) => [...pervState, obj]);
    setSearchPatientQuery("");
  }

  const getPatientByInfo = (id) => {
    axios
      .get(searchpatient + "/" + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(
              "Response after getting EDR/IPR data : ",
              res.data.data
            );

            setIsLoading(false);
            setSelectedItem(res.data.data);
            setId(res.data.data._id);
            setenableForm(false);

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "patientId") {
                  dispatch({ field: "patientId", value: val._id });
                  Object.entries(val).map(([key1, val1]) => {
                    dispatch({ field: key1, value: val1 });
                  });
                } else if (key === "dischargeRequest") {
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 === "dischargeSummary") {
                      dispatch({ field: "dischargeSummary", value: val1 });
                      dispatch({
                        field: "dischargeNotes",
                        value: val1.dischargeNotes,
                      });
                      dispatch({ field: "otherNotes", value: val1.otherNotes });
                    } else if (key1 === "dischargeMedication") {
                      dispatch({ field: "dischargeMedArray", value: [val1] });
                      dispatch({
                        field: "dischargeReportArray",
                        value: val1.medicine ? val1.medicine : "",
                      });
                    }
                  });
                  dispatch({ field: "dischargeRequest", value: val });
                } else if (key === "residentNotes") {
                  if (val && val.length > 0) {
                    let data = [];
                    val.map((d) => {
                      d.code.map((singleCode) => {
                        let found = data.find((i) => i === singleCode);
                        if (!found) {
                          data.push(singleCode);
                        }
                      });
                    });
                    dispatch({
                      field: "diagnosisArray",
                      value: data,
                    });
                  }
                } else if (key === "pharmacyRequest") {
                  let data = [];
                  val.map((d) => {
                    d.item.map((item) => {
                      let found = data.find((i) => i === item.itemId.name);
                      if (!found) {
                        data.push(item.itemId.name);
                      }
                    });
                  });
                  dispatch({ field: "medicationArray", value: data });
                }
              } else {
                dispatch({ field: key, value: val });
              }
            });
          }
        } else {
          setOpenNotification(true);
          setErrorMsg("EDR/IPR not generated for patient");
        }
      })
      .catch((e) => {
        setOpenNotification(true);
        setErrorMsg(e);
      });
  };

  const addNewRequest = () => {
    let path = `dischargerequest/addDischargeRequest`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: selectedItem,
        dischargeMedArray,
        otherNotes,
        dischargeNotes,
      },
    });
  };

  const addNewDischargeRequest = () => {
    // let formData = new FormData();
    // if (depositSlip) {
    //   formData.append("file", depositSlip, depositSlip.name);
    // }
    // if (validatePatientForm() || validateInsuranceForm()) {
    let params = "";

    let amountReceived = patientDetails.amountReceived
      ? patientDetails.amountReceived
      : 0;

    if (requestType === "EDR") {
      params = {
        edrId: requestType === "EDR" ? id : "",
        generatedFor: requestType,
        paymentMethod: patientDetails.paymentMethod,
        depositAmount: patientDetails.payment,
        amountReceived: amountReceived,
        totalAmount: amountReceived + patientDetails.payment,
        bankName: patientDetails.bankName,
        depositorName: patientDetails.depositorName,
        receivedBy: currentUser.staffId,
      };
    }

    if (requestType === "IPR") {
      params = {
        iprId: requestType === "IPR" ? id : "",
        paymentMethod: patientDetails.paymentMethod,
        depositAmount: patientDetails.payment,
        amountReceived: amountReceived,
        totalAmount: amountReceived + patientDetails.payment,
        bankName: patientDetails.bankName,
        depositorName: patientDetails.depositorName,
        receivedBy: currentUser.staffId,
      };
    }
    console.log("PARAMSS ", params);
    // console.log("DATAAA ", formData);
    axios
      .post(AddDischargeRequestUrl, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response after adding discharge request", res.data.data);
          // setPatientId(res.data.data._id);
          // props.history.goBack();
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch((e) => {
        console.log("error after adding patient details", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the patient details");
      });
    // }
  };

  const submitDischargeSummary = () => {
    if (validateDischargeForm()) {
      const params = {
        _id: id,
        requestType,
        dischargeRequest: {
          ...dischargeRequest,
          dischargeSummary: {
            dischargeNotes: dischargeNotes,
            otherNotes: otherNotes,
          },
        },
      };
      console.log("params", params);
      axios
        .put(updateEdrIpr, params)
        .then((res) => {
          if (res.data.success) {
            console.log(
              "response while adding Discharge Req medication",
              res.data.data
            );
            addNewDischargeRequest();
            notifyForDischarge(patientId);
            props.history.push({
              pathname: "dischargerequest/success",
              state: {
                message: `Discharge Summary Request: ${
                  res.data.data.requestNo
                } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} Submitted successfully`,
              },
            });
            props.setPatientDetailsForReducer("");
          } else if (!res.data.success) {
            setOpenNotification(true);
            setErrorMsg("Error while adding the Discharge request");
          }
        })
        .catch((e) => {
          console.log("error after adding Discharge request", e);
          setOpenNotification(true);
          setErrorMsg("Error after adding the Discharge request");
        });
    }
    setDischargeForm(true);
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

  const onClick = () => {
    setValue(value + 1);
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function validateDischargeForm() {
    return (
      // dischargeMedArray &&
      // dischargeMedArray[0].medicine.length !== 0 &&
      dischargeNotes !== "" && otherNotes !== ""
    );
  }

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

      <div className="cPadding">
        <div className="subheader" style={{ marginLeft: "-10px" }}>
          <div>
            <img src={business_Unit} />
            <h4>Discharge</h4>
          </div>
        </div>

        <div
          className={`${"container-fluid"} ${classes.root}`}
          style={{
            marginTop: "25px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <div className="row">
            <div
              className="col-md-10 col-sm-8 col-8"
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
                onChange={handlePauseSearch}
                onKeyDown={handleKeyDown}
                InputLabelProps={{
                  classes: {
                    root: classes.label,
                    focused: classes.focusedLabel,
                    error: classes.erroredLabel
                  }
                }}
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
              />
            </div>

            <div
              className="col-md-1 col-sm-2 col-2"
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
                <img src={BarCode} style={{ width: 70, height: 60 }} />
              </div>
            </div>

            <div
              className="col-md-1 col-sm-2 col-2"
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
                <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
              </div>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-10 col-sm-9 col-8"
              style={styles.textFieldPadding}
            >
              {searchPatientQuery ? (
                <div
                  style={{
                    zIndex: 3,
                    position: "absolute",
                    width: "99%",
                    marginTop: 5,
                  }}
                >
                  <Paper style={{ maxHeight: 300, overflow: "auto" }}>
                    {patientFoundSuccessfull && patientFound !== "" ? (
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>MRN</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
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
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    ) : loadSearchedData ? (
                      <div style={{ textAlign: "center" }}>
                        <Loader
                          type="TailSpin"
                          color="#2c6ddd"
                          height={25}
                          width={25}
                          style={{ display: "inline-block", padding: "10px" }}
                        />
                        <span
                          style={{ display: "inline-block", padding: "10px" }}
                        >
                          <h4>Searching Patient...</h4>
                        </span>
                      </div>
                    ) : searchPatientQuery && !patientFoundSuccessfull ? (
                      <div style={{ textAlign: "center", padding: "10px" }}>
                        <h4> No Patient Found !</h4>
                      </div>
                    ) : (
                      undefined
                    )}
                  </Paper>
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            height: "20px",
          }}
        />
        <div className={`${classes.root}`}>
          <PatientDetails
            patientDetails={patientDetails}
            // showPatientDetails={showPatientDetails}
            diagnosisArray={diagnosisArray}
            medicationArray={medicationArray}
          />
        </div>
        <div
          style={{
            height: "20px",
          }}
        />
        <div className={classesForTabs.root}>
          <Tabs
            classes={{
              root: classesForTabs.root,
              scroller: classesForTabs.scroller,
            }}
            value={value}
            onChange={handleChange}
            textColor="primary"
            TabIndicatorProps={{ style: { background: "#12387a" } }}
            ndicatorColor="null"
            centered={false}
            variant="scrollable"
            fullWidth={true}
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                color: value === 0 ? "#12387a" : "#3B988C",
              }}
              label="Discharge Summary"
              disabled={enableForm}
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                color: value === 1 ? "#12387a" : "#3B988C",
              }}
              label="Discharge Medication"
              disabled={enableForm}
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
              paddingLeft: "1px",
              paddingRight: "1px",
            }}
            className={`${"container-fluid"} ${classes.root}`}
          >
            <div className="row">
              <div
                className="col-md-12"
                style={{ marginTop: "20px" }}
                // style={{
                //   ...styles.inputContainerForTextField,
                //   ...styles.textFieldPadding,
                // }}
              >
                <TextField
                  required
                  multiline
                  type="text"
                  label="Discharge Notes"
                  disabled={enableForm}
                  name={"dischargeNotes"}
                  value={dischargeNotes}
                  error={dischargeNotes === "" && dischargeForm}
                  onChange={onChangeValue}
                  rows={4}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }} className="row">
              <div className="col-md-12 col-sm-12 col-12">
                <TextField
                  required
                  multiline
                  type="text"
                  label="Other Notes"
                  disabled={enableForm}
                  name={"otherNotes"}
                  value={otherNotes}
                  onChange={onChangeValue}
                  error={otherNotes === "" && dischargeForm}
                  rows={4}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>

            <div
              className="row d-flex"
              style={{ marginBottom: "25px", marginTop: "25px" }}
            >
              <div className="mr-auto p-2">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    marginTop: "7px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  marginRight: "2px",
                }}
                // className='container-fluid'
              >
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    marginTop: "2%",
                    marginBottom: "2%",
                    paddingRight: "7px",
                  }}
                >
                  <div className="p-2">
                    <Button
                      disabled={enableForm}
                      style={styles.stylesForButton}
                      //disabled={!validateFormType1()}
                      onClick={onClick}
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  </div>
                  <div className="p-2">
                    <Button
                      onClick={submitDischargeSummary}
                      style={styles.stylesForButton}
                      variant="contained"
                      color="primary"
                      // disabled={!validateDischargeForm()}
                    >
                      <strong style={{ fontSize: "12px" }}>Submit</strong>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container-fluid"
          >
            {dischargeReportArray && dischargeReportArray.length > 0 ? (
              <Table
                id="dischargeRequestForm"
                style={{ display: "none" }}
                aria-label="dischargeRequestForm"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Ser.</TableCell>
                    <TableCell>Item Code</TableCell>
                    <TableCell align="right">Item Name</TableCell>
                    <TableCell align="right">Requested Qty</TableCell>
                    <TableCell align="right">Price (JD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dischargeReportArray.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.itemId.itemCode}
                      </TableCell>
                      <TableCell align="right">{row.medicineName}</TableCell>
                      <TableCell align="right">{row.requestedQty}</TableCell>
                      <TableCell align="right">
                        {row.totalPrice.toFixed(4) + " JD"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              undefined
            )}

            <div className="row" style={{ marginTop: "20px" }}>
              {dischargeMedArray !== 0 && backIsEmpty === false ? (
                <CustomTable
                  tableData={dischargeMedArray}
                  tableDataKeys={tableDataKeysForDischargeMed}
                  tableHeading={tableHeadingForDischargeMed}
                  handleView={viewItem}
                  handlePrint={printPDFReport}
                  action={actions}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              ) : (
                <CustomTable
                  tableData={[]}
                  tableDataKeys={tableDataKeysForDischargeMed}
                  tableHeading={tableHeadingForDischargeMed}
                  handleView={viewItem}
                  action={actions}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
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
              <div
                className="col-md-6 col-sm-6 col-6 d-flex justify-content-end"
                style={{ paddingRight: "1px" }}
              >
                <Button
                  disabled={enableForm}
                  onClick={addNewRequest}
                  style={{ ...styles.stylesForButton, width: "150" }}
                  variant="contained"
                  color="primary"
                >
                  <img className="icon-style" src={plus_icon} />
                  &nbsp;&nbsp;
                  <strong style={{ fontSize: "12px" }}>Pharmacy Request</strong>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          ></div>
        )}

        {openItemDialog ? (
          <ViewSingleRequest
            item={item}
            openItemDialog={openItemDialog}
            viewItem={viewItem}
          />
        ) : (
          undefined
        )}

        <Notification msg={errorMsg} open={openNotification} />
      </div>
    </div>
  );
}
const mapStateToProps = ({ CheckingReducer }) => {
  const { count, patientDetails } = CheckingReducer;
  return { count, patientDetails };
};
export default connect(mapStateToProps, {
  funForReducer,
  setPatientDetailsForReducer,
})(DischargeRequest);
