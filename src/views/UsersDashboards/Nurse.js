import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import OneValue from "../../components/Dial/OneValue";
import axios from "axios";
import { registuredNurse } from "../../public/endpoins";

export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [triagePending, setTriagePending] = useState("");
  const [treatmentPending, setTreatmentPending] = useState("");
  const [labPending, setLabPending] = useState("");
  const [perHour, setPerHour] = useState("");

  const [tatTriage, setTatTriage] = useState("");
  const [tatDiagnosisToTreatment, setTatDiagnosisToTreatment] = useState("");
  const [tatLabResults, setTatLabResults] = useState("");
  const [tatPatientPerHour, setTatPatientPerHour] = useState("");

  // colors
  const [triagePendingColor, setTriagePendingColor] = useState("");
  const [treatmentPendingColor, setTreatmentPendingColor] = useState("");
  const [labPendingColor, setLabPendingColor] = useState("");
  const [perHourColor, setPerHourColor] = useState("");

  useEffect(() => {
    axios
      .get(registuredNurse)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (res.data.triagePending >= 0 && res.data.triagePending <= 39) {
            setTriagePendingColor("#60D69F");
          } else if (
            res.data.triagePending >= 40 &&
            res.data.triagePending <= 79
          ) {
            setTriagePendingColor("#FFBC28");
          } else if (
            res.data.triagePending >= 80 &&
            res.data.triagePending <= 100
          ) {
            setTriagePendingColor("#FF0000");
          }

          if (
            res.data.treatmentPending >= 0 &&
            res.data.treatmentPending <= 39
          ) {
            setTreatmentPendingColor("#60D69F");
          } else if (
            res.data.treatmentPending >= 40 &&
            res.data.treatmentPending <= 70
          ) {
            setTreatmentPendingColor("#FFBC28");
          } else if (
            res.data.treatmentPending >= 80 &&
            res.data.treatmentPending <= 100
          ) {
            setTreatmentPendingColor("#FF0000");
          }

          if (res.data.labPending >= 0 && res.data.labPending <= 39) {
            setLabPendingColor("#60D69F");
          } else if (res.data.labPending >= 40 && res.data.labPending <= 70) {
            setLabPendingColor("#FFBC28");
          } else if (res.data.labPending >= 80 && res.data.labPending <= 100) {
            setLabPendingColor("#FF0000");
          }

          if (res.data.perHour >= 0 && res.data.perHour <= 39) {
            setPerHourColor("#60D69F");
          } else if (res.data.perHour >= 40 && res.data.perHour <= 70) {
            setPerHourColor("#FFBC28");
          } else if (res.data.perHour >= 80 && res.data.perHour <= 100) {
            setPerHourColor("#FF0000");
          }

          setTriagePending(res.data.triagePending);
          setTreatmentPending(res.data.treatmentPending);
          setLabPending(res.data.labPending);
          setPerHour(res.data.perHour);
          setTatTriage(res.data.tatTriage);

          setTatDiagnosisToTreatment(res.data.tatDiag);
          setTatLabResults(res.data.tatLab);
          setTatPatientPerHour(res.data.tatPerHour);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid" style={{ marginBottom: 10 }}>
      <div className="row">
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Patient Assesments/Triage Pending"}
              value={triagePending}
              color={triagePendingColor}
              subHeading={"TAT"}
              childHeading={"Registration to Assessment/Triage"}
              time={tatTriage ? tatTriage : "00"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Patient Treatments/Medications Pending"}
              value={treatmentPending}
              color={treatmentPendingColor}
              subHeading={"TAT"}
              childHeading={"Diagnosis to Treatment"}
              time={tatDiagnosisToTreatment ? tatDiagnosisToTreatment : "00"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Patient Lab Results Pending"}
              value={labPending}
              color={labPendingColor}
              subHeading={"TAT"}
              childHeading={"Order to Results"}
              time={tatLabResults ? tatLabResults : "00"}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"No. of Registrations/Hour"}
              value={parseFloat(perHour).toFixed(2)}
              color={perHourColor}
              subHeading={"TAT"}
              childHeading={"Per Patient"}
              time={tatPatientPerHour ? tatPatientPerHour : "00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
