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

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

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

const actions = { view: true };
const actionsForFUMemeberForReceive = { edit: false, view: true };
const actionsForFUMemeberForReplenishment = { edit: true, view: true };

const actionsForWarehouseMember = { edit: true, view: true };
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
  "Functional Unit Item Cost",
  "Status",
  // "Actions",
];

const tableHeadingForFUInventoryKeeperForItems = [
  "Item Code",
  "Name",
  "Requested Qty",
  "Functional Unit Item Cost",
  "Status",
];

const tableHeadingForFUInventoryKeeperForItemsForReceive = [
  "Item Code",
  "Name",
  "Requested Qty",
  "Functional Unit Item Cost",
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
      currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
      <Header />
      <div className="cPadding">
        <div className="subheader">
          {props.history.location.pathname === "/home/wms/fus/receive" ? (
            <div>
              <img src={ReceiveItem} />
              <h4>Order Receiving / Return</h4>
            </div>
          ) : (
            <div>
              <img src={business_Unit} />
              <h4>Functional Unit Fulfillment</h4>
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
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {purchaseRequests ? (
            <div>
              <div>
                <CustomTable
                  tableData={purchaseRequests}
                  tableDataKeys={
                    currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? tableDataKeysForFUHead
                      : tableDataKeys
                  }
                  tableHeading={
                    currentUser.staffTypeId.type === "FU Inventory Keeper" ||
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
            style={{ width: 60, height: 40, cursor: "pointer" }}
          />
        </div>
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
                    props.history.location.pathname === "/home/wms/fus/receive"
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
