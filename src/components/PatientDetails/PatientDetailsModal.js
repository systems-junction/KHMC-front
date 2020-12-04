import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
    // fontWeight: "bold",
    color: "grey",
  },

  root: {
    flexGrow: 1,
  },

  textStyles: {
    fontWeight: "700",
    // color: "black",
    fontSize: 12,
    // textOverflow: "ellipsis",
    // width: "100%",
    // whiteSpace: "nowrap",
    // overflow: "hidden",
  },

  headerHeading: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // verticalAlign: "center",
    paddingTop: 9,
  },
  headerHeadingText: {
    fontWeight: "700",
    color: "grey",
    fontSize: 14,
  },
};

function PatientDetailtsDialog(props) {
  const theme = useTheme();
  let matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { patientDetails, pharmacyRequest, diagnosisArray } = props;
  return (
    <>
      <Dialog
        fullScreen
        open={props.openPatientDetailsDialog}
        onClose={() => props.setPatientDetailsModal(false)}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.setPatientDetailsModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <h5 style={{ fontWeight: "bold", marginTop: 25 }}>Patient Details</h5>

          <div>
            <div style={styles.headerHeading}>
              <h6
                style={{
                  ...styles.headerHeadingText,
                }}
              >
                Patient Info
              </h6>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="row">
                  <div
                    className="col-6"
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
                        patientDetails.firstName +
                          " " +
                          patientDetails.lastName}
                    </span>
                  </div>

                  <div
                    className="col-6"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
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
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
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
                  </div>

                  <div
                    className="col-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
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
                  </div>

                  <div
                    className="col-4"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
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
                </div>
              </div>
            </div>

            <hr width={"100%"} />

            <div style={styles.headerHeading}>
              <h6
                style={{
                  ...styles.headerHeadingText,
                }}
              >
                Allergy
              </h6>

              <div style={{}}>
                <h6 style={styles.textStyles}>
                  {patientDetails.drugAllergy &&
                  patientDetails.drugAllergy.toString() !== ""
                    ? patientDetails.drugAllergy.toString()
                    : "N/A"}
                </h6>
              </div>
            </div>

            <hr width={"100%"} />

            <div style={styles.headerHeading}>
              <h6
                style={{
                  ...styles.headerHeadingText,
                }}
              >
                Medication
              </h6>

              <span
                style={{
                  ...styles.textStyles,
                }}
              >
                {pharmacyRequest && pharmacyRequest.toString() !== ""
                  ? pharmacyRequest.toString()
                  : "N/A"}
              </span>
            </div>

            <hr width={"100%"} />

            <div style={styles.headerHeading}>
              <h6
                style={{
                  ...styles.headerHeadingText,
                }}
              >
                Diagnosis
              </h6>

              <div style={{}}>
                <span
                  style={{
                    ...styles.textStyles,
                  }}
                >
                  {props.diagnosisArray &&
                  props.diagnosisArray.toString() !== ""
                    ? props.diagnosisArray.toString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PatientDetailtsDialog;
