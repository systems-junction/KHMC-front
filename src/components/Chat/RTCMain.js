import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RTCFunc from "../Chat/RTC/RTCFunc";
export default function RTCMain(props) {
  // const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    // setOpen(false);
    props.video(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Video Call Component"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This component is mainly deals with ReactJs Agora Video/Audio calls
          </DialogContentText>
          <RTCFunc video={handleClose} />
        </DialogContent>

        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Call
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            End
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
