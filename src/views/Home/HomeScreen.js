// import React from 'react';
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import KHMC from "../../assets/img/KHMC Header LOGO.png"
import "../../components/MenuTree/MenuPage.css"
import MenuTree from "../../components/MenuTree/MenuTree"
import PatientRegistration from "../../assets/img/PatientRegistration.png"
import Snackbar from "../../components/Snackbar/Snackbar"
import Notification from "../../components/Snackbar/Notification.js"
import AddAlert from "@material-ui/icons/AddAlert"
import { Redirect } from "react-router-dom"
import axios from "axios"
import cookie from "react-cookies"
import Header from "../../components/Header/Header"
import RCM from "../../assets/img/RCM.png"
import WMS from "../../assets/img/WMS.png"
import FIN from "../../assets/img/FIN.png"
import Control_Room from "../../assets/img/Control_Room.png"
import Reports from "../../assets/img/Reports.png"
import BU from "../../assets/img/business_Unit.png"
import FunctionalUnit from "../../assets/img/Functional Unit.png"
import Staff from "../../assets/img/Staff.png"
import PurchaseRequest from "../../assets/img/purchase request.png"
import React, { useEffect } from "react"
import "./MenuPage.css"
import { render } from "react-dom"
import Back from "../../assets/img/Back_Arrow.png"
import KHMC_White from "../../assets/img/KHMC_White.png"
import Influence_white from "../../assets/img/Influence_white.png"
import ReturnItem from "../../assets/img/Return Item.png"
import ReceiveItem from "../../assets/img/Receive Item.png"
import ReceiveItems from "../ReplenishmentRequestForFU/handleReceiveItemForFUInventory"
import claimsReview from "../../assets/img/ClaimsReview.png"
import PreApproval from "../../assets/img/Pre-Approval.png"
import IPR from "../../assets/img/IPR.png"
import outPatient1 from "../../assets/img/Rad Out Patient.png"
import outPatient2 from "../../assets/img/Lab Out-Patient.png"
import outPatient3 from "../../assets/img/Pharmacist  Out-Patient.png"
import DM from "../../assets/img/Discharge Medication.png"
import CN from "../../assets/img/Consultation_Notes.png"
import assessmentIcon from "../../assets/img/PatientAssessment.png"
import patientCareIcon from "../../assets/img/PatientCare.png"
import Lab_RadIcon from "../../assets/img/Lab-Rad Request.png"
import wh_inventory from "../../assets/img/WH Inventory.png"
import purchase_order from "../../assets/img/Purchase Order.png"
import purchase_request from "../../assets/img/purchase request.png"
import MaterialReceiving from "../../assets/img/Material Receiving.png"
import AssessDiagIcon from "../../assets/img/Assessment & Diagnosis.png"
import DischargeIcon from "../../assets/img/Doctor - Discharge.png"
import HistoryIcon from "../../assets/img/Manual Request.png"
import CRIcon from "../../assets/img/Consultation Request.png"
import WMS_Back from "../../assets/img/WMS_Back.png"
import OrderItems from "../../assets/img/Order Items.png"
import Others from "../../assets/img/Others.png"

import RepRequestStatus from "../../assets/img/Replenishment Requests Status.png"
// import FuncUFulfillment from "../../assets/img/FuncUFulfillment.png";
import ManualRequest from "../../assets/img/Manual Request.png"
import VendorReturns from "../../assets/img/Vendor Returns.png"
import FuncUFulfillment from "../../assets/img/FuncU Fulfillment.png"
import MedicationOrder from "../../assets/img/Medication Order.png"
import ProfessionalOrder from "../../assets/img/Professional Order.png"

import { connect } from "react-redux"
import {
  funForReducer,
  setPatientDetailsForReducer,
} from "../../actions/Checking"

import PatientHistory from "../PatientHistory/PatientHistory"

import GenericDashboad from "../../components/GenericDashboad/GenericDashboard"
import ApprovalCommitteeMember from "../../assets/img/Approval Committee Member.png"
import NewPurchaseRequests from "../../assets/img/New Purchase Requests.png"
import NewPurchaseOrders from "../../assets/img/New Purchase Orders.png"

