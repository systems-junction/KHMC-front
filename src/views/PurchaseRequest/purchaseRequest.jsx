/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import cookie from "react-cookies";

import axios from "axios";
import {
  getPurchaseRequestUrl,
  deletePurchaseRequestUrl,
  socketUrl,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import purchase_request from "../../assets/img/purchase request.png";
import plus_icon from "../../assets/img/Plus.png";
import Back from "../../assets/img/Back_Arrow.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import LogoPatientSummaryInvoice from "../../assets/img/logoPatientSummaryInvoice.png";

import Fingerprint from "../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../assets/img/Bar Code.png";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles1 } from "../../components/MuiCss/MuiCss";
import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import socketIOClient from "socket.io-client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

import PrintTable from "./printPR";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};

const tableHeading = [
  "Request No",
  "Date",
  "Generated",
  "Vendor",
  "Approved By",
  "Status",
  "Action",
];
const tableDataKeys = [
  "requestNo",
  "createdAt",
  "generated",
  ["vendorId", "englishName"],
  ["approvedBy", "firstName"],
  "status",
];

const tableHeadingForCommittee = [
  "Request No",
  "Date",
  "Generated",
  "Vendor",
  "Approved By",
  "Status",
  "Action",
];
const tableDataKeysForCommittee = [
  "requestNo",
  "createdAt",
  "generated",
  ["vendorId", "englishName"],
  ["approvedBy", "firstName"],
  "committeeStatus",
];

const tableHeadingToPrint = [
  "Ser.",
  "Item Code",
  "Item Name",
  "Balance",
  "Unit",
  "Consumption",
  "Last Supplier",
  "Last Price",
  "Unit",
  "Qty",
];

const useStylesForInput = makeStyles((theme) => ({
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
}));

const actions = { edit: true, delete: false, print: true };

