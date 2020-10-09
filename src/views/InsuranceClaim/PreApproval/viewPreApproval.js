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
  'Total Cost (JD)',
  'Status',
  'Insurance',
  'Action',
]
const tableDataKeysForNeedApproval = [
  '_id',
  'RequestType',
  'serviceName',
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
    borderRadius: 5,
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
  headingStyles: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 12,
  },
  textStyles: {
    fontWeight: '700',
    color: 'black',
    fontSize: 14,
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
    coveredArray: '',
    requester: cookie.load('current_user').name,

    // needApprovalArray: '',
    rdescription: '',
    note: '',
    doctor: cookie.load('current_user').name,

    notCoveredArray: '',
    diagnosisArray: '',
    medicationArray: '',
  }

  function reducer(state, { field, value }) {
    return {
      ...state,
      [field]: value,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    followUpArray,
    coveredArray,
    notCoveredArray,
    diagnosisArray,
    medicationArray,
  } = state

  const [, setCurrentUser] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [value, setValue] = React.useState(0)
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [, setId] = useState('')
  const [needApprovalArray, setneedApprovalArray] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentUser(cookie.load('current_user'))

    const selectedRec = props.history.location.state.selectedItem
    console.log('Record', selectedRec)

    setId(selectedRec._id)
    setSelectedPatient(selectedRec.patientId)
    setSelectedItem(selectedRec)
    getIPRById(selectedRec._id)

    if (selectedRec) {
      if (selectedRec.residentNotes) {
        let val = selectedRec.residentNotes
        if (val && val.length > 0) {
          dispatch({
            field: 'diagnosisArray',
            value: val.reverse()[0].code,
          })
        }
      }
      if (selectedRec.pharmacyRequest) {
        let data = []
        let val = selectedRec.pharmacyRequest
        val.map((d) => {
          d.item.map((item) => {
            let found = data.find((i) => i === item.itemId.name)
            if (!found) {
              data.push(item.itemId.name)
            }
          })
        })
        dispatch({ field: 'medicationArray', value: data })

        for (let i = 0; i < selectedRec.pharmacyRequest.length; i++) {
          let amount = 0
          let singlePR = selectedRec.pharmacyRequest[i]

          for (let j = 0; j < singlePR.item.length; j++) {
            // amount = amount + singlePR.item[j].itemId.issueUnitCost
            amount =
              amount +
              singlePR.item[j].itemId.issueUnitCost *
                singlePR.item[j].requestedQty
          }

          selectedRec.pharmacyRequest[i] = {
            ...selectedRec.pharmacyRequest[i],
            totalCost: amount.toFixed(4) + ' JD',
            RequestType: 'PHR',
            serviceName: 'Medical',
            insurance: 'Uncovered',
          }
        }
      }
      if (selectedRec.labRequest) {
        selectedRec.labRequest.map(
          (d) => (
            (d.RequestType = 'LR'),
            (d.totalCost = d.serviceId.price.toFixed(4) + ' JD'),
            (d.insurance = 'Uncovered')
          )
        )
      }
      if (selectedRec.radiologyRequest) {
        selectedRec.radiologyRequest.map(
          (d) => (
            (d.RequestType = 'RR'),
            (d.totalCost = d.serviceId.price.toFixed(4) + ' JD'),
            (d.insurance = 'Uncovered')
          )
        )
      }
    }
    setneedApprovalArray(
      [].concat(
        selectedRec.labRequest.reverse(),
        selectedRec.radiologyRequest.reverse(),
        selectedRec.pharmacyRequest.reverse()
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
        backgroundColor: 'rgb(19 213 159)',
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
        <div className='subheader' style={{ marginLeft: '-14px' }}>
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

        <div>
          <h5 style={{ fontWeight: 'bold', color: 'white', marginTop: 25 }}>
            Patient Details
          </h5>
          <div
            // className="row"
            style={{
              marginTop: 25,
              backgroundColor: 'white',
              borderRadius: 5,
              width: '100%',
              maxHeight: '300px',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            <div
              className='row'
              style={{
                backgroundColor: '#2C6DDD',
                paddingLeft: 10,
                height: '30%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                paddingBottom: 10,
                paddingTop: 10,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>
                  Patient Info
                </h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>Allergy</h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>
                  Medication
                </h6>
              </div>
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.headerHeading}
              >
                <h6 style={{ color: 'white', fontWeight: '700' }}>Diagnosis</h6>
              </div>
            </div>

            <div
              className='row'
              style={{
                marginTop: 10,
                paddingLeft: 10,
                height: '80%',
                paddingBottom: 10,
              }}
            >
              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <span style={styles.headingStyles}>MRN</span>
                <span style={styles.textStyles}>
                  {selectedPatient.profileNo
                    ? selectedPatient.profileNo
                    : '-----'}
                  {/* {patientDetails && patientDetails.profileNo} */}
                </span>

                <span style={styles.headingStyles}>Patient</span>
                <span style={styles.textStyles}>
                  {selectedPatient.firstName && selectedPatient.lastName
                    ? selectedPatient.firstName + ' ' + selectedPatient.lastName
                    : '---- ----'}
                </span>

                <span style={styles.headingStyles}>Gender</span>
                <span style={styles.textStyles}>
                  {selectedPatient.gender ? selectedPatient.gender : '----'}
                </span>

                <span style={styles.headingStyles}>Age</span>
                <span style={styles.textStyles}>
                  {selectedPatient.age ? selectedPatient.age : '--'}
                </span>

                <span style={styles.headingStyles}>Weight</span>
                <span style={styles.textStyles}>
                  {selectedPatient.weight ? selectedPatient.weight : '--'} kg
                </span>
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {''}
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {medicationArray
                  ? medicationArray.map((d, index) => {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <h6
                            style={{
                              ...styles.textStyles,
                            }}
                          >
                            {index + 1}
                            {'.'} &nbsp;
                          </h6>
                          <h6
                            style={{
                              ...styles.textStyles,
                            }}
                          >
                            {d}
                          </h6>
                        </div>
                      )
                    })
                  : ''}
              </div>

              <div
                className={'col-md-3 col-sm-3 col-3'}
                style={styles.textStyles}
              >
                {diagnosisArray
                  ? diagnosisArray.map((drug, index) => {
                      return (
                        <h6 style={styles.textStyles}>
                          {index + 1}. {drug}
                        </h6>
                      )
                    })
                  : ''}
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
                <div className='row'>
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
