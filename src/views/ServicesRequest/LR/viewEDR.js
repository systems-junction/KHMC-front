/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {
  getLRById,
  updateLRById,
} from "../../../public/endpoins";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import business_Unit from "../../../assets/img/EDR.png";
import Back from "../../../assets/img/Back_Arrow.png";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import ViewSingleRequest from './viewRequest'
import Notification from "../../../components/Snackbar/Notification.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import BootstrapInput from "../../../components/Dropdown/dropDown.js";
import Loader from "react-loader-spinner";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import { FaUpload } from 'react-icons/fa'

const statusArray = [
  {
    key: "pending",
    value: "Pending",
  },
  {
    key: "completed",
    value: "Completed",
  },
];

const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: "20px",
  },
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
  input: {
    display: "none",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    height: "50px",
    outline: "none",
    width: "140px",
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "gray",
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '6px',
    color: 'gray',
    // marginTop: "10px",
    width: '100%',
    height: '55px',
    cursor: 'pointer',
    padding: '15px',
  },
};

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const useStyles = makeStyles((theme) => ({
  scroller: {
    flexGrow: "0",
  },
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

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

  const initialState = {
    name: "",
    price: "",
    status: "",
    date:'',
    results:'',
    sampleID:''
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const { name, price, status,date,results,sampleID } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const classesForTabs = useStylesForTabs()
  const [, setCurrentUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [requestNo, setrequestNo] = useState("");
  const [, setSelectedItem] = useState("");
  const [value, setValue] = React.useState(0)
  const [id, setId] = useState("");
  const [slipUpload, setSlipUpload] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  const getLRByIdURI = (id) => {
    axios
      .get(getLRById + "/" + id)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "data");
          if (res.data.data) {
            console.log(res.data.data, "data2");

            setIsLoading(false);

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "serviceId") {
                  dispatch({ field: "name", value: val.name });
                  dispatch({ field: "price", value: val.price });
                  dispatch({ field: "status", value: val.status });
                }
              } else {
                dispatch({ field: key, value: val });
              }
            });
          }
        }
      })
      .catch((e) => {
        console.log("error while searching req", e);
      });
  };

  const updateLRByIdURI = () => {
    const params = {
      _id: id,
      status: status,
    };
    console.log(params, "params");
    axios
      .put(updateLRById, params)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "data");
          if (res.data.data) {
            console.log(res.data.data, "data2");

            setIsLoading(false);

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "serviceId") {
                  dispatch({ field: "name", value: val.name });
                  dispatch({ field: "price", value: val.price });
                }
              } else {
                dispatch({ field: key, value: val });
              }
            });
          }
          props.history.goBack();
        }
      })
      .catch((e) => {
        console.log("error while searching req", e);
      });
  };

  useEffect(() => {
    getLRByIdURI(props.history.location.state.selectedItem._id);

    setCurrentUser(cookie.load("current_user"));

    const selectedRec = props.history.location.state.selectedItem._id;
    console.log(selectedRec, "rec");
    setId(props.history.location.state.selectedItem._id);
    setSelectedItem(props.history.location.state.selectedItem);
    setrequestNo(props.history.location.state.selectedItem.requestNo);
    setSelectedPatient(props.history.location.state.selectedItem.patientId);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onSlipUpload = (event) => {
    setSlipUpload(event.target.files[0])

    var file = event.target.files[0]
    var reader = new FileReader()
    var url = reader.readAsDataURL(file);

    reader.onloadend = function () {
      setImagePreview([reader.result])
      dispatch({ field: 'results', value: file.name })
    }
  }

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

      {!isLoading ? (
        <div className={`cPadding ${classes.root}`}>
          <div className="subheader">
            <div>
              <img src={business_Unit} />
              <h4>EDR - Lab Service Request</h4>
            </div>

          </div>
          <div
            style={{
              height: "20px",
            }}
          />
          <div className="container" style={styles.patientDetails}>
            <div className="row">
              <div className="col-md-12">
                <h4 style={{ color: "blue", fontWeight: "600" }}>
                  Patient Details
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Patient Name
                  </InputLabel>
                  <span>
                    {selectedPatient.firstName + ` ` + selectedPatient.lastName}{" "}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Gender
                  </InputLabel>
                  <span>{selectedPatient.gender}</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Age
                  </InputLabel>
                  <span>{selectedPatient.age}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    MRN
                  </InputLabel>
                  <span>{selectedPatient.profileNo}</span>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Insurance No
                  </InputLabel>
                  <span>
                    {selectedPatient.insuranceId
                      ? selectedPatient.insuranceId
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div style={styles.inputContainerForTextField}>
                  <InputLabel style={styles.stylesForLabel} id="status-label">
                    Request No
                  </InputLabel>
                  <span>{requestNo}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              height: "20px",
            }}
          />

          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          >
            <div className={classesForTabs.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='null'
                centered
              >
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 15,
                    outline: 'none',
                    backgroundColor: value === 0 ? '#2c6ddd' : undefined,
                  }}
                  label='Sample Collection'
                />
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 15,
                    outline: 'none',
                    backgroundColor: value === 1 ? '#2c6ddd' : undefined,
                  }}
                  label='Results'
                />
              </Tabs>
            </div>
            {value === 0 ? (
              <>
                <div className="row" style={{ marginTop: '20px' }}>
                  <div
                    className="col-md-4 col-sm-4"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label="Lab Test Name"
                      name={"name"}
                      value={name}
                      // onChange={onChangeValue}
                      variant="filled"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>

                  <div
                    className="col-md-4 col-sm-4"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label="Price"
                      variant="filled"
                      name={"price"}
                      value={price}
                      // onChange={onChangeValue}
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>

                  <div
                    className="col-md-4 col-sm-4"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      fullWidth
                      select
                      id="status"
                      name="status"
                      value={status}
                      onChange={onChangeValue}
                      variant="filled"
                      label="Status"
                      className="dropDownStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      input={<BootstrapInput />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {statusArray.map((val) => {
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
                    className="col-md-6 col-sm-6 col-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      variant='filled'
                      label='Date/Time'
                      name={'DateTime'}
                      // value={DateTime}
                      // defaultValue={DateTime}
                      type='date'
                      className='textInputStyle'
                      // onChange={(val) => onChangeValue(val, 'DateTime')}
                      InputLabelProps={{
                        shrink: true,
                        color: 'black'
                      }}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      variant='filled'
                      label='Sample ID'
                      name={'sampleID'}
                      // value={DateTime}
                      type='text'
                      className='textInputStyle'
                      // onChange={(val) => onChangeValue(val, 'DateTime')}
                      InputLabelProps={{
                        shrink: true,
                        color: 'black'
                      }}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>
                </div>
              </>
            ) : value === 1 ? (
              <>
                <div className="row" style={{marginTop:'20px'}}>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <label style={styles.upload}>
                      <TextField
                        required
                        type='file'
                        style={styles.input}
                        onChange={onSlipUpload}
                        name='results'
                      />
                      <FaUpload /> Results
                    </label>
                    {imagePreview !== "" ? (
                      <img src={imagePreview} className="depositSlipImg" />
                    ) : (
                        undefined
                      )}
                    <span
                      className='container-fluid'
                      style={{ color: 'green' }}
                    >
                      {results && results === ''
                        ? ''
                        : results.name}
                    </span>
                  </div>
                </div>
              </>
            ) : (
                  undefined
                )}
            <br />
            <br />
            <div className="row" style={{ marginBottom: "25px" }}>
              <div className="col-md-6 col-sm-6 col-6">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ width: 45, height: 35, cursor: "pointer" }}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                <Button
                  onClick={updateLRByIdURI}
                  style={styles.stylesForButton}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Save</strong>
                </Button>
              </div>
            </div>
          </div>

          {/* {openItemDialog ? (
            <ViewSingleRequest
              item={item}
              openItemDialog={openItemDialog}
              viewItem={viewItem}
            />
          ) : (
            undefined
          )} */}

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      ) : (
          <div className="LoaderStyle">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
        )}
    </div>
  );
}
export default AddEditPurchaseRequest;
