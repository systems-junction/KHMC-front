/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Notification from "../../../../components/Snackbar/Notification.js";
import CustomTable from "../../../../components/Table/Table";
import axios from "axios";
import _ from "lodash";
import {
  getDischargeIPRUrl,
  getDischarge,
  // getMaterialReceivingUrl
} from "../../../../public/endpoins";
import Loader from "react-loader-spinner";
import Back from "../../../../assets/img/Back_Arrow.png";
import Header from "../../../../components/Header/Header";
import dischargeIcon from "../../../../assets/img/Discharge Medication.png";
import "../../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import socketIOClient from "socket.io-client";

const tableHeading = ["MRN", "Request Number", "Date", "Status", "Action"];
const tableDataKeys = [
  ["patientId", "profileNo"],
  "requestNo",
  "date",
  "status",
];

const actions = { view: true };

export default function Ipr(props) {
  const [Ipr, setIpr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openNotification, setOpenNotification] = useState(false);

  if (openNotification) {
    setTimeout(() => {
      setOpenNotification(false);
      setErrorMsg("");
    }, 2000);
  }

  useEffect(() => {
    // const socket = socketIOClient(socketUrl);
    // socket.emit("connection");
    // socket.on("get_data", (data) => {
    //   setMaterialReceivings(data.reverse());
    //   console.log("res after adding through socket", data);
    // });
    getIprsData();
    // return () => socket.disconnect();
  }, []);

  function getIprsData() {
    axios
      .get(getDischarge)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data[0], "ecr1");
          res.data.data[0].map(
            (d) => (d.date = d.dischargeRequest.dischargeMedication.date)
          );
          res.data.data[0].map((d) => (d.status = d.dischargeRequest.status));
          setIpr(res.data.data[0].reverse());
          var sortedObjs = _.sortBy(res.data.data[0], "date").reverse();
          setIpr(sortedObjs);
          // setIpr(res.data.data.reverse())
        } else if (!res.data.success) {
          setErrorMsg(res.data.error);
          setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  function handleView(rec) {
    let path = `ipr/viewIPR`;
    props.history.push({
      pathname: path,
      state: {
        selectedItem: rec,
        comingFor: "Ipr",
      },
    });
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
      <Header />

      <div className="cPadding">
        <div className="subheader">
          <div>
            <img src={dischargeIcon} />
            <h4>Discharge</h4>
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Ipr.length !== "" ? (
            <div>
              <div>
                <CustomTable
                  tableData={Ipr}
                  tableDataKeys={tableDataKeys}
                  tableHeading={tableHeading}
                  action={actions}
                  handleView={handleView}
                  borderBottomColor={"#60d69f"}
                  borderBottomWidth={20}
                />
              </div>
              <div style={{ marginTop: 20, marginBottom: 20 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back}
                  style={{
                    width: 45,
                    height: 35,
                    cursor: "pointer",
                  }}
                />
              </div>
              <Notification msg={errorMsg} open={openNotification} />
            </div>
          ) : (
            // <div className='LoaderStyle'>
            //   <Loader type='TailSpin' color='red' height={50} width={50} />
            // </div>
            <div className="row " style={{ marginTop: "25px" }}>
              <div className="col-11">
                <h3
                  style={{
                    color: "white",
                    textAlign: "center",
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  Opps...No Data Found
                </h3>
              </div>
              <div className="col-1" style={{ marginTop: 45 }}>
                <img
                  onClick={() => props.history.goBack()}
                  src={Back_Arrow}
                  style={{ maxWidth: "60%", height: "auto", cursor: "pointer" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
