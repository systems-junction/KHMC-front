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
    if ( url === "/getHistoryEDR?info=EDR" && name === "patients Assessment" )
    {
        filteredData = data.map( ( d ) => ( { transactionID: d.TxId, recordID: "b", dateTime: d.date, details: "d", performedBy: "e" } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Patient Diagnosis" )
    {
        filteredData = data.map( ( d ) => ( {
            transactionID: "1",
            rDNoteID: "2",
            orderID: "45",
            requestID: "50",
            dateTime: d.date,
            iCDCPTCodes: "4",
            itemsDescription: "55",
            serviceDescription: "54",
            requestedBy: "59",
            consultant: "51",
            mrn: "5",
            patientName: "p2",
            rDName: "7",
            orderedBy: "22",
            notes: "8"
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "RD Assessment & Diagnosis" )
    {
        filteredData = data.map( ( d ) => ( {
            transactionID: "11",
            rDNoteID: "22",
            orderID: "11",
            itemsDescription: "05",
            dateTime: d.date,
            requestID: "14",
            orderedBy: "22",
            serviceDescription: "54",
            iCDCPTCodes: "44",
            dischargeMedication: "09",
            requestedBy: "59",
            mrn: "55",
            consultant: "51",
            patientName: "66",
            notesSummary: "59",
            generatedBy: "44",
            rDName: "77",
            notes: "88"
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Insurance Claims" )
    {
        filteredData = data.map( ( d ) => ( {
            requestID: "a",
            dateTime: d.date,
            itemsDescription: "",
            patientInfo: "c",
            vendor: "d",
            requestInfo: "e",
            claimInfo: "5l",
            transactionID: "f"
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "EC Assessment & Diagnosis" )
    {
        filteredData = data.map( ( d ) => ( {
            dateTime: d.date,
            requestId: "475",
            itemsDescription: "05",
            mrn: "99",
            patientInfo: "36",
            orderID: "11",
            patientName: "kk",
            orderedBy: "98",
            requester: "32",
            performedBy: "333",
            consultationNotes: "30",
            serviceDescription: "s5",
            transactionID: "021"
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Patient Discharge" )
    {
        filteredData = data.map( ( d ) => ( {
            iCTCode: "1",
            khmcCode: "2",
            itemInfo: "3",
            orderedBy: "4",
            patientInfo: "5",
            transactionID: "6"
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryEDR?info=EDR" && name === "Orders" )
    {
        filteredData = data.map( ( d ) => ( {
            iCTCode: "o1",
            khmcCode: "o2",
            itemInfo: "o3",
            orderedBy: "o4",
            patientInfo: "o5",
            transactionID: "o6"
        } ) );
        return filteredData;
    }
    return [];
};
