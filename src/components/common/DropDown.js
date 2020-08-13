import React from 'react'
import InputLabelComponent from '../../components/InputLabel/inputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import BootstrapInput from '../../components/Dropdown/dropDown.js'
const styles = {
  inputContainerForTextField: {
    marginTop: 25,
    outline: 'none',
  },
}

const inputField = ({
  id,
  name,
  value,
  onChange,
  label,
  genderArray,
  statusArray,
  titles,
  coverageTermsArr,
  countries,
  cities,
}) => {
  return (
    <div style={styles.inputContainerForTextField}>
      <InputLabelComponent id='gender-label'>{label}*</InputLabelComponent>
      <Select
        fullWidth
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        label={label}
        className='dropDownStyle'
        input={<BootstrapInput />}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {genderArray &&
          genderArray.map((val) => {
            return (
              <MenuItem key={val.key} value={val.key}>
                {val.value}
              </MenuItem>
            )
          })}
        {statusArray &&
          statusArray.map((val) => {
            return (
              <MenuItem key={val.key} value={val.key}>
                {val.value}
              </MenuItem>
            )
          })}
        {titles &&
          titles.map((val) => {
            return (
              <MenuItem key={val.key} value={val.key}>
                {val.value}
              </MenuItem>
            )
          })}
        {coverageTermsArr &&
          coverageTermsArr.map((val) => {
            return (
              <MenuItem key={val.key} value={val.key}>
                {val.value}
              </MenuItem>
            )
          })}
        {countries &&
          countries.map((val) => {
            return (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            )
          })}
        {cities &&
          cities.map((val) => {
            return (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            )
          })}
      </Select>
    </div>
  )
}

export default inputField
