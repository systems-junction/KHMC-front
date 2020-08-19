import { makeStyles, withStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
  // margin: {
  //   margin: theme.spacing(0),
  // },
  // input: {
  //   backgroundColor: "white",
  //   borderRadius: 4,
  //   "&:placeholder": {
  //     // color: "gray",
  //     // fontWeight: "400",
  //   },
  //   "&:before": {
  //     borderBottomWidth: "0px",
  //   },
  //   "&:after": {
  //     color: "black",
  //   },
  // },
  // // label: {
  // //   "&:focused": {
  // //     color: "black",
  // //   },
  // //   "&:after": {
  // //     color: "black",
  // //   },
  // // },
}));
