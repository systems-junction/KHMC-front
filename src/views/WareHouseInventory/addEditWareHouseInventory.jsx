/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { addWhInventoryUrl, updateWhInventoryUrl } from '../../public/endpoins'

import Header from '../../components/Header/Header'

import view_all from '../../assets/img/Eye.png'
import wh_inventory from '../../assets/img/WH Inventory.png'
import Back from '../../assets/img/Back_Arrow.png'
import BootstrapInput from '../../components/Dropdown/dropDown.js'

import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

const styles = {
  // inputContainer: {
  //   marginTop: 25,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  //   paddingTop: 5,
  //   paddingBottom: 5,
  // paddingLeft: 5,
  //   paddingRight: 5,
  // },

  // buttonContainer: {
  //   marginTop: 25,
  // },

  inputContainerForTextField: {
    marginTop: 6,
  },
  inputField: { outline: 'none' },

  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2c6ddd',
    width: '115px',
    height: '40px',
    outline: 'none',
  },
  stylesForWHButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2c6ddd',
    width: '70%',
    height: '40px',
    outline: 'none',
  },

  buttonContainer: {
    marginTop: 25,
  },
}
const useStyles = makeStyles((theme) => ({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
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

const ItemsData = [
  { _id: 1, name: 'First Item' },
  { _id: 2, name: 'Second Item' },
  { _id: 3, name: 'Third Item' },
]

function AddEditWareHouseInventory(props) {
  const classes = useStyles()
  const initialState = {
    _id: '',
    itemId: '',
    qty: '',
    items: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { _id, itemId, qty, items } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  function validateForm() {
    return itemId !== '' && qty !== ''
  }

  const [comingFor, setcomingFor] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

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
    if (props.history.location.state.items) {
      dispatch({ field: 'items', value: props.history.location.state.items })
    }
    if (props.history.location.state.staff) {
      dispatch({ field: 'staffs', value: props.history.location.state.staff })
    }
    if (props.history.location.state.businessUnit) {
      dispatch({
        field: 'businessUnits',
        value: props.history.location.state.businessUnit,
      })
    }
  }, [])

  const handleCancel = () => {
    props.history.goBack()
  }

  const handleAdd = () => {
    // setIsFormSubmitted(true);
    // if (qty && returnReason && returnReason.length > 0) {
    const params = {
      qty,
      itemId,
    }
    console.log('params', params)
    axios
      .post(addWhInventoryUrl, params)
      .then((res) => {
        if (res.data.success) {
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding bu inventory', e)
        setOpenNotification(true)
        setErrorMsg('Error while adding the item')
      })
    // }
  }

  const handleEdit = () => {
    setIsFormSubmitted(true)
    const params = {
      _id,
      itemId,
      qty,
    }
    axios
      .put(updateWhInventoryUrl, params)
      .then((res) => {
        if (res.data.success) {
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
        }
      })
      .catch((e) => {
        console.log('error after adding bu inventory', e)
        setOpenNotification(true)
        setErrorMsg('Error while editing the item')
      })
  }

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  return (
    <div
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
            <img src={wh_inventory} />
            <h4>
              {comingFor === 'add'
                ? ' Add Warehouse Inventory'
                : 'Update Warehouse Inventory'}
            </h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              <img className='icon-view' src={view_all} />
              &nbsp;&nbsp;
              <strong style={{ fontSize: '12px' }}>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>

        {/* <div
        style={{
          alignItems: "center",
          flex: 0.5,
          display: "flex",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            flex: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={wh_inventory}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
          <h3
            style={{ color: "white", fontFamily: "Ubuntu", fontWeight: "700" }}
          >
            {comingFor === "add"
              ? " Add WareHouse Inventory"
              : " Edit WareHouse Inventory"}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flex: 0.8,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1.5, display: "flex" }}>
            
          </div>
        </div>
      </div> */}

        <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
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
                type='number'
                label='Quantity'
                name={'qty'}
                value={qty}
                error={qty === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) =>
                  (evt.key === 'e' || evt.key === '+' || evt.key === '-') &&
                  evt.preventDefault()
                }
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
                id='itemName'
                name='itemId'
                value={itemId}
                error={itemId === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Item Name'
                variant='filled'
                className='dropDownStyle'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {items &&
                  items.map((val, key) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.name}
                      </MenuItem>
                    )
                  })}
              </TextField>
            </div>
          </div>

          <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            {/* <div style={styles.buttonContainer}>
            <Button onClick={handleCancel} variant="contained">
              Cancel
            </Button>
          </div> */}

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
                  style={styles.stylesForWHButton}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>
                    Add WareHouse Inventory
                  </strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForWHButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>
                    Update WareHouse Inventory
                  </strong>
                </Button>
              )}
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />

          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back}
              style={{ width: 45, height: 35, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddEditWareHouseInventory
