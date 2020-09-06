// import React from 'react';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import KHMC from "../../assets/img/KHMC Apps.png";
import "../../components/MenuTree/MenuPage.css";
import MenuTree from "../../components/MenuTree/MenuTree";
import PatientRegistration from "../../assets/img/PatientRegistration.png";
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
import claimsReview from "../../assets/img/ClaimsReview.png";
import PreApproval from "../../assets/img/Pre-Approval.png";
import IPR from "../../assets/img/IPR.png";
import outPatient from "../../assets/img/OutPatient.png";
import DM from "../../assets/img/Discharge Medication.png";
import CN from "../../assets/img/Consultation_Notes.png";
import assessmentIcon from "../../assets/img/PatientAssessment.png";
import patientCareIcon from "../../assets/img/PatientCare.png";
import Lab_RadIcon from "../../assets/img/Lab-Rad Request.png";
import wh_inventory from "../../assets/img/WH Inventory.png";
import purchase_order from "../../assets/img/Purchase Order.png";
import purchase_request from "../../assets/img/purchase request.png";
import MaterialReceiving from "../../assets/img/Material Receiving.png";
import AssessDiagIcon from "../../assets/img/Assessment & Diagnosis.png";
import DischargeIcon from "../../assets/img/Doctor - Discharge.png";
import CRIcon from "../../assets/img/Consultation Request.png";
import WMS_Back from "../../assets/img/WMS_Back.png";
import OrderItems from "../../assets/img/Order Items.png";

import RepRequestStatus from "../../assets/img/Replenishment Requests Status.png";
// import FuncUFulfillment from "../../assets/img/FuncUFulfillment.png";
import ManualRequest from "../../assets/img/Manual Request.png";
import VendorReturns from "../../assets/img/Vendor Returns.png";
import FuncUFulfillment from "../../assets/img/FuncU Fulfillment.png";
import MedicationOrder from "../../assets/img/Medication Order.png";
import ProfessionalOrder from "../../assets/img/Professional Order.png";

const admin = [
  { img: KHMC, text: "KHMC", path: "" },
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

const residentDoctor = [
  { img: KHMC, text: "KHMC", path: "" },
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
];

const frontDesk = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: PatientRegistration,
    text: "Patient Registration",
    path: "/home/rcm/patientListing",
  },
];

const insuranceDepartment = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: PreApproval,
    text: "Pre Approval",
    path: "/home/rcm/ic/pa",
  },
  {
    img: claimsReview,
    text: "Claims Review",
    path: "/home/rcm/ic/ri",
  },
];

const registeredNurse = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: assessmentIcon,
    text: "Patient Assessment",
    path: "/home/rcm/patientAssessment",
  },
  {
    img: patientCareIcon,
    text: "Patient Care",
    path: "/home/rcm/patientCare",
  },
  {
    img: Lab_RadIcon,
    text: "Lab/Rad Request",
    path: "/home/rcm/LabRadRequest",
  },

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
    img: MedicationOrder,
    text: "Medication  Order",
    path: `/home/wms/fus/medicinalorder`,
  },

  {
    img: ProfessionalOrder,
    text: "Professional Order",
    path: `/home/wms/fus/professionalorder`,
  },
];

const radiologyImagingDepartment = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: IPR,
    text: "In-Patient",
    path: "/home/rcm/sr/rr/ipr",
  },

  {
    img: outPatient,
    text: "Out-Patient",
    path: "/home/rcm/sr/rr/opr",
  },
];

const labTechnician = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: IPR,
    text: "In-Patient",
    path: "/home/rcm/sr/lr/ipr",
  },

  {
    img: outPatient,
    text: "Out-Patient",
    path: "/home/rcm/sr/lr/opr",
  },
];

const pharmacist = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: IPR,
    text: "In-Patient",
    path: "/home/rcm/sr/phr/ipr",
  },

  {
    img: outPatient,
    text: "Out-Patient",
    path: "/home/rcm/sr/phr/opr",
  },

  {
    img: DM,
    text: "Discharge",
    path: "/home/rcm/sr/phr/dischargemedication/ipr",
  },
];

const doctorPhysician = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: AssessDiagIcon,
    text: "Assessment & Diagnosis",
    path: "/home/rcm/rd/assessmentdiagnosis",
  },
  {
    img: Lab_RadIcon,
    text: "Lab/Rad Request",
    path: "/home/rcm/rd/labradrequest",
  },
  {
    img: CRIcon,
    text: "Consultation Request",
    path: "/home/rcm/rd/consultationrequest",
  },
  {
    img: DischargeIcon,
    text: "Discharge",
    path: "/home/rcm/rd/dischargerequest",
  },

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
    img: OrderItems,
    text: "Order Items",
    path: `/home/wms/fus/medicinalorder`,
  },
];

const consultantSpecialist = [
  { img: KHMC, text: "KHMC", path: "" },
  {
    img: CN,
    text: "Consultation Notes",
    path: "/home/rcm/ecr/cn",
  },
];

const buHead = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
];

const committeeMember = [
  { img: KHMC, text: "KHMC", path: "" },

  {
    img: purchase_request,
    text: "Purchase Request",
    path: "/home/wms/warehouse/pr",
  },

  {
    img: purchase_order,
    text: "Purchase Order",
    path: "/home/wms/warehouse/po",
  },
];

const accountsMember = [
  // { img: Control_Room, text: "Control Room", path: "" },
  { img: KHMC, text: "KHMC", path: "" },

  {
    img: WMS,
    text: "Approve Receivings",
    path: "/home/wms/warehouse/receiverequests",
  },
];

