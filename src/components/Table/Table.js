/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
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
import ReturnItem from "../../assets/img/Return Item Grey.png";
import ReceiveItem from "../../assets/img/Receive Item Grey.png";
import EditIcon from "../../assets/img/Edit.png";
import cookie from "react-cookies";
import Tooltip from "@material-ui/core/Tooltip";
import capitilizeLetter from "../../public/capitilizeLetter";
import formatDate from "../../utils/formatDate";
import mapDateToKeys from "../../utils/mapDateToKeys";
import Chip from "@material-ui/core/Chip";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import MobileTable from "./MobileTable";

const useStyles = makeStyles( styles );

const stylesB = {
  stylesForActive: {
    verticalAlign: "center",
    fontSize: "0.60rem",
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "100px",
    height: "40px",
    // outline: "none",
    // boxShadow: "none",
    // paddingBottom:"0.5rem",
    // display:'flex',
    // alignItems:'flex-start',
  },
  stylesForInActive: {
    verticalAlign: "center",
    fontSize: "0.60rem",
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#845DC2",
    width: "100px",
    height: "40px",
    // paddingBottom:"0.5rem",
    // outline: "none",
    // boxShadow: "none",
  },
  stylesForReceived: {
    verticalAlign: "center",
    fontSize: "0.60rem",
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#845DC2",
    width: "100px",
    height: "40px",
    // paddingBottom:"0.5rem",

    // boxShadow: "none",
    // outline: "none",
  },
};

const StyledTableRow = withStyles( ( theme ) => ( {
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f4f4f4",
    },

    "&:nth-of-type(even)": {
      backgroundColor: "#FFFFFF",
    },
  },
} ) )( TableRow );

const useStylesForChip = makeStyles( ( theme ) => ( {
  root: {
    "& .MuiChip-root": {
      backgroundColor: "red",
      color: "white",
      borderRadius: "10px",
      height: "25px",
    },
  },
} ) );

let matches = true;

