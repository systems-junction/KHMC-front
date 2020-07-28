/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../../components/Snackbar/Notification.js'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import cookie from 'react-cookies'
import Dialog from '@material-ui/core/Dialog'
import { addStaffUrl, updateStaffTUrl } from '../../../public/endpoins'

import Header from '../../../components/Header/Header'

import View_all from '../../../assets/img/Eye.png'
import business_Unit from '../../../assets/img/business_Unit.png'

import Back_Arrow from '../../../assets/img/Back_Arrow.png'
import './staff.css'

import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   paddingLeft: 5,
  //   paddingRight: 5,
  // },

  // buttonContainer: {
  //   marginTop: 25,
  // },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2c6ddd',
    width: '115px',
    height: '40px',
    outline: 'none',
  },

  inputContainerForTextField: {
    marginTop: 25,
    // backgroundColor: "white",
    // borderRadius: 5,
    // paddingTop: 5,
    // paddingBottom: 10,
    // marginLeft: 5,
    // marginRight: 5,
  },
  stylesForPurchaseButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2c6ddd',
    width: '60%',
    height: '40px',
    outline: 'none',
  },
  inputField: {
    outline: 'none',
  },
  inputContainerForDropDown: {
    marginTop: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    // paddingBottom: 5,
    // marginLeft: 10,
    // marginRight: 50,
  },

  buttonContainer: {
    marginTop: 25,
  },
}
const useStyles = makeStyles(tableStyles)

