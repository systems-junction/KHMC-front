import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import React, { useEffect } from "react";
import "../MenuPage.css";
import Back from "../../../assets/img/Back_Arrow.png";
import MenuTree from "../../../components/MenuTree/MenuTree";
import Reports from "../../../assets/img/Reports.png";
import Others from "../../../assets/img/Others.png";

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

  {
    img: Reports,
    text: "Expired Items",
    path: "warehousereports/expireditems",
  },

  {
    img: Reports,
    text: "Nearly Expired Items",
    path: "warehousereports/nearlyexpireditems",
  },

  // {
  //   img: Reports,
  //   text: "Disposed Items",
  //   path: "warehousereports/disposed",
  // },
  {
    img: Others,
    text: "Others",
    path: "warehousereports/others",
  },
];

const adminForOthers = [
  { img: Reports, text: "Warehouse Reports", path: "" },

  {
    img: Reports,
    text: "Consumption Balance",
    path: "others/consumptionbalance",
  },
  {
    img: Reports,
    text: "Slow Moving Items",
    path: "others/slowmovingitems",
  },

  {
    img: Reports,
    text: "Warehouse Transfer",
    path: "others/whtransfer",
  },
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openApps: false,
      goBack: false,

      currentUser: "",

      openOther: false,
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
        <Header history={this.props.history} />

        {this.props.history.location.pathname ===
        "/home/reports/warehousereports" ? (
          <MenuTree
            history={this.props.history}
            options={
              userType &&
              (userType.type === "admin" || userType.type === "super admin")
                ? admin
                : userType && userType.type === "Warehouse Inventory Keeper"
                ? admin
                : ""
            }
          />
        ) : (
          <MenuTree
            history={this.props.history}
            options={
              userType &&
              (userType.type === "admin" || userType.type === "super admin")
                ? adminForOthers
                : userType && userType.type === "Warehouse Inventory Keeper"
                ? adminForOthers
                : ""
            }
          />
        )}
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
