/*eslint-disable*/
import React, { useReducer, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import capitilizeLetter from "../../public/capitilizeLetter";
import cookie from "react-cookies";
import CustomTable from "../../components/Table/Table";
import TextField from "@material-ui/core/TextField";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import {
  updateEdrIprItem,
  notifyConsultation,
  audioURL,
} from "../../public/endpoins";
import axios from "axios";
import Notification from "../../components/Snackbar/Notification.js";
import AudioNotes from "../../components/AudioNotes/audioNotes";

import Loader from "react-loader-spinner";

import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const tableHeadingForPHR = [
  "Medicine Name",
  "Requested Qty",
  "Dosage",
  "Frequency",
  "Duration",
  "",
];
const tableDataKeysForPHR = [
  "medicineName",
  "requestedQty",
  "dosage",
  "frequency",
  "duration",
];

// const actions = { view: false };

const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 35,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: "700",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2c6ddd",
    width: "130px",
    height: "45px",
    outline: "none",
  },
};
const stylesB = {
  stylesForActive: {
    verticalAlign: "center",
    fontSize: "0.62rem",
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    background: "#2c6ddd",
    width: "100px",
    height: "45px",
    outline: "none",
    boxShadow: "none",
  },
  stylesForInActive: {
    verticalAlign: "center",
    fontSize: "0.62rem",
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    background: "#845DC2",
    width: "100px",
    height: "45px",
    outline: "none",
    boxShadow: "none",
  },
  stylesForReceived: {
    verticalAlign: "center",
    fontSize: "0.62rem",
    color: "white",
    cursor: "pointer",
    borderRadius: 10,
    background: "#845DC2",
    width: "100px",
    height: "45px",
    boxShadow: "none",
    outline: "none",
  },
};

const useStylesForInput = makeStyles((theme) => ({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
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
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
  },
}));

const useStyles = makeStyles(styles);

