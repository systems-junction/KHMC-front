/*eslint-disable*/
import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import styles from '../../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import CustomTable from '../../../../components/Table/Table'
import ConfirmationModal from '../../../../components/Modal/confirmationModal'
import axios from 'axios'
import Header from '../../../../components/Header/Header'
import SurgeryDepartment from '../../../../assets/img/Surgery Department.png'
import Add_New from '../../../../assets/img/Add_New.png'
import Search from '../../../../assets/img/Search.png'
import Table from '../../../../components/Table/Table.js'
import Back from '../../../../assets/img/Back_Arrow.png'
import {
  getSurgeryServiceUrl,
  deleteSurgeryServiceUrl
} from '../../../../public/endpoins'
// import ws from '../../variables/websocket'
import { ToastsStore } from 'react-toasts'
import plus_icon from '../../../../assets/img/Plus.png'
import Loader from 'react-loader-spinner'
import '../../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

const stylesB = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    background: '#2c6ddd',
    width: '140px',
    height: '50px',
    outline: 'none',
  },
}

const useStyles = makeStyles(styles)

const tableHeading = ['Service ID', 'Name', 'Price', 'Status', 'Action']
const tableDataKeys = ['serviceNo', 'name', 'price', 'status']

const actions = { edit: true, delete: true }

export default function Vendor(props) {
  const classes = useStyles()
  const [vendors, setVendor] = useState('')
  const [deleteItem, setdeleteItem] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [mainClasses, setClasses] = useState('')

  const [statues, setStatuses] = useState('')

  const [subClasses, setSubClasses] = useState('')

  // ws.onmessage = (message) => {
  //   if (message.data == 'add_vendor') {
  //     getVendors()
  //     console.log('inside check')
  //   }
  //   // console.log(`Received: ${message.data}`);
  // }

  function getVendors() {
    axios
      .get(getSurgeryServiceUrl)
      .then((res) => {
        if (res.data.success) {
          setVendor(res.data.data)
          setStatuses(res.data.data.statues)
          setClasses(res.data.data.classes)
          setSubClasses(res.data.data.subClasses)
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error)
        }
        return res
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  useEffect(() => {
    getVendors()
  }, [])

  const addNewItem = () => {
    let path = `surgery/add/`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        statues: statues,
        mainClasses: mainClasses,
        subClasses: subClasses,
      },
    })
  }

  function handleEdit(rec) {
    let path = `surgery/edit`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
        statues: statues,
        mainClasses: mainClasses,
        subClasses: subClasses,
      },
    })
  }

  function handleDelete(id) {
    setModalVisible(true)
    setdeleteItem(id)
  }
  function handleStatus(id) {
    setModalVisible(true)
    setdeleteItem(id)
  }
  function deleteVendor() {
    const params = {
      _id: deleteItem,
    }

    axios
      .delete(deleteSurgeryServiceUrl + '/' + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem('')
          setModalVisible(false)
          window.location.reload(false)
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error)
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
            <img src={SurgeryDepartment} />
            <h4>Surgery Service</h4>
          </div>

          <div>
            <Button
              onClick={addNewItem}
              style={stylesB.stylesForButton}
              variant='contained'
              color='primary'
            >
              <img src={plus_icon} />
              &nbsp;&nbsp;
              <strong>Add New</strong>
            </Button>
            <img className='img-style' src={Search} />
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {vendors ? (
            <div>
              <div>
                <Table
                  tableData={vendors}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  status={status}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleStatus={handleStatus}
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
              <div style={{ marginBottom: 20 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : (
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
