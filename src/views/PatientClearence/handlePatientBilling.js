import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaUpload } from "react-icons/fa";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  updateClaim,
  getSearchedpatient,
  addClaim,
  getedripr,
  uploadsUrl,
  searchpatient,
} from "../../public/endpoins";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import cookie from "react-cookies";
import Header from "../../components/Header/Header";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import FormData from "form-data";
import claimsReview from "../../assets/img/ClaimsReview.png";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import MenuItem from "@material-ui/core/MenuItem";
import Loader from "react-loader-spinner";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../assets/img/Bar Code.png";
import Fingerprint from "../../assets/img/fingerprint.png";
import stylesForPaper from "../../assets/jss/material-dashboard-react/components/paper.js";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import MUIInputStyle from "../../assets/jss/material-dashboard-react/inputStyle.js";
import MUIInputStyleForCurrency from "../../assets/jss/material-dashboard-react/inputStylesForCurrency";

const tableHeadingForBillSummary = [
  "Date/Time",
  "Service Name",
  "Name",
  "Amount",
  "Quantity",
  //   "Invoice",
];
const tableDataKeysForBillSummary = [
  "date",
  ["serviceId", "type"],
  ["serviceId", "name"],
  ["serviceId", "price"],
  "qty",
];

const statusArray = [
  { key: "Analysis In Progress", value: "Analysis In Progress" },
  { key: "Approved", value: "Approved" },
  { key: "Partial Approved", value: "Partial Approved" },
  { key: "Rejected", value: "Rejected" },
];

const actions = { print: false };

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "130px",
    height: "45px",
    outline: "none",
  },
  save: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#ba55d3",
    width: "130px",
    height: "45px",
    outline: "none",
  },
  form: {
    backgroundColor: "white",
    borderRadius: "10px",
    marginTop: "20px",
    padding: "10px",
    textAlign: "center",
  },
  upload: {
    backgroundColor: "white",
    border: "0px solid #ccc",
    borderRadius: "5px",
    color: "gray",
    width: "100%",
    height: "60px",
    cursor: "pointer",
    padding: "15px",
  },
  input: {
    display: "none",
  },
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: "10px",
  },
  inputContainerForTextField: {
    marginTop: 6,
  },
  styleForLabel: {
    paddingTop: 25,
    fontWeight: "700",
    color: "gray",
  },
  inputStyles: {
    outline: "none",
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
    paddingLeft: 3,
    paddingRight: 3,
  },
};

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const useStyles = makeStyles((theme) => ({
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
    // "&:focus": {
    //   backgroundColor: "white",
    //   boxShadow: "none",
    // },
    "&:focus": {
      boxShadow: "none",
    },
  },

}));


