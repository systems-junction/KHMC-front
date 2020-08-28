/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import Notification from '../../components/Snackbar/Notification.js'
import CustomTable from '../../components/Table/Table'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import {
  getIPRUrl,
  getSearchedpatient,
  // getMaterialReceivingUrl
} from '../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../assets/img/Back_Arrow.png'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/Material Receiving.png'
import IPR from '../../assets/img/IPR.png'
import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import socketIOClient from 'socket.io-client'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import PatientDetails from '../ProfessionalOrderForMedical/patientDetailsDialog'

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    width: '130px',
    height: '45px',
    outline: 'none',
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
  save: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#ba55d3',
    width: '130px',
    height: '45px',
    outline: 'none',
  },
  generate: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#e877a1',
    height: '45px',
    outline: 'none',
  },
  None: {
    display: 'none',
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
    borderRadius: '6px',
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

const useStyles = makeStyles((theme) => ({
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
    '& .Mui-disabled': {
      backgroundColor: 'white',
      color: 'gray',
    },
  },
}))

export default function EDR(props) {
  const classes = useStyles()
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [searchPatientQuery, setSearchPatientQuery] = useState('')
  const [patientFoundSuccessfull, setpatientFoundSuccessfully] = useState(false)
  const [patientFound, setpatientFound] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [selectedPatientArray, setSelectedPatientArray] = useState([])
  const [patientDetails, setPatientDetails] = useState('')

  const [patientDetailsDialog, openPatientDetailsDialog] = useState(false)

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  // useEffect(() => {}, [])

  const handlePatientSearch = (e) => {
    setSearchPatientQuery(e.target.value)
    if (e.target.value.length >= 3) {
      axios
        .get(getSearchedpatient + '/' + e.target.value)
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
    // setDialogOpen(true);
    setSelectedPatient(i)
    console.log('selected banda', i)
    // dispatch({ field: 'patientReferenceNo', value: i.profileNo })

    // dispatch({ field: "itemCode", value: i.itemCode });
    // dispatch({ field: "itemName", value: i.name });
    // dispatch({ field: "itemType", value: i.cls });
    // dispatch({ field: "vendorId", value: i.vendorId });
    // dispatch({ field: "description", value: i.description });
    // dispatch({ field: "maximumLevel", value: i.maximumLevel });
    // dispatch({ field: "issueUnit", value: i.issueUnit });
    // dispatch({ field: "receiptUnit", value: i.receiptUnit });
    // dispatch({ field: "form", value: i.form });
    // dispatch({ field: "medClass", value: i.medClass });
    // dispatch({ field: "scientificName", value: i.scientificName });
    // dispatch({ field: "tradeName", value: i.tradeName });

    setPatientDetails(i)
    openPatientDetailsDialog(true)

    const obj = {
      itemCode: i.itemCode,
    }

    setSelectedPatientArray((pervState) => [...pervState, obj])
    setSearchPatientQuery('')
  }

  function showPatientDetails() {
    openPatientDetailsDialog(false)
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
        backgroundColor: '#60d69f',
        overflowY: 'scroll',
      }}
    >
      <Header />

      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={IPR} />
            <h4>In Patient Requests</h4>
          </div>
          {/* <div>
            <img onClick={addNewItem} src={Add_New} />
            <img src={Search} />
          </div> */}
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <div className='row'>
              {/* <span class="fa fa-search"></span> */}
              <div className='col-sm-11' style={styles.textFieldPadding}>
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
                    // endAdornment: (
                    //   <InputAdornment position="end">
                    //     <AccountCircle />
                    //   </InputAdornment>
                    // ),
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
                className='col-sm-1'
                style={{
                  ...styles.textFieldPadding,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 4,
                }}
              >
                {/* <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} /> */}
              </div>
            </div>

            {searchPatientQuery ? (
              <div
                style={{
                  zIndex: 3,
                  position: 'absolute',
                  width: '96%',
                  left: '2%',
                  marginTop: 5,
                }}
              >
                <Paper>
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

          {patientDetails && patientDetailsDialog ? (
            <PatientDetails
              patientDetails={patientDetails}
              showPatientDetails={showPatientDetails}
            />
          ) : (
            undefined
          )}

          {/* {Edr ? (
            <div>
              <div></div>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: 'pointer',
                  }}
                />
              </div>
              <Notification msg={errorMsg} open={openNotification} />
            </div>
          ) : (
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}
