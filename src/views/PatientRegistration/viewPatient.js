import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import { MdModeEdit } from "react-icons/md";

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
    fontWeight: "700",
    color: "WhiteSmoke",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "120px",
    height: "45px",
  },
};

const useStyles = makeStyles(styles);

export default function ViewPatient(props) {
  const classes = useStyles();

  useEffect(() => {
    console.log("props.item", props.item);
  });

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

  return (
    <Dialog
      onClose={() => props.viewItem("")}
      fullWidth={true}
      maxWidth={"lg"}
      bodyStyle={{ backgroundColor: "red" }}
      contentStyle={{ backgroundColor: "red" }}
      aria-labelledby="simple-dialog-title"
      open={true}
    >
      <DialogContent style={{ backgroundColor: "#31e2aa" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-start">
              <DialogTitle
                id="simple-dialog-title"
                style={{ color: "#2c6ddd", marginLeft: '-12px'}}
              >
                Patient Details
              </DialogTitle>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                MRN
              </InputLabel>
              <h6>{props.item.profileNo}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Patient Name
              </InputLabel>
              <h6>{props.item.firstName + ` ` + props.item.lastName}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Age
              </InputLabel>
              <h6>{props.item.age}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Gender
              </InputLabel>
              <h6>{props.item.gender}</h6>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                SIN
              </InputLabel>
              <h6>{props.item.SIN}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Address
              </InputLabel>
              <h6>{props.item.address}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                City
              </InputLabel>
              <h6>{props.item.city}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Country
              </InputLabel>
              <h6>{props.item.country}</h6>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Phone Number
              </InputLabel>
              <h6>{props.item.phoneNumber}</h6>
            </div>
            <div
              className="col-md-3 col-sm-3 col-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabel style={styles.styleForLabel} id="generated-label">
                Other Details
              </InputLabel>
              <h6 style={{ textAlign: "justify"}}>{props.item.otherDetails}</h6>
            </div>
          </div>

          <hr />

          {props.item.paymentMethod && props.item.paymentMethod === "Cash" ? (
            <div>
              <div className="row">
                <div className="d-flex justify-content-start">
                  <DialogTitle
                    id="simple-dialog-title"
                    style={{ color: "#2c6ddd", marginLeft: '-12px' }}
                  >
                    Payment Method (Uninsured)
                  </DialogTitle>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-4 col-sm-4 col-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Payment Method
                  </InputLabel>
                  <h6>{props.item.paymentMethod}</h6>
                </div>
            
                <div
                  className="col-md-4 col-sm-4 col-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Depositor Name
                  </InputLabel>
                  <h6>{props.item.depositorName}</h6>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Amount Received
                  </InputLabel>
                  <h6>{props.item.amountReceived}</h6>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-md-4 col-sm-4 col-6"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Date/Time
                  </InputLabel>
                  <h6>{formatDate(props.item.updatedAt)}</h6>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-6"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Receiver Name
                  </InputLabel>
                  <h6>{`${props.item.firstName} ${props.item.lastName}`}</h6>
                </div>
              </div>

              <hr />
            </div>
          ) : props.item.paymentMethod &&
            props.item.paymentMethod === "Insurance" ? (
            <div>
              <div className="row">
                <div className="d-flex justify-content-start">
                  <DialogTitle
                    id="simple-dialog-title"
                    style={{ color: "#2c6ddd", marginLeft: -12 }}
                  >
                    Payment Method (Insured)
                  </DialogTitle>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-4 col-sm-4 col-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Insurance No
                  </InputLabel>
                  <h6>{props.item.insuranceNo}</h6>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Insurance Vendor
                  </InputLabel>
                  <h6>{props.item.insuranceVendor}</h6>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Coverage Details
                  </InputLabel>
                  <h6 style={{ textAlign: "justify"}}>{props.item.coverageDetails}</h6>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-md-4 col-sm-4 col-6"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Coverage Terms
                  </InputLabel>
                  <h6>{props.item.coverageTerms}</h6>
                </div>
                <div
                  className="col-md-4 col-sm-4 col-6"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Co-Payment %
                  </InputLabel>
                  <h6>{props.item.payment}</h6>
                </div>
              </div>

              <hr />
            </div>
          ) : (
            undefined
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Button
                style={styles.stylesForButton}
                onClick={() => props.handleEdit(props.item)}
                variant="contained"
              >
                <MdModeEdit size="16px" />
                &nbsp;&nbsp;Edit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
