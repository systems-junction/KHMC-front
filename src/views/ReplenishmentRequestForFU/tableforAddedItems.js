/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";
import ConfirmationModal from "../../components/Modal/confirmationModal";
import axios from "axios";

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

  stylesForTableHeadCell: {
    backgroundColor: "#2C6DDD",
    color: "white",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: "0.9rem",
  },
};
const useStyles = makeStyles(styles);

const tableHeadingForFUInventoryKeeper = [
  "Trade Name",
  "Item Code",
  "Requested Qty",
  "Functional Unit  Cost(JD)",
  "Actions",
];

const tableHeadingForWarehouseMember = [
  "Trade Name",
  "Item Code",
  "Requested Qty",
  "Functional Unit  Cost(JD)",
  "Status",
  "",
];

const tableHeadingForOthers = [
  "Trade Name",
  "Item Code",
  "Requested Qty",
  "Functional Unit  Cost(JD)",
  "",
];

const tableDataKeysForFUInvKeeper = [
  ["itemId", "name"],
  ["itemId", "itemCode"],
  "requestedQty",
  "fuItemCost",
];

const tableDataKeysForWHInvKeeper = [
  ["itemId", "name"],
  ["itemId", "itemCode"],
  "requestedQty",
  "fuItemCost",
  "secondStatus",
];

const actions = { edit: true, view: false, delete: true };

const actionsForItemsForReceiver = {
  // edit: true,
  receiveItems: true,
};
const actionsForItemsForOther = { edit: true };

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#efefef",
    },

    "&:nth-of-type(even)": {
      backgroundColor: "#FFFFFF",
    },
  },
}))(TableRow);

export default function DenseTable(props) {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [selectedItems, setSelectedItems] = useState("");

  function handleEdit(rec) {
    props.onEdit(rec);
  }

  function handleDelete(id) {
    props.onDelete(id);
  }

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < props.items.length; i++) {
      let obj = {
        ...props.items[i],
        //  vendorId: props.items[i].itemId.vendorId,
      };
      temp.push(obj);
    }

    setSelectedItems([...temp]);
  }, [props.items]);

  return (
    <>
      <CustomTable
        tableData={selectedItems}
        tableHeading={
          currentUser.staffTypeId.type === "Warehouse Inventory Keeper"
            ? tableHeadingForWarehouseMember
            : currentUser.staffTypeId.type === "FU Inventory Keeper"
            ? tableHeadingForFUInventoryKeeper
            : ""
        }
        tableDataKeys={
          currentUser.staffTypeId.type === "Warehouse Inventory Keeper"
            ? tableDataKeysForWHInvKeeper
            : currentUser.staffTypeId.type === "FU Inventory Keeper"
            ? tableDataKeysForFUInvKeeper
            : ""
        }
        action={
          currentUser.staffTypeId.type === "FU Inventory Keeper" ? actions : ""
        }
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        borderBottomColor={"#60d69f"}
        borderBottomWidth={20}
      />
    </>
  );
}

//  <Table aria-label="a dense table" size="small">
//       <TableHead>
//         <TableRow>
//           {currentUser.staffTypeId.type === "FU Inventory Keeper" &&
//             tableHeadingForFUMember.map((h, index) => {
//               return (
//                 <TableCell
//                   align="center"
//                   style={{
//                     ...styles.stylesForTableHeadCell,
//                     borderTopLeftRadius: index === 0 ? 5 : 0,
//                     borderTopRightRadius:
//                       index === tableHeadingForFUMember.length - 1 ? 5 : 0,
//                   }}
//                   key={index}
//                 >
//                   {h}
//                 </TableCell>
//               );
//             })}

//           {(currentUser.staffTypeId.type === "Warehouse Member" ||
//             currentUser.staffTypeId.type === "Warehouse Inventory Keeper") &&
//             tableHeadingForWarehouseMember.map((h, index) => {
//               return (
//                 <TableCell
//                   align="center"
//                   style={{
//                     ...styles.stylesForTableHeadCell,
//                     borderTopLeftRadius: index === 0 ? 5 : 0,
//                     borderTopRightRadius:
//                       index === tableHeadingForWarehouseMember.length - 1
//                         ? 5
//                         : 0,
//                   }}
//                   key={index}

//                 >
//                   {h}
//                 </TableCell>
//               );
//             })}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {props.items.map((row, index) => (
//           <StyledTableRow key={index} style={{}}>
//             <TableCell
//               align="center"
//               style={{
//                 // fontSize: "0.9rem",

//                 borderBottomLeftRadius:
//                   props.items.length - 1 === index ? 5 : 0,

//                 borderBottomColor:
//                   props.items.length - 1 === index ? "#60d69f" : undefined,
//                 borderWidth: props.items.length - 1 === index ? 0 : 1,
//               }}
//             >
//               {index + 1}
//             </TableCell>

//             <TableCell
//               align="center"
//               style={{
//                 fontSize: "0.9rem",
//               }}
//             >
//               {row.itemId.name}
//             </TableCell>

//             <TableCell
//               align="center"
//               style={
//                 {
//                   // fontSize: "0.9rem",
//                 }
//               }
//             >
//               {row.itemId.itemCode}
//             </TableCell>

//             <TableCell
//               align="center"
//               style={
//                 {
//                   // fontSize: "0.9rem",
//                 }
//               }
//             >
//               {row.requestedQty}
//             </TableCell>

//             <TableCell
//               align="center"
//               style={
//                 {
//                   // fontSize: "0.9rem",
//                 }
//               }
//             >
//               {row.fuItemCost.toFixed(4)} JD
//             </TableCell>

//             {currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
//               <TableCell
//                 align="center"
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-evenly",
//                   borderBottomColor:
//                     props.items.length - 1 === index ? "#60d69f" : undefined,

//                   borderBottomRightRadius:
//                     index === props.items.length - 1 ? 5 : 0,
//                   borderWidth: props.items.length - 1 === index ? 0 : 1,
//                 }}
//               >
//                 <i
//                   style={{
//                     color: "grey",
//                   }}
//                   onClick={() => handleDelete(row)}
//                   className=" ml-10 zmdi zmdi-delete zmdi-hc-2x"
//                 />{" "}
//                 <i
//                   onClick={() => handleEdit(row)}
//                   style={{ color: "grey" }}
//                   className="zmdi zmdi-edit zmdi-hc-2x"
//                 />
//               </TableCell>
//             ) : (
//               undefined
//             )}

//             {currentUser.staffTypeId.type === "Warehouse Member" ||
//             currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ? (
//               <TableCell
//                 align="center"
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-evenly",
//                   borderBottomColor:
//                     props.items.length - 1 === index ? "#60d69f" : undefined,
//                   borderBottomRightRadius:
//                     index === props.items.length - 1 ? 5 : 0,
//                   borderWidth: props.items.length - 1 === index ? 0 : 1,
//                 }}
//               >
//                 {/* {currentUser.staffTypeId.type === "Warehouse Member"
//                   ? row.secondStatus
//                   : row.status} */}
//                 <Button
//                   style={{ fontSize: 10 }}
//                   color="primary"
//                   variant="contained"
//                 >
//                   {row.secondStatus}
//                 </Button>
//               </TableCell>
//             ) : (
//               undefined
//             )}
//           </StyledTableRow>
//         ))}
//       </TableBody>
//     </Table>
