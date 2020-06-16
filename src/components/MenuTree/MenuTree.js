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

class MenuTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
   
    };
  }

  componentDidMount() {
  }

  render() {


    return (
    

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
                  alignItems: "center",
                  height: "100%"
                }}
                onClick={() => {}}
              >
                <img
                  src={this.props.options[0].img}
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
                    top: 50,
                    color: "white",
                    fontWeight: "700"
                  }}
                >
                 {this.props.options[0].text}
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
                  width:'100%',
                }}
              >
                <img
                  src={this.props.options[1].img}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    // position: "absolute",
                    // top: 20,
                  }}
                />
                <h6
                  style={{
                    // position: "absolute",
                    // top: 60,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  {this.props.options[1].text}
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
                  width:'100%'
                }}
                onClick={() => this.props.history.push(this.props.options[2].path)}
              >
                <img
                  src={this.props.options[2].img}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    // position: "absolute",
                    // top: 20,
                  }}
                />
                <h6
                  style={{
                    // position: "absolute",
                    // top: 55,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  {this.props.options[2].text}
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
                  width:"100%",
                   position:'fixed'
                }}
              >
                <img
                  src={this.props.options[3].img}
                  style={{
                  maxWidth: '40%',
                    height: 'auto',
                    position: "absolute",
                    left:30,
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
                  {this.props.options[3].text}
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
                onClick={() => this.props.history.push(this.props.options[4].path)}
              >
                <img
                  src={this.props.options[4].img}
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
                  {this.props.options[4].text}
                </h6>
              </div>
            </a>
            <a className="menu-item item-5">
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() => this.props.history.push("/home/bureturn")}
              >
                <h6
                  style={{
                    position: "absolute",
                    top: 40,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  BU Return
                </h6>
              </div> */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
                onClick={() => this.props.history.push(this.props.options[5].path)}
              >
                <img
                  src={this.props.options[5].img}
                  style={{
                    maxWidth: "38%",
                    height: "auto",
                    position: "absolute",
                    top: 10,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 47,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                 {this.props.options[5].text}
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
                  this.props.history.push(this.props.options[6].path)
                }
              >
                <img
                  src={this.props.options[6].img}
                  style={{
                    maxWidth: "35%",
                    height: "auto",
                    position: "absolute",
                    top: 10,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 55,
                    color: "white",
                    fontWeight: "700",
                    maxWidth: "80%",
                  }}
                >
{this.props.options[6].text}
                </h6>
              </div>
            </a>
            <a className="menu-item item-7">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                  onClick={() =>
                    this.props.history.push(this.props.options[7].path)
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
                    {this.props.options[7].text}
                  </h6>
                </div>
            
            </a>
          </nav>
        </div>

    );
  }
}

export default MenuTree;
