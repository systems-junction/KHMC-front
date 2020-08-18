/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../../components/Snackbar/Notification.js'
import { updateEDR, addPreApproval } from '../../../public/endpoins'
import InputLabelComponent from '../../../components/InputLabel/inputLabel'
import BootstrapInput from '../../../components/Dropdown/dropDown.js'
import ErrorMessage from '../../../components/ErrorMessage/errorMessage'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import PreApproval from '../../../assets/img/Pre-Approval.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import CustomTable from '../../../components/Table/Table'
import TextArea from '../../../components/common/TextArea'

const statusArray = [
  { key: 'Analysis In Progress', value: 'Analysis In Progress' },
  { key: 'Approved', value: 'Approved' },
  { key: 'Partial Approved', value: 'Partial Approved' },
  { key: 'Rejected', value: 'Rejected' },
]

const tableHeadingForNeedApprovalMeds = [
  'Medicine Name',
  'Quantity',
  'Unit Price',
  'Total Price',
  '',
]
const tableDataKeysForNeedApprovalMeds = [
  'medicineName',
  'requestedQty',
  ['itemId', 'purchasePrice'],
  'totalPrice',
]

const styles = {
  inputContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
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
  inputField: {
    outline: 'none',
  },
  inputContainerForDropDown: {
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 25,
  },
  textFieldPadding: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  inputContainerForTextField: {
    marginTop: 6,
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

function AddEditEDR(props) {
  const classes = useStyles()
  const initialState = {
    testName: '',
    price: '',
    description: '',
    approvalNumber: '',
    approvalPerson: cookie.load('current_user').name,
    status: '',
    coPayment: '',
    netPayment: '',
    comments: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    testName,
    price,
    description,
    approvalNumber,
    approvalPerson = cookie.load('current_user').name,
    status,
    coPayment,
    netPayment,
    comments,
  } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [, setcomingFor] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [isFormSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [id, setId] = useState('')
  const [, setrequestNo] = useState('')
  const [medicineDataArray, setmedicineDataArray] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    setcomingFor(props.history.location.state.comingFor)

    // console.log(props.history.location.state.selectedItem)

    if (
      props.history.location.state.selectedItem.RequestType === 'LR' ||
      props.history.location.state.selectedItem.RequestType === 'RR'
    ) {
      console.log(props.history.location.state.selectedItem)
      dispatch({
        field: 'price',
        value: props.history.location.state.selectedItem.totalCost,
      })
      dispatch({
        field: 'testName',
        value: props.history.location.state.selectedItem.serviceName,
      })
      dispatch({
        field: 'description',
        value: props.history.location.state.selectedItem.serviceId.description,
      })
    }

    const selectedRec = props.history.location.state.selectedItem

    if (selectedRec.medicine) {
      console.log('Item', props.history.location.state.selectedItem.medicine)

      selectedRec.medicine.map(
        (d) => (d.totalPrice = d.requestedQty * d.itemId.purchasePrice)
      )
      setmedicineDataArray(selectedRec.medicine)
    }

    setId(props.history.location.state.selectedItem._id)
    setrequestNo(props.history.location.state.selectedItem.requestNo)
  }, [])

  const handleSubmit = () => {
    const params = {
      approvalNo: approvalNumber,
      approvalPerson: currentUser.staffId,
      comments,
      coPayment,
      netPayment,
      status,
    }
    console.log('params', params)
    axios
      .post(addPreApproval, params)
      .then((res) => {
        if (res.data.success) {
          console.log('response while adding Approval Req', res.data.data)
          props.history.goBack()
        } else if (!res.data.success) {
          setOpenNotification(true)
          setErrorMsg('Error while adding the Medicine request')
        }
      })
      .catch((e) => {
        console.log('error after adding Approval request', e)
        setOpenNotification(true)
        setErrorMsg('Error after adding the Approval request')
      })
    //   }
    // }
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
            <img src={PreApproval} />
            <h4>Pre-Approval</h4>
          </div>
        </div>

        <div
          style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
          className='container-fluid'
        >
          {medicineDataArray ? (
            <>
              <div className='row' style={{ marginTop: '20px' }}>
                {medicineDataArray !== 0 ? (
                  <CustomTable
                    tableData={medicineDataArray}
                    tableDataKeys={tableDataKeysForNeedApprovalMeds}
                    tableHeading={tableHeadingForNeedApprovalMeds}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>
              <hr />
            </>
          ) : (
            undefined
          )}
          <div className='container-fluid'>
            {props.history.location.state.selectedItem.RequestType === 'LR' ||
            props.history.location.state.selectedItem.RequestType === 'RR' ? (
              <>
                <div className='row'>
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      disabled={true}
                      label='Test Name'
                      name={'testName'}
                      value={testName}
                      error={testName === '' && isFormSubmitted}
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
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      disabled={true}
                      label='Price'
                      name={'price'}
                      value={price}
                      error={price === '' && isFormSubmitted}
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
                    className='col-md-12 col-sm-12 col-12'
                    style={{
                      ...styles.inputContainerForTextField,
                      ...styles.textFieldPadding,
                    }}
                  >
                    <TextField
                      required
                      disabled={true}
                      // multiline
                      type='text'
                      error={description === '' && isFormSubmitted}
                      label='Description'
                      name={'description'}
                      value={description}
                      onChange={onChangeValue}
                      rows={4}
                      className='textInputStyle'
                      variant='filled'
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              undefined
            )}

            <div className='row'>
              <div
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='Approval Number'
                  name={'approvalNumber'}
                  value={approvalNumber}
                  error={approvalNumber === '' && isFormSubmitted}
                  onChange={(e) => onChangeValue(e)}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
              <div
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  disabled
                  label='Approval Person'
                  name={'approvalPerson'}
                  value={approvalPerson}
                  error={approvalPerson === '' && isFormSubmitted}
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
                className='col-md-6 col-sm-6 col-6'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='Co-Payment'
                  name={'coPayment'}
                  value={coPayment}
                  error={coPayment === '' && isFormSubmitted}
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
                className='col-md-6 col-sm-6 col-6'
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
                  value={status}
                  error={status === '' && isFormSubmitted}
                  onChange={onChangeValue}
                  label='Status'
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
                  {statusArray.map((val) => {
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
              <div
                className='col-md-12 col-sm-12 col-12'
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
                  rows={4}
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
            className='row'
            style={{ marginTop: '25px', marginBottom: '25px' }}
          >
            <div className='col-md-6 col-sm-6 col-6'>
              <img
                onClick={() => props.history.goBack()}
                src={Back}
                style={{ width: 45, height: 35, cursor: 'pointer' }}
              />
            </div>

            <div className='col-md-6 col-sm-6 col-6 d-flex justify-content-end'>
              <Button
                style={styles.stylesForButton}
                // disabled={!validateForm()}
                onClick={handleSubmit}
                variant='contained'
                color='primary'
              >
                <strong style={{ fontSize: '12px' }}>Submit</strong>
              </Button>
            </div>
          </div>

          <Notification msg={errorMsg} open={openNotification} />
        </div>
      </div>
    </div>
  )
}
export default AddEditEDR
