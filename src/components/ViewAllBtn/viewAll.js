import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import view_all from "../../assets/img/Eye.png";

const styles = {
  stylesForButton: {
    cursor: "pointer",
    borderRadius: 5,
    background: "#2c6ddd",
    width: "140px",
    height: "50px",
    // outline: "none",
    borderWidth:0,
    color:'white',
    // fontWeight:700,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // fontSize:50
    // marginRight: 4
  },
};

const useStyles = makeStyles((theme) => ({}));
function ViewAllBtn(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        onClick={() => props.history.goBack()}
        style={styles.stylesForButton}
        variant="contained"
        color="primary"
      >
        <img className="icon-view" src={view_all} />
        &nbsp;&nbsp;
        <strong >View All</strong>
      </Button>
    </div>
  );
}
export default ViewAllBtn;
