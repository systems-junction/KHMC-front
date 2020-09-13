import React from 'react'
import './Header.css'
import KHMC_White from '../../assets/img/KHMC_White.png'
import Influence_white from '../../assets/img/Influence_white.png'
import { Redirect } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import cookie from 'react-cookies'

class Header extends React.Component {
  state = {
    goBack: false,
    hover: false,
    open: false,
    currentUser: '',
  }

  componentDidMount() {
    this.setState({ currentUser: cookie.load('current_user') })
  }

  logoutUser() {
    console.log('called')
    cookie.remove('token', { path: '/' })
    cookie.remove('current_user', { path: '/' })
    cookie.remove('user_staff', { path: '/' })
    window.location.reload()
  }

  render() {
    if (this.state.goBack) {
      var currentLocation = window.location.pathname
      if (currentLocation !== '/home') {
        return <Redirect to={'/home'} />
      }
    }

    return (
      <div className='header'>
        <img
          src={KHMC_White}
          className='header1-style'
          // style={{ maxWidth: '50%', height: 'auto' }}
          onClick={() => {
            return this.setState({ goBack: true })
          }}
        />
        <img
          src={Influence_white}
          className='header2-style'
          style={{
            // maxWidth: '60%',
            // height: 'auto',
            cursor: 'pointer',
            // boxShadow: this.state.hover ? '2px 2px 2px 2px #b2b0b0' : '',
          }}
          // onMouseEnter={() => this.setState({ hover: true })}
          // onMouseLeave={() => this.setState({ hover: false })}
          onClick={() => this.setState({ open: !this.state.open })}
        />

        {this.state.open ? (
          <div
            style={{
              float: 'right',
              width: 300,
              marginRight: 40,
              top: 50,
              right: 0,
              bottom: 0,
              position: 'fixed',
              zIndex: 5,
            }}
          >
            <Card style={{ marginTop: 20 }}>
              <CardContent>
                <Typography
                  // variant="h6"
                  color='textSecondary'
                  gutterBottom
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {this.state.currentUser && this.state.currentUser.name}
                </Typography>

                <Typography
                  // variant="h6"
                  color='textSecondary'
                  // gutterBottom
                  style={{ display: 'flex', justifyContent: 'space-between' }}
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
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={() => this.logoutUser()}
                >
                  Logout
                  <i class='zmdi zmdi-power'></i>
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
        ) : (
          undefined
        )}
      </div>
    )
  }
}

export default Header
