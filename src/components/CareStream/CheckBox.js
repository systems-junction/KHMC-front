import React from "react";
import { FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "#FBFBFB",
    marginTop: 20,
    marginLeft: 10,
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      //  color: "white",
      // we can make styling of checkbox here
    },
  },
}));
export default function CheckBox(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.root}
      control={<Checkbox name="checkedC" />}
      label={props.checkBoxValue}
    />
  );
}
