import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import TextField from "@material-ui/core/TextField";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "100px",
    height: "40px",
    outline: "none",
  },

  input: {
    display: "none",
  },
};

export default function AlertDialog(props) {
  const [reason, setReason] = useState("");

  const onChangeValue = (e) => {
    {
      if (/^[a-zA-Z'"0-9. ]*$/.test(e.target.value) === false) {
        return;
      } else {
        setReason(e.target.value);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={props.openReasonModal}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={props.setVisibilityReasonModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-title">{"Reason"}</DialogTitle>

        <DialogContent>
          <div>
            <div>
              <span style={{ ...styles.styleForDesc }}>
                Please state the reason for new version
              </span>
              <TextField
                type="text"
                label="Reason"
                name={"reason"}
                value={reason}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                required
              />{" "}
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => props.setOpenReasonModal()}
            color="primary"
            style={{ ...styles.stylesForButton }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={
              reason !== ""
                ? () => props.handleSubmitAssessment("Re-Assess", reason)
                : ""
            }
            style={{ ...styles.stylesForButton }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
