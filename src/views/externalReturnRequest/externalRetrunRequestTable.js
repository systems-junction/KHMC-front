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
  getExternalReturnRequestById,
  getExternalReturnRequests,
  getInternalReturnRequestsBU,
  deleteExternalReturnRequest,
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/business_Unit.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const tableHeadingForFUHead = [
  "Return Request No",
  "Item Code",
  "Item Name",
  "Generated",
  "Reason",
  "Status",
  "Actions",
];
const tableDataKeysForFUHead = [
  "returnRequestNo",
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "generated",
  "reasonToDisplay",
  "status",
];

const tableHeading = [
  "Return Request No",
  "Item Code",
  "Item Name",
  "Generated",
  "Reason",
  "Status",
  "Actions",
];
const tableDataKeys = [
  "returnRequestNo",
  ["itemId", "itemCode"],
  ["itemId", "name"],
  "generated",
  "reasonToDisplay",
  "status",
];

const actions = { edit: true, view: true };
const actionsForFUInventoryKeeper = {
  edit: true,
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

  function mapReasonKeyToValue(r) {
    if (r === "expired") {
      return "Expired";
    } else if (r === "poorQuality") {
      return "Poor Quality";
    } else if (r === "others") {
      return "Others";
    } else if (r === "rejected") {
      return "Rejected from Accounts";
    }
  }

  function getPurchaseRequests() {
    axios
      .get(
        getExternalReturnRequests
        //  +
        //   "/" +
        //   props.history.location.state.selectedItem
      )
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          let returnRequests = res.data.data;

          let temp = [];
          for (let i = 0; i < returnRequests.length; i++) {
            let r = mapReasonKeyToValue(returnRequests[i].reason);
            let obj = {
              ...returnRequests[i],
              reasonToDisplay: r,
            };
            temp.push(obj);
          }

          console.log("temp", temp);

          setPurchaseRequest(temp.reverse());
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
    let path = `externalreturn/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, fuObj },
    });
  };

  function handleEdit(rec) {
    let path = `externalreturn/edit`;
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

    let path = `externalreturn/edit`;
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
    let path = `replenishment/receive`;
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
            <h4>External Return Requests</h4>
          </div>

          {/* {currentUser && currentUser.staffTypeId.type === "admin" ? (
            <div>
              <img onClick={addNewItem} src={Add_New} />
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
                  // tableDataKeys={
                  //   currentUser.staffTypeId.type ===
                  //     "FU Internal Request Return Approval Member" ||
                  //   currentUser.staffTypeId.type === "admin"
                  //     ? tableDataKeysForFUHead
                  //     : tableDataKeys
                  // }

                  tableDataKeys={tableDataKeys}
                  // tableHeading={
                  //   currentUser.staffTypeId.type ===
                  //     "FU Internal Request Return Approval Member" ||
                  //   currentUser.staffTypeId.type === "admin"
                  //     ? tableHeadingForFUHead
                  //     : tableHeading
                  // }
                  tableHeading={tableHeading}
                  // action={
                  //   currentUser.staffTypeId.type === "admin" ||
                  //   currentUser.staffTypeId.type ===
                  //     "FU Internal Request Return Approval Member"
                  //     ? actionsForFUInventoryKeeper
                  //     : actions
                  // }
                  action={actions}
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
