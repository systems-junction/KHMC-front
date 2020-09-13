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
// const actions = { view: false };

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
const stylesB = {
  stylesForActive: {
    verticalAlign: 'center',
    fontSize: '0.62rem',
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    background: '#2c6ddd',
    width: '100px',
    height: '45px',
    outline: 'none',
    boxShadow: 'none',
  },
  stylesForInActive: {
    verticalAlign: 'center',
    fontSize: '0.62rem',
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    background: '#845DC2',
    width: '100px',
    height: '45px',
    outline: 'none',
    boxShadow: 'none',
  },
  stylesForReceived: {
    verticalAlign: 'center',
    fontSize: '0.62rem',
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    background: '#845DC2',
    width: '100px',
    height: '45px',
    boxShadow: 'none',
    outline: 'none',
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
    '& .Mui-disabled': {
      backgroundColor: 'white',
      color: 'gray',
    },
  },
}))

export default function EdrRequest(props) {
  const classes = useStylesForInput()
  const [currentUser] = React.useState(
    cookie.load('current_user')
  )

  useEffect(() => {
    console.log(props.item, 'view Data')
  }, [])

  const replaceSlugToTitle = (val) => {
    if (
      val === "active" ||
      val === "complete" ||
      val === "Complete" ||
      val === "pending" ||
      val === "modify" ||
      val === "closed" ||
      val === "delivered" ||
      val === "partially completed" ||
      val === "approved" ||
      val === "Approved" ||
      val === "Analysis In Progress" ||
      val === "reject" ||
      val === "response in progress" ||
      val === "partial approved" ||
      val === "Partial Approved" ||
      val === "completed" ||
      val === "approve" ||
      val === "received" ||
      val === "Partially Received" ||
      val === "Cannot be fulfilled" ||
      val === "Item Returned to Warehouse" ||
      val === "Returned" ||
      val === "receive" ||
      val === "Received" ||
      val === "rejected" ||
      val === "Sent for PAR"
    ) {
      return (
        <>
          {val === "complete" || val === "Complete" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Complete</strong>
            </Button>
          ) : val === "active" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Active</strong>
            </Button>
          ) : val === "Sent for PAR" ? (
            <Button
              style={{ ...stylesB.stylesForActive, width: "120px" }}
              variant="contained"
              color="primary"
            >
              <strong>Sent for PAR</strong>
            </Button>
          ) : val === "closed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>closed</strong>
            </Button>
          ) : val === "pending" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>pending</strong>
            </Button>
          ) : val === "modify" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Modify</strong>
            </Button>
          ) : val === "delivered " ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>Delivered </strong>
            </Button>
          ) : val === "completed" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Completed</strong>
            </Button>
          ) : val === "approved" || val === "Approved" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#ba55d3" }}
              variant="contained"
              color="primary"
            >
              <strong>Approved</strong>
            </Button>
          ) : val === "partial approved" || val === "Partial Approved" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
                backgroundColor: "#2c6ddd",
                width: "150px",
              }}
              variant="contained"
              color="primary"
            >
              <strong>partial approved</strong>
            </Button>
          ) : val === "partially completed" ? (
            <Button
              style={{
                ...stylesB.stylesForActive,
                backgroundColor: " #2c6ddd",
              }}
              variant="contained"
              color="primary"
            >
              <strong>partially completed</strong>
            </Button>
          ) : val === "response in progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#e877a1" }}
              variant="contained"
              color="primary"
            >
              <strong>Response in progress</strong>
            </Button>
          ) : val === "reject" ? (
            <Button
              style={{ ...stylesB.stylesForActive, backgroundColor: "#2c6ddd" }}
              variant="contained"
              color="primary"
            >
              <strong>Reject</strong>
            </Button>
          ) : val === "received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : val === "rejected" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Rejected</strong>
            </Button>
          ) : val === "Analysis In Progress" ? (
            <Button
              style={{ ...stylesB.stylesForActive, width: "150px" }}
              variant="contained"
              color="primary"
            >
              <strong>Analysis In Progress</strong>
            </Button>
          ) : val === "receive" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Receive</strong>
            </Button>
          ) : val === "Partially Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Partially Received</strong>
            </Button>
          ) : val === "approve" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Approve</strong>
            </Button>
          ) : val === "Cannot be fulfilled" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Cannot be fulfilled</strong>
            </Button>
          ) : val === "Returned" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Item Returned</strong>
            </Button>
          ) : val === "Received" ? (
            <Button
              style={stylesB.stylesForActive}
              variant="contained"
              color="primary"
            >
              <strong>Received</strong>
            </Button>
          ) : (
                                                        <Button
                                                          style={stylesB.stylesForActive}
                                                          variant="contained"
                                                          color="primary"
                                                        >
                                                          <strong>Item Returned</strong>
                                                        </Button>
                                                      )}
        </>
      );
    }

    return capitilizeLetter(val)
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return (
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " " +
      d.toLocaleTimeString()
    );
  };

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
        <div className={`container-fluid ${classes.root}`}>
          <div className='row'>

            {props.item.doctor ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
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
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            ) : props.item.requester.firstName ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
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
                  }}
                />
              </div>
            ) : props.item.requesterName ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
                <TextField
                  required
                  disabled={true}
                  label='Requester'
                  name={'requester'}
                  value={
                    props.item.requesterName
                  }
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

            {props.item.date ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
                <TextField
                  required
                  disabled={true}
                  label='Date'
                  name={'date'}
                  value={formatDate(props.item.date)}
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
                    }}
                  />
                </div>
              ) : (
                  undefined
                )}
            </div>
          </div>

          <div className='row'>

            {props.item.description ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
                <TextField
                  multiline
                  required
                  disabled={true}
                  label='Description / Condition'
                  name={'description'}
                  value={props.item.description}
                  rows={4}
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

            {props.item.note ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
                <TextField
                  required
                  multiline
                  disabled={true}
                  label='Consultation Note'
                  name={'note'}
                  value={props.item.note}
                  rows={4}
                  className='textInputStyle'
                  variant='filled'
                  InputProps={{
                    className: classes.input,
                    classes: { input: classes.input },
                  }}
                />
              </div>
            ) : props.item.consultationNotes ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
                <TextField
                  required
                  multiline
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
                  }}
                />
              </div>
            ) : props.item.comments ? (
              <div
                className='col-md-6 col-sm-6 col-6'
                style={styles.inputContainerForTextField}
              >
                <TextField
                  required
                  multiline
                  disabled={true}
                  label='Comments'
                  name={'comments'}
                  value={props.item.comments}
                  className='textInputStyle'
                  rows={4}
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

          <div
            className='container'
          // style={styles.inputContainerForTextField}
          >
            {props.item.medicine ? (
              <div>
                <InputLabel style={styles.styleForLabel} id='generated-label'>
                  Your PHR Medicine
                </InputLabel>{' '}
                {props.item.medicine ? (
                  <CustomTable
                    tableData={props.item.medicine}
                    tableDataKeys={tableDataKeysForPHR}
                    tableHeading={tableHeadingForPHR}
                    // handleView={viewItem}
                    // action={actions}
                    borderBottomColor={'#60d69f'}
                  // borderBottomWidth={20}
                  />
                ) : (
                    undefined
                  )}
              </div>
            ) : (
                undefined
              )}
          </div>

          <div className='row'>
            <div
              className='col-md-12 col-sm-12 col-12 d-flex justify-content-center text-center'
              style={styles.inputContainerForTextField}
            >
              {props.item.status ? (
                <div>
                  <InputLabel style={styles.styleForLabel} id='generated-label'>
                    Status
                  </InputLabel>
                  {replaceSlugToTitle(props.item.status)}
                </div>
              ) : (
                  undefined
                )}
            </div>
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
