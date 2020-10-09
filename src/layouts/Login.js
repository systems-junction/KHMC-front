import React from "react";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

// import Notification from 'components/Snackbar/Notification.js';

import AddAlert from "@material-ui/icons/AddAlert";

import { Redirect } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { loginUrl, getStaffUrl } from "../public/endpoins";

import KHMC_White from "../assets/img/KHMC LOGO FOR CIRCLE.png";

import Influence_white from "../assets/img/Influence_white.png";

import Splash from "./Splash";

import "../assets/jss/material-dashboard-react/components/TextInputStyle.css";

import Loader from "react-loader-spinner";
import Header from "../components/Header/Header";

import { subscribeUser } from "../subscription";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      null_userName: false,

      password: "123456",
      null_password: "",

      tr: false,

      verifiedUser: false,

      msg: "",
      forgetPassword: false,

      splash: true,

      buttonPressed: false,

      current_user: "",

      systemAdmin: "",
      staffType: "",
      staff: "",
      staffUser: "",
    };
  }

  getStaffTypes(user) {
    axios
      .get(getStaffUrl)
      .then((res) => {
        if (res.data.success) {
          console.log("all staff", res.data.data);

          let userStaff = res.data.data.staff.filter(
            (s) => s._id === user.staffId
          );

          console.log("user staff", userStaff[0]);

          cookie.save("user_staff", userStaff[0], { path: "/" });
          // this.setState({
          //   systemAdmin: res.data.data.systemAdmin,
          //   staffType: res.data.data.staffType,
          //   staff: res.data.data.staff,
          // });

          this.setState({
            verifiedUser: true,
            buttonPressed: false,
            current_user: user,
          });
        } else if (!res.data.success) {
          console.log("error", res);
          // setErrorMsg(res.data.error);
          // setOpenNotification(true);
        }
        return res;
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }

  handleInput(e, key) {
    this.setState({ [key]: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();
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

        this.setState({ buttonPressed: true });
        axios
          .post(loginUrl, params)
          .then((res) => {
            if (res.data.success) {
              console.log("full response", res.data.data);
              this.getStaffTypes(res.data.data.user);
              cookie.save("token", res.data.data.token, { path: "/" });
              cookie.save("current_user", res.data.data.user, { path: "/" });
              subscribeUser(res.data.data.user);

              // this.props.history.push('/home'+ '/'+res.data.data.user.staffTypeId.routeAccess);

              // const jsonResponse = new Response(
              //   JSON.stringify(res.data.data.user),
              //   {
              //     headers: {
              //       "content-type": "application/json",
              //     },
              //   }
              // );

              // window.caches
              //   .open("pwa-task-manager-cache")
              //   .then((cache) => cache.put("data.json", jsonResponse));
            }
            // else if (!res.data.success) {
            //   this.setState({ tr: true });
            // }
          })
          .catch((e) => {
            console.log("error is ", e);
            this.setState({
              tr: true,
              msg: "Login failed",
              buttonPressed: false,
            });
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

    if (cookie.load("current_user")) {
      this.props.history.push("home");
    }
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
            height: "100%",
            position: "absolute",
            width: "100%",
          }}
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
                // fontFamily:"Open Sans"
              }}
            >
              Login
            </h1>
            <h6
              style={{
                textAlign: "center",
                maxWidth: "60%",
                minWidth: "40%",
                color: "white",
              }}
            >
              Please enter username and password
            </h6>
          </div>

          <div style={{ marginLeft: "1%", marginRight: "1%" }}>
            <form onSubmit={(e) => this.handleLogin(e)}>
              {/* <Notification msg={this.state.msg} open={this.state.tr} /> */}

              <div className="container">
                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    className="row"
                    style={{
                      marginTop: 20,
                      width: "55%",
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

                <div
                  className="col-sm-12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div
                    className="row"
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
                          !this.state.password && this.state.null_password
                            ? "red"
                            : "white",
                      }}
                    />

                    <div className="Button" />
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-sm-12"
                    style={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    {!this.state.buttonPressed ? (
                      <div
                        style={{
                          marginTop: 25,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          style={{
                            width: "25%",
                            paddingTop: 12,
                            paddingBottom: 12,
                            backgroundColor: "#002164",
                            borderRadius: 10,
                          }}
                          //onClick={() => this.handleLogin()}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Login
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="row"
                        style={{
                          marginTop: 25,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Loader
                          type="TailSpin"
                          color="white"
                          height={50}
                          width={50}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{}}>
                <h6
                  style={{
                    cursor: "pointer",
                    marginTop: "2%",
                    color: "white",
                    textAlign: "center",
                    // fontWeight: "500",
                  }}
                  onClick={() => this.handleForgetPassword()}
                >
                  Forgot Password?
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
