import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";

import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import Loader from "react-loader-spinner";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import PatientDetailsModal from "../../components/PatientDetails/PatientDetailsModal";

let matches = false;

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "60%",
    height: "50px",
    outline: "none",
  },

  forTableCell: {
    color: "black",
    fontSize: 14,
  },

  stylesForPatientButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "45px",
    // outline: "none",
    // alignSelf:'center'
    marginTop: 30,
  },

  headingStyles: {
    fontWeight: "bold",
    color: "grey",
  },

  root: {
    flexGrow: 1,
  },

  textStyles: {
    fontWeight: "700",
    color: "black",
    fontSize: 12,
    textOverflow: "ellipsis",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },

  headerHeading: {
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    paddingTop: 9,
  },
  headerHeadingText: {
    fontWeight: "700",
    color: "white",
    fontSize: 12,
  },
};
const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  const theme = useTheme();
  matches = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();

  const [patientDetails, setPatientDetails] = useState("");
  const [patientDetailsModal, setPatientDetailsModal] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  // useEffect(() => {
  //   setPatientDetails(props.patientDetails);
  //   console.log("props", props.patientDetails);
  // }, []);

  useEffect(() => {
    setPatientDetails(props.patientDetails);
    console.log("props", props.patientDetails);
  }, [props.patientDetails]);

  return (
    <div className="row">
      {patientDetails ? (
        <>
          <h5 style={{ fontWeight: "bold", color: "white", marginTop: 25 }}>
            Patient Details
          </h5>

          <div
            // className="container-fluid"
            style={{
              marginTop: 15,
              backgroundColor: "white",
              // minHeight: 200,
              borderRadius: 5,
              width: "100%",
              maxHeight: "300px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {/* </Paper> */}

            <div className="container-fluid">
              <div
                className="row"
                style={{
                  backgroundColor: "#2C6DDD",
                  // marginTop: 20,
                  paddingLeft: 10,
                  minHeight: "20%",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  paddingBottom: 10,
                  paddingTop: 10,
                  // minWidth: 600,
                }}
                onClick={() => setPatientDetailsModal(true)}
              >
                <div className={"col-3"} style={styles.headerHeading}>
                  <h6
                    style={{
                      ...styles.headerHeadingText,
                      fontSize: matches ? 14 : 12,
                    }}
                  >
                    Patient Info
                  </h6>
                </div>
                <div className={"col-3"} style={styles.headerHeading}>
                  <h6
                    style={{
                      ...styles.headerHeadingText,
                      fontSize: matches ? 14 : 12,
                    }}
                  >
                    Allergy
                  </h6>
                </div>
                <div className={"col-3"} style={styles.headerHeading}>
                  <h6
                    style={{
                      ...styles.headerHeadingText,
                      fontSize: matches ? 14 : 12,
                    }}
                  >
                    Medication
                  </h6>
                </div>
                <div className={"col-3"} style={styles.headerHeading}>
                  <h6
                    style={{
                      ...styles.headerHeadingText,
                      fontSize: matches ? 14 : 12,
                    }}
                  >
                    Diagnosis
                  </h6>
                </div>
              </div>
            </div>

            <div
              className="row"
              style={{
                marginTop: 10,
                paddingLeft: 10,
                height: "80%",
                paddingBottom: 10,
                // minWidth: 600,
                // overflow: "scroll",
              }}
            >
              <div
                className={"col-3"}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    ...styles.headingStyles,
                    fontSize: matches ? 12 : 9,
                  }}
                >
                  Patient
                </span>
                <span style={styles.textStyles}>
                  {patientDetails &&
                    patientDetails.firstName + " " + patientDetails.lastName}
                </span>

                <span
                  style={{
                    ...styles.headingStyles,
                    fontSize: matches ? 12 : 9,
                  }}
                >
                  MRN
                </span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.profileNo.toUpperCase()}
                </span>

                <span
                  style={{
                    ...styles.headingStyles,
                    fontSize: matches ? 12 : 9,
                  }}
                >
                  Age
                </span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.age}
                </span>

                <span
                  style={{
                    ...styles.headingStyles,
                    fontSize: matches ? 12 : 9,
                  }}
                >
                  Gender
                </span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.gender}
                </span>

                <span
                  style={{
                    ...styles.headingStyles,
                    fontSize: matches ? 12 : 9,
                  }}
                >
                  Weight
                </span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.weight} kg
                </span>
              </div>

              <div className={"col-3"} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug) => {
                    return <h6 style={styles.textStyles}>{drug}</h6>;
                  })}
              </div>

              <div className={"col-3"} style={{}}>
                {props.pharmacyRequest &&
                  props.pharmacyRequest.map((d, index) => {
                    return (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span
                          style={{
                            ...styles.textStyles,
                          }}
                        >
                          {index + 1}
                          {"."} &nbsp;
                          {d}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className={"col-3"} style={{}}>
                {props.diagnosisArray &&
                  props.diagnosisArray.map((d, index) => {
                    return (
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <span
                          style={{
                            ...styles.textStyles,
                          }}
                        >
                          {index + 1}
                          {"."} &nbsp;
                          {d}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="LoaderStyle">
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )}

      {patientDetailsModal ? (
        <PatientDetailsModal
          openPatientDetailsDialog={PatientDetailsModal}
          setPatientDetailsModal={setPatientDetailsModal}
          patientDetails={patientDetails}
          pharmacyRequest={props.pharmacyRequest}
          diagnosisArray={props.diagnosisArray}
        />
      ) : (
        undefined
      )}
    </div>
  );
}
export default AddEditPurchaseRequest;