const statues = [
  {
    key: 'active',
    value: 'Active',
  },
  {
    key: 'in_active',
    value: 'In Active',
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

function AddEditStaff(props) {
  const classes = useStyles()
  const initialState = {
    _id: '',
    staffTypeId: '',
    firstName: '',
    lastName: '',
    designation: '',
    email: '',
    password: '',
    contactNumber: '',
    identificationNumber: '',
    gender: '',
    dob: '',
    address: '',
    systemAdminId: '',
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
    _id,
    staffTypeId,
    firstName,
    lastName,
    designation,
    email,
    password,
    contactNumber,
    identificationNumber,
    gender,
    dob,
    address,
    systemAdminId,
    status,
  } = state

  const [comingFor, setcomingFor] = useState('')

  const [currentUser, setCurrentUser] = useState('')

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

  const [systemAdminArray, setSystemAdminArray] = useState('')

  const [staffTypeArray, setStaffTypesArray] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))
    setcomingFor(props.history.location.state.comingFor)
    setSystemAdminArray(props.history.location.state.systemAdminArray)
    setStaffTypesArray(props.history.location.state.staffTypeArray)

    const selectedRec = props.history.location.state.selectedItem

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

  function onChangeDate(value, type) {
    dispatch({ field: type, value })
  }

  function validateForm() {
    return (
      firstName &&
      firstName.length > 0 &&
      lastName &&
      lastName.length > 0 &&
      staffTypeId &&
      staffTypeId.length > 0 &&
      designation &&
      designation.length > 0 &&
      email &&
      email.length > 0 &&
      password &&
      password.length >= 3 &&
      contactNumber &&
      contactNumber.length > 0 &&
      identificationNumber &&
      identificationNumber.length > 0 &&
      gender &&
      gender.length > 0 &&
      dob !== '' &&
      status &&
      status.length > 0
    )
  }

  const handleCancel = () => {
    props.history.goBack()
  }

  const handleAdd = () => {
    setIsFormSubmitted(true)
    if (validateForm()) {
      const params = {
        staffTypeId,
        firstName,
        lastName,
        designation,
        email,
        password,
        contactNumber,
        identificationNumber,
        gender,
        dob,
        address,
        systemAdminId,
        status,
      }
      axios
        .post(addStaffUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack()
          } else if (!res.data.success) {
            setOpenNotification(true)
          }
        })
        .catch((e) => {
          console.log('error after adding purchase request', e)
          setOpenNotification(true)
          setErrorMsg('Error while adding the purchase request')
        })
    }
  }

  const handleEdit = () => {
    setIsFormSubmitted(true)
    if (validateForm()) {
      const params = {
        _id,
        staffTypeId,
        firstName,
        lastName,
        designation,
        email,
        password,
        contactNumber,
        identificationNumber,
        gender,
        dob,
        address,
        systemAdminId,
        status,
      }
      axios
        .put(updateStaffTUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack()
          } else if (!res.data.success) {
            setOpenNotification(true)
          }
        })
        .catch((e) => {
          console.log('error after updating purchase request', e)
          setOpenNotification(true)
          setErrorMsg('Error while editing the purchase request')
        })
    }
  }

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
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
            <h4>{comingFor === 'add' ? ' Add Staff' : ' Edit Staff'}</h4>
          </div>
          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              <img src={View_all} className='icon-view' />
              &nbsp;&nbsp;
              <strong style={{ fontSize: '12px' }}>View All</strong>
            </Button>
          </div>
        </div>

        <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
          <div className='row'>
            <div className='col-md-6'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                // variant="outlined"
                value={firstName}
                onChange={onChangeValue}
              /> */}
                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='First Name'
                  name={'firstName'}
                  value={firstName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                // variant="outlined"
                value={lastName}
                onChange={onChangeValue}
              /> */}

                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='Last Name'
                  name={'lastName'}
                  value={lastName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div style={styles.inputContainerForTextField}>
                {/* <InputLabel id="dob-label">Date of Birth</InputLabel> */}
                <MuiPickersUtilsProvider className='input' utils={DateFnsUtils}>
                  <DateTimePicker
                    style={styles.inputField}
                    inputVariant='outlined'
                    onChange={(val) => onChangeDate(val, 'dob')}
                    fullWidth
                    style={{ backgroundColor: 'white', marginTop: 10 }}
                    value={comingFor === 'add' ? (dob ? dob : new Date()) : dob}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className='col-md-4'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="address"
                label="Address"
                type="text"
                // variant="outlined"
                value={address}
                onChange={onChangeValue}
              /> */}
                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='Address'
                  name={'address'}
                  value={address}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>

            <div className='col-md-4'>
              <div style={styles.inputContainerForDropDown}>
                {/* <TextField
                fullWidth
                name="gender"
                label="Gender"
                type="text"
                // variant="outlined"
                value={gender}
                onChange={onChangeValue}
              /> */}

                <InputLabel id='gender-label'>Gender</InputLabel>
                <Select
                  style={styles.inputField}
                  fullWidth
                  id='gender'
                  name='gender'
                  value={gender}
                  onChange={onChangeValue}
                  label='Gender'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {genderArray &&
                    genderArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                </Select>
              </div>
            </div>
            {/* <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="timeStamp-label">Time Stamp</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  inputVariant="outlined"
                  onChange={(val) => onChangeDate(val, "timeStamp")}
                  fullWidth
                  value={
                    comingFor === "add"
                      ? timeStamp
                        ? timeStamp
                        : new Date()
                      : timeStamp
                  }
                />
              </MuiPickersUtilsProvider>
            </div>
          </div> */}
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div style={styles.inputContainerForDropDown}>
                <InputLabel id='vendorId-label'>Created By</InputLabel>
                <Select
                  style={styles.inputField}
                  fullWidth
                  id='systemAdminId'
                  name='systemAdminId'
                  value={systemAdminId}
                  onChange={onChangeValue}
                  label='Created By'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {systemAdminArray &&
                    systemAdminArray.map((val) => {
                      return (
                        <MenuItem key={val._id} value={val._id}>
                          {val.username}
                        </MenuItem>
                      )
                    })}
                </Select>
              </div>
            </div>

            <div className='col-md-4'>
              <div style={styles.inputContainerForDropDown}>
                <InputLabel id='status-label'>Staff Type</InputLabel>
                <Select
                  style={styles.inputField}
                  fullWidth
                  id='staffTypeId'
                  name='staffTypeId'
                  value={staffTypeId}
                  onChange={onChangeValue}
                  label='Staff Type'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {staffTypeArray &&
                    staffTypeArray.map((val) => {
                      return (
                        <MenuItem key={val._id} value={val._id}>
                          {val.type}
                        </MenuItem>
                      )
                    })}
                </Select>
              </div>
            </div>

            <div className='col-md-4'>
              <div style={styles.inputContainerForDropDown}>
                <InputLabel id='status-label'>Status</InputLabel>
                <Select
                  style={styles.inputField}
                  fullWidth
                  id='status'
                  name='status'
                  value={status}
                  onChange={onChangeValue}
                  label='Status'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {statues &&
                    statues.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                </Select>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="identificationNumber"
                label="ID Number"
                type="number"
                // variant="outlined"
                value={identificationNumber}
                onChange={onChangeValue}
              /> */}

                <input
                  style={styles.inputField}
                  type='number'
                  placeholder='ID Number'
                  name={'identificationNumber'}
                  value={identificationNumber}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>

            <div className='col-md-4'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                // variant="outlined"
                value={email}
                onChange={onChangeValue}
              /> */}
                <input
                  style={styles.inputField}
                  type='email'
                  placeholder='Email'
                  name={'email'}
                  value={email}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>

            <div className='col-md-4'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                // variant="outlined"
                value={password}
                onChange={onChangeValue}
              /> */}

                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='Password'
                  name={'password'}
                  value={password}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="designation"
                label="Designation"
                type="text"
                // variant="outlined"
                value={designation}
                onChange={onChangeValue}
              /> */}

                <input
                  style={styles.inputField}
                  type='text'
                  placeholder='Designation'
                  name={'designation'}
                  value={designation}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>

            <div className='col-md-6'>
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                fullWidth
                name="contactNumber"
                label="Contact Number"
                type="number"
                // variant="outlined"
                value={contactNumber}
                onChange={onChangeValue}
              /> */}

                <input
                  style={styles.inputField}
                  type='number'
                  placeholder='Contact Number'
                  name={'contactNumber'}
                  value={contactNumber}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            </div>
          </div>

          <div className='row'></div>

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            {/* <div style={styles.buttonContainer}>
            <Button onClick={handleCancel} variant="contained">
              Cancel
            </Button>
          </div> */}

            <div
              style={{
                display: 'flex',
                flex: 1,
                height: 50,
                justifyContent: 'center',
                marginTop: '2%',
                marginBottom: '2%',
              }}
            >
              {comingFor === 'add' ? (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Add Staff</strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Edit Staff</strong>
                </Button>
              )}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 45, height: 35, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddEditStaff
