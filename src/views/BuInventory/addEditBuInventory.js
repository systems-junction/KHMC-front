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
import { addBuInventoryUrl, updateBuInventoryUrl } from "../../public/endpoins";

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
    marginLeft: 5,
    marginRight: 5,
  },

  buttonContainer: {
    marginTop: 25,
  },
};

const useStyles = makeStyles(styles);

function AddEditBuInventory(props) {
  const initialState = {
    _id: "",
    buId: "",
    itemId: "",
    qty: "",
    items: [],
    businessUnits: [],
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { _id, buId, itemId, qty, items, businessUnits } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    let res = false;
    if (qty) {
      res = true;
    }
    return res;
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
    if (props.history.location.state.items) {
      dispatch({ field: "items", value: props.history.location.state.items });
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
    if (qty) {
      const params = { buId, itemId, qty };
      axios
        .post(addBuInventoryUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response after adding item", res);
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
    if (qty) {
      const params = { _id, buId, itemId, qty };
      axios
        .put(updateBuInventoryUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response after adding item", res);
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
      <div style={{ alignItems: "center", flex: 1, display: "flex" }}>
        <Header />
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
            {comingFor === "add" ? " Add BU Inventory" : " Edit BU Inventory"}
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
        {/* <h1>
        <span> {comingFor === "add" ? "Add" : "Edit"}</span>
      </h1> */}

        <div className="row">
          <div className="col-md-12" style={styles.inputContainer}>
            <InputLabel id="buId-label">Business Unit</InputLabel>
            <Select
              fullWidth
              labelId="buId-label"
              id="buId"
              name="buId"
              value={buId}
              onChange={onChangeValue}
              label="Business Unit"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {businessUnits.map((val, key) => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.buName}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          <div className="col-md-12" style={styles.inputContainer}>
            <InputLabel id="itemId-label">Item</InputLabel>
            <Select
              fullWidth
              labelId="itemId-label"
              id="itemId"
              name="itemId"
              value={itemId}
              onChange={onChangeValue}
              label="Item"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items.map((val, key) => {
                return (
                  <MenuItem key={val._id} value={val._id}>
                    {val.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>

          <div className="col-md-12" style={styles.inputContainer}>
            <TextField
              fullWidth
              id="quantity"
              name="qty"
              label="Quantity"
              type="number"
              // variant="outlined"
              value={qty}
              min="0"
              onChange={onChangeValue}
              error={!qty && isFormSubmitted}
            />
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
                Add BU Inventory
              </Button>
            ) : (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit BU Inventory
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

export default AddEditBuInventory;
