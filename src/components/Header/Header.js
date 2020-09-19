import React from "react";
import "./Header.css";
import KHMC_White from "../../assets/img/KHMC_White.png";
import Influence_white from "../../assets/img/Influence_white.png";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";

import cookie from "react-cookies";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  stylesForButton: {
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: '#2c6ddd',
    width: '140px',
    height: '45px',
    outline: 'none',
  },
  stylesForCancel: {
    color: '#000',
    cursor: 'pointer',
    borderRadius: 5,
    width: '140px',
    height: '45px',
    outline: 'none',
  },
}
class Header extends React.Component {
  state = {
    goBack: false,
    hover: false,
    open: false,
    currentUser: "",
  };

  componentDidMount() {
    this.setState({ currentUser: cookie.load("current_user") });
  }

  handleClickOpen() {
    console.log('====================================')
    console.log('clicked logout')
    console.log('====================================')
    this.setState({ dialogue: true, open: !this.state.open })
  }
  handleClose() {
    this.setState({ dialogue: false })
  }
  logoutUser() {
    console.log("called");
    cookie.remove("token", { path: "/" });
    cookie.remove("current_user", { path: "/" });
    cookie.remove("user_staff", { path: "/" });
    window.location.reload();
  }
  render() {
    if (this.state.goBack) {
      var currentLocation = window.location.pathname;
      if (currentLocation !== "/home") {
        return <Redirect to={"/home"} />;
      }
    }
    return (
      <div className="header">
        <img
          src={KHMC_White}
          className="header1-style"
          // style={{ maxWidth: '50%', height: 'auto' }}
          onClick={() => {
            return this.setState({ goBack: true });
          }}
        />
        <img
          src={Influence_white}
          className="header2-style"
          style={{
            // maxWidth: '60%',
            // height: 'auto',
            cursor: "pointer",
            // boxShadow: this.state.hover ? '2px 2px 2px 2px #b2b0b0' : '',
          }}
          // onMouseEnter={() => this.setState({ hover: true })}
          // onMouseLeave={() => this.setState({ hover: false })}
          onClick={() => this.setState({ open: !this.state.open })}
        />

        {this.state.open ? (
          <div
            style={{
              float: "right",
              width: 300,
              marginRight: 10,
              top: 50,
              right: 0,
              bottom: 0,
              position: "fixed",
              zIndex: 5,
            }}
          >
            <Fade in={this.state.open} timeout={1000}>
              <Card style={{ marginTop: 20 }}>
                <CardContent>
                  <Typography
                    // variant="h6"
                    color="textPrimary"
                    gutterBottom
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {this.state.currentUser && this.state.currentUser.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    // gutterBottom
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {this.state.currentUser &&
                      this.state.currentUser.staffTypeId.type}
                  </Typography>

                  <Typography
                    // variant="h6"
                    color="textSecondary"
                    // gutterBottom
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 13,
                    }}
                  >
                    {this.state.currentUser && this.state.currentUser.email}
                  </Typography>

          {/* {this.state.open ? (
            <div
              style={{
                float: 'right',
                width: 300,
                marginTop: 20,
                marginRight: 10,
                top: 50,
                right: 0,
                bottom: 0,
                position: 'absolute',
                zIndex: 5,
              }}
            >
              <Fade in={this.state.open} timeout={1000}>
                <Card style={{ marginTop: 20 }}>
                  <CardContent style={{ paddingBottom: 0 }}>
                    <Typography
                      // variant="h6"
                      color='textPrimary'
                      gutterBottom
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {this.state.currentUser && this.state.currentUser.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      // gutterBottom
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {this.state.currentUser &&
                        this.state.currentUser.staffTypeId.type}
                    </Typography>
                    <Typography
                      // variant="h6"
                      color='textSecondary'
                      // gutterBottom
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {this.state.currentUser && this.state.currentUser.email}
                    </Typography>
                    <hr />
                    <Typography
                      variant='h6'
                      color='textSecondary'
                      gutterBottom
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        cursor: 'pointer',
                      }}
                      // onClick={() => this.logoutUser()}
                      onClick={() => this.handleClickOpen()}
                    >
                      <img
                        src={InnerLogout}
                        className='logout-style'
                        style={{
                          height: '20px',
                          width: '20px',
                          marginTop: 6,
                        }}
                      />
                      <span style={{ marginLeft: 10 }}>Logout</span>
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Fade>
            </div>
          ) : (
            undefined
          )} */}

                  {/* <Typography
                    variant="h6"
                    color="textSecondary"
                    gutterBottom
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                    onClick={() => this.logoutUser()}
                  >
                    Logout
                    <i class="zmdi zmdi-power"></i>
                  </Typography> */}
                </CardContent>
              </Card>
            </Fade>
          </div>
        ) : (
          undefined
        )}

        {this.state.currentUser ? (
          <div style={{ position: "fixed", right: 30, bottom: 30, zIndex: 5 }}>
            <Fab
              // color="primary"
              aria-label="add"
              onClick={() => this.logoutUser()}
              style={{backgroundColor:'#ba02ed'}}
            >
              {/* <AddIcon /> */}
              <i class="zmdi zmdi-power zmdi-hc-3x" style={{color:'white'}}></i>
            </Fab>
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

export default Header;
