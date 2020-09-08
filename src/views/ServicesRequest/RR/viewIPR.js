/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {
  uploadsUrl,
  getRRIPRById,
  getRRByIdURL,
  updateRRByIdURL,
  getRRPatientById,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import radioIcon from '../../../assets/img/RR.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Notification from '../../../components/Snackbar/Notification.js'
import TextField from '@material-ui/core/TextField'
import { FaUpload } from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Fingerprint from '../../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '20px',
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
  input: {
    display: 'none',
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    height: '50px',
    outline: 'none',
    width: '140px',
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '5px',
    color: 'gray',
    width: '100%',
    height: '55px',
    cursor: 'pointer',
    padding: '15px',
  },
  input: {
    display: 'none',
  },
}

const useStyles = makeStyles((theme) => ({
  scroller: {
    flexGrow: '0',
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

function AddEditPurchaseRequest(props) {
  const classes = useStyles()

  const initialState = {
    name: '',
    price: '',
    status: '',
    date: '',
    results: '',
    gender: '',
    age: '',
    profileNo: '',
    firstName: '',
    lastName: '',
    insuranceId: '',
    requestNo: '',
    comments: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    name,
    status,
    results,
    gender,
    age,
    profileNo,
    firstName,
    lastName,
    insuranceId,
    requestNo,
    comments,
  } = state

  const [, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [rrId, setrrId] = useState('')
  const [iprId, setiprId] = useState('')
  const [slipUpload, setSlipUpload] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [pdfView, setpdfView] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [, setsearchActivated] = useState(false)
  const [patientPopulate, setpatientPopulate] = useState(false)
  const [requestId, setRequestId] = useState('')

  const getLRByIdURI = (id) => {
    axios
      .get(getRRByIdURL + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data, 'IPRs RR')
            setRequestId(res.data.data._id)
            setIsLoading(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'serviceId') {
                  dispatch({ field: 'name', value: val.name })
                  dispatch({ field: 'price', value: val.price })
                }
              } else {
                if (key === 'date') {
                  dispatch({
                    field: 'date',
                    value: new Date(val).toISOString().substr(0, 10),
                  })
                } else {
                  dispatch({ field: key, value: val })
                }
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
    let formData = new FormData()
    if (slipUpload) {
      formData.append('file', slipUpload, slipUpload.name)
    }
    const params = {
      IPRId: iprId,
      EDRId: iprId,
      radiologyRequestId: rrId,
      status: status,
    }
    formData.append('data', JSON.stringify(params))
    console.log('PARAMSS ', params)
    axios
      .put(updateRRByIdURL, formData, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data, 'res')
          props.history.push({
            pathname: 'success',
            state: {
              message: `Radiology services request of Request No ${requestId} submitted successfully`,
            },
          })
        } else {
          setOpenNotification(true)
          setErrorMsg('Error while submitting')
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    getLRByIdURI(props.history.location.state.selectedItem._id)

    setrrId(props.history.location.state.selectedItem._id)
    setiprId(props.history.location.state.selectedItem.edipId._id)
    setSelectedItem(props.history.location.state.selectedItem)
    // setrequestNo(props.history.location.state.selectedItem.requestNo)
    setSelectedPatient(props.history.location.state.selectedItem.patientData)
  }, [])

  const onSlipUpload = (event) => {
    var file = event.target.files[0]
    var fileType = file.name.slice(file.name.length - 3)

    // console.log("Selected file : ", file)
    // console.log("file type : ", fileType)

    setSlipUpload(file)
    var reader = new FileReader()
    var url = reader.readAsDataURL(file)

    reader.onloadend = function() {
      if (fileType === 'pdf') {
        setpdfView(file.name)
      } else {
        setImagePreview([reader.result])
      }
    }
  }

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value)
  //   if (e.target.value.length >= 3) {
  //     axios
  //       .get(getRRPatientById + '/' + e.target.value)
  //       .then((res) => {
  //         if (res.data.success) {
  //           console.log('patient data ', res.data)
  //           if (res.data.data[0].length > 0) {
  //             setItemFoundSuccessfully(true)
  //             setItemFound(res.data.data[0])
  //           } else {
  //             setItemFoundSuccessfully(false)
  //             setItemFound('')
  //           }
  //         }
  //       })
  //       .catch((e) => {
  //         console.log('error while searching patient', e)
  //       })
  //   }
  // }

  // function handleAddItem(i) {
  //   console.log('selected banda', i)
  //   setpatientPopulate(true)
  //   // const dob = new Date(i.dob).toISOString().substr(0, 10)

  //   // setPatientId(i._id)
  //   dispatch({ field: 'name', value: i.serviceName })
  //   if (i.results != null) {
  //     dispatch({ field: 'results', value: i.results })
  //   }

  //   dispatch({ field: 'gender', value: i.patientData.gender })
  //   dispatch({ field: 'age', value: i.patientData.age })
  //   dispatch({ field: 'profileNo', value: i.patientData.profileNo })
  //   dispatch({ field: 'firstName', value: i.patientData.firstName })
  //   dispatch({ field: 'lastName', value: i.patientData.lastName })
  //   dispatch({ field: 'insuranceId', value: i.patientData.insuranceId })
  //   dispatch({ field: 'requestNo', value: i.edipId.requestNo })

  //   setrrId(i._id)
  //   setiprId(i.edipId._id)

  //   setSearchQuery('')
  //   setsearchActivated(true)
  // }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
      setsuccessMsg('')
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
        <div className={`cPadding ${classes.root}`}>
          <div className='subheader'>
            <div>
              <img src={radioIcon} />
              <h4>Radiology / Imaging Request</h4>
            </div>
          </div>
          <div
            style={{
              height: '20px',
            }}
          />

          {/* <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className={`container ${classes.root}`}
          >
            <div className='row' style={{ marginTop: '20px' }}>
              <div
                className='col-md-11 col-sm-10 col-10'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  type='text'
                  label='Search Patient by Name / MRN / National ID / Mobile Number'
                  name={'searchQuery'}
                  value={searchQuery}
                  onChange={handleSearch}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>

              <div className='col-md-1 col-sm-2 col-2'>
                <div
                  style={{
                    ...styles.inputContainerForTextField,
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
                className='col-md-11 col-sm-11 col-10'
                style={{
                  //  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {searchQuery ? (
                  <div style={{ zIndex: 3 }}>
                    <Paper>
                      {itemFoundSuccessfull ? (
                        itemFound && (
                          <Table size='small'>
                            <TableHead>
                              <TableRow>
                                <TableCell>MRN</TableCell>
                                <TableCell>Patient Name</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Service Name</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {itemFound.map((i) => {
                                return (
                                  <TableRow
                                    key={i._id}
                                    onClick={() => handleAddItem(i)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <TableCell>
                                      {i.patientData.profileNo}
                                    </TableCell>
                                    <TableCell>
                                      {i.patientData.firstName +
                                        ` ` +
                                        i.patientData.lastName}
                                    </TableCell>
                                    <TableCell>
                                      {i.patientData.gender}
                                    </TableCell>
                                    <TableCell>{i.patientData.age}</TableCell>
                                    <TableCell>
                                      {i.patientData.paymentMethod}
                                    </TableCell>
                                    <TableCell>{i.serviceName}</TableCell>
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
          <br /> */}

          <div className='container-fluid' style={styles.patientDetails}>
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
                  <span>
                    {selectedPatient.firstName + ` ` + selectedPatient.lastName}{' '}
                  </span>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Gender
                  </InputLabel>
                  <span>{selectedPatient.gender}</span>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Age
                  </InputLabel>
                  <span>{selectedPatient.age}</span>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    MRN
                  </InputLabel>
                  {selectedPatient.profileNo}
                </div>
              </div>

              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Insurance No
                  </InputLabel>
                  <span>
                    {selectedPatient.insuranceId
                      ? selectedPatient.insuranceId
                      : '--'}
                  </span>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Request No
                  </InputLabel>
                  <span>{selectedItem.requestNo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* {patientPopulate ? (
            <div className='container' style={styles.patientDetails}>
              <div className='row'>
                <div className='col-md-12'>
                  <h4 style={{ color: '#2c6ddd', fontWeight: '600' }}>
                    Patient Details
                  </h4>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <TextField
                      disabled={true}
                      label='Patient Name'
                      value={firstName + ` ` + lastName}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>

                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <TextField
                      disabled={true}
                      label='gender'
                      name={'gender'}
                      value={gender}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <TextField
                      disabled={true}
                      label='Age'
                      name={'age'}
                      value={age}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <TextField
                      disabled={true}
                      label='Patient MRN'
                      name={'profileNo'}
                      value={profileNo}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>

                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <TextField
                      disabled={true}
                      label='Insurance No'
                      name={'insuranceId'}
                      value={insuranceId}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <TextField
                      disabled={true}
                      label='Request No'
                      name={'requestNo'}
                      value={requestNo}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                    <span>
                      {selectedPatient.firstName +
                        ` ` +
                        selectedPatient.lastName}{' '}
                    </span>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <InputLabel style={styles.stylesForLabel} id='status-label'>
                      Gender
                    </InputLabel>
                    <span>{selectedPatient.gender}</span>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <InputLabel style={styles.stylesForLabel} id='status-label'>
                      Age
                    </InputLabel>
                    <span>{selectedPatient.age}</span>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <InputLabel style={styles.stylesForLabel} id='status-label'>
                      MRN
                    </InputLabel>
                    {selectedPatient.profileNo}
                  </div>
                </div>

                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <InputLabel style={styles.stylesForLabel} id='status-label'>
                      Insurance No
                    </InputLabel>
                    <span>
                      {selectedPatient.insuranceId
                        ? selectedPatient.insuranceId
                        : '--'}
                    </span>
                  </div>
                </div>
                <div className='col-md-4 col-sm-4'>
                  <div style={styles.inputContainerForTextField}>
                    <InputLabel style={styles.stylesForLabel} id='status-label'>
                      Request No
                    </InputLabel>
                    <span>{selectedItem.requestNo}</span>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          <div
            style={{
              height: '20px',
            }}
          />

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className={`container-fluid ${classes.root}`}
          >
            <div className='row'>
              <div
                className='col-md-12 col-sm-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label='Radiology / Imaging'
                  name={'name'}
                  value={name}
                  // onChange={onChangeValue}
                  variant='filled'
                  className='textInputStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>
              {/* <div
                className='col-md-4 col-sm-4'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label='Price'
                  variant='filled'
                  name={'price'}
                  value={price}
                  // onChange={onChangeValue}
                  className='textInputStyle'
                  InputProps={{
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
                className='col-md-4 col-sm-4'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  fullWidth
                  select
                  id='status'
                  name='status'
                  value={status}
                  onChange={onChangeValue}
                  variant='filled'
                  label='Status'
                  className='dropDownStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  input={<BootstrapInput />}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {statusArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </div> */}
            </div>
            <br />
            <div className='row'>
              <div
                className='col-md-12 col-sm-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label='Comments / Notes'
                  name={'comments'}
                  value={comments}
                  variant='filled'
                  className='textInputStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>
            </div>
            <br />
            <div className='row'>
              <div
                className='col-md-12 col-sm-12 col-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <label style={styles.upload}>
                  <TextField
                    required
                    type='file'
                    style={styles.input}
                    onChange={onSlipUpload}
                    name='results'
                  />
                  <FaUpload /> Results
                </label>
                {pdfView !== '' ? (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#2c6ddd',
                      fontStyle: 'italic',
                    }}
                  >
                    <span style={{ color: 'black' }}>Selected File : </span>
                    {pdfView}
                  </div>
                ) : (
                  undefined
                )}
              </div>
              {/* <div
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  variant='filled'
                  label='Date/Time'
                  name={'date'}
                  value={date}
                  type='date'
                  className='textInputStyle'
                  // onChange={(val) => onChangeValue(val, 'DateTime')}
                  InputLabelProps={{
                    shrink: true,
                    color: 'black',
                  }}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div> */}
            </div>

            <div className='row'>
              {results !== '' && results.includes('\\') ? (
                <>
                  {results !== '' &&
                  results.slice(results.length - 3) !== 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <img
                        src={uploadsUrl + results.split('\\')[1]}
                        className='depositSlipImg'
                      />
                    </div>
                  ) : results !== '' &&
                    results.slice(results.length - 3) === 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                        // textAlign:'center',
                      }}
                    >
                      <a
                        href={uploadsUrl + results.split('\\')[1]}
                        style={{ color: '#2c6ddd' }}
                      >
                        Click here to open results
                      </a>
                    </div>
                  ) : (
                    undefined
                  )}
                </>
              ) : results !== '' && results.includes('/') ? (
                <>
                  {results !== '' &&
                  results.slice(results.length - 3) !== 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <img
                        src={uploadsUrl + results}
                        className='depositSlipImg'
                      />
                    </div>
                  ) : results !== '' &&
                    results.slice(results.length - 3) === 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <a
                        href={uploadsUrl + results}
                        style={{ color: '#2c6ddd' }}
                      >
                        Click here to open results
                      </a>
                    </div>
                  ) : (
                    undefined
                  )}
                </>
              ) : (
                undefined
              )}

              {imagePreview !== '' ? (
                <div
                  className='col-md-6 col-sm-6 col-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <img src={imagePreview} className='depositSlipImg' />
                  {results !== '' ? (
                    <div style={{ color: 'black', textAlign: 'center' }}>
                      New results
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
              ) : (
                undefined
              )}
            </div>

            <br />
            <br />
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
                  onClick={updateLRByIdURI}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '13px' }}>Submit</strong>
                </Button>
              </div>
            </div>
          </div>

          <Notification
            msg={errorMsg}
            open={openNotification}
            success={successMsg}
          />
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
