/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import Button from "@material-ui/core/Button";
import { FaUpload } from "react-icons/fa";
import Notification from "../../../components/Snackbar/Notification.js";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import IPR from "../../../assets/img/IPR.png";
import Back_Arrow from "../../../assets/img/Back_Arrow.png";
import InputLabel from '@material-ui/core/InputLabel'
import {
    addfollowup,
    uploadsUrl
} from "../../../public/endpoins";
import Loader from 'react-loader-spinner'
import axios from 'axios'

const styles = {
    stylesForButton: {
        color: "white",
        cursor: "pointer",
        borderRadius: 15,
        backgroundColor: "#2c6ddd",
        width: "130px",
        height: "45px",
        outline: "none",
    },
    save: {
        color: "white",
        cursor: "pointer",
        borderRadius: 15,
        backgroundColor: "#ba55d3",
        width: "130px",
        height: "45px",
        outline: "none",
    },
    form: {
        backgroundColor: "white",
        borderRadius: "10px",
        marginTop: "20px",
        padding: "10px",
        textAlign: "center",
    },
    upload: {
        backgroundColor: "white",
        border: "0px solid #ccc",
        borderRadius: 15,
        color: "gray",
        width: "100%",
        height: "45px",
        cursor: "pointer",
        padding: "10px",
        marginTop: '10px'
    },
    input: {
        display: "none",
    },
    patientDetails: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: '10px'
    },
    inputContainerForTextField: {
        marginTop: 10,
    },
    styleForLabel: {
        paddingTop: 25,
        fontWeight: "700",
        color: "gray",
    },
    inputStyles: {
        outline: 'none',
    },
};

