/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import {
  getSearchedLaboratoryService,
  getSearchedRadiologyService,
  getSearchedNurseService,
  updateIPR,
  getSingleIPRPatient,
  addECRUrl,
  getAllExternalConsultantsUrl,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import IPR from '../../../assets/img/IPR.png'
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
const tableHeadingForNurse = [
  'Service Code',
  'Service Name',
  'Requester',
  'Status',
  'Action',
]
const tableDataKeysForNurse = [
  'serviceCode',
  'serviceName',
  'requesterName',
  'status',
]
const tableHeadingForFollowUp = [
  'Date/Time',
  'Description',
  'Doctor',
  'Status',
  'Action',
]
const tableDataKeysForFollowUp = ['date', 'description', 'doctorName', 'status']
const actions = { view: true }
const followUpactions = { view: true, add: true }

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    height: '50px',
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

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
})

const useStyles = makeStyles(tableStyles)

function AddEditPurchaseRequest(props) {
  const classesForTabs = useStylesForTabs()

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

    //for nurse

    nurseServiceId: '',
    nurseServiceCode: '',

    nurseServiceName: '',
    nurseRequestArray: '',
    nurseServiceStatus: '',

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

    nurseService: '',

    followUpArray: '',
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
    //for nursing
    nurseServiceId,
    nurseServiceCode,
    nurseServiceName,
    nurseRequestArray,
    nurseServiceStatus,

    consultationNoteArray,
    consultationNo,
    date = new Date(),
    description,
    consultationNotes,
    requester = cookie.load('current_user').name,

    residentNoteArray,
    rdescription,
    note,
    doctor = cookie.load('current_user').name,

    pharmacyRequestArray,
    nurseService,
    followUpArray,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const handleChangeExternalConsultant = (event) => {
    setExternalConsultant(event.target.value)
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
  const [radioItemFound, setRadioItemFound] = useState('')
  const [nurseItemFoundSuccessfull, setNurseItemFoundSuccessfully] = useState(
    ''
  )
  const [nurseItemFound, setNurseItemFound] = useState('')
  const [addLabRequest, setaddLabRequest] = useState(false)

  const [addNurseRequest, setaddNurseRequest] = useState(false)
  const [searchNurseQuery, setSearchNurseQuery] = useState('')
  const [addRadioRequest, setaddRadioRequest] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [externalConsultant, setExternalConsultant] = useState('')

  const [allExternalConsultants, setAllExternalConsultants] = useState([])

  const [
    openExtenalConsultantDialog,
    setOpenExtenalConsultantDialog,
  ] = useState(false)

  const getIPRById = (id) => {
    axios
      .get(getSingleIPRPatient + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data[0])

            setIsLoading(false)

            Object.entries(res.data.data[0]).map(([key, val]) => {
              if (val && typeof val === 'object') {
                if (key === 'patientId') {
                  dispatch({ field: 'patientId', value: val._id })
                } else if (key === 'labRequest') {
                  dispatch({ field: 'labRequestArray', value: val })
                } else if (key === 'radiologyRequest') {
                  dispatch({ field: 'radiologyRequestArray', value: val })
                } else if (key === 'nurseService') {
                  dispatch({ field: 'nurseRequestArray', value: val })
                } else if (key === 'followUp') {
                  dispatch({ field: 'followUpArray', value: val })
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
                } else if (key === 'nurseService') {
                  dispatch({ field: 'nurseService', value: val })
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

    getIPRById(props.history.location.state.selectedItem._id)

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

  function viewItem(item) {
    console.log('Sent data', item)
    if (item !== '') {
      setOpenItemDialog(true)
      setItem(item)
    } else {
      setOpenItemDialog(false)
      setItem('')
    }
  }

  function viewFollowUp(item) {
    let path = `viewIPR/followUp`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'view',
        selectedItem: selectedItem,
        followUpItem: item,
      },
    })
  }

  function addFollowUp(item) {
    let path = `viewIPR/followUp`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        selectedItem: selectedItem,
        followUpItem: item,
      },
    })
  }

  function addConsultRequest() {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
    // if (validateForm()) {
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {
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
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response while adding Consult Req', res.data.data)
          window.location.reload(false)
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
      // setIsFormSubmitted(true);
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
        .put(updateIPR, params)
        .then((res) => {
          if (res.data.success) {
            console.log('response while adding Resident Req', res.data.data)
            window.location.reload(false)
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
    }
  }

  const addNewRequest = () => {
    let path = `viewIPR/add`
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
    console.log('selected item', i)

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
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Lab Request', res.data)
          // props.history.goBack();
          window.location.reload(false)
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
    // console.log("selected item", i.serviceNo);

    dispatch({ field: 'radioServiceId', value: i._id })
    dispatch({ field: 'radioServiceCode', value: i.serviceNo })
    dispatch({ field: 'radioServiceName', value: i.name })
    dispatch({ field: 'radioServiceStatus', value: i.status })

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
          },
        ],
      })
      // }
    }

    dispatch({ field: 'radioServiceId', value: '' })
    dispatch({ field: 'radioServiceCode', value: '' })
    dispatch({ field: 'radioServiceName', value: '' })
    dispatch({ field: 'radioServiceStatus', value: '' })

    setaddLabRequest(false)
  }

  const saveRadioReq = () => {
    // console.log("THISSSSS ISS ARRAYY",radiologyRequestArray)

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
        },
      ]
    }
    const params = {
      _id: id,
      radiologyRequest: radioItems,
    }
    // console.log("params", params);
    axios
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          // window.location.reload(false);
          window.location.reload(false)
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

  // for Nursing
  const handleNurseSearch = (e) => {
    setSearchNurseQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedNurseService + '/' + e.target.value)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              setNurseItemFoundSuccessfully(true)
              setNurseItemFound(res.data.data)
            } else {
              setNurseItemFoundSuccessfully(false)
              setNurseItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching req', e)
        })
    }
  }

  function handleAddNurseItem(i) {
    // console.log("selected item", i.serviceNo);

    dispatch({ field: 'nurseServiceId', value: i._id })
    dispatch({ field: 'nurseServiceCode', value: i.serviceNo })
    dispatch({ field: 'nurseServiceName', value: i.name })
    dispatch({ field: 'nurseServiceStatus', value: i.status })

    setSearchNurseQuery('')
    setaddNurseRequest(true)
  }

  const addSelectedNurseItem = () => {
    // setIsFormSubmitted(true);
    // if (validateItemsForm()) {

    let found =
      nurseRequestArray &&
      nurseRequestArray.find((item) => item.serviceId === nurseServiceId)

    if (found) {
      setOpenNotification(true)
      setErrorMsg('This Service has already been added.')
    } else {
      dispatch({
        field: 'nurseRequestArray',
        value: [
          // ...nurseRequestArray,
          ...nurseRequestArray,
          {
            serviceId: nurseServiceId,
            serviceCode: nurseServiceCode,
            requesterName: requester,
            serviceName: nurseServiceName,
            requester: currentUser.staffId,
            status: nurseServiceStatus,
          },
        ],
      })
      // }
    }

    dispatch({ field: 'nurseServiceId', value: '' })
    dispatch({ field: 'nurseServiceCode', value: '' })
    dispatch({ field: 'nurseServiceName', value: '' })
    dispatch({ field: 'nurseServiceStatus', value: '' })

    setaddNurseRequest(false)
  }

  const saveNurseReq = () => {
    // console.log("THISSSSS ISS ARRAYY",radiologyRequestArray)

    let nurseItems = []
    for (let i = 0; i < nurseRequestArray.length; i++) {
      nurseItems = [
        ...nurseItems,
        {
          serviceId: nurseRequestArray[i].serviceId,
          serviceCode: nurseRequestArray[i].serviceCode,
          requester: nurseRequestArray[i].requester,
          requesterName: nurseRequestArray[i].requesterName,
          serviceName: nurseRequestArray[i].serviceName,
          status: nurseRequestArray[i].status,
        },
      ]
    }
    const params = {
      _id: id,
      nurseService: nurseItems,
    }
    // console.log("params", params);
    axios
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding nurse Request', res.data)
          // window.location.reload(false);
          window.location.reload(false)
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding Nurse Request', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the Nurse Request')
      })
  }

  const TriageAssessment = () => {
    let path = `viewIPR/TriageAndAssessment`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: selectedItem,
      },
    })
  }

  const dischargeRequest = () => {
    let path = `viewIPR/dischargerequest`
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

  // function validateItemsForm() {
  //   return description && description.length > 0 && note && note.length > 0;

  // }
  function validateItemsForm() {
    return rdescription && rdescription.length > 0 && note && note.length > 0
  }
  function handleGenerateECR() {
    const params = {
      iprId: id,
      generatedBy: currentUser.staffId,
      generatedFor: externalConsultant,
      patient: selectedItem.patientId._id,
      generatedFrom: 'IPR',
    }
    console.log('params', params)
    axios
      .post(addECRUrl, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response after adding Radio Request', res.data)
          window.location.reload(false)
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
      <Header history={props.history}/>

      {!isLoading ? (
        <div className='cPadding'>
          <div className='subheader'>
            <div>
              <img src={IPR} />
              <h4>In Patient Request</h4>
            </div>

            <div>
              <Button
                onClick={TriageAssessment}
                style={styles.stylesForButton}
                variant='contained'
                color='primary'
              >
                Triage And Assessment
              </Button>
            </div>
          </div>
          <div
            style={{
              height: '20px',
            }}
          />
          <div className='container-fluid' style={styles.patientDetails}>
            <div className='row'>
              <div className='col-md-12'>
                <h4 style={{ color: 'blue', fontWeight: '600' }}>
                  Patient Details
                </h4>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Patient Name
                  </InputLabel>
                  <span style={styles.styleForPatientDetails}>
                    {selectedPatient.firstName + ` ` + selectedPatient.lastName}{' '}
                  </span>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Gender
                  </InputLabel>
                  <span style={styles.styleForPatientDetails}>
                    {selectedPatient.gender}
                  </span>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Age
                  </InputLabel>
                  <span style={styles.styleForPatientDetails}>
                    {selectedPatient.age ? selectedPatient.age : 30}
                  </span>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Patient MRN
                  </InputLabel>
                  <span style={styles.styleForPatientDetails}>
                    {selectedPatient.profileNo}
                  </span>
                </div>
              </div>

              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Insurance No
                  </InputLabel>
                  <span style={styles.styleForPatientDetails}>
                    {selectedPatient.insuranceId
                      ? selectedPatient.insuranceId
                      : '--'}
                  </span>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'>
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id='status-label'>
                    Request No
                  </InputLabel>
                  <span style={styles.styleForPatientDetails}>{requestNo}</span>
                </div>
              </div>
            </div>
          </div>

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
              textColor="primary"
              TabIndicatorProps={{style: {background:'#12387a'}}}
              centered={false}
              variant='scrollable'
              fullWidth={true}
            >
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 0 ? "#12387a" : '#3B988C',
                }}
                label='Resident Doctor Notes'
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 1 ? "#12387a" : '#3B988C',
                }}
                label='External Consultant Notes'
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 2 ? "#12387a" : '#3B988C',
                }}
                label='PHR'
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 3 ? "#12387a" : '#3B988C',
                }}
                label='LR'
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 4 ? "#12387a" : '#3B988C',
                }}
                label='RR'
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 5 ? "#12387a" : '#3B988C',
                }}
                label='NP/NS'
              />
              <Tab
                style={{
                  color: 'white',
                  borderRadius: 15,
                  outline: 'none',
                  color: value === 6 ? "#12387a" : '#3B988C',
                }}
                label='Follow Up'
              />
            </Tabs>
          </div>

          {value === 0 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
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

              <div className='row' style={{ marginBottom: '25px' }}>
                <div className='col-md-6 col-sm-6 col-6'>
                  <Button
                    onClick={dischargeRequest}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                  >
                    <strong style={{ fontSize: '12px' }}>
                      Discharge Request
                    </strong>
                  </Button>
                </div>
                <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                  <Button
                    onClick={() => setOpenAddResidentDialog(true)}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                  >
                    <img className='icon-style' src={plus_icon} />
                    &nbsp;&nbsp;
                    <strong style={{ fontSize: '12px' }}>
                      Add New Consultation
                    </strong>
                  </Button>
                </div>
              </div>
              <div className='row' style={{ marginBottom: '25px' }}>
                <div className='col-md-6 col-sm-6 col-6'>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back}
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          ) : value === 1 ? (
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

              <div className='row' style={{ marginBottom: '25px' }}>
                <div className='col-md-6 col-sm-6 col-6'>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back}
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  />
                </div>
                {/* <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                <Button
                  onClick={() => setOpenAddConsultDialog(true)}
                  style={styles.stylesForButton}
                  variant="contained"
                  color="primary"
                >
                  <img className="icon-style" src={plus_icon} />
                  &nbsp;&nbsp;
                  <strong style={{ fontSize: "12px" }}>
                    Add New Consultation
                  </strong>
                </Button>
              </div> */}

                <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                  <Button
                    onClick={() => setOpenExtenalConsultantDialog(true)}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                  >
                    <strong style={{ fontSize: '12px' }}>Generate ECR</strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 2 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div className='row' style={{ marginTop: '20px' }}>
                {pharmacyRequestArray !== 0 ? (
                  <CustomTable
                    tableData={pharmacyRequestArray}
                    tableDataKeys={tableDataKeysForPharmacy}
                    tableHeading={tableHeadingForPharmacy}
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
                <div className='col-md-6 col-sm-6 col-6'>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back}
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  />
                </div>
                <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
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
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div style={{ marginTop: '20px' }} className='row'>
                <div className='col-md-12 col-sm-12 col-12'>
                  <InputLabelComponent>Service Name</InputLabelComponent>
                  <input
                    type='text'
                    placeholder='Search service by name'
                    name={'searchQuery'}
                    value={searchQuery}
                    onChange={handleSearch}
                    className='textInputStyle'
                  />
                </div>
              </div>

              {searchQuery ? (
                <div style={{ zIndex: 10 }}>
                  <Paper>
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
                            {itemFound.map((i, index) => {
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
                <div className='col-md-10 col-sm-10 col-6'>
                  <InputLabelComponent>Selected Service*</InputLabelComponent>
                  <input
                    disabled
                    style={styles.inputField}
                    type='text'
                    placeholder='Search from above...'
                    name={'labServiceName'}
                    value={labServiceName}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                </div>
                <div className='col-md-2 col-sm-2 col-6'>
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      marginTop: '25px',
                      backgroundColor: '#e877a1',
                    }}
                    disabled={!addLabRequest}
                    onClick={addSelectedLabItem}
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Add Service
                  </Button>
                </div>
              </div>

              <div className='row' style={{ marginTop: '20px' }}>
                {labRequestArray !== 0 ? (
                  <CustomTable
                    tableData={labRequestArray}
                    tableDataKeys={tableDataKeysForLabReq}
                    tableHeading={tableHeadingForLabReq}
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
                <div className='col-md-6 col-sm-6 col-6'>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back}
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  />
                </div>
                <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                  <Button
                    onClick={saveLabReq}
                    style={styles.stylesForButton}
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
              <div style={{ marginTop: '20px' }} className='row'>
                <div className='col-md-12 col-sm-12 col-12'>
                  <InputLabelComponent>Service Name</InputLabelComponent>
                  <input
                    type='text'
                    placeholder='Search service by name'
                    name={'searchRadioQuery'}
                    value={searchRadioQuery}
                    onChange={handleRadioSearch}
                    className='textInputStyle'
                  />
                </div>
              </div>

              {searchRadioQuery ? (
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

              <div style={{ marginTop: '20px' }} className='row'>
                <div className='col-md-10 col-sm-10 col-6'>
                  <InputLabelComponent>Selected Service*</InputLabelComponent>
                  <input
                    disabled
                    style={styles.inputField}
                    type='text'
                    placeholder='Search from above...'
                    name={'radioServiceName'}
                    value={radioServiceName}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                </div>
                <div className='col-md-2 col-sm-2 col-6'>
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      marginTop: '25px',
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
              </div>

              <div className='row' style={{ marginTop: '20px' }}>
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
              </div>

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
                    <strong style={{ fontSize: '12px' }}>Save</strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 5 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div style={{ marginTop: '20px' }} className='row'>
                <div className='col-md-12 col-sm-12 col-12'>
                  <InputLabelComponent>Service Name</InputLabelComponent>
                  <input
                    type='text'
                    placeholder='Search service by name'
                    name={'searchRadioQuery'}
                    value={searchNurseQuery}
                    onChange={handleNurseSearch}
                    className='textInputStyle'
                  />
                </div>
              </div>

              {searchNurseQuery ? (
                // <Paper style={{ width: ' 100%', marginTop: 20,  }} elevation={3}>
                <div style={{ zIndex: 10 }}>
                  <Paper>
                    {nurseItemFoundSuccessfull ? (
                      nurseItemFound && (
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
                            {nurseItemFound.map((i, index) => {
                              return (
                                <TableRow
                                  key={i.serviceNo}
                                  onClick={() => handleAddNurseItem(i)}
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
                        onClick={() => setSearchNurseQuery('')}
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
                <div className='col-md-10 col-sm-10 col-6'>
                  <InputLabelComponent>Selected Service*</InputLabelComponent>
                  <input
                    disabled
                    style={styles.inputField}
                    type='text'
                    placeholder='Search from above...'
                    name={'nurseServiceName'}
                    value={nurseServiceName}
                    onChange={onChangeValue}
                    className='textInputStyle'
                  />
                </div>
                <div className='col-md-2 col-sm-2 col-6'>
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      marginTop: '25px',
                      backgroundColor: '#e877a1',
                    }}
                    disabled={!addNurseRequest}
                    onClick={addSelectedNurseItem}
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Add Service
                  </Button>
                </div>
              </div>

              <div className='row' style={{ marginTop: '20px' }}>
                {nurseRequestArray !== 0 ? (
                  <CustomTable
                    tableData={nurseRequestArray}
                    tableDataKeys={tableDataKeysForNurse}
                    tableHeading={tableHeadingForNurse}
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
                <div className='col-md-6 col-sm-6 col-6'>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back}
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  />
                </div>
                <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                  <Button
                    onClick={saveNurseReq}
                    style={styles.stylesForButton}
                    variant='contained'
                    color='primary'
                  >
                    <strong style={{ fontSize: '12px' }}>Save</strong>
                  </Button>
                </div>
              </div>
            </div>
          ) : value === 6 ? (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            >
              <div className='row' style={{ marginTop: '20px' }}>
                {followUpArray !== 0 ? (
                  <CustomTable
                    tableData={followUpArray}
                    tableDataKeys={tableDataKeysForFollowUp}
                    tableHeading={tableHeadingForFollowUp}
                    handleView={viewFollowUp}
                    handleAdd={addFollowUp}
                    action={followUpactions}
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
                    style={{ width: 45, height: 35, cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className='container-fluid'
            ></div>
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
                      GENRATE
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
