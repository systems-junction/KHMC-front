/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import {
  addPurchaseRequestUrl,
  updatePurchaseRequestUrl,
  getSearchedItemUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
  socketUrl,
} from '../../public/endpoins'

import InputLabelComponent from '../../components/InputLabel/inputLabel'

import BootstrapInput from '../../components/Dropdown/dropDown.js'

import ErrorMessage from '../../components/ErrorMessage/errorMessage'

import Paper from '@material-ui/core/Paper'

import cookie from 'react-cookies'

import Chip from '@material-ui/core/Chip'

import Dialog from '@material-ui/core/Dialog'
import { tr } from 'date-fns/locale'

import Header from '../../components/Header/Header'
import view_all from '../../assets/img/Eye.png'
import plus_icon from '../../assets/img/Plus.png'
import purchase_request from '../../assets/img/purchase request.png'
import Back from '../../assets/img/Back_Arrow.png'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import Add_New from '../../assets/img/Add_New.png'

import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

import socketIOClient from 'socket.io-client'

const reasonArray = [
  { key: 'jit', value: 'JIT' },
  { key: 'new_item', value: 'New Item' },
  { key: 'Reactivated Items', value: 'Reactivated Items' },
  {
    key: 'The System is Malfunctioning',
    value: 'The System is Malfunctioning',
  },
]

const statusArray = [
  // { key: "pending", value: "Pending" },
  // { key: "pending_recieving", value: "Pending Receiving" },
  // { key: "reject", value: "Reject" },
  // { key: "hold", value: "Hold" },
  // { key: "modify", value: "Modify" },

  { key: 'reject', value: 'Reject' },
  { key: 'hold', value: 'Hold' },
  { key: 'modify', value: 'Modify' },
  { key: 'approved', value: 'Approved' },
]

const orderArray = [
  { key: 'maintance_order', value: 'Maintance Order' },
  { key: 'doctor_order', value: 'Doctor Order' },
]

const generatedArray = [
  { key: 'Manual', value: 'Manual' },
  { key: 'System', value: 'System' },
]

const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2c6ddd',
    width: '115px',
    height: '40px',
    outline: 'none',
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

  // buttonContainer: {
  //   marginTop: 25
  // }

  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },

  buttonContainer: {
    marginTop: 25,
  },
}
const useStyles = makeStyles(tableStyles)

