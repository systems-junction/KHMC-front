import React from "react";
import { makeStyles, TextField, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    "& .MuiSelect-root": {
      backgroundColor: "#FFFFFF",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      color: "black",
      transform: "translate(22px, 19px) scale(1)",
    },
    "& .MuiPaper-root": {
      top: 20,
      backgroundColor: "black",
    },
  },

  dropDown: {
    width: "100%",
    paddingRight: 10,
  },
}));

export default function DropDown(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        select
        fullWidth
        label="Abdominal Pain"
        name={"AbdominalPain"}
        value={"AbdominalPain"}
        onChange={props.dropDownHandler}
        variant="filled"
      >
        {props.dropDownArray.map((array) => {
          return (
            <MenuItem key={array.key} value={array.value}>
              {array.value}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
}
