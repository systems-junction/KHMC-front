import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "../../../../components/Header/Header";
import PhysicalExamIcon from "../../../../assets/img/Physical Exam Icon.png";
import DownloadIcon from "../../../../assets/img/Download Icon.png";
import PrintIcon from "../../../../assets/img/Print Icon.png";
import BodyIcon from "../../../../assets/img/body.png";
import SkinIcon from "../../../../assets/img/Skin_rashes.png";

import Button from "@material-ui/core/Button";
import DetailBlock from "../../../../components/DHR/DCD/ViewPhysicalExam/detailBlock";

import _ from "lodash";

const styles = {
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  save: {
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2973CF",
    width: "180px",
    height: "50px",
    outline: "none",
    color: "white",
  },
  Edit: {
    cursor: "pointer",
    borderRadius: 5,
    width: "180px",
    height: "50px",
    outline: "none",
    border: "2px solid gray",
    backgroundColor: "#FEFEFE",
  },
};
const detailsBlockArray = [
  {
    heading: "General Apperence",
    subArray: [
      {
        subheading: "Distress",
        description: "No Acute",
      },
    ],
  },
  {
    heading: "Heent",
    subArray: [
      {
        subheading: "Scleral Icterus / Pale Conjunctivae",
        description:
          "A commonly used medicale term to describe jaundice presents in the eyes",
      },
      {
        subheading: "Scleral Icterus / Pale Conjunctivae",
        description:
          "A commonly used medicale term to describe jaundice presents in the eyes",
      },
    ],
  },
  {
    heading: "Neck",
    subArray: [
      {
        subheading: " Scleral Icterus",
        description:
          "A commonly used medicale term to describe jaundice presents in the eyes",
      },
      {
        subheading: " Thyromegaly",
        description:
          "A commonly used medicale term to describe jaundice presents in the eyes",
      },
    ],
  },
  {
    heading: "Respiratory",
    subArray: [
      {
        subheading: " Diagram",
        description:
          "Respiratory System is the network of organs that hepls you breath",
        detail_Image: [BodyIcon],
      },
      {
        subheading: " Wheezing",
        description:
          "Wheezing is also a symptom of asthma, pneumonia, heart failure and more.",
      },
      {
        subheading: " Rales",
        description:
          "Rales: Small clicking, bubbling, or rattling sounds in the lungs.",
      },
      {
        subheading: " Rhonchi",
        description:
          "Rhonchi are coarse rattling respiratory sounds, caused by secretions.",
      },
    ],
  },
  {
    heading: "CVS",
    subArray: [
      {
        subheading: " Irregularly Irregular Rhythm",
        description:
          "The rhythm with no pattern to the RR intervals and a rate of 60 beats/min.",
        detail_Image: [],
      },
      {
        subheading: " Extra systoles (Occasional / Frequent)",
        description:
          "Extra systoles (PVCs) are not usually dangerous if they are sporadic.",
      },
      {
        subheading: " Tachycardia / Bradycardia",
        description:
          "These arrhythmias occur in the upper or lower chambers of the heart.",
      },
      {
        subheading: " PMI Displaced Laterally",
        description:
          "lateral decubitus position brings the cardiac apex closer to the chest wall.",
      },
      {
        subheading: " JVD Present",
        description: "Superior vena cava causes the jugular vein to bulge.",
      },
      {
        subheading: " Murmur",
        description:
          "Murmurs are heart sounds when blood is pumped across a heart. ",
      },
      {
        subheading: " Sys / Dios",
        description: "120/80",
      },
      {
        subheading: " Gallop (S3 / S4)",
        description:
          "The third heart sound (S3) is a low-frequency, occurring in early diastole.",
      },
      {
        subheading: "Friction Rub",
        description:
          "A pericardial friction rub is pathognomonic for acute pericarditis.",
      },
      {
        subheading: "Decreased Pulse (s)",
        description:
          "Low pulse pressure is a small difference between your systolic and diastolic.",
        detail_Image: [BodyIcon],
      },
    ],
  },
  {
    heading: "Abdomen",
    subArray: [
      {
        subheading: " Tenderness",
        description:
          "Tenderness is a feeling of concern, gentle affection, or warmth.",
        detail_Image: [],
      },
      {
        subheading: " Guarding",
        description:
          "It is the tensing of the abdominal wall muscles to guard inflamed organs.",
      },
      {
        subheading: " Rebound",
        description:
          "It is something your doctor might check for when diagnosing peritonitis.",
      },
      {
        subheading: " Abnormal Bowel Sounds (Decreased)",
        description: "Abdominal Bowl sounds are sounds made by the intestine. ",
      },
      {
        subheading: " Hepatomegaly / Splenomegaly / Mass",
        description:
          "It is the enlargement of liver (hepatomegaly) & spleen (splenomegaly).",
      },
    ],
  },
  {
    heading: "Rectal ",
    subArray: [
      {
        subheading: "Black / Bloody / Heme Post Stool ",
        description:
          "This test is still being studied to see how it works to find colorectal cancer. ",
      },
      {
        subheading: "Tenderness / Mass / Nodule",
        description: "These benign tumors arise within a nerve trunk.",
      },
    ],
  },
  {
    heading: "Back ",
    subArray: [
      {
        subheading: "CVA Tenderness (R / L)",
        description:
          "Pain that results from touching the region inside of the costovertebral angle.",
      },
    ],
  },
  {
    heading: "Skin",
    subArray: [
      {
        subheading: "Skin Reports",
        description: "",
        detail_Image: [SkinIcon, SkinIcon, SkinIcon, SkinIcon, SkinIcon],
      },

      {
        subheading: "Cyanosis / Diaphoresis / Pallor",
        description:
          "A pathologic condition that is characterized by a bluish color of the skin.",
      },

      {
        subheading: "Skin Rash",
        description: "Atopic dermatitis, Contact dermatitis.",
      },
    ],
  },
  {
    heading: "Extremities ",
    subArray: [
      {
        subheading: "Pedal Edema",
        description:
          "Pedal edema is the accumulation of fluid in the feet and lower legs.",
      },
      {
        subheading: "Calf Tenderness",
        description: "Other possible causes of calf pain include: sciatica.",
      },
    ],
  },
  {
    heading: "Neuro / Psych ",
    subArray: [
      {
        subheading: "Disoriented to Person / Place / Time",
        description: "Disorientation is an altered mental state.",
      },
      {
        subheading: "Depressed Affect ",
        description: "Depression is technically a mental disorder.",
      },
      {
        subheading: "Facial Droop / EOM Palsy / Anisocoria",
        description:
          "Facial droop occurs when there is damage to the nerves in your face.",
      },
      {
        subheading: "Weakness / Sensory Loss",
        description:
          "Minor nick on the spinal cord that creates a problem within neurosystem.",
      },
    ],
  },
];
const useStylesForInput = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
      borderRadius: 5,
    },
  },
  multilineColor: {
    boxShadow: "none",
    backgroundColor: "white",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:focus": {
      boxShadow: "none",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
      boxShadow: "none",
    },
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "& .MuiFormLabel-root": {
      fontSize: "12px",
      paddingRight: "15px",
    },
  },
  label: {
    "&$focusedLabel": {
      color: "red",
      display: "none",
    },
    // "&$erroredLabel": {
    //   color: "orange"
    // }
  },
  focusedLabel: {},
}));
const actions = { view: true };
export default function ViewPhysicalExam(props) {
  const classes = useStylesForInput();
  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        // backgroundColor: "rgb(19 213 159)",
        overflowY: "scroll",
        border: "1p",
      }}
    >
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader" style={{ marginBottom: 45 }}>
          <div className="col-md-6 col-6">
            <img src={PhysicalExamIcon} />
            <h4
              style={{
                color: "#000000",
                fontSize: "40px",
                fontWeight: "bolder",
              }}
            >
              Physical Exam
            </h4>
          </div>
          <div className="col-md-6 col-6">
            <img
              style={{ width: 35, height: "inherit", marginRight: 10 }}
              src={DownloadIcon}
            />
            <img style={{ width: 35, height: "inherit" }} src={PrintIcon} />
          </div>
        </div>
        <div
          style={{ flex: 4, display: "flex", flexDirection: "column" }}
          className={`${"container-fluid"} ${classes.root}`}
        >
          <div>
            <h4
              style={{
                color: "#2F77D1",
                fontSize: "xx-large",
                fontWeight: "bold",
              }}
            >
              {" "}
              Physical Exam
            </h4>
          </div>
          <div className="row">
            <div className="col-md-3">
              <span style={{ color: "#939393", fontWeight: 600 }}>
                Physical Exam
              </span>
            </div>
            <div className="col-md-3">
              <span style={{ color: "#939393", fontWeight: 600 }}>
                Pain Scale
              </span>
            </div>
            {/* <div className="col-md-3">
              <span style={{ color: "#939393" }}>Version Number</span>
            </div> */}
          </div>
          <div className="row">
            <div className="col-md-3">
              <span style={{ fontWeight: "bold", fontSize: "larger" }}>
                Agree W / Vital Sign
              </span>
            </div>
            <div className="col-md-3">
              <span style={{ fontWeight: "bold", fontSize: "larger" }}>
                Severe (8)
              </span>
            </div>
          </div>
          <hr />

          {detailsBlockArray.map((arr) => {
            return (
              <DetailBlock heading={arr.heading} subArray={arr.subArray} />
            );
          })}

          <div>
            <div
              style={{
                display: "flex",
                // flex: 1,
                justifyContent: "flex-end",
                marginTop: "30px",
                marginBottom: "2%",
                // paddingRight: !matches ? 20 : 0,
              }}
              className="row"
            >
              <>
                <Button style={styles.Edit} variant="contained" color="default">
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button style={styles.save} variant="contained" color="default">
                  Save
                </Button>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
