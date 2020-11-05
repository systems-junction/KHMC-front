import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@material-ui/core/styles";
import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import { addItemUrl, updateItemUrl } from "../../public/endpoins";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Header from "../../components/Header/Header";
import items from "../../assets/img/Items Mgmt.png";
import view_all from "../../assets/img/Eye.png";
import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import InputLabelComponent from "../../components/InputLabel/inputLabel";

import BootstrapInput from "../../components/Dropdown/dropDown.js";

// import { Formik, Form, Field, ErrorMessage } from "formik";

import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import capitalizeFirstLetter from "../../public/capitilizeLetter";
import AvaliabilityComponent from "../../components/Avaliability/avaliability";
import ViewAllBtn from "../../components/ViewAllBtn/viewAll";
import useStyleforinput from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import MUIStyleForInputForCurrency from "../../../src/assets/jss/material-dashboard-react/inputStylesForCurrency.js";


const unit = [
  {
    key: "kg",
    value: "Kg",
  },
  {
    key: "mg",
    value: "Mg",
  },
  {
    key: "cm",
    value: "Cm",
  },
  {
    key: "dm",
    value: "Dm",
  },
];

const con = [
  {
    key: "NO",
    value: "No",
  },
  {
    key: "YES",
    value: "Yes",
  },
];

const formArray = [
  { key: "Tablet", value: "Tablet" },
  { key: "Powder", value: "Powder" },
  { key: "Syrup", value: "Syrup" },
  { key: "Capsule", value: "Capsule" },
  // { key: "Liquid", value: "Liquid" },
];

