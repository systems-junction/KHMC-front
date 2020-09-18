/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import {
  getSingleEDRPatient,
  getSingleIPRPatient,
} from '../../../public/endpoins'
import cookie from 'react-cookies'
import Header from '../../../components/Header/Header'
import PreApproval from '../../../assets/img/Pre-Approval.png'
import Back from '../../../assets/img/Back_Arrow.png'
import '../../../assets/jss/material-dashboard-react/components/TextInputStyle.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CustomTable from '../../../components/Table/Table'
import Notification from '../../../components/Snackbar/Notification.js'
import Loader from 'react-loader-spinner'
import InputLabel from '@material-ui/core/InputLabel'

const tableHeadingForNeedApproval = [
  'Request No',
  'Request Type',
  'Item',
  'Total Cost',
  'Status',
  'Insurance',
  'Action',
]
const tableDataKeysForNeedApproval = [
  '_id',
  'RequestType',
  'item',
  'totalCost',
  'status',
  'insurance',
]
const tableHeadingForCovered = [
  'ICD Code',
  'Date/Time',
  'Item',
  'Qty',
  'Covered Amount',
  'Status',
]
const tableDataKeysForCovered = [
  'consultationNo',
  'date',
  'description',
  ['requester', 'firstName'],
]
const tableHeadingForNotCovered = [
  'ICD Code',
  'Date/Time',
  'Item',
  'Qty',
  'Covered Amount',
  'Status',
]
const tableDataKeysForNotCovered = [
  'requestNo',
  'date',
  ['requester', 'firstName'],
  'status',
]
const tableHeadingForFollowUp = [
  'Date/Time',
  'MRN No',
  'Description',
  'Doctor',
  'Status',
  'Action',
]
const tableDataKeysForFollowUp = [
  'date',
  ['mrn', 'profileNo'],
  'description',
  'doctorName',
  'status',
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

function AddEditPurchaseRequest(props) {
  const classesForTabs = useStylesForTabs()

  const initialState = {
    labServiceId: '',
    labServiceCode: '',
    followUpArray: '',
    labServiceName: '',
    labServiceStatus: '',

    radioServiceId: '',
    radioServiceCode: '',
    radioServiceName: '',
    radiologyRequestArray: '',
    radioServiceStatus: '',

    coveredArray: '',
    consultationNo: '',
    date: new Date(),
    description: '',
    consultationNotes: '',
    requester: cookie.load('current_user').name,

    // needApprovalArray: '',
    rdescription: '',
    note: '',
    doctor: cookie.load('current_user').name,

    notCoveredArray: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { followUpArray, coveredArray, notCoveredArray } = state

  const [, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [requestNo, setrequestNo] = useState('')
  const [, setId] = useState('')
  const [needApprovalArray, setneedApprovalArray] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    setId(props.history.location.state.selectedItem._id)
    setrequestNo(props.history.location.state.selectedItem.requestNo)
    setSelectedPatient(props.history.location.state.selectedItem.patientId)
    setSelectedItem(props.history.location.state.selectedItem)
    getIPRById(props.history.location.state.selectedItem._id)

    const selectedRec = props.history.location.state.selectedItem
    console.log('Record', selectedRec)

    if (selectedRec) {
      if (selectedRec.pharmacyRequest) {
        for (let i = 0; i < selectedRec.pharmacyRequest.length; i++) {
          let amount = 0
          let singlePR = selectedRec.pharmacyRequest[i]

          for (let j = 0; j < singlePR.medicine.length; j++) {
            amount = amount + singlePR.medicine[j].itemId.purchasePrice
            // amount = amount + (singlePR.medicine[j].itemId.issueUnitCost * singlePR.medicine[j].requestedQty)
          }

          selectedRec.pharmacyRequest[i] = {
            ...selectedRec.pharmacyRequest[i],
            totalCost: amount,
            RequestType: 'PHR',
            item: 'Medicine',
            insurance: 'Uncovered',
          }
        }
        // selectedRec.pharmacyRequest.map(
        //   (d) => (
        //     (d.totalCost = d.medicine.map(
        //       (a) => a.requestedQty * a.itemId.issueUnitCost
        //     )),
        //     (d.RequestType = 'PHR'),
        //     (d.insurance = 'Uncovered'),
        //     (d.item = 'Medicine')
        //   )
        // )
      }
      if (selectedRec.labRequest) {
        selectedRec.labRequest.map(
          (d) => (
            (d.RequestType = 'LR'),
            (d.item = d.serviceName),
            (d.totalCost = d.serviceId.price),
            (d.insurance = 'Uncovered')
          )
        )
      }
      if (selectedRec.radiologyRequest) {
        selectedRec.radiologyRequest.map(
          (d) => (
            (d.RequestType = 'RR'),
            (d.item = d.serviceName),
            (d.totalCost = d.serviceId.price),
            (d.insurance = 'Uncovered')
          )
        )
      }
    }
    setneedApprovalArray(
      [].concat(
        selectedRec.labRequest,
        selectedRec.radiologyRequest,
        selectedRec.pharmacyRequest
      )
    )
  }, [])

  const getIPRById = (id) => {
    axios
      .get(getSingleIPRPatient + '/' + id)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data) {
            const selectedfollowUp = res.data.data[0]
            console.log('follow Up: ', selectedfollowUp)

            setIsLoading(false)

            if (selectedfollowUp.followUp) {
              selectedfollowUp.followUp.map(
                (d) => (
                  (d.mrn = selectedfollowUp.patientId),
                  (d.requestNo = selectedfollowUp.requestNo)
                )
              )
              dispatch({
                field: 'followUpArray',
                value: selectedfollowUp.followUp,
              })
            }
          }
        }
      })
      .catch((e) => {
        console.log('error while searching req', e)
      })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function viewNeedApproval(rec) {
    let path = `viewPreApproval/needApproval`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: rec,
      },
    })
  }

  function viewFollowUp(rec) {
    let path = `viewPreApproval/followUp`
    props.history.push({
      pathname: path,
      state: {
        selectedItem: rec,
        followUp: selectedItem,
      },
    })
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
      <Header />

      <div className='cPadding'>
        <div className='subheader'>
          <div>
            <img src={PreApproval} />
            <h4>Pre-Approval</h4>
          </div>
        </div>

        <div
          style={{
            height: '20px',
          }}
        />

        <div className='container-fluid' style={styles.patientDetails}>
          <div className='row'>
            <div className='col-md-12'>
              <h4 style={{ color: 'blue', fontWeight: '600' }}>
                Patient Details
              </h4>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Patient Name
                </InputLabel>
                <span style={styles.styleForPatientDetails}>
                  {selectedPatient.firstName + ` ` + selectedPatient.lastName}{' '}
                </span>
              </div>
            </div>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Gender
                </InputLabel>
                <span style={styles.styleForPatientDetails}>
                  {selectedPatient.gender}
                </span>
              </div>
            </div>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Age
                </InputLabel>
                <span style={styles.styleForPatientDetails}>
                  {selectedPatient.age ? selectedPatient.age : 30}
                </span>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Patient MRN
                </InputLabel>

                <span style={styles.styleForPatientDetails}>
                  {selectedPatient.profileNo}
                </span>
              </div>
            </div>

            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Insurance No
                </InputLabel>
                <span style={styles.styleForPatientDetails}>
                  {selectedPatient.insuranceId
                    ? selectedPatient.insuranceId
                    : '--'}
                </span>
              </div>
            </div>
            <div className='col-md-4 col-sm-4'>
              <div style={styles.inputContainerForTextField}>
                <InputLabel style={styles.stylesForLabel} id='status-label'>
                  Request No
                </InputLabel>
                <span style={styles.styleForPatientDetails}>{requestNo}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            height: '20px',
          }}
        />

        {needApprovalArray !== 0 &&
        coveredArray !== 0 &&
        notCoveredArray !== 0 &&
        followUpArray !== 0 ? (
          <div>
            <div className={classesForTabs.root}>
              <Tabs
                classes={{
                  root: classesForTabs.root,
                  scroller: classesForTabs.scroller,
                }}
                value={value}
                onChange={handleChange}
                textColor='primary'
                TabIndicatorProps={{ style: { background: '#12387a' } }}
                centered={false}
                variant='scrollable'
                fullWidth={true}
              >
                <Tab
                  style={{
                    color: 'white',
                    borderRadius: 15,
                    outline: 'none',
                    color: value === 0 ? '#12387a' : '#3B988C',
                  }}
                  label='Need Approval'
                />
                {/* <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 1 ? '#2c6ddd' : undefined,
                    }}
                    label='Covered'
                  />
                  <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      backgroundColor: value === 2 ? '#2c6ddd' : undefined,
                    }}
                    label='Not Covered'
                  /> */}
                {/* <Tab
                    style={{
                      color: 'white',
                      borderRadius: 15,
                      outline: 'none',
                      color: value === 1 ? "#12387a" : '#3B988C',
                    }}
                    label='Follow Up'
                  /> */}
              </Tabs>
            </div>

            {value === 0 ? (
              <div
                style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                className='container-fluid'
              >
                <div className='row' style={{ marginTop: '20px' }}>
                  {needApprovalArray !== 0 ? (
                    <CustomTable
                      tableData={needApprovalArray}
                      tableDataKeys={tableDataKeysForNeedApproval}
                      tableHeading={tableHeadingForNeedApproval}
                      handleView={viewNeedApproval}
                      action={actions}
                      borderBottomColor={'#60d69f'}
                      borderBottomWidth={20}
                    />
                  ) : (
                    <div className='LoaderStyle'>
                      <Loader
                        type='TailSpin'
                        color='red'
                        height={50}
                        width={50}
                      />
                    </div>
                  )}
                </div>

                <div
                  className='row'
                  style={{ marginTop: '20px', marginBottom: '25px' }}
                >
                  <div className='col-md-6 col-sm-6 col-6'>
                    <img
                      onClick={() => props.history.goBack()}
                      src={Back}
                      style={{ width: 45, height: 35, cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            ) : // : value === 1 ?
            // (
            //   <div
            //     style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            //     className='container-fluid'
            //   >
            //     <div className='row' style={{ marginTop: '20px' }}>
            //       {coveredArray !== 0 ? (
            //         <CustomTable
            //           tableData={coveredArray}
            //           tableDataKeys={tableDataKeysForCovered}
            //           tableHeading={tableHeadingForCovered}
            //           borderBottomColor={'#60d69f'}
            //           borderBottomWidth={20}
            //         />
            //       ) : (
            //           <div className='LoaderStyle'>
            //             <Loader type='TailSpin' color='red' height={50} width={50} />
            //           </div>
            //         )}
            //     </div>

            //     <div className='row' style={{ marginTop: '20px', marginBottom: '25px' }}>
            //       <div className='col-md-6 col-sm-6 col-6'>
            //         <img
            //           onClick={() => props.history.goBack()}
            //           src={Back}
            //           style={{ width: 45, height: 35, cursor: 'pointer' }}
            //         />
            //       </div>
            //     </div>
            //   </div>
            // ) : value === 2 ?
            //   (
            //     <div
            //       style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
            //       className='container-fluid'
            //     >
            //       <div className='row' style={{ marginTop: '20px' }}>
            //         {notCoveredArray !== 0 ? (
            //           <CustomTable
            //             tableData={notCoveredArray}
            //             tableDataKeys={tableDataKeysForNotCovered}
            //             tableHeading={tableHeadingForNotCovered}
            //             borderBottomColor={'#60d69f'}
            //             borderBottomWidth={20}
            //           />
            //         ) : (
            //             <div className='LoaderStyle'>
            //               <Loader type='TailSpin' color='red' height={50} width={50} />
            //             </div>
            //           )}
            //       </div>

            //       <div className='row' style={{ marginTop: '20px', marginBottom: '25px' }}>
            //         <div className='col-md-6 col-sm-6 col-6'>
            //           <img
            //             onClick={() => props.history.goBack()}
            //             src={Back}
            //             style={{ width: 45, height: 35, cursor: 'pointer' }}
            //           />
            //         </div>
            //       </div>

            //     </div>
            // )
            value === 1 ? (
              <div
                style={{ flex: 4, display: 'flex', flexDirection: 'column' }}
                className='container-fluid'
              >
                {!isLoading ? (
                  <div className='row' style={{ marginTop: '20px' }}>
                    {followUpArray !== 0 ? (
                      <CustomTable
                        tableData={followUpArray}
                        tableDataKeys={tableDataKeysForFollowUp}
                        tableHeading={tableHeadingForFollowUp}
                        handleView={viewFollowUp}
                        action={actions}
                        borderBottomColor={'#60d69f'}
                        borderBottomWidth={20}
                      />
                    ) : (
                      <div className='LoaderStyle'>
                        <Loader
                          type='TailSpin'
                          color='red'
                          height={50}
                          width={50}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='LoaderStyle'>
                    <Loader
                      type='TailSpin'
                      color='red'
                      height={50}
                      width={50}
                    />
                  </div>
                )}

                <div
                  className='row'
                  style={{ marginTop: '20px', marginBottom: '25px' }}
                >
                  <div className='col-md-6 col-sm-6 col-6'>
                    <img
                      onClick={() => props.history.goBack()}
                      src={Back}
                      style={{ width: 45, height: 35, cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              undefined
            )}
          </div>
        ) : (
          <div className='LoaderStyle'>
            <Loader type='TailSpin' color='red' height={50} width={50} />
          </div>
        )}

        <Notification msg={errorMsg} open={openNotification} />
      </div>
    </div>
  )
}
export default AddEditPurchaseRequest
