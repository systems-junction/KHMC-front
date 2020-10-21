import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Header from '../../components/Header/Header'
import Back_Arrow from '../../assets/img/Back_Arrow.png'

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
  }
}));

const useStylesForTabs = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}))


export default function Chat(props) {
  const classes = useStyles();
  const classesForTabs = useStylesForTabs()

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
            <h4>Chat</h4>
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
                color: value === 0 ? '#12387a' : '#3B988C',
              }}
              label='Sensie'
            />
            <Tab
              style={{
                color: 'white',
                borderRadius: 5,
                outline: 'none',
                color: value === 1 ? '#12387a' : '#3B988C',
              }}
              label='Paramedics'
            />

          </Tabs>
        </div>
        <div className='container-fluid' style={{ backgroundColor: 'white', marginTop: 20, borderRadius: 5 }}>
          <div className='row' style={{ padding: 20 }}>
            <div className='col-md-6'><h4>All Messages</h4></div>

            <div className='col-md-6' style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SearchIcon style={{ marginTop: 7 }} />
              <input placeholder='Search Name...' style={{ border: 'none' }} />
              {/* <TextField
           label="Search by Name"
        /> */}

            </div>

          </div>
          <div className={classes.root} style={{
            maxWidth: 1300, overflowY: 'hidden',
            overflowX: 'scroll',
          }}>
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
              <h4 style={{ color: 'blue' }}>patinet denstis</h4></div>

            <div style={{ marginLeft: 800 }}>
              <h3>05 Min</h3>
            </div>
          </div>
          <hr />
          <div style={{
            overflowY: 'scroll',
            overflowX: 'hidden', maxHeight: '500px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" style={{ backgroundColor: 'cadetblue', borderRadius: 20 }}>
                <span style={{ fontSize: 10 }}>Yesterday</span>
              </Button>
            </div>
            <div className={classes.root}>

              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <div style={{ backgroundColor: 'beige', width: '50%', overflow: 'hidden', padding: 20, borderRadius: 5 }}>
                <h4>Ingrendfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffjkjllllllllllllllllllllllllllllllllllllllfdfdjfkdsajfdkfjkia Nutritia</h4>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '50%', overflow: 'hidden', padding: 20, borderRadius: 5, backgroundColor: 'aliceblue', }}>
                <h4>Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia Ingrendia Nutrifdfdfdsffsdtia</h4>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div className={classes.root}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
              <div style={{ backgroundColor: 'beige', width: '50%', overflow: 'hidden', padding: 20, borderRadius: 5 }}>
                <h4>Ingrendfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffjkjllllllllllllllllllllllllllllllllllllllfdfdjfkdsajfdkfjkia Nutritia</h4></div>
            </div>
          </div>
        </div>
        <div
          className={`${classes.root} col-md-12`}
          style={{ display: "flex", justifyContent: "center", backgroundColor: 'papayawhip', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
        >
          <div
            className={`${classes.root} row`}

            style={{
              marginTop: 20,
              width: "90%",
              display: 'contents'
            }}
          >
            <input
              type="message"
              placeholder="Type Message"
              name={"message"}
              className="textInputStyle"

            />
            <CameraAltIcon style={{ marginTop: 18 }} />
            <AttachFileIcon style={{ marginTop: 18 }} />
            <SendIcon style={{ marginTop: 18 }} />
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
