import React from 'react';
import AddAlert from '@material-ui/icons/AddAlert';
import CheckCircle from '@material-ui/icons/CheckCircle'
// import { isPropertySignature } from 'typescript';
import Snackbar from './Snackbar.js';

function Notification(props) 
{
  return (
  <>
    {props.msg !== "" ? (
      <Snackbar
        place="tr"
        color="danger"
        icon={AddAlert}
        message={props.msg}
        open={props.open}
      // closeNotification={() => this.setState({ tr: false })}
      // close
      />
    ) : props.success !== "" ? (
      <Snackbar
        place="tr"
        color="success"
        icon={CheckCircle}
        message={props.success}
        open={props.open}
      // closeNotification={() => this.setState({ tr: false })}
      // close
      />
    ) : (
          undefined
        )}
  </>
  )
}

export default Notification