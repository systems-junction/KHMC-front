/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {
  getLRByIdURL,
  uploadsUrl,
  updateLRByIdURL,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/Labortary Department.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Notification from '../../../components/Snackbar/Notification.js'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'
import Loader from 'react-loader-spinner'
import { FaUpload } from 'react-icons/fa'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

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
}

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
})

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
    sampleID: '',
    comments: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { name, price, status, date, results, sampleID, comments } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const classesForTabs = useStylesForTabs()
  const [, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [lrId, setlrId] = useState('')
  const [iprId, setiprId] = useState('')
  const [slipUpload, setSlipUpload] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = React.useState(0)
  const [pdfView, setpdfView] = useState('')

  const getLRByIdURI = (id) => {
    axios
      .get(getLRByIdURL + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data, 'IPRs LR')
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
      labRequestId: lrId,
      status: status,
    }
    formData.append('data', JSON.stringify(params))
    // console.log('PARAMSS ', params)
    axios
      .put(updateLRByIdURL, formData, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log('res', res.data)
          props.history.push({
            pathname: 'success',
            state: { message: 'Lab services request submitted successfully' },
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

    setlrId(props.history.location.state.selectedItem._id)
    setiprId(props.history.location.state.selectedItem.edipId._id)
    setSelectedItem(props.history.location.state.selectedItem)
    setrequestNo(props.history.location.state.selectedItem.requestNo)
    setSelectedPatient(props.history.location.state.selectedItem.patientId)
  }, [])

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
      setsuccessMsg('')
    }, 2000)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onSlipUpload = (event) => {
    var file = event.target.files[0]
    var fileType = file.name.slice(file.name.length - 3)

    // console.log("Selected file : ", file.name)
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
              <img src={business_Unit} />
              <h4>In Patient</h4>
            </div>
          </div>
          <div
            style={{
              height: '20px',
            }}
          />
          {/* <div className='container' style={styles.patientDetails}>
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
                  <span>{selectedPatient.profileNo}</span>
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
                  <span>{requestNo}</span>
                </div>
              </div>
            </div>
          </div> */}

          <div
            style={{
              height: '20px',
            }}
          />

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container-fluid'
          >
            <div className={classesForTabs.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                TabIndicatorProps={{style: {background:'#12387a'}}}
                centered
              >
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 5,
                    outline: 'none',
                    color: value === 0 ? "#12387a" : '#3B988C',
                  }}
                  label='Sample Collection'
                />
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 5,
                    outline: 'none',
                    color: value === 1 ? "#12387a" : '#3B988C',
                  }}
                  label='Results'
                />
              </Tabs>
            </div>
            {value === 0 ? (
              <>
                <div className='row' style={{ marginTop: '20px' }}>
                  <div
                    className='col-md-12 col-sm-12'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label='Lab Test Name'
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
                {/* <div className='row' style={{ marginTop: '20px' }}>
                  <div
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
                  </div>

                  <div className='col-md-6 col-sm-6 col-6'>
                    <div
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        disabled={true}
                        variant='filled'
                        label='Sample ID'
                        name={'sampleID'}
                        // value={DateTime}
                        type='text'
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
                    </div>
                  </div>
                </div> */}

                <div className='row'>
                  <div
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
                  </div>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      variant='filled'
                      label='Sample ID'
                      name={'sampleID'}
                      // value={DateTime}
                      type='text'
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
                  </div>
                </div>

                <div className='row' style={{ marginTop: '20px' }}>
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
                </div>
              </>
            ) : value === 1 ? (
              <>
                <div className='row' style={{ marginTop: '20px' }}>
                  <div
                    className='col-md-12 col-sm-6 col-12'
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
              </>
            ) : (
              undefined
            )}
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
                  <strong style={{ fontSize: '12px' }}>Submit</strong>
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