const warehouseMember = [
  { img: KHMC, text: "KHMC", path: "" },

  {
    img: FunctionalUnit,
    text: "Initiate FU Requests",
    path: `/home/wms/fus/replenishment`,
  },

  {
    img: ReturnItem,
    text: "FU Returns",
    path: `/home/wms/fus/returnitems`,
  },

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
];

const warehouseIncharge = [
  // { img: FunctionalUnit, text: "Functional Unit", path: "" },
  { img: KHMC, text: "KHMC", path: "" },

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
    img: MedicationOrder,
    text: "Medication  Order",
    path: `/home/wms/fus/medicinalorder`,
  },

  {
    img: ProfessionalOrder,
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
  { img: KHMC, text: "KHMC", path: "" },

  {
    img: MedicationOrder,
    text: "Medication  Order",
    path: `/home/wms/fus/medicinalorder`,
  },

  // {
  //   img: PurchaseRequest,
  //   text: "Professional Order",
  //   path: `/home/wms/fus/professionalorder`,
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
    img: MedicationOrder,
    text: "Medication  Order",
    path: `/home/wms/fus/medicinalorder`,
  },

  {
    img: ProfessionalOrder,
    text: "Professional Order",
    path: `/home/wms/fus/professionalorder`,
  },

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
];

const fuReturnRequestApprovalMember = [
  { img: KHMC, text: "KHMC", path: "" },

  {
    img: ReturnItem,
    text: "Approve Returns",
    path: `/home/wms/fus/returnitems`,
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
  // { img: FunctionalUnit, text: "Functional Unit", path: "" },
  { img: KHMC, text: "KHMC", path: "" },

  {
    img: RepRequestStatus,
    text: "Replenishment Request Status",
    path: `/home/wms/fus/replenishment`,
  },

  {
    img: ReceiveItem,
    text: "Order Receiving/ Return",
    path: `/home/wms/fus/receive`,
  },

  {
    img: ManualRequest,
    text: "Manual Request",
    path: `/home/wms/fus/replenishment/add/manual`,
  },

  {
    img: ReturnItem,
    text: "FU Returns Status",
    path: `/home/wms/fus/returnitems`,
  },

  {
    img: "",
    text: "",
    path: "",
  },

  {
    img: MedicationOrder,
    text: "Medication  Order",
    path: `/home/wms/fus/medicinalorder`,
  },

  {
    img: ProfessionalOrder,
    text: "Professional Order",
    path: `/home/wms/fus/professionalorder`,
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

const warehouseInventoryKeeper = [
  { img: KHMC, text: "KHMC APPS", path: "" },

  {
    img: purchase_request,
    text: "Purchase Requests",
    path: "/home/wms/warehouse/pr",
  },

  {
    img: FuncUFulfillment,
    text: "FuncU Fullfillment",
    path: `/home/wms/fus/replenishment`,
  },

  {
    img: ReceiveItem,
    text: "Order Receiving/ Return",
    path: "/home/wms/warehouse/materialreceiving",
  },

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
    img: "",
    text: "",
    path: "",
  },

  {
    img: wh_inventory,
    text: "WH Inventory",
    path: "/home/wms/warehouse/warehouseinventory",
  },

  // {
  //   img: purchase_order,
  //   text: "Purchase Order",
  //   path: "/home/wms/warehouse/po",
  // },
];

const purchasingManager = [
  { img: KHMC, text: "KHMC APPS", path: "" },

  {
    img: purchase_order,
    text: "Purchase Order",
    path: "/home/wms/warehouse/po",
  },
];

const purchasingOfficer = [
  { img: KHMC, text: "KHMC APPS", path: "" },

  {
    img: VendorReturns,
    text: "Vendor Return",
    path: "/home/wms/warehouse/externalreturn",
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
              : userType && userType.type === "Committe Member"
              ? committeeMember
              : userType && userType.type === "Accounts Member"
              ? accountsMember
              : userType && userType.type === "Purchasing Officer"
              ? purchasingOfficer
              : userType && userType.type === "Purchasing Manager"
              ? purchasingManager
              : userType && userType.type === "Warehouse Member"
              ? warehouseMember
              : userType && userType.type === "FU Member"
              ? fuHead
              : userType && userType.type === "Warehouse Incharge"
              ? warehouseIncharge
              : userType && userType.type === "Warehouse Inventory Keeper"
              ? warehouseInventoryKeeper
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
              : userType && userType.type === "Warehouse Incharge"
              ? warehouseIncharge
              : userType && userType.type === "FU Inventory Keeper"
              ? fuInventoryKeeper
              : userType && userType.type === "Resident Doctor"
              ? residentDoctor
              : (userType && userType.type === "IPR Receptionist") ||
                (userType && userType.type === "EDR Receptionist")
              ? frontDesk
              : userType && userType.type === "Insurance Department"
              ? insuranceDepartment
              : userType && userType.type === "Registered Nurse"
              ? registeredNurse
              : userType && userType.type === "Radiology/Imaging"
              ? radiologyImagingDepartment
              : userType && userType.type === "Lab Technician"
              ? labTechnician
              : userType && userType.type === "Pharmacist"
              ? pharmacist
              : userType && userType.type === "Doctor/Physician"
              ? doctorPhysician
              : userType && userType.type === "Consultant/Specialist"
              ? consultantSpecialist
              : admin
          }
        />
      </div>
    );
  }
}

export default HomeScreen;
