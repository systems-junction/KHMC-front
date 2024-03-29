import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "../../../../components/Header/Header";
import InvestigationsIcon from "../../../../assets/img/Investigations Icon.png";
import DownloadIcon from "../../../../assets/img/Download Icon.png";
import PrintIcon from "../../../../assets/img/Print Icon.png";
import BodyIcon from "../../../../assets/img/body.png";
import SkinIcon from "../../../../assets/img/Skin_rashes.png";

import Button from "@material-ui/core/Button";
import DetailBlock from "../../../../components/DHR/DCD/ViewPhysicalExam/detailBlock";

import _ from "lodash";

const styles = {
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  save: {
    cursor: "pointer",
    borderRadius: 5,
    backgroundColor: "#2973CF",
    width: "180px",
    height: "50px",
    outline: "none",
    color: "white",
  },
  Edit: {
    cursor: "pointer",
    borderRadius: 5,
    width: "180px",
    height: "50px",
    outline: "none",
    border: "2px solid gray",
    backgroundColor: "#FEFEFE",
  },
};
const detailsBlockArray = [
  {
    heading: "Emergency Department Course",
    subArray: [
      {
        subheading: "Emergency Department Course",
        description:
          "Lorem ipsum, or lipsum as it is sometimes known, is dummy text. ",
      },
      {
        subheading: "Unchanged",
      },
      {
        subheading: "Re Examined",
        description:
          " Lorem ipsum, or lipsum as it is sometimes known, is dummy text. ",
      },
      {
        subheading:
          "Counseled Patient / Family regarding lab results diagnosis need for follow up",
      },
    ],
  },
];
const useStylesForInput = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    boxShadow: "none",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
      borderRadius: 5,
    },
  },
  multilineColor: {
    boxShadow: "none",
    backgroundColor: "white",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "&:after": {
      borderBottomColor: "black",
      boxShadow: "none",
    },
    "&:focus": {
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
      boxShadow: "none",
    },
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "& .MuiFormLabel-root": {
      fontSize: "12px",
      paddingRight: "15px",
    },
  },
  label: {
    "&$focusedLabel": {
      color: "red",
      display: "none",
    },
    // "&$erroredLabel": {
    //   color: "orange"
    // }
  },
  focusedLabel: {},
}));
const actions = { view: true };
export default function ViewPhysicalExam(props) {
  const classes = useStylesForInput();
  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        // backgroundColor: "rgb(19 213 159)",
        overflowY: "scroll",
        border: "1p",
      }}
    >
      <Header history={props.history} />
      <div className="cPadding">
        <div className="subheader" style={{ marginBottom: 45 }}>
          <div className="col-md-6 col-6">
            <img src={InvestigationsIcon} />
            <h4
              style={{
                color: "#000000",
                fontSize: "40px",
                fontWeight: "bolder",
              }}
            >
              Investigations
            </h4>
          </div>
          <div className="col-md-6 col-6">
            <img
              style={{ width: 35, height: "inherit", marginRight: 10 }}
              src={DownloadIcon}
            />
            <img style={{ width: 35, height: "inherit" }} src={PrintIcon} />
          </div>
        </div>
        <div
          style={{ flex: 4, display: "flex", flexDirection: "column" }}
          className={`${"container-fluid"} ${classes.root}`}
        >
          {detailsBlockArray.map((arr) => {
            return (
              <DetailBlock heading={arr.heading} subArray={arr.subArray} />
            );
          })}

          <div>
            <div
              style={{
                display: "flex",
                // flex: 1,
                justifyContent: "flex-end",
                marginTop: "30px",
                marginBottom: "2%",
                // paddingRight: !matches ? 20 : 0,
              }}
              className="row"
            >
              <>
                <Button style={styles.Edit} variant="contained" color="default">
                  Edit
                </Button>
                &nbsp;&nbsp;
                <Button style={styles.save} variant="contained" color="default">
                  Save
                </Button>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
