/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
import Header from "../../components/Header/Header";
import business_Unit from "../../assets/img/Purchase Order.png";
import Back from "../../assets/img/Back_Arrow.png";
import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CustomTable from "../../components/Table/Table";
import plus_icon from "../../assets/img/Plus.png";
import ViewSingleRequest from "./viewRequest";
import Notification from "../../components/Snackbar/Notification.js";
import TextArea from "../../components/common/TextArea";
import axios from "axios";
import { updateIPR, getSingleIPRPatient } from "../../public/endpoins";

const tableHeadingForDischargeMed = [
  "Request ID",
  "Date/Time",
  "Status",
  "Action",
];
const tableDataKeysForDischargeMed = [
  ["requester", "identificationNumber"],
  "date",
  "status",
];
const actions = { view: true };
const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: "20px",
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    height: "50px",
    outline: "none",
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "gray",
  },
};

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
});

function DischargeRequest(props) {
  const classesForTabs = useStylesForTabs();

  const initialState = {
    dischargeMedArray: "",

    otherNotes: "",
    dischargeNotes: "",
  };

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    dischargeMedArray,

    otherNotes,
    dischargeNotes,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const [, setCurrentUser] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [value, setValue] = React.useState(0);
  const [openItemDialog, setOpenItemDialog] = useState(false);
  const [item, setItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [requestNo, setrequestNo] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setCurrentUser(cookie.load("current_user"));

    console.log(props.history.location.state.selectedItem);

    // const selectedRec = props.history.location.state.selectedItem

    // setSelectedItem(props.history.location.state.selectedItem)
    setId(props.history.location.state.selectedItem._id);
    setrequestNo(props.history.location.state.selectedItem.requestNo);
    setSelectedPatient(props.history.location.state.selectedItem.patientId);

    getEDRdetails();

    // if (selectedRec) {
    //   Object.entries(selectedRec).map(([key, val]) =>
    //   {
    //     if (val && typeof val === "object")
    //     {
    //       if (key === "dischargeRequest")
    //       {
    //         // console.log("INNNN dischargeRequest",key,val)
    //         Object.entries(val).map(([key1,val1])=>
    //         {

    //           if(key1 === "dischargeSummary")
    //           {
    //             // console.log("INNNN dischargeSummary",key1,val1)
    //             dispatch({ field: 'dischargeNotes', value: val1.dischargeNotes })
    //             dispatch({ field: 'otherNotes', value: val1.otherNotes })
    //           }
    //           else if(key1 === "dischargeMedication")
    //           {
    //             console.log("INNNN dischargeMedication",key1,val1)
    //             dispatch({ field: "dischargeMedArray", value: [val1] })
    //           }
    //         })
    //       }
    //     } else {
    //       dispatch({ field: key, value: val });
    //     }
    //   });
    // }
  }, []);

  function getEDRdetails() {
    axios
      .get(
        getSingleIPRPatient +
          "/" +
          props.history.location.state.selectedItem._id
      )
      .then((res) => {
        if (res.data.success) {
          console.log(
            "response after getting the IPR details",
            res.data.data[0]
          );
          setSelectedItem(res.data.data[0]);
          const selectedRec = res.data.data[0];

          if (selectedRec) {
            Object.entries(selectedRec).map(([key, val]) => {
              if (val && typeof val === "object") {
                if (key === "dischargeRequest") {
                  // console.log("INNNN dischargeRequest",key,val)
                  Object.entries(val).map(([key1, val1]) => {
                    if (key1 === "dischargeSummary") {
                      console.log(key1, val1);
                      dispatch({
                        field: "dischargeNotes",
                        value: val1.dischargeNotes,
                      });
                      dispatch({ field: "otherNotes", value: val1.otherNotes });
                    } else if (key1 === "dischargeMedication") {
                      // console.log("INNNN dischargeMedication",key1,val1)
                      dispatch({ field: "dischargeMedArray", value: [val1] });
                    }
                  });
                }
              } else {
                dispatch({ field: key, value: val });
              }
            });
          }
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function viewItem(item) {
    if (item !== "") {
      setOpenItemDialog(true);
      setItem(item.id);
    } else {
      setOpenItemDialog(false);
      setItem("");
    }
  }

  const addNewRequest = () => {
    let path = `addDischargeRequest`;
    props.history.push({
      pathname: path,
      state: {
        comingFor: "add",
        selectedItem: selectedItem,
        dischargeMedArray,
      },
    });
  };

  const submitDischargeSummary = () => {
    const params = {
      _id: id,
      dischargeRequest: {
        dischargeSummary: {
          dischargeNotes: dischargeNotes,
          otherNotes: otherNotes,
        },
      },
    };
    console.log("params", params);
    axios
      .put(updateIPR, params)
      .then((res) => {
        if (res.data.success) {
          console.log("response while adding Discharge Req", res.data.data);
          props.history.goBack();
        } else if (!res.data.success) {
          setOpenNotification(true);
          setErrorMsg("Error while adding the Discharge request");
        }
      })
      .catch((e) => {
        console.log("error after adding Discharge request", e);
        setOpenNotification(true);
        setErrorMsg("Error after adding the Discharge request");
      });
  };

  const onClick = () => {
    setValue(value + 1);
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

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>EDR - Discharge Request</h4>
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
                <input
                  disabled={true}
                  type="text"
                  placeholder="Patient Name"
                  name={"patientName"}
                  value={
                    selectedPatient.firstName + ` ` + selectedPatient.lastName
                  }
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Gender
                </InputLabel>
                <input
                  disabled={true}
                  type="text"
                  placeholder="Gender"
                  name={"gender"}
                  value={selectedPatient.gender}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Age
                </InputLabel>
                <input
                  disabled={true}
                  type="text"
                  placeholder="Age"
                  name={"age"}
                  value={selectedPatient.age}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Patient ID
                </InputLabel>
                <input
                  disabled={true}
                  type="text"
                  placeholder="Patient ID"
                  name={"patientId"}
                  value={selectedPatient.profileNo}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Insurance No
                </InputLabel>
                <input
                  disabled={true}
                  type="text"
                  placeholder="Insurance Number"
                  name={"insuranceId"}
                  value={
                    selectedPatient.insuranceId
                      ? selectedPatient.insuranceId
                      : "--"
                  }
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id="status-label">
                  Request No
                </InputLabel>
                <input
                  disabled={true}
                  type="text"
                  placeholder="Request Number"
                  name={"requestNo"}
                  value={requestNo}
                  onChange={onChangeValue}
                  className="textInputStyle"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "20px",
          }}
        />
        <div className={classesForTabs.root}>
          <Tabs
            classes={{
              root: classesForTabs.root,
              scroller: classesForTabs.scroller,
            }}
            value={value}
            onChange={handleChange}
            indicatorColor="null"
            centered={false}
            variant="scrollable"
            fullWidth={true}
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 0 ? "#2c6ddd" : undefined,
              }}
              label="Discharge Summary"
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 15,
                outline: "none",
                backgroundColor: value === 1 ? "#2c6ddd" : undefined,
              }}
              label="Discharge Medication"
            />
          </Tabs>
        </div>

        {value === 0 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          >
            <div style={{ marginTop: "20px" }} className="row">
              <div className="col-md-12 col-sm-12 col-12">
                <TextArea
                  type="text"
                  placeholder="Discharge Notes"
                  name={"dischargeNotes"}
                  value={dischargeNotes}
                  onChange={onChangeValue}
                  rows="4"
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }} className="row">
              <div className="col-md-12 col-sm-12 col-12">
                <TextArea
                  type="text"
                  placeholder="Other Notes"
                  name={"otherNotes"}
                  value={otherNotes}
                  onChange={onChangeValue}
                  rows="4"
                />
              </div>
            </div>

            <div
              className="row d-flex"
              style={{ marginBottom: "25px", marginTop: "25px" }}
            >
              <div className="mr-auto p-2">
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    marginTop: "7px",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="p-2">
                <Button
                  style={styles.stylesForButton}
                  //disabled={!validateFormType1()}
                  onClick={onClick}
                  variant="contained"
                  color="primary"
                >
                  Next
                </Button>
              </div>
              <div className="p-2">
                <Button
                  onClick={submitDischargeSummary}
                  style={styles.stylesForButton}
                  variant="contained"
                  color="primary"
                >
                  <strong style={{ fontSize: "12px" }}>Submit</strong>
                </Button>
              </div>
            </div>
          </div>
        ) : value === 1 ? (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          >
            <div className="row" style={{ marginTop: "20px" }}>
              {dischargeMedArray !== 0 ? (
                <CustomTable
                  tableData={dischargeMedArray}
                  tableDataKeys={tableDataKeysForDischargeMed}
                  tableHeading={tableHeadingForDischargeMed}
                  handleView={viewItem}
                  action={actions}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              ) : (
                undefined
              )}
            </div>

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
                  onClick={addNewRequest}
                  style={styles.stylesForButton}
                  variant="contained"
                  color="primary"
                >
                  <img className="icon-style" src={plus_icon} />
                  &nbsp;&nbsp;
                  <strong style={{ fontSize: "12px" }}>Pharmacy Request</strong>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ flex: 4, display: "flex", flexDirection: "column" }}
            className="container"
          ></div>
        )}

        {openItemDialog ? (
          <ViewSingleRequest
            item={item}
            openItemDialog={openItemDialog}
            viewItem={viewItem}
          />
        ) : (
          undefined
        )}

        <Notification msg={errorMsg} open={openNotification} />
      </div>
    </div>
  );
}
export default DischargeRequest;
