import { makeStyles, withStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 4,
    "&:placeholder": {
      // color: "gray",
      // fontWeight: "400",
    },

    "&:before": {
      borderBottomWidth: "0px",
    },
    "&:after": {
      color: "black",
    },
  },

  // label: {
  //   "&:focused": {
  //     color: "black",
  //   },
  //   "&:after": {
  //     color: "black",
  //   },
  // },
}));
