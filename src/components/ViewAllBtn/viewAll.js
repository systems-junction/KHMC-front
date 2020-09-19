import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import view_all from "../../assets/img/Eye.png";

const styles = {
  stylesForButton: {
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "120px",
    height: "40px",
    // outline: "none",
    borderWidth:0,
    color:'white',
    // fontWeight:700,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: '0.1px 1.5px #44536b'
    // fontSize:50
  },
};

const useStyles = makeStyles((theme) => ({}));
function ViewAllBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <button
        onClick={() => props.history.goBack()}
        style={styles.stylesForButton}
        // variant="contained"
        // color="primary"
      >
        <img className="icon-view" src={view_all} />
        &nbsp;&nbsp;
        <strong style={{ fontSize: "12px" }}>View All</strong>
      </button>
    </div>
  );
}
export default ViewAllBtn;
