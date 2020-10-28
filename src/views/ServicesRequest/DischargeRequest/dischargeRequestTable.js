/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/Discharge Request.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../../components/Table/Table'
import plus_icon from '../../../assets/img/Plus.png'
import ViewSingleRequest from './viewRequestService'
import Notification from '../../../components/Snackbar/Notification.js'
import TextArea from '../../../components/common/TextArea'
import axios from 'axios'
import { updateEDR, getEDRDischargeUrl } from '../../../public/endpoins'

const tableHeadingForDischargeMed = [
  'MRN No',
  'Request No',
  'Patient Name',
  'Date/Time',
  'Status',
  'Generated From',
  'Action',
]
const tableDataKeysForDischargeMed = [
  ['patientId', 'profileNo'],
  'requestNo',
  ['patientId', 'firstName'],
  'updatedAt',
  ['dischargeRequest', 'status'],
  'requestType',
]
const actions = { view: true }
const styles = {
  patientDetails: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '20px',
  },
  inputContainerForTextField: {
    marginTop: 25,
  },
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
    borderRadius: 15,
    backgroundColor: '#2c6ddd',
    height: '50px',
    outline: 'none',
  },
  buttonContainer: {
    marginTop: 25,
  },
  stylesForLabel: {
    fontWeight: '700',
    color: 'gray',
  },
}

const useStylesForTabs = makeStyles({
  root: {
    justifyContent: 'center',
  },
  scroller: {
    flexGrow: '0',
  },
})

function DischargeRequest(props) {
  const classesForTabs = useStylesForTabs()

  const initialState = {
    dischargeMedArray: '',

    otherNotes: '',
    dischargeNotes: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    dischargeMedArray,

    otherNotes,
    dischargeNotes,
  } = state

  const [, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [item, setItem] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))
    getEDRdetails()
  }, [])

  function getEDRdetails() {
    axios
      .get(getEDRDischargeUrl)
      .then((res) => {
        if (res.data.success) {
          console.log('response after getting the EDR details', res.data.data)
          setSelectedItem(res.data.data)
        } else if (!res.data.success) {
          setErrorMsg(res.data.error)
          setOpenNotification(true)
        }
        return res
      })
      .catch((e) => {
        console.log('error: ', e)
      })
  }

  function viewItem(item) {
    let path = `dischargerequest/view`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add',
        selectedItem: item,
        dischargeMedArray,
      },
    })
  }

  const addNewRequest = () => {}

  const onClick = () => {
    setValue(value + 1)
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
      <Header history={props.history}/>

      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={business_Unit} />
            <h4>Discharge Request</h4>
          </div>
        </div>

        <div
          style={{
            height: '20px',
          }}
        />

        <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
          {selectedItem ? (
            <CustomTable
              tableData={selectedItem}
              tableDataKeys={tableDataKeysForDischargeMed}
              tableHeading={tableHeadingForDischargeMed}
              handleView={viewItem}
              action={actions}
              borderBottomColor={'#60d69f'}
              borderBottomWidth={20}
            />
          ) : (
            undefined
          )}
        </div>

        <Notification msg={errorMsg} open={openNotification} />
      </div>
    </div>
  )
}
export default DischargeRequest
