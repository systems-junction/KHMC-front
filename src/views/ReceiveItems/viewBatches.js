/*eslint-disable*/
import React, { useState, useEffect } from "react";
// @material-ui/core components
import Button from "@material-ui/core/Button";
import Notification from "../../components/Snackbar/Notification.js";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../components/Table/Table";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";

import { audioURL } from "../../public/endpoins";
import ReceiveItems from "../MaterialReceiving/addEditReceiveItems.js";
import business_Unit from "../../assets/img/Receive Item.png";

const tableHeading = [
  "Batch No",
  "Expiry date",
  "Price (JD)",
  "Quantity",
  "Print QR Code",
];
const tableDataKeys = ["batchNumber", "expiryDate", "price", "quantity"];

const actions = { download: true };

export default function PurchaseRequest(props) {
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [selectedBatchQRLink, setSelectedBatchQRLink] = useState("");
  const [batchNo, setSelectedBatchNo] = useState("");

  function handleDownload(obj) {
    setSelectedBatchQRLink(`${audioURL}${obj.qrCode}`);
    setSelectedBatchNo(obj.batchNumber);
  }

  useEffect(() => {
    if (selectedBatchQRLink) {
      downloadEmployeeData();
      // document.getElementById("linkForBatch").click();
      setSelectedBatchQRLink("");
      setSelectedBatchNo("");
    }
  }, [selectedBatchQRLink]);

  const downloadEmployeeData = () => {
    fetch(selectedBatchQRLink).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `${batchNo}.png`;
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  return (
    <Dialog
      open={true}
      onClose={() => props.hideconfirmationModal()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xl"
      fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">Received Batches</DialogTitle>

      <DialogContent>
        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.batchArray.length > 0 ? (
            <CustomTable
              tableData={props.batchArray}
              tableDataKeys={tableDataKeys}
              tableHeading={tableHeading}
              action={actions}
              borderBottomColor={"#60d69f"}
              borderBottomWidth={20}
              handleDownload={handleDownload}
            />
          ) : (
            <h5 style={{ fontWeight: "bold", textAlign: "center" }}>
              No batch found
            </h5>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
