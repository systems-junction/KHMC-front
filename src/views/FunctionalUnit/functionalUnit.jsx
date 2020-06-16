/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import { ToastsStore } from "react-toasts";
import {
  getFunctionalUnitUrl,
  updateFunctionalUnitUrl,
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import functional_Unit from "../../assets/img/Functional Unit.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const useStyles = makeStyles(styles);

const tableHeading = [
  "Functional Unit Name",
  "FU Head",
  "Business Unit",
  "Status",
  "Action",
];
const tableDataKeys = [
  "fuName",
  ["fuHead", "firstName"],
  ["buId", "buName"],
  "status",
];
const actions = { edit: true, active: true };

export default function FunctionalUnit(props) {
  const classes = useStyles();
  const [functionalUnits, setFunctionalUnits] = useState("");
  const [businessUnits, setBusinessUnits] = useState("");
  const [staff, setStaff] = useState("");
  const [statues, setStatues] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function getFunctionalUnit() {
    axios
      .get(getFunctionalUnitUrl)
      .then((res) => {
        if (res.data.success) {
          setFunctionalUnits(res.data.data.functionalUnits);
          setBusinessUnits(res.data.data.businessUnit);
          setStaff(res.data.data.staff);
          setStatues(res.data.data.statues);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  useEffect(() => {
    getFunctionalUnit();
  }, []);

  const addNewItem = () => {
    let path = `fus/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        statues,
        staff,
        businessUnits,
      },
    });
  };

  function handleEdit(rec) {
    let path = `fus/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        statues,
        staff,
        businessUnits,
      },
    });
  }

  function handleStatus(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteBuReturn() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(updateFunctionalUnitUrl + "/" + params._id)
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

  function activeBuReturn() {
    let t = functionalUnits.filter((item) => {
      return item._id === deleteItem;
    });

    const temp = t[0];
    const currentUser = cookie.load("current_user");

    const params = {
      _id: temp._id,
      fuName: temp.fuName,
      description: temp.description,
      fuHead: temp.fuHead,
      buId: temp.buId,
      status: "active",
      reason: "",
      updatedBy: currentUser.name,
      fuLogId: temp.fuLogId._id,
    };
    axios
      .put(updateFunctionalUnitUrl, params)
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
            <img src={functional_Unit} />
            <h4>Functional Unit</h4>
          </div>

          <div>
            <Button
              onClick={() =>
                props.history.push("/home/controlroom/fuinventory")
              }
              color={"primary"}
              variant="outlined"
            >
              View Inventory
            </Button>
          </div>

          <div>
            <img
              onClick={addNewItem}
              src={Add_New}
              style={{ maxWidth: "60%", height: "auto" }}
            />
            <img src={Search} style={{ width: "35%", height: "auto" }} />
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {functionalUnits ? (
            <div>
              <CustomTable
                tableData={functionalUnits}
                tableDataKeys={tableDataKeys}
                tableHeading={tableHeading}
                action={actions}
                handleEdit={handleEdit}
                handleStatus={handleStatus}
                borderBottomColor={"#60d69f"}
                borderBottomWidth={20}
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
                  style={{ width: 60, height: 40, cursor: "pointer" }}
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
  );
}
