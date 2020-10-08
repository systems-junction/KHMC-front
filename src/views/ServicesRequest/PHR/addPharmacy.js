import React, { useEffect, useState, useReducer } from 'react'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../../components/Snackbar/Notification.js'
import {
  updateOPR,
  getSearchedPharmaceuticalItemsUrl,
} from '../../../public/endpoins'
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
import purchase_request from '../../../assets/img/PHR.png'
import Back from '../../../assets/img/Back_Arrow.png'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import socketIOClient from 'socket.io-client'
import CustomTable from '../../../components/Table/Table'
import { colors } from '@material-ui/core'

const scheduleArray = [
  { key: 'Now', value: 'Now/Immediate' },
  // { key: "Immediate", value: "Immediate" },
]
const priorityArray = [
  { key: 'Emergency', value: 'Emergency' },
  { key: 'Regular', value: 'Regular' },
  { key: 'PRN', value: 'PRN' },
]
const tableHeadingForPharmacyReq = [
  'Medicine Name',
  'Duration',
  'Dosage',
  // 'Additional Note',
  'Action',
]
const tableDataKeysForPharmacyReq = [
  'medicineName',
  'duration',
  'dosage',
  // 'additionalNote',
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
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    width: '140px',
    height: '50px',
    outline: 'none',
  },
  stylesForPurchaseButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    width: '140px',
    height: '50px',
    outline: 'none',
  },
  inputField: {
    outline: 'none',
  },
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  input: {
    display: 'none',
  },
  buttonContainer: {
    marginTop: 25,
  },
}

const useStyles = makeStyles((theme) => ({
  scroller: {
    flexGrow: '0',
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:disabled': {
      color: 'gray',
    },
  },
  multilineColor: {
    backgroundColor: 'white',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:after': {
      borderBottomColor: 'black',
    },
  },
  root: {
    '& .MuiTextField-root': {
      backgroundColor: 'white',
    },
    '& .Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
}))

