/*eslint-disable*/
import React, { useState, useEffect, useReducer } from 'react'
import Notification from '../../components/Snackbar/Notification.js'
import Button from '@material-ui/core/Button'
import CustomTable from '../../components/Table/Table'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabelComponent from '../../components/InputLabel/inputLabel'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import cookie from 'react-cookies'
import {
  getIPRUrl,
  getSearchedpatient,
  getIPREDRById,
  searchPatients,
  getSearchedLaboratoryService,
  updateIPR,
} from '../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../assets/img/Back_Arrow.png'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/Material Receiving.png'
import IPR from '../../assets/img/IPR.png'
import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import socketIOClient from 'socket.io-client'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import PatientDetails from '../ProfessionalOrderForMedical/patientDetailsDialog'

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    width: '130px',
    height: '45px',
    outline: 'none',
  },
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  save: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#ba55d3',
    width: '130px',
    height: '45px',
    outline: 'none',
  },
  generate: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#e877a1',
    height: '45px',
    outline: 'none',
  },
  None: {
    display: 'none',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginTop: '20px',
    padding: '10px',
    textAlign: 'center',
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '6px',
    color: 'gray',
    width: '100%',
    height: '60px',
    cursor: 'pointer',
    padding: '15px',
  },
  input: {
    display: 'none',
  },
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  multilineColor: {
    backgroundColor: 'white',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:after': {
      borderBottomColor: 'black',
    },
  },
  root: {
    '& .MuiTextField-root': {
      backgroundColor: 'white',
    },
    '& .Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
    },
    '& .Mui-disabled': {
      backgroundColor: 'white',
      color: 'gray',
    },
  },
}))

