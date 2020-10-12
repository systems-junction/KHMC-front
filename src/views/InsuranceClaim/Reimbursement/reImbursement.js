import React, { useState, useEffect } from 'react'
import { getClaim, searchPatientsURL } from '../../../public/endpoins'
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
import Fingerprint from '../../../assets/img/fingerprint.png'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import InputAdornment from '@material-ui/core/InputAdornment'
import BarCode from '../../../assets/img/Bar Code.png'
import TextField from '@material-ui/core/TextField'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'

const tableHeading = [
  'Request No',
  'Insurer',
  'Response Code',
  'Status',
  'Action',
]
const tableDataKeys = ['requestNo', 'insurer', 'responseCode', 'status']

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    background: '#2c6ddd',
    width: '160px',
    height: '50px',
    outline: 'none',
  },
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },

}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  input: {
    backgroundColor: 'white',
    boxShadow: 'none',
    borderRadius: 5,
    '&:after': {
      borderBottomColor: 'black',
      boxShadow: 'none',
    },
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
    '&:focus': {
      backgroundColor: 'white',
      boxShadow: 'none',
      borderRadius: 5,
    },
  },
  multilineColor: {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
    '&:after': {
      borderBottomColor: 'black',
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  root: {
    '& .MuiTextField-root': {
      backgroundColor: 'white',
    },
    '& .Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 'none',
    },
    '& .Mui-disabled': {
      backgroundColor: 'white',
      color: 'gray',
    },
    '&:focus': {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
  },
}))

const actions = { edit: true }

export default function Reimbursement(props) {
  const classes = useStyles()

  const [insurance, setinsurance] = useState('')
  const [itemModalVisible, setitemModalVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const [item, setItem] = useState('')
  const [searchPatientQuery, setSearchPatientQuery] = useState('')


  useEffect(() => {
    getinsuranceData()
  }, [])

  function getinsuranceData() {
    axios
      .get(getClaim)
      .then((res) => {
        if (res.data.success) {
          res.data.data.map((d) => (d.insurer = 'N/A'))
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
        comingFor: 'add',
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

  const handlePatientSearch =  (e) => {
    const a = e.target.value.replace(/[^\w\s]/gi, '')
    setSearchPatientQuery(a)
    if (a.length >= 3) {
       axios
        .get(
          getClaim + '/' + a
        )
        .then((res) => {
          if (res.data.success) {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              res.data.data.map((d) => (d.insurer = 'N/A'))
              setinsurance(res.data.data.reverse());
            } else {
              setinsurance([]);
            }
          }
        })
        .catch((e) => {
          console.log('error after searching patient request', e)
        })
    }

    else if(a.length == 0){
      console.log("less"); 
      getinsuranceData();
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
            <img src={claimsReview} />
            <h4>Claims Review</h4>
          </div>

          <div style={{ marginRight: '-10px' }}>
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
          className={`${classes.root}`}
          style={{
            marginTop: '25px',
          }}
        >
        <div className='row' style={{ marginRight: '-5px', marginLeft: '-5px', marginTop: '20px'}}>
            <div
              className='col-md-10 col-sm-9 col-8'
              style={styles.textFieldPadding}
            >
              <TextField
                className='textInputStyle'
                id='searchPatientQuery'
                type='text'
                variant='filled'
                label='Search By Request No'
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

</div>
        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {insurance  &&  insurance.length > 0 ? (
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
          ) : insurance && insurance.length == 0 ? (
            <>
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
              
            </div>
            <div className='col-1' style={{ marginTop: 45 }}>
            <img
              onClick={() => props.history.goBack()}
              src={Back_Arrow}
              style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer', marginLeft: '-10px' }}
            />
          </div>
          </>
          ) : 
          ( <div className="LoaderStyle">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
