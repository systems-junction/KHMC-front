import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'
import Fingerprint from '../../../assets/img/Bar Code.png'
import BarCode from '../../../assets/img/Bar Code.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  updateOPR,
  uploadsUrl,
  updateEDR,
  getOPRById,
  getAllExternalConsultantsUrl,
  addECRUrl,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/RR.png'
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
  'Price ( JD)',
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
  'Price ( JD)',

  'Status',
  'Action',
]
const tableDataKeysForRadiology = [
  'serviceCode',
  'serviceName',
  'requesterName',
  ['serviceId', 'price'],

  'status',
]
const actions = { edit: true }
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
    // width: '140px',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
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

    results: '',

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
    results,

    consultationNoteArray,
    consultationNo,
    // date = new Date(),
    description,
    consultationNotes,
    requester = cookie.load('current_user').name,
    date,
    residentNoteArray,
    rdescription,
    note,
    doctor = cookie.load('current_user').name,

    pharmacyRequestArray,
  } = state

  const onChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w\s]/gi, ''),
    })
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
  const [enableSave, setEnableSave] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [rowId, setRowId] = useState('')
  const [externalConsultant, setExternalConsultant] = useState('')

  const [allExternalConsultants, setAllExternalConsultants] = useState([])

  const [
    openExtenalConsultantDialog,
    setOpenExtenalConsultantDialog,
  ] = useState(false)
  const [statusBoolean, setStatusBoolean] = useState(false)

  const getEDRById = (id) => {
    axios
      .get(getOPRById + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data[0])
            if (res.data.data[0].status === 'completed') {
              setStatusBoolean(true)
            }
            setIsLoading(false)

            Object.entries(res.data.data[0]).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'patientId') {
                  dispatch({ field: 'patientId', value: val._id })
                } else if (key === 'labRequest') {
                  dispatch({ field: 'labRequestArray', value: val })
                } else if (key === 'radiologyRequest') {
                  val.map(
                    (d) => (d.serviceId.price = d.serviceId.price.toFixed(4))
                  )
                  dispatch({ field: 'radiologyRequestArray', value: val })
                } else if (key === 'consultationNote') {
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 == 'requester') {
                      dispatch({ field: 'requester', value: val1._id })
                    } else {
                      dispatch({ field: key1, value: val1 })
                    }
                  })
                  dispatch({ field: 'consultationNoteArray', value: val })
                } else if (key === 'residentNotes') {
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 == 'doctor') {
                      dispatch({ field: 'doctor', value: val1._id })
                    } else {
                      dispatch({ field: key1, value: val1 })
                    }
                  })
                  dispatch({ field: 'residentNoteArray', value: val })
                } else if (key === 'pharmacyRequest') {
                  dispatch({ field: 'pharmacyRequestArray', value: val })
                }
              } else {
                dispatch({ field: key, value: val })
              }
            })
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
    if (statusBoolean) {
      setOpenNotification(true)
      setErrorMsg(
        'Lab request cannot be added because OPR status is already completed'
      )
    } else {
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
    const a = e.target.value.replace(/[^\w-\s]/gi, '')
    setSearchRadioQuery(a)
    if (a.length >= 3) {
      axios
        .get(getSearchedRadiologyService + '/' + a)
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

    const RRrequestNo = 'RAD' + day + YYYY + HH + mm + ss
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
            results: results,
            RRrequestNo: RRrequestNo,
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
    dispatch({ field: 'results', value: '' })
    dispatch({ field: 'DateTime', value: '' })

    setRowId(radioServiceId)
    setaddLabRequest(false)
    setEnableSave(false)
  }

  const saveRadioReq = () => {
    console.log('THISSSSS ISS ARRAYY', radiologyRequestArray)

    let radioItems = []
    for (let i = 0; i < radiologyRequestArray.length; i++) {
      radioItems = [
        ...radioItems,
        {
          serviceId: radiologyRequestArray[i].serviceId,
          serviceCode: radiologyRequestArray[i].serviceCode,
          requester: radiologyRequestArray[i].requester,
          requesterName: radiologyRequestArray[i].requesterName,
          serviceName: radiologyRequestArray[i].serviceName,
          status: radiologyRequestArray[i].status,
          comments: radiologyRequestArray[i].comments,
          results: radiologyRequestArray[i].results,
          date: radiologyRequestArray[i].date,
          RRrequestNo: radiologyRequestArray[i].RRrequestNo,
        },
      ]
    }
    const params = {
      _id: id,
      radiologyRequest: radioItems,
    }
    console.log('params', params)
    axios
      .put(updateOPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          // props.history.goBack()
          props.history.push({
            pathname: 'viewOPR/success',
            state: {
              message: `Radiology Request: ${
                res.data.data.radiologyRequest[
                  res.data.data.radiologyRequest.length - 1
                ].RRrequestNo
              } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
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
      } else if (fileType === 'PDF') {
        setpdfView(file.name)
      } else if (fileType === 'PNG') {
        setImagePreview([reader.result])
      } else if (fileType === 'png') {
        setImagePreview([reader.result])
      } else if (fileType === 'peg') {
        setImagePreview([reader.result])
      } else if (fileType === 'PEG') {
        setImagePreview([reader.result])
      } else if (fileType === 'jpg') {
        setImagePreview([reader.result])
      } else if (fileType === 'JPG') {
        setImagePreview([reader.result])
      } else {
        setErrorMsg('only pdf, jpeg, png should be allowed')
        setOpenNotification(true)
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

  function handleView(rec) {
    let path = `viewOPR/updaterr`
    console.log('rec', rec, rowId)
    if (rec.serviceId === rowId) {
      setOpenNotification(true)
      setErrorMsg('Please save the new added radiology service first')
    } else {
      props.history.push({
        pathname: path,
        state: {
          id: id,
          selectedItem: rec,
          comingFor: 'opr',
        },
      })
    }
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

      {!isLoading ? (
        <div className='cPadding'>
          <div className='subheader' style={{ marginLeft: '-10px' }}>
            <div>
              <img src={business_Unit} />
              <h4>OPR - Radiology Service</h4>
            </div>
          </div>

          <div
            style={{
              height: '20px',
            }}
          />

          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className={`container-fluid ${classes.root}`}
          >
            <div
              className='row'
              style={{
                marginBottom: 10,
              }}
            >
              <div
                className='col-md-11 col-sm-11 col-11'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                  paddingRight: 0,
                }}
              >
                <TextField
                  type='text'
                  label='Search by Radiology / Imaging'
                  name={'searchRadioQuery'}
                  value={searchRadioQuery}
                  onChange={handleRadioSearch}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
              </div>

              <div className='col-md-1 col-sm-1 col-1'>
                <div
                  style={{
                    ...styles.inputContainerForTextField,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    height: 55,
                    marginRight: '-6px',
                  }}
                >
                  <img src={Fingerprint} style={{ maxWidth: 70, height: 60 }} />
                </div>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-10 col-sm-11 col-10'
                style={{
                  ...styles.textFieldPadding,
                }}
              >
                {searchRadioQuery ? (
                  <div
                    style={{
                      zIndex: 3,
                      position: 'absolute',
                      width: '109%',
                    }}
                  >
                    <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                      {radioItemFoundSuccessfull ? (
                        radioItemFound && (
                          <Table size='small'>
                            <TableHead>
                              <TableRow>
                                <TableCell>Service Name</TableCell>
                                <TableCell>Service Number</TableCell>
                                <TableCell>Price (JD)</TableCell>
                                <TableCell align='center'>
                                  Description
                                </TableCell>
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
                                    <TableCell>{i.price.toFixed(4)}</TableCell>
                                    <TableCell align='center'>
                                      {i.description}
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
              </div>
            </div>

            <div style={{ marginTop: '15px' }} className='row'>
              <div
                className='col-md-5 col-sm-10 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                  paddingRight: '5px',
                }}
              >
                <TextField
                  disabled
                  label='Selected Service'
                  variant='filled'
                  placeholder='Search from above...'
                  name={'radioServiceName'}
                  value={radioServiceName}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
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
                    marginTop: '25px',
                    backgroundColor: '#AD6BBF',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: 5,
                    backgroundColor: 'rgb(173, 107, 191)',
                    height: 56,
                    outline: 'none',
                    marginTop: 7,
                    width: '109%',
                    marginLeft: '-10px',
                  }}
                  disabled={!addRadioRequest}
                  onClick={addSelectedRadioItem}
                  variant='contained'
                  color='primary'
                  fullWidth
                >
                  Add
                </Button>
              </div>
            </div>

            <div
              className='row'
              style={{
                marginTop: '5px',
                scrollPaddingLeft: '5px',
                paddingRight: '10px',
              }}
            >
              {radiologyRequestArray !== 0 ? (
                <CustomTable
                  tableData={radiologyRequestArray}
                  tableDataKeys={tableDataKeysForRadiology}
                  tableHeading={tableHeadingForRadiology}
                  handleEdit={handleView}
                  action={actions}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}
            </div>

            <div className='row' style={{ marginBottom: '25px' }}>
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
                style={{ paddingRight: '10px' }}
              >
                <Button
                  disabled={enableSave}
                  onClick={saveRadioReq}
                  style={{ ...styles.stylesForButton, width: '140px' }}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Save</strong>
                </Button>
              </div>
            </div>
          </div>

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
