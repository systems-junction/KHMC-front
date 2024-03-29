// /*eslint-disable*/
// import React, { useState, useEffect } from "react";
// import Notification from "../../../components/Snackbar/Notification.js";
// import CustomTable from "../../../components/Table/Table";
// import axios from "axios";
// import {
//   getPHRPatient,
//   // getMaterialReceivingUrl
// } from "../../../public/endpoins";
// import Loader from "react-loader-spinner";
// import Back from "../../../assets/img/Back_Arrow.png";
// import Header from "../../../components/Header/Header";
// import business_Unit from "../../../assets/img/PHR.png";
// import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
// import socketIOClient from "socket.io-client";

// const tableHeading = ["MRN", "Request Number", "Date", "Status", "Action"];
// const tableDataKeys = ["profileNo", , "requestNo", "date", "status"];

// const actions = { view: true };

// export default function EDR(props) {
//   const [Edr, setEdr] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [openNotification, setOpenNotification] = useState(false);

//   if (openNotification) {
//     setTimeout(() => {
//       setOpenNotification(false);
//       setErrorMsg("");
//     }, 2000);
//   }

//   useEffect(() => {
//     // const socket = socketIOClient(socketUrl);
//     // socket.emit("connection");
//     // socket.on("get_data", (data) => {
//     //   setMaterialReceivings(data.reverse());
//     //   console.log("res after adding through socket", data);
//     // });
//     getEDRsData();
//     // return () => socket.disconnect();
//   }, []);

//   function getEDRsData() {
//     axios
//       .get(getPHRPatient)
//       .then((res) => {
//         if (res.data.success) {
//           console.log(res.data.data[0], "ecr1");
//           res.data.data[0].map((d) => (d.profileNo = d.patientData.profileNo));
//           setEdr(res.data.data[0].reverse());
//         } else if (!res.data.success) {
//           setErrorMsg(res.data.error);
//           setOpenNotification(true);
//         }
//         return res;
//       })
//       .catch((e) => {
//         console.log("error: ", e);
//       });
//   }

//   function handleView(rec) {
//     let path = `ipr/viewIPR`;
//     props.history.push({
//       pathname: path,
//       state: {
//         selectedItem: rec,
//         comingFor: "edr",
//       },
//     });
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         flex: 1,
//         position: "fixed",
//         width: "100%",
//         height: "100%",
//         backgroundColor: "#60d69f",
//         overflowY: "scroll",
//       }}
//     >
//       <Header history={props.history}/>

//       <div className="cPadding">
//         <div className="subheader">
//           <div>
//             <img src={business_Unit} />
//             <h4>In Patient</h4>
//           </div>
//           {/* <div>
//             <img onClick={addNewItem} src={Add_New} />
//             <img src={Search} />
//           </div> */}
//         </div>

//         <div
//           style={{
//             flex: 4,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {Edr !== " " ? (
//             <div>
//               <div>
//                 <CustomTable
//                   tableData={Edr}
//                   tableDataKeys={tableDataKeys}
//                   tableHeading={tableHeading}
//                   action={actions}
//                   handleView={handleView}
//                   borderBottomColor={"#60d69f"}
//                   borderBottomWidth={20}
//                 />
//               </div>
//               <div style={{ marginTop: 20, marginBottom: 20 }}>
//                 <img
//                   onClick={() => props.history.goBack()}
//                   src={Back}
//                   style={{
//                     width: 45,
//                     height: 35,
//                     cursor: "pointer",
//                   }}
//                 />
//               </div>
//               <Notification msg={errorMsg} open={openNotification} />
//             </div>
//           ) : (
//             // <div className='LoaderStyle'>
//             //   <Loader type='TailSpin' color='red' height={50} width={50} />
//             // </div>
//             <div className="row " style={{ marginTop: "25px" }}>
//               <div className="col-11">
//                 <h3
//                   style={{
//                     color: "white",
//                     textAlign: "center",
//                     width: "100%",
//                     position: "absolute",
//                   }}
//                 >
//                   Opps...No Data Found
//                 </h3>
//               </div>
//               <div className="col-1" style={{ marginTop: 45 }}>
//                 <img
//                   onClick={() => props.history.goBack()}
//                   src={Back_Arrow}
//                   style={{ maxWidth: "60%", height: "auto", cursor: "pointer" }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";
import {
  getRepRequestUrlBUForPharmaceutical,
  deleteReplenishmentRequestUrl,
  getFunctionalUnitFromHeadIdUrl,
  getBusinessUnitUrlWithHead,
  getReceiveRequestBUUrl,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";
import Header from "../../components/Header/Header";
import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/IPR.png";
import cookie from "react-cookies";
import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";
import Edit from "../../assets/img/Edit.png";
import Inactive from "../../assets/img/Inactive.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import Fingerprint from "../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../assets/img/Bar Code.png";
import TextField from "@material-ui/core/TextField";
import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import { makeStyles } from "@material-ui/core/styles";
import add_new from "../../assets/img/Plus.png";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import QRCodeScannerComponent from "../../components/QRCodeScanner/QRCodeScanner";
import { useStyles1 } from "../../components/MuiCss/MuiCss";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import useStyles1 from "../../components/MuiCss/MuiCss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { id } from "date-fns/locale";

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
    // backgroundColor: 'white',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "60%",
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 2,
    paddingRight: 5,
  },
};
const useStyles = makeStyles(styles);

