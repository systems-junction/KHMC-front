import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import { addItemUrl, updateItemUrl } from "../../public/endpoins";

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
};

function AddItems(props) {
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
    grandSubClass: "",
    comments: "",
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
    vendors,
    units,
    cls,
    grandSubClass,
    comments,
  } = state;

  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [mainClasses, setClasses] = useState("");
  const [subClasses, setSubClasses] = useState("");
  const [childSubClass, setChildSubClasses] = useState("");

  const [vendorsArray, setVendorsArray] = useState("");

  const [msg, setMsg] = useState("");
  const [tr, setTr] = useState(false);

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    setClasses(props.history.location.state.classes);
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
    dispatch({ field: e.target.name, value: e.target.value });
  };

  function validateForm() {
    const res =
      name.length > 0 &&
      description.length > 0 &&
      subClass.length > 0 &&
      itemCode.length > 0 &&
      receiptUnit.length > 0 &&
      issueUnit.length > 0 &&
      vendorId.length > 0 &&
      purchasePrice > 0 &&
      maximumLevel.length > 0 &&
      minimumLevel.length > 0 &&
      reorderLevel.length > 0 &&
      cls.length > 0 &&
      grandSubClass.length > 0;

    return res;
  }
  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      const params = {
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
        cls,
        grandSubClass,
        comments,
      };
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
      const params = {
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
        cls,
        grandSubClass,
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
          flex: 1,
          display: "flex",
          marginTop: 15,
        }}
      >
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
            {comingFor === "AddItems" ? " Add Item" : " Edit Item"}
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
      <div className="container">
        {/* <h1>{comingFor === 'EditItems' ? 'Edit Items' : 'Add Items'}</h1> */}

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                name="name"
                // variant="outlined"
                value={name}
                onChange={onChangeValue}
                error={!name && isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                // multiline
                // rows={4}
                id="outlined-basic"
                label="Description"
                // variant="outlined"
                name="description"
                value={description}
                onChange={onChangeValue}
                error={!description && isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Item Code"
                // variant="outlined"
                name="itemCode"
                value={itemCode}
                type="text"
                onChange={onChangeValue}
                error={!itemCode && isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="receiptUnit-label">Receipt Unit</InputLabel>
              <Select
                fullWidth
                labelId="receiptUnit-label"
                id="receiptUnit"
                name="receiptUnit"
                value={receiptUnit}
                onChange={onChangeValue}
                label="Receipt Unit"
                error={!receiptUnit && isFormSubmitted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {units.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.fuName}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>

          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <InputLabel id="issueUnit-label">Issue Unit</InputLabel>
              <Select
                fullWidth
                labelId="issueUnit-label"
                id="issueUnit"
                name="issueUnit"
                value={issueUnit}
                onChange={onChangeValue}
                label="Issue Unit"
                error={!issueUnit && isFormSubmitted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {units.map((val) => {
                  return (
                    <MenuItem key={val._id} value={val._id}>
                      {val.fuName}
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
              <InputLabel id="vendorId-label">Vendor</InputLabel>
              <Select
                fullWidth
                labelId="vendorId-label"
                id="vendorId"
                name="vendorId"
                value={vendorId}
                onChange={onChangeValue}
                label="Vendor"
                error={!vendorId && isFormSubmitted}
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
              </Select>
            </div>
          </div>

          <div className="col-md-6">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                label="Puschase Price"
                type="number"
                // variant="outlined"
                name="purchasePrice"
                value={purchasePrice}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChangeValue}
                error={(!purchasePrice || purchasePrice < 0) && isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                label="Minimum Level"
                // variant="outlined"
                type="number"
                name="minimumLevel"
                value={minimumLevel}
                onChange={onChangeValue}
                error={!minimumLevel && isFormSubmitted}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                id="maximumLevel"
                label="Maximum Level"
                // variant="outlined"
                name="maximumLevel"
                value={maximumLevel}
                type="number"
                onChange={onChangeValue}
                error={!maximumLevel && isFormSubmitted}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                id="reorderLevel"
                label="Reorder Level"
                // variant="outlined"
                name="reorderLevel"
                type="number"
                value={reorderLevel}
                onChange={onChangeValue}
                error={!reorderLevel && isFormSubmitted}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div style={styles.inputContainer}>
              <InputLabel id="buHead-label">Class</InputLabel>
              <Select
                fullWidth
                id="cls"
                name="cls"
                value={cls}
                onChange={onChangeValue}
                label="Class"
                error={!cls && isFormSubmitted}
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
              </Select>
            </div>
          </div>

          <div className="col-md-4">
            <div style={styles.inputContainer}>
              <InputLabel id="buName-label">Sub Class</InputLabel>
              <Select
                fullWidth
                id="subClass"
                name="subClass"
                value={subClass}
                onChange={onChangeValue}
                label="Sub Class"
                error={!subClass && isFormSubmitted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subClasses &&
                  subClasses.map((val) => {
                    if (val.parent === cls)
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      );
                  })}
              </Select>
            </div>
          </div>

          <div className="col-md-4">
            <div style={styles.inputContainer}>
              <InputLabel id="buName-label">Grand Sub Class</InputLabel>
              <Select
                fullWidth
                id="grandSubClass"
                name="grandSubClass"
                value={grandSubClass}
                onChange={onChangeValue}
                label="Grand Sub Class"
                error={!grandSubClass && isFormSubmitted}
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
              </Select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainer}>
              <TextField
                fullWidth
                id="comments"
                label="Comments"
                // variant="outlined"
                name="comments"
                value={comments}
                multiline
                rows={3}
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
            {comingFor === "AddItems" ? (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleAdd}
                variant="contained"
                color="primary"
              >
                Add Item
              </Button>
            ) : (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit Item
              </Button>
            )}
          </div>
        </div>

        <Notification msg={msg} open={tr} />

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

export default AddItems;
