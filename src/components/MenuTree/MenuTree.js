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

    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById("menu-open").checked = true;
    }, 120);
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
          position: "center",
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
              boxShadow: "3px 3px 3px #2433a5",
              height: 115,
              width: 115,
            }}
          >
            {this.props.options[0] ? (
              <div className="containerStyle" onClick={() => {}}>
                <img src={this.props.options[0].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[0].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </label>

          <a className="menu-item item-1">
            {this.props.options[1] ? (
              <div
                className="containerStyle"
                onClick={() =>
                  this.props.options[1].path
                    ? this.props.history.push(this.props.options[1].path)
                    : {}
                }
              >
                <img src={this.props.options[1].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[1].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>

          <a className="menu-item item-2">
            {this.props.options[2] ? (
              <div
                // style={{
                //   display: "flex",
                //   flexDirection: "column",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   height: "100%",
                //   width: "100%",
                // }}
                className="containerStyle"
                onClick={() =>
                  this.props.options[2].path
                    ? this.props.history.push(this.props.options[2].path)
                    : {}
                }
              >
                <img src={this.props.options[2].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[2].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>

          <a className="menu-item item-3">
            {this.props.options[3] ? (
              <div
                className="containerStyle"
                onClick={() =>
                  this.props.options[3].path
                    ? this.props.history.push(this.props.options[3].path)
                    : {}
                }
              >
                <img src={this.props.options[3].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[3].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>

          <a className="menu-item item-4">
            {this.props.options[4] ? (
              <div
                className="containerStyle"
                onClick={() =>
                  this.props.options[4].path
                    ? this.props.history.push(this.props.options[4].path)
                    : {}
                }
              >
                <img src={this.props.options[4].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[4].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>

          <a className="menu-item item-5">
            {this.props.options[5] ? (
              <div
                className="containerStyle"
                onClick={() =>
                  this.props.options[5].path
                    ? this.props.history.push(this.props.options[5].path)
                    : {}
                }
              >
                <img src={this.props.options[5].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[5].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>

          <a className="menu-item item-6">
            {this.props.options[6] ? (
              <div
                className="containerStyle"
                onClick={() =>
                  this.props.options[6].path
                    ? this.props.history.push(this.props.options[6].path)
                    : {}
                }
              >
                <img src={this.props.options[6].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[6].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>

          <a className="menu-item item-7">
            {this.props.options[7] ? (
              <div
                className="containerStyle"
                onClick={() =>
                  this.props.options[7]
                    ? this.props.history.push(this.props.options[7].path)
                    : {}
                }
              >
                <img src={this.props.options[7].img} className="imageStyle" />
                <h6 className="headingStyle">{this.props.options[7].text}</h6>
              </div>
            ) : (
              undefined
            )}
          </a>
        </nav>
      </div>
    );
  }
}

export default MenuTree;
