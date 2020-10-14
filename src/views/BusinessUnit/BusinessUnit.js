/*eslint-disable*/
import React, { useState, useEffect } from "react";
// core components

import Button from "@material-ui/core/Button";
import Table from "../../components/Table/Table.js";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import {
  getBusinessUnitUrl,
  deleteBusinessUnitUrl,
  updateBusinessUnitUrl,
  getBusinessUnitUrlWithHead,
} from "../../public/endpoins";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/business_Unit.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";
import plus_icon from "../../assets/img/Plus.png";

import Active from "../../assets/img/Active.png";

import cookie from "react-cookies";
import BusinessUnit from "../../subRoutes/business_unit.js";

import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

import Loader from "react-loader-spinner";
import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import { useSwipeable, Swipeable } from "react-swipeable";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
};

const tableHeading = [
  "Business Unit Name",
  "Business Unit Head",
  "Status",
  "Division",
  "Actions",
];
const tableDataKeys = ["buName", ["buHead", "firstName"], "status", "division"];
const actions = { edit: true, active: true, view: false };

export default function Items(props) {
  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  const [businessUnits, setBusinessUnits] = useState("");
  const [divisions, setDivisions] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [buHeads, setBUHeads] = useState("");
  const [status, setStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function getBusinessUnits() {
    let url = "";
    if (currentUser.staffTypeId && currentUser.staffTypeId.type === "BU Head") {
      url = getBusinessUnitUrlWithHead + "/" + currentUser.staffId;
    } else {
      url = getBusinessUnitUrl;
    }
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setBusinessUnits(res.data.data.businessUnit);
          setBUHeads(res.data.data.buHeads);
          setStatus(res.data.data.statues);
          setDivisions(res.data.data.divisions);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch((e) => {
        console.log("error is ", e);
      });
  }

  useEffect(() => {
    // setCurrentUser();

    getBusinessUnits();
  }, []);

  const addNewItem = () => {
    let path = `bus/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        divisions,
        status,
        buHeads,
      },
    });
  };

  function handleEdit(rec) {
    let path = `bus/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        divisions,
        status,
        buHeads,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBusinessUnit() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(deleteBusinessUnitUrl + "/" + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
        return res;
      })
      .catch((e) => {
        console.log("error while deletion ", e);
      });
  }

  function handleStatus(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function activeBuReturn() {
    let t = businessUnits.filter((item) => {
      return item._id === deleteItem;
    });

    console.log(t[0]);

    const temp = t[0];

    const currentUser = cookie.load("current_user");

    const params = {
      _id: temp._id,
      buName: temp.buName,
      description: temp.description,
      buHead: temp.buHead,
      status: "active",
      updatedBy: currentUser.name,
      buLogsId: temp.buLogsId._id,
      reason: "",
    };

    axios
      .put(updateBusinessUnitUrl, params)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error while deletion ", e);
      });
  }

  function handleView(rec) {
    console.log(rec);
    let path = `buinventory`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "view",
        selectedItem: rec,
        businessUnits,
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
          <div style={{marginLeft: '-8px'}}>
            <img src={business_Unit} />
            <h4>Business Unit</h4>
          </div>

          <div>
            {currentUser.staffTypeId &&
            currentUser.staffTypeId.type !== "BU Head" ? (
              <Button
                onClick={addNewItem}
                style={styles.stylesForButton}
                variant="contained"
                color="primary"
              >
                <img src={plus_icon} className="icon-style" />
                &nbsp;&nbsp;
                <strong >Add New</strong>
              </Button>
            ) : (
              undefined
            )}
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
          <div>
            {businessUnits ? (
              <div>
                <Table
                  tableData={businessUnits}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  status={status}
                  buHeads={buHeads}
                  action={actions}
                  handleEdit={handleEdit}
                  handleStatus={handleStatus}
                  handleView={handleView}
                  borderBottomColor={"#60d69f"}
                  // borderBottomWidth={20}
                />

                <ConfirmationModal
                  modalVisible={modalVisible}
                  msg="Are you sure want to in active the record?"
                  hideconfirmationModal={() => setModalVisible(false)}
                  onConfirmDelete={() => activeBuReturn()}
                  setdeleteItem={() => setdeleteItem("")}
                />
                <div style={{ marginBottom: 20 }}>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back_Arrow}
                    style={{ width: 45, height: 35, cursor: "pointer" }}
                  />
                </div>
              </div>
            ) : (
              <div className="LoaderStyle">
                <Loader type="TailSpin" color="red" height={50} width={50} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
