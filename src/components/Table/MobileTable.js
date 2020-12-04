import React, { useEffect } from "react";
// import PropTypes from "props-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";
import TablePagination from "@material-ui/core/TablePagination";
import RcIf from "rc-if";
import { dateOptions } from "../../variables/public";
import Active from "../../assets/img/Active.png";
import In_Active from "../../assets/img/Inactive.png";
import ReturnItem from "../../assets/img/Return Item Grey.png";
import ReceiveItem from "../../assets/img/Receive Item Grey.png";
// import EditIcon from "../../assets/img/Edit.png";
import cookie from "react-cookies";
import Tooltip from "@material-ui/core/Tooltip";
import capitilizeLetter from "../../public/capitilizeLetter";
import formatDate from "../../utils/formatDate";
import mapDateToKeys from "../../utils/mapDateToKeys";
import Chip from "@material-ui/core/Chip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PrintIcon from "@material-ui/icons/Print";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(styles);

const stylesB = {
  stylesForActive: {
    verticalAlign: "center",
    fontSize: 5,
    color: "white",
    cursor: "pointer",
    borderRadius: 2,
    background: "#2c6ddd",
    // width: "50px",
    // height: "20px",
    // outline: "none",
    // boxShadow: "none",
    // paddingBottom:"0.5rem",
    // display:'flex',
    // alignItems:'flex-start',
  },
  stylesForInActive: {
    verticalAlign: "center",
    fontSize: 5,
    color: "white",
    cursor: "pointer",
    borderRadius: 2,
    background: "#845DC2",
    // width: "50px",
    // height: "20px",
    // paddingBottom:"0.5rem",
    // outline: "none",
    // boxShadow: "none",
  },
  stylesForReceived: {
    verticalAlign: "center",
    fontSize: 5,
    color: "white",
    cursor: "pointer",
    borderRadius: 2,
    background: "#845DC2",
    // width: "50px",
    // height: "20px",
    // paddingBottom:"0.5rem",

    // boxShadow: "none",
    // outline: "none",
  },

  stylesForIcon: {
    fontSize: 20,
    backgroundColor: "#F1F1F1",
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    padding: 3,
    marginLeft: 2,
    marginRight: 2,
  },

  styleForData: {
    fontSize: 9,
    fontWeight: "bold",
  },

  styleForDataHeading: {
    color: "grey",
    fontSize: 8,
  },
};

