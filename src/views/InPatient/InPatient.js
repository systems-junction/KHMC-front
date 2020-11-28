import React, { useState, useEffect } from "react";
import Notification from "../../components/Snackbar/Notification.js";
import CustomTable from "../../components/Table/Table";
import axios from "axios";
import _ from "lodash";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import
  {
    getLRPatient,
    getRRPatient,
    // getMaterialReceivingUrl
  } from "../../public/endpoins";
import Loader from "react-loader-spinner";
import Back from "../../assets/img/Back_Arrow.png";
import Header from "../../components/Header/Header";
import Lab_OPR from "../../assets/img/Out Patient.png";
import Rad_OPR from "../../assets/img/RR.png";
import Pharmacist_OPR from "../../assets/img/PHR.png";
import Fingerprint from "../../assets/img/fingerprint.png";
import AccountCircle from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import BarCode from "../../assets/img/Bar Code.png";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import socketIOClient from "socket.io-client";
import cookie from "react-cookies";
import { useStyles1 } from "../../components/MuiCss/MuiCss";

import QRCodeScannerComponent from "../../components/QRCodeScanner/QRCodeScanner";

const tableHeading = [ "MRN", "Request Number", "Date", "Status", "Action" ];
const tableDataKeys = [ "profileNo", "requestNo", "date", "status" ];

const tableHeadingForBUMember = [
  "Order Type",
  "Order No",
  "Patient MRN",
  "Date Generated",
  "Status",
  "Actions",
];
const tableDataKeysForBUMember = [
  "orderFor",
  "requestNo",
  "patientReferenceNo",
  "createdAt",
  "status",
];

const styles = {
  textFieldPadding: {
    paddingLeft: 5,
    paddingRight: 5,
  },
};

const useStylesForInput = makeStyles( ( theme ) => ( {
  margin: {
    margin: theme.spacing( 0 ),
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    "&:after": {
      borderBottomColor: "black",
    },
    "&:hover": {
      backgroundColor: "white",
    },
    "&:focus": {
      boxShadow: "none",
      borderRadius: 5,
    },
  },
  multilineColor: {
    backgroundColor: "white",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "white",
    },
    "&:after": {
      borderBottomColor: "black",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
  },
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "white",
    },
    "& .Mui-focused": {
      backgroundColor: "white",
      color: "black",
    },
    "& .Mui-disabled": {
      backgroundColor: "white",
      color: "gray",
    },
    "&:focus": {
      backgroundColor: "white",
      boxShadow: "none",
    },
    "& .MuiFormLabel-root": {
      fontSize: "11px",

      paddingRight: "15px",
    },
  },
  label: {
    "&$focusedLabel": {
      color: "red",
      display: "none",
    },
    // "&$erroredLabel": {
    //   color: "orange"
    // }
  },
  focusedLabel: {},
} ) );

const actions = { view: true };

