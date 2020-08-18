/* eslint-disable react/jsx-indent */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { ToastsStore } from 'react-toasts'
import cookie from 'react-cookies'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import { dateOptions } from '../../variables/public'
import {
  addBusinessUnitUrl,
  updateBusinessUnitUrl,
  getBusinessUnitLogsUrl,
} from '../../public/endpoins'

import Header from '../../components/Header/Header'

import Add_New from '../../assets/img/Add_New.png'
import business_Unit from '../../assets/img/business_Unit.png'
import view_all from '../../assets/img/Eye.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

const styles = {
  // buttonContainer: {
  //   marginTop: 25
  // }
  // inputContainerForTextField: {
  //   marginTop: 6,
  // },

  // inputContainerForDropDown: {
  //   marginTop: 6,
  // },
  // textFieldPadding: {
  //   paddingLeft: 3,
  //   paddingRight: 3,
  // },
  inputContainerForTextField: {
    marginTop: 6,
  },
  inputField: {
    outline: 'none',
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
  stylesForPurchaseButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2c6ddd',
    width: '60%',
    height: '40px',
    outline: 'none',
  },
  inputContainerForDropDown: {
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,

    paddingTop: 2,
    // paddingBottom: 5,
    // marginLeft: 10,
    // marginRight: 50,
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

function AddBusinessUnit(props) {
  const classes = useStyles()

  const initialState = {
    _id: '',
    buName: '',
    description: '',
    buHead: '',
    division: '',
    status: '',
    reason: '',
    buLogsId: '',
    statues: [],
    buHeads: [],
    divisions: [],
  }

  function reducer(state, { field, value }) {
    return { ...state, [field]: value }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    _id,
    buName,
    description,
    buHead,
    division,
    status,
    reason,
    buLogsId,
    statues,
    buHeads,
    divisions,
  } = state

  const [comingFor, setcomingFor] = useState('')
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [buLogs, setBuLogs] = useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function getBusinessUnitLogs(id) {
    const param = {
      _id: id,
    }

    axios
      .get(getBusinessUnitLogsUrl + '/' + param._id)
      .then((res) => {
        if (res.data.success) {
          setBuLogs(res.data.data)
        } else if (!res.data.success) {
          ToastsStore.error(res.data.error)
        }
      })
      .catch((e) => {
        console.log('error is ', e)
      })
  }

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))
    setcomingFor(props.history.location.state.comingFor)

    const selectedRec = props.history.location.state.selectedItem
    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        if (val && typeof val === 'object') {
          dispatch({ field: key, value: val._id })
          dispatch({ field: 'reason', value: val.reason })
        } else {
          dispatch({ field: key, value: val })
          if (key === '_id') {
            // get all logs related to this id
            getBusinessUnitLogs(val)
          }
        }
      })
    }
    // all array dispatch
    if (props.history.location.state.buHeads) {
      dispatch({
        field: 'buHeads',
        value: props.history.location.state.buHeads,
      })
    }
    if (props.history.location.state.status) {
      dispatch({
        field: 'statues',
        value: props.history.location.state.status,
      })
    }
    if (props.history.location.state.divisions) {
      dispatch({
        field: 'divisions',
        value: props.history.location.state.divisions,
      })
    }
  }, [])

  const handleCancel = () => {
    props.history.goBack()
  }

  const handleAdd = () => {
    setIsFormSubmitted(true)
    if (validateForm()) {
      const params = {
        buName,
        description,
        buHead,
        division,
        status,
        reason,
        updatedBy: currentUser.name,
      }
      axios
        .post(addBusinessUnitUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack()
            // props.history.push("/bus/success");
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error)
          }
        })
        .catch((e) => {
          console.log('error after adding bu inventory', e)
        })
    }
  }

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
    if (e.target.name === 'status') {
      dispatch({ field: 'reason', value: '' })
    }
  }

  function validateForm() {
    return (
      buName &&
      buName.length > 0 &&
      description &&
      description.length > 0 &&
      buHead &&
      buHead.length > 0 &&
      status &&
      status.length > 0
    )
  }

  const handleEdit = () => {
    setIsFormSubmitted(true)
    if (validateForm()) {
      const params = {
        _id,
        buName,
        description,
        buHead,
        division,
        status,
        updatedBy: currentUser.name,
        buLogsId,
        reason,
      }

      axios
        .put(updateBusinessUnitUrl, params)
        .then((res) => {
          if (res.data.success) {
            props.history.goBack()
          } else if (!res.data.success) {
            ToastsStore.error(res.data.error)
          }
        })
        .catch((e) => {
          console.log('error after adding bu inventory', e)
        })
    }
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
            <img src={business_Unit} />
            <h4>
              {comingFor === 'add'
                ? ' Add Business Unit'
                : ' Edit Business Unit'}
            </h4>
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

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* <h1>{comingFor === 'add' ? 'Add' : 'Edit'}</h1> */}

          <div className='row '>
            <div
              className='col-md-12'
              style={{
                ...styles.inputContainerForTextField,
                ...styles.textFieldPadding,
              }}
            >
              <TextField
                required
                label='BU Name'
                name={'buName'}
                value={buName}
                error={buName === '' && isFormSubmitted}
                onChange={(e) => onChangeValue(e)}
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
                id='buHead'
                name='buHead'
                value={buHead}
                error={buHead === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='BU Head'
                variant='filled'
                className='dropDownStyle'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                }}
              >
                <MenuItem value=''>
                  <em>BU Head</em>
                </MenuItem>
                {buHeads &&
                  buHeads.map((val) => {
                    return (
                      <MenuItem key={val._id} value={val._id}>
                        {val.firstName} {val.lastName}
                      </MenuItem>
                    )
                  })}
              </TextField>
            </div>

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
                id='division'
                name='division'
                value={division}
                error={division === '' && isFormSubmitted}
                onChange={onChangeValue}
                label='Division'
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
                {divisions &&
                  divisions.map((val) => {
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

          <div className='row'>
            {/* <div className="col-md-12" style={styles.inputContainer}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              fullWidth
              name="status"
              value={status}
              onChange={onChangeValue}
              label="Status"
              error={!status && isFormSubmitted}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {statues &&
                statues.map(val => {
                  return (
                    <MenuItem key={val.key} value={val.key}>
                      {val.value}
                    </MenuItem>
                  );
                })}
            </Select>
          </div> */}

            <div
              style={{
                display: 'flex',
                marginTop: 25,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  flex: 0.5,
                  display: 'flex',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <h5
                  style={{
                    color: 'white',
                    fontWeight: '700',
                    fontFamily: 'Ubuntu',
                  }}
                >
                  Status
                </h5>
              </div>

              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={() => dispatch({ field: 'status', value: 'active' })}
                  variant={status === 'active' ? 'contained' : 'outlined'}
                  color={status === 'active' ? 'primary' : 'outlined'}
                  style={{ color: 'white' }}
                >
                  Active
                </Button>
              </div>

              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={() =>
                    dispatch({ field: 'status', value: 'in_active' })
                  }
                  variant={status === 'in_active' ? 'contained' : 'outlined'}
                  color={status === 'in_active' ? 'primary' : 'outlined'}
                  style={{ color: 'white' }}
                >
                  In Active
                </Button>
              </div>
            </div>

            {status === 'in_active' ? (
              <div
                className='col-md-12'
                style={{
                  ...styles.inputContainerForTextField,
                  ...styles.textFieldPadding,
                }}
              >
                <TextField
                  required
                  label='Reason'
                  name={'reason'}
                  value={reason}
                  error={reason === '' && isFormSubmitted}
                  onChange={onChangeValue}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            ) : (
              undefined
            )}
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
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleAdd}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>
                    Add Business Unit
                  </strong>
                </Button>
              ) : (
                <Button
                  style={styles.stylesForPurchaseButton}
                  disabled={!validateForm()}
                  onClick={handleEdit}
                  variant='contained'
                  color='primary'
                >
                  <strong style={{ fontSize: '12px' }}>
                    Edit Business Unit
                  </strong>
                </Button>
              )}
            </div>
          </div>

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

export default AddBusinessUnit

{
  /* <div>
          {comingFor === 'edit' ? (
            <>
              <Table className="mt20">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Last Updated By</TableCell>
                    <TableCell>Last Updated at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buLogs &&
                    buLogs
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((prop, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              {prop.status === 'active'
                                ? 'Active'
                                : 'In Active'}
                            </TableCell>
                            <TableCell>
                              {prop.reason ? prop.reason : 'N/A'}
                            </TableCell>
                            <TableCell>{prop.updatedBy}</TableCell>
                            <TableCell>
                              {new Date(prop.updatedAt).getDate()}/
                              {new Date(prop.updatedAt).getMonth() + 1}/
                              {new Date(prop.updatedAt).getFullYear()}{' '}
                              {new Date(prop.updatedAt).getHours()}
                              {':'}
                              {new Date(prop.updatedAt).getMinutes()}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={buLogs && buLogs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          ) : (
            undefined
          )}
        </div> */
}
