/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getMaterialReceivingUrl,
  deleteMaterialReceivingUrl,
  socketUrl,
  getMaterialReceivingUrlSearch,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";
import Back from "../../assets/img/Back_Arrow.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/Receive Item.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from "@material-ui/core/styles";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import AddedPurchaseRequestTable from "../PurchaseOrders/addedPurchaseRequestTable";

import socketIOClient from "socket.io-client";

const tableHeading = [
  "Purchase Orders",
  "Vendor",
  "PO Sent Date",
  "Status",
  "Action",
];
const tableDataKeys = [
  ["poId", "purchaseOrderNo"],
  ["vendorId", "englishName"],
  ["poId", "sentAt"],
  "status",
];

const keysForOrder = [
  "_id",
  "paymentTerm",
  "purchaseOrderNo",
  "generated",
  "date",
  "shippingTerm",
  "vendorId",
  "vendorEmail",
  "vendorPhoneNo",
  "vendorAddress",
  "status",
];

const HeadingForOrder = [
  "Id",
  "Payment Term",
  "Purchase OrderNo",
  "Generated",
  "Date",
  "Shipping Term",
  "Vendor Id",
  "Vendor Email",
  "Vendor PhoneNo",
  "Vendor Address",
  "Status",
];

const keysForRequest = ["_id", "generatedBy", "date", "vendorId", "status"];

const HeadingForRequest = ["Id", "Generated By", "Date", "Vendor Id", "Status"];

const styles = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },

};


const useStylesForInput = makeStyles((theme) => ({
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:disabled': {
      color: 'gray',
    },
  },
}))

const actions = { view: true };

export default function PurchaseRequest(props) {
  const classesInput = useStylesForInput()

  const [materialReceivings, setMaterialReceivings] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [purchaseRequests, setPurchaseRequests] = useState("");

  const [purchaseOrders, setPurchaseOrders] = useState("");

  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState("");
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState("");
  const [searchPatientQuery, setSearchPatientQuery] = useState('')

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getMaterialReceivingUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setMaterialReceivings(res.data.data.materialReceivings.reverse());
          setVendor(res.data.data.vendors);
          setStatus(res.data.data.statues);
          setPurchaseOrders(res.data.data.purchaseOrders);
          setPurchaseRequests(res.data.data.purchaseRequests);
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
      setMaterialReceivings(data.reverse());
      console.log("res after adding through socket", data);
    });

    getPurchaseRequests();

    return () => socket.disconnect();
  }, []);

  // const addNewItem = () => {
  //   let path = `materialreceiving/add`;
  //   props.history.push({
  //     pathname: path,
  //     state: {
  //       comingFor: "add",
  //       vendors,
  //       statues,
  //       purchaseRequests,
  //       purchaseOrders,
  //     },
  //   });
  // };

  // function handleEdit(rec) {
  //   let path = `materialreceiving/edit`;
  //   props.history.push({
  //     pathname: path,
  //     state: {
  //       comingFor: "edit",
  //       selectedItem: rec,
  //       vendors,
  //       statues,
  //       purchaseRequests,
  //       purchaseOrders,
  //     },
  //   });
  // }

  // function handleDelete(id) {
  //   setModalVisible(true);
  //   setdeleteItem(id);
  // }

  function handleView(rec) {
    let path = `materialreceiving/viewpo`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        purchaseRequests,
        purchaseOrders,
      },
    });
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(deleteMaterialReceivingUrl + "/" + params._id)
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

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPurchaseOrder("");
    setSelectedPurchaseRequest("");
  };

  function handleModelMaterialReceiving(obj, value) {
    if (value[0] === "poId") {
      console.log(obj, value);
      setDialogOpen(true);
      setSelectedPurchaseOrder(obj.poId);
      setSelectedPurchaseRequest("");
    } else if (value[0] === "prId") {
      console.log(obj, value);
      setDialogOpen(true);
      setSelectedPurchaseRequest(obj.prId);
      setSelectedPurchaseOrder("");
    }
  }

  const handlePatientSearch =  (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)
    if (a.length >= 3) {
       axios
        .get(
          getMaterialReceivingUrlSearch + '/' + a
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.materialReceivings.length > 0) {
              console.log(res.data.data)
              setMaterialReceivings(res.data.data.materialReceivings.reverse());
            } else {
              console.log(res.data.data.materialReceivings, 'no-response');
              setMaterialReceivings([]);
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    }

    else if(a.length == 0){
      getPurchaseRequests();
    }
    
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
            <img src={business_Unit} />
            <h4>Order Receiving / Return</h4>
          </div>

          {/* <div>
            <img onClick={addNewItem} src={Add_New} />
            <img src={Search} />
          </div> */}
        </div>

        <div className='row' style={{marginLeft: '0px', marginRight: '0px', marginTop: '20px'}}>
            <div
              className='col-md-12 col-sm-9 col-8'
              style={styles.textFieldPadding}
            >
              <TextField
                className='textInputStyle'
                id='searchPatientQuery'
                type='text'
                variant='filled'
                label='Search By Purchase Order No/ Vendor Name'
                name={'searchPatientQuery'}
                value={searchPatientQuery}
                onChange={handlePatientSearch} 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
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
              className='col-md-1 col-sm-2 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
            </div>

            <div
              className='col-md-1 col-sm-1 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
              
            </div>
          </div>
          

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          { materialReceivings &&  materialReceivings.length > 0 ?  (
            <div>
              <div>
                <CustomTable
                  tableData={materialReceivings}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleView={handleView}
                  handleModelMaterialReceiving={handleModelMaterialReceiving}
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
          ): materialReceivings && materialReceivings.length == 0 ? (
            <div className='row ' style={{ marginTop: '25px' }}>
              <div className='col-11'>
                <h3
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                    position: 'absolute',
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className='col-1' style={{ marginTop: 45 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : 
          ( <div className="LoaderStyle">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
          )}

          <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="simple-dialog-title"
            open={isDialogOpen}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="md"
            fullWidth={true}
          >
            <DialogTitle
              id="simple-dialog-title"
              style={{ textAlign: "center", backgroundColor: "#E2E2E2" }}
            >
              {selectedPurchaseOrder ? "Purchase Order" : "Purchase Request"}
            </DialogTitle>
            <DialogContent style={{ backgroundColor: "#E2E2E2" }}>
              <div>
                {selectedPurchaseOrder
                  ? keysForOrder.map((k, index) => {
                      return (
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            marginTop: 20,
                            marginLeft: 20,
                          }}
                        >
                          <h5 style={{ fontWeight: "700" }}>
                            {HeadingForOrder[index]}:{" "}
                          </h5>{" "}
                          <h5>{selectedPurchaseOrder[k]}</h5>
                        </div>
                      );
                    })
                  : keysForRequest.map((k, index) => {
                      return (
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            marginTop: 20,
                            marginLeft: 20,
                          }}
                        >
                          <h6 style={{ fontWeight: "700" }}>
                            {HeadingForRequest[index]}:
                          </h6>

                          <h6> {selectedPurchaseRequest[k]}</h6>
                        </div>
                      );
                    })}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Button
                  onClick={handleCloseDialog}
                  variant="contained"
                  // color="primary"
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
