import React, { useEffect, useState } from "react";

import DashboardComponent from "../../components/DashboardComponent/dashboardComponent";

import Dialer from "../../components/Dial/dialer";

export default function CommitteeMemberDashboard() {
  return (
    <div className="container-fluid" style={{marginBottom:10}}>
      <div className="row">
        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{ }}>
            <Dialer
              mainHeading={"Patients Treatment/Medication Pending"}
              value={55}
              color={"#FFBC28"}
              subHeading={"TAT"}
              childHeading={"Registration to Assessment/Triage"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{ height: 250, width: "100%" }}>
            <Dialer
              mainHeading={"Patients Treatment/Medication Pending"}
              value={55}
              color={"#FFBC28"}
              subHeading={"TAT"}
              childHeading={"Registration to Assessment/Triage"}
              time={"70"}
            />
          </div>
        </div>

        <div
          className="col-md-4"
          style={{ paddingLeft: 4, paddingRight: 4, marginTop: 10 }}
        >
          <div style={{ height: 250, width: "100%" }}>
            <Dialer
              mainHeading={"Patients Treatment/Medication Pending"}
              value={55}
              color={"#FFBC28"}
              subHeading={"TAT"}
              childHeading={"Registration to Assessment/Triage"}
              time={"70"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
