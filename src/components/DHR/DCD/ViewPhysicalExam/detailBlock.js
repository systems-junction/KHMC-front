import React from "react";

function MapDataToView(arr) {
  return (
    <div className="row">
      {arr.map((e) => {
        return (
          <div style={{ marginBottom: 20 }}>
            <div className="row">
              <div className="col-md-12">
                <span style={{ color: "#939393", fontSize: 15 }}>
                  {e.subheading}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <span style={{ fontWeight: "900" }}>{e.description}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function detailBlock(props) {
  return (
    <div>
      <div className="col-md-12" style={{ paddingLeft: 0 }}>
        <h6 style={{ color: "#2F77D1", fontWeight: "700" }}>{props.heading}</h6>
      </div>
      {props.subArray.map((e, index, arrObj) => {
        // arrObj.splice(0, index + 2);
        let i = 0;
        if (i < props.subArray.length) {
          let arr = props.subArray.slice(i, props.subArray.columnSize + i);
          i = i + props.subArray.columnSize;
          return (
            // <div style={{ marginBottom: 20 }}>
            //   <div className="row">
            //     <div className="col-md-12">
            //       <span style={{ color: "#939393", fontSize: 15 }}>
            //         {e.subheading}
            //       </span>
            //     </div>
            //   </div>
            //   <div className="row">
            //     <div className="col-md-12">
            //       <span style={{ fontWeight: "900" }}>{e.description}</span>
            //     </div>
            //   </div>
            // </div>

            MapDataToView(arr)
          );
        }
      })}

      {/* <div
        className="row"
        style={{ border: "1px solid #E7E7E7", marginBottom: "20px" }}
      ></div> */}
      <hr width={"100%"} heigh={20} />
    </div>
  );
}

// <div className="col-md-12" style={{ marginTop: 10 }}>
//         <div style={{}}>
//           {e.detail_Image &&
//             e.detail_Image.map((image) => (
//               <span style={{ paddingRight: 10 }}>
//                 {" "}
//                 <img src={image} />
//               </span>
//             ))}
//         </div>
//       </div>
