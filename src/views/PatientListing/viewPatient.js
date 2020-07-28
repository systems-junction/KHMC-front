import React from 'react'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel'

import { makeStyles } from '@material-ui/core/styles'

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
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    width: '120px',
    height: '45px',
  },
}

const useStyles = makeStyles(styles)

export default function ViewPatient(props) {
  const classes = useStyles()

  return (
    <Dialog
      onClose={() => props.viewItem('')}
      fullWidth={true}
      maxWidth={'lg'}
      bodyStyle={{ backgroundColor: 'red' }}
      contentStyle={{ backgroundColor: 'red' }}
      aria-labelledby='simple-dialog-title'
      open={true}
    >
      <DialogContent style={{ backgroundColor: '#31e2aa' }}>
        <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
          Insurance Details
        </DialogTitle>
        <div className='row'>
          <div className='col-md-3' style={styles.inputContainerForTextField}>
            <InputLabel style={styles.styleForLabel} id='generated-label'>
              Insurance No
            </InputLabel>
            <h6>{props.item.insuranceId}</h6>
          </div>
          <div className='col-md-3' style={styles.inputContainerForTextField}>
            <InputLabel style={styles.styleForLabel} id='generated-label'>
              Insurance Vendor
            </InputLabel>
            <h6>{props.item.insuranceVendor}</h6>
          </div>
          <div className='col-md-3' style={styles.inputContainerForTextField}>
            <InputLabel style={styles.styleForLabel} id='generated-label'>
              Coverage Details
            </InputLabel>
            <h6>{props.item.coverageDetails}</h6>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-3' style={styles.inputContainerForTextField}>
            <InputLabel style={styles.styleForLabel} id='generated-label'>
              Coverage Terms
            </InputLabel>
            <h6>{props.item.coverageTerms}</h6>
          </div>
          <div className='col-md-3' style={styles.inputContainerForTextField}>
            <InputLabel style={styles.styleForLabel} id='generated-label'>
              Co-Payment %
            </InputLabel>
            <h6>{props.item.payment}</h6>
          </div>
        </div>
        <hr />

        <DialogTitle id='simple-dialog-title' style={{ color: 'white' }}>
          Patient Details
        </DialogTitle>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Patient FirstName
              </InputLabel>
              <h6>{props.item.firstName}</h6>
            </div>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Patient LastName
              </InputLabel>
              <h6>{props.item.lastName}</h6>
            </div>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Patient Phone Number
              </InputLabel>
              <h6>{props.item.phoneNumber}</h6>
            </div>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Gender
              </InputLabel>
              <h6>{props.item.gender}</h6>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Phone Number
              </InputLabel>
              <h6>{props.item.phoneNumber}</h6>
            </div>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Address
              </InputLabel>
              <h6>{props.item.address}</h6>
            </div>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                City
              </InputLabel>
              <h6>{props.item.city}</h6>
            </div>
            <div className='col-md-3' style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id='generated-label'>
                Country
              </InputLabel>
              <h6>{props.item.country}</h6>
            </div>
          </div>
          <hr />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '2%', marginBottom: '2%' }}>
              <Button
                style={styles.stylesForButton}
                onClick={() => props.viewItem('')}
                variant='contained'
              >
                Cancel
              </Button>
              &nbsp;
              <Button
                style={styles.stylesForButton}
                onClick={() => props.handleEdit(props.item)}
                variant='contained'
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
