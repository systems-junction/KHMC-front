import React from "react";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import cookie from "react-cookies";

// import Notification from 'components/Snackbar/Notification.js';

import AddAlert from "@material-ui/icons/AddAlert";

import { Redirect } from "react-router-dom";
import axios from "axios";
import { resetPassword, emailReset } from "../public/endpoins";

import KHMC_White from "../assets/img/KHMC Header LOGO.png";

import Influence_white from "../assets/img/Influence Original.png";
import Header from "../components/Header/Header";

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
      savedEmail: this.props.history.location.state.email,
      savedContent: this.props.history.location.state.content,
    };
  }

  handleInput(e, key) {
    this.setState({ [key]: e.target.value });
  }

  resendEmail = () => {
    const params = {
      email: this.state.savedEmail,
      content: this.state.savedContent,
    };

    console.log("params", params);
    axios
      .post(resetPassword, params)
      .then((res) => {
        if (res.data.data.email) {
          console.log("SUCCESS Resend Email", res.data.data.email);
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
        {/* <Header /> */}
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
        <div
          style={{
            flex: 3.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          class="cPadding"
        >
          <div style={{ marginLeft: "1%", marginRight: "1%" }}>
            {/* <Notification msg={this.state.msg} open={this.state.tr} /> */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <h6
                style={{
                  textAlign: "center",
                  maxWidth: "50%",
                  minWidth: "50%",
                  // fontSize: 20,
                  // fontFamily: 'Ubuntu',
                  color: "white",
                }}
              >
                Please check your email and follow the instructions given in the
                mail
              </h6>
            </div>

            <div
              style={{
                marginTop: "2rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div style={{}}>
                <h4
                  style={{
                    cursor: "pointer",
                    color: "white",
                    textAlign: "center",
                    // fontWeight: '500',
                    // fontFamily: 'Ubuntu'
                  }}
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  Email not received?
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  marginTop: "1.2rem",
                }}
                className="container"
              >
                <Button
                  style={{
                    width: "50%",
                    paddingTop: 12,
                    paddingBottom: 12,
                    backgroundColor: "#002164",
                    borderRadius: 10,
                  }}
                  onClick={this.resendEmail}
                  variant="contained"
                  color="primary"
                >
                  Resend
                </Button>
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  marginTop: "3%",
                }}
                className="container"
              >
                <Button
                  style={{
                    width: "50%",
                    // marginLeft:'40%',
                    // marginRight:'20%',
                    paddingTop: 12,
                    paddingBottom: 12,
                    // backgroundColor: '#1562e8',
                    borderRadius: 10,
                    borderColor: "white",
                    borderWidth: 2,
                    color: "white",
                  }}
                  onClick={() => this.props.history.goBack()}
                  variant="outlined"
                  //   color="outlined"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
