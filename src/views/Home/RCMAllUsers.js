// import React from 'react';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import KHMC from "../../assets/img/KHMC Header LOGO.png";
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
import Reports from "../../assets/img/Reports.png";
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
import outPatient1 from "../../assets/img/Rad Out Patient.png";
import outPatient2 from "../../assets/img/Lab Out-Patient.png";
import outPatient3 from "../../assets/img/Pharmacist  Out-Patient.png";
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
import HistoryIcon from "../../assets/img/Manual Request.png";
import CRIcon from "../../assets/img/Consultation Request.png";
import WMS_Back from "../../assets/img/WMS_Back.png";
import OrderItems from "../../assets/img/Order Items.png";
import Others from "../../assets/img/Others.png";

import RepRequestStatus from "../../assets/img/Replenishment Requests Status.png";
// import FuncUFulfillment from "../../assets/img/FuncUFulfillment.png";
import ManualRequest from "../../assets/img/Manual Request.png";
import VendorReturns from "../../assets/img/Vendor Returns.png";
import FuncUFulfillment from "../../assets/img/FuncU Fulfillment.png";
import MedicationOrder from "../../assets/img/Medication Order.png";
import ProfessionalOrder from "../../assets/img/Professional Order.png";
import FuncUIK from "../../assets/img/FuncUIK.png";

import { connect } from "react-redux";
import {
  funForReducer,
  setPatientDetailsForReducer,
} from "../../actions/Checking";

import PatientHistory from "../PatientHistory/PatientHistory";

import GenericDashboad from "../../components/GenericDashboad/GenericDashboard";
import ApprovalCommitteeMember from "../../assets/img/Approval Committee Member.png";
import PurchaseOfficer from "../../assets/img/Purchase Officer.png";
import WHIK from "../../assets/img/WHIK.png";
import NewPurchaseRequests from "../../assets/img/New Purchase Requests.png";
import ReplenishmentRequests from "../../assets/img/Replenishment Requests.png";
import NewPurchaseOrders from "../../assets/img/New Purchase Orders.png";
import NewOrders from "../../assets/img/New Orders.png";
import ExpiredNearlyExpiredItems from "../../assets/img/Expired - Nearly Expired Items.png";
import CashierIcon from "../../assets/img/Cashier.png";
import NewDischargeDispositionRequests from "../../assets/img/New Discharge - Disposition Requests.png";
import Notifications from "../../assets/img/Notifications.png";
import InsuranceClaimsManager from "../../assets/img/Insurance Claims Manager.png";
import RadiologyRequests from "../../assets/img/Radiology Requests.png";
import LabRequest from "../../assets/img/Lab Request.png";
import RadTechnician from "../../assets/img/Rad Technician.png";
import LabTechnicianIcon from "../../assets/img/Lab Technician.png";
import NewPharmaRequests from "../../assets/img/New Pharma Requests.png";
import NewNonPharmaRequests from "../../assets/img/New Non-Pharma Requests.png";
import PharmacistIcon from "../../assets/img/Pharmacist.png";
import NewPatientsArriving from "../../assets/img/New Patients Arriving.png";
import RegisteredNurse from "../../assets/img/Registered Nurse.png";
import RegistrationOfficerIcon from "../../assets/img/Registration Officer.png";
import ResidentDoctorIcon from "../../assets/img/ResidentDoctor.png";

import CommitteeMember from "../UsersDashboards/CommitteeMember";
import PurchasingOfficer from "../UsersDashboards/PurchasingOfficer";
import WarehouseInventoryKeeper from "../UsersDashboards/WarehouseInventoryKeeper";
import FunctionalUnitInventoryKeeper from "../UsersDashboards/FunctionalUnitInventoryKeeper";
import Cashier from "../UsersDashboards/Cashier";
import InsuranceDepartment from "../UsersDashboards/InsuranceDepartment";
import RadiologyDepartment from "../UsersDashboards/RadiologyDepartment";
import LabTechnician from "../UsersDashboards/LabTechnician";
import Pharmacist from "../UsersDashboards/Pharmacist";
import RegistrationOfficer from "../UsersDashboards/RegistrationOfficer";
import Nurse from "../UsersDashboards/Nurse";
import Consultant from "../UsersDashboards/Consultant";
import Doctor from "../UsersDashboards/Doctor";

import { loginUrl, getStaffUrl, recordLogin } from "../../public/endpoins";

import { subscribeUser } from "../../subscription";
import { UnfoldLess } from "@material-ui/icons";

const superAdmin = [
  { img: RCM, path: "", text: "RCM" },

  {
    img: RegistrationOfficerIcon,
    text: "EDR Officer",
    // path: "/home/fin",
    user: {
      email: "edrreceptionist@khmc.com",
      password: "123456",
    },
  },
  {
    img: RegistrationOfficerIcon,
    text: "IPR Officer",
    // path: `/home/controlroom`,
    user: {
      email: "iprreceptionist@khmc.com",
      password: "123456",
    },
  },

  {
    img: ResidentDoctorIcon,
    text: "Doctor / Physician",
    // path: `/home/reports`,
    user: {
      email: "doctorphysician@khmc.com",
      password: "123456",
    },
  },

  {
    img: RegisteredNurse,
    text: "Registered Nurse",
    // path: "/home/allwmsusers",
    user: {
      email: "registerednurse@khmc.com",
      password: "1234567",
    },
  },

  {
    img: ResidentDoctorIcon,
    text: "External Consultant",
    // path: `/home/controlroom`,
    user: {
      email: "consultantspecialist@khmc.com",
      password: "123456",
    },
  },

  {
    img: PharmacistIcon,
    text: "Pharmacist",
    // path: `/home/controlroom`,
    user: {
      email: "pharmacist@khmc.com",
      password: "123456",
    },
  },

  {
    img: Others,
    text: "Others",
    path: `/home/allrcmusers/others`,
    // user: {
    //   email: "labtechnician@khmc.com",
    //   password: "123456",
    // },
  },
];

