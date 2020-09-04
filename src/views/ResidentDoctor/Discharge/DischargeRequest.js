import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import TextField from '@material-ui/core/TextField'
import business_Unit from '../../../assets/img/Doctor - Discharge.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../../components/Table/Table'
import plus_icon from '../../../assets/img/Plus.png'
import ViewSingleRequest from './viewRequest'
import Notification from '../../../components/Snackbar/Notification.js'
import TextArea from '../../../components/common/TextArea'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Fingerprint from '../../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../../assets/img/Bar Code.png'
import {
  updateIPR,
  updateEdrIpr,
  getSingleIPRPatient,
  getSearchedpatient,
  searchpatient,
} from '../../../public/endpoins'

const tableHeadingForDischargeMed = [
  'Request ID',
  'Date/Time',
  'Status',
  'Action',
]
const tableDataKeysForDischargeMed = [
  ['requester', 'identificationNumber'],
  'date',
  'status',
]
const actions = { view: true }
const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  headingStyles: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 12,
  },
  textStyles: {
    fontWeight: '700',
    color: 'black',
    fontSize: 14,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
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
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
})

const useStylesForInput = makeStyles((theme) => ({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
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
  multilineColor: {
    backgroundColor: 'white',
    borderRadius: 5,
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
  },
}))