import CommitteeMember from "../UsersDashboards/CommitteeMember"
import PurchasingOfficer from "../UsersDashboards/PurchasingOfficer"
import WarehouseInventoryKeeper from "../UsersDashboards/WarehouseInventoryKeeper"
import FunctionalUnitInventoryKeeper from "../UsersDashboards/FunctionalUnitInventoryKeeper"
import Cashier from "../UsersDashboards/Cashier"
import InsuranceDepartment from "../UsersDashboards/InsuranceDepartment"
import RadiologyDepartment from "../UsersDashboards/RadiologyDepartment"
import LabTechnician from "../UsersDashboards/LabTechnician"
import Pharmacist from "../UsersDashboards/Pharmacist"
import RegistrationOfficer from "../UsersDashboards/RegistrationOfficer"
import Nurse from "../UsersDashboards/Nurse"
import Consultant from "../UsersDashboards/Consultant"
import Doctor from "../UsersDashboards/Doctor"

const admin = [
  { img: KHMC, path: "" },
  // {
  //   img: RCM,
  //   text: "RCM",
  //   path: "/home/rcm",
  // },

  // {
  //   img: WMS,
  //   text: "WMS",
  //   path: "/home/wms",
  // },

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

  {
    img: Reports,
    text: "Reports",
    path: `/home/reports`,
  },
]

const residentDoctor = [
  { img: KHMC, path: "" },
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
]

const frontDesk = [
  { img: KHMC, path: "" },
  {
    img: PatientRegistration,
    text: "Patient Registration",
    path: "/home/rcm/patientListing/add",
  },
  {
    img: PatientRegistration,
    text: "Patient History",
    path: "/home/rcm/patientHistory",
  },
]

const insuranceDepartment = [
  { img: KHMC, path: "" },
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
]

const registeredNurse = [
  { img: KHMC, path: "" },
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
    img: OrderItems,
    text: "Order Items (Non-Pharma Med)",
    path: `/home/wms/fus/professionalorder/addorder`,
  },

  {
    img: ReceiveItem,
    text: "Order Receiving (Medical)",
    path: `/home/wms/fus/medicinalorder`,
  },

  {
    img: OrderItems,
    text: "Order Items (Non-Medical)",
    path: `/home/wms/fus/professionalorder/addnonmedicalorder`,
  },

  // {
  //   img: ProfessionalOrder,
  //   text: 'View Orders',
  //   path: `/home/wms/fus/professionalorder`,
  // },
  // {
  //   img: MedicationOrder,
  //   text: 'Medication  Order Receiving',
  //   path: `/home/wms/fus/medicinalorder`,
  // },

  {
    img: ReceiveItem,
    text: "Order Receiving (Non-Medical)",
    path: `/home/wms/fus/professionalorder/receiveorder`,
  },
]

const radiologyImagingDepartment = [
  { img: KHMC, path: "" },
  {
    img: IPR,
    text: "In-Patient",
    path: "/home/rcm/sr/rr/ipr",
  },

  {
    img: outPatient1,
    text: "Out-Patient",
    path: "/home/rcm/sr/rr/opr",
  },
]

const labTechnician = [
  { img: KHMC, path: "" },
  {
    img: IPR,
    text: "In-Patient",
    path: "/home/rcm/sr/lr/ipr",
  },

  {
    img: outPatient2,
    text: "Out-Patient",
    path: "/home/rcm/sr/lr/opr",
  },
]

const pharmacist = [
  { img: KHMC, path: "" },
  {
    img: IPR,
    text: "In-Patient",
    path: "/home/rcm/sr/phr/ipr",
  },

  {
    img: outPatient3,
    text: "Out-Patient",
    path: "/home/rcm/sr/phr/opr",
  },

  {
    img: DM,
    text: "Discharge",
    path: "/home/rcm/sr/phr/dischargemedication/ipr",
  },
]

const doctorPhysician = [
  { img: KHMC, path: "" },
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

  // {
  //   img: OrderItems,
  //   text: "Order Items",
  //   path: `/home/wms/fus/medicinalorder`,
  // },

  {
    img: OrderItems,
    text: "Order Items (Medical)",
    path: `/home/wms/fus/medicinalorder`,
  },
]

const consultantSpecialist = [
  { img: KHMC, path: "" },
  {
    img: CN,
    text: "Consultation Notes",
    path: "/home/rcm/ecr/cn",
  },

  {
    img: OrderItems,
    text: "Order Items (Medical)",
    path: `/home/wms/fus/medicinalorder`,
  },
]

