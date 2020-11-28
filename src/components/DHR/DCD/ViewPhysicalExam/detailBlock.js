import React from "react";

export default function detailBlock(props) {
  let i = 0;

  function MapDataToView(arr) {
    return (
      <div className="row">
        {arr.map((e, index) => {
          return (
            <div
              className={`col-md-${12 / props.columnSize}`}
              style={{ marginTop: 5 }}
              key={index}
            >
              <span style={{ color: "#939393", fontSize: 14 }}>
                {e.subheading}
              </span>
              <br />
              <span style={{ fontWeight: "900", fontSize: 15 }}>
                {e.description !== "" ? e.description : "N/A"}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="col-md-12" style={{ paddingLeft: 0 }}>
        <h6 style={{ color: "#2F77D1", fontWeight: "700" }}>{props.heading}</h6>
      </div>
      {props.subArray.map((e, index) => {
        if (i < props.subArray.length) {
          let arr = props.subArray.slice(i, props.columnSize + i);
          i = i + props.columnSize;
          return MapDataToView(arr);
        }
      })}

      <hr width={"100%"} />
    </div>
  );
}
