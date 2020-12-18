import React, { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialer from "../../components/Dial/dialer";
import TwoValue from "../../components/Dial/TwoValue";
import OneValue from "../../components/Dial/OneValue";
import axios from "axios";
import { consultant } from "../../public/endpoins";
import cookies from "react-cookies";

export default function CommitteeMemberDashboard() {
  const matches = useMediaQuery("(min-width:600px)");
  const [completed, setCompleted] = useState("");
  const [tat, setCompletedTat] = useState("");

  // colors
  const [completedColor, setCompletedColor] = useState("");

  const [currentUser, setCurrentUser] = useState(
    cookies.load("current_user").staffId
  );

  useEffect(() => {
    axios
      .get(`${consultant}/${currentUser}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          if (res.data.pending >= 0 && res.data.pending <= 39) {
            setCompletedColor("#60D69F");
          } else if (res.data.pending >= 40 && res.data.pending <= 79) {
            setCompletedColor("#FFBC28");
          } else if (res.data.pending >= 80 && res.data.pending <= 100) {
            setCompletedColor("#FF0000");
          }

          setCompleted(res.data.pending);
          setCompletedTat(res.data.tat);
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
              mainHeading={"Consultation Requests Pending"}
              value={completed}
              color={completedColor}
              subHeading={"TAT"}
              childHeading={"Receipt of Request to Completion"}
              time={tat ? tat : "00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
