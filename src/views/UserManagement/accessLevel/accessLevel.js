/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../../components/Table/Table";
import ConfirmationModal from "../../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getAccessLevelUrl,
  deleteAccessLevelUrl,
} from "../../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../../components/Header/Header";

import Add_New from "../../../assets/img/Add_New.png";
import business_Unit from "../../../assets/img/business_Unit.png";

import Search from "../../../assets/img/Search.png";
import Control_Room from "../../../assets/img/Control_Room.png";

import Edit from "../../../assets/img/Edit.png";

import Inactive from "../../../assets/img/Inactive.png";

import Active from "../../../assets/img/Active.png";

const tableHeading = [
  "Name",
  "Read Access",
  "Write Access",
  "Update Access",
  "Delete Access",
  "Created By",
  "Actions",
];
const tableDataKeys = [
  "name",
  "read",
  "write",
  "update",
  "del",
  ["systemAdminId", "username"],
];

const actions = { edit: true, delete: true };

export default function AccessLevel(props) {
  const [accessLevel, setAccessLevel] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [systemAdminArray, setSystemAdminArray] = useState("");
  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getAccessLevel() {
    axios
      .get(getAccessLevelUrl)
      .then((res) => {
        if (res.data.success) {
          setAccessLevel(res.data.data.accessLevel);
          setSystemAdminArray(res.data.data.systemAdmin);
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
    getAccessLevel();
  }, []);

  const addNewItem = () => {
    let path = `accesslevel/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", systemAdminArray },
    });
  };

  function handleEdit(rec) {
    let path = `accesslevel/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        systemAdminArray,
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
      .delete(deleteAccessLevelUrl + "/" + params._id)
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
      <div
        style={{ alignItems: "center", flex: 1, display: "flex", marginTop: 5 }}
      >
        <Header />
      </div>

      <div style={{ alignItems: "center", flex: 0.5, display: "flex" }}>
        <div
          style={{
            flex: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={business_Unit}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
          <h4 style={{ color: "white", fontWeight: "700" }}>Access Level</h4>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1.5,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1.5, display: "flex" }}>
            <img
              onClick={addNewItem}
              src={Add_New}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            />
          </div>

          <div style={{ flex: 1, display: "flex" }}>
            <img src={Search} style={{ width: "60%", height: "60%" }} />
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 4,
          display: "flex",
          flexDirection: "column",
          marginLeft: "3%",
          marginRight: "3%",
        }}
      >
        {accessLevel ? (
          <div>
            <div>
              <CustomTable
                tableData={accessLevel}
                tableDataKeys={tableDataKeys}
                tableHeading={tableHeading}
                action={actions}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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
          <div
            style={{
              width: "70%",
              height: "100%",
              position: "fixed",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
        )}
      </div>
    </div>
  );
}
