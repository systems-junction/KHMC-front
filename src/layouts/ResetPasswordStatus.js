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
    };
  }

  handleInput(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleLogin() {
    // if (this.state.userName === '' && this.state.password === '') {
    //   this.setState({ null_userName: true, null_password: true });
    // } else if (this.state.userName === '') {
    //   this.setState({ null_userName: true });
    // } else if (this.state.password === '') {
    //   this.setState({ null_password: true });
    // } else {
    //   var re = /\S+@\S+\.\S+/;
    //   if (!re.test(this.state.userName)) {
    //     this.setState({ tr: true, msg: 'Enter the valid email address' });
    //   } else {
    //     const params = {
    //       email: this.state.userName,
    //       password: this.state.password
    //     };
    //     axios
    //       .post(loginUrl, params)
    //       .then(res => {
    //         if (res.data.success) {
    //           console.log(res.data);
    //           cookie.save('token', res.data.data.token, { path: '/' });
    //           cookie.save('current_user', res.data.data.user, { path: '/' });
    //           this.setState({
    //             verifiedUser: true
    //           });
    //         }
    //         // else if (!res.data.success) {
    //         //   this.setState({ tr: true });
    //         // }
    //       })
    //       .catch(e => {
    //         console.log('error is ', e);
    //         this.setState({ tr: true, msg: 'Login failed' });
    //       });
    //   }
    // }
    // this.props.history.push('/emailsendstatus');
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
                Pleas check your email and follow the instructions given in the
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
                  onClick={() => this.handleLogin()}
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
