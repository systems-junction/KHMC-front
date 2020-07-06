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
  getWhInventoryUrl,
  deleteWhInventoryUrl,
  getItemsUrl,
} from "../../public/endpoins";
import Back_Arrow from "../../assets/img/Back_Arrow.png";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import wh_inventory from "../../assets/img/WH Inventory.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const useStyles = makeStyles(styles);

const tableHeading = ["Item Name", "Quantity", "Action"];
const tableDataKeys = [["itemId", "name"], "qty"];
const actions = { edit: true, delete: true };


export default function WareHouseInventory(props) {
  const classes = useStyles();
  const [whInventory, setWHInventory] = useState("");
  const [items, setItems] = useState("");
  const [staff, setStaff] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
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

  function getFunctionalUnit() {
    axios
      .get(getWhInventoryUrl)
      .then((res) => {
        if (res.data.success) {
          setWHInventory(res.data.data);
          // setItems(res.data.data.items);
          // setStaff(res.data.data.staff);
          // setBusinessUnit(res.data.data.businessUnit);
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

  function getItems() {
    axios
      .get(getItemsUrl)
      .then((res) => {
        if (res.data.success) {
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
    getFunctionalUnit();
    getItems();
  }, []);

  const addNewItem = () => {
    let path = `warehouseinventory/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", items, staff, businessUnit },
    });
  };

  function handleEdit(rec) {
    let path = `warehouseinventory/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        items,
        staff,
        businessUnit,
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
      .delete(deleteWhInventoryUrl + "/" + params._id)
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
        width: "100%",
        position: "fixed",
        height: "100%",
        backgroundColor: "#60d69f",
        overflowY:"scroll"
      }}
    >
      <Header />

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={wh_inventory} />
            <h4>WareHouse Inventory</h4>
          </div>

          <div>
            <img onClick={addNewItem} src={Add_New} />
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {whInventory ? (
            <div>
              <div>
                <CustomTable
                  tableData={whInventory}
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
