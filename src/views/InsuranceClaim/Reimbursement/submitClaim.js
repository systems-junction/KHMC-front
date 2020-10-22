import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { FaUpload } from 'react-icons/fa'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import {
  updateClaim,
  getInsuredPatients,
  addClaim,
  getedripr,
  uploadsUrl,
  audioURL,
} from '../../../public/endpoins'
import axios from 'axios'
import Notification from '../../../components/Snackbar/Notification.js'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import Back_Arrow from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import FormData from 'form-data'
import claimsReview from '../../../assets/img/ClaimsReview.png'
import logoInvoice from '../../../assets/img/logoInvoice.png'
import logoPatientSummaryInvoice from '../../../assets/img/logoPatientSummaryInvoice.png'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import CustomTable from '../../../components/Table/Table'
import MenuItem from '@material-ui/core/MenuItem'
import Loader from 'react-loader-spinner'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../../assets/img/Bar Code.png'
import Fingerprint from '../../../assets/img/fingerprint.png'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { before, last, reject } from 'lodash'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle'
import print from '../../../assets/img/print.png'
import Tooltip from '@material-ui/core/Tooltip'

const tableHeadingForBillSummary = [
  'Date/Time',
  'Service Name',
  'Service Type',
  'Status',
  'Original Amount (JD)',
  'Insured Amount (JD)',
  'Invoice',
]
// const tableDataKeysForBillSummary = [
//   "date",
//   ["serviceId", "name"],
//   "serviceType",
//   ["serviceId", "insuranceStatus"],
//   ["serviceId", "originalPrice"],
//   ["serviceId", "insuredPrice"],
// ];

const statusArray = [
  { key: 'Analysis In Progress', value: 'Analysis In Progress' },
  { key: 'Approved', value: 'Approved' },
  { key: 'Partial Approved', value: 'Partial Approved' },
  { key: 'Rejected', value: 'Rejected' },
]

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    width: '130px',
    height: '45px',
    outline: 'none',
  },
  save: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#ba55d3',
    width: '130px',
    height: '45px',
    outline: 'none',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '10px',
    marginTop: '20px',
    padding: '10px',
    textAlign: 'center',
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '5px',
    color: 'gray',
    width: '100%',
    height: '48px',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '10px',
  },
  input: {
    display: 'none',
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: '10px',
  },
  inputContainerForTextField: {
    marginTop: 10,
  },
  styleForLabel: {
    paddingTop: 25,
    fontWeight: '700',
    color: 'gray',
  },
  inputStyles: {
    outline: 'none',
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
  selectedDoc: {
    backgroundColor: 'azure',
    padding: '5px',
    borderRadius: '5px',
  },
}

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
})
const useStyles1 = makeStyles(tableStyles)
const useStyles = makeStyles((theme) => ({
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
    borderRadius: 10,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:disabled': {
      color: 'gray',
    },
    '&:focus': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },
  multilineColor: {
    backgroundColor: 'white',
    borderRadius: 10,
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
    '& .Mui-selected': {
      backgroundColor: '#CCCCCC',
      '&:hover': {
        backgroundColor: '#CCCCCC',
      },
    },
  },
}))

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f4f4f4',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#FFFFFF',
    },
  },
}))(TableRow)