export default function ControlledAccordions(props) {
  let i = 0;

  const {
    // tableHeading,
    tableData,
    // tableDataKeys,
    tableHeaderColor,
    action,
  } = props;

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = React.useState("");
  const [hovered, setHovered] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );

  const [tableHeading, setTableHeading] = React.useState([]);
  const [tableDataKeys, setTableKeys] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    // props.tableData
    let tempHeading = [...props.tableHeading];
    let tempKeys = [...props.tableDataKeys];
    if (tempHeading.includes("Status")) {
      console.log(tempHeading);

      let temp = tempHeading[1];
      tempHeading[1] = "Status";
      tempHeading[tempHeading.length - 2] = temp;

      let tempK = tempKeys[1];
      tempKeys[1] = tempKeys[tempKeys.length - 1];
      tempKeys[tempKeys.length - 1] = tempK;
    }

    setTableHeading([...tempHeading]);
    setTableKeys([...tempKeys]);
  }, [props.tableData]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const replaceSlugToTitle = (val, key, heading, indexValue) => {
    if (key === "heartRate") {
      if (val < 60 || val > 100) {
        return <Chip label={val} />;
      }
    }
    if (key === "bloodPressureSys") {
      if (val > 120 || val < 90) {
        return <Chip label={val} />;
      }
    }
    if (key === "bloodPressureDia") {
      if (val < 60 || val > 80) {
        return <Chip label={val} />;
      }
    }
    if (key === "respiratoryRate") {
      if (val < 12 || val > 25) {
        return <Chip label={val} />;
      }
    }
    if (key === "temperature") {
      if (val < 97 || val > 99) {
        return <Chip label={val} />;
      }
    }
    if (key === "FSBS") {
      if (val < 80 || val > 130) {
        return <Chip label={val} />;
      }
    }
    if (key === "painScale") {
      if (val >= 8) {
        return <Chip label={val} />;
      }
    }
    if (key === "pulseOX") {
      if (val < 80 || val > 100) {
        return <Chip label={val} />;
      }
    }

    if (val === "in_active") {
      return (
        <Button
          style={stylesB.stylesForInActive}
          variant="contained"
          color="primary"
        >
          <strong>In active</strong>
        </Button>
      );
    } else if (val === "active") {
      return (
        <Button
          style={stylesB.stylesForActive}
          variant="contained"
          color="primary"
        >
          <strong>Active</strong>
        </Button>
      );
    }
    if (
      val === "pending" ||
      val === "to_do" ||
      val === "po_created" ||
      val === "Can be fulfilled" ||
      val === "hold"
    ) {
      // if (currentUser && currentUser.staffTypeId.type === 'Committe Member') {
      if (currentUser) {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                // onClick={() => props.handleView(props)}
                style={{
                  ...stylesB.stylesForActive,
                  backgroundColor: "#e877a1",
                }}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : val === "po_created" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>PO Created</strong>
              </Button>
            ) : val === "hold" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Hold</strong>
              </Button>
            ) : val === "Can be fulfilled" ? (
              <Button
                style={{
                  ...stylesB.stylesForActive,
                  backgroundColor: "#845dc2",
                }}
                variant="contained"
                color="primary"
              >
                <strong>Can be fulfilled</strong>
              </Button>
            ) : (
              ""
            )}
          </>
        );
      } else {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                style={{
                  ...stylesB.stylesForActive,
                  backgroundColor: "#e877a1",
                }}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : val === "po_created" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>PO Created</strong>
              </Button>
            ) : val === "Can be fulfilled" ? (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Can be fulfilled</strong>
              </Button>
            ) : (
              ""
            )}
          </>
        );
      }
    } else if (
      val === "in_progress" ||
      val === "po_sent" ||
      val === "items_in_transit" ||
      val === "pending_approval_from_accounts" ||
      val === "pending_approval" ||
      val === "Delivery in Progress" ||
      val === "Fulfillment Initiated" ||
      val === "Partial Fulfillment Initiated" ||
      val === "pending_administration" ||
      val === "pending_receipt"
    ) {
      return (
        <>
          {val === "in_progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>In Progress</strong>
            </Button>
          ) : val === "items_in_transit" ? (
            <Button
              style={stylesB.stylesForReceived}
              variant="contained"
              color="primary"
            >
              <strong>Items in Transit</strong>
            </Button>
          ) : val === "pending_approval_from_accounts" ? (
            <Button
              // style={stylesB.stylesForActive}
              style={{
                // verticalAlign: "center",
                fontSize: 5,
                color: "white",
                cursor: "pointer",
                borderRadius: 2,
                background: "#2c6ddd",
                // height: "40px",
              }}
              variant="contained"
              color="primary"
            >
              <strong>Pending Approval</strong>
            </Button>
          ) : val === "pending_approval" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Approval</strong>
            </Button>
          ) : val === "Delivery in Progress" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Delivery in Progress</strong>
            </Button>
          ) : val === "Partial Delivery in Progress" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Partial Delivery in Progress</strong>
            </Button>
          ) : val === "Fulfillment Initiated" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Fulfillment Initiated</strong>
            </Button>
          ) : val === "Partial Fulfillment Initiated" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
              }}
              variant="contained"
              color="primary"
            >
              <strong>Partial Ful Initiated</strong>
            </Button>
          ) : val === "pending_receipt" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Receipt</strong>
            </Button>
          ) : val === "pending_administration" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Pending Administration</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Po Sent</strong>
            </Button>
          )}
        </>
      );
    } else if (
      val === "complete" ||
      val === "Complete" ||
      val === "pending" ||
      val === "modify" ||
      val === "closed" ||
      val === "delivered" ||
      val === "partially completed" ||
      val === "approved" ||
      val === "Approved" ||
      val === "Analysis In Progress" ||
      val === "reject" ||
      val === "response in progress" ||
      val === "partial approved" ||
      val === "Partial Approved" ||
      val === "completed" ||
      val === "approve" ||
      val === "received" ||
      val === "Partially Received" ||
      val === "Partially Completed" ||
      val === "Cannot be fulfilled" ||
      val === "Item Returned to Warehouse" ||
      val === "Returned" ||
      val === "receive" ||
      val === "Received" ||
      val === "Rejected" ||
      val === "rejected" ||
      val === "Sent for PAR" ||
      val === "Completed" ||
      val === "discharged" ||
      val === "Discharged" ||
      val === "rejected"
    ) {
      return (
        <>
          {val === "complete" || val === "Complete" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : val === "Partially Completed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, width: "120px" }}
              variant="contained"
              color="primary"
            >
              <strong>Partially Completed</strong>
            </Button>
          ) : val === "Sent for PAR" ? (
            <Button
              style={{ ...stylesB.stylesForActive, width: "120px" }}
              variant="contained"
              color="primary"
            >
              <strong>Sent for PAR</strong>
            </Button>
          ) : val === "closed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>closed</strong>
            </Button>
          ) : val === "pending" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>pending</strong>
            </Button>
          ) : val === "modify" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Modify</strong>
            </Button>
          ) : val === "delivered " ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>Delivered </strong>
            </Button>
          ) : val === "completed" || val === "Completed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Completed</strong>
            </Button>
          ) : val === "approved" || val === "Approved" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          ) : val === "partial approved" || val === "Partial Approved" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
                backgroundColor: "#2c6ddd",
              }}
              variant="contained"
              color="primary"
            >
              <strong>partial approved</strong>
            </Button>
          ) : val === "partially completed" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
                backgroundColor: " #2c6ddd",
              }}
              variant="contained"
              color="primary"
            >
              <strong>partially completed</strong>
            </Button>
          ) : val === "response in progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Response in progress</strong>
            </Button>
          ) : val === "reject" || val === "rejected" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>Reject</strong>
            </Button>
          ) : val === "received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "rejected" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Rejected</strong>
            </Button>
          ) : val === "Analysis In Progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive }}
              variant="contained"
              color="primary"
            >
              <strong>Analysis In Progress</strong>
            </Button>
          ) : val === "receive" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Receive</strong>
            </Button>
          ) : val === "Partially Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Partially Received</strong>
            </Button>
          ) : val === "approve" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approve</strong>
            </Button>
          ) : val === "Cannot be fulfilled" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Cannot be fulfilled</strong>
            </Button>
          ) : val === "Returned" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          ) : val === "Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "Discharged" || val === "discharged" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Discharged</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          )}
        </>
      );
    }

    if (heading[indexValue].includes("JD")) {
      return parseFloat(val).toFixed(4) + " JD";
    }

    return capitilizeLetter(val);
  };

  const formatDate = (date) => {
    const d = new Date(date);

    let minutes = "";

    if (d.getHours().toString().length === 1) {
      minutes = "0" + d.getHours();
    } else {
      minutes = d.getHours();
    }

    return (
      // d.getDate() +
      d
        .getDate()
        .toString()
        .padStart(2, "0") +
      " - " +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      " - " +
      // (d.getMonth() + 1) +
      d.getFullYear() +
      " " +
      // d.toLocaleTimeString()
      minutes +
      ":" +
      ("00" + d.getMinutes()).slice(-2)
    );
  };

  const handleClick = (prop, val) => {
    if (props.handleModelMaterialReceiving) {
      props.handleModelMaterialReceiving(prop, val);
    }
  };

  function setRow(props) {
    if (props._id === selectedRow._id) {
      setSelectedRow("");
    } else {
      setSelectedRow(props);
    }
  }

  function MapArrayToRow(p) {
    const { arr, prop, heading, colSize } = p;

    return (
      <div className="container-fluid">
        <div className="row" style={{ marginBottom: 7, marginTop: 7 }}>
          <>
            {arr &&
              arr.map((val, key) => {
                if (mapDateToKeys(val)) {
                  return (
                    <div
                      key={val}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: 4,
                        paddingRight: 0,
                      }}
                      className={
                        colSize === 2 ? `col-${12 / 3}` : `col-${12 / 3}`
                      }
                    >
                      <span style={{ ...stylesB.styleForDataHeading }}>
                        {heading[key]}
                      </span>
                      <span
                        key={key}
                        style={{
                          ...stylesB.styleForData,
                        }}
                      >
                        {Array.isArray(val)
                          ? prop[val[0]]
                            ? formatDate(prop[val[0]][val[1]])
                            : prop[val[0]][val[1]]
                          : formatDate(prop[val])}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={val}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: 4,
                        paddingRight: 0,
                        alignItems:
                          heading[key] === "Status" ? "flex-end" : "flex-start",
                        wordBreak: "break-word",
                      }}
                      className={
                        colSize === 2 ? `col-${12 / 3}` : `col-${12 / 3}`
                      }
                    >
                      <span style={{ ...stylesB.styleForDataHeading }}>
                        {heading[key] === "Status" ? "" : heading[key]}
                      </span>

                      <span
                        key={key}
                        onClick={() => handleClick(prop, val)}
                        style={{
                          ...stylesB.styleForData,
                        }}
                      >
                        {Array.isArray(val)
                          ? prop[val[0]]
                            ? replaceSlugToTitle(
                                prop[val[0]][val[1]],
                                val,
                                heading,
                                key
                              )
                            : null
                          : val.toLowerCase() === "timestamp"
                          ? new Intl.DateTimeFormat(
                              "en-US",
                              dateOptions
                            ).format(Date.parse(prop[val]))
                          : replaceSlugToTitle(prop[val], val, heading, key)}
                      </span>
                    </div>
                  );
                }
              })}

            {colSize === 2 ? (
              <div
                className="col-4"
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                {props.action !== "" ? (
                  props.action ? (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <RcIf if={props.action.edit}>
                        <span onClick={() => props.handleEdit(prop)}>
                          <EditIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      <RcIf if={props.action.delete}>
                        <span onClick={() => props.handleDelete(prop)}>
                          <DeleteIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      <RcIf if={props.action.add}>
                        <span onClick={() => props.handleAdd(prop)}>
                          <AddCircleOutlineIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      <RcIf if={props.action.view}>
                        <span onClick={() => props.handleView(prop)}>
                          <VisibilityIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      <RcIf if={props.action.receiveItem}>
                        <Tooltip title="Receive Item">
                          <img
                            src={ReceiveItem}
                            onClick={() => props.receiveItem(prop)}
                            style={{
                              maxWidth: 30,
                              height: 23,
                              borderRadius: 30,
                            }}
                          />
                        </Tooltip>
                      </RcIf>

                      <RcIf if={props.action.returnRequest}>
                        <Tooltip title="FU Return">
                          <img
                            src={ReturnItem}
                            onClick={() => props.addReturnRequest(prop)}
                            style={{
                              maxWidth: 30,
                              height: 23,
                              borderRadius: 30,
                            }}
                          />
                        </Tooltip>
                      </RcIf>

                      <RcIf
                        if={props.action.active && props.status === "in_active"}
                      >
                        <span
                          onClick={() => props.handleStatus(prop._id)}
                          title="Active"
                        >
                          <CheckIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      <RcIf if={props.action.print}>
                        <span
                          onClick={() =>
                            props.handlePrint(prop)
                              ? props.handlePrint(prop)
                              : {}
                          }
                          title="Active"
                        >
                          <PrintIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      <RcIf if={props.action.download}>
                        <span
                          onClick={() =>
                            props.handleDownload(prop)
                              ? props.handleDownload(prop)
                              : {}
                          }
                          title="Active"
                        >
                          <GetAppIcon
                            color="action"
                            style={{ ...stylesB.stylesForIcon }}
                          />
                        </span>
                      </RcIf>

                      {props.checkAvailability &&
                      props.checkAvailability(prop) ? (
                        <RcIf if={props.action.addNewPR}>
                          <span onClick={() => props.handleAddNewPR(prop)}>
                            <i
                              style={{ color: "grey" }}
                              className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-2x"
                            />
                          </span>
                        </RcIf>
                      ) : (
                        <RcIf if={props.action.removeAddedPR}>
                          <span onClick={() => props.handleRemovePR(prop)}>
                            <i
                              style={{ color: "grey" }}
                              className=" ml-10 zmdi zmdi-check zmdi-hc-2x"
                            />
                          </span>
                        </RcIf>
                      )}
                    </div>
                  ) : (
                    undefined
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              undefined
            )}
          </>
        </div>
      </div>
    );
  }

  return (
    <div>
      {tableData &&
        tableHeading.length > 0 &&
        tableDataKeys.length > 0 &&
        tableData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((prop, index) => {
            i = 0;
            return (
              <>
                <div className="container-fluid">
                  <div
                    className="row"
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: 3,
                      marginTop: 8,
                      borderRadius: 2,
                    }}
                  >
                    <div
                      className="col-12"
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      {tableDataKeys
                        ? tableDataKeys.map((val, key) => {
                            if (i < tableDataKeys.length) {
                              let arr = [];
                              let heading = [];
                              let colSize = 0;
                              if (i === 0) {
                                arr = tableDataKeys.slice(i, 2 + i);
                                heading.push(tableHeading[i]);
                                heading.push(tableHeading[i + 1]);
                                // heading.push(tableHeading[i + 2]);
                                i = i + 2;
                                colSize = 2;
                              } else {
                                arr = tableDataKeys.slice(i, 3 + i);
                                heading.push(tableHeading[i]);
                                heading.push(tableHeading[i + 1]);
                                heading.push(tableHeading[i + 2]);
                                i = i + 3;
                                colSize = 3;
                              }
                              return MapArrayToRow({
                                arr: arr,
                                prop: prop,
                                heading: heading,
                                colSize,
                              });
                            }
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </>
            );
          })}

      <TablePagination
        rowsPerPageOptions={[10, 20]}
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
