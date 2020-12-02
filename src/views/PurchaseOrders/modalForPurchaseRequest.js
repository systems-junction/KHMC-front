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
  getPurchaseRequestUrl,
  deletePurchaseRequestUrl,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import purchase_request from "../../assets/img/purchase request.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";

import Search from "../../assets/img/Search.png";
import Control_Room from "../../assets/img/Control_Room.png";

import Edit from "../../assets/img/Edit.png";

import Inactive from "../../assets/img/Inactive.png";

import Active from "../../assets/img/Active.png";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";
import cookie from "react-cookies";

const useStyles = makeStyles(styles);

const stylesB = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForActive: {
    color: "white",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "100px",
    height: "35px",
    outline: "none",
    fontSize: "0.7rem",
  },
};

const tableHeading = [
  "Request No",
  "Generated By",
  "Vendor",
  "Status",
  "Action",
];
const tableDataKeys = [
  "requestNo",
  "generated",
  ["vendorId", "englishName"],
  "committeeStatus",
];

const actions = { add: true };

export default function PurchaseRequest(props) {
  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [items, setItems] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [selectedPurchaseRequests, setSelectedPurchaseRequest] = useState([]);
  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  const [filteredRequests, setFilteredRequests] = useState([]);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  const classes = useStyles();

  function getPurchaseRequests() {
    axios
      .get(getPurchaseRequestUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("prs", res.data.data);
          if (props.comingFor === "add") {
            setPurchaseRequest(res.data.data.purchaseRequest.reverse());
            // setFilteredRequests(res.data.data.purchaseRequest.reverse());
          } else if (props.comingFor === "edit") {
            let temp = [];
            temp =
              res.data.data.purchaseRequest &&
              res.data.data.purchaseRequest.filter((pr) => {
                return (
                  pr.vendorId._id === props.selectedVendor &&
                  pr.committeeStatus === "approved" &&
                  pr.generated === "Manual" &&
                  pr.availability === true
                );
              });

            console.log("temp", temp);
            let withAddedPRs = [...temp, ...props.addedPRs];
            setFilteredRequests(withAddedPRs.reverse());
          }
          setVendor(res.data.data.vendor);
          setStatus(res.data.data.status);
          setItems(res.data.data.items);
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

  console.log(props, "sdsds");

  useEffect(() => {
    if (props.comingFor === "add") {
      getPurchaseRequests();
    }

    if (props.comingFor === "edit") {
      getPurchaseRequests();
      setSelectedPurchaseRequest(props.addedPRs);
    }
  }, []);

  useEffect(() => {
    if (props.comingFor === "add") {
      let temp = [];
      temp =
        purchaseRequests &&
        purchaseRequests.filter((pr) => {
          return (
            pr.vendorId._id === props.selectedVendor &&
            pr.committeeStatus === "approved" &&
            pr.generated === "Manual" &&
            pr.availability === true
          );
        });
      setFilteredRequests(temp);
    }
  }, [props.selectedVendor]);

  const handleAdd = (prObj) => {
    let temp = [...selectedPurchaseRequests];
    if (temp.length === 0) {
      temp.push(prObj);
    } else {
      for (let i = 0; i < selectedPurchaseRequests.length; i++) {
        if (
          selectedPurchaseRequests[i].vendorId._id === prObj.vendorId._id &&
          prObj._id !== selectedPurchaseRequests[i]._id
        ) {
          temp.push(prObj);
        }
      }
    }
    setSelectedPurchaseRequest(temp);
    props.handleAddPR(temp);
  };

  const handleRemove = (prObj) => {
    let temp;
    temp = selectedPurchaseRequests.filter((item) => item._id !== prObj._id);
    setSelectedPurchaseRequest(temp);
    props.handleAddPR(temp);
  };

  // function addNewPR() {
  //   const path = "/home/controlroom/wms/pr/add";

  //   props.history.push({
  //     path: path,
  //     state: { comingFor: "add" },
  //   });
  // }

  const replaceSlugToTitle = (val) => {
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
    if (val === "pending" || val === "to_do") {
      if (currentUser && currentUser.staffTypeId.type === "Committe Member") {
        return (
          <h6 style={{ fontWeight: "700", color: "#2C73D2" }}>
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
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            ) : (
              ""
            )}
          </h6>
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
            ) : (
              <Button
                style={stylesB.stylesForActive}
                variant="contained"
                color="primary"
              >
                <strong>Pending</strong>
              </Button>
            )}
          </>
        );
      }
    } else if (val === "in_progress") {
      return (
        <Button
          style={stylesB.stylesForActive}
          variant="contained"
          color="primary"
        >
          <strong>In Progress</strong>
        </Button>
      );
    } else if (val === "complete" || val === "approved") {
      return (
        <>
          {val === "complete" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          )}
        </>
      );
    }

    return val;
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

  function checkAvailability(prObj) {
    for (let i = 0; i < selectedPurchaseRequests.length; i++) {
      if (prObj._id === selectedPurchaseRequests[i]._id) {
        return false;
      }
    }
    return true;
  }

  function handleDone() {
    console.log("selected purchase request", selectedPurchaseRequests);
    props.handleAddPR(selectedPurchaseRequests);
  }

  return (
    <div>
      <div>
        <div>
          {filteredRequests.length > 0 && props.selectedVendor ? (
            <CustomTable
              tableData={filteredRequests}
              tableDataKeys={tableDataKeys}
              tableHeading={tableHeading}
              action={{ addNewPR: true, removeAddedPR: true }}
              borderBottomColor={"#60d69f"}
              borderBottomWidth={20}
              handleView={props.viewItem}
              checkAvailability={checkAvailability}
              handleAddNewPR={handleAdd}
              handleRemovePR={handleRemove}
            />
          ) : props.selectedVendor && filteredRequests.length === 0 ? (
            <h5
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              No active purchase request found for that selected vendor
            </h5>
          ) : (
            undefined
          )}
        </div>

        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={stylesB.stylesForButton}
              onClick={() => handleDone()}
              variant={"contained"}
              color={"primary"}
            >
              Done
            </Button>
          </div> */}
        <Notification msg={errorMsg} open={openNotification} />
      </div>
      {/* ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader type="TailSpin" color="red" height={50} width={50} />
        </div>
      )} */}
    </div>
  );
}

