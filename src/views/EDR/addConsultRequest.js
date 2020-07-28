/*eslint-disable*/
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 35,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: '700'
  }
};

const useStyles = makeStyles(styles);

export default function addConsultRequest(props) 
{
  useEffect(() => { }, []);

  return (
    <Dialog
      onClose={() => props.viewItem("")}
      fullWidth={true}
      maxWidth={"lg"}
      bodyStyle={{ backgroundColor: "red" }}
      contentStyle={{ backgroundColor: "red" }}
      aria-labelledby="simple-dialog-title"
      open={props.openItemDialog}
    >
      <DialogContent style={{ backgroundColor: "#31e2aa" }}>
        <DialogTitle id="simple-dialog-title" style={{ color: 'white' }}>Add Consultation Notes</DialogTitle>
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-md-6" style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id="generated-label">Item Code</InputLabel>
              <input
                type="text"
                disabled={true}
                placeholder="Item Code"
                name={"itemCode"}
                value={props.item.itemCode}
                // onChange={onChangeValue}
                className="textInputStyle"
              />
            </div>
            <div className="col-md-6" style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id="generated-label">Item Name</InputLabel>

              <input
                type="text"
                disabled={true}
                placeholder="Name"
                name={"name"}
                value={props.item.name}
                // onChange={onChangeValue}
                className="textInputStyle"
              />
            </div> */}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Button onClick={() => props.viewItem("")} variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
