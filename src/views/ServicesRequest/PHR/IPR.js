/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Notification from '../../../components/Snackbar/Notification.js'
import CustomTable from '../../../components/Table/Table'
import ConfirmationModal from '../../../components/Modal/confirmationModal'
import axios from 'axios'
import { getEDRUrl, getMaterialReceivingUrl } from '../../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../../assets/img/Back_Arrow.png'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import Header from '../../../components/Header/Header'

import Add_New from '../../../assets/img/Add_New.png'
import business_Unit from '../../../assets/img/Material Receiving.png'

import Search from '../../../assets/img/Search.png'
import Control_Room from '../../../assets/img/Control_Room.png'

import Edit from '../../../assets/img/Edit.png'

import Inactive from '../../../assets/img/Inactive.png'

import Active from '../../../assets/img/Active.png'

import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

import AddedPurchaseRequestTable from '../../PurchaseOrders/addedPurchaseRequestTable'

import socketIOClient from 'socket.io-client'

const tableHeading = [
  'Patient ID',
  'Request Number',
  'Patient First Name',
  'Patient Last Name',
  'Date',
  'Status',
  'Action',
]
const tableDataKeys = [
  ['patientId', 'profileNo'],
  'requestNo',
  ['patientId', 'firstName'],
  ['patientId', 'lastName'],
  'updatedAt',
  'status',
]

const actions = { view: true }

export default function EDR(props) {
  const [Edr, setEdr] = useState([])
  // const [deleteItem, setdeleteItem] = useState('')
  const [modalVisible, setModelVisible] = useState(false)
  const [itemModalVisible, setitemModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [item, setItem] = useState('')

  const [isDialogOpen, setDialogOpen] = useState(false)

  // const [materialReceivings, setMaterialReceivings] = useState("");
  const [vendors, setVendor] = useState('')
  const [statues, setStatus] = useState('')
  const [purchaseRequests, setPurchaseRequests] = useState('')

  const [purchaseOrders, setPurchaseOrders] = useState('')

  // const [deleteItem, setdeleteItem] = useState("");
  // const [modalVisible, setModalVisible] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [openNotification, setOpenNotification] = useState(false);

  // const [isDialogOpen, setDialogOpen] = useState(false);

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState('')
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState('')

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  function getEDR() {
    axios
      .get(getMaterialReceivingUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data)
          setEdr(res.data.data.materialReceivings.reverse())
          setVendor(res.data.data.vendors)
          setStatus(res.data.data.statues)
          setPurchaseOrders(res.data.data.purchaseOrders)
          setPurchaseRequests(res.data.data.purchaseRequests)
        } else if (!res.data.success) {
          setErrorMsg(res.data.error)
          setOpenNotification(true)
        }
        return res
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  useEffect(() => {
    // const socket = socketIOClient(socketUrl);
    // socket.emit("connection");
    // socket.on("get_data", (data) => {
    //   setMaterialReceivings(data.reverse());
    //   console.log("res after adding through socket", data);
    // });

    getEDR()

    // return () => socket.disconnect();
  }, [])

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
    let path = `ipr/viewIPR`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        vendors,
        statues,
        purchaseRequests,
        purchaseOrders,
      },
    })
  }

  function deleteVendor() {
    // const params = {
    //   _id: deleteItem,
    // };
    // axios
    //   .delete(deleteMaterialReceivingUrl + "/" + params._id)
    //   .then((res) => {
    //     if (res.data.success) {
    //       setdeleteItem("");
    //       setModalVisible(false);
    //       window.location.reload(false);
    //     } else if (!res.data.success) {
    //       setErrorMsg(res.data.error);
    //       setOpenNotification(true);
    //     }
    //     return res;
    //   })
    //   .catch((e) => {
    //     console.log("error while deletion ", e);
    //   });
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedPurchaseOrder('')
    setSelectedPurchaseRequest('')
  }

  function handleModelMaterialReceiving(obj, value) {
    // if (value[0] === "poId") {
    //   console.log(obj, value);
    //   setDialogOpen(true);
    //   setSelectedPurchaseOrder(obj.poId);
    //   setSelectedPurchaseRequest("");
    // } else if (value[0] === "prId") {
    //   console.log(obj, value);
    //   setDialogOpen(true);
    //   setSelectedPurchaseRequest(obj.prId);
    //   setSelectedPurchaseOrder("");
    // }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#60d69f',
        overflowY: 'scroll',
      }}
    >
      <Header />

      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={business_Unit} />
            <h4>Emergency Department Requests</h4>
          </div>

          {/* <div>
            <img onClick={addNewItem} src={Add_New} />
            <img src={Search} />
          </div> */}
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* {Edr ? ( */}
          <div>
            <div>
              <CustomTable
                tableData={Edr}
                tableDataKeys={tableDataKeys}
                tableHeading={tableHeading}
                action={actions}
                handleView={handleView}
                // handleModelMaterialReceiving={handleModelMaterialReceiving}
                borderBottomColor={'#60d69f'}
                borderBottomWidth={20}
              />
            </div>

            {/* <ConfirmationModal
                modalVisible={modalVisible}
                msg="Are you sure want to delete the record?"
                hideconfirmationModal={() => setModalVisible(false)}
                onConfirmDelete={() => deleteVendor()}
                setdeleteItem={() => setdeleteItem("")}
              /> */}
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{
                  width: 45,
                  height: 35,
                  cursor: 'pointer',
                }}
              />
            </div>
            <Notification msg={errorMsg} open={openNotification} />
          </div>
          {/* ) : (
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )} */}

          {/* <Dialog
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
          </Dialog> */}
        </div>
      </div>
    </div>
  )
}
