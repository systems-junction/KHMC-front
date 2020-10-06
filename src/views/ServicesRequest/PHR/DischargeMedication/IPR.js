/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import Notification from '../../../../components/Snackbar/Notification.js'
import CustomTable from '../../../../components/Table/Table'
import axios from 'axios'
import _ from 'lodash'
import {
  getDischargeIPRUrl,
  getDischarge,
  // getMaterialReceivingUrl,
} from '../../../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../../../assets/img/Back_Arrow.png'
import Header from '../../../../components/Header/Header'
import dischargeIcon from '../../../../assets/img/Discharge Medication.png'
import '../../../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import Fingerprint from '../../../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../../../assets/img/Bar Code.png'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import socketIOClient from 'socket.io-client'

const tableHeading = ['MRN', 'Request Number', 'Date', 'Status', 'Action']
const tableDataKeys = [
  ['patientId', 'profileNo'],
  'requestNo',
  'date',
  'status',
]


const styles = {
  textFieldPadding: {
    paddingLeft: 0,
    paddingRight: 5,
  },


}

const useStylesForInput = makeStyles((theme) => ({
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
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


}))

const actions = { view: true }

export default function Ipr(props) {
  const classes = useStylesForInput()

  const [Ipr, setIpr] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [searchPatientQuery, setSearchPatientQuery] = useState('')

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false)
      setErrorMsg('')
    }, 2000)
  }

  useEffect(() => {
    // const socket = socketIOClient(socketUrl);
    // socket.emit("connection");
    // socket.on("get_data", (data) => {
    //   setMaterialReceivings(data.reverse());
    //   console.log("res after adding through socket", data);
    // });
    getIprsData()
    // return () => socket.disconnect();
  }, [])

  function getIprsData() {
    axios
      .get(getDischarge)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'ecr1')
          res.data.data.map(
            (d) => (d.date = d.dischargeRequest.dischargeMedication.date)
          )
          res.data.data.map((d) => (d.status = d.dischargeRequest.status))
          setIpr(res.data.data.reverse())
          var sortedObjs = _.sortBy(res.data.data, 'date').reverse()
          setIpr(sortedObjs)
          // setIpr(res.data.data.reverse())
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

  function handleView(rec) {
    let path = `ipr/viewIPR`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: rec,
        comingFor: 'Ipr',
      },
    })
  }


  const handlePatientSearch =  (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)
    if (a.length >= 3) {
       axios
        .get(
          getDischarge + '/' + a
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              res.data.data.map(
                (d) => (d.date = d.dischargeRequest.dischargeMedication.date)
              )
              res.data.data.map((d) => (d.status = d.dischargeRequest.status))
              setIpr(res.data.data.reverse())
              var sortedObjs = _.sortBy(res.data.data, 'date').reverse()
              setIpr(sortedObjs)
            } else {
              setIpr(" ")
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    }

    else if(a.length == 0){ 
      getIprsData();
    }
    
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
        backgroundColor: 'rgb(19 213 159)',
        overflowY: 'scroll',
      }}
    >
      <Header />

      <div className='cPadding'>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={dischargeIcon} />
            <h4>Discharge</h4>
          </div>
        </div>

        <div className='row' style={{marginLeft: '0px', marginRight: '0px', marginTop: '20px'}}>
            <div
              className='col-md-10 col-sm-9 col-8'
              style={styles.textFieldPadding}
            >
              <TextField
                className='textInputStyle'
                id='searchPatientQuery'
                type='text'
                variant='filled'
                label='Search Patient by Name / MRN / National ID / Mobile Number'
                name={'searchPatientQuery'}
                value={searchPatientQuery}
                onChange={handlePatientSearch} 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  className: classes.input,
                  classes: { input: classes.input },
                  disableUnderline: true,
                }}
              />
            </div>

            <div
              className='col-md-1 col-sm-2 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  height: 55,
                }}
              >
                <img src={BarCode} style={{ width: 70, height: 60 }} />
              </div>
            </div>

            <div
              className='col-md-1 col-sm-1 col-2'
              style={{
                ...styles.textFieldPadding,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  height: 55,
                }}
              >
                <img src={Fingerprint} style={{ maxWidth: 43, height: 43 }} />
              </div>
            </div>
            </div> 




        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {Ipr !== " " ? (
            <div>
              <div>
                <CustomTable
                  tableData={Ipr}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleView={handleView}
                  borderBottomColor={'#60d69f'}
                  borderBottomWidth={20}
                />
              </div>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: 'pointer',
                  }}
                />
              </div>
              <Notification msg={errorMsg} open={openNotification} />
            </div>
          ) : (
            // <div className='LoaderStyle'>
            //   <Loader type='TailSpin' color='red' height={50} width={50} />
            // </div>
            <div className='row ' style={{ marginTop: '25px' }}>
              <div className='col-11'>
                <h3
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                    position: 'absolute',
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className='col-1' style={{ marginTop: 45 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
