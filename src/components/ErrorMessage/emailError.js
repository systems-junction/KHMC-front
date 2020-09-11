import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import validateEmail from '../../public/emailValidator'
// import validateInput from '../../public/inputValidator'
const ErrorMsg = (props) => {
  return (
    <p style={{ color: '#ff0000', fontSize: 13 }}>
      {props.name.length === 0 && props.isFormSubmitted
        ? 'Required'
        : !validateEmail(props.name) && props.isFormSubmitted
        ? 'Not valid'
        : // : !validateInput(props.name) && props.isFormSubmitted
          // ? 'Not valid'
          undefined}
    </p>
  )
}

export default ErrorMsg
