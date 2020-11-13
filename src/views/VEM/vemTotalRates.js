import React, { useEffect, useState, useReducer } from 'react';
import cookie from "react-cookies";
import axios from 'axios'
import Header from "../../components/Header/Header";
import Notification from '../../components/Snackbar/Notification.js'
import totalRatesIcon from "../../assets/img/PatientRegistration.png";
import Back from '../../assets/img/Back_Arrow.png'
import { } from '../../public/endpoins'
import CustomTable from '../../components/Table/Table'

const tableHeading = [
    'Vendor Name',
    'Price',
    'Quality',
    'Delivery',
    'Total (OUT OF 100%)'
]
const tableDataKeys = [
    'vendorName',
    'price',
    'quality',
    'delivery',
    'total',
    ''
]

function VemTotalRates(props) {

    const [totalRatesData, setTotalRatesData] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [openNotification, setOpenNotification] = useState(false)

    useEffect(() => {

        // getTotalRatesData()

    }, [])

    function getTotalRatesData() {
        axios
            .get(
                // getTotalRatesURL
            )
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data.data, "Total Rates data");
                    setTotalRatesData(res.data.data.reverse());
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

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#60d69f",
                overflowY: "scroll",
            }}
        >
            <Header history={props.history} />
            <div className="cPadding">
                <div className="subheader">
                    <div>
                        <img src={totalRatesIcon} />
                        <h4>
                            Total Rates
                        </h4>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                            <CustomTable
                                tableData={totalRatesData}
                                tableDataKeys={tableDataKeys}
                                tableHeading={tableHeading}
                                borderBottomColor={'#60d69f'}
                                borderBottomWidth={20}
                            />
                        </div>
                    </div>

                    <div className='row' style={{ marginTop: 20, marginBottom: 20 }}>
                        <div className='col-md-12 col-sm-12'>
                            <img
                                onClick={() => props.history.goBack()}
                                src={Back}
                                style={{
                                    width: 45,
                                    height: 35,
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Notification msg={errorMsg} open={openNotification} />

            </div>
        </div>
    );
}

export default VemTotalRates;