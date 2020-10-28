/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  addBuRepRequestUrl,
  updateBuRepRequestUrl,
} from "../../public/endpoins";

import Header from "../../components/Header/Header";

import Add_New from "../../assets/img/Add_New.png";
import business_Unit from "../../assets/img/business_Unit.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

const styles = {
  inputContainer: {
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },

  buttonContainer: {
    marginTop: 25,
  },
};

const useStyles = makeStyles(styles);

function AddEditBuRepRequest(props) {
  const initialState = {
    _id: "",
    buId: "",
    requesterStaffId: "",
    timeStamp: "",
    status: "",
    staffs: [],
    businessUnits: [],
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
    buId,
    requesterStaffId,
    timeStamp,
    status,
    staffs,
    businessUnits,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeDate = (value) => {
    dispatch({ field: "timeStamp", value });
  };

  function validateForm() {
    return status && status.length > 0;
  }

  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
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
    if (props.history.location.state.staff) {
      dispatch({ field: "staffs", value: props.history.location.state.staff });
    }
    if (props.history.location.state.businessUnit) {
      dispatch({
        field: "businessUnits",
        value: props.history.location.state.businessUnit,
      });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (status) {
      const params = { buId, requesterStaffId, timeStamp, status };
      axios
        .post(addBuRepRequestUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding bu inventory", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the item");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (status) {
      const params = { _id, buId, requesterStaffId, timeStamp, status };
      axios
        .put(updateBuRepRequestUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding bu inventory", e);
          setOpenNotification(true);
          setErrorMsg("Error while editing the item");
        });
    }
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
        <Header history={props.history}/>
      
      <div style={{ alignItems: "center", flex: 0.5, display: "flex" }}>
        <div
          style={{
            flex: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={business_Unit}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
          <h3
            style={{ color: "white", fontFamily: "Ubuntu", fontWeight: "700" }}
          >
            {comingFor === "add"
              ? " Add BU Rep Request"
              : " Edit BU Rep Request"}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flex: 0.8,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1.5, display: "flex" }}>
            <img
              onClick={() => props.history.goBack()}
              src={Add_New}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      <div
        style={{ flex: 4, display: "flex", flexDirection: "column" }}
        className="container"
      >
        {/* <h1><span> {comingFor === 'add' ? 'Add': 'Edit'}</span></h1> */}

        <div className="row">
          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="bu_id-label">Business Unit</InputLabel>
              <Select
                fullWidth
                id="bu_id"
                name="buId"
                value={buId}
                onChange={onChangeValue}
                label="Business Unit"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {businessUnits.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.buName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>

          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="requesterStaffId-label">Staff</InputLabel>
              <Select
                fullWidth
                labelId="requesterStaffId-label"
                id="requesterStaffId"
                name="requesterStaffId"
                value={requesterStaffId}
                onChange={onChangeValue}
                label="Staff"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {staffs.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.firstName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <MuiPickersUtilsProvider fullWidth utils={DateFnsUtils}>
                <DateTimePicker
                  fullWidth
                  name="timeStamp"
                  inputVariant="outlined"
                  onChange={onChangeDate}
                  value={timeStamp ? timeStamp : new Date()}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>

          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                id="status"
                name="status"
                label="Status"
                type="text"
                //   variant="outlined"
                value={status}
                onChange={onChangeValue}
                error={!status && isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
          {/* <div style={styles.buttonContainer}>
            <Button onClick={handleCancel} variant="contained">
              Cancel
            </Button>
          </div> */}

          <div
            style={{
              display: "flex",
              flex: 1,
              height: 50,
              justifyContent: "center",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          >
            {comingFor === "add" ? (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleAdd}
                variant="contained"
                color="primary"
              >
                Add BU Rep Request
              </Button>
            ) : (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit BU Rep Request
              </Button>
            )}
          </div>
        </div>

        <Notification msg={errorMsg} open={openNotification} />

        <div style={{ marginBottom: 20 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back_Arrow}
            style={{ width: 60, height: 40, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditBuRepRequest;
