/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import {
  getSingleMaterialReceivingUrl, // dummy Url
} from '../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/Purchase Order.png'
import Back from '../../assets/img/Back_Arrow.png'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AddedPurchaseRequestTable from '../PurchaseOrders/addedPurchaseRequestTable'
import plus_icon from '../../assets/img/Plus.png'
import ViewSingleRequest from './viewRequest'
import AddConsultRequest from './addConsultRequest'
import InputLabelComponent from '../../components/InputLabel/inputLabel'

const tableHeadingForConsultation = [
  'Consultation ID',
  'Date/Time',
  'Description',
  'DoctorRef',
  'Action'
]
const tableDataKeysForPR = [
  ['id', 'requestNo'],
  ['id', 'createdAt'],
  'statusForPR',
  'statusForPR',
]
const tableHeadingForPharmacy = [
  'Request ID',
  'Date/Time',
  'Requester',
  'Status',
  'Action',
]
const tableHeadingForLabReq = [
  'Request ID',
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]
const tableHeadingForRadiology = [
  'Request ID',
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px'
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    height: '50px',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
  },
}

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: "center"
  },
  scroller: {
    flexGrow: "0"
  }
})

const useStyles = makeStyles(tableStyles)

function AddEditPurchaseRequest(props) {
  const classesForTabs = useStylesForTabs()

  const initialState = {
    prId: '',
    poId: '',

    radioServiceName: '',
    labServiceName:''
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    prId,
    poId,
    radioServiceName,
    labServiceName
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [, setCurrentUser] = useState('')
  const [] = useState('')
  const [] = useState(false)
  const [, setErrorMsg] = useState('')
  const [, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false)
  const [item, setItem] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [, setPurchaseOrderDetails] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem

    setSelectedItem(props.history.location.state.selectedItem)

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          if (key === 'prId') {
            var temp = []
            for (let i = 0; i < val.length; i++) {
              const obj = {
                ...val[i],
                statusForPR: val[i].id.status,
              }
              temp.push(obj)
            }
            dispatch({ field: key, value: temp })
          } else {
            dispatch({ field: key, value: val })
          }
        } else {
          dispatch({ field: key, value: val })
        }
      })
    }
    getSingleMaterialReceiving()
  }, [])

  // For dummy Data
  function getSingleMaterialReceiving() {
    axios.get(
      getSingleMaterialReceivingUrl +
      '/' +
      props.history.location.state.selectedItem._id
    )
      .then((res) => {
        if (res.data.success) {
          console.log('response after getting the PO details', res.data.data)
          setPurchaseOrderDetails(res.data.data.poId.purchaseRequestId)
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function viewItem(item) {
    if (item !== '') {
      setOpenItemDialog(true)
      setItem(item.id.item)
    } else {
      setOpenItemDialog(false)
      setItem('')
    }
  }

  function addConsultRequest(item) {
    if (item !== '') {
      setOpenAddConsultDialog(true)
    } else {
      setOpenAddConsultDialog(false)
    }
  }

  const addNewRequest = () => {
    let path = `viewEDR/add`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        selectedItem: selectedItem
      },
    })
  }

  const saveLabReq = () => {
    alert("YESHHH")
  }

  const saveRadioReq = () => {
    alert("RADIOOO")
  }

  const addRadioReq = () => {
    alert("addRadio")
  }

  const addLabReq = () => {
    alert("add Lab")
  }

  const TriageAssessment = () => {
    let path = `viewEDR/TriageAndAssessment`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
      },
    })
  }

  return (
    <div
      style={{
        backgroundColor: '#60d69f',
        position: 'fixed',
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'scroll',
      }}
    >
      <Header />

      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={business_Unit} />
            <h4>Emergency Department Request</h4>
          </div>

          <div>
            <Button
              onClick={TriageAssessment}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              Triage And Assessment
            </Button>
          </div>
        </div>
        <div style={{
          height: '20px'
        }}
        />
        <div className="container" style={styles.patientDetails}>
          <div className='row'>
            <div className='col-md-12'>
              <h4 style={{ color: 'blue', fontWeight: '600' }}>Patient Details</h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Patient Name
                  </InputLabel>
                <input
                  disabled={true}
                  type='text'
                  placeholder='Patient Name'
                  name={'patientName'}
                  value={poId.purchaseOrderNo}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Gender
                </InputLabel>
                <input
                  disabled={true}
                  type='text'
                  placeholder='Gender'
                  name={'gender'}
                  value={poId.purchaseOrderNo}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Age
                  </InputLabel>
                <input
                  disabled={true}
                  type='text'
                  placeholder='Age'
                  name={'age'}
                  value={poId.purchaseOrderNo}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Patient ID
                  </InputLabel>
                <input
                  disabled={true}
                  type='text'
                  placeholder='Patient ID'
                  name={'patientId'}
                  value={poId.generated}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>

            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Insurance No
                  </InputLabel>
                <input
                  disabled={true}
                  type='text'
                  placeholder='Insurance Number'
                  name={'insuranceId'}
                  value={selectedItem && selectedItem.vendorId.englishName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Request No
                  </InputLabel>
                <input
                  disabled={true}
                  type='text'
                  placeholder='Request Number'
                  name={'requestNo'}
                  value={selectedItem && selectedItem.vendorId.contactPersonName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{
          height: '20px'
        }}
        />
        <div className={classesForTabs.root}>
          <Tabs
            classes={{ root: classesForTabs.root, scroller: classesForTabs.scroller }}
            value={value}
            onChange={handleChange}
            indicatorColor='null'
            centered={false}
            variant='scrollable'
            fullWidth={true}
          >
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 0 ? '#2c6ddd' : undefined,
              }}
              label='Consultation Notes'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 1 ? '#2c6ddd' : undefined,
              }}
              label='Pharmacy Request'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 2 ? '#2c6ddd' : undefined,
              }}
              label='Lab Request'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 3 ? '#2c6ddd' : undefined,
              }}
              label='Radiology Request'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 4 ? '#2c6ddd' : undefined,
              }}
              label='In Patient Request'
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row' style={{ marginTop: '20px' }}>
              {prId.length !== 0 ? (
                <AddedPurchaseRequestTable
                  tableData={prId}
                  tableDataKeys={tableDataKeysForPR}
                  tableHeading={tableHeadingForConsultation}
                  viewItem={viewItem}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                  undefined
                )}
            </div>

            <div className='row' style={{ marginBottom: '25px' }}>
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
              <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                <Button
                  onClick={addConsultRequest}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                <img className='icon-style' src={plus_icon} />
                &nbsp;&nbsp;
                <strong style={{ fontSize: '12px' }}>Add New Consultation</strong>
                </Button>
              </div>
            </div>
          </div>
        ) : value === 1 ? 
        (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row' style={{ marginTop: '20px' }}>
              {prId.length !== 0 ? (
                <AddedPurchaseRequestTable
                  tableData={prId}
                  tableDataKeys={tableDataKeysForPR}
                  tableHeading={tableHeadingForPharmacy}
                  viewItem={viewItem}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                  undefined
                )}
            </div>

            <div className='row' style={{ marginBottom: '25px' }}>
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
              <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                <Button
                  onClick={addNewRequest}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                <img className='icon-style' src={plus_icon} />
                &nbsp;&nbsp;
                <strong style={{ fontSize: '12px' }}>Pharmacy Request</strong>
                </Button>
              </div>
            </div>

          </div>
        ) : value === 2 ? 
        (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div style={{ marginTop: '20px' }} className='row'>
              <div className='col-md-8 col-sm-8 col-6'>
                <InputLabelComponent>Service Name*</InputLabelComponent>
                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='Service name'
                  name={'labServiceName'}
                  value={labServiceName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
              <div className='col-md-4 col-sm-4 col-4'>
                <Button
                  onClick={addLabReq}
                  style={{ ...styles.stylesForButton,backgroundColor: '#ba55d3',marginTop:25}}
                  variant='contained'
                  color='primary'
                >
                <strong style={{ fontSize: '12px' }}>Add</strong>
                </Button>
              </div>
            </div>

            <div className='row' style={{ marginTop: '20px' }}>
              {prId.length !== 0 ? (
                <AddedPurchaseRequestTable
                  tableData={prId}
                  tableDataKeys={tableDataKeysForPR}
                  tableHeading={tableHeadingForLabReq}
                  viewItem={viewItem}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                  undefined
                )}
            </div>

            <div className='row' style={{ marginBottom: '25px' }}>
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
              <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                <Button
                  onClick={saveLabReq}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                <strong style={{ fontSize: '12px' }}>Save</strong>
                </Button>
              </div>
            </div>

          </div>
        ) : value === 3 ? 
        (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div style={{ marginTop: '20px' }} className='row'>
              <div className='col-md-8 col-sm-8 col-6'>
                <InputLabelComponent>Service Name*</InputLabelComponent>
                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='Service name'
                  name={'radioServiceName'}
                  value={radioServiceName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
              <div className='col-md-4 col-sm-4 col-4'>
                <Button
                  onClick={addRadioReq}
                  style={{ ...styles.stylesForButton,backgroundColor: '#ba55d3',marginTop:25}}
                  variant='contained'
                  color='primary'
                >
                <strong style={{ fontSize: '12px' }}>Add</strong>
                </Button>
              </div>
            </div>

            <div className='row' style={{ marginTop: '20px' }}>
              {prId.length !== 0 ? (
                <AddedPurchaseRequestTable
                  tableData={prId}
                  tableDataKeys={tableDataKeysForPR}
                  tableHeading={tableHeadingForRadiology}
                  viewItem={viewItem}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                  undefined
                )}
            </div>

            <div className='row' style={{ marginBottom: '25px' }}>
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
              <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                <Button
                  onClick={saveRadioReq}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                <strong style={{ fontSize: '12px' }}>Save</strong>
                </Button>
              </div>
            </div>
          </div>
        ) : (
              <div
                style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                className='container'
              >

              </div>
            )}

        {openItemDialog ? (
          <ViewSingleRequest
            item={item}
            openItemDialog={openItemDialog}
            viewItem={viewItem}
          />
        ) : (
            undefined
          )}

        {openAddConsultDialog ? (
          <AddConsultRequest
            item={selectedItem}
            openItemDialog={openAddConsultDialog}
            viewItem={addConsultRequest}
          />
        ) : (
            undefined
          )}
      </div>
    </div>
  )
}
export default AddEditPurchaseRequest

