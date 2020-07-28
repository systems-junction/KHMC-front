import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { FaUpload } from 'react-icons/fa'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import {
  getPatientById,
  getPatientUrl,
  updatePatientUrl,
  addPatientUrl,
  generateEDR
} from '../../public/endpoins'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'
import ButtonField from '../../components/common/Button'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import Add_New from '../../assets/img/Add_New.png'
import AddedPurchaseRequestTable from '../PurchaseOrders/addedPurchaseRequestTable'
import VIewAll from '../../assets/img/view_all.png'
import business_Unit from '../../assets/img/Purchase Order.png'
import BootstrapInput from '../../components/Dropdown/dropDown.js'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import ViewSinglePatient from './viewPatient'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import FormInput from '../../components/common/InputField'
import TextArea from '../../components/common/TextArea'
import DatePicker from '../../components/common/Date'
import DropDown from '../../components/common/DropDown'
import { number } from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormData from 'form-data'

let countriesList = require('../../assets/countries.json')

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
  form: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginTop: '20px',
    padding: '10px',
    textAlign: 'center'
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '10px',
    color: 'gray',
    marginTop: '30px',
    width: '100%',
    height: '45px',
    cursor: 'pointer',
    padding: '10px',
  },
  input:
  {
    display: 'none',
  }
}

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const titles = [
  {
    key: 'normal',
    value: 'Normal',
  },
  {
    key: 'emergency',
    value: 'Emergency',
  },
]

const genderArray = [
  {
    key: 'male',
    value: 'Male',
  },
  {
    key: 'female',
    value: 'Female',
  },
  {
    key: 'others',
    value: 'Others',
  },
]

const coverageTermsArr = [
  {
    key: 'coPayment',
    value: 'Co-Payment',
  },
  {
    key: 'fullPayment',
    value: 'Full Payment',
  },
]

const useStyles = makeStyles(tableStyles)