export default function EDR ( props )
{
  const matches = useMediaQuery( "(min-width:600px)" );
  const classes = useStylesForInput();
  const classes1 = useStyles1();

  const [ labInPatient, setlabInPatient ] = useState( "" );
  const [ radInPatient, setradInPatient ] = useState( "" );
  const [ errorMsg, setErrorMsg ] = useState( "" );
  const [ openNotification, setOpenNotification ] = useState( false );
  const [ searchPatientQuery, setSearchPatientQuery ] = useState( "" );
  const [ staffType, setStaffType ] = useState(
    cookie.load( "current_user" ).staffTypeId.type
  );
  const [ QRCodeScanner, setQRCodeScanner ] = useState( false );

  if ( openNotification )
  {
    setTimeout( () =>
    {
      setOpenNotification( false );
      setErrorMsg( "" );
    }, 2000 );
  }

  useEffect( () =>
  {
    // const socket = socketIOClient(socketUrl);
    // socket.emit("connection");
    // socket.on("get_data", (data) => {
    //   setMaterialReceivings(data.reverse());
    //   console.log("res after adding through socket", data);
    // });

    if ( props.history.location.state && props.history.location.state.comingFrom )
    {
      if ( props.history.location.state.comingFrom === "notifications" && props.history.location.state.SearchId )
      {
        handlePatientSearch( props.history.location.state.SearchId.profileNo )
      }
    }
    else
    {
      if ( staffType === "Lab Technician" )
      {
        getLabInPatientData();
      } else if ( staffType === "Radiology/Imaging" )
      {
        getRadInPatientData();
      }
    }

    // return () => socket.disconnect();
  }, [] );

  function getRadInPatientData ()
  {
    axios
      .get( getRRPatient )
      .then( ( res ) =>
      {
        if ( res.data.success )
        {
          console.log( res.data.data, "data" );
          // res.data.data[0].map((d) => (d.patientId = d.iprId.patientId))
          res.data.data.map( ( d ) => ( d.profileNo = d.patientData.profileNo ) );
          // res.data.data[0].map((d) => (d.requestNo = d.iprId.requestNo))
          // res.data.data[0].map((d) => (d.requestNo = d.edrId.requestNo))
          const sortedObjs = _.sortBy( res.data.data, "date" ).reverse();
          setradInPatient( sortedObjs );
        } else if ( !res.data.success )
        {
          setErrorMsg( res.data.error );
          setOpenNotification( true );
        }
        return res;
      } )
      .catch( ( e ) =>
      {
        console.log( "error: ", e );
      } );
  }

  function getLabInPatientData ()
  {
    axios
      .get( getLRPatient )
      .then( ( res ) =>
      {
        if ( res.data.success )
        {
          console.log( res.data.data, "ecr" );
          res.data.data.map( ( d ) => ( d.profileNo = d.patientData.profileNo ) );
          const sortedObjs = _.sortBy( res.data.data, "date" ).reverse();
          setlabInPatient( sortedObjs );
        } else if ( !res.data.success )
        {
          setErrorMsg( res.data.error );
          setOpenNotification( true );
        }
        return res;
      } )
      .catch( ( e ) =>
      {
        console.log( "error: ", e );
      } );
  }

  function handleView ( rec )
  {
    let path = `ipr/viewIPR`;
    console.log( rec._id, "id" );
    props.history.push( {
      pathname: path,
      state: {
        selectedItem: rec,
        comingFor: "edr",
      },
    } );
  }

  const handlePatientSearch = ( e ) =>
  {
    let a;
    if ( props.history.location.state && props.history.location.state.comingFrom )
    {
      if ( props.history.location.state.comingFrom === "notifications" && props.history.location.state.SearchId )
      {
        a = e
      }
    }
    else
    {
      a = e.target.value.replace( /[^\w\s]/gi, "" );
    }

    setSearchPatientQuery( a );
    if ( staffType === "Lab Technician" )
    {
      if ( a.length >= 3 )
      {
        axios
          .get( getLRPatient + "/" + a )
          .then( ( res ) =>
          {
            if ( res.data.success )
            {
              if ( res.data.data.length > 0 )
              {
                console.log( res.data.data );
                res.data.data.map(
                  ( d ) => ( d.profileNo = d.patientData.profileNo )
                );
                var sortedObjs = _.sortBy( res.data.data, "date" ).reverse();
                setlabInPatient( sortedObjs );
              } else
              {
                setlabInPatient( " " );
              }
            }
          } )
          .catch( ( e ) =>
          {
            console.log( "error after searching patient request", e );
          } );
      } else if ( a.length == 0 )
      {
        getLabInPatientData();
      }
    } else if ( staffType === "Radiology/Imaging" )
    {
      if ( a.length >= 3 )
      {
        axios
          .get( getRRPatient + "/" + a )
          .then( ( res ) =>
          {
            if ( res.data.success )
            {
              if ( res.data.data.length > 0 )
              {
                console.log( "searched data", res.data.data );
                res.data.data.map(
                  ( d ) => ( d.profileNo = d.patientData.profileNo )
                );
                const sortedObjs = _.sortBy( res.data.data, "date" ).reverse();
                setradInPatient( sortedObjs );
              } else
              {
                setradInPatient( " " );
              }
            }
          } )
          .catch( ( e ) =>
          {
            console.log( "error after searching patient request", e );
          } );
      } else if ( a.length == 0 )
      {
        getRadInPatientData();
      }
    }
  };

  function scanQRCode ()
  {
    setQRCodeScanner( true );
  }

  function handleScanQR ( data )
  {
    setQRCodeScanner( false );
    console.log( "data after parsing", JSON.parse( data ).profileNo );

    handlePatientSearch( {
      target: {
        value: JSON.parse( data ).profileNo,
        type: "text",
      },
    } );
  }

  if ( QRCodeScanner )
  {
    return (
      <div>
        {QRCodeScanner ? (
          <QRCodeScannerComponent handleScanQR={ handleScanQR } />
        ) : (
            undefined
          ) }
      </div>
    );
  }

  return (
    <div
      style={ {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(19 213 159)",
        overflowY: "scroll",
      } }
    >
      <Header history={ props.history } />

      <div className="cPadding">
        <div className="subheader" style={ { marginLeft: "-10px" } }>
          <div>
            { staffType == "Lab Technician" ? (
              <img src={ Lab_OPR } />
            ) : staffType == "Radiology/Imaging" ? (
              <img src={ Rad_OPR } />
            ) : (
                  undefined
                ) }
            <h4>In-Patient</h4>
          </div>
          {/* <div>
            <img onClick={addNewItem} src={Add_New} />
            <img src={Search} />
          </div> */}
        </div>

        { props.history.location.state && props.history.location.state.comingFrom &&
          props.history.location.state.comingFrom === "notifications" ? (
            undefined
          ) : (
            <div
              className={ `${ "container-fluid" } ${ classes.root }` }
              style={ {
                marginTop: "25px",
                paddingLeft: "10px",
                paddingRight: "10px",
              } }
            >
              <div className="row">
                <div
                  className="col-md-10 col-sm-9 col-8"
                  style={ styles.textFieldPadding }
                >
                  <TextField
                    className="textInputStyle"
                    id="searchPatientQuery"
                    type="text"
                    variant="filled"
                    label="Search Patient by Name / MRN / National ID / Mobile Number"
                    name={ "searchPatientQuery" }
                    value={ searchPatientQuery }
                    onChange={ handlePatientSearch }
                    InputLabelProps={ {
                      classes: {
                        root: classes.label,
                        focused: classes.focusedLabel,
                        error: classes.erroredLabel,
                      },
                    } }
                    InputProps={ {
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      className: classes.input,
                      classes: { input: classes.input },
                      disableUnderline: true,
                    } }
                  />
                </div>

                <div
                  className="col-md-1 col-sm-2 col-2"
                  style={ {
                    ...styles.textFieldPadding,
                  } }
                >
                  <div
                    style={ {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 5,
                      height: 55,
                    } }
                  >
                    <img
                      src={ BarCode }
                      onClick={ scanQRCode }
                      style={ { width: 70, height: 60, cursor: "pointer" } }
                    />{ " " }
                  </div>
                </div>

                <div
                  className="col-md-1 col-sm-1 col-2"
                  style={ {
                    ...styles.textFieldPadding,
                  } }
                >
                  <div
                    style={ {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 5,
                      height: 55,
                    } }
                  >
                    <img src={ Fingerprint } style={ { maxWidth: 43, height: 43 } } />
                  </div>
                </div>
              </div>
            </div>
          ) }

        <div
          style={ {
            flex: 4,
            display: "flex",
            flexDirection: "column",
          } }
        >
          { staffType === "Lab Technician" ||
            staffType === "Radiology/Imaging" ? (
              <div>
                {labInPatient !== " " || radInPatient !== " " ? (
                  <div>
                    <div>
                      <CustomTable
                        tableData={ labInPatient ? labInPatient : radInPatient }
                        tableDataKeys={ tableDataKeys }
                        tableHeading={ tableHeading }
                        action={ actions }
                        handleView={ handleView }
                        borderBottomColor={ "#60d69f" }
                        borderBottomWidth={ 20 }
                      />
                    </div>
                    <div style={ { marginTop: 20, marginBottom: 20 } }>
                      <img
                        onClick={ () => props.history.goBack() }
                        src={ Back }
                        style={ {
                          width: 45,
                          height: 35,
                          cursor: "pointer",
                        } }
                      />
                    </div>
                    <Notification msg={ errorMsg } open={ openNotification } />
                  </div>
                ) : (
                    // <div className="LoaderStyle">
                    //   <Loader type="TailSpin" color="red" height={50} width={50} />
                    // </div>
                    <div className="row " style={ { marginTop: "25px" } }>
                      <div className="col-11">
                        <h3
                          style={ {
                            color: "white",
                            textAlign: "center",
                            width: "100%",
                            position: "absolute",
                          } }
                        >
                          Opps...No Data Found
                    </h3>
                      </div>
                      <div className="col-1" style={ { marginTop: 45 } }>
                        <img
                          onClick={ () => props.history.goBack() }
                          src={ Back }
                          style={ {
                            maxWidth: "60%",
                            height: "auto",
                            cursor: "pointer",
                          } }
                        />
                      </div>
                    </div>
                  ) }
              </div>
            ) : (
              undefined
            ) }
        </div>
      </div>
    </div>
  );
}
