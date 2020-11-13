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

const tableHeading = [
  "Batch No",
  "Expiry date",
  "Price",
  "Quantity",
  "Print QR Code",
];
const tableDataKeys = ["batchNumber", "expiryDate", "price", "quantity"];

const actions = { download: true };

export default function PurchaseRequest(props) {
  const [purchaseRequests, setPurchaseRequest] = useState("");
  const [deleteItem, setdeleteItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [selectedBatchQRLink, setSelectedBatchQRLink] = useState("");

  function handleDownload(obj) {
    setSelectedBatchQRLink(`${audioURL}${obj.qrCode}`);
    console.log("handle view called", obj);
  }

  useEffect(() => {
    if (selectedBatchQRLink) {
      console.log(selectedBatchQRLink);
      document.getElementById("linkForBatch").click();
      setSelectedBatchQRLink("");
    }
  }, [selectedBatchQRLink]);

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

        <>
          <a
            style={{ display: "none" }}
            id="linkForBatch"
            target="popup"
            href={selectedBatchQRLink}
            download
          >
            Download Image
          </a>
        </>
      </DialogContent>
    </Dialog>
  );
}
