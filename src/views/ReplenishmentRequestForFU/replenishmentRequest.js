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
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import view_all from "../../assets/img/view_all.png";

import business_Unit from "../../assets/img/business_Unit.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const tableHeadingForFUHead = [
  "Rep Request No",
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
  "Rep Request No",
  "Generated",
  "Date/Time Generated",
  "FU Name",
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

const actions = { edit: true };
const actionsForFUInventoryKeeper = {
  receiveItem: true,
  returnRequest: true,
};

const actionsForAdmin = {
  receiveItem: true,
  returnRequest: true,
  edit: true,
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

          if (currentUser.staffTypeId.type === "FU Member") {
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
            if (currentUser.staffTypeId.type === "Warehouse Incharge") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                if (
                  repRequest[i].status === "Fulfillment Initiated" ||
                  repRequest[i].status === "Delivery in Progress" ||
                  repRequest[i].status === "Received"
                ) {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else if (currentUser.staffTypeId.type === "FU Inventory Keeper") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                if (
                  repRequest[i].status === "Delivery in Progress" ||
                  repRequest[i].status === "Received" ||
                  repRequest[i].status === "Returned because of Issue" ||
                  repRequest[i].status === "Partially Received"
                ) {
                  temp.push(repRequest[i]);
                }
              }
              console.log(
                "rep array after filter for fu inventory keeper",
                temp
              );
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

  function getFUFromHeadId() {
    axios
      .get(getFunctionalUnitFromHeadIdUrl + "/" + currentUser.staffId)
      .then((res) => {
        if (res.data.success) {
          console.log("FU Obj", res.data.data[0]);
          setFUObj(res.data.data[0]);
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
      currentUser.staffTypeId.type === "FU Member" ||
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
    console.log("item clicked", obj);
  };

  function handleReceive(rec) {
    console.log("rec", rec);

    let found = false;
    for (let i = 0; i < receiveRequests.length; i++) {
      if (receiveRequests[i].replenishmentRequestId === rec._id) {
        console.log("found");
        found = true;
        break;
      }
    }
    if (found) {
      setOpenNotification(true);
      setErrorMsg("Item has already been received");
    } else {
      let path = `receive/add`;
      props.history.push({
        pathname: path,
        state: {
          comingFor: "add",
          selectedItem: rec,
        },
      });
    }
  }

  function handleAddReturnRequest(rec) {
    console.log("rec", rec);

    // console.log("rec", returnRequests);

    let alreadyReturned = false;
    let alreadyReceived = false;

    for (let i = 0; i < returnRequests.length; i++) {
      if (
        returnRequests[i].replenishmentRequestFU &&
        returnRequests[i].replenishmentRequestFU._id === rec._id
      ) {
        alreadyReturned = true;
        break;
      }
    }

    for (let i = 0; i < receiveRequests.length; i++) {
      if (receiveRequests[i].replenishmentRequestId === rec._id) {
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
          selectedItem: rec,
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
          <div>
            <img src={business_Unit} />
            <h4>Replenishment Request</h4>
          </div>

          {currentUser &&
          (currentUser.staffTypeId.type === "FU Member" ||
            currentUser.staffTypeId.type === "admin") ? (
            <div>
              <img onClick={addNewItem} src={Add_New} />
              {/* <img src={Search} /> */}
            </div>
          ) : (
            undefined
          )}

          {/* {currentUser &&
          currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
            <div>
              <img onClick={() => viewReturnRequests()} src={view_all} />
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
                    currentUser.staffTypeId.type === "FU Member" ||
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? tableDataKeysForFUHead
                      : tableDataKeys
                  }
                  tableHeading={
                    currentUser.staffTypeId.type === "FU Member" ||
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

                  action={
                    props.match.path === "/home/wms/fus/receive"
                      ? actionsForFUInventoryKeeper
                      : props.match.path === "/home/wms/fus/receive"
                      ? actionsForAdmin
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
    </div>
  );
}