const useStylesForInput = makeStyles((theme) => ({
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:disabled": {
      color: "gray",
    },
  },
  // root: {
  //   "& .MuiFormLabel-root": {
  //     fontSize: "12px",

  //     paddingRight: "15px",
  //   },
  // },
  // label: {
  //   "&$focusedLabel": {
  //     color: "red",
  //     display: "none",
  //   },
  //   // "&$erroredLabel": {
  //   //   color: "orange"
  //   // }
  // },
  // focusedLabel: {},
}));

const tableHeadingForBUMember = [
  "Order Type",
  "Order No",
  "Patient MRN",
  "Date Generated",
  "Status",
  "Actions",
];
const tableDataKeysForBUMember = [
  "orderFor",
  "requestNo",
  "patientReferenceNo",
  "createdAt",
  "status",
];

// const tableHeadingForDoctorAndNursing = [
//   "Order Type",
//   "Request No",
//   "Patient MRN",
//   "Date Generated",
//   "Actions",
// ];
// const tableDataKeysForDoctorAndNursing = [
//   "orderFor",
//   "requestNo",
//   "patientReferenceNo",
//   "createdAt",
// ];

// const tableHeadingForFUMember = [
//   "Order Type",
//   "Request No",
//   "Patient MRN",
//   "Generated By",
//   "Date Generated",
//   "Actions",
// ];
// const tableDataKeysForFUMember = [
//   "orderFor",
//   "requestNo",
//   "patientReferenceNo",
//   "generatedBy",
//   "dateGenerated",
// ];

const tableDataKeysForItemsForBUMember = [
  ["itemId", "name"],
  ["itemId", "medClass"],
  "requestedQty",
  "status",
];

const tableDataKeysForFUMemberForItems = [
  ["itemId", "name"],
  ["itemId", "medClass"],
  "requestedQty",
  "secondStatus",
];

const tableHeadingForFUMemberForItems = [
  "Name",
  "Type",
  "Requested Qty",
  "Status",
  "Actions",
];

const tableHeadingForBUMemberForItems = [
  "Name",
  "Type",
  "Requested Qty",
  "Status",
  "Actions",
];

const actions = { view: true };
const actionsForBUMemeber = { edit: true, view: true };
const actionsForBUNurse = { view: true };
const actionsForBUDoctor = { view: true };

const actionsForItemsForReceiver = {
  receiveItem: true,
};
const actionsForItemsForOther = { view: true };
const actionsForItemsForFUMember = { edit: true };

