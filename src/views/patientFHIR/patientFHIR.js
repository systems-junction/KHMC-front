/*eslint-disable*/
import React, { useState, useReducer } from 'react'
import { TextField, Button } from '@material-ui/core'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/business_Unit.png'
import Back from '../../assets/img/Back_Arrow.png'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import MenuItem from '@material-ui/core/MenuItem'
// import MultiSelect from 'react-multi-select-component'
import axios from 'axios'
import InputLabelComponent from '../../components/InputLabel/inputLabel'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { addPatientFHIRUrl, updatePatientFHIRUrl } from '../../public/endpoins'

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 6,
  },

  inputContainerForDropDown: {
    marginTop: 6,
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
    backgroundColor: 'rgb(96, 214, 159)',
    height: '57px',
    outline: 'none',
    width: '90px',
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
    width: '100%',
    height: '55px',
    cursor: 'pointer',
    padding: '15px',
  },
}

const usename = [
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

const usetelecom = [
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

const deceasedArray = [
  {
    key: false,
    value: 'False',
  },
  {
    key: true,
    value: 'True',
  },
]

const maritalArray = [
  {
    key: 'single',
    value: 'Single',
  },
  {
    key: 'married',
    value: 'Married',
  },
]

const multipleBirth = [
  {
    key: false,
    value: 'False',
  },
  {
    key: true,
    value: 'True',
  },
]

const useStylesDropdown = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 520,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    // backgroundColor: 'white',
  },

  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

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

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   }
// }

