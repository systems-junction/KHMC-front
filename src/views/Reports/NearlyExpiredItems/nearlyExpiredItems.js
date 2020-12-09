/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Notification from "../../../components/Snackbar/Notification.js";
import CustomTable from "../../../components/Table/Table";
import axios from "axios";
import {
  nearlyExpiredItemsFU,
  getFunctionalUnitUrl,
  nearlyExpiredItemsWarehouse,
} from "../../../public/endpoins";
import Loader from "react-loader-spinner";
import Header from "../../../components/Header/Header";
import purchase_order from "../../../assets/img/Purchase Order.png";
import Back from "../../../assets/img/Back_Arrow.png";
import cookie from "react-cookies";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// import PrintTable from "./printOrder";

import LogoPatientSummaryInvoice from "../../../assets/img/logoPatientSummaryInvoice.png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import dateTimeFormat from "../../../constants/dateTimeFormat.js";
import dateFormat from "../../../constants/dateFormat.js";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "110px",
    height: "40px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  inputContainerForTextField: {
    marginTop: 6,
    marginBottom: 20,
  },

  stylesForPurchaseButton: {
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
};

const tableHeading = [
  "Item Code",
  "Item Name",
  "Batch No",
  "Quantity",
  "Expiry Date",
];

const tableDataKeys = [
  ["itemId", "itemCode"],
  ["itemId", "name"],
  ["batchArray", "batchNumber"],
  ["batchArray", "quantity"],
  ["batchArray", "expiryDate"],
];

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
}));