const buHead = [
  { img: Control_Room, text: "Control Room", path: "" },
  { img: RCM, text: "RCM", path: "" },
  { img: BU, text: "BU Mgmt", path: "controlroom/bus" },
  { img: FunctionalUnit, text: "FU Mgmt", path: "controlroom/fus" },
]

const committeeMember = [
  { img: KHMC, path: "" },

  {
    img: purchase_request,
    text: "Purchase Requests",
    path: "/home/wms/warehouse/pr",
  },

  {
    img: purchase_order,
    text: "Purchase Orders",
    path: "/home/wms/warehouse/po",
  },
]

const accountsMember = [
  // { img: Control_Room, text: "Control Room", path: "" },
  { img: KHMC, path: "" },

  {
    img: WMS,
    text: "Approve Receivings",
    path: "/home/wms/warehouse/receiverequests",
  },
]

const warehouseMember = [
  { img: KHMC, path: "" },

  {
    img: FuncUFulfillment,
    text: "FuncU Fulfillment",
    path: `/home/wms/fus/replenishment`,
  },

  {
    img: ReturnItem,
    text: "FuncU Returns",
    path: `/home/wms/fus/returnitems`,
  },

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
]

const warehouseIncharge = [
  // { img: FunctionalUnit, text: "Functional Unit", path: "" },
  { img: KHMC, path: "" },

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
]

const fuHead = [
  { img: FunctionalUnit, text: "Functional Unit", path: "" },
  // {
  //   img: MedicationOrder,
  //   text: "Medication  Order",
  //   path: `/home/wms/fus/medicinalorder`,
  // },

  // {
  //   img: ProfessionalOrder,
  //   text: "Professional Order",
  //   path: `fus/professionalorder`,
  // },

  {
    img: FunctionalUnit,
    text: "FU Inventory",
    path: `fus/fuinventory`,
  },

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

  // {
  //   img: ReceiveItem,
  //   text: "Receive Items",
  //   path: `fus/receive`,
  // },
]

const buMember = [
  // { img: FunctionalUnit, text: "Functional Unit", path: "" },
  { img: KHMC, path: "" },

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
]

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
]

const fuReturnRequestApprovalMember = [
  { img: KHMC, path: "" },

  {
    img: ReturnItem,
    text: "Approve Returns",
    path: `/home/wms/fus/returnitems`,
  },
]

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
  { img: KHMC, path: "" },

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
    text: "Functional Unit Returns",
    path: `/home/wms/fus/returnitems`,
  },

  // {
  //   img: FunctionalUnit,
  //   text: "FuncU Inventory",
  //   path: `/home/wms/fus/fuinventory`,
  // },

  {
    img: Others,
    text: "Others",
    path: `/home/reports`,
  },

  // {
  //   img: "",
  //   text: "",
  //   path: "",
  // },

  {
    img: MedicationOrder,
    text: "Order Items (Medical)",
    path: `/home/wms/fus/medicinalorder`,
  },

  {
    img: ProfessionalOrder,
    text: "Order Items (Non-Medical)",
    path: `/home/wms/fus/professionalorder`,
  },

  // {
  //   img: OrderItems,
  //   text: "Items Order",
  //   path: `/home/wms/fus/medicinalorder`,
  // },
]

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
]

