import React from "react";
import {
  makeStyles,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import CheckBox from "./CheckBox";
import DropDown from "./DropDown";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    ".MuiMenu-paper": {
      top: 80,
      left: 2,
    },
  },
  scrollBar: {
    maxHeight: "200px",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  title: {
    color: "#A1A1A1",
    fontSize: 20,
    fontWeight: 400,
    paddingLeft: 10,
  },
  dropDown: {
    width: "100%",
    paddingRight: 10,
  },
}));

export default function CareSteam(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{props.title}</h2>
      <div className={classes.scrollBar}>
        {props.checkBoxes.map((object) => {
          return <CheckBox checkBoxValue={object.key} />;
        })}
      </div>
    </div>
  );
}
