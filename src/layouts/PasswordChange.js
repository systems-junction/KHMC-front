import React from "react";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

// import Notification from 'components/Snackbar/Notification.js';

import AddAlert from "@material-ui/icons/AddAlert";
import KHMC_White from "../assets/img/KHMC Header LOGO.png";

import Influence_white from "../assets/img/Influence Original.png";
import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { resetPassword, changePassword } from "../public/endpoins";
import jwt_decode from "jwt-decode";

import Header from "../components/Header/Header";

import "../assets/jss/material-dashboard-react/components/TextInputStyle.css";

class PasswordChange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      null_userName: false,

      password: "",
      passwordConfirm: "",
      null_password: "",

      tr: false,

      verifiedUser: false,

      msg: "",
    };
  }

  handleInput(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleResetPassword = () => {
    var token = this.props.match.params.email;
    console.log("token", token);
    var decoded = jwt_decode(token);
    console.log("decoded", decoded.email_token);

    const params = {
      email: decoded.email_token,
      password: this.state.password,
    };

    console.log("params", params);

    axios
      .post(changePassword, params)
      .then((res) => {
        if (res) {
          console.log(res);
          // console.log("SUCCESS", res.data.data.email);
          // this.props.history.push("/emailsendstatus");
          // console.log(res.data);
          // cookie.save("emailSaved", res.data.data.email, {
          //   path: "/emailsendstatus",
          // });
          // cookie.save("current_user", res.data.data.user, { path: "/" });
          // this.setState({
          //   verifiedUser: true,
          // });
          this.props.history.push("/login");
        } else {
          this.props.history.push("/");
        }
      })
      .catch((e) => {
        console.log("error is ", e);
        this.setState({ tr: true, msg: "Login failed" });
      });
  };

  handleNameChange(name) {
    this.setState({ name });
  }

  render() {
    if (this.state.tr) {
      setTimeout(() => {
        this.setState({ tr: false, msg: "" });
      }, 2000);
    }
    if (this.state.verifiedUser) {
      return <Redirect to="/admin/dashboard" />;
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
          backgroundColor: "#0154E8",
        }}
      >
        <div className="header">
          <img
            src={KHMC_White}
            className="header1-style"
            // style={{ maxWidth: "160px", height: "35px" }}
            // onClick={() => {
            //   return this.setState({ goBack: true });
            // }}
          />{" "}
          {/* <h4
            className='header1-style'
            style={{ color: 'white', fontWeight: 'bold' }}
            onClick={() => {
              return this.setState({ goBack: true })
            }}
          >
            KHMC Logo
          </h4> */}
          <img
            src={Influence_white}
            className="header2-style"
            style={{
              // maxWidth: "160px",
              // height: "35px",
              cursor: "pointer",
              // boxShadow: this.state.hover ? '2px 2px 2px 2px #b2b0b0' : '',
            }}
            // onMouseEnter={() => this.setState({ hover: true })}
            // onMouseLeave={() => this.setState({ hover: false })}
            // onClick={() => this.setState({ open: !this.state.open })}
          />
        </div>
        {/* <Header /> */}
        <div
          style={{
            // flex: 7,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
          class="cPadding"
        >
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "700",
              }}
            >
              Change Password
            </h1>
            <h6
              style={{
                textAlign: "center",
                maxWidth: "60%",
                minWidth: "50%",
                color: "white",
              }}
            >
              Please enter your passwords
            </h6>
          </div>

          <div style={{ marginLeft: "1%", marginRight: "1%" }}>
            {/* <Notification msg={this.state.msg} open={this.state.tr} /> */}

            <div className="container">
              <div className="row">
                <div
                  className="col-sm-12"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="row inputForLogin"
                    style={{
                      marginTop: 25,
                      width: "55%",
                    }}
                  >
                    <input
                      type="password"
                      placeholder="Password"
                      name={"password"}
                      value={this.state.password}
                      onChange={(e) => this.handleInput(e, "password")}
                      className="textInputStyle"
                      style={{
                        borderColor:
                          !this.state.email && this.state.null_userName
                            ? "red"
                            : "white",
                      }}
                    />
                  </div>
                  <div
                    className="row inputForLogin"
                    style={{
                      marginTop: 25,
                      width: "55%",
                    }}
                  >
                    <input
                      type="password"
                      placeholder="Password Confirm"
                      name={"passwordConfirm"}
                      value={this.state.passwordConfirm}
                      onChange={(e) => this.handleInput(e, "passwordConfirm")}
                      className="textInputStyle"
                      style={{
                        borderColor:
                          !this.state.email && this.state.null_userName
                            ? "red"
                            : "white",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container" style={{ marginTop: 30 }}>
              <div className="row">
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    style={{
                      width: "25%",
                      paddingTop: 13,
                      paddingBottom: 13,
                      backgroundColor: "#002164",
                      borderRadius: 10,
                    }}
                    onClick={this.handleResetPassword}
                    variant="contained"
                    color="primary"
                  >
                    Submitt
                  </Button>
                </div>
              </div>
            </div>

            <div style={{}}>
              <h6
                style={{
                  cursor: "pointer",
                  marginTop: 15,
                  color: "white",
                  textAlign: "center",
                }}
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                Have an account? Login
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordChange;
