import React, { useEffect, useState, useReducer } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const styles = {
  styleForLabel: {
    fontWeight: "700",
    color: "white",
  },
};
const useStyles = makeStyles(styles);

const InputLabelComponent = (props) => {
  return (
    <InputLabel style={styles.styleForLabel}>{props.children} </InputLabel>
  );
};

export default InputLabelComponent;
