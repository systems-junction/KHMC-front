/*eslint-disable*/
import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import capitilizeLetter from '../../public/capitilizeLetter'
import cookie from 'react-cookies'
import CustomTable from '../../components/Table/Table'
import TextField from '@material-ui/core/TextField'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const tableHeadingForPHR = [
  'Medicine Name',
  'Requested Qty',
  'Dosage',
  'Frequency',
  'Duration',
  '',
]
const tableDataKeysForPHR = [
  'medicineName',
  'requestedQty',
  'dosage',
  'frequency',
  'duration',
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
  inputContainerForTextField: {
    marginTop: 25,
  },
  inputContainerForDropDown: {
    marginTop: 35,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  buttonContainer: {
    marginTop: 25,
  },
  styleForLabel: {
    fontWeight: '700',
  },
}

const useStylesForInput = makeStyles((theme) => ({
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

const useStyles = makeStyles(styles)

export default function EdrRequest(props) {
  const classes = useStylesForInput()
  const [currentUser, setCurrentUser] = React.useState(
    cookie.load('current_user')
  )

  useEffect(() => {
    console.log(props.item, 'view Data')
  }, [])

  return (
    <Dialog
      onClose={() => props.viewItem('')}
      fullWidth={true}
      maxWidth={'lg'}
      bodyStyle={{ backgroundColor: 'red' }}
      contentStyle={{ backgroundColor: 'red' }}
      aria-labelledby='simple-dialog-title'
      open={props.openItemDialog}
    >
      <DialogContent style={{ backgroundColor: '#31e2aa' }}>
        <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
          Details
        </DialogTitle>
        <div className='container-fluid'>
          <div className='row'>
            <div
              className='col-md-6 col-sm-6 col-6'
              style={styles.inputContainerForTextField}
            >
              {props.item.date ? (
                <div>
                  {/* <TextField
                    required
                    disabled={true}
                    label='Date'
                    name={'date'}
                    value={props.item.date}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline:true
                    }}
                  /> */}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      // required
                      disabled
                      inputVariant='filled'
                      fullWidth={true}
                      label='Date'
                      format='MM-dd-yyyy HH:mm'
                      // minDate={DateTime}
                      // onChange={(val) => onChangeDate(val, 'DateTime')}
                      InputProps={{
                        className: classes.input,
                        classes: { input: classes.input },
                      }}
                      style={{ borderRadius: '10px' }}
                      value={props.item.date}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              ) : (
                undefined
              )}
            </div>
            <div
              className='col-md-6 col-sm-6 col-6'
              style={styles.inputContainerForTextField}
            >
              {props.item.doctor ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label='Doctor'
                    name={'doctor'}
                    value={
                      props.item.doctor.firstName +
                      ` ` +
                      props.item.doctor.lastName
                    }
                    // error={buName === '' && isFormSubmitted}
                    // onChange={(e) => onChangeValue(e)}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : props.item.requester ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label='Requester'
                    name={'requester'}
                    value={
                      props.item.requester.firstName +
                      ` ` +
                      props.item.requester.lastName
                    }
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>

          <div className='row'>
            <div
              className='col-md-6 col-sm-6 col-6'
              style={styles.inputContainerForTextField}
            >
              {props.item.description ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label='Description'
                    name={'description'}
                    value={props.item.description}
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
              ) : (
                undefined
              )}
            </div>
            <div
              className='col-md-6 col-sm-6 col-6'
              style={styles.inputContainerForTextField}
            >
              {props.item.note ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label='Note'
                    name={'note'}
                    value={props.item.note}
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
              ) : props.item.consultationNotes ? (
                <div>
                  <TextField
                    required
                    disabled={true}
                    label='Consultation Note'
                    name={'consultationNotes'}
                    value={props.item.consultationNotes}
                    className='textInputStyle'
                    rows={4}
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>

          <div className='row'>
            <div
              className='col-md-6 col-sm-6 col-6'
              style={styles.inputContainerForTextField}
            >
              {props.item.serviceCode ? (
                <div>
                  <TextField
                    required
                    label='Service Code'
                    disabled={true}
                    placeholder='serviceCode'
                    name={'serviceCode'}
                    value={props.item.serviceCode}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
            <div
              className='col-md-6 col-sm-6 col-6'
              style={styles.inputContainerForTextField}
            >
              {props.item.serviceName ? (
                <div>
                  <TextField
                    required
                    label='Service Name'
                    disabled={true}
                    placeholder='serviceName'
                    name={'serviceName'}
                    value={props.item.serviceName}
                    className='textInputStyle'
                    variant='filled'
                    InputProps={{
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    }}
                  />
                </div>
              ) : (
                undefined
              )}
            </div>
          </div>

          <div className='container-fluid'>
            {props.item.medicine ? (
              <div className='row'>
                {props.item.medicine ? (
                  <CustomTable
                    tableData={props.item.medicine}
                    tableDataKeys={tableDataKeysForPHR}
                    tableHeading={tableHeadingForPHR}
                    borderBottomColor={'#60d69f'}
                    borderBottomWidth={20}
                  />
                ) : (
                  undefined
                )}
              </div>
            ) : (
              undefined
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginTop: '2%', marginBottom: '2%' }}>
              <Button onClick={() => props.viewItem('')} variant='contained'>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
