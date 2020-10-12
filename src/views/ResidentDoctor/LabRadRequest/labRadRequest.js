import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  updateEdrIpr,
  searchpatient,
  getSearchedpatient,
  notifyLab,
  getIcd,
  notifyConsultation,
  notifyRad,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import Lab_RadIcon from '../../../assets/img/Lab-Rad Request.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../../components/Table/Table'
import plus_icon from '../../../assets/img/Plus.png'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Notification from '../../../components/Snackbar/Notification.js'
import Fingerprint from '../../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../../assets/img/Bar Code.png'
import ViewSingleRequest from './viewRequest'
import { connect } from 'react-redux'
import {
  funForReducer,
  setPatientDetailsForReducer,
} from '../../../actions/Checking'
import Loader from 'react-loader-spinner'

let icdCodesList = require('../../../assets/icdCodes.json')

const tableHeadingForResident = [
  'Date/Time',
  'Description',
  'Referring Doctor',
  'Action',
]
const tableDataKeysForResident = ['date', 'description', 'doctorName']
const tableHeadingForConsultation = [
  // 'Consultation ID',
  'Date/Time',
  'Description/Condition',
  'Specialist',
  'Referring Doctor',
  'Status',
  'Action',
]
const tableDataKeysForConsultation = [
  // 'consultationNo',
  'date',
  'description',
  'specialist',
  'doctorName',
  'status',
]
const tableHeadingForPharmacy = [
  'Request ID',
  'Date / Time',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForPharmacy = [
  'requestNo',
  'createdAt',
  'generatedBy',
  'status',
]
const tableHeadingForLabReq = [
  'Request Id',
  'Test Code',
  'Test',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForLabReq = [
  'LRrequestNo',
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]
const tableHeadingForRadiology = [
  'Request Id',
  'Test Code',
  'Test',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForRadiology = [
  'RRrequestNo',
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]
const tableDataKeysForItemsForBUMember = [
  ['itemId', 'name'],
  ['itemId', 'medClass'],
  'requestedQty',
  'status',
]

const tableDataKeysForFUMemberForItems = [
  ['itemId', 'name'],
  ['itemId', 'medClass'],
  'requestedQty',
  'secondStatus',
]

const tableHeadingForFUMemberForItems = [
  'Name',
  'Type',
  'Requested Qty',
  'Status',
  '',
]

const tableHeadingForBUMemberForItems = [
  'Name',
  'Type',
  'Requested Qty',
  'Status',
  '',
]
// const tableHeadingForNurse = [
//     "Service Code",
//     "Service Name",
//     "Requester",
//     "Status",
//     "Action",
// ];
// const tableDataKeysForNurse = [
//     "serviceCode",
//     "serviceName",
//     "requesterName",
//     "status",
// ];
const actions = { view: true }

const specialistArray = [
  {
    key: 'Dr.Hammad',
    value: 'Dr.Hammad',
  },
  {
    key: 'Dr.Asad',
    value: 'Dr.Asad',
  },
  {
    key: 'Dr.Hameed',
    value: 'Dr.Hameed',
  },
]

const specialityArray = [
  {
    key: 'Cardiologists',
    value: 'Cardiologists',
  },
  {
    key: 'Orthopedic',
    value: 'Orthopedic',
  },
  {
    key: 'Dermatologist',
    value: 'Dermatologist',
  },
]

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    height: '50px',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 15,
  },
  styleForPatientDetails: {
    fontWeight: 'bold',
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  headerHeading: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'center',
    paddingTop: 10,
  },
  headingStyles: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 12,
  },
  textStyles: {
    fontWeight: '700',
    color: 'black',
    fontSize: 14,
  },
}

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
})

const useStylesForInput = makeStyles((theme) => ({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
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
    borderRadius: 5,
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
    '& .Mui-disabled': {
      color: 'gray',
      backgroundColor: 'white',
    },
  },
}))

