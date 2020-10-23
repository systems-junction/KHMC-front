import React from "react";
import Button from "@material-ui/core/Button";
import plus_icon from "../../assets/img/Plus.png";
import VIewAll from "../../assets/img/Eye.png";

const styles = {
  stylesForButton: {
    color: "white",
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "140px",
    height: "50px",
    outline: "none",
  },
};

// const getWidth= window.innerWidth
// const getheight= window.innerHeight

const buttonField = ({ onClick, name }) => {
  return (
    <Button
      onClick={onClick}
      style={{ ...styles.stylesForButton }}
      variant="contained"
      color="primary"
      className="mobile-btn"
    >
      {name === "add" ? (
        <>
          <img className="mobile-icon" src={plus_icon} />
          &nbsp;&nbsp;
          <strong>Add New</strong>
        </>
      ) : (
        <>
          <img className="mobile-icon-view" onClick={onClick} src={VIewAll} />
          &nbsp;&nbsp;
          <strong>View All</strong>
        </>
      )}
    </Button>
  );
};

export default buttonField;
