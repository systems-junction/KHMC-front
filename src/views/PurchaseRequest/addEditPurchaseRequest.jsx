/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import tableStyles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import axios from 'axios';
import Notification from 'components/Snackbar/Notification.js';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  addPurchaseRequestUrl,
  updatePurchaseRequestUrl,
  getSearchedItemUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl
} from '../../public/endpoins';

import Paper from '@material-ui/core/Paper';

import cookie from 'react-cookies';

import Chip from '@material-ui/core/Chip';

import Dialog from '@material-ui/core/Dialog';
import { tr } from 'date-fns/locale';

const styles = {
  inputContainer: {
    marginTop: '2%'
  }
};
const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  const classes = useStyles();
  const initialState = {
    _id: '',
    requestNo: '',
    generatedBy: '',
    date: new Date(),
    vendorId: '',
    status: '',
    itemCode: '',
    name: '',
    description: '',
    currentQty: '',
    reqQty: '',
    comments: '',
    vendors: [],
    statues: [],
    items: [],
    selectedRow: ''
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
    requestNo,
    generatedBy,
    date,
    vendorId,
    status,
    itemCode,
    name,
    description,
    currentQty,
    reqQty,
    comments,
    vendors,
    statues,
    items,
    selectedRow
  } = state;

  const onChangeValue = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = value => {
    dispatch({ field: 'date', value });
  };

  function validateForm() {
    return (
      // generatedBy.length > 0 &&
      status && status.length > 0
      // && selectedItemsArray.length > 0
    );
  }

  const [comingFor, setcomingFor] = useState('');
  const [vendorsArray, setVendors] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false);
  const [itemFound, setItem] = useState('');

  const [selectedItemsArray, setSelectedItemsArray] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');

  const [purchaseRequestItems, setPurchaseRequestItems] = useState('');

  const [selectItemToEditId, setSelectItemToEditId] = useState('');

  function getPurchasingRequestItems(_id) {
    axios
      .get(getPurchasingRequestItemUrl + '/' + _id)
      .then(res => {
        if (res.data.success) {
          setPurchaseRequestItems(res.data.data);
        } else if (!res.data.success) {
        }
      })
      .catch(e => {
        console.log('error after adding purchase request', e);
        setOpenNotification(true);
        setErrorMsg('Error while adding the purchase request');
      });
  }

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'));

    setcomingFor(props.history.location.state.comingFor);
    setVendors(props.history.location.state.vendors);

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
    if (props.history.location.state.items) {
      dispatch({ field: 'items', value: props.history.location.state.items });
    }

    if (props.history.location.state.comingFor === 'edit') {
      getPurchasingRequestItems(selectedRec._id);
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        requestNo,
        generatedBy: currentUser.name,
        date: new Date(),
        // vendorId,
        status
        // itemCode,
        // name,
        // description,
        // currentQty,
        // reqQty,
        // comments
      };
      axios
        .post(addPurchaseRequestUrl, params)
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
        requestNo,
        generatedBy,
        date: new Date(),
        // vendorId,
        status
      };
      axios
        .put(updatePurchaseRequestUrl, params)
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

  const handleSearch = e => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedItemUrl + '/' + e.target.value)
        .then(res => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              // console.log(res.data.data.items);
              setItemFoundSuccessfully(true);
              setItem(res.data.data.items);
            } else {
              setItemFoundSuccessfully(false);
              setItem('');
            }
          }
        })
        .catch(e => {
          console.log('error after adding purchase request', e);
          setOpenNotification(true);
          setErrorMsg('Error while adding the purchase request');
        });
    }
  };

  function handleAddItem(i) {
    let found = false;
    for (let i = 0; i < selectedItemsArray.length; i++) {
      if (selectedItemsArray[i].itemCode === i.itemCode) {
        found = true;
        console.log('found');
      }
    }

    if (!found) {
      setDialogOpen(true);
      setSelectedItem(i);

      dispatch({ field: 'itemCode', value: i.itemCode });
      dispatch({ field: 'name', value: i.name });
      dispatch({ field: 'vendorId', value: i.vendorId });

      const obj = {
        itemCode: i.itemCode
      };

      setSelectedItemsArray(pervState => [...pervState, obj]);
      setSearchQuery('');
    }
  }

  function validateItemsForm() {
    return (
      itemCode.length > 0 &&
      description.length > 0 &&
      name.length > 0 &&
      reqQty.length > 0 &&
      currentQty.length > 0 &&
      comments.length > 0
    );
  }

  function hideDialog() {
    setDialogOpen(false);
    setSelectedItem('');
    setSelectItemToEditId('');
  }

  const addSelectedItem = () => {
    if (validateItemsForm()) {
      let params;
      if (_id) {
        params = {
          purchaseRequestId: _id,
          itemCode,
          name,
          vendorId,
          description,
          currentQty,
          reqQty,
          comments
        };
      } else {
        params = {
          itemCode,
          name,
          vendorId,
          description,
          currentQty,
          reqQty,
          comments
        };
      }

      for (let i = 0; i < purchaseRequestItems.length; i++) {
        if (purchaseRequestItems[i].itemCode === params.itemCode) {
          alert('item already added');
          setDialogOpen(false);
          setSelectedItem('');
          return;
        }
      }

      axios
        .post(addPurchasingRequestItemUrl, params)
        .then(res => {
          if (res.data.success) {
            // console.log(res.data.data.purchaseRequestItem);
            //   window.location.reload(false);

            dispatch({
              field: '_id',
              value: res.data.data.purchaseRequestItem.purchaseRequestId
            });

            getPurchasingRequestItems(
              res.data.data.purchaseRequestItem.purchaseRequestId
            );

            setDialogOpen(false);
            setSelectedItem('');
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

  function selectedItemToEdit(i) {
    setSelectItemToEditId(i._id);
    dispatch({ field: 'description', value: i.description });
    dispatch({ field: 'currentQty', value: i.currentQty });
    dispatch({ field: 'comments', value: i.comments });
    dispatch({ field: 'reqQty', value: i.reqQty });
    dispatch({ field: 'name', value: i.name });
    dispatch({ field: 'itemCode', value: i.itemCode });
    dispatch({ field: 'vendorId', value: i.vendorId });
    setDialogOpen(true);
  }

  const editSelectedItem = () => {
    if (validateItemsForm()) {
      const params = {
        _id: selectItemToEditId,
        purchaseRequestId: _id,
        itemCode,
        vendorId,
        name,
        description,
        currentQty,
        reqQty,
        comments
      };

      axios
        .put(updatePurchasingRequestItemUrl, params)
        .then(res => {
          if (res.data.success) {
            dispatch({ field: 'description', value: '' });
            dispatch({ field: 'currentQty', value: '' });
            dispatch({ field: 'comments', value: '' });
            dispatch({ field: 'reqQty', value: '' });
            dispatch({ field: 'name', value: '' });
            dispatch({ field: 'itemCode', value: '' });
            setDialogOpen(false);
            setSelectedItem('');
            setSelectItemToEditId('');
            // window.location.reload(false);
            getPurchasingRequestItems(_id);
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

  return (
    <div className="container">
      <h1>
        <span> {comingFor === 'add' ? 'Add' : 'Edit'}</span>
      </h1>
      <div className="row">
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            requestNo="requestNo"
            label="Request No"
            type="text"
            variant="outlined"
            disabled={true}
            value={requestNo}
            onChange={onChangeValue}
            error={!requestNo && isFormSubmitted}
          />
        </div>
        <div className="col-md-6" style={styles.inputContainer}>
          <TextField
            fullWidth
            name="generatedBy"
            label="Generated By"
            type="text"
            variant="outlined"
            disabled={true}
            value={
              comingFor === 'add'
                ? currentUser
                  ? currentUser.name
                  : ''
                : generatedBy
            }
            onChange={onChangeValue}
            error={!generatedBy && isFormSubmitted}
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
              // value={date}
              disabled={true}
              value={comingFor === 'add' ? new Date() : date}
            />
          </MuiPickersUtilsProvider>
        </div>
        {/* <div className="col-md-4" style={styles.inputContainer}>
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
        </div> */}
        <div className="col-md-6" style={styles.inputContainer}>
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
        <div className="col-md-12">
          <TextField
            fullWidth
            name="searchQuery"
            label="Search Items by name or code"
            type="search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            // error={!generatedBy && isFormSubmitted}
          />
        </div>
      </div>

      {searchQuery ? (
        // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
        <div style={{ zIndex: 3 }}>
          <Paper>
            {itemFoundSuccessfull ? (
              itemFound && (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Item Code</TableCell>
                      <TableCell>Puschase Price</TableCell>
                      <TableCell align="center">Description</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {itemFound.map((i, index) => {
                      return (
                        <TableRow
                          key={i.itemCode}
                          onClick={() => handleAddItem(i)}
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell>{i.name}</TableCell>
                          <TableCell>{i.itemCode}</TableCell>
                          <TableCell>{i.purchasePrice}</TableCell>
                          <TableCell>{i.description}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )
            ) : (
              <h4
                style={{ textAlign: 'center' }}
                onClick={() => console.log('ddf')}
              >
                Item Not Found
              </h4>
            )}
          </Paper>
        </div>
      ) : (
        undefined
      )}

      <div style={{ marginTop: 10 }}>
        {purchaseRequestItems.length > 0
          ? purchaseRequestItems.map(i => {
              return (
                <Chip
                  key={i.name}
                  style={{ marginLeft: 15 }}
                  size='large'
                  label={i.name}
                  clickable
                  color="primary"
                  onClick={() => selectedItemToEdit(i)}
                />
              );
            })
          : undefined}
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

      <Dialog
        aria-labelledby="form-dialog-title"
        open={dialogOpen}
        maxWidth='md'
        fullWidth={true}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6" style={styles.inputContainer}>
              <TextField
                fullWidth
                name="itemCode"
                label="Item Code"
                disabled={true}
                type="text"
                variant="outlined"
                value={itemCode}
                onChange={onChangeValue}
              />
            </div>
            <div className="col-md-6" style={styles.inputContainer}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                disabled={true}
                type="text"
                variant="outlined"
                value={name}
                onChange={onChangeValue}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6" style={styles.inputContainer}>
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
            <div className="col-md-6" style={styles.inputContainer}>
              <TextField
                fullWidth
                id="currentQty"
                name="currentQty"
                label="Current Qty"
                type="number"
                variant="outlined"
                value={currentQty}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChangeValue}
              />
            </div>
          </div>

          <div className="row" style={{ paddingBottom: 20 }}>
            <div className="col-md-6" style={styles.inputContainer}>
              <TextField
                fullWidth
                name="comments"
                label="Notes/Comments"
                type="text"
                variant="outlined"
                value={comments}
                onChange={onChangeValue}
              />
            </div>

            <div className="col-md-6" style={styles.inputContainer}>
              <TextField
                fullWidth
                name="reqQty"
                label="Req Qty"
                type="number"
                variant="outlined"
                value={reqQty}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChangeValue}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={styles.inputContainer}>
              <Button onClick={() => hideDialog()} variant="contained">
                Cancel
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '2%',
                marginBottom: '2%'
              }}
            >
              {selectItemToEditId === '' ? (
                <Button
                  style={{ paddingLeft: 30, paddingRight: 30 }}
                  disabled={!validateItemsForm()}
                  onClick={addSelectedItem}
                  variant="contained"
                  color="primary"
                >
                  Add Item
                </Button>
              ) : (
                <Button
                  style={{ paddingLeft: 30, paddingRight: 30 }}
                  disabled={!validateItemsForm()}
                  onClick={editSelectedItem}
                  variant="contained"
                  color="primary"
                >
                  {' '}
                  Edit{' '}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default AddEditPurchaseRequest;
