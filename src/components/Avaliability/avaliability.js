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
            name={"avaliable"}
            color="primary"
            checked={props.avaliable === "avaliable"}
            onChange={props.onChange}
            value="avaliable"
          />
        }
        label="Avaliable"
      />
      <FormControlLabel
        style={{ paddingLeft: 30 }}
        value="end"
        control={
          <Radio
            name={"avaliable"}
            color="primary"
            checked={props.avaliable === "not_avaliable"}
            onChange={props.onChange}
            value="not_avaliable"
          />
        }
        label="Not Avaliable"
      />
    </div>
  );
};

export default Avalibility;
