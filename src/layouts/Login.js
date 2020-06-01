import React from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import Snackbar from 'components/Snackbar/Snackbar';
import Notification from 'components/Snackbar/Notification.js';

import AddAlert from '@material-ui/icons/AddAlert';

import { Redirect } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import { loginUrl } from '../public/endpoins';

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
    if (this.state.userName === '' && this.state.password === '') {
      this.setState({ null_userName: true, null_password: true });
    } else if (this.state.userName === '') {
      this.setState({ null_userName: true });
    } else if (this.state.password === '') {
      this.setState({ null_password: true });
    } else {
      var re = /\S+@\S+\.\S+/;

      if (!re.test(this.state.userName)) {
        this.setState({ tr: true, msg: 'Enter the valid email address' });
      } else {
        const params = {
          email: this.state.userName,
          password: this.state.password
        };
        
        axios
          .post(loginUrl, params)
          .then(res => {
            if (res.data.success) {
              console.log(res.data);
              cookie.save('token', res.data.data.token, { path: '/' });
              cookie.save('current_user', res.data.data.user, { path: '/' });
              this.setState({
                verifiedUser: true
              });
            }
            // else if (!res.data.success) {
            //   this.setState({ tr: true });
            // }
          })
          .catch(e => {
            console.log('error is ', e);
            this.setState({ tr: true, msg: 'Login failed' });
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
        this.setState({ tr: false, msg: '' });
      }, 2000);
    }
    if(this.state.verifiedUser){
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'fixed',
          height: '100%',
          width: '100%'
        }}
      >
        <Card
          style={{
            width: '70%',
            paddingRight: '5%',
            paddingLeft: '5%',
            height: '65%',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div style={{}}>
            <h1
              style={{
                textAlign: 'center',
                fontFamily: 'Ubuntu',
                fontWeight: '500'
              }}
            >
              Login
            </h1>

            {/* <Snackbar
              place="tr"
              color="danger"
              icon={AddAlert}
              message="Please enter a valid user name and password"
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            /> */}

            <Notification msg={this.state.msg} open={this.state.tr} />

            <TextField
              fullWidth
              label="User Name"
              variant="outlined"
              value={this.state.userName}
              onChange={e => this.handleInput(e, 'userName')}
              error={!this.state.userName && this.state.null_userName}
            />

            <div style={{ marginTop: '15px' }}>
              <TextField
                type="password"
                fullWidth
                label="Password"
                variant="outlined"
                value={this.state.password}
                onChange={e => this.handleInput(e, 'password')}
                error={!this.state.password && this.state.null_password}
              />
            </div>

            <div
              style={{
                marginTop: '15px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Button
                style={{
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  paddingTop: '1%',
                  paddingBottom: '1%'
                }}
                onClick={() => this.handleLogin()}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>

            <div style={{ float: 'right' }}>
              <h4
                style={{
                  cursor: 'pointer',
                  marginTop: 10
                }}
              >
                Sign Up
              </h4>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Login;
