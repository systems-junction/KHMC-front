/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Notification from "../../../components/Snackbar/Notification.js";
import CustomTable from "../../../components/Table/Table";
import axios from "axios";
import {
  getOPRFromRadiologyUrl,
  // getMaterialReceivingUrl
} from "../../../public/endpoins";
import ButtonField from "../../../components/common/Button";
import Loader from "react-loader-spinner";
import Back from "../../../assets/img/Back_Arrow.png";
import Header from "../../../components/Header/Header";
import business_Unit from "../../../assets/img/RR.png";
import "../../../assets/jss/material-dashboard-react/components/loaderStyle.css";
import socketIOClient from "socket.io-client";

const tableHeading = ["MRN", "Request Number", "Date/Time", "Status", "Action"];
const tableDataKeys = [
  ["patientId", "profileNo"],
  "requestNo",
  "createdAt",
  "status",
];

const actions = { view: true };

export default function EDR(props) {
  const [Edr, setEdr] = useState("");
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
    getEDRsData();
    // return () => socket.disconnect();
  }, []);

  function getEDRsData() {
    axios
      .get(getOPRFromRadiologyUrl)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.data, "ecr1");
          res.data.data.map((d) => (d.createdAt = d.patientId.createdAt));
          // res.data.data.map((d) => (d.radiologyRequest = d.radiologyRequest[0]))
          // res.data.data.map((d) => (d.profileNo = d.patientId.profileNo))
          // res.data.data.map((d) => (d.date = d.pharmacyRequest.date))
          // res.data.data.map((d) => (d.status = d.pharmacyRequest.status))
          // res.data.data.map((d) => (d.requestNo = d.pharmacyRequest._id))
          setEdr(res.data.data.reverse());
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

  const addNewItem = () => {
    let path = `opr/add`;
    props.history.push({
      pathname: path,
      state: { comingFor: "add" },
    });
  };

  function handleView(rec) {
    let path = `opr/viewOPR`;
    props.history.push({
      pathname: path,
      state: {
        selectedItem: rec,
        comingFor: "opr",
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
            <img src={business_Unit} />
            <h4>Out Patient</h4>
          </div>
          <div>
            <ButtonField onClick={addNewItem} name="add" />
            {/* <img src={Search} /> */}
          </div>
        </div>

        <div
          style={{
            flex: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Edr !== " " ? (
            <div>
              <div>
                <CustomTable
                  tableData={Edr}
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
            // <div className='LoaderStyle'>
            //   <Loader type='TailSpin' color='red' height={50} width={50} />
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}
