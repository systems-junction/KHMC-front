import React, { useEffect, useState } from "react";
import TAA from "../../assets/img/Triage & Assessment Icon.png";
import ViewROS from "../DHR/DCD/ViewROS/ViewROS.js";
import formatDate from "../../utils/formatDate";
import axios from "axios";

import { changeTriageStatus } from "../../public/endpoins";

import Button from "@material-ui/core/Button";

import ReasonDialog from "./ReasonDialog";

import cookie from "react-cookies";

function ViewSingleTriage(props) {
  const [selectedSingleTriage, setSelectedSingleTriage] = useState("");
  const [openReasonModal, setOpenReasonModal] = useState(false);
  const [currentUser] = useState(cookie.load("current_user"));

  const handleSubmitAssessment = (status, reason = "") => {
    const params = {
      triageId: props.history.location.state.selectedTriage._id,
      requestType: props.history.location.state.requestType,
      status: status,
      reason,
    };
    console.log(params, "params");
    axios
      .put(
        changeTriageStatus + "/" + props.history.location.state.requestTypeId,
        params
      )
      .then((res) => {
        if (res.data.success) {
          console.log("After update triage status", res.data.data);
          props.history.goBack();
        } else if (!res.data.success) {
          // setOpenNotification(true);
          // setErrorMsg("Error in Submitting Assessment");
        }
      })
      .catch((e) => {
        console.log("error after submitting Assessment", e);
        // setOpenNotification(true);
        // setErrorMsg("Error while submitting Assessment");
      });
  };

  useEffect(() => {
    let selectedTriage = props.history.location.state.selectedTriage;

    console.log(props.history.location.state.requestType);

    let arr = [
      {
        heading: "Triage History",
        columnSize: 4,
        subArray: [
          {
            subheading: "Date/Time",
            description: formatDate(selectedTriage.date),
          },
          {
            subheading: "Doctor/Staff",
            description:
              selectedTriage.requester.firstName +
              " " +
              selectedTriage.requester.lastName,
          },
          {
            subheading: "Triage No.",
            description: selectedTriage.triageRequestNo,
          },
        ],
      },

      {
        heading: "Patient Vitals",
        columnSize: 4,
        subArray: [
          {
            subheading: "Heart Rate",
            description:
              selectedTriage.heartRate !== "N/A"
                ? selectedTriage.heartRate + " bpm"
                : "",
          },
          {
            subheading: "Blood Pressure Systolic",
            description:
              selectedTriage.bloodPressureSys !== "N/A"
                ? selectedTriage.bloodPressureSys + " mmHg"
                : "",
          },
          {
            subheading: "Blood Pressure Diastolic",
            description:
              selectedTriage.bloodPressureDia !== "N/A"
                ? selectedTriage.bloodPressureDia + " mmHg"
                : "",
          },

          {
            subheading: "Respiratory Rate",
            description:
              selectedTriage.respiratoryRate !== "N/A"
                ? selectedTriage.respiratoryRate + " /min"
                : "",
          },

          {
            subheading: "Temperature",
            description:
              selectedTriage.temperature !== "N/A"
                ? selectedTriage.temperature + " °F"
                : "",
          },
          {
            subheading: "Blood Suagr Level",
            description:
              selectedTriage.FSBS !== "N/A"
                ? selectedTriage.FSBS + " mg/dL"
                : "",
          },

          {
            subheading: "Pain Scale",
            description:
              selectedTriage.painScale !== "N/A"
                ? selectedTriage.painScale
                : "",
          },
          {
            subheading: "Pulse OX",
            description:
              selectedTriage.pulseOX !== "N/A"
                ? selectedTriage.pulseOX + " SpO2"
                : "",
          },
        ],
      },

      {
        heading: "Physical Examination",
        columnSize: 1,
        subArray: [
          {
            subheading: "General Appearance",
            description: selectedTriage.generalAppearance,
          },

          {
            subheading: "Head and Neck",
            description: selectedTriage.headNeck,
          },

          {
            subheading: "Respiratory",
            description: selectedTriage.respiratory,
          },

          {
            subheading: "Cardiac",
            description: selectedTriage.cardiac,
          },
          {
            subheading: "Abdomen",
            description: selectedTriage.abdomen,
          },

          {
            subheading: "Neurological",
            description: selectedTriage.neurological,
          },
        ],
      },

      {
        heading: "Triage Level",
        columnSize: 1,
        subArray: [
          {
            subheading: "Triage Level",
            description: selectedTriage.triageLevel,
          },
        ],
      },
    ];

    setSelectedSingleTriage(arr);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <ViewROS
        heading={"Triage & Assessment"}
        icon={TAA}
        selectedSingleTriage={selectedSingleTriage}
      />

      {/* <div
        style={{
          display: "flex",
          // flex: 1,
          justifyContent: "center",
          marginTop: "30px",
          // marginBottom: "2%",
          // paddingRight: 20,
        }}
      > */}

      {currentUser && currentUser.staffTypeId.type === "Doctor/Physician" ? (
        <div className="row">
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#F26D91",
                color: "white",
                width: 250,
                height: 45,
              }}
              onClick={() => handleSubmitAssessment("Agreed")}
            >
              Agree With Nurse Notes
            </Button>
          </div>
          <div
            className="col-md-6"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#2873CF",
                color: "white",
                width: 250,
                height: 45,
              }}
              onClick={() => setOpenReasonModal(true)}
            >
              Re-Assessment
            </Button>
          </div>
        </div>
      ) : (
        undefined
      )}

      {openReasonModal ? (
        <ReasonDialog
          openReasonModal={openReasonModal}
          handleSubmitAssessment={handleSubmitAssessment}
          setOpenReasonModal={setOpenReasonModal}
        />
      ) : (
        undefined
      )}
    </div>
  );
}

export default ViewSingleTriage;
