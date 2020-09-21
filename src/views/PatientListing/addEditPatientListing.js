import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { FaUpload } from 'react-icons/fa'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTimePicker } from '@material-ui/pickers'
import Fingerprint from '../../assets/img/fingerprint.png'
import BarCode from '../../assets/img/Bar Code.png'
import ErrorMessage from '../../components/ErrorMessage/errorMessage'
import validateEmail from '../../public/emailValidator'
import validateFirstName from '../../public/inputValidator'
import validateLastName from '../../public/inputValidator'
import validateEmergencyName from '../../public/inputValidator'
import validateInsuranceVendor from '../../public/inputValidator'
import validateNationName from '../../public/inputValidator'
import validateNumber from '../../public/numberValidator'
import validateNumbers from '../../public/numbersValidator'
import validateNationalId from '../../public/numbersValidator'
import validateAmount from '../../public/numbersValidator'
import validateInsuranceNo from '../../public/numbersValidator'
import validateFloat from '../../public/FloatValidator'
import validateInput from '../../public/FloatValidator'
import validateNumberFloat from '../../public/numberFloatValidator'
import validateWeight from '../../public/numberFloatValidator'
import validateCoPayment from '../../public/numberFloatValidator'
import MuiPhoneNumber from 'material-ui-phone-number'
import validatePhone from '../../public/validatePhone'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import validateHeight from '../../public/numberFloatValidator'
import validateCountryCity from '../../public/countryCityValidator'
import validateGender from '../../public/genderValidator'
import validateRelation from '../../public/relationValidator'
import validateAddress from '../../public/inputValidator'

import {
  uploadsUrl,
  updatePatientUrl,
  addPatientUrl,
  generateEDR,
  generateIPR,
  getSearchedpatient,
  searchPatientsURL,
} from '../../public/endpoins'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'
import ButtonField from '../../components/common/Button'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import patientRegister from '../../assets/img/PatientRegistration.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormData from 'form-data'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
// import validatePhone from '../../public/validatePhone'

let countriesList = require('../../assets/countries.json')

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
  inputContainerForTextField: {
    marginTop: 10,
  },
  inputContainerForDropDown: {
    marginTop: 10,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  save: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#ba55d3',
    width: '130px',
    height: '45px',
    outline: 'none',
  },
  generate: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#e877a1',
    height: '45px',
    outline: 'none',
  },
  None: {
    display: 'none',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '5px',
    marginTop: '10px',
    padding: '10px',
    textAlign: 'center',
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '5px',
    color: 'gray',
    width: '100%',
    height: '60px',
    cursor: 'pointer',
    padding: '15px',
  },
  input: {
    display: 'none',
  },
}

const useStylesForTabs = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))

const titles = [
  {
    key: 'mr' || 'Mr',
    value: 'Mr',
  },
  {
    key: 'miss' || 'Miss',
    value: 'Miss',
  },
  {
    key: 'mrs' || 'Mrs',
    value: 'Mrs',
  },
]

const genderArray = [
  {
    key: 'Male',
    value: 'Male',
  },
  {
    key: 'Female',
    value: 'Female',
  },
  {
    key: 'Others',
    value: 'Others',
  },
]

const relationArray = [
  {
    key: 'brother',
    value: 'Brother',
  },
  {
    key: 'father',
    value: 'Father',
  },
  {
    key: 'mother',
    value: 'Mother',
  },
  {
    key: 'sister',
    value: 'Sister',
  },
  {
    key: 'uncle',
    value: 'Uncle',
  },
  {
    key: 'other',
    value: 'Other',
  },
]

const coverageTermsArr = [
  {
    key: 'coPayment',
    value: 'Co-Payment',
  },
  {
    key: 'fullPayment',
    value: 'Full Payment',
  },
]

const coveredFamilyArray = [
  {
    key: 'father',
    value: 'Father',
  },
  {
    key: 'mother',
    value: 'Mother',
  },
  {
    key: 'son',
    value: 'Son',
  },
  {
    key: 'daughter',
    value: 'Daughter',
  },
]

const bloodGroups = [
  {
    key: 'A+',
    value: 'A+',
  },
  {
    key: 'A-',
    value: 'A-',
  },
  {
    key: 'B+',
    value: 'B+',
  },
  {
    key: 'B-',
    value: 'B-',
  },
  {
    key: 'O+',
    value: 'O+',
  },
  {
    key: 'O-',
    value: 'O-',
  },
  {
    key: 'AB+',
    value: 'AB+',
  },
  {
    key: 'AB-',
    value: 'AB-',
  },
]

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    boxShadow: 'none',
    borderRadius: 5,
    '&:after': {
      borderBottomColor: 'black',
      boxShadow: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },
  multilineColor: {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
    '&:after': {
      borderBottomColor: 'black',
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  root: {
    '& .MuiTextField-root': {
      backgroundColor: 'white',
    },
    '& .Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 'none',
    },
    '& .Mui-disabled': {
      backgroundColor: 'white',
      color: 'gray',
    },
    '&:focus': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },
}))

