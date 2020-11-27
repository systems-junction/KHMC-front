import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {
  getLRByIdURL,
  uploadsUrl,
  updateLRByIdURL,
} from "../../../public/endpoins";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LinearProgress from "@material-ui/core/LinearProgress";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import cookie from "react-cookies";
import Header from "../../../components/Header/Header";
import business_Unit from "../../../assets/img/Out Patient.png";
import Back from "../../../assets/img/Back_Arrow.png";
import "../../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Notification from "../../../components/Snackbar/Notification.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import BootstrapInput from "../../../components/Dropdown/dropDown.js";
import Loader from "react-loader-spinner";
import { FaUpload } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";

const statusArray = [
  {
    key: "pending",
    value: "Pending",
  },
  {
    key: "completed",
    value: "Completed",
  },

  {
    key: "active",
    value: "Active",
  },
];

const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: "20px",
  },
  inputContainerForTextField: {
    marginTop: 10,
  },

  inputContainerForDropDown: {
    marginTop: 6,
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  input: {
    display: "none",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
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
    backgroundColor: "white",
    border: "0px solid #ccc",
    borderRadius: "5px",
    color: "gray",
    width: "100%",
    height: "55px",
    cursor: "pointer",
    padding: "15px",
  },
};

const useStylesForTabs = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const useStyles = makeStyles((theme) => ({
  scroller: {
    flexGrow: "0",
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
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
    borderRadius: 5,
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
    "& .Mui-disabled": {
      color: "gray",
      backgroundColor: "white",
      boxShadow: "none",
    },
  },
  progressbarroot: {
    width: "100%",

    height: 10,
    borderRadius: 5,
  },
}));

