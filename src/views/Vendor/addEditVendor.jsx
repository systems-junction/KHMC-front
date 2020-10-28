/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { ToastsStore } from "react-toasts";
import {
  addVendorUrl,
  updateVendorUrl,
  addShippingTermUrl,
  updateShippingTermUrl,
} from "../../public/endpoins";
// import ws from '../../variables/websocket'
import ShippingTerm from "../ShippingTerm/shippingTerm";
import vendor from "../../assets/img/Vendot.png";
import Header from "../../components/Header/Header";
import view_all from "../../assets/img/Eye.png";
import Back from "../../assets/img/Back_Arrow.png";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import InputLabelComponent from "../../components/InputLabel/inputLabel";
import BootstrapInput from "../../components/Dropdown/dropDown.js";
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import capitalizeFirstLetter from "../../public/capitilizeLetter";
import AvaliabilityComponent from "../../components/Avaliability/avaliability";
import useStyles from "../../../src/assets/jss/material-dashboard-react/inputStyle.js";
import Notification from "../../components/Snackbar/Notification.js";

import countryList from "react-select-country-list";

let countriesList = require("../../assets/countries.json");

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   // marginLeft: 5,
  //   // marginRight: 5
  // },

  // buttonContainer: {
  //   marginTop: 25
  // }
  inputField: {
    outline: "none",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
  stylesForADD: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },

  // inputContainerForTextField: {
  //   marginTop: 25,
  //   outline: 'none',
  // },

  // inputContainerForDropDown: {
  //   marginTop: 25,
  //   // backgroundColor: "white",
  //   // borderRadius: 10,
  //   // paddingLeft: 10,
  //   // paddingRight: 10,
  //   // paddingTop: 2,
  // },

  // buttonContainer: {
  //   marginTop: 25,
  // },
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
};

const useStylesForSelect = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

