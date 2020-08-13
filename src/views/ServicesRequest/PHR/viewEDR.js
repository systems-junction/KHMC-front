/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import DropDown from '../../../components/common/DropDown'
import {
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  updateEDR,
  getSingleEDRPatient,
  getAllExternalConsultantsUrl,
  addECRUrl,
  getPHRById,
  updatePHRById,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/Purchase Order.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../../components/Table/Table'
import plus_icon from '../../../assets/img/Plus.png'
// import ViewSingleRequest from './viewRequest'
import InputLabelComponent from '../../../components/InputLabel/inputLabel'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import ErrorMessage from '../../../components/ErrorMessage/errorMessage'
import Notification from '../../../components/Snackbar/Notification.js'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'

import Loader from 'react-loader-spinner'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

const tableHeadingForPharmacy = [
  'Medicine Name',
  'Requested Qty',
  'Price/Unit',
  '',
]
const tableDataKeysForPharmacy = [
  'medicineName',
  'requestedQty',
  ['itemId', 'purchasePrice'],
]

const statusArray = [
  {
    key: 'pending',
    value: 'Pending',
  },
  {
    key: 'completed',
    value: 'Completed',
  },
]

const actions = { view: true }
const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    // marginTop: 25,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    height: '50px',
    outline: 'none',
    width: '140px',
  },
  stylesForDropdown: {
    marginTop: 0,
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
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
})

const useStyles = makeStyles(tableStyles)

