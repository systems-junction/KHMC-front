/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import tableStyles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import cookie from 'react-cookies';
import { addStaffTypeUrl, updateStaffTypeUrl } from '../../../public/endpoins';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};
const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function AddEditStaffTypes(props) {
  const classes = useStyles();

  const initialState = {
    _id: '',
    status: '',
    description: '',
    accessLevel: '',
    type: '',
    timeStamp: '',
    createdBySystemAdminStaffId: ''
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
    status,
    description,
    accessLevel,
    type,
    timeStamp,
    createdBySystemAdminStaffId
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function onChangeDate(value, t) {
    dispatch({ field: t, value });
  }

  function validateForm() {
    return (
      status.length > 0 &&
      accessLevel.length > 0 &&
      description.length > 0 &&
      type.length > 0 &&
      timeStamp.length !== ''
    );
  }

  const [comingFor, setcomingFor] = useState('');

  const [systemAdminArray, setSystemAdminArray] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));
    setcomingFor(props.history.location.state.comingFor);

    setSystemAdminArray(props.history.location.state.systemAdminArray);

    for (let i = 0; i < systemAdminArray.length; i++) {
      if (systemAdminArray[i]._id === currentUser._id) {
        dispatch({
          field: 'createdBySystemAdminStaffId',
          value: currentUser._id
        });
      }
    }

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
      let params = {
        type,
        accessLevel,
        description,
        timeStamp,
        status,
        createdBySystemAdminStaffId: currentUser._id
      };
      axios
        .post(addStaffTypeUrl, params)
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
        type,
        accessLevel,
        description,
        timeStamp,
        status,
        createdBySystemAdminStaffId: currentUser._id
      };
      axios
        .put(updateStaffTypeUrl, params)
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

  console.log(createdBySystemAdminStaffId);

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="type"
            label="Type"
            type="text"
            variant="outlined"
            value={type}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="accessLevel"
            label="Access Level"
            type="text"
            variant="outlined"
            value={accessLevel}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="status"
            label="Status"
            type="text"
            variant="outlined"
            value={status}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              fullWidth={true}
              label="Time Stamp"
              onChange={val => onChangeDate(val, 'timeStamp')}
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

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            value={description}
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
export default AddEditStaffTypes;
