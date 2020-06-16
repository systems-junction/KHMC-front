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
import { ToastsStore } from "react-toasts";
import cookie from "react-cookies";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import {
  addFunctionalUnitUrl,
  updateFunctionalUnitUrl,
  getFunctionalUnitLogsUrl,
} from "../../public/endpoins";

import Header from "../../components/Header/Header";

import view_all from "../../assets/img/view_all.png";
import functional_Unit from "../../assets/img/Functional Unit.png";

import Back_Arrow from "../../assets/img/Back_Arrow.png";

import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  //   marginLeft: 5,
  //   marginRight: 5
  // },

  // buttonContainer: {
  //   marginTop: 25
  // }

  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
 
  },

  buttonContainer: {
    marginTop: 25,
  },
};

const useStyles = makeStyles(styles);

function AddEditBuReturn(props) {
  const [comingFor, setcomingFor] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [fuLogs, setFuLogs] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const initialState = {
    _id: "",
    fuHead: "",
    fuName: "",
    description: "",
    status: "",
    buId: "",
    reason: "",
    fuLogId: "",
    statusArray: [],
    businessUnits: [],
    staffArray: [],
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
    fuName,
    description,
    fuHead,
    status,
    buId,
    reason,
    fuLogId,
    statusArray,
    businessUnits,
    staffArray,
  } = state;

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
    if (e.target.name === "status") {
      dispatch({ field: "reason", value: "" });
    }
  };

  function validateForm() {
    return (
      fuHead &&
      fuHead.length > 0 &&
      fuName &&
      fuName.length > 0 &&
      status &&
      status.length > 0 &&
      description &&
      description.length > 0
    );
  }

  function getFunctionalUnitLogs(id) {
    const param = {
      _id: id,
    };

    axios
      .get(getFunctionalUnitLogsUrl + "/" + param._id)
      .then((res) => {
        if (res.data.success) {
          setFuLogs(res.data.data);
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error is ", e);
      });
  }

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor);
    const selectedRec = props.history.location.state.selectedItem;
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === "object") {
          dispatch({ field: key, value: val._id });
          dispatch({ field: "reason", value: val.reason });
        } else {
          dispatch({ field: key, value: val });
          if (key === "_id") {
            // get all logs related to this id
            getFunctionalUnitLogs(val);
          }
        }
      });
    }
    if (props.history.location.state.statues) {
      dispatch({
        field: "statusArray",
        value: props.history.location.state.statues,
      });
    }
    if (props.history.location.state.businessUnits) {
      dispatch({
        field: "businessUnits",
        value: props.history.location.state.businessUnits,
      });
    }
    if (props.history.location.state.staff) {
      dispatch({
        field: "staffArray",
        value: props.history.location.state.staff,
      });
    }
  }, []);

  const handleCancel = () => {
    props.history.goBack();
  };

  const handleAdd = () => {
    // props.history.goBack();
    const currentUser = cookie.load("current_user");

    setIsFormSubmitted(true);

    const params = {
      fuName,
      description,
      fuHead,
      buId,
      status,
      reason,
      updatedBy: currentUser.name,
    };
    axios
      .post(addFunctionalUnitUrl, params)
      .then((res) => {
        if (res.data.success) {
          // props.history.goBack();
          props.history.push("success");
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error after adding bu inventory", e);
      });
  };

  const handleEdit = () => {
    setIsFormSubmitted(true);
    const currentUser = cookie.load("current_user");

    const params = {
      _id,
      fuName,
      description,
      fuHead,
      buId,
      status,
      reason,
      updatedBy: currentUser.name,
      fuLogId,
    };
    axios
      .put(updateFunctionalUnitUrl, params)
      .then((res) => {
        if (res.data.success) {
          props.history.goBack();
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error);
        }
      })
      .catch((e) => {
        console.log("error after adding bu inventory", e);
      });
  };

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
            <img src={functional_Unit} />
            <h4>
              {comingFor === "add"
                ? " Add Functional Unit"
                : " Edit Functional Unit"}
            </h4>
          </div>

          <div>
            <img onClick={() => props.history.goBack()} src={view_all} />
            {/* <img src={Search} /> */}
          </div>
        </div>


      <div
        style={{
          flex: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="row">
          <div className="col-md-12" style={styles.inputContainerForTextField}>
            {/* <TextField
              fullWidth
              id="fuName"
              name="fuName"
              label="Functional Unit Name"
              // variant="outlined"
              value={fuName}
              onChange={onChangeValue}
            /> */}

            <input
              type="text"
              placeholder="FU Name"
              name={"fuName"}
              value={fuName}
              onChange={onChangeValue}
              className="textInputStyle"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12" style={styles.inputContainerForTextField}>
            {/* <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              // variant="outlined"
              value={description}
              multiline
              rows={5}
              onChange={onChangeValue}
            /> */}
            <textarea
              type="text"
              placeholder="Description"
              name={"description"}
              rows="4"
              value={description}
              onChange={onChangeValue}
              className="textInputStyle"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainerForDropDown}>
              <InputLabel id="buHead-label">FU Head</InputLabel>
              <Select
                fullWidth
                id="fuHead"
                name="fuHead"
                value={fuHead}
                onChange={onChangeValue}
                label="FU Head"
                error={!fuHead && isFormSubmitted}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {staffArray &&
                  staffArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.firstName} {val.lastName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>

          <div className="col-md-12">
            <div style={styles.inputContainerForDropDown}>
              <InputLabel id="buName-label">BU Name</InputLabel>
              <Select
                fullWidth
                id="buId"
                name="buId"
                value={buId}
                onChange={onChangeValue}
                label="BU Name"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {businessUnits &&
                  businessUnits.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.buName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div style={styles.inputContainerForDropDown}>
              <InputLabel id="buHead-label">Status</InputLabel>
              <Select
                fullWidth
                id="status"
                name="status"
                value={status}
                onChange={onChangeValue}
                label="Status"
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
            </div>
          </div>

          {status === "in_active" ? (
            <div className="col-md-12">
              <div style={styles.inputContainerForTextField}>
                {/* <TextField
                  fullWidth
                  id="reason"
                  name="reason"
                  label="Resaon"
                  // variant="outlined"
                  value={reason}
                  onChange={onChangeValue}
                /> */}
                     <input
                  type="text"
                  placeholder="Reason"
                  name={"reason"}
                  value={reason}
                  onChange={onChangeValue}
                  className="textInputStyle"
                  style={{borderColor:'red', borderWidth:4}}
                />
              </div>
            </div>
          ) : (
            undefined
          )}
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
            {comingFor === "add" ? (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleAdd}
                variant="contained"
                color="primary"
              >
                Add Functional Unit
              </Button>
            ) : (
              <Button
                style={{ width: "60%" }}
                disabled={!validateForm()}
                onClick={handleEdit}
                variant="contained"
                color="primary"
              >
                Edit Functional Unit
              </Button>
            )}
          </div>
        </div>

        <div>
          {comingFor === "edit" ? (
            <>
              <Table className="mt20">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Last Updated By</TableCell>
                    <TableCell>Last Updated at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fuLogs &&
                    fuLogs
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((prop, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              {prop.status === "active"
                                ? "Active"
                                : "In Active"}
                            </TableCell>
                            <TableCell>
                              {prop.reason ? prop.reason : "N/A"}
                            </TableCell>
                            <TableCell>{prop.updatedBy}</TableCell>
                            <TableCell>
                              {new Date(prop.updatedAt).getDate()}/
                              {new Date(prop.updatedAt).getMonth() + 1}/
                              {new Date(prop.updatedAt).getFullYear()}{" "}
                              {new Date(prop.updatedAt).getHours()}
                              {":"}
                              {new Date(prop.updatedAt).getMinutes()}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={fuLogs && fuLogs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          ) : (
            undefined
          )}
        </div>

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
export default AddEditBuReturn;
