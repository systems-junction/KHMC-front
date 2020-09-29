import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/Purchase Order.png'
import Back_Arrow from '../../../assets/img/Back_Arrow.png'
import cookie from 'react-cookies'
import axios from 'axios'
import _ from 'lodash'
import { updateEdrIpr } from '../../../public/endpoins'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Notification from '../../../components/Snackbar/Notification.js'
import CustomTable from '../../../components/Table/Table'
import TextField from '@material-ui/core/TextField'

const tableHeadingForTriage = [
  'Request No.',
  'Date/Time',
  'Checked By',
  'Triage Level',
  'General Appearance',
  'Head Neck',
  'Neurological',
  'Respiratory',
  'Cardiac',
  'Abdomen',
  '',
]
const tableDataKeysForTriage = [
  'triageRequestNo',
  'date',
  'doctorName',
  'triageLevel',
  'generalAppearance',
  'headNeck',
  'neurological',
  'respiratory',
  'cardiac',
  'abdomen',
]

const tableHeadingForVitalSigns = [
  'Request No.',
  'Date/Time',
  'Checked By',
  'Heart Rate',
  'BP (Systolic)',
  'BP (Diastolic)',
  'Respiratory Rate',
  'Temperature',
  'FSBS',
  'Pain Scale',
  'Pulse OX',
  '',
]
const tableDataKeysForVitalSigns = [
  'triageRequestNo',
  'date',
  'doctorName',
  'heartRate',
  'bloodPressureSys',
  'bloodPressureDia',
  'respiratoryRate',
  'temperature',
  'FSBS',
  'painScale',
  'pulseOX',
]

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    width: '120px',
    height: '45px',
    outline: 'none',
  },
}

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
})

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