export default function ReplenishmentRequest(props) {
  const classes = useStyles();
  const classesInput = useStylesForInput();
  const classes1 = useStyles1();
  const matches = useMediaQuery("(min-width:600px)");

  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [buObj, setBUObj] = useState("");
  const [receiveRequests, setReceiveRequests] = useState("");

  const [requestedItems, setRequestedItems] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [QRCodeScanner, setQRCodeScanner] = useState(false);

  const [actionsForTesting, setActions] = useState({
    edit: false,
    delete: false,
    view: false,
  });
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getRepRequestUrlBUForPharmaceutical)
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.data);
          let repRequest = res.data.data;
          // repRequest = res.data.data.filter(
          //   (order) => order.fuId._id === props.match.params.fuName
          // );

          if (currentUser.staffTypeId.type === "Doctor/Physician") {
            // let repRequest = res.data.data;
            let temp = [];
            for (let i = 0; i < repRequest.length; i++) {
              if (repRequest[i].buId.buHead === currentUser.staffId) {
                temp.push(repRequest[i]);
              }
            }
            console.log("rep array after filter", temp);
            setPurchaseRequest(temp.reverse());
          } else {
            if (currentUser.staffTypeId.type === "Pharmacist") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "pending" ||
                //   repRequest[i].status === "in_progress"
                //    || repRequest[i].status === "Received"
                // )
                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else if (currentUser.staffTypeId.type === "FU Incharge") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "Delivery in Progress" ||
                //   repRequest[i].status === "in_progress"
                // )

                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else if (currentUser.staffTypeId.type === "Registered Nurse") {
              // let repRequest = res.data.data;
              // let temp = [];
              // for (let i = 0; i < repRequest.length; i++) {
              //   if (
              //     repRequest[i].status === "Delivery in Progress" ||
              //     repRequest[i].status === "pending_administration" ||
              //     repRequest[i].status === "complete"
              //   ) {
              //     temp.push(repRequest[i]);
              //   }
              // }
              // console.log("rep array after filter", temp);
              console.log(repRequest);
              setPurchaseRequest(repRequest.reverse());
            } else if (currentUser.staffTypeId.type === "BU Inventory Keeper") {
              // let repRequest = res.data.data;
              let temp = [];
              for (let i = 0; i < repRequest.length; i++) {
                // if (
                //   repRequest[i].status === "complete" ||
                //   repRequest[i].status === "pending_administration"
                // )
                {
                  temp.push(repRequest[i]);
                }
              }
              // console.log("rep array after filter", temp);
              setPurchaseRequest(temp.reverse());
            } else {
              setPurchaseRequest(repRequest.reverse());
            }
          }
          //   setVendor(res.data.data.vendor);
          //   setStatus(res.data.data.status);
          //   setItems(res.data.data.items);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  function getBUFromHeadId() {
    axios
      .get(getBusinessUnitUrlWithHead + "/" + currentUser.staffId)
      .then((res) => {
        if (res.data.success) {
          console.log("BU Obj", res.data.data[0]);
          setBUObj(res.data.data[0]);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  function getReceiveRequestsForBU() {
    axios
      .get(getReceiveRequestBUUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("receive requests", res.data.data.receiveItems);
          setReceiveRequests(res.data.data.receiveItems);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  function setOptions() {
    let userStaff = cookie.load("user_staff");
    let routeAccess = userStaff.routeAccess;

    for (let i = 0; i < routeAccess.length; i++) {
      let routeObj = routeAccess[i];
      let splitedModulesArray = routeObj.route.split("/");

      for (let j = 0; j < splitedModulesArray.length; j++) {
        if (splitedModulesArray[j] === "Medication Orders") {
          console.log(splitedModulesArray[j], routeAccess[i].permission);
          const permissions = routeAccess[i].permission;
          const obj = {
            edit: permissions.edit === true ? true : false,
            view: permissions.read === true ? true : false,
            write: permissions.write === true ? true : false,
            delete: permissions.del === true ? true : false,
          };
          console.log(obj);
          setActions(obj);
        }
      }
    }
    // console.log(options);
    // this.setState({ options: [...options] });
  }

  useEffect(() => {
    // setOptions();

    if (currentUser.staffTypeId.type === "Doctor/Physician") {
      getBUFromHeadId();
    }

    if (
      props.history.location.state &&
      props.history.location.state.comingFrom
    ) {
      if (
        props.history.location.state.comingFrom === "notifications" &&
        props.history.location.state.SearchId
      ) {
        handlePatientSearch(props.history.location.state.SearchId.profileNo);
      }
    } else {
      getPurchaseRequests();
      getReceiveRequestsForBU();
    }
  }, []);

  const addNewItem = () => {
    let path = `medicinalorder/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add", vendors, statues, items, buObj },
    });
  };

  if (
    currentUser &&
    currentUser.staffTypeId.type === "Doctor/Physician" &&
    buObj !== "" &&
    props.history.location.pathname !== `/home/wms/fus/medicinalorder/view`
  ) {
    let path = `/home/wms/fus/medicinalorder/add`;
    // let selectedPatientForPharma = props.history.location.state.selectedPatient ?
    // props.history.location.state.selectedPatient : ""
    let obj = {
      comingFor: "add",
      vendors,
      statues,
      items,
      buObj,
    };
    let sendingObj = "";
    if (
      props.history.location.state &&
      props.history.location.state.selectedPatient
    ) {
      sendingObj = {
        ...obj,
        selectedPatientForPharma: props.history.location.state.selectedPatient,
      };
    } else {
      sendingObj = { ...obj };
    }
    props.history.replace({
      pathname: path,
      state: { ...sendingObj },
    });
  }

  function handleEdit(rec) {
    let path = `/home/wms/fus/medicinalorder/edit`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: rec,
        vendors,
        statues,
        items,
        buObj,
      },
    });
  }

  function handleDelete(id) {
    setModalVisible(true);
    setdeleteItem(id);
  }

  function deleteVendor() {
    const params = {
      _id: deleteItem,
    };

    axios
      .delete(deleteReceiveItemsUrl + "/" + params._id)
      .then((res) => {
        if (res.data.success) {
          setdeleteItem("");
          setModalVisible(false);
          window.location.reload(false);
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error while deletion ", e);
      });
  }

  const handleView = (obj) => {
    let path = `/home/wms/fus/medicinalorder/edit`;
    // props.history.push({
    //   pathname: path,
    //   state: {
    //     comingFor: "view",
    //     selectedItem: obj,
    //     vendors,
    //     statues,
    //     items,
    //     buObj,
    //   },
    // });

    // if (currentUser.staffTypeId.type === "Doctor/Physician") {
    //   let repRequest = res.data.da;
    //   let temp = [];
    //   for (let i = 0; i < repRequest.length; i++) {
    //     if (repRequest[i].buId.buHead === currentUser.staffId) {
    //       temp.push(repRequest[i]);
    //     }
    //   }
    //   console.log("rep array after filter", temp);
    //   setPurchaseRequest(temp.reverse());
    // }

    // else {

    if (currentUser.staffTypeId.type === "Registered Nurse") {
      let repRequest = obj.item;
      let temp = [];
      for (let i = 0; i < repRequest.length; i++) {
        if (
          repRequest[i].status === "Delivery in Progress" ||
          repRequest[i].status === "pending_administration" ||
          repRequest[i].status === "Received" ||
          repRequest[i].status === "Partially Received"
        ) {
          temp.push(repRequest[i]);
        }
      }
      console.log("rep array after filter", temp);

      if (temp.length === 0) {
        setOpenNotification(true);
        setErrorMsg("Order is still pending from the pharmacy/sub store.");
      } else {
        setSelectedOrder(obj);
        setIsOpen(true);
        setRequestedItems(temp);
      }
    } else {
      setSelectedOrder(obj);
      setIsOpen(true);
      setRequestedItems(obj.item);
    }
    // }
  };

  function handleReceive(rec) {
    let obj = {
      ...rec,
      buId: selectedOrder.buId,
      fuId: selectedOrder.fuId,
      replenishmentRequestId: selectedOrder._id,
    };

    console.log("rec", obj);

    let found = false;
    for (let i = 0; i < receiveRequests.length; i++) {
      if (receiveRequests[i].replenishmentRequestItemId === rec._id) {
        console.log("found");
        found = true;
        break;
      }
    }
    if (found) {
      setSelectedOrder("");
      setIsOpen(false);
      setRequestedItems("");
      setOpenNotification(true);
      setErrorMsg("Item has already been received");
    } else {
      let path = `/home/wms/fus/medicinalorder/receive`;
      props.history.push({
        pathname: path,
        state: {
          comingFor: "add",
          selectedItem: obj,
          // vendors,
          // statues,
          // purchaseOrders,
          // materialReceivingId: props.materialReceivingId,
        },
      });
    }
  }

  function handleEditRequestedItem(rec) {
    if (rec.secondStatus === "Cannot be fulfilled") {
      setErrorMsg("Request cannot be entertained for now");
      setOpenNotification(true);
      setIsOpen(false);
      return;
    }
    // let path = `/home/wms/fus/medicinalorder/requesteditem/edit`;
    let path = `ipr/changeStatus`;

    let requestedItem = requestedItems.find((item) => item._id === rec._id);

    let obj = {
      _id: selectedOrder._id,
      requestNo: selectedOrder.requestNo,
      generatedBy: selectedOrder.generatedBy,
      generated: selectedOrder.generated,
      dateGenerated: selectedOrder.dateGenerated,
      fuId: selectedOrder.fuId,
      buId: selectedOrder.buId,
      selectedRequestedItem: requestedItem,
      // comments: selectedOrder.comments,
      patientReferenceNo: selectedOrder.patientReferenceNo,
      requestedQty: requestedItem.requestedQty,
      duration: requestedItem.duration,
      dosage: requestedItem.dosage,
      noOfTimes: requestedItem.noOfTimes,
      currentQty: requestedItem.currentQty,
      status: requestedItem.status,
      secondStatus: requestedItem.secondStatus,
      requesterName: selectedOrder.requesterName,
      orderType: selectedOrder.orderType,
      department: selectedOrder.department,
      reason: selectedOrder.reason,
      item: selectedOrder.item,
      orderBy: selectedOrder.orderBy,
      schedule: requestedItem.schedule,
      priority: requestedItem.priority,
      make_model: requestedItem.make_model,
      size: requestedItem.size,
      comments: requestedItem.comments,
    };

    console.log("sending obj", obj);

    props.history.push({
      pathname: path,
      state: {
        comingFor: "edit",
        selectedItem: obj,
        vendors,
        statues,
        items,
        buObj,
      },
    });
  }

  const handlePatientSearch = (e) => {
    let a;

    if (
      props.history.location.state &&
      props.history.location.state.comingFrom
    ) {
      if (
        props.history.location.state.comingFrom === "notifications" &&
        props.history.location.state.SearchId
      ) {
        a = e;
      }
    } else {
      a = e.target.value.replace(/[^\w\s]/gi, "");
    }

    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getRepRequestUrlBUForPharmaceutical + "/" + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              setPurchaseRequest(res.data.data.reverse());
            } else {
              setPurchaseRequest([]);
            }
          }
        })
        .catch((e) => {
          console.log("error after searching patient request", e);
        });
    } else if (a.length == 0) {
      console.log("less");
      getPurchaseRequests();
    }
  };

  function scanQRCode() {
    setQRCodeScanner(true);
  }

  function handleScanQR(data) {
    setQRCodeScanner(false);
    console.log("data after parsing", JSON.parse(data).profileNo);

    handlePatientSearch({
      target: {
        value: JSON.parse(data).profileNo,
        type: "text",
      },
    });
  }

  if (QRCodeScanner) {
    return (
      <div>
        {QRCodeScanner ? (
          <QRCodeScannerComponent handleScanQR={handleScanQR} />
        ) : (
          undefined
        )}
      </div>
    );
  }

  if (
    (currentUser && currentUser.staffTypeId.type !== "Doctor/Physician") ||
    props.history.location.pathname === `/home/wms/fus/medicinalorder/view`
  ) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(19 213 159)",
          overflowY: "scroll",
        }}
      >
        <Header history={props.history} />
        <div className="cPadding">
          <div className="subheader" style={{ marginLeft: "-10px" }}>
            <div>
              <img src={business_Unit} />
              <h4>In-Patient </h4>
            </div>

            {/* {currentUser &&
            (currentUser.staffTypeId.type === "Doctor/Physician" ||
              currentUser.staffTypeId.type === "admin" ||
              currentUser.staffTypeId.type === "Doctor/Physician") ? (
              <Button
                onClick={addNewItem}
                style={styles.stylesForButton}
                variant="contained"
                color="primary"
              >
                <img src={add_new} style={styles.stylesForIcon} />
                &nbsp;&nbsp;
                <strong>Add New</strong>
              </Button>
            ) : (
              undefined
            )} */}
          </div>

          {props.history.location.state &&
          props.history.location.state.comingFrom &&
          props.history.location.state.comingFrom === "notifications" ? (
            undefined
          ) : (
            <div
              className={`row ${classesInput.root} ${classes1.root}`}
              style={{
                marginLeft: "0px",
                marginRight: "0px",
                marginTop: "20px",
              }}
            >
              <div
                className="col-md-10 col-sm-9 col-8"
                style={styles.textFieldPadding}
              >
                <TextField
                  className="textInputStyle"
                  id="searchPatientQuery"
                  type="text"
                  variant="filled"
                  label="Search By MRN / Order No"
                  name={"searchPatientQuery"}
                  value={searchPatientQuery}
                  onChange={handlePatientSearch}
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      focused: classes.focusedLabel,
                      error: classes.erroredLabel,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    className: classesInput.input,
                    classes: { input: classesInput.input },
                    disableUnderline: true,
                  }}
                />
              </div>

              <div
                className="col-md-1 col-sm-2 col-2"
                style={{
                  ...styles.textFieldPadding,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 5,
                    height: 55,
                  }}
                >
                  <img
                    src={BarCode}
                    onClick={scanQRCode}
                    style={{
                      width: matches ? 70 : 60,
                      height: matches ? 60 : 55,
                      cursor: "pointer",
                    }}
                  />{" "}
                </div>
              </div>

              <div
                className="col-md-1 col-sm-1 col-2"
                style={{
                  ...styles.textFieldPadding,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 5,
                    height: 55,
                  }}
                >
                  <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              flex: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {purchaseRequests && purchaseRequests.length > 0 ? (
              <div>
                <div>
                  <CustomTable
                    tableData={purchaseRequests}
                    action={
                      currentUser.staffTypeId.type === "Registered Nurse"
                        ? actionsForBUNurse
                        : currentUser.staffTypeId.type === "BU Doctor"
                        ? actionsForBUDoctor
                        : currentUser.staffTypeId.type === "Doctor/Physician"
                        ? actionsForBUMemeber
                        : actions
                    }
                    tableDataKeys={tableDataKeysForBUMember}
                    tableHeading={tableHeadingForBUMember}
                    // action={actionsForTesting}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    receiveItem={handleReceive}
                    handleView={handleView}
                    borderBottomColor={"#60d69f"}
                    borderBottomWidth={20}
                  />
                </div>

                <ConfirmationModal
                  modalVisible={modalVisible}
                  msg="Are you sure want to delete the record?"
                  hideconfirmationModal={() => setModalVisible(false)}
                  onConfirmDelete={() => deleteVendor()}
                  setdeleteItem={() => setdeleteItem("")}
                />

                <Notification msg={errorMsg} open={openNotification} />
              </div>
            ) : purchaseRequests && purchaseRequests.length == 0 ? (
              <div className="row " style={{ marginTop: "25px" }}>
                <div className="col-11">
                  <h3
                    style={{
                      color: "white",
                      textAlign: "center",
                      width: "100%",
                      position: "absolute",
                    }}
                  >
                    Opps...No Data Found
                  </h3>
                </div>
                <div className="col-1" style={{ marginTop: 45 }}>
                  <img
                    onClick={() => props.history.goBack()}
                    src={Back_Arrow}
                    style={{
                      maxWidth: "60%",
                      height: "auto",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="LoaderStyle">
                <Loader type="TailSpin" color="red" height={50} width={50} />
              </div>
            )}
          </div>
          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 45, height: 35, cursor: "pointer" }}
            />
          </div>

          <Dialog
            aria-labelledby="form-dialog-title"
            open={isOpen}
            // maxWidth="xl"
            // fullWidth={true}
            fullScreen
            onBackdropClick={() => {
              setIsOpen(false);
            }}
          >
            <AppBar
              style={{ position: "relative", backgroundColor: "#31e2aa" }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <DialogContent style={{ backgroundColor: "rgb(19 213 159)" }}>
              <DialogTitle
                id="simple-dialog-title"
                style={{ color: "white", marginLeft: "-6px" }}
              >
                Added Items
              </DialogTitle>
              <div className="container-fluid">
                <CustomTable
                  tableData={requestedItems}
                  tableHeading={
                    currentUser.staffTypeId.type === "Doctor/Physician"
                      ? tableHeadingForBUMemberForItems
                      : currentUser.staffTypeId.type === "Registered Nurse" ||
                        currentUser.staffTypeId.type === "BU Doctor"
                      ? tableHeadingForBUMemberForItems
                      : currentUser.staffTypeId.type === "Pharmacist"
                      ? tableHeadingForFUMemberForItems
                      : tableHeadingForFUMemberForItems
                  }
                  tableDataKeys={
                    currentUser.staffTypeId.type === "Doctor/Physician"
                      ? tableDataKeysForItemsForBUMember
                      : currentUser.staffTypeId.type === "Registered Nurse" ||
                        currentUser.staffTypeId.type === "BU Doctor"
                      ? tableDataKeysForItemsForBUMember
                      : currentUser.staffTypeId.type === "Pharmacist"
                      ? tableDataKeysForFUMemberForItems
                      : tableDataKeysForItemsForBUMember
                  }
                  action={
                    currentUser.staffTypeId.type === "Registered Nurse"
                      ? actionsForItemsForReceiver
                      : currentUser.staffTypeId.type === "BU Doctor"
                      ? actionsForItemsForOther
                      : currentUser.staffTypeId.type === "Pharmacist"
                      ? actionsForItemsForFUMember
                      : actionsForItemsForOther
                  }
                  handleEdit={handleEditRequestedItem}
                  handleDelete={handleDelete}
                  receiveItem={handleReceive}
                  handleView={handleEditRequestedItem}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#60d69f",
          overflowY: "scroll",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="LoaderStyle">
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      </div>
    );
  }
}
