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
import { addWhInventoryUrl, updateWhInventoryUrl } from "../../public/endpoins";

import Header from "../../components/Header/Header";

import view_all from "../../assets/img/Eye.png";
import wh_inventory from "../../assets/img/WH Inventory.png";
import Back from "../../assets/img/Back_Arrow.png";
import BootstrapInput from "../../components/Dropdown/dropDown.js";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";

import ViewAll from "../../components/ViewAllBtn/viewAll";

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
  },

  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  inputField: { outline: "none" },

  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    backgroundColor: "#2c6ddd",
    width: "115px",
    height: "40px",
    outline: "none",
  },
  stylesForWHButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    // backgroundColor: "#2c6ddd",
    width: 100,
    height: 45,
    outline: "none",
  },

  buttonContainer: {
    marginTop: 25,
  },
};

const ItemsData = [
  { _id: 1, name: "First Item" },
  { _id: 2, name: "Second Item" },
  { _id: 3, name: "Third Item" },
];

function AddEditWareHouseInventory(props) {
  // const classes = useStyles();

  const classes = useStyleforinput();

  const initialState = {
    _id: "",
    itemId: "",
    qty: "",
    items: "",
    minimumLevel: "",
    maximumLevel: "",
    reorderLevel: "",
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
    itemId,
    qty,
    items,
    minimumLevel,
    maximumLevel,
    reorderLevel,
  } = state;

  const onChangeValue = (e) => {
    // var pattern = /^[a-zA-Z0-9 ]*$/;
    // if (e.target.type === "text") {
    //   if (pattern.test(e.target.value) === false) {
    //     return;
    //   }
    // }
    if (e.target.type === "number" && e.target.value < 0) {
      return;
    }
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    return (
      itemId !== "" &&
      qty !== "" &&
      qty !== "0" &&
      maximumLevel !== "0" &&
      reorderLevel !== "0" &&
      minimumLevel !== "0"
    );
  }

  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [whInventory, setWhInventory] = useState("");

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    setWhInventory(props.history.location.state.whInventory);

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

  function checkValues() {
    if (maximumLevel <= minimumLevel) {
      setOpenNotification(true);
      setErrorMsg("Maximum level should be greater than minimum level");
      return true;
    } else if (reorderLevel <= minimumLevel) {
      setOpenNotification(true);
      setErrorMsg("Reorder level should be greater than minimum level");
      return true;
    } else if (reorderLevel >= maximumLevel) {
      setOpenNotification(true);
      setErrorMsg("Reorder level should be less than maximum level");
      return true;
    } else if (qty > maximumLevel) {
      setOpenNotification(true);
      setErrorMsg("Qty should be less than maximum level");
      return true;
    } else if (qty <= minimumLevel) {
      setOpenNotification(true);
      setErrorMsg("Qty should be greater than minimum level");
      return true;
    } else if (qty <= reorderLevel) {
      setOpenNotification(true);
      setErrorMsg("Qty should be greater than reorder level");
      return true;
    }

    return false;
  }

  const handleAdd = () => {
    // setIsFormSubmitted(true);
    // if (qty && returnReason && returnReason.length > 0) {
    let alreadyAdded = false;
    alreadyAdded = whInventory.find((inv) => inv.itemId._id === itemId);
    console.log(alreadyAdded);
    if (alreadyAdded) {
      setOpenNotification(true);
      setErrorMsg("Item has already been added");
      return;
    }

    if (checkValues()) {
      return;
    }

    const params = {
      qty,
      itemId,
      maximumLevel,
      minimumLevel,
      reorderLevel,
    };
    console.log("params", params);
    axios
      .post(addWhInventoryUrl, params)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          // props.history.goBack();
          props.history.replace({
            pathname: "/home/wms/fus/medicinalorder/success",
            state: {
              message: `New Item has been added successfully`,
            },
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch((e) => {
        console.log("error after adding bu inventory", e);
        setOpenNotification(true);
        setErrorMsg("Error while adding the item");
      });
    // }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);

    let alreadyAdded = false;
    alreadyAdded = whInventory.find((inv) => inv.itemId._id === itemId);
    console.log(alreadyAdded);
    if (alreadyAdded) {
      setOpenNotification(true);
      setErrorMsg("Item has already been added");
      return;
    }

    if (checkValues()) {
      return;
    }
    const params = {
      _id,
      itemId,
      qty,
      maximumLevel,
      minimumLevel,
      reorderLevel,
    };
    axios
      .put(updateWhInventoryUrl, params)
      .then((res) => {
        if (res.data.success) {
          props.history.replace({
            pathname: "/home/wms/fus/medicinalorder/success",
            state: {
              message: `Item has been updated successfully`,
            },
          });
        } else if (!res.data.success) {
          setOpenNotification(true);
        }
      })
      .catch((e) => {
        console.log("error after adding bu inventory", e);
        setOpenNotification(true);
        setErrorMsg("Error while editing the item");
      });
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
        <div className="row">
          <div className="subheader">
            <div>
              <img src={wh_inventory} />
              <h4>
                {comingFor === "add"
                  ? " Add Warehouse Inventory"
                  : "Update Warehouse Inventory"}
              </h4>
            </div>
            <ViewAll history={props.history} />
          </div>
        </div>

        <div style={{ flex: 4, display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                disabled={comingFor && comingFor === "add" ? false : true}
                required
                select
                fullWidth
                id="itemName"
                name="itemId"
                value={itemId}
                onChange={onChangeValue}
                label="Item Name"
                variant="filled"
                className="dropDownStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {items &&
                  items.map((val, key) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.name}
                      </MenuItem>
                    );
                  })}
              </TextField>
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
                type="number"
                label="Quantity"
                name={"qty"}
                value={qty}
                error={qty === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" || evt.key === "+" || evt.key === "-") &&
                  evt.preventDefault()
                }
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
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
                type="number"
                label="Maximum Level"
                name={"maximumLevel"}
                value={maximumLevel}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" ||
                    evt.key === "+" ||
                    evt.key === "-" ||
                    evt.key === "E") &&
                  evt.preventDefault()
                }
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
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
                label="Minimum Level"
                name={"minimumLevel"}
                value={minimumLevel}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" ||
                    evt.key === "+" ||
                    evt.key === "-" ||
                    evt.key === "E") &&
                  evt.preventDefault()
                }
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
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
                label="Reorder Level"
                name={"reorderLevel"}
                value={reorderLevel}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" ||
                    evt.key === "+" ||
                    evt.key === "-" ||
                    evt.key === "E") &&
                  evt.preventDefault()
                }
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            <img
              onClick={() => props.history.goBack()}
              src={Back}
              style={{ width: 45, height: 35, cursor: "pointer" }}
            />

            {comingFor === "add" ? (
              <Button
                style={styles.stylesForWHButton}
                disabled={!validateForm()}
                onClick={handleAdd}
                variant="contained"
                color="primary"
              >
                <strong style={{ fontSize: "12px" }}>Add</strong>
              </Button>
            ) : (
              <Button
                style={styles.stylesForWHButton}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                <strong style={{ fontSize: "12px" }}>Update</strong>
              </Button>
            )}
          </div>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      </div>
    </div>
  );
}
export default AddEditWareHouseInventory;
