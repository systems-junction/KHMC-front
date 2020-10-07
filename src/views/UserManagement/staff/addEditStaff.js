/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import BootstrapInput from "../../../components/Dropdown/dropDown.js";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import { addStaffUrl, updateStaffTUrl } from "../../../public/endpoins";

import Header from "../../../components/Header/Header";

import View_all from "../../../assets/img/Eye.png";
import business_Unit from "../../../assets/img/Staff.png";

import Back_Arrow from "../../../assets/img/Back_Arrow.png";
import "./staff.css";

import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import ViewAllBtn from "../../../components/ViewAllBtn/viewAll";
import FunctionalUnit from "../../FunctionalUnit/functionalUnit.jsx";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2c6ddd",
    width: "115px",
    height: "40px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    // borderRadius: 10,
    // backgroundColor: "#2c6ddd",
    width: "100px",
    height: "45px",
    outline: "none",
  },
  inputField: {
    outline: "none",
  },

  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  input: {
    display: "none",
  },

  buttonContainer: {
    marginTop: 25,
  },
};

const useStyles = makeStyles((theme) => ({
  // margin: {
  //   margin: theme.spacing(0),
  // },
  // input: {
  //   backgroundColor: "white",
  //   borderRadius: 6,
  //   "&:after": {
  //     borderBottomColor: "black",
  //   },
  //   "&:hover": {
  //     backgroundColor: "white",
  //   },
  //   "&:disabled": {
  //     color: "gray",
  //   },
  // },
  // multilineColor: {
  //   backgroundColor: "white",
  //   borderRadius: 6,
  //   "&:hover": {
  //     backgroundColor: "white",
  //   },
  //   "&:after": {
  //     borderBottomColor: "black",
  //   },
  // },
  // root: {
  //   "& .MuiTextField-root": {
  //     backgroundColor: "white",
  //   },
  //   "& .Mui-focused": {
  //     backgroundColor: "white",
  //     color: "black",
  //   },
  // },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 4,
    "&:placeholder": {
      // color: "gray",
      // fontWeight: "400",
    },
    "&:before": {
      borderBottomWidth: "0px",
    },
    "&:after": {
      color: "black",
    },
  },
}));

const statues = [
  {
    key: "active",
    value: "Active",
  },
  {
    key: "in_active",
    value: "In Active",
  },
];

const genderArray = [
  {
    key: "male",
    value: "Male",
  },
  {
    key: "female",
    value: "Female",
  },
  {
    key: "others",
    value: "Others",
  },
];

