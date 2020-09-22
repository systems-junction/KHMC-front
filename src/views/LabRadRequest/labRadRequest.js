import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {
  searchpatient,
  getSearchedpatient,
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  updateEdrIpr,
} from '../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import Lab_RadIcon from '../../assets/img/Lab-Rad Request.png'
import Back from '../../assets/img/Back_Arrow.png'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../components/Table/Table'
import plus_icon from '../../assets/img/Plus.png'
import InputLabelComponent from '../../components/InputLabel/inputLabel'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import ErrorMessage from '../../components/ErrorMessage/errorMessage'
import Notification from '../../components/Snackbar/Notification.js'
import Fingerprint from '../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../assets/img/Bar Code.png'
import Loader from 'react-loader-spinner'
import ViewSingleRequest from './viewRequest'

const tableHeadingForResident = [
  'Date / Time',
  'Description / Condition',
  'Referring Doctor',
  'Action',
]
const tableDataKeysForResident = ['date', 'description', 'doctorName']
const tableHeadingForConsultation = [
  'Date/Time',
  'Description / Condition',
  'Specialist',
  'Referring Doctor',
  'Status',
  'Action',
]
const tableDataKeysForConsultation = [
  'date',
  'description',
  'specialist',
  'doctorName',
  'status',
]
const tableHeadingForPharmacy = [
  'Request ID',
  'Date/Time',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForPharmacy = ['requestNo', 'createdAt', 'generatedBy', 'status']
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
  ["itemId", "name"],
  ["itemId", "medClass"],
  "requestedQty",
  "status",
];
const tableDataKeysForFUMemberForItems = [
  ["itemId", "name"],
  ["itemId", "medClass"],
  "requestedQty",
  "secondStatus",
];
const tableHeadingForFUMemberForItems = [
  "Name",
  "Type",
  "Requested Qty",
  "Status",
  ""
];
const tableHeadingForBUMemberForItems = [
  "Name",
  "Type",
  "Requested Qty",
  "Status",
  ""
];
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

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '20px',
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

    radioServiceId: '',
    radioServiceCode: '',
    radioServiceName: '',
    radiologyRequestArray: '',
    radioServiceStatus: '',

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
    requestType: '',
    diagnosisArray: '',
    medicationArray: '',

    //for nurse
    nurseServiceId: '',
    nurseServiceCode: '',
    nurseServiceName: '',
    nurseService: '',
    nurseServiceStatus: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    requester = cookie.load('current_user').name,

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
    residentNoteArray,
    pharmacyRequestArray,
    diagnosisArray,
    medicationArray,
    requestType
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [currentUser, setCurrentUser] = useState(cookie.load('current_user'))
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = useState(0)
  const [selectedItem, setSelectedItem] = useState('')
  const [searchPatientQuery, setSearchPatientQuery] = useState('')
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(false)
  const [patientFound, setpatientFound] = useState('')
  const [patientDetails, setPatientDetails] = useState('')
  const [selectedPatientArray, setSelectedPatientArray] = useState([])
  const [patientDetailsDialog, openPatientDetailsDialog] = useState(false)
  const [enableForm, setenableForm] = useState(true)

  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [openAddConsultDialog, setOpenAddConsultDialog] = useState(false)
  const [openAddResidentDialog, setOpenAddResidentDialog] = useState(false)
  const [item, setItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [labRequest, setlabRequest] = useState('')
  const [pharmacyRequest, setpharmacyRequest] = useState('')
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
  const [radioItemFound, setRadioItemFound] = useState('')
  const [addLabRequest, setaddLabRequest] = useState(false)
  const [addRadioRequest, setaddRadioRequest] = useState(false)
  const [nurseItemFoundSuccessfull, setNurseItemFoundSuccessfully] = useState(
    ''
  )
  const [nurseItemFound, setNurseItemFound] = useState('')
  const [addNurseRequest, setaddNurseRequest] = useState(false)
  const [searchNurseQuery, setSearchNurseQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [requestedItems, setRequestedItems] = useState("");
  const [, setSelectedOrder] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [enableSave, setEnableSave] = useState(true)

  useEffect(() => {

    // getEDRById(props.history.location.state.selectedItem._id);

    // setId(props.history.location.state.selectedItem._id);
    // setSelectedItem(props.history.location.state.selectedItem);
    // setrequestNo(props.history.location.state.selectedItem.requestNo);
    // setSelectedPatient(props.history.location.state.selectedItem.patientId);
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
    setSelectedOrder(obj);
    setIsOpen(true);
    setRequestedItems(obj.item);
  };

  const handleSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
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
            pathname: 'LabRadRequest/success',
            state: {
              message: `Lab Request # ${res.data.data.labRequest[res.data.data.labRequest.length - 1]
                .LRrequestNo
                } for patient MRN ${res.data.data.patientId.profileNo
                } added successfully`,
            },
          })
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
    const a = e.target.value.replace(/[^\w\s]/gi, '')
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

    const RRrequestNo = 'RR' + day + YYYY + HH + mm + ss
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
            pathname: 'LabRadRequest/success',
            state: {
              message: `Radiology Request # ${res.data.data.radiologyRequest[
                res.data.data.radiologyRequest.length - 1
              ].RRrequestNo
                } for patient MRN ${res.data.data.patientId.profileNo
                } added successfully`,
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
  //         .put(updateIPR, params)
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

  //for search patient
  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)
    if (a.length >= 3) {
      axios
        .get(
          getSearchedpatient + '/' + currentUser.functionalUnit._id + '/' + a
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
                // if (key === "patientId") {
                //     dispatch({ field: "patientId", value: val._id });
                // } else
                if (key === 'labRequest') {
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
                  dispatch({ field: 'residentNoteArray', value: val.reverse() })
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
                  if (val && val.length > 0) {
                    dispatch({
                      field: 'medicationArray',
                      value: val[0].medicine,
                    })
                  }
                }
                //  else if (key === "nurseService") {
                //     dispatch({ field: "nurseService", value: val });
                // }
              } else {
                dispatch({ field: key, value: val })
                // console.log("here",key,val)
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

  const TriageAssessment = () => {
    let path = `LabRadRequest/triageAssessment`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
      },
    })
  }

  function viewLabRadReport(rec) {
    if (!rec.view) {
      let path = `LabRadRequest/viewReport`
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

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
      setsuccessMsg('')
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
            <img src={Lab_RadIcon} />
            <h4>
              {value === 2
                ? 'Lab Request'
                : value === 3
                  ? 'Radiology Request'
                  : 'Lab / Rad Request'}
            </h4>
          </div>

          <div>
            <Button
              disabled={enableForm}
              onClick={TriageAssessment}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              Triage & Assessment
            </Button>
          </div>
        </div>
        <div
          className={`${'container-fluid'} ${classes.root}`}
          style={{ marginTop: '25px' }}
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
                onChange={handlePatientSearch}
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
                <img src={BarCode} style={{ width: 80, height: 75 }} />
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
                    width: '100%',
                    marginTop: 5,
                  }}
                >
                  <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                    {patientFoundSuccessfull ? (
                      patientFound && (
                        <Table size='small'>
                          <TableHead>
                            <TableRow>
                              <TableCell>MRN Number</TableCell>
                              <TableCell>Patient Name</TableCell>
                              <TableCell>Gender</TableCell>
                              <TableCell>Age</TableCell>
                              <TableCell>Payment Method</TableCell>
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
                                  <TableCell>{i.paymentMethod}</TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      )
                    ) : (
                        <h4
                          style={{ textAlign: 'center' }}
                          onClick={() => setSearchPatientQuery('')}
                        >
                          Patient Not Found
                        </h4>
                      )}
                  </Paper>
                </div>
              ) : (
                  undefined
                )}
            </div>
          </div>
        </div>

        <div className='container-fluid'>
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
                <span style={styles.textStyles}>
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
                {'None'}
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {medicationArray
                  ? medicationArray.map((drug, index) => {
                    return (
                      <h6 style={styles.textStyles}>{drug.medicineName}</h6>
                    )
                  })
                  : 'None'}
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {diagnosisArray
                  ? diagnosisArray.map((drug, index) => {
                    return <h6 style={styles.textStyles}>{drug}</h6>
                  })
                  : 'None'}
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
                label='Pharm'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 2 ? '#12387a' : '#3B988C',
                }}
                label='Lab'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 3 ? '#12387a' : '#3B988C',
                }}
                label='Rad'
                disabled={enableForm}
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 5,
                  outline: 'none',
                  color: value === 4 ? '#12387a' : '#3B988C',
                }}
                label='Consultant/Specialist Notes'
                disabled={enableForm}
              />
              {/* <Tab
                  style={{
                      color: "white",
                      borderRadius: 5,
                      outline: "none",
                      backgroundColor: value === 5 ? "#2c6ddd" : undefined,
                  }}
                  label="In Patient Request"
                  disabled
              /> */}
            </Tabs>
          </div>

          {value === 0 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className=' container-fluid'
            >
              <div className='row' style={{ marginTop: '20px' }}>
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
            </div>
          ) : value === 1 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div className='row' style={{ marginTop: '20px' }}>
                {pharmacyRequestArray && pharmacyRequestArray.length !== 0 ? (
                  <CustomTable
                    tableData={pharmacyRequestArray}
                    tableDataKeys={tableDataKeysForPharmacy}
                    tableHeading={tableHeadingForPharmacy}
                    handleView={handleView}
                    action={actions}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                    <h3
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        width: '100%',
                        position: 'absolute',
                      }}
                    >
                      Opps...No Data Found In PHARM
                    </h3>
                  )}
              </div>
            </div>
          ) : value === 2 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className={`container-fluid ${classes.root}`}
            >
              <div style={{ marginTop: '20px' }} className='row'>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Lab Test'
                    name={'searchQuery'}
                    value={searchQuery}
                    onChange={handleSearch}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              </div>

              {searchQuery ? (
                <div style={{ zIndex: 10 }}>
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

              <div style={{ marginTop: '20px' }} className='row'>
                <div
                  className='col-md-5 col-sm-5 col-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
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
                  className='col-md-5 col-sm-5 col-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
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
                <div className='col-md-2 col-sm-2 col-6'>
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      marginTop: '25px',
                      backgroundColor: '#ad6bbf',
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

              <div className='row' style={{ marginTop: '20px' }}>
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
                <div className='col-md-12 col-sm-12 col-12 d-flex justify-content-end'>
                  <Button
                    // disabled={enableForm}
                    disabled={enableSave}
                    onClick={saveLabReq}
                    style={{ ...styles.stylesForButton, width: '100px' }}
                    variant='contained'
                    color='primary'
                  >
                    <strong style={{ fontSize: '12px' }}>Save</strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 3 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className={`container-fluid ${classes.root}`}
            >
              <div style={{ marginTop: '20px' }} className='row'>
                <div
                  className='col-md-12 col-sm-12 col-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Radiology / Imaging'
                    name={'searchRadioQuery'}
                    value={searchRadioQuery}
                    onChange={handleRadioSearch}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              </div>

              {searchRadioQuery ? (
                // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                <div style={{ zIndex: 10 }}>
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

              <div style={{ marginTop: '20px' }} className='row'>
                <div
                  className='col-md-5 col-sm-5 col-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    disabled
                    label='Selected Service'
                    name={'radioServiceName'}
                    value={radioServiceName}
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
                  className='col-md-5 col-sm-5 col-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
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
                      backgroundColor: '#ad6bbf',
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

              <div className='row' style={{ marginTop: '20px' }}>
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
                <div className='col-md-12 col-sm-12 col-12 d-flex justify-content-end'>
                  <Button
                    // disabled={enableForm}
                    disabled={enableSave}
                    onClick={saveRadioReq}
                    style={{ ...styles.stylesForButton, width: '100px' }}
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
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div className='row' style={{ marginTop: '20px' }}>
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
            </div>
          ) : (
                      undefined
                    )}

          {openItemDialog ? (
            <ViewSingleRequest
              item={item}
              openItemDialog={openItemDialog}
              viewItem={viewItem}
            />
          ) : (
              undefined
            )}
        </div>

        <Dialog
          aria-labelledby="form-dialog-title"
          open={isOpen}
          maxWidth="xl"
          fullWidth={true}
          onBackdropClick={() => {
            setIsOpen(false);
          }}
        >
          <DialogContent style={{ backgroundColor: "#31e2aa" }}>
            <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
              Added Items
              </DialogTitle>
            <div className="container-fluid">
              <CustomTable
                tableData={requestedItems}
                tableHeading={
                  currentUser.staffTypeId.type === "Doctor/Physician"
                    ? tableHeadingForBUMemberForItems
                    : currentUser.staffTypeId.type === "Registered Nurse" ||
                      currentUser.staffTypeId.type === "BU Doctor"
                      ? tableHeadingForBUMemberForItems
                      : currentUser.staffTypeId.type === "FU Inventory Keeper"
                        ? tableHeadingForFUMemberForItems
                        : tableHeadingForFUMemberForItems
                }
                tableDataKeys={
                  currentUser.staffTypeId.type === "Doctor/Physician"
                    ? tableDataKeysForItemsForBUMember
                    : currentUser.staffTypeId.type === "Registered Nurse" ||
                      currentUser.staffTypeId.type === "BU Doctor"
                      ? tableDataKeysForItemsForBUMember
                      : currentUser.staffTypeId.type === "FU Inventory Keeper"
                        ? tableDataKeysForFUMemberForItems
                        : tableDataKeysForItemsForBUMember
                }
                borderBottomColor={"#60d69f"}
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
export default LabRadRequest
