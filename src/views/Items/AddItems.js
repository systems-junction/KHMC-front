import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles, withStyles } from '@material-ui/core/styles'
// import { makeStyles } from "@material-ui/core/styles";
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'
import { addItemUrl, updateItemUrl } from '../../public/endpoins'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Header from '../../components/Header/Header'
import items from '../../assets/img/Items Mgmt.png'
import view_all from '../../assets/img/Eye.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'

import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

import InputLabelComponent from '../../components/InputLabel/inputLabel'

import BootstrapInput from '../../components/Dropdown/dropDown.js'

// import { Formik, Form, Field, ErrorMessage } from "formik";

import ErrorMessage from '../../components/ErrorMessage/errorMessage'

import capitalizeFirstLetter from '../../public/capitilizeLetter'

import AvaliabilityComponent from '../../components/Avaliability/avaliability'
import useStyleforinput from '../../../src/assets/jss/material-dashboard-react/inputStyle.js'

const unit = [
  {
    key: 'kg',
    value: 'Kg',
  },
  {
    key: 'mg',
    value: 'Mg',
  },
  {
    key: 'cm',
    value: 'Cm',
  },
  {
    key: 'dm',
    value: 'Dm',
  },
]
const con = [
  {
    key: 'true',
    value: 'Yes',
  },
  {
    key: 'false',
    value: 'No',
  },
]
const styles = {
  // inputField: {
  //   outline: 'none',
  // },
  // // inputContainer: {
  // //   marginTop: 25,
  // //   backgroundColor: "white",
  // //   borderRadius: 5,
  // //   paddingTop: 5,
  // //   paddingBottom: 5,
  // //   paddingLeft: 5,
  // //   paddingRight: 5,
  // // },

  // inputContainer: {
  //   marginTop: 25,
  // },
  // stylesForButton: {
  //   color: 'white',
  //   cursor: 'pointer',
  //   borderRadius: 10,
  //   backgroundColor: '#2c6ddd',
  //   width: '115px',
  //   height: '40px',
  //   outline: 'none',
  // },
  // stylesForPurchaseButton: {
  //   color: 'white',
  //   cursor: 'pointer',
  //   borderRadius: 10,
  //   backgroundColor: '#2c6ddd',
  //   width: '60%',
  //   height: '40px',
  //   outline: 'none',
  // },

  // inputContainerForDropDown: {
  //   marginTop: 25,
  //   // backgroundColor: "white",
  //   // borderRadius: 10,
  //   // paddingLeft: 10,
  //   // paddingRight: 10,
  //   // paddingTop: 2,
  // },
  // inputContainerForTextField: {
  //   marginTop: 25,
  // },

  // inputContainerForDropDown: {
  //   marginTop: 25,
  //   // backgroundColor: 'white',
  //   // borderRadius: 10,
  //   // paddingLeft: 10,
  //   // paddingRight: 10,
  //   // paddingTop: 2,
  // },
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

  stylesForLabel: {
    fontWeight: '700',
    color: 'white',
  },

  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2C6DDD',
    width: '140px',
    height: '50px',
    outline: 'none',
  },

  stylesForPurchaseButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2C6DDD',
    width: '60%',
    height: '50px',
    outline: 'none',
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
}

const useStyles = makeStyles(tableStyles)