const warehouseInventoryKeeper = [
  { img: KHMC, text: "", path: "" },

  {
    img: purchase_request,
    text: "Purchase Requests",
    path: "/home/wms/warehouse/pr",
  },

  {
    img: FuncUFulfillment,
    text: "Replenishment Requests",
    path: `/home/wms/fus/replenishment`,
  },

  {
    img: ReceiveItem,
    text: "Order Receiving/ Return",
    path: "/home/wms/warehouse/materialreceiving",
  },

  {
    img: Reports,
    text: "Reports",
    path: `/home/reports`,
  },
  {
    img: ReceiveItem,
    text: "Received Items",
    path: "/home/wms/warehouse/receiveitems",
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
]

const purchasingManager = [
  { img: KHMC, text: "", path: "" },

  {
    img: purchase_order,
    text: "Purchase Orders",
    path: "/home/wms/warehouse/po",
  },
]

const purchasingOfficer = [
  { img: KHMC, text: "", path: "" },

  {
    img: VendorReturns,
    text: "Vendor Return",
    path: "/home/wms/warehouse/externalreturn",
  },
]

const cashier = [
  { img: KHMC, text: "", path: "" },
  {
    img: claimsReview,
    text: "Patient Clearance",
    path: "/home/rcm/patientclearence",
  },
]

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openApps: false,
      currentUser: "",
      userStaff: "",

      options: "",

      openHome: false,

      notificationArray: [],

      headingIcon: "",
    }
  }

  setOptions() {
    let routeAccess = this.state.userStaff.routeAccess

    let options = []

    for (let i = 0; i < routeAccess.length; i++) {
      let routeObj = routeAccess[i]
      let splitedModulesArray = routeObj.route.split("/")

      for (let j = 0; j < splitedModulesArray.length; j++) {
        let singleModule = splitedModulesArray[j]
        let temp = admin.find((r) => r.text === singleModule)
        if (temp) {
          console.log(temp.text)
          let alreadyFound =
            options && options.find((r) => r.text === temp.text)
          if (!alreadyFound) {
            options.push(temp)
          }
        }
      }
    }

    console.log(options)
    this.setState({ options: [admin[0], ...options] })
  }

  componentWillMount() {
    this.setState({
      currentUser: cookie.load("current_user"),
      userStaff: cookie.load("user_staff"),
    })
  }

  componentDidMount() {
    // if (this.state.userStaff !== "" && this.state.userStaff !== "undefined") {
    //   this.setOptions();
    // }

    this.props.setPatientDetailsForReducer("")

    if (this.state.openHome)
      setTimeout(() => {
        document.getElementById("menu-open").checked = true
      }, 120)

    if (this.state.currentUser.staffTypeId.type === "Committe Member") {
      this.setState({
        notificationArray: [
          { icon: NewPurchaseRequests, title: "New Purchase Requests" },
          { icon: NewPurchaseOrders, title: "New Purchase Order" },
        ],
        headingIcon: ApprovalCommitteeMember,
        headingTitle: "Approval Committee Member",
      })
    }
  }

  openApps() {
    this.setState({ openHome: true })
  }

  render() {
    const userType = this.state.currentUser.staffTypeId
    console.log(userType)

    if (this.state.openHome) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "fixed",
            width: "100%",
            height: "100%",
            // backgroundColor: "#2B62CC",
            background: "rgb(101,228,193)",
            background:
              "linear-gradient(25deg, rgba(101,228,193,1) 0%, rgba(58,219,175,1) 33%, rgba(15,206,147,1) 66%, rgba(6,142,103,1) 100%)",
            // backgroundImage: `url("${WMS_Back}")`,
            backgroundSize: "100%",
          }}
        >
          <Header history={this.props.history} />

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
                : userType && userType.type === "Cashier"
                ? cashier
                : admin
            }
          />
        </div>
      )
    } else {
      return (
        <GenericDashboad
          notificationArray={this.state.notificationArray}
          headingIcon={this.state.headingIcon}
          headingTitle={this.state.headingTitle}
          openApps={this.openApps.bind(this)}
        >
          {userType && userType.type === "Committe Member" ? (
            <CommitteeMember />
          ) : userType && userType.type === "Purchasing Officer" ? (
            <PurchasingOfficer />
          ) : userType && userType.type === "Warehouse Inventory Keeper" ? (
            <WarehouseInventoryKeeper />
          ) : userType && userType.type === "FU Inventory Keeper" ? (
            <FunctionalUnitInventoryKeeper />
          ) : userType && userType.type === "Cashier" ? (
            <Cashier />
          ) : userType && userType.type === "Insurance Department" ? (
            <InsuranceDepartment />
          ) : userType && userType.type === "Radiology/Imaging" ? (
            <RadiologyDepartment />
          ) : userType && userType.type === "Lab Technician" ? (
            <LabTechnician />
          ) : userType && userType.type === "Pharmacist" ? (
            <Pharmacist />
          ) : (userType && userType.type === "IPR Receptionist") ||
            (userType && userType.type === "EDR Receptionist") ? (
            <RegistrationOfficer />
          ) : userType && userType.type === "Registered Nurse" ? (
            <Nurse />
          ) : userType && userType.type === "Consultant/Specialist" ? (
            <Consultant />
          ) : userType && userType.type === "Doctor/Physician" ? (
            <Doctor />
          ) : (
            undefined
          )}
        </GenericDashboad>
      )
    }
  }
}

const mapStateToProps = ({ CheckingReducer }) => {
  const { count, patientDetails } = CheckingReducer
  return { count, patientDetails }
}
export default connect(mapStateToProps, {
  funForReducer,
  setPatientDetailsForReducer,
})(HomeScreen)
