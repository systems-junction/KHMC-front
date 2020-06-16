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

import BU from "../../assets/img/business_Unit.png";
import FunctionalUnit from "../../assets/img/Functional Unit.png";
import Items from "../../assets/img/Items.png";

import React, { useEffect } from "react";
import "./MenuPage.css";
import { render } from "react-dom";

import Back from "../../assets/img/Back_Arrow.png";

import KHMC_White from "../../assets/img/KHMC_White.png";

import Influence_white from "../../assets/img/Influence_white.png";

import MenuTree from "../../components/MenuTree/MenuTree";

const admin = [
  { img: Control_Room, text: "Control Room" },
  { img: RCM, text: "RCM" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
  { img: FIN, text: "FIN" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
  { img: Items, text: "Items", path: "controlroom/items" },
  { img: "", text: "Staff", path: "controlroom/staff" },
  { img: Control_Room, text: "ControlRoom" },
];

const buHead = [
  { img: Control_Room, text: "Control Room" },
  { img: RCM, text: "RCM" },
  { img: "", text: "" },
  { img: "", text: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
  { img: "", text: "" },
  { img: "", text: "" },
  // { img: Control_Room, text: "ControlRoom" },
];

const committeeMember = [
  { img: Control_Room, text: "Control Room" },
  { img: RCM, text: "RCM" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
  { img: "", text: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "" },
  { img: "", text: "" },
  // { img: Control_Room, text: "ControlRoom" },
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openApps: false,
      goBack: false,

      currentUser: "",
    };
  }

  componentDidMount() {
    this.setState({ currentUser: cookie.load("current_user") });
  }

  checkForUserType() {
    const userType = this.state.currentUser.staffTypeId;

    if (userType && userType.type === "BU Head") {
      return buHead;
    } else if (userType && userType.type === "admin") {
      return admin;
    } else if (userType && userType.type === "Committee Member") {
      return buHead;
    }
  }

  render() {
    // if (this.state.openApps) {

    const userType = this.state.currentUser.staffTypeId;

    if (this.state.goBack) {
      return <Redirect to={"/home"} />;
    }

    console.log("current user", this.state.currentUser);

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
        <Header />

        <div
          className="menupage"
          style={{
            display: "flex",
            flex: 4,
            minHeight: "100%",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            left: "45%",
          }}
        >
          {/* <nav className="menu">
            <input
              type="checkbox"
              href="#"
              className="menu-open"
              name="menu-open"
              id="menu-open"
            />
            <label
              className="menu-open-button"
              for="menu-open"
              style={{
                boxShadow: "5px 5px 5px #2433a5",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() => this.props.history.push("/home/controlroom")}
              >
                <img
                  src={Control_Room}
                  style={{
                    maxWidth: "30%",
                    height: "auto",
                    position: "absolute",
                    top: 12,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 40,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  Control Room
                </h6>
              </div>
            </label>

            <a className="menu-item item-1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={RCM}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 20,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 60,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  RCM
                </h6>
              </div>
            </a>
            <a className="menu-item item-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() => this.props.history.push("controlroom/wms")}
              >
                <img
                  src={WMS}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 20,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 55,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  WMS
                </h6>
              </div>
            </a>
            <a className="menu-item item-3">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={FIN}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 20,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 55,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  FIN
                </h6>
              </div>
            </a>
            <a className="menu-item item-4">
           

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() => this.props.history.push("/home/controlroom/bus")}
              >
                <img
                  src={BU}
                  style={{
                    maxWidth: "35%",
                    height: "auto",
                    position: "absolute",
                    top: 12,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 45,
                    color: "white",
                    fontWeight: "700",
                    maxWidth: "50%",
                  }}
                >
                  BU Mgmt
                </h6>
              </div>
            </a>
            <a className="menu-item item-5">
          

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() => this.props.history.push("/home/controlroom/fus")}
              >
                <img
                  src={FunctionalUnit}
                  style={{
                    maxWidth: "38%",
                    height: "auto",
                    position: "absolute",
                    top: 20,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 55,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  FU Mgmt
                </h6>
              </div>
            </a>
            <a className="menu-item item-6">
             

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() =>
                  this.props.history.push("/home/controlroom/items")
                }
              >
                <img
                  src={Items}
                  style={{
                    maxWidth: "35%",
                    height: "auto",
                    position: "absolute",
                    top: 9,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 45,
                    color: "white",
                    fontWeight: "700",
                    maxWidth: "80%",
                  }}
                >
                  Items Mgmt
                </h6>
              </div>
            </a>
            <a className="menu-item item-7">
              {userType &&  userType.type !== "BU Head" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                  onClick={() =>
                    this.props.history.push("/home/controlroom/staff")
                  }
                >
                  <h6
                    style={{
                      position: "absolute",
                      // top: 30,
                      color: "white",
                      width: "80%",
                      fontWeight: "700",
                    }}
                  >
                    Staff
                  </h6>
                </div>
              ) : (
                undefined
              )}
            </a>
          </nav> */}

          <MenuTree
            history={this.props.history}
            options={
              userType && userType.type === "BU Head"
                ? buHead
                : userType && userType.type === "admin"
                ? admin
                : userType && userType.type === "Committe Member"
                ? committeeMember
                : admin
            }
          />
        </div>

        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "10%",
            top: "90%",
          }}
        >
          <img
            onClick={() => this.props.history.goBack()}
            src={Back}
            style={{
              width: 45,
              height: 35,
              marginLeft: "5%",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    );
  }
}

export default HomeScreen;