const relationshipDataArray = [
  {
    key: 'Father',
    value: 'father',
  },
  {
    key: 'Son',
    value: 'son',
  },
  {
    key: 'Uncle',
    value: 'uncle',
  },
  {
    key: 'Mother',
    value: 'mother',
  },
  {
    key: 'Daughter',
    value: 'daughter',
  },
  {
    key: 'Brother',
    value: 'brother',
  },
  {
    key: 'Sister',
    value: 'sister',
  },
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

export default function PurchaseRequest() {
  const classes = useStyles()
  const classesDropdown = useStylesDropdown()

  const initialState = {
    gender: '',
    birthDate: '',
    deceasedBoolean: false,
    deceasedDateTime: '',
    maritalStatus: '',
    multipleBirthBoolean: false,
    multipleBirthInteger: 0,
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
  } = state

  const [name, setName] = useState([{ use: '', family: '', prefix: '' }])
  const [telecom, setTelecom] = useState([{ use: '', value: '', rank: '' }])
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
  const [contact, setContact] = useState([
    {
      relationship: [],
      name: '',
      telecom: [{ use: '', value: '', rank: '' }],
      address: {
        use: '',
        text: '',
        city: '',
        district: '',
        state: '',
        postalCode: '',
        country: '',
      },
    },
  ])
  const [relationshipArray, setrelationshipArray] = React.useState([])

  const handleAdd = () => {
    const params = {
      name,
      telecom,
      address,
      contact,
      gender,
      birthDate,
      deceasedBoolean,
      deceasedDateTime,
      maritalStatus,
      multipleBirthBoolean,
      multipleBirthInteger,
    }

    console.log('params', params)

    axios.post(addPatientFHIRUrl, params).then((res) => {
      if (res.data.success) {
        console.log('success', res.data.data)
      }
    })
  }

  const handleEdit = () => {
    const params = {
      _id: '5f40c2dca4d0ab00bc401cd0',
      name,
      telecom,
      address,
      contact,
      gender,
      birthDate,
      deceasedBoolean,
      deceasedDateTime,
      maritalStatus,
      multipleBirthBoolean,
      multipleBirthInteger,
    }

    console.log('params', params)

    axios.put(updatePatientFHIRUrl, params).then((res) => {
      if (res.data.success) {
        console.log('success', res.data.data)
      }
    })
  }

  // handle input change
  const handleNameChange = (e, index) => {
    const list = [...name]
    list[index][e.target.name] = e.target.value
    setName(list)
  }

  const handleTelecomChange = (e, index) => {
    const { name, value } = e.target
    const list = [...telecom]
    list[index][name] = value
    // for (let i = 0; i < contact.length; i++) {
    //   contact[i].telecom = list
    // }
    setTelecom(list)
  }

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target
    const list = [...address]
    list[index][name] = value
    setAddress(list)
  }

  const handleContactChange = (e, index) => {
    const { name, value } = e.target
    const list = [...contact]
    console.log(list, 'list')
    list[index][name] = value
    // list[index]['telecom'] = telecom
    // contact[index].telecom[0].value = value
    // contact[index].address = address
    setContact(list)
  }

  const handleContactTelecomChange = (e, index) => {
    const { name, value } = e.target

    const list = [...contact]
    contact[index].telecom[0][name] = value
    setContact(list)
  }

  const handleContactAddressChange = (e, index) => {
    const { name, value } = e.target
    const list = [...contact]
    contact[index].address[name] = value
    setContact(list)
  }

  const handleChange = (event, index) => {
    setrelationshipArray(event.target.value)
    contact[index].relationship = event.target.value
    console.log(index, 'index')
  }

  // handle click event of the Remove button
  const handleNameRemove = (index) => {
    const list = [...name]
    list.splice(index, 1)
    setName(list)
  }

  const handleTelecomRemove = (index) => {
    const list = [...telecom]
    list.splice(index, 1)
    setTelecom(list)
  }

  const handleAddressRemove = (index) => {
    const list = [...address]
    list.splice(index, 1)
    setAddress(list)
  }

  const handleContactRemove = (index) => {
    const list = [...contact]
    list.splice(index, 1)
    setContact(list)
  }

  // handle click event of the Add button
  const handleNameAdd = () => {
    setName([...name, { use: '', family: '', prefix: '' }])
  }

  const handleTelecomAdd = () => {
    setTelecom([...telecom, { use: '', value: '', rank: 0 }])
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
    console.log(contact, 'contact')
    setContact([
      ...contact,
      {
        relationship: [],
        name: '',
        telecom: [{ use: '', value: '', rank: '' }],
        address: {
          use: '',
          text: '',
          city: '',
          district: '',
          state: '',
          postalCode: '',
          country: '',
        },
      },
    ])
  }

  console.log('contact', contact)
  console.log('relationShip', relationshipArray)

  const handleSubmitClick = (event) => {
    event.preventDefault()
    console.log('====================================')
    console.log('name', name)
    console.log('telecom', telecom)
    console.log('contact', contact)
    console.log(state, 'state')
    console.log('====================================')
  }

  function onChangeDate(value, type) {
    dispatch({ field: type, value })
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
            {name.map((x, i) => {
              return (
                <div className='row'>
                  <div
                    className='col-md-4 col-sm-4'
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

                      {usename.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>

                  <div
                    className='col-md-4 col-sm-4'
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
                    style={{
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginTop: '2%',
                        marginBottom: '2%',
                      }}
                    >
                      <Button
                        style={styles.stylesForButton}
                        // onClick={onClick}
                        variant='contained'
                        color='primary'
                      >
                        {name.length !== 1 && (
                          <RemoveIcon
                            fontSize='large'
                            style={{
                              background: 'red',
                              borderRadius: 15,
                            }}
                            onClick={() => handleNameRemove(i)}
                          />
                        )}
                        &nbsp;
                        {name.length - 1 === i && (
                          <AddIcon
                            fontSize='large'
                            onClick={handleNameAdd}
                            style={{
                              background: 'blue',
                              borderRadius: 15,
                            }}
                          />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
            <br />
            <InputLabelComponent>Telecom Data</InputLabelComponent>
            {telecom.map((x, i) => {
              return (
                <div className='row'>
                  <div
                    className='col-md-4 col-sm-4'
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

                      {usetelecom.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>

                  <div
                    className='col-md-4 col-sm-4'
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
                    className='col-md-3 col-sm-3'
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
                    style={{
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginTop: '2%',
                        marginBottom: '2%',
                      }}
                    >
                      <Button
                        style={styles.stylesForButton}
                        // onClick={onClick}
                        variant='contained'
                        color='primary'
                      >
                        {telecom.length !== 1 && (
                          <RemoveIcon
                            fontSize='large'
                            style={{
                              background: 'red',
                              borderRadius: 15,
                            }}
                            onClick={() => handleTelecomRemove(i)}
                          />
                        )}
                        &nbsp;
                        {telecom.length - 1 === i && (
                          <AddIcon
                            fontSize='large'
                            onClick={handleTelecomAdd}
                            style={{
                              background: 'blue',
                              borderRadius: 15,
                            }}
                          />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* <div
                    className='col-md-1 col-sm-1'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    {telecom.length !== 1 && (
                      <RemoveIcon
                        fontSize='large'
                        style={{
                          background: 'red',
                        }}
                        onClick={() => handleTelecomRemove(i)}
                      />
                    )}

                    {telecom.length - 1 === i && (
                      <AddIcon
                        fontSize='large'
                        onClick={handleTelecomAdd}
                        style={{
                          background: 'blue',
                        }}
                      />
                    )}
                  </div> */}
                </div>
              )
            })}
            <br />
            <InputLabelComponent>Address Data</InputLabelComponent>
            {address.map((x, i) => {
              return (
                <div className='row'>
                  <div
                    className='col-md-2 col-sm-2'
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

                      {usetelecom.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </div>

                  <div
                    className='col-md-2 col-sm-2'
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
                    className='col-md-1 col-sm-1'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='city'
                      variant='filled'
                      label='City'
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
                    className='col-md-1 col-sm-1'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='state'
                      variant='filled'
                      label='State'
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
                    className='col-md-2 col-sm-2'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='district'
                      variant='filled'
                      label='District'
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
                    className='col-md-2 col-sm-2'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      name='postalCode'
                      variant='filled'
                      label='Postal Code'
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
                      label='Country'
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
                    style={{
                      display: 'flex',
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginTop: '2%',
                        marginBottom: '2%',
                      }}
                    >
                      <Button
                        style={styles.stylesForButton}
                        // onClick={onClick}
                        variant='contained'
                        color='primary'
                      >
                        {address.length !== 1 && (
                          <RemoveIcon
                            fontSize='large'
                            style={{
                              background: 'red',
                              borderRadius: 15,
                            }}
                            onClick={() => handleAddressRemove(i)}
                          />
                        )}
                        &nbsp;
                        {address.length - 1 === i && (
                          <AddIcon
                            fontSize='large'
                            onClick={handleAddressAdd}
                            style={{
                              background: 'blue',
                              borderRadius: 15,
                            }}
                          />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
            <br />
            <InputLabelComponent>Contact Data</InputLabelComponent>
            {contact.map((x, i) => {
              return (
                <>
                  <div className='row'>
                    <div
                      className='col-md-12 col-sm-12'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <FormControl className={classesDropdown.formControl}>
                        <InputLabel id='demo-mutiple-chip-label'>
                          Relationship
                        </InputLabel>
                        <Select
                          labelId='demo-mutiple-chip-label'
                          id='demo-mutiple-chip'
                          multiple
                          value={contact[i].relationship}
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
                          {relationshipDataArray.map((name) => (
                            <MenuItem
                              key={name.key}
                              value={name.value}
                              // style={getStyles(name, relationshipArray, theme)}
                            >
                              {name.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className='row'>
                    <div
                      className='col-md-2 col-sm-2'
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
                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='use'
                        id={`use ${i}`}
                        variant='filled'
                        label='Telecom Use'
                        value={contact[i].telecom[0].use}
                        className='textInputStyle'
                        onChange={(e) => handleContactTelecomChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>
                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='value'
                        id={`value ${i}`}
                        variant='filled'
                        label='Value'
                        value={contact[i].telecom[0].value}
                        className='textInputStyle'
                        onChange={(e) => handleContactTelecomChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>
                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='rank'
                        type='number'
                        id={`rank ${i}`}
                        variant='filled'
                        label='Rank'
                        value={contact[i].telecom[0].rank}
                        className='textInputStyle'
                        onChange={(e) => handleContactTelecomChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>
                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='use'
                        id={`use ${i}`}
                        variant='filled'
                        label='Address Use'
                        value={contact[i].address.use}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>
                    <div
                      className='col-md-1 col-sm-1'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='text'
                        id={`text ${i}`}
                        variant='filled'
                        label='Text'
                        value={contact[i].address.text}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>
                  </div>

                  <div className='row'>
                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='city'
                        id={`city ${i}`}
                        variant='filled'
                        label='City'
                        value={contact[i].address.city}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>

                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='district'
                        id={`district ${i}`}
                        variant='filled'
                        label='District'
                        value={contact[i].address.district}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>

                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='state'
                        id={`state ${i}`}
                        variant='filled'
                        label='State'
                        value={contact[i].address.state}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>

                    <div
                      className='col-md-2 col-sm-2'
                      style={{
                        ...styles.inputContainerForTextField,
                        ...styles.textFieldPadding,
                      }}
                    >
                      <TextField
                        name='postalCode'
                        id={`postalCode ${i}`}
                        variant='filled'
                        label='Postal Code'
                        value={contact[i].address.postalCode}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
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
                        name='country'
                        id={`country ${i}`}
                        variant='filled'
                        label='country'
                        value={contact[i].address.country}
                        className='textInputStyle'
                        onChange={(e) => handleContactAddressChange(e, i)}
                        InputProps={{
                          className: classes.input,
                          classes: { input: classes.input },
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'flex-end',
                          marginTop: '2%',
                          marginBottom: '2%',
                        }}
                      >
                        <Button
                          style={styles.stylesForButton}
                          // onClick={onClick}
                          variant='contained'
                          color='primary'
                        >
                          {contact.length !== 1 && (
                            <RemoveIcon
                              fontSize='large'
                              style={{
                                background: 'red',
                                borderRadius: 15,
                              }}
                              onClick={() => handleContactRemove(i)}
                            />
                          )}
                          &nbsp;
                          {contact.length - 1 === i && (
                            <AddIcon
                              fontSize='large'
                              onClick={handleContactAdd}
                              style={{
                                background: 'blue',
                                borderRadius: 15,
                              }}
                            />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}

            <br />

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
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      inputVariant='filled'
                      label='Birth Date'
                      fullWidth
                      onChange={(val) => onChangeDate(val, 'birthDate')}
                      style={{ borderRadius: 6 }}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      value={
                        birthDate ? birthDate : new Date()
                        // comingFor === 'add'
                        //   ? expiration
                        //     ? expiration
                        //     : new Date()
                        //   : expiration
                      }
                    />
                  </MuiPickersUtilsProvider>
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
                    select
                    label='Deceased '
                    name={'deceasedBoolean'}
                    value={deceasedBoolean === true ? true : false}
                    // error={deceasedBoolean === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>

                    {deceasedArray.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </div>
                <div
                  className='col-md-2 col-sm-2'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      inputVariant='filled'
                      label='Deceased Date Time'
                      fullWidth
                      style={{ borderRadius: 6 }}
                      onChange={(val) => onChangeDate(val, 'deceasedDateTime')}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      value={deceasedDateTime ? deceasedDateTime : new Date()}
                    />
                  </MuiPickersUtilsProvider>
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
                    select
                    label='Marital Status'
                    name={'maritalStatus'}
                    value={maritalStatus}
                    // error={gender === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>

                    {maritalArray.map((val) => {
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
                    select
                    label='Multiple Birth'
                    name={'multipleBirthBoolean'}
                    value={multipleBirthBoolean === true ? true : false}
                    // error={multipleBirthBoolean === '' && isFormSubmitted}
                    onChange={onChangeValue}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                    }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>

                    {multipleBirth.map((val) => {
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </div>
                <div
                  className='col-md-5 col-sm-5'
                  style={{
                    ...styles.inputContainerForTextField,
                    ...styles.textFieldPadding,
                  }}
                >
                  <TextField
                    required
                    label='Multiple Birth'
                    name={'multipleBirthInteger'}
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
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
                marginTop: '2%',
                marginBottom: '2%',
              }}
            >
              <Button
                style={styles.stylesForPurchaseButton}
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleAdd}
              >
                Submit
              </Button>
              &nbsp;
              <Button
                style={styles.stylesForPurchaseButton}
                type='submit'
                variant='contained'
                // color='primary'
                onClick={handleEdit}
              >
                Update
              </Button>
            </div>
          </form>
        </div>

        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(contact)}</div> */}

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
