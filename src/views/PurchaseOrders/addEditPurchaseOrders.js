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
  addPurchaseOrderUrl,
  getPurchasingRequestItemUrl,
  getShippingTermUrl,
  updatePurchaseOrderUrl
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
    purchaseOrderNo: '',
    generated: '',
    paymentTerm: '',
    shippingTerm: '',

    date: new Date(),
    vendorId: '',
    status: '',
    name: '',
    description: '',
    comments: '',
    vendors: [],
    statues: [],
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
    purchaseOrderNo,
    generated,
    paymentTerm,
    shippingTerm,

    date,
    vendorId,
    status,
    vendors,
    statues
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = value => {
    dispatch({ field: 'date', value });
  };

  function validateForm() {
    return (
      vendorId.length > 0 &&
      status.length > 0 &&
      shippingTerm.length > 0 &&
      paymentTerm.length > 0 &&
      generated.length > 0
    );
  }

  const [comingFor, setcomingFor] = useState('');

  const [vendorsArray, setVendors] = useState('');

  const [generatedArray, setGeneratedArray] = useState('');

  const [paymentTermsArray, setPaymentTermsArray] = useState('');

  const [shippingTerms, setShippingTerms] = useState('');

  const [currentUser, setCurrentUser] = useState('');

  const [vendor, setVendor] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));

    setcomingFor(props.history.location.state.comingFor);

    setVendors(props.history.location.state.vendors);

    setGeneratedArray(props.history.location.state.generatedArray);

    setPaymentTermsArray(props.history.location.state.paymentTerms);

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
      let v;

      for (let i = 0; i < vendorsArray.length; i++) {
        if (vendorsArray[i]._id === vendorId) {
          v = vendorsArray[i];
        }
      }

      let params = {
        vendorId,
        status,
        paymentTerm,
        generated,
        shippingTerm,
        date: new Date(),
        vendorEmail: v.contactEmail,
        vendorPhoneNo: v.telephone1,
        vendorAddress: v.address
      };
      axios
        .post(addPurchaseOrderUrl, params)
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
      let v;

      for (let i = 0; i < vendorsArray.length; i++) {
        if (vendorsArray[i]._id === vendorId) {
          v = vendorsArray[i];
        }
      }

      let params = {
        _id,
        vendorId,
        status,
        paymentTerm,
        generated,
        shippingTerm,
        date: new Date(),
        vendorEmail: v.contactEmail,
        vendorPhoneNo: v.telephone1,
        vendorAddress: v.address
      };
      axios
        .put(updatePurchaseOrderUrl, params)
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

  const getShippingTerms = () => {
    axios
      .get(getShippingTermUrl + '/' + vendorId)
      .then(res => {
        if (res.data.success) {
          // props.history.goBack();
          console.log(res.data.data.shippingTerm);
          setShippingTerms(res.data.data.shippingTerm);
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch(e => {
        console.log('error after adding purchase request', e);
        setOpenNotification(true);
        setErrorMsg('Error while adding the purchase request');
      });
  };

  if (vendorId !== '' && shippingTerms === '') {
    getShippingTerms();
  }

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>
      <div className="row">
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="purchaseOrderNo"
            label="PO No"
            type="text"
            variant="outlined"
            disabled={true}
            value={purchaseOrderNo}
            onChange={onChangeValue}
            error={!purchaseOrderNo && isFormSubmitted}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <DateTimePicker
              inputVariant="outlined"
              onChange={onChangeDate}
              fullWidth
              // value={date}
              disabled={true}
              value={comingFor === 'add' ? DATE : date}
            /> */}
            <DatePicker
              //   openTo="year"
              inputVariant="outlined"
              disabled={true}
              format="dd/MM/yyyy"
              label="Select Date"
              views={['year', 'month', 'date']}
              value={comingFor === 'add' ? DATE : date}
              onChange={onChangeDate}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              inputVariant="outlined"
              fullWidth={true}
              autoOk
              label="Select time"
              onChange={onChangeDate}
              disabled={true}
              value={comingFor === 'add' ? DATE : date}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="generated-label">Generated</InputLabel>
          <Select
            fullWidth
            id="generated"
            name="generated"
            value={generated}
            onChange={onChangeValue}
            label="Generated"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {generatedArray &&
              generatedArray.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
                  </MenuItem>
                );
              })}
          </Select>
        </div>

        <div className="col-md-4" style={styles.inputContainer}>
          <InputLabel id="Payment-label">Payment Terms</InputLabel>
          <Select
            fullWidth
            id="paymentTerm"
            name="paymentTerm"
            value={paymentTerm}
            onChange={onChangeValue}
            label="Payment Terms"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {paymentTermsArray &&
              paymentTermsArray.map(val => {
                return (
                  <MenuItem key={val.key} value={val.key}>
                    {val.value}
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
            {statues.map(val => {
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

        <div className="col-md-6" style={styles.inputContainer}>
          <InputLabel id="shippingTerms-label">Shipping Terms</InputLabel>
          <Select
            fullWidth
            id="shippingTerm"
            name="shippingTerm"
            value={shippingTerm}
            onChange={onChangeValue}
            label="Shipping Term"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {shippingTerms &&
              shippingTerms.map(val => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.description}
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