const tableHeadingForLabReq = [
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForLabReq = [
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]

const tableHeadingForRadiology = [
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForRadiology = [
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
})

export default function EDR(props) {
  const classesForTabs = useStylesForTabs()
  const classes = useStyles()

  const initialState = {
    labServiceId: '',
    labServiceCode: '',
    labRequestArray: '',
    labServiceName: '',
    labServiceStatus: '',

    radioServiceId: '',
    radioServiceCode: '',

    radioServiceName: '',
    radiologyRequestArray: '',
    radioServiceStatus: '',
    requester: cookie.load('current_user').name,
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    labServiceId,
    labServiceCode,
    labRequestArray,
    labServiceName,
    labServiceStatus,

    radioServiceId,
    radioServiceCode,
    radioServiceName,
    radiologyRequestArray,
    radioServiceStatus,
    requester = cookie.load('current_user').name,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [searchPatientQuery, setSearchPatientQuery] = useState('')
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(false)
  const [patientFound, setpatientFound] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [selectedPatientArray, setSelectedPatientArray] = useState([])
  const [patientDetails, setPatientDetails] = useState('')
  const [labRequest, setLabRequest] = useState('')
  const [radRequest, setRadRequest] = useState('')
  const [value, setValue] = React.useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [addLabRequest, setaddLabRequest] = useState(false)
  const [addRadioRequest, setaddRadioRequest] = useState(false)
  const [searchRadioQuery, setSearchRadioQuery] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [itemFound, setItemFound] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [id, setId] = useState('')

  const [patientDetailsDialog, openPatientDetailsDialog] = useState(false)

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))
  }, [])

  const handlePatientSearch = (e) => {
    setSearchPatientQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedpatient + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            console.log('res1', res.data)
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setpatientFoundSuccessfully(true)
              setpatientFound(res.data.data)
            } else {
              setpatientFoundSuccessfully(false)
              setpatientFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    }
  }

  function handleAddPatient(i) {
    // setDialogOpen(true);
    setSelectedPatient(i)
    axios
      .get(searchPatients + '/' + i._id)
      .then((res) => {
        if (res.data.success) {
          console.log('res2', res.data)
          setLabRequest(res.data.data.labRequest)
          setRadRequest(res.data.radRequest)
          setId(res.data.data._id)
        }
      })
      .catch((e) => {
        console.log('error after searching patient request', e)
      })
    console.log('selected banda', i._id)
    // dispatch({ field: 'patientReferenceNo', value: i.profileNo })

    // dispatch({ field: "itemCode", value: i.itemCode });
    // dispatch({ field: "itemName", value: i.name });
    // dispatch({ field: "itemType", value: i.cls });
    // dispatch({ field: "vendorId", value: i.vendorId });
    // dispatch({ field: "description", value: i.description });
    // dispatch({ field: "maximumLevel", value: i.maximumLevel });
    // dispatch({ field: "issueUnit", value: i.issueUnit });
    // dispatch({ field: "receiptUnit", value: i.receiptUnit });
    // dispatch({ field: "form", value: i.form });
    // dispatch({ field: "medClass", value: i.medClass });
    // dispatch({ field: "scientificName", value: i.scientificName });
    // dispatch({ field: "tradeName", value: i.tradeName });

    setPatientDetails(i)
    openPatientDetailsDialog(true)

    const obj = {
      itemCode: i.itemCode,
    }

    setSelectedPatientArray((pervState) => [...pervState, obj])
    setSearchPatientQuery('')
  }

  function showPatientDetails() {
    openPatientDetailsDialog(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedLaboratoryService + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setItemFoundSuccessfully(true)
              setItemFound(res.data.data)
            } else {
              setItemFoundSuccessfully(false)
              setItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching req', e)
        })
    }
  }

  function handleAddItem(i) {
    // console.log("selected item", i);

    dispatch({ field: 'labServiceId', value: i._id })
    dispatch({ field: 'labServiceCode', value: i.serviceNo })
    dispatch({ field: 'labServiceName', value: i.name })
    dispatch({ field: 'labServiceStatus', value: i.status })

    setSearchQuery('')
    setaddLabRequest(true)
  }

  const addSelectedLabItem = () => {
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {

    let found =
      labRequestArray &&
      labRequestArray.find((item) => item.serviceId === labServiceId)

    if (found) {
      setOpenNotification(true)
      setErrorMsg('This Service has already been added.')
    } else {
      dispatch({
        field: 'labRequestArray',
        value: [
          ...labRequestArray,
          {
            serviceId: labServiceId,
            serviceCode: labServiceCode,
            serviceName: labServiceName,
            requester: currentUser.staffId,
            requesterName: requester,
            status: labServiceStatus,
          },
        ],
      })
      // }
    }

    dispatch({ field: 'labServiceId', value: '' })
    dispatch({ field: 'labServiceName', value: '' })
    dispatch({ field: 'labServiceStatus', value: '' })
    dispatch({ field: 'labServiceCode', value: '' })

    setaddLabRequest(false)
  }

  const saveLabReq = () => {
    // console.log("THIS IS ARRAY",labRequestArray)

    let labItems = []
    for (let i = 0; i < labRequestArray.length; i++) {
      labItems = [
        ...labItems,
        {
          serviceId: labRequestArray[i].serviceId,
          serviceCode: labRequestArray[i].serviceCode,
          requesterName: labRequestArray[i].requesterName,
          requester: labRequestArray[i].requester,
          serviceName: labRequestArray[i].serviceName,
          status: labRequestArray[i].status,
        },
      ]
    }
    const params = {
      _id: id,
      labRequest: labItems,
    }
    // console.log("params", params);
    axios
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Lab Request', res.data)
          // props.history.goBack();
          window.location.reload(false)
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding Lab Request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the Lab Request')
      })
  }

  const handleRadioSearch = (e) => {
    setSearchRadioQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedRadiologyService + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setRadioItemFoundSuccessfully(true)
              setRadioItemFound(res.data.data)
            } else {
              setRadioItemFoundSuccessfully(false)
              setRadioItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching req', e)
        })
    }
  }

  function handleAddRadioItem(i) {
    // console.log("selected item", i.serviceNo);

    dispatch({ field: 'radioServiceId', value: i._id })
    dispatch({ field: 'radioServiceCode', value: i.serviceNo })
    dispatch({ field: 'radioServiceName', value: i.name })
    dispatch({ field: 'radioServiceStatus', value: i.status })

    setSearchRadioQuery('')
    setaddRadioRequest(true)
  }

  const addSelectedRadioItem = () => {
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {

    let found =
      radiologyRequestArray &&
      radiologyRequestArray.find((item) => item.serviceId === radioServiceId)

    if (found) {
      setOpenNotification(true)
      setErrorMsg('This Service has already been added.')
    } else {
      dispatch({
        field: 'radiologyRequestArray',
        value: [
          ...radiologyRequestArray,
          {
            serviceId: radioServiceId,
            serviceCode: radioServiceCode,
            requesterName: requester,
            serviceName: radioServiceName,
            requester: currentUser.staffId,
            status: radioServiceStatus,
          },
        ],
      })
      // }
    }

    dispatch({ field: 'radioServiceId', value: '' })
    dispatch({ field: 'radioServiceCode', value: '' })
    dispatch({ field: 'radioServiceName', value: '' })
    dispatch({ field: 'radioServiceStatus', value: '' })

    setaddLabRequest(false)
  }

  const saveRadioReq = () => {
    // console.log("THISSSSS ISS ARRAYY",radiologyRequestArray)

    let radioItems = []
    for (let i = 0; i < radiologyRequestArray.length; i++) {
      radioItems = [
        ...radioItems,
        {
          serviceId: radiologyRequestArray[i].serviceId,
          serviceCode: radiologyRequestArray[i].serviceCode,
          requester: radiologyRequestArray[i].requester,
          requesterName: radiologyRequestArray[i].requesterName,
          serviceName: radiologyRequestArray[i].serviceName,
          status: radiologyRequestArray[i].status,
        },
      ]
    }
    const params = {
      _id: id,
      radiologyRequest: radioItems,
    }
    // console.log("params", params);
    axios
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          // window.location.reload(false);
          window.location.reload(false)
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding Radio Request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the Radiology Request')
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
            <img src={IPR} />
            <h4>In Patient Requests</h4>
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
          <div>
            <div className='row'>
              {/* <span class="fa fa-search"></span> */}
              <div className='col-sm-11' style={styles.textFieldPadding}>
                <TextField
                  className='textInputStyle'
                  id='searchPatientQuery'
                  type='text'
                  variant='filled'
                  label='Search Patient by Name / MRN / National ID / Mobile Number'
                  name={'searchPatientQuery'}
                  value={searchPatientQuery}
                  onChange={handlePatientSearch}
                  InputProps={{
                    // endAdornment: (
                    //   <InputAdornment position="end">
                    //     <AccountCircle />
                    //   </InputAdornment>
                    // ),
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>

              <div
                className='col-sm-1'
                style={{
                  ...styles.textFieldPadding,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 4,
                }}
              >
                {/* <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} /> */}
              </div>
            </div>

            {searchPatientQuery ? (
              <div
                style={{
                  zIndex: 3,
                  position: 'absolute',
                  width: '96%',
                  left: '2%',
                  marginTop: 5,
                }}
              >
                <Paper>
                  {patientFoundSuccessfull ? (
                    patientFound && (
                      <Table size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>MRN Number</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Payment Method</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {patientFound.map((i) => {
                            return (
                              <TableRow
                                key={i._id}
                                onClick={() => handleAddPatient(i)}
                                style={{ cursor: 'pointer' }}
                              >
                                <TableCell>{i.profileNo}</TableCell>
                                <TableCell>
                                  {i.firstName + ` ` + i.lastName}
                                </TableCell>
                                <TableCell>{i.gender}</TableCell>
                                <TableCell>{i.age}</TableCell>
                                <TableCell>{i.paymentMethod}</TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    )
                  ) : (
                    <h4
                      style={{ textAlign: 'center' }}
                      onClick={() => setSearchPatientQuery('')}
                    >
                      Patient Not Found
                    </h4>
                  )}
                </Paper>
              </div>
            ) : (
              undefined
            )}
          </div>

          {patientDetails && patientDetailsDialog ? (
            <>
              <PatientDetails
                patientDetails={patientDetails}
                showPatientDetails={showPatientDetails}
              />

              <div
                style={{
                  height: '20px',
                }}
              />
              <div className={classesForTabs.root}>
                <Tabs
                  classes={{
                    root: classesForTabs.root,
                    scroller: classesForTabs.scroller,
                  }}
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
                    label='Resident Doctor Notes'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 1 ? '#2c6ddd' : undefined,
                    }}
                    label='External Consultant Notes'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 2 ? '#2c6ddd' : undefined,
                    }}
                    label='PHR'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 3 ? '#2c6ddd' : undefined,
                    }}
                    label='LR'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 4 ? '#2c6ddd' : undefined,
                    }}
                    label='RR'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 5 ? '#2c6ddd' : undefined,
                    }}
                    label='NP/NS'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 6 ? '#2c6ddd' : undefined,
                    }}
                    label='Follow Up'
                  />
                </Tabs>
              </div>
              {value === 3 ? (
                <div
                  style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                  className='container-fluid'
                >
                  <div style={{ marginTop: '20px' }} className='row'>
                    <div className='col-md-12 col-sm-12 col-12'>
                      <InputLabelComponent>Service Name</InputLabelComponent>
                      <input
                        type='text'
                        placeholder='Search service by name'
                        name={'searchQuery'}
                        value={searchQuery}
                        onChange={handleSearch}
                        className='textInputStyle'
                      />
                    </div>
                  </div>

                  {searchQuery ? (
                    <div style={{ zIndex: 10 }}>
                      <Paper>
                        {itemFoundSuccessfull ? (
                          itemFound && (
                            <Table size='small'>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Service Name</TableCell>
                                  <TableCell>Service Number</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell align='center'>
                                    Description
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {itemFound.map((i, index) => {
                                  return (
                                    <TableRow
                                      key={i.serviceNo}
                                      onClick={() => handleAddItem(i)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <TableCell>{i.name}</TableCell>
                                      <TableCell>{i.serviceNo}</TableCell>
                                      <TableCell>{i.price}</TableCell>
                                      <TableCell>{i.description}</TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          )
                        ) : (
                          <h4
                            style={{ textAlign: 'center' }}
                            onClick={() => setSearchQuery('')}
                          >
                            Service Not Found
                          </h4>
                        )}
                      </Paper>
                    </div>
                  ) : (
                    undefined
                  )}

                  <div style={{ marginTop: '20px' }} className='row'>
                    <div className='col-md-10 col-sm-10 col-6'>
                      <InputLabelComponent>
                        Selected Service*
                      </InputLabelComponent>
                      <input
                        disabled
                        style={styles.inputField}
                        type='text'
                        placeholder='Search from above...'
                        name={'labServiceName'}
                        value={labServiceName}
                        onChange={onChangeValue}
                        className='textInputStyle'
                      />
                    </div>
                    <div className='col-md-2 col-sm-2 col-6'>
                      <Button
                        style={{
                          ...styles.stylesForButton,
                          marginTop: '25px',
                          backgroundColor: '#e877a1',
                        }}
                        disabled={!addLabRequest}
                        onClick={addSelectedLabItem}
                        variant='contained'
                        color='primary'
                        fullWidth
                      >
                        Add Service
                      </Button>
                    </div>
                  </div>

                  <div className='row' style={{ marginTop: '20px' }}>
                    {labRequest !== 0 ? (
                      <CustomTable
                        tableData={labRequest}
                        tableDataKeys={tableDataKeysForLabReq}
                        tableHeading={tableHeadingForLabReq}
                        // handleView={viewItem}
                        // action={actions}
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
              ) : value === 4 ? (
                <div
                  style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                  className='container-fluid'
                >
                  <div style={{ marginTop: '20px' }} className='row'>
                    <div className='col-md-12 col-sm-12 col-12'>
                      <InputLabelComponent>Service Name</InputLabelComponent>
                      <input
                        type='text'
                        placeholder='Search service by name'
                        name={'searchRadioQuery'}
                        value={searchRadioQuery}
                        onChange={handleRadioSearch}
                        className='textInputStyle'
                      />
                    </div>
                  </div>

                  {searchRadioQuery ? (
                    <div style={{ zIndex: 10 }}>
                      <Paper>
                        {radioItemFoundSuccessfull ? (
                          radioItemFound && (
                            <Table size='small'>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Service Name</TableCell>
                                  <TableCell>Service Number</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell align='center'>
                                    Description
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                {radioItemFound.map((i, index) => {
                                  return (
                                    <TableRow
                                      key={i.serviceNo}
                                      onClick={() => handleAddRadioItem(i)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <TableCell>{i.name}</TableCell>
                                      <TableCell>{i.serviceNo}</TableCell>
                                      <TableCell>{i.price}</TableCell>
                                      <TableCell>{i.description}</TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          )
                        ) : (
                          <h4
                            style={{ textAlign: 'center' }}
                            onClick={() => setSearchRadioQuery('')}
                          >
                            Service Not Found
                          </h4>
                        )}
                      </Paper>
                    </div>
                  ) : (
                    undefined
                  )}

                  <div style={{ marginTop: '20px' }} className='row'>
                    <div className='col-md-10 col-sm-10 col-6'>
                      <InputLabelComponent>
                        Selected Service*
                      </InputLabelComponent>
                      <input
                        disabled
                        style={styles.inputField}
                        type='text'
                        placeholder='Search from above...'
                        name={'radioServiceName'}
                        value={radioServiceName}
                        onChange={onChangeValue}
                        className='textInputStyle'
                      />
                    </div>
                    <div className='col-md-2 col-sm-2 col-6'>
                      <Button
                        style={{
                          ...styles.stylesForButton,
                          marginTop: '25px',
                          backgroundColor: '#e877a1',
                        }}
                        disabled={!addRadioRequest}
                        onClick={addSelectedRadioItem}
                        variant='contained'
                        color='primary'
                        fullWidth
                      >
                        Add Service
                      </Button>
                    </div>
                  </div>

                  <div className='row' style={{ marginTop: '20px' }}>
                    {radiologyRequestArray !== 0 ? (
                      <CustomTable
                        tableData={radiologyRequestArray}
                        tableDataKeys={tableDataKeysForRadiology}
                        tableHeading={tableHeadingForRadiology}
                        // handleView={viewItem}
                        // action={actions}
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
              ) : null}
              {/* <div className='row' style={{ marginTop: '20px' }}>
                {labRequestArray !== 0 ? (
                  <CustomTable
                    tableData={labRequestArray}
                    tableDataKeys={tableDataKeysForLabReq}
                    tableHeading={tableHeadingForLabReq}
                    // handleView={viewItem}
                    // action={actions}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div> */}
            </>
          ) : (
            undefined
          )}

          {/* {Edr ? (
            <div>
              <div></div>
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
          ) : (
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
