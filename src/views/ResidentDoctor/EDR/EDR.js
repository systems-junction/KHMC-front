/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import Notification from '../../../components/Snackbar/Notification.js'
import CustomTable from '../../../components/Table/Table'
import axios from 'axios'
import {
  getEDRUrl,
  // getMaterialReceivingUrl
} from '../../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../../assets/img/Back_Arrow.png'
import Header from '../../../components/Header/Header'
import business_Unit from '../../../assets/img/EDR.png'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import socketIOClient from 'socket.io-client'

const tableHeading = [
  'MRN',
  'Request Number',
  // 'Patient First Name',
  // 'Patient Last Name',
  'Patient Name',
  'Date',
  'Status',
  'Action',
]
const tableDataKeys = [
  ['patientId', 'profileNo'],
  'requestNo',
  // ['patientId', 'firstName'],
  // ['patientId', 'lastName'],,
  'Name',
  'updatedAt',
  'status',
]

const actions = { view: true }

export default function EDR(props) {
  const [Edr, setEdr] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

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
    getEDRsData()
    // return () => socket.disconnect();
  }, [])

  function getEDRsData() {
    axios
      .get(getEDRUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'data')
          res.data.data.map(
            (d) => (d.Name = d.patientId.firstName + ' ' + d.patientId.lastName)
          )
          setEdr(res.data.data.reverse())
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
    let path = `edr/viewEDR`
    props.history.push({
      pathname: path,
      state: {
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
            <img src={business_Unit} />
            <h4>Emergency Department Requests</h4>
          </div>
          {/* <div>
            <img onClick={addNewItem} src={Add_New} />
            <img src={Search} />
          </div> */}
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {Edr ? (
            <div>
              <div>
                <CustomTable
                  tableData={Edr}
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
            <div className='LoaderStyle'>
              <Loader type='TailSpin' color='red' height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
