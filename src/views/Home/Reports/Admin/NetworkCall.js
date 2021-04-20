import _ from "lodash";
import { getAdmin } from "../../../../public/endpoins";

export const getData = ( url, name ) =>
{
    return new Promise( ( resolve, reject ) =>
    {
        fetch( getAdmin + url )
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
    if ( url === "/getHistoryStaff?info=Staff" && name === "Staff" )
    {
        filteredData = data.map( ( d ) => ( {
            createdBy: "N/A",
            dateTime: d.Timestamp,
            roleName: d.Value.Type,
            roleAssign: d.Value.designation,
            memberName: d.Value.firstName + " " + d.Value.lastName,
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryStaff?info=Staff" && name === "FU / BU" )
    {
        filteredData = data.map( ( d ) => ( {
            createdBy: "N/A",
            dateTime: d.Timestamp,
            memberName: d.Value.firstName + " " + d.Value.lastName,
            description: "N/A",
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if (
        url === "/getHistoryItem?info=ItemInfo" &&
        name === "Items"
    )
    {
        filteredData = data.map( ( d ) => ( {
            createdBy: "N/A",
            dateTime: d.Timestamp,
            itemName: d.Value.name,
            icdCode: d.Value.itemCode,
            khmcCode: "N/A",
            description: d.Value.description,
            transactionID: d.TxId,
        } ) );
        return filteredData;
    }
    if ( url === "/getHistoryItem?info=ItemInfo" && name === "Vendors" )
    {
        filteredData = data.map( ( d ) => (
            {
                createdBy: "N/A",
                dateTime: d.Timestamp,
                vendorName: d.Value.tradeName,
                transactionID: d.TxId,
            }
        ) );
        return filteredData;
    }

    return [];
};