function AddEditPurchaseRequest(props) {
  const classes = useStyles()
  const initialState = {
    _id: '',
    requestNo: '',
    generatedBy: '',
    createdAt: new Date(),
    vendorId: '',
    status: 'to_do',
    itemId: '',
    itemCode: '',
    name: '',
    description: '',
    currentQty: '',
    reqQty: '',
    comments: '',
    vendors: [],
    statues: [],
    items: [],
    selectedRow: '',
    reason: '',

    generated: 'Manual',

    requesterName: '',
    department: '',
    orderType: '',
    maximumLevel: '',

    committeeStatus: '',

    rejectionReason: "",

    vendorsArray: [],
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
    requestNo,
    generatedBy,
    generated,
    createdAt,
    vendorId,
    status,
    itemCode,
    itemId,
    name,
    description,
    currentQty,
    reqQty,
    comments,
    vendors,
    statues,
    items,
    selectedRow,
    reason,
    requesterName,
    department,
    orderType,

    maximumLevel,

    committeeStatus,

    rejectionReason,

    vendorsArrayForItems,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const onChangeDate = (value) => {
    dispatch({ field: 'date', value })
  }

  function validateForm() {
    let jit = true;
    let rejection = true;

    // let qtyIsLess = true;
    if (reason === 'jit') {
      jit = requesterName !== '' && department !== '' && orderType !== ''
    }

    // if (reqQty >= maximumLevel) {
    //   qtyIsLess = false;
    //   setOpenNotification(true);
    //   setErrorMsg("Requested Qty can not exceed maximum level");
    // }

    if (committeeStatus === "reject") {
      rejection = rejectionReason !== "" ? true : false;
    }

    return (
      // generatedBy.length > 0 &&
      status &&
      status.length > 0 &&
      reason.length > 0 &&
      // itemCode.length > 0 &&
      // description.length > 0 &&
      // name.length > 0 &&
      reqQty !== '' &&
      comments !== '' &&
      reqQty <= maximumLevel &&
      jit &&
      rejection

      // &&qtyIsLess
    )
  }

  const [comingFor, setcomingFor] = useState('')
  const [vendorsArray, setVendors] = useState('')
  const [currentUser, setCurrentUser] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [itemFound, setItem] = useState('')

  const [selectedItemsArray, setSelectedItemsArray] = useState([])

  const [dialogOpen, setDialogOpen] = useState(false)

  const [selectedItem, setSelectedItem] = useState('')

  const [purchaseRequestItems, setPurchaseRequestItems] = useState('')

  const [selectItemToEditId, setSelectItemToEditId] = useState('')

  const [socket, setSocket] = useState('')

  const [itemAdded, setItemAdded] = useState(false);

  useEffect(() => {
    // const soc = socketIOClient(socketUrl);
    // setSocket(soc);
    // soc.emit("connection");

    setCurrentUser(cookie.load('current_user'))

    setcomingFor(props.history.location.state.comingFor)
    setVendors(props.history.location.state.vendors)

    const selectedRec = props.history.location.state.selectedItem
    console.log(selectedRec)
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          if (key === 'item') {
            dispatch({ field: 'itemId', value: val.itemId })
            dispatch({ field: 'currentQty', value: val.currQty })
            dispatch({ field: 'reqQty', value: val.reqQty })
            dispatch({ field: 'comments', value: val.comments })
            dispatch({ field: 'description', value: val.itemId.description })
            dispatch({ field: 'name', value: val.itemId.name })
            dispatch({ field: 'itemCode', value: val.itemId.itemCode })
            dispatch({ field: 'maximumLevel', value: val.itemId.maximumLevel })
          } else if (key === 'vendorId') {
            dispatch({ field: 'vendorId', value: val._id })
          }
        } else {
          dispatch({ field: key, value: val })
        }
      })
    }
    if (props.history.location.state.vendors) {
      dispatch({
        field: 'vendors',
        value: props.history.location.state.vendors,
      })
    }
    if (props.history.location.state.statues) {
      dispatch({
        field: 'statues',
        value: props.history.location.state.statues,
      })
    }
    if (props.history.location.state.items) {
      dispatch({ field: 'items', value: props.history.location.state.items })
    }

    // return () => soc.disconnect();
  }, [])

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true)
      setOpenNotification(true)
      setErrorMsg('Please fill the fields properly')
    } else {
      if (validateForm()) {
        const params = {
          generatedBy: currentUser.name,
          date: new Date(),
          vendorId: vendorId,
          generated,
          status: props.history.location.state.manualAddPO
            ? 'pending_recieving'
            : status,
          item: {
            itemId: itemId,
            currQty: currentQty,
            reqQty: reqQty,
            comments: comments,
            itemCode: itemCode,
            description: description,
            name: name,
          },
          reason: reason,
          requesterName,
          orderType,
          department,
        }

        console.log('params', params)

        axios
          .post(addPurchaseRequestUrl, params)
          .then((res) => {
            if (res.data.success) {
              if (props.history.location.state.manualAddPO) {
                console.log('res after addng pr', res.data.data)
                // socket.emit("purchaseRequest");

                props.history.replace({
                  pathname: '/home/controlroom/wms/po/add',
                  state: { pr: res.data.data, comingFor: 'add' },
                })
              } else {
                props.history.goBack()
                socket.emit('purchaseRequest')
              }
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
  }

  const handleEdit = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        if (committeeStatus !== "approved" || status === "to_do") {
          const params = {
            _id,
            requestNo,
            generatedBy: generatedBy,
            date: createdAt,
            vendorId: vendorId,
            generated,
            status:
              currentUser.staffTypeId.type === "Committe Member"
                ? committeeStatus === "reject"
                  ? "reject"
                  : status
                : status,
            item: {
              itemId: itemId,
              currQty: currentQty,
              reqQty: reqQty,
              comments: comments,
              itemCode: itemCode,
              description: description,
              name: name,
            },
            reason: reason,
            committeeStatus:
              currentUser.staffTypeId.type === "Committe Member"
                ? committeeStatus
                : committeeStatus,
            requesterName,
            orderType,
            department,
            rejectionReason,
          };
          axios
            .put(updatePurchaseRequestUrl, params)
            .then((res) => {
              if (res.data.success) {
                props.history.goBack();
              } else if (!res.data.success) {
                setOpenNotification(true);
              }
            })
            .catch((e) => {
              console.log("error after updating purchase request", e);
              setOpenNotification(true);
              setErrorMsg("Error while editing the purchase request");
            });
        } else {
          setOpenNotification(true);
          setErrorMsg("Approved PRs can not be updated");
        }
      }
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // if (e.target.value.length >= 3) {
    axios
      .get(getSearchedItemUrl + "/" + e.target.value)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.items.length > 0) {
            console.log(res.data.data.items);
            setItemFoundSuccessfully(true);
            setItem(res.data.data.items);
          } else {
            setItemFoundSuccessfully(false);
            setItem("");
          }
        }
      })
      .catch((e) => {
        console.log("error after adding purchase request", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the purchase request");
      });
    // }
  };

  const getCurrentQty = (id) => {
    axios
      .get(getPurchaseRequestItemQtyUrl + '/' + id)
      .then((res) => {
        if (res.data.success) {
          console.log('current quantity', res.data.data)
          if (res.data.data) {
            dispatch({ field: 'currentQty', value: res.data.data.qty })
          } else {
            dispatch({ field: 'currentQty', value: 0 })
          }
        }
      })
      .catch((e) => {
        console.log('error after adding purchase request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the purchase request')
      })
  }

  function handleAddItem(i) {
    getCurrentQty(i._id)
    setDialogOpen(true)
    setSelectedItem(i)

    dispatch({ field: 'itemId', value: i._id })
    dispatch({ field: 'itemCode', value: i.itemCode })
    dispatch({ field: 'name', value: i.name })
    dispatch({ field: 'vendorId', value: i.vendorId })
    dispatch({ field: 'description', value: i.description })
    dispatch({ field: 'maximumLevel', value: i.maximumLevel })

    const obj = {
      itemCode: i.itemCode,
    }

    setSelectedItemsArray((pervState) => [...pervState, obj])
    setSearchQuery('')
  }

  function validateItemsForm() {
    return (
      itemCode.length > 0 &&
      description.length > 0 &&
      name.length > 0 &&
      reqQty.length > 0 &&
      // currentQty.length > 0 &&
      comments.length > 0 &&
      maximumLevel >= reqQty
      //  &&currentQty >= reqQty
    )
  }

  function hideDialog() {
    if (!itemAdded) {
      setDialogOpen(false);
      setSelectedItem("");
      setSelectItemToEditId("");
      dispatch({ field: "description", value: "" });
      dispatch({ field: "currentQty", value: "" });
      dispatch({ field: "comments", value: "" });
      dispatch({ field: "reqQty", value: "" });
      dispatch({ field: "name", value: "" });
      dispatch({ field: "itemCode", value: "" });
      dispatch({ field: "vendorId", value: "" });
      dispatch({ field: "maximumLevel", value: "" });
    } else {
      setDialogOpen(false);
      setSelectedItem("");
      setSelectItemToEditId("");
    }
  }

  const addSelectedItem = () => {
    if (validateItemsForm()) {
      setDialogOpen(false);
      setItemAdded(true);
    }
  }

  function selectedItemToEdit(i) {
    setSelectItemToEditId(i._id)
    dispatch({ field: 'description', value: i.description })
    dispatch({ field: 'currentQty', value: i.currentQty })
    dispatch({ field: 'comments', value: i.comments })
    dispatch({ field: 'reqQty', value: i.reqQty })
    dispatch({ field: 'name', value: i.name })
    dispatch({ field: 'itemCode', value: i.itemCode })
    dispatch({ field: 'vendorId', value: i.vendorId })
    setDialogOpen(true)
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
        comments,
      }

      axios
        .put(updatePurchasingRequestItemUrl, params)
        .then((res) => {
          if (res.data.success) {
            dispatch({ field: 'description', value: '' })
            dispatch({ field: 'currentQty', value: '' })
            dispatch({ field: 'comments', value: '' })
            dispatch({ field: 'reqQty', value: '' })
            dispatch({ field: 'name', value: '' })
            dispatch({ field: 'itemCode', value: '' })
            setDialogOpen(false)
            setSelectedItem('')
            setSelectItemToEditId('')
            // window.location.reload(false);
            // getPurchasingRequestItems(_id);
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

  if (openNotification) {
    setTimeout(() => {
      console.log('called')
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
            <img src={purchase_request} />
            <h4>
              {comingFor === 'add'
                ? ' Add Purchase Request'
                : ' Edit Purchase Request'}
            </h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              <img className='icon-view' src={view_all} />
              &nbsp;&nbsp;
              <strong style={{ fontSize: '12px' }}>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
          <div className='row'>
            {comingFor === 'edit' ? (
              <div
                className='col-md-4'
                style={styles.inputContainerForTextField}
              >
                <InputLabelComponent>Request Number</InputLabelComponent>
                <input
                  disabled={true}
                  placeholder='Request No'
                  name={'requestNo'}
                  value={requestNo}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
              </div>
            ) : (
              undefined
            )}

            <div className={comingFor === 'add' ? 'col-md-6' : 'col-md-4'}>
              <div style={styles.inputContainerForDropDown}>
                <InputLabelComponent>Generated</InputLabelComponent>
                <Select
                  fullWidth
                  disabled={true}
                  id='generated'
                  name='generated'
                  value={generated}
                  onChange={onChangeValue}
                  label='Generated'
                  className='dropDownStyle'
                  input={<BootstrapInput />}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {generatedArray &&
                    generatedArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                </Select>
                {/* <ErrorMessage
                  name={generated}
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
            </div>

            <div
              className={comingFor === 'add' ? 'col-md-6' : 'col-md-4'}
              style={styles.inputContainerForTextField}
            >
              <InputLabelComponent>Generated By</InputLabelComponent>
              <input
                disabled={true}
                type='text'
                placeholder='Generated By'
                name={generatedBy}
                value={
                  comingFor === 'add'
                    ? currentUser
                      ? currentUser.name
                      : ''
                    : generatedBy
                }
                onChange={onChangeValue}
                className='textInputStyle'
              />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-6' style={styles.inputContainerForDropDown}>
              <InputLabelComponent>Date</InputLabelComponent>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  // inputVariant='outlined'
                  onChange={onChangeDate}
                  fullWidth
                  disabled={true}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    borderWidth: 0,
                    height: 47,
                    marginTop: 5,
                    paddingLeft: 20,
                    paddingTop: 10,
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={comingFor === 'add' ? new Date() : createdAt}
                />
              </MuiPickersUtilsProvider>
            </div>

            <div className='col-md-6'>
              <div style={styles.inputContainerForDropDown}>
                <InputLabelComponent>Reason*</InputLabelComponent>
                <Select
                  disabled={
                    currentUser &&
                    currentUser.staffTypeId.type === 'Committe Member'
                      ? true
                      : false
                  }
                  fullWidth
                  id='reason'
                  name='reason'
                  value={reason}
                  onChange={onChangeValue}
                  label='Reason'
                  className='dropDownStyle'
                  input={<BootstrapInput />}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {reasonArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
                </Select>
                <ErrorMessage name={reason} isFormSubmitted={isFormSubmitted} />
              </div>
            </div>
          </div>

          {reason === 'jit' ? (
            <div className='row'>
              <div
                className='col-md-4'
                style={styles.inputContainerForTextField}
              >
                <InputLabelComponent>Requester*</InputLabelComponent>
                <input
                  style={styles.inputField}
                  disabled={
                    currentUser &&
                    currentUser.staffTypeId.type === 'Committe Member'
                      ? true
                      : false
                  }
                  placeholder='Requester'
                  name={'requesterName'}
                  value={requesterName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                />
                <ErrorMessage
                  name={requesterName}
                  isFormSubmitted={isFormSubmitted}
                />
              </div>

              <div className='col-md-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabelComponent>Department*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    disabled={
                      currentUser &&
                      currentUser.staffTypeId.type === 'Committe Member'
                        ? true
                        : false
                    }
                    placeholder='Department'
                    name={'department'}
                    value={department}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={department}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div>

              <div className='col-md-4'>
                <div style={styles.inputContainerForDropDown}>
                  <InputLabelComponent>Order Type*</InputLabelComponent>
                  <Select
                    fullWidth
                    disabled={
                      currentUser &&
                      currentUser.staffTypeId.type === 'Committe Member'
                        ? true
                        : false
                    }
                    id='orderType'
                    name='orderType'
                    value={orderType}
                    onChange={onChangeValue}
                    label='Order Type'
                    className='dropDownStyle'
                    input={<BootstrapInput />}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {orderArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  <ErrorMessage
                    name={orderType}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div>
            </div>
          ) : (
            undefined
          )}

          {comingFor === 'edit' &&
          // (currentUser.staffTypeId.type === "admin" ||
          currentUser.staffTypeId.type === 'Committe Member' ? (
            <div className='col-md-12'>
              <div style={styles.inputContainerForDropDown}>
                <InputLabelComponent>Status*</InputLabelComponent>
                {currentUser.staffTypeId.type === 'Committe Member' ? (
                  <div>
                    <Select
                      fullWidth
                      id='committeeStatus'
                      name='committeeStatus'
                      value={committeeStatus}
                      onChange={onChangeValue}
                      label='Status'
                      className='dropDownStyle'
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
                    </Select>
                    <ErrorMessage
                      name={committeeStatus}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                ) : (
                  <div>
                    <Select
                      fullWidth
                      id='status'
                      name='status'
                      value={status}
                      onChange={onChangeValue}
                      label='Status'
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>

                      {statues.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                    <ErrorMessage
                      name={status}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            undefined
          )}

          {committeeStatus === "reject" ? (
            <div className="row">
              <div
                className="col-md-12"
                style={styles.inputContainerForTextField}
              >
                <InputLabelComponent>Rejection Reason*</InputLabelComponent>
                <input
                  style={styles.inputField}
                  disabled={
                    currentUser &&
                    currentUser.staffTypeId.type === "Committe Member"
                      ? false
                      : true
                  }
                  placeholder="Rejection Reason"
                  name={"rejectionReason"}
                  value={rejectionReason}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
                <ErrorMessage
                  name={rejectionReason}
                  isFormSubmitted={isFormSubmitted}
                />
              </div>
            </div>
          ) : (
            undefined
          )}

          {itemCode !== "" && currentQty !== "" && description !== "" ? (
            <div>
              <h4 style={{ color: 'white', fontWeight: '700', marginTop: 30 }}>
                Item details
              </h4>
              <div className='row'>
                <div
                  className='col-md-6'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Item Code*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    type='text'
                    disabled={true}
                    placeholder='Item Code'
                    name={'itemCode'}
                    value={itemCode}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={itemCode}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
                <div
                  className='col-md-6'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Name*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    type='text'
                    disabled={true}
                    placeholder='Name'
                    name={'name'}
                    value={name}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage name={name} isFormSubmitted={isFormSubmitted} />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-4'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Current Qty*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    type='number'
                    disabled={true}
                    placeholder='Current Qty'
                    name={'currentQty'}
                    value={currentQty}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={currentQty}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>

                <div
                  className='col-md-4'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Maximum Level*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    type='number'
                    disabled={true}
                    placeholder='Maximum Level'
                    name={'maximumLevel'}
                    value={maximumLevel}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={maximumLevel}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>

                <div
                  className='col-md-4'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Req Qty*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    disabled={
                      currentUser &&
                      currentUser.staffTypeId.type === 'Committe Member'
                        ? true
                        : false
                    }
                    type='number'
                    placeholder='Req Qty'
                    name={'reqQty'}
                    value={reqQty}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={reqQty}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Description*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    type='text'
                    disabled={true}
                    placeholder='Description'
                    name={'description'}
                    value={description}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={description}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12'
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Comments*</InputLabelComponent>
                  <input
                    style={styles.inputField}
                    disabled={
                      currentUser &&
                      currentUser.staffTypeId.type === 'Committe Member'
                        ? true
                        : false
                    }
                    type='text'
                    rows={4}
                    placeholder='Notes/Comments'
                    name={'comments'}
                    value={comments}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                  <ErrorMessage
                    name={comments}
                    isFormSubmitted={isFormSubmitted}
                  />
                </div>
              </div>
            </div>
          ) : (
            undefined
          )}

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                // height: 50,
                justifyContent: 'flex-end',
                marginTop: '2%',
                marginBottom: '2%',
              }}
            >
              {comingFor === 'add' ? (
                // <Button
                //   style={{ width: "10%" }}
                //   // disabled={!validateForm()}
                //   onClick={() => setDialogOpen(true)}
                //   variant="contained"
                //   color="primary"
                // >
                //   Add Item
                // </Button>
                <Button
                  onClick={() => setDialogOpen(true)}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                  <img className='icon-style' src={plus_icon} />
                  &nbsp;&nbsp;
                  <strong style={{ fontSize: '12px' }}>Add New</strong>
                </Button>
              ) : (
                //  (
                //   <Button
                //     style={{ width: "10%" }}
                //     // disabled={!validateForm()}
                //     onClick={() => setDialogOpen(true)}
                //     variant="contained"
                //     color="primary"
                //   >
                //     Edit Item
                //   </Button>
                // )
                undefined
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
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
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>
                    Add Purchase Request
                  </strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  // disabled={!validateForm()}
                  onClick={handleEdit}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>
                    {' '}
                    Update Purchase Request
                  </strong>
                </Button>
              )}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <Dialog
            aria-labelledby='form-dialog-title'
            open={dialogOpen}
            maxWidth='xl'
            fullWidth={true}
            // fullScreen
          >
            <DialogContent style={{ backgroundColor: '#31e2aa' }}>
              <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
                Add Item
              </DialogTitle>
              <div className='container-fluid'>
                <div className='row'>
                  <div
                    className='col-md-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Search Item*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Search Items by name or code'
                      name={'searchQuery'}
                      value={searchQuery}
                      onChange={handleSearch}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={searchQuery}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                {searchQuery ? (
                  // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                  <div style={{ zIndex: 3 }}>
                    <Paper>
                      {itemFoundSuccessfull ? (
                        itemFound && (
                          <Table size='small'>
                            <TableHead>
                              <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Puschase Price</TableCell>
                                <TableCell align='center'>
                                  Description
                                </TableCell>
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
                                )
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

                <div className='row'>
                  <div
                    className='col-md-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Item Code</InputLabelComponent>
                    <input
                      type='text'
                      disabled={true}
                      placeholder='Item Code'
                      name={'itemCode'}
                      value={itemCode}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={itemCode}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                  <div
                    className='col-md-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Name</InputLabelComponent>
                    <input
                      type='text'
                      disabled={true}
                      placeholder='Name'
                      name={'name'}
                      value={name}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={name}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-4'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Current Qty</InputLabelComponent>
                    <input
                      // type="number"
                      disabled={true}
                      placeholder='Current Qty'
                      name={'currentQty'}
                      value={currentQty}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={currentQty}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>

                  <div
                    className='col-md-4'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Maximum Level</InputLabelComponent>
                    <input
                      disabled
                      type='number'
                      placeholder='Maximum Level'
                      name={'maximumLevel'}
                      value={maximumLevel}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={maximumLevel}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>

                  <div
                    className='col-md-4'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Req Qty*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='number'
                      placeholder='Req Qty'
                      name={'reqQty'}
                      value={reqQty}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={reqQty}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Description</InputLabelComponent>
                    <input
                      type='text'
                      disabled={true}
                      placeholder='Description'
                      name={'description'}
                      value={description}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={description}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Comments*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      rows={4}
                      placeholder='Notes/Comments'
                      name={'comments'}
                      value={comments}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                </div>

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                    <Button
                      onClick={() => hideDialog()}
                      style={styles.stylesForButton}
                      variant='contained'
                    >
                      <strong>Cancel</strong>
                    </Button>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '2%',
                      marginBottom: '2%',
                    }}
                  >
                    {selectItemToEditId === '' ? (
                      <Button
                        style={{
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: 15,
                          backgroundColor: '#2c6ddd',
                          width: '140px',
                          height: '50px',
                          outline: 'none',
                          paddingLeft: 30,
                          paddingRight: 30,
                        }}
                        disabled={!validateItemsForm()}
                        onClick={addSelectedItem}
                        variant='contained'
                        color='primary'
                      >
                        Add Item
                      </Button>
                    ) : (
                      <Button
                        style={{
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: 15,
                          backgroundColor: '#2c6ddd',
                          width: '140px',
                          height: '50px',
                          outline: 'none',
                          paddingLeft: 30,
                          paddingRight: 30,
                        }}
                        disabled={!validateItemsForm()}
                        onClick={editSelectedItem}
                        variant='contained'
                        color='primary'
                      >
                        {' '}
                        Edit{' '}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back}
              style={{ width: 45, height: 35, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddEditPurchaseRequest
