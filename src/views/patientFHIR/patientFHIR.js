/*eslint-disable*/
import React, { useState, useEffect, useReducer } from 'react'
import { TextField, Button } from '@material-ui/core'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/business_Unit.png'
import Back from '../../assets/img/Back_Arrow.png'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import MenuItem from '@material-ui/core/MenuItem'
import { ja } from 'date-fns/esm/locale'
// import MultiSelect from 'react-multi-select-component'
import InputLabelComponent from '../../components/InputLabel/inputLabel'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  input: {
    display: 'none',
  },
  stylesForPurchaseButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2C6DDD',
    width: '10%',
    height: '50px',
    outline: 'none',
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    height: '50px',
    outline: 'none',
    width: 120,
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
  },

  inputField: {
    outline: 'none',
  },
  upload: {
    backgroundColor: 'white',
    border: '0px solid #ccc',
    borderRadius: '5px',
    color: 'gray',
    // marginTop: "30px",
    width: '100%',
    height: '55px',
    cursor: 'pointer',
    padding: '15px',
  },
}

const useNames = [
  {
    key: 'USUAL',
    value: 'USUAL',
  },
  {
    key: 'OFFICIAL',
    value: 'OFFICIAL',
  },
  {
    key: 'TEMP',
    value: 'TEMP',
  },
  {
    key: 'NICKNAME',
    value: 'NICKNAME',
  },
  {
    key: 'ANONYMOUS',
    value: 'ANONYMOUS',
  },
  {
    key: 'OLD',
    value: 'OLD',
  },
  {
    key: 'MAIDEN',
    value: 'MAIDEN',
  },
]

const useTelecoms = [
  {
    key: 'home',
    value: 'home',
  },
  {
    key: 'work',
    value: 'work',
  },
  {
    key: 'temp',
    value: 'temp',
  },
  {
    key: 'old',
    value: 'old',
  },
  {
    key: 'mobile',
    value: 'mobile',
  },
]

const genderArray = [
  {
    key: 'male',
    value: 'male',
  },
  {
    key: 'female',
    value: 'female',
  },
  {
    key: 'other',
    value: 'other',
  },
  {
    key: 'unknown',
    value: 'unknown',
  },
]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const useStylesDropdown = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const relationshipArray = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

