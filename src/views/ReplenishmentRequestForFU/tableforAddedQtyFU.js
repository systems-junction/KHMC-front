/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components

import { makeStyles, withStyles } from "@material-ui/core/styles";
import cookie from "react-cookies";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CustomTable from "../../components/Table/Table";

// const useStyles = makeStyles(styles);

const tableHeadingForFUMember = [
  "Batch Number",
  "Received Qty Per Batch",
  "Expiry Date",
  "Price Per Unit(JD)",
];

const tableDataKeysForFUMember = [
  "batchNumber",
  "quantity",
  "expiryDate",
  "price",
];

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
  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  const formatDate = (date) => {
    const d = new Date(date);

    let minutes = "";

    if (d.getHours().toString().length === 1) {
      minutes = "0" + d.getHours();
    } else {
      minutes = d.getHours();
    }

    return (
      d
        .getDate()
        .toString()
        .padStart(2, "0") +
      " - " +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      " - " +
      d.getFullYear()
    );
  };

  return (
    <>
      <CustomTable
        tableData={props.returnBatchArray}
        tableDataKeys={tableDataKeysForFUMember}
        tableHeading={tableHeadingForFUMember}
        action={""}
        borderBottomColor={"#60d69f"}
        borderBottomWidth={20}
      />
    </>
  );
}

// <Table aria-label="a dense table" size="small">
//   <TableHead>
//     <TableRow>
//       {tableHeadingForFUMember.map((h, index) => {
//         return (
//           <TableCell
//             align="center"
//             style={{
//               ...styles.stylesForTableHeadCell,
//               borderTopLeftRadius: index === 0 ? 5 : 0,
//               borderTopRightRadius:
//                 index === tableHeadingForFUMember.length - 1 ? 5 : 0,
//             }}
//           >
//             {h}
//           </TableCell>
//         );
//       })}
//     </TableRow>
//   </TableHead>
//   <TableBody>
//     {props.returnBatchArray.map((row, index) => (
//       <StyledTableRow key={index} style={{}}>
//         <TableCell
//           align="center"
//           style={{
//             // fontSize: "0.9rem",
//             borderBottomLeftRadius:
//               props.returnBatchArray.length - 1 === index ? 5 : 0,

//             borderBottomColor:
//               props.returnBatchArray.length - 1 === index
//                 ? "#60d69f"
//                 : undefined,
//             borderWidth:
//               props.returnBatchArray.length - 1 === index ? 0 : 1,
//           }}
//         >
//           {index + 1}
//         </TableCell>

//         <TableCell align="center">{row.batchNumber}</TableCell>
//         <TableCell align="center">{row.quantity}</TableCell>
//         <TableCell align="center">{formatDate(row.expiryDate)}</TableCell>
//         <TableCell align="center">
//           {parseFloat(row.price).toFixed(4)} JD
//         </TableCell>
//       </StyledTableRow>
//     ))}
//   </TableBody>
// </Table>