function DischargeRequest(props) {
  const classesForTabs = useStylesForTabs()
  const classes = useStylesForInput()

  const initialState = {
    dischargeMedArray: '',
    dischargeRequest: '',

    otherNotes: '',
    dischargeNotes: '',
    requestType: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    dischargeMedArray,
    dischargeRequest,

    otherNotes,
    dischargeNotes,
    requestType,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [item, setItem] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [id, setId] = useState('')
  const [searchPatientQuery, setSearchPatientQuery] = useState('')
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(false)
  const [patientFound, setpatientFound] = useState('')
  const [patientDetails, setPatientDetails] = useState('')
  const [selectedPatientArray, setSelectedPatientArray] = useState([])
  const [patientDetailsDialog, openPatientDetailsDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [enableForm, setenableForm] = useState(true)

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    // console.log(props.history.location.state.selectedItem)

    // const selectedRec = props.history.location.state.selectedItem

    // setSelectedItem(props.history.location.state.selectedItem)
    // setId(props.history.location.state.selectedItem._id)
    // setrequestNo(props.history.location.state.selectedItem.requestNo)
    // setSelectedPatient(props.history.location.state.selectedItem.patientId)

    // getEDRdetails()
  }, [])

  // function getEDRdetails() {
  //   axios
  //     .get(
  //       getSingleIPRPatient +
  //         '/' +
  //         props.history.location.state.selectedItem._id
  //     )
  //     .then((res) => {
  //       if (res.data.success) {
  //         console.log(
  //           'response after getting the EDR details',
  //           res.data.data[0]
  //         )
  //         setSelectedItem(res.data.data[0])
  //         const selectedRec = res.data.data[0]

  //         if (selectedRec) {
  //           Object.entries(selectedRec).map(([key, val]) => {
  //             if (val && typeof val === 'object') {
  //               if (key === 'dischargeRequest') {
  //                 // console.log("INNNN dischargeRequest",key,val)
  //                 Object.entries(val).map(([key1, val1]) => {
  //                   if (key1 === 'dischargeSummary') {
  //                     console.log(key1, val1)
  //                     dispatch({
  //                       field: 'dischargeNotes',
  //                       value: val1.dischargeNotes,
  //                     })
  //                     dispatch({ field: 'otherNotes', value: val1.otherNotes })
  //                   } else if (key1 === 'dischargeMedication') {
  //                     // console.log("INNNN dischargeMedication",key1,val1)
  //                     dispatch({ field: 'dischargeMedArray', value: [val1] })
  //                   }
  //                 })
  //                 dispatch({ field: 'dischargeRequest', value: val })
  //               }
  //             } else {
  //               dispatch({ field: key, value: val })
  //             }
  //           })
  //         }
  //       } else if (!res.data.success) {
  //         setErrorMsg(res.data.error)
  //         setOpenNotification(true)
  //       }
  //       return res
  //     })
  //     .catch((e) => {
  //       console.log('error: ', e)
  //     })
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function viewItem(item) {
    if (item !== '') {
      setOpenItemDialog(true)
      setItem(item)
    } else {
      setOpenItemDialog(false)
      setItem('')
    }
  }

  const handlePatientSearch = (e) => {
    setSearchPatientQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedpatient + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
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
    console.log('selected banda : ', i)
    setPatientDetails(i)
    getPatientByInfo(i._id)
    openPatientDetailsDialog(true)

    const obj = {
      itemCode: i.itemCode,
    }

    setSelectedPatientArray((pervState) => [...pervState, obj])
    setSearchPatientQuery('')
  }

  const getPatientByInfo = (id) => {
    axios
      .get(searchpatient + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log('Response after getting EDR/IPR data : ', res.data.data)

            setIsLoading(false)
            setSelectedItem(res.data.data)
            setId(res.data.data._id)
            setenableForm(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'dischargeRequest') {
                  // console.log("INNNN dischargeRequest",key,val)
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 === 'dischargeSummary') {
                      console.log(key1, val1)
                      dispatch({
                        field: 'dischargeNotes',
                        value: val1.dischargeNotes,
                      })
                      dispatch({ field: 'otherNotes', value: val1.otherNotes })
                    } else if (key1 === 'dischargeMedication') {
                      // console.log("INNNN dischargeMedication",key1,val1)
                      dispatch({ field: 'dischargeMedArray', value: [val1] })
                    }
                  })
                  dispatch({ field: 'dischargeRequest', value: val })
                }
              } else {
                dispatch({ field: key, value: val })
                // console.log("here",key,val)
              }
            })
          }
        } else {
          setOpenNotification(true)
          setErrorMsg('EDR/IPR not generated for patient')
        }
      })
      .catch((e) => {
        setOpenNotification(true)
        setErrorMsg(e)
      })
  }

  const addNewRequest = () => {
    let path = `dischargerequest/addDischargeRequest`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        selectedItem: selectedItem,
        dischargeMedArray,
      },
    })
  }

  const submitDischargeSummary = () => {
    const params = {
      _id: id,
      requestType,
      dischargeRequest: {
        ...dischargeRequest,
        dischargeSummary: {
          dischargeNotes: dischargeNotes,
          otherNotes: otherNotes,
        },
      },
    }
    console.log('params', params)
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response while adding Discharge Req', res.data.data)
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while adding the Discharge request')
        }
      })
      .catch((e) => {
        console.log('error after adding Discharge request', e)
        setOpenNotification(true)
        setErrorMsg('Error after adding the Discharge request')
      })
  }

  const onClick = () => {
    setValue(value + 1)
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  function validateDischargeForm() {
    console.log(dischargeMedArray[0])
    return (
      dischargeMedArray &&
      dischargeMedArray[0].medicine.length !== 0 &&
      dischargeNotes !== '' &&
      otherNotes !== ''
    )
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
            <h4>Discharge</h4>
          </div>
        </div>

        <div
          className={`${'container-fluid'} ${classes.root}`}
          style={{ marginTop: '25px' }}
        >
          <div className='row'>
            <div
              className='col-md-10 col-sm-9 col-8'
              style={styles.textFieldPadding}
            >
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
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  className: classes.input,
                  classes: { input: classes.input },
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  height: 55,
                }}
              >
                <img src={BarCode} style={{ width: 100, height: 70 }} />
              </div>
            </div>

            <div
              className='col-md-1 col-sm-1 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  height: 55,
                }}
              >
                <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
              </div>
            </div>
          </div>

          <div className='row'>
            <div
              className='col-md-10 col-sm-9 col-8'
              style={styles.textFieldPadding}
            >
              {searchPatientQuery ? (
                <div
                  style={{
                    zIndex: 3,
                    position: 'absolute',
                    width: '100%',
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
          </div>
        </div>
        <div
          style={{
            height: '20px',
          }}
        />

        <div className='container-fluid'>
          <h5 style={{ fontWeight: 'bold', color: 'white', marginTop: 25 }}>
            Patient Details
          </h5>
          <div
            // className="row"
            style={{
              marginTop: 25,
              backgroundColor: 'white',
              borderRadius: 5,
              width: '100%',
            }}
          >
            <div
              className='row'
              style={{
                backgroundColor: '#2C6DDD',
                paddingLeft: 10,
                height: '30%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                paddingBottom: 10,
                paddingTop: 10,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>
                  Patient Info
                </h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>Allergy</h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>
                  Medication
                </h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>Diagnosis</h6>
              </div>
            </div>

            <div
              style={{
                marginTop: 10,
                paddingLeft: 10,
                height: '80%',
                paddingBottom: 10,
              }}
            >
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={styles.headingStyles}>MRN</span>
                <span style={styles.textStyles}>
                  {patientDetails.profileNo
                    ? patientDetails.profileNo
                    : '-----'}
                  {/* {patientDetails && patientDetails.profileNo} */}
                </span>

                <span style={styles.headingStyles}>Patient</span>
                <span style={styles.textStyles}>
                  {patientDetails.firstName && patientDetails.lastName
                    ? patientDetails.firstName + ' ' + patientDetails.lastName
                    : '---- ----'}
                </span>

                <span style={styles.headingStyles}>Gender</span>
                <span style={styles.textStyles}>
                  {patientDetails.gender ? patientDetails.gender : '----'}
                </span>

                <span style={styles.headingStyles}>Age</span>
                <span style={styles.textStyles}>
                  {patientDetails.age ? patientDetails.age : '--'}
                </span>

                <span style={styles.headingStyles}>Weight</span>
                <span style={styles.textStyles}>
                  {patientDetails.weight ? patientDetails.weight : '--'} kg
                </span>
              </div>

              <div className={'col-md-3 col-sm-3 col-3'} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug) => {
                    return <h6 style={styles.textStyles}>{drug}</h6>
                  })}
              </div>

              <div className={'col-md-3 col-sm-3 col-3'} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug, index) => {
                    return (
                      <h6 style={styles.textStyles}>Medication {index + 1}</h6>
                    )
                  })}
              </div>

              <div className={'col-md-3 col-sm-3 col-3'} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug, index) => {
                    return (
                      <h6 style={styles.textStyles}>Diagnosis {index + 1}</h6>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

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
              label='Discharge Summary'
              disabled={enableForm}
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 1 ? '#2c6ddd' : undefined,
              }}
              label='Discharge Medication'
              disabled={enableForm}
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div style={{ marginTop: '20px' }} className='row'>
              <div className='col-md-12 col-sm-12 col-12'>
                <TextArea
                  type='text'
                  disabled={enableForm}
                  placeholder='Discharge Notes'
                  name={'dischargeNotes'}
                  value={dischargeNotes}
                  onChange={onChangeValue}
                  rows='4'
                />
              </div>
            </div>

            <div style={{ marginTop: '20px' }} className='row'>
              <div className='col-md-12 col-sm-12 col-12'>
                <TextArea
                  type='text'
                  disabled={enableForm}
                  placeholder='Other Notes'
                  name={'otherNotes'}
                  value={otherNotes}
                  onChange={onChangeValue}
                  rows='4'
                />
              </div>
            </div>

            <div
              className='row d-flex'
              style={{ marginBottom: '25px', marginTop: '25px' }}
            >
              <div className='mr-auto p-2'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    marginTop: '7px',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div className='p-2'>
                <Button
                  disabled={enableForm}
                  style={styles.stylesForButton}
                  //disabled={!validateFormType1()}
                  onClick={onClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
              </div>
              <div className='p-2'>
                <Button
                  onClick={submitDischargeSummary}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                  disabled={!validateDischargeForm()}
                >
                  <strong style={{ fontSize: '12px' }}>Submit</strong>
                </Button>
              </div>
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row' style={{ marginTop: '20px' }}>
              {dischargeMedArray !== 0 ? (
                <CustomTable
                  tableData={dischargeMedArray}
                  tableDataKeys={tableDataKeysForDischargeMed}
                  tableHeading={tableHeadingForDischargeMed}
                  handleView={viewItem}
                  action={actions}
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
                  disabled={enableForm}
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
        ) : (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          ></div>
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

        <Notification msg={errorMsg} open={openNotification} />
      </div>
    </div>
  )
}
export default DischargeRequest
