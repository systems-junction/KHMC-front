import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import validateEmail from '../../public/emailValidator'
import validateInput from '../../public/inputValidator'
import validateNumber from '../../public/numberValidator'
import validateNumbers from '../../public/numbersValidator'
import validateFloat from '../../public/FloatValidator'
const ErrorMsg = (props) => {
  return (
    <p style={{ color: '#ff0000', fontSize: 13 }}>
      {props.name && props.name.length === 0 && props.isFormSubmitted
        ? 'Required'
        : props.type && props.type === 'email' && props.isFormSubmitted
        ? !validateEmail(props.name)
          ? 'Enter Valid Email'
          : undefined
        : props.type && props.type === 'number' && props.isFormSubmitted
        ? !validateNumber(props.name)
          ? 'Enter valid field data'
          : undefined
        : props.type && props.type === 'numbers' && props.isFormSubmitted
        ? !validateNumbers(props.name)
          ? 'Enter valid field data'
          : undefined
        : props.type && props.type === 'float' && props.isFormSubmitted
        ? !validateFloat(props.name)
          ? 'Enter valid field data'
          : undefined
        : props.type && props.type === 'text' && props.isFormSubmitted
        ? !validateInput(props.name) && props.isFormSubmitted
          ? 'Enter valid field data'
          : undefined
        : undefined}
    </p>
  )
}

export default ErrorMsg
