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

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import socketIOClient from "socket.io-client";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "115px",
    height: "40px",
    outline: "none",
  },
};

const tableHeading = [
  "Request No",
  "Date",
  "Generated",
  "Vendor",
  "Status",
  "Action",
];
const tableDataKeys = [
  "requestNo",
  "createdAt",
  "generated",
  ["vendorId", "englishName"],
  "status",
];

const tableHeadingForCommittee = [
  "Request No",
  "Date",
  "Generated",
  "Vendor",
  "Status",
  "Action",
];
const tableDataKeysForCommittee = [
  "requestNo",
  "createdAt",
  "generated",
  ["vendorId", "englishName"],
  "committeeStatus",
];

const actions = { edit: true, delete: false };

export default function PurchaseRequest(props) {
  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

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
    socket.on("get_data", (data) => {
      setPurchaseRequest(data.reverse());
      console.log("res after adding through socket", data);
    });

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
                <strong style={{ fontSize: "12px" }}>Add New</strong>
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
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {purchaseRequests ? (
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
          ) : (
            <div className="LoaderStyle">
              <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
