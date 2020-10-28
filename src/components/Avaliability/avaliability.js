import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Avalibility = (props) => {
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FormControlLabel
        style={{ paddingRight: 30 }}
        control={
          <Radio
            name={"available"}
            color="primary"
            checked={props.avaliable === "available"}
            onChange={props.onChange}
            value="available"
          />
        }
        label="Available"
      />
      <FormControlLabel
        style={{ paddingLeft: 30 }}
        value="end"
        control={
          <Radio
            name={"available"}
            color="primary"
            checked={props.avaliable === "not_available"}
            onChange={props.onChange}
            value="not_available"
          />
        }
        label="Not Available"
      />
    </div>
  );
};

export default Avalibility;