export default function PurchaseRequest(props) {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [purchaseOrders, setPurchaseOrders] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState();
  const [fuArray, setFunctionUnits] = useState([]);
  const [selectedFU, setFU] = useState("");

  function getFUs() {
    axios
      .get(getFunctionalUnitUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setFunctionUnits(res.data.data.functionalUnits);
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

  useEffect(() => {
    getFUs();

    if (
      currentUser.staffTypeId.type === "FU Inventory Keeper" &&
      currentUser.functionalUnit
    ) {
      setFU(currentUser.functionalUnit._id);
    }
  }, []);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  const onChangeValue = (e) => {
    setFU(e.target.value);
  };

  function getPurchaseRequests() {
    if (!startDate) {
      setErrorMsg("Please select starting date first.");
      setOpenNotification(true);
      return;
    }

    if (!endDate) {
      setErrorMsg("Please select end date first.");
      setOpenNotification(true);
      return;
    }

    if (startDate >= endDate) {
      setErrorMsg("Start date should be less than end date");
      setOpenNotification(true);
      return;
    }

    let url = nearlyExpiredItemsWarehouse;
    if (
      props.history.location.pathname ===
      "/home/reports/fureports/nearlyexpireditems"
    ) {
      if (!selectedFU) {
        console.log("selected Fu");
        setErrorMsg("Please select functional unit first.");
        setOpenNotification(true);
        return;
      }
      url = nearlyExpiredItemsFU + "/" + selectedFU;
    }

    setIsLoading(true);

    axios
      .post(url, {
        startDate,
        endDate,
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoading(false);
          console.log(res.data.data);
          setPurchaseOrders(res.data.data);
        } else if (!res.data.success) {
          setIsLoading(false);
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("error: ", e);
      });
  }

  const parseDateStr = (d) => {
    let date = new Date(d);
    let month = date.getMonth() + 1;
    return date.getDate() + " - " + month + " - " + date.getFullYear();
  };

  const handlePrint = () => {
    if (!purchaseOrders || purchaseOrders.length === 0) {
      setErrorMsg("No data found for print");
      setOpenNotification(true);
      return;
    }

    let fu = fuArray.find((i) => i._id === selectedFU);

    let imgData = new Image();
    imgData.src = LogoPatientSummaryInvoice;

    let sd = parseDateStr(startDate);
    let ed = parseDateStr(endDate);

    var doc = new jsPDF();

    doc.addImage(imgData, "JPG", 10, 10, 40, 20);

    // header
    doc.setFontSize(13);
    doc.text(65, 15, "Al-Khalidi Hospital & Medical Center");

    if (
      props.history.location.pathname ===
      "/home/reports/fureports/nearlyexpireditems"
    ) {
      doc.text(66, 22, "Nearly Expired Items FuncU Form");
    } else {
      doc.text(62, 22, "Nearly Expired Items Warehouse Form");
    }
    doc.setFontSize(12);
    doc.text(170, 14, "Amman Jordan");

    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 12, "F");

    doc.setFontSize(10);
    doc.setFont("times", "normal");

    doc.text(12, 50, "From");
    doc.text(12, 55, "To");

    if (
      props.history.location.pathname ===
      "/home/reports/fureports/nearlyexpireditems"
    ) {
      doc.text(80, 50, "FuncU Name");
    }
    // doc.text(80, 55, "Generated By");

    // doc.text(80, 50, "Department");
    // doc.text(80, 55, "Warehouse");

    // dynamic data info patient
    doc.setFont("times", "bold");

    doc.text(35, 50, sd);
    doc.text(35, 55, ed);

    if (
      props.history.location.pathname ===
      "/home/reports/fureports/nearlyexpireditems"
    ) {
      doc.text(110, 50, fu.fuName);
    }
    // doc.text(110, 55, selectedPRToPrint.generated);
    // doc.text(100, 50, "HERE");
    // doc.text(100, 55, "HERE");
    // table
    // footer

    doc.autoTable({
      margin: { top: 60, right: 10, left: 10 },
      tableWidth: "auto",
      headStyles: { fillColor: [44, 109, 221] },
      html: "#nearlyExiredItems",
    });

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(10, 250, "Department Manager");
    doc.line(10, 258, 50, 258);
    doc.text(175, 250, "Section Head");
    doc.line(175, 258, 200, 258);
    doc.setFont("times", "normal");
    doc.text(10, 270, "User name:");
    doc.text(35, 270, currentUser.name);
    doc.text(135, 270, "Module:");

    if (
      props.history.location.pathname ===
      "/home/reports/fureports/nearlyexpireditems"
    ) {
      doc.text(149, 270, "Nearly Expired Items FuncU");
    } else {
      doc.text(150, 270, "Nearly Expired Items Warehouse");
    }

    doc.text(145, 275, "Date:");
    doc.text(155, 275, new Date().toLocaleString());

    if (
      props.history.location.pathname ===
      "/home/reports/fureports/nearlyexpireditems"
    ) {
      doc.save(`NearlyExpiredItems${fu.fuName}.pdf`);
    } else {
      doc.save(`NearlyExpiredItemsWarehouse.pdf`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#60d69f",
        overflowY: "scroll",
      }}
    >
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={purchase_order} />
            {props.history.location.pathname ===
            "/home/reports/fureports/nearlyexpireditems" ? (
              <h4>Nearly Expired Items Functionl Unit</h4>
            ) : (
              <h4>Nearly Expired Items Warehouse</h4>
            )}
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div
              className={
                props.history.location.pathname ===
                "/home/reports/fureports/nearlyexpireditems"
                  ? "col-md-4"
                  : "col-md-6"
              }
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  inputVariant="filled"
                  onChange={setStartDate}
                  label="Start Date (DD-MM-YYYY)"
                  // format="MM/dd/yyyy hh:mm a"
                  format={dateFormat}
                  name={startDate}
                  fullWidth
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  value={startDate ? startDate : null}
                />
              </MuiPickersUtilsProvider>
            </div>

            <div
              className={
                props.history.location.pathname ===
                "/home/reports/fureports/nearlyexpireditems"
                  ? "col-md-4"
                  : "col-md-6"
              }
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  // disableFuture={true}
                  inputVariant="filled"
                  onChange={setEndDate}
                  name={endDate}
                  label="End Date (DD-MM-YYYY)"
                  format={dateFormat}
                  fullWidth
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  // value={endDate}
                  value={endDate ? endDate : null}
                />
              </MuiPickersUtilsProvider>
            </div>

            {props.history.location.pathname ===
            "/home/reports/fureports/nearlyexpireditems" ? (
              <div
                className={"col-md-4"}
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  select
                  fullWidth
                  id="selectedFU"
                  name="selectedFU"
                  value={selectedFU}
                  onChange={onChangeValue}
                  label="Functional Unit"
                  variant="filled"
                  className="dropDownStyle"
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  disabled={
                    currentUser &&
                    (currentUser.staffTypeId.type === "admin" ||
                      currentUser.staffTypeId.type === "super admin")
                      ? false
                      : true
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {fuArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.fuName}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </div>
            ) : (
              undefined
            )}
          </div>
        </div>

        <div className="container">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              style={{
                ...styles.stylesForPurchaseButton,
                width: matches ? 160 : "100%",
              }}
              // disabled={!validateForm()}
              onClick={getPurchaseRequests}
              variant="contained"
              color="primary"
            >
              <strong style={{ fontSize: "12px" }}>Get Details</strong>
            </Button>

            <Button
              style={{
                ...styles.stylesForPurchaseButton,
                backgroundColor: "#2c6ddd",
                width: matches ? 160 : "100%",
                marginTop: matches ? "" : 20,
              }}
              // disabled={!purchaseOrders}
              onClick={handlePrint}
              variant="contained"
              color="primary"
            >
              <strong style={{ fontSize: "12px" }}>Print</strong>
            </Button>
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
            // height:'100%'
          }}
        >
          {isLoading ? (
            <div className="LoaderStyle">
              <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
          ) : purchaseOrders && purchaseOrders.length === 0 ? (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <h4 style={{ color: "white", fontWeight: "700" }}>
                No data found.
              </h4>
            </div>
          ) : purchaseOrders && purchaseOrders.length > 0 ? (
            <>
              <div style={{}}>
                <CustomTable
                  tableData={purchaseOrders}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={""}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                  // id={"itemsBalanceFU"}
                />
              </div>
              <div style={{ display: "none" }}>
                <CustomTable
                  tableData={purchaseOrders}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={""}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                  id={"nearlyExiredItems"}
                  doNotPagination={true}
                  matchNotRequired={true}
                />
              </div>
            </>
          ) : (
            undefined
          )}
        </div>

        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back}
            style={{ width: 45, height: 35, cursor: "pointer" }}
          />
        </div>
        <Notification msg={errorMsg} open={openNotification} />
      </div>
    </div>
  );
}
