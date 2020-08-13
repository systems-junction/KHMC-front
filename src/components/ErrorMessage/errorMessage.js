import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const ErrorMsg = (props) => {
  return (
    <p style={{ color: "#ff0000", fontSize:13 }}>
      {props.name.length === 0 && props.isFormSubmitted ? "Required" : undefined}
    </p>
  );
};

export default ErrorMsg;
