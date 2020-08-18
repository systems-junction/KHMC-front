/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import Header from "../../components/Header/Header";
import business_Unit from "../../assets/img/business_Unit.png";
import Back from "../../assets/img/Back_Arrow.png";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const styles = {
  patientDetails: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: "20px",
  },
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  input: {
    display: "none",
  },
  stylesForPurchaseButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2C6DDD",
    width: "10%",
    height: "50px",
    outline: "none",
  },
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 15,
    backgroundColor: "#2c6ddd",
    height: "50px",
    outline: "none",
    width: 120,
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: "700",
    color: "gray",
  },

  inputField: {
    outline: "none",
  },
  upload: {
    backgroundColor: "white",
    border: "0px solid #ccc",
    borderRadius: "5px",
    color: "gray",
    // marginTop: "30px",
    width: "100%",
    height: "55px",
    cursor: "pointer",
    padding: "15px",
  },
};

const useStyles = makeStyles((theme) => ({
  rootTab: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:disabled": {
      color: "gray",
    },
  },
  multilineColor: {
    backgroundColor: "white",
    borderRadius: 6,
    "&:hover": {
      backgroundColor: "white",
    },
    "&:after": {
      borderBottomColor: "black",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));
export default function PurchaseRequest(props) {
  const classes = useStyles();
  const [names, setNames] = useState([{ use: "", family: "", prefix: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...names];
    list[index][name] = value;
    setNames(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...names];
    list.splice(index, 1);
    setNames(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setNames([...names, { use: "", family: "", prefix: "" }]);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    console.log("====================================");
    console.log(names);
    console.log("====================================");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#60d69f",
        overflowY: "scroll",
      }}
    >
      <Header />
      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={business_Unit} />
            <h4>Patient FHIR</h4>
          </div>
        </div>

        <form onSubmit={handleSubmitClick}>
          {names.map((x, i) => {
            return (
              <div className="row">
                <div
                  className="col-md-3 col-sm-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    name="use"
                    label="Use"
                    variant="filled"
                    value={x.use}
                    onChange={(e) => handleInputChange(e, i)}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>

                <div
                  className="col-md-3 col-sm-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    name="family"
                    variant="filled"
                    label="Family"
                    value={x.family}
                    onChange={(e) => handleInputChange(e, i)}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>

                <div
                  className="col-md-3 col-sm-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    variant="filled"
                    name="prefix"
                    label="Prefix"
                    value={x.prefix}
                    onChange={(e) => handleInputChange(e, i)}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>

                <div
                  className="col-md-3 col-sm-6"
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  {names.length !== 1 && (
                    <RemoveIcon
                      fontSize="large"
                      style={{
                        background: "red",
                      }}
                      onClick={() => handleRemoveClick(i)}
                    />
                  )}

                  {names.length - 1 === i && (
                    <AddIcon
                      fontSize="large"
                      onClick={handleAddClick}
                      style={{
                        background: "blue",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div
            className="col-md-12 col-sm-6 "
            style={{
              ...styles.inputContainerForTextField,
              ...styles.textFieldPadding,
            }}
          >
            <Button
              style={styles.stylesForPurchaseButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </form>

        {/*
          <div style={{ marginTop: 20 }}>{JSON.stringify(names)}</div>
        
        */}
        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        ></div>
        <div style={{ marginBottom: 20 }}>
          <img
            // onClick={() => props.history.goBack()}
            src={Back}
            style={{ width: 45, height: 35, cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