function AddEditEDR(props) {
    const initialState = {
        date: '',
        status: '',
        description: '',
        doctorName: cookie.load("current_user").name,
        requester: '',
        file: '',
        doctor: cookie.load("current_user").staffId,
        followUpArray: ''
    };

    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        };
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        date,
        status,
        description,
        doctorName = cookie.load("current_user").name,
        requester,
        file,
        doctor = cookie.load("current_user").staffId,
        followUpArray
    } = state;

    const onChangeValue = (e) => {
        dispatch({ field: e.target.name, value: e.target.value });
    };

    const [comingFor, setcomingFor] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);
    const [followUpid, setfollowUpid] = useState("");
    const [id, setid] = useState("");
    const [, setrequestNo] = useState("");
    const [DocumentUpload, setDocumentUpload] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [pdfView, setpdfView] = useState('')

    useEffect(() => {
        // const soc = socketIOClient(socketUrl);
        // setSocket(soc);
        // soc.emit("connection");
        setCurrentUser(cookie.load("current_user"));
        setcomingFor(props.history.location.state.comingFor);

        const selectedRec = props.history.location.state.selectedItem;
        const selectedFollowUp = props.history.location.state.followUpItem;
        // console.log("Selected Item", props.history.location.state.selectedItem);
        // console.log("Follow Up Item", props.history.location.state.followUpItem);

        setfollowUpid(props.history.location.state.followUpItem._id);
        setid(props.history.location.state.selectedItem._id);
        setrequestNo(props.history.location.state.selectedItem.requestNo);

        if (selectedRec) {
            Object.entries(selectedRec).map(([key, val]) => {
                if (val && typeof val === "object") {
                    if (key === "followUp") {
                        dispatch({ field: "followUpArray", value: val });
                        //   console.log(key,val)
                    }
                } else {
                    dispatch({ field: key, value: val });
                }
            });
        }
        if (selectedFollowUp) {
            Object.entries(selectedFollowUp).map(([key, val]) => {
                if (val && typeof val === "object") {
                    dispatch({ field: key, value: val._id })
                } else {
                    dispatch({ field: key, value: val });
                }
            });
        }

        // return () => soc.disconnect();
    }, []);

    if (openNotification) {
        setTimeout(() => {
            setOpenNotification(false);
            setErrorMsg("");
        }, 2000);
    }

    // function validateItemsForm() {
    //     return (
    //         itemId &&
    //         itemId.length > 0 &&
    //         medicineName &&
    //         medicineName.length > 0 &&
    //         priority &&
    //         priority.length > 0 &&
    //         schedule &&
    //         schedule.length > 0 &&
    //         duration &&
    //         duration.length > 0 &&
    //         frequency &&
    //         frequency.length > 0 &&
    //         requestedQty &&
    //         requestedQty.length > 0 &&
    //         dosage &&
    //         dosage.length > 0
    //     );
    // }

    const onDocumentUpload = (event) => {
        var file = event.target.files[0]
        var fileType = file.name.slice(file.name.length - 3)

        setDocumentUpload(file);
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            if (fileType === 'pdf') {
                setpdfView(file.name)
            }
            else {
                setImagePreview([reader.result])
            }
        };
    };

    const submitFollowUp = () => {

        for (let i = 0; i < followUpArray.length; i++) {
            if (followUpArray[i].date === date) {
                followUpArray[i] = {
                    ...followUpArray[i],
                    description: description,
                    doctorName: currentUser.name,
                    requester: followUpArray[i].requester,
                    status: 'Sent for PAR',
                    doctor: doctor,
                    file: file,
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
        // console.log('PARAMSS ', params)
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
                    console.log("response after submitting followUp Request", res.data);
                    props.history.goBack();
                } else if (!res.data.success) {
                    setOpenNotification(true);
                }
            })
            .catch((e) => {
                console.log("error after submitting followUp Request", e);
                setOpenNotification(true);
                setErrorMsg("Error while submitting the follow Up Request");
            });
    }

    return (
        <div
            style={{
                backgroundColor: "#60d69f",
                position: "fixed",
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                flex: 1,
                overflowY: "scroll",
            }}
        >
            <Header />
            <div className="cPadding">
                <div className="subheader">
                    <div>
                        <img src={IPR} />
                        <h4>In Patient Request</h4>
                    </div>
                </div>

                <div
                    style={{ flex: 4, display: "flex", flexDirection: "column", marginTop: '20px' }}
                    className="container"
                >
                    <div className='row' style={styles.patientDetails}>
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

                    {comingFor === 'add' ? (
                        <>
                            <div className='row'>
                                <label style={styles.upload}>
                                    <input
                                        type="file"
                                        style={styles.input}
                                        onChange={onDocumentUpload}
                                        name="file"
                                        required
                                    />
                                    <FaUpload />&nbsp;&nbsp;&nbsp;Upload File
                            </label>
                                {pdfView !== "" ? (
                                    <div className="col-md-12 col-sm-12 col-12"
                                        style={{ textAlign: 'center', color: '#2c6ddd', fontStyle: 'italic' }}
                                    >
                                        <span style={{ color: 'black' }}>Selected File : </span>{pdfView}
                                    </div>
                                ) : (
                                        undefined
                                    )}
                            </div>
                            <div className='row'>
                                {file !== "" && file.includes('\\') ? (
                                    <>
                                        {file !== "" && file.slice(file.length - 3) !== 'pdf' ? (
                                            <div className='col-md-6 col-sm-6 col-6'
                                                style={{
                                                    ...styles.inputContainerForTextField,
                                                    ...styles.textFieldPadding,
                                                }}>

                                                <img src={uploadsUrl + file.split('\\')[1]} className="depositSlipImg" />
                                            </div>
                                        ) : file !== "" && file.slice(file.length - 3) === 'pdf' ? (
                                            <div className='col-md-6 col-sm-6 col-6'
                                                style={{
                                                    ...styles.inputContainerForTextField,
                                                    ...styles.textFieldPadding,
                                                    // textAlign:'center',
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
                                                    ...styles.textFieldPadding,
                                                }}>

                                                <img src={uploadsUrl + file} className="depositSlipImg" />
                                            </div>
                                        ) : file !== "" && file.slice(file.length - 3) === 'pdf' ? (
                                            <div className='col-md-6 col-sm-6 col-6'
                                                style={{
                                                    ...styles.inputContainerForTextField,
                                                    ...styles.textFieldPadding,
                                                    // textAlign:'center',
                                                }}>
                                                <a href={uploadsUrl + file} style={{ color: '#2c6ddd' }}>Click here to open file</a>
                                            </div>
                                        ) : (
                                                    undefined
                                                )}
                                    </>
                                ) : (
                                            undefined
                                        )}

                                {imagePreview !== "" ? (
                                    <div className='col-md-6 col-sm-6 col-6'
                                        style={{
                                            ...styles.inputContainerForTextField,
                                            ...styles.textFieldPadding,
                                        }}>
                                        <img src={imagePreview} className="depositSlipImg" />
                                        {file !== "" ? (
                                            <div
                                                style={{ color: 'black', textAlign: 'center' }}
                                            >
                                                New file
                                            </div>

                                        ) : (
                                                undefined
                                            )}

                                    </div>
                                ) : (
                                        undefined
                                    )}
                            </div>
                        </>
                    ) : (
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
                                ) : (
                                        undefined
                                    )}
                            </div>
                        )}

                    <div style={{
                        display: "flex", flex: 1, justifyContent: "center", marginTop: "2%",
                        marginBottom: "2%",
                    }}>
                        <img
                            onClick={() => props.history.goBack()}
                            src={Back_Arrow}
                            style={{ width: 45, height: 35, cursor: "pointer" }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                justifyContent: "flex-end",
                            }}
                        >
                            {comingFor === "add" ? (
                                <Button
                                    style={styles.stylesForButton}
                                    //disabled={!validateFormType1()}
                                    onClick={submitFollowUp}
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            ) : (
                                    undefined
                                )}

                        </div>
                    </div>

                    <Notification msg={errorMsg} open={openNotification} />

                </div>
            </div >
        </div >
    );
}
export default AddEditEDR;
