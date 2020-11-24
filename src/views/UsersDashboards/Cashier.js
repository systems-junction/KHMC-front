import React, { useEffect, useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Dialer from "../../components/Dial/dialer"
import OneValue from "../../components/Dial/OneValue"
import axios from "axios"
import { cashier } from "../../public/endpoins"
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)")
  const [dischargePending, setDischargePending] = useState("")
  const [payment, setPayment] = useState("")
  const [dischargePendingColor, setDischargePendingColor] = useState("")
  const [paymentColor, setPaymentColor] = useState("")

  useEffect(() => {
    axios
      .get(cashier)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          if (
            res.data.dischargePending >= 0 &&
            res.data.dischargePending <= 39
          ) {
            setDischargePendingColor("#60D69F")
          } else if (
            res.data.dischargePending >= 40 &&
            res.data.dischargePending <= 79
          ) {
            setDischargePendingColor("#FFBC28")
          } else if (res.data.dischargePending >= 80) {
            setDischargePendingColor("#FF0000")
          }
          if (res.data.payment >= 0 && res.data.payment <= 39) {
            setPaymentColor("#60D69F")
          } else if (res.data.payment >= 40 && res.data.payment <= 79) {
            setPaymentColor("#FFBC28")
          } else if (res.data.payment >= 80 && res.data.payment <= 100) {
            setPaymentColor("#FF0000")
          }
          setDischargePending(res.data.dischargePending)
          setPayment(res.data.payment)
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
              mainHeading={"Discharge / Disposition Requests Pending"}
              value={dischargePending}
              color={dischargePendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 10,
            marginBottom: matches ? " " : 20,
          }}
        >
          <div style={{ height: 250, width: "100%" }}>
            <OneValue
              heading={"Amount Collected"}
              time={payment}
              colorTime={paymentColor}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
