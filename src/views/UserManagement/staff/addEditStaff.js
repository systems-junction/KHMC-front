/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import tableStyles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import cookie from 'react-cookies';
import Dialog from '@material-ui/core/Dialog';
import { addStaffUrl, updateStaffTUrl } from '../../../public/endpoins';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};
const useStyles = makeStyles(tableStyles);

const statues = [
  {
    key: 'active',
    value: 'Active'
  },
  {
    key: 'in_active',
    value: 'In Active'
  }
];

function AddEditStaff(props) {
  const classes = useStyles();
  const initialState = {
    _id: '',
    staffTypeId: '',
    firstName: '',
    lastName: '',
    timeStamp: '',
    designation: '',
    email: '',
    password: '',
    contactNumber: '',
    identificationNumber: '',
    gender: '',
    dob: '',
    address: '',
    createdBySystemAdminStaffId: '',
    status: ''
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    _id,
    staffTypeId,
    firstName,
    lastName,
    timeStamp,
    designation,
    email,
    password,
    contactNumber,
    identificationNumber,
    gender,
    dob,
    address,
    createdBySystemAdminStaffId,
    status
  } = state;

  const [comingFor, setcomingFor] = useState('');

  const [currentUser, setCurrentUser] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  const [systemAdminArray, setSystemAdminArray] = useState('');

  const [staffTypeArray, setStaffTypesArray] = useState('');

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));
    setcomingFor(props.history.location.state.comingFor);
    setSystemAdminArray(props.history.location.state.systemAdminArray);
    setStaffTypesArray(props.history.location.state.staffTypeArray);

    const selectedRec = props.history.location.state.selectedItem;

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id });
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
  }, []);

  function onChangeDate(value, type) {
    dispatch({ field: type, value });
  }

  function validateForm() {
    return (
      firstName &&
      firstName.length > 0 &&
      (lastName && lastName.length > 0) &&
      (staffTypeId && staffTypeId.length > 0) &&
      timeStamp !== '' &&
      (designation && designation.length > 0) &&
      (email && email.length > 0) &&
      (password && password.length >= 6) &&
      (contactNumber && contactNumber.length > 0) &&
      (identificationNumber && identificationNumber.length > 0) &&
      (gender && gender.length > 0) &&
      dob !== '' &&
      (status && status.length > 0)
    );
  }

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        staffTypeId,
        firstName,
        lastName,
        timeStamp,
        designation,
        email,
        password,
        contactNumber,
        identificationNumber,
        gender,
        dob,
        address,
        createdBySystemAdminStaffId,
        status
      };
      axios
        .post(addStaffUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after adding purchase request', e);
          setOpenNotification(true);
          setErrorMsg('Error while adding the purchase request');
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        staffTypeId,
        firstName,
        lastName,
        timeStamp,
        designation,
        email,
        password,
        contactNumber,
        identificationNumber,
        gender,
        dob,
        address,
        createdBySystemAdminStaffId,
        status
      };
      axios
        .put(updateStaffTUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after updating purchase request', e);
          setOpenNotification(true);
          setErrorMsg('Error while editing the purchase request');
        });
    }
  };

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg('');
    }, 2000);
  }

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>
      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            variant="outlined"
            value={firstName}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            variant="outlined"
            value={lastName}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="dob-label">Date of Birth</InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={val => onChangeDate(val, 'dob')}
              fullWidth
              value={comingFor === 'add' ? (dob ? dob : new Date()) : dob}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="timeStamp-label">Time Stamp</InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={val => onChangeDate(val, 'timeStamp')}
              fullWidth
              value={
                comingFor === 'add'
                  ? timeStamp
                    ? timeStamp
                    : new Date()
                  : timeStamp
              }
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="vendorId-label">Created By</InputLabel>
          <Select
            fullWidth
            id="createdBySystemAdminStaffId"
            name="createdBySystemAdminStaffId"
            value={createdBySystemAdminStaffId}
            onChange={onChangeValue}
            label="Created By"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {systemAdminArray &&
              systemAdminArray.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.username}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="status-label">Staff Type</InputLabel>
          <Select
            fullWidth
            id="staffTypeId"
            name="staffTypeId"
            value={staffTypeId}
            onChange={onChangeValue}
            label="Staff Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {staffTypeArray &&
              staffTypeArray.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.type}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            fullWidth
            id="status"
            name="status"
            value={status}
            onChange={onChangeValue}
            label="Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {statues &&
              statues.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-4">
          <TextField
            fullWidth
            name="identificationNumber"
            label="ID Number"
            type="number"
            variant="outlined"
            value={identificationNumber}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4">
          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4">
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6">
          <TextField
            fullWidth
            name="designation"
            label="Designation"
            type="text"
            variant="outlined"
            value={designation}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6">
          <TextField
            fullWidth
            name="contactNumber"
            label="Contact Number"
            type="number"
            variant="outlined"
            value={contactNumber}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6">
          <TextField
            fullWidth
            name="address"
            label="Address"
            type="text"
            variant="outlined"
            value={address}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6">
          <TextField
            fullWidth
            name="gender"
            label="Gender"
            type="text"
            variant="outlined"
            value={gender}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={styles.inputContainer}>
          <Button onClick={handleCancel} variant="contained">
            Cancel
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '2%'
          }}
        >
          {comingFor === 'add' ? (
            <Button
              style={{ paddingLeft: 30, paddingRight: 30 }}
              disabled={!validateForm()}
              onClick={handleAdd}
              variant="contained"
              color="primary"
            >
              {' '}
              Add{' '}
            </Button>
          ) : (
            <Button
              style={{ paddingLeft: 30, paddingRight: 30 }}
              disabled={!validateForm()}
              onClick={handleEdit}
              variant="contained"
              color="primary"
            >
              {' '}
              Edit{' '}
            </Button>
          )}
        </div>
      </div>

      <Notification msg={errorMsg} open={openNotification} />
    </div>
  );
}
export default AddEditStaff;