function AddEditPatientListing(props) {
  const classes = MUIInputStyle();
  const classesForInput = MUIInputStyleForCurrency();

  const initialState = {
    profileNo: "-----",
    firstName: "-----",
    lastName: "-----",
    gender: "-----",
    age: "--",
    weight: "--",
    document: "",
    generatedBy: cookie.load("current_user").staffId,
    insuranceNumber: "----",
    insuranceVendor: "----",
    paymentMethod: "",
    treatmentDetail: "",
    patientId: "",
    status: "",
    responseCode: "",
    diagnosisArray: "",
    medicationArray: "",

    // billSummaryArray: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    profileNo = "-----",
    firstName = "-----",
    lastName = "-----",
    gender = "----",
    age = "--",
    weight = "--",
    document,
    generatedBy = cookie.load("current_user").staffId,
    insuranceNumber = "-----",
    insuranceVendor = "-----",
    treatmentDetail,
    patientId,
    status,
    responseCode,
    diagnosisArray,
    medicationArray,

    // billSummaryArray,
  } = state;

  const classesForTabs = useStylesForTabs();

  const [comingFor, setcomingFor] = useState("add");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  // const [isDisabled, setDisabled] = useState(false)
  const [value, setValue] = React.useState(0);
  const [DocumentUpload, setDocumentUpload] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [pdfView, setpdfView] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemFound, setItemFound] = useState("");
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [billSummaryArray, setbillSummaryArray] = useState(false);
  const [ClaimId, setClaimId] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [patientDetails, setPatientDetails] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  const [totalBillingAmount, setTotalBillingAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

  const [externalRequests, setExternalRequests] = useState("");
  const [externalRequestsFee, setExternalRequestsFee] = useState(0);

  const [internalRequests, setInternalRequests] = useState("");
  const [internalRequestsFee, setInternalRequestsFee] = useState(0);

  useEffect(() => {
    // setcomingFor(props.history.location.state.comingFor);
    setCurrentUser(cookie.load("current_user"));
    // const selectedRec = props.history.location.state.selectedItem;
    // console.log("selected rec is ... ", selectedRec);

    // if (props.history.location.state.comingFor === "edit") {
    //   getPatientByInfo(selectedRec.patient._id);
    // }

    // if (selectedRec) {
    //   setClaimId(selectedRec._id);
    //   Object.entries(selectedRec).map(([key, val]) => {
    //     if (val && typeof val === "object") {
    //       if (key === "patient") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 === "_id") {
    //             dispatch({ field: "patientId", value: val1 });
    //             getBillSummary(val1);
    //             console.log("Patient id is ", val1);
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //       } else {
    //         dispatch({ field: key, value: val._id });
    //       }
    //     } else {
    //       dispatch({ field: key, value: val });
    //     }
    //   });
    // }
  }, []);

  // function validatePatientForm() {
  //   return (
  //     identificationNumber &&
  //     identificationNumber.length > 0 &&
  //     title &&
  //     title.length > 0 &&
  //     firstName &&
  //     firstName.length > 0 &&
  //     lastName &&
  //     lastName.length > 0 &&
  //     phoneNumber &&
  //     phoneNumber.length > 0 &&
  //     gender &&
  //     gender.length > 0 &&
  //     email &&
  //     email.length > 0 &&
  //     country &&
  //     country.length > 0 &&
  //     city &&
  //     city.length > 0 &&
  //     address &&
  //     address.length > 0
  //   )
  // }

  // function validateDetailsForm() {
  //   return (
  //     insuranceNumber &&
  //     insuranceNumber.length > 0 &&
  //     insuranceVendor &&
  //     insuranceVendor.length > 0 &&
  //     coverageDetails &&
  //     coverageDetails.length > 0
  //     // coverageTerms &&
  //     // coverageTerms.length > 0 &&
  //     // payment &&
  //     // payment.length > 0
  //   )
  // }

  const handleAdd = () => {
    let formData = new FormData();
    if (DocumentUpload) {
      formData.append("file", DocumentUpload, DocumentUpload.name);
    }
    //if (validatePatientForm()) {
    const params = {
      generatedBy: generatedBy,
      patient: patientId,
      treatmentDetail: treatmentDetail,
      document: document,
      status: "pending",
      responseCode: "N/A",
    };
    formData.append("data", JSON.stringify(params));
    // console.log("PARAMSS ", params);
    // console.log("DATAAA ", formData);
    axios
      .post(addClaim, formData, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "patients data");
          dispatch({ field: "patientId", value: "" });
          dispatch({ field: "firstName", value: "" });
          dispatch({ field: "lastName", value: "" });
          dispatch({ field: "gender", value: "" });
          dispatch({ field: "age", value: "" });
          dispatch({ field: "weight", value: "" });
          dispatch({ field: "profileNo", value: "" });
          dispatch({ field: "insuranceNumber", value: "" });
          dispatch({ field: "insuranceVendor", value: "" });
          dispatch({ field: "treatmentDetail", value: "" });
          dispatch({ field: "document", value: "" });

          props.history.push({
            pathname: "success",
            state: {
              message: `Claim against Patient MRN ${profileNo} Submitted successfully`,
            },
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
          setErrorMsg("Error submitting Claim details");
        }
      })
      .catch((e) => {
        console.log("error after adding Claim details", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the Claim details");
      });
    //}
    setIsFormSubmitted(true);
  };

  const handleEdit = () => {
    let formData = new FormData();
    if (DocumentUpload) {
      formData.append("file", DocumentUpload, DocumentUpload.name);
    }
    //if (validatePatientForm()) {
    const params = {
      _id: ClaimId,
      treatmentDetail: treatmentDetail,
      document: document,
      status: status,
      responseCode: responseCode,
    };
    formData.append("data", JSON.stringify(params));
    // console.log("PARAMSS ", params);
    // console.log("DATAAA ", formData);
    axios
      .put(updateClaim, formData)
      .then((res) => {
        if (res.data.success) {
          props.history.push({
            pathname: "success",
            state: {
              message: `Claim against Patient MRN ${profileNo} Updated successfully`,
            },
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch((e) => {
        console.log("error after updating Claim details", e);
        setOpenNotification(true);
        setErrorMsg("Error while editing the Claim details");
      });
    //}
    // setIsFormSubmitted(true)
  };

  const onDocumentUpload = (event) => {
    var file = event.target.files[0];
    var fileType = file.name.slice(file.name.length - 3);

    setDocumentUpload(file);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClick = () => {
    setValue(value + 1);
  };

  const onChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w\s]/gi, ""),
    });
  };

  const onChangeCurrency = (e) => {
    let totalForExternal = externalRequests * externalRequestsFee;
    let totalForInternal = internalRequests * internalRequestsFee;

    let endTotal = remainingAmount + totalForExternal + totalForInternal;

    setGrandTotal(endTotal);
    // let endRemainingAmount =
    //   remainingAmount + totalForExternal + totalForInternal;

    // setTotalBillingAmount(endTotal);
    // setRemainingAmount(endRemainingAmount);

    // setExternalRequestsFee("");
    // setInternalRequestsFee("");
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
      setsuccessMsg("");
    }, 2000);
  }

  const handleSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchQuery(a);
    if (a.length >= 3) {
      axios
        .get(
          getSearchedpatient + "/" + currentUser.functionalUnit._id + "/" + a
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log("patient data ", res.data.data);
              setItemFoundSuccessfully(true);
              setItemFound(res.data.data);
            } else {
              setItemFoundSuccessfully(false);
              setItemFound("");
            }
          }
        })
        .catch((e) => {
          console.log("error while searching patient", e);
        });
    }
  };

  function handleAddItem(i) {
    dispatch({ field: "medicationArray", value: "" });
    dispatch({ field: "diagnosisArray", value: "" });

    console.log("selected banda", i);

    setSelectedPatient(i);
    setPatientDetails(i);

    dispatch({ field: "patientId", value: i._id });
    dispatch({ field: "firstName", value: i.firstName });
    dispatch({ field: "lastName", value: i.lastName });
    dispatch({ field: "gender", value: i.gender });
    dispatch({ field: "age", value: i.age });
    dispatch({ field: "weight", value: i.weight });
    dispatch({ field: "profileNo", value: i.profileNo });
    dispatch({ field: "insuranceNumber", value: i.insuranceNumber });
    dispatch({ field: "insuranceVendor", value: i.insuranceVendor });

    setSearchQuery("");
    getBillSummary(i._id, i.payment);
    getPatientByInfo(i._id);
  }

  function getBillSummary(i, payment) {
    axios
      .get(getedripr + "/" + i)
      .then((res) => {
        if (res.data.success) {
          console.log("response for search", res.data.data);

          setInternalRequests(res.data.data.residentNotes.length);
          setExternalRequests(res.data.data.consultationNote.length);
          //   dispatch({
          //     field: "treatmentDetail",
          //     value: res.data.rc.treatmentDetail,
          //   });
          //   dispatch({ field: "document", value: res.data.rc.document });

          let totalAmount = 0;

          let pharm = [];
          for (let i = 0; i < res.data.data.pharmacyRequest.length; i++) {
            let amount = 0;
            let singlePR = res.data.data.pharmacyRequest[i];
            for (let j = 0; j < singlePR.item.length; j++) {
              // console.log(singlePR.medicine[j].itemId.purchasePrice)
              amount =
                amount +
                singlePR.item[j].itemId.issueUnitCost *
                  singlePR.item[j].requestedQty;

              totalAmount =
                totalAmount +
                singlePR.item[j].itemId.issueUnitCost *
                  singlePR.item[j].requestedQty;

              let obj = {
                serviceId: {
                  type: "Pharmacy Service",
                  name: singlePR.item[j].itemId.name,
                  price: singlePR.item[j].itemId.issueUnitCost,
                },
                date: res.data.data.pharmacyRequest[i].dateGenerated,
                qty: singlePR.item[j].requestedQty,
              };
              pharm.push(obj);
            }
            // let obj = {
            //   serviceId: {
            //       type:'Pharmacy Service',
            //     name: "Pharmacy Service",
            //     price: amount,
            //   },
            //   date: res.data.data.pharmacyRequest[i].dateGenerated,
            // };
            // pharm.push(obj);
          }

          let rad = [];
          for (let i = 0; i < res.data.data.radiologyRequest.length; i++) {
            let singlePR = res.data.data.radiologyRequest[i];

            totalAmount = totalAmount + singlePR.serviceId.price;

            let obj = {
              serviceId: {
                ...singlePR.serviceId,
                type: "Radiology Service",
                name: singlePR.serviceId.name,
                price: singlePR.serviceId.price,
              },
              date: res.data.data.radiologyRequest[i].date,
              qty: 1,
            };
            rad.push(obj);
          }

          let lab = [];
          for (let i = 0; i < res.data.data.labRequest.length; i++) {
            let singlePR = res.data.data.labRequest[i];

            totalAmount = totalAmount + singlePR.serviceId.price;

            let obj = {
              serviceId: {
                ...singlePR.serviceId,
                type: "Laboratory Service",
                name: singlePR.serviceId.name,
                price: singlePR.serviceId.price,
              },
              date: res.data.data.labRequest[i].date,
              qty: 1,
            };
            lab.push(obj);
          }

          let nurse = [];
          if (res.data.data.nurseService) {
            //   for (let i = 0; i < res.data.data.nurseService.length; i++) {
            //     let singlePR = res.data.data.nurseService[i];
            //     totalAmount = totalAmount + singlePR.serviceId.price;
            //     let obj = {
            //       serviceId: {
            //         ...singlePR.serviceId,
            //         type: "Nurse Service",
            //         name: singlePR.serviceId.name,
            //         price: singlePR.serviceId.price,
            //       },
            //       date: res.data.data.nurseService[i].date,
            //       qty: 1,
            //     };
            //     nurse.push(obj);
            //   }
          }
          setbillSummaryArray(
            [].concat(
              //   res.data.data.labRequest.reverse(),
              //   res.data.data.radiologyRequest.reverse(),
              rad.reverse(),
              pharm.reverse(),
              lab.reverse(),
              nurse.reverse()
            )
          );

          setTotalBillingAmount(totalAmount);
          console.log(payment);
          if (payment) {
            setRemainingAmount(totalAmount - parseInt(payment));
          } else {
            setRemainingAmount(totalAmount);
          }
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

  console.log("billSummaryArray", billSummaryArray);

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

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "residentNotes") {
                  if (val && val.length > 0) {
                    dispatch({
                      field: "diagnosisArray",
                      value: val.reverse()[0].code,
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

  const handleInvoicePrint = () => {
    alert("Printer not attached");
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
      <Header />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={claimsReview} />
            <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
              <h4>
                {comingFor === "add"
                  ? "Patient Clearence"
                  : " Edit Claim Review"}
              </h4>
            </div>
          </div>
        </div>

        <div style={{ width: "auto", height: "20px" }} />
        <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            TabIndicatorProps={{ style: { background: "#12387a" } }}
            centered
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 10,
                outline: "none",
                color: value === 0 ? "#12387a" : "#3B988C",
              }}
              label="Treatment Details"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 10,
                outline: "none",
                color: value === 1 ? "#12387a" : "#3B988C",
              }}
              label="Bill Summary"
            />
          </Tabs>
        </div>
        {value === 0 ? (
          <div>
            <div
              style={{ marginTop: "20px", marginBottom: "10px" }}
              className={`container-fluid`}
            >
              {comingFor === "add" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-md-10 col-sm-8 col-8"
                      style={{
                        ...styles.inputContainerForTextField,
                      }}
                    >
                      <TextField
                        required
                        label="Search Patient by Name / MRN / National ID / Mobile Number"
                        name={"searchQuery"}
                        value={searchQuery}
                        style={{ borderRadius: "5px" }}
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
                      />
                    </div>

                    <div
                      className="col-md-1 col-sm-2 col-2"
                      style={{
                        ...styles.inputContainerForTextField,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 55,
                          backgroundColor: "white",
                          borderRadius: 5,
                          width: 84,
                        }}
                      >
                        <img src={BarCode} style={{ width: 80, height: 75 }} />
                      </div>
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
                        }}
                      >
                        <img
                          src={Fingerprint}
                          style={{ maxWidth: 43, height: 43 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 col-sm-8 col-8">
                      {searchQuery ? (
                        <div
                          style={{
                            zIndex: 3,
                            position: "absolute",
                            width: "98%",
                            left: 14,
                            marginTop: 5,
                          }}
                        >
                          <Paper style={{ ...stylesForPaper.paperStyle }}>
                            {itemFoundSuccessfull ? (
                              itemFound && (
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>MRN</TableCell>
                                      <TableCell>Patient Name</TableCell>
                                      <TableCell>Gender</TableCell>
                                      <TableCell>Age</TableCell>
                                      <TableCell>Payment Method</TableCell>
                                    </TableRow>
                                  </TableHead>

                                  <TableBody>
                                    {itemFound.map((i) => {
                                      return (
                                        <TableRow
                                          key={i._id}
                                          onClick={() => handleAddItem(i)}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <TableCell>{i.profileNo}</TableCell>
                                          <TableCell>
                                            {i.firstName + ` ` + i.lastName}
                                          </TableCell>
                                          <TableCell>{i.gender}</TableCell>
                                          <TableCell>{i.age}</TableCell>
                                          <TableCell>
                                            {i.paymentMethod}
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
                                Patient Not Found
                              </h4>
                            )}
                          </Paper>
                        </div>
                      ) : (
                        undefined
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                undefined
              )}
            </div>

            <div className="container-fluid">
              <h5
                style={{
                  fontWeight: "bold",
                  color: "white",
                  marginTop: 25,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                Patient Details
              </h5>
              <div
                // className="row"
                style={{
                  marginTop: 25,
                  backgroundColor: "white",
                  borderRadius: 5,
                  width: "100%",
                }}
              >
                <div
                  className="row"
                  style={{
                    backgroundColor: "#2C6DDD",
                    paddingLeft: 10,
                    height: "30%",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    paddingBottom: 10,
                    paddingTop: 10,
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.headerHeading}
                  >
                    <h6 style={{ color: "white", fontWeight: "700" }}>
                      Patient Info
                    </h6>
                  </div>
                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.headerHeading}
                  >
                    <h6 style={{ color: "white", fontWeight: "700" }}>
                      Allergy
                    </h6>
                  </div>
                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.headerHeading}
                  >
                    <h6 style={{ color: "white", fontWeight: "700" }}>
                      Medication
                    </h6>
                  </div>
                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.headerHeading}
                  >
                    <h6 style={{ color: "white", fontWeight: "700" }}>
                      Diagnosis
                    </h6>
                  </div>
                </div>

                <div
                  className="row"
                  style={{
                    marginTop: 10,
                    paddingLeft: 10,
                    height: "80%",
                    paddingBottom: 10,
                  }}
                >
                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span style={styles.headingStyles}>MRN</span>
                    <span style={styles.textStyles}>{profileNo}</span>

                    <span style={styles.headingStyles}>Patient</span>
                    <span style={styles.textStyles}>
                      {firstName + ` ` + lastName}{" "}
                    </span>

                    <span style={styles.headingStyles}>Gender</span>
                    <span style={styles.textStyles}>{gender}</span>

                    <span style={styles.headingStyles}>Age</span>
                    <span style={styles.textStyles}>{age}</span>

                    <span style={styles.headingStyles}>Weight</span>
                    <span style={styles.textStyles}>{weight} kg</span>
                  </div>

                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.textStyles}
                  >
                    {""}
                  </div>

                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.textStyles}
                  >
                    {medicationArray
                      ? medicationArray.map((drug, index) => {
                          return (
                            <h6 style={styles.textStyles}>
                              {index + 1}. {drug}
                            </h6>
                          );
                        })
                      : ""}
                  </div>

                  <div
                    className={"col-md-3 col-sm-3 col-3"}
                    style={styles.textStyles}
                  >
                    {diagnosisArray
                      ? diagnosisArray.map((drug, index) => {
                          return <h6 style={styles.textStyles}>{drug}</h6>;
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                height: "10px",
              }}
            />

            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                marginTop: "2%",
                marginBottom: "2%",
              }}
              className="container-fluid"
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 45, height: 35, cursor: "pointer" }}
              />
              {/* <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                {comingFor === "add" ? (
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={onClick}
                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={handleEdit}
                    variant="contained"
                    color="default"
                  >
                    Update
                  </Button>
                )}
              </div> */}
            </div>
          </div>
        ) : value === 1 ? (
          <div>
            <div
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                paddingLeft: 27,
                paddingRight: 27,
              }}
              className="container-fluid"
            >
              <div className="row" style={{ marginTop: "20px" }}>
                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    disabled={true}
                    label="Consultant/Specialist"
                    name={"externalRequests"}
                    value={externalRequests}
                    variant={"filled"}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
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
                  <CurrencyTextField
                    // style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id={"externalRequestsFee"}
                    label="Fee"
                    name={"externalRequestsFee"}
                    value={externalRequestsFee}
                    //   onBlur={onChangeCurrency}
                    onChange={(event, value) => setExternalRequestsFee(value)}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                    }}
                    currencySymbol="JD"
                    outputFormat="number"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
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
                    disabled={true}
                    label="Doctor/Physician"
                    name={"internalRequests"}
                    value={internalRequests}
                    variant={"filled"}
                    onChange={onChangeValue}
                    className="textInputStyle"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
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
                  <CurrencyTextField
                    required
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id={"internalRequestsFee"}
                    label="Fee"
                    name={"internalRequestsFee"}
                    value={internalRequestsFee}
                    //   onBlur={onChangeCurrency}
                    onChange={(event, value) => setInternalRequestsFee(value)}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                    }}
                    currencySymbol="JD"
                    outputFormat="number"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
                  />
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
                  <CurrencyTextField
                    disabled
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id="payment"
                    label=" Deposited Amount"
                    name={"payment"}
                    value={patientDetails.payment ? patientDetails.payment : 0}
                    onBlur={onChangeValue}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                    }}
                    currencySymbol="JD"
                    outputFormat="number"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
                  />
                </div>

                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    disabled
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id={"totalBillingAmount"}
                    label="Total Services Bill"
                    name={"totalBillingAmount"}
                    value={totalBillingAmount}
                    onBlur={onChangeValue}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                    }}
                    currencySymbol="JD"
                    outputFormat="number"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
                  />
                </div>

                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    disabled
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id={"remainingAmount"}
                    label="Sub Total"
                    name={"remainingAmount"}
                    value={remainingAmount}
                    onBlur={onChangeValue}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                    }}
                    currencySymbol="JD"
                    outputFormat="number"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
                  />
                </div>

                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    disabled
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id={"rgrandTotal"}
                    label="Total"
                    name={"grandTotal"}
                    value={grandTotal}
                    onBlur={onChangeValue}
                    variant="filled"
                    textAlign="left"
                    InputProps={{
                      className: classesForInput.input,
                      classes: { input: classesForInput.input },
                    }}
                    InputLabelProps={{
                      className: classesForInput.label,
                      classes: { label: classesForInput.label },
                      readOnly: true,
                    }}
                    currencySymbol="JD"
                    outputFormat="number"
                    onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
                  />
                </div>
              </div>

              <div className="row">
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    marginTop: 20,
                  }}
                >
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={onChangeCurrency}
                    variant="contained"
                    color="default"
                  >
                    Calculate
                  </Button>
                </div>
              </div>

              <div className="row" style={{ marginTop: "20px" }}>
                {billSummaryArray !== 0 ? (
                  <CustomTable
                    tableData={billSummaryArray}
                    tableDataKeys={tableDataKeysForBillSummary}
                    tableHeading={tableHeadingForBillSummary}
                    action={""}
                    printItem={handleInvoicePrint}
                    borderBottomColor={"#60d69f"}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>

              <div
                class="row"
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  marginTop: "2%",
                  marginBottom: "2%",
                }}
              >
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ width: 45, height: 35, cursor: "pointer" }}
                />
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  {comingFor === "add" ? (
                    <Button
                      style={styles.stylesForButton}
                      //disabled={!validateFormType1()}
                      onClick={handleAdd}
                      variant="contained"
                      color="default"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      style={styles.stylesForButton}
                      //disabled={!validateFormType1()}
                      onClick={handleEdit}
                      variant="contained"
                      color="default"
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          undefined
        )}

        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />
      </div>
    </div>
  );
}
export default AddEditPatientListing;

