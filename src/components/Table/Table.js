/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";
import TablePagination from "@material-ui/core/TablePagination";
import RcIf from "rc-if";
import { dateOptions } from "../../variables/public";

import Active from "../../assets/img/Active.png";
import In_Active from "../../assets/img/Inactive.png";

import EditIcon from "../../assets/img/Edit.png";
import cookie from "react-cookies";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const { tableHeading, tableData, tableDataKeys, tableHeaderColor } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selectedRow, setSelectedRow] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    props.tableData.reverse();
  }, []);

  const replaceSlugToTitle = (val) => {
    if (val === "in_active") {
      return <img src={In_Active} style={{ width: "45%", height: "auto" }} />;
    } else if (val === "active") {
      return (
        <img
          src={Active}
          style={{ maxWidth: "60%", height: "auto", alignSelf: "center" }}
        />
      );
    }
    if (
      val === "pending" ||
      val === "to_do" ||
      val === "po_created" ||
      val === "Can be fulfilled"
    ) {
      if (currentUser && currentUser.staffTypeId.type === "Committe Member") {
        return (
          <h6 style={{ fontWeight: "700", color: "#2C73D2" }}>
            {val === "to_do"
              ? "To Do"
              : val === "pending"
              ? "Pending"
              : "po_created"
              ? "PO Created"
              : ""}
          </h6>
        );
      } else {
        return (
          <h6 style={{ fontWeight: "700", color: "#2C73D2" }}>
            {val === "to_do"
              ? "To Do"
              : val === "pending"
              ? "Pending"
              : val === "po_created"
              ? "PO Created"
              : val === "Can be fulfilled"
              ? "Can be fulfilled"
              : ""}
          </h6>
        );
      }
    } else if (
      val === "in_progress" ||
      val === "po_sent" ||
      val === "items_in_transit" ||
      val === "pending_approval_from_accounts" ||
      val === "Delivery in Progress" ||
      val === "FulFillment Initiated"
    ) {
      return (
        <h6 style={{ fontWeight: "700", color: "#FF6F91" }}>
          {val === "in_progress"
            ? "In Progress"
            : val === "items_in_transit"
            ? "Items in Transit"
            : val === "pending_approval_from_accounts"
            ? "Pending Approval From Accounts"
            : val === "Delivery in Progress"
            ? "Delivery in Progress" 
            : val === "FulFillment Initiated"
            ? "FulFillment Initiated" 
            : "Po Sent"
            }
        </h6>
      );
    } else if (
      val === "complete" ||
      val === "approved" ||
      val === "approve" ||
      val === "reject" ||
      val === "Received"
    ) {
      return (
        <h6 style={{ color: "white", fontWeight: "700", color: "#845EC2" }}>
          {val === "complete"
            ? "Complete"
            : val === "approved"
            ? "Approved"
            : val === "reject"
            ? "Reject"
            : val === "Received"
            ? "Received"
            : "Approve"}
        </h6>
      );
    }

    return val;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return (
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " " +
      d.toLocaleTimeString()
    );
  };

  const handleClick = (prop, val) => {
    if (props.handleModelMaterialReceiving) {
      props.handleModelMaterialReceiving(prop, val);
    }
  };

  function setRow(prop) {
    if (prop._id === selectedRow._id) {
      setSelectedRow("");
    } else {
      setSelectedRow(prop);
    }
  }

  // console.log(tableDataKeys.length)

  return (
    <div className={classes.tableResponsive}>
      <Table>
        {tableHeading !== undefined ? (
          <TableHead
            className={classes[tableHeaderColor + "TableHeader"]}
            style={{
              backgroundColor: "#2873cf",
            }}
          >
            <TableRow className={classes.tableHeadRow}>
              {tableHeading.map((prop, index) => {
                return (
                  <>
                    <TableCell
                      className={classes.tableHeadCell}
                      style={{
                        color: "white",
                        fontWeight: "700",
                        paddingTop: 30,
                        paddingBottom: 30,
                        textAlign: "center",
                        borderTopLeftRadius: index === 0 ? 45 : 0,
                        borderTopRightRadius:
                          index === tableHeading.length - 1 ? 45 : 0,
                      }}
                      key={prop}
                    >
                      {prop}
                    </TableCell>
                  </>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}

        <div style={{ height: 25, width: "100%" }}></div>

        <TableBody style={{ marginTop: 20 }}>
          {tableData &&
            tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((prop, index) => {
                return (
                  <>
                    <TableRow
                      key={index}
                      className={classes.tableBodyRow}
                      style={{
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                      // onClick={() => {
                      //   setRow(prop);
                      // }}
                    >
                      {tableDataKeys
                        ? tableDataKeys.map((val, key) => {
                            // console.log(key);
                            if (val === "date") {
                              return (
                                <TableCell
                                  className={classes.tableCell}
                                  key={key}
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {formatDate(prop[val])}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell
                                  className={classes.tableCell}
                                  key={key}
                                  onClick={() => handleClick(prop, val)}
                                  style={{
                                    textAlign: "center",
                                    cursor: props.handleModelMaterialReceiving
                                      ? "pointer"
                                      : "",
                                    borderTopLeftRadius: key === 0 ? 15 : 0,
                                    borderBottomLeftRadius: key === 0 ? 15 : 0,

                                    borderWidth: 0,
                                  }}
                                >
                                  {Array.isArray(val)
                                    ? prop[val[0]]
                                      ? prop[val[0]][val[1]]
                                      : null
                                    : val.toLowerCase() === "timestamp"
                                    ? new Intl.DateTimeFormat(
                                        "en-US",
                                        dateOptions
                                      ).format(Date.parse(prop[val]))
                                    : // : `${replaceSlugToTitle(prop[val])}`}
                                      replaceSlugToTitle(prop[val])}
                                </TableCell>
                              );
                            }
                          })
                        : null}
                      <TableCell
                        style={{
                          cursor: "pointer",
                          borderTopRightRadius: 15,
                          borderBottomRightRadius: 15,
                          borderWidth: 0,
                        }}
                        className={classes.tableCell}
                        colSpan="2"
                      >
                        {props.action ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <RcIf if={props.action.edit}>
                              <span onClick={() => props.handleEdit(prop)}>
                                <i
                                  style={{ color: "blue" }}
                                  className="zmdi zmdi-edit zmdi-hc-2x"
                                />
                              </span>
                            </RcIf>
                            <RcIf if={props.action.delete}>
                              <span
                                onClick={() => props.handleDelete(prop._id)}
                              >
                                <i
                                  style={{ color: "red" }}
                                  className=" ml-10 zmdi zmdi-delete zmdi-hc-2x"
                                />
                              </span>
                            </RcIf>

                            <RcIf if={props.action.add}>
                              <span onClick={() => props.handleAdd(prop)}>
                                <i
                                  style={{ color: "blue" }}
                                  className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-2x"
                                />
                              </span>
                            </RcIf>

                            <RcIf if={props.action.view}>
                              <span onClick={() => props.handleView(prop)}>
                                <i
                                  style={{ color: "blue" }}
                                  className=" ml-10 zmdi zmdi-eye zmdi-hc-2x"
                                />
                              </span>
                            </RcIf>

                            <RcIf if={props.action.receiveItem}>
                              <span
                                style={{
                                  backgroundColor: "blue",
                                  color: "white",
                                  paddingLeft: 10,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  paddingRight: 10,
                                  borderRadius: 20,
                                }}
                                onClick={() => props.receiveItem(prop)}
                              >
                                Receive Item
                              </span>
                            </RcIf>

                            <RcIf
                              if={
                                props.action.active &&
                                prop.status === "in_active"
                              }
                            >
                              <span
                                onClick={() => props.handleStatus(prop._id)}
                                title="Active"
                              >
                                <i className=" ml-10 zmdi zmdi-check zmdi-hc-2x" />
                              </span>
                            </RcIf>
                          </div>
                        ) : null}
                      </TableCell>

                      {/* {selectedRow && selectedRow._id === prop._id ? (
                        <TableCell
                          // className={classes.tableCell}
                          style={{
                            // display: "flex",
                            // justifyContent: "center",
                            // backgroundColor: props.borderBottomColor,
                            backgroundColor: "red",
                            textAlign: "center",
                          }}
                        >
                          <span>
                            <img
                            src={EditIcon}
                            style={{ width: 50, height: 50 }}
                          />
                          </span>
                        </TableCell>
                      ) : (
                        undefined
                      )} */}
                    </TableRow>

                    <TableRow style={{ height: 20 }} />
                  </>
                );
              })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={props.tableData && props.tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  // tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
