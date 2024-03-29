/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import tableStyles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import Notification from "../../../components/Snackbar/Notification.js";
import cookie from "react-cookies";
import Dialog from "@material-ui/core/Dialog";
import {
  addAccessLevelUrl,
  updateAccessLevelUrl,
} from "../../../public/endpoins";

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

const readAccess = [
  {
    key: "false",
    value: "Not Allow",
  },
  {
    key: "true",
    value: "Allow",
  },
];
const writeAccess = [
  {
    key: "false",
    value: "Not Allow",
  },
  {
    key: "true",
    value: "Allow",
  },
];
const updateAccess = [
  {
    key: "false",
    value: "Not Allow",
  },
  {
    key: "true",
    value: "Allow",
  },
];
const delAccess = [
  {
    key: "false",
    value: "Not Allow",
  },
  {
    key: "true",
    value: "Allow",
  },
];
function AddEditAccessLevel(props) {
  const classes = useStyles();
  const initialState = {
    _id: "",
    name: "",
    read: "",
    write: "",
    update: "",
    del: "",
    systemAdminId: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { _id, name, read, write, update, del, systemAdminId } = state;
  const [comingFor, setcomingFor] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [systemAdminArray, setSystemAdminArray] = useState("");
  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));
    setcomingFor(props.history.location.state.comingFor);
    setSystemAdminArray(props.history.location.state.systemAdminArray);

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

  function validateForm() {
    return name && name.length > 0;
  }

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        name,
        read,
        write,
        update,
        del,
        systemAdminId,
      };
      axios
        .post(addAccessLevelUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after adding access level", e);
          setOpenNotification(true);
          setErrorMsg("Error while adding the access level");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
        _id,
        name,
        read,
        write,
        update,
        del,
        systemAdminId,
      };
      axios
        .put(updateAccessLevelUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack();
          } else if (!res.data.success) {
            setOpenNotification(true);
          }
        })
        .catch((e) => {
          console.log("error after updating access level", e);
          setOpenNotification(true);
          setErrorMsg("Error while editing the access level");
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
      <div
        style={{
          alignItems: "center",
          // flex: 1,
          // display: "flex",
          marginTop: 15,
        }}
      >
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
            {comingFor === "add" ? " Add Access Level" : " Edit Access Level"}
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
          <div className="col-md-12">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                type="text"
                value={name}
                onChange={onChangeValue}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="status-label">Read Access</InputLabel>
              <Select
                fullWidth
                id="read"
                name="read"
                value={read}
                onChange={onChangeValue}
                label="Read Access"
              >
                {readAccess &&
                  readAccess.map((val) => {
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
              <InputLabel id="status-label">Write Access</InputLabel>
              <Select
                fullWidth
                id="write"
                name="write"
                value={write}
                onChange={onChangeValue}
                label="Write Access"
              >
                {writeAccess &&
                  writeAccess.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
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
              <InputLabel id="status-label">Update Access</InputLabel>
              <Select
                fullWidth
                id="update"
                name="update"
                value={update}
                onChange={onChangeValue}
                label="Update Access"
              >
                {updateAccess &&
                  updateAccess.map((val) => {
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
              <InputLabel id="status-label">Delete Access</InputLabel>
              <Select
                fullWidth
                id="del"
                name="del"
                value={del}
                onChange={onChangeValue}
                label="Delete Access"
              >
                {delAccess &&
                  delAccess.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
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
                Add Access Level
              </Button>
            ) : (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit Access Level
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
export default AddEditAccessLevel;
