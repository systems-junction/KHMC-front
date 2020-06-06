/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getBuStockInLogUrl,
  deleteBuStockInLogUrl,
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/business_Unit.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

const useStyles = makeStyles(styles);

const tableHeading = [
  "Quantity",
  "Business Unit Price",
  "Sale Price",
  "Batch Number",
  "Action",
];
const tableDataKeys = ["qty", "buPrice", "salePrice", "batchNo"];
const actions = { edit: true, delete: true };

export default function BuReturn(props) {
  const classes = useStyles();
  const [items, setItems] = useState("");
  const [buStockInLog, setBuStockInLog] = useState("");
  const [staff, setStaff] = useState("");
  const [buRepRequest, setBuRepRequest] = useState("");
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

  function getBuStockInLog() {
    axios
      .get(getBuStockInLogUrl)
      .then((res) => {
        if (res.data.success) {
          setBuStockInLog(res.data.data.buStockInLog);
          setItems(res.data.data.items);
          setStaff(res.data.data.staff);
          setBuRepRequest(res.data.data.buRepRequest);
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
    getBuStockInLog();
  }, []);

  const addNewItem = () => {
    let path = `bustockinlog/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", items, staff, buRepRequest },
    });
  };

  function handleEdit(rec) {
    let path = `bustockinlog/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        items,
        staff,
        buRepRequest,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuReturn() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(deleteBuStockInLogUrl + "/" + params._id)
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
          <h4
            style={{ color: "white", fontFamily: "Ubuntu", fontWeight: "500" }}
          >
            BU Stock In Log
          </h4>
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
        {buStockInLog ? (
          <div>
         

            <div>
              <CustomTable
                tableData={buStockInLog}
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
              onConfirmDelete={() => deleteBuReturn()}
              setdeleteItem={() => setdeleteItem("")}
              borderBottomColor={"#60d69f"}
              borderBottomWidth={20}
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
