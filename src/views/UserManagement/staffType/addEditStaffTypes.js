import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import tableStyles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../../components/Snackbar/Notification.js";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import cookie from "react-cookies";
import { addStaffTypeUrl, updateStaffTypeUrl } from "../../../public/endpoins";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Header from "../../../components/Header/Header";
import Add_New from "../../../assets/img/Add_New.png";
import business_Unit from "../../../assets/img/business_Unit.png";
import Back_Arrow from "../../../assets/img/Back_Arrow.png";

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

const useStyles = makeStyles(tableStyles);

const DATE = new Date();

const time = DATE.getHours();

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

function AddEditStaffTypes(props) {
  const classes = useStyles();

  const initialState = {
    _id: "",
    status: "",
    description: "",
    accessLevelId: "",
    type: "",
    systemAdminId: "",
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
    status,
    description,
    accessLevelId,
    type,
    systemAdminId,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function onChangeDate(value, t) {
    dispatch({ field: t, value });
  }

  function validateForm() {
    return (
      status.length > 0 &&
      accessLevelId.length > 0 &&
      description.length > 0 &&
      type.length > 0
    );
  }

  const [comingFor, setcomingFor] = useState("");

  const [systemAdminArray, setSystemAdminArray] = useState("");
  const [accessLevelArray, setAccessLevelArray] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));
    setcomingFor(props.history.location.state.comingFor);
    setAccessLevelArray(props.history.location.state.accessLevelArray);
    console.log(props.history.location.state.accessLevelArray, "test");
    setSystemAdminArray(props.history.location.state.systemAdminArray);
    for (let i = 0; i < systemAdminArray.length; i++) {
      if (systemAdminArray[i]._id === currentUser._id) {
        dispatch({
          field: "systemAdminId",
          value: currentUser._id,
        });
      }
    }
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

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    if (validateForm()) {
      let params = {
        type,
        accessLevelId,
        description,
        status,
        systemAdminId,
        // systemAdminId: currentUser._id,
      };
      axios
        .post(addStaffTypeUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding staff type", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the staff type");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        type,
        accessLevelId,
        description,
        status,
        systemAdminId,
        // systemAdminId: currentUser._id,
      };
      axios
        .put(updateStaffTypeUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after updating staff type", e);
          setOpenNotification(true);
          setErrorMsg("Error while editing the staff type");
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
      <div style={{ alignItems: "center", marginTop: 15 }}>
        <Header history={props.history}/>
      </div>

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
            {comingFor === "add" ? " Add Staff Type" : " Edit Staff Type"}
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
        <div className="row">
          <div className="col-md-6">
            <div style={styles.inputContainer}>
              {/* <TextField
            fullWidth
            name="type"
            label="Type"
            type="text"
            variant="outlined"
            value={type}
            onChange={onChangeValue}
          /> */}

              <TextField
                fullWidth
                name="type"
                label="Staff Type"
                type="text"
                // variant="outlined"
                value={type}
                onChange={onChangeValue}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="status-label">Access Level</InputLabel>
              <Select
                fullWidth
                id="accessLevelId"
                name="accessLevelId"
                value={accessLevelId}
                onChange={onChangeValue}
                label="Access Level"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {accessLevelArray &&
                  accessLevelArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.name}
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
              {/* <TextField
            fullWidth
            name="status"
            label="Status"
            type="text"
            variant="outlined"
            value={status}
            onChange={onChangeValue}
          /> */}

              <InputLabel id="status-label">Status</InputLabel>
              <Select
                fullWidth
                id="status"
                name="status"
                value={status}
                onChange={onChangeValue}
                label="Status"
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
              </Select>
            </div>
          </div>
          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="vendorId-label">Created By</InputLabel>
              <Select
                fullWidth
                id="systemAdminId"
                name="systemAdminId"
                value={systemAdminId}
                onChange={onChangeValue}
                label="Created By"
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
              </Select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                type="text"
                // variant="outlined"
                value={description}
                onChange={onChangeValue}
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
                Add Staff Type
              </Button>
            ) : (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit Staff Type
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
export default AddEditStaffTypes;
