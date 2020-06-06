// import {
//   defaultFont,
//   primaryBoxShadow,
//   infoBoxShadow,
//   successBoxShadow,
//   warningBoxShadow,
//   dangerBoxShadow,
//   roseBoxShadow,
//   whiteColor,
//   blackColor,
//   grayColor,
//   infoColor,
//   successColor,
//   dangerColor,
//   roseColor,
//   primaryColor,
//   warningColor,
//   hexToRgb
// } from "assets/jss/material-dashboard-react.js";

const snackbarContentStyle = {
  root: {
    // ...defaultFont,
    flexWrap: "unset",
    position: "relative",
    padding: "20px 15px",
    lineHeight: "20px",
    marginBottom: "20px",
    fontSize: "14px",
    backgroundColor: 'white',
    color: 'grey',
    borderRadius: "3px",
    minWidth: "unset",
    maxWidth: "unset",
    // boxShadow:
    //   "0 12px 20px -10px rgba(" +
    //   hexToRgb(whiteColor) +
    //   ", 0.28), 0 4px 20px 0px rgba(" +
    //   hexToRgb(blackColor) +
    //   ", 0.12), 0 7px 8px -5px rgba(" +
    //   hexToRgb(whiteColor) +
    //   ", 0.2)"
  },
  top20: {
    top: "20px"
  },
  top40: {
    top: "40px"
  },
  info: {
    backgroundColor: 'blue',
    color: 'white',
    // ...infoBoxShadow
  },
  success: {
    backgroundColor: "green",
    color: 'white',
    // ...successBoxShadow
  },
  warning: {
    backgroundColor: 'yellow',
    color: 'white',
    // ...warningBoxShadow
  },
  danger: {
    backgroundColor: 'red',
    color: 'white',
    // ...dangerBoxShadow
  },
  primary: {
    backgroundColor: 'blue',
    color: 'white',
    // ...primaryBoxShadow
  },
  rose: {
    backgroundColor: 'red',
    color: 'white',
    // ...roseBoxShadow
  },
  message: {
    padding: "0",
    display: "block",
    maxWidth: "89%"
  },
  close: {
    width: "11px",
    height: "11px"
  },
  iconButton: {
    width: "24px",
    height: "24px",
    padding: "0px"
  },
  icon: {
    display: "block",
    left: "15px",
    position: "absolute",
    top: "50%",
    marginTop: "-15px",
    width: "30px",
    height: "30px"
  },
 
  iconMessage: {
    paddingLeft: "50px",
    display: "block"
  },
  actionRTL: {
    marginLeft: "-8px",
    marginRight: "auto"
  }
};

export default snackbarContentStyle;
