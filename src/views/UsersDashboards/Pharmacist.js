import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import OneValue from "../../components/Dial/OneValue";
import axios from "axios";
import { pharmacist } from "../../public/endpoins";
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [orderPending, setOrderPending] = useState("");
  const [rrtwh, setRrtwh] = useState("");

  const [tatForOrderToCompletion, setTatForOrderToCompletion] = useState("");
  const [tatForRequestToCompletion, setTatForRequestToCompletion] = useState(
    ""
  );

  // colors
  const [orderPendingColor, setOrderPendingColor] = useState("");
  const [rrtwhColor, setRrtwhColor] = useState("");

  useEffect(() => {
    axios
      .get(pharmacist)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (res.data.rrtwh >= 0 && res.data.rrtwh <= 39) {
            setRrtwhColor("#60D69F");
          } else if (res.data.rrtwh >= 40 && res.data.rrtwh <= 79) {
            setRrtwhColor("#FFBC28");
          } else if (res.data.rrtwh >= 80 && res.data.rrtwh <= 100) {
            setRrtwhColor("#FF0000");
          }
          if (res.data.orderPending >= 0 && res.data.orderPending <= 39) {
            setOrderPendingColor("#60D69F");
          } else if (
            res.data.orderPending >= 40 &&
            res.data.orderPending <= 70
          ) {
            setOrderPendingColor("#FFBC28");
          } else if (
            res.data.orderPending >= 80 &&
            res.data.orderPending <= 100
          ) {
            setOrderPendingColor("#FF0000");
          }

          setOrderPending(res.data.orderPending);
          setRrtwh(res.data.rrtwh);

          setTatForOrderToCompletion(res.data.tat1);
          setTatForRequestToCompletion(res.data.tat2);
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
              mainHeading={
                "Orders Pending (In-Patient, Out-Patient, Discharge/Disposition Patient)"
              }
              value={orderPending}
              color={orderPendingColor}
              subHeading={"TAT"}
              childHeading={"Request Receipt to Completion"}
              time={tatForOrderToCompletion ? tatForOrderToCompletion : "00"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Replenishment Requests to Warehouse Pending"}
              value={rrtwh}
              color={rrtwhColor}
              subHeading={"TAT"}
              childHeading={"Replenishment Request Send to Completion"}
              time={
                tatForRequestToCompletion ? tatForRequestToCompletion : "00"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
