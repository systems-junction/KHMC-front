import React from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

// import Notification from 'components/Snackbar/Notification.js';

import AddAlert from '@material-ui/icons/AddAlert';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import { loginUrl } from '../public/endpoins';

import KHMC_White from '../assets/img/KHMC_White.png';

import Influence_white from '../assets/img/Influence_white.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      null_userName: false,

      password: '',
      null_password: '',

      tr: false,

      verifiedUser: false,

      msg: ''
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
        this.setState({ tr: false, msg: '' });
      }, 2000);
    }
    if (this.state.verifiedUser) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'fixed',
          width: '100%',
          height: '100%',
          backgroundColor: '#0154E8'
        }}
      >
        <div
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '4%',
            marginRight: '4%'
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
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <p
            style={{
              textAlign: 'center',
              maxWidth: '40%',
              minWidth: '40%',
              fontSize: 20,
              // fontFamily: 'Ubuntu',
              color: 'white'
            }}
          >
            Pleas check your email and follow the instructions to proceed
          </p>
        </div>

        <div
          style={{
            flex: 3.5,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ marginLeft: '1%', marginRight: '1%' }}>
            {/* <Notification msg={this.state.msg} open={this.state.tr} /> */}

            <div
              style={{
                marginTop: '1rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <div style={{}}>
                <h4
                  style={{
                    cursor: 'pointer',
                    marginTop: '5%',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '500',
                    // fontFamily: 'Ubuntu'
                  }}
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  Email received or not?
                </h4>
              </div>
              <div
                style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
                className="container"
              >
                <Button
                  style={{
                    width: '50%',
                    paddingTop: '1%',
                    paddingBottom: '1%',
                    backgroundColor: '#002164',
                    borderRadius: 10
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
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  marginTop: '3%'
                }}
                className="container"
              >
                <Button
                  style={{
                    width: '50%',
                    // marginLeft:'40%',
                    // marginRight:'20%',
                    paddingTop: '1%',
                    paddingBottom: '1%',
                    // backgroundColor: '#1562e8',
                    borderRadius: 10,
                     borderColor:'white', borderWidth:2, color:'white'
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
