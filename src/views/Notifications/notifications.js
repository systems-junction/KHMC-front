import React, { useState, useEffect, useRef } from 'react'
import './notification.css'
import notificationIcon from '../../assets/img/Notification.png'
import Header from '../../components/Header/Header'
import moment from 'moment';
import { AlertTriangle } from 'react-feather';
import Badge from '@material-ui/core/Badge';
import cookie from "react-cookies";
import { markNotification } from '../../public/endpoins'
import axios from 'axios'
import Notification from '../../components/Snackbar/Notification.js'

export default function Notifications ( props ) 
{
    const [ errorMsg, setErrorMsg ] = useState( '' )
    const [ successMsg, setsuccessMsg ] = useState( '' )
    const [ openNotification, setOpenNotification ] = useState( false )
    const [ notificationData, setnotificationData ] = useState( '' )

    useEffect( () =>
    {

        if ( props.history.location.state && props.history.location.state.notificationData )
        {
            setnotificationData( props.history.location.state.notificationData )
            console.log( "Data Passed", props.history.location.state.notificationData )
        }
    }, [ notificationData, props.history.location.state, props.history.location.state.notificationData ] )

    const getWhen = timestamp =>
    {
        let when = `${ moment( timestamp ).format( 'DD-MM-YYYY' ) } ${ moment( timestamp ).format( 'LTS' ) }`;
        return when;
    };

    const getContent = message =>
    {
        // console.log("Data Passed",message)

        if ( message.indexOf( '\n' ) >= 0 )
        {
            let splitted = message.split( '\n' );
            let ret = '<ul>';

            for ( let i = 0; i <= splitted.length - 1; i++ )
            {
                if ( splitted[ i ] !== '' )
                {
                    ret = ret + '<li>' + splitted[ i ] + '</li>';
                }
            }

            ret = ret + '</ul>';
            return {
                __html: ret
            };
        }

        return {
            __html: `<ul><li>${ message }</li></ul>`
        };
    }; // Get the notification message

    const handleViewNotification = ( message, userId ) =>
    {
        console.log( "mesaageee", message )

        var id = message._id

        const params = {
            read: true,
        }
        axios.get( markNotification + "/" + id + "/" + userId, params )
            .then( ( res ) =>
            {
                if ( res.data.success )
                {
                    // console.log( "Response data ", res.data.data )
                    props.history.push( {
                        pathname: message.route,
                        state: {
                            comingFrom: 'notifications',
                            SearchId: message.searchId
                        },
                    } );
                }
            } )
            .catch( ( e ) =>
            {
                setOpenNotification( true )
                setErrorMsg( 'Cannot Open Notification' )
            } )
    }

    if ( openNotification )
    {
        setTimeout( () =>
        {
            setOpenNotification( false )
            setErrorMsg( '' )
            setsuccessMsg( '' )
        }, 2000 )
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
                <div className='subheader'>
                    <div>
                        <img src={ notificationIcon } />
                        <h4>Notifications</h4>
                    </div>
                </div>

                { notificationData.length > 0 ?
                    ( <ul className="notification-info-panel">
                        {notificationData.map( ( message, index ) =>
                        {
                            return (
                                message.sendTo.map( ( checkRead, indexx ) =>
                                {
                                    if ( checkRead.read === false && checkRead.userId._id === cookie.load( "current_user" )._id )
                                    {
                                        // console.log("Unread", index)
                                        return (
                                            <li key={ index }
                                                className={
                                                    'notification-message unread'
                                                    // 'notification-message'
                                                }
                                                onClick={ () => handleViewNotification( message, checkRead.userId._id ) }
                                            >
                                                <div className="timestamp d-flex">
                                                    <span className="title mr-auto p-2">{ message.title }<Badge className="notify-dot" color="error" variant="dot" /></span>
                                                    <span className="time p-2">{ getWhen( message.date ) }</span>
                                                </div>
                                                <hr style={ { marginTop: 0, marginBottom: '5px' } } />
                                                <div className="content" dangerouslySetInnerHTML={ getContent( message[ 'message' ] ) } />
                                            </li>
                                        )
                                    }
                                    else if ( checkRead.read === true && checkRead.userId._id === cookie.load( "current_user" )._id )
                                    {
                                        // console.log("Read", index)
                                        return (
                                            <li key={ index }
                                                className={
                                                    // 'notification-message unread' 
                                                    'notification-message'
                                                }
                                                onClick={ () => handleViewNotification( message, checkRead.userId._id ) }
                                            >
                                                <div className="timestamp d-flex">
                                                    <span className="title mr-auto p-2">{ message.title }</span>
                                                    <span className="time p-2">{ getWhen( message.date ) }</span>
                                                </div>
                                                <hr style={ { marginTop: 0, marginBottom: '5px' } } />
                                                <div className="content" dangerouslySetInnerHTML={ getContent( message[ 'message' ] ) } />
                                            </li>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <div className="notification-info-panel">
                                                <div className="notification-message no-notify">
                                                    <AlertTriangle
                                                        color={ '#000000' }
                                                        size={ 28 }
                                                        style={ { marginTop: '1rem' } }
                                                    />
                                                    <hr />
                                                    <h5 style={ { paddingBottom: '0.5rem' } }>No Notifications found!</h5>
                                                </div>
                                            </div>
                                        )
                                    }
                                } )
                            )
                        } ) }
                    </ul>
                    ) : (
                        <div className="notification-info-panel">
                            <div className="notification-message no-notify">
                                <AlertTriangle
                                    color={ '#000000' }
                                    size={ 28 }
                                    style={ { marginTop: '1rem' } }
                                />
                                <hr />
                                <h5 style={ { paddingBottom: '0.5rem' } }>No Notifications found!</h5>
                            </div>
                        </div>
                    )
                }
                <Notification
                    msg={ errorMsg }
                    open={ openNotification }
                    success={ successMsg }
                />
            </div >
        </div >
    )
}