{
  /* <div className={`container-fluid ${classes.root}`}>
              <div
                className="row"
                style={{
                  ...styles.patientDetails,
                  marginRight: 0,
                  marginLeft: 0,
                }}
              >
                <TextField
                  required
                  multiline
                  type="text"
                  label="Treatment Details"
                  name={"treatmentDetail"}
                  value={treatmentDetail}
                  onChange={onChangeValue}
                  rows={4}
                  className="textInputStyle"
                  variant="filled"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                />
              </div>
            </div>

            {comingFor === "edit" ? (
              <div
                className={`container-fluid ${classes.root}`}
                style={{ marginTop: "10px" }}
              >
                <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                  <TextField
                    required
                    select
                    fullWidth
                    id="status"
                    name="status"
                    value={status}
                    error={status === "" && isFormSubmitted}
                    onChange={onChangeValue}
                    label="Status"
                    variant="filled"
                    style={{ borderRadius: "5px" }}
                    // className="dropDownStyle"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  >
                    <MenuItem value={status}>{status}</MenuItem>

                    {statusArray.map((val) => {
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

            <div className="container-fluid">
              <div
                className="row"
                style={{
                  ...styles.inputContainerForTextField,
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <label style={styles.upload}>
                  <TextField
                    required
                    type="file"
                    style={styles.input}
                    onChange={onDocumentUpload}
                    name="document"
                  />
                  <FaUpload /> &nbsp;&nbsp;&nbsp;Upload Document
                </label>

                {pdfView !== "" ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#2c6ddd",
                      fontStyle: "italic",
                    }}
                  >
                    <span style={{ color: "black" }}>Selected File : </span>
                    {pdfView}
                  </div>
                ) : (
                  undefined
                )}
              </div>

              <div className="row">
                {document !== "" && document.includes("\\") ? (
                  <>
                    {document !== "" &&
                    document.slice(document.length - 3) !== "pdf" ? (
                      <div
                        className="col-md-6 col-sm-6 col-6"
                        style={{
                          ...styles.inputContainerForTextField,
                        }}
                      >
                        <img
                          src={uploadsUrl + document.split("\\")[1]}
                          className="depositSlipImg"
                        />
                      </div>
                    ) : document !== "" &&
                      document.slice(document.length - 3) === "pdf" ? (
                      <div
                        className="col-md-6 col-sm-6 col-6"
                        style={{
                          ...styles.inputContainerForTextField,
                        }}
                      >
                        <a
                          href={uploadsUrl + document.split("\\")[1]}
                          style={{ color: "#2c6ddd" }}
                        >
                          Click here to open document
                        </a>
                      </div>
                    ) : (
                      undefined
                    )}
                  </>
                ) : document !== "" && document.includes("/") ? (
                  <>
                    {document !== "" &&
                    document.slice(document.length - 3) !== "pdf" ? (
                      <div
                        className="col-md-6 col-sm-6 col-6"
                        style={{
                          ...styles.inputContainerForTextField,
                        }}
                      >
                        <img
                          src={uploadsUrl + document}
                          className="depositSlipImg"
                        />
                      </div>
                    ) : document !== "" &&
                      document.slice(document.length - 3) === "pdf" ? (
                      <div
                        className="col-md-6 col-sm-6 col-6"
                        style={{
                          ...styles.inputContainerForTextField,
                        }}
                      >
                        <a
                          href={uploadsUrl + document}
                          style={{ color: "#2c6ddd" }}
                        >
                          Click here to open document
                        </a>
                      </div>
                    ) : (
                      undefined
                    )}
                  </>
                ) : (
                  undefined
                )}

                {imagePreview !== "" ? (
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={{
                      ...styles.inputContainerForTextField,
                    }}
                  >
                    <img src={imagePreview} className="depositSlipImg" />
                    {document !== "" ? (
                      <div style={{ color: "black", textAlign: "center" }}>
                        New document
                      </div>
                    ) : (
                      undefined
                    )}
                  </div>
                ) : (
                  undefined
                )}
              </div>
            </div> */
}