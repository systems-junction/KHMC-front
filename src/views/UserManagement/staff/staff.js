/*eslint-disable*/
import React, { useState, useEffect } from "react";
import "./staff.css";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../../components/Table/Table";
import ConfirmationModal from "../../../components/Modal/confirmationModal";
import axios from "axios";
import { getStaffUrl, deleteStaffUrl } from "../../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../../components/Header/Header";

import Add_New from "../../../assets/img/Add_New.png";
import business_Unit from "../../../assets/img/Staff.png";
import plus_icon from "../../../assets/img/Plus.png";
import Search from "../../../assets/img/Search.png";
import Control_Room from "../../../assets/img/Control_Room.png";

import Edit from "../../../assets/img/Edit.png";

import Inactive from "../../../assets/img/Inactive.png";

import Active from "../../../assets/img/Active.png";
import Back from "../../../assets/img/Back_Arrow.png";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";

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
  "ID No",
  "First Name",
  "Last Name",
  "Designation",
  // "Contact No",
  "Email",
  // "Gender",
  // "Address",
  "Functional Unit",
  "Actions",
];
const tableDataKeys = [
  "identificationNumber",

  "firstName",
  "lastName",
  "designation",
  // "contactNumber",
  "email",
  ["functionalUnit", "fuName"],
  // "gender",
  // "address",
];

const actions = { edit: true, delete: true };

export default function Staff(props) {
  const [staff, setStaff] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [systemAdminArray, setSystemAdminArray] = useState("");
  const [staffTypeArray, setStaffTypesArray] = useState("");
  const [functinalUnits, setFUs] = useState("");

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getStaffTypes() {
    axios
      .get(getStaffUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setStaff(res.data.data.staff.reverse());
          setSystemAdminArray(res.data.data.systemAdmin);
          setStaffTypesArray(res.data.data.staffType);
          setFUs(res.data.data.func);
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
    getStaffTypes();
  }, []);

  const addNewItem = () => {
    let path = `staff/add`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        systemAdminArray,
        staffTypeArray,
        functinalUnits,
      },
    });
  };

  function handleEdit(rec) {
    let path = `staff/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        systemAdminArray,
        staffTypeArray,
        functinalUnits,
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
      .delete(deleteStaffUrl + "/" + deleteItem._id)
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
      {/* <div
        style={{ alignItems: "center",  display: "flex", marginTop: 5 }}
      > */}
      <Header />
      {/* </div> */}
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Staff</h4>
          </div>
          <div>
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
            {/* <img src={Search} className="img-style" /> */}
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {staff ? (
            <div className="container-fluid">
              <div className="row">
                <CustomTable
                  tableData={staff}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />

                <Notification msg={errorMsg} open={openNotification} />
              </div>
            </div>
          ) : (
            <div className="LoaderStyle">
              <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
          )}
          <ConfirmationModal
            modalVisible={modalVisible}
            msg="Are you sure want to delete the record?"
            hideconfirmationModal={() => setModalVisible(false)}
            onConfirmDelete={() => deleteVendor()}
            setdeleteItem={() => setdeleteItem("")}
          />
          <div className="container-fluid">
            <div className="row" style={{ marginBottom: 20 }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
