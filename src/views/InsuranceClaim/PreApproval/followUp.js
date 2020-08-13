/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import axios from 'axios'
import {
    getSingleEDRPatient,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import PreApproval from '../../../assets/img/Pre-Approval.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Notification from '../../../components/Snackbar/Notification.js'
import InputLabelComponent from '../../../components/InputLabel/inputLabel'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'
import ErrorMessage from '../../../components/ErrorMessage/errorMessage'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Back from '../../../assets/img/Back_Arrow.png'

const statusArray = [
    { key: '1 Week', value: '1 week' },
    { key: '2 Week', value: '2 week' },
    { key: '3 Week', value: '3 week' },
  ]

const styles = {
    patientDetails: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: '20px'
    },
    inputContainerForTextField: {
        marginTop: 25,
    },
    inputContainerForDropDown: {
        marginTop: 25,
    },
    stylesForButton: {
        color: 'white',
        cursor: 'pointer',
        borderRadius: 15,
        backgroundColor: '#2c6ddd',
        height: '50px',
        outline: 'none',
        width: '115px',
    },
    buttonContainer: {
        marginTop: 25,
    },
    stylesForLabel: {
        fontWeight: '700',
        color: 'gray',
    },
}

function AddEditPurchaseRequest(props) {

    const initialState = {
        status: '',
        approvalNumber: '',
        approvalPerson: ''
    }

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const {
        approvalNumber,
        approvalPerson,
        status
    } = state

    const onChangeValue = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const [, setCurrentUser] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [openNotification, setOpenNotification] = useState(false)
    const [, setSelectedItem] = useState('')
    const [selectedPatient, setSelectedPatient] = useState('')
    const [requestNo, setrequestNo] = useState('')
    const [, setId] = useState('')
    const [isFormSubmitted] = useState(false)

    useEffect(() => {
        setCurrentUser(cookie.load('current_user'))

        console.log(props.history.location.state.selectedItem)

        // const selectedRec = props.history.location.state.selectedItem

        setId(props.history.location.state.selectedItem._id)
        // setSelectedItem(props.history.location.state.selectedItem)
        setrequestNo(props.history.location.state.selectedItem.requestNo)
        setSelectedPatient(props.history.location.state.selectedItem.patientId)

        getEDRdetails()

    }, [])

    function getEDRdetails() {
        axios.get(
            getSingleEDRPatient +
            '/' +
            props.history.location.state.selectedItem._id)
            .then((res) => {
                if (res.data.success) {
                    console.log('response after getting the EDR details', res.data.data[0])
                    setSelectedItem(res.data.data[0])
                    const selectedRec = res.data.data[0]

                    if (selectedRec) {
                        Object.entries(selectedRec).map(([key, val]) => {
                            if (val && typeof val === "object") {
                                if (key === "patientId") {
                                    dispatch({ field: "patientId", value: val._id });
                                }
                                else if (key === "labRequest") {
                                    dispatch({ field: "labRequestArray", value: val });
                                }
                                else if (key === "radiologyRequest") {
                                    dispatch({ field: "radiologyRequestArray", value: val });
                                }
                                else if (key === "consultationNote") {
                                    Object.entries(val).map(([key1, val1]) => {
                                        if (key1 == "requester") {
                                            dispatch({ field: "requester", value: val1._id });
                                        }
                                        else {
                                            dispatch({ field: key1, value: val1 });
                                        }
                                    })
                                    dispatch({ field: "consultationNoteArray", value: val });
                                }
                                else if (key === "residentNotes") {
                                    Object.entries(val).map(([key1, val1]) => {
                                        if (key1 == "doctor") {
                                            dispatch({ field: "doctor", value: val1._id });
                                        }
                                        else {
                                            dispatch({ field: key1, value: val1 });
                                        }
                                    })
                                    dispatch({ field: "residentNoteArray", value: val });
                                }
                                else if (key === "pharmacyRequest") {
                                    dispatch({ field: "pharmacyRequestArray", value: val })
                                }
                            } else {
                                dispatch({ field: key, value: val });
                            }
                        });
                    }

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

    const handleUpdate = () => {
        alert("YESHHH")
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
                        <img src={PreApproval} />
                        <h4>Pre-Approval</h4>
                    </div>
                </div>

                <div style={{
                    height: '20px'
                }}
                />

                <div className="container-fluid" style={styles.patientDetails}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4 style={{ color: 'blue', fontWeight: '600' }}>Patient Details</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 col-sm-4 col-4'>
                            <div style={styles.inputContainerForTextField}>
                                <InputLabel style={styles.stylesForLabel} id='status-label'>
                                    Patient Name
                  </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Patient Name'
                                    name={'patientName'}
                                    //   value={selectedPatient.firstName + ` ` + selectedPatient.lastName}
                                    onChange={onChangeValue}
                                    className='textInputStyle'
                                />
                            </div>
                        </div>
                        <div className='col-md-4 col-sm-4 col-4'>
                            <div style={styles.inputContainerForTextField}>
                                <InputLabel style={styles.stylesForLabel} id='status-label'>
                                    Gender
                </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Gender'
                                    name={'gender'}
                                    //   value={selectedPatient.gender}
                                    onChange={onChangeValue}
                                    className='textInputStyle'
                                />
                            </div>
                        </div>
                        <div className='col-md-4 col-sm-4 col-4'>
                            <div style={styles.inputContainerForTextField}>
                                <InputLabel style={styles.stylesForLabel} id='status-label'>
                                    Age
                  </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Age'
                                    name={'age'}
                                    //   value={selectedPatient.age}
                                    onChange={onChangeValue}
                                    className='textInputStyle'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4 col-sm-4 col-4'>
                            <div style={styles.inputContainerForTextField}>
                                <InputLabel style={styles.stylesForLabel} id='status-label'>
                                    MRN Number
                  </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Patient ID'
                                    name={'patientId'}
                                    //   value={selectedPatient.profileNo}
                                    onChange={onChangeValue}
                                    className='textInputStyle'
                                />
                            </div>
                        </div>

                        <div className='col-md-4 col-sm-4 col-4'>
                            <div style={styles.inputContainerForTextField}>
                                <InputLabel style={styles.stylesForLabel} id='status-label'>
                                    Insurance No
                  </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Insurance Number'
                                    name={'insuranceId'}
                                    //   value={selectedPatient.insuranceId ? selectedPatient.insuranceId : '--'}
                                    onChange={onChangeValue}
                                    className='textInputStyle'
                                />
                            </div>
                        </div>
                        <div className='col-md-4 col-sm-4 col-4'>
                            <div style={styles.inputContainerForTextField}>
                                <InputLabel style={styles.stylesForLabel} id='status-label'>
                                    Request No
                  </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Request Number'
                                    name={'requestNo'}
                                    //   value={requestNo}
                                    onChange={onChangeValue}
                                    className='textInputStyle'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    height: '20px'
                }}
                />

                <div className="container-fluid" style={styles.patientDetails}>
                    <div className='row'>

                    </div>
                </div>

                <div style={{
                    height: '20px'
                }}
                />
                <div className="container-fluid">
                    <div className='row'>
                        <div
                            className='col-md-12 col-sm-12 col-12'
                            style={styles.inputContainerForDropDown}
                        >
                            <InputLabelComponent>Status*</InputLabelComponent>
                            <Select
                                fullWidth
                                id='status'
                                name='status'
                                value={status}
                                onChange={onChangeValue}
                                label='Status'
                                className='dropDownStyle'
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
                            </Select>
                            <ErrorMessage
                                name={status}
                                isFormSubmitted={isFormSubmitted}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div
                            className='col-md-6 col-sm-6 col-6'
                            style={styles.inputContainerForTextField}
                        >
                            <InputLabelComponent>Approval Number*</InputLabelComponent>
                            <input
                                style={styles.inputField}
                                type='text'
                                placeholder='Approval Number'
                                name={'approvalNumber'}
                                value={approvalNumber}
                                onChange={onChangeValue}
                                className='textInputStyle'
                            />
                            <ErrorMessage
                                name={approvalNumber}
                                isFormSubmitted={isFormSubmitted}
                            />
                        </div>
                        <div
                            className='col-md-6 col-sm-6 col-6'
                            style={styles.inputContainerForTextField}
                        >
                            <InputLabelComponent>Approval Person*</InputLabelComponent>
                            <input
                                style={styles.inputField}
                                type='text'
                                placeholder='Approval Person'
                                name={'approvalPerson'}
                                value={approvalPerson}
                                onChange={onChangeValue}
                                className='textInputStyle'
                            />
                            <ErrorMessage
                                name={approvalPerson}
                                isFormSubmitted={isFormSubmitted}
                            />
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div
                        className='row'
                        style={{ marginTop: '25px', marginBottom: '25px' }}
                    >
                        <div className='col-md-6 col-sm-6 col-6'>
                        <img
                            onClick={() => props.history.goBack()}
                            src={Back}
                            style={{ width: 45, height: 35, cursor: 'pointer' }}
                        />
                        </div>

                        <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
                        <Button
                            style={styles.stylesForButton}
                            // disabled={!validateForm()}
                            onClick={handleUpdate}
                            variant='contained'
                            color='primary'
                        >
                            <strong style={{ fontSize: '12px' }}>Update</strong>
                        </Button>
                        </div>
                    </div>
                </div>

                <Notification msg={errorMsg} open={openNotification} />

            </div>
        </div>
    )
}
export default AddEditPurchaseRequest