export default function PurchaseRequest(props) {
  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const classesInput = useStylesForInput();
  const classes1 = useStyles1();

  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  const [selectedPRToPrint, setSelectedPRToPrint] = useState("");

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getPurchaseRequestUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setPurchaseRequest(res.data.data.purchaseRequest.reverse());
          setVendor(res.data.data.vendor);
          setStatus(res.data.data.status);
          setItems(res.data.data.items);
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
    const socket = socketIOClient(socketUrl);
    socket.emit("connection");
    // socket.on("get_data", (data) => {
    //   setPurchaseRequest(data.reverse());
    //   console.log("res after adding through socket", data);
    // });

    getPurchaseRequests();

    return () => socket.disconnect();
  }, []);

  const addNewItem = () => {
    let path = `pr/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items },
    });
  };

  function handleEdit(rec) {
    let path = `pr/edit`;

    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        items,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem._id,
    };

    axios
      .delete(deletePurchaseRequestUrl + "/" + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(true);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error while deletion ", e);
      });
  }

  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getPurchaseRequestUrl + "/" + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.purchaseRequest.length > 0) {
              console.log(res.data.data);
              setPurchaseRequest(res.data.data.purchaseRequest.reverse());
            } else {
              console.log(res.data.data, "no-response");
              setPurchaseRequest([]);
            }
          }
        })
        .catch((e) => {
          console.log("error after searching patient request", e);
        });
    } else if (a.length == 0) {
      getPurchaseRequests();
    }
  };

  function handlePrintPR(selectedPr) {
    console.log(selectedPr);
    setSelectedPRToPrint(selectedPr);
  }

  const handlePrint = () => {
    let imgData = new Image();
    imgData.src = LogoPatientSummaryInvoice;

    var doc = new jsPDF();

    let date = new Date(selectedPRToPrint.createdAt);
    let month = date.getMonth() + 1;
    let createdAt = date.getDate() + " - " + month + " - " + date.getFullYear();

    doc.addImage(imgData, "JPG", 10, 10, 40, 20);

    // header
    doc.setFontSize(13);
    doc.text(60, 15, "Al-Khalidi Hospital & Medical Center");
    doc.text(77, 22, "Purchase Request Form");
    doc.setFontSize(12);
    doc.text(170, 14, "Amman Jordan");
    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 12, "F");
    // information of patient
    doc.setFontSize(10);
    doc.setFont("times", "normal");

    doc.text(12, 50, "Doc No.");
    doc.text(12, 55, "Date");
    doc.text(80, 50, "Supplier");
    doc.text(80, 55, "Generated By");
    // doc.text(80, 50, "Department");
    // doc.text(80, 55, "Warehouse");
    // dynamic data info patient
    doc.setFont("times", "bold");

    doc.text(40, 50, selectedPRToPrint.requestNo);
    doc.text(40, 55, createdAt);
    // doc.text(45, 50, "HERE");
    // doc.text(45, 55, "HERE");
    doc.text(110, 50, selectedPRToPrint.vendorId.englishName);
    doc.text(110, 55, selectedPRToPrint.generatedBy);
    // table
    // footer

    doc.autoTable({
      margin: { top: 60, right: 10, left: 10 },
      tableWidth: "auto",
      headStyles: { fillColor: [44, 109, 221] },
      html: "#my_table",
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
    doc.text(160, 270, "Module:");
    doc.text(180, 270, "Purchasing");
    doc.text(145, 275, "Date:");
    doc.text(155, 275, new Date().toLocaleString());

    doc.save(`${selectedPRToPrint.requestNo}.pdf`);
  };

  useEffect(() => {
    if (selectedPRToPrint) {
      handlePrint();
    }
  }, [selectedPRToPrint]);

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
            <img src={purchase_request} />
            <h4>Purchase Requests</h4>
          </div>

          <div>
            {currentUser &&
            currentUser.staffTypeId.type !== "Committe Member" ? (
              <Button
                onClick={addNewItem}
                style={styles.stylesForButton}
                variant="contained"
                color="primary"
              >
                <img className="icon-style" src={plus_icon} />
                &nbsp;&nbsp;
                <strong>Add New</strong>
              </Button>
            ) : (
              undefined
            )}
            {/* <img
              className='img-style'
              src={Search}
              style={{ maxWidth: '22.5%', height: 'auto' }}
            /> */}
          </div>
        </div>

        <div
          className={`${"row"} ${classes1.root}`}
          style={{ marginLeft: "0px", marginRight: "-5px", marginTop: "20px" }}
        >
          <div
            className="col-md-12 col-sm-9 col-12"
            style={styles.textFieldPadding}
          >
            <TextField
              className="textInputStyle"
              id="searchPatientQuery"
              type="text"
              variant="filled"
              label="Search By Request No/ Vendor Name"
              name={"searchPatientQuery"}
              value={searchPatientQuery}
              onChange={handlePatientSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
                className: classesInput.input,
                classes: { input: classesInput.input },
                disableUnderline: true,
              }}
            />
          </div>

          <div
            className="col-md-1 col-sm-2 col-2"
            style={{
              ...styles.textFieldPadding,
            }}
          ></div>

          <div
            className="col-md-1 col-sm-1 col-2"
            style={{
              ...styles.textFieldPadding,
            }}
          ></div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {purchaseRequests && purchaseRequests.length > 0 ? (
            <div>
              {currentUser.staffTypeId.type === "Committe Member" ? (
                <CustomTable
                  tableData={purchaseRequests}
                  tableDataKeys={tableDataKeysForCommittee}
                  tableHeading={tableHeadingForCommittee}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                  handlePrint={handlePrintPR}
                />
              ) : (
                <CustomTable
                  tableData={purchaseRequests}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                  handlePrint={handlePrintPR}
                />
              )}

              <ConfirmationModal
                modalVisible={modalVisible}
                msg="Are you sure want to delete the record?"
                hideconfirmationModal={() => setModalVisible(false)}
                onConfirmDelete={() => deleteVendor()}
                setdeleteItem={() => setdeleteItem("")}
              />
              <div style={{ marginBottom: 20 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: "pointer",
                  }}
                />
              </div>
              <Notification msg={errorMsg} open={openNotification} />
            </div>
          ) : purchaseRequests && purchaseRequests.length == 0 ? (
            <div className="row " style={{ marginTop: "25px" }}>
              <div className="col-11">
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className="col-1" style={{ marginTop: 45 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ maxWidth: "60%", height: "auto", cursor: "pointer" }}
                />
              </div>
            </div>
          ) : (
            <div className="LoaderStyle">
              <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
          )}
        </div>
      </div>

      <PrintTable selectedPRToPrint={selectedPRToPrint} />
    </div>
  );
}
