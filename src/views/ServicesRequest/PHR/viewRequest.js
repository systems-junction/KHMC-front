/*eslint-disable*/
import React, { useState, useEffect } from 'react'
// @material-ui/core components
import Button from '@material-ui/core/Button'
import Notification from '../../../components/Snackbar/Notification.js'
import Paper from '@material-ui/core/Paper'
import CustomTable from '../../../components/Table/Table'
import ConfirmationModal from '../../../components/Modal/confirmationModal'
import axios from 'axios'
import {
  getPurchaseRequestUrl,
  deletePurchaseRequestUrl,
} from '../../../public/endpoins'
import Loader from 'react-loader-spinner'

import Header from '../../../components/Header/Header'

import Add_New from '../../../assets/img/Add_New.png'
import purchase_request from '../../../assets/img/purchase request.png'
import Back_Arrow from '../../../assets/img/Back_Arrow.png'

import Search from '../../../assets/img/Search.png'
import Control_Room from '../../../assets/img/Control_Room.png'

import Edit from '../../../assets/img/Edit.png'

import Inactive from '../../../assets/img/Inactive.png'

import Active from '../../../assets/img/Active.png'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

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
}

const useStyles = makeStyles(styles)

export default function EdrRequest(props) {
  const classes = useStyles()

  useEffect(() => {}, [])

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
          Request Details
        </DialogTitle>
        <div className='container-fluid'>
          <div className='row'>
            {/* <div className="col-md-6" style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id="generated-label">Item Code</InputLabel>
              <input
                type="text"
                disabled={true}
                placeholder="Item Code"
                name={"itemCode"}
                value={props.item.itemCode}
                // onChange={onChangeValue}
                className="textInputStyle"
              />
            </div>
            <div className="col-md-6" style={styles.inputContainerForTextField}>
              <InputLabel style={styles.styleForLabel} id="generated-label">Item Name</InputLabel>

              <input
                type="text"
                disabled={true}
                placeholder="Name"
                name={"name"}
                value={props.item.name}
                // onChange={onChangeValue}
                className="textInputStyle"
              />
            </div> */}
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
