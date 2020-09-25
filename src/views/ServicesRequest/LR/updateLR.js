import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {
  uploadsUrl,
  updateLROPRById,
  getLROPRById,
  getAllExternalConsultantsUrl,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/OPR.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Notification from '../../../components/Snackbar/Notification.js'
import MenuItem from '@material-ui/core/MenuItem'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'
import Loader from 'react-loader-spinner'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import { MdRemoveCircle } from 'react-icons/md'

const statusArray = [
  {
    key: 'pending',
    value: 'Pending',
  },
  {
    key: 'completed',
    value: 'Completed',
  },
  {
    key: 'active',
    value: 'Active',
  },
]

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 15,
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
    width: '140px',
    outline: 'none',
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
    borderRadius: 6,
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
      color: 'gray',
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },
}))

function AddEditPurchaseRequest(props) {
  const classes = useStyles()

  const initialState = {
    sampleId: '',
    rdescription: '',
    note: '',
    serviceName: '',
    date: '',
    results: '',
    comments: '',
    status: '',
    price: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    sampleId,
    rdescription,
    note,
    serviceName,
    date,
    results,
    comments,
    status,
    price,
  } = state

  const onChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w\s]/gi, ''),
    })
  }
  const classesForTabs = useStylesForTabs()
  const [value, setValue] = React.useState(0)
  const [currentUser, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [, setSelectedPatient] = useState('')
  const [, setrequestNo] = useState('')
  const [, setId] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [pdfView, setpdfView] = useState('')
  const [slipUpload, setSlipUpload] = useState('')
  const [oprId, setOprId] = useState('')
  const [labId, setLabId] = useState('')
  const [, setRequestId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [checkStatus, setcheckStatus] = useState('')
  const [isFormSubmitted, setisFormSubmitted] = useState(false)
  const [statusOnResult, setStatusOnResult] = useState('')
  const [statusOnResultStatus, setStatusOnResultStatus] = useState(false)
  const [externalConsultant, setExternalConsultant] = useState('')
  const [allExternalConsultants, setAllExternalConsultants] = useState([])
  const [
    openExtenalConsultantDialog,
    setOpenExtenalConsultantDialog,
  ] = useState(false)

  const getEDRById = (id) => {
    axios
      .get(getLROPRById + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data, 'res')
            setRequestId(res.data.data._id)
            setIsLoading(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'serviceId') {
                  dispatch({ field: 'serviceName', value: val.serviceName })
                  dispatch({ field: 'price', value: val.price })
                }
              }
              if (key === 'date') {
                dispatch({
                  field: 'date',
                  value: new Date(val).toISOString().substr(0, 10),
                })
              } else {
                if (key === 'status') {
                  setcheckStatus(val)
                }
                dispatch({ field: key, value: val })
              }
              // }
            })
          }
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  const getAllExternalConsultants = () => {
    axios
      .get(getAllExternalConsultantsUrl)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data)
            setAllExternalConsultants(res.data.data)
          }
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  useEffect(() => {
    getAllExternalConsultants()
    getEDRById(props.history.location.state.selectedItem._id)
    setOprId(props.history.location.state.id)
    setLabId(props.history.location.state.selectedItem._id)
    console.log('labid', props.history.location.state.selectedItem._id)
    console.log('oprid', props.history.location.state.id)

    setCurrentUser(cookie.load('current_user'))

    setId(props.history.location.state.selectedItem._id)
    setSelectedItem(props.history.location.state.selectedItem)
    setrequestNo(props.history.location.state.selectedItem.requestNo)
    setSelectedPatient(props.history.location.state.selectedItem.patientId)
  }, [])

  const saveLabReq = () => {
    if (validateForm()) {
      let formData = new FormData()
      if (slipUpload) {
        formData.append('file', slipUpload, slipUpload.name)
      }
      const params = {
        labRequestId: labId,
        OPRId: oprId,
        data: selectedItem,
        status: status,
        sampleId: sampleId,
      }
      formData.append('data', JSON.stringify(params))
      console.log('params', params)
      axios
        .put(updateLROPRById, formData, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.data.success) {
            console.log('response after adding Lab Request', res.data)
            // props.history.goBack()
            props.history.push({
              pathname: 'success',
              state: {
                //of Request No ${requestId}
                message: `Lab Service for patient MRN ${res.data.data.patientId.profileNo} updated successfully`,
              },
            })
          } else if (!res.data.success) {
            setOpenNotification(true)
            setErrorMsg('Error while updating')
          }
        })
        .catch((e) => {
          console.log('error after updating Lab Request', e)
          setOpenNotification(true)
          setErrorMsg('Error after updating the Lab Request')
        })
    } else {
      setOpenNotification(true)
      setErrorMsg('Enter the sample ID')
    }
    setisFormSubmitted(true)
  }

  const validateForm = () => {
    return sampleId && sampleId.length > 0
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onSlipUpload = (event) => {
    event.preventDefault()
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
      } else if (fileType === 'PDF') {
        setpdfView(file.name)
      } else if (fileType === 'png') {
        setImagePreview([reader.result])
      } else if (fileType === 'PNG') {
        setImagePreview([reader.result])
      } else if (fileType === 'jpeg') {
        setImagePreview([reader.result])
      } else if (fileType === 'JPEG') {
        setImagePreview([reader.result])
      } else if (fileType === 'jpg') {
        setImagePreview([reader.result])
      } else if (fileType === 'JPG') {
        setImagePreview([reader.result])
      } else if (fileType === 'rtf') {
        setImagePreview([reader.result])
      } else if (fileType === 'RTF') {
        setImagePreview([reader.result])
      } else {
        setErrorMsg('only pdf, jpeg, png and rtf should be allowed')
        setOpenNotification(true)
      }
    }
    if (statusOnResult === 'pending') {
      setStatusOnResult('completed')
      setStatusOnResultStatus(true)
    } else if (statusOnResult === 'active') {
      setStatusOnResult('completed')
      setStatusOnResultStatus(true)
    } else {
      setStatusOnResult('completed')
      setStatusOnResultStatus(true)
    }

    console.log('====================================')
    console.log(
      `params status: ${status} ${statusOnResult} ${statusOnResultStatus}`
    )
    console.log('====================================')
  }

  const removeUploadedSlip = () => {
    console.log('Slip ..... ', slipUpload)

    var fileType = slipUpload.name.slice(slipUpload.name.length - 3)

    // console.log("Selected file : ", file.name)
    // console.log("file type : ", fileType)

    setSlipUpload('')

    if (fileType === 'pdf') {
      setpdfView('')
    } else if (fileType === 'PDF') {
      setpdfView('')
    } else if (fileType === 'png') {
      setImagePreview('')
    } else if (fileType === 'PNG') {
      setImagePreview('')
    } else if (fileType === 'jpeg') {
      setImagePreview('')
    } else if (fileType === 'JPEG') {
      setImagePreview('')
    } else if (fileType === 'jpg') {
      setImagePreview('')
    } else if (fileType === 'JPG') {
      setImagePreview('')
    } else if (fileType === 'rtf') {
      setImagePreview('')
    } else if (fileType === 'RTF') {
      setImagePreview('')
    } else {
      setErrorMsg('Cannot remove file')
      setOpenNotification(true)
    }
  }

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
          <div className='subheader' style={{ marginLeft: '-8px' }}>
            <div>
              <img src={business_Unit} />
              <h4>OPR - Lab Service</h4>
            </div>
          </div>

          <div
            style={{
              height: '20px',
            }}
          />

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className={`container-fluid ${classes.root}`}
          >
            <div className={classesForTabs.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor='primary'
                TabIndicatorProps={{ style: { background: '#12387a' } }}
                centered
              >
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 5,
                    outline: 'none',
                    color: value === 0 ? '#12387a' : '#3B988C',
                  }}
                  label='Sample Collection'
                />
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 5,
                    outline: 'none',
                    color: value === 1 ? '#12387a' : '#3B988C',
                  }}
                  label='Results'
                />
              </Tabs>
            </div>
            {value === 0 ? (
              <>
                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label='Lab Test Name'
                      name={'serviceName'}
                      value={serviceName}
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

                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        required
                        disabled={true}
                        inputVariant='filled'
                        fullWidth={true}
                        label='Date/Time'
                        format='dd - MM - yyyy HH:mm'
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }}
                        style={{ borderRadius: '10px' }}
                        value={date}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      // disabled={true}
                      disabled={checkStatus === 'completed' ? true : false}
                      error={!validateForm() && isFormSubmitted}
                      variant='filled'
                      label='Sample ID'
                      name={'sampleId'}
                      value={sampleId}
                      type='text'
                      className='textInputStyle'
                      onChange={onChangeValue}
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
                    className='col-md-162 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label='Comments/Notes'
                      name={'comments'}
                      value={comments}
                      // onChange={onChangeValue}
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

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <CurrencyTextField
                      disabled
                      label='Price'
                      name={'price'}
                      value={price}
                      // error={price === '' && paymentForm}
                      // onChange={onChangeValue}
                      // type='number'
                      onBlur={onChangeValue}
                      className='textInputStyle'
                      variant='filled'
                      textAlign='left'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      currencySymbol='JD'
                      outputFormat='number'
                    />
                  </div>
                  <div
                    className='col-md-6 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      fullWidth
                      select
                      disabled={checkStatus === 'completed' ? true : false}
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
                  </div>
                </div>
              </>
            ) : value === 1 ? (
              <>
                <div className='row'>
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
                        onChange={
                          checkStatus === 'completed'
                            ? (e) => {
                                e.preventDefault()
                                setErrorMsg('Request is already completed')
                                setOpenNotification(true)
                              }
                            : onSlipUpload
                        }
                        name='results'
                        Error={errorMsg}
                      />
                      <FaUpload /> Results
                    </label>

                    {pdfView !== '' ? (
                      <div
                        className='row'
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            color: '#2c6ddd',
                            fontStyle: 'italic',
                          }}
                        >
                          <span style={{ color: 'black' }}>
                            Selected File :{' '}
                          </span>
                          {pdfView}
                        </div>
                        <div>
                          <a
                            onClick={removeUploadedSlip}
                            style={{ marginLeft: '25px', color: '#e877a1' }}
                            href=''
                          >
                            <MdRemoveCircle /> Remove
                          </a>
                        </div>
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
                          <Button
                            href={uploadsUrl + results.split('\\')[1]}
                            style={{ color: '#2c6ddd' }}
                          >
                            Click here to open results
                          </Button>
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
                          <Button
                            href={uploadsUrl + results}
                            style={{ color: '#2c6ddd' }}
                          >
                            Click here to open results
                          </Button>
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
                      <div className='row'>
                        <div className='col-md-4 col-sm-5 col-5'>
                          <Button
                            onClick={removeUploadedSlip}
                            style={{
                              ...styles.stylesForButton,
                              backgroundColor: '#e877a1',
                            }}
                            variant='contained'
                            color='primary'
                          >
                            <MdRemoveCircle size='16px' />
                            <strong
                              style={{ marginLeft: '5px', fontSize: '13px' }}
                            >
                              Remove
                            </strong>
                          </Button>
                        </div>
                        {results !== '' ? (
                          <div
                            className='col-md-4 col-sm-5 col-5'
                            style={{
                              marginTop: '10px',
                              fontWeight: '500',
                              color: 'gray',
                              textAlign: 'center',
                            }}
                          >
                            New results
                          </div>
                        ) : (
                          undefined
                        )}
                      </div>
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
              </>
            ) : (
              undefined
            )}
            <div
              className='row'
              style={{ marginBottom: '25px', marginTop: '25px' }}
            >
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: 'pointer',
                    marginLeft: '-10px',
                  }}
                />
              </div>
              <div
                className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                style={{ paddingRight: '5px' }}
              >
                <Button
                  disabled={checkStatus === 'completed' ? true : false}
                  onClick={saveLabReq}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Update</strong>
                </Button>
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
