import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  addReplenishmentRequestUrlBU,
  updateReplenishmentRequestUrlBU,
  getSearchedPharmaceuticalItemsUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
  getCurrentQtyForBUUrl,
  getFUFromBUUrl,
  getCurrentQtyForBURepRequestUrl,
  getCurrentQtyForFURepRequestUrl,
  getPatientByProfileNo,
} from "../../public/endpoins";

import Paper from "@material-ui/core/Paper";

import cookie from "react-cookies";

import Chip from "@material-ui/core/Chip";

import Dialog from "@material-ui/core/Dialog";
import { tr } from "date-fns/locale";

import Header from "../../components/Header/Header";
import view_all from "../../assets/img/Eye.png";
import purchase_request from "../../assets/img/purchase request.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import Add_New from "../../assets/img/Add_New.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import Loader from "react-loader-spinner";

import add_new from "../../assets/img/Plus.png";

import TableForAddedItems from "./tableforAddedItems";

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "60%",
    height: "50px",
    outline: "none",
  },

  forTableCell: {
    color: "black",
    fontSize: 14,
  },

  stylesForPatientButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "45px",
    // outline: "none",
    // alignSelf:'center'
    marginTop: 30,
  },

  headingStyles: {
    fontWeight: "bold",
    color: "grey",
  },
};
const useStyles = makeStyles(tableStyles);

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

  const [patientDetails, setPatientDetails] = useState("");

  //   function getPatientDetails(pat) {
  //     axios
  //       .get(getPatientByProfileNo + "/" + pat)
  //       .then((res) => {
  //         if (res.data.success) {
  //           console.log("Patient Data", res.data.data[0]);
  //           setPatientDetails(res.data.data[0]);
  //         } else if (!res.data.success) {
  //           setErrorMsg(res.data.error);
  //           setOpenNotification(true);
  //         }
  //         return res;
  //       })
  //       .catch((e) => {
  //         console.log("error: ", e);
  //       });
  //   }

  useEffect(() => {
    setPatientDetails(props.patientDetails);
  }, []);

  return (
    <div>
      <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
        <Dialog
          aria-labelledby="form-dialog-title"
          open={true}
          maxWidth="md"
          // onBackdropClick={() => props.showPatientDetails()}
          // fullWidth={true}
          // fullScreen
        >
          <DialogContent style={{ backgroundColor: "white" }}>
            {/* <DialogTitle id="simple-dialog-title" style={{ color: "blue" }}>
              Patient Details
            </DialogTitle> */}

            <h4 style={{ color: "red" }}>Important</h4>
            <p>
              This medicine can cause {props.allergic} allergy. Are you sure you
              want to continue?
            </p>

            <Button color="primary" onClick={() => props.hideDialog()}>
              Change Medicine
            </Button>
            <Button color="secondary" onClick={() => props.ignoreAllery()}>
              Ignore
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
export default AddEditPurchaseRequest;
