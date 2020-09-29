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
import business_Unit from "../../assets/img/business_Unit.png";

import cookie from "react-cookies";

import Search from "../../assets/img/Search.png";

import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import add_new from "../../assets/img/Plus.png";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
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
};
const useStyles = makeStyles(styles);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#ededed",
    },

    "&:nth-of-type(even)": {
      backgroundColor: "#FFFFFF",
    },
  },
}))(TableRow);

const tableHeadingForBUMember = [
  "No.",
  "Trade Name",
  "Item Code",
  "Requested Qty",
  "Actions",
];
const tableDataKeysForBUMember = [
  ["itemId", "name"],
  ["itemId", "itemCode"],
  "requestedQty",
  "price",
];

const tableHeadingForDoctorAndNursing = [
  "Request No",
  "Patient Ref No",
  "Functional Unit",
  "Actions",
];
const tableDataKeysForDoctorAndNursing = [
  "requestNo",
  "patientReferenceNo",
  ["itemId", "name"],
];

const tableHeadingForFUMember = [
  "Request No",
  "Patient Ref No",
  "Generated By",
  "Date/Time Generated",
  "Actions",
];
const tableDataKeysForFUMember = [
  "requestNo",
  "patientReferenceNo",
  "generatedBy",
  "dateGenerated",
];

const tableDataKeysForItemsForBUMember = [
  ["itemId", "name"],
  ["itemId", "cls"],
  "requestedQty",
  "status",
];

