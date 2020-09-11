// import React, { useEffect, useState, useReducer } from "react";
// import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import InputLabel from "@material-ui/core/InputLabel";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import tableStyles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
// import axios from "axios";
// import Notification from "../../components/Snackbar/Notification.js";
// import DateFnsUtils from "@date-io/date-fns";
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import {
//   addReplenishmentRequestUrlBU,
//   updateReplenishmentRequestUrlBU,
//   getSearchedPharmaceuticalItemsUrl,
//   addPurchasingRequestItemUrl,
//   getPurchasingRequestItemUrl,
//   updatePurchasingRequestItemUrl,
//   getPurchaseRequestItemQtyUrl,
//   getCurrentQtyForBUUrl,
//   getFUFromBUUrl,
//   getCurrentQtyForBURepRequestUrl,
//   getCurrentQtyForFURepRequestUrl,
//   getPatientByProfileNo,
// } from "../../public/endpoins";

// import Paper from "@material-ui/core/Paper";

// import cookie from "react-cookies";

// import Chip from "@material-ui/core/Chip";

// import Dialog from "@material-ui/core/Dialog";
// import { tr } from "date-fns/locale";

// import Header from "../../components/Header/Header";
// import view_all from "../../assets/img/Eye.png";
// import purchase_request from "../../assets/img/purchase request.png";
// import Back_Arrow from "../../assets/img/Back_Arrow.png";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";

// import InputLabelComponent from "../../components/InputLabel/inputLabel";
// import BootstrapInput from "../../components/Dropdown/dropDown.js";
// import ErrorMessage from "../../components/ErrorMessage/errorMessage";

// import Add_New from "../../assets/img/Add_New.png";

// import "../../assets/jss/material-dashboard-react/components/TextInputStyle.css";

// import Loader from "react-loader-spinner";

// import add_new from "../../assets/img/Plus.png";

// import TableForAddedItems from "./tableforAddedItems";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// const styles = {
//   inputContainerForTextField: {
//     marginTop: 25,
//   },

//   inputContainerForDropDown: {
//     marginTop: 25,
//   },

//   stylesForLabel: {
//     fontWeight: "700",
//     color: "white",
//   },

//   stylesForButton: {
//     color: "white",
//     cursor: "pointer",
//     borderRadius: 15,
//     backgroundColor: "#2C6DDD",
//     width: "140px",
//     height: "50px",
//     outline: "none",
//   },

//   stylesForPurchaseButton: {
//     color: "white",
//     cursor: "pointer",
//     borderRadius: 15,
//     backgroundColor: "#2C6DDD",
//     width: "60%",
//     height: "50px",
//     outline: "none",
//   },

//   forTableCell: {
//     color: "black",
//     fontSize: 14,
//   },

//   stylesForPatientButton: {
//     color: "white",
//     cursor: "pointer",
//     borderRadius: 10,
//     backgroundColor: "#2C6DDD",
//     width: "140px",
//     height: "45px",
//     // outline: "none",
//     // alignSelf:'center'
//     marginTop: 30,
//   },

//   headingStyles: {
//     // fontWeight: "bold",
//     color: "grey",
//   },

//   root: {
//     flexGrow: 1,
//   },

//   textStyles: {
//     fontWeight: "700",
//     color: "black",
//   },
// };
// const useStyles = makeStyles(tableStyles);

// function AddEditPurchaseRequest(props) {
//   const classes = useStyles();

//   const [patientDetails, setPatientDetails] = useState("");

//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     console.log(newValue);
//     setValue(newValue);
//   };

//   useEffect(() => {
//     setPatientDetails(props.patientDetails);
//   }, []);

//   return (
//     <div>
//       {patientDetails ? (
//         <div style={{ flex: 1,marginTop:15, display: "flex", flexDirection: "column", backgroundColor:"white", height:250,  borderRadius:20 }}>
//           {/* <Dialog
//             aria-labelledby="form-dialog-title"
//             open={true}
//             maxWidth="lg"
//             onBackdropClick={() => props.showPatientDetails()}
//             fullWidth={true}
//             // fullScreen
//           >
//             <DialogTitle id="simple-dialog-title" style={{ color: "blue" }}>
//               Patient Details
//             </DialogTitle>

//             <DialogContent style={{ backgroundColor: "white", height: 300 }}> */}
//               {/* <Paper className={classes.root}> */}

//               <h5 id="simple-dialog-title" style={{ color: "blue", fontWeight:'bold', marginTop:15, marginLeft:10 }}>
//               Patient Details
//             </h5>
//               <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 indicatorColor="none"
//                 centered
//                 style={{ backgroundColor: "#bbbac4", marginTop:10 }}
//               >
//                 <Tab
//                   label="Patient Info"
//                   style={{
//                     backgroundColor: value === 0 ? "#2C6DDD" : "",
//                     color: value === 0 ? "white" : "",
//                     borderRadius: 10,
//                   }}
//                 ></Tab>
//                 <Tab
//                   label="Allergy"
//                   style={{
//                     backgroundColor: value === 1 ? "#2C6DDD" : "",
//                     color: value === 1 ? "white" : "",
//                     borderRadius: 10,
//                   }}
//                 ></Tab>
//                 <Tab
//                   style={{
//                     backgroundColor: value === 2 ? "#2C6DDD" : "",
//                     color: value === 2 ? "white" : "",
//                     borderRadius: 10,
//                   }}
//                   label="List of Medications"
//                 ></Tab>
//                 <Tab
//                   label="Diagnosis"
//                   style={{
//                     backgroundColor: value === 3 ? "#2C6DDD" : "",
//                     color: value === 3 ? "white" : "",
//                     borderRadius: 10,
//                   }}
//                 ></Tab>
//               </Tabs>
//               {/* </Paper> */}

//               {value === 0 ? (
//                 <div
//                   style={{ marginTop: 20, marginLeft:10 }}
//                 >
//                   {/* <div div className="row" style={{ width: "100%" }}> */}
//                     <div className="row" style={{ width: "100%" }}>
//                       <div className="col-sm-5" style={{ display: "flex" }}>
//                         <p style={styles.headingStyles}>Patient Name: </p>
//                         <span>&nbsp;&nbsp;</span>

//                         <span style={styles.textStyles}>
//                           {patientDetails &&
//                             patientDetails.firstName +
//                               " " +
//                               patientDetails.lastName}
//                         </span>
//                       </div>

//                       <div className="col-sm-4" style={{ display: "flex" }}>
//                         <p style={styles.headingStyles}>Gender:</p>
//                         <span>&nbsp;&nbsp;</span>

//                         <span style={styles.textStyles}>
//                           {patientDetails && patientDetails.gender}
//                         </span>
//                       </div>

//                       <div className="col-sm-3" style={{ display: "flex" }}>
//                         <p style={styles.headingStyles}>Age:</p>
//                         <span>&nbsp;&nbsp;</span>
//                         <span style={styles.textStyles}>
//                           {patientDetails && patientDetails.age}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="row" style={{ width: "100%" }}>
//                       <div className="col-sm-5" style={{ display: "flex" }}>
//                         <p style={styles.headingStyles}>Blood Group:</p>
//                         <span>&nbsp;&nbsp;</span>

//                         <span style={styles.textStyles}>
//                           {patientDetails && patientDetails.bloodGroup}
//                         </span>
//                       </div>

//                       <div className="col-sm-4" style={{ display: "flex" }}>
//                         <p style={styles.headingStyles}>Height:</p>
//                         <span>&nbsp;&nbsp;</span>

//                         <span style={styles.textStyles}>
//                           {patientDetails && patientDetails.height}
//                         </span>
//                       </div>

//                       <div className="col-sm-3" style={{ display: "flex" }}>
//                         <p style={styles.headingStyles}>Weight:</p>
//                         <span>&nbsp;&nbsp;</span>

//                         <span style={styles.textStyles}>
//                           {patientDetails && patientDetails.weight}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 // </div>
//               ) : (
//                 undefined
//               )}
//             {/* </DialogContent>
//           </Dialog> */}
//         </div>
//       ) : (
//         <div className="LoaderStyle">
//           <Loader type="TailSpin" color="red" height={50} width={50} />
//         </div>
//       )}
//     </div>
//   );
// }
// export default AddEditPurchaseRequest;

import React, { useEffect, useState, useReducer } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import tableStyles from '../../assets/jss/material-dashboard-react/components/tableStyle.js'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import {
  addReplenishmentRequestUrlBU,
  updateReplenishmentRequestUrlBU,
  getSearchedPharmaceuticalItemsUrl,
  addPurchasingRequestItemUrl,
  getPurchasingRequestItemUrl,
  updatePurchasingRequestItemUrl,
  getPurchaseRequestItemQtyUrl,
  getCurrentQtyForBUUrl,
  getFUFromBUUrl,
  getCurrentQtyForBURepRequestUrl,
  getCurrentQtyForFURepRequestUrl,
  getPatientByProfileNo,
} from '../../public/endpoins'

import Paper from '@material-ui/core/Paper'

import cookie from 'react-cookies'

import Chip from '@material-ui/core/Chip'

import Dialog from '@material-ui/core/Dialog'
import { tr } from 'date-fns/locale'

import Header from '../../components/Header/Header'
import view_all from '../../assets/img/Eye.png'
import purchase_request from '../../assets/img/purchase request.png'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import InputLabelComponent from '../../components/InputLabel/inputLabel'
import BootstrapInput from '../../components/Dropdown/dropDown.js'
import ErrorMessage from '../../components/ErrorMessage/errorMessage'

import Add_New from '../../assets/img/Add_New.png'

import '../../assets/jss/material-dashboard-react/components/TextInputStyle.css'

import Loader from 'react-loader-spinner'

import add_new from '../../assets/img/Plus.png'

import TableForAddedItems from './tableforAddedItems'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = {
  inputContainerForTextField: {
    marginTop: 25,
  },

  inputContainerForDropDown: {
    marginTop: 25,
  },

  stylesForLabel: {
    fontWeight: '700',
    color: 'white',
  },

  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2C6DDD',
    width: '140px',
    height: '50px',
    outline: 'none',
  },

  stylesForPurchaseButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 15,
    backgroundColor: '#2C6DDD',
    width: '60%',
    height: '50px',
    outline: 'none',
  },

  forTableCell: {
    color: 'black',
    fontSize: 14,
  },

  stylesForPatientButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 10,
    backgroundColor: '#2C6DDD',
    width: '140px',
    height: '45px',
    // outline: "none",
    // alignSelf:'center'
    marginTop: 30,
  },

  headingStyles: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 12,
  },

  root: {
    flexGrow: 1,
  },

  textStyles: {
    fontWeight: '700',
    color: 'black',
    fontSize: 14,
  },

  headerHeading: {
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
    verticalAlign: 'center',
    paddingTop: 10,
  },
}
const useStyles = makeStyles(tableStyles)

