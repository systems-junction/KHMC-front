/*eslint-disable*/
import React, { useState, useEffect } from 'react'
// @material-ui/core components
import Button from '@material-ui/core/Button'
import Notification from '../../components/Snackbar/Notification.js'
import Paper from '@material-ui/core/Paper'
import CustomTable from '../../components/Table/Table'
import ConfirmationModal from '../../components/Modal/confirmationModal'
import axios from 'axios'
import {
  getReceiveItemsUrl,
  deleteReceiveItemsUrl,
} from '../../public/endpoins'
import Loader from 'react-loader-spinner'

import Header from '../../components/Header/Header'

import Add_New from '../../assets/img/Add_New.png'
import business_Unit from '../../assets/img/business_Unit.png'

import Search from '../../assets/img/Search.png'
import Control_Room from '../../assets/img/Control_Room.png'

import Edit from '../../assets/img/Edit.png'

import Inactive from '../../assets/img/Inactive.png'

import Back from '../../assets/img/Back_Arrow.png'

import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'

const tableHeading = [
  'Item Code',
  'Item Name',
  'Current Qty',
  'Required Qty',
  'Received Qty',
  'Batch No',
  'Unit',
  'Date Received',
]
const tableDataKeys = [
  ['itemId', 'itemCode'],
  ['itemId', 'name'],
  'currentQty',
  'requestedQty',
  'receivedQty',
  'batchNumber',
  'unit',
  'dateReceived',
]

const actions = { edit: false, delete: false }

export default function PurchaseRequest(props) {
  const [purchaseRequests, setPurchaseRequest] = useState('')
  const [vendors, setVendor] = useState('')
  const [statues, setStatus] = useState('')
  const [items, setItems] = useState('')
  const [deleteItem, setdeleteItem] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  function getPurchaseRequests() {
    axios
      .get(getReceiveItemsUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data.receiveItems)
          setPurchaseRequest(res.data.data.receiveItems)
          //   setVendor(res.data.data.vendor);
          //   setStatus(res.data.data.status);
          //   setItems(res.data.data.items);
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
    getPurchaseRequests()
  }, [])

  const addNewItem = () => {
    let path = `receiveitems/add`
    props.history.push({
      pathname: path,
      state: { comingFor: 'add', vendors, statues, items },
    })
  }

  function handleEdit(rec) {
    let path = `receiveitems/edit`
    props.history.push({
      pathname: path,
      state: { comingFor: 'edit', selectedItem: rec, vendors, statues, items },
    })
  }

  function handleDelete(id) {
    setModalVisible(true)
    setdeleteItem(id)
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem,
    }

    axios
      .delete(deleteReceiveItemsUrl + '/' + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem('')
          setModalVisible(false)
          window.location.reload(false)
        } else if (!res.data.success) {
          setErrorMsg(res.data.error)
          setOpenNotification(true)
        }
        return res
      })
      .catch((e) => {
        console.log('error while deletion ', e)
      })
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
            <h4>Receive Items</h4>
          </div>

          {/* <div>
            <img onClick={addNewItem} src={Add_New} />
            <img src={Search} />
          </div> */}
        </div>

        {/* <div
          style={{ alignItems: "center", display: "flex", marginTop: "1rem" }}
        >
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
            <h4 style={{ color: "white", fontWeight: "700" }}>Receive Items</h4>
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
        </div> */}

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
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
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              </div>

              <ConfirmationModal
                modalVisible={modalVisible}
                msg='Are you sure want to delete the record?'
                hideconfirmationModal={() => setModalVisible(false)}
                onConfirmDelete={() => deleteVendor()}
                setdeleteItem={() => setdeleteItem('')}
              />

              <Notification msg={errorMsg} open={openNotification} />
            </div>
          ) : (
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back}
            style={{ width: 45, height: 35, cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  )
}
