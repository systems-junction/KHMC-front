/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import Notification from '../../components/Snackbar/Notification.js'
import CustomTable from '../../components/Table/Table'
import axios from 'axios'
import {
  getPHRPatient,
  getallconsultations,
  // getMaterialReceivingUrl
} from '../../public/endpoins'
import Loader from 'react-loader-spinner'
import Back from '../../assets/img/Back_Arrow.png'
import Header from '../../components/Header/Header'
import business_Unit from '../../assets/img/PHR.png'
import ConsultationIcon from '../../assets/img/Consultation_Notes.png'
import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import socketIOClient from 'socket.io-client'

const tableHeading = ['MRN', 'Request Number', 'Date', 'Status', 'Action']
const tableDataKeys = ['profileNo', , 'requestNo', 'date', 'status']

const tableHeadingForConsultation = [
  'Date/Time',
  'Description/Condition',
  'Doctor Ref',
  'Specialist',
  'Status',
  '',
  // "Action",
]
const tableDataKeysForConsultation = [
  'date',
  'description',
  ['requester', 'firstName'],
  'specialist',
  'status',
]

// const actions = { view: true };

export default function EDR(props) {
  const [consultationNoteArray, setConsultationNoteArray] = useState([])
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
      .get(getallconsultations)
      .then((res) => {
        if (res.data.success) {
          //   console.log(res.data, "consultation request");
          console.log(res.data.data, 'consultation')
          //   res.data.data[0].map((d) => (d.profileNo = d.patientData.profileNo));
          setConsultationNoteArray(res.data.data.reverse())
          console.log(consultationNoteArray, 'consultation')
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
        comingFor: 'consultationNoteArray',
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
        backgroundColor: 'rgb(19 213 159)',
        overflowY: 'scroll',
      }}
    >
      <Header history={props.history}/>

      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={ConsultationIcon} />
            <h4>Consultation Requests</h4>
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
          {consultationNoteArray && consultationNoteArray.length !== ' ' ? (
            <div>
              <div>
                <CustomTable
                  tableData={consultationNoteArray}
                  tableDataKeys={tableDataKeysForConsultation}
                  tableHeading={tableHeadingForConsultation}
                  //   action={actions}
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
            // <h3
            //   style={{
            //     color: "white",
            //     textAlign: "center",
            //     width: "100%",
            //     position: "absolute",
            //   }}
            // >
            //   Opps...No Data Found
            // </h3>
            // <div className="LoaderStyle">
            //   <Loader type="TailSpin" color="red" height={50} width={50} />
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
