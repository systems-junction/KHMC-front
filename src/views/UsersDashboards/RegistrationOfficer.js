import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import OneValue from "../../components/Dial/OneValue";
import axios from "axios";
import { registrationOfficer } from "../../public/endpoins";

export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [parPending, setParPending] = useState("");
  const [totalInsured, setTotalInsured] = useState("");
  const [totalUnInsured, setTotalUnInsured] = useState("");
  const [patient, setPatient] = useState("");
  const [perHour, setPerHour] = useState("");
  const [tatPerHour, setTatPerHour] = useState("");

  // colors
  const [parPendingColor, setParPendingColor] = useState("");
  const [totalInsuredColor, setTotalInsuredColor] = useState("");
  const [totalUnInsuredColor, setTotalUnInsuredColor] = useState("");
  const [patientColor, setPatientColor] = useState("");
  const [perHourColor, setPerHourColor] = useState("");
  const [totalPatient, setTotalPatient] = useState("");

  useEffect(() => {
    axios
      .get(registrationOfficer)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (res.data.parPending >= 0 && res.data.parPending <= 39) {
            setParPendingColor("#60D69F");
          } else if (res.data.parPending >= 40 && res.data.parPending <= 79) {
            setParPendingColor("#FFBC28");
          } else if (res.data.parPending >= 80 && res.data.parPending <= 100) {
            setParPendingColor("#FF0000");
          }

          if (res.data.totalInsured >= 0 && res.data.totalInsured <= 39) {
            setTotalInsuredColor("#60D69F");
          } else if (
            res.data.totalInsured >= 40 &&
            res.data.totalInsured <= 70
          ) {
            setTotalInsuredColor("#FFBC28");
          } else if (
            res.data.totalInsured >= 80 &&
            res.data.totalInsured <= 100
          ) {
            setTotalInsuredColor("#FF0000");
          }

          if (res.data.totalUnInsured >= 0 && res.data.totalUnInsured <= 39) {
            setTotalUnInsuredColor("#60D69F");
          } else if (
            res.data.totalUnInsured >= 40 &&
            res.data.totalUnInsured <= 70
          ) {
            setTotalUnInsuredColor("#FFBC28");
          } else if (
            res.data.totalUnInsured >= 80 &&
            res.data.totalUnInsured <= 100
          ) {
            setTotalUnInsuredColor("#FF0000");
          }

          if (res.data.patient >= 0 && res.data.patient <= 39) {
            setPatientColor("#60D69F");
          } else if (res.data.patient >= 40 && res.data.patient <= 70) {
            setPatientColor("#FFBC28");
          } else if (res.data.patient >= 80 && res.data.patient <= 100) {
            setPatientColor("#FF0000");
          }

          if (res.data.perHour >= 0 && res.data.perHour <= 39) {
            setPerHourColor("#60D69F");
          } else if (res.data.perHour >= 40 && res.data.perHour <= 70) {
            setPerHourColor("#FFBC28");
          } else if (res.data.perHour >= 80 && res.data.perHour <= 100) {
            setPerHourColor("#FF0000");
          }

          setParPending(res.data.parPending);
          setTotalInsured(res.data.totalInsured);
          setTotalUnInsured(res.data.totalUnInsured);
          setPatient(res.data.patient);
          setPerHour(res.data.perHour);

          setTatPerHour(res.data.tatPerHour);
          setTotalPatient(res.data.totalPatient);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid" style={{ marginBottom: 10 }}>
      <div className="row">
        {/* <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Patient Registration Pending"}
              value={patient}
              color={patientColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div> */}

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Patient Insurance Pre-Approval Pending"}
              value={parPending}
              color={parPendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"00"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <TwoValue
              heading1={"Total Insured Patients Pre-Approved"}
              time1={totalInsured}
              time1Color={totalInsuredColor}
              time2Color={totalUnInsuredColor}
              heading2={"Total Un-Insured Patient"}
              time2={totalUnInsured}
            />
          </div>
        </div>

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
              childHeading={"Request received to Processed"}
              time={tatPerHour ? tatPerHour : "00"}
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
            <OneValue
              heading={"Commulative Number of Registrations"}
              time={totalPatient ? totalPatient : "0"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
