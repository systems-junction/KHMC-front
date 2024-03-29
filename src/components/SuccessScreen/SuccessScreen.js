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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ThankYou from "../../assets/img/ThankYou.png";

import { connect } from "react-redux";
import {
  funForSaga,
  funForReducer,
  setPatientDetailsForReducer,
} from "../../actions/Checking";

function AddBusinessUnit(props) {
  const matches = useMediaQuery("(min-width:600px)");
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
      <Header history={props.history} />
      {/* </div> */}

      <div
        className="thankyou"
        style={{
          alignItems: "center",
          flex: 4,
          display: "flex",
          marginTop: matches ? -600 : -655,
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
            fontSize: matches ? 24 : 20,
            maxWidth: "83%",
            textAlign: "center",
          }}
        >
          {props.history.location.state.message}
        </h4>
        {props.history.location.state.qr ? (
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#2973CF",
              borderRadius: 10,
              textTransform: "none",
            }}
          >
            <a
              style={{ color: "white" }}
              href={props.history.location.state.qr}
              target="_blank"
            >
              Print Label
            </a>
          </Button>
        ) : (
          undefined
        )}

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
            style={{ maxWidth: "40%", cursor: "pointer" }}
          />

          <img
            onClick={() =>
              props.history.location.comingFor &&
              props.history.location.comingFor === "Triage"
                ? props.history.go(-2)
                : props.history.goBack()
            }
            src={Back}
            style={{ maxWidth: "40%", cursor: "pointer" }}
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
