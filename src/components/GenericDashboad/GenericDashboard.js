import Paper from "@material-ui/core/Paper";
import ConfirmationModal from "../Modal/confirmationModal";
import plus_icon from "../../assets/img/Plus.png";
import axios from "axios";

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Notification from "../Snackbar/Notification.js";
import CustomTable from "../Table/Table";
import {
  stockLevelsWarehouse,
  getFunctionalUnitUrl,
  stockLevelsFU,
} from "../../public/endpoins";
import Loader from "react-loader-spinner";
import Header from "../Header/Header";
import purchase_order from "../../assets/img/Purchase Order.png";
import Back from "../../assets/img/Back_Arrow.png";
import cookie from "react-cookies";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import dateTimeFormat from "../../constants/dateTimeFormat.js";
import dateFormat from "../../constants/dateFormat.js";

import business_Unit from "../../assets/img/Functional Unit.png";
import MyApps from "../../assets/img/My Apps.png";

const styles = {
  underlineStyle: {
    width: "100%",
    height: 0.2,
    backgroundColor: "grey",
    marginTop: 3,
  },

  updateTextStyle: {
    color: "white",
    fontSize: 12,
    marginTop: 8,
    marginRight: 15,
  },

  styleForCards: {
    width: "100%",
    backgroundColor: "white",
    height: 200,
    borderRadius: 5,
    padding: 15,
  },
};

function Dashboard(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#2962CC",
        overflowY: "scroll",
        overflowX:'hidden'
      }}
    >
      <Header history={props.history} />

      <div className="cPadding">
        <div className="subheader">
          <div style={{ marginLeft: "-5px" }}>
            <img src={props.headingIcon} />
            <h4>{props.headingTitle}</h4>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span
              style={{
                ...styles.updateTextStyle,
              }}
            >
              UPDATED LAST 3 MINUTES
            </span>

            <i
              class="zmdi zmdi-replay zmdi-hc-3x"
              style={{ color: "white", cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-4"
              style={{ marginTop: 10, paddingLeft: 4, paddingRight: 4 }}
            >
              <div
                style={{
                  ...styles.styleForCards,
                }}
              >
                <div style={{ height: "10%" }}>
                  <span style={{ fontWeight: "900" }}>My Apps</span>
                </div>

                <div
                  style={{
                    height: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    onClick={() => props.openApps()}
                    src={MyApps}
                    style={{ width: 90, height: 90, cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div
              className="col-md-8"
              style={{ marginTop: 10, paddingRight: 4, paddingLeft: 4 }}
            >
              <div
                style={{
                  ...styles.styleForCards,
                }}
              >
                <span style={{ fontWeight: "900" }}>Notifications</span>

                {props.notificationArray.map((notification) => {
                  return (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // backgroundColor:"red"
                        }}
                      >
                        <div style={{ marginTop: 15 }}>
                          <img
                            src={notification.icon}
                            style={{ width: 20, height: 20 }}
                          />
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: "500",
                              marginLeft: 10,
                            }}
                          >
                            {notification.title}
                          </span>
                        </div>

                        <i
                          style={{ color: "blue" }}
                          class="zmdi zmdi-chevron-right zmdi-hc-1x"
                        ></i>
                      </div>

                      <div style={{ ...styles.underlineStyle }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
}

export default Dashboard;
