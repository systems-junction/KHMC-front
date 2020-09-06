/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import axios from 'axios'
import {
    addfollowup,
    uploadsUrl
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
import Loader from 'react-loader-spinner'

const statusArray = [
    { key: 'Approved', value: 'approved' },
    { key: 'Reject', value: 'reject' },
    { key: 'Pending', value: 'pending' },
    { key: 'Sent for PAR', value: 'Sent for PAR' },
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
        date: '',
        status: '',
        approvalNumber: '',
        approvalPerson: '',
        description: '',
        file: '',
        doctor: '',
        followUpArray: ''
    }

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const {
        date,
        approvalNumber,
        approvalPerson,
        status,
        description,
        file,
        doctor,
        followUpArray
    } = state

    const onChangeValue = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const [currentUser, setCurrentUser] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [openNotification, setOpenNotification] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')
    const [selectedPatient, setselectedPatient] = useState('')
    const [id, setId] = useState('')
    const [followUpid, setfollowUpid] = useState("");
    const [isFormSubmitted] = useState(false)
    const [DocumentUpload, setDocumentUpload] = useState("");

    useEffect(() => {
        setCurrentUser(cookie.load('current_user'))
        console.log("selected rec ", props.history.location.state.selectedItem)

        setSelectedItem(props.history.location.state.selectedItem)
        setselectedPatient(props.history.location.state.selectedItem.mrn)

        setId(props.history.location.state.followUp._id)
        setfollowUpid(props.history.location.state.selectedItem._id)

        const selectedfollowUp = props.history.location.state.followUp
        const selectedRec = props.history.location.state.selectedItem

        if (selectedRec) {
            Object.entries(selectedRec).map(([key, val]) => {
                if (val && typeof val === "object") {
                    if (key === "approvalPerson") {
                        dispatch({ field: key, value: val })
                    }
                    else {
                        dispatch({ field: key, value: val._id })
                    }
                } else {
                    dispatch({ field: key, value: val });
                }
            });
        }
        if (selectedfollowUp) {
            Object.entries(selectedfollowUp).map(([key, val]) => {
                if (val && typeof val === "object") {
                    if (key === "followUp") {
                        dispatch({ field: "followUpArray", value: val });
                        //   console.log(key,val)
                    }
                }
            });
        }
    }, [])

    if (openNotification) {
        setTimeout(() => {
            setOpenNotification(false)
            setErrorMsg('')
        }, 2000)
    }

    const handleUpdate = () => {

        for (let i = 0; i < followUpArray.length; i++) {
            if (followUpArray[i].date === date) {
                followUpArray[i] = {
                    ...followUpArray[i],
                    description: description,
                    doctorName: followUpArray[i].doctorName,
                    requester: followUpArray[i].requester,
                    status: status,
                    doctor: followUpArray[i].doctor,
                    file: followUpArray[i].file,
                    approvalNumber: approvalNumber,
                    approvalPerson: currentUser.staffId
                }
            }
        }
        // console.log("FOLLOW UP SUBMITTED ",followUpArray)
        let formData = new FormData()
        if (DocumentUpload) {
            formData.append('file', DocumentUpload, DocumentUpload.name)
        }
        const params = {
            IPRId: id,
            followUpId: followUpid,
            followUp: followUpArray,
        };
        formData.append('data', JSON.stringify(params))
        console.log('PARAMSS ', params)
        axios
            .put(addfollowup, formData, {
                headers: {
                    accept: 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'content-type': 'multipart/form-data',
                },
            })
            .then((res) => {
                if (res.data.success) {
                    console.log("response after Updating followUp Request", res.data);
                    props.history.push({
                        pathname: 'success',
                        state: { message : 'FollowUp Submitted successfully' },
                      })
                } else if (!res.data.success) {
                    setOpenNotification(true);
                }
            })
            .catch((e) => {
                console.log("error after Updating followUp Request", e);
                setOpenNotification(true);
                setErrorMsg("Error while Updating the follow Up Request");
            });
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
                                    value={selectedPatient.firstName + ` ` + selectedPatient.lastName}
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
                                    value={selectedPatient.gender}
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
                                    value={selectedPatient.age}
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
                                    MRN
                  </InputLabel>
                                <input
                                    disabled={true}
                                    type='text'
                                    placeholder='Patient ID'
                                    name={'patientId'}
                                    value={selectedPatient.profileNo}
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
                                    value={selectedPatient.insuranceId ? selectedPatient.insuranceId : '--'}
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
                                    value={selectedItem.requestNo}
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
                        <div className="col-md-12">
                            <InputLabel style={styles.styleForLabel}>Extension Notes</InputLabel>
                            <textarea
                                style={styles.inputStyles}
                                placeholder="Enter Extension Notes here..."
                                name={"description"}
                                value={description}
                                onChange={onChangeValue}
                                rows="4"
                                className='textInputStyle'
                            />
                        </div>
                    </div>
                </div>

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
                                        <MenuItem key={val.key} value={val.value}>
                                            {val.key}
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
                                value={approvalPerson
                                    ? approvalPerson.firstName + ' ' + approvalPerson.lastName : currentUser.name
                                }
                                onChange={onChangeValue}
                                className='textInputStyle'
                            />
                            <ErrorMessage
                                name={approvalPerson}
                                isFormSubmitted={isFormSubmitted}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        {file !== "" && file.includes('\\') ? (
                            <>
                                {file !== "" && file.slice(file.length - 3) !== 'pdf' ? (
                                    <div className='col-md-6 col-sm-6 col-6'
                                        style={{
                                            ...styles.inputContainerForTextField,
                                        }}>

                                        <img src={uploadsUrl + file.split('\\')[1]} className="depositSlipImg" />
                                    </div>
                                ) : file !== "" && file.slice(file.length - 3) === 'pdf' ? (
                                    <div className='col-md-6 col-sm-6 col-6'
                                        style={{
                                            ...styles.inputContainerForTextField,
                                        }}>
                                        <a href={uploadsUrl + file.split('\\')[1]} style={{ color: '#2c6ddd' }}>Click here to open file</a>
                                    </div>
                                ) : (
                                        undefined
                                    )}
                            </>
                        ) : file !== "" && file.includes('/') ? (
                                <>
                                    {file !== "" && file.slice(file.length - 3) !== 'pdf' ? (
                                        <div className='col-md-6 col-sm-6 col-6'
                                            style={{
                                                ...styles.inputContainerForTextField,
                                            }}>

                                            <img src={uploadsUrl + file} className="depositSlipImg" />
                                        </div>
                                    ) : file !== "" && file.slice(file.length - 3) === 'pdf' ? (
                                        <div className='col-md-6 col-sm-6 col-6'
                                            style={{
                                                ...styles.inputContainerForTextField,
                                            }}>
                                            <a href={uploadsUrl + file} style={{ color: '#2c6ddd' }}>Click here to open file</a>
                                        </div>
                                    ) : (
                                            undefined
                                        )}
                                </>

                            ):(
                        undefined
                    )}
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

