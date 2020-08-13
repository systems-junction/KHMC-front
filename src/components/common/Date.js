import React from 'react'
import InputLabelComponent from '../../components/InputLabel/inputLabel'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
const styles = {
  inputContainerForTextField: {
    marginTop: 25,
    outline: 'none',
  },
  inputStyles: {
    outline: 'none',
  },
}
const datePicker = ({ inputVariant, onChangeDate, comingFor, date, name,disabled }) => {
  return (
    <div style={styles.inputContainerForTextField}>
      <MuiPickersUtilsProvider className='input' utils={DateFnsUtils}>
        <InputLabelComponent id='gender-label'>{name}*</InputLabelComponent>
        <DateTimePicker
          style={styles.inputStyles}
          inputVariant={inputVariant}
          onChange={onChangeDate}
          fullWidth
          InputProps={{
            disableUnderline: true,
           }}
          style={disabled ? { backgroundColor: 'rgba(239, 239, 239, 0.3)',color:'black', marginTop:'6px', borderRadius:'10px',height:'45px',padding:'5px',paddingLeft:'15px' } : { backgroundColor: 'white',marginTop:'6px', borderRadius:'10px',height:'45px',padding:'5px',paddingLeft:'15px' }}
          value={comingFor === 'add' ? (date ? date : new Date()) : date}
          disabled={disabled}
        />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default datePicker
