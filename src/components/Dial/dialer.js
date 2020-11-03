import React from "react";
import { render } from "react-dom";

// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Animation
// import { easeQuadInOut } from "d3-ease";
// import AnimatedProgressProvider from "./AnimatedProgressProvider";
// import ChangingProgressProvider from "./ChangingProgressProvider";

// Radial separators
import RadialSeparators from "./RadialSeperators";

const percentage = 66;

function Dialer() {
  return (
    <div style={{width:400, height:400, backgroundColor:"white"}}>
    <div style={{width:110, height:110,}}>
      {/* <Example label="Progressbar with separators"> */}
        {/* <p style={{ position: "fixed", fontSize: 10, top: 10 }}>00</p>
        <p style={{ position: "absolute", fontSize: 10 }}>40</p>
        <p
          style={{
            position: "absolute",
            fontSize: 10,
            marginLeft: 90,
            marginTop: 20,
          }}
        >
          80
        </p>
        <p
          style={{
            position: "absolute",
            fontSize: 10,
            marginLeft: 85,
            marginTop: 63,
          }}
        >
          100
        </p> */}

        <CircularProgressbarWithChildren
          value={10}
          text={`${80}`}
          strokeWidth={15}
          circleRatio={0.75}
          styles={buildStyles({
            // pathColor: "#f00",
            strokeLinecap: "butt",
            rotation: 1 / 2 + 1 / 8
          })}
        >
          <RadialSeparators
            count={13}
            style={{
              background: "#fff",
              width: "2px",
              // This needs to be equal to props.strokeWidth
              height: `${15}%`,
            }}
          />
        </CircularProgressbarWithChildren>
      {/* </Example> */}

      {/* <Example label="Dashboard/speedometer">
        <ChangingProgressProvider values={[0, 20, 80]}>
          {(value) => (
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "butt",
                trailColor: "#eee",
              })}
            />
          )}
        </ChangingProgressProvider>
      </Example> */}
    </div>
    </div>

  );
}

export default Dialer;
