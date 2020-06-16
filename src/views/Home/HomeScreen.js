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

import Back from "../../assets/img/Back_Arrow.png";

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
          <nav className="menu">
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
                  height: "100%",
                }}
                onClick={() => this.setState({ openApps: true })}
              >
                <h5
                  style={{
                    color: "white",
                    fontWeight: "700",
                    position: "absolute",
                    textAlign: "center",
                    left: 17,
                    top: 27,
                  }}
                >
                  KHMC
                </h5>
                <h6
                  style={{
                    color: "white",
                    top: 50,
                    position: "absolute",
                    left: 30,
                    textAlign: "center",
                  }}
                >
                  Apps
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
                onClick={() => this.props.history.push("/home/controlroom")}
              >
                <img
                  src={Control_Room}
                  style={{
                    maxWidth: "30%",
                    height: "auto",
                    position: "absolute",
                    top: 11,
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
            </a>
            <a className="menu-item item-5"></a>
            <a className="menu-item item-6"></a>
            <a className="menu-item item-7"></a>
          </nav>
        </div>

        {/* <div
          style={{
            position: "fixed",
            width: "100%",
            height: "20%",
            backgroundColor: "red",
            top: "90%",
          }}
        >
          {this.state.openApps ? (
            <img
              src={Back}
              style={{ width: 40, height: 30, marginLeft: "5%" }}
            />
          ) : (
            undefined
          )}
        </div> */}
      </div>
    );
  }
}

export default HomeScreen;