function AddEditStaff(props) {
  const classes = useStyles();
  const initialState = {
    _id: "",
    staffTypeId: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    password: "",
    contactNumber: "",
    identificationNumber: "",
    gender: "",
    dob: "",
    address: "",
    systemAdminId: "",
    status: "",

    functionalUnit: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    _id,
    staffTypeId,
    firstName,
    lastName,
    designation,
    email,
    password,
    contactNumber,
    identificationNumber,
    gender,
    dob,
    address,
    systemAdminId,
    status,
    functionalUnit,
  } = state;

  const [comingFor, setcomingFor] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [systemAdminArray, setSystemAdminArray] = useState("");
  const [staffTypeArray, setStaffTypesArray] = useState("");
  const [functinalUnits, setFUs] = useState("");

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));
    setcomingFor(props.history.location.state.comingFor);
    setSystemAdminArray(props.history.location.state.systemAdminArray);
    setStaffTypesArray(props.history.location.state.staffTypeArray);
    setFUs(props.history.location.state.functinalUnits);

    const selectedRec = props.history.location.state.selectedItem;

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          dispatch({ field: key, value: val._id });
        } else {
          dispatch({ field: key, value: val });
        }
      });
    }
  }, []);

  function onChangeDate(value, type) {
    dispatch({ field: type, value });
  }

  function validateForm() {
    return (
      firstName &&
      firstName.length > 0 &&
      lastName &&
      lastName.length > 0 &&
      staffTypeId &&
      staffTypeId.length > 0 &&
      designation &&
      designation.length > 0 &&
      email &&
      email.length > 0 &&
      password &&
      password.length >= 3 &&
      contactNumber &&
      contactNumber.length > 0 &&
      identificationNumber &&
      identificationNumber.length > 0 &&
      gender &&
      gender.length > 0 &&
      dob !== "" &&
      status &&
      status.length > 0 &&
      address &&
      address.length > 0 &&
      systemAdminId !== ""
    );
  }

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      let params = {
        staffTypeId,
        firstName,
        lastName,
        designation,
        email,
        password,
        contactNumber,
        identificationNumber,
        gender,
        dob,
        address,
        systemAdminId,
        status,
      };


      if (functionalUnit) {
        params = { ...params, functionalUnit };
      }

      axios
        .post(addStaffUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding purchase request", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the purchase request");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    console.log(functionalUnit)
    
    if (validateForm()) {
      let params = {
        _id,
        staffTypeId,
        firstName,
        lastName,
        designation,
        email,
        password,
        contactNumber,
        identificationNumber,
        gender,
        dob,
        address,
        systemAdminId,
        status,
      };

      if (functionalUnit) {
        params = { ...params, functionalUnit };
      }

      else{
        params = { ...params, functionalUnit:null };
      }
      
      axios
        .put(updateStaffTUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data)
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after updating purchase request", e);
          setOpenNotification(true);
          setErrorMsg("Error while editing the purchase request");
        });
    }
  };

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  return (
    <div
      style={{
        backgroundColor: "#60d69f",
        position: "fixed",
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flex: 1,
        overflowY: "scroll",
      }}
    >
      <Header />
      <div className={`cPadding ${classes.root}`}>
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>{comingFor === "add" ? " Add Staff" : " Edit Staff"}</h4>
          </div>
          {/* <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img src={View_all} className="icon-view" />
              &nbsp;&nbsp;
              <strong style={{ fontSize: "12px" }}>View All</strong>
            </Button>
          </div> */}
          <ViewAllBtn history={props.history} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label="First Name"
                variant="filled"
                name={"firstName"}
                value={firstName}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label="Last Name"
                name={"lastName"}
                value={lastName}
                variant="filled"
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  required
                  format="MM/dd/yyyy hh:mm a"
                  label="Date of Birth (MM/DD/YYYY)"
                  inputVariant="filled"
                  onChange={(val) => onChangeDate(val, "dob")}
                  fullWidth
                  style={{ backgroundColor: "white" }}
                  value={comingFor === "add" ? (dob ? dob : new Date()) : dob}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label="Address"
                variant="filled"
                name={"address"}
                value={address}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                fullWidth
                select
                id="gender"
                name="gender"
                value={gender}
                variant="filled"
                onChange={onChangeValue}
                label="Gender"
                input={<BootstrapInput />}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genderArray &&
                  genderArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id="systemAdminId"
                name="systemAdminId"
                value={systemAdminId}
                onChange={onChangeValue}
                label="Created By"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {systemAdminArray &&
                  systemAdminArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.username}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                fullWidth
                select
                id="staffTypeId"
                name="staffTypeId"
                value={staffTypeId}
                onChange={onChangeValue}
                label="Staff Type"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {staffTypeArray &&
                  staffTypeArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.type}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                id="status"
                name="status"
                variant="filled"
                value={status}
                onChange={onChangeValue}
                label="Status"
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {statues &&
                  statues.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type="number"
                label="ID Number"
                name={"identificationNumber"}
                variant="filled"
                value={identificationNumber}
                onChange={onChangeValue}
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type="email"
                label="Email"
                name={"email"}
                value={email}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                // type="password"
                label="Password"
                name={"password"}
                value={password}
                onChange={onChangeValue}
                variant="filled"
                className="textInputStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label="Designation"
                name={"designation"}
                value={designation}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type="number"
                label="Contact Number"
                name={"contactNumber"}
                value={contactNumber}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                fullWidth
                select
                id="functionalUnit"
                name="functionalUnit"
                value={functionalUnit}
                variant="filled"
                onChange={onChangeValue}
                label="Functional Unit"
                input={<BootstrapInput />}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {functinalUnits &&
                  functinalUnits.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.fuName}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>
          </div>

          <div className="row">
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 45, height: 35, cursor: "pointer" }}
              />

              {comingFor === "add" ? (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Add Staff</strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Edit Staff</strong>
                </Button>
              )}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      </div>
    </div>
  );
}
export default AddEditStaff;
