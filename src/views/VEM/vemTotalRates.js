import React, { useEffect, useState, useReducer } from 'react';
import cookie from "react-cookies";
import Header from "../../components/Header/Header";
import totalRatesIcon from "../../assets/img/PatientRegistration.png";

function vemTotalRates(props) {

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
            </div>
        </div>
    );
}

export default vemTotalRates;