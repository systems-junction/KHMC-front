import React from "react"

export default function ViewCareStream(props) {
  return (
    <div>
      <div className="col-md-12" style={{ paddingLeft: 0 }}>
        <h4
          style={{ color: "#2F77D1", fontSize: "xx-large", fontWeight: "bold" }}
        >
          {" "}
          {props.heading}
        </h4>
      </div>
      {props.subArray.map((e) => {
        return (
          <div style={{ marginBottom: 20 }}>
            <div className="row">
              <div className="col-md-12">
                <span style={{ color: "#939393", fontWeight: 600 }}>
                  {e.subheading}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <span style={{ fontWeight: "bold", fontSize: "larger" }}>
                  {e.description}
                </span>
              </div>
              <div className="col-md-12">
                <img src={e.detail_Image} />{" "}
              </div>
            </div>
          </div>
        )
      })}

      <div
        className="row"
        style={{ border: "1px solid #E7E7E7", marginBottom: "20px" }}
      ></div>
    </div>
  )
}
