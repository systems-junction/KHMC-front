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
            Reset Password
          </h1>
          <p
            style={{
              textAlign: "center",
              maxWidth: "50%",
              minWidth: "50%",
              fontSize: 20,
              color: "white",
            }}
          >
            You forgot your passowrd? No problem just add your email address to
            get it back
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
              <div className="row">
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    style={{
                      marginTop: 40,
                      backgroundColor: "white",
                      borderRadius: 10,
                      minWidth: "70%",
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  >
                    <TextField
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                      label="Email address"
                      fullWidth
                      // variant="outlined"
                      value={this.state.userName}
                      onChange={(e) => this.handleInput(e, "userName")}
                      error={!this.state.userName && this.state.null_userName}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container" style={{marginTop:'5%'}}>
              <div className="row">
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    style={{
                      width: "70%",
                      paddingTop: "1%",
                      paddingBottom: "1%",
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
              <h4
                style={{
                  cursor: "pointer",
                  marginTop: "5%",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "500",
                }}
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                Have an account? Login
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
