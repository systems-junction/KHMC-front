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
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from '@material-ui/pickers';
import {
  addMaterialReceivingUrl,
  updateMaterialReceivingUrl
} from '../../public/endpoins';

import cookie from 'react-cookies';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};
const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

  const initialState = {
    _id: '',
    itemCode: '',
    itemName: '',
    prId: '',
    poId: '',
    vendorId: '',
    status: '',
    poSentDate: ''
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
    itemCode,
    itemName,
    prId,
    poId,
    vendorId,
    status,
    poSentDate
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = value => {
    dispatch({ field: 'poSentDate', value });
  };

  function validateForm() {
    return (
      vendorId.length > 0 &&
      status.length > 0 &&
      poId.length > 0 &&
      prId.length > 0 &&
      itemName.length > 0 &&
      itemCode.length > 0 &&
      poSentDate !== ''
    );
  }

  const [comingFor, setcomingFor] = useState('');

  const [vendorsArray, setVendors] = useState('');

  const [statues, setStatusArray] = useState('');

  const [purchaseRequests, setPurchaseRequests] = useState('');

  const [purchaseOrders, setPurchaseOrders] = useState('');

  const [currentUser, setCurrentUser] = useState('');

  const [vendor, setVendor] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setStatusArray(props.history.location.state.statues);

    setPurchaseRequests(props.history.location.state.purchaseRequests);

    setPurchaseOrders(props.history.location.state.purchaseOrders);

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
    if (props.history.location.state.vendors) {
      dispatch({
        field: 'vendors',
        value: props.history.location.state.vendors
      });
    }
    if (props.history.location.state.statues) {
      dispatch({
        field: 'statues',
        value: props.history.location.state.statues
      });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    if (validateForm()) {
      let params = {
        itemCode,
        itemName,
        prId,
        poId,
        vendorId,
        status,
        poSentDate
      };

      axios
        .post(addMaterialReceivingUrl, params)
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
      let params = {
        _id,
        itemCode,
        itemName,
        prId,
        poId,
        vendorId,
        status,
        poSentDate
      };
      axios
        .put(updateMaterialReceivingUrl, params)
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
            name="itemName"
            label="Item Name"
            type="text"
            variant="outlined"
            value={itemName}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="itemCode"
            label="Item Code"
            type="number"
            variant="outlined"
            value={itemCode}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              onChange={onChangeDate}
              fullWidth
              value={
                comingFor === 'add'
                  ? poSentDate
                    ? poSentDate
                    : new Date()
                  : poSentDate
              }
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="generated-label">Purchase Orders</InputLabel>
          <Select
            fullWidth
            id="poId"
            name="poId"
            value={poId}
            onChange={onChangeValue}
            label="PurchaseOrder"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {purchaseOrders &&
              purchaseOrders.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.generated}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="generated-label">Purchase Requests</InputLabel>
          <Select
            fullWidth
            id="prId"
            name="prId"
            value={prId}
            onChange={onChangeValue}
            label="Purchase Request"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {purchaseRequests &&
              purchaseRequests.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.generatedBy}
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
                  <MenuItem key={val.key} value={val.value}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="vendorId-label">Vendor</InputLabel>
          <Select
            fullWidth
            id="vendorId"
            name="vendorId"
            value={vendorId}
            onChange={onChangeValue}
            label="Vendor"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {vendorsArray &&
              vendorsArray.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.englishName}
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
export default AddEditPurchaseRequest;
