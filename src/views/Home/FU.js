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
import ReceiveItem from "../../assets/img/Receive Item.png";

import MenuTree from "../../components/MenuTree/MenuTree";
import ReceiveItems from "../ReplenishmentRequestForFU/handleReceiveItemForFUInventory";

import {
  getFunctionalUnitByIdUrl,
  getFunctionalUnitFromHeadIdUrl,
} from "../../public/endpoins";

import Loader from "react-loader-spinner";

const fu = "";

const admin = [
  { img: FunctionalUnit, text: "FU", path: "" },
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

const buHead = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
];

const committeeMember = [
  { img: FunctionalUnit, text: "FU", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
];

const accountsMember = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: WMS, text: "WMS", path: "controlroom/wms" },
];

const warehouseMember = [
  { img: FunctionalUnit, text: "FU", path: "" },

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
  { img: FunctionalUnit, text: "FU", path: "" },

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
  { img: FunctionalUnit, text: "FU", path: "" },
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
  { img: FunctionalUnit, text: "FU", path: "" },
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
    path: `fus/receive`,
  },
];

const buNurse = [
  { img: FunctionalUnit, text: "FU", path: "" },
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
  { img: FunctionalUnit, text: "FU", path: "" },

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
  { img: FunctionalUnit, text: "FU", path: "" },
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
      goBack: false,
      currentUser: "",
      fuObj: "",
      forAdmin: "",
    };
  }

  componentWillMount() {
    this.setState({ currentUser: cookie.load("current_user") });
  }

  componentDidMount() {
    // axios
    //   .get(
    //     getFunctionalUnitFromHeadIdUrl + "/" + this.state.currentUser.staffId
    //   )
    //   .then((res) => {
    //     if (res.data.success) {
    //       fu = res.data.data[0];
    //       console.log("FU Obj", res.data.data[0]);
    //       this.setState({ fuObj: res.data.data[0] });
    //       this.setState({
    //         forAdmin: [
    //           { img: FunctionalUnit, text: res.data.data.fuName, path: "" },
    //           {
    //             img: PurchaseRequest,
    //             text: "Medication  Order",
    //             path: `${this.props.match.params.fuName}/medicinalorder`,
    //           },
    //           {
    //             img: PurchaseRequest,
    //             text: "Professional Order",
    //             path: `${this.props.match.params.fuName}/professionalorder`,
    //           },
    //           {
    //             img: FunctionalUnit,
    //             text: "FU Inventory",
    //             path: `${this.props.match.params.fuName}/fuinventory`,
    //           },
    //           {
    //             img: BU,
    //             text: "FU Rep Request",
    //             path: `${this.props.match.params.fuName}/replenishment`,
    //           },
    //           { img: ReturnItem, text: "FU Returns", path: `${this.props.match.params.fuName}/returnitems` },
    //           { img: ReceiveItem, text: "Receive Items", path: `${this.props.match.params.fuName}/receive` },
    //           { img: Staff, text: "Staff", path: "controlroom/staff" },
    //         ],
    //       });
    //     } else if (!res.data.success) {
    //       setErrorMsg(res.data.error);
    //       setOpenNotification(true);
    //     }
    //     return res;
    //   })
    //   .catch((e) => {
    //     console.log("error: ", e);
    //   });
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
            userType && userType.type === "BU Head"
              ? buHead
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
              : userType && userType.type === "BU Nurse"
              ? buNurse
              : (userType && userType.type === "BU Member") ||
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