const useStyles = makeStyles((theme) => ({
  rootTab: {
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 6,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:disabled': {
      color: 'gray',
    },
  },
  multilineColor: {
    backgroundColor: 'white',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: 'white',
    },
    '&:after': {
      borderBottomColor: 'black',
    },
  },
  root: {
    '& .MuiTextField-root': {
      backgroundColor: 'white',
    },
    '& .Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
    },
  },
}))

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}
export default function PurchaseRequest(props) {
  const classes = useStyles()
  const classesDropdown = useStylesDropdown()

  const initialState = {
    gender: '',
    birthDate: new Date(),
    deceasedBoolean: false,
    deceasedDateTime: new Date(),
    maritalStatus: '',
    multipleBirthBoolean: false,
    multipleBirthInteger: 0,
    // relationship: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    gender,
    birthDate,
    deceasedBoolean,
    deceasedDateTime,
    maritalStatus,
    multipleBirthBoolean,
    multipleBirthInteger,
    // relationship,
  } = state

  const [names, setNames] = useState([{ use: '', family: '', prefix: '' }])
  const [telecoms, setTelecoms] = useState([{ use: '', value: '', rank: '' }])
  const [address, setAddress] = useState([
    {
      use: '',
      text: '',
      city: '',
      district: '',
      state: '',
      postalCode: '',
      country: '',
    },
  ])
  const [contacts, setContact] = useState([
    { relationship: [], name: '', telecom: telecoms, address: address },
  ])
  const [personName, setPersonName] = React.useState([])

  // handle input change
  const handleNameChange = (e, index) => {
    const { name, value } = e.target
    const list = [...names]
    list[index][name] = value
    setNames(list)
  }

  const handleTelecomChange = (e, index) => {
    const { name, value } = e.target
    const list = [...telecoms]
    list[index][name] = value
    setTelecoms(list)
  }

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target
    const list = [...address]
    list[index][name] = value
    setAddress(list)
  }

  const handleContactChange = (e, index) => {
    const { name, value } = e.target
    const list = [...contacts]
    list[index][name] = value
    setContact(list)
    console.log('contacts', index)
  }

  const handleChange = (event) => {
    setPersonName(event.target.value)
    setContact([{ relationship: event.target.value }])
    console.log(event.target.value, 'event')
  }

  // handle click event of the Remove button
  const handleNameRemove = (index) => {
    const list = [...names]
    list.splice(index, 1)
    setNames(list)
  }

  const handleTelecomRemove = (index) => {
    const list = [...telecoms]
    list.splice(index, 1)
    setTelecoms(list)
  }

  const handleAddressRemove = (index) => {
    const list = [...address]
    list.splice(index, 1)
    setAddress(list)
  }

  const handleContactRemove = (index) => {
    const list = [...contacts]
    list.splice(index, 1)
    setContact(list)
  }

  // handle click event of the Add button
  const handleNameAdd = () => {
    setNames([...names, { use: '', family: '', prefix: '' }])
  }

  const handleTelecomAdd = () => {
    setTelecoms([...telecoms, { use: '', value: '', rank: 0 }])
  }

  const handleAddressAdd = () => {
    setAddress([
      ...address,
      {
        use: '',
        text: '',
        city: '',
        district: '',
        state: '',
        postalCode: '',
        country: '',
      },
    ])
  }

  const handleContactAdd = () => {
    console.log(contacts, 'contacts')
    setContact([...contacts, { relationship: [], name: '', telecom: telecoms }])
  }

  console.log('contact', contacts)

  const handleSubmitClick = (event) => {
    event.preventDefault()
    console.log('====================================')
    console.log('telecoms', telecoms)
    console.log('contact', contacts)
    console.log(state, 'state')
    console.log('====================================')
  }

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
    console.log(e.target.value, 'e')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#60d69f',
        overflowY: 'scroll',
      }}
    >
      <Header />
      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={business_Unit} />
            <h4>Patient FHIR</h4>
          </div>
        </div>
        <div className={`container-fluid ${classes.root}`}>
          <form onSubmit={handleSubmitClick}>
            <br />
            <InputLabelComponent>Name Data</InputLabelComponent>
            {names.map((x, i) => {
              return (
                <div className='row'>
                  <div
                    className='col-md-3 col-sm-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      select
                      name='use'
                      label='Use'
                      variant='filled'
                      className='dropDownStyle'
                      value={x.use}
                      onChange={(e) => handleNameChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>

                      {useNames.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>

                  <div
                    className='col-md-3 col-sm-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='family'
                      variant='filled'
                      label='Family'
                      value={x.family}
                      className='textInputStyle'
                      onChange={(e) => handleNameChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-3 col-sm-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      variant='filled'
                      name='prefix'
                      label='Prefix'
                      value={x.prefix}
                      className='textInputStyle'
                      onChange={(e) => handleNameChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-3 col-sm-3'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {names.length !== 1 && (
                      <RemoveIcon
                        fontSize='large'
                        style={{
                          background: 'red',
                        }}
                        onClick={() => handleNameRemove(i)}
                      />
                    )}

                    {names.length - 1 === i && (
                      <AddIcon
                        fontSize='large'
                        onClick={handleNameAdd}
                        style={{
                          background: 'blue',
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
            <br />
            <InputLabelComponent>Telecom Data</InputLabelComponent>
            {telecoms.map((x, i) => {
              return (
                <div className='row'>
                  <div
                    className='col-md-3 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      select
                      name='use'
                      label='Use'
                      variant='filled'
                      className='dropDownStyle'
                      value={x.use}
                      onChange={(e) => handleTelecomChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>

                      {useTelecoms.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>

                  <div
                    className='col-md-3 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='value'
                      variant='filled'
                      label='Value'
                      value={x.value}
                      className='textInputStyle'
                      onChange={(e) => handleTelecomChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-3 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      type='number'
                      variant='filled'
                      name='rank'
                      label='Rank'
                      value={x.rank}
                      className='textInputStyle'
                      onChange={(e) => handleTelecomChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-3 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {telecoms.length !== 1 && (
                      <RemoveIcon
                        fontSize='large'
                        style={{
                          background: 'red',
                        }}
                        onClick={() => handleTelecomRemove(i)}
                      />
                    )}

                    {telecoms.length - 1 === i && (
                      <AddIcon
                        fontSize='large'
                        onClick={handleTelecomAdd}
                        style={{
                          background: 'blue',
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
            <br />
            <InputLabelComponent>Address Data</InputLabelComponent>
            {address.map((x, i) => {
              return (
                <div className='row'>
                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      select
                      name='use'
                      label='Use'
                      variant='filled'
                      className='dropDownStyle'
                      value={x.use}
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>

                      {useTelecoms.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='text'
                      variant='filled'
                      label='Text'
                      value={x.text}
                      className='textInputStyle'
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='city'
                      variant='filled'
                      label='city'
                      value={x.city}
                      className='textInputStyle'
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='district'
                      variant='filled'
                      label='district'
                      value={x.district}
                      className='textInputStyle'
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='state'
                      variant='filled'
                      label='state'
                      value={x.state}
                      className='textInputStyle'
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='postalCode'
                      variant='filled'
                      label='postalCode'
                      value={x.postalCode}
                      className='textInputStyle'
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='country'
                      variant='filled'
                      label='country'
                      value={x.country}
                      className='textInputStyle'
                      onChange={(e) => handleAddressChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  <div
                    className='col-md-1 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {address.length !== 1 && (
                      <RemoveIcon
                        fontSize='large'
                        style={{
                          background: 'red',
                        }}
                        onClick={() => handleAddressRemove(i)}
                      />
                    )}

                    {address.length - 1 === i && (
                      <AddIcon
                        fontSize='large'
                        onClick={handleAddressAdd}
                        style={{
                          background: 'blue',
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}
            <br />
            <InputLabelComponent>Contact Data</InputLabelComponent>
            {contacts.map((x, i) => {
              return (
                <div className='row'>
                  <FormControl className={classesDropdown.formControl}>
                    <InputLabel id='demo-mutiple-chip-label'>Chip</InputLabel>
                    <Select
                      labelId='demo-mutiple-chip-label'
                      id='demo-mutiple-chip'
                      multiple
                      value={personName}
                      onChange={(e) => handleChange(e, i)}
                      input={<Input id='select-multiple-chip' />}
                      renderValue={(selected) => (
                        <div className={classesDropdown.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classesDropdown.chip}
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {relationshipArray.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div
                    className='col-md-2 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='name'
                      variant='filled'
                      label='name'
                      value={x.name}
                      className='textInputStyle'
                      onChange={(e) => handleContactChange(e, i)}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>

                  {/* <div
                  className='col-md-2 col-sm-6'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    variant='filled'
                    name='telecom'
                    label='telecom'
                    value={x.telecom}
                    className='textInputStyle'
                    onChange={(e) => handleContactChange(e, i)}
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div> */}

                  <div
                    className='col-md-3 col-sm-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {contacts.length !== 1 && (
                      <RemoveIcon
                        fontSize='large'
                        style={{
                          background: 'red',
                        }}
                        onClick={() => handleContactRemove(i)}
                      />
                    )}

                    {contacts.length - 1 === i && (
                      <AddIcon
                        fontSize='large'
                        onClick={handleContactAdd}
                        style={{
                          background: 'blue',
                        }}
                      />
                    )}
                  </div>
                </div>
              )
            })}

            <div>
              <div className='row'>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    select
                    label='Gender'
                    name={'gender'} // now Identity
                    value={gender}
                    // error={gender === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='dropDownStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>

                    {genderArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </div>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Birth Date'
                    name={'birthDate'} // now Identity
                    value={birthDate}
                    // error={birthDate === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='multipleBirthInteger'
                    name={'deceasedBoolean'} // now Identity
                    value={deceasedBoolean}
                    // error={deceasedBoolean === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Deceased DateTime'
                    name={'deceasedDateTime'} // now Identity
                    value={deceasedDateTime}
                    // error={deceasedDateTime === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              </div>

              <div className='row'>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Marital Status'
                    name={'maritalStatus'} // now Identity
                    value={maritalStatus}
                    // error={gender === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Multiple BirthBoolean'
                    name={'multipleBirthBoolean'} // now Identity
                    value={multipleBirthBoolean}
                    // error={multipleBirthBoolean === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
                <div
                  className='col-md-3 col-sm-3'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Multiple BirthInteger'
                    name={'multipleBirthInteger'} // now Identity
                    value={multipleBirthInteger}
                    // error={multipleBirthInteger === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className='col-md-12 col-sm-6 '
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <Button
                style={styles.stylesForPurchaseButton}
                type='submit'
                variant='contained'
                color='primary'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>

        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(contacts)}</div> */}

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        ></div>
        <div style={{ marginBottom: 20 }}>
          <img
            // onClick={() => props.history.goBack()}
            src={Back}
            style={{ width: 45, height: 35, cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  )
}
