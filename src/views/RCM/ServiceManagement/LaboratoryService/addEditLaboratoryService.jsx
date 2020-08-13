import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  addLaboratoryServiceUrl,
  updateLaboratoryServiceUrl,
} from "../../../../public/endpoins";
import RadiologyDepartment from "../../../../assets/img/Radiology Department.png";
import Header from "../../../../components/Header/Header";
import view_all from "../../../../assets/img/Eye.png";
import Back from "../../../../assets/img/Back_Arrow.png";
import "../../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import InputLabelComponent from "../../../../components/InputLabel/inputLabel";
import BootstrapInput from "../../../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../../../components/ErrorMessage/errorMessage";

import Notification from "../../../../components/Snackbar/Notification.js";

const statusArray = [
  { key: "active", value: "Active" },
  { key: "in_active", value: "In Active" },
];

const styles = {
  inputField: {
    outline: "none",
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
  stylesForADD: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    width: "60%",
    height: "50px",
    outline: "none",
  },

  inputContainerForTextField: {
    marginTop: 25,
    outline: "none",
  },

  inputContainerForDropDown: {
    marginTop: 25,
  },
};

function AddEditVendor(props) {
  const modalStyle = {
    backgroundColor: "#5074f4",
    borderRadius: 30,
    height: "80%",
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    position: "fixed",
  };

  const initialState = {
    _id: "",
    name: "",
    description: "",
    serviceNo: "",
    price: "",
    status: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { _id, name, description, serviceNo, price, status } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
      name.length > 0 &&
      description.length > 0 &&
      status.length > 0 &&
      price.length > 0
    );
  }

  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

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
  }, []);

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true);
      setOpenNotification(true);
      setErrorMsg("Please fill the fields properly");
    } else {
      if (validateForm()) {
        const params = {
          name,
          description,
          serviceNo,
          price,
          status,
        };
        console.log("param for laboratory", params);
        axios
          .post(addLaboratoryServiceUrl, params)
          .then((res) => {
            if (res.data.success) {
              console.log("response is", res.data.data);
              props.history.goBack();
            } else if (!res.data.success) {
              setOpenNotification(true);
            }
          })
          .catch((e) => {
            console.log("error after adding Lab Service", e);
            setOpenNotification(true);
            setErrorMsg("Error while adding Lab Service");
          });
      }
    }
  };

  const handleEdit = () => 
  {
    // if (!validateForm()) {
    //   setIsFormSubmitted(true);
    //   setOpenNotification(true);
    //   setErrorMsg("Please fill the fields properly");
    // } else {
      // if (validateForm()) {
        const params = {
          _id,
          name,
          description,
          serviceNo,
          price,
          status,
        };
        axios
          .put(updateLaboratoryServiceUrl, params)
          .then((res) => {
            if (res.data.success) {
            } else {
              props.history.goBack();
            }
          })
          .catch((e) => {
            console.log("error after updating vendor", e);
          });
      // }
    // }
  }

  if (openNotification) {
    setTimeout(() => {
      console.log("called");
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  return (
    <section
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
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={RadiologyDepartment} />
            <h4>
              {comingFor === "add"
                ? " Laboratory Service"
                : " Laboratory Service"}
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

        <div className="">
          {comingFor === "edit" ? (
            <div className="row">
              <div
                className="col-md-12"
                style={styles.inputContainerForTextField}
              >
                <InputLabelComponent>Service Id*</InputLabelComponent>
                <input
                  disabled={true}
                  style={styles.inputField}
                  type="text"
                  placeholder="Service Id"
                  name={"serviceNo"}
                  value={serviceNo}
                  className="textInputStyle"
                />
              </div>
            </div>
          ) : (
            undefined
          )}

          <div className="row">
            <div className="col-md-6" style={styles.inputContainerForTextField}>
              <InputLabelComponent>Name*</InputLabelComponent>
              <input
                style={styles.inputField}
                type="text"
                placeholder="Name"
                name={"name"}
                value={name}
                onChange={onChangeValue}
                className="textInputStyle"
              />

              <ErrorMessage name={name} isFormSubmitted={isFormSubmitted} />
            </div>

            <div className="col-md-6" style={styles.inputContainerForTextField}>
              <InputLabelComponent>Price*</InputLabelComponent>
              <input
                style={styles.inputField}
                type="number"
                placeholder="Price"
                name={"price"}
                value={price}
                onChange={onChangeValue}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
              <ErrorMessage name={price} isFormSubmitted={isFormSubmitted} />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabelComponent>Description*</InputLabelComponent>
              <input
                style={styles.inputField}
                type="text"
                placeholder="Description"
                name={"description"}
                value={description}
                onChange={onChangeValue}
                className="textInputStyle"
              />
              <ErrorMessage
                name={description}
                isFormSubmitted={isFormSubmitted}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12"
              style={styles.inputContainerForTextField}
            >
              <InputLabelComponent>Status*</InputLabelComponent>

              <Select
                style={styles.inputField}
                fullWidth
                id="status"
                name="status"
                value={status}
                onChange={onChangeValue}
                label="Status"
                className="dropDownStyle"
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {statusArray &&
                  statusArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
              </Select>

              <ErrorMessage name={status} isFormSubmitted={isFormSubmitted} />
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
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
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                  style={styles.stylesForADD}
                >
                  Add
                </Button>
              ) : (
                <Button
                  className="pl30 pr30"
                  // disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                  style={{ width: "60%" }}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back}
            style={{ width: 45, height: 35, cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
}
export default AddEditVendor;
