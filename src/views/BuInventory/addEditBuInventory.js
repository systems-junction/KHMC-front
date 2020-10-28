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
  addBuInventoryUrl,
  updateBuInventoryUrl,
  getItemsUrl,
} from "../../public/endpoins";

import Header from "../../components/Header/Header";

import view_all from "../../assets/img/view_all.png";
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
    marginTop: 25,
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

const useStyles = makeStyles(styles);

function AddEditBuInventory(props) {
  const initialState = {
    _id: "",
    itemId: "",
    qty: "",
    businessUnits: [],
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { _id, itemId, qty, businessUnits } = state;

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

  const [items, setItems] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [buId, setBU] = useState("");

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

    setBU(props.history.location.state.buId);
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
      const params = { buId: buId._id, itemId, qty };
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
    // console.log("simple id", _id);
    // console.log("bu id", buId._id);

    if (qty) {
      const params = { _id: _id, buId: buId._id, itemId, qty };
      console.log(params)
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
      <Header history={props.history}/>

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={functional_Unit} />
            <h4>
              {comingFor === "add" ? " Add FU Inventory" : " Edit FU Inventory"}
            </h4>
          </div>

          <div>
            <img onClick={() => props.history.goBack()} src={view_all} />
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
            </div> */}

                <div className="col-md-12">
                  <div style={styles.inputContainerForDropDown}>
                    <InputLabelComponent>Item</InputLabelComponent>
                    <Select
                      fullWidth
                      labelId="itemId-label"
                      id="itemId"
                      name="itemId"
                      value={itemId}
                      onChange={onChangeValue}
                      label="Item"
                      className="dropDownStyle"
                      input={<BootstrapInput />}
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
                    </Select>
                  </div>
                </div>

                <div
                  className="col-md-12"
                  style={styles.inputContainerForTextField}
                >
                  <InputLabelComponent>Quantity</InputLabelComponent>

                  <input
                    type="number"
                    placeholder="Quantity"
                    name={"qty"}
                    value={qty}
                    onChange={onChangeValue}
                    className="textInputStyle"
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
              style={{ width: 60, height: 40, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBuInventory;
