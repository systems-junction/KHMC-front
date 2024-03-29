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
  getReplenishmentRequestUrlFU,
  deleteReplenishmentRequestUrl,
  getFunctionalUnitFromHeadIdUrl,
  getReceiveRequestFUUrl,
  getInternalReturnRequestsFU,
  getFunctionalUnitByIdUrl,
  getFunctionalUnitUrl,
  getReplenishmentRequestUrlFUSearch,
} from "../../public/endpoins";
import plus_icon from "../../assets/img/Plus.png";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import view_all from "../../assets/img/view_all.png";

import ReceiveItem from "../../assets/img/Receive Item.png";
import business_Unit from "../../assets/img/FuncU Fulfillment.png";
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
import { makeStyles } from "@material-ui/core/styles";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PrintTable from "./printReplenishmentRequest";
import LogoPatientSummaryInvoice from "../../assets/img/logoPatientSummaryInvoice.png";

import twenthyfive from "../../assets/img/25.png";

const tableHeadingForFUHead = [
  "Replenishemt Request No",
  "Generated",
  "Date/Time Generated",
  "Status",
  "Actions",
];
const tableDataKeysForFUHead = [
  "requestNo",
  "generated",
  "dateGenerated",
  "status",
];

const tableHeading = [
  "Replenishemt Request No",
  "Generated",
  "Date/Time Generated",
  "Functional Unit Name",
  "Approved By",
  "Status",
  "Actions",
];
const tableDataKeys = [
  "requestNo",
  "generated",
  "dateGenerated",
  ["fuId", "fuName"],
  ["approvedBy", "firstName"],
  "secondStatus",
];

// const actions = { edit: true }
// const actionsForFUInventoryKeeper = {
//   receiveItem: true,
//   returnRequest: true,
// }

// const actionsForAdmin = {
//   receiveItem: true,
//   returnRequest: true,
//   edit: true,
// }

const styles = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};

const useStylesForInput = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
      borderRadius: 5,
    },
  },
  multilineColor: {
    boxShadow: "none",
    backgroundColor: "white",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:focus": {
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
      boxShadow: "none",
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

const actions = { view: true };
const actionsForFUMemeberForReceive = { edit: false, view: true, print: true };
const actionsForFUMemeberForReplenishment = {
  edit: true,
  view: true,
  print: true,
};

const actionsForWarehouseMember = { edit: true, view: true, print: true };
const actionsForBUDoctor = { view: true };

const tableDataKeysForItemsForWarehouseMember = [
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "requestedQty",
  "fuItemCost",
  "secondStatus",
];

const tableDataKeysForFUMemberForItems = [
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "requestedQty",
  "fuItemCost",
  "status",
];

const tableHeadingForFUMemberForItems = [
  "Item Code",
  "Name",
  "Requested Qty",
  "Functional Unit Item Cost (JD)",
  "Status",
  "",
];

const tableHeadingForFUInventoryKeeperForItems = [
  "Item Code",
  "Name",
  "Requested Qty",
  "Functional Unit Item Cost (JD)",
  "Status",
  "",
];

const tableHeadingForFUInventoryKeeperForItemsForReceive = [
  "Item Code",
  "Name",
  "Requested Qty",
  "Functional Unit Item Cost (JD)",
  "Status",
  "Actions",
];

const actionsForItemsForReceiver = {
  receiveItem: true,
  returnRequest: true,
};
const actionsForItemsForOther = { view: true };
const actionsForItemsForFUMember = { edit: false };

const stylesB = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    background: "#2c6ddd",
    width: "110px",
    height: "40px",
    outline: "none",
  },
};