function AddEditPatientListing(props) {
  const classes = useStyles()

  const initialState = {
    _id: '',
    profileNo: '',
    SIN: '', // now identity
    title: '',
    firstName: '',
    lastName: '',
    nationality: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    bloodGroup: '',
    dob: new Date().toISOString().substr(0, 10),
    phoneNumber: '',
    mobileNumber: '',
    email: '',
    country: '',
    city: '',
    address: '',
    otherDetails: '',
    amountReceived: '',
    bankName: '',
    depositorName: '',
    insuranceNo: '',
    coverageDetails: '',
    coverageTerms: '',
    payment: '',
    depositSlip: '',
    // DateTime: new Date().toISOString().substr(0, 10),
    DateTime: new Date(),
    receiverName: cookie.load('current_user').name,
    // receiverName: '',
    insuranceVendor: '',
    paymentMethod: '',
    emergencyName: '',
    emergencyContactNo: '',
    emergencyRelation: '',
    coveredFamilyMembers: '',
    otherCoverageDetails: '',
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
    SIN,
    title,
    firstName,
    lastName,
    nationality,
    gender,
    age,
    height,
    weight,
    bloodGroup,
    dob,
    phoneNumber,
    mobileNumber,
    email,
    country,
    city,
    address,
    otherDetails,
    amountReceived,
    bankName,
    depositorName,
    insuranceNo,
    coverageDetails,
    coverageTerms,
    payment,
    depositSlip,
    // DateTime = new Date().toISOString().substr(0, 10),
    DateTime = new Date(),
    receiverName = cookie.load('current_user').name,
    // receiverName,
    insuranceVendor,
    paymentMethod,
    emergencyName,
    emergencyContactNo,
    emergencyRelation,
    coveredFamilyMembers,
    otherCoverageDetails,
  } = state

  const onChangeCountry = (e) => {
    if (e.target.value) {
      dispatch({ field: e.target.name, value: e.target.value })
      let cities = Object.entries(countriesList[0])
      for (var x in cities) {
        let arr = cities[x]
        if (arr[0] === e.target.value) {
          console.log('cities', arr[1])
          setCities(arr[1])
        }
      }
    } else {
      dispatch({ field: e.target.name, value: e.target.value })
      dispatch({ field: 'city', value: '' })
      setCities('')
    }
  }

  const classesForTabs = useStylesForTabs()

  const [comingFor, setcomingFor] = useState('')
  const [currentUser] = useState(cookie.load('current_user'))
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [countries, setCountries] = useState('')
  const [cities, setCities] = useState('')
  const [value, setValue] = React.useState(0)
  const [slipUpload, setSlipUpload] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [pdfView, setpdfView] = useState('')
  const [patientId, setPatientId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [itemFound, setItemFound] = useState('')
  const [itemFoundSuccessfull, setItemFoundSuccessfully] = useState(false)
  const [searchActivated, setsearchActivated] = useState(false)
  const [Insuranceform, setInsuranceForm] = useState(true)
  const [MRN, setMRN] = useState('')
  const [isPatientSubmitted, setIsPatientSubmitted] = useState(false)
  const [enableForm, setenableForm] = useState(true)
  const [enableNext, setenableNext] = useState(true)
  const [coPaymentField, setCoPaymentField] = useState(false)
  const [detailsForm, setDetailsForm] = useState(false)
  const [emergencyForm, setEmergencyForm] = useState(false)
  const [paymentForm, setPaymentForm] = useState(false)
  const [insuranceForm, setinsuranceForm] = useState(false)

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor)
    setCountries(Object.keys(countriesList[0]))

    const selectedRec = props.history.location.state.selectedItem

    if (selectedRec) {
      setPatientId(selectedRec._id)

      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id })
        } else {
          if (key === 'dob') {
            dispatch({
              field: key,
              value: new Date(val).toISOString().substr(0, 10),
            })
          } else {
            dispatch({ field: key, value: val })
          }
        }
      })
    }
    if (props.history.location.state.comingFor === 'edit') {
      if (selectedRec.paymentMethod === 'Insurance') {
        setenableForm(false)
        setInsuranceForm(false)
        setenableNext(false)
      }
    }
  }, [])

  function validatePatientForm() {
    return (
      // profileNo &&
      // profileNo.length > 0 &&
      SIN &&
      SIN.length > 0 &&
      validateNationalId(SIN) &&
      // title &&
      // title.length > 0 &&
      firstName &&
      firstName.length > 0 &&
      validateFirstName(firstName) &&
      lastName &&
      lastName.length > 0 &&
      validateLastName(lastName) &&
      // nationality &&
      // nationality.length > 0 &&
      // validateNationName(nationality) &&
      // phoneNumber &&
      // phoneNumber.length > 0 &&
      // !validatePhone(phoneNumber) &&
      mobileNumber &&
      mobileNumber.length > 0 &&
      !validatePhone(mobileNumber) &&
      // age &&
      // age != null &&
      // validateNumbers(age) &&
      gender &&
      gender.length > 0 &&
      validateGender(gender) &&
      // height &&
      // height != null &&
      // validateHeight(height) &&
      // weight &&
      // weight != null &&
      // validateWeight(weight) &&
      email &&
      email.length > 0 &&
      validateEmail(email) &&
      country &&
      country.length > 0 &&
      validateCountryCity(country) &&
      city &&
      city.length > 0 &&
      validateCountryCity(city) &&
      address &&
      address.length > 0 &&
      validateAddress(address) &&
      dob &&
      dob.length > 0
      // bloodGroup &&
      // bloodGroup != null &&
      // otherDetails &&
      // otherDetails.length > 0
      // validateInput(otherDetails) &&
    )
  }

  function validateEmergencyForm() {
    return (
      emergencyName &&
      emergencyName.length > 0 &&
      validateEmergencyName(emergencyName) &&
      emergencyContactNo &&
      emergencyContactNo.length > 0 &&
      !validatePhone(emergencyContactNo) &&
      emergencyRelation &&
      emergencyRelation.length > 0 &&
      validateRelation(emergencyRelation)
    )
  }
  function validateCashForm() {
    if (paymentMethod === 'Cash') {
      return (
        depositorName &&
        depositorName.length > 0 &&
        validateEmergencyName(depositorName) &&
        amountReceived &&
        amountReceived != null
        // validateAmount(amountReceived)
      )
    }
  }
  function validateInsuranceForm() {
    if (paymentMethod === 'Insurance') {
      return (
        insuranceNo &&
        insuranceNo.length > 0 &&
        validateInsuranceNo(insuranceNo) &&
        insuranceVendor &&
        insuranceVendor.length > 0 &&
        validateInsuranceVendor(insuranceVendor)
        // coverageDetails &&
        // coverageDetails.length > 0
        // validateInput(coverageDetails) &&
        // coverageTerms &&
        // coverageTerms.length > 0 &&
        // payment &&
        // payment.length > 0 &&
        // validateCoPayment(payment) &&
        // coveredFamilyMembers &&
        // coveredFamilyMembers.length > 0 &&
        // otherCoverageDetails &&
        // otherCoverageDetails.length > 0
        // validateInput(otherCoverageDetails)
      )
      // } else {
      //   return (
      //     receiverName &&
      //     receiverName.length > 0 &&
      //     validateEmergencyName(receiverName)
      //   )
    }
  }

  const handleChangeDate = (value) => {
    dispatch({ field: 'dob', value: value.toISOString().substr(0, 10) })
    calculate_age(value.toISOString().substr(0, 10))
  }

  const handleAdd = () => {
    let formData = new FormData()
    if (slipUpload) {
      formData.append('file', slipUpload, slipUpload.name)
    }
    if (
      validatePatientForm() &&
      (validateCashForm() || validateInsuranceForm()) &&
      validateEmergencyForm()
    ) {
      const params = {
        profileNo,
        SIN,
        title,
        firstName,
        lastName,
        gender,
        nationality,
        dob,
        age,
        bloodGroup,
        phoneNumber,
        mobileNumber,
        height,
        weight,
        bloodGroup,
        email,
        country,
        city,
        address,
        otherDetails,
        paymentMethod,
        amountReceived,
        receiverName,
        bankName,
        depositorName,
        insuranceNo,
        insuranceVendor,
        coverageDetails,
        coverageTerms,
        payment,
        depositSlip,
        emergencyName,
        emergencyContactNo,
        emergencyRelation,
        coveredFamilyMembers,
        otherCoverageDetails,
      }
      formData.append('data', JSON.stringify(params))
      console.log('PARAMSS ', params)
      axios
        .post(addPatientUrl, formData, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.data, 'patients data')
            // console.log(res.data.data._id, "patient id");
            setPatientId(res.data.data._id)
            setMRN(res.data.data.profileNo)
            setIsPatientSubmitted(true)
            setOpenNotification(true)
            setsuccessMsg(
              'Patient details saved successfully, Generate IPR/EDR now'
            )
          } else if (!res.data.success) {
            setOpenNotification(true)
          }
        })
        .catch((e) => {
          console.log('error after adding patient details', e)
          setOpenNotification(true)
          setErrorMsg('Patient already exists')
        })
    } else {
      setOpenNotification(true)
      setErrorMsg('Please Fill the the empty fields with valid data')
    }
    setDetailsForm(true)
    setEmergencyForm(true)
    if (paymentMethod === 'Cash') {
      setPaymentForm(true)
    } else if (paymentMethod === 'Insurance') {
      setinsuranceForm(true)
    }

    // setIsFormSubmitted(true)
  }

  const handleEdit = () => {
    let formData = new FormData()
    if (slipUpload) {
      formData.append('file', slipUpload, slipUpload.name)
    }
    if (
      validatePatientForm() &&
      (validateCashForm() || validateInsuranceForm()) &&
      validateEmergencyForm()
    ) {
      const params = {
        _id: patientId,
        profileNo,
        SIN,
        title,
        firstName,
        lastName,
        gender,
        nationality,
        age,
        bloodGroup,
        dob,
        phoneNumber,
        mobileNumber,
        email,
        country,
        city,
        height,
        weight,
        bloodGroup,
        address,
        otherDetails,
        paymentMethod,
        amountReceived,
        receiverName,
        bankName,
        depositorName,
        insuranceNo,
        insuranceVendor,
        coverageDetails,
        coverageTerms,
        payment,
        emergencyName,
        emergencyContactNo,
        emergencyRelation,
        coveredFamilyMembers,
        otherCoverageDetails,
      }
      formData.append('data', JSON.stringify(params))
      console.log('PARAMSS ', params)
      axios
        .put(updatePatientUrl, formData)
        .then((res) => {
          if (res.data.success) {
            setPatientId(res.data.data._id)
            setMRN(res.data.data.profileNo)
            setOpenNotification(true)
            setMRN(res.data.data.profileNo)
            console.log(res.data.data)
            setsuccessMsg(
              'Patient details updated successfully, Generate IPR/EDR now'
            )
            setIsPatientSubmitted(true)
            if (!searchActivated) {
              props.history.push({
                pathname: 'success',
                state: {
                  message: `Details of Patient with MRN ${res.data.data.profileNo} Updated Successfully`,
                },
              })
            }
          } else if (!res.data.success) {
            setOpenNotification(true)
            setErrorMsg('Error')
          }
        })
        .catch((e) => {
          console.log('error after updating patient details', e)
          setOpenNotification(true)
          setErrorMsg('Patient with same MRN already exists')
        })
    } else {
      setOpenNotification(true)
      setErrorMsg('Please Fill the the empty fields with valid data')
    }
    setDetailsForm(true)
    setEmergencyForm(true)
    if (paymentMethod === 'Cash') {
      setPaymentForm(true)
    } else if (paymentMethod === 'Insurance') {
      setinsuranceForm(true)
    }
    // setIsFormSubmitted(true)
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const DetailsOnClick = () => {
    if (validatePatientForm()) {
      setValue(value + 1)
    } else {
      setErrorMsg('Please Check the form for errors')
      setOpenNotification(true)
    }
    setDetailsForm(true)
  }

  const onClick = () => {
    setValue(value + 1)
  }

  const EmergencyOnClick = () => {
    if (validateEmergencyForm()) {
      setValue(value + 1)
    } else {
      setErrorMsg('Please Check the form for errors')
      setOpenNotification(true)
    }
    setEmergencyForm(true)
  }

  const onTabNavigation = () => {
    value === 1
      ? setValue(0)
      : value === 2
      ? setValue(1)
      : props.history.goBack()
    // setValue(tabIndex);
  }

  const handleGenerateEDR = () => {
    const params = {
      patientId,
      generatedBy: currentUser.staffId,
      status: 'pending',
      functionalUnit: currentUser.functionalUnit._id,
    }
    axios
      .post(generateEDR, params, {})
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'response')
          props.history.push({
            pathname: 'success',
            state: {
              message: `EDR # ${res.data.data.requestNo} for patient MRN ${MRN} generated successfully`,
            },
          })
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while generating EDR request')
        }
      })
      .catch((e) => {
        console.log('error after generating EDR request', e)
        setOpenNotification(true)
        setErrorMsg('Error while generating EDR request')
      })
  }

  const handleGenerateIPR = () => {
    const params = {
      patientId,
      generatedBy: currentUser.staffId,
      status: 'pending',
      functionalUnit: currentUser.functionalUnit._id,
    }
    // console.log(params)
    axios
      .post(generateIPR, params, {})
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'response')
          props.history.push({
            pathname: 'success',
            state: {
              message: `IPR # ${res.data.data.requestNo} for patient MRN ${MRN} generated successfully`,
            },
          })
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after generating IPR request', e)
        setOpenNotification(true)
        setErrorMsg('Error while generating IPR request')
      })
  }

  const handleSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchQuery(a)
    if (a.length >= 3) {
      axios
        .get(searchPatientsURL + '/' + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log('patient data ', res.data.data)
              setItemFoundSuccessfully(true)
              setItemFound(res.data.data)
            } else {
              setItemFoundSuccessfully(false)
              setItemFound('')
            }
          }
        })
        .catch((e) => {
          console.log('error while searching patient', e)
        })
    }
  }

  function handleAddItem(i) {
    console.log('selected banda', i)

    const dob = new Date(i.dob).toISOString().substr(0, 10)

    setPatientId(i._id)
    dispatch({ field: 'firstName', value: i.firstName })
    dispatch({ field: 'lastName', value: i.lastName })
    dispatch({ field: 'gender', value: i.gender })
    dispatch({ field: 'nationality', value: i.nationality })
    dispatch({ field: 'age', value: i.age })
    dispatch({ field: 'profileNo', value: i.profileNo })
    dispatch({ field: 'insuranceNo', value: i.insuranceNo })
    dispatch({ field: 'SIN', value: i.SIN })
    dispatch({ field: 'title', value: i.title })
    dispatch({ field: 'dob', value: dob })
    dispatch({ field: 'height', value: i.height })
    dispatch({ field: 'weight', value: i.weight })
    dispatch({ field: 'bloodGroup', value: i.bloodGroup })
    dispatch({ field: 'phoneNumber', value: i.phoneNumber })
    dispatch({ field: 'mobileNumber', value: i.mobileNumber })
    dispatch({ field: 'email', value: i.email })
    dispatch({ field: 'country', value: i.country })
    dispatch({ field: 'city', value: i.city })
    dispatch({ field: 'address', value: i.address })
    dispatch({ field: 'otherDetails', value: i.otherDetails })

    dispatch({ field: 'emergencyContactNo', value: i.emergencyContactNo })
    dispatch({ field: 'emergencyName', value: i.emergencyName })
    dispatch({ field: 'emergencyRelation', value: i.emergencyRelation })
    dispatch({ field: 'coveredFamilyMembers', value: i.coveredFamilyMembers })
    dispatch({ field: 'otherCoverageDetails', value: i.otherCoverageDetails })

    // dispatch({ field: 'receiverName', value: i.receiverName })

    dispatch({ field: 'amountReceived', value: i.amountReceived })
    dispatch({ field: 'bankName', value: i.bankName })
    dispatch({ field: 'depositorName', value: i.depositorName })

    dispatch({ field: 'coverageDetails', value: i.coverageDetails })
    dispatch({ field: 'coverageTerms', value: i.coverageTerms })
    dispatch({ field: 'payment', value: i.payment })
    dispatch({ field: 'depositSlip', value: i.depositSlip })
    dispatch({ field: 'DateTime', value: i.DateTime })
    dispatch({ field: 'paymentMethod', value: i.paymentMethod })
    dispatch({ field: 'insuranceVendor', value: i.insuranceVendor })
    dispatch({ field: 'emergencyName', value: i.emergencyName })
    dispatch({ field: 'emergencyContactNo', value: i.emergencyContactNo })
    dispatch({ field: 'emergencyRelation', value: i.emergencyRelation })

    setSearchQuery('')
    setsearchActivated(true)
    if (i.paymentMethod === 'Insurance') {
      setenableForm(false)
      setInsuranceForm(false)
      setenableNext(false)
    }
    if (i.paymentMethod === 'Cash') {
      setenableForm(true)
      setenableNext(true)
    }
  }

  const onDropDownChange = (e) => {
    console.log('value', e.target)
  }

  const onPhoneNumberChange = (value) => {
    dispatch({ field: 'phoneNumber', value: value })
  }

  const onEmergencyNumberChange = (value) => {
    dispatch({ field: 'emergencyContactNo', value: value })
  }

  const onMobileNumberChange = (value) => {
    dispatch({ field: 'mobileNumber', value: value })
  }

  const onChangeBloodGroup = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value,
    })
  }

  const onChangeValue = (e) => {
    var pattern = /^[a-zA-Z' ]*$/
    if (
      e.target.name === 'firstName' ||
      e.target.name === 'lastName' ||
      e.target.name === 'emergencyName' ||
      e.target.name === 'depositorName' ||
      e.target.name === 'insuranceVendor'
    ) {
      if (pattern.test(e.target.value) === false) {
        return
      }
    }

    if (
      e.target.name === 'email'
      // e.target.name === 'phoneNumber' ||
      // e.target.name === 'mobileNumber' ||
      // e.target.name === 'emergencyContactNo' ||
    ) {
      dispatch({
        field: e.target.name,
        value: e.target.value.replace(/[^\w@.\s]/gi, ''),
      })
    } else if (
      e.target.name === 'phoneNumber' ||
      e.target.name === 'mobileNumber' ||
      e.target.name === 'emergencyContactNo'
    ) {
      dispatch({
        field: e.target.name,
        value: e.target.value.replace(/[^\w+\s]/gi, ''),
      })
    } else if (e.target.name === 'dob') {
      dispatch({
        field: e.target.name,
        value: e.target.value,
      })
    } else if (
      e.target.name === 'firstName' ||
      e.target.name === 'lastName' ||
      e.target.name === 'emergencyName' ||
      e.target.name === 'depositorName' ||
      e.target.name === 'insuranceVendor'
    ) {
      dispatch({
        field: e.target.name,
        value: e.target.value.replace(/[^\w'\s]/gi, ''),
      })
    } else {
      dispatch({
        field: e.target.name,
        value: e.target.value.replace(/[^\w.\s]/gi, ''),
      })
    }

    if (e.target.name === 'coverageTerms' && e.target.value === 'coPayment') {
      setCoPaymentField(true)
      console.log(e.target.name, e.target.value)
    }
    if (e.target.name === 'coverageTerms' && e.target.value === 'fullPayment') {
      dispatch({ field: 'payment', value: '' })
      setCoPaymentField(false)
    }

    if (e.target.name === 'dob') {
      calculate_age(e.target.value)
    }

    if (e.target.value === 'Cash') {
      dispatch({ field: 'bankName', value: '' })
      setSlipUpload('')
      setImagePreview('')
      setpdfView('')
      setInsuranceForm(true)
      dispatch({ field: 'insuranceNo', value: '' })
      dispatch({ field: 'insuranceVendor', value: '' })
      dispatch({ field: 'coverageDetails', value: '' })
      dispatch({ field: 'coverageTerms', value: '' })
      dispatch({ field: 'payment', value: '' })
      dispatch({ field: 'coveredFamilyMembers', value: '' })
      dispatch({ field: 'otherCoverageDetails', value: '' })
      setenableForm(true)
      setenableNext(true)
    } else if (e.target.value === 'Insurance') {
      dispatch({ field: 'depositorName', value: '' })
      dispatch({ field: 'amountReceived', value: '' })
      dispatch({ field: 'bankName', value: '' })
      setSlipUpload('')
      setImagePreview('')
      setpdfView('')
      setInsuranceForm(false)
      setenableForm(false)
      setenableNext(false)
    } else if (e.target.value === 'WireTransfer') {
      dispatch({ field: 'amountReceived', value: '' })
      setInsuranceForm(true)
      dispatch({ field: 'insuranceNo', value: '' })
      dispatch({ field: 'insuranceVendor', value: '' })
      dispatch({ field: 'coverageDetails', value: '' })
      dispatch({ field: 'coverageTerms', value: '' })
      dispatch({ field: 'payment', value: '' })
      dispatch({ field: 'coveredFamilyMembers', value: '' })
      dispatch({ field: 'otherCoverageDetails', value: '' })
    }
  }

  console.log('amout', amountReceived, typeof amountReceived)

  // const addZeroes = (num) => {
  //   // Cast as number
  //   var num = Number(num)
  //   // If not a number, return 0
  //   if (isNaN(num)) {
  //     return 0
  //   }
  //   // If there is no decimal, or the decimal is less than 2 digits, toFixed
  //   if (
  //     String(num).split('.').length < 2 ||
  //     String(num).split('.')[1].length <= 2
  //   ) {
  //     num = num.toFixed(2)
  //   }
  //   // Return the number
  //   return num
  // }

  const calculate_age = (dob) => {
    var today = new Date()
    var birthDate = new Date(dob)
    var age_now = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--
    }
    dispatch({ field: 'age', value: age_now })
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
            <img src={patientRegister} />
            <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
              <h3 style={{ color: 'white', fontWeight: '700' }}>
                {comingFor === 'add'
                  ? ' Patient Registration'
                  : ' Edit Patient'}
              </h3>
            </div>
          </div>
          <div>
            <ButtonField
              onClick={() => props.history.goBack()}
              name='viewAll'
            />
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
                borderRadius: 5,
                outline: 'none',
                color: value === 0 ? '#12387a' : '#3B988C',
              }}
              label='Patient Details'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 1 ? '#12387a' : '#3B988C',
              }}
              label='Emergency Contact'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 2 ? '#12387a' : '#3B988C',
              }}
              label='Payment Method'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 3 ? '#12387a' : '#3B988C',
              }}
              label='Insurance Details'
              disabled={enableForm}
            />
          </Tabs>
        </div>
        <div style={{ width: 'auto', height: '20px' }} />
        {value === 0 ? (
          <div
            style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            className={`${'container-fluid'} ${classes.root}`}
          >
            {comingFor === 'add' ? (
              <>
                <div
                  className='row'
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <div
                    className='col-md-10 col-sm-9 col-8'
                    style={{
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      type='text'
                      label='Search Patient by Name / MRN / National ID / Mobile Number'
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
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
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
                        height: 55,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        // width: 100,
                      }}
                    >
                      <img src={BarCode} style={{ width: 80, height: 75 }} />
                    </div>
                  </div>

                  <div
                    className='col-md-1 col-sm-2 col-2'
                    style={{ ...styles.textFieldPadding }}
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

                <div className='row'>
                  <div
                    className='col-md-11 col-sm-11 col-10'
                    style={{
                      ...styles.textFieldPadding,
                    }}
                  >
                    {searchQuery ? (
                      <div style={{ zIndex: 3 }}>
                        <Paper style={{ maxHeight: 300, overflow: 'auto' }}>
                          {itemFoundSuccessfull ? (
                            itemFound && (
                              <Table size='small'>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>MRN</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Payment Method</TableCell>
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
                              onClick={() => setSearchQuery('')}
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
              </>
            ) : (
              undefined
            )}

            <div className='row'>
              <div
                className='col-md-6 col-sm-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='Patient MRN'
                  name={'profileNo'} // now Patient MRN
                  value={profileNo}
                  disabled={true}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  variant='filled'
                  // error={profileNo === '' && isFormSubmitted}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
                {/* <ErrorMessage
                  name={profileNo}
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
              <div
                className='col-md-6 col-sm-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  type='number'
                  label='National ID'
                  name={'SIN'} // now Identity
                  value={SIN}
                  error={SIN === '' && detailsForm}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                <ErrorMessage
                  name={SIN}
                  type='nationalId'
                  isFormSubmitted={detailsForm}
                />
              </div>
              <div
                className='col-md-2 col-sm-2'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <Autocomplete
                  id='combo-box-demo'
                  options={titles}
                  name='title'
                  getOptionLabel={(option) => option.value}
                  // onChange={onDropDownChange}
                  onChange={(val, e) => {
                    onDropDownChange({
                      target: { name: 'title', value: e.value },
                    })
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // value={title}
                      label='Combo box'
                      variant='outlined'
                    />
                  )}
                /> */}
                <TextField
                  // required
                  select
                  fullWidth
                  id='title'
                  name='title'
                  value={title}
                  // error={title === '' && detailsForm}
                  onChange={onChangeValue}
                  label='Title'
                  variant='filled'
                  className='dropDownStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                >
                  <MenuItem value={title}>{title}</MenuItem>

                  {titles.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
                </TextField>
                {/* <ErrorMessage name={title} isFormSubmitted={detailsForm} /> */}
              </div>
              <div
                className='col-md-5 col-sm-5'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='First Name'
                  name={'firstName'}
                  value={firstName}
                  onChange={onChangeValue}
                  error={firstName === '' && detailsForm}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                <ErrorMessage
                  name={firstName}
                  type='firstName'
                  isFormSubmitted={detailsForm}
                />
              </div>
              <div
                className='col-md-5 col-sm-5'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  type='text'
                  label='Last Name'
                  name={'lastName'}
                  value={lastName}
                  error={lastName === '' && detailsForm}
                  onChange={(e) => onChangeValue(e)}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                <ErrorMessage
                  name={lastName}
                  type='lastName'
                  isFormSubmitted={detailsForm}
                />
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-4 col-sm-4 col-4'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  select
                  fullWidth
                  id='gender'
                  name='gender'
                  value={gender}
                  error={gender === '' && detailsForm}
                  onChange={onChangeValue}
                  label='Gender'
                  variant='filled'
                  className='dropDownStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>

                  {genderArray.map((val) => {
                    return (
                      <MenuItem
                        key={
                          val.key.charAt(0).toUpperCase() + val.value.slice(1)
                        }
                        value={
                          val.key.charAt(0).toUpperCase() + val.value.slice(1)
                        }
                      >
                        {val.value.charAt(0).toUpperCase() + val.value.slice(1)}
                      </MenuItem>
                    )
                  })}
                </TextField>
                <ErrorMessage
                  name={gender}
                  type='gender'
                  isFormSubmitted={detailsForm}
                />
              </div>

              <div
                className='col-md-4 col-sm-4 col-4'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    required
                    inputVariant='filled'
                    fullWidth={true}
                    label='Date of birth'
                    format='MM-dd-yyyy'
                    // minDate={dob}

                    error={dob === '' && detailsForm}
                    onChange={(val) => handleChangeDate(val, 'dob')}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    style={{ borderRadius: '10px' }}
                    value={dob}
                  />
                </MuiPickersUtilsProvider>

                <ErrorMessage name={dob} isFormSubmitted={detailsForm} />
              </div>

              <div
                className='col-md-4 col-sm-4 col-4'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  // required
                  type='text'
                  select
                  label='Nationality'
                  name={'nationality'}
                  value={nationality}
                  // error={nationality === '' && detailsForm}
                  onChange={(e) => onChangeValue(e)}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>

                  {countries &&
                    countries.map((val) => {
                      return (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      )
                    })}
                </TextField>

                {/* <ErrorMessage
                  name={nationality}
                  // type='nationName'
                  isFormSubmitted={detailsForm}
                /> */}
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
                  type='number'
                  disabled
                  label='Age'
                  name={'age'}
                  value={age}
                  onChange={onChangeValue}
                  // error={age === '' && detailsForm}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                {/* <ErrorMessage
                  name={age}
                  // type='numbers'
                  isFormSubmitted={detailsForm}
                /> */}
              </div>
              <div
                className='col-md-3 col-sm-3 col-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  type='number'
                  label='Height (inches)'
                  name={'height'}
                  value={height}
                  onChange={onChangeValue}
                  // error={height === "" && isFormSubmitted}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                {/* <ErrorMessage
                  name={height}
                  type="height"
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
              <div
                className='col-md-3 col-sm-3 col-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  type='number'
                  label='Weight (kg)'
                  name={'weight'}
                  value={weight}
                  onChange={onChangeValue}
                  // error={weight === "" && isFormSubmitted}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                {/* <ErrorMessage
                  name={weight}
                  type="weight"
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>

              <div
                className='col-md-3 col-sm-3 col-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  select
                  fullWidth
                  id='bloodGroup'
                  name='bloodGroup'
                  value={bloodGroup}
                  onChange={onChangeBloodGroup}
                  // error={bloodGroup === '' && isFormSubmitted}
                  label='Blood Group'
                  variant='filled'
                  className='dropDownStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                >
                  <MenuItem value={bloodGroup}>{bloodGroup}</MenuItem>

                  {bloodGroups.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
                </TextField>
                {/* <ErrorMessage
                  name={bloodGroup}
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-3 col-sm-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <MuiPhoneNumber
                  // required
                  label='Telephone Number'
                  name={'phoneNumber'}
                  value={phoneNumber}
                  // hyperText='Telephone format +962xxxxxxxx'
                  // error={phoneNumber === '' && detailsForm}
                  defaultCountry={'jo'}
                  onChange={onPhoneNumberChange}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
                {/* {phoneNumber && !validatePhone(phoneNumber) ? (
                  undefined
                ) : (
                  <ErrorMessage
                    name={phoneNumber}
                    type='phone'
                    isFormSubmitted={detailsForm}
                  />
                )} */}
              </div>
              <div
                className='col-md-3 col-sm-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='Email'
                  name={'email'}
                  value={email}
                  error={email === '' && detailsForm}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                <ErrorMessage
                  name={email}
                  type='email'
                  isFormSubmitted={detailsForm}
                />
              </div>
              <div
                className='col-md-3 col-sm-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  select
                  fullWidth
                  id='country'
                  name='country'
                  value={country}
                  error={country === '' && detailsForm}
                  onChange={(e) => onChangeCountry(e)}
                  label='Country'
                  variant='filled'
                  className='dropDownStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>

                  {countries &&
                    countries.map((val) => {
                      return (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      )
                    })}
                </TextField>
                <ErrorMessage
                  name={country}
                  type='country'
                  isFormSubmitted={detailsForm}
                />
              </div>
              <div
                className='col-md-3 col-sm-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  select
                  fullWidth
                  id='city'
                  name='city'
                  value={city}
                  onChange={(e) => onChangeValue(e)}
                  label='City'
                  error={city === '' && detailsForm}
                  variant='filled'
                  className='dropDownStyle'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                >
                  <MenuItem value={city}>{city}</MenuItem>

                  {cities &&
                    cities.map((val) => {
                      return (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      )
                    })}
                </TextField>
                <ErrorMessage
                  name={city}
                  type='city'
                  isFormSubmitted={detailsForm}
                />
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-3 col-sm-3'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <MuiPhoneNumber
                  value={phoneNumber}
                  defaultCountry={'jo'}
                  onChange={onMobileNumberChange}
                  required
                  label='Mobile Number'
                  name={'mobileNumber'}
                  value={mobileNumber}
                  error={mobileNumber === '' && detailsForm}
                  hyperText='Mobile phone format +962xxxxxxxxx'
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />

                {mobileNumber && !validatePhone(mobileNumber) ? (
                  undefined
                ) : (
                  <ErrorMessage
                    name={mobileNumber}
                    type='phone'
                    isFormSubmitted={detailsForm}
                  />
                )}
              </div>

              <div
                className='col-md-9'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='Address'
                  name={'address'}
                  value={address}
                  error={address === '' && detailsForm}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                />
                <ErrorMessage
                  name={address}
                  type='address'
                  isFormSubmitted={detailsForm}
                />
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  multiline
                  label='Other Details'
                  name={'otherDetails'}
                  value={otherDetails}
                  // error={otherDetails === '' && detailsForm}
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
                {/* <ErrorMessage
                  name={otherDetails}
                  // type='text'
                  isFormSubmitted={detailsForm}
                /> */}
              </div>
            </div>

            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  onClick={onTabNavigation}
                  variant='contained'
                  color='default'
                >
                  Cancel
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  //disabled={!validateFormType1()}
                  onClick={DetailsOnClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{
              flex: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
            className={`${'container-fluid'} ${classes.root}`}
          >
            <div className='row'>
              <div
                className='col-md-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <div>
                  <TextField
                    required
                    label='Name'
                    name={'emergencyName'}
                    value={emergencyName}
                    onChange={onChangeValue}
                    error={emergencyName === '' && emergencyForm}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                  <ErrorMessage
                    name={emergencyName}
                    type='emergencyName'
                    isFormSubmitted={emergencyForm}
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <div>
                  <MuiPhoneNumber
                    required
                    label='Contact No'
                    name={'emergencyContactNo'}
                    value={emergencyContactNo}
                    hyperText='emergency contact format +962xxxxxxxx'
                    defaultCountry={'jo'}
                    onChange={onEmergencyNumberChange}
                    error={emergencyContactNo === '' && emergencyForm}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    InputLabelProps={{
                      className: classes.label,
                      classes: { label: classes.label },
                    }}
                  />

                  {emergencyContactNo && !validatePhone(emergencyContactNo) ? (
                    undefined
                  ) : (
                    <ErrorMessage
                      name={emergencyContactNo}
                      type='phone'
                      isFormSubmitted={emergencyForm}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <div>
                  <TextField
                    required
                    select
                    label='Relation'
                    name={'emergencyRelation'}
                    value={emergencyRelation}
                    onChange={onChangeValue}
                    error={emergencyRelation === '' && emergencyForm}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>

                    {relationArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                  <ErrorMessage
                    name={emergencyRelation}
                    type='relation'
                    isFormSubmitted={emergencyForm}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  onClick={onTabNavigation}
                  variant='contained'
                  color='default'
                >
                  Cancel
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  onClick={EmergencyOnClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
                <div
                  style={{
                    width: '10px',
                    height: 'auto',
                    display: 'inline-block',
                  }}
                />
                <>
                  {comingFor === 'add' ? (
                    <>
                      <Button
                        style={styles.save}
                        // disabled={
                        //   !(validatePatientForm() && validatePaymentForm())
                        // }
                        onClick={searchActivated ? handleEdit : handleAdd}
                        variant='contained'
                        color='default'
                      >
                        Save
                      </Button>
                      <div
                        style={{
                          width: '10px',
                          height: 'auto',
                          display: 'inline-block',
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  <div
                    style={{
                      width: '10px',
                      height: 'auto',
                      display: 'inline-block',
                    }}
                  />
                </>

                {currentUser.staffTypeId.type === 'EDR Receptionist' ? (
                  <Button
                    style={styles.generate}
                    // disabled={comingFor === 'add' ? !isFormSubmitted : false}
                    disabled={
                      comingFor === 'add'
                        ? !(
                            validatePatientForm() &&
                            validateEmergencyForm() &&
                            (validateInsuranceForm() || validateCashForm()) &&
                            isPatientSubmitted
                          )
                        : false
                    }
                    onClick={
                      comingFor === 'add' ? handleGenerateEDR : handleEdit
                    }
                    variant='contained'
                    color='primary'
                  >
                    {comingFor === 'add' ? 'Generate ED Record' : 'Update'}
                  </Button>
                ) : (
                  undefined
                )}

                {currentUser.staffTypeId.type === 'IPR Receptionist' ? (
                  <Button
                    style={styles.generate}
                    // disabled={comingFor === 'add' ? !isFormSubmitted : false}
                    disabled={
                      comingFor === 'add'
                        ? !(
                            validatePatientForm() &&
                            validateEmergencyForm() &&
                            (validateInsuranceForm() || validateCashForm()) &&
                            isPatientSubmitted
                          )
                        : false
                    }
                    onClick={
                      comingFor === 'add' ? handleGenerateIPR : handleEdit
                    }
                    variant='contained'
                    color='primary'
                  >
                    {comingFor === 'add' ? 'Generate IP Record' : 'Update'}
                  </Button>
                ) : (
                  undefined
                )}
              </div>
            </div>
          </div>
        ) : value === 2 ? (
          <div
            style={{
              flex: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
            className={`${'container-fluid'} ${classes.root}`}
          >
            <div className='row'>
              <div className='col-md-12' style={styles.form}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Payment Method</FormLabel>
                  <RadioGroup
                    row
                    aria-label='payMethod'
                    name='paymentMethod'
                    value={paymentMethod}
                    onChange={(e) => onChangeValue(e)}
                  >
                    <FormControlLabel
                      value='Cash'
                      control={<Radio />}
                      label='Uninsured'
                    />
                    <FormControlLabel
                      value='Insurance'
                      control={<Radio />}
                      label='Insured'
                    />
                    {/* <FormControlLabel
                      value='WireTransfer'
                      control={<Radio />}
                      label='Wire Transfer'
                    /> */}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className='row'>
              <div
                className='col-md-6 col-sm-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                {/* <TextField
                  disabled={true}
                  variant='filled'
                  label='Date/Time'
                  name={'DateTime'}
                  value={DateTime}
                  defaultValue={DateTime}
                  type='datetime'
                  // format='MM/dd/yyyy HH:mm a'
                  className='textInputStyle'
                  onChange={(val) => onChangeValue(val, 'DateTime')}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    // required
                    disabled
                    inputVariant='filled'
                    fullWidth={true}
                    label='Date/Time'
                    format='MM-dd-yyyy HH:mm'
                    minDate={DateTime}
                    // onChange={(val) => onChangeDate(val, 'DateTime')}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    style={{ borderRadius: '10px' }}
                    value={DateTime}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div
                className='col-md-6 col-sm-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  label='Receiver Name'
                  name={'receiverName'}
                  value={receiverName}
                  onChange={onChangeValue}
                  disabled={true}
                  // error={receiverName === '' && isFormSubmitted}
                  // disabled={true}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
                {/* <ErrorMessage
                  name={receiverName}
                  type='emergencyName'
                  isFormSubmitted={isFormSubmitted}
                /> */}
              </div>
            </div>

            {paymentMethod === 'Cash' ? (
              <div className='row'>
                <div
                  className='col-md-6 col-sm-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Depositor Name'
                    name={'depositorName'}
                    value={depositorName}
                    error={depositorName === '' && paymentForm}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                  <ErrorMessage
                    name={depositorName}
                    type='emergencyName'
                    isFormSubmitted={paymentForm}
                  />
                </div>
                <div
                  className='col-md-6 col-sm-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <CurrencyTextField
                    required
                    label='Amount Received'
                    name={'amountReceived'}
                    value={amountReceived}
                    error={amountReceived === '' && paymentForm}
                    // onChange={onChangeValue}
                    // type='number'
                    onBlur={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    textAlign='left'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                    currencySymbol='JD'
                    outputFormat='number'
                    // onChange={(event, value) => setValue(value)}
                  />
                  <ErrorMessage
                    name={amountReceived}
                    isFormSubmitted={paymentForm}
                  />
                  {/* <TextField
                    label='Amount Received'
                    name={'amountReceived'}
                    value={amountReceived}
                    // error={amountReceived === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    type='number'
                    // startAdornment={
                    //   <InputAdornment position='start'>DR</InputAdornment>
                    // }
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      startAdornment: (
                        <InputAdornment position='start'>JD</InputAdornment>
                      ),
                    }}
                  /> */}
                  {/* <ErrorMessage
                    name={amountReceived}
                    type='amount'
                    isFormSubmitted={isFormSubmitted}
                  /> */}
                </div>
              </div>
            ) : paymentMethod === 'Insurance' ? (
              <></>
            ) : paymentMethod === 'WireTransfer' ? (
              <div>
                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      label='Bank Name'
                      name={'bankName'}
                      value={bankName}
                      error={bankName === '' && isFormSubmitted}
                      onChange={onChangeValue}
                      className='textInputStyle'
                      variant='filled'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                    <ErrorMessage
                      name={bankName}
                      type='text'
                      isFormSubmitted={isFormSubmitted}
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
                      required
                      label='Depositor Name'
                      name={'depositorName'}
                      value={depositorName}
                      onChange={onChangeValue}
                      error={depositorName === '' && isFormSubmitted}
                      className='textInputStyle'
                      variant='filled'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                    <ErrorMessage
                      name={depositorName}
                      // type='text'
                      isFormSubmitted={isFormSubmitted}
                    />
                  </div>
                </div>

                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
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
                        name='depositSlip'
                      />
                      <FaUpload /> Upload Deposit Slip
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
                  {depositSlip ? (
                    <>
                      {depositSlip !== '' && depositSlip.includes('\\') ? (
                        <>
                          {depositSlip !== '' &&
                          depositSlip.slice(depositSlip.length - 3) !==
                            'pdf' ? (
                            <div
                              className='col-md-6 col-sm-6 col-6'
                              style={{
                                ...styles.inputContainerForTextField,
                                ...styles.textFieldPadding,
                              }}
                            >
                              <img
                                src={uploadsUrl + depositSlip.split('\\')[1]}
                                className='depositSlipImg'
                              />
                            </div>
                          ) : depositSlip !== '' &&
                            depositSlip.slice(depositSlip.length - 3) ===
                              'pdf' ? (
                            <div
                              className='col-md-6 col-sm-6 col-6'
                              style={{
                                ...styles.inputContainerForTextField,
                                ...styles.textFieldPadding,
                                // textAlign:'center',
                              }}
                            >
                              <a
                                href={uploadsUrl + depositSlip.split('\\')[1]}
                                style={{ color: '#2c6ddd' }}
                              >
                                Click here to open Deposit Slip
                              </a>
                            </div>
                          ) : (
                            undefined
                          )}
                        </>
                      ) : depositSlip !== '' && depositSlip.includes('/') ? (
                        <>
                          {depositSlip !== '' &&
                          depositSlip.slice(depositSlip.length - 3) !==
                            'pdf' ? (
                            <div
                              className='col-md-6 col-sm-6 col-6'
                              style={{
                                ...styles.inputContainerForTextField,
                                ...styles.textFieldPadding,
                              }}
                            >
                              <img
                                src={uploadsUrl + depositSlip}
                                className='depositSlipImg'
                              />
                            </div>
                          ) : depositSlip !== '' &&
                            depositSlip.slice(depositSlip.length - 3) ===
                              'pdf' ? (
                            <div
                              className='col-md-6 col-sm-6 col-6'
                              style={{
                                ...styles.inputContainerForTextField,
                                ...styles.textFieldPadding,
                                // textAlign:'center',
                              }}
                            >
                              <a
                                href={uploadsUrl + depositSlip}
                                style={{ color: '#2c6ddd' }}
                              >
                                Click here to open Deposit Slip
                              </a>
                            </div>
                          ) : (
                            undefined
                          )}
                        </>
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
                      {depositSlip !== '' ? (
                        <div style={{ color: 'black', textAlign: 'center' }}>
                          New Deposit Slip
                        </div>
                      ) : (
                        undefined
                      )}
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  onClick={onTabNavigation}
                  variant='contained'
                  color='default'
                >
                  Cancel
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  disabled={enableNext}
                  style={styles.stylesForButton}
                  onClick={onClick}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
                <div
                  style={{
                    width: '10px',
                    height: 'auto',
                    display: 'inline-block',
                  }}
                />
                {comingFor === 'add' ? (
                  <>
                    <Button
                      style={styles.save}
                      // disabled={
                      //   !(validatePatientForm() && validatePaymentForm())
                      // }
                      onClick={searchActivated ? handleEdit : handleAdd}
                      variant='contained'
                      color='default'
                    >
                      Save
                    </Button>
                    <div
                      style={{
                        width: '10px',
                        height: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
                {currentUser.staffTypeId.type === 'EDR Receptionist' ? (
                  <Button
                    style={styles.generate}
                    disabled={
                      comingFor === 'add'
                        ? !(
                            validatePatientForm() &&
                            validateEmergencyForm() &&
                            (validateInsuranceForm() || validateCashForm()) &&
                            isPatientSubmitted
                          )
                        : false
                    }
                    onClick={
                      comingFor === 'add' ? handleGenerateEDR : handleEdit
                    }
                    variant='contained'
                    color='primary'
                  >
                    {comingFor === 'add' ? 'Generate ED Record' : 'Update'}
                  </Button>
                ) : (
                  undefined
                )}

                {currentUser.staffTypeId.type === 'IPR Receptionist' ? (
                  <Button
                    style={styles.generate}
                    // disabled={comingFor === 'add' ? !isFormSubmitted : false}
                    disabled={
                      comingFor === 'add'
                        ? !(
                            validatePatientForm() &&
                            validateEmergencyForm() &&
                            (validateInsuranceForm() || validateCashForm()) &&
                            isPatientSubmitted
                          )
                        : false
                    }
                    onClick={
                      comingFor === 'add' ? handleGenerateIPR : handleEdit
                    }
                    variant='contained'
                    color='primary'
                  >
                    {comingFor === 'add' ? 'Generate IP Record' : 'Update'}
                  </Button>
                ) : (
                  undefined
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
              className={`${'container-fluid'} ${classes.root}`}
            >
              <div className='row'>
                <div
                  className='col-md-8 col-sm-7 col-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    label='Insurance Number'
                    type='number'
                    name={'insuranceNo'}
                    value={insuranceNo}
                    onChange={onChangeValue}
                    error={insuranceNo === '' && insuranceForm}
                    className='textInputStyle'
                    variant='filled'
                    disabled={Insuranceform}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                  <ErrorMessage
                    name={insuranceNo}
                    type='insuranceNo'
                    isFormSubmitted={insuranceForm}
                  />
                </div>

                <div
                  className='col-md-1 col-sm-2 col-2'
                  style={{
                    ...styles.inputContainerForTextField,
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
                    <img src={BarCode} style={{ width: 100, height: 70 }} />
                  </div>
                </div>

                <div
                  className='col-md-1 col-sm-1 col-1'
                  style={{
                    ...styles.inputContainerForTextField,
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
                <div
                  className='col-md-2 col-sm-2 col-1'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <Button
                    style={{
                      ...styles.stylesForButton,
                      height: '50px',
                      backgroundColor: '#ba55d3',
                    }}
                    variant='contained'
                    color='primary'
                  >
                    Verify
                  </Button>
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <div>
                    <TextField
                      required
                      label='Insurance Vendor'
                      name={'insuranceVendor'}
                      value={insuranceVendor}
                      disabled={Insuranceform}
                      onChange={onChangeValue}
                      error={insuranceVendor === '' && insuranceForm}
                      className='textInputStyle'
                      variant='filled'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                    <ErrorMessage
                      name={insuranceVendor}
                      type='vendor'
                      isFormSubmitted={insuranceForm}
                    />
                  </div>
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
                    // required
                    select
                    fullWidth
                    disabled={Insuranceform}
                    id='coverageTerms'
                    name='coverageTerms'
                    value={coverageTerms}
                    onChange={onChangeValue}
                    // error={coverageTerms === '' && insuranceForm}
                    label='Coverage Terms'
                    variant='filled'
                    className='dropDownStyle'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value={coverageTerms}>{coverageTerms}</MenuItem>

                    {coverageTermsArr.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                  {/* <ErrorMessage
                    name={coverageTerms}
                    isFormSubmitted={insuranceForm}
                  /> */}
                </div>
                <div
                  className='col-md-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <div>
                    <TextField
                      label='Co-Payment %'
                      name={'payment'}
                      value={payment}
                      disabled={Insuranceform || !coPaymentField}
                      onChange={onChangeValue}
                      // error={payment === '' && isFormSubmitted}
                      type='number'
                      className='textInputStyle'
                      variant='filled'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                    {/* <ErrorMessage
                      name={payment}
                      type="coPayment"
                      isFormSubmitted={isFormSubmitted}
                    /> */}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div
                  className='col-md-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <div>
                    <TextField
                      // required
                      select
                      fullWidth
                      disabled={Insuranceform}
                      id='coveredFamilyMembers'
                      name='coveredFamilyMembers'
                      value={coveredFamilyMembers}
                      onChange={onChangeValue}
                      // error={coveredFamilyMembers === '' && insuranceForm}
                      label='Covered Family Members'
                      variant='filled'
                      className='dropDownStyle'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    >
                      <MenuItem value={coveredFamilyMembers}>
                        {coveredFamilyMembers}
                      </MenuItem>

                      {coveredFamilyArray.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                    {/* <ErrorMessage
                      name={coveredFamilyMembers}
                      // type='text'
                      isFormSubmitted={insuranceForm}
                    /> */}
                  </div>
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    // required
                    multiline
                    type='text'
                    disabled={Insuranceform}
                    // error={coverageDetails === '' && insuranceForm}
                    label='Coverage Details'
                    name={'coverageDetails'}
                    value={coverageDetails}
                    onChange={onChangeValue}
                    rows={4}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                  {/* <ErrorMessage
                    name={coverageDetails}
                    // type='text'
                    isFormSubmitted={insuranceForm}
                  /> */}
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-12'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    // required
                    multiline
                    type='text'
                    disabled={Insuranceform}
                    // error={otherCoverageDetails === '' && insuranceForm}
                    label='Other Details'
                    name={'otherCoverageDetails'}
                    value={otherCoverageDetails}
                    onChange={onChangeValue}
                    rows={4}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                  {/* <ErrorMessage
                    name={otherCoverageDetails}
                    // type='text'
                    isFormSubmitted={insuranceForm}
                  /> */}
                </div>
              </div>
            </div>

            <div
              style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
              className='container-fluid'
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                <Button
                  style={styles.stylesForButton}
                  onClick={onTabNavigation}
                  variant='contained'
                  color='default'
                >
                  Cancel
                </Button>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                }}
              >
                {comingFor === 'add' ? (
                  <>
                    <Button
                      style={styles.save}
                      // disabled={
                      //   !(validatePatientForm() && validatePaymentForm())
                      // }
                      onClick={searchActivated ? handleEdit : handleAdd}
                      variant='contained'
                      color='default'
                    >
                      Save
                    </Button>
                    <div
                      style={{
                        width: '10px',
                        height: 'auto',
                        display: 'inline-block',
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}

                {currentUser.staffTypeId.type === 'EDR Receptionist' ? (
                  <Button
                    style={styles.generate}
                    // disabled={comingFor === 'add' ? !isFormSubmitted : false}
                    disabled={
                      comingFor === 'add'
                        ? !(
                            validatePatientForm() &&
                            validateEmergencyForm() &&
                            (validateInsuranceForm() || validateCashForm()) &&
                            isPatientSubmitted
                          )
                        : false
                    }
                    onClick={
                      comingFor === 'add' ? handleGenerateEDR : handleEdit
                    }
                    variant='contained'
                    color='danger'
                  >
                    {comingFor === 'add' ? 'Generate ED Record' : 'Update'}
                  </Button>
                ) : (
                  undefined
                )}
                {currentUser.staffTypeId.type === 'IPR Receptionist' ? (
                  <Button
                    style={styles.generate}
                    disabled={
                      comingFor === 'add'
                        ? !(
                            validatePatientForm() &&
                            validateEmergencyForm() &&
                            (validateInsuranceForm() || validateCashForm()) &&
                            isPatientSubmitted
                          )
                        : false
                    }
                    onClick={
                      comingFor === 'add' ? handleGenerateIPR : handleEdit
                    }
                    variant='contained'
                    color='danger'
                  >
                    {comingFor === 'add' ? 'Generate IP Record' : 'Update'}
                  </Button>
                ) : (
                  undefined
                )}
              </div>
            </div>
          </div>
        )}

        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />

        <div style={{ marginBottom: 40, marginTop: 0, paddingLeft: 10 }}>
          {/* <img
            onClick={onTabNavigation}
            src={Back_Arrow}
            style={{ width: 45, height: 35, cursor: "pointer" }}
          /> */}

          {/* <Button
            style={styles.stylesForButton}
            //disabled={!validateFormType1()}
            onClick={onTabNavigation}
            variant='contained'
            color='primary'
          >
            Cancel
          </Button> */}
        </div>
      </div>
    </div>
  )
}
export default AddEditPatientListing
