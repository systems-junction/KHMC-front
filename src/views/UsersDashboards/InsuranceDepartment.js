import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import OneValue from "../../components/Dial/OneValue";
import axios from "axios";
import { insuranceDepartment } from "../../public/endpoins";
export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [insuranceBillsPending, setInsuranceBillsPending] = useState("");
  const [par, setPar] = useState({});

  // colors
  const [insuranceBillsPendingColor, setInsuranceBillsPendingColor] = useState(
    ""
  );
  const [parColor, setParColor] = useState("");

  useEffect(() => {
    axios
      .get(insuranceDepartment)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (
            (res.data.par.denied ||
              res.data.par.rejected ||
              res.data.par.approved >= 0) &&
            (res.data.par.denied ||
              res.data.par.rejected ||
              res.data.par.approved <= 39)
          ) {
            setParColor("#60D69F");
          } else if (
            (res.data.par.denied ||
              res.data.par.rejected ||
              res.data.par.approved >= 40) &&
            (res.data.par.denied ||
              res.data.par.rejected ||
              res.data.par.approved <= 70)
          ) {
            setParColor("#FFBC28");
          } else if (
            (res.data.par.denied ||
              res.data.par.rejected ||
              res.data.par.approved >= 80) &&
            (res.data.par.denied ||
              res.data.par.rejected ||
              res.data.par.approved <= 100)
          ) {
            setParColor("#FF0000");
          }
          if (
            res.data.insuranceBillsPending >= 0 &&
            res.data.insuranceBillsPending <= 39
          ) {
            setInsuranceBillsPendingColor("#60D69F");
          } else if (
            res.data.insuranceBillsPending >= 40 &&
            res.data.insuranceBillsPending <= 70
          ) {
            setInsuranceBillsPendingColor("#FFBC28");
          } else if (
            res.data.insuranceBillsPending >= 80 &&
            res.data.insuranceBillsPending <= 100
          ) {
            setInsuranceBillsPendingColor("#FF0000");
          }

          setPar(res.data.par);
          setInsuranceBillsPending(res.data.insuranceBillsPending);
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
              mainHeading={"Insruance Bills Processing Pending"}
              value={insuranceBillsPending}
              color={insuranceBillsPendingColor}
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
          }}
        >
          <div style={{ height: 250, width: "100%" }}>
            <OneValue
              heading={"Total Pre-Approvals Denied"}
              time={par.denied}
              colorTime={parColor}
            />
          </div>
        </div>
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div>
            <TwoValue
              heading1={"Total Pre-Approvals Approved"}
              time1={par.approved}
              time1Color={parColor}
              time2Color={parColor}
              heading2={"Total Pre-Approvals Rejected"}
              time2={par.rejected}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
