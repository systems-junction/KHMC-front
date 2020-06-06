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

import Influence_white from "../assets/img/Influence_white.png";

import Splash from "./Splash";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "saqibkhan7866@gmail.com",
      null_userName: false,

      password: "123456",
      null_password: "",

      tr: false,

      verifiedUser: false,

      msg: "",
      forgetPassword: false,

      splash: true,
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

  handleForgetPassword() {
    this.props.history.push("/forgetpassword");
  }

  hideSplash() {
    this.setState({ splash: false });
  }

  render() {
    if (this.state.tr) {
      setTimeout(() => {
        this.setState({ tr: false, msg: "" });
      }, 2000);
    }
    if (this.state.verifiedUser) {
      // return <Redirect to="/admin/dashboard" />;
      return <Redirect to="home" />;
    }

    if (this.state.splash) {
      return <Splash hideSplash={this.hideSplash.bind(this)} />;
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
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            marginLeft: "5%",
            marginRight: "5%",
            // backgroundColor: 'red'
          }}
        >
          <div style={{ flex: 1, display: "flex" }}>
            <img src={KHMC_White} style={{ maxWidth: "50%", height: "auto" }} />
          </div>
          <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
            <img
              src={Influence_white}
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
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
            Login
          </h1>
          <p
            style={{
              textAlign: "center",
              maxWidth: "40%",
              minWidth: "40%",
              fontSize: 20,
              color: "white",
            }}
          >
            Please enter your username and password to access the features
          </p>
        </div>

        <div
          style={{
            flex: 3.5,
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
          }}
        >
          <div style={{ marginLeft: "1%", marginRight: "1%" }}>
            {/* <Notification msg={this.state.msg} open={this.state.tr} /> */}

            <div className="container">
              <div
                className="col-sm-12"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="row"
                  style={{
                    marginTop: 40,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "75%",
                  }}
                >
                  <TextField
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                    fullWidth
                    label="User Name"
                    // variant="outlined"
                    value={this.state.userName}
                    onChange={(e) => this.handleInput(e, "userName")}
                    error={!this.state.userName && this.state.null_userName}
                  />
                </div>
              </div>

              <div
                className="col-sm-12"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="row"
                  style={{
                    marginTop: 40,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "75%",
                  }}
                >
                  <TextField
                    style={{
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                    type="password"
                    fullWidth
                    label="Password"
                    // variant="outlined"
                    color="secondary"
                    value={this.state.password}
                    onChange={(e) => this.handleInput(e, "password")}
                    error={!this.state.password && this.state.null_password}
                  />
                </div>
              </div>

              <div
                className="col-sm-12"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="row"
                  style={{
                    marginTop: 40,
                    width: "75%",
                  }}
                >
                  <div style={{}} className="container">
                    <Button
                      style={{
                        width: "100%",
                        paddingTop: "2%",
                        paddingBottom: "2%",
                        backgroundColor: "#002164",
                        borderRadius: 10,
                      }}
                      onClick={() => this.handleLogin()}
                      variant="contained"
                      color="primary"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{}}>
              <h5
                style={{
                  cursor: "pointer",
                  marginTop: "3%",
                  color: "white",
                  textAlign: "center",
                  // fontWeight: "500",
                }}
                onClick={() => this.handleForgetPassword()}
              >
                Forgot Password?
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
