import React, { useEffect, useState, useReducer } from 'react'
import cookie from "react-cookies";
import Header from "../../components/Header/Header";
import ConsultantIcon from "../../assets/img/ECR.png";
import NurseIcon from "../../assets/img/Assessment & Diagnosis.png";
import DoctorIcon from "../../assets/img/Lab-Rad Request.png";
import LabIcon from "../../assets/img/Consultation Request.png";
import RadIcon from "../../assets/img/PatientAssessment.png";
import PharmacistIcon from "../../assets/img/PatientCare.png";
import InsuranceIcon from "../../assets/img/PatientCare.png";
import Back from "../../assets/img/Back_Arrow.png";
import { MdRefresh } from 'react-icons/md'
import './dashboard.css';

function Dashboard(props) {
    const initialState = {
    }
    function reducer(state, { field, value }) {
        return {
            ...state,
            [field]: value,
        };
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const { } = state

    const [currentUser] = useState(cookie.load("current_user"));

    useEffect(() => {
        console.log("Current user >> ", cookie.load("current_user"))
    }, [])

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#2B62CC",
            }}
        >

            <Header history={props.history} />
            <div className="cPadding">
                <div className="subheader">
                    <div>
                        {currentUser.staffTypeId.type === "Registered Nurse" ? (
                            <img src={NurseIcon} />
                        ) : currentUser.staffTypeId.type === "Doctor/Physician" ? (
                            <img src={DoctorIcon} />
                        ) : currentUser.staffTypeId.type === "Consultant/Specialist" ? (
                            <img src={ConsultantIcon} />
                        ) : currentUser.staffTypeId.type === "Radiology/Imaging" ? (
                            <img src={RadIcon} />
                        ) : currentUser.staffTypeId.type === "Lab Technician" ? (
                            <img src={LabIcon} />
                        ) : currentUser.staffTypeId.type === "Pharmacist" ? (
                            <img src={PharmacistIcon} />
                        ) : currentUser.staffTypeId.type === "Insurance Department" ? (
                            <img src={InsuranceIcon} />
                        ) : (
                                                        undefined
                                                    )}
                        <h4>
                            {currentUser.staffTypeId.type === "Registered Nurse" ? (
                                'Registered Nurse'
                            ) : currentUser.staffTypeId.type === "Doctor/Physician" ? (
                                'Doctor / Physician'
                            ) : currentUser.staffTypeId.type === "Consultant/Specialist" ? (
                                'Consultant'
                            ) : currentUser.staffTypeId.type === "Radiology/Imaging" ? (
                                'Rad Technician'
                            ) : currentUser.staffTypeId.type === "Lab Technician" ? (
                                'Lab Technician'
                            ) : currentUser.staffTypeId.type === "Pharmacist" ? (
                                'Pharmacist'
                            ) : currentUser.staffTypeId.type === "Insurance Department" ? (
                                'Insurance Claims Manager'
                            ) : (
                                                            undefined
                                                        )}
                        </h4>
                    </div>
                    <div>
                        <span className='subheader-span'>UPDATED LAST 3 MINUTES</span><MdRefresh size={32} color='white' />
                    </div>

                </div>
                <div className='container-fluid'>
                    <div className='row first-chunk'>
                        <div className='dashboard-chunk col-md-4 col-sm-4 col-4'>
                            <div className='dashboard-chunk-area'>
                                <div className='dashboard-chunk-area-heading row'>
                                    <h4>My Apps</h4>
                                </div>
                                <div className='row'>
                                    My Apps Icon
                            </div>
                            </div>
                        </div>
                        <div className='dashboard-chunk col-md-8 col-sm-8 col-8'>
                            <div className='dashboard-chunk-area'>
                                <div className='dashboard-chunk-area-heading row'>
                                    <h4>Notifications</h4>
                                </div>
                                <div className='row'>
                                    Notifications rows
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className='row all-chunk'>
                        <div className='dashboard-chunk col-md-6 col-sm-6 col-6'>
                            <div className='dashboard-chunk-area'>
                                <div className='dashboard-chunk-area-heading row'>
                                    <h4>ED Beds Available</h4>
                                </div>
                                <div className='row'>
                                    85
                            </div>
                            </div>
                        </div>
                        <div className='dashboard-chunk col-md-6 col-sm-6 col-6'>
                            <div className='dashboard-chunk-area'>
                                <div className='dashboard-chunk-area-heading row'>
                                    <h4>IP Beds Available</h4>
                                </div>
                                <div className='row'>
                                    70
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Dashboard