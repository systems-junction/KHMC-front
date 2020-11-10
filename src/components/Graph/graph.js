import React, { useEffect, useState } from "react";

import LineChart from "../LineChart/LineChart";

const styles = {
  stylesForLabelValue: {
    position: "absolute",
    fontSize: 10,
    opacity: "70%",
  },

  stylesForBars: {
    position: "absolute",
    fontWeight: "bold",
    opacity: "70%",
  },
};

function Dialer(props) {
  const [scaleOnXside, setScaleOnXside] = useState([]);
  const [options, setOptions] = useState("");

  useEffect(() => {
    let temp = [];
    for (let i = 6; i > 0; i--) {
      let date = new Date();

      var hours = date.getHours() - i;
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      minutes = "00";
      var strTime = hours + ":" + minutes + " " + ampm;
      temp.push(hours);
      console.log(strTime);
    }

    setOptions(options);
  }, []);

  return (
    <div
      style={{
        width: 310,
        height: 250,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "10%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: "700",
            // opacity: "70%",
            color:'grey'
          }}
        >
          Last 06 Hours
        </span>
      </div>

      <div
        style={{
          display: "flex",
          height: "12%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: "bold",
            opacity: "70%",
          }}
        >
          {props.mainHeadingForGraph}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          height: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <strong
          style={{
            fontSize: 40,
            // fontWeight: "900",
            opacity: "70%",
            color:"#2973CF",
            position:'absolute',
            marginTop:4
          }}
        >
          {props.graphValue}
        </strong>
      </div>


      <div
        className="container-fluid"
        style={{
          display: "flex",
          height: "70%",
          // justifyContent: "center",
        //   alignItems: "center",
        }}
      >
        <div className="row">
          <div className="col-sm-12" style={{}}>
            <LineChart
              data={props.data}
              width={250}
              height={140}
              scaleWidth={180}
              scaleHeight={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialer;
