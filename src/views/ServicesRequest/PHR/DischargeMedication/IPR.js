import React, { useState, useEffect } from "react";
import Notification from "../../../../components/Snackbar/Notification.js";
import CustomTable from "../../../../components/Table/Table";
import axios from "axios";
import _ from "lodash";
import {
  getDischargeIPRUrl,
  getDischarge,
  // getMaterialReceivingUrl,
} from "../../../../public/endpoins";
import Loader from "react-loader-spinner";
import Back from "../../../../assets/img/Back_Arrow.png";
import Header from "../../../../components/Header/Header";
import dischargeIcon from "../../../../assets/img/Discharge Medication.png";
import "../../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import Fingerprint from "../../../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../../../assets/img/Bar Code.png";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import QRCodeScannerComponent from "../../../../components/QRCodeScanner/QRCodeScanner";
import { useStyles1 } from "../../../../components/MuiCss/MuiCss";

const tableHeading = ["MRN", "Request Number", "Date", "Status", "Action"];
const tableDataKeys = [
  ["patientId", "profileNo"],
  "requestNo",
  "date",
  "status",
];

const styles = {
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const useStylesForInput = makeStyles((theme) => ({
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
    "&:focus": {
      boxShadow: "none",
      borderRadius: 5,
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
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
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
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    // "& .MuiFormLabel-root": {
    //   fontSize: "11px",

    //   paddingRight: "15px",
    // },
  },
  // label: {
  //   "&$focusedLabel": {
  //     color: "red",
  //     display: "none",
  //   },
  //   // "&$erroredLabel": {
  //   //   color: "orange"
  //   // }
  // },
  // focusedLabel: {},
}));

const actions = { view: true };

export default function Ipr(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStylesForInput();
  const classes1 = useStyles1();

  const [Ipr, setIpr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [searchPatientQuery, setSearchPatientQuery] = useState("");

  const [QRCodeScanner, setQRCodeScanner] = useState(false);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  useEffect(() => {
    // const socket = socketIOClient(socketUrl);
    // socket.emit("connection");
    // socket.on("get_data", (data) => {
    //   setMaterialReceivings(data.reverse());
    //   console.log("res after adding through socket", data);
    // });
    // return () => socket.disconnect();
    if (
      props.history.location.state &&
      props.history.location.state.comingFrom
    ) {
      if (
        props.history.location.state.comingFrom === "notifications" &&
        props.history.location.state.SearchId
      ) {
        handlePatientSearch(props.history.location.state.SearchId.profileNo);
      }
    } else {
      getIprsData();
    }
  }, []);

  function getIprsData() {
    axios
      .get(getDischarge)
      .then((res) => {
        if (res.data.success) {
          res.data.data.map(
            (d) => (d.date = d.dischargeRequest.dischargeMedication.date)
          );
          res.data.data.map((d) => (d.status = d.dischargeRequest.status));
          setIpr(res.data.data.reverse());
          var sortedObjs = _.sortBy(res.data.data, "date").reverse();
          setIpr(sortedObjs);
          console.log(sortedObjs, "ecr1");

          // setIpr(res.data.data.reverse())
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

  function handleView(rec) {
    let path = `ipr/viewIPR`;
    props.history.push({
      pathname: path,
      state: {
        selectedItem: rec,
        comingFor: "Ipr",
      },
    });
  }

  const handlePatientSearch = (e) => {
    let a;

    if (
      props.history.location.state &&
      props.history.location.state.comingFrom
    ) {
      if (
        props.history.location.state.comingFrom === "notifications" &&
        props.history.location.state.SearchId
      ) {
        a = e;
      }
    } else {
      a = e.target.value.replace(/[^\w\s]/gi, "");
    }

    setSearchPatientQuery(a);
    if (a.length >= 3) {
      axios
        .get(getDischarge + "/" + a)
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data);
              res.data.data.map(
                (d) => (d.date = d.dischargeRequest.dischargeMedication.date)
              );
              res.data.data.map((d) => (d.status = d.dischargeRequest.status));
              setIpr(res.data.data.reverse());
              var sortedObjs = _.sortBy(res.data.data, "date").reverse();
              setIpr(sortedObjs);
            } else {
              setIpr(" ");
            }
          }
        })
        .catch((e) => {
          console.log("error after searching patient request", e);
        });
    } else if (a.length == 0) {
      getIprsData();
    }
  };

  function scanQRCode() {
    setQRCodeScanner(true);
  }

  function handleScanQR(data) {
    setQRCodeScanner(false);
    console.log("data after parsing", JSON.parse(data).profileNo);

    handlePatientSearch({
      target: {
        value: JSON.parse(data).profileNo,
        type: "text",
      },
    });
  }

  if (QRCodeScanner) {
    return (
      <div>
        {QRCodeScanner ? (
          <QRCodeScannerComponent handleScanQR={handleScanQR} />
        ) : (
          undefined
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(19 213 159)",
        overflowY: "scroll",
      }}
    >
      <Header history={props.history} />

      <div className="cPadding">
        <div className="subheader" style={{ marginLeft: "-10px" }}>
          <div>
            <img src={dischargeIcon} />
            <h4>Discharge</h4>
          </div>
        </div>

        {props.history.location.state &&
        props.history.location.state.comingFrom &&
        props.history.location.state.comingFrom === "notifications" ? (
          undefined
        ) : (
          <div
            className={`${"container-fluid"} ${classes.root} ${classes1.root}`}
            style={{
              marginTop: "25px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div className="row">
              <div
                className="col-md-10 col-sm-9 col-8"
                style={styles.textFieldPadding}
              >
                <TextField
                  className="textInputStyle"
                  id="searchPatientQuery"
                  type="text"
                  variant="filled"
                  label="Search Patient by Name / MRN / National ID / Mobile Number"
                  name={"searchPatientQuery"}
                  value={searchPatientQuery}
                  onChange={handlePatientSearch}
                  InputLabelProps={{
                    classes: {
                      root: classes.label,
                      focused: classes.focusedLabel,
                      error: classes.erroredLabel,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                    className: classes.input,
                    classes: { input: classes.input },
                    disableUnderline: true,
                  }}
                />
              </div>

              <div
                className="col-md-1 col-sm-2 col-2"
                style={{
                  ...styles.textFieldPadding,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 5,
                    height: 55,
                  }}
                >
                  <img
                    src={BarCode}
                    onClick={scanQRCode}
                    style={{
                      width: matches ? 70 : 60,
                      height: matches ? 60 : 55,
                      cursor: "pointer",
                    }}
                  />{" "}
                </div>
              </div>

              <div
                className="col-md-1 col-sm-1 col-2"
                style={{
                  ...styles.textFieldPadding,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 5,
                    height: 55,
                  }}
                >
                  <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Ipr !== " " ? (
            <div>
              <div>
                <CustomTable
                  tableData={Ipr}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleView={handleView}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              </div>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
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
              <Notification msg={errorMsg} open={openNotification} />
            </div>
          ) : (
            // <div className='LoaderStyle'>
            //   <Loader type='TailSpin' color='red' height={50} width={50} />
            // </div>
            <div className="row " style={{ marginTop: "25px" }}>
              <div className="col-11">
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className="col-1" style={{ marginTop: 45 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ maxWidth: "60%", height: "auto", cursor: "pointer" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
