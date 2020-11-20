import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import axios from "axios";
import { purchasingOfficer } from "../../public/endpoins";
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [externalReturn, setExternalReturn] = useState({});
  const [purchaseOrders, setPurchaseOrders] = useState("");
  const [externalReturnColor, setExternalReturnColor] = useState("");
  const [purchaseOrdersColor, setPurchaseOrdersColor] = useState("");

  useEffect(() => {
    axios
      .get(purchasingOfficer)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (
            (res.data.externalReturn.pending ||
              res.data.externalReturn.approved ||
              res.data.externalReturn.denied >= 0) &&
            (res.data.externalReturn.pending ||
              res.data.externalReturn.approved ||
              res.data.externalReturn.denied <= 39)
          ) {
            setExternalReturnColor("#60D69F");
          } else if (
            (res.data.externalReturn.pending ||
              res.data.externalReturn.approved ||
              res.data.externalReturn.denied >= 40) &&
            (res.data.externalReturn.pending ||
              res.data.externalReturn.approved ||
              res.data.externalReturn.denied <= 79)
          ) {
            setExternalReturnColor("#FFBC28");
          } else if (
            (res.data.externalReturn.pending ||
              res.data.externalReturn.approved ||
              res.data.externalReturn.denied >= 80) &&
            (res.data.externalReturn.pending ||
              res.data.externalReturn.approved ||
              res.data.externalReturn.denied <= 100)
          ) {
            setExternalReturnColor("#FF0000");
          }
          if (res.data.purchaseOrder >= 0 && res.data.purchaseOrder <= 39) {
            setPurchaseOrdersColor("#60D69F");
          } else if (
            res.data.purchaseOrder >= 40 &&
            res.data.purchaseOrder <= 79
          ) {
            setPurchaseOrdersColor("#FFBC28");
          } else if (
            res.data.purchaseOrder >= 80 &&
            res.data.purchaseOrder <= 100
          ) {
            setPurchaseOrdersColor("#FF0000");
          }
          console.log("purchaseOrder", res.data.purchaseOrder);
          setExternalReturn(res.data.externalReturn);
          setPurchaseOrders(res.data.purchaseOrder);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid" style={{ marginBottom: 10 }}>
      <div className="row" style={{ marginBottom: matches ? "" : 20 }}>
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Return Requests Pending"}
              value={externalReturn.pending}
              color={externalReturnColor}
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
              mainHeading={"Purchase Order"}
              value={purchaseOrders}
              color={purchaseOrdersColor}
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
            <TwoValue
              heading1={"Total Return Requests Approved"}
              time1={externalReturn.approved}
              time1Color={externalReturnColor}
              time2Color={externalReturnColor}
              heading2={"Total Return Requests Denied"}
              time2={externalReturn.denied}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
