import React from "react";

import KHMC_White from "../../assets/img/KHMC_White.png";

import Influence_white from "../../assets/img/Influence_white.png";

class Header extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // position: 'fixed',
          width: "100%",
          // height: '100%',
          // backgroundColor: '#0154E8'
        }}
      >
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            marginLeft: "4%",
            marginRight: "4%",
            // backgroundColor: 'red'
          }}
        >
          <div style={{ flex: 1, display: "flex" }}>
            <img src={KHMC_White} style={{ maxWidth: "50%", height: "auto" }} />
          </div>
          <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            <img
              src={Influence_white}
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default React.memo(Header);
