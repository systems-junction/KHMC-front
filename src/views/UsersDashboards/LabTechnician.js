import React, { useEffect, useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Dialer from "../../components/Dial/dialer"
import TwoValue from "../../components/Dial/TwoValue"
import OneValue from "../../components/Dial/OneValue"
import axios from "axios"
import { labTechnician } from "../../public/endpoins"
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)")
  const [resultPending, setResultPending] = useState("")
  const [imagePending, setImagePending] = useState("")

  // colors
  const [resultPendingColor, setResultPendingColor] = useState("")
  const [imagePendingColor, setImagePendingColor] = useState("")

  useEffect(() => {
    axios
      .get(labTechnician)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          if (res.data.resultPending >= 0 && res.data.resultPending <= 39) {
            setResultPendingColor("#60D69F")
          } else if (
            res.data.resultPending >= 40 &&
            res.data.resultPending <= 70
          ) {
            setResultPendingColor("#FFBC28")
          } else if (
            res.data.resultPending >= 80 &&
            res.data.resultPending <= 100
          ) {
            setResultPendingColor("#FF0000")
          }
          if (res.data.imagePending >= 0 && res.data.imagePending <= 39) {
            setImagePendingColor("#60D69F")
          } else if (
            res.data.imagePending >= 40 &&
            res.data.imagePending <= 70
          ) {
            setImagePendingColor("#FFBC28")
          } else if (
            res.data.imagePending >= 80 &&
            res.data.imagePending <= 100
          ) {
            setImagePendingColor("#FF0000")
          }

          setImagePending(res.data.imagePending)
          setResultPending(res.data.resultPending)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="container-fluid" style={{ marginBottom: 10 }}>
      <div className="row">
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Blood Sample Collections Pending"}
              value={imagePending}
              color={imagePendingColor}
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
          <div>
            <Dialer
              mainHeading={"Blood Test Results Pending"}
              value={resultPending}
              color={resultPendingColor}
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
