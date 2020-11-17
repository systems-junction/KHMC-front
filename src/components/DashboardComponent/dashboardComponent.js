import React, { useEffect, useState } from "react";

import Dialer from "../Dial/dialer";
import LineChart from "../LineChart/LineChart";

import Graph from "../Graph/graph";

function DashboardComponent(props) {
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        // width: 310,
        height: 250,
        // borderRadius: 10,
        // width:"100%"
      }}
      onClick={() => {
        setShowGraph(!showGraph);
      }}
    >
      {!showGraph ? (
        <Dialer
          mainHeading={"Patients Treatment/Medication Pending"}
          value={55}
          color={"#FFBC28"}
          subHeading={"TAT"}
          childHeading={"Registration to Assessment/Triage"}
          time={"70"}
        />
      ) : props.data.length !== 0 ? (
        // <LineChart
        //   data={props.data}
        //   width={250}
        //   height={200}
        //   scaleWidth={200}
        //   scaleHeight={150}
        // />

        <Graph
          data={props.data}
          mainHeadingForGraph={"Patients Treatment/Medication Pending"}
          graphValue={20}
        />
      ) : (
        undefined
      )}
    </div>
  );
}

export default DashboardComponent;