function AddItems(props) {
  const classes = useStyleforinput()
  const initialState = {
    _id: '',
    name: '',
    description: '',
    subClass: '',
    itemCode: '',
    receiptUnit: '',
    issueUnit: '',
    vendorId: '',
    purchasePrice: '',
    minimumLevel: '',
    maximumLevel: '',
    reorderLevel: '',
    vendors: [],
    units: [],
    cls: '',
    grandSubClass: '',
    comments: '',
    tax: '',
    receiptUnitCost: '',
    issueUnitCost: '',
    scientificName: '',
    tradeName: '',
    temperature: '',
    humidity: '',
    expiration: '',
    lightSensitive: '',
    resuableItem: '',
    storageCondition: '',

    avaliable: 'avaliable',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    _id,
    name,
    description,
    subClass,
    itemCode,
    receiptUnit,
    issueUnit,
    vendorId,
    purchasePrice,
    maximumLevel,
    minimumLevel,
    reorderLevel,
    units,
    cls,
    grandSubClass,
    comments,
    tax,
    receiptUnitCost,
    issueUnitCost,
    scientificName,
    tradeName,
    temperature,
    humidity,
    expiration,
    lightSensitive,
    resuableItem,
    storageCondition,

    avaliable,
  } = state
  const [comingFor, setcomingFor] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const [mainClasses, setClasses] = useState('')
  const [subClasses, setSubClasses] = useState('')
  const [childSubClass, setChildSubClasses] = useState('')

  const [vendorsArray, setVendorsArray] = useState('')

  const [msg, setMsg] = useState('')
  const [tr, setTr] = useState(false)

  useEffect(() => {
    setcomingFor(props.history.location.state.comingFor)
    setClasses(props.history.location.state.classes)
    setSubClasses(props.history.location.state.subClasses)
    setChildSubClasses(props.history.location.state.grandSubClasses)
    setVendorsArray(props.history.location.state.vendors)

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

    if (props.history.location.state.vendors) {
      dispatch({
        field: 'vendors',
        value: props.history.location.state.vendors,
      })
    }
    if (props.history.location.state.units) {
      dispatch({ field: 'units', value: props.history.location.state.units })
    }
  }, [])

  const onChangeValue = (e) => {
    console.log(e.target.name, e.target.value)
    dispatch({ field: e.target.name, value: e.target.value })
  }
  function onChangeDate(value, type) {
    dispatch({ field: type, value })
  }
  function validateForm() {
    const res =
      name.length > 0 &&
      description.length > 0 &&
      subClass.length > 0 &&
      itemCode.length > 0 &&
      receiptUnit.length > 0 &&
      receiptUnitCost !== '' &&
      issueUnit.length > 0 &&
      issueUnitCost !== '' &&
      vendorId.length > 0 &&
      purchasePrice !== '' &&
      maximumLevel !== '' &&
      minimumLevel !== '' &&
      reorderLevel !== '' &&
      cls.length > 0 &&
      tax !== '' &&
      grandSubClass.length > 0

    return res
  }
  const handleCancel = () => {
    props.history.goBack()
  }

  const handleAdd = () => {
    if (!validateForm()) {
      setIsFormSubmitted(true)
    } else if (validateForm()) {
      const params = {
        name,
        description,
        subClass,
        itemCode,
        receiptUnit,
        issueUnit,
        vendorId,
        purchasePrice,
        maximumLevel,
        minimumLevel,
        reorderLevel,
        cls,
        grandSubClass,
        comments,
        tax,
        receiptUnitCost,
        issueUnitCost,
        scientificName,
        tradeName,
        temperature,
        humidity,
        expiration,
        lightSensitive,
        resuableItem,
        storageCondition,
      }

      axios
        .post(addItemUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log('response after adding item', res)
            props.history.goBack()
          } else if (!res.data.success) {
            setTr(true)
          }
        })
        .catch((e) => {
          console.log('error after adding item', e)
          setTr(true)
          setMsg('Error while adding the item')
        })
    }
  }

  const handleEdit = () => {
    setIsFormSubmitted(true)
    if (validateForm()) {
      const params = {
        _id,
        name,
        description,
        subClass,
        itemCode,
        receiptUnit,
        issueUnit,
        vendorId,
        purchasePrice,
        maximumLevel,
        minimumLevel,
        reorderLevel,
        cls,
        grandSubClass,
        comments,
        tax,
        receiptUnitCost,
        issueUnitCost,
        scientificName,
        tradeName,
        temperature,
        humidity,
        expiration,
        lightSensitive,
        resuableItem,
        storageCondition,
      }
      axios
        .put(updateItemUrl, params)
        .then((res) => {
          if (res.data.success) {
            console.log('response after adding item', res)
            props.history.goBack()
          } else if (!res.data.success) {
            setTr(true)
          }
        })
        .catch((e) => {
          console.log('error after adding item', e)
          setTr(true)
          setMsg('Error while updating the item')
        })
    }
  }

  if (tr) {
    setTimeout(() => {
      setTr(false)
      setMsg('')
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
      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={items} />
            <h4>{comingFor === 'AddItems' ? ' Add Item' : ' Edit Item'}</h4>
          </div>

          <div>
            <Button
              onClick={() => props.history.goBack()}
              style={styles.stylesForButton}
              variant='contained'
              color='primary'
            >
              <img src={view_all} className='icon-view' />
              &nbsp;&nbsp;
              <strong style={{ fontSize: '12px' }}>View All</strong>
            </Button>
            {/* <img src={Search} /> */}
          </div>
        </div>
        <div className={`container-fluid ${classes.root}`}>
          <div className='row'>
            <div
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Item Name*</InputLabelComponent> */}
              <TextField
                // style={styles.inputField}
                type='text'
                label='Name'
                name={'name'}
                value={name}
                onChange={onChangeValue}
                className='textInputStyle'
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={name === '' && isFormSubmitted}
              />
              {/* <ErrorMessage name={name} isFormSubmitted={isFormSubmitted} /> */}
            </div>
            <div
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              {/* <InputLabelComponent>Item Code*</InputLabelComponent> */}
              <TextField
                // style={styles.inputField}
                // type="number"
                label='Item Code'
                name={'itemCode'}
                value={itemCode}
                onChange={onChangeValue}
                className='textInputStyle'
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
                error={itemCode === '' && isFormSubmitted}
              />
              {/* <ErrorMessage
                  name={itemCode}
                  isFormSubmitted={isFormSubmitted}
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
              {/* <InputLabelComponent>Description*</InputLabelComponent> */}

              <TextField
                // style={styles.inputField}
                type='text'
                label='Description'
                name={'description'}
                value={description}
                error={description === '' && isFormSubmitted}
                onChange={onChangeValue}
                className='textInputStyle'
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
              {/* <ErrorMessage
                name={description}
                isFormSubmitted={isFormSubmitted}
              /> */}
            </div>
          </div>

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
                select
                fullWidth
                id='receiptUnit'
                name='receiptUnit'
                value={receiptUnit}
                error={receiptUnit === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Receipt Unit'
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
                {unit.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  )
                })}
              </TextField>
            </div>
            <div
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type='number'
                label='Receipt Unit Cost'
                name={'receiptUnitCost'}
                value={receiptUnitCost}
                error={receiptUnitCost === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
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
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id='issueUnit'
                name='issueUnit'
                value={issueUnit}
                error={issueUnit === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Issue Unit'
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
                {unit.map((val) => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  )
                })}
              </TextField>
            </div>
            <div
              className='col-md-6'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label='Issue Unit Cost'
                name={'issueUnitCost'}
                value={issueUnitCost}
                error={issueUnitCost === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
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
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id='vendorId'
                name='vendorId'
                value={vendorId}
                error={vendorId === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Vendor'
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
                {vendorsArray &&
                  vendorsArray.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.englishName}
                      </MenuItem>
                    )
                  })}
              </TextField>
            </div>

            <div
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type='number'
                label='Purchase Price'
                name={'purchasePrice'}
                value={purchasePrice}
                error={purchasePrice === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>
            <div
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label='Tax'
                type='number'
                name={'tax'}
                value={tax}
                error={tax === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
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
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type='number'
                label='Minimum Level'
                name={'minimumLevel'}
                value={minimumLevel}
                error={minimumLevel === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>

            <div
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type='number'
                label='Maximum Level'
                name={'maximumLevel'}
                value={maximumLevel}
                error={maximumLevel === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>

            <div
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                type='number'
                label='Reorder Level'
                name={'reorderLevel'}
                value={reorderLevel}
                error={reorderLevel === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
                className='textInputStyle'
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
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
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id='cls'
                name='cls'
                value={cls}
                error={cls === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Class'
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
                {mainClasses &&
                  mainClasses.map((val) => {
                    return (
                      <MenuItem key={val.key} value={val.key}>
                        {val.value}
                      </MenuItem>
                    )
                  })}
              </TextField>
            </div>

            <div
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id='subClass'
                name='subClass'
                value={subClass}
                error={subClass === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Sub Class'
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
                {subClasses &&
                  subClasses.map((val) => {
                    if (val.parent === cls)
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                  })}
              </TextField>
            </div>

            <div
              className='col-md-4'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                select
                fullWidth
                id='grandSubClass'
                name='grandSubClass'
                value={grandSubClass}
                error={grandSubClass === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Grand Sub Class'
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
                {childSubClass &&
                  childSubClass.map((val) => {
                    if (val.parent === subClass)
                      return (
                        <MenuItem key={val.key} value={val.key}>
                          {val.value}
                        </MenuItem>
                      )
                  })}
              </TextField>
            </div>
          </div>
          <div className='row'>
            {(grandSubClass == 'me_medicines' ||
              grandSubClass == 'cm_contrast' ||
              grandSubClass == 'mri_contrast') && (
              <>
                <div className='col-md-4'>
                  <div style={styles.inputContainer}>
                    <InputLabelComponent>Scientific Name</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Scientific Name'
                      name={'scientificName'}
                      value={scientificName}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                </div>
                <div className='col-md-4'>
                  <div style={styles.inputContainer}>
                    <InputLabelComponent>TradeName</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='text'
                      placeholder='Trade Name'
                      name={'tradeName'}
                      value={tradeName}
                      onChange={onChangeValue}
                      className='textInputStyle'
                    />
                  </div>
                </div>
              </>
            )}
            {(subClass == 'radiology_medicine' ||
              grandSubClass == 'me_medicines' ||
              subClass == 'laboratory_supplies' ||
              (subClass == 'medical_supplies' &&
                grandSubClass != 'os_orthopedic')) && (
              <>
                <div className='col-md-4'>
                  <div style={styles.inputContainer}>
                    <InputLabelComponent>Temperature</InputLabelComponent>

                    <input
                      style={styles.inputField}
                      type='number'
                      placeholder='Temperature'
                      name={'temperature'}
                      value={temperature}
                      onChange={onChangeValue}
                      className='textInputStyle'
                      onKeyDown={(evt) =>
                        evt.key === 'e' && evt.preventDefault()
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {(grandSubClass == 'fs_food_supplies' ||
              grandSubClass == 'hs_house_keeping' ||
              subClass == 'radiology_medicine' ||
              grandSubClass == 'me_medicines' ||
              subClass == 'laboratory_supplies' ||
              (subClass == 'medical_supplies' &&
                grandSubClass != 'os_orthopedic')) && (
              <>
                <div className='col-md-4'>
                  <div style={styles.inputContainer}>
                    <InputLabelComponent>Humidity</InputLabelComponent>
                    <input
                      style={styles.inputField}
                      type='number'
                      placeholder='Humidity'
                      name={'humidity'}
                      value={humidity}
                      onChange={onChangeValue}
                      className='textInputStyle'
                      onKeyDown={(evt) =>
                        evt.key === 'e' && evt.preventDefault()
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {grandSubClass == 'me_medicines' && (
              <>
                <div className='col-md-4'>
                  <div style={styles.inputContainerForDropDown}>
                    <InputLabelComponent>Light Sensitive</InputLabelComponent>
                    <Select
                      style={styles.inputField}
                      fullWidth
                      labelId='receiptUnit-label'
                      id='lightSensitive'
                      name='lightSensitive'
                      value={lightSensitive}
                      onChange={onChangeValue}
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {con.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </div>
                </div>
              </>
            )}
            {(grandSubClass == 'ms_medical' ||
              grandSubClass == 'mei_medical' ||
              grandSubClass == 'cs_cardiac') && (
              <>
                <div className='col-md-4'>
                  <div style={styles.inputContainerForDropDown}>
                    <InputLabelComponent>Reusable</InputLabelComponent>
                    <Select
                      style={styles.inputField}
                      fullWidth
                      labelId='receiptUnit-label'
                      id='resuableItem'
                      name='resuableItem'
                      value={resuableItem}
                      onChange={onChangeValue}
                      className='dropDownStyle'
                      input={<BootstrapInput />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {con.map((val) => {
                        return (
                          <MenuItem key={val.key} value={val.key}>
                            {val.value}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </div>
                </div>
              </>
            )}
            {(subClass == 'food_beverage' ||
              subClass == 'laboratory_supplies' ||
              subClass == 'radiology_medicine' ||
              grandSubClass == 'housekeeping_supplies' ||
              grandSubClass == 'of_office' ||
              grandSubClass == 'mei_medical' ||
              grandSubClass == 'cs_cardiac' ||
              (subClass == 'medical_supplies' &&
                grandSubClass != 'mei_medical')) && (
              <>
                <div className='col-md-4'>
                  <div style={styles.inputContainer}>
                    <InputLabelComponent>Expiration</InputLabelComponent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        style={styles.inputField}
                        inputVariant='outlined'
                        style={{ backgroundColor: 'white' }}
                        className='textInputStyle'
                        onChange={(val) => onChangeDate(val, 'expiration')}
                        fullWidth
                        value={
                          comingFor === 'add'
                            ? expiration
                              ? expiration
                              : new Date()
                            : expiration
                        }
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </>
            )}
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
                multiline
                type='text'
                error={comments === '' && isFormSubmitted}
                label='Comments'
                name={'comments'}
                value={comments}
                onChange={onChangeValue}
                rows={3}
                className='textInputStyle'
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              />
            </div>
          </div>
          <br />

          <div className='row'>
            <div className='col-md-12'>
              <div style={styles.inputContainer}>
                <InputLabelComponent>Avaliability</InputLabelComponent>
                <AvaliabilityComponent
                  avaliable={avaliable}
                  onChange={onChangeValue}
                />
              </div>
            </div>
          </div>

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
              {comingFor === 'AddItems' ? (
                <Button
                  style={styles.stylesForPurchaseButton}
                  // disabled={!validateForm()}
                  onClick={handleAdd}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Add Item</strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>Edit Item</strong>
                </Button>
              )}
            </div>
          </div>
          <Notification msg={msg} open={tr} />
          <div style={{ marginBottom: 20 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ width: 45, height: 35, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddItems
