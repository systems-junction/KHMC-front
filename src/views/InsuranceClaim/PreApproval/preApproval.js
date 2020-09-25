/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import Notification from '../../../components/Snackbar/Notification.js'
import CustomTable from '../../../components/Table/Table'
import axios from 'axios'
import _ from 'lodash'
import { getPreApproval } from '../../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../../assets/img/Back_Arrow.png'
import Header from '../../../components/Header/Header'
import PreApproval from '../../../assets/img/Pre-Approval.png'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import socketIOClient from 'socket.io-client'

const tableHeading = [
  'MRN',
  'Request Number',
  'Patient Name',
  'Date',
  'Status',
  'Action',
]
const tableDataKeys = [
  ['patientId', 'profileNo'],
  'requestNo',
  'Name',
  'updatedAt',
  'status',
]

const actions = { view: true }

export default function preApproval(props) {
  const [preApproval, setpreApproval] = useState('')
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
    getPreApprovalData()
    // return () => socket.disconnect();
  }, [])

  function getPreApprovalData() {
    axios
      .get(getPreApproval)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, 'data')
          if (res.data.data.edr) {
            res.data.data.edr.map(
              (d) =>
                (d.Name = d.patientId
                  ? d.patientId.firstName + ' ' + d.patientId.lastName
                  : '')
            )
          }
          if (res.data.data.ipr) {
            res.data.data.ipr.map(
              (d) =>
                (d.Name = d.patientId
                  ? d.patientId.firstName + ' ' + d.patientId.lastName
                  : '')
            )
          }
          if (res.data.data.opr) {
            res.data.data.opr.map(
              (d) =>
                (d.Name = d.patientId
                  ? d.patientId.firstName + ' ' + d.patientId.lastName
                  : '')
            )
          }
          setpreApproval(
            [].concat(
              res.data.data.edr.reverse(),
              res.data.data.ipr.reverse(),
              res.data.data.opr.reverse()
            )
          )
          var sortedObjs = _.sortBy(
            [].concat(
              res.data.data.edr.reverse(),
              res.data.data.ipr.reverse(),
              res.data.data.opr.reverse()
            ),
            'updatedAt'
          ).reverse()
          setpreApproval(sortedObjs)
          console.log(
            [].concat(res.data.data.edr, res.data.data.ipr, res.data.data.opr),
            'CONCATENATE'
          )
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
    let path = `pa/viewPreApproval`
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
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={PreApproval} />
            <h4>Pre-Approval</h4>
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {preApproval ? (
            <div>
              <div>
                <CustomTable
                  tableData={preApproval}
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
