/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import axios from 'axios'
import { uploadsUrl } from '../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../components/Header/Header'
import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Back from '../../assets/img/Back_Arrow.png'
import Lab_RadIcon from '../../assets/img/Lab-Rad Request.png'

const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '10px',
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
  },
}
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    '&:after': {
      borderBottomColor: 'black',
    },
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  multilineColor: {
    backgroundColor: 'white',
    borderRadius: 5,
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
    '& .Mui-disabled': {
      backgroundColor: 'white',
      color: 'gray',
    },
  },
}))

function ViewLabRadReport(props) {
  const classes = useStyles()
  const initialState = {
    comments: '',
    serviceType: '',
    results: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { comments, serviceType, results } = state

  const onChangeValue = (e) => {
    dispatch({ field: e.target.name, value: e.target.value })
  }

  const [currentUser, setCurrentUser] = useState('')
  const [id] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem
    console.log('selected rec ', selectedRec)

    if (selectedRec) {
      Object.entries(selectedRec).map(([key, val]) => {
        dispatch({ field: key, value: val })
      })
    }
  }, [])

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
        <div className='subheader' style={{ marginLeft: '-11px' }}>
          <div>
            <img src={Lab_RadIcon} />
            <h4>
              {serviceType === 'lab'
                ? 'Lab Reports'
                : serviceType === 'radio'
                ? 'Radiology Reports'
                : 'Reports'}
            </h4>
          </div>
        </div>

        <div
          style={{
            height: '50px',
          }}
        />

        <div className='container-fluid' style={styles.patientDetails}>
          <div className={`row ${classes.root}`}>
            <div className='col-md-12'>
              {/* <InputLabel style={styles.styleForLabel}>Comments / Notes</InputLabel>
                            <textarea
                                style={styles.inputStyles}
                                name={"comments"}
                                value={comments}
                                onChange={onChangeValue}
                                rows="4"
                                className='textInputStyle'
                            /> */}
              <TextField
                required
                disabled
                multiline
                type='text'
                label='Comments / Notes'
                name={'comments'}
                value={comments}
                onChange={onChangeValue}
                rows={4}
                className='textInputStyle'
                variant='filled'
                InputProps={{
                  className: classes.input,
                  classes: { input: classes.input },
                  disableUnderline: true,
                }}
              />
            </div>
          </div>
        </div>

        <div className='container-fluid' style={{ marginLeft: '-15px' }}>
          <div className='row'>
            {results !== '' && results.includes('\\') ? (
              <>
                {results !== '' &&
                results.slice(results.length - 3) !== 'pdf' ? (
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                    }}
                  >
                    <img
                      src={uploadsUrl + results.split('\\')[1]}
                      className='depositSlipImg'
                    />
                  </div>
                ) : results !== '' &&
                  results.slice(results.length - 3) === 'pdf' ? (
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                    }}
                  >
                    <Button
                      href={uploadsUrl + results.split('\\')[1]}
                      style={{ color: '#2c6ddd' }}
                    >
                      Click here to open results
                    </Button>
                  </div>
                ) : (
                  undefined
                )}
              </>
            ) : results !== '' && results.includes('/') ? (
              <>
                {results !== '' &&
                results.slice(results.length - 3) !== 'pdf' ? (
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                    }}
                  >
                    <img
                      src={uploadsUrl + results}
                      className='depositSlipImg'
                    />
                  </div>
                ) : results !== '' &&
                  results.slice(results.length - 3) === 'pdf' ? (
                  <div
                    className='col-md-6 col-sm-6 col-6'
                    style={{
                      ...styles.inputContainerForTextField,
                    }}
                  >
                    <Button
                      href={uploadsUrl + results}
                      style={{ color: '#2c6ddd' }}
                    >
                      Click here to open results
                    </Button>
                  </div>
                ) : (
                  undefined
                )}
              </>
            ) : (
              undefined
            )}
          </div>
        </div>

        <div className='container-fluid'>
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
          </div>
        </div>
      </div>
    </div>
  )
}
export default ViewLabRadReport
