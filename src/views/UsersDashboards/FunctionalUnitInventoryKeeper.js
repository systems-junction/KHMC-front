import React, { useEffect, useState } from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Dialer from "../../components/Dial/dialer"
import TwoValue from "../../components/Dial/TwoValue"
import axios from "axios"
import { functionalUnitInventoryKeeper } from "../../public/endpoins"
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)")
  const [fulfillmentPending, setFulfillmentPending] = useState({})
  const [orderPending, setOrderPending] = useState({})
  const [jitRrVerificationPending, setJitRrVerificationPending] = useState("")

  // colors
  const [fulfillmentPendingColor, setFulfillmentPendingColor] = useState("")
  const [orderPendingColor, setOrderPendingColor] = useState("")
  const [
    jitRrVerificationPendingColor,
    setJitRrVerificationPendingColor,
  ] = useState("")

  useEffect(() => {
    axios
      .get(functionalUnitInventoryKeeper)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          if (
            (res.data.fulfillmentPending.pharma ||
              res.data.fulfillmentPending.nonPharma ||
              res.data.fulfillmentPending.nonMedical >= 0) &&
            (res.data.fulfillmentPending.pharma ||
              res.data.fulfillmentPending.nonPharma ||
              res.data.fulfillmentPending.nonMedical <= 39)
          ) {
            setFulfillmentPendingColor("#60D69F")
          } else if (
            (res.data.fulfillmentPending.pharma ||
              res.data.fulfillmentPending.nonPharma ||
              res.data.fulfillmentPending.nonMedical >= 40) &&
            (res.data.fulfillmentPending.pharma ||
              res.data.fulfillmentPending.nonPharma ||
              res.data.fulfillmentPending.nonMedical <= 70)
          ) {
            setFulfillmentPendingColor("#FFBC28")
          } else if (
            (res.data.fulfillmentPending.pharma ||
              res.data.fulfillmentPending.nonPharma ||
              res.data.fulfillmentPending.nonMedical >= 80) &&
            (res.data.fulfillmentPending.pharma ||
              res.data.fulfillmentPending.nonPharma ||
              res.data.fulfillmentPending.nonMedical <= 100)
          ) {
            setFulfillmentPendingColor("#FF0000")
          }
          if (
            (res.data.orderPending.pharma ||
              res.data.orderPending.nonPharma ||
              res.data.orderPending.nonMedical >= 0) &&
            (res.data.orderPending.pharma ||
              res.data.orderPending.nonPharma ||
              res.data.orderPending.nonMedical <= 39)
          ) {
            setOrderPendingColor("#60D69F")
          } else if (
            (res.data.orderPending.pharma ||
              res.data.orderPending.nonPharma ||
              res.data.orderPending.nonMedical >= 40) &&
            (res.data.orderPending.pharma ||
              res.data.orderPending.nonPharma ||
              res.data.orderPending.nonMedical <= 70)
          ) {
            setOrderPendingColor("#FFBC28")
          } else if (
            (res.data.orderPending.pharma ||
              res.data.orderPending.nonPharma ||
              res.data.orderPending.nonMedical >= 80) &&
            (res.data.orderPending.pharma ||
              res.data.orderPending.nonPharma ||
              res.data.orderPending.nonMedical <= 100)
          ) {
            setOrderPendingColor("#FF0000")
          }

          if (
            res.data.jitRrVerificationPending >= 0 &&
            res.data.jitRrVerificationPending <= 39
          ) {
            setJitRrVerificationPendingColor("#60D69F")
          } else if (
            res.data.jitRrVerificationPending >= 40 &&
            res.data.jitRrVerificationPending <= 79
          ) {
            setJitRrVerificationPendingColor("#FFBC28")
          } else if (
            res.data.jitRrVerificationPending >= 80 &&
            res.data.jitRrVerificationPending <= 100
          ) {
            setJitRrVerificationPendingColor("#FF0000")
          }
          setFulfillmentPending(res.data.fulfillmentPending)
          setOrderPending(res.data.orderPending)
          setJitRrVerificationPending(res.data.jitRrVerificationPending)
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
              mainHeading={"Pharma Orders Pending "}
              value={orderPending.pharma}
              color={orderPendingColor}
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
              mainHeading={"Non-Pharma (Medical) Orders Pending"}
              value={orderPending.nonPharma}
              color={orderPendingColor}
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
              mainHeading={"Non-Medical Orders Pending"}
              value={orderPending.nonMedical}
              color={orderPendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
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
              mainHeading={"Pharma Request for Fulfilment Pending"}
              value={fulfillmentPending.pharma}
              color={fulfillmentPendingColor}
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
              mainHeading={
                "Non-Pharma (Medical) Request for Fulfilment Pending"
              }
              value={fulfillmentPending.nonPharma}
              color={fulfillmentPendingColor}
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
              mainHeading={"Non-Medical Request for Fulfilment Pending"}
              value={fulfillmentPending.nonMedical}
              color={fulfillmentPendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={"70"}
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
              mainHeading={"JIT Request for Fulfilment Pending"}
              value={jitRrVerificationPending}
              color={jitRrVerificationPendingColor}
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
