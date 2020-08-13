// import React from 'react';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import KHMC from "../../assets/img/KHMC Apps.png";

import "../../components/MenuTree/MenuPage.css";

import MenuTree from "../../components/MenuTree/MenuTree";

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

import Staff from "../../assets/img/Staff.png";
import PurchaseRequest from "../../assets/img/purchase request.png";

import React, { useEffect } from "react";
import "./MenuPage.css";
import { render } from "react-dom";

import Back from "../../assets/img/Back_Arrow.png";

import KHMC_White from "../../assets/img/KHMC_White.png";

import Influence_white from "../../assets/img/Influence_white.png";
import ReturnItem from "../../assets/img/Return Item.png";
import ReceiveItem from "../../assets/img/Receive Item.png";

import ReceiveItems from "../ReplenishmentRequestForFU/handleReceiveItemForFUInventory";

const admin = [
  { img: KHMC, text: "KHMC APPS", path: "" },
  {
    img: RCM,
    text: "RCM",
    path: "/home/rcm",
  },

  {
    img: WMS,
    text: "WMS",
    path: "/home/wms",
  },

  {
    img: FIN,
    text: "FIN",
    path: "/home/fin",
  },
  {
    img: Control_Room,
    text: "Control Room",
    path: `/home/controlroom`,
  },
];

const buHead = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
];

const committeeMember = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
];

const accountsMember = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
];

const warehouseMember = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },

  {
    img: FunctionalUnit,
    text: "FU Rep Request",
    path: `fus/replenishment`,
  },

  {
    img: ReturnItem,
    text: "FU Returns",
    path: `fus/returnitems`,
  },

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
];

const warehouseIncharge = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },

  {
    img: FunctionalUnit,
    text: "FU Rep Request",
    path: `fus/replenishment`,
  },

  // {
  //   img: ReturnItem,
  //   text: "FU Returns",
  //   path: `fus/returnitems`,
  // },

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
];

const fuHead = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },
  {
    img: PurchaseRequest,
    text: "Medication  Order",
    path: `fus/medicinalorder`,
  },

  {
    img: PurchaseRequest,
    text: "Professional Order",
    path: `fus/professionalorder`,
  },

  {
    img: FunctionalUnit,
    text: "FU Inventory",
    path: `fus/fuinventory`,
  },

  {
    img: BU,
    text: "FU Rep Request",
    path: `fus/replenishment`,
  },

  {
    img: ReturnItem,
    text: "FU Returns",
    path: `fus/returnitems`,
  },

  {
    img: ReceiveItem,
    text: "Receive Items",
    path: `fus/receive`,
  },
];

const buMember = [
  // { img: FunctionalUnit, text: "Functional Unit", path: "" },
  { img: KHMC, text: "KHMC APPS", path: "" },

  {
    img: PurchaseRequest,
    text: "Medication  Order",
    path: `/home/wms/fus/medicinalorder`,
  },

  // {
  //   img: PurchaseRequest,
  //   text: "Professional Order",
  //   path: `/home/wms/fus/professionalorder`,
  // },

  // {
  //   img: FunctionalUnit,
  //   text: "FU Inventory",
  //   path: `fus/fuinventory`,
  // },

  // {
  //   img: BU,
  //   text: "FU Rep Request",
  //   path: `fus/replenishment`,
  // },

  // {
  //   img: ReturnItem,
  //   text: "FU Returns",
  //   path: `fus/returnitems`,
  // },

  {
    img: ReceiveItem,
    text: "Receive Items",
    path: `/home/wms/fus/receive`,
  },
];

const buNurse = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },
  {
    img: PurchaseRequest,
    text: "Medication  Order",
    path: `fus/medicinalorder`,
  },

  {
    img: PurchaseRequest,
    text: "Professional Order",
    path: `fus/professionalorder`,
  },

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
];

const fuReturnRequestApprovalMember = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },

  {
    img: ReturnItem,
    text: "FU Returns",
    path: `fus/returnitems`,
  },
];

// const fuMemberForBUManagement = [
//   { img: Control_Room, text: "Control Room", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: BU, text: "BU Mgmt", path: "controlroom/bus/replenishment" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
// ];

