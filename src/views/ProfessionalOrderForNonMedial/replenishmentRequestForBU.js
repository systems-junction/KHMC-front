/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getRepRequestUrlBUForNonPharmaceutical,
  deleteReplenishmentRequestUrl,
  getFunctionalUnitFromHeadIdUrl,
  getBusinessUnitUrlWithHead,
  getReceiveRequestBUUrl,
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/Professional Order.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import Fingerprint from "../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../assets/img/Bar Code.png";
import TextField from "@material-ui/core/TextField";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import { makeStyles } from "@material-ui/core/styles";

import add_new from "../../assets/img/Plus.png";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import LogoPatientSummaryInvoice from "../../assets/img/logoPatientSummaryInvoice.png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PrintTable from "./printNonMedicalOrder";

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "60%",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};
const useStyles = makeStyles(styles);

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

const tableHeadingForBUMember = [
  "Order Type",
  "Order No",
  // "Patient MRN",
  "Date Generated",
  "Actions",
];
const tableDataKeysForBUMember = [
  "orderFor",
  "requestNo",
  // "patientReferenceNo",
  "createdAt",
];

// const tableHeadingForDoctorAndNursing = [
//   "Order Type",
//   "Request No",
//   "Patient MRN",
//   "Date Generated",
//   "Actions",
// ];
// const tableDataKeysForDoctorAndNursing = [
//   "orderFor",
//   "requestNo",
//   "patientReferenceNo",
//   "createdAt",
// ];

// const tableHeadingForFUMember = [
//   "Order Type",
//   "Request No",
//   "Patient MRN",
//   "Date Generated",
//   "Actions",
// ];
// const tableDataKeysForFUMember = [
//   "orderFor",
//   "requestNo",
//   "patientReferenceNo",
//   "createdAt",
// ];

const tableDataKeysForItemsForBUMember = [
  ["itemId", "name"],
  "requestedQty",
  "status",
];

const tableDataKeysForFUMemberForItems = [
  ["itemId", "name"],
  "requestedQty",
  "secondStatus",
];

const tableHeadingForFUMemberForItems = [
  "Name",
  "Requested Qty",
  "Status",
  "Actions",
];

const actions = { view: true, print: true };
const actionsForBUMemeber = { edit: true, view: true };
const actionsForBUMemeberForReceive = { edit: false, view: true, print:true };
const actionsForBUMemeberForEdit = { edit: true, view: false, print: true };
const actionsForBUNurse = { view: true, edit: true };
const actionsForBUDoctor = { view: true };

const actionsForItemsForReceiver = {
  // edit: true,
  receiveItem: true,
  view: true,
};
const actionsForItemsForOther = { view: true };
const actionsForItemsForFUMember = { edit: true };

