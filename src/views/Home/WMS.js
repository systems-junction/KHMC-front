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

import RCM from "../../assets/img/business_Unit.png";
import WMS from "../../assets/img/WMS.png";
import wh_inventory from "../../assets/img/WH Inventory.png";
import purchase_order from "../../assets/img/Purchase Order.png";
import purchase_request from "../../assets/img/purchase request.png";
import FIN from "../../assets/img/FIN.png";
import Control_Room from "../../assets/img/Control_Room.png";

import FunctionalUnit from "../../assets/img/Functional Unit.png";

import Vendor from "../../assets/img/Vendot.png";

import WMS_Back from "../../assets/img/WMS_Back.png";

import Items from "../../assets/img/Items.png";

import React, { useEffect } from "react";
import "./MenuPage.css";
import { render } from "react-dom";
import Back from "../../assets/img/Back_Arrow.png";

import KHMC_White from "../../assets/img/KHMC_White.png";

import Influence_white from "../../assets/img/Influence_white.png";

import MenuTree from "../../components/MenuTree/MenuTree";

const admin = [
  { img: WMS, text: "WMS" },
  {
    img: "",
    text: "Receive Items",
    path: "/home/controlroom/wms/receiveitems",
  },

  { img: Vendor, text: "Vendor Mgmt", path: "/home/controlroom/wms/vendor" },

  {
    img: "",
    text: "",
    path: "",
  },

  {
    img: "",
    text: "",
    path: "",
  },

  {
    img: purchase_request,
    text: "Purchase Request",
    path: "/home/controlroom/wms/pr",
  },

  {
    img: purchase_order,
    text: "Purchase Order",
    path: "/home/controlroom/wms/po",
  },

  {
    img: wh_inventory,
    text: "WH Inventory",
    path: "/home/controlroom/wms/warehouseinventory",
  },

  // { img: Items, text: "Items", path: "controlroom/items" },
  // { img: "", text: "Staff", path: "controlroom/staff" },
  // { img: Control_Room, text: "ControlRoom" },
];

const buHead = [
  { img: WMS, text: "WMS" },
  {
    img: "",
    text: "Receive Items",
    path: "/home/controlroom/wms/receiveitems",
  },

  { img: Vendor, text: "Vendor Mgmt", path: "/home/controlroom/wms/vendor" },

  {
    img: "",
    text: "",
    path: "",
  },

  {
    img: "",
    text: "",
    path: "",
  },

  {
    img: purchase_request,
    text: "Purchase Request",
    path: "/home/controlroom/wms/pr",
  },

  {
    img: purchase_order,
    text: "Purchase Order",
    path: "/home/controlroom/wms/po",
  },

  {
    img: wh_inventory,
    text: "WH Inventory",
    path: "/home/controlroom/wms/warehouseinventory",
  },
];

const committeeMember = [
  { img: WMS, text: "WMS" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },

  { img: "", text: "", path: "" },
  {
    img: purchase_request,
    text: "Purchase Request",
    path: "/home/controlroom/wms/pr",
  },
  {
    img: purchase_order,
    text: "Purchase Order",
    path: "/home/controlroom/wms/po",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
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

  render() {
    if (this.state.goBack) {
      return <Redirect to={"/home"} />;
    }

    const userType = this.state.currentUser.staffTypeId;

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
          backgroundImage: `url("${WMS_Back}")`,
          backgroundSize: "100%",
        }}
      >
        <Header />

        {/* <div
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
                  height: "100%",
                }}
                // onClick={() => this.props.history.push("/home/controlroom")}
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
                    top: 60,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  WMS
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
                onClick={() => this.props.history.push("/home/controlroom/wms/receiveitems")}
              >
                <h6
                  style={{
                    position: "absolute",
                    top: 30,
                    color: "white",
                    width: "80%",
                    fontWeight: "700",
                  }}
                >
                  Receive Items
                </h6>
              </div>
            </a>
            <a className="menu-item item-2">
         
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
                onClick={() =>
                  this.props.history.push("/home/controlroom/wms/vendor")
                }
              >
                <img
                  src={Vendor}
                  style={{
                    maxWidth: "50%",
                    height: "auto",
                    position: "absolute",
                    top: 13,
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
                  Vendor Mgmt
                </h6>
              </div>
            </a>
            <a className="menu-item item-4">
      
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
                onClick={() => this.props.history.push("/home/controlroom/wms/pr")}
              >
                 <img
                  src={purchase_request}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 7,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 47,
                    color: "white",
                    fontWeight: "700",
                    maxWidth: "80%",
                  }}
                >
                  Purchase Request
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
                onClick={() => this.props.history.push("/home/controlroom/wms/po")}
              >
                 <img
                  src={purchase_order}
                  style={{
                    maxWidth: "35%",
                    height: "auto",
                    position: "absolute",
                    top: 8,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 50,
                    color: "white",
                    fontWeight: "700",
                    maxWidth: "80%",
                  }}
                >
                  Purchase Order
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
                  this.props.history.push("/home/controlroom/wms/warehouseinventory")
                }
              >
                 <img
                  src={wh_inventory}
                  style={{
                    maxWidth: "40%",
                    height: "auto",
                    position: "absolute",
                    top: 10,
                  }}
                />
                <h6
                  style={{
                    position: "absolute",
                    top: 40,
                    color: "white",
                    fontWeight: "700",
                    maxWidth: "80%",
                  }}
                >
                  WH Inventory
                </h6>
              </div>
            </a>
          </nav>
        </div> */}

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
