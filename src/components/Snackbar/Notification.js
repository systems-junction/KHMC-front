import React from 'react';
import AddAlert from '@material-ui/icons/AddAlert';
import { isPropertySignature } from 'typescript';
import Snackbar from './Snackbar.js';



function Notification (props) {

    return(
      <Snackbar
        place="tr"
        color="danger"
        icon={AddAlert}
        message={props.msg}
        open={props.open}
        // closeNotification={() => this.setState({ tr: false })}
        // close
      />
    )

}

export default Notification