const superAdminForOthers = [
  { img: RCM, path: "", text: "RCM" },

  {
    img: LabTechnicianIcon,
    text: "Lab Technician",
    // path: "/home/fin",
    user: {
      email: "labtechnician@khmc.com",
      password: "123456",
    },
  },
  {
    img: InsuranceClaimsManager,
    text: "Insurance Manager",
    // path: `/home/controlroom`,
    user: {
      email: "insurancemanager@khmc.com",
      password: "123456",
    },
  },

  {
    img: CashierIcon,
    text: "Cashier",
    // path: `/home/reports`,
    user: {
      email: "cashier@khmc.com",
      password: "123456",
    },
  },

  {
    img: RadTechnician,
    text: "Radiology Dept",
    // path: "/home/allwmsusers",
    user: {
      email: "radiologydepartment@khmc.com",
      password: "123456",
    },
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

      openHome: true,

      notificationArray: [],

      headingIcon: "",

      verifiedUser: false,
      current_user: "",
    };
  }

  componentWillMount() {
    this.setState({
      //   currentUser: cookie.load("current_user"),
      userStaff: cookie.load("user_staff"),
    });
  }

  componentDidMount() {
    // if (this.state.userStaff !== "" && this.state.userStaff !== "undefined") {
    //   this.setOptions();
    // }

    const params = {
      email: "admin@khmc.com",
      password: "123456",
    };

    axios
      .post(loginUrl, params)
      .then((res) => {
        if (res.data.success) {
          // console.log("full response", res.data.data);
          this.getStaffTypes(res.data.data.user);
          cookie.save("token", res.data.data.token, { path: "/" });
          cookie.save("current_user", res.data.data.user, { path: "/" });
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
      })
      .catch((e) => {
        console.log("error is ", e);
        this.setState({
          tr: true,
          msg: "Login failed",
          buttonPressed: false,
        });
      });

    this.props.setPatientDetailsForReducer("");

    if (this.state.openHome && this.state.currentUser)
      setTimeout(() => {
        document.getElementById("menu-open").checked = true;
      }, 120);
  }

  openApps() {
    this.setState({ openHome: true });
  }

  getStaffTypes(user, calledFor) {
    axios
      .get(getStaffUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("all staff", res.data.data);

          let userStaff = res.data.data.staff.filter(
            (s) => s._id === user.staffId
          );

          console.log("user staff", userStaff[0]);
          cookie.save("user_staff", userStaff[0], { path: "/" });

          if (!calledFor) {
            this.setState({
              currentUser: user,
            });
          }
          // this.setState({
          //   systemAdmin: res.data.data.systemAdmin,
          //   staffType: res.data.data.staffType,
          //   staff: res.data.data.staff,
          // });

          if (calledFor) {
            this.setState({
              verifiedUser: true,
              buttonPressed: false,
              current_user: user,
            });
            this.props.history.push("/home/allwmsusers/singleuser");
          }
        } else if (!res.data.success) {
          console.log("error", res);
          // setErrorMsg(res.data.error);
          // setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  handleLoginUser(userCredentials) {
    if (!userCredentials) {
      this.props.history.push("/home/allrcmusers/others");
      return;
    }

    const params = {
      email: userCredentials.email,
      password: userCredentials.password,
    };

    axios
      .post(loginUrl, params)
      .then((res) => {
        if (res.data.success) {
          // console.log("full response", res.data.data);
          this.getStaffTypes(res.data.data.user, "specificUser");
          cookie.save("token", res.data.data.token, { path: "/" });
          cookie.save("current_user", res.data.data.user, { path: "/" });
          subscribeUser(res.data.data.user);

          //   this.recordLogin(res.data.data);

          // this.props.history.push('/home'+ '/'+res.data.data.user.staffTypeId.routeAccess);

          // const jsonResponse = new Response(
          //   JSON.stringify(res.data.data.user),
          //   {
          //     headers: {
          //       "content-type": "application/json",
          //     },
          //   }
          // );

          // window.caches
          //   .open("pwa-task-manager-cache")
          //   .then((cache) => cache.put("data.json", jsonResponse));
        }
        // else if (!res.data.success) {
        //   this.setState({ tr: true });
        // }
      })
      .catch((e) => {
        console.log("error is ", e);
        this.setState({
          tr: true,
          msg: "Login failed",
          buttonPressed: false,
        });
      });
  }

  render() {
    const userType = this.state.currentUser.staffTypeId;

    // if (this.state.verifiedUser) {
    //   // return <Redirect to="/admin/dashboard" />;
    //   return <Redirect to="/home/allwmsusers/singleuser" />;
    // }

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

        {this.state.currentUser ? (
          <MenuTree
            history={this.props.history}
            options={
              userType &&
              userType.type === "super admin" &&
              this.props.history.location.pathname ===
                "/home/allrcmusers/others"
                ? superAdminForOthers
                : userType &&
                  userType.type === "super admin" &&
                  this.props.history.location.pathname === "/home/allrcmusers"
                ? superAdmin
                : ""
            }
            handleLoginUser={this.handleLoginUser.bind(this)}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ CheckingReducer }) => {
  const { count, patientDetails } = CheckingReducer;
  return { count, patientDetails };
};
export default connect(mapStateToProps, {
  funForReducer,
  setPatientDetailsForReducer,
})(HomeScreen);
