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
  getReplenishmentRequestUrlBU,
  deleteReplenishmentRequestUrl,
  getFunctionalUnitFromHeadIdUrl,
  getBusinessUnitUrlWithHead,
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

const tableHeadingForBUMember = [
  "Rep Request No",
  "Item Code",
  "Item Type",
  "Requested Qty",
  "Status",
  "Actions",
];
const tableDataKeysForBUMember = [
  "requestNo",
  ["itemId", "itemCode"],
  ["itemId", "cls"],
  "requestedQty",
  "status",
];

const tableHeadingForDoctorAndNursing = [
  "Rep Request No",
  "Item Name",
  "Item Type",
  "Functional Unit",
  "Status",
  "Actions",
];
const tableDataKeysForDoctorAndNursing = [
  "requestNo",
  ["itemId", "name"],
  ["itemId", "cls"],
  ["fuId", "fuName"],
  "status",
];

const tableHeadingForFUMember = [
  "Rep Request No",
  "Item Code",
  "Item Type",
  "Date/Time Generated",
  "Status",
  "Actions",
];
const tableDataKeysForFUMember = [
  "requestNo",
  ["itemId", "itemCode"],
  ["itemId", "cls"],
  "dateGenerated",
  "secondStatus",
];

const actions = { edit: true, view: true };
const actionsForBUNurse = { receiveItem: true };
const actionsForBUDoctor = { view: true };

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
  const [buObj, setBUObj] = useState("");

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getReplenishmentRequestUrlBU)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);

          if (currentUser.staffTypeId.type === "BU Member") {
            let repRequest = res.data.data;
            let temp = [];
            for (let i = 0; i < repRequest.length; i++) {
              if (repRequest[i].buId.buHead === currentUser.staffId) {
                temp.push(repRequest[i]);
              }
            }
            console.log("rep array after filter", temp);
            setPurchaseRequest(temp.reverse());
          } else {
            if (currentUser.staffTypeId.type === "FU Member") {
              let repRequest = res.data.data;
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
              let repRequest = res.data.data;
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
            } else if (currentUser.staffTypeId.type === "BU Nurse") {
              let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "Delivery in Progress" ||
                //   repRequest[i].status === "pending_administration"
                // )
                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else if (currentUser.staffTypeId.type === "BU Inventory Keeper") {
              let repRequest = res.data.data;
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
              setPurchaseRequest(res.data.data.reverse());
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
      .get(getBusinessUnitUrlWithHead + "/" + currentUser.staffId)
      .then((res) => {
        if (res.data.success) {
          console.log("BU Obj", res.data.data[0]);
          setBUObj(res.data.data[0]);
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

    if (currentUser.staffTypeId.type === "BU Member") {
      getBUFromHeadId();
    }
  }, []);

  const addNewItem = () => {
    let path = `replenishment/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, buObj },
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
    let path = `replenishment/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "view",
        selectedItem: obj,
        vendors,
        statues,
        items,
        buObj,
      },
    });
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
            <h4>Replenishment Request for BU</h4>
          </div>

          {currentUser && currentUser.staffTypeId.type === "BU Member" ? (
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
                    currentUser.staffTypeId.type === "BU Member"
                      ? tableDataKeysForBUMember
                      : currentUser.staffTypeId.type === "BU Nurse" ||
                        currentUser.staffTypeId.type === "BU Doctor"
                      ? tableDataKeysForDoctorAndNursing
                      : currentUser.staffTypeId.type === "FU Member"
                      ? tableDataKeysForFUMember
                      : tableDataKeysForBUMember
                  }
                  tableHeading={
                    currentUser.staffTypeId.type === "BU Member"
                      ? tableHeadingForBUMember
                      : currentUser.staffTypeId.type === "BU Nurse" ||
                        currentUser.staffTypeId.type === "BU Doctor"
                      ? tableHeadingForDoctorAndNursing
                      : currentUser.staffTypeId.type === "FU Member"
                      ? tableHeadingForFUMember
                      : tableHeadingForBUMember
                  }
                  action={
                    currentUser.staffTypeId.type === "BU Nurse"
                      ? actionsForBUNurse
                      : currentUser.staffTypeId.type === "BU Doctor"
                      ? actionsForBUDoctor
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