function AddEditPurchaseRequest(props) {
  const classesForTabs = useStylesForTabs()

  const initialState = {
    medicineDataArray: '',

    name: '',
    price: '',
    status: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    medicineDataArray,

    name,
    price,
    status,
  } = state

  const onChangeValue = (e) => {
    console.log(e, 'e')
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [currentUser, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [id, setId] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const getLRByIdURI = (id) => {
    axios
      .get(getPHRById + '/' + id)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'data')
          if (res.data.data) {
            console.log(res.data.data[0], 'data2')

            setIsLoading(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'medicine') {
                  dispatch({ field: 'medicineDataArray', value: val })
                }
              } else {
                dispatch({ field: key, value: val })
              }
            })
          }
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  const updateLRByIdURI = () => {
    const params = {
      _id: id,
      status: status,
    }
    console.log(params, 'params')
    axios
      .put(updatePHRById, params)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'data')
          if (res.data.data) {
            console.log(res.data.data, 'data2')

            setIsLoading(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'serviceId') {
                  dispatch({ field: 'status', value: val.status })
                }
              } else {
                dispatch({ field: key, value: val })
              }
            })
          }
          props.history.goBack()
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  console.log(name, price, 'name')

  useEffect(() => {
    getLRByIdURI(props.history.location.state.selectedItem._id)

    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem._id
    console.log(selectedRec, 'rec')
    setId(props.history.location.state.selectedItem._id)
    setSelectedItem(props.history.location.state.selectedItem)
    setrequestNo(props.history.location.state.selectedItem.requestNo)
    setSelectedPatient(props.history.location.state.selectedItem.patientId)

    // if (selectedRec) {
    //   Object.entries(selectedRec).map(([key, val]) => {
    //     if (val && typeof val === "object") {
    //       if (key === "patientId") {
    //         dispatch({ field: "patientId", value: val._id });
    //       } else if (key === "labRequest") {
    //         dispatch({ field: "labRequestArray", value: val });
    //       } else if (key === "radiologyRequest") {
    //         dispatch({ field: "radiologyRequestArray", value: val });
    //       } else if (key === "consultationNote") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 == "requester") {
    //             dispatch({ field: "requester", value: val1._id });
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //         dispatch({ field: "consultationNoteArray", value: val });
    //       } else if (key === "residentNotes") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 == "doctor") {
    //             dispatch({ field: "doctor", value: val1._id });
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //         dispatch({ field: "residentNoteArray", value: val });
    //       } else if (key === "pharmacyRequest") {
    //         dispatch({ field: "pharmacyRequestArray", value: val });
    //       }
    //     } else {
    //       dispatch({ field: key, value: val });
    //     }
    //   });
    // }
  }, [])

  // For dummy Data
  // function getEDRdetails() {
  // axios.get(
  //   getSingleEDRPatient +
  //   '/' +
  //   props.history.location.state.selectedItem._id
  // )
  //   .then((res) => {
  //     if (res.data.success) {
  //       console.log('response after getting the EDR details', res.data.data)
  // setPurchaseOrderDetails(res.data.data.poId.purchaseRequestId)
  //   } else if (!res.data.success) {
  //     setErrorMsg(res.data.error)
  //     setOpenNotification(true)
  //   }
  //   return res
  // })
  // .catch((e) => {
  //   console.log('error: ', e)
  // })
  // }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
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

      {!isLoading ? (
        <div className='cPadding'>
          <div className='subheader'>
            <div>
              <img src={business_Unit} />
              <h4>Emergency Department Request</h4>
            </div>

            {/* <div>
              <Button
                onClick={TriageAssessment}
                style={styles.stylesForButton}
                variant='contained'
                color='primary'
              >
                Triage And Assessment
              </Button>
            </div> */}
          </div>
          <div
            style={{
              height: '20px',
            }}
          />
          <div className='container' style={styles.patientDetails}>
            <div className='row'>
              <div className='col-md-12'>
                <h4 style={{ color: 'blue', fontWeight: '600' }}>
                  Patient Details
                </h4>
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
                    value={
                      selectedPatient.firstName + ` ` + selectedPatient.lastName
                    }
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
                    value={selectedPatient.gender}
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
                    value={selectedPatient.age}
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
                    MRN
                  </InputLabel>
                  <input
                    disabled={true}
                    type='text'
                    placeholder='Patient ID'
                    name={'patientId'}
                    value={selectedPatient.profileNo}
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
                    value={
                      selectedPatient.insuranceId
                        ? selectedPatient.insuranceId
                        : '--'
                    }
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
                    value={requestNo}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              height: '20px',
            }}
          />

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row' style={{ marginTop: '20px' }}>
              {medicineDataArray !== 0 ? (
                <CustomTable
                  tableData={medicineDataArray}
                  tableDataKeys={tableDataKeysForPharmacy}
                  tableHeading={tableHeadingForPharmacy}
                  // handleView={viewItem}
                  // action={actions}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}
            </div>
          </div>

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                <div>
                  <InputLabelComponent>Status*</InputLabelComponent>
                  <Select
                    fullWidth
                    labelId='status-label'
                    id='status'
                    name='status'
                    value={status}
                    onChange={(e) => onChangeValue(e)}
                    label='Status'
                    className='dropDownStyle'
                    input={<BootstrapInput />}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {console.log(statusArray, 'status')}
                    {statusArray &&
                      statusArray.map((val, key) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                  </Select>
                  {/* <ErrorMessage
                    name={status}
                    isFormSubmitted={isFormSubmitted}
                  /> */}
                </div>
                {/* <DropDown
                  style={{ marginTop: '0px !important' }}
                  id='status'
                  name='status'
                  value={status}
                  onChange={(e) => onChangeValue(e)}
                  label='Status'
                  statusArray={statusArray}
                /> */}
              </div>
              <div className='col-md-8 col-sm-8 col-8 d-flex justify-content-end'>
                <Button
                  onClick={updateLRByIdURI}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Save</strong>
                </Button>
              </div>
            </div>

            <br />
            <div className='row' style={{ marginBottom: '25px' }}>
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      ) : (
        <div className='LoaderStyle'>
          <Loader type='TailSpin' color='red' height={50} width={50} />
        </div>
      )}
    </div>
  )
}
export default AddEditPurchaseRequest
