/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-expressions */
import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmationModal(props) {
  const modalStyle = {
    backgroundColor: "#afafaf",
    borderRadius: 10,
    height: "40%",
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: "10%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    position: "fixed",
  };

  const headingStyle = {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    // fontFamily: 'Ubuntu'
  };

  const innerDivStyle = {
    display: "flex",
    marginTop: "4%",
    justifyContent: "space-evenly",
  };

  return (
    // <Modal
    //     open={props.modalVisible}
    //     style={modalStyle}
    //     onClose={() => props.hideconfirmationModal()}
    //     aria-labelledby="simple-modal-title"
    //     aria-describedby="simple-modal-description"
    // >
    //     <div>
    //         <h4 style={headingStyle}>
    //             {props.msg}
    //         </h4>

    //         <div style={innerDivStyle}>
    //             <Button onClick={() => {props.hideconfirmationModal();props.setdeleteItem('');}} variant="contained">
    //                 Cancel
    //             </Button>

    //             <Button
    //                 style={{ marginRight: '3%' }}
    //                 onClick={() => props.onConfirmDelete()}
    //                 variant="contained"
    //                 color="primary"
    //             >
    //                 Done
    //             </Button>
    //         </div>
    //     </div>
    // </Modal>

    <Dialog
      open={props.modalVisible}
      onClose={() => props.hideconfirmationModal()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirmation Required
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.msg}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            props.hideconfirmationModal();
            props.setdeleteItem("");
          }}
          color="primary"
        >
          Cancel
        </Button>

        <Button
          onClick={() => props.onConfirmDelete()}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
