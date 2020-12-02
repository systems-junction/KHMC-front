/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import { getPatientClearanceURL } from "../../public/endpoins";

import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/Medication Order.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import { makeStyles } from "@material-ui/core/styles";

import add_new from "../../assets/img/Plus.png";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "60%",
    height: "50px",
    outline: "none",
  },
};
const useStyles = makeStyles(styles);

const tableHeadingForBUMember = [
  "Request No",
  "Patient MRN",
  "Date Generated",
  "Total (JD)",
  "Actions",
];
const tableDataKeysForBUMember = [
  "clearanceNo",
  ["patientId", "profileNo"],
  "createdAt",
  "total",
];

const actions = { edit: true };

export default function ReplenishmentRequest(props) {
  const classes = useStyles();

  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [buObj, setBUObj] = useState("");
  const [receiveRequests, setReceiveRequests] = useState("");

  const [requestedItems, setRequestedItems] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [actionsForTesting, setActions] = useState({
    edit: false,
    delete: false,
    view: false,
  });

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getPatientClearanceURL)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setPurchaseRequest(res.data.data.reverse());
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
    // setOptions();

    getPurchaseRequests();
  }, []);

  const addNewItem = () => {
    let path = `medicinalorder/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, buObj },
    });
  };

  function handleEdit(rec) {
    let path = `edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        items,
        buObj,
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

  const handleView = (obj) => {
    let path = `/home/wms/fus/medicinalorder/edit`;
    // props.history.push({
    //   pathname: path,
    //   state: {
    //     comingFor: "view",
    //     selectedItem: obj,
    //     vendors,
    //     statues,
    //     items,
    //     buObj,
    //   },
    // });

    // if (currentUser.staffTypeId.type === "Doctor/Physician") {
    //   let repRequest = res.data.da;
    //   let temp = [];
    //   for (let i = 0; i < repRequest.length; i++) {
    //     if (repRequest[i].buId.buHead === currentUser.staffId) {
    //       temp.push(repRequest[i]);
    //     }
    //   }
    //   console.log("rep array after filter", temp);
    //   setPurchaseRequest(temp.reverse());
    // }

    // else {

    if (currentUser.staffTypeId.type === "Registered Nurse") {
      let repRequest = obj.item;
      let temp = [];
      for (let i = 0; i < repRequest.length; i++) {
        if (
          repRequest[i].status === "Delivery in Progress" ||
          repRequest[i].status === "pending_administration" ||
          repRequest[i].status === "Received" ||
          repRequest[i].status === "Partially Received"
        ) {
          temp.push(repRequest[i]);
        }
      }
      console.log("rep array after filter", temp);

      if (temp.length === 0) {
        setOpenNotification(true);
        setErrorMsg("Order is still pending from the pharmacy/sub store.");
      } else {
        setSelectedOrder(obj);
        setIsOpen(true);
        setRequestedItems(temp);
      }
    } else {
      setSelectedOrder(obj);
      setIsOpen(true);
      setRequestedItems(obj.item);
    }
    // }
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
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Cleared Patients</h4>
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
              <div>
                <CustomTable
                  tableData={purchaseRequests}
                  action={actions}
                  tableDataKeys={tableDataKeysForBUMember}
                  tableHeading={tableHeadingForBUMember}
                  // action={actionsForTesting}
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
            <div className="LoaderStyle">
              <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back_Arrow}
            style={{ width: 40, height: 30, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
