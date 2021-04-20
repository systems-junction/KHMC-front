import axios from "axios";
import _ from "lodash";
import { getPatientsInfo, loginUrl } from "../../../public/endpoins";

export const getPatientsInfoData = ( url, name ) =>
{
    return new Promise( ( resolve, reject ) =>
    {
        fetch( getPatientsInfo + url )
            .then( ( response ) => response.json() )
            .then( ( res ) =>
            {
                const mappedData = toMapData( res, url, name );
                console.log( "mappedData: ", mappedData )
                resolve( mappedData );
            } )
            .catch( ( error ) => reject( error ) );
    } );
};

const toMapData = ( data, url, name ) =>
{
    console.log( "endpointURL & name: ", url, name );
    let filteredData;
    if ( url === "/getHistoryPatient?info=PatientInfo" && name === "Patients Registration" )
    {
        filteredData = data.map( ( d ) => ( {
            transactionId: d.TxId,
            dateTime: d.Timestamp,
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
    if ( url === "/getHistoryEDR?info=EDR" && name === "Patients Assessment" )
    {
        filteredData = data.map( ( d ) => ( { transactionID: d.TxId, recordID: d.Value.patientId, dateTime: d.Timestamp, details: d.Value.ConsultationNote[ 0 ].description, performedBy: d.Value.generatedBy } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Patient Diagnosis" )
    {
        filteredData = data.map( ( d ) => ( {
            transactionID: d.TxId,
            rDNoteID: d.Value.ResidentNotes[ 0 ].residentNoteNo,
            orderID: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].itemId,
            requestID: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            dateTime: d.Timestamp,
            iCDCPTCodes: d.Value.ResidentNotes[ 0 ].code,
            itemsDescription: d.Value.ConsultationNote[ 0 ].description,
            serviceDescription: d.Value.ResidentNotes[ 0 ].description,
            requestedBy: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].requestedQty,
            consultant: "N/A",
            mrn: "N/A",
            patientName: d.Value.RadiologyRequest[ 0 ].requesterName,
            rDName: d.Value.RadiologyRequest[ 0 ].serviceName,
            orderedBy: d.Value.RadiologyRequest[ 0 ].requesterName,
            notes: d.Value.ConsultationNote[ 0 ].doctorNotes
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "RD Assessment & Diagnosis" )
    {
        filteredData = data.map( ( d ) => ( {
            transactionID: d.TxId,
            rDNoteID: d.Value.ResidentNotes[ 0 ].residentNoteNo,
            orderID: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].itemId,
            itemsDescription: d.Value.ConsultationNote[ 0 ].description,
            dateTime: d.Timestamp,
            requestID: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            orderedBy: d.Value.RadiologyRequest[ 0 ].requesterName,
            serviceDescription: d.Value.ResidentNotes[ 0 ].description,
            iCDCPTCodes: d.Value.ResidentNotes[ 0 ].code,
            dischargeMedication: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].medicineName,
            requestedBy: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].requestedQty,
            mrn: "N/A",
            consultant: "N/A",
            patientName: d.Value.RadiologyRequest[ 0 ].requesterName,
            notesSummary: d.Value.DischargeRequest.DischargeSummary.otherNotes,
            generatedBy: d.Value.generatedBy,
            rDName: d.Value.RadiologyRequest[ 0 ].serviceName,
            notes: d.Value.ConsultationNote[ 0 ].doctorNotes
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Insurance Claims" )
    {
        filteredData = data.map( ( d ) => ( {
            requestID: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            dateTime: d.Timestamp,
            itemsDescription: d.Value.ConsultationNote[ 0 ].description,
            patientInfo: "N/A",
            vendor: "N/A",
            requestInfo: "N/A",
            claimInfo: d.Value.claimed,
            transactionID: d.TxId
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "EC Assessment & Diagnosis" )
    {
        filteredData = data.map( ( d ) => ( {
            dateTime: d.Timestamp,
            requestId: d.Value.PharmacyRequest[ 0 ].ReplenishmentRequestBuID,
            itemsDescription: d.Value.ConsultationNote[ 0 ].description,
            mrn: "N/A",
            patientInfo: "N/A",
            orderID: d.Value.DischargeRequest.DischargeMedication.Medicine[ 0 ].itemId,
            patientName: d.Value.RadiologyRequest[ 0 ].requesterName,
            orderedBy: d.Value.RadiologyRequest[ 0 ].requesterName,
            requester: d.Value.ConsultationNote[ 0 ].requester,
            performedBy: d.Value.generatedBy,
            consultationNotes: d.Value.ConsultationNote[ 0 ].consultationNotes,
            serviceDescription: d.Value.ResidentNotes[ 0 ].description,
            transactionID: d.TxId
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Patient Discharge" )
    {
        filteredData = data.map( ( d ) => ( {
            iCTCode: "N/A",
            khmcCode: "N/A",
            itemInfo: "N/A",
            orderedBy: d.Value.RadiologyRequest[ 0 ].requesterName,
            patientInfo: "N/A",
            transactionID: d.TxId
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Orders" )
    {
        filteredData = data.map( ( d ) => ( {
            iCTCode: "N/A",
            khmcCode: "N/A",
            itemInfo: "N/A",
            orderedBy: d.Value.RadiologyRequest[ 0 ].requesterName,
            patientInfo: "N/A",
            transactionID: d.TxId
        } ) );
        return filteredData;
    }
    return [];
}

// handleOtherRequest( "/getHistoryPatient?info=PatientInfo", name, "SIN" )
const handleOtherRequest = async ( url, name, key ) =>
{
    const res = await toHandleOtherRequests( "/getHistoryPatient?info=PatientInfo", name );
    console.log( 'res: ', res );
    const value = res.map( d => d.Value[ key ] )[ 0 ];
    console.log( "value: ", value );
    return value;
}

const toHandleOtherRequests = ( url, name ) =>
{
    return new Promise( ( resolve, reject ) =>
    {
        fetch( getPatientsInfo + url )
            .then( ( response ) => response.json() )
            .then( ( res ) =>
            {
                resolve( res );
            } )
            .catch( ( error ) => reject( error ) );
    } );
}