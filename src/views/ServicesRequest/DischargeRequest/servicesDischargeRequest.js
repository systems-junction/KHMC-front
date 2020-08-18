/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import business_Unit from "../../../assets/img/Purchase Order.png";
import Back from "../../../assets/img/Back_Arrow.png";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomTable from "../../../components/Table/Table";
import plus_icon from "../../../assets/img/Plus.png";
import ViewSingleRequest from "./viewRequestService";
import Notification from "../../../components/Snackbar/Notification.js";
import TextArea from "../../../components/common/TextArea";
import axios from "axios";
import { updateEDR, getEDRDischargeUrl } from "../../../public/endpoins";
import { FaUpload } from "react-icons/fa";

import { AddDischargeRequestUrl } from "../../../public/endpoins";

const tableHeadingForDischargeMed = [
  "Request ID",
  "Date/Time",
  "Status",
  "Action",
];
const tableDataKeysForDischargeMed = [
  ["requester", "identificationNumber"],
  "date",
  "status",
];

const tableHeadingForServices = ["Service Name", "Date", "Price", "Actions"];
const tableDataKeysForServices = ["RequestType", "date", "totalCost"];

const actions = { view: true };

const actionsForBillSummary = { print: true };

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
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    height: "50px",
    outline: "none",
    width: 120,
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  inputField: {
    outline: "none",
  },
  upload: {
    backgroundColor: "white",
    border: "0px solid #ccc",
    borderRadius: "5px",
    color: "gray",
    // marginTop: "30px",
    width: "100%",
    height: "55px",
    cursor: "pointer",
    padding: "15px",
  },
};

