import React, { useEffect, useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Dialer from "../../components/Dial/dialer"
import OneValue from "../../components/Dial/OneValue"
import axios from "axios"
import cookies from "react-cookies"
import { doctor } from "../../public/endpoins"
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)")
  const [pendingConsultations, setPendingConsultations] = useState("")
  const [pendingLab, setPendingLab] = useState("")
  const [pendingPharmacy, setPendingPharmacy] = useState("")
  const [countPendingDiagnosis, setCountPendingDiagnosis] = useState("")
  const [patientPerHour, setPatientPerHour] = useState("")
  const [radConsult, setRadConsult] = useState("")

  const [pendingConsultationsColor, setPendingConsultationsColor] = useState("")
  const [pendingLabColor, setPendingLabColor] = useState("")
  const [pendingPharmacyColor, setPendingPharmacyColor] = useState("")
  const [countPendingDiagnosisColor, setCountPendingDiagnosisColor] = useState(
    "",
  )
  const [patientPerHourColor, setPatientPerHourColor] = useState("")
  const [radConsultColor, setRadConsultColor] = useState("")
  const [currentUser, setCurrentUser] = useState(
    cookies.load("current_user")._id,
  )

  useEffect(() => {
    console.log("currentUser", currentUser)
    axios
      .get(`${doctor}/${currentUser}`)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          if (
            res.data.pendingConsultations >= 0 &&
            res.data.pendingConsultations <= 39
          ) {
            setPendingConsultationsColor("#60D69F")
          } else if (
            res.data.pendingConsultations >= 40 &&
            res.data.pendingConsultations <= 79
          ) {
            setPendingConsultationsColor("#FFBC28")
          } else if (res.data.pendingConsultations >= 80) {
            setPendingConsultationsColor("#FF0000")
          }

          if (res.data.pendingLab >= 0 && res.data.pendingLab <= 39) {
            setPendingLabColor("#60D69F")
          } else if (res.data.pendingLab >= 40 && res.data.pendingLab <= 79) {
            setPendingLabColor("#FFBC28")
          } else if (res.data.pendingLab >= 80) {
            setPendingLabColor("#FF0000")
          }

          if (res.data.pendingPharmacy >= 0 && res.data.pendingPharmacy <= 39) {
            setPendingPharmacyColor("#60D69F")
          } else if (
            res.data.pendingPharmacy >= 40 &&
            res.data.pendingPharmacy <= 79
          ) {
            setPendingPharmacyColor("#FFBC28")
          } else if (res.data.pendingPharmacy >= 80) {
            setPendingPharmacyColor("#FF0000")
          }

          if (
            res.data.countPendingDiagnosis >= 0 &&
            res.data.countPendingDiagnosis <= 39
          ) {
            setCountPendingDiagnosisColor("#60D69F")
          } else if (
            res.data.countPendingDiagnosis >= 40 &&
            res.data.countPendingDiagnosis <= 79
          ) {
            setCountPendingDiagnosisColor("#FFBC28")
          } else if (res.data.countPendingDiagnosis >= 80) {
            setCountPendingDiagnosisColor("#FF0000")
          }

          if (res.data.patientPerHour >= 0 && res.data.patientPerHour <= 39) {
            setPatientPerHourColor("#60D69F")
          } else if (
            res.data.patientPerHour >= 40 &&
            res.data.patientPerHour <= 79
          ) {
            setPatientPerHourColor("#FFBC28")
          } else if (res.data.patientPerHour >= 80) {
            setPatientPerHourColor("#FF0000")
          }
          if (res.data.radConsult >= 0 && res.data.radConsult <= 39) {
            setRadConsultColor("#60D69F")
          } else if (res.data.radConsult >= 40 && res.data.radConsult <= 79) {
            setRadConsultColor("#FFBC28")
          } else if (res.data.radConsult >= 80) {
            setRadConsultColor("#FF0000")
          }

          setPendingConsultations(res.data.pendingConsultations)
          setPendingLab(res.data.pendingLab)
          setPendingPharmacy(res.data.pendingPharmacy)
          setCountPendingDiagnosis(res.data.countPendingDiagnosis)
          setPatientPerHour(res.data.patientPerHour)
          setRadConsult(res.data.radConsult)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="container-fluid" style={{ marginBottom: 10 }}>
      <div className="row" style={{ marginBottom: matches ? "" : 20 }}>
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Patient Diagnosis Pending"}
              value={countPendingDiagnosis}
              color={countPendingDiagnosisColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Consultations Notes Pending"}
              value={pendingConsultations}
              color={pendingConsultationsColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Patient Lab Results Pending"}
              value={pendingLab}
              color={pendingLabColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>
      </div>

      <div className="row" style={{ marginBottom: matches ? "" : 20 }}>
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Patient Rad Consultation Notes Pending"}
              value={radConsult}
              color={radConsultColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Orders Pending"}
              value={pendingPharmacy}
              color={pendingPharmacyColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Average No.of Patient/Hour"}
              value={patientPerHour}
              color={patientPerHourColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
