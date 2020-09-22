/* eslint-disable react/jsx-indent */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useReducer } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { ToastsStore } from "react-toasts";

import { Redirect } from "react-router-dom";

import Header from "../Header/Header";

import Back from "../../assets/img/Back.png";
import Home from "../../assets/img/Home.png";

import ThankYou from "../../assets/img/ThankYou.png";

import { connect } from "react-redux";
import {
  funForSaga,
  funForReducer,
  setPatientDetailsForReducer,
} from "../../actions/Checking";

function AddBusinessUnit(props) {
  const [goToHome, setGoToHome] = useState(false);
  const [goBackScreen, setGoBackScreen] = useState(false);

  useEffect(() => {
    console.log(props.history.location.state.patientDetails);
    if (
      props.history.location.state &&
      props.history.location.state.patientDetails
    ) {
      props.setPatientDetailsForReducer(
        props.history.location.state.patientDetails
      );
    }
  }, []);

  if (goToHome) {
    // props.history.replace('', null);
    props.setPatientDetailsForReducer("");
    return <Redirect to="/home" />;
  }

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flex: 1,
        // backgroundImage: `url("${ThankYou}")`,
        backgroundColor: "pink",
        backgroundSize: "100%",
      }}
    >
      {/* <div style={{ alignItems: 'center', flex: 1, display: 'flex' }}> */}
      <Header />
      {/* </div> */}

      <div
        style={{
          alignItems: "center",
          flex: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "white", fontWeight: "bold", fontSize: 55 }}>
          Thank You!
        </h1>

        <h4
          style={{
            color: "white",
            fontSize: 24,
            maxWidth: "83%",
            textAlign: "center",
          }}
        >
          {props.history.location.state.message}
        </h4>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            onClick={() => setGoToHome(true)}
            src={Home}
            style={{ maxWidth: "40%", height: "auto", cursor: "pointer" }}
          />

          <img
            onClick={() =>
              props.history.location.comingFor &&
              props.history.location.comingFor === "Triage"
                ? props.history.go(-2)
                : props.history.goBack()
            }
            src={Back}
            style={{ maxWidth: "40%", height: "auto", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ CheckingReducer }) => {
  const { count, patientDetails } = CheckingReducer;
  return { count, patientDetails };
};
export default connect(mapStateToProps, {
  funForReducer,
  setPatientDetailsForReducer,
})(AddBusinessUnit);
