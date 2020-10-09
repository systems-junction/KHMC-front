import React, { useState, useEffect } from 'react'
import {
  getPatientUrl,
  getPatientEdrUrl,
  getPatientIprUrl,
} from '../../public/endpoins'
import Notification from '../../components/Snackbar/Notification.js'
import CustomTable from '../../components/Table/Table'
import ButtonField from '../../components/common/Button'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Header from '../../components/Header/Header'
import patientRegister from '../../assets/img/PatientRegistration.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import Fingerprint from '../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../assets/img/Bar Code.png'
import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import ViewPatient from './viewPatient'
import TextField from '@material-ui/core/TextField'
import cookie from 'react-cookies'

const styles = {
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
}

const useStylesForInput = makeStyles((theme) => ({
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
      borderRadius: 5,
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

const tableHeading = [
  'MRN',
  'Patient Name',
  'Gender',
  'Age',
  'Phone',
  'Email',
  'Actions',
]
const tableDataKeys = [
  'profileNo',
  'patientName',
  'gender',
  'age',
  'phoneNumber',
  'email',
]

const actions = { view: true }

export default function PatientListing(props) {
  const classes = useStylesForInput()

  const [patient, setPatient] = useState('')
  const [itemModalVisible, setitemModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [item, setItem] = useState('')
  const [searchPatientQuery, setSearchPatientQuery] = useState('')
  const [staffType, setStaffType] = useState(
    cookie.load('current_user').staffTypeId.type
  )
  const [PatientUrl, setPatientUrl] = useState('')

  useEffect(() => {
    getPatientData()
  }, [])

  function getPatientData() {
    var PatientUrlValue = ''
    console.log(staffType)
    if (staffType == 'EDR Receptionist') {
      PatientUrlValue = getPatientEdrUrl
    }
    if (staffType == 'IPR Receptionist') {
      PatientUrlValue = getPatientIprUrl
    }
    console.log(PatientUrlValue)
    setPatientUrl(PatientUrlValue)

    axios
      .get(PatientUrlValue)
      .then((res) => {
        if (res.data.success) {
          let patientResult = []
          res.data.data.forEach((d, index) => {
            // (d) => (d.patientName = d.firstName + ' ' + d.lastName)
            d.patientId.patientName =
              d.patientId.firstName + ' ' + d.patientId.lastName
            patientResult.push(d.patientId)
          })

          setPatient(patientResult)
          console.log(res.data.data, 'get patient')
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

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  const addNewItem = () => {
    let path = `patientListing/add`
    props.history.push({
      pathname: path,
      state: { comingFor: 'add' },
    })
  }

  function handleEdit(rec) {
    let path = `patientListing/edit`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
      },
    })
  }

  const viewItem = (obj) => {
    if (obj !== '') {
      setitemModalVisible(true)
      setItem(obj)
      console.log(obj, 'obj')
    } else {
      setitemModalVisible(false)
      setItem('')
    }
  }

  const handlePatientSearch = (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)
    if (a.length >= 3) {
      axios
        .get(PatientUrl + '/' + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              let patientResult = []
              res.data.data.forEach((d, index) => {
                // (d) => (d.patientName = d.firstName + ' ' + d.lastName)
                d.patientId.patientName =
                  d.patientId.firstName + ' ' + d.patientId.lastName
                patientResult.push(d.patientId)
              })
              console.log(patientResult)

              setPatient(patientResult)
            } else {
              setPatient(' ')
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    } else if (a.length == 0) {
      getPatientData()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(19 213 159)',
        overflowY: 'scroll',
      }}
    >
      <Header />
      <div className='cPadding'>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={patientRegister} />
            <h4>Patient Registration</h4>
          </div>

          <div style={{ marginRight: '-10px' }}>
            <ButtonField onClick={addNewItem} name='add' />
            {/* <SearchField /> */}
          </div>
        </div>

        <div
          style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
          className={`${'container-fluid'} ${classes.root}`}
        >
          <div className='row' style={{ marginTop: '20px' }}>
            <div
              className='col-md-10 col-sm-9 col-8'
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
                <img src={BarCode} style={{ width: 70, height: 60 }} />
              </div>
            </div>

            <div
              className='col-md-1 col-sm-1 col-2'
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
        </div>
        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {patient !== ' ' ? (
            <div>
              <div>
                <CustomTable
                  tableData={patient}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  borderBottomColor={'#60d69f'}
                  handleView={viewItem}
                  borderBottomWidth={20}
                />
              </div>

              <Notification msg={errorMsg} open={openNotification} />

              <div style={{ marginBottom: 20, marginTop: 50 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : (
            // <div className='LoaderStyle'>
            //   <Loader type='TailSpin' color='red' height={50} width={50} />
            // </div>
            <div className='row ' style={{ marginTop: '25px' }}>
              <div className='col-11'>
                <h3
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                    position: 'absolute',
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className='col-1' style={{ marginTop: 45 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {itemModalVisible ? (
        <ViewPatient
          handleEdit={handleEdit}
          item={item}
          open={itemModalVisible}
          viewItem={viewItem}
        />
      ) : null}
    </div>
  )
}
