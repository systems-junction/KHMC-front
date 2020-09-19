import React from 'react'
import './Header.css'
import KHMC_White from '../../assets/img/KHMC_White.png'
import Influence_white from '../../assets/img/Influence_white.png'
import Logout from '../../assets/img/Logout_Blue (1).png'
import Bar from '../../assets/img/Bar.png'
import InnerLogout from '../../assets/img/Logout_Grey (1).png'
import { Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import cookie from 'react-cookies'

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
    currentUser: '',
    dialogue: false,
  }
  componentDidMount() {
    this.setState({ currentUser: cookie.load('current_user') })
    console.log('user', this.currentUser)
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
      <>
        <div className='header'>
          <img
            src={KHMC_White}
            className='header1-style'
            // style={{ maxWidth: '50%', height: 'auto' }}
            onClick={() => {
              return this.setState({ goBack: true })
            }}
          />
          <div style={{ textAlign: 'right' }}>
            <img
              src={Influence_white}
              className='header2-style'
              style={
                {
                  // maxWidth: '60%',
                  // height: 'auto',
                  // cursor: 'pointer',
                  // boxShadow: this.state.hover ? '2px 2px 2px 2px #B2B0B0' : '',
                }
              }
              // onMouseEnter={() => this.setState({ hover: true })}
              // onMouseLeave={() => this.setState({ hover: false })}
              // onClick={() => this.setState({ open: !this.state.open })}
            />
            {this.state.currentUser !== undefined ? (
              <>
                <img
                  src={Bar}
                  // className='header2-style'
                  style={{
                    maxWidth: '40%',
                    height: '52%',
                    marginLeft: 5,
                    marginTop: -5,
                  }}
                />

                <img
                  src={Logout}
                  // className='header2-style'
                  style={{
                    cursor: 'pointer',
                    maxWidth: '30%',
                    height: '30%',
                    marginTop: -5,
                  }}
                  onClick={() => this.setState({ open: !this.state.open })}
                />
              </>
            ) : (
              undefined
            )}
          </div>

          {this.state.open ? (
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
          )}
        </div>

        <div>
          <Dialog
            open={this.state.dialogue}
            onClose={() => this.handleClose()}
            fullWidth={true}
            maxWidth={'md'}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            {/* <DialogTitle id='alert-dialog-title'>
              {'Do you want to logout?'}
            </DialogTitle> */}
            <DialogContent style={{ paddingTop: '60px' }}>
              <DialogContentText id='alert-dialog-description'>
                <h4 style={{ textAlign: 'center', color: '#000' }}>
                  <strong>Do you want to logout ?</strong>
                </h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                justifyContent: 'center',
                paddingBottom: '60px',
                marginTop: '25px',
              }}
            >
              <Button
                onClick={() => this.handleClose()}
                style={styles.stylesForCancel}
                variant='contained'
                color='default'
              >
                <strong>Cancel</strong>
              </Button>
              <Button
                onClick={() => this.logoutUser()}
                // color='primary'
                // autoFocus
                style={styles.stylesForButton}
                variant='contained'
                color='default'
              >
                <strong>Logout</strong>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    )
  }
}
export default Header