function AddEditPurchaseRequest(props) {
  const classes = useStyles();

  const initialState = {
    serviceName: "",
    status: "",
    date: "",
    results: "",
    sampleId: "",
    comments: "",
    price: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    serviceName,
    status,
    date,
    results,
    sampleId,
    comments,
    price,
  } = state;

  const onChangeValue = (e) => {
    dispatch({
      field: e.target.name,
      value: e.target.value.replace(/[^\w\s]/gi, ""),
      e,
    });
  };

  const classesForTabs = useStylesForTabs();
  const [, setCurrentUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [requestNo, setrequestNo] = useState("");
  const [lrId, setlrId] = useState("");
  const [iprId, setiprId] = useState("");
  const [slipUpload, setSlipUpload] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(0);
  const [pdfView, setpdfView] = useState("");
  const [requestId, setRequestId] = useState("");
  const [statusOnResult, setStatusOnResult] = useState("");
  const [statusOnResultStatus, setStatusOnResultStatus] = useState(false);
  const [checkStatus, setcheckStatus] = useState("");
  const [isFormSubmitted, setisFormSubmitted] = useState(false);
  const [progress, setProgress] = React.useState(false);

  const getLRByIdURI = (id) => {
    axios
      .get(getLRByIdURL + "/" + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            console.log(res.data.data, "IPRs LR");
            setRequestId(res.data.data._id);
            setIsLoading(false);

            Object.entries(res.data.data).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "serviceId") {
                  dispatch({ field: "serviceName", value: val.serviceName });
                  dispatch({ field: "price", value: val.price });
                }
              }
              if (key === "date") {
                dispatch({
                  field: "date",
                  value: new Date(val).toISOString(),
                });
              } else {
                if (key === "status") {
                  setcheckStatus(val);
                  //   if (val === 'pending') {
                  //     let p = 'None'
                  //     val = p
                  //     dispatch({ field: 'status', value: p })
                  //     console.log('====================================')
                  //     console.log(p)
                  //     console.log('====================================')
                  //   }
                }
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

  // function validateForm() {
  //   return (
  //     sampleId &&
  //     sampleId.length > 0 &&
  //     results &&
  //     results.length > 0
  //   )
  // }

  const updateLRByIdURI = () => {
    if (validateForm()) {
      let formData = new FormData();
      if (slipUpload) {
        formData.append("file", slipUpload, slipUpload.name);
      }
      // if (validateForm()) {
      const params = {
        IPRId: iprId,
        EDRId: iprId,
        labRequestId: lrId,
        status: statusOnResultStatus === true ? statusOnResult : status,
        sampleId: sampleId,
      };

      console.log("====================================");
      console.log(
        `params status: ${status} ${statusOnResult} ${statusOnResultStatus}`
      );
      console.log("====================================");

      formData.append("data", JSON.stringify(params));
      console.log("PARAMSS ", params);
      axios
        .put(updateLRByIdURL, formData, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            console.log("res", res.data);
            props.history.push({
              pathname: "success",
              state: {
                //of request Id ${requestId}
                message: `Lab Services Request: ${
                  res.data.data.requestNo
                } for patient MRN: ${res.data.data.patientId.profileNo.toUpperCase()} updated successfully`,
              },
            });
          } else {
            setOpenNotification(true);
            setErrorMsg("Error while submitting");
          }
        })
        .catch((e) => {
          console.log("error while searching req", e);
        });
    } else {
      setOpenNotification(true);
      setErrorMsg("Enter the sample ID");
    }
    setisFormSubmitted(true);
  };

  const validateForm = () => {
    return sampleId && sampleId.length > 0;
  };

  useEffect(() => {
    // console.log("selected", props.history.location.state.selectedItem);

    // if (props.history.location.state.selectedItem.serviceId === "") {
    //   dispatch({ field: "status", value: "" });
    // }

    setCurrentUser(cookie.load("current_user"));
    getLRByIdURI(props.history.location.state.selectedItem._id);

    setlrId(props.history.location.state.selectedItem._id);
    setiprId(props.history.location.state.selectedItem.edipId._id);
    setSelectedItem(props.history.location.state.selectedItem);
    setrequestNo(props.history.location.state.selectedItem.requestNo);
    setSelectedPatient(props.history.location.state.selectedItem.patientId);

    // const timer = setInterval(() => {
    //   setProgress((oldProgress) => {
    //     if (oldProgress === 100) {
    //       return 0;
    //     }
    //     const diff = Math.random() * 10;
    //     return Math.min(oldProgress + diff, 100);
    //   });
    // }, 500);

    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
      setsuccessMsg("");
    }, 2000);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSlipUpload = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    var fileType = file.name.slice(file.name.length - 3);
    let file_size = event.target.files[0].size;

    // console.log("Selected file : ", file.name)
    // console.log("file type : ", fileType)
    setTimeout(() => {
      setProgress(true);
      //setSlipUpload(file);
    }, 500);

    // setProgress(true);
    setSlipUpload(file);

    setProgress(true);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function() {
      if (file_size <= 1500000) {
        if (fileType === "pdf") {
          setpdfView(file.name);
        } else if (fileType === "PDF") {
          setpdfView(file.name);
        } else if (fileType === "png") {
          setImagePreview([reader.result]);
        } else if (fileType === "PNG") {
          setImagePreview([reader.result]);
        } else if (fileType === "peg") {
          setImagePreview([reader.result]);
        } else if (fileType === "PEG") {
          setImagePreview([reader.result]);
        } else if (fileType === "jpg") {
          setImagePreview([reader.result]);
        } else if (fileType === "JPG") {
          setImagePreview([reader.result]);
        } else if (fileType === "rtf") {
          setImagePreview([reader.result]);
        } else if (fileType === "RTF") {
          setImagePreview([reader.result]);
        } else {
          setErrorMsg("only pdf, jpeg, png and rtf should be allowed");
          setOpenNotification(true);
        }
      } else {
        setErrorMsg("Files size should be less Than or Equal to 1.5MB");
        setOpenNotification(true);
      }
    };

    if (statusOnResult === "pending") {
      setStatusOnResult("completed");
      setStatusOnResultStatus(true);
    } else if (statusOnResult === "active") {
      setStatusOnResult("completed");
      setStatusOnResultStatus(true);
    } else {
      setStatusOnResult("completed");
      setStatusOnResultStatus(true);
    }
    setProgress(false);
  };

  const removeUploadedSlip = () => {
    console.log("Slip ..... ", slipUpload);

    var fileType = slipUpload.name.slice(slipUpload.name.length - 3);

    // console.log("Selected file : ", file.name)
    // console.log("file type : ", fileType)

    setSlipUpload("");

    if (fileType === "pdf") {
      setpdfView("");
    } else if (fileType === "PDF") {
      setpdfView("");
    } else if (fileType === "png") {
      setImagePreview("");
    } else if (fileType === "PNG") {
      setImagePreview("");
    } else if (fileType === "peg") {
      setImagePreview("");
    } else if (fileType === "PEG") {
      setImagePreview("");
    } else if (fileType === "jpg") {
      setImagePreview("");
    } else if (fileType === "JPG") {
      setImagePreview("");
    } else if (fileType === "rtf") {
      setImagePreview("");
    } else if (fileType === "RTF") {
      setImagePreview("");
    } else {
      setErrorMsg("Cannot remove file");
      setOpenNotification(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(19 213 159)",
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

      {!isLoading ? (
        <div className={`cPadding ${classes.root}`}>
          <div className="subheader" style={{ marginLeft: "-8px" }}>
            <div>
              <img src={business_Unit} />
              <h4>In-Patient </h4>
            </div>
          </div>
          <div
            style={{
              height: "20px",
            }}
          />

          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container-fluid"
          >
            <div className={classesForTabs.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                TabIndicatorProps={{ style: { background: "#12387a" } }}
                centered
              >
                <Tab
                  style={{
                    color: "white",
                    borderRadius: 5,
                    outline: "none",
                    color: value === 0 ? "#12387a" : "#3B988C",
                  }}
                  label="Sample Collection"
                />
                <Tab
                  style={{
                    color: "white",
                    borderRadius: 5,
                    outline: "none",
                    color: value === 1 ? "#12387a" : "#3B988C",
                  }}
                  label="Results"
                />
              </Tabs>
            </div>
            {value === 0 ? (
              <div style={{ marginLeft: "-5px", marginRight: "-5px" }}>
                <div
                  className="row"
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <div
                    className="col-md-6 col-sm-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label="Lab Test Name"
                      name={"serviceName"}
                      value={serviceName}
                      variant="filled"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                  <div
                    className="col-md-6 col-sm-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <CurrencyTextField
                      disabled
                      label="Price"
                      name={"price"}
                      value={price}
                      // error={price === '' && paymentForm}
                      // onChange={onChangeValue}
                      // type='number'
                      onBlur={onChangeValue}
                      className="textInputStyle"
                      variant="filled"
                      textAlign="left"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      currencySymbol="JD"
                      outputFormat="number"
                      decimalPlaces="4"
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        disabled={true}
                        inputVariant="filled"
                        fullWidth={true}
                        label="Date/Time"
                        format="dd - MM - yyyy HH:mm"
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                          disableUnderline: true,
                        }}
                        style={{ borderRadius: "10px" }}
                        value={date}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-6"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={checkStatus === "completed" ? true : false}
                      variant="filled"
                      error={!validateForm() && isFormSubmitted}
                      label="Sample ID"
                      name={"sampleId"}
                      value={sampleId}
                      type="text"
                      className="textInputStyle"
                      onChange={onChangeValue}
                      InputLabelProps={{
                        shrink: true,
                        color: "black",
                      }}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div
                    className="col-md-12 col-sm-12"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      disabled={true}
                      label="Comments / Notes"
                      name={"comments"}
                      value={comments}
                      variant="filled"
                      className="textInputStyle"
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                        disableUnderline: true,
                      }}
                      InputLabelProps={{
                        className: classes.label,
                        classes: { label: classes.label },
                      }}
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div
                    className="col-md-12 col-sm-12"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      fullWidth
                      select
                      disabled={checkStatus === "completed" ? true : false}
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
                        disableUnderline: true,
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
              </div>
            ) : value === 1 ? (
              <div style={{ marginLeft: "-5px", marginRight: "-5px" }}>
                <div
                  className="row"
                  style={{ marginTop: "20px", marginBottom: "-10px" }}
                >
                  <div
                    className="col-md-12 col-sm-12 col-12"
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <label style={styles.upload}>
                      <TextField
                        required
                        type="file"
                        style={styles.input}
                        onChange={
                          checkStatus === "completed"
                            ? (e) => {
                                e.preventDefault();
                                setErrorMsg("Request is already completed");
                                setOpenNotification(true);
                              }
                            : onSlipUpload
                        }
                        name="results"
                        Error={errorMsg}
                      />
                      <FaUpload /> Results
                    </label>

                    {/* <div className={classes.progressbarroot}>
                      {progress === true ? (
                    
                        <LinearProgress style={{ height: 15 }} />
                      ) : (
                        undefined
                      )}
                    
                    </div> */}

                    {pdfView !== "" ? (
                      <div
                        className="row"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            color: "#2c6ddd",
                            fontStyle: "italic",
                          }}
                        >
                          <span style={{ color: "black" }}>
                            Selected File :{" "}
                          </span>
                          {pdfView}
                        </div>
                        <div>
                          <a
                            onClick={removeUploadedSlip}
                            style={{ marginLeft: "25px", color: "#e877a1" }}
                            href=""
                          >
                            <MdRemoveCircle /> Remove
                          </a>
                        </div>
                      </div>
                    ) : (
                      undefined
                    )}
                  </div>
                </div>

                <div className="row">
                  {results !== "" && results.includes("\\") ? (
                    <>
                      {results !== "" &&
                      results.slice(results.length - 3) !== "pdf" ? (
                        <div
                          className="col-md-6 col-sm-6 col-6"
                          style={{
                            ...styles.inputContainerForTextField,
                            ...styles.textFieldPadding,
                          }}
                        >
                          <img
                            src={uploadsUrl + results.split("\\")[1]}
                            className="depositSlipImg"
                          />
                        </div>
                      ) : results !== "" &&
                        results.slice(results.length - 3) === "pdf" ? (
                        <div
                          className="col-md-6 col-sm-6 col-6"
                          style={{
                            ...styles.inputContainerForTextField,
                            ...styles.textFieldPadding,
                            // textAlign:'center',
                          }}
                        >
                          <Button
                            href={uploadsUrl + results.split("\\")[1]}
                            style={{ color: "#2c6ddd" }}
                          >
                            Click here to open results
                          </Button>
                        </div>
                      ) : (
                        undefined
                      )}
                    </>
                  ) : results !== "" && results.includes("/") ? (
                    <>
                      {results !== "" &&
                      results.slice(results.length - 3) !== "pdf" ? (
                        <div
                          className="col-md-6 col-sm-6 col-6"
                          style={{
                            ...styles.inputContainerForTextField,
                            ...styles.textFieldPadding,
                          }}
                        >
                          <img
                            src={uploadsUrl + results}
                            className="depositSlipImg"
                          />
                        </div>
                      ) : results !== "" &&
                        results.slice(results.length - 3) === "pdf" ? (
                        <div
                          className="col-md-6 col-sm-6 col-6"
                          style={{
                            ...styles.inputContainerForTextField,
                            ...styles.textFieldPadding,
                          }}
                        >
                          <Button
                            href={uploadsUrl + results}
                            style={{ color: "#2c6ddd" }}
                          >
                            Click here to open results
                          </Button>
                        </div>
                      ) : (
                        undefined
                      )}
                    </>
                  ) : (
                    undefined
                  )}

                  {imagePreview !== "" ? (
                    <div
                      className="col-md-6 col-sm-6 col-6"
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <img src={imagePreview} className="depositSlipImg" />
                      <div className="row">
                        <div className="col-md-4 col-sm-5 col-5">
                          <Button
                            onClick={removeUploadedSlip}
                            style={{
                              ...styles.stylesForButton,
                              backgroundColor: "#e877a1",
                            }}
                            variant="contained"
                            color="primary"
                          >
                            <MdRemoveCircle size="16px" />
                            <strong
                              style={{ marginLeft: "5px", fontSize: "13px" }}
                            >
                              Remove
                            </strong>
                          </Button>
                        </div>
                        {results !== "" ? (
                          <div
                            className="col-md-4 col-sm-5 col-5"
                            style={{
                              marginTop: "10px",
                              fontWeight: "500",
                              color: "gray",
                              textAlign: "center",
                            }}
                          >
                            New results
                          </div>
                        ) : (
                          undefined
                        )}
                      </div>
                    </div>
                  ) : (
                    undefined
                  )}
                </div>
              </div>
            ) : (
              undefined
            )}

            <div
              className="row"
              style={{
                marginBottom: "30px",
                marginTop: "30px",
                marginLeft: "-30px",
                marginRight: "-30px",
              }}
            >
              <div className="col-md-6 col-sm-6 col-6">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                <Button
                  disabled={checkStatus === "completed" ? true : false}
                  onClick={updateLRByIdURI}
                  style={styles.stylesForButton}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Update</strong>
                </Button>
              </div>
            </div>
          </div>

          <Notification
            msg={errorMsg}
            open={openNotification}
            success={successMsg}
          />
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
