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
import {
  addFuInventoryUrl,
  updateFuInventoryUrl,
  getItemsUrl,
} from "../../public/endpoins";

import Header from "../../components/Header/Header";

import view_all from "../../assets/img/Eye.png";
import functional_Unit from "../../assets/img/Functional Unit.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import BootstrapInput from "../../components/Dropdown/dropDown.js";

import ErrorMessage from "../../components/ErrorMessage/errorMessage";

import InputLabelComponent from "../../components/InputLabel/inputLabel";

import Loader from "react-loader-spinner";

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   marginLeft: 5,
  //   marginRight: 5,
  // },

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
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  inputField: {
    outline: "none",
  },
  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    width: "60%",
    height: "50px",
    outline: "none",
  },

  inputContainerForDropDown: {
    marginTop: 25,
    // backgroundColor: "white",
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 2,
  },
};

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 6,
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
  multilineColor: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:hover": {
      backgroundColor: "white",
    },
    "&:after": {
      borderBottomColor: "black",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));

function AddEditBuInventory(props) {
  const classes = useStyles();
  const initialState = {
    _id: "",
    buId: "",
    itemId: "",
    qty: "",
    maximumLevel: "",
    minimumLevel: "",
    reorderLevel: "",
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
    itemId,
    qty,
    businessUnits,

    maximumLevel,
    minimumLevel,
    reorderLevel,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    // let res = false;
    // if (qty) {
    //   res = true;
    // }
    // return res;

    return (
      qty !== "" &&
      qty !== "0" &&
      maximumLevel !== "" &&
      maximumLevel !== "0" &&
      itemId !== "" &&
      reorderLevel !== "" &&
      reorderLevel !== "0"
    );
  }

  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [items, setItems] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [fuId, setFU] = useState("");

  function getItems() {
    axios
      .get(getItemsUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("items", res.data.data.items);
          setItems(res.data.data.items);
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
    getItems();

    setFU(props.history.location.state.fuId);
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
      let params = "";

      if (props.match.path === "/home/controlroom/fus/fuinventory/add/:id") {
        params = {
          fuId: props.match.params.id,
          itemId,
          qty,
          maximumLevel,
          minimumLevel,
          reorderLevel,
        };
      } else {
        params = {
          fuId: fuId._id,
          itemId,
          qty,
          maximumLevel,
          minimumLevel,
          reorderLevel,
        };
      }

      axios
        .post(addFuInventoryUrl, params)
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
      // const params = { _id, fuId: fuId._id, itemId, qty };

      let params = "";

      if (props.match.path === "/home/controlroom/fus/fuinventory/edit/:id") {
        params = {
          _id,
          fuId: props.match.params.id,
          itemId,
          qty,
          maximumLevel,
          minimumLevel,
          reorderLevel,
        };
      } else {
        params = {
          _id,
          fuId: fuId._id,
          itemId,
          qty,
          maximumLevel,
          minimumLevel,
          reorderLevel,
        };
      }

      axios
        .put(updateFuInventoryUrl, params)
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
      <Header />

      <div className={`cPadding ${classes.root}`}>
        <div className="subheader">
          <div>
            <img src={functional_Unit} />
            <h4>
              {comingFor === "add" ? " Add FU Inventory" : " Edit FU Inventory"}
            </h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img src={view_all} style={styles.stylesForIcon} />
              &nbsp;&nbsp;
              <strong>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div
          style={{ flex: 4, display: "flex", flexDirection: "column" }}
          className="container"
        >
          {items !== "" ? (
            <div>
              <div className="row">
                {/* <div className="col-md-12">
              <div style={styles.inputContainerForDropDown}>
                <InputLabel id='buId-label'>Business Unit</InputLabel>
                <Select
                  style={styles.inputField}
                  fullWidth
                  labelId='buId-label'
                  id='buId'
                  name='buId'
                  value={buId}
                  onChange={onChangeValue}
                  label='Business Unit'
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {businessUnits.map((val, key) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.buName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </div>

               </div> */}

                <div
                  className="col-md-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    select
                    fullWidth
                    id="itemId"
                    name="itemId"
                    value={itemId}
                    error={itemId === "" && isFormSubmitted}
                    onChange={onChangeValue}
                    label="Item"
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
                    label="Quantity"
                    name={"qty"}
                    value={qty}
                    error={qty === "" && isFormSubmitted}
                    onChange={(e) => onChangeValue(e)}
                    className="textInputStyle"
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
                    error={maximumLevel === "" && isFormSubmitted}
                    onChange={(e) => onChangeValue(e)}
                    className="textInputStyle"
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
                    error={minimumLevel === "" && isFormSubmitted}
                    onChange={(e) => onChangeValue(e)}
                    className="textInputStyle"
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
                    error={reorderLevel === "" && isFormSubmitted}
                    onChange={(e) => onChangeValue(e)}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", flex: 1, justifyContent: "center" }}
              >
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
                      Add FU Inventory
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "60%" }}
                      disabled={!validateForm()}
                      onClick={handleEdit}
                      variant="contained"
                      color="primary"
                    >
                      Edit FU Inventory
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="LoaderStyle">
              <Loader type="TailSpin" color="red" height={50} width={50} />
            </div>
          )}

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 45, height: 35, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBuInventory;