// const warehouseIncharge = [
//   { img: Control_Room, text: "Control Room", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: BU, text: "BU Mgmt", path: "controlroom/bus/replenishment" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
// ];

const fuInventoryKeeper = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },
  {
    img: ReceiveItem,
    text: "Receive Items",
    path: `fus/receive`,
  },
  {
    img: ReturnItem,
    text: "FU Returns",
    path: `fus/returnitems`,
  },
];

const fuIncharge = [
  { img: Control_Room, text: "Control Room" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus/replenishment" },

  {
    img: FunctionalUnit,
    text: "FU Mgmt",
    path: "controlroom/fus/replenishment",
  },
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openApps: false,
      currentUser: "",
      userStaff: "",

      options: "",
    };
  }

  setOptions() {
    let routeAccess = this.state.userStaff.routeAccess;

    let options = [];

    for (let i = 0; i < routeAccess.length; i++) {
      let routeObj = routeAccess[i];
      let splitedModulesArray = routeObj.route.split("/");

      for (let j = 0; j < splitedModulesArray.length; j++) {
        let singleModule = splitedModulesArray[j];
        let temp = admin.find((r) => r.text === singleModule);
        if (temp) {
          console.log(temp.text);
          let alreadyFound =
            options && options.find((r) => r.text === temp.text);
          if (!alreadyFound) {
            options.push(temp);
          }
        }
      }
    }

    console.log(options);
    this.setState({ options: [admin[0], ...options] });
  }

  componentWillMount() {
    this.setState({
      currentUser: cookie.load("current_user"),
      userStaff: cookie.load("user_staff"),
    });
  }

  componentDidMount() {
    // if (this.state.userStaff !== "" && this.state.userStaff !== "undefined") {
    //   this.setOptions();
    // }
    setTimeout(() => {
      document.getElementById("menu-open").checked = true;
    }, 120);
  }

  render() {
    const userType = this.state.currentUser.staffTypeId;
    console.log(userType);

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
        {/* <div
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
                boxShadow: "5px 5px 5px #2433a5",
                height: 100,
                width: 100,
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
                    left: 21,
                    top: 33,
                  }}
                >
                  KHMC
                </h5>
                <h6
                  style={{
                    color: "white",
                    top: 55,
                    position: "absolute",
                    left: 32,
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
                onClick={() => this.props.history.push("/home/rcm")}
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
                onClick={() => this.props.history.push("/home/wms")}
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
              {this.state.currentUser &&
              this.state.currentUser.staffTypeId.type === "admin" ? (
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
              ) : (
                undefined
              )}
            </a>
            <a className="menu-item item-5"></a>
            <a className="menu-item item-6"></a>
            <a className="menu-item item-7"></a>
          </nav>
        </div> */}

        {/* <MenuTree
          history={this.props.history}
          options={this.state.options ? this.state.options : admin}
        /> */}

        <MenuTree
          history={this.props.history}
          options={
            userType && userType.type === "BU Head"
              ? buHead
              : // : userType && userType.type === "Committe Member"
              // ? committeeMember
              // : userType && userType.type === "Accounts Member"
              // ? accountsMember
              // : userType && userType.type === "Warehouse Member"
              // ? warehouseMember
              // : userType && userType.type === "FU Member"
              // ? fuHead
              // : userType && userType.type === "Warehouse Incharge"
              // ? warehouseIncharge
              // : userType && userType.type === "FU Inventory Keeper"
              // ? fuInventoryKeeper
              // : userType &&
              //   userType.type === "FU Internal Request Return Approval Member"
              // ? fuReturnRequestApprovalMember
              // : userType && userType.type === "FU Incharge"
              // ? fuIncharge
              // : userType && userType.type === "BU Nurse"
              // ? buNurse
              (userType && userType.type === "BU Member") ||
                (userType && userType.type === "BU Inventory Keeper") ||
                (userType && userType.type === "BU Doctor")
              ? buMember
              : // : userType && userType.type === "Warehouse Incharge"
                // ? warehouseIncharge
                // : userType && userType.type === "FU Inventory Keeper"
                // ? fuInventoryKeeper
                admin
          }
        />
      </div>
    );
  }
}

export default HomeScreen;
