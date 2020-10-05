/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import cookie from "react-cookies";

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

const tableHeadingForFUMember = [
  "No.",
  "Batch Number",
  "Received Qty",
  "Returned Qty",
  "Actions",
];

const tableHeadingForWarehouseMember = [
  "No.",
  "Trade Name",
  "Item Code",
  "Requested Qty",
  "Functional Unit  Cost(JD)",
  "Status",
];

const tableHeadingForOthers = [
  "No.",
  "Trade Name",
  "Item Code",
  "Requested Qty",
  "Functional Unit  Cost(JD)",
];

const actions = { edit: true, view: false, delete: true };
const actionsForBUNurse = { receiveItem: true };
const actionsForBUDoctor = { view: true };

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
          {currentUser.staffTypeId.type === "FU Inventory Keeper" &&
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

          {(currentUser.staffTypeId.type === "Warehouse Member" ||
            currentUser.staffTypeId.type === "Warehouse Inventory Keeper") &&
            tableHeadingForWarehouseMember.map((h, index) => {
              return (
                <TableCell
                  align="center"
                  style={{
                    ...styles.stylesForTableHeadCell,
                    borderTopLeftRadius: index === 0 ? 5 : 0,
                    borderTopRightRadius:
                      index === tableHeadingForWarehouseMember.length - 1
                        ? 5
                        : 0,
                  }}
                >
                  {h}
                </TableCell>
              );
            })}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.returnBatchArray.map((row, index) => (
          <StyledTableRow key={row.name} style={{}}>
            <TableCell
              align="center"
              style={{
                // fontSize: "0.9rem",

                borderBottomLeftRadius:
                  props.returnBatchArray.length - 1 === index ? 5 : 0,

                borderBottomColor:
                  props.returnBatchArray.length - 1 === index ? "#60d69f" : undefined,
                borderWidth: props.returnBatchArray.length - 1 === index ? 0 : 1,
              }}
            >
              {index + 1}
            </TableCell>

            <TableCell
              align="center"
              style={
                {
                  // fontSize: "0.9rem",
                }
              }
            >
              {row.batchNumber}
            </TableCell>

            <TableCell
              align="center"
              style={
                {
                  // fontSize: "0.9rem",
                }
              }
            >
              {row.receivedQtyPerBatch}
            </TableCell>

            <TableCell
              align="center"
              style={
                {
                  // fontSize: "0.9rem",
                }
              }
            >
              {row.returnedQtyPerBatch}
            </TableCell>

            {currentUser.staffTypeId.type === "FU Inventory Keeper" ? (
              <TableCell
                align="center"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  borderBottomColor:
                    props.returnBatchArray.length - 1 === index ? "#60d69f" : undefined,

                  borderBottomRightRadius:
                    index === props.returnBatchArray.length - 1 ? 5 : 0,
                  borderWidth: props.returnBatchArray.length - 1 === index ? 0 : 1,
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

            {currentUser.staffTypeId.type === "Warehouse Member" ||
            currentUser.staffTypeId.type === "Warehouse Inventory Keeper" ? (
              <TableCell
                align="center"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  borderBottomColor:
                    props.returnBatchArray.length - 1 === index ? "#60d69f" : undefined,
                  borderBottomRightRadius:
                    index === props.returnBatchArray.length - 1 ? 5 : 0,
                  borderWidth: props.returnBatchArray.length - 1 === index ? 0 : 1,
                }}
              >
                {/* {currentUser.staffTypeId.type === "Warehouse Member"
                  ? row.secondStatus
                  : row.status} */}
                <Button
                  style={{ fontSize: 10 }}
                  color="primary"
                  variant="contained"
                >
                  {row.secondStatus}
                </Button>
              </TableCell>
            ) : (
              undefined
            )}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}
