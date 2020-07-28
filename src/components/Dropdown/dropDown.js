import { makeStyles, withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  input: {
    // "&:focus": {
    //   borderRadius: 10,
    //   borderColor: "#80bdff",
    // },
  },
}))(InputBase);


export default BootstrapInput