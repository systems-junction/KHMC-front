// import React from 'react';

// import TextField from '@material-ui/core/TextField';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import Snackbar from "../../components/Snackbar/Snackbar";
import Notification from "../../components/Snackbar/Notification.js";

import AddAlert from "@material-ui/icons/AddAlert";

import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import RCM from "../../assets/img/RCM.png";
import WMS from "../../assets/img/WMS.png";

import FIN from "../../assets/img/FIN.png";
import Control_Room from "../../assets/img/Control_Room.png";

import React, { useEffect } from "react";
import "./MenuPage.css";
import { render } from "react-dom";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openApps: false,
    };
  }

  render() {
    // if (this.state.openApps) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#2B62CC",
        }}
      >
        <div
          style={{
            alignItems: "center",
            flex: 1,
            display: "flex",
            minHeight: "15%",
            width: "100%",
            position: "fixed",
            zIndex: 1,
          }}
        >
          <Header />
        </div>

        <div
          className="menupage"
          style={{
            display: "flex",
            flex: 4,
            minHeight: "85%",
            alignItems: "center",
          }}
        >
          {this.state.openApps ? (
            <section>
              <div
                className="mainmenu circle lightBlue"
                style={{ cursor: "pointer" }}
                onClick={() => this.setState({ openApps: false })}
              >
                <h5
                  style={{
                    position: "absolute",
                    top: 15,
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Control Room
                </h5>
                <img
                  src={Control_Room}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 60,
                    bottom: -20,
                  }}
                />{" "}
              </div>

              <div
                className="submenu circle orange"
                style={{ cursor: "pointer" }}
              >
                <h5
                  style={{
                    position: "absolute",
                    top: 20,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  RCM
                </h5>
                <img
                  src={RCM}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 50,
                    bottom: -20,
                  }}
                />{" "}
              </div>

              <div
                className="submenu1 circle gray"
                onClick={() => this.props.history.push("/home/bureturn")}
              >
                <h5 style={{ textAlign: "center" }}>BU Return</h5>
              </div>

              <div
                className="submenu2 circle orange"
                onClick={() =>
                  this.props.history.push("/home/materialreceiving")
                }
              >
                <h5 style={{ textAlign: "center" }}>Material Receiving</h5>
              </div>

              <div
                className="submenu3 circle green"
                onClick={() => this.props.history.push("/home/bustockinlog")}
              >
                <h5 style={{ textAlign: "center", maxWidth: "60%" }}>
                  BU Stock In Log
                </h5>
              </div>

              <div
                className="submenu4 circle lightBlue"
                style={{ cursor: "pointer" }}
                onClick={() => this.props.history.push("/home/receiveitems")}
              >
                <h5 style={{ textAlign: "center", maxWidth: "60%" }}>
                  Receive Items
                </h5>
              </div>

              <div
                className="submenu5 circle yellow"
                style={{ cursor: "pointer" }}
              >
                <h5
                  style={{
                    position: "absolute",
                    top: 20,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  FIN
                </h5>
                <img
                  src={FIN}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 50,
                    bottom: -20,
                  }}
                />{" "}
              </div>

              <div
                className="submenu6 circle gray"
                style={{ cursor: "pointer" }}
                onClick={() => this.props.history.push("controlroom/wms")}
              >
                <h5
                  style={{
                    position: "absolute",
                    top: 20,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  WMS
                </h5>
                <img
                  src={WMS}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 50,
                    bottom: -20,
                  }}
                />{" "}
              </div>
            </section>
          ) : (
            <div
              style={{
                flex: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() =>
                  this.setState({ openApps: !this.state.openApps })
                }
                style={{
                  borderRadius: 110 / 2,
                  backgroundColor: "#4e84db",
                  width: 110,
                  height: 110,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h6
                  style={{
                    position: "absolute",
                    top: 20,
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                    color: "white",
                    maxWidth: "90%",
                  }}
                >
                  Control Room
                </h6>
                <img
                  src={Control_Room}
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                    position: "absolute",
                    top: 55,
                    // bottom: -30
                  }}
                />{" "}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
    //   } else {
    //     return (
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           flex: 1,
    //           position: "fixed",
    //           width: "100%",
    //           height: "100%",
    //           backgroundColor: "#2B62CC",
    //         }}
    //       >
    //         <div style={{ alignItems: "center", flex: 0.7, display: "flex" }}>
    //           <Header />
    //         </div>
    //       </div>
    //     );
    //   }
  }
}

export default HomeScreen;