function AddEditPatientListing(props) {
  const classes = useStyles()
  const initialState = {
    _id: '',
    profileNo: '',
    SIN: '',
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    email: '',
    country: '',
    city: '',
    address: '',
    otherDetails: '',
    depositAmount: '',
    amountReceived: '',
    bankName: '',
    depositorName: '',
    insuranceId: '',
    coverageDetails: '',
    coverageTerms: '',
    payment: '',
    depositSlip: '',
    DateTime: '',
    receiverName: '',
    insuranceNumber: '',
    insuranceVendor: '',
    paymentMethod: ''
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    _id,
    profileNo,
    SIN,
    title,
    firstName,
    lastName,
    gender,
    dob,
    phoneNumber,
    email,
    country,
    city,
    address,
    otherDetails,
    depositAmount,
    amountReceived,
    bankName,
    depositorName,
    insuranceId,
    coverageDetails,
    coverageTerms,
    payment,
    depositSlip,
    DateTime,
    receiverName,
    insuranceNumber,
    insuranceVendor,
    paymentMethod
  } = state

  const onChangeCountry = (e) => {
    if (e.target.value) {
      dispatch({ field: e.target.name, value: e.target.value })
      let cities = Object.entries(countriesList[0])
      for (var x in cities) {
        let arr = cities[x]
        if (arr[0] === e.target.value) {
          console.log('cities', arr[1])
          setCities(arr[1])
        }
      }
    } else {
      dispatch({ field: e.target.name, value: e.target.value })
      dispatch({ field: 'city', value: '' })
      setCities('')
    }
  }

  const classesForTabs = useStylesForTabs()

  const [comingFor, setcomingFor] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  // const [isDisabled, setDisabled] = useState(false)
  const [countries, setCountries] = useState('')
  const [cities, setCities] = useState('')
  const [value, setValue] = React.useState(0)
  const [details, setDetails] = useState('patient')
  const [slipUpload, setSlipUpload] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [editDOB, setEditDOB] = useState('')
  const [patientId, setPatientId] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))
    setcomingFor(props.history.location.state.comingFor)
    setCountries(Object.keys(countriesList[0]))

    const selectedRec = props.history.location.state.selectedItem

    if (selectedRec) {
      console.log("aklda")
      var dob = props.history.location.state.selectedItem.dob
      var date = new Date(dob).toISOString().substr(0, 10);
      setEditDOB(date)
    }

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id })
        } else {
          dispatch({ field: key, value: val })
        }
      })
    }
  }, [])

  // function validatePatientForm() {
  //   return (
  //     identificationNumber &&
  //     identificationNumber.length > 0 &&
  //     title &&
  //     title.length > 0 &&
  //     firstName &&
  //     firstName.length > 0 &&
  //     lastName &&
  //     lastName.length > 0 &&
  //     phoneNumber &&
  //     phoneNumber.length > 0 &&
  //     gender &&
  //     gender.length > 0 &&
  //     email &&
  //     email.length > 0 &&
  //     country &&
  //     country.length > 0 &&
  //     city &&
  //     city.length > 0 &&
  //     address &&
  //     address.length > 0
  //   )
  // }

  // function validateDetailsForm() {
  //   return (
  //     insuranceNumber &&
  //     insuranceNumber.length > 0 &&
  //     insuranceVendor &&
  //     insuranceVendor.length > 0 &&
  //     coverageDetails &&
  //     coverageDetails.length > 0
  //     // coverageTerms &&
  //     // coverageTerms.length > 0 &&
  //     // payment &&
  //     // payment.length > 0
  //   )
  // }

  const handleAdd = () => {
    let formData = new FormData();
    if (slipUpload) {
      formData.append('file', slipUpload, slipUpload.name);
    }
    //if (validatePatientForm()) {
    const params = {
      profileNo,
      SIN,
      title,
      firstName,
      lastName,
      gender,
      dob,
      phoneNumber,
      email,
      country,
      city,
      address,
      otherDetails,
      paymentMethod,
      depositAmount,
      amountReceived,
      receiverName,
      bankName,
      depositorName,
      // insuranceId,
      coverageDetails,
      coverageTerms,
      payment,
      depositSlip,
    }
    formData.append('data', JSON.stringify(params))
    console.log("PARAMSS ", params)
    console.log("DATAAA ", formData)
    axios
      .post(addPatientUrl, formData, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'content-type': 'multipart/form-data',
        }
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'patients data')
          console.log(res.data.data._id, 'patient id')
          setPatientId(res.data.data._id)
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding patient details', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the patient details')
      })
    //}
    setIsFormSubmitted(true)
  }

  const handleEdit = () => {
    let formData = new FormData();
    if (slipUpload) {
      formData.append('file', slipUpload, slipUpload.name);
    }
    //if (validatePatientForm()) {
    const params = {
      _id,
      profileNo,
      SIN,
      title,
      firstName,
      lastName,
      gender,
      dob: editDOB,
      phoneNumber,
      email,
      country,
      city,
      address,
      otherDetails,
      paymentMethod,
      depositAmount,
      amountReceived,
      receiverName,
      bankName,
      depositorName,
      // insuranceId,
      coverageDetails,
      coverageTerms,
      payment,
      depositSlip
    }
    formData.append('data', JSON.stringify(params))
    console.log("PARAMSS ", params)
    console.log("DATAAA ", formData)
    axios
      .put(updatePatientUrl, formData)
      .then((res) => {
        if (res.data.success) {
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after updating patient details', e)
        setOpenNotification(true)
        setErrorMsg('Error while editing the patient details')
      })
    //}
    // setIsFormSubmitted(true)
  }

  const onSlipUpload = event => {
    setSlipUpload(event.target.files[0])

    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImagePreview([reader.result])
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onClick = () => {
    setValue(value + 1)
  }

  // GENERATE EDR
  const handleGenerateEDR = () => {
    const params = {
      patientId
    }
    console.log(params)
    axios
      .post(generateEDR, params, {})
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'response')
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after generating EDR request', e)
        setOpenNotification(true)
        setErrorMsg('Error while generating EDR request')
      })
  }

  // const onChangeValues = (e) => {
  //   if (e.target.value.length === 4) {
  //     axios
  //       .get(getPatientUrl + `/${e.target.value}`)
  //       .then((res) => {
  //         if (res.data.success) {
  //           //setPatient(res.data.data)
  //           console.log(res.data.data[0].firstName, 'patient')
  //           // } else if (!res.data.success) {
  //           //   setErrorMsg(res.data.error)
  //           //   setOpenNotification(true)
  //           dispatch({ field: 'firstName', value: res.data.data[0].firstName })
  //           //dispatch({ field: 'firstName', value: res.data.firstName })
  //           // setDisabled(true)
  //         }

  //         //return res
  //       })
  //       .catch((e) => {
  //         console.log('error: ', e)
  //       })
  //   }
  //   dispatch({ field: e.target.name, value: e.target.value })
  // }

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const onChangeDate = (e) => {
    setEditDOB(e.target.value)
    console.log("AJSDJAS", e.target.value)
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
      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={business_Unit} />
            <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
              <h3 style={{ color: 'white', fontWeight: '700' }}>
                {comingFor === 'add' ? ' Patient Registration' : ' Edit Patient'}
              </h3>
            </div>
          </div>
          <div>
            <ButtonField
              onClick={() => props.history.goBack()}
              name='viewAll'
            />
          </div>
        </div>
        <div style={{ width: 'auto', height: '20px' }} />
        <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='null'
            centered
          >
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 0 ? '#2c6ddd' : undefined,
              }}
              label='Patient Details'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 1 ? '#2c6ddd' : undefined,
              }}
              label='Payment Method'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 15,
                outline: 'none',
                backgroundColor: value === 2 ? '#2c6ddd' : undefined,
              }}
              label='Insurance Details'
            />
          </Tabs>
        </div>
        {value === 0 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row'>
              <div className='col-md-4 col-sm-6'>
                <FormInput
                  placeholder='KHMC Profile No.'
                  name={'profileNo'}
                  value={profileNo}
                  onChange={onChangeValue}
                />
              </div>
              <div className='col-md-4 col-sm-6'>
                <FormInput
                  //disabled={isDisabled}
                  placeholder='SIN (Social Insurance Number)'
                  name={'SIN'}
                  value={SIN}
                  label='SIN (Social Insurance Number)'
                  onChange={onChangeValue}
                />
              </div>
              <div className='col-md-4'>
                <DropDown
                  fullWidth
                  id='title'
                  name='title'
                  label='Title'
                  value={title}
                  onChange={onChangeValue}
                  titles={titles}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                <FormInput
                  placeholder='First Name'
                  name={'firstName'}
                  value={firstName}
                  onChange={(e) => onChangeValue(e)}
                />
              </div>
              <div className='col-md-4 col-sm-4'>
                <FormInput
                  type='text'
                  placeholder='Last Name'
                  name={'lastName'}
                  value={lastName}
                  onChange={(e) => onChangeValue(e)}
                />
              </div>
              <div className='col-md-4 col-sm-4'>
                <DropDown
                  id='gender'
                  name='gender'
                  value={gender}
                  onChange={(e) => onChangeValue(e)}
                  label='Gender'
                  genderArray={genderArray}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                {comingFor === 'add' ? (
                  <FormInput
                    placeholder='Date of birth'
                    name={'dob'}
                    value={dob}
                    onChange={(e) => onChangeValue(e)}
                    type={'date'}
                  />
                ) : (
                    <FormInput
                      placeholder='Date of birth'
                      name={'editDOB'}
                      value={editDOB}
                      onChange={(e) => onChangeDate(e)}
                      type={'date'}
                    />
                  )}
              </div>
              <div className='col-md-4 col-sm-4'>
                <DropDown
                  id='country'
                  name={'country'}
                  value={country}
                  onChange={(e) => onChangeCountry(e)}
                  label='Country'
                  className='dropDownStyle'
                  input={<BootstrapInput />}
                  countries={countries}
                />
              </div>
              <div className='col-md-4 col-sm-4'>
                <DropDown
                  id='city'
                  name={'city'}
                  value={city}
                  onChange={(e) => onChangeValue(e)}
                  label='City'
                  className='dropDownStyle'
                  input={<BootstrapInput />}
                  cities={cities}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 col-sm-6'>
                <FormInput
                  type='text'
                  placeholder='Phone Number'
                  name={'phoneNumber'}
                  value={phoneNumber}
                  onChange={onChangeValue}
                />
              </div>
              <div className='col-md-6 col-sm-6'>
                <FormInput
                  placeholder='Email'
                  name={'email'}
                  value={email}
                  onChange={onChangeValue}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <FormInput
                  placeholder='Address'
                  name={'address'}
                  value={address}
                  onChange={onChangeValue}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <TextArea
                  placeholder='Other Details'
                  name={'otherDetails'}
                  value={otherDetails}
                  onChange={onChangeValue}
                  rows='4'
                />
              </div>
            </div>

            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  //disabled={!validateFormType1()}
                  onClick={onClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
                <div style={{
                  width: '10px',
                  height: 'auto',
                  display: 'inline-block'
                }}
                />
                <Button
                  style={styles.generate}
                  disabled={comingFor === 'add' ? !isFormSubmitted : false}
                  onClick={comingFor === 'add' ? handleGenerateEDR : handleEdit}
                  variant='contained'
                  color='primary'
                >
                  {comingFor === 'add' ? 'Generate EDR' : 'Edit'}
                </Button>
              </div>
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container'
          >
            <div className='row'>
              <div className='col-md-12' style={styles.form}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup row aria-label="payMethod" name="paymentMethod" value={paymentMethod} onChange={(e) => onChangeValue(e)}>
                    <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                    <FormControlLabel value="Insurance" control={<Radio />} label="Insurance" />
                    <FormControlLabel value="WireTransfer" control={<Radio />} label="Wire Transfer" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6 col-sm-6'>
                <DatePicker
                  name='Date/Time'
                  inputVariant={'standard'}
                  onChangeDate={(val) => onChangeValue(val, 'DateTime')}
                  comingFor='add'
                  date={DateTime}
                />
              </div>
              <div className='col-md-6 col-sm-6'>
                <FormInput
                  placeholder='Receiver Name'
                  name={'receiverName'}
                  value={receiverName}
                  onChange={onChangeValue}
                />
              </div>
            </div>

            {paymentMethod === 'Cash' ?
              (
                <div className='row'>
                  <div className='col-md-6 col-sm-6'>
                    <FormInput
                      placeholder='Deposit Amount'
                      name={'depositAmount'}
                      value={depositAmount}
                      onChange={onChangeValue}
                      type={'number'}
                    />
                  </div>
                  <div className='col-md-6 col-sm-6'>
                    <FormInput
                      placeholder='Amount Received'
                      name={'amountReceived'}
                      value={amountReceived}
                      onChange={onChangeValue}
                      type={'number'}
                    />
                  </div>
                </div>
              ) : paymentMethod === 'WireTransfer' ? (
                <div>
                  <div className='row'>
                    <div className='col-md-6 col-sm-6 col-6'>
                      <FormInput
                        placeholder='Bank Name'
                        name={'bankName'}
                        value={bankName}
                        onChange={onChangeValue}
                      />
                    </div>
                    <div className='col-md-6 col-sm-6 col-6'>
                      <FormInput
                        placeholder='Depositor Name'
                        name={'depositorName'}
                        value={depositorName}
                        onChange={onChangeValue}
                      />
                    </div>
                  </div>

                  <div className='row'>
                    {comingFor === 'add' ?
                      (
                        <>
                          <div className='col-md-6 col-sm-6 col-6'>
                            <label style={styles.upload}>
                              <input type="file" style={styles.input} onChange={onSlipUpload} value={depositSlip} name="depositSlip" required />
                              <FaUpload />   Upload Deposit Slip
                        </label>
                          </div>
                          <div className='col-md-6 col-sm-6 col-6'>
                            <img src={imagePreview} className='depositSlipImg' />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                  </div>
                </div>
              ) : (
                  <div>
                  </div>
                )}

            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  onClick={onClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                    </Button>
                <div style={{
                  width: '10px',
                  height: 'auto',
                  display: 'inline-block'
                }}
                />
                {comingFor === 'add' ?
                  (
                    <>
                      <Button
                        style={styles.save}
                        //disabled={!validateFormType1()}
                        onClick={handleAdd}
                        variant='contained'
                        color='default'
                      >
                        Save
                    </Button>
                      <div style={{
                        width: '10px',
                        height: 'auto',
                        display: 'inline-block'
                      }}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                <Button
                  style={styles.generate}
                  //disabled={!validatePatientForm()}
                  disabled={comingFor === 'add' ? !isFormSubmitted : false}
                  onClick={comingFor === 'add' ? handleGenerateEDR : handleEdit}
                  variant='contained'
                  color='primary'
                >
                  {comingFor === 'add' ? 'Generate EDR' : 'Edit'}
                </Button>
              </div>
            </div>
          </div>
        ) :
            (
              <div
                style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                className='container'
              >
                <div className='row'>
                  <div className='col-md-9 col-sm-9 col-6'>
                    <FormInput
                      placeholder='Insurance Number'
                      name={'insuranceNumber'}
                      value={insuranceNumber}
                      onChange={onChangeValue}
                    />
                  </div>
                  <div className='col-md-3 col-sm-3 col-6'>
                    <Button
                      style={{ ...styles.stylesForButton, marginTop: '50px' }}
                      variant='contained'
                      color='primary'
                    >
                      Verify
                </Button>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-12'>
                    <div>
                      <FormInput
                        placeholder='Insurance Vendor'
                        name={'insuranceVendor'}
                        value={insuranceVendor}
                        onChange={onChangeValue}
                      />
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-12'>
                    <TextArea
                      type='text'
                      placeholder='Coverage Details'
                      name={'coverageDetails'}
                      value={coverageDetails}
                      onChange={onChangeValue}
                      rows='4'
                    />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <DropDown
                      id='cls'
                      name='coverageTerms'
                      value={coverageTerms}
                      label='Coverage Terms'
                      onChange={onChangeValue}
                      coverageTermsArr={coverageTermsArr}
                    />
                  </div>

                  <div className='col-md-6'>
                    <DropDown
                      id='cls'
                      id='payment'
                      name='payment'
                      label='Co-Payment %'
                      value={payment}
                      onChange={onChangeValue}
                      coverageTermsArr={coverageTermsArr}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'flex-end',
                      marginTop: '2%',
                      marginBottom: '2%',
                    }}
                  >
                    {comingFor === 'add' ?
                      (
                        <>
                          <Button
                            style={styles.save}
                            //disabled={!validateFormType1()}
                            onClick={handleAdd}
                            variant='contained'
                            color='default'
                          >
                            Save
                          </Button>
                          <div style={{
                            width: '10px',
                            height: 'auto',
                            display: 'inline-block'
                          }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    <Button
                      style={styles.generate}
                      disabled={comingFor === 'add' ? !isFormSubmitted : false}
                      onClick={comingFor === 'add' ? handleGenerateEDR : handleEdit}
                      variant='contained'
                      color='danger'
                    >
                      {comingFor === 'add' ? 'Generate EDR' : 'Edit'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

        <Notification msg={errorMsg} open={openNotification} />

        <div style={{ marginBottom: 20, marginTop: 50 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back_Arrow}
            style={{ width: 45, height: 35, cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  )
}
export default AddEditPatientListing
