import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {
  addNursingServiceUrl,
  updateNursingServiceUrl,
} from '../../../../public/endpoins'
import { makeStyles } from '@material-ui/core/styles'

import RadiologyDepartment from '../../../../assets/img/Radiology Department.png'
import Header from '../../../../components/Header/Header'
import view_all from '../../../../assets/img/Eye.png'
import Back from '../../../../assets/img/Back_Arrow.png'
import '../../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

import InputLabelComponent from '../../../../components/InputLabel/inputLabel'
import BootstrapInput from '../../../../components/Dropdown/dropDown.js'
import ErrorMessage from '../../../../components/ErrorMessage/errorMessage'

import Notification from '../../../../components/Snackbar/Notification.js'

const statusArray = [
  { key: 'active', value: 'Active' },
  { key: 'in_active', value: 'In Active' },
]

const styles = {
  inputField: {
    outline: 'none',
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    width: '140px',
    height: '50px',
    outline: 'none',
  },

  stylesForADD: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    width: '60%',
    height: '50px',
    outline: 'none',
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
}

const useStyles = makeStyles((theme) => ({
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
    '&:focus': {
      boxShadow: 'none',
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

function AddEditVendor(props) {
  const classes = useStyles()

  const modalStyle = {
    backgroundColor: '#5074f4',
    borderRadius: 30,
    height: '80%',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    position: 'fixed',
  }

  const initialState = {
    _id: '',
    name: '',
    description: '',
    serviceNo: '',
    price: '',
    status: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { _id, name, description, serviceNo, price, status } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  function validateForm() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return (
      name.length > 0 &&
      description.length > 0 &&
      status.length > 0 &&
      price.length > 0
    )
  }

  const [comingFor, setcomingFor] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor)

    const selectedRec = props.history.location.state.selectedItem
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id })
        } else {
          dispatch({ field: key, value: val })
        }
      })
    }
  }, [])

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true)
      setOpenNotification(true)
      setErrorMsg('Please fill the fields properly')
    } else {
      if (validateForm()) {
        const params = {
          name,
          description,
          serviceNo,
          price,
          status,
        }

        console.log('param for vendor', params)

        axios
          .post(addNursingServiceUrl, params)
          .then((res) => {
            if (res.data.success) {
              console.log('response is', res.data.data)
              props.history.goBack()
            } else if (!res.data.success) {
              setOpenNotification(true)
            }
          })
          .catch((e) => {
            console.log('error after adding vendor', e)
          })
      }
    }
  }

  const handleEdit = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true)
      setOpenNotification(true)
      setErrorMsg('Please fill the fields properly')
    } else {
      if (validateForm()) {
        const params = {
          _id,
          name,
          description,
          serviceNo,
          price,
          status,
        }
        axios
          .put(updateNursingServiceUrl, params)
          .then((res) => {
            if (res.data.success) {
            } else {
              props.history.goBack()
            }
          })
          .catch((e) => {
            console.log('error after updating vendor', e)
          })
      }
    }
  }

  if (openNotification) {
    setTimeout(() => {
      console.log('called')
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  return (
    <section
      style={{
        backgroundColor: '#60d69f',
        position: 'fixed',
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flex: 1,
        overflowY: 'scroll',
      }}
    >
      <Header />
      <div className={`cPadding ${classes.root}`}>
        <div className='subheader'>
          <div>
            <img src={RadiologyDepartment} />
            <h4>
              {comingFor === 'add'
                ? ' Add Nursing Proc/Service'
                : ' Edit Nursing Proc/Service'}
            </h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              <img src={view_all} style={styles.stylesForIcon} />
              &nbsp;&nbsp;
              <strong>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div className='container-fluid'>
          {comingFor === 'edit' ? (
            <div className='row'>
              <div
                className='col-md-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  disabled={true}
                  label='Service Id'
                  variant='filled'
                  style={styles.inputField}
                  type='text'
                  name={'serviceNo'}
                  value={serviceNo}
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                  InputLabelProps={{
                    className: classes.label,
                    classes: { label: classes.label },
                  }}
                  className='textInputStyle'
                />
              </div>
            </div>
          ) : (
            undefined
          )}

          <div className='row'>
            <div
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label='Name'
                name='name'
                variant='filled'
                value={name}
                error={name === '' && isFormSubmitted}
                onChange={onChangeValue}
                className='textInputStyle'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>

            <div
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <CurrencyTextField
                label='Price'
                name={'price'}
                value={price}
                error={price === '' && isFormSubmitted}
                // onChange={onChangeValue}
                // type='number'
                onBlur={onChangeValue}
                className='textInputStyle'
                variant='filled'
                textAlign='left'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                currencySymbol='JD'
                outputFormat='number'
                decimalPlaces='4'
                // onChange={(event, value) => setValue(value)}
              />
              {/* <TextField
                required
                label="Price"
                type="number"
                name={"price"}
                variant="filled"
                error={price === "" && isFormSubmitted}
                value={price}
                onChange={onChangeValue}
                className="textInputStyle"
                onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              /> */}
            </div>
          </div>

          <div className='row'>
            <div
              className='col-md-12'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label='Description'
                // multiline
                name={'description'}
                variant='filled'
                value={description}
                onChange={onChangeValue}
                className='textInputStyle'
                error={description === '' && isFormSubmitted}
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                InputLabelProps={{
                  className: classes.label,
                  classes: { label: classes.label },
                }}
              />
            </div>
          </div>

          <div className='row'>
            <div
              className='col-md-12'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id='status'
                name='status'
                variant='filled'
                value={status}
                onChange={onChangeValue}
                label='Status'
                error={status === '' && isFormSubmitted}
                className='dropDownStyle'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                input={<BootstrapInput />}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {statusArray &&
                  statusArray.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
              </TextField>
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                height: 50,
                justifyContent: 'center',
                marginTop: '2%',
                marginBottom: '2%',
              }}
            >
              {comingFor === 'add' ? (
                <Button
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant='contained'
                  color='primary'
                  style={styles.stylesForADD}
                >
                  Add
                </Button>
              ) : (
                <Button
                  className='pl30 pr30'
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant='contained'
                  color='primary'
                  style={{ width: '60%' }}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <img
            onClick={() => props.history.goBack()}
            src={Back}
            style={{ width: 45, height: 35, cursor: 'pointer' }}
          />
        </div>
      </div>
    </section>
  )
}
export default AddEditVendor