const useStyles = makeStyles((theme) => ({
  rootTab: {
    justifyContent: "center",
  },
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

function DischargeRequest(props) {
  const classes = useStyles();

  const initialState = {
    dischargeMedArray: "",

    otherNotes: "",
    dischargeNotes: "",
    paymentMethod: "cash",

    depositAmount: "",
    amountReceived: "",
    totalAmount: "",
    dateTime: new Date(),
    receivedBy: "",
    bankName: "",
    depositorName: "",
    depositSlip: "",
    requestType: "",
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

    otherNotes,
    dischargeNotes,
    paymentMethod,

    depositAmount,
    amountReceived,
    totalAmount,
    dateTime,
    receivedBy,
    bankName,
    depositorName,
    depositSlip,
    requestType,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSlipUpload = (event) => {
    if (event.target.files[0]) {
      var file = event.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

      reader.onloadend = function(e) {
        // setImagePreview([reader.result]);
        dispatch({ field: "depositSlip", value: file });
      };

      console.log(file.name, "fle");
    }
  };

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [value, setValue] = React.useState(0);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [item, setItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [requestNo, setrequestNo] = useState("");
  const [id, setId] = useState("");

  const [usedServices, setUsedServices] = useState("");

  useEffect(() => {
    // setCurrentUser(cookie.load("current_user"));

    console.log(props.history.location.state.selectedItem);
    const selectedRec = props.history.location.state.selectedItem;
    setSelectedItem(props.history.location.state.selectedItem);
    setId(props.history.location.state.selectedItem._id);
    setrequestNo(props.history.location.state.selectedItem.requestNo);
    setSelectedPatient(props.history.location.state.selectedItem.patientId);

    // getEDRdetails();

    if (selectedRec) {
      if (selectedRec.pharmacyRequest) {
        for (let i = 0; i < selectedRec.pharmacyRequest.length; i++) {
          let amount = 0;
          let singlePR = selectedRec.pharmacyRequest[i];
          for (let j = 0; j < singlePR.medicine.length; j++) {
            amount = amount + singlePR.medicine[j].itemId.purchasePrice;
          }
          selectedRec.pharmacyRequest[i] = {
            ...selectedRec.pharmacyRequest[i],
            totalCost: amount,
            RequestType: "PHR",
            item: "Medicine",
            insurance: "Uncovered",
          };
        }
      }
      if (selectedRec.labRequest) {
        selectedRec.labRequest.map(
          (d) => (
            (d.RequestType = "LR"),
            (d.item = d.serviceName),
            (d.totalCost = d.serviceId.price),
            (d.insurance = "Uncovered")
          )
        );
      }
      if (selectedRec.radiologyRequest) {
        selectedRec.radiologyRequest.map(
          (d) => (
            (d.RequestType = "RR"),
            (d.item = d.serviceName),
            (d.totalCost = d.serviceId.price),
            (d.insurance = "Uncovered")
          )
        );
      }

      if (selectedRec.nurseService) {
        selectedRec.nurseService.map(
          (d) => (
            (d.RequestType = "NS"),
            (d.item = d.serviceName),
            (d.totalCost = d.serviceId.price),
            (d.insurance = "Uncovered")
          )
        );
      }
    }
    setUsedServices(
      [].concat(
        selectedRec.labRequest,
        selectedRec.radiologyRequest,
        selectedRec.pharmacyRequest
      )
    );
    console.log(
      [].concat(
        selectedRec.labRequest,
        selectedRec.radiologyRequest,
        selectedRec.pharmacyRequest
      )
    );

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          if (key === "dischargeRequest") {
            // console.log("INNNN dischargeRequest",key,val)
            Object.entries(val).map(([key1, val1]) => {
              if (key1 === "dischargeSummary") {
                // console.log("INNNN dischargeSummary",key1,val1)
                dispatch({
                  field: "dischargeNotes",
                  value: val1.dischargeNotes,
                });
                dispatch({ field: "otherNotes", value: val1.otherNotes });
              } else if (key1 === "dischargeMedication") {
                console.log("INNNN dischargeMedication", key1, val1);
                dispatch({ field: "dischargeMedArray", value: [val1] });
              }
            });
          }
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
  }, []);

  function getEDRdetails() {
    axios
      .get(getEDRDischargeUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("response after getting the EDR details", res.data.data);
          setSelectedItem(res.data.data);
          // const selectedRec = res.data.data[0];

          // if (selectedRec) {
          //   Object.entries(selectedRec).map(([key, val]) => {
          //     if (val && typeof val === "object") {
          //       if (key === "dischargeRequest") {
          //         // console.log("INNNN dischargeRequest",key,val)
          //         Object.entries(val).map(([key1, val1]) => {
          //           if (key1 === "dischargeSummary") {
          //             console.log(key1, val1);
          //             dispatch({
          //               field: "dischargeNotes",
          //               value: val1.dischargeNotes,
          //             });
          //             dispatch({ field: "otherNotes", value: val1.otherNotes });
          //           } else if (key1 === "dischargeMedication") {
          //             // console.log("INNNN dischargeMedication",key1,val1)
          //             dispatch({ field: "dischargeMedArray", value: [val1] });
          //           }
          //         });
          //       }
          //     } else {
          //       dispatch({ field: key, value: val });
          //     }
          //   });
          // }
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
    console.log(item);

    if (item !== "") {
      setOpenItemDialog(true);
      setItem(item);
    } else {
      setOpenItemDialog(false);
      setItem("");
    }
  }

  const addNewRequest = () => {
    console.log(currentUser);
    console.log(requestType);

    let formData = new FormData();
    if (depositSlip) {
      formData.append("file", depositSlip, depositSlip.name);
    }
    // if (validatePatientForm() || validateInsuranceForm()) {
    let params = "";

    if (requestType === "EDR") {
      params = {
        edrId: requestType === "EDR" ? id : "",
        generatedFor: requestType,
        paymentMethod,
        depositAmount,
        amountReceived: selectedPatient.amountReceived,
        totalAmount: selectedPatient.amountReceived + depositAmount,
        bankName,
        depositorName,
        receivedBy: currentUser._id,
      };
    }

    if (requestType === "IPR") {
      params = {
        iprId: requestType === "IPR" ? id : "",
        generatedFor: requestType,
        paymentMethod,
        depositAmount,
        amountReceived,
        totalAmount,
        bankName,
        depositorName,
        receivedBy: currentUser._id,
      };
    }

    formData.append("data", JSON.stringify(params));
    console.log("PARAMSS ", params);
    console.log("DATAAA ", formData);
    axios
      .post(AddDischargeRequestUrl, formData, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "response after adding discharge request");
          // setPatientId(res.data.data._id);
          props.history.goBack();
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
    const params = {
      _id: id,
      dischargeRequest: {
        dischargeSummary: {
          dischargeNotes: dischargeNotes,
          otherNotes: otherNotes,
        },
      },
    };
    console.log("params", params);
    axios
      .put(updateEDR, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response while adding Discharge Req", res.data.data);
          props.history.goBack();
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

  const onCheckedValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validatePatientForm() {
    if (paymentMethod === "cash") {
      return (
        depositAmount && depositAmount.length > 0
        //  &&
        // amountReceived &&
        // amountReceived.length > 0 &&
        // totalAmount &&
        // totalAmount.length > 0
      );
    } else if (paymentMethod === "wireTransfer") {
      return (
        bankName &&
        bankName.length > 0 &&
        depositorName &&
        depositorName.length > 0
      );
    } else if (paymentMethod === "Insurance") {
      return false;
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

      <div className={`cPadding ${classes.root}`}>
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>EDR - Discharge Request</h4>
          </div>
        </div>
        <div
          style={{
            height: "20px",
          }}
        />
        <div className="container" style={styles.patientDetails}>
          <div className="row">
            <div className="col-md-12">
              <h4 style={{ color: "blue", fontWeight: "600" }}>
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
                  Patient ID
                </InputLabel>
                <span>{selectedPatient.profileNo}</span>
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Insurance No
                </InputLabel>
                <span>
                  {selectedPatient.insuranceId
                    ? selectedPatient.insuranceId
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
        <div className={classes.root}>
          <Tabs
            classes={{
              root: classes.rootTab,
              scroller: classes.scroller,
            }}
            value={value}
            onChange={handleChange}
            indicatorColor="null"
            centered={false}
            variant="scrollable"
            fullWidth={true}
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 0 ? "#2c6ddd" : undefined,
              }}
              label="Discharge Notes"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 1 ? "#2c6ddd" : undefined,
              }}
              label="Discharge Medication"
            />

            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 2 ? "#2c6ddd" : undefined,
              }}
              label="Bill Summary"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 3 ? "#2c6ddd" : undefined,
              }}
              label="Payment"
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          >
            <div style={{ marginTop: "20px" }} className="row">
              <div className="col-md-12 col-sm-12 col-12">
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Discharge Notes
                </InputLabel>

                <span>
                  {selectedItem &&
                  selectedItem &&
                  selectedItem.dischargeRequest.dischargeSummary
                    ? selectedItem.dischargeRequest.dischargeSummary
                        .dischargeNotes
                    : ""}{" "}
                </span>
              </div>
            </div>

            <div style={{ marginTop: "20px" }} className="row">
              <div className="col-md-12 col-sm-12 col-12">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Other Notes
                  </InputLabel>

                  <span>
                    {selectedItem &&
                    selectedItem.dischargeRequest.dischargeSummary.otherNotes
                      ? selectedItem.dischargeRequest.dischargeSummary
                          .otherNotes
                      : ""}{" "}
                  </span>
                </div>
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
                  }}
                />
              </div>
              {/* <div className="p-2">
                <Button
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
                >
                  <strong style={{ fontSize: "12px" }}>Submit</strong>
                </Button>
              </div> */}
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          >
            <div className="row" style={{ marginTop: "20px" }}>
              {dischargeMedArray !== 0 ? (
                <CustomTable
                  tableData={dischargeMedArray}
                  tableDataKeys={tableDataKeysForDischargeMed}
                  tableHeading={tableHeadingForDischargeMed}
                  handleView={viewItem}
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
                  style={{ width: 45, height: 35, cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        ) : value === 2 ? (
          <div className="container" style={{ marginTop: "20px" }}>
            <div className="row">
              {usedServices !== 0 ? (
                <CustomTable
                  tableData={usedServices}
                  tableDataKeys={tableDataKeysForServices}
                  tableHeading={tableHeadingForServices}
                  printItem={() => {}}
                  action={actionsForBillSummary}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}

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
          </div>
        ) : value === 3 ? (
          <div className="container" style={{ marginTop: 20 }}>
            <div className="container" style={styles.patientDetails}>
              <h6>Payment Method</h6>

              <div
                onChange={onCheckedValue}
                value={paymentMethod}
                className="row"
                style={{ height: 30, backgroundColor: "white" }}
              >
                <div className="col-md-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                  />
                  <label for="male">&nbsp;&nbsp;Cash</label>
                </div>
                <div className="col-md-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="insurance"
                    checked={paymentMethod === "insurance"}
                  />
                  <label for="male">&nbsp;&nbsp;Insurance</label>
                </div>
                <div className="col-md-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wireTransfer"
                    checked={paymentMethod === "wireTransfer"}
                  />
                  <label for="male">&nbsp;&nbsp;Wire Transfer</label>
                </div>
              </div>
            </div>

            <div>
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled
                    label="Date/Time"
                    name={"dateTime"}
                    value={new Date()}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
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
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled
                    label="Receiver Name"
                    name={"receivedBy"}
                    value={currentUser.name}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    InputLabelProps={{
                      className: classes.label,
                      classes: { label: classes.label },
                    }}
                  />
                </div>
              </div>

              {paymentMethod === "cash" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        type="number"
                        label="Deposit Amount"
                        name={"depositAmount"}
                        variant="filled"
                        value={depositAmount}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        InputProps={{
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
                      className="col-md-6"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        disabled
                        type="number"
                        label="Amount Received"
                        name={"amountReceived"}
                        variant="filled"
                        value={selectedPatient.amountReceived}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        InputLabelProps={{
                          className: classes.label,
                          classes: { label: classes.label },
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        disabled
                        variant="filled"
                        type="number"
                        label="Total Amount"
                        name={"totalAmount"}
                        value={
                          parseInt(depositAmount) +
                          parseInt(selectedPatient.amountReceived)
                        }
                        onChange={onChangeValue}
                        className="textInputStyle"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        InputLabelProps={{
                          className: classes.label,
                          classes: { label: classes.label },
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : paymentMethod === "wireTransfer" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-md-12"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        style={styles.inputField}
                        label="Bank Name"
                        name={"bankName"}
                        variant="filled"
                        value={bankName}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                        InputLabelProps={{
                          className: classes.label,
                          classes: { label: classes.label },
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        label="Depositer's Name"
                        name={"depositorName"}
                        variant="filled"
                        value={depositorName}
                        onChange={onChangeValue}
                        className="textInputStyle"
                        InputProps={{
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
                      className="col-md-6 col-sm-6 col-6"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <label style={styles.upload}>
                        <TextField
                          type="file"
                          style={styles.input}
                          onChange={onSlipUpload}
                          // value={depositSlip.name}
                          variant="filled"
                          name="depositSlip"
                          required
                          // style={{ display: "none" }}
                          InputProps={{
                            className: classes.input,
                            classes: { input: classes.input },
                          }}
                          InputLabelProps={{
                            className: classes.label,
                            classes: { label: classes.label },
                          }}
                        />
                        <FaUpload />{" "}
                        {depositSlip ? (
                          <span
                            className="container"
                            style={{ color: "green" }}
                          >
                            {depositSlip && depositSlip.name}
                          </span>
                        ) : (
                          "Upload Deposit Slip"
                        )}
                        {/* <ErrorMessage
                          name={depositSlip}
                          isFormSubmitted={isFormSubmitted}
                        /> */}
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                undefined
              )}
            </div>

            <div
              className="row"
              style={{ marginBottom: "25px", marginTop: "25px" }}
            >
              <div className="col-md-6 col-sm-6 col-6">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: "pointer" }}
                />
              </div>

              <div
                className="col-md-6 col-sm-6 col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  style={styles.stylesForButton}
                  disabled={!validatePatientForm()}
                  onClick={addNewRequest}
                  variant="contained"
                  color="primary"
                >
                  Submit
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
export default DischargeRequest;
