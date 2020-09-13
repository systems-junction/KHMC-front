import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import validateEmail from '../../public/emailValidator'
import validateFirstName from '../../public/inputValidator'
import validateLastName from '../../public/inputValidator'
import validateEmergencyName from '../../public/inputValidator'
import validateInsuranceVendor from '../../public/inputValidator'

import validateNationName from '../../public/inputValidator'
import validateNumber from '../../public/numberValidator'
import validateNationalId from '../../public/numbersValidator'
import validateAmount from '../../public/FloatValidator'
import validateInsuranceNo from '../../public/numbersValidator'
import validateHeight from '../../public/numberFloatValidator'
import validateWeight from '../../public/numberFloatValidator'
import validateCoPayment from '../../public/numberFloatValidator'
const ErrorMsg = (props) => {
  return (
    <p style={{ color: '#ff0000', fontSize: 13 }}>
      {props.name && props.name.length === 0 && props.isFormSubmitted
        ? 'Required'
        : props.type && props.type === 'email' && props.isFormSubmitted
        ? !validateEmail(props.name)
          ? 'Enter valid email address (e.g: abc@gmail.com)'
          : undefined
        : props.type && props.type === 'number' && props.isFormSubmitted
        ? !validateNumber(props.name)
          ? 'Enter valid phone number (e.g: +12-3456-7890, +12.3456.7890, +12 3456 7890 etc)'
          : undefined
        : props.type && props.type === 'nationalId' && props.isFormSubmitted
        ? !validateNationalId(props.name)
          ? 'Enter valid national Id with numbers only (e.g: 123456789 etc)'
          : undefined
        : props.type && props.type === 'amount' && props.isFormSubmitted
        ? !validateAmount(props.name)
          ? 'Enter valid amount in decimal only (e.g: 46.74, 1200.00 etc)'
          : undefined
        : props.type && props.type === 'insuranceNo' && props.isFormSubmitted
        ? !validateInsuranceNo(props.name)
          ? 'Enter valid insurance No with numbers only (e.g: 123456789 etc)'
          : undefined
        : props.type && props.type === 'height' && props.isFormSubmitted
        ? !validateHeight(props.name)
          ? 'Enter valid weight with numbers and decimal only (e.g: 3, 6.7 etc)'
          : undefined
        : props.type && props.type === 'weight' && props.isFormSubmitted
        ? !validateWeight(props.name)
          ? 'Enter valid weight with numbers and decimal only (e.g: 3, 6.7 etc)'
          : undefined
        : props.type && props.type === 'coPayment' && props.isFormSubmitted
        ? !validateCoPayment(props.name)
          ? 'Enter valid Co-Payment with numbers and decimal only (e.g: 3, 6.7 etc)'
          : undefined
        : props.type && props.type === 'firstName' && props.isFormSubmitted
        ? !validateFirstName(props.name) && props.isFormSubmitted
          ? 'Enter valid first name with english letters only (e.g: abc, pqrs xyz, etc)'
          : undefined
        : props.type && props.type === 'lastName' && props.isFormSubmitted
        ? !validateLastName(props.name) && props.isFormSubmitted
          ? 'Enter valid last name with english letters only (e.g: abc, pqrs xyz, etc)'
          : undefined
        : props.type && props.type === 'emergencyName' && props.isFormSubmitted
        ? !validateEmergencyName(props.name) && props.isFormSubmitted
          ? 'Enter valid name with english letters only (e.g: abc, pqrs xyz, etc)'
          : undefined
        : props.type && props.type === 'vendor' && props.isFormSubmitted
        ? !validateInsuranceVendor(props.name) && props.isFormSubmitted
          ? 'Enter valid Vendor name with english letters only (e.g: abc, pqrs xyz, etc)'
          : undefined
        : props.type && props.type === 'nationName' && props.isFormSubmitted
        ? !validateNationName(props.name) && props.isFormSubmitted
          ? 'Enter valid nation name with english letters only (e.g: USA, United Kingdom, etc)'
          : undefined
        : undefined}
    </p>
  )
}

export default ErrorMsg
