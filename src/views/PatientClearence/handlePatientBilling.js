import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaUpload } from "react-icons/fa";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import logoPatientInvoice from "../../assets/img/logoPatientSummaryInvoice.png";
import PatientDetails from "../../components/PatientDetails/PatientDetailsRCM"

import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  updateClaim,
  getSearchedpatient,
  addClaim,
  getedripr,
  uploadsUrl,
  audioURL,
  searchpatient,
  addPatientClearanceURL,
  getPatientClearanceURL,
  updatePatientClearanceURL,
  getSearchDischargedPatient,
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
import view_all from "../../assets/img/Eye.png";

const tableHeadingForBillSummary = [
  "Date/Time",
  "Service Type",
  "Service Name",
  "Amount (JD)",
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
    paddingLeft: 5,
    paddingRight: 5,
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

const useStylesForInput = makeStyles((theme) => ({
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
    "&:focus": {
      boxShadow: "none",
      borderRadius: 5,
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
    "&:focus": {
      backgroundColor: "white",
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

function AddEditPatientListing(props) {
  const classes = MUIInputStyle();
  const classesInput = useStylesForInput();
  // const classes = useStyles()
  const classesForInput = MUIInputStyleForCurrency();

  const initialState = {
    profileNo: "-----",
    firstName: "-----",
    lastName: "-----",
    gender: "-----",
    age: "--",
    QR: "",
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

    requestType: "",
    requestId: "",

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
    QR,
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
    requestType,
    requestId,

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

  const [returnedAmount, setReturnedAmount] = useState(0);

  const [internalRequests, setInternalRequests] = useState("");
  const [internalRequestsFee, setInternalRequestsFee] = useState(0);
  const [requestNo, setRequestNo] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [patientProfileNo, setPatientProfileNo] = useState("");
  const [qr, setQr] = useState("");
  const [timer, setTimer] = useState(null);
  const [loadSearchedData, setLoadSearchedData] = useState(false)

  useEffect(() => {
    // setcomingFor(props.history.location.state.comingFor);
    setCurrentUser(cookie.load("current_user"));
    // const selectedRec = props.history.location.state.selectedItem
    //   ? props.history.location.state.selectedItem
    //   : "";
    // console.log("selected rec is ... ", selectedRec);

    if (
      props.history.location.state &&
      props.history.location.state.selectedItem
    ) {
      const selectedRec = props.history.location.state.selectedItem;
      setcomingFor(selectedRec.comingFor);
      // getPatientByInfo(selectedRec.patientId._id);
      // setPatientDetails(selectedRec.patientId)
      handleAddItem(selectedRec.patientId);
      setInternalRequestsFee(selectedRec.residentFee);
      setExternalRequestsFee(selectedRec.consultantFee);
      setGrandTotal(selectedRec.total);
    }

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
    if (!patientDetails) {
      setOpenNotification(true);
      setErrorMsg("Please add the patient first");
      return;
    }

    if (!grandTotal) {
      setOpenNotification(true);
      setErrorMsg("Please calculate the billing amount first");
      return;
    }

    const params = {
      patientId: patientDetails._id,
      generatedBy: currentUser.staffId,
      consultantFee: externalRequestsFee,
      residentFee: internalRequestsFee,
      subTotal: remainingAmount,
      total: grandTotal,
      returnedAmount,
    };

    let obj = { ...params };
    if (requestType === "EDR") {
      obj = { ...params, edrId: requestId };
    } else if (requestType === "IPR") {
      obj = { ...params, iprId: requestId };
    }

    console.log(params);

    axios
      .post(addPatientClearanceURL, obj)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "patients data");
          props.history.push({
            pathname: "patientclearence/success",
            state: {
              message: `Patient with MRN: ${profileNo.toUpperCase()} has been cleared successfully`,
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
    if (!patientDetails) {
      setOpenNotification(true);
      setErrorMsg("Please add the patient first");
      return;
    }

    if (!grandTotal) {
      setOpenNotification(true);
      setErrorMsg("Please calculate the billing amount first");
      return;
    }

    const params = {
      _id: props.history.location.state.selectedItem._id,
      patientId: patientDetails._id,
      generatedBy: currentUser.staffId,
      consultantFee: externalRequestsFee,
      residentFee: internalRequestsFee,
      subTotal: remainingAmount,
      total: grandTotal,
      returnedAmount,
    };

    let obj = { ...params };
    if (requestType === "EDR") {
      obj = { ...params, edrId: requestId };
    } else if (requestType === "IPR") {
      obj = { ...params, iprId: requestId };
    }

    console.log(params);

    axios
      .put(updatePatientClearanceURL, obj)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "patients data");
          props.history.push({
            pathname: "success",
            state: {
              message: `Patient with MRN: ${profileNo} has been updated successfully`,
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

  const onCalculateTotal = () => {
    if (!patientDetails) {
      setOpenNotification(true);
      setErrorMsg("Please add patient discharge request first");
      return;
    }
    let totalForExternal = externalRequests * externalRequestsFee;
    let totalForInternal = internalRequests * internalRequestsFee;

    let endTotal = remainingAmount + totalForExternal + totalForInternal;

    setGrandTotal(endTotal);

    if (endTotal < patientDetails.amountReceived) {
      setReturnedAmount(patientDetails.amountReceived - endTotal);
    } else {
      setReturnedAmount(0);
    }
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
      setsuccessMsg("");
    }, 2000);
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
      d
        .getDate()
        .toString()
        .padStart(2, "0") +
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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      triggerChange();
    }
  };

  const triggerChange = (a) => {
    handleSearch(a)
  }

  const handlePauseSearch = (e) => {
    setLoadSearchedData(true)
    clearTimeout(timer)

    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchQuery(a);

    setTimer(
      setTimeout(() => {
        triggerChange(a)
      }, 600)
    );
  };

  const handleSearch = (e) => {
    if (e.length >= 3) {
      axios
        .get(
          getSearchDischargedPatient +
            "/" +
            currentUser.functionalUnit._id +
            "/" +
            e
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log('patient data ', res.data.data)
              setItemFoundSuccessfully(true)
              setItemFound(res.data.data)
              setLoadSearchedData(false)
            } else {
              setItemFoundSuccessfully(false)
              setItemFound('')
              setLoadSearchedData(false)
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
    setQr(i.QR);

    setSelectedPatient(i);
    setPatientDetails(i);

    dispatch({ field: "patientId", value: i._id });
    dispatch({ field: "firstName", value: i.firstName });
    dispatch({ field: "lastName", value: i.lastName });
    dispatch({ field: "gender", value: i.gender });
    dispatch({ field: "age", value: i.age });
    dispatch({ field: "weight", value: i.weight });
    dispatch({ field: "QR", value: i.QR });

    dispatch({ field: "profileNo", value: i.profileNo });
    dispatch({ field: "insuranceNumber", value: i.insuranceNumber });
    dispatch({ field: "insuranceVendor", value: i.insuranceVendor });

    setSearchQuery("");
    getBillSummary(i._id, i.amountReceived);
    getPatientByInfo(i._id);
  }

  const onDischargeInvoice = () => {
    if (grandTotal === "") {
      setOpenNotification(true);
      setErrorMsg("Please calculate total amount before creating invoice");
    } else if (billSummaryArray.length === 0) {
      setOpenNotification(true);
      setErrorMsg("No service is used, So invoice cannot be generated");
    } else {
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
      const invoiceNo = "IN" + day + YYYY + HH + mm + ss;

      var doc = new jsPDF();

      var logo = new Image();
      logo.src = logoPatientInvoice;

      // header
      doc.setFontSize(15);
      doc.addImage(logo, "PNG", 10, 10, 55, 30);
      doc.text(60, 15, "Al-Khalidi Hospital & Medical Center");
      doc.text(77, 20, "Detailed ER Invoice");
      doc.line(80, 22.5, 120, 22.5);
      doc.text(93, 28, "CASH");
      doc.line(80, 30, 120, 30);
      doc.setFontSize(12);
      doc.text(170, 14, "Amman Jordan");

      // background coloring
      doc.setFillColor(255, 255, 200);
      doc.rect(10, 45, 190, 20, "F");

      // information of patient
      doc.setFontSize(10);
      doc.setFont("times", "bold");
      doc.text(12, 50, "Patient Name:");
      doc.text(12, 55, "Visit Date:");
      doc.text(12, 60, "Patient MRN:");
      doc.text(120, 50, "Invoice No:");
      doc.text(120, 55, "Invoice Date");
      doc.text(120, 60, "Visit No:");

      // dynamic data info patient
      doc.setFont("times", "normal");
      doc.text(47, 50, `${firstName + ` ` + lastName}`);
      doc.text(47, 55, `${visitDate.substr(0, 10)}`);
      doc.text(47, 60, `${patientProfileNo}`);
      doc.text(155, 50, `${invoiceNo}`);
      doc.text(155, 55, `${dateNow.toISOString().substr(0, 10)} ${HH}:${mm}`);
      doc.text(155, 60, `${requestNo}`);

      // heading 1

      // doc.setFontSize(20);
      // doc.text(10, 80, "Not Covered");

      // table 1

      doc.autoTable({
        margin: { top: 70, right: 10, left: 10 },
        tableWidth: "auto",
        headStyles: { fillColor: [44, 109, 221] },
        html: "#my-table",
      });

      // heading 2

      // doc.setFontSize(20);
      // doc.text(10, 180, "Paid Doctor fee");

      // table 2

      // footer
      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.text(120, 230, "Consultant Fee");
      doc.text(190, 230, "JD");
      doc.text(120, 235, "Doctor Fee");
      doc.text(190, 235, "JD");
      doc.text(120, 240, "Deposited Amount");
      doc.text(190, 240, "JD");
      doc.text(120, 245, "Total Services Bill");
      doc.text(190, 245, "JD");

      doc.text(120, 250, "Sub Total");
      doc.text(190, 250, "JD");
      doc.text(120, 255, "Total");
      doc.text(190, 255, "JD");

      doc.text(10, 250, "Signature & Stamp");
      doc.line(10, 255, 60, 255);

      // dynamic text
      doc.setFont("times", "normal");
      doc.text(169, 230, `${externalRequestsFee.toFixed(4)}`);
      doc.text(169, 235, `${internalRequestsFee.toFixed(4)}`);
      doc.text(
        169,
        240,
        `${
          patientDetails.amountReceived
            ? patientDetails.amountReceived.toFixed(4)
            : "0.0000"
        }`
      );
      doc.text(169, 245, `${totalBillingAmount.toFixed(4)}`);
      doc.text(169, 250, `${remainingAmount.toFixed(4)}`);
      doc.text(169, 255, `${grandTotal.toFixed(4)}`);

      // bar code
      doc.line(0, 260, 210, 260);
      if (QR) {
        var img = new Image();
        img.src = `${audioURL}${QR}`;
        doc.addImage(img, "PNG", 172.9, 266, 25, 25);
      }

      doc.save(`Invoice ${invoiceNo}.pdf`);
    }
  };

  function getBillSummary(i, payment) {
    axios
      .get(getedripr + "/" + i)
      .then((res) => {
        if (res.data.success) {
          console.log("response for search", res.data.data);

          setRequestNo(res.data.data.requestNo);
          setInternalRequests(res.data.data.residentNotes.length);
          setExternalRequests(res.data.data.consultationNote.length);
          setVisitDate(res.data.data.createdAt);
          setPatientProfileNo(res.data.data.patientId.profileNo);

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
            if (totalAmount - parseInt(payment) > 0) {
              setRemainingAmount(totalAmount - parseInt(payment));
            } else {
              setRemainingAmount(totalAmount);
            }
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
                    let data = [];
                  val.map((d) => {
                    d.code.map((singleCode) => {
                      let found = data.find((i) => i === singleCode);
                      if (!found) {
                        data.push(singleCode);
                      }
                    });
                  });
                  console.log(data);
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
              } else if (key === "_id") {
                dispatch({ field: "requestId", value: val });
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
      <Header history={props.history}/>
      <div className="cPadding">
        <div className="subheader">
          <div style={{ marginLeft: "-12px" }}>
            <img src={claimsReview} />
            <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
              <h4>
                {comingFor === "add"
                  ? "Patient Clearance"
                  : "Edit Patient Clearance"}
              </h4>
            </div>
          </div>

          <Button
            onClick={() => props.history.push("patientclearence/view")}
            style={{ ...styles.stylesForButton, height: 45, fontSize: 12 }}
            variant="contained"
            color="primary"
          >
            <img src={view_all} style={styles.stylesForIcon} />
            &nbsp;&nbsp;
            <strong>View All</strong>
          </Button>
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
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
              className={`container-fluid ${classesInput.root}`}
            >
              {comingFor === "add" ? (
                <div>
                  <div className="row">
                    <div
                      className="col-md-10 col-sm-8 col-8"
                      style={styles.textFieldPadding}
                    >
                      <TextField
                        required
                        label="Search Patient by Name / MRN / National ID / Mobile Number"
                        name={"searchQuery"}
                        value={searchQuery}
                        style={{ borderRadius: "5px" }}
                        onChange={handlePauseSearch}
                        onKeyDown={handleKeyDown}
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
                      style={styles.textFieldPadding}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 55,
                          backgroundColor: "white",
                          borderRadius: 5,
                        }}
                      >
                        <img src={BarCode} style={{ width: 70, height: 60 }} />
                      </div>
                    </div>

                    <div
                      className="col-md-1 col-sm-2 col-2"
                      style={styles.textFieldPadding}
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
                        <img
                          src={Fingerprint}
                          style={{ maxWidth: 43, height: 43 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-10 col-sm-11 col-10"
                      style={{
                        ...styles.textFieldPadding,
                      }}
                    >
                      {searchQuery ? (
                        <div
                          style={{
                            zIndex: 3,
                            position: "absolute",
                            width: "99%",
                            marginTop: "5px",
                          }}
                        >
                          <Paper style={{ ...stylesForPaper.paperStyle }}>
                            {itemFoundSuccessfull && itemFound !== "" ? (
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
                                      </TableRow>
                                    );
                                  })}
                                </TableBody>
                              </Table>
                            ) : loadSearchedData ? (
                              <div style={{ textAlign: 'center' }}>
                                <Loader
                                  type="TailSpin"
                                  color="#2c6ddd"
                                  height={25}
                                  width={25}
                                  style={{
                                    display: "inline-block",
                                    padding: "10px",
                                  }}
                                />
                                <span
                                  style={{
                                    display: "inline-block",
                                    padding: "10px",
                                  }}
                                >
                                  <h4> Searching Patient...</h4>
                                </span>
                              </div>
                            ) : searchQuery && !itemFoundSuccessfull ? (
                              <div
                                style={{ textAlign: "center", padding: "10px" }}
                              >
                                <h4>No Patient Found !</h4>
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
              ) : (
                undefined
              )}
            </div>
   
            <PatientDetails
         patientDetails={patientDetails}
         // showPatientDetails={showPatientDetails}
         diagnosisArray={diagnosisArray}
         medicationArray={medicationArray}
       />
     

       
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
                style={{
                  width: 45,
                  height: 35,
                  cursor: "pointer",
                  marginLeft: "-10px",
                }}
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
                paddingLeft: 10,
                paddingRight: 10,
              }}
              className={`${classes.root}`}
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
                    decimalPlaces={4}
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
                    // required
                    decimalPlaces={4}
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

              <div className="row" style={{ marginTop: "20px" }}>
                <div
                  className="col-md-3"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    disabled
                    decimalPlaces={4}
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id="payment"
                    label=" Deposited Amount"
                    name={"payment"}
                    value={
                      patientDetails.amountReceived
                        ? patientDetails.amountReceived
                        : 0
                    }
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
                  className="col-md-2"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    disabled
                    required
                    decimalPlaces={4}
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
                    required
                    disabled
                    decimalPlaces={4}
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
                  className="col-md-2"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    required
                    disabled
                    decimalPlaces={4}
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

                <div
                  className="col-md-2"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    required
                    disabled
                    decimalPlaces={4}
                    style={{ backgroundColor: "white", borderRadius: 5 }}
                    className="textInputStyle"
                    id={"returnedAmount"}
                    label="Returned Amount"
                    name={"returnedAmount"}
                    value={returnedAmount}
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

              <div
                className="row"
                style={{
                  marginTop: 25,
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingRight: "5px",
                }}
              >
                <Button
                  style={{
                    color: "white",
                    cursor: "pointer",
                    borderRadius: 5,
                    backgroundColor: "#2c6ddd",
                    width: "130px",
                    height: "45px",
                    outline: "none",
                    marginRight: 10,
                  }}
                  // disabled={}
                  onClick={onDischargeInvoice}
                  variant="contained"
                  color="default"
                >
                  Invoice
                </Button>

                <Button
                  style={styles.stylesForButton}
                  // disabled={!validateFormType1()}
                  onClick={onCalculateTotal}
                  variant="contained"
                  color="default"
                >
                  Calculate
                </Button>

                <div style={{ marginLeft: 10 }}>
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

              <div
                className="row"
                style={{ paddingRight: "5px", paddingLeft: "5px" }}
              >
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
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginLeft: "-5px",
                }}
              >
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ width: 45, height: 35, cursor: "pointer" }}
                />
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
      <Table aria-label="my table" id="my-table" style={{ display: "none" }}>
        <TableHead>
          <TableRow>
            <TableCell>Date/Time</TableCell>
            <TableCell align="right">Service Type</TableCell>
            <TableCell align="right">Service Name</TableCell>
            <TableCell align="right">Amount (JD)</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        {patientId && billSummaryArray != false ? (
          <TableBody>
            {billSummaryArray.map((row) => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  {formatDate(row.date)}
                </TableCell>
                <TableCell align="right">{row.serviceId.type}</TableCell>
                <TableCell align="right">{row.serviceId.name}</TableCell>
                <TableCell align="right">
                  {`${row.serviceId.price.toFixed(4)} JD` }
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <h1>No service found</h1>
        )}
      </Table>
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
