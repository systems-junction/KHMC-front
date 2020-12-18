import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import DashboardComponent from "../../components/DashboardComponent/dashboardComponent";

import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import axios from "axios";
import { committeeMember } from "../../public/endpoins";
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");

  const [purchaseRequests, setPurchaseRequests] = useState({});
  const [purchaseOrders, setpurchaseOrders] = useState({});
  const [requestColor, setRequestColor] = useState("");
  const [orderColor, setOrderColor] = useState("");

  useEffect(() => {
    axios
      .get(committeeMember)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (
            (res.data.purchaseRequest.prPending ||
              res.data.purchaseRequest.prApproved ||
              res.data.purchaseRequest.prRejected ||
              res.data.purchaseRequest.prModified ||
              res.data.purchaseRequest.prOnHold >= 0) &&
            (res.data.purchaseRequest.prPending ||
              res.data.purchaseRequest.prApproved ||
              res.data.purchaseRequest.prRejected ||
              res.data.purchaseRequest.prModified ||
              res.data.purchaseRequest.prOnHold <= 39)
          ) {
            setRequestColor("#60D69F");
          } else if (
            (res.data.purchaseRequest.prPending ||
              res.data.purchaseRequest.prApproved ||
              res.data.purchaseRequest.prRejected ||
              res.data.purchaseRequest.prModified ||
              res.data.purchaseRequest.prOnHold >= 40) &&
            (res.data.purchaseRequest.prPending ||
              res.data.purchaseRequest.prApproved ||
              res.data.purchaseRequest.prRejected ||
              res.data.purchaseRequest.prModified ||
              res.data.purchaseRequest.prOnHold <= 79)
          ) {
            setRequestColor("#FFBC28");
          } else if (
            (res.data.purchaseRequest.prPending ||
              res.data.purchaseRequest.prApproved ||
              res.data.purchaseRequest.prRejected ||
              res.data.purchaseRequest.prModified ||
              res.data.purchaseRequest.prOnHold >= 80) &&
            (res.data.purchaseRequest.prPending ||
              res.data.purchaseRequest.prApproved ||
              res.data.purchaseRequest.prRejected ||
              res.data.purchaseRequest.prModified ||
              res.data.purchaseRequest.prOnHold <= 100)
          ) {
            setRequestColor("#FF0000");
          }
          if (
            (res.data.purchaseOrder.poPending ||
              res.data.purchaseOrder.poApproved ||
              res.data.purchaseOrder.poRejected ||
              res.data.purchaseOrder.poModified ||
              res.data.purchaseOrder.poOnHold >= 0) &&
            (res.data.purchaseOrder.poPending ||
              res.data.purchaseOrder.poApproved ||
              res.data.purchaseOrder.poRejected ||
              res.data.purchaseOrder.poModified ||
              res.data.purchaseOrder.poOnHold <= 39)
          ) {
            setOrderColor("#60D69F");
          } else if (
            (res.data.purchaseOrder.poPending ||
              res.data.purchaseOrder.poApproved ||
              res.data.purchaseOrder.poRejected ||
              res.data.purchaseOrder.poModified ||
              res.data.purchaseOrder.poOnHold >= 40) &&
            (res.data.purchaseOrder.poPending ||
              res.data.purchaseOrder.poApproved ||
              res.data.purchaseOrder.poRejected ||
              res.data.purchaseOrder.poModified ||
              res.data.purchaseOrder.poOnHold <= 79)
          ) {
            setOrderColor("#FFBC28");
          } else if (
            (res.data.purchaseOrder.poPending ||
              res.data.purchaseOrder.poApproved ||
              res.data.purchaseOrder.poRejected ||
              res.data.purchaseOrder.poModified ||
              res.data.purchaseOrder.poOnHold >= 80) &&
            (res.data.purchaseOrder.poPending ||
              res.data.purchaseOrder.poApproved ||
              res.data.purchaseOrder.poRejected ||
              res.data.purchaseOrder.poModified ||
              res.data.purchaseOrder.poOnHold <= 100)
          ) {
            setOrderColor("#FF0000");
          }
          setPurchaseRequests(res.data.purchaseRequest);
          setpurchaseOrders(res.data.purchaseOrder);
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
          <div style={{}}>
            <Dialer
              mainHeading={"Purchase Requests Pending (Manual)"}
              value={purchaseRequests.prPending}
              color={requestColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={
                purchaseRequests.finalTat ? purchaseRequests.finalTat : "00"
              }
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
            <TwoValue
              heading1={"Purchase Requests Approved"}
              time1={purchaseRequests.prApproved}
              heading2={"Purchase Requests Rejected"}
              time1Color={requestColor}
              time2Color={requestColor}
              time2={purchaseRequests.prRejected}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{ height: 250, width: "100%" }}>
            <TwoValue
              heading1={"Purchase Requests Modified"}
              time1={purchaseRequests.prModified}
              time1Color={requestColor}
              time2Color={requestColor}
              heading2={"Purchase Requests OnHold"}
              time2={purchaseRequests.prOnHold}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{}}>
            <Dialer
              mainHeading={"Purchase Orders Pending (Manual)"}
              value={purchaseOrders.poPending}
              color={orderColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={purchaseOrders.finalTat ? purchaseOrders.finalTat : "00"}
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
            <TwoValue
              heading1={"Purchase Orders Approved"}
              time1={purchaseOrders.poApproved}
              time1Color={orderColor}
              time2Color={orderColor}
              heading2={"Purchase Orders Rejected"}
              time2={purchaseOrders.poRejected}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{ height: 250, width: "100%" }}>
            <TwoValue
              heading1={"Purchase Orders Modified"}
              time1={purchaseOrders.poModified}
              time1Color={orderColor}
              time2Color={orderColor}
              heading2={"Purchase Orders OnHold"}
              time2={purchaseOrders.poOnHold}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
