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
  addReceiveItemsUrl,
  updateReceiveItemsUrl
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

function ReceiveItems(props) {
  const classes = useStyles();

  const initialState = {
    _id: '',
    itemCode: '',
    itemName: '',
    currentQty: '',
    requiredQty: '',
    receivedQty: '',
    bonusQty: '',
    batchNumber: '',
    unit: '',
    discount: '',
    uniyDiscount: '',
    discountAmount: '',
    tax: '',
    taxAmount: '',
    finalUnitPrice: '',
    subTotal: '',
    totalPrice: '',
    invoice: '',
    date: '',
    comments: '',
    expiryDate: '',
    discountPercentage: ''
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
    currentQty,
    requiredQty,
    receivedQty,
    bonusQty,
    batchNumber,
    unit,
    discount,
    uniyDiscount,
    discountAmount,
    tax,
    taxAmount,
    finalUnitPrice,
    subTotal,
    totalPrice,
    invoice,
    date,
    comments,
    expiryDate,
    discountPercentage
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function onChangeDate(value, type) {
    dispatch({ field: type, value });
  }

  function validateForm() {
    return (
      itemCode.length > 0 &&
      itemName.length > 0 &&
      currentQty.length > 0 &&
      requiredQty.length > 0 &&
      receivedQty.length > 0 &&
      bonusQty.length > 0 &&
      batchNumber.length > 0 &&
      unit.length > 0 &&
      discount.length > 0 &&
      uniyDiscount.length > 0 &&
      discountAmount.length > 0 &&
      tax.length > 0 &&
      taxAmount.length > 0 &&
      finalUnitPrice.length > 0 &&
      subTotal.length > 0 &&
      totalPrice.length > 0 &&
      invoice.length > 0 &&
      date.length > 0 &&
      comments.length > 0
      // expiryDate.length > 0
      // discountPercentage.length > 0
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
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    if (validateForm()) {
      let params = {
        itemCode,
        itemName,
        currentQty,
        requiredQty,
        receivedQty,
        bonusQty,
        batchNumber,
        unit,
        discount,
        uniyDiscount,
        discountAmount,
        tax,
        taxAmount,
        finalUnitPrice,
        subTotal,
        totalPrice,
        invoice,
        date,
        comments,
        expiryDate,
        discountPercentage
      };
      axios
        .post(addReceiveItemsUrl, params)
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
        currentQty,
        requiredQty,
        receivedQty,
        bonusQty,
        batchNumber,
        unit,
        discount,
        uniyDiscount,
        discountAmount,
        tax,
        taxAmount,
        finalUnitPrice,
        subTotal,
        totalPrice,
        invoice,
        date,
        comments,
        expiryDate,
        discountPercentage
      };
      axios
        .put(updateReceiveItemsUrl, params)
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
            name="itemCode"
            label="Item Code"
            type="number"
            variant="outlined"
            value={itemCode}
            onChange={onChangeValue}
          />
        </div>
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
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="currentQty"
            label="Current Qty"
            type="number"
            variant="outlined"
            value={currentQty}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="requiredQty"
            label="Required Qty"
            type="number"
            variant="outlined"
            value={requiredQty}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="receivedQty"
            label="Received Qty"
            type="number"
            variant="outlined"
            value={receivedQty}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="bonusQty"
            label="Bonus Qty"
            type="number"
            variant="outlined"
            value={bonusQty}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="batchNumber"
            label="Batch No"
            type="number"
            variant="outlined"
            value={batchNumber}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              inputVariant="outlined"
              fullWidth={true}
              format="dd/MM/yyyy"
              label="Expiry Date"
              onChange={val => onChangeDate(val, 'expiryDate')}
              value={
                comingFor === 'add'
                  ? expiryDate
                    ? expiryDate
                    : new Date()
                  : expiryDate
              }
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="unit"
            label="Unit"
            type="text"
            variant="outlined"
            value={unit}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="discount"
            label="Discount"
            type="number"
            variant="outlined"
            value={discount}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="uniyDiscount"
            label="Unit Discount"
            type="text"
            variant="outlined"
            value={uniyDiscount}
            onChange={onChangeValue}
          />
        </div>

        {/* <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="discountAmount"
            label="Discount Amount"
            type="number"
            variant="outlined"
            value={discountAmount}
            onChange={onChangeValue}
          />
        </div> */}
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="tax"
            label="Tax"
            type="number"
            variant="outlined"
            value={tax}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="taxAmount"
            label="Tax Amount"
            type="number"
            variant="outlined"
            value={taxAmount}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="finalUnitPrice"
            label="Final Unit Price"
            type="number"
            variant="outlined"
            value={finalUnitPrice}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="subTotal"
            label="Sub Total"
            type="number"
            variant="outlined"
            value={subTotal}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="discountAmount"
            label="Discunt Amount"
            type="number"
            variant="outlined"
            value={discountAmount}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="totalPrice"
            label="Total Price"
            type="number"
            variant="outlined"
            value={totalPrice}
            onChange={onChangeValue}
          />
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="invoice"
            label="Invoice"
            type="number"
            variant="outlined"
            value={invoice}
            onChange={onChangeValue}
          />
        </div>

        <div className="col-md-6" style={styles.inputContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              inputVariant="outlined"
              fullWidth={true}
              label="Select Date"
              onChange={val => onChangeDate(val, 'date')}
              value={comingFor === 'add' ? (date ? date : new Date()) : date}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>

      <div className="row" style={styles.inputContainer}>
        <div className="col-md-12" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="comments"
            label="Notes"
            type="text"
            variant="outlined"
            value={comments}
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
export default ReceiveItems;