function EnhancedTableHead(props) {
  const classes = useStyles1()
  const { tableHeaderColor } = props
  const { onSelectAllClick, numSelected, rowCount } = props

  return (
    <TableHead
      className={classes[tableHeaderColor + 'TableHeader']}
      style={{
        backgroundColor: '#2873cf',
      }}
    >
      <TableRow className={classes.tableHeadRow}>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all requests' }}
          />
        </TableCell>
        {tableHeadingForBillSummary.map((headCell, index) => (
          <TableCell
            key={headCell}
            className={classes.tableHeadCell}
            style={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
              borderTopLeftRadius: index === 0 ? 5 : 0,
              borderTopRightRadius:
                index === tableHeadingForBillSummary.length - 1 ? 5 : 0,
            }}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function AddEditPatientListing(props) {
  const classes = useStyles()
  const classes1 = useStyles1()

  const initialState = {
    profileNo: '-----',
    firstName: '-----',
    lastName: '-----',
    gender: '-----',
    age: '--',
    weight: '--',
    QR: '',
    requestNo: '',
    admittedOn: '',
    document: [],
    generatedBy: cookie.load('current_user').staffId,
    treatmentDetail: '',
    patientId: '',
    status: '',
    responseCode: '',
    diagnosisArray: '',
    medicationArray: '',
    requestType: '',
    edriprId: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    profileNo,
    firstName,
    lastName,
    gender,
    age,
    weight,
    QR,
    requestNo,
    admittedOn,
    document,
    generatedBy = cookie.load('current_user').staffId,
    treatmentDetail,
    patientId,
    status,
    responseCode,
    diagnosisArray,
    medicationArray,
    requestType,
    edriprId,
  } = state

  const classesForTabs = useStylesForTabs()

  const [comingFor, setcomingFor] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [DocumentUpload, setDocumentUpload] = useState('')
  const [imagePreview, setImagePreview] = useState([])
  const [pdfView, setpdfView] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [billSummaryArray, setbillSummaryArray] = useState(false)
  const [ClaimId, setClaimId] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [productData, setproductData] = useState([])
  const [searched, setsearched] = useState(false)
  const [selected, setSelected] = React.useState([])
  const [timer, setTimer] = useState(null)
  const [loadSearchedData, setLoadSearchedData] = useState(false)

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor)
    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem
    console.log('selected rec is ... ', selectedRec)

    if (props.history.location.state.comingFor === 'edit') {
      if (selectedRec) {
        getBillSummary(selectedRec.patient._id)
        setClaimId(selectedRec._id)
        setsearched(true)
      }
    }

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          if (key === 'patient') {
            Object.entries(val).map(([key1, val1]) => {
              if (key1 === '_id') {
                dispatch({ field: 'patientId', value: val1 })
              } else {
                dispatch({ field: key1, value: val1 })
              }
            })
          }
        } else {
          dispatch({ field: key, value: val })
        }
      })
    }
  }, [])

  // function validatePatientForm() {
  //   return (
  //     identificationNumber &&
  //     identificationNumber.length > 0 &&
  //     title &&
  //     title.length > 0 &&
  //     firstName &&
  //     firstName.length > 0 &&
  //     lastName &&
  //     lastName.length > 0 &&
  //     phoneNumber &&
  //     phoneNumber.length > 0 &&
  //     gender &&
  //     gender.length > 0 &&
  //     email &&
  //     email.length > 0 &&
  //     country &&
  //     country.length > 0 &&
  //     city &&
  //     city.length > 0 &&
  //     address &&
  //     address.length > 0
  //   )
  // }

  // function validateDetailsForm() {
  //   return (
  //     insuranceNumber &&
  //     insuranceNumber.length > 0 &&
  //     insuranceVendor &&
  //     insuranceVendor.length > 0 &&
  //     coverageDetails &&
  //     coverageDetails.length > 0
  //     // coverageTerms &&
  //     // coverageTerms.length > 0 &&
  //     // payment &&
  //     // payment.length > 0
  //   )
  // }

  const handleAdd = () => {
    let formData = new FormData()
    if (DocumentUpload) {
      for (var x = 0; x < DocumentUpload.length; x++) {
        formData.append('file', DocumentUpload[x], DocumentUpload[x].name)
      }
    }
    //if (validatePatientForm()) {
    const params = {
      generatedBy: generatedBy,
      patient: patientId,
      treatmentDetail: treatmentDetail,
      document: document,
      status: 'pending',
      responseCode: 'N/A',
      requestType: requestType,
      edriprId: edriprId,
    }
    formData.append('data', JSON.stringify(params))
    console.log('DATAAA ', formData)
    axios
      .post(addClaim, formData, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('response for claim data ... ', res.data)
        if (res.data.success) {
          dispatch({ field: 'patientId', value: '' })
          dispatch({ field: 'firstName', value: '' })
          dispatch({ field: 'lastName', value: '' })
          dispatch({ field: 'gender', value: '' })
          dispatch({ field: 'age', value: '' })
          dispatch({ field: 'weight', value: '' })
          dispatch({ field: 'profileNo', value: '' })
          dispatch({ field: 'treatmentDetail', value: '' })
          dispatch({ field: 'document', value: [] })

          props.history.push({
            pathname: 'success',
            state: {
              message: `Claim: ${res.data.data.requestNo} against Patient MRN: ${profileNo.toUpperCase()} submitted successfully`,
            },
          })
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('A Claim is already submitted for this patient')
        }
      })
      .catch((e) => {
        console.log('error after adding Claim details', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the Claim details')
      })
    //}
    setIsFormSubmitted(true)
  }

  const handleEdit = () => {
    let formData = new FormData()
    if (DocumentUpload) {
      for (var x = 0; x < DocumentUpload.length; x++) {
        formData.append('file', DocumentUpload[x], DocumentUpload[x].name)
      }
    }
    //if (validatePatientForm()) {
    const params = {
      _id: ClaimId,
      treatmentDetail: treatmentDetail,
      document: document,
      status: status,
      responseCode: 'N/A',
    }
    formData.append('data', JSON.stringify(params))
    console.log("PARAMSS ", params);
    // console.log("DATAAA ", formData);
    axios
      .put(updateClaim, formData)
      .then((res) => {
        if (res.data.success) {
          console.log("res", res.data.data)
          props.history.push({
            pathname: 'success',
            state: {
              message: `Claim: ${res.data.data.requestNo} against Patient MRN: ${profileNo.toUpperCase()} updated successfully`,
            },
          })
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after updating Claim details', e)
        setOpenNotification(true)
        setErrorMsg('Error while editing the Claim details')
      })
    //}
    // setIsFormSubmitted(true)
  }

  const onDocumentUpload = (event) => {
    var file = event.target.files
    setDocumentUpload(file)

    console.log('Multiple files are ', file)

    let fileType = []
    for (let x = 0; x < file.length; x++) {
      console.log('Separate files ', file[x])
      fileType.push(file[x].name.slice(file[x].name.length - 3))
    }

    let arr = []
    let arr1 = []
    for (let i = 0; i < fileType.length; i++) {
      let reader = new FileReader()
      reader.readAsDataURL(file[i])
      reader.onload = function(event) {
        if (fileType[i] === 'pdf') {
          arr.push(file[i].name)
          setpdfView([...arr])
        } else {
          arr1.push(event.target.result)
          setImagePreview([...arr1])
        }
      }
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onClick = () => {
    setValue(value + 1)
  }

  const onChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w\s]/gi, ''),
    })
  }

  const formatDate = (date) => {
    const d = new Date(date)

    let minutes = ''

    if (d.getHours().toString().length === 1) {
      minutes = '0' + d.getHours()
    } else {
      minutes = d.getHours()
    }
    return (
      // d.getDate() +
      d.getDate() +
      ' - ' +
      (d.getMonth() + 1).toString().padStart(2, '0') +
      ' - ' +
      // (d.getMonth() + 1) +
      d.getFullYear() +
      ' ' +
      // d.toLocaleTimeString()
      minutes +
      ':' +
      ('00' + d.getMinutes()).slice(-2)
    )
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
      setsuccessMsg('')
    }, 2000)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      triggerChange()
    }
  }

  const triggerChange = (a) => {
    handleSearch(a)
  }

  const handlePauseSearch = (e) => {
    setLoadSearchedData(true)
    clearTimeout(timer)

    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchQuery(a)

    setTimer(
      setTimeout(() => {
        triggerChange(a)
      }, 600)
    )
  }

  const handleSearch = (e) => {
    if (e.length >= 3) {
      axios
        .get(
          getInsuredPatients + '/' + currentUser.functionalUnit._id + '/' + e
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              setItemFoundSuccessfully(true)
              setItemFound(res.data.data)
              setLoadSearchedData(false)
            } else {
              setItemFoundSuccessfully(false)
              setItemFound('')
              setLoadSearchedData(false)
            }
          }
        })
        .catch((e) => {
          console.log('error while searching patient', e)
        })
    }
  }

  function handleAddItem(i) {
    dispatch({ field: 'medicationArray', value: '' })
    dispatch({ field: 'diagnosisArray', value: '' })
    dispatch({ field: 'treatmentDetail', value: '' })
    dispatch({ field: 'document', value: '' })
    dispatch({ field: 'billSummaryArray', value: '' })

    dispatch({ field: 'patientId', value: i._id })
    dispatch({ field: 'firstName', value: i.firstName })
    dispatch({ field: 'lastName', value: i.lastName })
    dispatch({ field: 'gender', value: i.gender })
    dispatch({ field: 'age', value: i.age })
    dispatch({ field: 'weight', value: i.weight })
    dispatch({ field: 'profileNo', value: i.profileNo })
    dispatch({ field: 'QR', value: i.QR })
    dispatch({ field: 'admittedOn', value: i.createdAt })

    setSearchQuery('')
    getBillSummary(i._id)
  }

  function getBillSummary(i) {
    axios
      .get(getedripr + '/' + i)
      .then((res) => {
        if (res.data.success) {
          setsearched(true)
          console.log('response for summary', res.data)

          if (res.data.rc) {
            dispatch({
              field: 'treatmentDetail',
              value: res.data.rc.treatmentDetail,
            })
            dispatch({ field: 'document', value: res.data.rc.document })
          }
          dispatch({ field: 'requestNo', value: res.data.data.requestNo })

          Object.entries(res.data.data).map(([key, val]) => {
            if (val && typeof val === 'object') {
              if (key === 'residentNotes') {
                if (val && val.length > 0) {
                  dispatch({
                    field: 'diagnosisArray',
                    value: val.reverse()[0].code,
                  })
                }
              } else if (key === 'pharmacyRequest') {
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
            } else if (key === 'requestType') {
              dispatch({ field: 'requestType', value: val })
            } else if (key === '_id') {
              dispatch({ field: 'edriprId', value: val })
            }
          })

          let pharm = []
          for (let i = 0; i < res.data.data.pharmacyRequest.length; i++) {
            let amount = 0
            let singlePR = res.data.data.pharmacyRequest[i]
            for (let j = 0; j < singlePR.item.length; j++) {
              let found = false
              for (let k = 0; k < res.data.insured.length; k++) {
                if (
                  singlePR.item[j].itemId._id === res.data.insured[k].itemId
                ) {
                  amount =
                    // amount +
                    res.data.insured[k].price * singlePR.item[j].requestedQty
                  let obj = {
                    serviceId: {
                      name: singlePR.item[j].itemId.name,
                      originalPrice:
                        (
                          singlePR.item[j].itemId.issueUnitCost *
                          singlePR.item[j].requestedQty
                        ).toFixed(4),
                      insuredPrice: amount.toFixed(4),
                      insuranceStatus: 'Covered',
                    },
                    date: res.data.data.pharmacyRequest[i].dateGenerated,
                    serviceType: 'Pharmacy',
                  }
                  pharm.push(obj)
                  found = true
                }
              }
              if (!found) {
                amount =
                  // amount +
                  singlePR.item[j].itemId.issueUnitCost *
                  singlePR.item[j].requestedQty
                let obj = {
                  serviceId: {
                    name: singlePR.item[j].itemId.name,
                    originalPrice: amount.toFixed(4),
                    insuredPrice: '0',
                    insuranceStatus: 'Not Covered',
                  },
                  date: res.data.data.pharmacyRequest[i].dateGenerated,
                  serviceType: 'Pharmacy',
                }
                pharm.push(obj)
              }
            }
          }

          let lab = []
          for (let i = 0; i < res.data.data.labRequest.length; i++) {
            let singleLR = res.data.data.labRequest[i]
            let found = false
            for (let j = 0; j < res.data.insured.length; j++) {
              if (
                singleLR.serviceId._id ===
                res.data.insured[j].laboratoryServiceId
              ) {
                let obj = {
                  serviceId: {
                    name: singleLR.serviceId.name,
                    originalPrice: singleLR.serviceId.price.toFixed(4),
                    insuredPrice: res.data.insured[j].price.toFixed(4),
                    insuranceStatus: 'Covered',
                  },
                  date: singleLR.date,
                  serviceType: 'Lab',
                }
                lab.push(obj)
                found = true
              }
            }
            if (!found) {
              let obj = {
                serviceId: {
                  name: singleLR.serviceId.name,
                  originalPrice: singleLR.serviceId.price.toFixed(4),
                  insuredPrice: '0',
                  insuranceStatus: 'Not Covered',
                },
                date: singleLR.date,
                serviceType: 'Lab',
              }
              lab.push(obj)
            }
          }

          let radiology = []
          for (let i = 0; i < res.data.data.radiologyRequest.length; i++) {
            let singleRR = res.data.data.radiologyRequest[i]
            let found = false
            for (let j = 0; j < res.data.insured.length; j++) {
              if (
                singleRR.serviceId._id ===
                res.data.insured[j].radiologyServiceId
              ) {
                let obj = {
                  serviceId: {
                    name: singleRR.serviceId.name,
                    originalPrice: singleRR.serviceId.price.toFixed(4),
                    insuredPrice: res.data.insured[j].price.toFixed(4),
                    insuranceStatus: 'Covered',
                  },
                  date: singleRR.date,
                  serviceType: 'Radiology',
                }
                radiology.push(obj)
                found = true
              }
            }
            if (!found) {
              let obj = {
                serviceId: {
                  name: singleRR.serviceId.name,
                  originalPrice: singleRR.serviceId.price.toFixed(4),
                  insuredPrice: '0',
                  insuranceStatus: 'Not Covered',
                },
                date: singleRR.date,
                serviceType: 'Radiology',
              }
              radiology.push(obj)
            }
          }

          // console.log("Bill sumamry is ... ", [].concat(res.data.data.labRequest, res.data.data.radiologyRequest, pharm))
          setbillSummaryArray(
            [].concat(lab.reverse(), radiology.reverse(), pharm.reverse())
          )
        } else if (!res.data.success) {
          setErrorMsg(res.data.error)
          setOpenNotification(true)
        }
        return res
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  const handleInvoicePrint = (item) => {
    console.log('item', item)

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
    const invoiceNo = 'IN' + day + YYYY + HH + mm + ss

    var time = dateNow.getHours() + ':' + dateNow.getMinutes()

    var logo = new Image()
    logo.src = logoPatientSummaryInvoice

    var doc = new jsPDF()
    doc.addImage(logo, 'PNG', 10, 10, 55, 30)
    doc.setTextColor(0, 0, 0)

    // header
    doc.setFontSize(15)
    doc.setFont('times', 'bold')
    doc.text(135, 15, `Invoice No: ${invoiceNo}`)
    doc.setFontSize(12)
    doc.text(151, 23, 'Date:')
    doc.text(151, 30, 'Time:')
    doc.setFont('times', 'normal')
    doc.text(178, 23, `${now.toISOString().substr(0, 10)}`) // date
    doc.text(188, 30, `${time}`) // time
    doc.text(175, 50, 'Invoice Total')
    doc.setFontSize(23)
    doc.setTextColor(44, 109, 221)
    doc.text(
      155,
      60,
      `${
        item.serviceId.insuredPrice === '0'
          ? item.serviceId.originalPrice
          : item.serviceId.insuredPrice
      } JD`
    )

    // below header
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(12)
    doc.line(0, 65, 210, 65)

    doc.setFont('times', 'bold')
    doc.text(5, 75, 'Request No:')
    doc.text(5, 85, 'Service Name:')
    doc.text(5, 95, 'Service Type:')
    doc.text(5, 105, 'Comments:')

    doc.setFont('times', 'normal')
    doc.text(35, 75, 'LR129237288')
    doc.text(35, 85, `${item.serviceId.name}`)
    doc.text(35, 95, `${item.serviceType}`)
    doc.text(35, 105, 'This person was refered for a Urine Test.')

    doc.text(5, 235, 'Signature & Stamp')
    doc.line(5, 240, 75, 240)

    doc.text(
      142,
      200,
      `Sub Total: ${
        item.serviceId.insuredPrice === '0'
          ? item.serviceId.originalPrice
          : item.serviceId.insuredPrice
      } JD`
    )
    doc.text(143, 210, 'Tax Rate: 0.0000 JD')
    doc.text(152, 220, 'Tax: 0.0000 JD')
    doc.text(144, 230, 'Discount: 0.0000 JD')
    doc.setFont('times', 'bold')
    doc.text(
      135.4,
      240,
      `Total Amount: ${
        item.serviceId.insuredPrice === '0'
          ? item.serviceId.originalPrice
          : item.serviceId.insuredPrice
      } JD`
    )

    doc.line(0, 260, 1000, 260)
    doc.setFont('times', 'normal')
    doc.text(5, 288, `Prepared by: ${currentUser.name}`)

    if (QR) {
      var img = new Image()
      img.src = `${audioURL + QR}`
      doc.addImage(img, 'PNG', 172.9, 266, 25, 25)
    }

    doc.save(`Invoice ${invoiceNo}.pdf`)
  }

  const onInpatientInvoiceSummary = () => {
    if (selected.length > 0) {
      let invoiceAmount = 0
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].serviceId.insuredPrice === '0') {
          invoiceAmount = invoiceAmount + +selected[i].serviceId.originalPrice
        } else {
          invoiceAmount = invoiceAmount + +selected[i].serviceId.insuredPrice
        }
      }

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

      var invoiceNo = 'IN' + day + YYYY + HH + mm + ss

      var doc = new jsPDF()

      var logo = new Image()
      logo.src = logoPatientSummaryInvoice

      // header
      doc.setFontSize(15)
      doc.addImage(logo, 'PNG', 10, 10, 55, 30)
      doc.text(60, 15, 'Al-Khalidi Hospital & Medical Center')
      doc.text(68, 20, 'In - Patient Summary Invoice')
      doc.line(80, 22.5, 120, 22.5)
      doc.text(85, 28, 'INSURANCE')
      doc.line(80, 30, 120, 30)
      doc.setFontSize(12)
      doc.text(170, 14, 'Amman Jordan')

      // background coloring
      doc.setFillColor(255, 255, 200)
      doc.rect(10, 45, 190, 20, 'F')

      // information of patient
      // labels
      doc.setFontSize(10)
      doc.setFont('times', 'bold')
      doc.text(12, 50, 'Patient Name:')
      doc.text(12, 55, 'Visit Date:')
      doc.text(12, 60, 'Patient MRN:')
      doc.text(120, 50, 'Invoice No:')
      doc.text(120, 55, 'Invoice Date')
      doc.text(120, 60, 'Visit No:')

      // dynamic data of patient
      doc.setFont('times', 'normal')
      doc.text(47, 50, firstName + ' ' + lastName) // Patient Name
      doc.text(47, 55, admittedOn !== '' ? formatDate(admittedOn) : '--')
      doc.text(47, 60, profileNo)
      doc.text(155, 50, invoiceNo) // invoice No
      doc.text(155, 55, `${dateNow.toISOString().substr(0, 10)} ${HH}:${mm}`)
      doc.text(155, 60, `${requestNo}`)

      // table
      doc.autoTable({
        margin: { top: 70, right: 10, left: 10 },
        tableWidth: 'auto',
        headStyles: { fillColor: [44, 109, 221] },
        html: '#InpatientInvoiceSummary',
      })

      // footer
      // labels
      doc.setFontSize(12)
      doc.setFont('times', 'bold')
      doc.text(120, 235, 'Invoice Amount')
      //   doc.text(120, 235, "Pharmacy");
      doc.text(120, 240, 'Down Payments')
      doc.line(120, 243, 195, 243)
      doc.text(120, 250, 'Total')
      doc.text(169, 250, `${invoiceAmount.toFixed(4)}`)
      doc.text(190, 250, 'JD')

      // dynamic text
      doc.setFont('times', 'normal')
      doc.text(169, 235, `${invoiceAmount.toFixed(4)}`) // invoice amount
      doc.text(190, 235, 'JD')
      //   doc.text(169, 235, "1090.48"); // pharmacy
      //   doc.text(190, 235, "JD");
      doc.text(169, 240, '0') // down payment
      doc.text(190, 240, 'JD')

      doc.text(5, 243, 'Signature & Stamp')
      doc.line(5, 250, 75, 250)

      doc.line(0, 260, 210, 260)
      doc.text(5, 288, `Prepared by: ${currentUser.name}`)
      if (QR) {
        var img = new Image()
        img.src = `${audioURL + QR}`
        doc.addImage(img, 'PNG', 172.9, 266, 25, 25)
      }

      doc.save(`Patient Summary Invoice ${invoiceNo}.pdf`)
    } else {
      setErrorMsg('Please select items from Bill Summary')
      setOpenNotification(true)
    }
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = billSummaryArray.map((n) => n)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

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
      <Header history={props.history}/>
      <div className='cPadding'>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={claimsReview} />
            <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
              <h4>
                {comingFor === 'add' ? ' Claim Review' : ' Edit Claim Review'}
              </h4>
            </div>
          </div>
        </div>

        <div style={{ width: 'auto', height: '20px' }} />
        <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='primary'
            TabIndicatorProps={{ style: { background: '#12387a' } }}
            centered
          >
            <Tab
              style={{
                color: 'white',
                borderRadius: 10,
                outline: 'none',
                color: value === 0 ? '#12387a' : '#3B988C',
              }}
              label='Treatment Details'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 10,
                outline: 'none',
                color: value === 1 ? '#12387a' : '#3B988C',
              }}
              label='Bill Summary'
              disabled={!searched}
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 10,
                outline: 'none',
                color: value === 2 ? '#12387a' : '#3B988C',
              }}
              disabled={!searched}
              label='Claim Summary'
            />
          </Tabs>
        </div>
        {value === 0 ? (
          <div>
            <div
              style={{
                marginTop: '20px',
                marginBottom: '10px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              className={`container-fluid ${classes.root}`}
            >
              {comingFor === 'add' ? (
                <div>
                  <div className='row'>
                    <div
                      className='col-md-10 col-sm-8 col-8'
                      style={styles.textFieldPadding}
                    >
                      <TextField
                        required
                        label='Search Patient by Name / MRN / National ID / Mobile Number'
                        name={'searchQuery'}
                        value={searchQuery}
                        style={{ borderRadius: '5px' }}
                        onChange={handlePauseSearch}
                        onKeyDown={handleKeyDown}
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
                        <img
                          src={Fingerprint}
                          style={{ maxWidth: 43, height: 43 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row' style={{ marginTop: 10 }}>
                    <div
                      className='col-md-10 col-sm-8 col-8'
                      style={{
                        ...styles.textFieldPadding,
                      }}
                    >
                      {searchQuery ? (
                        <div style={{ zIndex: 3 }}>
                          <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                            {itemFoundSuccessfull && itemFound !== '' ? (
                              <Table size='small'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>MRN</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Age</TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {itemFound.map((i) => {
                                    return (
                                      <TableRow
                                        key={i._id}
                                        onClick={() => handleAddItem(i)}
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
                            ) : loadSearchedData ? (
                              <div style={{ textAlign: 'center' }}>
                                <Loader
                                  type='TailSpin'
                                  color='#2c6ddd'
                                  height={25}
                                  width={25}
                                  style={{
                                    display: 'inline-block',
                                    padding: '10px',
                                  }}
                                />
                                <span
                                  style={{
                                    display: 'inline-block',
                                    padding: '10px',
                                  }}
                                >
                                  <h4> Searching Patient...</h4>
                                </span>
                              </div>
                            ) : searchQuery && !itemFoundSuccessfull ? (
                              <div
                                style={{ textAlign: 'center', padding: '10px' }}
                              >
                                <h4>No Patient Found !</h4>
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
              ) : (
                undefined
              )}
            </div>

            <div className={`${classes.root}`}>
              <h5
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: 10,
                }}
              >
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
                    <h6 style={{ color: 'white', fontWeight: '700' }}>
                      Allergy
                    </h6>
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
                    <h6 style={{ color: 'white', fontWeight: '700' }}>
                      Diagnosis
                    </h6>
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
                      {profileNo}
                    </span>

                    <span style={styles.headingStyles}>Patient</span>
                    <span style={styles.textStyles}>
                      {firstName + ` ` + lastName}{' '}
                    </span>

                    <span style={styles.headingStyles}>Gender</span>
                    <span style={styles.textStyles}>{gender}</span>

                    <span style={styles.headingStyles}>Age</span>
                    <span style={styles.textStyles}>{age}</span>

                    <span style={styles.headingStyles}>Weight</span>
                    <span style={styles.textStyles}>{weight} kg</span>
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
                            <div
                              style={{ display: 'flex', flexDirection: 'row' }}
                            >
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

            <div
              style={{
                height: '10px',
              }}
            />

            <div className={`container-fluid ${classes.root}`}>
              <div
                className='row'
                style={{
                  ...styles.patientDetails,
                  marginTop: '20px',
                  // marginRight: 0,
                  // marginLeft: 0,
                }}
              >
                <TextField
                  required
                  multiline
                  type='text'
                  label='Treatment Details'
                  name={'treatmentDetail'}
                  value={treatmentDetail}
                  onChange={onChangeValue}
                  rows={4}
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

            {comingFor === 'edit' ? (
              <div
                className={`container-fluid ${classes.root}`}
                style={{ marginTop: '30px' }}
              >
                <div className='row'>
                  <TextField
                    required
                    select
                    fullWidth
                    id='status'
                    name='status'
                    value={status}
                    error={status === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    label='Status'
                    variant='filled'
                    style={{ borderRadius: '5px' }}
                    // className="dropDownStyle"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
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
            ) : (
              undefined
            )}

            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                marginTop: '30px',
                marginBottom: '2%',
              }}
              className='container-fluid'
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{
                  width: 45,
                  height: 35,
                  cursor: 'pointer',
                  marginLeft: '-12px',
                }}
              />
              <div
                class='row'
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 6,
                  paddingRight: 6,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginRight: '-6px',
                  }}
                >
                  {/* {comingFor === "add" ? ( */}
                  <Button
                    style={styles.stylesForButton}
                    disabled={!searched}
                    onClick={onClick}
                    variant='contained'
                    color='primary'
                  >
                    Next
                  </Button>
                  {/* ) : (
                    <Button
                      style={styles.stylesForButton}
                      //disabled={!validateFormType1()}
                      onClick={handleEdit}
                      variant="contained"
                      color="default"
                    >
                      Update
                    </Button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className='container-fluid'
          >
            <div className='row' style={{ marginTop: '20px' }}>
              {billSummaryArray !== 0 ? (
                // <CustomTable
                //   // id="my-table"
                //   tableData={billSummaryArray}
                //   tableDataKeys={tableDataKeysForBillSummary}
                //   tableHeading={tableHeadingForBillSummary}
                //   action={actions}
                //   printItem={handleInvoicePrint}
                //   borderBottomColor={"#60d69f"}
                //   borderBottomWidth={20}
                // />
                <Table>
                  <EnhancedTableHead
                    style={{
                      backgroundColor: '#2873cf',
                    }}
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody className={classes.root}>
                    {billSummaryArray &&
                      billSummaryArray.map((row, index) => {
                        const isItemSelected = isSelected(row)
                        const labelId = `enhanced-table-checkbox-${index}`

                        return (
                          <StyledTableRow
                            onClick={(event) => handleClick(event, row)}
                            role='checkbox'
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row}
                            selected={isItemSelected}
                          >
                            <TableCell padding='checkbox'>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell
                              component='th'
                              id={labelId}
                              scope='row'
                              padding='none'
                            >
                              {formatDate(row.date)}
                            </TableCell>
                            <TableCell align='center'>
                              {row.serviceId.name}
                            </TableCell>
                            <TableCell align='center'>
                              {row.serviceType}
                            </TableCell>
                            <TableCell align='center'>
                              {row.serviceId.insuranceStatus}
                            </TableCell>
                            <TableCell align='center'>
                              {row.serviceId.originalPrice}
                            </TableCell>
                            <TableCell align='center'>
                              {row.serviceId.insuredPrice}
                            </TableCell>
                            <TableCell
                              style={{
                                cursor: 'pointer',
                                borderBottomRightRadius:
                                  billSummaryArray.length - 1 === index ? 5 : 0,
                                borderWidth: 0,
                              }}
                              className={classes1.tableCell}
                              colSpan='2'
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-evenly',
                                }}
                              >
                                <Tooltip title='Print'>
                                  <img
                                    src={print}
                                    onClick={() => handleInvoicePrint(row)}
                                    style={{
                                      maxWidth: 40,
                                      height: 30,
                                    }}
                                  />
                                </Tooltip>
                              </div>
                            </TableCell>
                          </StyledTableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              ) : (
                undefined
              )}
            </div>

            <div
              class='row'
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                marginTop: '2%',
                marginBottom: '2%',
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 45, height: 35, cursor: 'pointer' }}
              />
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                {/* {comingFor === "add" ? ( */}
                <Button
                  style={styles.stylesForButton}
                  disabled={!searched}
                  onClick={onClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
                {/* ) : (
                    <Button
                      style={styles.stylesForButton}
                      //disabled={!validateFormType1()}
                      onClick={handleEdit}
                      variant="contained"
                      color="default"
                    >
                      Update
                    </Button>
                  )} */}
              </div>
            </div>
          </div>
        ) : value === 2 ? (
          <div>
            <div className='container-fluid' style={{ marginTop: '30px' }}>
              <div className='row'>
                {/* <table id="emp" class="table"
                  style={{ display: 'none' }}
                >
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>{firstName + ` ` + lastName}</th>
                    </tr>
                    <tr>
                      <th>Admitted On</th>
                      <th>{admittedOn !== '' ? formatDate(admittedOn) : '--'}</th>
                      <th>Discharged On</th>
                      <th>{'--'}</th>
                      <th>Invoice No</th>
                      <th>{invoiceNo}</th>
                    </tr>
                    <tr>
                    </tr>
                  </thead>

                  <table border="1">
                    <thead color='gray'>
                      <tr>
                        <th>Description</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>{
                      billSummaryArray.map((p, index) => {
                        return <tr key={index}>
                          <td >{p.serviceId.name}</td>
                          <td >{p.serviceId.price}</td>
                        </tr>
                      })
                    }
                    </tbody>
                  </table>
                </table>
                <div className="col-md-6 col-sm-6 col-6"
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                  }}>
                  <ReactHTMLTableToExcel
                    className="btn btn-primary btn-lg btn-block"
                    disabled
                    table="emp"
                    filename="Patient Summary Invoice"
                    sheet="Invoice"
                    buttonText="Export Invoice" />
                </div> */}
                {selected.length > 0 ? (
                  <Table
                    id='InpatientInvoiceSummary'
                    style={{ display: 'none' }}
                    aria-label='InpatientInvoiceSummary'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align='right'>Service Type</TableCell>
                        <TableCell align='right'>Status</TableCell>
                        <TableCell align='right'>Original Amount</TableCell>
                        <TableCell align='right'>Insured Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selected.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component='th' scope='row'>
                            {row.serviceId.name}
                          </TableCell>
                          <TableCell align='right'>{row.serviceType}</TableCell>
                          <TableCell align='right'>
                            {row.serviceId.insuranceStatus}
                          </TableCell>
                          <TableCell align='right'>
                            {row.serviceId.originalPrice}
                          </TableCell>
                          <TableCell align='right'>
                            {row.serviceId.insuredPrice}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  undefined
                )}

                <div
                  className='col-md-6 col-sm-6 col-6'
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      height: '48px',
                      width: '100%',
                    }}
                    disabled={!searched}
                    onClick={onInpatientInvoiceSummary}
                    variant='contained'
                    color='primary'
                  >
                    In-patient Invoice Summary
                  </Button>
                </div>

                {/* <div
                  className="col-md-4 col-sm-4 col-4"
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      height: "48px",
                      width: "100%",
                    }}
                    disabled={!searched}
                    onClick={onInpatientInvoiceDetails}
                    variant="contained"
                    color="primary"
                  >
                    In-patient Invoice Details
                  </Button>
                </div> */}

                <div
                  className='col-md-6 col-sm-6 col-6'
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Button
                    variant='contained'
                    component='label'
                    style={styles.upload}
                  >
                    <FaUpload />
                    &nbsp;&nbsp;&nbsp;Upload Document
                    <input
                      type='file'
                      accept='.png,.PNG,.peg,.PEG,.rtf,.RTF,.jpeg,.jpg,.pdf,.PDF,.'
                      multiple
                      name='document'
                      onChange={onDocumentUpload}
                      style={{ display: 'none' }}
                    />
                  </Button>

                  {pdfView && pdfView.length > 0 ? (
                    <div
                      style={{
                        alignItems: 'center',
                        color: '#2c6ddd',
                        fontStyle: 'italic',
                        marginTop: '10px',
                      }}
                    >
                      {pdfView.map((view, index) => {
                        return (
                          <div style={{ marginTop: '5px' }}>
                            <div style={styles.selectedDoc}>
                              <span style={{ color: 'black' }}>
                                Selected File {index + 1}:{' '}
                              </span>
                              <span>{view}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
              </div>

              <div
                className='row'
                style={{ marginTop: '20px', marginLeft: '-26px' }}
              >
                {document && document.length > 0 ? (
                  <>
                    {document.map((item, index) => {
                      if (item.includes('\\')) {
                        if (item.slice(item.length - 3) !== 'pdf') {
                          return (
                            <div
                              className='col-md-4 col-sm-4 col-4'
                              style={{
                                ...styles.inputContainerForTextField,
                              }}
                            >
                              <img
                                src={uploadsUrl + item.split('\\')[1]}
                                className='depositSlipImg'
                              />
                            </div>
                          )
                        } else if (item.slice(item.length - 3) === 'pdf') {
                          return (
                            <div
                              className='col-md-4 col-sm-4 col-4'
                              style={{
                                ...styles.inputContainerForTextField,
                              }}
                            >
                              <Button
                                style={{
                                  ...styles.stylesForButton,
                                  width: '100%',
                                  backgroundColor: '#ba55d3',
                                }}
                                variant='contained'
                                color='default'
                                onClick={(e) => {
                                  e.preventDefault()
                                  window.location.href =
                                    uploadsUrl + item.split('\\')[1]
                                  // console.log("show URL for local", uploadsUrl + item.split("\\")[1])
                                }}
                              >
                                Click here to open document {index + 1}
                              </Button>
                            </div>
                          )
                        }
                      } else if (item.includes('/')) {
                        if (item.slice(item.length - 3) !== 'pdf') {
                          return (
                            <div
                              className='col-md-4 col-sm-4 col-4'
                              style={{
                                ...styles.inputContainerForTextField,
                              }}
                            >
                              <img
                                src={uploadsUrl + item}
                                className='depositSlipImg'
                              />
                            </div>
                          )
                        } else if (item.slice(item.length - 3) === 'pdf') {
                          return (
                            <div
                              className='col-md-4 col-sm-4 col-4'
                              style={{
                                ...styles.inputContainerForTextField,
                              }}
                            >
                              <Button
                                style={{
                                  ...styles.stylesForButton,
                                  width: '100%',
                                  backgroundColor: '#ba55d3',
                                }}
                                variant='contained'
                                color='default'
                                onClick={(e) => {
                                  e.preventDefault()
                                  window.location.href = uploadsUrl + item
                                  // console.log("show URL for live", uploadsUrl + item)
                                }}
                              >
                                Click here to open document {index + 1}
                              </Button>
                            </div>
                          )
                        }
                      }
                    })}
                  </>
                ) : (
                  // document &&
                  //   document.length > 0 &&
                  //   document.map((item, index) => item.includes("/")) ? (
                  //     <>
                  //       {document.map((item, index) => {
                  //         if (item.slice(item.length - 3) !== "pdf") {
                  //           return (
                  //             <div
                  //               className="col-md-4 col-sm-4 col-4"
                  //               style={{
                  //                 ...styles.inputContainerForTextField,
                  //               }}
                  //             >
                  //               <img
                  //                 src={uploadsUrl + item}
                  //                 className="depositSlipImg"
                  //               />
                  //             </div>
                  //           );
                  //         } else if (item.slice(item.length - 3) === "pdf") {
                  //           return (
                  //             <div
                  //               className="col-md-4 col-sm-4 col-4"
                  //               style={{
                  //                 ...styles.inputContainerForTextField,
                  //               }}
                  //             >
                  //               <Button
                  //                 style={{
                  //                   ...styles.stylesForButton,
                  //                   width: "100%",
                  //                   backgroundColor: "#ba55d3",
                  //                 }}
                  //                 variant="contained"
                  //                 color="default"
                  //                 onClick={(e) => {
                  //                   e.preventDefault();
                  //                   // window.location.href = uploadsUrl + item;
                  //                   console.log("show URL for live", uploadsUrl + item)
                  //                 }}
                  //               >
                  //                 Click here to open document {index + 1}
                  //               </Button>
                  //             </div>
                  //           );
                  //         }
                  //       })}
                  //     </>
                  //   ) :
                  undefined
                )}

                {imagePreview && imagePreview.length > 0 ? (
                  <>
                    {imagePreview.map((view, index) => {
                      return (
                        <div
                          key={index}
                          className='col-md-4 col-sm-4 col-4'
                          style={{
                            ...styles.inputContainerForTextField,
                          }}
                        >
                          <img src={view} className='depositSlipImg' />
                          {document.length > 0 ? (
                            <div
                              style={{
                                ...styles.selectedDoc,
                                textAlign: 'center',
                              }}
                            >
                              New document
                            </div>
                          ) : (
                            undefined
                          )}
                        </div>
                      )
                    })}
                  </>
                ) : (
                  undefined
                )}
              </div>
            </div>
            <div
              className='container-fluid'
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                marginTop: '1%',
                marginBottom: '2%',
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{
                  width: 45,
                  height: 35,
                  cursor: 'pointer',
                  marginLeft: '-10px',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginRight: '-10px',
                }}
              >
                {comingFor === 'add' ? (
                  <Button
                    style={styles.stylesForButton}
                    disabled={!searched}
                    onClick={handleAdd}
                    variant='contained'
                    color='default'
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={handleEdit}
                    variant='contained'
                    color='default'
                  >
                    Update
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          undefined
        )}

        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />
      </div>
    </div>
  )
}
CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),
}
export default AddEditPatientListing
