import React from "react";
import "./Header.css";
import KHMC_White from "../../assets/img/KHMC Header LOGO.png";
import Influence_white from "../../assets/img/Influence Original.png";
import { Redirect} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import cookie from "react-cookies";
import Fab from "@material-ui/core/Fab";
import NotifyMe from './NotificationTray';
import { socketUrl } from '../../public/endpoins';
import socketIOClient from 'socket.io-client'

class Header extends React.Component 
{
  constructor(props) {
    super(props);
    this.state = {
      goBack: false,
      hover: false,
      open: false,
      currentUser: "",
      data: [],
    };
  }

  componentDidMount() 
  {
    const loggedUser = cookie.load("current_user")
    this.setState({ currentUser: loggedUser});

    const socket = socketIOClient(socketUrl);

    socket.on("get_data", (data) => {
      console.log("response through socket", data);

      let notifyData = []
      for(let i=0; i < data.length; i++)
      {
        var checkId = data[i].sendTo
        for (let j=0; j < checkId.length; j++)
        { 
          if(checkId[j].userId === loggedUser._id)
          {
            notifyData.push(data[i])
          }
        }
      }
      console.log("After checking User's Notifications",notifyData)
      this.setState({ data: notifyData });
    });
  }

  handleClickOpen() {
    this.setState({ dialogue: true, open: !this.state.open });
  }

  handleClose() {
    this.setState({ dialogue: false });
  }

  logoutUser() {
    cookie.remove("token", { path: "/" });
    cookie.remove("current_user", { path: "/" });
    cookie.remove("user_staff", { path: "/" });
    window.location.reload();
  }

  render() {
    const {history} = this.props

    if (this.state.goBack) {
      var currentLocation = window.location.pathname;
      if (currentLocation !== "/home") {
        return <Redirect to={"/home"} />;
      }
    }

    return (
      <div className="header" style={{ marginBottom: 150 }}>
        <img
          src={KHMC_White}
          className="header1-style mr-auto p-2"
          onClick={() => {
            return this.setState({ goBack: true });
          }}
        />
        <NotifyMe
          data={this.state.data}
          onNotificationIconClick={()=>history.push({
                            pathname: '/home/notificationCenter',
                            state: {
                              notificationData : this.state.data
                            },
                          })
                        }
          storageKey='notific_key'
          notific_key='timestamp'
          sortedByKey={false}
          showDate={true}
          size={35}
          color="white"
        />
        <img
          src={Influence_white}
          className="header2-style"
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
              top: 35,
              right: 0,
              bottom: 0,
              position: "fixed",
              zIndex: 5,
            }}
          >
            <Fade in={this.state.open} timeout={1000}>
              <Card style={{ marginTop: 40 }}>
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
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {this.state.currentUser &&
                      this.state.currentUser.staffTypeId.type}
                  </Typography>

                  <Typography
                    color="textSecondary"
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
          <div style={{ position: "fixed", right: 35, bottom: 45, zIndex: 5 }}>
            <Fab
              // color="primary"
              aria-label="add"
              onClick={() => this.logoutUser()}
              style={{ backgroundColor: "#ba02ed", outline: "none" }}
            >
              {/* <AddIcon /> */}
              <i
                className="zmdi zmdi-power zmdi-hc-3x"
                style={{ color: "white" }}
              ></i>
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
