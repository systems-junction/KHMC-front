/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
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
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../../components/Snackbar/Notification.js'
import { socketUrl } from '../../../public/endpoins'
import InputLabelComponent from '../../../components/InputLabel/inputLabel'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'
import ErrorMessage from '../../../components/ErrorMessage/errorMessage'
import Paper from '@material-ui/core/Paper'
import cookie from 'react-cookies'
import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog'
import { tr } from 'date-fns/locale'
import Header from '../../../components/Header/Header'
import plus_icon from '../../../assets/img/Plus.png'
import purchase_request from '../../../assets/img/purchase request.png'
import Back from '../../../assets/img/Back_Arrow.png'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import socketIOClient from 'socket.io-client'

const durationArray = [
  { key: '1 Week', value: '1 week' },
  { key: '2 Week', value: '2 week' },
  { key: '3 Week', value: '3 week' },
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
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: 25,
  },
}
const useStyles = makeStyles(tableStyles)

function AddEditEDR(props) {
  const classes = useStyles()
  const initialState = {
    medName: '',
    duration: '',
    dosage: '',
    comments: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { medName, duration, dosage, comments } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  function validateForm() {
    // let jit = true;
    // let rejection = true;
    // let qtyIsLess = true;
    // if (reason === 'jit') {
    //   jit = requesterName !== '' && department !== '' && orderType !== ''
    // }
    // if (committeeStatus === "reject") {
    //   rejection = rejectionReason !== "" ? true : false;
    // }
    // return (
    // generatedBy.length > 0 &&
    // status &&
    // status.length > 0 &&
    // reason.length > 0 &&
    // itemCode.length > 0 &&
    // description.length > 0 &&
    // name.length > 0 &&
    // reqQty !== '' &&
    // comments !== '' &&
    // reqQty <= maximumLevel &&
    // jit &&
    // rejection
    // &&qtyIsLess
    //   )
  }

  const [comingFor, setcomingFor] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  // const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  // const [itemFound, setItem] = useState('')
  // const [selectedItemsArray, setSelectedItemsArray] = useState([])
  // const [purchaseRequestItems, setPurchaseRequestItems] = useState('')
  // const [selectItemToEditId, setSelectItemToEditId] = useState('')
  // const [socket, setSocket] = useState('')
  // const [itemAdded, setItemAdded] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // const soc = socketIOClient(socketUrl);
    // setSocket(soc);
    // soc.emit("connection");

    setCurrentUser(cookie.load('current_user'))

    setcomingFor(props.history.location.state.comingFor)

    const selectedRec = props.history.location.state.selectedItem

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
    // return () => soc.disconnect();
  }, [])

  const handleAdd = () => {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true)
    //   setOpenNotification(true)
    //   setErrorMsg('Please fill the fields properly')
    // } else {
    // if (validateForm()) {
    // const params = {
    //   generatedBy: currentUser.name,
    //   date: new Date(),
    //   vendorId: vendorId,
    //   generated,
    //   status: props.history.location.state.manualAddPO
    //     ? 'pending_recieving'
    //     : status,
    //   item: {
    //     itemId: itemId,
    //     currQty: currentQty,
    //     reqQty: reqQty,
    //     comments: comments,
    //     itemCode: itemCode,
    //     description: description,
    //     name: name,
    //   },
    //   reason: reason,
    //   requesterName,
    //   orderType,
    //   department,
    // }
    // axios
    //   .post(addPurchaseRequestUrl, params)
    //   .then((res) => {
    //     if (res.data.success) {
    //       if (props.history.location.state.manualAddPO) {
    //         console.log('res after addng pr', res.data.data)
    // socket.emit("purchaseRequest");
    //       props.history.replace({
    //         pathname: '/home/controlroom/wms/po/add',
    //         state: { pr: res.data.data, comingFor: 'add' },
    //       })
    //     } else {
    //       props.history.goBack()
    //       socket.emit('purchaseRequest')
    //     }
    //   } else if (!res.data.success) {
    //     setOpenNotification(true)
    //   }
    // })
    // .catch((e) => {
    //   console.log('error after adding request', e)
    //   setOpenNotification(true)
    //   setErrorMsg('Error while adding the request')
    // })
    // }
    // }
  }

  const handleEdit = () => {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    //   if (validateForm()) {
    //     if (committeeStatus !== "approved" || status === "to_do") {
    //       const params = {
    //         _id,
    //         requestNo,
    //         generatedBy: generatedBy,
    //         date: createdAt,
    //         vendorId: vendorId,
    //         generated,
    //         status:
    //           currentUser.staffTypeId.type === "Committe Member"
    //             ? committeeStatus === "reject"
    //               ? "reject"
    //               : status
    //             : status,
    //         item: {
    //           itemId: itemId,
    //           currQty: currentQty,
    //           reqQty: reqQty,
    //           comments: comments,
    //           itemCode: itemCode,
    //           description: description,
    //           name: name,
    //         },
    //         reason: reason,
    //         committeeStatus:
    //           currentUser.staffTypeId.type === "Committe Member"
    //             ? committeeStatus
    //             : committeeStatus,
    //         requesterName,
    //         orderType,
    //         department,
    //         rejectionReason,
    //       };
    //       axios
    //         .put(updatePurchaseRequestUrl, params)
    //         .then((res) => {
    //           if (res.data.success) {
    //             props.history.goBack();
    //           } else if (!res.data.success) {
    //             setOpenNotification(true);
    //           }
    //         })
    //         .catch((e) => {
    //           console.log("error after updating purchase request", e);
    //           setOpenNotification(true);
    //           setErrorMsg("Error while editing the purchase request");
    //         });
    //     } else {
    //       setOpenNotification(true);
    //       setErrorMsg("Approved PRs can not be updated");
    //     }
    //   }
    // }
  }

  const handleSearch = (e) => {
    // setSearchQuery(e.target.value);
    // if (e.target.value.length >= 3) {
    // axios
    //   .get(getSearchedItemUrl + "/" + e.target.value)
    //   .then((res) => {
    //     if (res.data.success) {
    //       if (res.data.data.items.length > 0) {
    //         console.log(res.data.data.items);
    //         setItemFoundSuccessfully(true);
    //         setItem(res.data.data.items);
    //       } else {
    //         setItemFoundSuccessfully(false);
    //         setItem("");
    //       }
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("error after adding purchase request", e);
    //     setOpenNotification(true);
    //     setErrorMsg("Error while adding the purchase request");
    //   });
    // }
  }

  const getCurrentQty = (id) => {
    // axios
    //   .get(getPurchaseRequestItemQtyUrl + '/' + id)
    //   .then((res) => {
    //     if (res.data.success) {
    //       console.log('current quantity', res.data.data)
    //       if (res.data.data) {
    //         dispatch({ field: 'currentQty', value: res.data.data.qty })
    //       } else {
    //         dispatch({ field: 'currentQty', value: 0 })
    //       }
    //     }
    //   })
    //   .catch((e) => {
    //     console.log('error after adding purchase request', e)
    //     setOpenNotification(true)
    //     setErrorMsg('Error while adding the purchase request')
    //   })
  }

  function handleAddItem(i) {
    // getCurrentQty(i._id)
    // setDialogOpen(true)
    // setSelectedItem(i)
    // dispatch({ field: 'itemId', value: i._id })
    // dispatch({ field: 'itemCode', value: i.itemCode })
    // dispatch({ field: 'name', value: i.name })
    // dispatch({ field: 'vendorId', value: i.vendorId })
    // dispatch({ field: 'description', value: i.description })
    // dispatch({ field: 'maximumLevel', value: i.maximumLevel })
    // const obj = {
    //   itemCode: i.itemCode,
    // }
    // setSelectedItemsArray((pervState) => [...pervState, obj])
    // setSearchQuery('')
  }

  function validateItemsForm() {
    // return (
    // itemCode.length > 0 &&
    // description.length > 0 &&
    // name.length > 0 &&
    // reqQty.length > 0 &&
    // currentQty.length > 0 &&
    // comments.length > 0 &&
    // maximumLevel >= reqQty
    //  &&currentQty >= reqQty
    // )
  }

  function hideDialog() {
    // if (!itemAdded) {
    //   setDialogOpen(false);
    //   setSelectedItem("");
    //   setSelectItemToEditId("");
    //   dispatch({ field: "description", value: "" });
    //   dispatch({ field: "currentQty", value: "" });
    //   dispatch({ field: "comments", value: "" });
    //   dispatch({ field: "reqQty", value: "" });
    //   dispatch({ field: "name", value: "" });
    //   dispatch({ field: "itemCode", value: "" });
    //   dispatch({ field: "vendorId", value: "" });
    //   dispatch({ field: "maximumLevel", value: "" });
    // } else {
    setDialogOpen(false)
    setSelectedItem('')
    // setSelectItemToEditId("");
    // }
  }

  const addSelectedItem = () => {
    // if (validateItemsForm()) {
    //   setDialogOpen(false);
    //   setItemAdded(true);
    // }
  }

  function selectedItemToEdit(i) {
    // setSelectItemToEditId(i._id)
    // dispatch({ field: 'description', value: i.description })
    // dispatch({ field: 'currentQty', value: i.currentQty })
    // dispatch({ field: 'comments', value: i.comments })
    // dispatch({ field: 'reqQty', value: i.reqQty })
    // dispatch({ field: 'name', value: i.name })
    // dispatch({ field: 'itemCode', value: i.itemCode })
    // dispatch({ field: 'vendorId', value: i.vendorId })
    // setDialogOpen(true)
  }

  const editSelectedItem = () => {
    // if (validateItemsForm()) {
    //   const params = {
    //     _id: selectItemToEditId,
    //     purchaseRequestId: _id,
    //     itemCode,
    //     vendorId,
    //     name,
    //     description,
    //     currentQty,
    //     reqQty,
    //     comments,
    //   }
    //   axios
    //     .put(updatePurchasingRequestItemUrl, params)
    //     .then((res) => {
    //       if (res.data.success) {
    //         dispatch({ field: 'description', value: '' })
    //         dispatch({ field: 'currentQty', value: '' })
    //         dispatch({ field: 'comments', value: '' })
    //         dispatch({ field: 'reqQty', value: '' })
    //         dispatch({ field: 'name', value: '' })
    //         dispatch({ field: 'itemCode', value: '' })
    //         setDialogOpen(false)
    //         setSelectedItem('')
    //         setSelectItemToEditId('')
    // window.location.reload(false);
    // getPurchasingRequestItems(_id);
    //       } else if (!res.data.success) {
    //         setOpenNotification(true)
    //       }
    //     })
    //     .catch((e) => {
    //       console.log('error after adding purchase request', e)
    //       setOpenNotification(true)
    //       setErrorMsg('Error while adding the purchase request')
    //     })
    // }
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
            <h4>{comingFor === 'add' ? ' Pharmacy Request' : ''}</h4>
          </div>

          <div>
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
          </div>
        </div>

        <div
          style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
          className='container'
        >
          <div className='row'>
            <div className='col-md-12 col-sm-12 col-12'>
              {/* HERE ADD THE TABLE OF PHARMACY REQUEST */}
            </div>
          </div>

          <div className='row' style={{ marginTop: '25px' }}>
            <div className='col-md-6 col-sm-6 col-6'>
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{ width: 45, height: 35, cursor: 'pointer' }}
              />
            </div>

            <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
              <Button
                style={styles.stylesForPurchaseButton}
                // disabled={!validateForm()}
                onClick={handleAdd}
                variant='contained'
                color='primary'
              >
                <strong style={{ fontSize: '12px' }}>Save</strong>
              </Button>
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <Dialog
            aria-labelledby='form-dialog-title'
            open={dialogOpen}
            maxWidth='xl'
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: '#31e2aa' }}>
              <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
                Add Request
              </DialogTitle>
              <div className='container-fluid'>
                <div className='row'>
                  <div
                    className='col-md-12 col-sm-12 col-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Medicine Name*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Enter Medicine name'
                      name={'medName'}
                      value={medName}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={medName}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6'
                    style={styles.inputContainerForDropDown}
                  >
                    <InputLabelComponent>Duration*</InputLabelComponent>
                    <Select
                      fullWidth
                      id='duration'
                      name='duration'
                      value={duration}
                      onChange={onChangeValue}
                      label='Duration'
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {durationArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                    <ErrorMessage
                      name={duration}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                  <div
                    className='col-md-6 col-sm-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Dosage</InputLabelComponent>
                    <input
                      type='text'
                      placeholder='Enter Dosage'
                      name={'dosage'}
                      value={dosage}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={dosage}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Additional Notes*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      rows={4}
                      placeholder='Add Additional Notes/Comments...'
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
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
export default AddEditEDR
