import React, { useState, useEffect } from 'react'
import Notification from '../../../components/Snackbar/Notification.js'
import CustomTable from '../../../components/Table/Table'
import axios from 'axios'
import _ from 'lodash'
// import { getPendingEDRs, searchPendingEdr } from '../../public/endpoins'
import Back from '../../../assets/img/Back_Arrow.png'
import Header from '../../../components/Header/Header'
import ButtonField from '../../../components/common/Button'
import AccountCircle from '@material-ui/icons/SearchOutlined'
import BarCode from '../../../assets/img/Bar Code.png'
import '../../../assets/jss/material-dashboard-react/components/loaderStyle.css'
import cookie from 'react-cookies'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import QRCodeScannerComponent from '../../../components/QRCodeScanner/QRCodeScanner';
import { MenuItem, Tabs, Tab, styles, TextField, InputAdornment, Button, makeStyles } from '@material-ui/core';
import DialogComponent from './Dialog';

const tableHeading = [
    'MRN',
    'Patient Name',
    'Email',
    'Phone',
    'Action',
]
const tableDataKeys = [
    'mrn',
    'patientName',
    'email',
    'phoneNo',
]

const dropdownStyles = {
    textFieldPadding: {
        paddingLeft: 5,
        paddingRight: 5,
    },
}

const patientRegistrationDropdown = [

]

const useStyles = makeStyles( ( theme ) => ( {
    formControl: {
        margin: theme.spacing( 1 ),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing( 2 ),
    },
} ) );

const useStylesForInput = makeStyles( ( theme ) => ( {
    margin: {
        margin: theme.spacing( 0 ),
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        '&:after': {
            borderBottomColor: 'black',
        },
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:focus': {
            boxShadow: 'none',
            borderRadius: 5,
        },
    },
    multilineColor: {
        backgroundColor: 'white',
        borderRadius: 5,
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:after': {
            borderBottomColor: 'black',
        },
        '&:focus': {
            backgroundColor: 'white',
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
        },
        '& .Mui-disabled': {
            backgroundColor: 'white',
            color: 'gray',
        },
        '&:focus': {
            backgroundColor: 'white',
            boxShadow: 'none',
        },
        '& .MuiFormLabel-root': {
            fontSize: '12px',

            paddingRight: '15px',
        },
    },
    label: {
        '&$focusedLabel': {
            color: 'red',
            display: 'none',
        },
        // "&$erroredLabel": {
        //   color: "orange"
        // }
    },
    focusedLabel: {},
} ) )

const useStylesForTabs = makeStyles( {
    root: {
        justifyContent: 'center',
    },
    scroller: {
        flexGrow: '0',
    },
} )

const actions = { view: true }

