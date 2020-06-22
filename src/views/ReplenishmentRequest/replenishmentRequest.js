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
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
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
const actionsForFUInventoryKeeper = { receiveItem: true };

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

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getReplenishmentRequestUrlFU)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);

          if (currentUser.staffTypeId.type === "FU Member") {
            let repRequest = res.data.data;
            let temp = [];
            for (let i = 0; i < repRequest.length; i++) {
              if (repRequest[i].fuId.fuHead === currentUser.staffId) {
                temp.push(repRequest[i]);
              }
            }
            console.log("rep array after filter", temp);
            setPurchaseRequest(temp.reverse());
          } else {
            if (currentUser.staffTypeId.type === "Warehouse Incharge") {
              let repRequest = res.data.data;
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
              setPurchaseRequest(temp);
            } else if (currentUser.staffTypeId.type === "FU Inventory Keeper") {
              let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                if (
                  repRequest[i].status === "Delivery in Progress" ||
                  repRequest[i].status === "Received"
                ) {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp);
            } else {
              setPurchaseRequest(res.data.data);
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
  }

  useEffect(() => {
    getPurchaseRequests();

    if (currentUser.staffTypeId.type === "FU Member") {
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
    let path = `replenishment/receive`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: rec,
        // vendors,
        // statues,
        // purchaseOrders,
        // materialReceivingId: props.materialReceivingId,
      },
    });
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

          {currentUser && currentUser.staffTypeId.type === "FU Member" ? (
            <div>
              <img onClick={addNewItem} src={Add_New} />
              {/* <img src={Search} /> */}
            </div>
          ) : (
            undefined
          )}
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
                  action={
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? actionsForFUInventoryKeeper
                      : actions
                  }
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  receiveItem={handleReceive}
                  handleView={handleView}
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
