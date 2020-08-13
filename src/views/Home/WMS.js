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
import ReceiveItem from "../../assets/img/Receive Item.png";
import MaterialReceiving from "../../assets/img/Material Receiving.png";
import WMS_Back from "../../assets/img/WMS_Back.png";
import ReturnItem from "../../assets/img/Return Item.png";

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
    img: WMS,
    text: "Warehouse Mgmt",
    path: "wms/warehouse",
  },

  {
    img: FunctionalUnit,
    text: "Functional Unit",
    path: "wms/fus",
  },

  // {
  //   img: wh_inventory,
  //   text: "WH Inventory",
  //   path: "/home/wms/warehouseinventory",
  // },

  // {
  //   img: purchase_request,
  //   text: "Purchase Request",
  //   path: "/home/wms/pr",
  // },

  // {
  //   img: purchase_order,
  //   text: "Purchase Order",
  //   path: "/home/wms/po",
  // },

  // {
  //   img: MaterialReceiving,
  //   text: "Material Receiving",
  //   path: "/home/wms/materialreceiving",
  // },

  // {
  //   text: "",
  //   path: "",
  // },
];

const buHead = [
  { img: WMS, text: "WMS" },

  {
    img: purchase_request,
    text: "Purchase Request",
    path: "/home/wms/pr",
  },

  {
    img: purchase_order,
    text: "Purchase Order",
    path: "/home/wms/po",
  },

  {
    img: wh_inventory,
    text: "WH Inventory",
    path: "/home/wms/warehouseinventory",
  },
];

const committeeMember = [
  { img: WMS, text: "WMS" },

  {
    img: WMS,
    text: "Warehouse Mgmt",
    path: "wms/warehouse",
  },
];

const accountsMember = [
  { img: WMS, text: "WMS" },

  {
    img: WMS,
    text: "Warehouse Mgmt",
    path: "wms/warehouse",
  },
];

const warehouseMember = [
  { img: WMS, text: "WMS" },

  {
    img: WMS,
    text: "Warehouse Mgmt",
    path: "wms/warehouse",
  },

  {
    img: FunctionalUnit,
    text: "Functional Unit",
    path: "wms/fus",
  },
];

const warehouseIncharge = [
  { img: WMS, text: "WMS" },
  {
    img: WMS,
    text: "Warehouse Mgmt",
    path: "wms/warehouse",
  },

  {
    img: FunctionalUnit,
    text: "Functional Unit",
    path: "wms/fus",
  },
];

const fuMember = [
  { img: WMS, text: "WMS" },

  {
    img: FunctionalUnit,
    text: "Functional Unit",
    path: "wms/fus",
  },
];

const buMember = [
  { img: WMS, text: "WMS" },

  {
    img: FunctionalUnit,
    text: "Functional Unit",
    path: "wms/fus",
  },
];

const fuReturnRequestApprovalMember = [
  { img: WMS, text: "WMS" },

  {
    img: FunctionalUnit,
    text: "Functional Unit",
    path: "wms/fus",
  },
];

const warehouseInventoryKeeper = [
  { img: WMS, text: "WMS" },

  {
    img: WMS,
    text: "Warehouse Mgmt",
    path: "wms/warehouse",
  },
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
          backgroundImage:
            "linear-gradient(25deg, rgba(101,228,193,1) 0%, rgba(58,219,175,1) 33%, rgba(15,206,147,1) 66%, rgba(6,142,103,1) 100%)",
          backgroundSize: "100%",
        }}
      >
        <Header />

        <MenuTree
          history={this.props.history}
          options={
            userType && userType.type === "BU Head"
              ? buHead
              : userType &&
                (userType.type === "BU Member" || userType.type === "BU Nurse")
              ? buMember
              : userType && userType.type === "admin"
              ? admin
              : userType && userType.type === "Committe Member"
              ? committeeMember
              : userType && userType.type === "Accounts Member"
              ? accountsMember
              : userType && userType.type === "Warehouse Member"
              ? warehouseMember
              : userType && userType.type === "Warehouse Inventory Keeper"
              ? warehouseInventoryKeeper
              : userType && userType.type === "Warehouse Incharge"
              ? warehouseIncharge
              : (userType && userType.type === "FU Member") ||
                (userType && userType.type === "FU Inventory Keeper")
              ? fuMember
              : userType &&
                userType.type === "FU Internal Request Return Approval Member"
              ? fuReturnRequestApprovalMember
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
