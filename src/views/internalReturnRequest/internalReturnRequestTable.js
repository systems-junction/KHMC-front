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
  getInternalReturnRequestById,
  getInternalReturnRequestsFU,
  getInternalReturnRequestsBU,
  deleteReplenishmentRequestUrl,
  getFunctionalUnitFromHeadIdUrl,
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/Return Item.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const tableHeadingForFUHead = [
  "Return Request No",
  "Functional Unit Name",
  "Date Generated",
  "Item Code",
  "Item Name",
  "Reason",
  "Status",
  "Actions",
];

const tableHeadingForWareHouseMembers = [
  "Return Request No",
  "Functional Unit Name",
  "Date Generated",
  "Item Code",
  "Item Name",
  "Reason",
  "Status",
  "Actions",
];

const tableDataKeysForWareHouseMembers = [
  "returnRequestNo",
  ["fuId", "fuName"],
  "dateGenerated",
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "reason",
  "status",
];

const tableDataKeysForFUHead = [
  "returnRequestNo",
  ["fuId", "fuName"],
  "dateGenerated",
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "reason",
  "status",
];

const tableHeading = [
  "Return Request No",
  "Functional Unit Name",
  "Date Generated",
  "Item Code",
  "Item Name",
  "Reason",
  "Status",
  "Actions",
];
const tableDataKeys = [
  "returnRequestNo",
  ["fuId", "fuName"],
  "dateGenerated",
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "reason",
  "status",
];

const actions = { edit: true, view: true };
const actionsForFUInventoryKeeper = {
  edit: true,
  view: true,
};

const actionsForWareHouseMembers = {
  view: true,
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

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(
        getInternalReturnRequestsFU
        //  +
        //   "/" +
        //   props.history.location.state.selectedItem
      )
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);

          //   if (currentUser.staffTypeId.type === "FU Member") {
          //     let repRequest = res.data.data;
          //     let temp = [];
          //     for (let i = 0; i < repRequest.length; i++) {
          //       if (repRequest[i].fuId.fuHead === currentUser.staffId) {
          //         temp.push(repRequest[i]);
          //       }
          //     }
          //     console.log("rep array after filter", temp);
          setPurchaseRequest(res.data.data.reverse());
          //   }
          //   else {
          //     if (currentUser.staffTypeId.type === "Warehouse Incharge") {
          //       let repRequest = res.data.data;
          //       let temp = [];
          //       for (let i = 0; i < repRequest.length; i++) {
          //         if (
          //           repRequest[i].status === "Fulfillment Initiated" ||
          //           repRequest[i].status === "Delivery in Progress" ||
          //           repRequest[i].status === "Received"
          //         ) {
          //           temp.push(repRequest[i]);
          //         }
          //       }
          //       // console.log("rep array after filter", temp);
          //       setPurchaseRequest(temp.reverse());
          //     } else if (currentUser.staffTypeId.type === "FU Inventory Keeper") {
          //       let repRequest = res.data.data;
          //       let temp = [];
          //       for (let i = 0; i < repRequest.length; i++) {
          //         if (
          //           repRequest[i].status === "Delivery in Progress" ||
          //           repRequest[i].status === "Received"
          //         ) {
          //           temp.push(repRequest[i]);
          //         }
          //       }
          //       // console.log("rep array after filter", temp);
          //       setPurchaseRequest(temp.reverse());
          //     } else {
          //       setPurchaseRequest(res.data.data.reverse());
          //     }
          //   }
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

  //   function getFUFromHeadId() {
  //     axios
  //       .get(getFunctionalUnitFromHeadIdUrl + "/" + currentUser.staffId)
  //       .then((res) => {
  //         if (res.data.success) {
  //           console.log("FU Obj", res.data.data[0]);
  //           setFUObj(res.data.data[0]);
  //         } else if (!res.data.success) {
  //           setErrorMsg(res.data.error);
  //           setOpenNotification(true);
  //         }
  //         return res;
  //       })
  //       .catch((e) => {
  //         console.log("error: ", e);
  //       });
  //   }

  useEffect(() => {
    getPurchaseRequests();

    // if (currentUser.staffTypeId.type === "FU Member") {
    //   getFUFromHeadId();
    // }
  }, []);

  const addNewItem = () => {
    let path = `replenishment/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, fuObj },
    });
  };

  function handleEdit(rec) {
    let path = `returnitems/edit`;
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

  const handleView = (rec) => {
    console.log("item clicked", rec);

    let path = `returnitems/view`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "view",
        selectedItem: rec,
      },
    });
  };

  function handleReceive(rec) {
    console.log("rec", rec);
    let path = `returnitems/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: rec,
      },
    });
  }

  function handleAddReturnRequest(rec) {
    console.log("rec", rec);
    let path = `replenishment/returnitems`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: rec,
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
            <h4>Return Requests</h4>
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
                    currentUser.staffTypeId.type ===
                      "FU Internal Request Return Approval Member" ||
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? tableDataKeysForFUHead
                      : currentUser.staffTypeId.type === "Warehouse Member"
                      ? tableDataKeysForWareHouseMembers
                      : tableDataKeys
                  }
                  tableHeading={
                    currentUser.staffTypeId.type ===
                      "FU Internal Request Return Approval Member" ||
                    currentUser.staffTypeId.type === "FU Inventory Keeper"
                      ? tableHeadingForFUHead
                      : currentUser.staffTypeId.type === "Warehouse Member"
                      ? tableHeadingForWareHouseMembers
                      : tableHeading
                  }
                  action={
                    currentUser.staffTypeId.type === "FU Inventory Keeper" ||
                    currentUser.staffTypeId.type ===
                      "FU Internal Request Return Approval Member"
                      ? actionsForFUInventoryKeeper
                      : currentUser.staffTypeId.type === "Warehouse Member"
                      ? actionsForWareHouseMembers
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
