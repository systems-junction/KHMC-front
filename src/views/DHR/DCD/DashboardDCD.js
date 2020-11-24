import React, { useEffect, useState, useReducer } from "react";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import Button from "@material-ui/core/Button";
import ConsultantIcon from "../../../assets/img/ECR.png";
import NurseIcon from "../../../assets/img/Assessment & Diagnosis.png";
import DcdIcon from "../../../assets/img/DCD Form Icon.png";
import DoctorIcon from "../../../assets/img/Lab-Rad Request.png";
import LabIcon from "../../../assets/img/Consultation Request.png";
import RadIcon from "../../../assets/img/PatientAssessment.png";
import PharmacistIcon from "../../../assets/img/PatientCare.png";
import InsuranceIcon from "../../../assets/img/PatientCare.png";
import TriageBoxIcon from "../../../assets/img/Triage & Assessment.png";
import PatientDetailBoxIcon from "../../../assets/img/Patient Details.png";
import PastMedicalBoxIcon from "../../../assets/img/Past Medical History.png";
import RosBoxIcon from "../../../assets/img/ROS.png";
import PhysicalBoxIcon from "../../../assets/img/Physical Exam.png";
import InvestigationsBoxIcon from "../../../assets/img/Investigations.png";
import ActionPlanBoxIcon from "../../../assets/img/Action & Plan.png";
import CourseVisitBoxIcon from "../../../assets/img/Course of Visit.png";

import TickIcon from "../../../assets/img/Tick Icon.png";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "../../../components/DHR/DCD/Box";

import GuageIcon from "../../../assets/img/25.png";

import Back from "../../../assets/img/Back_Arrow.png";
import { MdRefresh, MdKeyboardArrowRight } from "react-icons/md";
import "./dashboardDCD.css";

const styles = {
  stylesForSave: {
    color: "#fff",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#13D59F",
    width: "150px",
    height: "50px",
    outline: "none",
  },
};

function DashboardDCD(props) {
  const matches = useMediaQuery("(min-width:600px)");
  // const classes = useStyles();
  const initialState = {};
  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const {} = state;

  const [currentUser] = useState(cookie.load("current_user"));

  useEffect(() => {
    console.log("Current user >> ", cookie.load("current_user"));
  }, []);

  const clickhandler = () => {
    console.log("hellow i am triage Box1");
  };
  function doSomething1() {
    return console.log("hellow i am  Box2");
  }

  function doSomething2() {
    return console.log("hellow i am triage Box1");
  }
  function doSomething3() {
    return console.log("hellow i am triage Box1");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#2973CF",
        overflow: "auto",
        paddingBottom: "30px",
      }}
    >
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={DcdIcon} />
            {/* {currentUser.staffTypeId.type === "Registered Nurse" ? (
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
                                                    )} */}
            <h4>
              DCD Form
              {/* {currentUser.staffTypeId.type === "Registered Nurse" ? (
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
                                                        )} */}
            </h4>
          </div>
          {/* <div>
                        <span className='subheader-span'>UPDATED LAST 3 MINUTES</span><MdRefresh size={32} color='white' />
                    </div> */}
        </div>
        <div className="container-fluid">
          <div className="row first-chunk">
            <div
              className="dashboard-chunk col-md-7"
              style={{ marginBottom: matches ? " " : 10 }}
            >
              <Box
                backgroundColor={" #0011ff"}
                title="Triage & Assessment"
                detail="Add Patient triage and assessment details"
                numberCount="1"
                boxIcon={TriageBoxIcon}
              />
            </div>
            <div className="dashboard-chunk col-md-5">
              <div>
                <Box
                  backgroundColor={"#fa0223"}
                  title="Patient Details"
                  detail="Add patient details"
                  numberCount="2"
                  boxIcon={PatientDetailBoxIcon}
                />
              </div>
            </div>
          </div>

          <div className="row first-chunk">
            <div className="dashboard-chunk col-md-9">
              <div>
                <Box
                  clickhandler={clickhandler}
                  backgroundColor={" #57bd5a"}
                  title="Past Medical History"
                  detail="Bio data & History of Present Illness-HP1 "
                  numberCount="3"
                  boxIcon={PastMedicalBoxIcon}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  marginTop={0}
                  bottom={matches ? 220 : 430}
                  bottom4Icon={matches ? 232 : 440}
                />
              </div>
              <div className="row first-chunk">
                <div
                  className="dashboard-chunk col-md-6"
                  style={{
                    paddingLeft: 16,
                    paddingRight: matches ? "" : 12,
                    marginBottom: matches ? " " : 10,
                  }}
                >
                  <Box
                    onclick={doSomething1()}
                    backgroundColor={"#e65120"}
                    title="ROS"
                    detail="Add ROS details"
                    numberCount="4"
                    boxIcon={RosBoxIcon}
                    right1={17}
                  />
                </div>

                <div
                  className="dashboard-chunk col-md-6"
                  style={{ paddingRight: 10, paddingLeft: 16 }}
                >
                  <Box
                    backgroundColor={"#fbce49"}
                    title="Physical Exam"
                    detail="Add Patient Physical exam details"
                    numberCount="5"
                    boxIcon={PhysicalBoxIcon}
                    right1={17}
                    right4Icon={7}
                  />
                </div>
              </div>
            </div>
            <div className="dashboard-chunk col-md-3">
              <Box
                title="Investigations"
                detail="Investigate the patient"
                numberCount="6"
                boxIcon={InvestigationsBoxIcon}
                backgroundColor={" #0011ff"}
                height1={matches ? 410 : 200}
              />
            </div>
          </div>
          <div className="row first-chunk">
            <div
              className="dashboard-chunk col-md-7"
              style={{ marginBottom: matches ? " " : 10 }}
            >
              <Box
                backgroundColor={" #0011ff"}
                title="Action & Plan"
                detail="Action & Plan agianst the patient"
                numberCount="7"
                boxIcon={ActionPlanBoxIcon}
              />
            </div>
            <div className="dashboard-chunk col-md-5">
              <div>
                <Box
                  backgroundColor={"#fa0223"}
                  title="Course of Visit"
                  detail="Patient course of visit"
                  numberCount="8"
                  boxIcon={CourseVisitBoxIcon}
                />
              </div>
            </div>
          </div>

          <div className="row " style={{ paddingLeft: 10, marginTop: 80 }}>
            <div className="col-md-6 col-6">
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{ width: 45, height: 40, cursor: "pointer" }}
              />
            </div>

            <div
              className="col-md-6 col-6"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "0px",
              }}
            >
              <Button
                // disabled={enableForm}
                // onClick={enableForm ? showAlert : TriageAssessment}
                style={{
                  ...styles.stylesForSave,
                  width: "170px",
                  fontSize: matches ? 12 : 12,
                }}
                variant="contained"
                // color="#13D59F"
                // Error={errorMsg}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardDCD;
