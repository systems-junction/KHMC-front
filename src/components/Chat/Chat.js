import React, { useState } from 'react';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField'
import Tabs from '@material-ui/core/Tabs'
import InputAdornment from '@material-ui/core/InputAdornment'
import clsx from 'clsx';
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import SendIcon from '../../assets/img/Send.png';
import SearchIcon from '../../assets/img/Search (2).png';
import ChatIcon from '../../assets/img/Chat.png';
import Emoji from '../../assets/img/Emoji.png';
import AttachFileIcon from '../../assets/img/Attach.png';
import CameraAltIcon from '../../assets/img/Camera.png';
import Header from '../../components/Header/Header'
import Back_Arrow from '../../assets/img/Back_Arrow.png'
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  avatar: {
    height: 80,
    width: 80,
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
  badge: {
    backgroundColor: '#FF0C0C',
    color: 'white'
  }
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);


const useStylesForTabs = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    minWidth: 360, // a number of your choice
    width: 360, // a number of your choice
  }
}))


export default function Chat(props) {
  const classes = useStyles();
  const classesForTabs = useStylesForTabs()
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
        backgroundColor: 'rgb(19 213 159)',
        overflowY: 'scroll',
      }}
    >
      <Header />
      <div className='cPadding'>
        <div className='subheader' style={{ marginLeft: '-10px' }}>
          <div>
            <img src={ChatIcon} />
            <div style={{ flex: 4, display: 'flex', alignItems: 'center' }}>
              <h4 style={{ color: 'white', fontWeight: '700' }}>Chat</h4>
            </div>
          </div>
        </div>

        <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='primary'
            TabIndicatorProps={{ style: { background: '#12387a' } }}
            centered
          >
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                fontSize: 'large',
                color: value === 0 ? '#12387a' : '#3B988C',
                textTransform: 'none'
              }}
              classes={{ root: classesForTabs.tab }}
              label={<Badge classes={{ badge: classes.badge }} badgeContent="2">Sensei</Badge>}
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                fontSize: 'large',
                color: value === 1 ? '#12387a' : '#3B988C',
                textTransform: 'none'
              }}
              classes={{ root: classesForTabs.tab }}
              label={<Badge classes={{ badge: classes.badge }} badgeContent="2">Paramedics</Badge>}
            />

          </Tabs>
        </div>
        <div className='container-fluid' style={{ backgroundColor: 'white', marginTop: 20, borderRadius: 5 }}>
          <div className='row' style={{ padding: 20 }}>
            <div className='col-md-6'><h4 style={{ fontWeight: 'bold', }}>All Messages</h4></div>

            <div className='col-md-6' style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <img style={{ height: 40, width: 40 }} src={SearchIcon} />
              {/* <input placeholder='Search Name...' style={{ border: 'none', marginRight: -35 }} /> */}
              <FormControl className={classes.margin}>
                <BootstrapInput placeholder='Search Name...'
                  // defaultValue="data"
                  id="bootstrap-input"
                />
              </FormControl>

            </div>

          </div>
          <div className={classes.root} style={{
            maxWidth: 1300, overflowY: 'hidden',
            overflowX: 'scroll',
          }}>
            <div>

              <Badge classes={{ badge: classes.badge }} overlap="circle" badgeContent="2">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              </Badge>
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
            <div>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <h4>name</h4>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white', marginTop: 20, borderri: 5, borderLeft: 5, padding: 20,
          borderTopLeftRadius: 5, borderTopRightRadius: 5
        }}>
          <div className={classes.root}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
            <div><h4>Ingrendia Nutritia</h4>
              <h4 style={{ color: '#2962CC' }}>Dentist Patients</h4></div>

            <div style={{ marginLeft: 865, }}>
              <h3 style={{ fontSize: 'large', fontWeight: 550 }}>05 Min</h3>
            </div>
          </div>
          <hr />
          <div style={{
            overflowY: 'scroll',
            overflowX: 'hidden', maxHeight: '500px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="black" style={{ backgroundColor: '#edf3f8', borderRadius: 20, textTransform: 'none' }}>
                <span style={{ fontSize: 10, }}>Yesterday</span>
              </Button>
            </div>

            <div className={classes.root} style={{ marginTop: 10 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <div style={{ padding: 20, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#f3f3f3', width: '50%' }}>
                <span>Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ padding: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#e8f0f6', width: '50%' }}>
                <span>Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div className={classes.root}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <div style={{ padding: 20, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#f3f3f3', width: '50%' }}>
                <span>Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${classes.root} col-md-12`}
          style={{ display: "flex", justifyContent: "center", backgroundColor: '#e8f0f6', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
        >
          <div
            className={`${classes.root} row`}

            style={{
              marginTop: 20,
              width: "90%",
              display: 'contents',
            }}
          >
            {/* <FormControl className={classes.margin}>

              <BootstrapInput defaultValue="Type Message" id="bootstrap-input"
                endAdornment={
                  <InputAdornment position="start">
                    <img style={{ height: 40, width: 40 }} src={CameraAltIcon} />
                    <img style={{ height: 40, width: 40 }} src={AttachFileIcon} />
                    <img style={{ height: 40, width: 40 }} src={Emoji} />

                  </InputAdornment>
                }
                style={{ ouline: 'none' }}
              />
            </FormControl> */}

            <TextField
              label='Type Message'
              className='textInputStyle'
              id="outlined-size-small"
              variant="outlined"
              size="small"
              style={{ backgroundColor: 'white', borderRadius: 20, outline: 'none' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <img style={{ height: 40, width: 40 }} src={CameraAltIcon} />
                    <img style={{ height: 40, width: 40 }} src={AttachFileIcon} />
                    <img style={{ height: 40, width: 40 }} src={Emoji} />

                  </InputAdornment>
                )
              }}

            />

            <img style={{ height: 40, width: 40 }} src={SendIcon} />
          </div>
        </div>
      </div>
      <div className='col-1' style={{ marginTop: 45 }}>
        <img
          onClick={() => props.history.goBack()}
          src={Back_Arrow}
          style={{ maxWidth: '60%', height: 'auto', cursor: 'pointer' }}
        />
      </div>



    </div>
  )
}
