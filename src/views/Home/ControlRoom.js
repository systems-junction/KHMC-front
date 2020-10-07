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

import Staff from "../../assets/img/Staff.png";
import PurchaseRequest from "../../assets/img/purchase request.png";

import React, { useEffect } from "react";
import "./MenuPage.css";
import { render } from "react-dom";

import Back from "../../assets/img/Back_Arrow.png";

import KHMC_White from "../../assets/img/KHMC_White.png";

import Influence_white from "../../assets/img/Influence_white.png";
import ReturnItem from "../../assets/img/Return Item.png";

import MenuTree from "../../components/MenuTree/MenuTree";

const admin = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "controlroom/rcm" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
  { img: FIN, text: "FIN" },
  { img: BU, text: "BusU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FuncU Mgmt", path: "controlroom/fus" },
  { img: Staff, text: "Staff", path: "controlroom/staff" },
  { text: "", path: "", path: "" },
];

const buHead = [
  { img: Control_Room, text: "Control Room" },
  { img: RCM, text: "RCM", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

const committeeMember = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

const accountsMember = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

const warehouseMember = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  {
    img: ReturnItem,
    text: "FU Return Request",
    path: "controlroom/fus/replenishment/returnitems/view",
  },
  {
    img: FunctionalUnit,
    text: "FU Mgmt",
    path: "controlroom/fus/replenishment",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

const warehouseIncharge = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
];

const fuHead = [
  { img: Control_Room, text: "Control Room" },
  {
    img: PurchaseRequest,
    text: "Professional Order",
    path: "controlroom/bus/professionalorder",
  },
  {
    img: PurchaseRequest,
    text: "Medicinal Order",
    path: "controlroom/bus/replenishment",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  // { img: BU, text: 'BU Mgmt', path: 'controlroom/bus/replenishment' },
  {
    img: FunctionalUnit,
    text: "FU Mgmt",
    path: "controlroom/fus/replenishment",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

const fuInventoryKeeper = [
  { img: Control_Room, text: "Control Room" },
  { img: FunctionalUnit, text: "FU", path: "controlroom/fus" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  {
    img: FunctionalUnit,
    text: "FU Mgmt",
    path: "controlroom/fus/replenishment",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

const fuReturnRequestApprovalMember = [
  { img: Control_Room, text: "Control Room" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  {
    img: FunctionalUnit,
    text: "FU Return Request",
    path: "controlroom/fus/replenishment/returnitems/view",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
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

const buMember = [
  { img: Control_Room, text: "Control Room", path: "" },
  {
    img: PurchaseRequest,
    text: "Medicinal Order",
    path: "controlroom/bus/replenishment",
  },
  {
    img: PurchaseRequest,
    text: "Professional Order",
    path: "controlroom/bus/professionalorder",
  },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
];

// const fuInventoryKeeper = [
//   { img: Control_Room, text: "Control Room", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: BU, text: "BU Mgmt", path: "controlroom/bus/replenishment" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
//   { img: "", text: "", path: "" },
// ];

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
  { img: "", text: "", path: "" },
  { img: "", text: "", path: "" },
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
        > */}

        <MenuTree
          history={this.props.history}
          options={
            userType && userType.type === "BU Head"
              ? buHead
              : userType && userType.type === "admin"
              ? admin
              : userType && userType.type === "Committe Member"
              ? committeeMember
              : userType && userType.type === "Accounts Member"
              ? accountsMember
              : userType && userType.type === "Warehouse Member"
              ? warehouseMember
              : userType && userType.type === "FU Member"
              ? fuHead
              : userType && userType.type === "Warehouse Incharge"
              ? warehouseIncharge
              : userType && userType.type === "FU Inventory Keeper"
              ? fuInventoryKeeper
              : userType &&
                userType.type === "FU Internal Request Return Approval Member"
              ? fuReturnRequestApprovalMember
              : userType && userType.type === "FU Incharge"
              ? fuIncharge
              : (userType && userType.type === "BU Member") ||
                (userType && userType.type === "BU Nurse") ||
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
        {/* </div> */}

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
