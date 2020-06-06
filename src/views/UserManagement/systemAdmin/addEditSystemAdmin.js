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
import cookie from 'react-cookies';
import {
  addSystemAdminUrl,
  updateSystemAdminUrl
} from '../../../public/endpoins';
import validateEmail from '../../../public/emailValidator';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};
const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function AddEditSystemAdmin(props) {
  const classes = useStyles();

  const initialState = {
    _id: '',
    username: '',
    password: '',
    staffTypeId: '5ec138f621374a760fd0a23d'
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { _id, username, password, staffTypeId} = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
  
    return (
      username.length > 0 && (password && password.length >= 6) && validateEmail(username)
    );
  }

  const [comingFor, setcomingFor] = useState('');

  const [systemAdminArray, setSystemAdminArray] = useState('');

  const [currentUser, setCurrentUser] = useState('');
  const [staffTypeArray, setStaffTypesArray] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));
    setcomingFor(props.history.location.state.comingFor);
    setSystemAdminArray(props.history.location.state.systemAdmin);
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

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    if (validateForm()) {
      const params = {
        username,
        password,
        staffTypeId
      };
      axios
        .post(addSystemAdminUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after adding staff type', e);
          setOpenNotification(true);
          setErrorMsg('Error while adding the staff type');
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        username,
        password,
        staffTypeId,
        updatedAt: new Date()
      };
      axios
        .put(updateSystemAdminUrl, params)
        .then(res => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch(e => {
          console.log('error after updating staff type', e);
          setOpenNotification(true);
          setErrorMsg('Error while editing the staff type');
        });
    }
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

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-4" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="username"
            label="User Name"
            type="email"
            variant="outlined"
            value={username}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
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

        <div className="col-md-4" style={styles.inputContainer}>
            <InputLabel id="staff_type_label">Staff Type</InputLabel>
            <Select
              fullWidth
              id="staffTypeId"
              name="staffTypeId"
              value={staffTypeId}
              onChange={onChangeValue}
              label="Staff Type"
              disabled={true}
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
export default AddEditSystemAdmin;