function AddEditPurchaseRequest(props) {
  const classes = useStyles()

  const [patientDetails, setPatientDetails] = useState('')

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue)
  }

  useEffect(() => {
    setPatientDetails(props.patientDetails)
    console.log('props', props.patientDetails)
  }, [])

  return (
    <div className='row'>
      {patientDetails ? (
        <>
          <h5 style={{ fontWeight: 'bold', color: 'white', marginTop: 25 }}>
            Patient Details
          </h5>

          <div
            // className="container-fluid"
            style={{
              marginTop: 15,
              backgroundColor: 'white',
              // minHeight: 200,
              borderRadius: 5,
              width: '100%',
            }}
          >
            {/* </Paper> */}

            <div className='container-fluid'>
              <div
                className='row'
                style={{
                  backgroundColor: '#2C6DDD',
                  // marginTop: 20,
                  paddingLeft: 10,
                  height: '20%',
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  paddingBottom: 10,
                  paddingTop: 10,
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
                  <h6 style={{ color: 'white', fontWeight: '700' }}>
                    Diagnosis
                  </h6>
                </div>
              </div>
            </div>

            <div
              // className="row"
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
                <span style={styles.headingStyles}>Patient</span>
                <span style={styles.textStyles}>
                  {patientDetails &&
                    patientDetails.firstName + ' ' + patientDetails.lastName}
                </span>

                <span style={styles.headingStyles}>MRN</span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.profileNo}
                </span>

                <span style={styles.headingStyles}>Age</span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.age}
                </span>

                <span style={styles.headingStyles}>Gender</span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.gender}
                </span>

                <span style={styles.headingStyles}>Weight</span>
                <span style={styles.textStyles}>
                  {patientDetails && patientDetails.weight} kg
                </span>
              </div>

              <div className={'col-md-3 col-sm-3 col-3'} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug) => {
                    return <h6 style={styles.textStyles}>{drug}</h6>
                  })}
              </div>

              <div className={'col-md-3 col-sm-3 col-3'} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug, index) => {
                    return (
                      <h6 style={styles.textStyles}>Medication {index + 1}</h6>
                    )
                  })}
              </div>

              <div className={'col-md-3 col-sm-3 col-3'} style={{}}>
                {patientDetails &&
                  patientDetails.drugAllergy.map((drug, index) => {
                    return (
                      <h6 style={styles.textStyles}>Diagnosis {index + 1}</h6>
                    )
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='LoaderStyle'>
          <Loader type='TailSpin' color='red' height={50} width={50} />
        </div>
      )}
    </div>
  )
}
export default AddEditPurchaseRequest