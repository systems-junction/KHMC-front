import React, { useEffect, useState } from "react";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Radial separators
import RadialSeparators from "./RadialSeperators";

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
        width: "100%",
        // height: '100%',
        backgroundColor: "white",
        borderRadius: 5,
        height: 270,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "14%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: "700",
            opacity: "70%",
            textAlign: "center",
          }}
        >
          {props.mainHeading}
        </span>
      </div>

      <div
        style={{
          height: "58%",
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: 135, height: 135 }}>
          <p
            style={{
              ...styles.stylesForLabelValue,
              marginTop: 105,
              marginLeft: -5,
            }}
          >
            00
          </p>

          <span
            style={{
              position: "absolute",
              transform: "rotate(-10deg)",
              zIndex: 3,
              marginTop: 66,
              fontWeight: "bold",
              opacity: "70%",
              marginLeft: -8,
            }}
          >
            -
          </span>

          <span
            style={{
              ...styles.stylesForBars,
              transform: "rotate(20deg)",
              marginTop: 30,
              marginLeft: -4,
            }}
          >
            -
          </span>

          <span
            style={{
              transform: "rotate(75deg)",
              marginTop: -14,
              marginLeft: 45,
              ...styles.stylesForBars,
            }}
          >
            -
          </span>

          <span
            style={{
              transform: "rotate(105deg)",
              marginTop: -14,
              marginLeft: 85,
              ...styles.stylesForBars,
            }}
          >
            -
          </span>

          <span
            style={{
              transform: "rotate(130deg)",
              marginTop: 4,
              marginLeft: 115,
              ...styles.stylesForBars,
            }}
          >
            -
          </span>

          <span
            style={{
              transform: "rotate(10deg)",
              marginTop: 65,
              marginLeft: 136,
              ...styles.stylesForBars,
            }}
          >
            -
          </span>

          <p
            style={{
              ...styles.stylesForLabelValue,
              marginLeft: 7,
              marginTop: 3,
            }}
          >
            40
          </p>
          <p
            style={{
              ...styles.stylesForLabelValue,
              marginTop: 35,
              marginLeft: 140,
            }}
          >
            80
          </p>
          <p
            style={{
              ...styles.stylesForLabelValue,
              marginTop: 103,
              marginLeft: 125,
            }}
          >
            100
          </p>

          <CircularProgressbarWithChildren
            value={props.value}
            text={`${""}`}
            strokeWidth={20}
            circleRatio={0.77}
            styles={buildStyles({
              strokeLinecap: "butt",
              rotation: 1 / 2 + 1 / 8.7,
              pathColor: props.color,
              textColor: props.color,
              trailColor: "#F2F2F2",
              width: 30,
              height: 40,
              textSize: "30px",
            })}
          >
            <>
              <RadialSeparators
                count={13}
                style={{
                  background: "#fff",
                  width: "2px",
                  // This needs to be equal to props.strokeWidth
                  height: `${20}%`,
                  width: 2.5,
                }}
              />
              <span
                style={{
                  fontFamily: "Roboto",
                  fontSize: 37,
                  color: props.color,
                  fontWeight: "600",
                }}
              >
                {props.value}
              </span>
            </>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <div style={{ width: "100%", height: 0.5, backgroundColor: "grey" }} />

      <div
        className="container-fluid"
        style={{
          height: "27.5%",
        }}
      >
        <div
          className="row"
          style={{
            height: "100%",
          }}
        >
          <div
            className="col-9"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span style={{ fontWeight: "bolder", opacity: "70%" }}>
              {props.subHeading}
            </span>
            <span style={{ fontSize: 12, opacity: "70%" }}>
              {props.childHeading}
            </span>
          </div>

          <div
            className="col-3"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              paddingLeft: 0,
              paddingRight: 0,
              alignItems: "center",
            }}
          >
            <span
              style={{
                color:
                  props.time <= 40
                    ? "#60D69F"
                    : props.time <= 80
                    ? "#ffbc28"
                    : "#F24028",
                fontSize: 40,
                fontWeight: "900",
                position: "absolute",
                marginTop: -10,
              }}
            >
              {props.time}
            </span>
            <span
              style={{
                fontSize: 13,
                position: "absolute",
                marginTop: 43,
                opacity: "70%",
              }}
            >
              Minutes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialer;