export default function ReplenishmentRequest(props) {
  const classes = useStyles();
  const classesInput = useStylesForInput();

  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [buObj, setBUObj] = useState("");
  const [receiveRequests, setReceiveRequests] = useState("");

  const [requestedItems, setRequestedItems] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const [isOpen, setIsOpen] = useState(false);
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
      .get(getRepRequestUrlBUForNonPharmaceutical)
      .then((res) => {
        if (res.data.success) {
          console.log("professional request", res.data.data);

          let repRequest = res.data.data;
          // repRequest = res.data.data.filter(
          //   (order) => order.fuId._id === props.match.params.fuName
          // );

          if (currentUser.staffTypeId.type === "Registered Nurse") {
            // let repRequest = res.data.data;
            let temp = [];
            // for (let i = 0; i < repRequest.length; i++) {
            //   if (repRequest[i].buId.buHead === currentUser.staffId) {
            //     temp.push(repRequest[i]);
            //   }
            // }
            // console.log("rep array after filter", temp);
            setPurchaseRequest(res.data.data.reverse());
          } else {
            if (currentUser.staffTypeId.type === "FU Inventory Keeper") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "pending" ||
                //   repRequest[i].status === "in_progress"
                //    || repRequest[i].status === "Received"
                // )
                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else if (currentUser.staffTypeId.type === "FU Incharge") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "Delivery in Progress" ||
                //   repRequest[i].status === "in_progress"
                // )

                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else if (currentUser.staffTypeId.type === "Registered Nurse") {
              // let repRequest = res.data.data;
              // let temp = [];
              // for (let i = 0; i < repRequest.length; i++) {
              //   if (
              //     repRequest[i].status === "Delivery in Progress" ||
              //     repRequest[i].status === "pending_administration" ||
              //     repRequest[i].status === "complete"
              //   ) {
              //     temp.push(repRequest[i]);
              //   }
              // }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(repRequest.reverse());
            } else if (currentUser.staffTypeId.type === "BU Inventory Keeper") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "complete" ||
                //   repRequest[i].status === "pending_administration"
                // )
                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else {
              setPurchaseRequest(repRequest.reverse());
            }
          }
          //   setVendor(res.data.data.vendor);
          //   setStatus(res.data.data.status);
          //   setItems(res.data.data.items);
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

  function getBUFromHeadId() {
    axios
      .get(getBusinessUnitUrlWithHead + "/" + currentUser.functionalUnit._id)
      .then((res) => {
        if (res.data.success) {
          console.log("BU Obj", res.data.data[0]);
          setBUObj(res.data.data[0].buId);
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

  function getReceiveRequestsForBU() {
    axios
      .get(getReceiveRequestBUUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("receive requests", res.data.data.receiveItems);
          setReceiveRequests(res.data.data.receiveItems);
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
    getPurchaseRequests();
    getReceiveRequestsForBU();

    if (currentUser.staffTypeId.type === "Registered Nurse") {
      getBUFromHeadId();
    }
  }, []);

  const addNewItem = () => {
    let path = `professionalorder/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, buObj },
    });
  };

  function handleEdit(rec) {
    let path = `/home/wms/fus/professionalorder/addnonmedicalorder/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        items,
        buObj,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(deleteReceiveItemsUrl + "/" + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(false);
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

  const handleView = (obj) => {
    let path = `professionalorder/edit`;

    if (currentUser.staffTypeId.type === "Registered Nurse") {
      let repRequest = obj.item;
      let temp = [];
      for (let i = 0; i < repRequest.length; i++) {
        if (
          repRequest[i].status === "Delivery in Progress" ||
          repRequest[i].status === "pending_administration" ||
          repRequest[i].status === "complete" ||
          repRequest[i].status === "Received" ||
          repRequest[i].status === "Partially Received"
        ) {
          temp.push(repRequest[i]);
        }
      }

      console.log("rep array after filter", temp);
      setSelectedOrder(obj);
      setIsOpen(true);
      setRequestedItems(temp);
    } else {
      setSelectedOrder(obj);
      setIsOpen(true);
      setRequestedItems(obj.item);
    }
    // }
  };

  function handleReceive(rec) {
    let obj = {
      ...rec,
      buId: selectedOrder.buId,
      fuId: selectedOrder.fuId,
      replenishmentRequestId: selectedOrder._id,
      requestNo: selectedOrder.requestNo,
    };

    console.log("rec", obj);

    let found = false;
    for (let i = 0; i < receiveRequests.length; i++) {
      if (receiveRequests[i].replenishmentRequestItemId === rec._id) {
        console.log("found");
        found = true;
        break;
      }
    }
    if (found) {
      setSelectedOrder("");
      setIsOpen(false);
      setRequestedItems("");
      setOpenNotification(true);
      setErrorMsg("Item has already been received");
    } else {
      let path = `/home/wms/fus/professionalorder/receive`;
      props.history.push({
        pathname: path,
        state: {
          comingFor: "add",
          selectedItem: obj,
          // vendors,
          // statues,
          // purchaseOrders,
          // materialReceivingId: props.materialReceivingId,
        },
      });
    }
  }

  function handleEditRequestedItem(rec) {
    let path = `/home/wms/fus/professionalorder/requesteditem/edit`;

    console.log(rec);

    let requestedItem = requestedItems.find((item) => item._id === rec._id);

    console.log(requestedItem);

    let obj = {
      _id: selectedOrder._id,
      requestNo: selectedOrder.requestNo,
      generatedBy: selectedOrder.generatedBy,
      generated: selectedOrder.generated,
      dateGenerated: selectedOrder.dateGenerated,
      fuId: selectedOrder.fuId,
      buId: selectedOrder.buId,
      selectedRequestedItem: requestedItem,
      comments: selectedOrder.comments,
      patientReferenceNo: selectedOrder.patientReferenceNo,
      requestedQty: requestedItem.requestedQty,
      currentQty: requestedItem.currentQty,
      status: requestedItem.status,
      secondStatus: requestedItem.secondStatus,
      requesterName: selectedOrder.requesterName,
      orderType: selectedOrder.orderType,
      department: selectedOrder.department,
      reason: selectedOrder.reason,
      item: selectedOrder.item,
      orderFor: selectedOrder.orderFor,
      orderBy: selectedOrder.orderBy,
    };

    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: obj,
        vendors,
        statues,
        items,
        buObj,
      },
    });
  }

  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getRepRequestUrlBUForNonPharmaceutical + "/" + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              setPurchaseRequest(res.data.data.reverse());
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
      console.log("less");
      getPurchaseRequests();
    }
  };

  if (
    props.history.location.pathname ===
      "/home/wms/fus/professionalorder/addorder" &&
    // items &&
    buObj
    //  &&
    // statues &&
    // vendors
  ) {
    let path = "/home/wms/fus/professionalorder/add";

    // props.history.replace({
    //   pathname: path,
    //   state: { comingFor: "add", vendors, statues, items, buObj },
    // });

    let obj = {
      comingFor: "add",
      buObj,
    };
    let sendingObj = "";
    if (
      props.history.location.state &&
      props.history.location.state.selectedPatient
    ) {
      sendingObj = {
        ...obj,
        selectedPatient: props.history.location.state.selectedPatient,
        comingFromRCM: true,
      };
    } else {
      sendingObj = { ...obj };
    }
    props.history.replace({
      pathname: path,
      state: { ...sendingObj },
    });
  }

  if (
    props.history.location.pathname ===
      "/home/wms/fus/professionalorder/addnonmedicalorder" &&
    // items &&
    buObj
    //  &&
    // statues &&
    // vendors
  ) {
    let path = "/home/wms/fus/professionalorder/addnonmedicalorder/add";

    props.history.replace({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, buObj },
    });
  }

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
    doc.text(85, 22, "Non - Medical Order");
    doc.setFontSize(12);
    doc.text(170, 14, "Amman Jordan");
    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 12, "F");
    // information of patient
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(12, 50, "From");
    doc.text(12, 55, "To");
    // doc.text(80, 50, "Department");
    // doc.text(80, 55, "Warehouse");
    doc.text(135, 50, "Doc No.");
    doc.text(135, 55, "Date");
    // dynamic data info patient
    doc.setFont("times", "bold");
    doc.text(35, 50, "Nurse");
    doc.text(35, 55, "Functional Unit Inventory");
    // doc.text(100, 50, "HERE");
    // doc.text(100, 55, "HERE");
    doc.text(150, 50, selectedPRToPrint.requestNo);
    doc.text(150, 55, createdAt);
    // table
    // footer

    doc.autoTable({
      margin: { top: 60, right: 10, left: 10 },
      tableWidth: "auto",
      headStyles: { fillColor: [44, 109, 221] },
      html: "#my_tableForMedicalOrder",
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
    doc.text(147, 275, "Date:");
    doc.text(157, 275, new Date().toLocaleString());

    doc.save(`${selectedPRToPrint.requestNo}.pdf`);
  };

  useEffect(() => {
    if (selectedPRToPrint) {
      handlePrint();
    }
  }, [selectedPRToPrint]);

  if (
    props.history.location.pathname !==
    "/home/wms/fus/professionalorder/addorder"
  ) {
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
              <img src={business_Unit} />

              {props.history.location.pathname ===
              "/home/wms/fus/professionalorder/receiveorder" ? (
                <h4>Ordered Items (Non-Medical)</h4>
              ) : (
                <h4>Ordered Items (Non-Medical)</h4>
              )}
            </div>

            {currentUser &&
            ((currentUser.staffTypeId.type === "Registered Nurse" &&
              props.history.location.pathname ===
                "/home/wms/fus/professionalorder/addorder") ||
              currentUser.staffTypeId.type === "admin") ? (
              // <div>
              //   <img onClick={addNewItem} src={Add_New} />
              //   {/* <img src={Search} /> */}
              // </div>
              <Button
                onClick={addNewItem}
                style={styles.stylesForButton}
                variant="contained"
                color="primary"
              >
                <img src={add_new} style={styles.stylesForIcon} />
                &nbsp;&nbsp;
                <strong>Add New</strong>
              </Button>
            ) : (
              undefined
            )}
          </div>

          <div
            className="row"
            style={{
              marginLeft: "0px",
              marginRight: "-5px",
              marginTop: "20px",
            }}
          >
            <div
              className="col-md-12 col-sm-9 col-8"
              style={{ ...styles.textFieldPadding }}
            >
              <TextField
                className="textInputStyle"
                id="searchPatientQuery"
                type="text"
                variant="filled"
                label="Search orders By Order No"
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
                <div>
                  <CustomTable
                    tableData={purchaseRequests}
                    // tableDataKeys={
                    //   currentUser.staffTypeId.type === "Registered Nurse"
                    //     ? tableDataKeysForBUMember
                    //     : currentUser.staffTypeId.type === "Registered Nurse" ||
                    //       currentUser.staffTypeId.type === "BU Doctor"
                    //     ? tableDataKeysForDoctorAndNursing
                    //     : currentUser.staffTypeId.type === "FU Inventory Keeper"
                    //     ? tableDataKeysForFUMember
                    //     : tableDataKeysForBUMember
                    // }
                    // tableHeading={
                    //   currentUser.staffTypeId.type === "Registered Nurse"
                    //     ? tableHeadingForBUMember
                    //     : currentUser.staffTypeId.type === "Registered Nurse" ||
                    //       currentUser.staffTypeId.type === "BU Doctor"
                    //     ? tableHeadingForDoctorAndNursing
                    //     : currentUser.staffTypeId.type === "FU Inventory Keeper"
                    //     ? tableHeadingForFUMember
                    //     : tableHeadingForBUMember
                    // }

                    tableDataKeys={tableDataKeysForBUMember}
                    tableHeading={tableHeadingForBUMember}
                    action={
                      currentUser.staffTypeId.type === "Registered Nurse" &&
                      props.history.location.pathname ===
                        "/home/wms/fus/professionalorder/addorder"
                        ? actionsForBUMemeber
                        : currentUser.staffTypeId.type === "Registered Nurse" &&
                          props.history.location.pathname ===
                            "/home/wms/fus/professionalorder/receiveorder"
                        ? actionsForBUMemeberForReceive
                        : currentUser.staffTypeId.type === "Registered Nurse" &&
                          props.history.location.pathname ===
                            "/home/wms/fus/professionalorder"
                        ? actionsForBUMemeberForEdit
                        : actions
                    }
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    receiveItem={handleReceive}
                    handleView={handleView}
                    borderBottomColor={"#60d69f"}
                    borderBottomWidth={20}
                    handlePrint={handlePrintPR}
                  />
                </div>

                <ConfirmationModal
                  modalVisible={modalVisible}
                  msg="Are you sure want to delete the record?"
                  hideconfirmationModal={() => setModalVisible(false)}
                  onConfirmDelete={() => deleteVendor()}
                  setdeleteItem={() => setdeleteItem("")}
                />

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
                    src={Back_Arrow}
                    style={{ width: 45, height: 35, cursor: "pointer" }}
                  />
                </div>
              </div>
            ) : (
              <div className="LoaderStyle">
                <Loader type="TailSpin" color="red" height={50} width={50} />
              </div>
            )}
          </div>
          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 45, height: 35, cursor: "pointer" }}
            />
          </div>

          <Dialog
            aria-labelledby="form-dialog-title"
            open={isOpen}
            maxWidth="xl"
            fullWidth={true}
            // fullScreen
            onBackdropClick={() => {
              setIsOpen(false);
            }}
          >
            <DialogContent style={{ backgroundColor: "#31e2aa" }}>
              <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
                Added Items
              </DialogTitle>
              <div className="container-fluid">
                <CustomTable
                  tableData={requestedItems}
                  tableHeading={tableHeadingForFUMemberForItems}
                  tableDataKeys={
                    currentUser.staffTypeId.type === "Registered Nurse"
                      ? tableDataKeysForItemsForBUMember
                      : currentUser.staffTypeId.type === "Registered Nurse" ||
                        currentUser.staffTypeId.type === "BU Doctor"
                      ? tableDataKeysForItemsForBUMember
                      : currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? tableDataKeysForFUMemberForItems
                      : tableDataKeysForItemsForBUMember
                  }
                  action={
                    currentUser.staffTypeId.type === "Registered Nurse"
                      ? actionsForItemsForReceiver
                      : currentUser.staffTypeId.type === "BU Doctor"
                      ? actionsForItemsForOther
                      : currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? actionsForItemsForFUMember
                      : actionsForItemsForOther
                  }
                  handleEdit={handleEditRequestedItem}
                  handleDelete={handleDelete}
                  receiveItem={handleReceive}
                  handleView={handleEditRequestedItem}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <PrintTable selectedPRToPrint={selectedPRToPrint} />
      </div>
    );
  } else {
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
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Header history={props.history}/>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "fixed",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="LoaderStyle">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
        </div>
      </div>
    );
  }
}