const tableDataKeysForFUMemberForItems = [
  ["itemId", "name"],
  ["itemId", "cls"],
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

const actions = { edit: true, view: false, delete: true };
const actionsForBUNurse = { receiveItem: true };
const actionsForBUDoctor = { view: true };

const actionsForItemsForReceiver = {
  // edit: true,
  receiveItems: true,
};
const actionsForItemsForOther = { edit: true };

// export default function ReplenishmentRequest(props) {
//   const classes = useStyles();

//   const [purchaseRequests, setPurchaseRequest] = useState("");
//   const [vendors, setVendor] = useState("");
//   const [statues, setStatus] = useState("");
//   const [items, setItems] = useState("");
//   const [deleteItem, setdeleteItem] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [openNotification, setOpenNotification] = useState(false);

//   const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
//   const [buObj, setBUObj] = useState("");
//   const [receiveRequests, setReceiveRequests] = useState("");

//   const [requestedItems, setRequestedItems] = useState("");

//   const [isOpen, setIsOpen] = useState(false);

//   if (openNotification) {
//     setTimeout(() => {
//       setOpenNotification(false);
//       setErrorMsg("");
//     }, 2000);
//   }

//   function getPurchaseRequests() {
//     axios
//       .get(getRepRequestUrlBUForPharmaceutical)
//       .then((res) => {
//         if (res.data.success) {
//           console.log(res.data.data);

//           if (currentUser.staffTypeId.type === "BU Member") {
//             let repRequest = res.data.data;
//             let temp = [];
//             for (let i = 0; i < repRequest.length; i++) {
//               if (repRequest[i].buId.buHead === currentUser.staffId) {
//                 temp.push(repRequest[i]);
//               }
//             }
//             console.log("rep array after filter", temp);
//             setPurchaseRequest(temp.reverse());
//           } else {
//             if (currentUser.staffTypeId.type === "FU Member") {
//               let repRequest = res.data.data;
//               let temp = [];
//               for (let i = 0; i < repRequest.length; i++) {
//                 // if (
//                 //   repRequest[i].status === "pending" ||
//                 //   repRequest[i].status === "in_progress"
//                 //    || repRequest[i].status === "Received"
//                 // )
//                 {
//                   temp.push(repRequest[i]);
//                 }
//               }
//               // console.log("rep array after filter", temp);
//               setPurchaseRequest(temp.reverse());
//             } else if (currentUser.staffTypeId.type === "FU Incharge") {
//               let repRequest = res.data.data;
//               let temp = [];
//               for (let i = 0; i < repRequest.length; i++) {
//                 // if (
//                 //   repRequest[i].status === "Delivery in Progress" ||
//                 //   repRequest[i].status === "in_progress"
//                 // )

//                 {
//                   temp.push(repRequest[i]);
//                 }
//               }
//               // console.log("rep array after filter", temp);
//               setPurchaseRequest(temp.reverse());
//             } else if (currentUser.staffTypeId.type === "BU Nurse") {
//               let repRequest = res.data.data;
//               let temp = [];
//               for (let i = 0; i < repRequest.length; i++) {
//                 if (
//                   repRequest[i].status === "Delivery in Progress" ||
//                   repRequest[i].status === "pending_administration" ||
//                   repRequest[i].status === "complete"
//                 ) {
//                   temp.push(repRequest[i]);
//                 }
//               }
//               // console.log("rep array after filter", temp);
//               setPurchaseRequest(temp.reverse());
//             } else if (currentUser.staffTypeId.type === "BU Inventory Keeper") {
//               let repRequest = res.data.data;
//               let temp = [];
//               for (let i = 0; i < repRequest.length; i++) {
//                 // if (
//                 //   repRequest[i].status === "complete" ||
//                 //   repRequest[i].status === "pending_administration"
//                 // )
//                 {
//                   temp.push(repRequest[i]);
//                 }
//               }
//               // console.log("rep array after filter", temp);
//               setPurchaseRequest(temp.reverse());
//             } else {
//               setPurchaseRequest(res.data.data.reverse());
//             }
//           }
//           //   setVendor(res.data.data.vendor);
//           //   setStatus(res.data.data.status);
//           //   setItems(res.data.data.items);
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

//   function getBUFromHeadId() {
//     axios
//       .get(getBusinessUnitUrlWithHead + "/" + currentUser.staffId)
//       .then((res) => {
//         if (res.data.success) {
//           console.log("BU Obj", res.data.data[0]);
//           setBUObj(res.data.data[0]);
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

//   function getReceiveRequestsForBU() {
//     axios
//       .get(getReceiveRequestBUUrl)
//       .then((res) => {
//         if (res.data.success) {
//           console.log("receive requests", res.data.data.receiveItems);
//           setReceiveRequests(res.data.data.receiveItems);
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

//   useEffect(() => {
//     getPurchaseRequests();
//     getReceiveRequestsForBU();

//     if (currentUser.staffTypeId.type === "BU Member") {
//       getBUFromHeadId();
//     }
//   }, []);

//   const addNewItem = () => {
//     let path = `replenishment/add`;
//     props.history.push({
//       pathname: path,
//       state: { comingFor: "add", vendors, statues, items, buObj },
//     });
//   };

//   function handleEdit(rec) {
//     props.onEdit(rec);
//   }

//   function handleDelete(id) {
//     props.onDelete(id);
//   }

//   function deleteVendor() {
//     const params = {
//       _id: deleteItem,
//     };

//     axios
//       .delete(deleteReceiveItemsUrl + "/" + params._id)
//       .then((res) => {
//         if (res.data.success) {
//           setdeleteItem("");
//           setModalVisible(false);
//           window.location.reload(false);
//         } else if (!res.data.success) {
//           setErrorMsg(res.data.error);
//           setOpenNotification(true);
//         }
//         return res;
//       })
//       .catch((e) => {
//         console.log("error while deletion ", e);
//       });
//   }

//   const handleView = (obj) => {
//     let path = `replenishment/edit`;
//     // props.history.push({
//     //   pathname: path,
//     //   state: {
//     //     comingFor: "view",
//     //     selectedItem: obj,
//     //     vendors,
//     //     statues,
//     //     items,
//     //     buObj,
//     //   },
//     // });
//     setIsOpen(true);
//     setRequestedItems(obj.item);
//   };

//   function handleReceive(rec) {
//     console.log("rec", rec);

//     let found = false;
//     for (let i = 0; i < receiveRequests.length; i++) {
//       if (receiveRequests[i].replenishmentRequestId === rec._id) {
//         console.log("found");
//         found = true;
//         break;
//       }
//     }
//     if (found) {
//       setOpenNotification(true);
//       setErrorMsg("Item has already been received");
//     } else {
//       let path = `replenishment/receive`;
//       props.history.push({
//         pathname: path,
//         state: {
//           comingFor: "add",
//           selectedItem: rec,
//           // vendors,
//           // statues,
//           // purchaseOrders,
//           // materialReceivingId: props.materialReceivingId,
//         },
//       });
//     }
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         // overflowY: "scroll",
//       }}
//     >
//       <div>
//         <CustomTable
//           tableData={props.items}
//           tableDataKeys={
//             currentUser.staffTypeId.type === "BU Member"
//               ? tableDataKeysForBUMember
//               : currentUser.staffTypeId.type === "BU Nurse" ||
//                 currentUser.staffTypeId.type === "BU Doctor"
//               ? tableDataKeysForDoctorAndNursing
//               : currentUser.staffTypeId.type === "FU Member"
//               ? tableDataKeysForFUMember
//               : tableDataKeysForBUMember
//           }
//           tableHeading={
//             currentUser.staffTypeId.type === "BU Member"
//               ? tableHeadingForBUMember
//               : currentUser.staffTypeId.type === "BU Nurse" ||
//                 currentUser.staffTypeId.type === "BU Doctor"
//               ? tableHeadingForDoctorAndNursing
//               : currentUser.staffTypeId.type === "FU Member"
//               ? tableHeadingForFUMember
//               : tableHeadingForBUMember
//           }
//           action={
//             currentUser.staffTypeId.type === "BU Nurse"
//               ? actionsForBUNurse
//               : currentUser.staffTypeId.type === "BU Doctor"
//               ? actionsForBUDoctor
//               : actions
//           }
//           handleEdit={handleEdit}
//           handleDelete={handleDelete}
//           //   receiveItem={handleReceive}
//           //   handleView={handleView}
//           borderBottomColor={"#60d69f"}
//           borderBottomWidth={20}
//         />
//       </div>
//     </div>
//   );
// }

export default function DenseTable(props) {
  const classes = useStyles();

  function handleEdit(rec) {
    props.onEdit(rec);
  }

  function handleDelete(id) {
    props.onDelete(id);
  }

  return (
    <Table aria-label="a dense table" size="small">
      <TableHead>
        <TableRow>
          {tableHeadingForBUMember.map((h, index) => {
            return (
              <TableCell
                align="center"
                style={{
                  backgroundColor: "#2C6DDD",
                  color: "white",
                  paddingTop: 15,
                  paddingBottom: 15,
                  fontSize: "0.9rem",
                  borderTopLeftRadius: index === 0 ? 5 : 0,
                  borderTopRightRadius:
                    index === tableHeadingForBUMember.length - 1 ? 5 : 0,
                }}
              >
                {h}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.items.map((row, index) => (
          <StyledTableRow key={row.name} style={{}}>
            <TableCell
              align="center"
              style={{
                // fontSize: "0.9rem",

                borderBottomLeftRadius:
                  props.items.length - 1 === index ? 5 : 0,

                borderBottomColor:
                  props.items.length - 1 === index ? "#60d69f" : undefined,
                borderWidth: props.items.length - 1 === index ? 0 : 1,
              }}
            >
              {index + 1}
            </TableCell>

            <TableCell
              align="center"
              style={{
                fontSize: "0.9rem",
              }}
            >
              {row.itemId.tradeName}
            </TableCell>
            <TableCell
              align="center"
              style={
                {
                  // fontSize: "0.9rem",
                }
              }
            >
              {row.itemId.itemCode}
            </TableCell>
            <TableCell
              align="center"
              style={
                {
                  // fontSize: "0.9rem",
                }
              }
            >
              {row.requestedQty}
            </TableCell>

            <TableCell
              align="center"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                // fontSize: "0.9rem",
                borderBottomColor:
                  props.items.length - 1 === index ? "#60d69f" : undefined,

                borderBottomRightRadius:
                  index === props.items.length - 1 ? 5 : 0,
                borderWidth: props.items.length - 1 === index ? 0 : 1,
              }}
            >
              <i
                style={{
                  color: "grey",
                }}
                onClick={() => handleDelete(row)}
                className=" ml-10 zmdi zmdi-delete zmdi-hc-2x"
              />{" "}
              <i
                onClick={() => handleEdit(row)}
                style={{ color: "grey" }}
                className="zmdi zmdi-edit zmdi-hc-2x"
              />
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