export default function EdrRequest(props) {
  const classes = useStylesForInput();

  const initialState = { consultationNotes: "" };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const { consultationNotes } = state;

  const [currentUser, setCurrentUser] = React.useState(
    cookie.load("current_user")
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [itemID, setitemID] = useState("");
  const [id, setId] = useState("");
  const [requestType, setrequestType] = useState("");
  const [patientId, setpatientId] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [fileAudio, setFileAudio] = useState({});
  const [blobURL, setblobURL] = useState("");

  const [isBlocked, setIsBlocked] = useState(false);

  const [response, setResponse] = useState("");
  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          setIsBlocked(false);
        },
        () => {
          console.log("Permission Denied");
          setIsBlocked(true);
        }
      );

    setpatientId(props.patientId);
    setitemID(props.item._id);

    setId(props.id);
    setrequestType(props.requestType);
  }, []);

  const replaceSlugToTitle = (val) => {
    if (
      val === "complete" ||
      val === "Complete" ||
      val === "pending" ||
      val === "modify" ||
      val === "closed" ||
      val === "delivered" ||
      val === "partially completed" ||
      val === "approved" ||
      val === "Approved" ||
      val === "Analysis In Progress" ||
      val === "reject" ||
      val === "response in progress" ||
      val === "partial approved" ||
      val === "Partial Approved" ||
      val === "completed" ||
      val === "approve" ||
      val === "received" ||
      val === "Partially Received" ||
      val === "Cannot be fulfilled" ||
      val === "Item Returned to Warehouse" ||
      val === "Returned" ||
      val === "receive" ||
      val === "Received" ||
      val === "rejected" ||
      val === "Sent for PAR"
    ) {
      return (
        <>
          {val === "complete" || val === "Complete" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : val === "Sent for PAR" ? (
            <Button
              style={{ ...stylesB.stylesForActive, width: "120px" }}
              variant="contained"
              color="primary"
            >
              <strong>Sent for PAR</strong>
            </Button>
          ) : val === "closed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>closed</strong>
            </Button>
          ) : val === "pending" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>pending</strong>
            </Button>
          ) : val === "modify" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Modify</strong>
            </Button>
          ) : val === "delivered " ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>Delivered </strong>
            </Button>
          ) : val === "completed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Completed</strong>
            </Button>
          ) : val === "approved" || val === "Approved" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          ) : val === "partial approved" || val === "Partial Approved" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
                backgroundColor: "#2c6ddd",
                width: "150px",
              }}
              variant="contained"
              color="primary"
            >
              <strong>partial approved</strong>
            </Button>
          ) : val === "partially completed" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
                backgroundColor: " #2c6ddd",
              }}
              variant="contained"
              color="primary"
            >
              <strong>partially completed</strong>
            </Button>
          ) : val === "response in progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Response in progress</strong>
            </Button>
          ) : val === "reject" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>Reject</strong>
            </Button>
          ) : val === "received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "rejected" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Rejected</strong>
            </Button>
          ) : val === "Analysis In Progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive, width: "150px" }}
              variant="contained"
              color="primary"
            >
              <strong>Analysis In Progress</strong>
            </Button>
          ) : val === "receive" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Receive</strong>
            </Button>
          ) : val === "Partially Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Partially Received</strong>
            </Button>
          ) : val === "approve" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approve</strong>
            </Button>
          ) : val === "Cannot be fulfilled" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Cannot be fulfilled</strong>
            </Button>
          ) : val === "Returned" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          ) : val === "Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          )}
        </>
      );
    }

    return capitilizeLetter(val);
  };

  const handleSubmit = () => {
    let formData = new FormData();

    if (fileAudio) {
      formData.append("file", fileAudio);
    }
    const params = {
      consultationNotes: consultationNotes,
      doctorNotes: props.item.doctorNotes,
      id: id,
      itemID: itemID,
      requestType: requestType,
      status: "Complete",
      consultationNo: props.item.consultationNo,
    };
    formData.append("data", JSON.stringify(params));
    console.log("PARAMSS ", formData);
    axios
      .put(updateEdrIprItem, formData)
      .then((res) => {
        if (res.data.success) {
          setOpenNotification(true);
          setsuccessMsg("Submitted");
          window.location.reload(false);
          console.log(res.data, "test");
          notifyForConsult(patientId);
        } else if (!res.data.success) {
          setOpenNotification(true);
          setErrorMsg("Error while submitting Request");
        }
      })
      .catch((e) => {
        console.log("error after submitting Request", e);
        setOpenNotification(true);
        setErrorMsg("Error while submitting Request");
      });
  };

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  // const uploadFile = (selectedFile) => {

  // };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log("blob", blob);
        const blobURL = URL.createObjectURL(blob);
        console.log("blob after", blobURL);
        setblobURL(blobURL);
        setIsRecording(false);
        var file = new File([blob], "first", { type: "audio/mp3" });
        setFileAudio(file);
      })
      .catch((e) => console.log(e));
  };

  const getFile = () => {
    var url = "http://localhost:4000/api/patient";
    axios
      .get(`${url}/updateEdrIprItem`)
      .then((res) => {
        if (res.data.success) {
          console.log("response after adding item", res.data.data);
          setResponse(res.data.data);
        } else if (!res.data.success) {
        }
      })
      .catch((e) => {
        console.log("error after adding item", e);
      });
  };

  const notifyForConsult = (id) => {
    axios
      .get(notifyConsultation + "/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log("error after notify", e);
        setOpenNotification(true);
        setErrorMsg(e);
      });
  };

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
      setsuccessMsg("");
    }, 2000);
  }

  return (
    <Dialog
      onClose={() => props.viewItem("")}
      fullWidth={true}
      maxWidth={"lg"}
      bodyStyle={{ backgroundColor: "red" }}
      contentStyle={{ backgroundColor: "red" }}
      aria-labelledby="simple-dialog-title"
      open={props.openItemDialog}
    >
      <DialogContent style={{ backgroundColor: "#31e2aa" }}>
        <DialogTitle id="simple-dialog-title" style={{ color: "white" }}>
          Details
        </DialogTitle>
        <div className={`container-fluid ${classes.root}`}>
          <Notification
            msg={errorMsg}
            open={openNotification}
            success={successMsg}
          />
          <div className="row">
            <div
              className="col-md-12 col-sm-12 col-12 d-flex justify-content-center text-center"
              style={styles.inputContainerForTextField}
            >
              <TextField
                // disabled={true}
                multiline
                label="Consultation Notes "
                name={"consultationNotes"}
                value={consultationNotes}
                onChange={onChangeValue}
                className="textInputStyle"
                rows={4}
                variant="filled"
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                  disableUnderline: true,
                }}
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12 col-sm-12 col-12"
              style={styles.inputContainerForTextField}
            >
              {props.item.doctorNotes ? (
                <div>
                  <TextField
                    required
                    // multiline
                    disabled={true}
                    label="Doctor Notes"
                    name={"doctorNotes"}
                    value={props.item.doctorNotes}
                    rows={4}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
            <div
              className="col-md-12 col-sm-12 col-12"
              style={styles.inputContainerForTextField}
            >
              {props.item.note ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label="Note"
                    name={"note"}
                    value={props.item.note}
                    rows={4}
                    className="textInputStyle"
                    variant="filled"
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>

          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <label
              style={{
                paddingLeft: 17,
                paddingTop: 15,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Record Voice Notes
            </label>
            <div>
              {props.item.audioNotes ? (
                <audio
                  style={{ marginTop: 10, marginLeft: 30 }}
                  src={`${audioURL}/${props.item.audioNotes}`}
                  controls="controls"
                />
              ) : !isRecording ? (
                <audio
                  style={{ marginTop: 10, marginLeft: 30 }}
                  src={blobURL}
                  controls="controls"
                />
              ) : (
                <div
                  style={{
                    marginTop: 15,
                    marginLeft: 110,
                    marginRight: 110,
                    width: 100,
                  }}
                >
                  <Loader
                    type="ThreeDots"
                    color="blue"
                    height={40}
                    width={40}
                    //3 secs
                  />
                </div>
              )}

              {/* {response &&
                response.map((link) => {
                  return (
                    <audio src={`${baseUrl}${link.abc}`} controls="controls" />
                  );
                })}
              <button
                type="button"
                style={{ marginTop: 10 }}
                class="btn btn-success btn-block"
                onClick={getFile}
              >
                Get All Notes File
              </button> */}
            </div>

            <div style={{ marginTop: 15 }}>
              {!props.item.audioNotes ? (
                <div>
                  {isRecording ? (
                    <StopIcon
                      fontSize="large"
                      onClick={stop}
                      disabled={!isRecording}
                      color="secondary"
                    />
                  ) : (
                    <MicIcon
                      style={{ marginTop: -10 }}
                      fontSize="large"
                      onClick={start}
                      disabled={isRecording}
                      color="primary"
                    />
                  )}
                </div>
              ) : (
                undefined
              )}

              {/* {!props.item.audioNotes ? (
                <StopIcon
                  onClick={stop}
                  disabled={!isRecording}
                  color="secondary"
                />
              ) : (
                undefined
              )} */}
            </div>
          </div>

          {/* <div className="row">
            <div
              className="col-md-12 col-sm-12 col-12 d-flex justify-content-center text-center"
              style={styles.inputContainerForTextField}
            >
              {props.item.status ? (
                <div>
                  <InputLabel style={styles.styleForLabel} id="generated-label">
                    Status
                  </InputLabel>
                  {replaceSlugToTitle(props.item.status)}
                </div>
              ) : (
                undefined
              )}
            </div>
          </div> */}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginTop: "2%", marginBottom: "2%" }}>
              <Button onClick={() => props.viewItem("")} variant="contained">
                Cancel
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Button
                style={styles.stylesForButton}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
