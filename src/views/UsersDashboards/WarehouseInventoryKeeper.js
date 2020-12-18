import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import axios from "axios";
import { wareHouseInventoryKeeper } from "../../public/endpoins";
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [
    replenishmentRequestPending,
    setReplenishmentRequestPending,
  ] = useState({});
  const [poCompletionPending, setPoCompletionPending] = useState("");
  const [prVerificationPending, setPrVerificationPending] = useState("");
  const [jitPrVerificationPending, setJitPrVerificationPending] = useState("");

  const [finalTatForPr, setFinalTatForPr] = useState("");
  const [finalTatForJitPr, setFinalTatForJitPr] = useState("");
  const [finalTatpo, setfinalTatpo] = useState("");

  // colors
  const [
    replenishmentRequestPendingColor,
    setReplenishmentRequestPendingColor,
  ] = useState({});
  const [poCompletionPendingColor, setPoCompletionPendingColor] = useState("");
  const [prVerificationPendingColor, setPrVerificationPendingColor] = useState(
    ""
  );
  const [
    jitPrVerificationPendingColor,
    setJitPrVerificationPendingColor,
  ] = useState("");

  useEffect(() => {
    axios
      .get(wareHouseInventoryKeeper)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (
            (res.data.replenishmentRequestPending.pharma ||
              res.data.replenishmentRequestPending.nonPharma ||
              res.data.replenishmentRequestPending.nonMedical >= 0) &&
            (res.data.replenishmentRequestPending.pharma ||
              res.data.replenishmentRequestPending.nonPharma ||
              res.data.replenishmentRequestPending.nonMedical <= 39)
          ) {
            setReplenishmentRequestPendingColor("#60D69F");
          } else if (
            (res.data.replenishmentRequestPending.pharma ||
              res.data.replenishmentRequestPending.nonPharma ||
              res.data.replenishmentRequestPending.nonMedical >= 40) &&
            (res.data.replenishmentRequestPending.pharma ||
              res.data.replenishmentRequestPending.nonPharma ||
              res.data.replenishmentRequestPending.nonMedical <= 70)
          ) {
            setReplenishmentRequestPendingColor("#FFBC28");
          } else if (
            (res.data.replenishmentRequestPending.pharma ||
              res.data.replenishmentRequestPending.nonPharma ||
              res.data.replenishmentRequestPending.nonMedical >= 80) &&
            (res.data.replenishmentRequestPending.pharma ||
              res.data.replenishmentRequestPending.nonPharma ||
              res.data.replenishmentRequestPending.nonMedical <= 100)
          ) {
            setReplenishmentRequestPendingColor("#FF0000");
          }
          if (
            res.data.poCompletionPending >= 0 &&
            res.data.poCompletionPending <= 39
          ) {
            setPoCompletionPendingColor("#60D69F");
          } else if (
            res.data.poCompletionPending >= 40 &&
            res.data.poCompletionPending <= 79
          ) {
            setPoCompletionPendingColor("#FFBC28");
          } else if (
            res.data.poCompletionPending >= 80 &&
            res.data.poCompletionPending <= 100
          ) {
            setPoCompletionPendingColor("#FF0000");
          }
          if (
            res.data.prVerificationPending >= 0 &&
            res.data.prVerificationPending <= 39
          ) {
            setPrVerificationPendingColor("#60D69F");
          } else if (
            res.data.prVerificationPending >= 40 &&
            res.data.prVerificationPending <= 79
          ) {
            setPrVerificationPendingColor("#FFBC28");
          } else if (
            res.data.prVerificationPending >= 80 &&
            res.data.prVerificationPending <= 100
          ) {
            setPrVerificationPendingColor("#FF0000");
          }

          if (
            res.data.poCompletionPending >= 0 &&
            res.data.poCompletionPending <= 39
          ) {
            setJitPrVerificationPendingColor("#60D69F");
          } else if (
            res.data.poCompletionPending >= 40 &&
            res.data.poCompletionPending <= 79
          ) {
            setJitPrVerificationPendingColor("#FFBC28");
          } else if (
            res.data.poCompletionPending >= 80 &&
            res.data.poCompletionPending <= 100
          ) {
            setJitPrVerificationPendingColor("#FF0000");
          }
          setReplenishmentRequestPending(res.data.replenishmentRequestPending);
          setPoCompletionPending(res.data.poCompletionPending);
          setPrVerificationPending(res.data.prVerificationPending);
          setJitPrVerificationPending(res.data.jitPrVerificationPending);

          setFinalTatForPr(res.data.finalTatForPr);
          setFinalTatForJitPr(res.data.finalTatForJitPr);
          setfinalTatpo(res.data.finalTatpo);
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
              mainHeading={"Pharma Replenishment Requests Pending"}
              value={replenishmentRequestPending.pharma}
              color={replenishmentRequestPendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={
                replenishmentRequestPending.finalTatForPharma
                  ? replenishmentRequestPending.finalTatForPharma
                  : "00"
              }
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Non-Pharma(Medical) Replenishment Request Pending"}
              value={replenishmentRequestPending.nonPharma}
              color={replenishmentRequestPendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={
                replenishmentRequestPending.finalTatForNonPharma
                  ? replenishmentRequestPending.finalTatForNonPharma
                  : "00"
              }
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Non-Medical Replenishment Request Pending"}
              value={replenishmentRequestPending.nonMedical}
              color={replenishmentRequestPendingColor}
              subHeading={"TAT"}
              childHeading={"Request received to Processed"}
              time={
                replenishmentRequestPending.finalTatForNonMed
                  ? replenishmentRequestPending.finalTatForNonMed
                  : "00"
              }
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
              mainHeading={
                "Purchase Request Verifications Pending(for information)"
              }
              value={prVerificationPending}
              color={prVerificationPendingColor}
              subHeading={"TAT"}
              childHeading={"Generation to Verification"}
              time={finalTatForPr ? finalTatForPr : "00"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <Dialer
              mainHeading={"Purchase Orders Completions(from Vendor) Pending"}
              value={poCompletionPending}
              color={poCompletionPendingColor}
              subHeading={"TAT"}
              childHeading={"Generation to Verification"}
              time={finalTatpo ? finalTatpo : "00"}
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
                "JIT Purchase Request Verifications Pending(for information)"
              }
              value={jitPrVerificationPending}
              color={jitPrVerificationPendingColor}
              subHeading={"TAT"}
              childHeading={"Generation to Verification"}
              time={finalTatForJitPr ? finalTatForJitPr : "00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
