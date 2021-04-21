import _ from "lodash";
import moment from 'moment';
import { getPatientsInfo } from "../../../../public/endpoins";

export const getData = ( url, name ) =>
{
    return new Promise( ( resolve, reject ) =>
    {
        fetch( getPatientsInfo + url )
            .then( ( response ) => response.json() )
            .then( ( res ) =>
            {
                const mappedData = toMapData( res, url, name );
                console.log( "mappedData: ", mappedData );
                resolve( mappedData );
            } )
            .catch( ( error ) => reject( error ) );
    } );
};

const toMapData = ( data, url, name ) =>
{
    console.log( "endpointURL & name: ", url, name );
    let filteredData;
    if (
        url === "/getHistoryPatient?info=PatientInfo" &&
        name === "Patients Registration"
    )
    {
        filteredData = data.map( ( d ) => ( {
            transactionId: d.TxId,
            dateTime: handleTimestamp( d.Timestamp ),
            name: d.Value.firstName + " " + d.Value.lastName,
            mrn: d.Value.SIN,
            phoneNumber: d.Value.phoneNumber,
            email: d.Value.email,
            address: d.Value.address,
            registrationDateTime: d.Value.paymentDate,
            id: d.Value.SIN,
            depositor: d.Value.depositorName,
            amount: d.Value.depositAmount,
            patientName: d.Value.fullName,
            insured: d.Value.insuranceNo,
            unInsured: d.Value.insuranceNo,
            coverageDetails: d.Value.coverageDetails,
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Replishment Requests" )
    {
        filteredData = data.map( ( d ) => ( {
            requestId: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            dateTime: handleTimestamp( d.Timestamp ),
            itemsInfo: "N/A",
            details: d.Value.ConsultationNote[ 0 ].description,
            generatedBy: d.Value.generatedBy,
            reason: d.Value.TriageAssessment[ 0 ].reason,
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryIPR?info=IPR" && name === "Purchase Requests" )
    {
        filteredData = data.map( ( d ) => ( {
            requestId: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            dateTime: handleTimestamp( d.Timestamp ),
            itemsInfo: "N/A",
            details: d.Value.ConsultationNote[ 0 ].description,
            generatedBy: d.Value.generatedBy,
            reason: d.Value.TriageAssessment[ 0 ].reason,
            approvedBy: d.Value.FollowUp[ 0 ].approvalPerson,
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if (
        url === "/getHistoryIPR?info=IPR" &&
        name === "Purchase Orders"
    )
    {
        filteredData = data.map( ( d ) => ( {
            orderId: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].itemId,
            dateTime: handleTimestamp( d.Timestamp ),
            itemsInfo: "N/A",
            generatedBy: d.Value.generatedBy,
            reason: d.Value.TriageAssessment[ 0 ].reason,
            vendor: "N/A",
            approvedBy: d.Value.FollowUp[ 0 ].approvalPerson,
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryIPR?info=IPR" && name === "Recieving" )
    {
        filteredData = data.map( ( d ) => ( {
            requestId: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            orderId: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].itemId,
            dateTime: handleTimestamp( d.Timestamp ),
            itemsInfo: "N/A",
            receivedBy: "N/A",
            vendor: "N/A",
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if (
        url === "/getHistoryIPR?info=IPR" &&
        name === "Returns"
    )
    {
        filteredData = data.map( ( d ) => ( {
            requestID: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            orderID: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].itemId,
            dateTime: handleTimestamp( d.Timestamp ),
            itemsInfo: "N/A",
            receivedBy: "N/A",
            returnedBy: "N/A",
            vendor: "N/A",
            reason: d.Value.TriageAssessment[ 0 ].reason,
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }

    return [];
};

const handleTimestamp = ( timestamp ) =>
{
    const date = moment( timestamp ).format( 'MM-DD-YY' );
    return date;
}