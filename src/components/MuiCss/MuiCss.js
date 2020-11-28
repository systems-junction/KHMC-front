import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { DivideCircle } from "react-feather";

const useStyles1 = makeStyles((theme) => ({
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
      color: "black",
    },
    "& .MuiFormLabel-root": {
      fontSize: "11px",
      paddingRight: "50px",
    },
  },
  label: {
    "&$focusedLabel": {
      //   display: "none",
    },
  },
  focusedLabel: {},

  // label: {
  //   "&:focused": {
  //     color: "black",
  //   },
  //   "&:after": {
  //     color: "black",
  //   },
  // },
}));

export { useStyles1 };