export default function PatientRegistration ( props )
{
    const dropdownClasses = useStyles();
    const matches = useMediaQuery( '(min-width:600px)' )
    const classes = useStylesForInput()

    const [ labInPatient, setlabInPatient ] = useState( [ { "mrn": "mrn1", "patientName": "patientName1", "email": "email1", "phoneNo": "PhoneNo1" } ] )
    const [ errorMsg, setErrorMsg ] = useState( '' )
    const [ openNotification, setOpenNotification ] = useState( false )
    const [ searchPatientQuery, setSearchPatientQuery ] = useState( '' )
    const [ QRCodeScanner, setQRCodeScanner ] = useState( false )
    const [ rcmDropdownItems, setRcmDropdownItems ] = useState( [ 'patients Assessment',
        'Patient Diagnosis',
        'RD Assessment & Diagnosis',
        'Insurance Claims',
        'EC Assessment & Diagnosis',
        'Patient Discharge',
        'Orders' ] );
    const [ value, setValue ] = useState( 0 );
    const [ rcmSelectedDropdownItem, setRcmSelectedDropdownItem ] = useState( 'patients Assessment' );
    const [ showDialog, setShowDialog ] = useState( false );
    const [ dialogContent, setDialogContent ] = useState( [] );
    const classesForTabs = useStylesForTabs()

    if ( openNotification )
    {
        setTimeout( () =>
        {
            setOpenNotification( false )
            setErrorMsg( '' )
        }, 2000 )
    }

    useEffect( () =>
    {
        // getPatientData()

        // return () => socket.disconnect();
    }, [] )

    function getPatientData ()
    {
        axios
            .get( 'getPendingEDRs' )
            .then( ( res ) =>
            {
                console.log( 'response', res.data.data )
                if ( res.data.success )
                {
                    res.data.data.map(
                        ( d ) =>
                        ( d.patientName =
                            d.patientId.name[ 0 ].given[ 0 ] + ' ' + d.patientId.name[ 0 ].family )
                    )
                    res.data.data.map( ( d ) => ( d.gender = d.patientId.gender ) )
                    res.data.data.map( ( d ) => ( d.age = d.patientId.age ) )
                    res.data.data.map( ( d ) => ( d.createdAt = d.patientId.createdAt ) )
                    res.data.data.map( ( d ) => ( d.mrn = d.patientId.identifier[ 0 ].value ) )
                    res.data.data.map( ( d ) =>
                    {
                        d.patientId.telecom.map( ( a ) =>
                        {
                            if ( a.system === 'mobile' )
                            {
                                return ( d.phoneNo = a.value )
                            }
                        } )
                    } )
                    var allLabSorted = _.sortBy( res.data.data, 'createdAt' ).reverse()
                    setlabInPatient( allLabSorted )
                } else if ( !res.data.success )
                {
                    setErrorMsg( res.data.error )
                    setOpenNotification( true )
                }
                return res
            } )
            .catch( ( e ) =>
            {
                console.log( 'error: ', e )
            } )
    }
    console.log( 'current user', cookie.load( 'current_user' ) )
    console.log( labInPatient )

    function handleView ( rec )
    {
        let arr = [];
        tableDataKeys.forEach( ( k, i ) =>
        {
            if ( i !== tableHeading.length - 1 )
            {
                let value = rec[ k ];
                arr.push( { title: [ tableHeading[ i ] ], value: value } );
            }
        } )
        console.log( "arr: ", arr );
        setDialogContent( arr );
        setShowDialog( true );
    }

    const handlePatientSearch = ( e ) =>
    {
        const a = e.target.value.replace( /[^\w\s]/gi, '' )
        setSearchPatientQuery( a )
        if ( a.length >= 3 )
        {
            axios
                .get( 'searchPendingEdr' + '/' + a )
                .then( ( res ) =>
                {
                    console.log( 'res', res )
                    if ( res.data.success )
                    {
                        if ( res.data.data )
                        {
                            res.data.data.map(
                                ( d ) =>
                                ( d.patientName =
                                    d.patientId.name[ 0 ].given[ 0 ] +
                                    ' ' +
                                    d.patientId.name[ 0 ].family )
                            )
                            res.data.data.map( ( d ) => ( d.gender = d.patientId.gender ) )
                            res.data.data.map( ( d ) => ( d.age = d.patientId.age ) )
                            res.data.data.map( ( d ) => ( d.createdAt = d.patientId.createdAt ) )
                            res.data.data.map(
                                ( d ) => ( d.mrn = d.patientId.identifier[ 0 ].value )
                            )
                            res.data.data.map( ( d ) =>
                            {
                                d.patientId.telecom.map( ( a ) =>
                                {
                                    if ( a.system === 'mobile' )
                                    {
                                        return ( d.phoneNo = a.value )
                                    }
                                } )
                            } )
                            var sortedObjs = _.sortBy( res.data.data, 'createdAt' ).reverse()
                            setlabInPatient( sortedObjs )
                            // var sortedObjs = _.sortBy(res.data.data, 'date').reverse()
                            // setlabInPatient(res.data.data)
                        } else
                        {
                            setlabInPatient( ' ' )
                        }
                    }
                } )
                .catch( ( e ) =>
                {
                    console.log( 'error after searching patient request', e )
                } )
        } else if ( a.length == 0 )
        {
            getPatientData()
        }
    }

    const addNewItem = () =>
    {
        props.history.push( {
            pathname: 'patientregistration',
            state: { comingFor: 'add' },
        } )
    }

    function scanQRCode ()
    {
        setQRCodeScanner( ( pervState ) => !pervState )
    }

    function handleScanQR ( data )
    {
        setQRCodeScanner( false )
        console.log( 'json', JSON.parse( data ) )
        if ( JSON.parse( data ).profileNo )
        {
            handlePatientSearch( {
                target: {
                    value: JSON.parse( data ).profileNo,
                    type: 'text',
                },
            } )
        }
    }

    if ( QRCodeScanner )
    {
        return (
            <div>
                {QRCodeScanner ? (
                    <QRCodeScannerComponent
                        handleScanQR={ handleScanQR }
                        scanQRCode={ scanQRCode }
                    />
                ) : (
                    undefined
                ) }
            </div>
        )
    }


    const handleDropdownChange = ( value ) =>
    {
        setRcmSelectedDropdownItem( value );
    };

    const handleTabsChange = ( event, newValue ) =>
    {
        setValue( newValue )
    }

    const handleDialog = () =>
    {
        setShowDialog( false );
    }

    return (
        <div
            style={ {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                position: 'fixed',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgb(19 213 159)',
                overflowY: 'scroll',
            } }
        >
            <Header history={ props.history } />

            <div className='cPadding'>
                {/* <div className='subheader'> */ }
                { showDialog && dialogContent && <DialogComponent contents={ dialogContent } handleDialog={ ( toggleValue ) => handleDialog() } /> }
                <div className='row'>
                    <div
                        className='col-md-3 col-sm-6'
                    >
                        <TextField
                            select
                            fullWidth
                            id="patientRegistrationId"
                            name={ "Nasal congestion" }
                            value={ rcmSelectedDropdownItem }
                            label="Nasal Drainage/Congestion"
                            variant="filled"
                            className="dropDownStyle"
                            onChange={ ( e ) =>
                                handleDropdownChange(
                                    e.target.value
                                )
                            }
                            InputProps={ {
                                className: classes.input,
                                classes: { input: classes.input },
                                disableUnderline: true,
                            } }
                        >
                            {/* { val.dropdownOptions.map( ( item ) => ( */ }
                            { rcmDropdownItems.length &&
                                rcmDropdownItems.map( ( item ) => (
                                    <MenuItem
                                        key={ "safcid" }
                                        value={ item }
                                    >
                                        {item }
                                    </MenuItem>
                                ) ) }
                            {/* ) ) } */ }
                        </TextField>
                    </div>
                </div>
                {/* </div> */ }

                <div className={ classesForTabs.root }>
                    <Tabs
                        classes={ {
                            root: classesForTabs.root,
                            scroller: classesForTabs.scroller,
                        } }
                        value={ value }
                        onChange={ handleTabsChange }
                        textColor="primary"
                        TabIndicatorProps={ { style: { background: '#12387a' } } }
                        centered={ false }
                        variant='scrollable'
                        fullWidth={ true }
                    >
                        <Tab
                            style={ {
                                color: 'white',
                                borderRadius: 15,
                                outline: 'none',
                                color: value === 4 ? "#12387a" : '#3B988C',
                            } }
                            label='Basic Info'
                        />
                        <Tab
                            style={ {
                                color: 'white',
                                borderRadius: 15,
                                outline: 'none',
                                color: value === 5 ? "#12387a" : '#3B988C',
                            } }
                            label='Payment Info'
                        />
                        <Tab
                            style={ {
                                color: 'white',
                                borderRadius: 15,
                                outline: 'none',
                                color: value === 6 ? "#12387a" : '#3B988C',
                            } }
                            label='Insurance Info'
                        />
                    </Tabs>
                </div>

                <div
                    className={ `${ 'container-fluid' } ${ classes.root }` }
                    style={ {
                        marginTop: '25px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                    } }
                >
                    <div className='row'>
                        <div
                            className='col-md-12 col-sm-12 col-12'
                            style={ dropdownStyles.textFieldPadding }
                        >
                            <TextField
                                className='textInputStyle'
                                id='searchPatientQuery'
                                type='text'
                                variant='filled'
                                label='Search Patient by Name / MRN / National ID / Mobile Number'
                                name={ 'searchPatientQuery' }
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
                                        <InputAdornment position='end'>
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                    className: classes.input,
                                    classes: { input: classes.input },
                                    disableUnderline: true,
                                } }
                            />
                        </div>
                    </div>
                </div>

                <div
                    style={ {
                        flex: 4,
                        display: 'flex',
                        flexDirection: 'column',
                    } }
                >
                    <div>
                        { labInPatient !== ' ' ? (
                            <div>
                                <div>
                                    <CustomTable
                                        tableData={ labInPatient }
                                        tableDataKeys={ tableDataKeys }
                                        tableHeading={ tableHeading }
                                        action={ actions }
                                        handleView={ handleView }
                                        borderBottomColor={ '#60d69f' }
                                        borderBottomWidth={ 20 }
                                    />
                                </div>
                                <div style={ { marginTop: 20, marginBottom: 20 } }>
                                    {/* <img
                                        onClick={ () => props.history.goBack() }
                                        src={ Back }
                                        style={ {
                                            width: 45,
                                            height: 35,
                                            cursor: 'pointer',
                                        } }
                                    /> */}
                                </div>
                                <Notification msg={ errorMsg } open={ openNotification } />
                            </div>
                        ) : (
                            <div className='row ' style={ { marginTop: '25px' } }>
                                <div className='col-11'>
                                    <h3
                                        style={ {
                                            color: 'white',
                                            textAlign: 'center',
                                            width: '100%',
                                            position: 'absolute',
                                        } }
                                    >
                                        Opps...No Data Found
                  </h3>
                                </div>
                                <div className='col-1' style={ { marginTop: 45 } }>
                                    {/* <img
                                        onClick={ () => props.history.goBack() }
                                        src={ Back }
                                        style={ {
                                            maxWidth: '60%',
                                            height: 'auto',
                                            cursor: 'pointer',
                                        } }
                                    /> */}
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </div >
    )
}
