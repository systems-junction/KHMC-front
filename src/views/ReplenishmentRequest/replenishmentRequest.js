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
  getReplenishmentRequestUrl,
  deleteReplenishmentRequestUrl,
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

const dummyData = [
  {
    replenishmentRequestNo: 123,
    generated: "System",
    date: "20/10/2005",
    status: "Pending",
  },
];

const tableHeading = [
  "Replenishment Request No",
  "Generated",
  "Date/Time Generated",
  "Status",
  "Actions",
];
const tableDataKeys = ["requestNo", "generated", "dateGenerated", "status"];

const actions = { edit: true, view: true };

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

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getReplenishmentRequestUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setPurchaseRequest(res.data.data);
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

  useEffect(() => {
    getPurchaseRequests();
  }, []);

  const addNewItem = () => {
    let path = `replenishment/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items },
    });
  };

  function handleEdit(rec) {
    let path = `replenishment/edit`;
    props.history.push({
      pathname: path,
      state: { comingFor: "edit", selectedItem: rec, vendors, statues, items },
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

          {currentUser && currentUser.staffTypeId.type !== "Warehouse Member" ? (
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
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
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