function AddEditVendor(props) {
  const classes = useStyles();
  const classesForSelect = useStylesForSelect();

  const initialState = {
    _id: "",
    englishName: "",
    arabicName: "",
    telephone1: "",
    telephone2: "",
    contactEmail: "",
    address: "",
    country: "",
    city: "",
    zipcode: "",
    pobox: "",
    faxno: "",
    taxno: "",
    contactPersonName: "",
    contactPersonTelephone: "",
    contactPersonEmail: "",
    paymentTerms: "",
    rating: "",
    status: "",
    cls: "",
    subClass: [],
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
    englishName,
    arabicName,
    telephone1,
    telephone2,
    contactEmail,
    address,
    country,
    city,
    zipcode,
    pobox,
    faxno,
    taxno,
    contactPersonName,
    contactPersonTelephone,
    contactPersonEmail,
    paymentTerms,
    rating,
    status,
    subClass,
    cls,
  } = state;

  const onChangeCountry = (e) => {
    if (e.target.value) {
      dispatch({ field: e.target.name, value: e.target.value });
      let cities = Object.entries(countriesList[0]);
      for (var x in cities) {
        let arr = cities[x];
        if (arr[0] === e.target.value) {
          console.log("cities", arr[1]);
          setCities(arr[1]);
        }
      }
    } else {
      dispatch({ field: e.target.name, value: e.target.value });
      dispatch({ field: "city", value: "" });
      setCities("");
    }
  };

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

    if (e.target.name === "cls") {
      dispatch({ field: e.target.name, value: e.target.value });
      dispatch({ field: "subClass", value: [] });
    } else {
      dispatch({ field: e.target.name, value: e.target.value });
    }
  };

  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [openShippingTermModal, setOpenShippingTermModal] = useState(false);
  const [shippingTermsData, setShippingTermsData] = useState([]);
  const [modeForShippingTerms, setModeForShippingTerms] = useState("add");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  const [mainClasses, setClasses] = useState("");

  const [statues, setStatuses] = useState("");

  const [subClasses, setSubClasses] = useState("");

  const [countries, setCountries] = useState("");
  const [cities, setCities] = useState("");

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    setCountries(Object.keys(countriesList[0]));

    setcomingFor(props.history.location.state.comingFor);
    setClasses(props.history.location.state.mainClasses);
    setStatuses(props.history.location.state.statues);
    setSubClasses(props.history.location.state.subClasses);
    console.log("state", props.history.location.state.selectedItem);
    const selectedRec = props.history.location.state.selectedItem;
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          if (key === "subClass") {
            dispatch({ field: key, value: val });
          } else {
            dispatch({ field: key, value: val._id });
          }
        } else {
          if (key === "country") {
            let cities = Object.entries(countriesList[0]);
            for (var x in cities) {
              let arr = cities[x];
              if (arr[0] === val) {
                console.log("cities", arr[1]);
                setCities(arr[1]);
                // dispatch({ field: key, value: val });
              }
              dispatch({ field: key, value: val });
            }
          } else {
            dispatch({ field: key, value: val });
          }
        }
      });
    }
  }, []);

  function validateForm() {
    return (
      englishName !== "" &&
      arabicName !== "" &&
      telephone1 !== "" &&
      telephone2 !== "" &&
      contactPersonTelephone !== "" &&
      address !== "" &&
      // pobox.length > 0 &&
      zipcode !== "" &&
      taxno !== "" &&
      contactPersonName !== "" &&
      subClass !== "" &&
      subClass.length > 0 &&
      cls !== "" &&
      status !== "" &&
      contactPersonEmail != "" &&
      contactEmail !== "" &&
      rating !== "" &&
      paymentTerms !== "" &&
      city !== "" &&
      country !== ""
    );
  }

  function validatePhoneAndEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (telephone1.length <= 6) {
      setOpenNotification(true);
      setErrorMsg("Please add telephone1 of length greater than 6.");
      return false;
    } else if (telephone2.length <= 6) {
      setOpenNotification(true);
      setErrorMsg("Please add telephone2 of length greater than 6.");
      return false;
    } else if (contactPersonTelephone.length <= 6) {
      setOpenNotification(true);
      setErrorMsg(
        "Please add Contact Person Telephone of length greater than 6."
      );
      return false;
    } else if (!re.test(contactPersonEmail)) {
      setOpenNotification(true);
      setErrorMsg("Please add valid email address for contact person email.");
      return false;
    } else if (!re.test(contactEmail)) {
      setOpenNotification(true);
      setErrorMsg("Please add valid email address for contact email.");
      return false;
    }

    return true;
  }

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      if (!validatePhoneAndEmail()) {
        return;
      }

      const params = {
        englishName,
        arabicName,
        telephone1,
        telephone2,
        contactEmail,
        address,
        country,
        city,
        zipcode,
        // pobox,
        faxno,
        taxno,
        contactPersonName,
        contactPersonTelephone,
        contactPersonEmail,
        paymentTerms,
        rating,
        status,
        cls,
        subClass,
      };

      console.log("param for vendor", params);

      axios
        .post(addVendorUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log("response is", res.data.data._id);
            if (shippingTermsData.length > 0) {
              addShippingTerms(res.data.data._id);
            } else {
              props.history.goBack();
            }
            // ws.send('add_vendor')
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error);
          }
        })
        .catch((e) => {
          console.log("error after adding vendor", e);
        });
    }
  };

  const addShippingTerms = (id, data = shippingTermsData) => {
    // shippingTermsData
    // for (let i = 0; i < shippingTermsData.length; i++) {
    var data = {
      shippingTermsData: data,
      vendorId: id,
    };
    axios
      .post(addShippingTermUrl, data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error while adding shipping term ", e);
      });
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    if (validateForm()) {
      if (!validatePhoneAndEmail()) {
        return;
      }

      const params = {
        _id,
        englishName,
        arabicName,
        telephone1,
        telephone2,
        contactEmail,
        address,
        country,
        city,
        zipcode,
        // pobox,
        faxno,
        taxno,
        contactPersonName,
        contactPersonTelephone,
        contactPersonEmail,
        paymentTerms,
        rating,
        status,
        cls,
        subClass,
      };
      axios
        .put(updateVendorUrl, params)
        .then((res) => {
          if (res.data.success) {
            // console.log('response is', res.data.data._id);
            // if (shippingTermsData.length > 0) {
            //   let withId = [];
            //   let withOutId = [];

            //   for (let i = 0; i < shippingTermsData.length; i++) {
            //     if (shippingTermsData[i]._id) {
            //       withId.push(shippingTermsData[i]);
            //     } else {
            //       withOutId.push(shippingTermsData[i]);
            //     }
            //   }
            //   editShippingTerms(_id, withId);
            //   addShippingTerms(_id, withOutId);
            // } else {
            //   props.history.goBack();
            // }
            props.history.goBack();
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error);
          }
        })
        .catch((e) => {
          console.log("error after updating vendor", e);
        });
    }
  };

  const editShippingTerms = (id, withId) => {
    // shippingTermsData
    // for (let i = 0; i < shippingTermsData.length; i++) {
    var data = {
      shippingTermsData: withId,
      vendorId: id,
    };
    axios
      .put(updateShippingTermUrl, data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data);
          //   props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error while adding shipping term ", e);
      });
  };

  const addShippingTerm = () => {
    setOpenShippingTermModal(true);
  };

  const editShippingTerm = () => {
    setOpenShippingTermModal(true);
    setModeForShippingTerms("edit");
  };

  const addPaymetTerm = () => {};

  const hideShippingModel = (data = shippingTermsData) => {
    console.log(data);
    setShippingTermsData(data);
    setOpenShippingTermModal(false);
  };

  const hideModel = () => {
    setOpenShippingTermModal(false);
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 4000);
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
            <img src={vendor} />
            <h4>{comingFor === "add" ? " Add Vendor" : " Edit Vendor"}</h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant="contained"
              color="primary"
            >
              <img src={view_all} className="icon-view" />
              &nbsp;&nbsp;
              <strong>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div
          className={`container-fluid ${classes.root}`}
          style={{ marginTop: 20 }}
        >
          <div className="row sideMargin">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type={"text"}
                required
                label="English Name"
                name={"englishName"}
                value={englishName}
                error={englishName === "" && isFormSubmitted}
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
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type={"text"}
                required
                label="Arabic Name"
                name={"arabicName"}
                value={arabicName}
                error={arabicName === "" && isFormSubmitted}
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
                label="Telephone1"
                name={"telephone1"}
                value={telephone1}
                error={telephone1 === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" || evt.key === "E") && evt.preventDefault()
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
                label="Telephone2"
                name={"telephone2"}
                value={telephone2}
                error={telephone2 === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" || evt.key === "E") && evt.preventDefault()
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
                label="Fax No"
                name={"faxno"}
                value={faxno}
                error={faxno === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" || evt.key === "E") && evt.preventDefault()
                }
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>
          </div>

          <div className="row sideMargin">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                type={"text"}
                required
                label="Contact Person Name"
                name={"contactPersonName"}
                value={contactPersonName}
                error={contactPersonName === "" && isFormSubmitted}
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
                type={"number"}
                label="Contact Person Telephone"
                name={"contactPersonTelephone"}
                value={contactPersonTelephone}
                error={contactPersonTelephone === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                onKeyDown={(evt) =>
                  (evt.key === "e" || evt.key === "E") && evt.preventDefault()
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
                type={"email"}
                required
                label="Contact Person Email"
                name={"contactPersonEmail"}
                value={contactPersonEmail}
                error={contactPersonEmail === "" && isFormSubmitted}
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

          <div className="row sideMargin">
            <div
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type={"email"}
                label="Contact Email"
                name={"contactEmail"}
                value={contactEmail}
                error={contactEmail === "" && isFormSubmitted}
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
              className="col-md-6"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type={"text"}
                label="Address"
                name={"address"}
                value={address}
                error={address === "" && isFormSubmitted}
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

          <div className="row sideMargin">
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
                id="country"
                name="country"
                value={country}
                error={country === "" && isFormSubmitted}
                onChange={onChangeCountry}
                label="Country"
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
                {countries &&
                  countries.map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        {val}
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
                id="city"
                name="city"
                value={city}
                error={city === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                label="City"
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
                {cities &&
                  cities.map((val) => {
                    return (
                      <MenuItem key={val} value={val}>
                        {val}
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
                type={"number"}
                label="Zip Code"
                name={"zipcode"}
                value={zipcode}
                error={zipcode === "" && isFormSubmitted}
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

          {/* <div className="row sideMargin">
            <div className="col-md-4" style={styles.inputContainerForTextField}>
              <input
                type="number"
                placeholder="PO Box"
                name={"pobox"}
                value={pobox}
                onChange={onChangeValue}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              />
            </div>
          </div> */}

          <div className="row sideMargin">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type={"text"}
                label="Tax No"
                name={"taxno"}
                value={taxno}
                error={taxno === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                // onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
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
                select
                fullWidth
                id="cls"
                name="cls"
                value={cls}
                error={cls === "" && isFormSubmitted}
                onChange={onChangeValue}
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
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <FormControl
              variant="filled" 
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  borderRadius: 3,
                }}
              >
                <InputLabel
                  style={{  }}
                  id="demo-simple-select-label"
                >
                  Sub Class
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  required
                  multiple
                  fullWidth
                  id="subClass"
                  name="subClass"
                  value={subClass}
                  error={subClass === "" && isFormSubmitted}
                  onChange={handleChange}
                  label="Sub Class"
                  // variant="filled"
                  disableUnderline
                  // style={{ paddingLeft: 12 }}
                  // className={classesForSelect.root}
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
              </FormControl>
            </div>
          </div>

          <div className="row sideMargin">
            <div
              className="col-md-4"
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type={"text"}
                label="Payment Terms"
                name={"paymentTerms"}
                value={paymentTerms}
                error={paymentTerms === "" && isFormSubmitted}
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
                type={"number"}
                label="Rating"
                name={"rating"}
                value={rating}
                error={rating === "" && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className="textInputStyle"
                variant="filled"
                onKeyDown={(evt) =>
                  (evt.key === "e" ||
                    evt.key === "+" ||
                    evt.key === "-" ||
                    evt.key === "E") &&
                  evt.preventDefault()
                }
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
                select
                fullWidth
                id="status"
                name="status"
                value={status}
                error={status === "" && isFormSubmitted}
                onChange={onChangeValue}
                label="Status"
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
                {statues &&
                  statues.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          {/* shipping terms modal */}
          {/* <Modal
            open={openShippingTermModal}
            // open={true}
            style={modalStyle}
            onClose={() => setOpenShippingTermModal(false)}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <div
              style={{
                backgroundColor: '#e2e2e2',
                height: '100%',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'flex-start',
                  marginLeft: 40,
                  alignItems: 'center',
                }}
              >
                <h3 className='modal-heading' style={{ color: 'black' }}>
                  Shipping Term(s)
                </h3>
              </div>

              <div
                className='popup-body'
                style={{ display: 'flex', flex: 7, flexDirection: 'column' }}
              >
                <ShippingTerm
                  hideShippingModel={hideShippingModel}
                  modeForShippingTerms={modeForShippingTerms}
                  selectedVendor={_id}
                  shippingTermsData={shippingTermsData}
                  hideModel={hideModel}
                />
              </div>
            </div>
          </Modal> */}

          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                height: 40,
                justifyContent: "center",
                marginTop: "1%",
                marginBottom: "1%",
                marginRight: "-14px",
              }}
            >
              {comingFor === "add" ? (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    disabled={!validateForm()}
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                    style={styles.stylesForADD}
                  >
                    <strong style={{ fontSize: "12px" }}>Add</strong>
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    className="pl30 pr30"
                    disabled={!validateForm()}
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                    style={styles.stylesForButton}
                  >
                    <strong style={{ fontSize: "12px" }}>Update</strong>
                  </Button>
                </div>
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