// <Table>
//           {tableHeading !== undefined ? (
//             <TableHead
//               className={classes["TableHeader"]}
//               style={{
//                 backgroundColor: "#2873cf",
//               }}
//             >
//               <TableRow>
//                 {tableHeading.map((prop, index) => {
//                   return (
//                     <>
//                       <TableCell
//                         className={classes.tableHeadCell}
//                         style={{
//                           color: "white",
//                           fontWeight: "700",
//                           // textAlign: "center",
//                           borderTopLeftRadius: index === 0 ? 10 : 0,
//                           borderTopRightRadius:
//                             index === tableHeading.length - 1 ? 10 : 0,
//                         }}
//                         key={prop}
//                       >
//                         {prop}
//                       </TableCell>
//                     </>
//                   );
//                 })}
//               </TableRow>
//             </TableHead>
//           ) : null}

//           <TableBody>
//             {filteredRequests &&
//               filteredRequests.map((prop, index) => {
//                 return (
//                   <>
//                     <TableRow
//                       key={index}
//                       className={classes.tableBodyRow}
//                       style={{
//                         backgroundColor: "white",
//                       }}
//                     >
//                       {tableDataKeys
//                         ? tableDataKeys.map((val, key) => {
//                             // console.log(key);
//                             if (val === "date") {
//                               return (
//                                 <TableCell
//                                   className={classes.tableCell}
//                                   key={key}
//                                   style={
//                                     {
//                                       // textAlign: "center",
//                                     }
//                                   }
//                                 >
//                                   {formatDate(prop[val])}
//                                 </TableCell>
//                               );
//                             } else {
//                               return (
//                                 <TableCell
//                                   className={classes.tableCell}
//                                   key={key}
//                                 >
//                                   {Array.isArray(val)
//                                     ? prop[val[0]]
//                                       ? prop[val[0]][val[1]]
//                                       : null
//                                     : val.toLowerCase() === "timestamp"
//                                     ? new Intl.DateTimeFormat(
//                                         "en-US",
//                                         dateOptions
//                                       ).format(Date.parse(prop[val]))
//                                     : // : `${replaceSlugToTitle(prop[val])}`}
//                                       replaceSlugToTitle(prop[val])}
//                                 </TableCell>
//                               );
//                             }
//                           })
//                         : null}
//                       <TableCell
//                         style={{
//                           cursor: "pointer",
//                         }}
//                         className={classes.tableCell}
//                         colSpan="2"
//                       >
//                         {checkAvailability(prop) ? (
//                           <span onClick={() => handleAdd(prop)}>
//                             <i
//                               style={{ color: "blue" }}
//                               className=" ml-10 zmdi zmdi-plus-circle zmdi-hc-3x"
//                             />
//                           </span>
//                         ) : (
//                           <span onClick={() => handleRemove(prop)}>
//                             <i
//                               style={{ color: "blue" }}
//                               className=" ml-10 zmdi zmdi-check zmdi-hc-3x"
//                             />
//                           </span>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   </>
//                 );
//               })}
//           </TableBody>
//         </Table>
