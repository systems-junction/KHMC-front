/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getReceiveRequestsUrl,
  socketUrl,
  getReceiveRequestsSearch,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import ReceiveItem from "../../assets/img/Receive Item.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import AddedPurchaseRequestTable from "../PurchaseOrders/addedPurchaseRequestTable";

import socketIOClient from "socket.io-client";
import Back_Arrow from "../../assets/img/Back_Arrow.png";

import PrintTable from "../PurchaseOrders/printOrder";
import cookie from "react-cookies";

import LogoPatientSummaryInvoice from "../../assets/img/logoPatientSummaryInvoice.png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const tableHeading = [
  "PO No",
  "Date/Time Send",
  "Generated By",
  "Vendor",
  "Date/Time Received",
  "Status",
  "Action",
];

const tableDataKeys = [
  ["poId", "purchaseOrderNo"],
  ["poId", "sentAt"],
  ["poId", "generated"],
  ["vendorId", "englishName"],
  "updatedAt",
  "status",
];

const styles = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};

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

const actions = { view: true, print: true };

export default function PurchaseRequest(props) {
  const [materialReceivings, setMaterialReceivings] = useState("");
  const classesInput = useStylesForInput();

  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [purchaseRequests, setPurchaseRequests] = useState("");

  const [purchaseOrders, setPurchaseOrders] = useState("");

  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState("");
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState("");
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  const [selectedPRToPrint, setSelectedPRToPrint] = useState("");

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getReceiveRequestsUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);

          let temp = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let obj = {
              ...res.data.data[i],
              poId: res.data.data[i].mrId.poId,
            };
            temp = [...temp, obj];
          }

          console.log("temp", temp);
          setMaterialReceivings(temp.reverse());
          setVendor(res.data.data.vendors);
          setStatus(res.data.data.statues);
          setPurchaseOrders(res.data.data.purchaseOrders);
          setPurchaseRequests(res.data.data.purchaseRequests);
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
    socket.on("get_data", (data) => {
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {
          ...data[i],
          poId: data[i].mrId.poId,
        };
        temp = [...temp, obj];
      }
      setMaterialReceivings(temp.reverse());
      console.log("res after adding through socket", data);
    });

    getPurchaseRequests();

    return () => socket.disconnect();
  }, []);

  const addNewItem = () => {
    let path = `materialreceiving/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        vendors,
        statues,
        purchaseRequests,
        purchaseOrders,
      },
    });
  };

  function handleView(rec) {
    let path = `receiverequests/viewpo`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        purchaseRequests,
        purchaseOrders,
        mrId: rec.mrId._id,
      },
    });
  }

  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getReceiveRequestsSearch + "/" + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              let temp = [];
              for (let i = 0; i < res.data.data.length; i++) {
                let obj = {
                  ...res.data.data[i],
                  poId: res.data.data[i].mrId.poId,
                };
                temp = [...temp, obj];
              }
              console.log(temp, "temmp");

              setMaterialReceivings(temp.reverse());
            } else {
              console.log(res.data.data, "no-response");
              setMaterialReceivings([]);
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
    setSelectedPRToPrint({ ...selectedPr.poId, vendorId: selectedPr.vendorId });
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
    doc.text(77, 22, "Purchase Order Form");
    doc.setFontSize(12);
    doc.text(170, 14, "Amman Jordan");
    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 12, "F");
    // information of patient
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    // doc.text(12, 50, "From");
    // doc.text(12, 55, "Description");
    // doc.text(80, 50, "Department");
    // doc.text(80, 55, "Warehouse");
    doc.text(12, 50, "Doc No.");
    doc.text(12, 55, "Date");
    // dynamic data info patient
    doc.setFont("times", "bold");
    // doc.text(45, 50, "HERE");
    // doc.text(45, 55, "HERE");
    // doc.text(100, 50, "HERE");
    // doc.text(100, 55, "HERE");
    doc.text(35, 50, selectedPRToPrint.purchaseOrderNo);
    doc.text(35, 55, createdAt);
    // table
    // footer

    doc.autoTable({
      margin: { top: 60, right: 3, left: 3 },
      tableWidth: "auto",
      headStyles: { fillColor: [44, 109, 221] },
      html: "#my_tableForPO",
    });

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(50, 250, "Department Manager");
    doc.line(50, 258, 90, 258);
    doc.text(140, 250, "Section Head");
    doc.line(140, 258, 165, 258);
    doc.setFont("times", "normal");
    doc.text(10, 270, "User name:");
    doc.text(35, 270, currentUser.name);
    doc.text(160, 270, "Module:");
    doc.text(180, 270, "Purchasing");
    doc.text(140, 275, "Date:");
    doc.text(150, 275, new Date().toLocaleString());

    doc.save(`${selectedPRToPrint.purchaseOrderNo}.pdf`);
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
      <Header history={props.history}/>

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={ReceiveItem} />
            <h4>Receive Request</h4>
          </div>
        </div>

        <div
          className="row"
          style={{ marginLeft: "0px", marginRight: "0px", marginTop: "20px" }}
        >
          <div
            className="col-md-12 col-sm-9 col-8"
            style={styles.textFieldPadding}
          >
            <TextField
              className="textInputStyle"
              id="searchPatientQuery"
              type="text"
              variant="filled"
              label="Search By Return Request No"
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
          className="container-fluid"
        >
          {materialReceivings && materialReceivings.length > 0 ? (
            <div>
              <div class="row">
                <CustomTable
                  tableData={materialReceivings}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleView={handleView}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                  handlePrint={handlePrintPR}
                />
              </div>

              <Notification msg={errorMsg} open={openNotification} />

              <div class="row">
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    marginBottom: 40,
                    marginTop: 20,
                  }}
                >
                  <div style={{}}>
                    <img
                      onClick={() => props.history.goBack()}
                      src={Back_Arrow}
                      style={{ width: 60, height: 40, cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : materialReceivings && materialReceivings.length == 0 ? (
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
                  src={Back_Arrow}
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
        <PrintTable selectedPRToPrint={selectedPRToPrint} />
      </div>
    </div>
  );
}
