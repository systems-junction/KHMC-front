import React, { useState, useEffect } from 'react'
import { getPatientUrl } from '../../public/endpoins'
import Notification from '../../components/Snackbar/Notification.js'
import CustomTable from '../../components/Table/Table'
import ButtonField from '../../components/common/Button'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Header from '../../components/Header/Header'
import patientRegister from '../../assets/img/PatientRegistration.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import '../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import ViewPatient from './viewPatient'

const tableHeading = [
  'MRN',
  'Patient Name',
  'Gender',
  'Age',
  'Phone',
  'Email',
  'Actions',
]
const tableDataKeys = [
  'profileNo',
  'patientName',
  'gender',
  'age',
  'phoneNumber',
  'email',
]

const actions = { view: true }

export default function PatientListing(props) {
  const [patient, setPatient] = useState('')
  const [itemModalVisible, setitemModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [item, setItem] = useState('')

  useEffect(() => {
    getPatientData()
  }, [])

  function getPatientData() {
    axios
      .get(getPatientUrl)
      .then((res) => {
        if (res.data.success) {
          res.data.data.map(
            (d) => (d.patientName = d.firstName + ' ' + d.lastName)
          )
          setPatient(res.data.data)
          console.log(res.data.data, 'get patient')
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

  const addNewItem = () => {
    let path = `patientListing/add`
    props.history.push({
      pathname: path,
      state: { comingFor: 'add' },
    })
  }

  function handleEdit(rec) {
    let path = `patientListing/edit`
    props.history.push({
      pathname: path,
      state: {
        comingFor: 'edit',
        selectedItem: rec,
      },
    })
  }

  const viewItem = (obj) => {
    if (obj !== '') {
      setitemModalVisible(true)
      setItem(obj)
      console.log(obj, 'obj')
    } else {
      setitemModalVisible(false)
      setItem('')
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
        backgroundColor: '#60d69f',
        overflowY: 'scroll',
      }}
    >
      <Header />
      <div className='cPadding'>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={patientRegister} />
            <h4>Patient Registration</h4>
          </div>

          <div style={{ marginRight: '-10px' }}>
            <ButtonField onClick={addNewItem} name='add' />
            {/* <SearchField /> */}
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {patient !== ' ' ? (
            <div>
              <div>
                <CustomTable
                  tableData={patient}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  borderBottomColor={'#60d69f'}
                  handleView={viewItem}
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
                  src={Back_Arrow}
                  style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {itemModalVisible ? (
        <ViewPatient
          handleEdit={handleEdit}
          item={item}
          open={itemModalVisible}
          viewItem={viewItem}
        />
      ) : null}
    </div>
  )
}
