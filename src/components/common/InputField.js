import React from 'react'
import InputLabelComponent from '../../components/InputLabel/inputLabel'

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputStyles: {
    outline: 'none',
  },
}
const inputField = ({ type = 'text', onChange, value, placeholder, name }) => {
  return (
    <div style={styles.inputContainerForTextField}>
      <InputLabelComponent id='gender-label'>
        {placeholder}*
      </InputLabelComponent>
      <input
        style={styles.inputStyles}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        className='textInputStyle'
      />
    </div>
  )
}

export default inputField
