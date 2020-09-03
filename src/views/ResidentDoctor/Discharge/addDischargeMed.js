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
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../../components/Snackbar/Notification.js'
import {
  updateIPR,
  updateEdrIpr,
  getSearchedPharmaceuticalItemsUrl,
} from '../../../public/endpoins'
import InputLabelComponent from '../../../components/InputLabel/inputLabel'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'
import ErrorMessage from '../../../components/ErrorMessage/errorMessage'
import Paper from '@material-ui/core/Paper'
import cookie from 'react-cookies'
import Dialog from '@material-ui/core/Dialog'
import Header from '../../../components/Header/Header'
import plus_icon from '../../../assets/img/Plus.png'
import purchase_request from '../../../assets/img/purchase request.png'
import Back from '../../../assets/img/Back_Arrow.png'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import CustomTable from '../../../components/Table/Table'

const priorityArray = [
  { key: 'High', value: 'high' },
  { key: 'Medium', value: 'medium' },
  { key: 'Low', value: 'low' },
]
const tableHeadingForPharmacyReq = [
  'Medicine Name',
  'Quantity',
  'Unit Price',
  'Total Price',
  'Action',
]
const tableDataKeysForPharmacyReq = [
  'medicineName',
  'requestedQty',
  'unitPrice',
  'totalPrice',
]
const actions = { edit: true }
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
  const initialState = {
    date: new Date(),
    status: 'pending',
    requester: '',
    itemId: '',
    medicineName: '',
    priority: '',
    schedule: '',
    dosage: '',
    frequency: '',
    duration: '',
    requestedQty: '',
    unitPrice: '',
    totalPrice: '',
    dischargeMedicines: '',
    dischargeRequest: '',
    requestType: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    date = new Date(),
    status = 'pending',
    itemId,
    medicineName,
    priority,
    schedule,
    dosage,
    frequency,
    duration,
    requestedQty,
    unitPrice,
    totalPrice,
    dischargeMedicines,
    dischargeRequest,
    requestType,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [comingFor, setcomingFor] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [isFormSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [, setSelectedItem] = useState('')
  const [selectItemToEditId, setSelectItemToEditId] = useState('')
  const [id, setId] = useState('')
  const [, setrequestNo] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)

  useEffect(() => {
    // const soc = socketIOClient(socketUrl);
    // setSocket(soc);
    // soc.emit("connection");

    setCurrentUser(cookie.load('current_user'))

    setcomingFor(props.history.location.state.comingFor)

    const selectedRec = props.history.location.state.selectedItem
    console.log('Item', props.history.location.state.selectedItem)

    setId(props.history.location.state.selectedItem._id)
    setrequestNo(props.history.location.state.selectedItem.requestNo)

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          if (key === 'dischargeRequest') {
            Object.entries(val).map(([key1, val1]) => {
              // console.log("pharmacy k andr",key1,val1)
              if (key1 === 'dischargeMedication') {
                Object.entries(val1).map(([key2, val2]) => {
                  if (key2 === 'medicine') {
                    dispatch({ field: 'dischargeMedicines', value: val2 })
                  }
                })
              }
            })
            dispatch({ field: 'dischargeRequest', value: val })
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
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    let medicineData = []

    for (let i = 0; i < dischargeMedicines.length; i++) {
      medicineData = [
        ...medicineData,
        {
          itemId: dischargeMedicines[i].itemId,
          medicineName: dischargeMedicines[i].medicineName,
          duration: dischargeMedicines[i].duration,
          dosage: dischargeMedicines[i].dosage,
          priority: dischargeMedicines[i].priority,
          schedule: dischargeMedicines[i].schedule,
          frequency: dischargeMedicines[i].frequency,
          requestedQty: dischargeMedicines[i].requestedQty,
          unitPrice: dischargeMedicines[i].unitPrice,
          totalPrice: dischargeMedicines[i].totalPrice,
        },
      ]
    }

    let dischargeMedicationObject = {
      date: date,
      status: status,
      requester: currentUser.staffId,
      medicine: medicineData,
    }

    const params = {
      _id: id,
      requestType,
      dischargeRequest: {
        ...dischargeRequest,
        dischargeMedication: dischargeMedicationObject,
      },
    }
    console.log('params', params)
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response while adding Medicine Req', res.data.data)
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while adding the Medicine request')
        }
      })
      .catch((e) => {
        console.log('error after adding Medicine request', e)
        setOpenNotification(true)
        setErrorMsg('Error after adding the medicine request')
      })
    //   }
    // }
  }

  // const handleEdit = () => {
  //   if (!validateForm()) {
  //     setIsFormSubmitted(true);
  //     setOpenNotification(true);
  //     setErrorMsg("Please fill the fields properly");
  //   } else {
  //     if (validateForm()) {
  //       let requestedItems = [];

  //       for (let i = 0; i < requestedItemsArray.length; i++) {
  //         requestedItems = [
  //           ...requestedItems,
  //           {
  //             itemId: requestedItemsArray[i].itemId._id,
  //             currentQty: requestedItemsArray[i].currentQty,
  //             requestedQty: requestedItemsArray[i].requestedQty,
  //             status: requestedItemsArray[i].status,
  //             secondStatus: requestedItemsArray[i].secondStatus,
  //             dosage: requestedItemsArray[i].dosage,
  //             noOfTimes: requestedItemsArray[i].noOfTimes,
  //             duration: requestedItemsArray[i].duration,
  //           },
  //         ];
  //       }
  //       const obj = {
  //         _id,
  //         requestNo,
  //         generatedBy,
  //         dateGenerated,
  //         generated,
  //         status:
  //           currentUser.staffTypeId.type === "FU Member" &&
  //           status === "pending" &&
  //           secondStatus === "in_progress"
  //             ? "in_progress"
  //             : currentUser.staffTypeId.type === "FU Member" &&
  //               status === "in_progress" &&
  //               secondStatus === "Delivery in Progress"
  //             ? "Delivery in Progress"
  //             : currentUser.staffTypeId.type === "BU Nurse" &&
  //               status === "Delivery in Progress" &&
  //               secondStatus === "pending_administration"
  //             ? "pending_administration"
  //             : currentUser.staffTypeId.type === "BU Inventory Keeper" &&
  //               status === "pending_administration" &&
  //               secondStatus === "complete"
  //             ? "complete"
  //             : status,
  //         comments,
  //         item: requestedItems,
  // currentQty,
  // requestedQty,
  // description,
  //         commentNote,
  //         fuId: fuId,
  //         secondStatus,
  //         buId: buId,
  //         requesterName,
  //         department,
  //         orderType,
  //         patientReferenceNo,
  //         orderFor,
  //         orderBy,
  //       };

  //       axios
  //         .put(updateReplenishmentRequestUrlBU, obj)
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
  //     }
  //   }
  // };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  function hideDialog() {
    setDialogOpen(false)
    setSelectedItem('')
    setSelectItemToEditId('')

    dispatch({ field: 'itemId', value: '' })
    dispatch({ field: 'priority', value: '' })
    dispatch({ field: 'schedule', value: '' })
    dispatch({ field: 'dosage', value: '' })
    dispatch({ field: 'frequency', value: '' })
    dispatch({ field: 'duration', value: '' })
    dispatch({ field: 'requestedQty', value: '' })
    dispatch({ field: 'medicineName', value: '' })
    dispatch({ field: 'unitPrice', value: '' })
    dispatch({ field: 'totalPrice', value: '' })
  }

  function validateItemsForm() {
    return (
      itemId &&
      itemId.length > 0 &&
      medicineName &&
      medicineName.length > 0 &&
      priority &&
      priority.length > 0 &&
      schedule &&
      schedule.length > 0 &&
      duration &&
      duration.length > 0 &&
      frequency &&
      frequency.length > 0 &&
      requestedQty &&
      requestedQty.length > 0 &&
      dosage &&
      dosage.length > 0
    )
  }

  const addSelectedItem = () => {
    // setIsFormSubmitted(true);
    if (validateItemsForm()) {
      setDialogOpen(false)

      let found =
        dischargeMedicines &&
        dischargeMedicines.find((item) => item.itemId === itemId)

      if (found) {
        setOpenNotification(true)
        setErrorMsg('This Medicine has already been added.')
      } else {
        dispatch({
          field: 'dischargeMedicines',
          value: [
            ...dischargeMedicines,
            {
              itemId,
              priority,
              schedule,
              dosage,
              frequency,
              duration,
              requestedQty,
              medicineName,
              unitPrice,
              totalPrice,
            },
          ],
        })
      }
    }

    dispatch({ field: 'itemId', value: '' })
    dispatch({ field: 'priority', value: '' })
    dispatch({ field: 'schedule', value: '' })
    dispatch({ field: 'dosage', value: '' })
    dispatch({ field: 'frequency', value: '' })
    dispatch({ field: 'duration', value: '' })
    dispatch({ field: 'requestedQty', value: '' })
    dispatch({ field: 'medicineName', value: '' })
    dispatch({ field: 'unitPrice', value: '' })
    dispatch({ field: 'totalPrice', value: '' })
  }

  const editSelectedItem = () => {
    // if (validateItemsForm()) {
    setDialogOpen(false)
    let temp = []

    // console.log("MEDSSS",medicines)

    for (let i = 0; i < dischargeMedicines.length; i++) {
      if (dischargeMedicines[i].itemId === selectItemToEditId) {
        let obj = {
          itemId,
          priority,
          schedule,
          dosage,
          frequency,
          duration,
          requestedQty,
          medicineName,
          unitPrice,
          totalPrice,
        }
        temp[i] = obj
      } else {
        temp = [...temp, dischargeMedicines[i]]
      }
    }

    dispatch({
      field: 'dischargeMedicines',
      value: temp,
    })
    // }

    setDialogOpen(false)
    setSelectedItem('')
    setSelectItemToEditId('')

    dispatch({ field: 'itemId', value: '' })
    dispatch({ field: 'priority', value: '' })
    dispatch({ field: 'schedule', value: '' })
    dispatch({ field: 'dosage', value: '' })
    dispatch({ field: 'frequency', value: '' })
    dispatch({ field: 'duration', value: '' })
    dispatch({ field: 'requestedQty', value: '' })
    dispatch({ field: 'medicineName', value: '' })
    dispatch({ field: 'unitPrice', value: '' })
    dispatch({ field: 'totalPrice', value: '' })
  }

  function handleRequestedItemEdit(i) {
    console.log(i)
    // if (i.status === "pending") {
    setDialogOpen(true)
    setSelectedItem(i.itemId)
    setSelectItemToEditId(i.itemId)

    dispatch({ field: 'itemId', value: i.itemId })
    dispatch({ field: 'priority', value: i.priority })
    dispatch({ field: 'schedule', value: i.schedule })
    dispatch({ field: 'dosage', value: i.dosage })
    dispatch({ field: 'frequency', value: i.frequency })
    dispatch({ field: 'duration', value: i.duration })
    dispatch({ field: 'requestedQty', value: i.requestedQty })
    dispatch({ field: 'medicineName', value: i.medicineName })
    dispatch({ field: 'unitPrice', value: i.unitPrice })
    dispatch({ field: 'totalPrice', value: i.totalPrice })
    // } else {
    //   setOpenNotification(true);
    //   setErrorMsg("Item can not be updated once it is in progess");
    // }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedPharmaceuticalItemsUrl + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.items.length > 0) {
              setItemFoundSuccessfully(true)
              setItemFound(res.data.data.items)
            } else {
              setItemFoundSuccessfully(false)
              setItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching medicine', e)
        })
    }
  }

  function handleAddItem(i) {
    console.log('selected med', i)

    dispatch({ field: 'itemId', value: i._id })
    dispatch({ field: 'medicineName', value: i.name })
    dispatch({ field: 'unitPrice', value: i.issueUnitCost })
    dispatch({ field: 'totalPrice', value: i.purchasePrice + i.tax })

    setSearchQuery('')
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
                ? ' EDR - Discharge Medication'
                : ' EDR - Discharge Medication'}
            </h4>
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
          <div className='row' style={{ marginTop: '20px' }}>
            {dischargeMedicines !== 0 ? (
              <CustomTable
                tableData={dischargeMedicines}
                tableDataKeys={tableDataKeysForPharmacyReq}
                tableHeading={tableHeadingForPharmacyReq}
                action={actions}
                handleEdit={handleRequestedItemEdit}
                borderBottomColor={'#60d69f'}
                borderBottomWidth={20}
              />
            ) : (
              undefined
            )}
          </div>

          <div
            className='row'
            style={{ marginTop: '25px', marginBottom: '25px' }}
          >
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
                Add Medicine
              </DialogTitle>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-12 col-sm-12 col-12'>
                    <InputLabelComponent>Search Medicine</InputLabelComponent>
                    <input
                      type='text'
                      placeholder='Search medicine by name'
                      name={'searchQuery'}
                      value={searchQuery}
                      onChange={handleSearch}
                      className='textInputStyle'
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
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Scientific Name</TableCell>
                                <TableCell>Item Code</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Total Price</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {itemFound.map((i) => {
                                return (
                                  <TableRow
                                    key={i.itemCode}
                                    onClick={() => handleAddItem(i)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    <TableCell>{i.tradeName}</TableCell>
                                    <TableCell>{i.scientificName}</TableCell>
                                    <TableCell>{i.itemCode}</TableCell>
                                    <TableCell>{i.issueUnitCost}</TableCell>
                                    <TableCell>
                                      {i.purchasePrice + i.tax}
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                        )
                      ) : (
                        <h4
                          style={{ textAlign: 'center' }}
                          onClick={() => setSearchQuery('')}
                        >
                          Medicine Not Found
                        </h4>
                      )}
                    </Paper>
                  </div>
                ) : (
                  undefined
                )}

                <div className='row'>
                  <div
                    className='col-md-4 col-sm-4 col-4'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Medicine Name*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type='text'
                      placeholder='Search from above...'
                      name={'medicineName'}
                      value={medicineName}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                  <div
                    className='col-md-4 col-sm-4 col-4'
                    style={styles.inputContainerForDropDown}
                  >
                    <InputLabelComponent>Duration*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='number'
                      placeholder='Enter Duration'
                      name={'duration'}
                      value={duration}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={duration}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>

                  <div
                    className='col-md-4 col-sm-4 col-4'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Priority*</InputLabelComponent>
                    <Select
                      fullWidth
                      id='priority'
                      name='priority'
                      value={priority}
                      onChange={onChangeValue}
                      label='Priority'
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {priorityArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                    <ErrorMessage
                      name={priority}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Dosage*</InputLabelComponent>
                    <input
                      type='number'
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
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForDropDown}
                  >
                    <InputLabelComponent>Schedule*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Enter Schedule'
                      name={'schedule'}
                      value={schedule}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={schedule}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Frequency* </InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='number'
                      placeholder='Enter Frequency'
                      name={'frequency'}
                      value={frequency}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForDropDown}
                  >
                    <InputLabelComponent>
                      Requested Quantity*
                    </InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='number'
                      placeholder='Enter Requested Quantity'
                      name={'requestedQty'}
                      value={requestedQty}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={requestedQty}
                      isFormSubmitted={isFormSubmitted}
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
                        Add
                      </Button>
                    ) : (
                      <Button
                        style={{ paddingLeft: 30, paddingRight: 30 }}
                        disabled={!validateItemsForm()}
                        onClick={editSelectedItem}
                        variant='contained'
                        color='primary'
                      >
                        {' '}
                        Edit
                      </Button>
                    )}
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
