/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import cookie from "react-cookies";

import CustomTable from "../../components/Table/Table";

const tableHeadingForFUMember = [
  // "No.",
  "Batch Number",
  "Received Qty Per Batch",
  // "Expiry Date",
  "Price Per Unit(JD)",
  "Status",
  "Actions",
];

const tableHeadingForWarehouseMember = [
  "No.",
  "Batch Number",
  "Received Qty",
  "Returned Qty",
];

const actions = { edit: true, view: false, delete: true };
const actionsForBUNurse = { receiveItem: true };
const actionsForBUDoctor = { view: true };

const actionsForItemsForReceiver = {
  // edit: true,
  receiveItems: true,
};
const actionsForItemsForOther = { edit: true };

const tableDataKeysForBUMember = [
  "batchNumber",
  "quantity",
  // "expiryDate",
  "price",
  "batchStatus",
];

export default function DenseTable(props) {
  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));
  const [selectedBatches, setSelectedBatches] = useState("");

  function handleEdit(rec) {
    props.onEdit(rec);
  }

  function handleDelete(id) {
    props.onDelete(id);
  }

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

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < props.returnBatchArray.length; i++) {
      let obj = {
        ...props.returnBatchArray[i],
        expiryDate: formatDate(props.returnBatchArray[i].expiryDate),
      };
      temp.push(obj);
    }

    setSelectedBatches([...temp]);
  }, [props.returnBatchArray]);

  return (
    <>
      <CustomTable
        tableData={props.returnBatchArray}
        tableDataKeys={tableDataKeysForBUMember}
        tableHeading={
          currentUser.staffTypeId.type === "Warehouse Inventory Keeper" &&
          props.comingFor !== "view"
            ? tableHeadingForFUMember
            : ""
        }
        action={actions}
        borderBottomColor={"#60d69f"}
        borderBottomWidth={20}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}

{
  /* <Table aria-label="a dense table" size="small">
        <TableHead>
          <TableRow>
            {currentUser.staffTypeId.type === "Warehouse Inventory Keeper" &&
              props.comingFor !== "view" &&
              tableHeadingForFUMember.map((h, index) => {
                return (
                  <TableCell
                    align="center"
                    style={{
                      ...styles.stylesForTableHeadCell,
                      borderTopLeftRadius: index === 0 ? 5 : 0,
                      borderTopRightRadius:
                        index === tableHeadingForFUMember.length - 1 ? 5 : 0,
                    }}
                  >
                    {h}
                  </TableCell>
                );
              })}

                {
   ((currentUser.staffTypeId.type ===
     "FU Internal Request Return Approval Member" &&
     props.comingFor !== "view") ||
     ((currentUser.staffTypeId.type === "FU Inventory Keeper" ||
       currentUser.staffTypeId.type ===
         "FU Internal Request Return Approval Member") &&
       props.comingFor === "view")) &&
     tableHeadingForWarehouseMember.map((h, index) => {
       return (
         <TableCell
           align="center"
           style={{
             ...styles.stylesForTableHeadCell,
             borderTopLeftRadius: index === 0 ? 5 : 0,
             borderTopRightRadius:
               index === tableHeadingForWarehouseMember.length - 1 ? 5 : 0,
           }}
         >
           {h}
         </TableCell>
       );
     });
 }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.returnBatchArray.map((row, index) => (
            <StyledTableRow key={index} style={{}}>
               <TableCell
                align="center"
                style={{
                  // fontSize: "0.9rem",
                  borderBottomLeftRadius:
                    props.returnBatchArray.length - 1 === index ? 5 : 0,

                  borderBottomColor:
                    props.returnBatchArray.length - 1 === index
                      ? "#60d69f"
                      : undefined,
                  borderWidth:
                    props.returnBatchArray.length - 1 === index ? 0 : 1,
                }}
              >
                {index + 1}
              </TableCell> 

              <TableCell align="center">{row.batchNumber}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{formatDate(row.expiryDate)}</TableCell>
              <TableCell align="center">
                {parseFloat(row.price).toFixed(4)} JD
              </TableCell>
              <TableCell align="center">
                {row.batchStatus.toUpperCase()}
              </TableCell>

              {currentUser.staffTypeId.type === "Warehouse Inventory Keeper" &&
              props.comingFor !== "view" ? (
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    borderBottomColor:
                      props.returnBatchArray.length - 1 === index
                        ? "#60d69f"
                        : undefined,

                    borderBottomRightRadius:
                      index === props.returnBatchArray.length - 1 ? 5 : 0,
                    borderWidth:
                      props.returnBatchArray.length - 1 === index ? 0 : 1,
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
              ) : (
                undefined
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table> */
}