function TriageAndAssessment(props) {
  const classes = useStyles()

  const initialState = {
    triageAssessmentArray: '',

    triageLevel: 'N/A',
    generalAppearance: 'N/A',
    headNeck: 'N/A',
    respiratory: 'N/A',
    cardiac: 'N/A',
    abdomen: 'N/A',
    neurological: 'N/A',

    generalAppearanceText: null,
    headNeckText: null,
    respiratoryText: null,
    cardiacText: null,
    abdomenText: null,
    neurologicalText: null,

    heartRate: '',
    bloodPressureSys: '',
    bloodPressureDia: '',
    respiratoryRate: '',
    temperature: '',
    FSBS: '',
    painScale: '',
    pulseOX: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    triageAssessmentArray,

    triageLevel,
    generalAppearance,
    headNeck,
    respiratory,
    cardiac,
    abdomen,
    neurological,

    generalAppearanceText,
    headNeckText,
    respiratoryText,
    cardiacText,
    abdomenText,
    neurologicalText,

    heartRate,
    bloodPressureSys,
    bloodPressureDia,
    respiratoryRate,
    temperature,
    FSBS,
    painScale,
    pulseOX,
  } = state

  const classesForTabs = useStylesForTabs()

  const [value, setValue] = useState(0)
  const [historyValue, sethistoryValue] = useState(0)
  const [id, setId] = React.useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [requestType, setrequestType] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [MRN, setMRN] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem
    console.log('In triage : ', selectedRec.patientId.profileNo)
    setMRN(selectedRec.patientId.profileNo)
    setId(selectedRec._id)
    setrequestType(selectedRec.requestType)

    if (selectedRec.triageAssessment) {
      selectedRec.triageAssessment.map(
        (d) =>
          (d.doctorName = d.requester
            ? d.requester.firstName + ' ' + d.requester.lastName
            : '')
      )
      dispatch({
        field: 'triageAssessmentArray',
        value: _.sortBy(
          selectedRec.triageAssessment.reverse(),
          'date'
        ).reverse(),
      })
    }
  }, [])

  const onCheckedValue = (e) => {
    if (e.target.value === 'generalAppearanceText') {
      dispatch({ field: 'generalAppearanceText', value: '' })
    } else if (e.target.value === 'respiratoryText') {
      dispatch({ field: 'respiratoryText', value: '' })
    } else if (e.target.value === 'neurologicalText') {
      dispatch({ field: 'neurologicalText', value: '' })
    } else if (e.target.value === 'headNeckText') {
      dispatch({ field: 'headNeckText', value: '' })
    } else if (e.target.value === 'abdomenText') {
      dispatch({ field: 'abdomenText', value: '' })
    } else if (e.target.value === 'cardiacText') {
      dispatch({ field: 'cardiacText', value: '' })
    } else {
      dispatch({ field: 'generalAppearanceText', value: null })
      dispatch({ field: 'respiratoryText', value: null })
      dispatch({ field: 'neurologicalText', value: null })
      dispatch({ field: 'headNeckText', value: null })
      dispatch({ field: 'abdomenText', value: null })
      dispatch({ field: 'cardiacText', value: null })
    }
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleHistoryTabChange = (event, newValue) => {
    sethistoryValue(newValue)
  }

  const onNext = () => {
    setValue(value + 1)
  }

  const onSpecify = (e) => {
    if (e.target.name === 'generalAppearance') {
      dispatch({ field: 'generalAppearanceText', value: e.target.value })
    } else if (e.target.name === 'headNeck') {
      dispatch({ field: 'headNeckText', value: e.target.value })
    } else if (e.target.name === 'respiratory') {
      dispatch({ field: 'respiratoryText', value: e.target.value })
    } else if (e.target.name === 'abdomen') {
      dispatch({ field: 'abdomenText', value: e.target.value })
    } else if (e.target.name === 'neurological') {
      dispatch({ field: 'neurologicalText', value: e.target.value })
    } else if (e.target.name === 'cardiac') {
      dispatch({ field: 'cardiacText', value: e.target.value })
    }
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const onTextChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const onPainScaleChange = (e) => {
    if (
      (e.target.name === 'painScale' && e.target.value < 0) ||
      e.target.value > 10
    ) {
      return
    } else {
      dispatch({ field: e.target.name, value: e.target.value })
    }
  }

  const handleSubmitAssessment = (e) => {
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

    const TAArequestNo = 'TAA' + day + YYYY + HH + mm + ss

    let triageAssessment = []

    triageAssessment = [
      ...triageAssessmentArray,
      {
        triageRequestNo: TAArequestNo,
        requester: currentUser.staffId,
        triageLevel: triageLevel,
        generalAppearance: generalAppearance,
        headNeck: headNeck,
        respiratory: respiratory,
        cardiac: cardiac,
        abdomen: abdomen,
        neurological: neurological,
        heartRate: heartRate === '' ? 'N/A' : heartRate,
        bloodPressureSys: bloodPressureSys === '' ? 'N/A' : bloodPressureSys,
        bloodPressureDia: bloodPressureDia === '' ? 'N/A' : bloodPressureDia,
        respiratoryRate: respiratoryRate === '' ? 'N/A' : respiratoryRate,
        temperature: temperature === '' ? 'N/A' : temperature,
        FSBS: FSBS === '' ? 'N/A' : FSBS,
        painScale: painScale === '' ? 'N/A' : painScale,
        pulseOX: pulseOX === '' ? 'N/A' : pulseOX,
      },
    ]
    console.log(e)
    const params = {
      _id: id,
      requestType,
      triageAssessment: triageAssessment,
    }
    console.log(params, 'params')
    axios
      .put(updateEdrIpr, params)
      .then((res) => {
        if (res.data.success) {
          console.log('Update Patient data patient assessment: ', res.data.data)
          props.history.push({
            pathname: 'success',
            state: {
              message: `Triage & Assessment for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} added successfully`,
            },
            comingFor: 'Triage',
          })
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error in Submitting Assessment')
        }
      })
      .catch((e) => {
        console.log('error after submitting Assessment', e)
        setOpenNotification(true)
        setErrorMsg('Error while submitting Assessment')
      })
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
            <img src={business_Unit} />
            <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
              <h3 style={{ color: 'white', fontWeight: '700' }}>
                {'Triage & Assessment'}
              </h3>
            </div>
          </div>
        </div>

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
              label='History'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 1 ? '#12387a' : '#3B988C',
              }}
              label='Vital Signs'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 2 ? '#12387a' : '#3B988C',
              }}
              label='Physical Examination'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 3 ? '#12387a' : '#3B988C',
              }}
              label='Triage Level'
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <>
            <div className={classesForTabs.root}>
              <Tabs
                value={historyValue}
                onChange={handleHistoryTabChange}
                textColor='primary'
                TabIndicatorProps={{ style: { background: '#12387a' } }}
                centered
              >
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 5,
                    outline: 'none',
                    color: historyValue === 0 ? '#12387a' : '#3B988C',
                  }}
                  label='Vital Signs'
                />
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 5,
                    outline: 'none',
                    color: historyValue === 1 ? '#12387a' : '#3B988C',
                  }}
                  label='Physical Examination & Triage'
                />
              </Tabs>
            </div>

            {historyValue === 0 ? (
              <div
                style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                className='container-fluid'
              >
                <div className='row' style={{ marginTop: '20px' }}>
                  {triageAssessmentArray !== 0 ? (
                    <CustomTable
                      tableData={triageAssessmentArray}
                      tableDataKeys={tableDataKeysForVitalSigns}
                      tableHeading={tableHeadingForVitalSigns}
                      borderBottomColor={'#60d69f'}
                      borderBottomWidth={20}
                    />
                  ) : (
                    undefined
                  )}
                </div>
              </div>
            ) : historyValue === 1 ? (
              <div
                style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                className='container-fluid'
              >
                <div className='row' style={{ marginTop: '20px' }}>
                  {triageAssessmentArray !== 0 ? (
                    <CustomTable
                      tableData={triageAssessmentArray}
                      tableDataKeys={tableDataKeysForTriage}
                      tableHeading={tableHeadingForTriage}
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
          </>
        ) : value === 1 ? (
          <>
            <div
              style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                marginTop: '25px',
                marginBottom: '25px',
                borderRadius: '5px',
              }}
            >
              <div className={`container-fluid ${classes.root}`}>
                <div className='row'>
                  <div
                    className='form-group col-md-4 col-sm-4 col-4'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Enter Heart Rate (bpm)'
                      name={'heartRate'}
                      value={heartRate}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
                    className='form-group col-md-4 col-sm-4 col-4'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Blood Pressure Systolic (mmHg)'
                      name={'bloodPressureSys'}
                      value={bloodPressureSys}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
                    className='form-group col-md-4 col-sm-4 col-4'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Blood Pressure Diastolic (mmHg)'
                      name={'bloodPressureDia'}
                      value={bloodPressureDia}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
                <div className='row'>
                  <div
                    className='form-group col-md-4 col-sm-4 col-4'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Enter Respiratory Rate (/min)'
                      name={'respiratoryRate'}
                      value={respiratoryRate}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
                    className='form-group col-md-4 col-sm-4 col-4'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Enter Temperature (°F)'
                      name={'temperature'}
                      value={temperature}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
                    className='form-group col-md-4 col-sm-4 col-4'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Enter FSBS (mg/dL)'
                      name={'FSBS'}
                      value={FSBS}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
                <div className='row'>
                  <div
                    className='form-group col-md-6 col-sm-6 col-6'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Enter Pain Scale (0-10)'
                      name={'painScale'}
                      value={painScale}
                      // error={email === "" && detailsForm}
                      onKeyDown={(evt) => {
                        ;(evt.key === 'e' ||
                          evt.key === 'E' ||
                          evt.key === '-' ||
                          evt.key === '+') &&
                          evt.preventDefault()
                      }}
                      onChange={onPainScaleChange}
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
                    className='form-group col-md-6 col-sm-6 col-6'
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      type='number'
                      label='Enter Pulse OX (SpO2)'
                      name={'pulseOX'}
                      value={pulseOX}
                      // error={email === "" && detailsForm}
                      onChange={onTextChange}
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
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '15px',
                  marginBottom: '2%',
                  paddingRight: '20px',
                }}
                className='container-fluid'
              >
                <div className='row'>
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={onNext}
                    variant='contained'
                    color='primary'
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : value === 2 ? (
          <>
            <div
              style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                marginTop: '25px',
                marginBottom: '25px',
                padding: '25px',
                borderRadius: '5px',
              }}
            >
              <div className='container-fluid'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>General Appearance</strong>
                  </label>
                </div>
                <form
                  className='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                  value={generalAppearance}
                >
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='generalAppearance'
                          value='Good'
                          checked={generalAppearance === 'Good'}
                        />
                        &nbsp;&nbsp;Good
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='generalAppearance'
                          value='Sick'
                          checked={generalAppearance === 'Sick'}
                        />
                        &nbsp;&nbsp;Sick
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='generalAppearance'
                          value='Pain'
                          checked={generalAppearance === 'Pain'}
                        />
                        &nbsp;&nbsp;Pain
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='generalAppearance'
                          value='generalAppearanceText'
                          checked={generalAppearanceText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form
                                    className='form-inline row'
                                    role='form'
                                    onChange={onCheckedValue}
                                    value={generalAppearance}
                                > */}
                <div className='form-group col-md-12'>
                  <input
                    style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                    disabled={generalAppearanceText === null}
                    type='text'
                    placeholder='Specify'
                    onChange={onSpecify}
                    name='generalAppearance'
                    value={generalAppearanceText}
                    className='control-label textInputStyle'
                    maxlength='500'
                  />
                </div>
                {/* </form> */}
              </div>
              <br />
              <div className='container-fluid'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Head and Neck</strong>
                  </label>
                </div>
                <form
                  className='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                  value={headNeck}
                >
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='headNeck'
                          value='Normal'
                          checked={headNeck === 'Normal'}
                        />
                        &nbsp;&nbsp;Normal
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='headNeck'
                          value='Line'
                          checked={headNeck === 'Line'}
                        />
                        &nbsp;&nbsp;Line
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='headNeck'
                          value='Thyroid Enlargement'
                          checked={headNeck === 'Thyroid Enlargement'}
                        />
                        &nbsp;&nbsp;Thyroid Enlargement
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='headNeck'
                          value='headNeckText'
                          checked={headNeckText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form className='form-inline row' role='form' onChange={onCheckedValue}
                                    value={headNeck}> */}
                <div className='form-group col-md-12'>
                  <input
                    style={{ outline: 'none', backgroundColor: '#F7F5F5' }}
                    disabled={headNeckText === null}
                    type='text'
                    onChange={onSpecify}
                    placeholder='Specify'
                    name='headNeck'
                    value={headNeckText}
                    className='control-label textInputStyle'
                    maxlength='500'
                  />
                </div>
                {/* </form> */}
              </div>
              <br />
              <div className='container-fluid'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Respiratory</strong>
                  </label>
                </div>
                <form
                  className='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                  value={respiratory}
                >
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='GBAE'
                          checked={respiratory === 'GBAE'}
                        />
                        &nbsp;&nbsp;GBAE
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='Wheezing'
                          checked={respiratory === 'Wheezing'}
                        />
                        &nbsp;&nbsp;Wheezing
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='Crackles'
                          checked={respiratory === 'Crackles'}
                        />
                        &nbsp;&nbsp;Crackles
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='respiratory'
                          value='Crepitation'
                          checked={respiratory === 'Crepitation'}
                        />
                        &nbsp;&nbsp;Crepitation
                      </label>
                    </div>
                  </div>
                </form>
                <div className='row'>
                  <form
                    className='form-inline'
                    role='form'
                    onChange={onCheckedValue}
                    value={respiratory}
                  >
                    <div className='form-group col-md-1'>
                      <div className='radio'>
                        <label class='radio-inline control-label'>
                          <input
                            type='radio'
                            name='respiratory'
                            value='respiratoryText'
                            checked={respiratoryText !== null}
                          />
                          &nbsp;&nbsp;Other
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className='form-group col-md-11 '>
                    <input
                      style={{
                        outline: 'none',
                        backgroundColor: '#F7F5F5',
                        marginLeft: '-8px',
                      }}
                      disabled={respiratoryText === null}
                      type='text'
                      placeholder='Specify'
                      onChange={onSpecify}
                      name='respiratory'
                      value={respiratoryText}
                      className='control-label textInputStyle'
                      maxlength='500'
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className='container-fluid'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Cardiac</strong>
                  </label>
                </div>
                <form
                  className='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                  value={cardiac}
                >
                  <div className='form-group col-md-4 col-sm-4'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='cardiac'
                          value='Normal S1, S2'
                          checked={cardiac === 'Normal S1, S2'}
                        />
                        &nbsp;&nbsp;Normal S1, S2
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-4 col-sm-4'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='cardiac'
                          value='No Murmurs'
                          checked={cardiac === 'No Murmurs'}
                        />
                        &nbsp;&nbsp;No Murmurs
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-4 col-sm-4'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='cardiac'
                          value='cardiacText'
                          checked={cardiacText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form className='form-inline row' role='form'
                                    onChange={onCheckedValue}
                                    value={cardiac}
                                > */}
                <div className='form-group col-md-12'>
                  <input
                    style={{
                      outline: 'none',
                      backgroundColor: '#F7F5F5',
                      marginLeft: '-5px',
                    }}
                    disabled={cardiacText === null}
                    type='text'
                    placeholder='Specify'
                    onChange={onSpecify}
                    name='cardiac'
                    value={cardiacText}
                    className='control-label textInputStyle'
                    maxlength='500'
                  />
                </div>
                {/* </form> */}
              </div>
              <br />
              <div className='container-fluid'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Abdomen</strong>
                  </label>
                </div>
                <form
                  className='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                  value={abdomen}
                >
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='abdomen'
                          value='Soft Lax'
                          checked={abdomen === 'Soft Lax'}
                        />
                        &nbsp;&nbsp;Soft Lax
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='abdomen'
                          value='No Tenderness'
                          checked={abdomen === 'No Tenderness'}
                        />
                        &nbsp;&nbsp;No Tenderness
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='abdomen'
                          value='Murphy +ve'
                          checked={abdomen === 'Murphy +ve'}
                        />
                        &nbsp;&nbsp;Murphy +ve
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='abdomen'
                          value='Rebound +ve'
                          checked={abdomen === 'Rebound +ve'}
                        />
                        &nbsp;&nbsp;Rebound +ve
                      </label>
                    </div>
                  </div>
                </form>
                <div class='row'>
                  <form
                    className='form-inline'
                    role='form'
                    onChange={onCheckedValue}
                    value={abdomen}
                  >
                    <div className='form-group col-md-3'>
                      <div class='radio'>
                        <label class='radio-inline control-label'>
                          <input
                            type='radio'
                            name='abdomen'
                            value='abdomenText'
                            checked={abdomenText !== null}
                          />
                          &nbsp;&nbsp;Other
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className='col-md-11'>
                    <input
                      style={{
                        outline: 'none',
                        backgroundColor: '#F7F5F5',
                        marginLeft: '-10px',
                      }}
                      disabled={abdomenText === null}
                      type='text'
                      placeholder='Specify'
                      onChange={onSpecify}
                      name='abdomen'
                      value={abdomenText}
                      className=' textInputStyle'
                      maxlength='500'
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className='container-fluid'>
                <div className='row'>
                  <label style={{ paddingLeft: '15px' }}>
                    <strong>Neurological</strong>
                  </label>
                </div>
                <form
                  className='form-inline row'
                  role='form'
                  onChange={onCheckedValue}
                  value={neurological}
                >
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='Conscious'
                          checked={neurological === 'Conscious'}
                        />
                        &nbsp;&nbsp;Conscious
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='Oriented'
                          checked={neurological === 'Oriented'}
                        />
                        &nbsp;&nbsp;Oriented
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='Weakness'
                          checked={neurological === 'Weakness'}
                        />
                        &nbsp;&nbsp;Weakness
                      </label>
                    </div>
                  </div>
                  <div className='form-group col-md-3'>
                    <div class='radio'>
                      <label class='radio-inline control-label'>
                        <input
                          type='radio'
                          name='neurological'
                          value='neurologicalText'
                          checked={neurologicalText !== null}
                        />
                        &nbsp;&nbsp;Other
                      </label>
                    </div>
                  </div>
                </form>
                {/* <form className='form-inline row' role='form'
                                    onChange={onCheckedValue}
                                    value={neurological}
                                > */}
                <div className='form-group col-md-12'>
                  <input
                    style={{
                      outline: 'none',
                      backgroundColor: '#F7F5F5',
                      marginLeft: '-5px',
                    }}
                    disabled={neurologicalText === null}
                    type='text'
                    placeholder='Specify'
                    onChange={onSpecify}
                    name='neurological'
                    value={neurologicalText}
                    className='textInputStyle'
                    maxlength='500'
                  />
                </div>

                {/* </form> */}
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                  paddingRight: '15px',
                }}
                className='container-fluid'
              >
                <div className='row'>
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={onNext}
                    variant='contained'
                    color='primary'
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : value === 3 ? (
          <>
            <div
              style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                marginTop: '25px',
                marginBottom: '25px',
                padding: '25px',
                borderRadius: '5px',
              }}
              className='container-fluid'
            >
              <div className='row'>
                <label style={{ paddingLeft: '15px' }}>
                  <strong>Triage Level</strong>
                </label>
              </div>
              <div onChange={onCheckedValue} value={triageLevel}>
                <div className='row'>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='Resuscitation'
                      checked={triageLevel === 'Resuscitation'}
                    />
                    <label for='male'>&nbsp;&nbsp;1 - Resuscitation</label>
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='Emergent'
                      checked={triageLevel === 'Emergent'}
                    />
                    <label for='male'>&nbsp;&nbsp;2 - Emergent</label>
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='Urgent'
                      checked={triageLevel === 'Urgent'}
                    />
                    <label for='male'>&nbsp;&nbsp;3 - Urgent</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='LessUrgent'
                      checked={triageLevel === 'LessUrgent'}
                    />
                    <label for='male'>&nbsp;&nbsp;4 - Less Urgent</label>
                  </div>
                  <div className='col-md-4'>
                    <input
                      type='radio'
                      name='triageLevel'
                      value='NonUrgent'
                      checked={triageLevel === 'NonUrgent'}
                    />
                    <label for='male'>&nbsp;&nbsp;5 - Non Urgent</label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginTop: '2%',
                  marginBottom: '2%',
                  paddingRight: '15px',
                }}
                className='container-fluid'
              >
                <div className='row'>
                  <Button
                    style={styles.stylesForButton}
                    //disabled={!validateFormType1()}
                    onClick={handleSubmitAssessment}
                    variant='contained'
                    color='primary'
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          undefined
        )}

        <Notification
          msg={errorMsg}
          open={openNotification}
          success={successMsg}
        />

        <div style={{ marginBottom: 20, marginTop: 50 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back_Arrow}
            style={{ width: 45, height: 35, cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  )
}
export default TriageAndAssessment
