/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'
import {
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  updateRROPRById,
  uploadsUrl,
  updateEDR,
  getRROPRById,
  getAllExternalConsultantsUrl,
  addECRUrl,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/OPR.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../../components/Table/Table'
import plus_icon from '../../../assets/img/Plus.png'
import ViewSingleRequest from './viewRequest'
import InputLabelComponent from '../../../components/InputLabel/inputLabel'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import ErrorMessage from '../../../components/ErrorMessage/errorMessage'
import Notification from '../../../components/Snackbar/Notification.js'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'

import Loader from 'react-loader-spinner'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

const tableHeadingForResident = [
  'Date/Time',
  'Description',
  'Doctor Ref',
  'Action',
]
const tableDataKeysForResident = [
  'date',
  'description',
  ['doctor', 'firstName'],
]
const tableHeadingForConsultation = [
  'Consultation ID',
  'Date/Time',
  'Description',
  'Doctor Ref',
  'Action',
]
const tableDataKeysForConsultation = [
  'consultationNo',
  'date',
  'description',
  ['requester', 'firstName'],
]
const tableHeadingForPharmacy = [
  'Request ID',
  'Date/Time',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForPharmacy = [
  '_id',
  'date',
  ['requester', 'firstName'],
  'status',
]
const tableHeadingForLabReq = [
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForLabReq = [
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]
const tableHeadingForRadiology = [
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForRadiology = [
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]

const statusArray = [
  // {
  //   key: 'pending',
  //   value: 'Pending',
  // },
  {
    key: 'completed',
    value: 'Completed',
  },
]
const actions = { view: true }
const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  input: {
    display: 'none',
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    height: '50px',
    width: '140px',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '5px',
    color: 'gray',
    width: '100%',
    height: '55px',
    cursor: 'pointer',
    padding: '15px',
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

function AddEditPurchaseRequest(props) {
  const classes = useStyles()

  const initialState = {
    labServiceId: '',
    labServiceCode: '',
    labRequestArray: '',
    labServiceName: '',
    labServiceStatus: '',

    radioServiceId: '',
    radioServiceCode: '',
    radioServiceName: '',
    radiologyRequestArray: '',
    radioServiceStatus: '',
    radioComments: '',
    radioDate: '',
    DateTime: new Date().toISOString().substr(0, 10),

    consultationNoteArray: '',
    consultationNo: '',
    date: new Date(),
    description: '',
    consultationNotes: '',
    requester: cookie.load('current_user').name,

    residentNoteArray: '',
    rdescription: '',
    note: '',
    doctor: cookie.load('current_user').name,

    pharmacyRequestArray: '',

    name: '',
    date: '',
    results: '',
    comments: '',
    status: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    labServiceId,
    labServiceCode,
    labRequestArray,
    labServiceName,
    labServiceStatus,

    radioServiceId,
    radioServiceCode,
    radioServiceName,
    radiologyRequestArray,
    radioServiceStatus,
    radioComments,
    radioDate,
    DateTime = new Date().toISOString().substr(0, 10),

    consultationNoteArray,
    consultationNo,
    // date = new Date(),
    description,
    consultationNotes,
    requester = cookie.load('current_user').name,
    // date,
    residentNoteArray,
    rdescription,
    note,
    doctor = cookie.load('current_user').name,

    pharmacyRequestArray,

    name,
    date,
    results,
    comments,
    status,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [currentUser, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false)
  const [openAddResidentDialog, setOpenAddResidentDialog] = useState(false)
  const [item, setItem] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [labRequest, setlabRequest] = useState('')
  const [radiologyRequest, setradiologyRequest] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [selectedSearchedItem, setSelectedSearchedItem] = useState('')
  const [selectedSearchedRadioItem, setSelectedSearchedRadioItem] = useState('')
  const [selectedLabArray, setSelectedLabArray] = useState([])
  const [selectedRadioArray, setSelectedRadioArray] = useState([])
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [id, setId] = useState('')
  const [searchRadioQuery, setSearchRadioQuery] = useState('')
  const [radioItemFoundSuccessfull, setRadioItemFoundSuccessfully] = useState(
    ''
  )
  const [imagePreview, setImagePreview] = useState('')
  const [pdfView, setpdfView] = useState('')
  const [slipUpload, setSlipUpload] = useState('')
  const [radioItemFound, setRadioItemFound] = useState('')
  const [addLabRequest, setaddLabRequest] = useState(false)
  const [addRadioRequest, setaddRadioRequest] = useState(false)
  const [oprId, setOprId] = useState('')
  const [radId, setRadId] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [externalConsultant, setExternalConsultant] = useState('')

  const [allExternalConsultants, setAllExternalConsultants] = useState([])

  const [
    openExtenalConsultantDialog,
    setOpenExtenalConsultantDialog,
  ] = useState(false)

  const getEDRById = (id) => {
    axios
      .get(getRROPRById + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data, 'res')

            setIsLoading(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'serviceId') {
                  dispatch({ field: 'name', value: val.name })
                  dispatch({ field: 'price', value: val.price })
                }
              } else {
                if (key === 'date') {
                  dispatch({
                    field: 'date',
                    value: new Date(val).toISOString().substr(0, 10),
                  })
                } else {
                  dispatch({ field: key, value: val })
                }
              }
            })

            // Object.entries(res.data.data).map(([key, val]) => {
            //   if (val && typeof val === 'object') {
            //     if (key === 'patientId') {
            //       dispatch({ field: 'patientId', value: val._id })
            //     } else if (key === 'labRequest') {
            //       dispatch({ field: 'labRequestArray', value: val })
            //     } else if (key === 'radiologyRequest') {
            //       dispatch({ field: 'radiologyRequestArray', value: val })
            //     } else if (key === 'consultationNote') {
            //       Object.entries(val).map(([key1, val1]) => {
            //         if (key1 == 'requester') {
            //           dispatch({ field: 'requester', value: val1._id })
            //         } else {
            //           dispatch({ field: key1, value: val1 })
            //         }
            //       })
            //       dispatch({ field: 'consultationNoteArray', value: val })
            //     } else if (key === 'residentNotes') {
            //       Object.entries(val).map(([key1, val1]) => {
            //         if (key1 == 'doctor') {
            //           dispatch({ field: 'doctor', value: val1._id })
            //         } else {
            //           dispatch({ field: key1, value: val1 })
            //         }
            //       })
            //       dispatch({ field: 'residentNoteArray', value: val })
            //     } else if (key === 'pharmacyRequest') {
            //       dispatch({ field: 'pharmacyRequestArray', value: val })
            //     }
            //   } else {
            //     dispatch({ field: key, value: val })
            //   }
            // })
          }
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  const getAllExternalConsultants = () => {
    axios
      .get(getAllExternalConsultantsUrl)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data)
            setAllExternalConsultants(res.data.data)
          }
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  useEffect(() => {
    getAllExternalConsultants()
    getEDRById(props.history.location.state.selectedItem._id)
    setOprId(props.history.location.state.id)
    setRadId(props.history.location.state.selectedItem._id)
    console.log('oprid', props.history.location.state.id)
    console.log('rad id', props.history.location.state.selectedItem._id)

    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem

    setId(props.history.location.state.selectedItem._id)
    setSelectedItem(props.history.location.state.selectedItem)
    setrequestNo(props.history.location.state.selectedItem.requestNo)
    setSelectedPatient(props.history.location.state.selectedItem.patientId)

    // if (selectedRec) {
    //   Object.entries(selectedRec).map(([key, val]) => {
    //     if (val && typeof val === "object") {
    //       if (key === "patientId") {
    //         dispatch({ field: "patientId", value: val._id });
    //       } else if (key === "labRequest") {
    //         dispatch({ field: "labRequestArray", value: val });
    //       } else if (key === "radiologyRequest") {
    //         dispatch({ field: "radiologyRequestArray", value: val });
    //       } else if (key === "consultationNote") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 == "requester") {
    //             dispatch({ field: "requester", value: val1._id });
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //         dispatch({ field: "consultationNoteArray", value: val });
    //       } else if (key === "residentNotes") {
    //         Object.entries(val).map(([key1, val1]) => {
    //           if (key1 == "doctor") {
    //             dispatch({ field: "doctor", value: val1._id });
    //           } else {
    //             dispatch({ field: key1, value: val1 });
    //           }
    //         });
    //         dispatch({ field: "residentNoteArray", value: val });
    //       } else if (key === "pharmacyRequest") {
    //         dispatch({ field: "pharmacyRequestArray", value: val });
    //       }
    //     } else {
    //       dispatch({ field: key, value: val });
    //     }
    //   });
    // }
  }, [])

  // For dummy Data
  // function getEDRdetails() {
  // axios.get(
  //   getSingleEDRPatient +
  //   '/' +
  //   props.history.location.state.selectedItem._id
  // )
  //   .then((res) => {
  //     if (res.data.success) {
  //       console.log('response after getting the EDR details', res.data.data)
  // setPurchaseOrderDetails(res.data.data.poId.purchaseRequestId)
  //   } else if (!res.data.success) {
  //     setErrorMsg(res.data.error)
  //     setOpenNotification(true)
  //   }
  //   return res
  // })
  // .catch((e) => {
  //   console.log('error: ', e)
  // })
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeExternalConsultant = (event) => {
    setExternalConsultant(event.target.value)
  }

  function viewItem(item) {
    if (item !== '') {
      setOpenItemDialog(true)
      setItem(item)
    } else {
      setOpenItemDialog(false)
      setItem('')
    }
  }

  function addConsultRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {

    let consultationNote = []

    consultationNote = [
      ...consultationNoteArray,
      {
        consultationNo: id,
        description: description,
        consultationNotes: consultationNotes,
        requester: currentUser.staffId,
        date: date,
      },
    ]

    const params = {
      _id: id,
      consultationNote: consultationNote,
    }

    // console.log("params", params);
    axios
      .put(updateEDR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response while adding Consult Req', res.data.data)
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while adding the Consultation request')
        }
      })
      .catch((e) => {
        console.log('error after adding Consultation request', e)
        setOpenNotification(true)
        setErrorMsg('Error after adding the Consultation request')
      })
    //   }
    // }
  }

  function addResidentRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {
    if (validateItemsForm()) {
      let residentNote = []

      residentNote = [
        ...residentNoteArray,
        {
          date: date,
          description: rdescription,
          doctor: currentUser.staffId,
          note: note,
        },
      ]

      const params = {
        _id: id,
        residentNotes: residentNote,
      }

      // console.log("params", params);
      axios
        .put(updateEDR, params)
        .then((res) => {
          if (res.data.success) {
            console.log('response while adding Resident Req', res.data.data)
            props.history.goBack()
          } else if (!res.data.success) {
            setOpenNotification(true)
            setErrorMsg('Error while adding the Resident request')
          }
        })
        .catch((e) => {
          console.log('error after adding Resident request', e)
          setOpenNotification(true)
          setErrorMsg('Error after adding the Resident request')
        })
      //   }
    }
  }

  const addNewRequest = () => {
    let path = `viewOPR/add`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        selectedItem: selectedItem,
        pharmacyRequestArray,
      },
    })
  }

  function hideDialog() {
    setOpenAddConsultDialog(false)
    setOpenAddResidentDialog(false)

    dispatch({ field: 'consultationNo', value: '' })
    dispatch({ field: 'description', value: '' })
    dispatch({ field: 'consultationNotes', value: '' })
    dispatch({ field: 'rdescription', value: '' })
    dispatch({ field: 'note', value: '' })
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedLaboratoryService + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setItemFoundSuccessfully(true)
              setItemFound(res.data.data)
            } else {
              setItemFoundSuccessfully(false)
              setItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching req', e)
        })
    }
  }

  function handleAddItem(i) {
    // console.log("selected item", i);

    dispatch({ field: 'labServiceId', value: i._id })
    dispatch({ field: 'labServiceCode', value: i.serviceNo })
    dispatch({ field: 'labServiceName', value: i.name })
    dispatch({ field: 'labServiceStatus', value: i.status })

    setSearchQuery('')
    setaddLabRequest(true)
  }

  const addSelectedLabItem = () => {
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {

    let found =
      labRequestArray &&
      labRequestArray.find((item) => item.serviceId === labServiceId)

    if (found) {
      setOpenNotification(true)
      setErrorMsg('This Service has already been added.')
    } else {
      dispatch({
        field: 'labRequestArray',
        value: [
          ...labRequestArray,
          {
            serviceId: labServiceId,
            serviceCode: labServiceCode,
            serviceName: labServiceName,
            requester: currentUser.staffId,
            requesterName: requester,
            status: labServiceStatus,
          },
        ],
      })
      // }
    }

    dispatch({ field: 'labServiceId', value: '' })
    dispatch({ field: 'labServiceName', value: '' })
    dispatch({ field: 'labServiceStatus', value: '' })
    dispatch({ field: 'labServiceCode', value: '' })

    setaddLabRequest(false)
  }

  const saveLabReq = () => {
    // console.log("THIS IS ARRAY",labRequestArray)

    let labItems = []
    for (let i = 0; i < labRequestArray.length; i++) {
      labItems = [
        ...labItems,
        {
          serviceId: labRequestArray[i].serviceId,
          serviceCode: labRequestArray[i].serviceCode,
          requesterName: labRequestArray[i].requesterName,
          requester: labRequestArray[i].requester,
          serviceName: labRequestArray[i].serviceName,
          status: labRequestArray[i].status,
        },
      ]
    }
    const params = {
      _id: id,
      labRequest: labItems,
    }
    // console.log("params", params);
    axios
      .put(updateEDR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Lab Request', res.data)
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding Lab Request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the Lab Request')
      })
  }

  const handleRadioSearch = (e) => {
    setSearchRadioQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedRadiologyService + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setRadioItemFoundSuccessfully(true)
              setRadioItemFound(res.data.data)
            } else {
              setRadioItemFoundSuccessfully(false)
              setRadioItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching req', e)
        })
    }
  }

  function handleAddRadioItem(i) {
    console.log('selected item', i)

    dispatch({ field: 'radioServiceId', value: i._id })
    dispatch({ field: 'radioServiceCode', value: i.serviceNo })
    dispatch({ field: 'radioServiceName', value: i.name })
    dispatch({ field: 'radioServiceStatus', value: i.status })
    dispatch({ field: 'DateTime', value: i.date })

    setSearchRadioQuery('')
    setaddRadioRequest(true)
  }

  const addSelectedRadioItem = () => {
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {

    let found =
      radiologyRequestArray &&
      radiologyRequestArray.find((item) => item.serviceId === radioServiceId)

    if (found) {
      setOpenNotification(true)
      setErrorMsg('This Service has already been added.')
    } else {
      dispatch({
        field: 'radiologyRequestArray',
        value: [
          ...radiologyRequestArray,
          {
            serviceId: radioServiceId,
            serviceCode: radioServiceCode,
            requesterName: requester,
            serviceName: radioServiceName,
            requester: currentUser.staffId,
            status: radioServiceStatus,
            comments: radioComments,
            date: DateTime,
          },
        ],
      })
      // }
    }

    dispatch({ field: 'radioServiceId', value: '' })
    dispatch({ field: 'radioServiceCode', value: '' })
    dispatch({ field: 'radioServiceName', value: '' })
    dispatch({ field: 'radioServiceStatus', value: '' })
    dispatch({ field: 'radioComments', value: '' })
    dispatch({ field: 'DateTime', value: '' })

    setaddLabRequest(false)
  }

  const saveRadioReq = () => {
    console.log('THISSSSS ISS ARRAYY', radiologyRequestArray)

    // let radioItems = []
    // for (let i = 0; i < radiologyRequestArray.length; i++) {
    //   radioItems = [
    //     ...radioItems,
    //     {
    //       serviceId: radiologyRequestArray[i].serviceId,
    //       serviceCode: radiologyRequestArray[i].serviceCode,
    //       requester: radiologyRequestArray[i].requester,
    //       requesterName: radiologyRequestArray[i].requesterName,
    //       serviceName: radiologyRequestArray[i].serviceName,
    //       status: radiologyRequestArray[i].status,
    //       comments: radiologyRequestArray[i].comments,
    //       date: radiologyRequestArray[i].date,
    //     },
    //   ]
    // }
    let formData = new FormData()
    if (slipUpload) {
      formData.append('file', slipUpload, slipUpload.name)
    }
    const params = {
      radiologyRequestId: radId,
      OPRId: oprId,
      data: selectedItem,
      status: status,
    }
    formData.append('data', JSON.stringify(params))
    console.log('params', params)
    axios
      .put(updateRROPRById, formData, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          // props.history.goBack()
          props.history.push({
            pathname: 'success',
            state: {
              message: 'Radiology Service updated successfully',
            },
          })
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding Radio Request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the Radiology Request')
      })
  }

  const onSlipUpload = (event) => {
    var file = event.target.files[0]
    var fileType = file.name.slice(file.name.length - 3)

    // console.log("Selected file : ", file.name)
    // console.log("file type : ", fileType)

    setSlipUpload(file)
    var reader = new FileReader()
    var url = reader.readAsDataURL(file)

    reader.onloadend = function() {
      if (fileType === 'pdf') {
        setpdfView(file.name)
      } else {
        setImagePreview([reader.result])
      }
    }
  }

  const TriageAssessment = () => {
    let path = `viewEDR/TriageAndAssessment`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
      },
    })
  }

  const dischargeRequest = () => {
    let path = `viewEDR/dischargerequest`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
      },
    })
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }
  function validateItemsForm() {
    return rdescription && rdescription.length > 0 && note && note.length > 0
  }

  function handleGenerateECR() {
    const params = {
      edrId: id,
      // iprId,
      generatedBy: currentUser.staffId,
      generatedFor: externalConsultant,
      patient: selectedItem.patientId._id,
      generatedFrom: 'EDR',
    }
    console.log('params', params)
    axios
      .post(addECRUrl, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding  external consultation request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the external consultation request')
      })
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

      {!isLoading ? (
        <div className='cPadding'>
          <div className='subheader'>
            <div>
              <img src={business_Unit} />
              <h4>OPR - Radiology Service</h4>
            </div>

            {/* <div>
              <Button
                onClick={TriageAssessment}
                style={styles.stylesForButton}
                variant='contained'
                color='primary'
              >
                Triage And Assessment
              </Button>
            </div> */}
          </div>
          <div
            style={{
              height: '20px',
            }}
          />
          {/* <div className="container" style={styles.patientDetails}>
            <div className="row">
              <div className="col-md-12">
                <h4 style={{ color: "blue", fontWeight: "600" }}>
                  Patient Details
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Patient Name
                  </InputLabel>
                  <span>
                    {selectedPatient.firstName + ` ` + selectedPatient.lastName}{" "}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Gender
                  </InputLabel>
                  <span>{selectedPatient.gender}</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Age
                  </InputLabel>
                  <span>{selectedPatient.age}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Patient ID
                  </InputLabel>
                  <span>{selectedPatient.profileNo}</span>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Insurance No
                  </InputLabel>
                  <span>
                    {selectedPatient.insuranceId
                      ? selectedPatient.insuranceId
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Request No
                  </InputLabel>
                  <span>{requestNo}</span>
                </div>
              </div>
            </div>
          </div> */}

          <div
            style={{
              height: '20px',
            }}
          />

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className={`container-fluid ${classes.root}`}
          >
            {/* <div style={{ marginTop: '20px' }} className='row'>
              <div
                className='col-md-12 col-sm-12 col-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  label='Service Name'
                  variant='filled'
                  placeholder='Search service by name'
                  name={'searchRadioQuery'}
                  value={searchRadioQuery}
                  onChange={handleRadioSearch}
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

            {searchRadioQuery ? (
              // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
              <div style={{ zIndex: 10 }}>
                <Paper>
                  {radioItemFoundSuccessfull ? (
                    radioItemFound && (
                      <Table size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Service Number</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align='center'>Description</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {radioItemFound.map((i, index) => {
                            return (
                              <TableRow
                                key={i.serviceNo}
                                onClick={() => handleAddRadioItem(i)}
                                style={{ cursor: 'pointer' }}
                              >
                                <TableCell>{i.name}</TableCell>
                                <TableCell>{i.serviceNo}</TableCell>
                                <TableCell>{i.price}</TableCell>
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
                      onClick={() => setSearchRadioQuery('')}
                    >
                      Service Not Found
                    </h4>
                  )}
                </Paper>
              </div>
            ) : (
              undefined
            )}

            <div className='row'>
              <div
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  variant='filled'
                  label='Date/Time'
                  name={'DateTime'}
                  value={DateTime}
                  type='date'
                  className='textInputStyle'
                  // onChange={(val) => onChangeValue(val, 'DateTime')}
                  InputLabelProps={{
                    shrink: true,
                    color: 'black',
                  }}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
              <div
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  variant='filled'
                  label='Sample ID'
                  name={'sampleID'}
                  // value={DateTime}
                  type='text'
                  className='textInputStyle'
                  // onChange={(val) => onChangeValue(val, 'DateTime')}
                  InputLabelProps={{
                    shrink: true,
                    color: 'black',
                  }}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px' }} className='row'>
              <div
                className='col-md-5 col-sm-10 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled
                  label='Selected Serive'
                  variant='filled'
                  placeholder='Search from above...'
                  name={'radioServiceName'}
                  value={radioServiceName}
                  onChange={onChangeValue}
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
                className='col-md-5 col-sm-5 col-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  // disabled={enableForm}
                  label='Comments / Notes'
                  name={'radioComments'}
                  value={radioComments}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                />
              </div>

              <div className='col-md-2 col-sm-2 col-6'>
                <Button
                  style={{
                    ...styles.stylesForButton,
                    marginTop: '7px',
                    backgroundColor: '#e877a1',
                  }}
                  disabled={!addRadioRequest}
                  onClick={addSelectedRadioItem}
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Add Service
                </Button>
              </div>
            </div> */}

            <div className='row' style={{ marginTop: '20px' }}>
              <div
                className='col-md-6 col-sm-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label='Radiology/Imaging'
                  name={'name'}
                  value={name}
                  // onChange={onChangeValue}
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
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  variant='filled'
                  label='Date'
                  name={'date'}
                  value={date}
                  type='date'
                  className='textInputStyle'
                  // onChange={(val) => onChangeValue(val, 'DateTime')}
                  InputLabelProps={{
                    shrink: true,
                    color: 'black',
                  }}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            </div>

            <div className='row' style={{ marginTop: '20px' }}>
              <div
                className='col-md-12 col-sm-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label='Comments/Notes'
                  name={'comments'}
                  value={comments}
                  // onChange={onChangeValue}
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
            </div>

            <div className='row' style={{ marginTop: '20px' }}>
              <div
                className='col-md-12 col-sm-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  fullWidth
                  select
                  id='status'
                  name='status'
                  value={status}
                  onChange={onChangeValue}
                  variant='filled'
                  label='Status'
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
                  {statusArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </div>
            </div>

            <div className='row' style={{ marginTop: '20px' }}>
              <div
                className='col-md-12 col-sm-6 col-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <label style={styles.upload}>
                  <TextField
                    required
                    type='file'
                    style={styles.input}
                    onChange={onSlipUpload}
                    name='results'
                  />
                  <FaUpload /> Results
                </label>

                {pdfView !== '' ? (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#2c6ddd',
                      fontStyle: 'italic',
                    }}
                  >
                    <span style={{ color: 'black' }}>Selected File : </span>
                    {pdfView}
                  </div>
                ) : (
                  undefined
                )}
              </div>
            </div>

            <div className='row'>
              {results !== '' && results.includes('\\') ? (
                <>
                  {results !== '' &&
                  results.slice(results.length - 3) !== 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <img
                        src={uploadsUrl + results.split('\\')[1]}
                        className='depositSlipImg'
                      />
                    </div>
                  ) : results !== '' &&
                    results.slice(results.length - 3) === 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                        // textAlign:'center',
                      }}
                    >
                      <a
                        href={uploadsUrl + results.split('\\')[1]}
                        style={{ color: '#2c6ddd' }}
                      >
                        Click here to open results
                      </a>
                    </div>
                  ) : (
                    undefined
                  )}
                </>
              ) : results !== '' && results.includes('/') ? (
                <>
                  {results !== '' &&
                  results.slice(results.length - 3) !== 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <img
                        src={uploadsUrl + results}
                        className='depositSlipImg'
                      />
                    </div>
                  ) : results !== '' &&
                    results.slice(results.length - 3) === 'pdf' ? (
                    <div
                      className='col-md-6 col-sm-6 col-6'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <a
                        href={uploadsUrl + results}
                        style={{ color: '#2c6ddd' }}
                      >
                        Click here to open results
                      </a>
                    </div>
                  ) : (
                    undefined
                  )}
                </>
              ) : (
                undefined
              )}

              {imagePreview !== '' ? (
                <div
                  className='col-md-6 col-sm-6 col-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <img src={imagePreview} className='depositSlipImg' />
                  {results !== '' ? (
                    <div style={{ color: 'black', textAlign: 'center' }}>
                      New results
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
              ) : (
                undefined
              )}
            </div>

            {/* <div className='row' style={{ marginTop: '20px' }}>
              {radiologyRequestArray !== 0 ? (
                <CustomTable
                  tableData={radiologyRequestArray}
                  tableDataKeys={tableDataKeysForRadiology}
                  tableHeading={tableHeadingForRadiology}
                  handleView={viewItem}
                  action={actions}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}
            </div> */}

            <div className='row' style={{ marginBottom: '25px' }}>
              <div className='col-md-6 col-sm-6 col-6'>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
              <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                <Button
                  onClick={saveRadioReq}
                  style={styles.stylesForButton}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Update</strong>
                </Button>
              </div>
            </div>
          </div>

          {openItemDialog ? (
            <ViewSingleRequest
              item={item}
              openItemDialog={openItemDialog}
              viewItem={viewItem}
            />
          ) : (
            undefined
          )}

          <Dialog
            aria-labelledby='form-dialog-title'
            open={openAddConsultDialog}
            maxWidth='xl'
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: '#31e2aa' }}>
              <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
                Add Consultation Note
              </DialogTitle>
              <div className='container-fluid'>
                <div className='row'>
                  <div
                    className='col-md-12 col-sm-12 col-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Description*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Enter Your description'
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
                    <InputLabelComponent>
                      Consultation Note*
                    </InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Add your consultation here...'
                      name={'consultationNotes'}
                      value={consultationNotes}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={consultationNotes}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Date*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type='text'
                      placeholder='Date'
                      name={'date'}
                      value={date}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Requester*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type='text'
                      placeholder='Requester'
                      name={'requester'}
                      value={requester}
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
                      // disabled={!validateItemsForm()}
                      onClick={addConsultRequest}
                      variant='contained'
                      color='primary'
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            aria-labelledby='form-dialog-title'
            open={openAddResidentDialog}
            maxWidth='xl'
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: '#31e2aa' }}>
              <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
                Add Resident Note
              </DialogTitle>
              <div className='container-fluid'>
                <div className='row'>
                  <div
                    className='col-md-12 col-sm-12 col-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Description*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Enter Your description'
                      name={'rdescription'}
                      value={rdescription}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={rdescription}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Note*</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Add your note here...'
                      name={'note'}
                      value={note}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                    <ErrorMessage
                      name={note}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Date*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type='text'
                      placeholder='Date'
                      name={'date'}
                      value={date}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>Doctor*</InputLabelComponent>
                    <input
                      disabled
                      style={styles.inputField}
                      type='text'
                      placeholder='Doctor'
                      name={'doctor'}
                      value={doctor}
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
                      onClick={addResidentRequest}
                      variant='contained'
                      color='primary'
                    >
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            aria-labelledby='form-dialog-title'
            open={openExtenalConsultantDialog}
            maxWidth='xs'
            fullWidth={true}
          >
            <DialogContent style={{ backgroundColor: '#31e2aa' }}>
              <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
                Add External Consultant
              </DialogTitle>
              <div className='container-fluid'>
                <div className='row'>
                  <div
                    className='col-md-12 col-sm-12 col-12'
                    style={styles.inputContainerForTextField}
                  >
                    <InputLabelComponent>
                      External Consultant*
                    </InputLabelComponent>
                    <Select
                      style={styles.inputField}
                      fullWidth
                      labelId='receiptUnit-label'
                      id='externalConsultant'
                      name='externalConsultant'
                      value={externalConsultant}
                      onChange={handleChangeExternalConsultant}
                      label='External Consultant'
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {allExternalConsultants.map((val) => {
                        return (
                          <MenuItem key={val._id} value={val._id}>
                            {val.firstName + ' ' + val.lastName}
                          </MenuItem>
                        )
                      })}
                    </Select>

                    <ErrorMessage
                      name={externalConsultant}
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                    <Button
                      onClick={() => setOpenExtenalConsultantDialog(false)}
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
                      // disabled={!validateItemsForm()}
                      onClick={handleGenerateECR}
                      disabled={!externalConsultant}
                      variant='contained'
                      color='primary'
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      ) : (
        <div className='LoaderStyle'>
          <Loader type='TailSpin' color='red' height={50} width={50} />
        </div>
      )}
    </div>
  )
}
export default AddEditPurchaseRequest