function LabRadRequest(props) {
  const classesForTabs = useStylesForTabs()
  const classes = useStylesForInput()

  const initialState = {
    labServiceId: '',
    labServiceCode: '',
    labRequestArray: '',
    labServiceName: '',
    labServiceStatus: '',
    labComments: '',

    radioServiceId: '',
    radioServiceCode: '',
    radioServiceName: '',
    radiologyRequestArray: '',
    radioServiceStatus: '',
    radioComments: '',

    //for nurse
    nurseServiceId: '',
    nurseServiceCode: '',
    nurseServiceName: '',
    nurseService: '',
    nurseServiceStatus: '',

    consultationNoteArray: '',
    consultationNo: '',
    date: new Date(),
    description: '',
    consultationNotes: '',
    doctorconsultationNotes: '',

    requester: cookie.load('current_user').name,
    specialist: '',
    speciality: '',

    residentNoteArray: '',
    rdescription: '',
    note: '',
    doctor: cookie.load('current_user').name,

    pharmacyRequestArray: '',
    requestType: '',
    section: '',
    code: [],
    patientId: '',
    diagnosisArray: '',
    medicationArray: '',
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
    labComments,

    radioServiceId,
    radioServiceCode,
    radioServiceName,
    radiologyRequestArray,
    radioServiceStatus,
    radioComments,

    consultationNoteArray,
    date = new Date(),
    description,
    doctorconsultationNotes,

    requester = cookie.load('current_user').name,
    specialist,
    speciality,

    residentNoteArray,
    rdescription,
    note,
    pharmacyRequestArray,
    requestType,
    section,
    code,
    patientId,
    diagnosisArray,
    medicationArray,
  } = state

  const onChangeValue = (e) => {
    if (e.target.name === 'specialist') {
      dispatch({
        field: e.target.name,
        value: e.target.value,
      })
    } else {
      dispatch({
        field: e.target.name,
        value: e.target.value.replace(/[^\w\s]/gi, ''),
      })
    }
  }

  const [currentUser, setCurrentUser] = useState(cookie.load('current_user'))
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = useState(3)
  const [selectedItem, setSelectedItem] = useState('')
  const [searchPatientQuery, setSearchPatientQuery] = useState('')
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(false)
  const [patientFound, setpatientFound] = useState('')
  const [patientDetails, setPatientDetails] = useState('')
  const [, setSelectedPatientArray] = useState([])
  const [, openPatientDetailsDialog] = useState(false)
  const [enableForm, setenableForm] = useState(true)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false)
  const [openAddResidentDialog, setOpenAddResidentDialog] = useState(false)
  const [item, setItem] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [isFormSubmitted] = useState(false)
  const [id, setId] = useState('')
  const [searchRadioQuery, setSearchRadioQuery] = useState('')
  const [radioItemFoundSuccessfull, setRadioItemFoundSuccessfully] = useState(
    ''
  )
  const [radioItemFound, setRadioItemFound] = useState('')
  const [addLabRequest, setaddLabRequest] = useState(false)
  const [addRadioRequest, setaddRadioRequest] = useState(false)
  const [, setIsLoading] = useState(true)
  const [enableSave, setEnableSave] = useState(true)
  const [icdSection, seticdSection] = useState('')
  const [icdCode, seticdCode] = useState([])
  const [requestedItems, setRequestedItems] = useState('')
  const [selectedOrder, setSelectedOrder] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [icd, setIcd] = useState([])
  const [icdArr, setIcdArr] = useState([])
  const [timer, setTimer] = useState(null)

  const validateForm = () => {
    return (
      doctorconsultationNotes &&
      doctorconsultationNotes.length > 0 &&
      description &&
      description.length > 0 &&
      speciality &&
      speciality.length > 0 &&
      specialist &&
      specialist.length > 0
    )
  }

  const validateFormRR = () => {
    return (
      section &&
      section.length > 0 &&
      rdescription &&
      rdescription.length > 0 &&
      note &&
      note.length > 0
      // specialist &&
      // specialist.length > 0
    )
  }

  useEffect(() => {
    if (props.patientDetails) {
      setPatientDetails(props.patientDetails)
      getPatientByInfo(props.patientDetails._id)
      openPatientDetailsDialog(true)
    }

    axios.get(getIcd).then((res) => {
      console.log('res for icd', res)
      setIcd(res.data.data)
    })

    console.log('icd', icd)
    seticdSection(Object.keys(icdCodesList[0]))
    // getEDRById(props.history.location.state.selectedItem._id);

    
    // setId(props.history.location.state.selectedItem._id);
    // setSelectedItem(props.history.location.state.selectedItem);
    // setrequestNo(props.history.location.state.selectedItem.requestNo);
    // setSelectedPatient(props.history.location.state.selectedItem.patientId);
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function viewLabRadReport(rec) {
    if (!rec.view) {
      let path = `labradrequest/viewReport`
      props.history.push({
        pathname: path,
        state: {
          selectedItem: rec,
        },
      })
    } else {
      viewItem(rec)
    }
  }

  function addConsultRequest() {
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

    const consultationNoteNo = 'CN' + day + YYYY + HH + mm + ss
    if (!validateForm()) {
      // setIsFormSubmitted(true)
      setOpenNotification(true)
      setErrorMsg('Please fill the fields properly')
    } else {
      if (validateForm()) {
        let consultationNote = []

        consultationNote = [
          ...consultationNoteArray,
          {
            consultationNo: consultationNoteNo,
            description: description,
            doctorNotes: doctorconsultationNotes,
            requester: currentUser.staffId,
            date: date,
            specialist: specialist,
            status: 'pending',
          },
        ]

        const params = {
          _id: id,
          requestType,
          consultationNote: consultationNote,
        }

        console.log('params', params)
        axios
          .put(updateEdrIpr, params)
          .then((res) => {
            if (res.data.success) {
              console.log('response while adding Consult Req', res.data.data)
              notifyForConsult(patientId)
              props.history.push({
                pathname: 'consultationrequest/success',
                state: {
                  message: `Consultation Note of Request: ${
                    res.data.data.consultationNote[
                      res.data.data.consultationNote.length - 1
                    ].consultationNo
                  } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} submitted successfully`,
                  patientDetails: patientDetails,
                },
              })
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
    }
  }

  const notifyForConsult = (id) => {
    axios
      .get(notifyConsultation + '/' + id)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log('error after notify', e)
        setOpenNotification(true)
        setErrorMsg(e)
      })
  }

  function addResidentRequest() {
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

    const residentNoteNo = 'RDN' + day + YYYY + HH + mm + ss
    if (!validateFormRR()) {
      // setIsFormSubmitted(true);
      setOpenNotification(true)
      setErrorMsg('Please fill the fields properly')
    } else {
      if (validateFormRR()) {
        let residentNote = []

        residentNote = [
          ...residentNoteArray,
          {
            residentNoteNo: residentNoteNo,
            date: date,
            description: rdescription,
            doctor: currentUser.staffId,
            note: note,
            section: section,
            code: code,
          },
        ]

        const params = {
          _id: id,
          requestType,
          residentNotes: residentNote,
        }
        console.log('params', params)
        axios
          .put(updateEdrIpr, params)
          .then((res) => {
            if (res.data.success) {
              console.log('response while adding Resident Req', res.data.data)
              props.history.push({
                pathname: 'assessmentdiagnosis/success',
                state: {
                  message: `Consultation note: ${
                    res.data.data.residentNotes[
                      res.data.data.residentNotes.length - 1
                    ].residentNoteNo
                  } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
                  patientDetails: patientDetails,
                },
              })
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
        // }
      }
    }
  }

  const addNewRequest = () => {
    // let path = `assessmentdiagnosis/add`
    let path = `/home/wms/fus/medicinalorder`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        selectedPatient: selectedItem.patientId,
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

  function viewItem(item) {
    if (item !== '') {
      setOpenItemDialog(true)
      setItem(item)
    } else {
      setOpenItemDialog(false)
      setItem('')
    }
  }

  const handleView = (obj) => {
    let path = `/home/wms/fus/medicinalorder/edit`
    // props.history.push({
    //   pathname: path,
    //   state: {
    //     comingFor: "view",
    //     selectedItem: obj,
    //     vendors,
    //     statues,
    //     items,
    //     buObj,
    //   },
    // });

    // if (currentUser.staffTypeId.type === "Doctor/Physician") {
    //   let repRequest = res.data.da;
    //   let temp = [];
    //   for (let i = 0; i < repRequest.length; i++) {
    //     if (repRequest[i].buId.buHead === currentUser.staffId) {
    //       temp.push(repRequest[i]);
    //     }
    //   }
    //   console.log("rep array after filter", temp);
    //   setPurchaseRequest(temp.reverse());
    // }

    // else {

    // if (currentUser.staffTypeId.type === "Registered Nurse") {
    //   let repRequest = obj.item;
    //   let temp = [];
    //   for (let i = 0; i < repRequest.length; i++) {
    //     if (
    //       repRequest[i].status === "Delivery in Progress" ||
    //       repRequest[i].status === "pending_administration" ||
    //       repRequest[i].status === "Received" ||
    //       repRequest[i].status === "Partially Received"
    //     ) {
    //       temp.push(repRequest[i]);
    //     }
    //   }
    //   console.log("rep array after filter", temp);

    //   if (temp.length === 0) {
    //     setOpenNotification(true);
    //     setErrorMsg("Order is still pending from the pharmacy/sub store.");
    //   } else {
    //     setSelectedOrder(obj);
    //     setIsOpen(true);
    //     setRequestedItems(temp);
    //   }
    // }
    // else {
    setSelectedOrder(obj)
    setIsOpen(true)
    setRequestedItems(obj.item)
    // }
    // }
  }

  const handleSearch = (e) => {
    const a = e.target.value.replace(/[^\w-\s]/gi, '')
    setSearchQuery(a)
    if (a.length >= 3) {
      axios
        .get(getSearchedLaboratoryService + '/' + a)
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

    const LRrequestNo = 'LR' + day + YYYY + HH + mm + ss
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
            serviceType: 'lab',
            serviceId: labServiceId,
            serviceCode: labServiceCode,
            serviceName: labServiceName,
            requester: currentUser.staffId,
            requesterName: requester,
            status: labServiceStatus,
            comments: labComments,
            LRrequestNo: LRrequestNo,
            view: true,
          },
        ],
      })
      // }
    }

    dispatch({ field: 'labServiceId', value: '' })
    dispatch({ field: 'labServiceName', value: '' })
    dispatch({ field: 'labServiceStatus', value: '' })
    dispatch({ field: 'labServiceCode', value: '' })
    dispatch({ field: 'labComments', value: '' })

    setaddLabRequest(false)
    setEnableSave(false)
  }

  const saveLabReq = () => {
    let labItems = []
    for (let i = 0; i < labRequestArray.length; i++) {
      labItems = [
        ...labItems,
        {
          serviceType: labRequestArray[i].serviceType,
          serviceId: labRequestArray[i].serviceId,
          serviceCode: labRequestArray[i].serviceCode,
          requesterName: labRequestArray[i].requesterName,
          requester: labRequestArray[i].requester,
          serviceName: labRequestArray[i].serviceName,
          status: labRequestArray[i].status,
          comments: labRequestArray[i].comments,
          LRrequestNo: labRequestArray[i].LRrequestNo,
        },
      ]
    }
    const params = {
      _id: id,
      requestType,
      labRequest: labItems,
    }
    console.log('Lab params', params)
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Lab Request', res.data)
          props.history.push({
            pathname: 'labradrequest/success',
            state: {
              message: `Lab Request:${
                res.data.data.labRequest[res.data.data.labRequest.length - 1]
                  .LRrequestNo
              } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
              patientDetails: patientDetails,
            },
          })
          notifyForLab(patientId)
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while adding the Lab Request')
        }
      })
      .catch((e) => {
        console.log('error after adding Lab Request', e)
        setOpenNotification(true)
        setErrorMsg('Error after adding the Lab Request')
      })
  }

  const notifyForLab = (id) => {
    axios
      .get(notifyLab + '/' + id)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log('error after notify', e)
        setOpenNotification(true)
        setErrorMsg(e)
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
    // console.log("selected item", i);
    dispatch({ field: 'radioServiceId', value: i._id })
    dispatch({ field: 'radioServiceCode', value: i.serviceNo })
    dispatch({ field: 'radioServiceName', value: i.name })
    dispatch({ field: 'radioServiceStatus', value: i.status })

    setSearchRadioQuery('')
    setaddRadioRequest(true)
  }

  // const addSelectedRadioItem = () => {
  //   dispatch({ field: "radioServiceId", value: i._id });
  //   dispatch({ field: "radioServiceCode", value: i.serviceNo });
  //   dispatch({ field: "radioServiceName", value: i.name });
  //   dispatch({ field: "radioServiceStatus", value: i.status });

  //   setSearchRadioQuery("");
  //   setaddRadioRequest(true);
  // };

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
            serviceType: 'radio',
            serviceId: radioServiceId,
            serviceCode: radioServiceCode,
            requesterName: requester,
            serviceName: radioServiceName,
            requester: currentUser.staffId,
            status: radioServiceStatus,
            comments: radioComments,
            RRrequestNo: RRrequestNo,
            view: true,
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

    setaddLabRequest(false)
    setEnableSave(false)
  }

  const saveRadioReq = () => {
    let radioItems = []
    for (let i = 0; i < radiologyRequestArray.length; i++) {
      radioItems = [
        ...radioItems,
        {
          serviceType: radiologyRequestArray[i].serviceType,
          serviceId: radiologyRequestArray[i].serviceId,
          serviceCode: radiologyRequestArray[i].serviceCode,
          requester: radiologyRequestArray[i].requester,
          requesterName: radiologyRequestArray[i].requesterName,
          serviceName: radiologyRequestArray[i].serviceName,
          status: radiologyRequestArray[i].status,
          comments: radiologyRequestArray[i].comments,
          RRrequestNo: radiologyRequestArray[i].RRrequestNo,
        },
      ]
    }

    const params = {
      _id: id,
      requestType,
      radiologyRequest: radioItems,
    }
    console.log('Radio params', params)
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          props.history.push({
            pathname: 'labradrequest/success',
            state: {
              message: `Radiology Request: ${
                res.data.data.radiologyRequest[
                  res.data.data.radiologyRequest.length - 1
                ].RRrequestNo
              } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
              patientDetails: patientDetails,
            },
          })
          notifyForRad(patientId)
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while adding the Radiology Request')
        }
      })
      .catch((e) => {
        console.log('error after adding Radio Request', e)
        setOpenNotification(true)
        setErrorMsg('Error after adding the Radiology Request', e)
      })
  }

  const notifyForRad = (id) => {
    axios
      .get(notifyRad + '/' + id)
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log('error after notify', e)
        setOpenNotification(true)
        setErrorMsg(e)
      })
  }

  // // for Nursing
  // const handleNurseSearch = (e) => {
  //     setSearchNurseQuery(e.target.value);
  //     if (e.target.value.length >= 3) {
  //         axios
  //             .get(getSearchedNurseService + "/" + e.target.value)
  //             .then((res) => {
  //                 if (res.data.success) {
  //                     if (res.data.data.length > 0) {
  //                         console.log(res.data.data);
  //                         setNurseItemFoundSuccessfully(true);
  //                         setNurseItemFound(res.data.data);
  //                     } else {
  //                         setNurseItemFoundSuccessfully(false);
  //                         setNurseItemFound("");
  //                     }
  //                 }
  //             })
  //             .catch((e) => {
  //                 console.log("error while searching req", e);
  //             });
  //     }
  // };
  // function handleAddNurseItem(i) {
  //     // console.log("selected item", i.serviceNo);
  //     dispatch({ field: "nurseServiceId", value: i._id });
  //     dispatch({ field: "nurseServiceCode", value: i.serviceNo });
  //     dispatch({ field: "nurseServiceName", value: i.name });
  //     dispatch({ field: "nurseServiceStatus", value: i.status });
  //     setSearchNurseQuery("");
  //     setaddNurseRequest(true);
  // }
  // const addSelectedNurseItem = () => {
  //     // setIsFormSubmitted(true);
  //     // if (validateItemsForm()) {
  //     let found =
  //         nurseService &&
  //         nurseService.find((item) => item.serviceId === nurseServiceId);
  //     if (found) {
  //         setOpenNotification(true);
  //         setErrorMsg("This Service has already been added.");
  //     } else {
  //         dispatch({
  //             field: "nurseService",
  //             value: [
  //                 ...nurseService,
  //                 {
  //                     serviceId: nurseServiceId,
  //                     serviceCode: nurseServiceCode,
  //                     requesterName: requester,
  //                     serviceName: nurseServiceName,
  //                     requester: currentUser.staffId,
  //                     status: nurseServiceStatus,
  //                 },
  //             ],
  //         });
  //         // }
  //     }
  //     dispatch({ field: "nurseServiceId", value: "" });
  //     dispatch({ field: "nurseServiceCode", value: "" });
  //     dispatch({ field: "nurseServiceName", value: "" });
  //     dispatch({ field: "nurseServiceStatus", value: "" });
  //     setaddLabRequest(false);
  // };
  // const saveNurseReq = () => {
  //     // console.log("THISSSSS ISS ARRAYY",radiologyRequestArray)
  //     let nurseItems = [];
  //     for (let i = 0; i < nurseService.length; i++) {
  //         nurseItems = [
  //             ...nurseItems,
  //             {
  //                 serviceId: nurseService[i].serviceId,
  //                 serviceCode: nurseService[i].serviceCode,
  //                 requester: nurseService[i].requester,
  //                 requesterName: nurseService[i].requesterName,
  //                 serviceName: nurseService[i].serviceName,
  //                 status: nurseService[i].status,
  //             },
  //         ];
  //     }
  //     const params = {
  //         _id: id,
  //         nurseService: nurseItems,
  //     };
  //     // console.log("params", params);
  //     axios
  //         .put(updateEdrIpr, params)
  //         .then((res) => {
  //             if (res.data.success) {
  //                 console.log("response after adding nurse Request", res.data);
  //                 window.location.reload(false);
  //             } else if (!res.data.success) {
  //                 setOpenNotification(true);
  //             }
  //         })
  //         .catch((e) => {
  //             console.log("error after adding Nurse Request", e);
  //             setOpenNotification(true);
  //             setErrorMsg("Error while adding the Nurse Request");
  //         });
  // };

  const onChangeSection = (e) => {
    if (e.target.value) {
      dispatch({ field: e.target.name, value: e.target.value })

      axios.get(getIcd + '/' + e.target.value).then((res) => {
        if (res.data.data) {
          console.log('hello', res.data.data)
          setIcdArr(res.data.data)
        }
      })

      let codes = Object.entries(icdCodesList[0])
      for (var x in codes) {
        let arr = codes[x]
        if (arr[0] === e.target.value) {
          console.log('codes', arr[1])
          seticdCode(arr[1])
        }
      }
    } else {
      dispatch({ field: e.target.name, value: e.target.value })
      dispatch({ field: 'Code', value: '' })
      seticdCode('')
    }
  }

  const handleCodeSearch = (e) => {
    let currentList = []
    let newList = []

    console.log('icdArr', icdArr)
    if (e.target.value !== '') {
      currentList = icdArr
      console.log(icdArr)
      newList = currentList.filter((item) => {
        const lc = item.icd10PCSCodes.toLowerCase()
        const filter = e.target.value.toLowerCase()
        return lc.includes(filter)
      })
    } else {
      axios.get(getIcd + '/' + section).then((res) => {
        if (res.data.data) {
          console.log('hello', res.data.data)
          // const mappedArr = res.data.data.map(
          //   (e) => e.icd10PCSCodes && e.procedureCodeDescriptions
          // )
          setIcdArr(res.data.data)
        }
      })
    }
    setIcdArr(newList)
    console.log('icdArr', icdArr)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      triggerChange()
    }
  }

  const triggerChange = () => {
    handlePatientSearch(searchPatientQuery)
  }

  const handlePauseSearch = (e) => {
    clearTimeout(timer)

    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)

    setTimer(
      setTimeout(() => {
        triggerChange()
      }, 600)
    )
  }

  //for search patient
  const handlePatientSearch = (e) => {
    if (e.length >= 3) {
      axios
        .get(
          getSearchedpatient + '/' + currentUser.functionalUnit._id + '/' + e
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setpatientFoundSuccessfully(true)
              setpatientFound(res.data.data)
            } else {
              setpatientFoundSuccessfully(false)
              setpatientFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    }
  }

  function handleAddPatient(i) {
    dispatch({ field: 'diagnosisArray', value: '' })
    dispatch({ field: 'medicationArray', value: '' })
    // setDialogOpen(true);
    console.log('selected banda : ', i)

    props.setPatientDetailsForReducer(i)

    setPatientDetails(i)
    getPatientByInfo(i._id)
    openPatientDetailsDialog(true)

    const obj = {
      itemCode: i.itemCode,
    }

    setSelectedPatientArray((pervState) => [...pervState, obj])
    setSearchPatientQuery('')
  }

  const getPatientByInfo = (id) => {
    axios
      .get(searchpatient + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log('Response after getting EDR/IPR data : ', res.data.data)

            setIsLoading(false)
            setSelectedItem(res.data.data)
            setId(res.data.data._id)
            setenableForm(false)

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'patientId') {
                  dispatch({ field: 'patientId', value: val._id })
                } else if (key === 'labRequest') {
                  dispatch({ field: 'labRequestArray', value: val.reverse() })
                } else if (key === 'radiologyRequest') {
                  dispatch({
                    field: 'radiologyRequestArray',
                    value: val.reverse(),
                  })
                } else if (key === 'consultationNote') {
                  val.map(
                    (d) =>
                      (d.doctorName = d.requester
                        ? d.requester.firstName + ' ' + d.requester.lastName
                        : '')
                  )
                  dispatch({
                    field: 'consultationNoteArray',
                    value: val.reverse(),
                  })
                } else if (key === 'residentNotes') {
                  val.map(
                    (d) =>
                      (d.doctorName = d.doctor
                        ? d.doctor.firstName + ' ' + d.doctor.lastName
                        : '')
                  )
                  dispatch({
                    field: 'residentNoteArray',
                    value: val.reverse(),
                  })
                  if (val && val.length > 0) {
                    dispatch({ field: 'diagnosisArray', value: val[0].code })
                  }
                } else if (key === 'pharmacyRequest') {
                  val.map(
                    (d) =>
                      (d.doctorName = d.requester
                        ? d.requester.firstName + ' ' + d.requester.lastName
                        : '')
                  )
                  dispatch({
                    field: 'pharmacyRequestArray',
                    value: val.reverse(),
                  })
                  let data = []
                  val.map((d) => {
                    d.item.map((item) => {
                      let found = data.find((i) => i === item.itemId.name)
                      if (!found) {
                        data.push(item.itemId.name)
                      }
                    })
                  })
                  dispatch({ field: 'medicationArray', value: data })
                }
                //  else if (key === "nurseService") {
                //     dispatch({ field: "nurseService", value: val });
                // }
              } else {
                dispatch({ field: key, value: val })
              }
            })
          }
        } else {
          setOpenNotification(true)
          setErrorMsg('EDR/IPR not generated for patient')
        }
      })
      .catch((e) => {
        setOpenNotification(true)
        setErrorMsg(e)
      })
  }
  const addICDcodes = (item, e) => {
    console.log('item', item)
    console.log('e', e)
    console.log('code', code)
    if (code.includes(item.icd10PCSCodes)) {
      var index = code.indexOf(item)
      code.splice(index, 1)
      e.target.className = 'addCode'
    } else {
      dispatch({
        field: 'code',
        value: [...code, item.icd10PCSCodes],
      })
      e.target.className = 'addedCode'
    }
    console.log('code after', code)
  }

  const TriageAssessment = () => {
    let path = `labradrequest/triageAssessment`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
      },
    })
  }

  const PatientHistory = () => {
    let path = `labradrequest/patienthistory`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
        diagnosisArray: diagnosisArray,
        medicationArray: medicationArray,
      },
    })
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
      setsuccessMsg('')
    }, 2000)
  }
  const showAlert = () => {
    // if (document.getElementById("ckDemo").disabled) {
    //     alert("CheckBox is Disabled");
    // }

    setErrorMsg('Please Search Patient First ')
    setOpenNotification(true)
  }

  const showAlertForPatientHistory = () => {
    // if (document.getElementById("ckDemo").disabled) {
    //     alert("CheckBox is Disabled");
    // }

    setErrorMsg('Please Search Patient First ')
    setOpenNotification(true)
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
      <div className='cPadding'>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={Lab_RadIcon} />
            <h4>
              {value === 3
                ? 'Lab Request'
                : value === 4
                ? 'Radiology Request'
                : 'Lab / Rad Request'}
            </h4>
          </div>

          <div style={{ marginRight: '-10px' }}>
            <Button
              // disabled={enableForm}
              // onClick={TriageAssessment}
              onClick={enableForm ? showAlert : TriageAssessment}
              style={styles.stylesForButton}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              Triage & Assessment
            </Button>
            &nbsp;&nbsp;
            <Button
              // disabled={enableForm}
              onClick={enableForm ? showAlertForPatientHistory : PatientHistory}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
              Error={errorMsg}
            >
              Patient History
            </Button>
          </div>
        </div>
        <div
          className={`${'container-fluid'} ${classes.root}`}
          style={{
            marginTop: '25px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <div className='row'>
            <div
              className='col-md-10 col-sm-8 col-8'
              style={styles.textFieldPadding}
            >
              <TextField
                className='textInputStyle'
                id='searchPatientQuery'
                type='text'
                variant='filled'
                label='Search Patient by Name / MRN / National ID / Mobile Number'
                name={'searchPatientQuery'}
                value={searchPatientQuery}
                onChange={handlePauseSearch}
                onKeyDown={handleKeyDown}
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
              />
            </div>

            <div
              className='col-md-1 col-sm-2 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  height: 55,
                }}
              >
                <img src={BarCode} style={{ width: 70, height: 60 }} />
              </div>
            </div>

            <div
              className='col-md-1 col-sm-2 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  height: 55,
                }}
              >
                <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
              </div>
            </div>
          </div>

          <div className='row'>
            <div
              className='col-md-10 col-sm-9 col-8'
              style={styles.textFieldPadding}
            >
              {searchPatientQuery ? (
                <div
                  style={{
                    zIndex: 3,
                    position: 'absolute',
                    width: '99%',
                    marginTop: 5,
                  }}
                >
                  <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                    {patientFoundSuccessfull && patientFound !== '' ? (
                      <Table size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>MRN Number</TableCell>
                            <TableCell>Patient Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Age</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {patientFound.map((i) => {
                            return (
                              <TableRow
                                key={i._id}
                                onClick={() => handleAddPatient(i)}
                                style={{ cursor: 'pointer' }}
                              >
                                <TableCell>{i.profileNo}</TableCell>
                                <TableCell>
                                  {i.firstName + ` ` + i.lastName}
                                </TableCell>
                                <TableCell>{i.gender}</TableCell>
                                <TableCell>{i.age}</TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    ) : searchPatientQuery ? (
                      <div style={{ textAlign: 'center' }}>
                        <Loader
                          type='TailSpin'
                          color='#2c6ddd'
                          height={25}
                          width={25}
                          style={{ display: 'inline-block', padding: '10px' }}
                        />
                        <span
                          style={{ display: 'inline-block', padding: '10px' }}
                        >
                          <h4>Searching Patient...</h4>
                        </span>
                      </div>
                    ) : searchPatientQuery && !patientFoundSuccessfull ? (
                      <div style={{ textAlign: 'center', padding: '10px' }}>
                        <h4> No Patient Found !</h4>
                      </div>
                    ) : (
                      undefined
                    )}
                  </Paper>
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>
        </div>

        <div className={`${classes.root}`}>
          <h5 style={{ fontWeight: 'bold', color: 'white', marginTop: 25 }}>
            Patient Details
          </h5>
          <div
            // className="row"
            style={{
              marginTop: 25,
              backgroundColor: 'white',
              borderRadius: 5,
              width: '100%',
              maxHeight: '300px',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            <div
              className='row'
              style={{
                backgroundColor: '#2C6DDD',
                paddingLeft: 10,
                height: '30%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                paddingBottom: 10,
                paddingTop: 10,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>
                  Patient Info
                </h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>Allergy</h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>
                  Medication
                </h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>Diagnosis</h6>
              </div>
            </div>

            <div
              className='row'
              style={{
                marginTop: 10,
                paddingLeft: 10,
                height: '80%',
                paddingBottom: 10,
              }}
            >
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={styles.headingStyles}>MRN</span>
                <span style={styles.textStyles} className='mrnUpperCase'>
                  {patientDetails.profileNo
                    ? patientDetails.profileNo
                    : '-----'}
                  {/* {patientDetails && patientDetails.profileNo} */}
                </span>

                <span style={styles.headingStyles}>Patient</span>
                <span style={styles.textStyles}>
                  {patientDetails.firstName && patientDetails.lastName
                    ? patientDetails.firstName + ' ' + patientDetails.lastName
                    : '---- ----'}
                </span>

                <span style={styles.headingStyles}>Gender</span>
                <span style={styles.textStyles}>
                  {patientDetails.gender ? patientDetails.gender : '----'}
                </span>

                <span style={styles.headingStyles}>Age</span>
                <span style={styles.textStyles}>
                  {patientDetails.age ? patientDetails.age : '--'}
                </span>

                <span style={styles.headingStyles}>Weight</span>
                <span style={styles.textStyles}>
                  {patientDetails.weight ? patientDetails.weight : '--'} kg
                </span>
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {''}
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {medicationArray
                  ? medicationArray.map((d, index) => {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <h6
                            style={{
                              ...styles.textStyles,
                            }}
                          >
                            {index + 1}
                            {'.'} &nbsp;
                          </h6>
                          <h6
                            style={{
                              ...styles.textStyles,
                            }}
                          >
                            {d}
                          </h6>
                        </div>
                      )
                    })
                  : ''}
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {diagnosisArray
                  ? diagnosisArray.map((drug, index) => {
                      return (
                        <h6 style={styles.textStyles}>
                          {index + 1}. {drug}
                        </h6>
                      )
                    })
                  : ''}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              height: '20px',
            }}
          />
          <div className={classesForTabs.root}>
            <Tabs
              classes={{
                root: classesForTabs.root,
                scroller: classesForTabs.scroller,
              }}
              value={value}
              onChange={handleChange}
              textColor='primary'
              TabIndicatorProps={{ style: { background: '#12387a' } }}
              centered={false}
              variant='scrollable'
              fullWidth={true}
            >
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 0 ? '#12387a' : '#3B988C',
                }}
                label='Doctor/Physician Notes'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 1 ? '#12387a' : '#3B988C',
                }}
                label='Consultant/Specialist Notes'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 2 ? '#12387a' : '#3B988C',
                }}
                label='Pharm'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 3 ? '#12387a' : '#3B988C',
                }}
                label='Lab'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 4 ? '#12387a' : '#3B988C',
                }}
                label='Rad'
                disabled={enableForm}
              />
              {/* <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  backgroundColor: value === 5 ? '#2c6ddd' : undefined,
                }}
                label='In Patient Request'
                disabled
              /> */}
            </Tabs>
          </div>

          {value === 1 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div className='row'>
                {consultationNoteArray !== 0 ? (
                  <CustomTable
                    tableData={consultationNoteArray}
                    tableDataKeys={tableDataKeysForConsultation}
                    tableHeading={tableHeadingForConsultation}
                    handleView={viewItem}
                    action={actions}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>
              <div className='row' style={{ marginBottom: '25px' }}>
                <div className='col-md-6 col-sm-6 col-6'></div>
                <div
                  className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                  style={{ paddingRight: '1px' }}
                >
                  <Button
                    onClick={() => setOpenAddConsultDialog(true)}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                    disabled={enableForm}
                  >
                    <strong style={{ fontSize: '12px' }}>
                      Consultation Request
                    </strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 0 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className=' container-fluid'
            >
              <div className='row'>
                {residentNoteArray !== 0 ? (
                  <CustomTable
                    tableData={residentNoteArray}
                    tableDataKeys={tableDataKeysForResident}
                    tableHeading={tableHeadingForResident}
                    handleView={viewItem}
                    action={actions}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>
              <div className='row' style={{ marginBottom: '25px' }}>
                <div className='col-md-6 col-sm-6 col-6'></div>
                <div
                  className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                  style={{ paddingRight: '1px' }}
                >
                  <Button
                    onClick={() => setOpenAddResidentDialog(true)}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                    disabled={enableForm}
                  >
                    <img className='icon-style' src={plus_icon} />
                    &nbsp;&nbsp;
                    <strong style={{ fontSize: '12px' }}>
                      Add New Consultation
                    </strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 2 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div className='row'>
                {pharmacyRequestArray !== 0 ? (
                  <CustomTable
                    tableData={pharmacyRequestArray}
                    tableDataKeys={tableDataKeysForPharmacy}
                    tableHeading={tableHeadingForPharmacy}
                    // handleView={viewItem}
                    handleView={handleView}
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
                  {/* <img
                    onClick={() => props.history.goBack()}
                    src={Back}
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  /> */}
                </div>
                <div
                  className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'
                  style={{ paddingRight: '1px' }}
                >
                  <Button
                    onClick={addNewRequest}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                  >
                    <img className='icon-style' src={plus_icon} />
                    &nbsp;&nbsp;
                    <strong style={{ fontSize: '12px' }}>
                      Pharmacy Request
                    </strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 3 ? (
            <div
              style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              className={`container-fluid 
              `}
            >
              <div className={`row ${classes.root}`}>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    disabled={enableForm}
                    label='Search by Lab Test'
                    name={'searchQuery'}
                    value={searchQuery}
                    onChange={handleSearch}
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
              </div>

              {searchQuery ? (
                <div
                  style={{
                    zIndex: 10,
                    marginTop: 10,
                    marginLeft: -8,
                    width: '101.5%',
                  }}
                >
                  <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                    {itemFoundSuccessfull ? (
                      itemFound && (
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
                            {itemFound.map((i) => {
                              return (
                                <TableRow
                                  key={i.serviceNo}
                                  onClick={() => handleAddItem(i)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <TableCell>{i.name}</TableCell>
                                  <TableCell>{i.serviceNo}</TableCell>
                                  <TableCell>{i.price}</TableCell>
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
                        onClick={() => setSearchQuery('')}
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
                  className='col-md-5 col-sm-5 col-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                    paddingRight: '5px',
                  }}
                >
                  <TextField
                    required
                    disabled
                    label='Selected Service'
                    name={'labServiceName'}
                    value={labServiceName}
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
                <div
                  className={`col-md-5 col-sm-5 col-3 ${classes.root}`}
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    disabled={enableForm}
                    label='Comments / Notes'
                    name={'labComments'}
                    value={labComments}
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
                <div className='col-md-2  '>
                  <Button
                  className='addButton'
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
                      marginTop: 25,
                      width: '110%',
                      marginLeft: '-10px',
                    }}
                    disabled={!addLabRequest}
                    onClick={addSelectedLabItem}
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
                  paddingLeft: '5px',
                  paddingRight: '5px',
                }}
              >
                {labRequestArray !== 0 ? (
                  <CustomTable
                    tableData={labRequestArray}
                    tableDataKeys={tableDataKeysForLabReq}
                    tableHeading={tableHeadingForLabReq}
                    handleView={viewLabRadReport}
                    action={actions}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>

              <div className='row' style={{ marginBottom: '25px' }}>
                <div
                  className='col-md-12 col-sm-12 col-12 d-flex justify-content-end'
                  style={{ paddingRight: '5px' }}
                >
                  <Button
                    // disabled={enableForm}
                    disabled={enableSave}
                    onClick={saveLabReq}
                    style={{ ...styles.stylesForButton, width: '140px' }}
                    variant='contained'
                    color='primary'
                  >
                    <strong style={{ fontSize: '12px' }}>Save</strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 4 ? (
            <div
              style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              className={`container-fluid `}
            >
              <div className={`row ${classes.root}`}>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
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
              </div>

              {searchRadioQuery ? (
                // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                <div
                  style={{
                    zIndex: 10,
                    marginTop: 10,
                    marginLeft: -8,
                    width: '101.5%',
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
                              <TableCell>Price</TableCell>
                              <TableCell align='center'>Description</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {radioItemFound.map((i) => {
                              return (
                                <TableRow
                                  key={i.serviceNo}
                                  onClick={() => handleAddRadioItem(i)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <TableCell>{i.name}</TableCell>
                                  <TableCell>{i.serviceNo}</TableCell>
                                  <TableCell>{i.price}</TableCell>
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

              <div className='row'>
                <div
                  className='col-md-5 col-sm-5 col-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                    paddingRight: '5px',
                  }}
                >
                  <TextField
                    required
                    disabled
                    label='Selected Service'
                    name={'radioServiceName'}
                    value={radioServiceName}
                    // error={radioServiceName === '' && isFormSubmitted}
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
                <div
                  className={`col-md-5 col-sm-5 col-3 ${classes.root}`}
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    disabled={enableForm}
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
                  className='addButton'
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
                      marginTop: 25,
                      width: '110%',
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
                  paddingLeft: '5px',
                  paddingRight: '5px',
                }}
              >
                {radiologyRequestArray !== 0 ? (
                  <CustomTable
                    tableData={radiologyRequestArray}
                    tableDataKeys={tableDataKeysForRadiology}
                    tableHeading={tableHeadingForRadiology}
                    handleView={viewLabRadReport}
                    action={actions}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>

              <div className='row' style={{ marginBottom: '25px' }}>
                <div
                  className='col-md-12 col-sm-12 col-12 d-flex justify-content-end'
                  style={{ paddingRight: '5px' }}
                >
                  <Button
                    // disabled={enableForm}
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
          ) : (
            //     : value === 5 ? (
            //         <div
            //             style={{ flex: 4, display: "flex", flexDirection: "column" }}
            //             // className={`container ${classes.root}`}
            //             className="container-fluid"
            //         >
            //             <div style={{ marginTop: "20px" }} className="row">
            //                 <div
            //                     className="col-md-12 col-sm-12 col-12"
            //                     style={{
            //                         ...styles.inputContainerForTextField,
            //                         ...styles.textFieldPadding,
            //                     }}
            //                 >
            //                     <TextField
            //                         required
            //                         label="Service Name"
            //                         name={"searchNurseQuery"}
            //                         value={searchNurseQuery}
            //                         // error={searchNurseQuery === '' && isFormSubmitted}
            //                         onChange={handleNurseSearch}
            //                         className="textInputStyle"
            //                         variant="filled"
            //                         InputProps={{
            //                             className: classes.input,
            //                             classes: { input: classes.input },
            //                         }}
            //                     />
            //                 </div>
            //             </div>
            //             {searchNurseQuery ? (
            //                 // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
            //                 <div style={{ zIndex: 10 }}>
            //                     <Paper>
            //                         {nurseItemFoundSuccessfull ? (
            //                             nurseItemFound && (
            //                                 <Table size="small">
            //                                     <TableHead>
            //                                         <TableRow>
            //                                             <TableCell>Service Name</TableCell>
            //                                             <TableCell>Service Number</TableCell>
            //                                             <TableCell>Price</TableCell>
            //                                             <TableCell align="center">
            //                                                 Description
            //                   </TableCell>
            //                                         </TableRow>
            //                                     </TableHead>
            //                                     <TableBody>
            //                                         {nurseItemFound.map((i, index) => {
            //                                             return (
            //                                                 <TableRow
            //                                                     key={i.serviceNo}
            //                                                     onClick={() => handleAddNurseItem(i)}
            //                                                     style={{ cursor: "pointer" }}
            //                                                 >
            //                                                     <TableCell>{i.name}</TableCell>
            //                                                     <TableCell>{i.serviceNo}</TableCell>
            //                                                     <TableCell>{i.price}</TableCell>
            //                                                     <TableCell>{i.description}</TableCell>
            //                                                 </TableRow>
            //                                             );
            //                                         })}
            //                                     </TableBody>
            //                                 </Table>
            //                             )
            //                         ) : (
            //                                 <h4
            //                                     style={{ textAlign: "center" }}
            //                                     onClick={() => setSearchNurseQuery("")}
            //                                 >
            //                                     Service Not Found
            //                                 </h4>
            //                             )}
            //                     </Paper>
            //                 </div>
            //             ) : (
            //                     undefined
            //                 )}
            //             <div style={{ marginTop: "20px" }} className="row">
            //                 <div
            //                     className="col-md-10 col-sm-10 col-6"
            //                     style={{
            //                         ...styles.inputContainerForTextField,
            //                         ...styles.textFieldPadding,
            //                     }}
            //                 >
            //                     <TextField
            //                         required
            //                         label="Selected Service"
            //                         name={"nurseServiceName"}
            //                         value={nurseServiceName}
            //                         // error={nurseServiceName === '' && isFormSubmitted}
            //                         onChange={onChangeValue}
            //                         className="textInputStyle"
            //                         variant="filled"
            //                         InputProps={{
            //                             className: classes.input,
            //                             classes: { input: classes.input },
            //                         }}
            //                     />
            //                 </div>
            //                 <div className="col-md-2 col-sm-2 col-6">
            //                     <Button
            //                         style={{
            //                             ...styles.stylesForButton,
            //                             marginTop: "25px",
            //                             backgroundColor: "#ad6bbf",
            //                         }}
            //                         disabled={!addNurseRequest}
            //                         onClick={addSelectedNurseItem}
            //                         variant="contained"
            //                         color="primary"
            //                         fullWidth
            //                     >
            //                         Add
            //       </Button>
            //                 </div>
            //             </div>
            //             <div className="row" style={{ marginTop: "20px" }}>
            //                 {nurseService !== 0 ? (
            //                     <CustomTable
            //                         tableData={nurseService}
            //                         tableDataKeys={tableDataKeysForNurse}
            //                         tableHeading={tableHeadingForNurse}
            //                         handleView={viewItem}
            //                         action={actions}
            //                         borderBottomColor={"#60D69F"}
            //                         borderBottomWidth={20}
            //                     />
            //                 ) : (
            //                         undefined
            //                     )}
            //             </div>
            //             <div className="row" style={{ marginBottom: "25px" }}>
            //                 <div className="col-md-6 col-sm-6 col-6">
            //                     <img
            //                         onClick={() => props.history.goBack()}
            //                         src={Back}
            //                         style={{ width: 45, height: 35, cursor: "pointer" }}
            //                     />
            //                 </div>
            //                 <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
            //                     <Button
            //                         onClick={saveNurseReq}
            //                         style={styles.stylesForButton}
            //                         variant="contained"
            //                         color="primary"
            //                     >
            //                         <strong style={{ fontSize: "12px" }}>Save</strong>
            //                     </Button>
            //                 </div>
            //             </div>
            //         </div>
            // )
            undefined
          )}
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
          open={openAddResidentDialog}
          maxWidth='xl'
          fullWidth={true}
        >
          <DialogContent style={{ backgroundColor: 'rgb(19 213 159)' }}>
            <DialogTitle
              id='simple-dialog-title'
              style={{ color: 'white', marginLeft: -9 }}
            >
              Add New Consultation
            </DialogTitle>
            <div className={`${'container-fluid'} ${classes.root}`}>
              <div className='row'>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={styles.inputContainerForTextField}
                >
                  <TextField
                    required
                    multiline
                    type='text'
                    error={rdescription === '' && isFormSubmitted}
                    label='Description / Condition'
                    name={'rdescription'}
                    value={rdescription}
                    onChange={onChangeValue}
                    rows={4}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.multilineColor,
                      classes: {
                        input: classes.multilineColor,
                      },
                    }}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={styles.inputContainerForTextField}
                >
                  <TextField
                    required
                    multiline
                    type='text'
                    error={note === '' && isFormSubmitted}
                    label='Consultation Note'
                    name={'note'}
                    value={note}
                    onChange={onChangeValue}
                    rows={4}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.multilineColor,
                      classes: {
                        input: classes.multilineColor,
                      },
                    }}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={styles.inputContainerForTextField}
                ></div>
                <span
                  style={{ fontWeight: 600, color: 'white', marginLeft: 15 }}
                >
                  ICD Diagnosis
                </span>
              </div>
              <div className='row'>
                <div
                  className='col-md-6 col-sm-6 col-6'
                  style={styles.inputContainerForTextField}
                >
                  <TextField
                    required
                    select
                    fullWidth
                    id='status'
                    name='section'
                    value={section}
                    error={section === '' && isFormSubmitted}
                    onChange={(e) => onChangeSection(e)}
                    label='Section'
                    variant='filled'
                    className='dropDownStyle'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  >
                    <MenuItem value=''>
                      <em>Section</em>
                    </MenuItem>

                    {icd &&
                      icd.map((val) => {
                        return (
                          <MenuItem key={val} value={val}>
                            {val}
                          </MenuItem>
                        )
                      })}
                  </TextField>
                </div>
                <div
                  className='col-md-6 col-sm-6 col-6'
                  style={styles.inputContainerForTextField}
                >
                  <TextField
                    type='text'
                    label='Code'
                    onChange={(e) => handleCodeSearch(e)}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      className: classes.multilineColor,
                      classes: {
                        input: classes.multilineColor,
                      },
                    }}
                    InputLabelProps={{
                      className: classes.label,
                      classes: { label: classes.label },
                    }}
                  />
                </div>
              </div>

              {icdArr != null && icdArr.length != null && icdArr.length > 0 ? (
                <div className='row' style={{ marginLeft: 0, marginRight: 0 }}>
                  <div
                    className={`scrollable ${'col-md-12 col-sm-12 col-12'}`}
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.patientDetails,
                    }}
                  >
                    <ul>
                      {icdArr.map((item) => (
                        <li key={item}>
                          <span
                            className='addCode'
                            onClick={(e) => addICDcodes(item, e)}
                            style={{ marginRight: 20, marginTop: 5 }}
                          />
                          {`Code: ${item.icd10PCSCodes}      Description: ${item.procedureCodeDescriptions}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                undefined
              )}

              <div
                class='row'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              >
                <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                  <Button
                    onClick={() => hideDialog()}
                    style={{
                      ...styles.stylesForButton,
                      color: 'gray',
                      backgroundColor: 'white',
                    }}
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
                      borderRadius: 5,
                      backgroundColor: '#2c6ddd',
                      width: '140px',
                      height: '50px',
                      outline: 'none',
                      paddingLeft: 30,
                      paddingRight: 30,
                    }}
                    disabled={!validateFormRR()}
                    onClick={addResidentRequest}
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

        <Dialog
          aria-labelledby='form-dialog-title'
          open={openAddConsultDialog}
          maxWidth='xl'
          fullWidth={true}
        >
          <DialogContent style={{ backgroundColor: '#31e2aa' }}>
            <DialogTitle
              id='simple-dialog-title'
              style={{ color: 'white', marginLeft: -20 }}
            >
              Add Consultation Note
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
                    required
                    multiline
                    rows={4}
                    label='Comments/Notes'
                    name={'doctorconsultationNotes'}
                    value={doctorconsultationNotes}
                    error={doctorconsultationNotes === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.multilineColor,
                      classes: {
                        input: classes.multilineColor,
                      },
                    }}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    multiline
                    rows={4}
                    label='Description'
                    name={'description'}
                    value={description}
                    error={description === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.multilineColor,
                      classes: {
                        input: classes.multilineColor,
                      },
                    }}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    select
                    fullWidth
                    label='Speciality'
                    name={'speciality'}
                    value={speciality}
                    error={speciality === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    variant='filled'
                    className='dropDownStyle'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  >
                    <MenuItem value=''>
                      <em>Speciality</em>
                    </MenuItem>

                    {specialityArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </div>
                <div
                  className='col-md-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    select
                    fullWidth
                    label='Select Consultant/Specialist'
                    name={'specialist'}
                    value={specialist}
                    error={specialist === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    variant='filled'
                    className='dropDownStyle'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  >
                    <MenuItem value=''>
                      <em>Specialist</em>
                    </MenuItem>

                    {specialistArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </div>
              </div>

              <div
                class='row'
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: 6,
                  paddingRight: 6,
                }}
              >
                <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                  <Button
                    onClick={() => hideDialog()}
                    style={{
                      ...styles.stylesForButton,
                      backgroundColor: 'white',
                      color: 'grey',
                    }}
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
                      borderRadius: 5,
                      backgroundColor: '#2c6ddd',
                      width: '140px',
                      height: '50px',
                      outline: 'none',
                      paddingLeft: 30,
                      paddingRight: 30,
                    }}
                    disabled={!validateForm()}
                    onClick={addConsultRequest}
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

        <Dialog
          aria-labelledby='form-dialog-title'
          open={isOpen}
          maxWidth='xl'
          fullWidth={true}
          // fullScreen
          onBackdropClick={() => {
            setIsOpen(false)
          }}
        >
          <DialogContent style={{ backgroundColor: '#31e2aa' }}>
            <DialogTitle
              id='simple-dialog-title'
              style={{ color: 'white', marginLeft: -9 }}
            >
              Added Items
            </DialogTitle>
            <div className='container-fluid'>
              <CustomTable
                tableData={requestedItems}
                tableHeading={
                  currentUser.staffTypeId.type === 'Doctor/Physician'
                    ? tableHeadingForBUMemberForItems
                    : currentUser.staffTypeId.type === 'Registered Nurse' ||
                      currentUser.staffTypeId.type === 'BU Doctor'
                    ? tableHeadingForBUMemberForItems
                    : currentUser.staffTypeId.type === 'FU Inventory Keeper'
                    ? tableHeadingForFUMemberForItems
                    : tableHeadingForFUMemberForItems
                }
                tableDataKeys={
                  currentUser.staffTypeId.type === 'Doctor/Physician'
                    ? tableDataKeysForItemsForBUMember
                    : currentUser.staffTypeId.type === 'Registered Nurse' ||
                      currentUser.staffTypeId.type === 'BU Doctor'
                    ? tableDataKeysForItemsForBUMember
                    : currentUser.staffTypeId.type === 'FU Inventory Keeper'
                    ? tableDataKeysForFUMemberForItems
                    : tableDataKeysForItemsForBUMember
                }
                // action={
                //   currentUser.staffTypeId.type === "Registered Nurse"
                //     ? actionsForItemsForReceiver
                //     : currentUser.staffTypeId.type === "BU Doctor"
                //       ? actionsForItemsForOther
                //       : currentUser.staffTypeId.type === "FU Inventory Keeper"
                //         ? actionsForItemsForFUMember
                //         : actionsForItemsForOther
                // }
                // handleEdit={handleEditRequestedItem}
                // handleDelete={handleDelete}
                // receiveItem={handleReceive}
                // handleView={handleEditRequestedItem}
                borderBottomColor={'#60d69f'}
                borderBottomWidth={20}
              />
            </div>
          </DialogContent>
        </Dialog>

        <div
          className='container-fluid'
          style={{ marginBottom: '25px', marginTop: '25px' }}
        >
          <div className='row'>
            <img
              onClick={() => props.history.goBack()}
              src={Back}
              style={{ width: 45, height: 35, cursor: 'pointer' }}
            />
          </div>
        </div>

        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />
      </div>
    </div>
  )
}

const mapStateToProps = ({ CheckingReducer }) => {
  const { count, patientDetails } = CheckingReducer
  return { count, patientDetails }
}
export default connect(mapStateToProps, {
  funForReducer,
  setPatientDetailsForReducer,
})(LabRadRequest)
