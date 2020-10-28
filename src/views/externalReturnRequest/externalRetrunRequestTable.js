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
import business_Unit from "../../assets/img/Return Item.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import PrintTable from "./printExternalReturnRequest";

import LogoPatientSummaryInvoice from "../../assets/img/logoPatientSummaryInvoice.png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

const styles = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};

const useStylesForInput = makeStyles((theme) => ({
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:disabled": {
      color: "gray",
    },
  },
}));

const actions = { edit: true, view: true, print: true };
const actionsForFUInventoryKeeper = {
  edit: true,
  view: true,
};

export default function ReplenishmentRequest(props) {
  const classesInput = useStylesForInput();

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
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  const [selectedPRToPrint, setSelectedPRToPrint] = useState("");

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

  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, "");
    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getExternalReturnRequests + "/" + a)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data);
            if (res.data.data.length > 0) {
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
              setPurchaseRequest(temp.reverse());
            } else {
              console.log(res.data.data, "no-response");
              setPurchaseRequest([]);
            }
          }
        })
        .catch((e) => {
          console.log("error after searching patient request", e);
        });
    } else if (a.length == 0) {
      getPurchaseRequests();
    }
  };

  function handlePrintPR(selectedPr) {
    console.log(selectedPr);
    setSelectedPRToPrint(selectedPr);
  }

  const handlePrint = () => {
    let imgData = new Image();
    imgData.src = LogoPatientSummaryInvoice;

    var doc = new jsPDF();

    let date = new Date(selectedPRToPrint.createdAt);
    let month = date.getMonth() + 1;
    let createdAt = date.getDate() + " - " + month + " - " + date.getFullYear();

    doc.addImage(imgData, "JPG", 10, 10, 40, 20);

    // header
    doc.setFontSize(13);
    doc.text(60, 15, "Al-Khalidi Hospital & Medical Center");
    doc.text(77, 22, "Return To Vendor");
    doc.setFontSize(12);
    doc.text(170, 14, "Amman Jordan");
    // background coloring
    doc.setFillColor(255, 255, 200);
    doc.rect(10, 45, 190, 12, "F");
    // information of patient
    doc.setFontSize(10);
    doc.setFont("times", "normal");
    doc.text(12, 50, "From");
    doc.text(12, 55, "Supplier");
    // doc.text(80, 50, "Department");
    // doc.text(80, 55, "Warehouse");
    doc.text(135, 50, "Doc No.");
    doc.text(135, 55, "Date");
    // dynamic data info patient
    doc.setFont("times", "bold");
    doc.text(30, 50, "Warehouse");
    doc.text(30, 55, selectedPRToPrint.itemId.vendorId.englishName);
    // doc.text(100, 50, "HERE");
    // doc.text(100, 55, "HERE");
    doc.text(150, 50, selectedPRToPrint.returnRequestNo);
    doc.text(150, 55, createdAt);
    // table
    // footer

    doc.autoTable({
      margin: { top: 60, right: 3, left: 3 },
      tableWidth: "auto",
      headStyles: { fillColor: [44, 109, 221] },
      html: "#my_tableForPO",
    });

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(50, 250, "Received By");
    doc.line(50, 258, 90, 258);
    // doc.text(140, 250, "Section Head");
    // doc.line(140, 258, 165, 258);
    doc.setFont("times", "normal");
    doc.text(10, 270, "User name:");
    doc.text(35, 270, currentUser.name);
    doc.text(160, 270, "Module:");
    doc.text(180, 270, "Inventory");
    doc.text(140, 275, "Date:");
    doc.text(150, 275, new Date().toLocaleString());

    doc.save(`${selectedPRToPrint.returnRequestNo}.pdf`);
  };

  useEffect(() => {
    if (selectedPRToPrint) {
      handlePrint();
    }
  }, [selectedPRToPrint]);

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
      <Header history={props.history}/>
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
          className="row"
          style={{ marginLeft: "0px", marginRight: "0px", marginTop: "20px" }}
        >
          <div
            className="col-md-12 col-sm-9 col-8"
            style={styles.textFieldPadding}
          >
            <TextField
              className="textInputStyle"
              id="searchPatientQuery"
              type="text"
              variant="filled"
              label="Search By Return Request No"
              name={"searchPatientQuery"}
              value={searchPatientQuery}
              onChange={handlePatientSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
                className: classesInput.input,
                classes: { input: classesInput.input },
                disableUnderline: true,
              }}
            />
          </div>

          <div
            className="col-md-1 col-sm-2 col-2"
            style={{
              ...styles.textFieldPadding,
            }}
          ></div>

          <div
            className="col-md-1 col-sm-1 col-2"
            style={{
              ...styles.textFieldPadding,
            }}
          ></div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {purchaseRequests && purchaseRequests.length > 0 ? (
            <div>
              <div>
                <CustomTable
                  tableData={purchaseRequests}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  receiveItem={handleReceive}
                  handleView={handleView}
                  handlePrint={handlePrintPR}
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
          ) : purchaseRequests && purchaseRequests.length == 0 ? (
            <div className="row " style={{ marginTop: "25px" }}>
              <div className="col-11">
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className="col-1" style={{ marginTop: 45 }}>
                {/* <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer' }}
                /> */}
              </div>
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

        <PrintTable selectedPRToPrint={selectedPRToPrint} />
      </div>
    </div>
  );
}
