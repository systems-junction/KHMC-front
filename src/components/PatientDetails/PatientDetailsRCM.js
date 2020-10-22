import React, { useEffect, useState } from "react";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
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
    marginTop: 30,
  },

  headingStyles: {
    fontWeight: "bold",
    color: "grey",
    fontSize: 12,
  },

  root: {
    flexGrow: 1,
  },

  textStyles: {
    fontWeight: "700",
    color: "black",
    fontSize: 14,
  },

  headerHeading: {
    display: "flex",
    alignItems: "center",
    verticalAlign: "center",
    paddingTop: 10,
  },
};
function AddEditPurchaseRequest(props) {
  const [patientDetails, setPatientDetails] = useState("");
  useEffect(() => {
    setPatientDetails(props.patientDetails);
    console.log("props", props.patientDetails);
  }, [props.patientDetails]);

  return (
    <div className="row">
      <h5
        style={{
          fontWeight: "bold",
          color: "white",
          marginTop: 25,
          paddingLeft: "15px",
        }}
      >
        Patient Details
      </h5>

      <div
        className="scroll-4-patient-detail"
        style={{
          marginTop: 15,
          backgroundColor: "white",
          borderRadius: 5,
          width: "100%",
          marginLeft: 15,
          marginRight: 15,
          maxHeight: "300px",
          overflowX: "scroll",
          overflowY: "scroll",
        }}
      >
        <div className="container-fluid">
          <div
            className="row for-patient-detail"
            style={{
              backgroundColor: "#2C6DDD",
              paddingLeft: 10,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            <div
              className={"col-md-3 col-sm-3 col-3"}
              style={styles.headerHeading}
            >
              <h6 style={{ color: "white", fontWeight: "700" }}>
                Patient Info
              </h6>
            </div>
            <div
              className={"col-md-3 col-sm-3 col-3"}
              style={styles.headerHeading}
            >
              <h6 style={{ color: "white", fontWeight: "700" }}>Allergy</h6>
            </div>
            <div
              className={"col-md-3 col-sm-3 col-3"}
              style={styles.headerHeading}
            >
              <h6 style={{ color: "white", fontWeight: "700" }}>Medication</h6>
            </div>
            <div
              className={"col-md-3 col-sm-3 col-3"}
              style={styles.headerHeading}
            >
              <h6 style={{ color: "white", fontWeight: "700" }}>Diagnosis</h6>
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
          }}
        >
          <div
            className={"col-md-3 col-sm-3 col-3"}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span style={styles.headingStyles}>Patient</span>
            <span style={styles.textStyles}>
              {patientDetails &&
              patientDetails.firstName &&
              patientDetails.lastName
                ? patientDetails.firstName + " " + patientDetails.lastName
                : "---"}
            </span>

            <span style={styles.headingStyles}>MRN</span>
            <span style={styles.textStyles}>
              {patientDetails && patientDetails.profileNo
                ? patientDetails.profileNo.toUpperCase()
                : "---"}
            </span>

            <span style={styles.headingStyles}>Age</span>
            <span style={styles.textStyles}>
              {patientDetails && patientDetails.age
                ? patientDetails.age
                : "---"}
            </span>

            <span style={styles.headingStyles}>Gender</span>
            <span style={styles.textStyles}>
              {patientDetails && patientDetails.gender
                ? patientDetails.gender
                : "---"}
            </span>

            <span style={styles.headingStyles}>Weight</span>
            <span style={styles.textStyles}>
              {patientDetails && patientDetails.weight
                ? patientDetails.weight
                : "---"}{" "}
              kg
            </span>
          </div>

          <div className={"col-md-3 col-sm-3 col-3"} style={{}}>
            {[].map((drug) => {
              return <h6 style={styles.textStyles}>{drug}</h6>;
            })}
          </div>

          <div className={"col-md-3 col-sm-3 col-3"} style={{}}>
            {props.medicationArray &&
              props.medicationArray.map((d, index) => {
                return (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h6
                      style={{
                        ...styles.textStyles,
                      }}
                    >
                      {index + 1}
                      {"."} &nbsp;
                    </h6>
                    <h6
                      style={{
                        ...styles.textStyles,
                      }}
                    >
                      {d}
                    </h6>
                  </div>
                );
              })}
          </div>

          <div className={"col-md-3 col-sm-3 col-3"} style={{}}>
            {props.diagnosisArray &&
              props.diagnosisArray.map((d, index) => {
                return (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h6
                      style={{
                        ...styles.textStyles,
                      }}
                    >
                      {index + 1}
                      {"."} &nbsp;
                    </h6>
                    <h6
                      style={{
                        ...styles.textStyles,
                      }}
                    >
                      {d}
                    </h6>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
