import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { getPatientUrl, deletePatientUrl } from '../../public/endpoins'
import Button from '@material-ui/core/Button'
import Notification from '../../components/Snackbar/Notification.js'
import Paper from '@material-ui/core/Paper'
import CustomTable from '../../components/Table/Table'
import ConfirmationModal from '../../components/Modal/confirmationModal'
import cookie from 'react-cookies'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel'
import ButtonField from '../../components/common/Button'
import { makeStyles } from '@material-ui/core/styles'

import axios from 'axios'
import Loader from 'react-loader-spinner'

import Header from '../../components/Header/Header'

import Add_New from '../../assets/img/Add_New.png'
import purchase_request from '../../assets/img/purchase request.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'

import Search from '../../assets/img/Search.png'
import Control_Room from '../../assets/img/Control_Room.png'

import Edit from '../../assets/img/Edit.png'

import Inactive from '../../assets/img/Inactive.png'

import Active from '../../assets/img/Active.png'

import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import ViewPatient from './viewPatient'
import SearchField from '../../components/common/Search'

const tableHeading = [
  'Patient ID',
  'Patient First Name',
  'Patient Last Name',
  'City',
  'Insurance No',
  'Coverage Terms',
  'Actions',
]
const tableDataKeys = [
  'profileNo',
  'firstName',
  'lastName',
  'city',
  'insuranceId',
  'coverageTerms',
]

const actions = { view: true, delete: true, edit: true }

const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },

  // buttonContainer: {
  //   marginTop: 25
  // }

  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },

  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: '700',
  },
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})
export default function PatientListing(props) {
  const [patient, setPatient] = useState('')
  const [deleteItem, setdeleteItem] = useState('')
  const [modalVisible, setModelVisible] = useState(false)
  const [itemModalVisible, setitemModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [item, setItem] = useState('')

  const classes = useStyles()

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  const addNewItem = () => {
    let path = `patientListing/add`
    props.history.push({
      pathname: path,
      state: { comingFor: 'add' },
    })
  }

  function handleEdit(rec) {
    let path = `patientListing/edit`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
      },
    })
  }

  const viewItem = (obj) => {
    if (obj !== '') {
      setitemModalVisible(true)
      setItem(obj)
      console.log(obj, 'obj')
    } else {
      setitemModalVisible(false)
      setItem('')
    }
  }

  function getPurchaseRequests() {
    axios
      .get(getPatientUrl)
      .then((res) => {
        if (res.data.success) {
          setPatient(res.data.data)
          console.log(res.data.data, 'get patient')
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

  function handleDelete(id) {
    setModelVisible(true)
    setdeleteItem(id)
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem,
    }
    axios
      .delete(deletePatientUrl + '/' + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem('')
          setModelVisible(false)
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
            <img src={purchase_request} />
            <h4>Patient Listing</h4>
          </div>

          <div>
            <ButtonField onClick={addNewItem} name='add' />
            <SearchField />
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {patient ? (
            <div>
              <div>
                <CustomTable
                  tableData={patient}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  borderBottomColor={'#60d69f'}
                  handleView={viewItem}
                  borderBottomWidth={20}
                />
              </div>
              <ConfirmationModal
                modalVisible={modalVisible}
                msg='Are you sure want to delete the record?'
                hideconfirmationModal={() => setModelVisible(false)}
                onConfirmDelete={() => deleteVendor()}
                setdeleteItem={() => setdeleteItem('')}
              />
              <Notification msg={errorMsg} open={openNotification} />
              <div style={{ marginBottom: 20, marginTop: 50 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
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
      {itemModalVisible ? (
        <ViewPatient
          handleEdit={handleEdit}
          item={item}
          open={itemModalVisible}
          viewItem={viewItem}
        />
      ) : null}
    </div>
  )
}
