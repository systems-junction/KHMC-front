/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import axios from "axios";
import { getMargin, createMargin } from "../../public/endpoins";

import cookie from "react-cookies";

import Header from "../../components/Header/Header";

import business_Unit from "../../assets/img/FIN.png";

import Search from "../../assets/img/Search.png";

import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import CustomTable from "../../components/Table/Table";

const tableHeading = ["Warehouse to FuncU", "FuncU to Patient", "Created At"];
const tableDataKeys = ["wtf", "ftp", "date"];

const styles = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },
};

const useStylesForInput = makeStyles((theme) => ({
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:disabled": {
      color: "gray",
    },
  },
  root: {
    "& .MuiFormLabel-root": {
      fontSize: "12px",

      paddingRight: "50px",
    },
  },
}));

const actions = { view: true, print: true };

export default function PurchaseRequest(props) {
  const classesInput = useStylesForInput();

  const [currentUser, setCurrentUser] = useState(cookie.load("current_user"));

  const [margins, setMargins] = useState([]);
  const [vendors, setVendor] = useState("");
  const [statues, setStatus] = useState("");
  const [purchaseRequests, setPurchaseRequests] = useState("");

  const [openNotification, setOpenNotification] = useState(false);

  const [marginFromWarehouseToFU, setMarginFromWarehouseToFU] = useState("");
  const [marginFromFUToPatient, setMarginFromFUToPatient] = useState("");

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  function getPurchaseRequests() {
    axios
      .get(getMargin)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          setMargins(res.data.data.reverse());
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

  useEffect(() => {
    getPurchaseRequests();
  }, []);

  const onChangeValue = (e) => {
    if (e.target.type === "number") {
      if (e.target.value < 0 || e.target.value > 100) {
        return;
      }
    }

    if (e.target.name === "marginFromWarehouseToFU") {
      setMarginFromWarehouseToFU(e.target.value);
    } else if (e.target.name == "marginFromFUToPatient") {
      setMarginFromFUToPatient(e.target.value);
    }
  };

  function addNewMargin() {
    axios
      .post(createMargin, {
        wtf: marginFromWarehouseToFU,
        ftp: marginFromFUToPatient,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          window.location.reload();
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

  function validateForm() {
    return marginFromWarehouseToFU !== "" && marginFromFUToPatient !== "";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#60d69f",
        overflowY: "scroll",
      }}
    >
      <Header history={props.history} />

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Set Margins</h4>
          </div>
        </div>

        <div className={`${"row"}`}>
          <div className="col-md-5" style={styles.textFieldPadding}>
            <TextField
              className="textInputStyle"
              id="marginFromWarehouseToFU"
              type="number"
              variant="filled"
              label="Margin From Warehouse to FuncU(1-100) %"
              name={"marginFromWarehouseToFU"}
              value={marginFromWarehouseToFU}
              onChange={onChangeValue}
              InputProps={{
                className: classesInput.input,
                classes: { input: classesInput.input },
                disableUnderline: true,
              }}
              onKeyDown={(evt) => {
                (evt.key === "e" ||
                  evt.key === "E" ||
                  evt.key === "-" ||
                  evt.key === "+") &&
                  evt.preventDefault();
              }}
            />
          </div>

          <div className="col-md-5" style={styles.textFieldPadding}>
            <TextField
              className="textInputStyle"
              id="marginFromFUToPatient"
              type="number"
              variant="filled"
              label="Margin From FuncU to Patient(1-100) %"
              name={"marginFromFUToPatient"}
              value={marginFromFUToPatient}
              onChange={onChangeValue}
              InputProps={{
                className: classesInput.input,
                classes: { input: classesInput.input },
                disableUnderline: true,
              }}
              onKeyDown={(evt) => {
                (evt.key === "e" ||
                  evt.key === "E" ||
                  evt.key === "-" ||
                  evt.key === "+") &&
                  evt.preventDefault();
              }}
            />
          </div>

          <div className="col-md-2" style={styles.textFieldPadding}>
            <Button
              disabled={!validateForm()}
              style={{ minWidth: "100%", height: 55 }}
              onClick={addNewMargin}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="row">
          <CustomTable
            tableData={margins}
            tableDataKeys={tableDataKeys}
            tableHeading={tableHeading}
            action={""}
            borderBottomColor={"#60d69f"}
            borderBottomWidth={20}
          />
        </div>
      </div>
    </div>
  );
}
