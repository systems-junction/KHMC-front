import React from "react";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

// import Notification from 'components/Snackbar/Notification.js';

import AddAlert from "@material-ui/icons/AddAlert";

import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { loginUrl } from "../public/endpoins";

import KHMC_White from "../assets/img/KHMC_White.png";
import Header from "../components/Header/Header";

import Influence_white from "../assets/img/Influence_white.png";
import "../assets/jss/material-dashboard-react/components/TextInputStyle.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      null_userName: false,

      password: "",
      null_password: "",

      tr: false,

      verifiedUser: false,

      msg: "",
    };
  }

  handleInput(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleLogin() {
    if (this.state.userName === "" && this.state.password === "") {
      this.setState({ null_userName: true, null_password: true });
    } else if (this.state.userName === "") {
      this.setState({ null_userName: true });
    } else if (this.state.password === "") {
      this.setState({ null_password: true });
    } else {
      var re = /\S+@\S+\.\S+/;

      if (!re.test(this.state.userName)) {
        this.setState({ tr: true, msg: "Enter the valid email address" });
      } else {
        const params = {
          email: this.state.userName,
          password: this.state.password,
        };

        axios
          .post(loginUrl, params)
          .then((res) => {
            if (res.data.success) {
              console.log(res.data);
              cookie.save("token", res.data.data.token, { path: "/" });
              cookie.save("current_user", res.data.data.user, { path: "/" });
              this.setState({
                verifiedUser: true,
              });
            }
            // else if (!res.data.success) {
            //   this.setState({ tr: true });
            // }
          })
          .catch((e) => {
            console.log("error is ", e);
            this.setState({ tr: true, msg: "Login failed" });
          });
      }
    }
  }

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
        <Header />

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
              Reset Password
            </h1>
            <h6
              style={{
                textAlign: "center",
                maxWidth: "60%",
                minWidth: "50%",
                color: "white",
              }}
            >
              Forgot your password? Just enter your email to gain access
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
                    style={{
                      marginTop: 30,

                      minWidth: "70%",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      name={"email"}
                      value={this.state.userName}
                      onChange={(e) => this.handleInput(e, "userName")}
                      className="textInputStyle"
                      style={{
                        borderColor:
                          !this.state.userName && this.state.null_userName
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
                      width: "70%",
                      paddingTop: 13,
                      paddingBottom: 13,
                      backgroundColor: "#002164",
                      borderRadius: 10,
                    }}
                    onClick={() => this.props.history.push("/emailsendstatus")}
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

export default Login;
