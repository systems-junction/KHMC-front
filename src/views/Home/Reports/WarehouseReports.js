// import React from 'react';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

import Snackbar from "../../../components/Snackbar/Snackbar";
import Notification from "../../../components/Snackbar/Notification.js";

import AddAlert from "@material-ui/icons/AddAlert";

import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";

import Header from "../../../components/Header/Header";

import React, { useEffect } from "react";
import "../MenuPage.css";
import { render } from "react-dom";

import Back from "../../../assets/img/Back_Arrow.png";

import KHMC_White from "../../../assets/img/KHMC_White.png";

import Influence_white from "../../../assets/img/Influence_white.png";
import ReturnItem from "../../../assets/img/Return Item.png";

import MenuTree from "../../../components/MenuTree/MenuTree";

import Reports from "../../../assets/img/Reports.png";

const admin = [
  { img: Reports, text: "Warehouse Reports", path: "" },
  { img: Reports, text: "PO Tracking", path: "warehousereports/potracking" },
  { img: Reports, text: "Stock Levels", path: "warehousereports/stocklevels" },
  {
    img: Reports,
    text: "Items Balance",
    path: "warehousereports/itemsbalance",
  },

  {
    img: Reports,
    text: "Supplier Fulfillment POs",
    path: "warehousereports/supplierfullfillment",
  },
];

// const warehouseInventoryKeeper = [
//   { img: Reports, text: "Warehouse Reports", path: "" },
//   { img: Reports, text: "PO Tracking", path: "warehousereports/potracking" },
//   { img: Reports, text: "Stock Levels", path: "warehousereports/stocklevels" },
//   {
//     img: Reports,
//     text: "Items Balance",
//     path: "warehousereports/itemsbalance",
//   },
// ];

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
    // const userType = this.state.currentUser.staffTypeId;
    // if (userType && userType.type === "BU Head") {
    //   return buHead;
    // } else if (userType && userType.type === "admin") {
    //   return admin;
    // } else if (userType && userType.type === "Committee Member") {
    //   return buHead;
    // }
  }

  render() {
    // if (this.state.openApps) {

    const userType = this.state.currentUser.staffTypeId;

    if (this.state.goBack) {
      return <Redirect to={"/home"} />;
    }

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

        <MenuTree
          history={this.props.history}
          options={
            userType && userType.type === "admin"
              ? admin
              : userType && userType.type === "Warehouse Inventory Keeper"
              ? admin
              : ""
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
