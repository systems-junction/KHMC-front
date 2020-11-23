import React, { useEffect, useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Dialer from "../../components/Dial/dialer"
import TwoValue from "../../components/Dial/TwoValue"
import OneValue from "../../components/Dial/OneValue"
import axios from "axios"
import { consultant } from "../../public/endpoins"
import cookie from "react-cookies"

export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)")
  const [completed, setCompleted] = useState("")
  const [user, setUser] = useState(cookie.load("current_user"))

  // colors
  const [completedColor, setCompletedColor] = useState("")

  console.log("user", user)
  useEffect(() => {
    axios
      .get(consultant)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          if (res.data.completed >= 0 && res.data.completed <= 39) {
            setCompletedColor("#60D69F")
          } else if (res.data.completed >= 40 && res.data.completed <= 79) {
            setCompletedColor("#FFBC28")
          } else if (res.data.completed >= 80 && res.data.completed <= 100) {
            setCompletedColor("#FF0000")
          }

          setCompleted(res.data.completed)
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
              mainHeading={"Consultation Requests Pending"}
              value={completed}
              color={completedColor}
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
