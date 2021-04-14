import axios from "axios";
import _ from "lodash";
import
{
    getPatientsInfo, loginUrl
} from "../../../public/endpoins";

export const getPatientsInfoData = (
) =>
{
    return new Promise( ( resolve, reject ) =>
    {
        fetch( getPatientsInfo )
            .then( ( response ) => response.json() )
            .then( ( res ) =>
            {
                const filteredData = res.map( d => ( { transactionId: d.TxId, dateTime: d.Timestamp, name: ( d.Value.firstName + " " + d.Value.lastName ), mrn: d.Value.SIN, phoneNumber: d.Value.phoneNumber, email: d.Value.email, address: d.Value.address, registrationDateTime: d.Value.paymentDate, id: d.Value.SIN, depositor: d.Value.depositorName, amount: d.Value.depositAmount, patientName: d.Value.fullName, insured: d.Value.insuranceNo, unInsured: d.Value.insuranceNo, coverageDetails: d.Value.coverageDetails } ) )
                resolve( filteredData );
            } )
            .catch( ( error ) => reject( error ) );
    } );
};

const toMapData = ( data ) =>
{
    return data.map(
        (
            { specialty, identifier, name: doctorName, experience, chiefComplaint },
            index
        ) => ( {
            "Doctor Id": identifier[ 0 ].value,
            Speciality: specialty.join( ", " ),
            "Doctor Name": doctorName.map(
                ( { given, family } ) => given + " " + family
            ),
            Experience: experience,
            "Production Area": getProductionArea( chiefComplaint ),
        } )
    );
}

const getProductionArea = ( chiefComplaint ) =>
{
    if ( chiefComplaint && chiefComplaint.length )
    {
        return chiefComplaint[ chiefComplaint.length - 1 ].chiefComplaintId.productionArea[ chiefComplaint[ 0 ].chiefComplaintId.productionArea.length - 1 ].productionAreaId.paName
    }
    return "";
}