function AddEditEDR(props) {
  const classes = useStyles()
  const initialState = {
    date: new Date(),
    status: 'pending',
    requester: '',
    medicineDataArray: '',
    itemId: '',
    duration: '',
    dosage: '',
    priority: '',
    schedule: '',
    frequency: '',
    requestedQty: '',
    // additionalNote:'',
    pharmacyRequest: '',
    medicineName: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    medicineName,
    date = new Date(),
    status = 'pending',
    requester,
    medicineDataArray,
    itemId,
    duration,
    dosage,
    priority,
    schedule,
    frequency,
    requestedQty,
    // additionalNote,
    pharmacyRequest,
  } = state

  const onChangeValue = (e) => {
    var pattern = /^[0-9 ]*$/
    if (
      e.target.name === 'frequency' ||
      e.target.name === 'dosage' ||
      e.target.name === 'duration' ||
      e.target.name === 'requestedQty'
    ) {
      if (pattern.test(e.target.value) === false) {
        return
      }
    }
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w.\s]/gi, ''),
    })
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
  const [selectItemToEditId, setSelectItemToEditId] = useState('')
  const [id, setId] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [medicines, setmedicines] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [selectedSearchedItem, setSelectedSearchedItem] = useState('')
  const [selectedLabArray, setSelectedLabArray] = useState([])
  const [enableSave, setEnableSave] = useState(true)
  const [pharmacyReqArray, setPharmacyRequest] = useState('')

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

    setPharmacyRequest(props.history.location.state.pharmacyRequestArray)

    // const pharmacyReq = props.history.location.state.selectedItem.pharmacyRequest

    // let temp = [];
    // for (let i = 0; i < pharmacyReq.length; i++)
    // {
    // if (pharmacyReq[i].requester === cookie.load('current_user').staffId)
    // {
    // for (let j = 0; j < pharmacyReq[i].medicine.length ;j++)
    // {
    // temp.push(pharmacyReq[i].medicine[j]);
    // }
    // }
    // }
    // console.log("Only show the meds of the person logged in", temp);
    // setmedicines(temp.reverse());

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          if (key === 'pharmacyRequest') {
            // Object.entries(val).map(([key1, val1]) => {
            //   // console.log("pharmacy k andr",key1,val1)
            //   Object.entries(val1).map(([key2, val2]) => {
            //     if (key2 === 'medicine') {
            //       // console.log("med k andr",key2,val2)
            //       // Object.entries(val2).map(([key3,val3])=>
            //       // {
            //       //   Object.entries(val3).map(([key4,val4])=>
            //       //   {
            //       //     if(key4 === "itemId"){
            //       //       dispatch({ field: "itemId", value: val4._id });
            //       //     }
            //       //     else{
            //       //       console.log("medicine k andr",key4,val4)
            //       //       dispatch({ field: key4, value: val4 });
            //       //     }
            //       //   })
            //       // })
            //       // dispatch({ field: 'medicineDataArray', value: val2 })
            //       console.log(key2, val2)
            //     } else if (key2 === 'requester') {
            //       dispatch({ field: 'requester', value: val2._id })
            //     } else {
            //       dispatch({ field: key2, value: val2 })
            //     }
            //   })
            // })
            dispatch({ field: 'pharmacyRequest', value: val })
          }
        } else {
          dispatch({ field: key, value: val })
        }
      })
    }
    // return () => soc.disconnect();
  }, [])

  function validateForm() {
    // let jit = true;
    // let qtyIsLess = true;
    // if (reason === "jit") {
    //   jit = requesterName !== "" && department !== "" && orderType !== "";
    // }
    // return (
    //   comments !== "" &&
    //   requestedItemsArray !== "" &&
    //   requestedItemsArray.length > 0 &&
    // dateGenerated !== "" &&
    // itemCode !== "" &&
    // description !== "" &&
    // itemName !== "" &&
    // requestedQty !== "" &&
    // currentQty !== "" &&
    // fuItemCost !== "" &&
    // reason !== "" &&
    // fuId !== "" &&
    // jit &&
    // patientReferenceNo !== ""
    //  && receiptUnit !== ""
    // && issueUnit !== ""
    // );
  }

  const handleAdd = () => {
    var now = new Date()
    var start = new Date(now.getFullYear(), 0, 0)
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
    var oneDay = 1000 * 60 * 60 * 24
    var day = Math.floor(diff / oneDay)

    var dateNow = new Date()
    var YYYY = dateNow
      .getFullYear()
      .toString()
      .substr(-2)
    var HH = dateNow.getHours()
    var mm = dateNow.getMinutes()
    let ss = dateNow.getSeconds()

    const PRrequestNo = 'PR' + day + YYYY + HH + mm + ss
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    let medicineData = []

    for (let i = 0; i < medicineDataArray.length; i++) {
      medicineData = [
        ...medicineData,
        {
          itemId: medicineDataArray[i].itemId,
          medicineName: medicineDataArray[i].medicineName,
          duration: medicineDataArray[i].duration,
          dosage: medicineDataArray[i].dosage,
          priority: medicineDataArray[i].priority,
          schedule: medicineDataArray[i].schedule,
          frequency: medicineDataArray[i].frequency,
          requestedQty: medicineDataArray[i].requestedQty,
          // PRrequestNo: medicineDataArray[i].PRrequestNo,
          // additionalNote: medicineDataArray[i].additionalNote,
        },
      ]
    }

    let pharmacyRequestArray = []

    for (let i = 0; i < pharmacyReqArray.length; i++) {
      pharmacyRequestArray = [
        ...pharmacyRequestArray,
        { ...pharmacyReqArray[i], status: 'completed' },
      ]
    }

    pharmacyRequestArray = [
      ...pharmacyRequestArray,
      {
        date: new Date(),
        status: 'completed',
        requester: currentUser.staffId,
        medicine: medicineData,
        PRrequestNo: PRrequestNo,
      },
    ]

    const params = {
      _id: id,
      pharmacyRequest: pharmacyRequestArray,
      status: 'completed',
    }
    console.log('params', params)
    axios
      .put(updateOPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response while adding Medicine Req', res.data.data)
          // props.history.goBack()
          props.history.push({
            pathname: 'success',
            state: {
              message: `Pharmacy Request: ${
                res.data.data.pharmacyRequest[
                  res.data.data.pharmacyRequest.length - 1
                ].PRrequestNo
              } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
            },
          })
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
    //}
    //}
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
      dosage &&
      dosage.length > 0
    )
  }

  function hideDialog() {
    setDialogOpen(false)
    setSelectedItem('')
    setSelectItemToEditId('')

    dispatch({ field: 'itemId', value: '' })
    dispatch({ field: 'medicineName', value: '' })
    dispatch({ field: 'duration', value: '' })
    dispatch({ field: 'dosage', value: '' })
    // dispatch({ field: 'additionalNote', value: '' })
    dispatch({ field: 'priority', value: '' })
    dispatch({ field: 'schedule', value: '' })
    dispatch({ field: 'frequency', value: '' })
    dispatch({ field: 'requestedQty', value: '' })
  }

  const addSelectedItem = () => {
    setIsFormSubmitted(true)
    if (validateItemsForm()) {
      setDialogOpen(false)

      let found =
        medicineDataArray &&
        medicineDataArray.find((item) => item.itemId === itemId)

      if (found) {
        setOpenNotification(true)
        setErrorMsg('This Medicine has already been added.')
      } else {
        dispatch({
          field: 'medicineDataArray',
          value: [
            ...medicineDataArray,
            {
              itemId,
              medicineName,
              duration,
              dosage,
              // additionalNote,
              priority,
              schedule,
              frequency,
              requestedQty: frequency * dosage * duration,
            },
          ],
        })
      }
    }

    dispatch({ field: 'itemId', value: '' })
    dispatch({ field: 'medicineName', value: '' })
    dispatch({ field: 'duration', value: '' })
    dispatch({ field: 'dosage', value: '' })
    // dispatch({ field: 'additionalNote', value: '' })
    dispatch({ field: 'priority', value: '' })
    dispatch({ field: 'schedule', value: '' })
    dispatch({ field: 'frequency', value: '' })
    dispatch({ field: 'requestedQty', value: '' })
    setEnableSave(false)
  }

  const editSelectedItem = () => {
    if (validateItemsForm()) {
      setDialogOpen(false)
      let temp = []

      // console.log("MEDSSS",medicines)

      for (let i = 0; i < medicineDataArray.length; i++) {
        if (medicineDataArray[i].itemId === selectItemToEditId) {
          let obj = {
            itemId,
            medicineName,
            duration,
            dosage,
            // additionalNote,
            priority,
            schedule,
            frequency,
            requestedQty: frequency * dosage * duration,
          }
          temp[i] = obj
        } else {
          temp = [...temp, medicineDataArray[i]]
        }
      }

      dispatch({
        field: 'medicineDataArray',
        value: temp,
      })
    }

    setDialogOpen(false)
    setSelectedItem('')
    setSelectItemToEditId('')

    dispatch({ field: 'itemId', value: '' })
    dispatch({ field: 'medicineName', value: '' })
    dispatch({ field: 'duration', value: '' })
    dispatch({ field: 'dosage', value: '' })
    dispatch({ field: 'priority', value: '' })
    dispatch({ field: 'schedule', value: '' })
    dispatch({ field: 'frequency', value: '' })
    dispatch({ field: 'requestedQty', value: '' })
    // dispatch({ field: 'additionalNote', value: '' })
    setEnableSave(false)
  }

  function handleRequestedItemEdit(i) {
    console.log(i)
    // if (i.status === "pending") {
    setDialogOpen(true)
    setSelectedItem(i.itemId)
    setSelectItemToEditId(i.itemId)
    dispatch({ field: 'itemId', value: i.itemId })
    dispatch({ field: 'medicineName', value: i.medicineName })
    dispatch({ field: 'duration', value: i.duration })
    dispatch({ field: 'dosage', value: i.dosage })
    dispatch({ field: 'priority', value: i.priority })
    dispatch({ field: 'schedule', value: i.schedule })
    dispatch({ field: 'frequency', value: i.frequency })
    dispatch({ field: 'requestedQty', value: i.requestedQty })
    // dispatch({ field: 'additionalNote', value: i.additionalNote })
    // } else {
    //   setOpenNotification(true);
    //   setErrorMsg("Item can not be updated once it is in progess");
    // }
  }

  const handleSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchQuery(a)
    if (a.length >= 1) {
      axios
        .get(getSearchedPharmaceuticalItemsUrl + '/' + a)
        .then((res) => {
          if (res.data.success) {
            console.log('res', res)
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
    console.log('selected med', i.name)
    console.log('selected id', i._id)

    dispatch({ field: 'itemId', value: i._id })
    dispatch({ field: 'medicineName', value: i.name })

    setSearchQuery('')
  }

  console.log('pharmay request', pharmacyReqArray)

  return (
    <div
      style={{
        backgroundColor: 'rgb(19 213 159)',
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
      <div className={`cPadding ${classes.root}`}>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={purchase_request} />
            <h4>{comingFor === 'add' ? 'OPR - Pharmacy Request' : ''}</h4>
          </div>

          <div style={{ marginRight: '-10px' }}>
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
          className='container-fluid'
        >
          <div className='row' style={{ marginTop: '20px' }}>
            {medicineDataArray !== 0 ? (
              <CustomTable
                tableData={medicineDataArray}
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
                style={{
                  width: 45,
                  height: 35,
                  cursor: 'pointer',
                  marginLeft: '-10px',
                }}
              />
            </div>

            <div
              className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
              style={{ paddingRight: '1px' }}
            >
              <Button
                style={styles.stylesForPurchaseButton}
                disabled={enableSave}
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
            <DialogContent style={{ backgroundColor: 'rgb(19 213 159)' }}>
              <DialogTitle
                id='simple-dialog-title'
                style={{ color: 'white', marginLeft: '-15px' }}
              >
                Add Medicine
              </DialogTitle>
              <div className={`container-fluid ${classes.root}`}>
                <div className='row'>
                  <div
                    className='col-md-12 col-sm-12 col-12'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      label='Search Medicine'
                      variant='filled'
                      placeholder='Search medicine by name'
                      name={'searchQuery'}
                      value={searchQuery}
                      onChange={handleSearch}
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>

                {searchQuery ? (
                  // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                  <div style={{ zIndex: 3 }}>
                    <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                      {itemFoundSuccessfull ? (
                        itemFound && (
                          <Table size='small'>
                            <TableHead>
                              <TableRow>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Scientific Name</TableCell>
                                <TableCell>Item Code</TableCell>
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
                                    <TableCell>{i.tradeName}</TableCell>
                                    <TableCell>{i.scientificName}</TableCell>
                                    <TableCell>{i.itemCode}</TableCell>
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

                <div
                  className='row'
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                  <div
                    className='col-md-4 col-sm-4 col-4'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled
                      label='Search from above...'
                      name={'medicineName'}
                      value={medicineName}
                      onChange={onChangeValue}
                      variant='filled'
                      className='textInputStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                  <div
                    className='col-md-4 col-sm-4 col-4'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      fullWidth
                      select
                      id='priority'
                      name='priority'
                      value={priority}
                      onChange={onChangeValue}
                      variant='filled'
                      label='Priority'
                      className='dropDownStyle'
                      // error={priority === '' && isFormSubmitted}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
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
                    </TextField>
                  </div>

                  <div
                    className='col-md-4 col-sm-4 col-4'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      fullWidth
                      select
                      id='schedule'
                      name='schedule'
                      variant='filled'
                      value={schedule}
                      onChange={onChangeValue}
                      label='Schedule'
                      // error={schedule === '' && isFormSubmitted}
                      className='dropDownStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {scheduleArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-3 col-sm-3 col-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      style={styles.inputField}
                      // type='number'
                      label='Frequency'
                      variant='filled'
                      name={'frequency'}
                      value={frequency}
                      onChange={onChangeValue}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                      className='textInputStyle'
                    />
                  </div>
                  <div
                    className='col-md-3 col-sm-3 col-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      style={styles.inputField}
                      // type='number'
                      label='Duration'
                      name={'duration'}
                      value={duration}
                      variant='filled'
                      onChange={onChangeValue}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                      className='textInputStyle'
                    />
                  </div>
                  {/* <div
                    className='col-md-3 col-sm-3 col-3'
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
                  </div> */}
                  <div
                    className='col-md-3 col-sm-3 col-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      // type='number'
                      label='Dosage'
                      name={'dosage'}
                      value={dosage}
                      onChange={onChangeValue}
                      className='textInputStyle'
                      variant='filled'
                      // error={dosage === '' && isFormSubmitted}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                  <div
                    className='col-md-3 col-sm-3 col-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      // type='number'
                      disabled
                      label='Requested Qty'
                      variant='filled'
                      name={'requestedQty'}
                      value={frequency * dosage * duration}
                      onChange={onChangeValue}
                      // error={requestedQty === '' && isFormSubmitted}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                      className='textInputStyle'
                    />
                  </div>
                </div>

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div
                    style={{
                      marginTop: '2%',
                      marginBottom: '2%',
                      marginLeft: '-10px',
                    }}
                  >
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
                      marginRight: '-10px',
                    }}
                  >
                    {selectItemToEditId === '' ? (
                      <Button
                        style={{
                          color: 'white',
                          cursor: 'pointer',
                          borderRadius: 5,
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