const styles = {
  inputContainerForTextField: {
    marginTop: 6,
    marginBottom: 20,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },

  stylesForLabel: {
    fontWeight: "700",
    color: "white",
  },

  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    // backgroundColor: "#2C6DDD",
    width: 150,
    height: "50px",
    outline: "none",
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const useStyles = makeStyles(tableStyles);

function AddItems(props) {
  const classes = useStyleforinput();
  const classesForInputForCurrency = MUIStyleForInputForCurrency();

  const initialState = {
    _id: "",
    name: "",
    description: "",
    subClass: "",
    itemCode: "",
    receiptUnit: "",
    issueUnit: "",
    vendorId: "",
    purchasePrice: "",
    minimumLevel: "",
    maximumLevel: "",
    reorderLevel: "",
    vendors: [],
    units: [],
    cls: "",
    medClass: "",
    grandSubClass: "",
    form: "",
    comments: "",
    tax: "",
    receiptUnitCost: "",
    issueUnitCost: "",
    scientificName: "",
    tradeName: "",
    temperature: "",
    humidity: "",
    expiration: "",
    lightSensitive: "",
    resuableItem: "",
    storageCondition: "",
    avaliable: "avaliable",
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
    name,
    description,
    subClass,
    itemCode,
    receiptUnit,
    issueUnit,
    vendorId,
    purchasePrice,
    maximumLevel,
    minimumLevel,
    reorderLevel,
    units,
    cls,
    medClass,
    grandSubClass,
    form,
    comments,
    tax,
    receiptUnitCost,
    issueUnitCost,
    scientificName,
    tradeName,
    temperature,
    humidity,
    expiration,
    lightSensitive,
    resuableItem,
    storageCondition,

    avaliable,
  } = state;
  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [mainClasses, setClasses] = useState("");
  const [subClasses, setSubClasses] = useState("");
  const [childSubClass, setChildSubClasses] = useState("");

  const [vendorsArray, setVendorsArray] = useState("");

  const [medClasses, setMedClass] = useState("");

  const [msg, setMsg] = useState("");
  const [tr, setTr] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    setClasses(props.history.location.state.classes);
    setMedClass(props.history.location.state.medClasses);

    setSubClasses(props.history.location.state.subClasses);
    setChildSubClasses(props.history.location.state.grandSubClasses);
    setVendorsArray(props.history.location.state.vendors);

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

    if (props.history.location.state.vendors) {
      dispatch({
        field: "vendors",
        value: props.history.location.state.vendors,
      });
    }
    if (props.history.location.state.units) {
      dispatch({ field: "units", value: props.history.location.state.units });
    }
  }, []);

  const onChangeValue = (e) => {
    var pattern = /^[a-zA-Z0-9 ]*$/;
    if (e.target.type === "text") {
      if (pattern.test(e.target.value) === false) {
        return;
      }
    }

    if (e.target.type === "number") {
      if (e.target.value < 0) {
        return;
      }
    }

    // console.log(e.target.name, e.target.value);
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onChangeValueForClasses = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "cls") {
      dispatch({ field: "medClass", value: "" });
      dispatch({ field: "subClass", value: "" });
      dispatch({ field: "grandSubClass", value: "" });
      dispatch({ field: "form", value: "" });
    } else if (e.target.name === "medClass") {
      dispatch({ field: "subClass", value: "" });
      dispatch({ field: "grandSubClass", value: "" });
      dispatch({ field: "form", value: "" });
    }

    if (e.target.name === "subClass") {
      dispatch({ field: "grandSubClass", value: "" });
    }

    dispatch({ field: e.target.name, value: e.target.value });
  };

  function onChangeDate(value, type) {
    dispatch({ field: type, value });
  }
  function validateForm() {
    const res =
      name !== "" &&
      itemCode !== "" &&
      description !== "" &&
      receiptUnit !== "" &&
      receiptUnitCost !== "" &&
      issueUnit !== "" &&
      issueUnitCost !== "" &&
      vendorId !== "" &&
      purchasePrice !== "" &&
      tax !== "" &&
      cls !== "" &&
      subClass !== "" &&
      grandSubClass !== "" &&
      comments !== "";

    // && maximumLevel !== "" &&
    // minimumLevel !== "" &&
    // reorderLevel !== "";

    return res;
  }

  const handleCancel = () => {
    props.history.goBack();
  };

  function validateValues() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (parseInt(tax) > 100 || parseInt(tax) < 0) {
      setOpenNotification(true);
      setErrorMsg("Please add tax value in the range of 0-100");
      return false;
    }

    return true;
  }

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true);
    } else if (validateForm()) {
      if (!validateValues()) {
        return;
      }
      const params = {
        name,
        itemCode,
        description,
        receiptUnit,
        issueUnit,
        receiptUnitCost,
        issueUnitCost,
        vendorId,
        purchasePrice: purchasePrice.toString(),
        tax: parseInt(tax),
        maximumLevel,
        minimumLevel,
        reorderLevel,
        cls,
        medClass,
        subClass,
        form,
        grandSubClass,
        scientificName,
        tradeName,
        temperature,
        humidity,
        expiration,
        lightSensitive,
        resuableItem,
        storageCondition,
        comments,
      };

      console.log("params for item", params);

      axios
        .post(addItemUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response after adding item", res);
            props.history.goBack();
          } else if (!res.data.success) {
            setTr(true);
          }
        })
        .catch((e) => {
          console.log("error after adding item", e);
          setTr(true);
          setMsg("Error while adding the item");
        });
    }
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      if (!validateValues()) {
        return;
      }
      const params = {
        _id,
        name,
        itemCode,
        description,
        receiptUnit,
        issueUnit,
        receiptUnitCost,
        issueUnitCost,
        vendorId,
        purchasePrice: purchasePrice.toString(),
        tax: parseInt(tax),
        maximumLevel,
        minimumLevel,
        reorderLevel,
        cls,
        medClass,
        subClass,
        grandSubClass,
        form,
        scientificName,
        tradeName,
        temperature,
        humidity,
        expiration,
        lightSensitive,
        resuableItem,
        storageCondition,
        comments,
      };
      axios
        .put(updateItemUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response after adding item", res);
            props.history.goBack();
          } else if (!res.data.success) {
            setTr(true);
          }
        })
        .catch((e) => {
          console.log("error after adding item", e);
          setTr(true);
          setMsg("Error while updating the item");
        });
    }
  };

  if (tr) {
    setTimeout(() => {
      setTr(false);
      setMsg("");
    }, 2000);
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 4000);
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
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={items} />
            <h4>{comingFor === "AddItems" ? " Add Item" : " Edit Item"}</h4>
          </div>

          <ViewAllBtn history={props.history} />
        </div>
        <div
          className={`container-fluid ${classes.root}`}
          style={{ marginTop: 20 }}
        >
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
                // style={styles.inputField}
                type="text"
                label="Name"
                name={"name"}
                value={name}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={name === "" && isFormSubmitted}
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
                // style={styles.inputField}
                // type="number"
                label="Item Code"
                name={"itemCode"}
                value={itemCode}
                onChange={onChangeValue}
                className="textInputStyle"
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={itemCode === "" && isFormSubmitted}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                // style={styles.inputField}
                required
                type="text"
                label="Description"
                name={"description"}
                value={description}
                error={description === "" && isFormSubmitted}
                onChange={onChangeValue}
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
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                // select
                fullWidth
                id="receiptUnit"
                name="receiptUnit"
                value={receiptUnit}
                error={receiptUnit === "" && isFormSubmitted}
                onChange={onChangeValue}
                label="Receipt Unit"
                variant="filled"
                className="dropDownStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {unit.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
                })} */}
              </TextField>
            </div>
            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                type="number"
                label="Receipt Unit Cost"
                name={"receiptUnitCost"}
                value={receiptUnitCost}
                error={receiptUnitCost === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              /> */}

              <CurrencyTextField
                required
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="receiptUnitCost"
                label="Receipt Unit Cost"
                name={"receiptUnitCost"}
                value={receiptUnitCost}
                // onBlur={onChangeCurrency}
                onChange={(event, value) => {
                  dispatch({ field: "receiptUnitCost", value: value });
                }}
                error={receiptUnitCost === "" && isFormSubmitted}
                variant="filled"
                textAlign="left"
                decimalPlaces={4}
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                currencySymbol="JD"
                // outputFormat="string"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
              />
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                // select
                fullWidth
                id="issueUnit"
                name="issueUnit"
                value={issueUnit}
                error={issueUnit === "" && isFormSubmitted}
                onChange={onChangeValue}
                label="Issue Unit"
                variant="filled"
                className="dropDownStyle"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {unit.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
                })} */}
              </TextField>
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <TextField
                required
                label="Issue Unit Cost"
                name={"issueUnitCost"}
                value={issueUnitCost}
                error={issueUnitCost === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              /> */}

              <CurrencyTextField
                required
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="issueUnitCost"
                label="Issue Unit Cost"
                name={"issueUnitCost"}
                value={issueUnitCost}
                // onBlur={onChangeCurrency}
                onChange={(event, value) => {
                  dispatch({ field: "issueUnitCost", value: value });
                }}
                variant="filled"
                textAlign="left"
                decimalPlaces={4}
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                error={issueUnitCost === "" && isFormSubmitted}
                currencySymbol="JD"
                // outputFormat="string"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
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
                select
                fullWidth
                id="vendorId"
                name="vendorId"
                value={vendorId}
                error={vendorId === "" && isFormSubmitted}
                onChange={onChangeValue}
                label="Vendor"
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
                {vendorsArray &&
                  vendorsArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.englishName}
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
              {/* <TextField
                required
                type="number"
                label="Purchase Price"
                name={"purchasePrice"}
                value={purchasePrice}
                error={purchasePrice === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              /> */}
              <CurrencyTextField
                required
                style={{ backgroundColor: "white", borderRadius: 5 }}
                className="textInputStyle"
                id="purchasePrice"
                label="Purchase Price"
                name={"purchasePrice"}
                value={purchasePrice}
                // onBlur={onChangeCurrency}
                onChange={(event, value) => {
                  dispatch({ field: "purchasePrice", value: value });
                }}
                error={receiptUnitCost === "" && isFormSubmitted}
                variant="filled"
                textAlign="left"
                decimalPlaces={4}
                InputProps={{
                  className: classesForInputForCurrency.input,
                  classes: { input: classesForInputForCurrency.input },
                }}
                InputLabelProps={{
                  className: classesForInputForCurrency.label,
                  classes: { label: classesForInputForCurrency.label },
                }}
                currencySymbol="JD"
                // outputFormat="string"
                onKeyDown={(evt) => evt.key === "-" && evt.preventDefault()}
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
                label="Tax %"
                type="number"
                onKeyDown={(evt) =>
                  (evt.key === "e" ||
                    evt.key === "+" ||
                    evt.key === "-" ||
                    evt.key === "E") &&
                  evt.preventDefault()
                }
                name={"tax"}
                value={tax}
                error={tax === "" && isFormSubmitted}
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
                id="cls"
                name="cls"
                value={cls}
                error={cls === "" && isFormSubmitted}
                onChange={onChangeValueForClasses}
                label="Class"
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
                {mainClasses &&
                  mainClasses.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
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
                disabled={cls === "Medical" ? false : true}
                select
                fullWidth
                id="medClass"
                name="medClass"
                value={medClass}
                error={medClass === "" && isFormSubmitted}
                onChange={onChangeValueForClasses}
                label="Medical Class"
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
                {medClasses &&
                  medClasses.map((val) => {
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
                id="subClass"
                name="subClass"
                value={subClass}
                error={subClass === "" && isFormSubmitted}
                onChange={onChangeValueForClasses}
                label="Sub Class"
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
                {subClasses &&
                  subClasses.map((val) => {
                    if (val.parent === cls || val.parent === medClass)
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
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
                id="grandSubClass"
                name="grandSubClass"
                value={grandSubClass}
                error={grandSubClass === "" && isFormSubmitted}
                onChange={onChangeValueForClasses}
                label="Grand Sub Class"
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
                {childSubClass &&
                  childSubClass.map((val) => {
                    if (val.parent === subClass)
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
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
                select
                fullWidth
                id="form"
                disabled={
                  cls === "Medical" && medClass === "Pharmaceutical"
                    ? false
                    : true
                }
                name="form"
                value={form}
                onChange={onChangeValueForClasses}
                label="Form"
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
                {formArray &&
                  formArray.map((val) => {
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
                // required
                label="Scientific Name"
                name={"scientificName"}
                value={scientificName}
                // error={scientificName === "" && isFormSubmitted}
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
                // required
                label="Trade Name"
                name={"tradeName"}
                value={tradeName}
                // error={tradeName === "" && isFormSubmitted}
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
                // required
                label="Temperature"
                name={"temperature"}
                value={temperature}
                // error={temperature === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
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
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                // required
                label="Humidity"
                name={"humidity"}
                value={humidity}
                // error={humidity === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                // required
                select
                fullWidth
                id="lightSensitive"
                name="lightSensitive"
                value={lightSensitive}
                // error={lightSensitive === "" && isFormSubmitted}
                onChange={onChangeValue}
                label="Light Sensitive"
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
                {con.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                // required
                select
                fullWidth
                id="resuableItem"
                name="resuableItem"
                value={resuableItem}
                // error={resuableItem === "" && isFormSubmitted}
                onChange={onChangeValue}
                label="Reusable"
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
                {con.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>

            <div
              className="col-md-3"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                // required
                label="Storage Condition"
                name={"storageCondition"}
                value={storageCondition}
                // error={humidity === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
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
              className="col-md-12"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                multiline
                type="text"
                error={comments === "" && isFormSubmitted}
                label="Comments"
                name={"comments"}
                value={comments}
                onChange={onChangeValue}
                rows={3}
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
            <div className="col-md-12">
              <div style={styles.inputContainer}>
                <InputLabelComponent>Availability</InputLabelComponent>
                <AvaliabilityComponent
                  avaliable={avaliable}
                  onChange={onChangeValue}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2%",
                marginBottom: "2%",
                marginRight: 2,
              }}
            >
              <img
                onClick={() => props.history.goBack()}
                src={Back_Arrow}
                style={{ width: 45, height: 35, cursor: "pointer" }}
              />

              {comingFor === "AddItems" ? (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Add Item</strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Edit Item</strong>
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

export default AddItems;

{
  /* <div className="row">
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
    label="Maximum Level"
    name={"maximumLevel"}
    value={maximumLevel}
    error={maximumLevel === "" && isFormSubmitted}
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
    error={reorderLevel === "" && isFormSubmitted}
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
</div> */
}

// {(subClass === "food_beverage" ||
// subClass === "laboratory_supplies" ||
// subClass === "radiology_medicine" ||
// grandSubClass === "housekeeping_supplies" ||
// grandSubClass === "of_office" ||
// grandSubClass === "mei_medical" ||
// grandSubClass === "cs_cardiac" ||
// (subClass === "medical_supplies" &&
//   grandSubClass !== "mei_medical")) && (
// <>
//   <div
//     style={{
//       ...styles.inputContainerForTextField,
//       ...styles.textFieldPadding,
//     }}
//     className={comingFor === "add" ? "col-md-12" : "col-md-12"}
//   >
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <DateTimePicker
//         inputVariant="filled"
//         label="Expiration"
//         fullWidth
//         onChange={(val) => onChangeDate(val, "expiration")}
//         InputProps={{
//           className: classes.input,
//           classes: { input: classes.input },
//         }}
//         value={
//           comingFor === "add"
//             ? expiration
//               ? expiration
//               : new Date()
//             : expiration
//         }
//       />
//     </MuiPickersUtilsProvider>
//   </div>
// </>
// )}

{
  /* <div className="row">
{(grandSubClass == "ME - Medicines" ||
  grandSubClass == "CM-Contrast Media Supplies" ||
  grandSubClass == "MRI Contrast Media" ||
  grandSubClass == "XR-Supplies"
  ) && (
  <>
    <div
      className="col-md-4"
      style={{
        ...styles.inputContainerForTextField,
        ...styles.textFieldPadding,
      }}
    >
      <TextField
        // required
        label="Scientific Name"
        name={"scientificName"}
        value={scientificName}
        error={scientificName === "" && isFormSubmitted}
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
        // required
        label="Trade Name"
        name={"tradeName"}
        value={tradeName}
        error={tradeName === "" && isFormSubmitted}
        onChange={(e) => onChangeValue(e)}
        className="textInputStyle"
        variant="filled"
        InputProps={{
          className: classes.input,
          classes: { input: classes.input },
        }}
      />
    </div>
  </>
)}


{(subClass == "radiology_medicine" ||
  grandSubClass == "me_medicines" ||
  subClass == "laboratory_supplies" ||
  (subClass == "medical_supplies" &&
    grandSubClass != "os_orthopedic")) && (
  <>
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
        label="Temperature"
        name={"temperature"}
        value={temperature}
        error={temperature === "" && isFormSubmitted}
        onChange={(e) => onChangeValue(e)}
        className="textInputStyle"
        onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
        variant="filled"
        InputProps={{
          className: classes.input,
          classes: { input: classes.input },
        }}
      />
    </div>
  </>
)}


{(grandSubClass == "fs_food_supplies" ||
  grandSubClass == "hs_house_keeping" ||
  subClass == "radiology_medicine" ||
  grandSubClass == "me_medicines" ||
  subClass == "laboratory_supplies" ||
  (subClass == "medical_supplies" &&
    grandSubClass != "os_orthopedic")) && (
  <>
    <div
      className="col-md-4"
      style={{
        ...styles.inputContainerForTextField,
        ...styles.textFieldPadding,
      }}
    >
      <TextField
        required
        label="Humidity"
        name={"humidity"}
        value={humidity}
        error={humidity === "" && isFormSubmitted}
        onChange={(e) => onChangeValue(e)}
        className="textInputStyle"
        onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
        variant="filled"
        InputProps={{
          className: classes.input,
          classes: { input: classes.input },
        }}
      />
    </div>
  </>
)}
{grandSubClass === "ME - Medicines" && (
  <>
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
        id="lightSensitive"
        name="lightSensitive"
        value={lightSensitive}
        error={lightSensitive === "" && isFormSubmitted}
        onChange={onChangeValue}
        label="Light Sensitive"
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
        {con.map((val) => {
          return (
            <MenuItem key={val.key} value={val.key}>
              {val.value}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  </>
)}
{(grandSubClass === "ms_medical" ||
  grandSubClass === "mei_medical" ||
  grandSubClass === "cs_cardiac") && (
  <>
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
        id="resuableItem"
        name="resuableItem"
        value={resuableItem}
        error={resuableItem === "" && isFormSubmitted}
        onChange={onChangeValue}
        label="Reusable"
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
        {con.map((val) => {
          return (
            <MenuItem key={val.key} value={val.key}>
              {val.value}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  </>
)}

</div> */
}
