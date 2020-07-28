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
const textAread = ({ type = 'text', onChange, placeholder, name }) => {
  return (
    <div style={styles.inputContainerForTextField}>
      <InputLabelComponent id='gender-label'>
        {placeholder}*
      </InputLabelComponent>
      <textarea
        style={styles.inputStyles}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onChange(e)}
        className='textInputStyle'
      />
    </div>
  )
}

export default textAread