export default function CustomTable ( props )
{
  const theme = useTheme();
  matches = useMediaQuery( theme.breakpoints.up( "sm" ) );

  const { tableHeading, tableData, tableDataKeys, tableHeaderColor } = props;

  const classes = useStyles();
  const classForChip = useStylesForChip();

  const [ page, setPage ] = React.useState( 0 );
  const [ rowsPerPage, setRowsPerPage ] = React.useState(
    !props.doNotPagination ? 10 : props.tableData.length
  );
  const [ selectedRow, setSelectedRow ] = React.useState( "" );
  const [ hovered, setHovered ] = React.useState( "" );
  const [ currentUser, setCurrentUser ] = React.useState(
    cookie.load( "current_user" )
  );

  const [ doNotPagination, setAllowedPagination ] = React.useState( true );

  const handleChangePage = ( event, newPage ) =>
  {
    setPage( newPage );
  };

  useEffect( () =>
  {
    // props.tableData
    if ( !props.doNotPagination )
    {
      // doNotPagination = true;
      setAllowedPagination( true );
    } else
    {
      // doNotPagination = false;
      setAllowedPagination( false );
    }
  }, [] );

  const replaceSlugToTitle = ( val, key, indexValue ) =>
  {
    if ( key === "heartRate" )
    {
      if ( val < 60 || val > 100 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "bloodPressureSys" )
    {
      if ( val > 120 || val < 90 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "bloodPressureDia" )
    {
      if ( val < 60 || val > 80 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "respiratoryRate" )
    {
      if ( val < 12 || val > 25 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "temperature" )
    {
      if ( val < 97 || val > 99 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "FSBS" )
    {
      if ( val < 80 || val > 130 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "painScale" )
    {
      if ( val >= 8 )
      {
        return <Chip label={ val } />;
      }
    }
    if ( key === "pulseOX" )
    {
      if ( val < 80 || val > 100 )
      {
        return <Chip label={ val } />;
      }
    }

    if ( val === "in_active" )
    {
      return (
        <Button
          style={ stylesB.stylesForInActive }
          variant="contained"
          color="primary"
        >
          <strong>In active</strong>
        </Button>
      );
    } else if ( val === "active" )
    {
      return (
        <Button
          style={ stylesB.stylesForActive }
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
    )
    {
      // if (currentUser && currentUser.staffTypeId.type === 'Committe Member') {
      if ( currentUser )
      {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={ stylesB.stylesForActive }
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                // onClick={() => props.handleView(prop)}
                style={ {
                  ...stylesB.stylesForActive,
                  backgroundColor: "#e877a1",
                } }
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : val === "po_created" ? (
              <Button
                style={ stylesB.stylesForActive }
                variant="contained"
                color="primary"
              >
                <strong>PO Created</strong>
              </Button>
            ) : val === "hold" ? (
              <Button
                style={ stylesB.stylesForActive }
                variant="contained"
                color="primary"
              >
                <strong>Hold</strong>
              </Button>
            ) : val === "Can be fulfilled" ? (
              <Button
                style={ {
                  ...stylesB.stylesForActive,
                  backgroundColor: "#845dc2",
                } }
                variant="contained"
                color="primary"
              >
                <strong>Can be fulfilled</strong>
              </Button>
            ) : (
              ""
            ) }
          </>
        );
      } else
      {
        return (
          <>
            {val === "to_do" ? (
              <Button
                style={ stylesB.stylesForActive }
                variant="contained"
                color="primary"
              >
                <strong>To Do</strong>
              </Button>
            ) : val === "pending" ? (
              <Button
                style={ {
                  ...stylesB.stylesForActive,
                  backgroundColor: "#e877a1",
                } }
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : val === "po_created" ? (
              <Button
                style={ stylesB.stylesForActive }
                variant="contained"
                color="primary"
              >
                <strong>PO Created</strong>
              </Button>
            ) : val === "Can be fulfilled" ? (
              <Button
                style={ stylesB.stylesForActive }
                variant="contained"
                color="primary"
              >
                <strong>Can be fulfilled</strong>
              </Button>
            ) : (
              ""
            ) }
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
    )
    {
      return (
        <>
          {val === "in_progress" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#e877a1" } }
              variant="contained"
              color="primary"
            >
              <strong>In Progress</strong>
            </Button>
          ) : val === "items_in_transit" ? (
            <Button
              style={ stylesB.stylesForReceived }
              variant="contained"
              color="primary"
            >
              <strong>Items in Transit</strong>
            </Button>
          ) : val === "pending_approval_from_accounts" ? (
            <Button
              // style={stylesB.stylesForActive}
              style={ {
                // verticalAlign: "center",
                fontSize: "0.6rem",
                color: "white",
                cursor: "pointer",
                borderRadius: 5,
                background: "#2c6ddd",
                height: "40px",
              } }
              variant="contained"
              color="primary"
            >
              <strong>Pending Approval</strong>
            </Button>
          ) : val === "pending_approval" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Pending Approval</strong>
            </Button>
          ) : val === "Delivery in Progress" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Delivery in Progress</strong>
            </Button>
          ) : val === "Partial Delivery in Progress" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Partial Delivery in Progress</strong>
            </Button>
          ) : val === "Fulfillment Initiated" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Fulfillment Initiated</strong>
            </Button>
          ) : val === "Partial Fulfillment Initiated" ? (
            <Button
              style={ {
                ...stylesB.stylesForActive,
              } }
              variant="contained"
              color="primary"
            >
              <strong>Partial Ful Initiated</strong>
            </Button>
          ) : val === "pending_receipt" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Pending Receipt</strong>
            </Button>
          ) : val === "pending_administration" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Pending Administration</strong>
            </Button>
          ) : (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Po Sent</strong>
            </Button>
          ) }
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
    )
    {
      return (
        <>
          {val === "complete" || val === "Complete" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#ba55d3" } }
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : val === "Partially Completed" ? (
            <Button
              style={ { ...stylesB.stylesForActive, width: "120px" } }
              variant="contained"
              color="primary"
            >
              <strong>Partially Completed</strong>
            </Button>
          ) : val === "Sent for PAR" ? (
            <Button
              style={ { ...stylesB.stylesForActive, width: "120px" } }
              variant="contained"
              color="primary"
            >
              <strong>Sent for PAR</strong>
            </Button>
          ) : val === "closed" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" } }
              variant="contained"
              color="primary"
            >
              <strong>closed</strong>
            </Button>
          ) : val === "pending" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#e877a1" } }
              variant="contained"
              color="primary"
            >
              <strong>pending</strong>
            </Button>
          ) : val === "modify" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#e877a1" } }
              variant="contained"
              color="primary"
            >
              <strong>Modify</strong>
            </Button>
          ) : val === "delivered " ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" } }
              variant="contained"
              color="primary"
            >
              <strong>Delivered </strong>
            </Button>
          ) : val === "completed" || val === "Completed" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#ba55d3" } }
              variant="contained"
              color="primary"
            >
              <strong>Completed</strong>
            </Button>
          ) : val === "approved" || val === "Approved" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#ba55d3" } }
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          ) : val === "partial approved" || val === "Partial Approved" ? (
            <Button
              style={ {
                ...stylesB.stylesForActive,
                backgroundColor: "#2c6ddd",
                width: "150px",
              } }
              variant="contained"
              color="primary"
            >
              <strong>partial approved</strong>
            </Button>
          ) : val === "partially completed" ? (
            <Button
              style={ {
                ...stylesB.stylesForActive,
                backgroundColor: " #2c6ddd",
              } }
              variant="contained"
              color="primary"
            >
              <strong>partially completed</strong>
            </Button>
          ) : val === "response in progress" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#e877a1" } }
              variant="contained"
              color="primary"
            >
              <strong>Response in progress</strong>
            </Button>
          ) : val === "reject" || val === "rejected" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" } }
              variant="contained"
              color="primary"
            >
              <strong>Reject</strong>
            </Button>
          ) : val === "received" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "rejected" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Rejected</strong>
            </Button>
          ) : val === "Analysis In Progress" ? (
            <Button
              style={ { ...stylesB.stylesForActive, width: "150px" } }
              variant="contained"
              color="primary"
            >
              <strong>Analysis In Progress</strong>
            </Button>
          ) : val === "receive" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Receive</strong>
            </Button>
          ) : val === "Partially Received" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Partially Received</strong>
            </Button>
          ) : val === "approve" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Approve</strong>
            </Button>
          ) : val === "Cannot be fulfilled" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#e877a1" } }
              variant="contained"
              color="primary"
            >
              <strong>Cannot be fulfilled</strong>
            </Button>
          ) : val === "Returned" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          ) : val === "Received" ? (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "Discharged" || val === "discharged" ? (
            <Button
              style={ { ...stylesB.stylesForActive, backgroundColor: "#ba55d3" } }
              variant="contained"
              color="primary"
            >
              <strong>Discharged</strong>
            </Button>
          ) : (
            <Button
              style={ stylesB.stylesForActive }
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          ) }
        </>
      );
    }

    // console.log("sdsd",props.tableHeading[indexValue])

    if ( props.tableHeading[ indexValue ].includes( "JD" ) )
    {
      return parseFloat( val ).toFixed( 4 ) + " JD";
    }

    return capitilizeLetter( val );
  };

  const handleChangeRowsPerPage = ( event ) =>
  {
    setRowsPerPage( parseInt( event.target.value, 10 ) );
    setPage( 0 );
  };

  const formatDate = ( date ) =>
  {
    const d = new Date( date );

    let minutes = "";

    if ( d.getHours().toString().length === 1 )
    {
      minutes = "0" + d.getHours();
    } else
    {
      minutes = d.getHours();
    }

    return (
      // d.getDate() +
      d
        .getDate()
        .toString()
        .padStart( 2, "0" ) +
      " - " +
      ( d.getMonth() + 1 ).toString().padStart( 2, "0" ) +
      " - " +
      // (d.getMonth() + 1) +
      d.getFullYear() +
      " " +
      // d.toLocaleTimeString()
      minutes +
      ":" +
      ( "00" + d.getMinutes() ).slice( -2 )
    );
  };

  const handleClick = ( prop, val ) =>
  {
    if ( props.handleModelMaterialReceiving )
    {
      props.handleModelMaterialReceiving( prop, val );
    }
  };

  function setRow ( prop )
  {
    if ( prop._id === selectedRow._id )
    {
      setSelectedRow( "" );
    } else
    {
      setSelectedRow( prop );
    }
  }

  console.log( matches );

  if ( !props.matchNotRequired )
  {
    if ( matches )
    {
      return (
        <div className={ classes.tableResponsive }>
          <Table id={ props.id ? props.id : "table_component" }>
            { tableHeading !== undefined ? (
              <TableHead
                className={ classes[ tableHeaderColor + "TableHeader" ] }
                style={ {
                  backgroundColor: "#2873cf",
                } }
              >
                <TableRow className={ classes.tableHeadRow }>
                  { tableHeading.map( ( prop, index ) =>
                  {
                    if ( prop !== "" )
                    {
                      return (
                        <>
                          <TableCell
                            className={ classes.tableHeadCell }
                            style={ {
                              color: "white",
                              textAlign:
                                prop === "Actions" || prop === "Action"
                                  ? "center"
                                  : "",
                            } }
                            key={ prop }
                          >
                            { prop }
                          </TableCell>
                        </>
                      );
                    }
                  } ) }
                </TableRow>
              </TableHead>
            ) : null }

            <TableBody>
              { tableData &&
                tableData
                  .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                  .map( ( prop, index ) =>
                  {
                    return (
                      <>
                        <StyledTableRow key={ index }>
                          { tableDataKeys
                            ? tableDataKeys.map( ( val, key ) =>
                            {
                              if ( mapDateToKeys( val ) )
                              {
                                return (
                                  <TableCell
                                    className={ classes.tableCell }
                                    key={ key }
                                    style={ {
                                      borderWidth: 0,
                                      maxWidth: 400,
                                    } }
                                  >
                                    {Array.isArray( val )
                                      ? prop[ val[ 0 ] ]
                                        ? formatDate( prop[ val[ 0 ] ][ val[ 1 ] ] )
                                        : prop[ val[ 0 ] ][ val[ 1 ] ]
                                      : formatDate( prop[ val ] ) }
                                  </TableCell>
                                );
                              } else
                              {
                                return (
                                  <TableCell
                                    className={ `${ classes.tableCell } ${ classForChip.root }` }
                                    key={ key }
                                    onClick={ () => handleClick( prop, val ) }
                                    style={ {
                                      maxWidth: 400,
                                      cursor: props.handleModelMaterialReceiving
                                        ? "pointer"
                                        : "",
                                      borderWidth: 0,
                                    } }
                                  >
                                    {Array.isArray( val )
                                      ? prop[ val[ 0 ] ]
                                        ? // ? capitilizeLetter(prop[val[0]][val[1]])
                                        replaceSlugToTitle(
                                          prop[ val[ 0 ] ][ val[ 1 ] ],
                                          val,
                                          key
                                        )
                                        : null
                                      : val.toLowerCase() === "timestamp"
                                        ? new Intl.DateTimeFormat(
                                          "en-US",
                                          dateOptions
                                        ).format( Date.parse( prop[ val ] ) )
                                        : // : `${replaceSlugToTitle(prop[val])}`}
                                        replaceSlugToTitle(
                                          prop[ val ],
                                          val,
                                          key
                                        ) }
                                  </TableCell>
                                );
                              }
                            } )
                            : null }

                          { props.action !== "" ? (
                            <TableCell
                              style={ {
                                cursor: "pointer",
                                borderWidth: 0,
                              } }
                              className={ classes.tableCell }
                            >
                              {props.action ? (
                                <div
                                  style={ {
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  } }
                                >
                                  <RcIf if={ props.action.edit }>
                                    <span
                                      onClick={ () => props.handleEdit( prop ) }
                                    >
                                      <i
                                        style={ { color: "grey" } }
                                        className="zmdi zmdi-edit zmdi-hc-2x"
                                      />
                                    </span>
                                  </RcIf>
                                  <RcIf if={ props.action.delete }>
                                    <span
                                      onClick={ () => props.handleDelete( prop ) }
                                    >
                                      <i
                                        style={ {
                                          color: "grey",
                                        } }
                                        className=" ml-10 zmdi zmdi-delete zmdi-hc-2x"
                                      />
                                    </span>
                                  </RcIf>

                                  <RcIf if={ props.action.add }>
                                    <span onClick={ () => props.handleAdd( prop ) }>
                                      <i
                                        style={ { color: "grey" } }
                                        className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-2x"
                                      />
                                    </span>
                                  </RcIf>

                                  <RcIf if={ props.action.view }>
                                    <span
                                      onClick={ () => props.handleView( prop, index ) }
                                    >
                                      <i
                                        style={ { color: "grey" } }
                                        className=" ml-10 zmdi zmdi-eye zmdi-hc-2x"
                                      />
                                    </span>
                                  </RcIf>

                                  <RcIf if={ props.action.receiveItem }>
                                    <Tooltip title="Receive Item">
                                      <img
                                        src={ ReceiveItem }
                                        onClick={ () => props.receiveItem( prop ) }
                                        style={ {
                                          maxWidth: 60,
                                          height: 43,
                                          borderRadius: 30,
                                        } }
                                      />
                                    </Tooltip>
                                  </RcIf>

                                  <RcIf if={ props.action.returnRequest }>
                                    <Tooltip title="FU Return">
                                      <img
                                        src={ ReturnItem }
                                        onClick={ () =>
                                          props.addReturnRequest( prop )
                                        }
                                        style={ {
                                          maxWidth: 60,
                                          height: 45,
                                          borderRadius: 30,
                                        } }
                                      />
                                    </Tooltip>
                                  </RcIf>

                                  <RcIf
                                    if={
                                      props.action.active &&
                                      prop.status === "in_active"
                                    }
                                  >
                                    <span
                                      onClick={ () =>
                                        props.handleStatus( prop._id )
                                      }
                                      title="Active"
                                    >
                                      <i className=" ml-10 zmdi zmdi-check zmdi-hc-2x" />
                                    </span>
                                  </RcIf>

                                  <RcIf if={ props.action.print }>
                                    <span
                                      onClick={ () =>
                                        props.handlePrint( prop )
                                          ? props.handlePrint( prop )
                                          : {}
                                      }
                                      title="Active"
                                    >
                                      <i
                                        style={ { color: "grey" } }
                                        class="zmdi zmdi-print zmdi-hc-2x"
                                      ></i>
                                    </span>
                                  </RcIf>

                                  <RcIf if={ props.action.download }>
                                    <span
                                      onClick={ () =>
                                        props.handleDownload( prop )
                                          ? props.handleDownload( prop )
                                          : {}
                                      }
                                      title="Active"
                                    >
                                      <i
                                        style={ { color: "grey" } }
                                        class="zmdi zmdi-download zmdi-hc-2x"
                                      ></i>
                                    </span>
                                  </RcIf>

                                  {props.checkAvailability &&
                                    props.checkAvailability( prop ) ? (
                                    <RcIf if={ props.action.addNewPR }>
                                      <span
                                        onClick={ () =>
                                          props.handleAddNewPR( prop )
                                        }
                                      >
                                        <i
                                          style={ { color: "grey" } }
                                          className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-2x"
                                        />
                                      </span>
                                    </RcIf>
                                  ) : (
                                    <RcIf if={ props.action.removeAddedPR }>
                                      <span
                                        onClick={ () =>
                                          props.handleRemovePR( prop )
                                        }
                                      >
                                        <i
                                          style={ { color: "grey" } }
                                          className=" ml-10 zmdi zmdi-check zmdi-hc-2x"
                                        />
                                      </span>
                                    </RcIf>
                                  ) }
                                </div>
                              ) : (
                                undefined
                              ) }
                            </TableCell>
                          ) : (
                            ""
                          ) }
                        </StyledTableRow>
                      </>
                    );
                  } ) }
            </TableBody>
          </Table>
          {doNotPagination ? (
            <TablePagination
              rowsPerPageOptions={ [ 10, 20 ] }
              component="div"
              count={ props.tableData && props.tableData.length }
              rowsPerPage={ rowsPerPage }
              page={ page }
              onChangePage={ handleChangePage }
              onChangeRowsPerPage={ handleChangeRowsPerPage }
            />
          ) : (
            undefined
          ) }
        </div>
      );
    } else
    {
      return <MobileTable { ...props } />;
    }
  } else
  {
    return (
      <div className={ classes.tableResponsive }>
        <Table id={ props.id ? props.id : "table_component" }>
          { tableHeading !== undefined ? (
            <TableHead
              className={ classes[ tableHeaderColor + "TableHeader" ] }
              style={ {
                backgroundColor: "#2873cf",
              } }
            >
              <TableRow className={ classes.tableHeadRow }>
                { tableHeading.map( ( prop, index ) =>
                {
                  if ( prop !== "" )
                  {
                    return (
                      <>
                        <TableCell
                          className={ classes.tableHeadCell }
                          style={ {
                            color: "white",
                            borderTopLeftRadius: index === 0 ? 5 : 0,
                            borderTopRightRadius:
                              index === tableHeading.length - 1 ? 5 : 0,
                            textAlign:
                              prop === "Actions" || prop === "Action"
                                ? "center"
                                : "",
                          } }
                          key={ prop }
                        >
                          { prop }
                        </TableCell>
                      </>
                    );
                  }
                } ) }
              </TableRow>
            </TableHead>
          ) : null }

          <TableBody>
            { tableData &&
              tableData
                .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                .map( ( prop, index ) =>
                {
                  return (
                    <>
                      <StyledTableRow key={ index }>
                        { tableDataKeys
                          ? tableDataKeys.map( ( val, key ) =>
                          {
                            if ( mapDateToKeys( val ) )
                            {
                              return (
                                <TableCell
                                  className={ classes.tableCell }
                                  key={ key }
                                  style={ {
                                    // textAlign: 'center',
                                    borderWidth: 0,
                                    maxWidth: 400,
                                  } }
                                >
                                  {Array.isArray( val )
                                    ? prop[ val[ 0 ] ]
                                      ? formatDate( prop[ val[ 0 ] ][ val[ 1 ] ] )
                                      : prop[ val[ 0 ] ][ val[ 1 ] ]
                                    : formatDate( prop[ val ] ) }
                                </TableCell>
                              );
                            } else
                            {
                              return (
                                <TableCell
                                  className={ `${ classes.tableCell } ${ classForChip.root }` }
                                  key={ key }
                                  onClick={ () => handleClick( prop, val ) }
                                  style={ {
                                    maxWidth: 400,
                                    // textAlign: 'center',
                                    cursor: props.handleModelMaterialReceiving
                                      ? "pointer"
                                      : "",
                                    // borderTopLeftRadius: key === 0 ? 5 : 0,
                                    // borderBottomLeftRadius: key === 0 ? 5 : 0,

                                    borderBottomLeftRadius:
                                      props.tableData.length - 1 === index &&
                                        key === 0
                                        ? 5
                                        : 0,
                                    borderWidth: 0,
                                  } }
                                >
                                  {Array.isArray( val )
                                    ? prop[ val[ 0 ] ]
                                      ? // ? capitilizeLetter(prop[val[0]][val[1]])
                                      replaceSlugToTitle(
                                        prop[ val[ 0 ] ][ val[ 1 ] ],
                                        val,
                                        key
                                      )
                                      : null
                                    : val.toLowerCase() === "timestamp"
                                      ? new Intl.DateTimeFormat(
                                        "en-US",
                                        dateOptions
                                      ).format( Date.parse( prop[ val ] ) )
                                      : // : `${replaceSlugToTitle(prop[val])}`}
                                      replaceSlugToTitle( prop[ val ], val, key ) }
                                </TableCell>
                              );
                            }
                          } )
                          : null }

                        { props.action !== "" ? (
                          <TableCell
                            style={ {
                              cursor: "pointer",
                              // borderTopRightRadius: 15,
                              borderBottomRightRadius:
                                props.tableData.length - 1 === index ? 5 : 0,
                              borderWidth: 0,
                            } }
                            className={ classes.tableCell }
                          >
                            {props.action ? (
                              <div
                                style={ {
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                } }
                              >
                                <RcIf if={ props.action.edit }>
                                  <span onClick={ () => props.handleEdit( prop ) }>
                                    <i
                                      style={ { color: "grey" } }
                                      className="zmdi zmdi-edit zmdi-hc-2x"
                                    />
                                  </span>
                                </RcIf>
                                <RcIf if={ props.action.delete }>
                                  <span
                                    onClick={ () => props.handleDelete( prop ) }
                                  >
                                    <i
                                      style={ {
                                        color: "grey",
                                      } }
                                      className=" ml-10 zmdi zmdi-delete zmdi-hc-2x"
                                    />
                                  </span>
                                </RcIf>

                                <RcIf if={ props.action.add }>
                                  <span onClick={ () => props.handleAdd( prop ) }>
                                    <i
                                      style={ { color: "grey" } }
                                      className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-2x"
                                    />
                                  </span>
                                </RcIf>

                                <RcIf if={ props.action.view }>
                                  <span onClick={ () => props.handleView( prop, index ) }>
                                    <i
                                      style={ { color: "grey" } }
                                      className=" ml-10 zmdi zmdi-eye zmdi-hc-2x"
                                    />
                                  </span>
                                </RcIf>

                                <RcIf if={ props.action.receiveItem }>
                                  <Tooltip title="Receive Item">
                                    <img
                                      src={ ReceiveItem }
                                      onClick={ () => props.receiveItem( prop ) }
                                      style={ {
                                        maxWidth: 60,
                                        height: 43,
                                        borderRadius: 30,
                                      } }
                                    />
                                  </Tooltip>
                                </RcIf>

                                <RcIf if={ props.action.returnRequest }>
                                  <Tooltip title="FU Return">
                                    <img
                                      src={ ReturnItem }
                                      onClick={ () =>
                                        props.addReturnRequest( prop )
                                      }
                                      style={ {
                                        maxWidth: 60,
                                        height: 45,
                                        borderRadius: 30,
                                      } }
                                    />
                                  </Tooltip>
                                </RcIf>

                                <RcIf
                                  if={
                                    props.action.active &&
                                    prop.status === "in_active"
                                  }
                                >
                                  <span
                                    onClick={ () => props.handleStatus( prop._id ) }
                                    title="Active"
                                  >
                                    <i className=" ml-10 zmdi zmdi-check zmdi-hc-2x" />
                                  </span>
                                </RcIf>

                                <RcIf if={ props.action.print }>
                                  <span
                                    onClick={ () =>
                                      props.handlePrint( prop )
                                        ? props.handlePrint( prop )
                                        : {}
                                    }
                                    title="Active"
                                  >
                                    <i
                                      style={ { color: "grey" } }
                                      class="zmdi zmdi-print zmdi-hc-2x"
                                    ></i>
                                  </span>
                                </RcIf>

                                <RcIf if={ props.action.download }>
                                  <span
                                    onClick={ () =>
                                      props.handleDownload( prop )
                                        ? props.handleDownload( prop )
                                        : {}
                                    }
                                    title="Active"
                                  >
                                    <i
                                      style={ { color: "grey" } }
                                      class="zmdi zmdi-download zmdi-hc-2x"
                                    ></i>
                                  </span>
                                </RcIf>

                                {props.checkAvailability &&
                                  props.checkAvailability( prop ) ? (
                                  <RcIf if={ props.action.addNewPR }>
                                    <span
                                      onClick={ () => props.handleAddNewPR( prop ) }
                                    >
                                      <i
                                        style={ { color: "grey" } }
                                        className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-2x"
                                      />
                                    </span>
                                  </RcIf>
                                ) : (
                                  <RcIf if={ props.action.removeAddedPR }>
                                    <span
                                      onClick={ () => props.handleRemovePR( prop ) }
                                    >
                                      <i
                                        style={ { color: "grey" } }
                                        className=" ml-10 zmdi zmdi-check zmdi-hc-2x"
                                      />
                                    </span>
                                  </RcIf>
                                ) }
                              </div>
                            ) : (
                              undefined
                            ) }
                          </TableCell>
                        ) : (
                          ""
                        ) }
                      </StyledTableRow>
                    </>
                  );
                } ) }
          </TableBody>
        </Table>
        {doNotPagination ? (
          <TablePagination
            rowsPerPageOptions={ [ 10, 20 ] }
            component="div"
            count={ props.tableData && props.tableData.length }
            rowsPerPage={ rowsPerPage }
            page={ page }
            onChangePage={ handleChangePage }
            onChangeRowsPerPage={ handleChangeRowsPerPage }
          />
        ) : (
          undefined
        ) }
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf( [
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ] ),
  // tableHead: PropTypes.arrayOf(PropTypes.string),
  // tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
