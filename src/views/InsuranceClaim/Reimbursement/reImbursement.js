import React, { useState, useEffect } from 'react'
import { getClaim } from '../../../public/endpoins'
import Notification from '../../../components/Snackbar/Notification.js'
import CustomTable from '../../../components/Table/Table'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Header from '../../../components/Header/Header'
import claimsReview from '../../../assets/img/ClaimsReview.png'
import Back_Arrow from '../../../assets/img/Back_Arrow.png'
import plus_icon from '../../../assets/img/Plus.png'
import Button from '@material-ui/core/Button'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

const tableHeading = [
  'Request No',
  'Insurer',
  'Response Code',
  'Status',
  'Action'
]
const tableDataKeys = [
  'requestNo',
  'insurer',
  'responseCode',
  'status',
]

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    background: '#2c6ddd',
    width: '160px',
    height: '50px',
    outline: 'none',
  },
}

const actions = { edit: true}

export default function Reimbursement(props) 
{
  const [insurance, setinsurance] = useState('')
  const [itemModalVisible, setitemModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [item, setItem] = useState('')

  useEffect(() => {
    getinsuranceData()
  }, [])
  
  function getinsuranceData() {
    axios
      .get(getClaim)
      .then((res) => {
        if (res.data.success) {
          res.data.data.map((d)=>d.insurer = "N/A")
          setinsurance(res.data.data.reverse())
          console.log(res.data.data, 'get insurance')
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

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  const submitClaim = () => {
    let path = `ri/submitClaim`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'add' 
      },
    })
  }

  function handleEdit(rec) {
    let path = `ri/submitClaim`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
      },
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: '#60d69f',
        overflowY: 'scroll',
      }}
    >
      <Header />
      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={claimsReview} />
            <h4>Claims Review</h4>
          </div>

          <div>
          <Button
            onClick={submitClaim}
            style={styles.stylesForButton}
            variant='contained'
            color='primary'
          >
            <img src={plus_icon} />
            &nbsp;&nbsp;
            <strong>Submit Claim</strong>
          </Button>
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {insurance ? (
            <div>
              <div>
                <CustomTable
                  tableData={insurance}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  borderBottomColor={'#60d69f'}
                  handleEdit={handleEdit}
                  borderBottomWidth={20}
                />
              </div>

              <Notification msg={errorMsg} open={openNotification} />
              
              <div style={{ marginBottom: 20, marginTop: 50 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ width: 45, height: 35, cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : (
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