export default function ReplenishmentRequest(props) {
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
  const [fuObj, setFUObj] = useState("");
  const [receiveRequests, setReceiveRequests] = useState("");

  const [returnRequests, setReturnRequests] = useState("");

  const [requestedItems, setRequestedItems] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  const [selectedPRToPrint, setSelectedPRToPrint] = useState("");

  function getPurchaseRequests() {
    axios
      .get(getReplenishmentRequestUrlFU)
      .then((res) => {
        if (res.data.success) {
          console.log(
            "respose for rep request for warehouse member",
            res.data.data
          );

          let repRequest = res.data.data;
          // repRequest = res.data.data.filter(
          //   (order) => order.fuId._id === props.match.params.fuName
          // );

          if (currentUser.staffTypeId.type === "FU Inventory Keeper") {
            // let repRequest = res.data.data;
            let temp = [];
            for (let i = 0; i < repRequest.length; i++) {
              // if (repRequest[i].fuId.fuHead === currentUser.staffId) {
              temp.push(repRequest[i]);
              // }
            }
            console.log("rep array after filter", temp);
            setPurchaseRequest(temp.reverse());
          } else {
            if (currentUser.staffTypeId.type === "Warehouse Inventory Keeper") {
              // let repRequest = res.data.data;
              // let temp = [];
              // for (let i = 0; i < repRequest.length; i++) {
              //   if (
              //     repRequest[i].status === "Fulfillment Initiated" ||
              //     repRequest[i].status === "Delivery in Progress"
              //     //  || repRequest[i].status === "Received"
              //   ) {
              //     temp.push(repRequest[i]);
              //   }
              // }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(repRequest.reverse());
            } else if (currentUser.staffTypeId.type === "Warehouse Member") {
              // let repRequest = res.data.data;
              // let temp = [];
              // for (let i = 0; i < repRequest.length; i++) {
              //   if (
              //     repRequest[i].status === "pending" ||
              //     repRequest[i].status === "Pending" ||
              //     repRequest[i].status === "Fulfillment Initiated" ||
              //     repRequest[i].status === "Partial Fulfillment Initiated"
              //   ) {
              //     temp.push(repRequest[i]);
              //   }
              // }
              // console.log(
              //   "rep array after filter for fu inventory keeper",
              //   temp
              // );
              setPurchaseRequest(repRequest.reverse());
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

  function getFUFromHeadId() {
    axios
      // .get(getFunctionalUnitFromHeadIdUrl + "/" + currentUser.staffId)
      .get(getFunctionalUnitUrl)

      .then((res) => {
        if (res.data.success) {
          console.log("FU Obj", res.data.data.functionalUnits);
          setFUObj(res.data.data.functionalUnits);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });

    // axios
    //   .get(getFunctionalUnitByIdUrl + "/" + props.match.params.fuName)
    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log("FU Obj", res.data.data);
    //       setFUObj(res.data.data);
    //     } else if (!res.data.success) {
    //       setErrorMsg(res.data.error);
    //       setOpenNotification(true);
    //     }
    //     return res;
    //   })
    //   .catch((e) => {
    //     console.log("error: ", e);
    //   });
  }

  function getReceiveRequestsForFU() {
    axios
      .get(getReceiveRequestFUUrl)
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

  function getReturnRequestsForFU() {
    axios
      .get(getInternalReturnRequestsFU)
      .then((res) => {
        if (res.data.success) {
          console.log("return requests", res.data.data);
          setReturnRequests(res.data.data);
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
    getReceiveRequestsForFU();
    getReturnRequestsForFU();

    if (
      currentUser.staffTypeId.type === "FU Inventory Keeper" ||
      currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ||
      currentUser.staffTypeId.type === "admin"
    ) {
      getFUFromHeadId();
    }
  }, []);

  const addNewItem = () => {
    let path = `replenishment/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, fuObj },
    });
  };

  if (
    props.history.location.pathname ===
      "/home/wms/fus/replenishment/add/manual" &&
    // items &&
    fuObj
    //  &&
    // statues &&
    // vendors
  ) {
    let path = `/home/wms/fus/replenishment/add`;

    props.history.replace({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, fuObj },
    });
  }

  function handleEdit(rec) {
    let path = `replenishment/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        items,
        fuObj,
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
    let path = `medicinalorder/edit`;
    // props.history.push({
    //   pathname: path,
    //   state: {
    //     comingFor: "view",
    //     selectedItem: obj,
    //     vendors,
    //     statues,
    //     items,
    //     buObj,
    //   },
    // });

    // if (currentUser.staffTypeId.type === "BU Member") {
    //   let repRequest = res.data.da;
    //   let temp = [];
    //   for (let i = 0; i < repRequest.length; i++) {
    //     if (repRequest[i].buId.buHead === currentUser.staffId) {
    //       temp.push(repRequest[i]);
    //     }
    //   }
    //   console.log("rep array after filter", temp);
    //   setPurchaseRequest(temp.reverse());
    // }

    // else {

    if (currentUser.staffTypeId.type === "BU Nurse") {
      let repRequest = obj.items;
      let temp = [];
      for (let i = 0; i < repRequest.length; i++) {
        if (
          repRequest[i].status === "Delivery in Progress" ||
          repRequest[i].status === "pending_administration" ||
          repRequest[i].status === "complete"
        ) {
          temp.push(repRequest[i]);
        }
      }

      console.log("rep array after filter", temp);
      setSelectedOrder(obj);
      setIsOpen(true);
      // map.temp((d) =>d.fuItemCost = d.fuItemCost  )
      setRequestedItems(temp);
    } else {
      setSelectedOrder(obj);
      setIsOpen(true);
      setRequestedItems(obj.items);
    }
    // }
  };

  function handleReceive(rec) {
    let objWithFUId = "";

    for (let i = 0; i < purchaseRequests.length; i++) {
      for (let j = 0; j < purchaseRequests[i].items.length; j++) {
        if (purchaseRequests[i].items[j]._id === rec._id) {
          objWithFUId = {
            ...rec,
            _id: purchaseRequests[i]._id,
            fuId: purchaseRequests[i].fuId,
            requestNo: selectedOrder.requestNo,
          };
        }
      }
    }

    console.log("receive item", objWithFUId);

    let found = false;
    for (let i = 0; i < receiveRequests.length; i++) {
      if (
        receiveRequests[i].replenishmentRequestId === objWithFUId._id &&
        receiveRequests[i].itemId === rec.itemId._id
      ) {
        console.log("found");
        found = true;
        break;
      }
    }
    if (found) {
      setIsOpen(false);
      setOpenNotification(true);
      setErrorMsg("Item has already been received");
    } else if (selectedOrder.status !== "Delivery in Progress") {
      setIsOpen(false);
      setOpenNotification(true);
      setErrorMsg(
        "Order delivery has not been initiated yet from the warehouse"
      );
    } else {
      let path = `receive/add`;

      props.history.push({
        pathname: path,
        state: {
          comingFor: "add",
          selectedItem: objWithFUId,
        },
      });
    }
  }

  function handleAddReturnRequest(rec) {
    console.log("return item", rec);
    setIsOpen(false);

    let objWithFUId = "";

    for (let i = 0; i < purchaseRequests.length; i++) {
      for (let j = 0; j < purchaseRequests[i].items.length; j++) {
        if (purchaseRequests[i].items[j]._id === rec._id) {
          objWithFUId = {
            ...rec,
            _id: purchaseRequests[i]._id,
            fuId: purchaseRequests[i].fuId,
          };
        }
      }
    }

    // console.log("rec", returnRequests);

    let alreadyReturned = false;
    let alreadyReceived = false;

    for (let i = 0; i < returnRequests.length; i++) {
      if (
        returnRequests[i].replenishmentRequestFU &&
        returnRequests[i].replenishmentRequestFU._id === objWithFUId._id &&
        returnRequests[i].itemId._id === objWithFUId.itemId._id
      ) {
        alreadyReturned = true;
        break;
      }
    }

    for (let i = 0; i < receiveRequests.length; i++) {
      if (
        receiveRequests[i].replenishmentRequestId === objWithFUId._id &&
        receiveRequests[i].itemId === objWithFUId.itemId._id
      ) {
        alreadyReceived = true;
        break;
      }
    }

    if (alreadyReturned) {
      setOpenNotification(true);
      setErrorMsg("Item has already been returned");
    }

    if (!alreadyReceived) {
      setOpenNotification(true);
      setErrorMsg("Item has not been received yet");
    } else if (alreadyReturned === false && alreadyReceived === true) {
      let path = `receive/returnitems`;
      props.history.push({
        pathname: path,
        state: {
          comingFor: "add",
          selectedItem: objWithFUId,
        },
      });
    }
  }

  function viewReturnRequests() {
    // console.log("rec", rec);
    let path = `/home/wms/fus/returnitems`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: fuObj,
      },
    });
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2500);
  }

  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getReplenishmentRequestUrlFUSearch + "/" + a)
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
    doc.text(65, 22, "Department Transactions Report");
    doc.setFontSize(12);
    doc.text(170, 14, "Amman Jordan");
    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 12, "F");
    // information of patient
    doc.setFontSize(10);
    doc.setFont("times", "normal");

    // doc.text(12, 50, "From");
    // doc.text(12, 55, "To");

    // doc.text(80, 50, "Department");
    // doc.text(80, 55, "Warehouse");
    doc.text(12, 50, "Doc No.");
    doc.text(12, 55, "Date");

    // dynamic data info patient
    doc.setFont("times", "bold");
    // doc.text(30, 50, currentUser.functionalUnit.fuName);
    // doc.text(30, 55, "Warehouse");
    // doc.text(100, 50, "HERE");
    // doc.text(100, 55, "HERE");
    doc.text(30, 50, selectedPRToPrint.requestNo);
    doc.text(30, 55, createdAt);
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
    doc.text(180, 270, "Inventory");
    doc.text(145, 275, "Date:");
    doc.text(155, 275, new Date().toLocaleString());

    doc.save(`${selectedPRToPrint.requestNo}.pdf`);
  };

  useEffect(() => {
    if (selectedPRToPrint) {
      handlePrint();
    }
  }, [selectedPRToPrint]);

  if (
    props.history.location.pathname === "/home/wms/fus/replenishment/add/manual"
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="LoaderStyle">
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
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
        }}
      >
        <Header history={props.history} />
        <div className="cPadding">
          <div className="subheader">
            {props.history.location.pathname === "/home/wms/fus/receive" ? (
              <div style={{ marginLeft: "-10px" }}>
                <img src={ReceiveItem} />
                <h4>Order Receiving / Return</h4>
              </div>
            ) : (
              <div>
                <img src={business_Unit} />
                <h4>Replenishment Requests</h4>
              </div>
            )}

            {/* {currentUser &&
          currentUser.staffTypeId.type === "FU Inventory Keeper" &&
          props.history.location.pathname !== "/home/wms/fus/receive" ? (
            <div>
              <Button
                onClick={addNewItem}
                style={stylesB.stylesForButton}
                variant="contained"
                color="primary"
              >
                <img className="icon-style" src={plus_icon} />
                &nbsp;&nbsp;
                <strong style={{ fontSize: "12px" }}>Add New</strong>
              </Button>
            </div>
          ) : (
            undefined
          )} */}
          </div>

          <div
            className={`row ${classesInput.root}`}
            style={{
              marginLeft: "0px",
              marginRight: "-5px",
              marginTop: "20px",
            }}
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
                label="Search By Replenishment request No"
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
                    tableDataKeys={
                      currentUser.staffTypeId.type === "FU Inventory Keeper"
                        ? tableDataKeysForFUHead
                        : tableDataKeys
                    }
                    tableHeading={
                      currentUser.staffTypeId.type === "FU Inventory Keeper"
                        ? tableHeadingForFUHead
                        : tableHeading
                    }
                    // action={
                    //   currentUser.staffTypeId.type === "FU Inventory Keeper"
                    //     ? actionsForFUInventoryKeeper
                    //     : currentUser.staffTypeId.type === "admin"
                    //     ? actionsForAdmin
                    //     : actions
                    // }

                    // action={
                    //   props.match.path === '/home/wms/fus/receive'
                    //     ? actionsForFUInventoryKeeper
                    //     : props.match.path === '/home/wms/fus/receive'
                    //     ? actionsForAdmin
                    //     : actions
                    // }

                    action={
                      currentUser.staffTypeId.type === "Warehouse Member"
                        ? actionsForWarehouseMember
                        : currentUser.staffTypeId.type ===
                          "Warehouse Inventory Keeper"
                        ? actionsForWarehouseMember
                        : currentUser.staffTypeId.type ===
                            "FU Inventory Keeper" &&
                          props.history.location.pathname ===
                            "/home/wms/fus/receive"
                        ? actionsForFUMemeberForReceive
                        : currentUser.staffTypeId.type ===
                            "FU Inventory Keeper" &&
                          props.history.location.pathname ===
                            "/home/wms/fus/replenishment"
                        ? actionsForFUMemeberForReplenishment
                        : actions
                    }
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    receiveItem={handleReceive}
                    handleView={handleView}
                    addReturnRequest={handleAddReturnRequest}
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
                      fontSize: 20,
                    }}
                  >
                    Opps...No Data Found
                  </h3>
                </div>
                <div className="col-1" style={{ marginTop: 45 }}>
                  {/* <img
                    onClick={() => props.history.goBack()}
                    src={Back_Arrow}
                    style={{
                      with: 45,
                      height: 35,
                      height: "auto",
                      cursor: "pointer",
                    }}
                  /> */}
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
              style={{ width: 40, height: 30, cursor: "pointer" }}
            />
          </div>
        </div>

        <Dialog
          aria-labelledby="form-dialog-title"
          open={isOpen}
          // maxWidth="xl"
          // fullWidth={true}
          fullScreen
          onBackdropClick={() => {
            setIsOpen(false);
          }}
        >
          <AppBar style={{ position: "relative", backgroundColor: "#31e2aa" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setIsOpen(false);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent style={{ backgroundColor: "#31e2aa" }}>
            <>
              <h5
                id="simple-dialog-title"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Added Items
              </h5>
              <CustomTable
                tableData={requestedItems}
                tableHeading={
                  currentUser.staffTypeId.type === "Warehouse Member"
                    ? tableHeadingForFUMemberForItems
                    : currentUser.staffTypeId.type ===
                      "Warehouse Inventory Keeper"
                    ? tableHeadingForFUMemberForItems
                    : // : currentUser.staffTypeId.type === "FU Inventory Keeper"
                    // ? tableHeadingForFUMemberForItems
                    currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                      props.history.location.pathname ===
                        "/home/wms/fus/replenishment"
                    ? tableHeadingForFUInventoryKeeperForItems
                    : currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                      props.history.location.pathname ===
                        "/home/wms/fus/receive"
                    ? tableHeadingForFUInventoryKeeperForItemsForReceive
                    : tableHeadingForFUMemberForItems
                }
                tableDataKeys={
                  currentUser.staffTypeId.type === "Warehouse Member"
                    ? tableDataKeysForItemsForWarehouseMember
                    : currentUser.staffTypeId.type ===
                      "Warehouse Inventory Keeper"
                    ? tableDataKeysForFUMemberForItems
                    : currentUser.staffTypeId.type === "FU Inventory Keeper"
                    ? tableDataKeysForFUMemberForItems
                    : currentUser.staffTypeId.type === "FU Inventory Keeper"
                    ? tableDataKeysForFUMemberForItems
                    : tableDataKeysForFUMemberForItems
                }
                action={
                  currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                  props.history.location.pathname === "/home/wms/fus/receive"
                    ? actionsForItemsForReceiver
                    : currentUser.staffTypeId.type ===
                      "Warehouse Inventory Keeper"
                    ? ""
                    : currentUser.staffTypeId.type === "FU Inventory Keeper" &&
                      props.history.location.pathname ===
                        "/home/wms/fus/replenishment"
                    ? ""
                    : currentUser.staffTypeId.type === "Warehouse Member"
                    ? ""
                    : actionsForItemsForOther
                }
                // handleEdit={handleEditRequestedItem}
                // handleDelete={handleDelete}
                receiveItem={handleReceive}
                // handleView={handleEditRequestedItem}
                borderBottomColor={"#60d69f"}
                borderBottomWidth={20}
                addReturnRequest={handleAddReturnRequest}
              />
            </>
          </DialogContent>
        </Dialog>

        <PrintTable selectedPRToPrint={selectedPRToPrint} />
      </div>
    );
  }
}
