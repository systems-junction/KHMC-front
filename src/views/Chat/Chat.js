import React, { useState , useEffect} from 'react';
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
import io from 'socket.io-client';
import { socketUrl} from "../../public/endpoins"
import User from "../../components/Chat/User"
import Reciever from "../../components/Chat/Reciever"
import Sender from "../../components/Chat/Sender"
import _, {debounce} from 'lodash';
import cookie from 'react-cookies'

import {DropzoneDialog} from 'material-ui-dropzone'

import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import "./chat.css"

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
    color: 'white',
    top: "16px",
    right: "-18px"
  },
  badgeImage: {
    backgroundColor: '#FF0C0C',
    color: 'white',
    
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
  const [chat, setChat] = useState([])
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [content, setContent] = useState("")
  const [messageText, setMessageText] = useState("")
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])

  const [search, setSearch] = useState("")

  const [onlineUser, setOnlineUser] = useState([{name: "Izaz", id: 1}, {name: "Mudassir", id: 2}, {name: "Hanan", id: 3}, {name: "Saad", id: 4}, {name:"Farhan", id: 5}, {name:"Noman", id: 6}, {name:"Itzaz", id: 7}, {name:"Hamza", id: 8}, {name:"Bilal", id: 9},  {name:"Saqib", id: 10} ,  {name:"Mufasal", id: 11},  {name:"Zeeshan", id: 12} ,  {name:"Bilal Ahmed", id: 13},  {name:"Mustafa", id: 14},  {name:"Saira", id: 15} , {name:"John Doe", id: 16} ,  {name:"Kim", id: 17}])
  const [socket, setSocket] =  useState("")
  const [name, setName] = useState("")
  const [messageError, setMessageError] = useState(false)
  const [emojiStatus, setEmojiStatus] = useState(false)
  const [currentUser] = useState(cookie.load('current_user'))
  const classes = useStyles();
  const classesForTabs = useStylesForTabs()
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;

  const [value, setValue] = React.useState(0)

  useEffect(() => {

   
  })
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const sendMessage = () => {
    let socket = io(socketUrl)
    if(message != ""){
      let objectSendToBackend = {}
      objectSendToBackend.message = message
      objectSendToBackend.sender = currentUser._id
      objectSendToBackend.receiver = "5ecf686f085c54292cb29c53"
      console.log("objectSendToBackend", objectSendToBackend)
      socket.emit('test', objectSendToBackend);
    }else{
      setMessageError(true)
    }
   
  
  }
  const uploadFile = () => {
    console.log("upload file");
  }
  const camera = () => {
    console.log("camera")
  }

 const handleClose = () => {
   setOpen(false)
}

const  handleSave = (file) => {
    //Saving files to state for further use and closing Modal.
    setFiles(file)
    console.log(file)
    setOpen(false)
}

const  handleOpen = () => {
   setOpen(true)
}

  const  addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codesArray)
    setMessage(
       message + emoji
    )
    console.log(e)
  }
  const changeEmojiStatus = () => {
    setEmojiStatus(true)
  }
  const onMessageSend = (e) => {
    setMessage(e.target.value)
  }

  const searchOnlineUser = (e) => {
  //   var target = e.target.value.trim().toLowerCase();
  //   var o = onlineUser
  //   console.log("before", o)
  //  o =  onlineUser.filter(o=>{
  //     return o.name === target
  //   })

  // //  o = _.sortBy(o, o => o.name === target);
  //  setOnlineUser(o)
  //  console.log("after",o)

  setSearch(e.target.value)

  }

  const RenderUser = user => {
    if(search !== "" && user.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) === -1){
      return null
    }
    else {
      return (
        <User name={user.name}/>
      )
    }
    
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
      <Header history={props.history} /> 
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
              label={<Badge color="primary" badgeContent="2" classes={{ badge: classes.badge }}>Sensei</Badge>}
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
              label={<Badge color="primary" badgeContent="2" classes={{ badge: classes.badge }}

              >Paramedics</Badge>}
            />

          </Tabs>
        </div>
        <div className='container-fluid' style={{ backgroundColor: 'white', marginTop: 20, borderRadius: 5 }}>
          <div className='row' style={{ padding: 20 }}>
            <div className='col-md-6'><h4 style={{ fontWeight: 'bold', }}>All Messages</h4></div>

            <div className='col-md-6' style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <img style={{ height: 40, width: 40 }} src={SearchIcon} />
              <input placeholder='Search Name...' style={{ border: 'none', marginRight: -35 }} onChange={searchOnlineUser}/>
            </div>

          </div>
          <div className={classes.root} style={{
            maxWidth: 1300, overflowY: 'hidden',
            overflowX: 'scroll',
          }}>
            {onlineUser.map(user=>{
              return RenderUser(user)
            })}           
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

            <Reciever recieve="This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message"/>
            <Sender send="This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message This is reciever message"/>          
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
            <TextField
              label='Type Message'
              className='textInputStyle'
              id="outlined-size-small"
              variant="outlined"
              onChange={onMessageSend}
              error={messageError}
              size="small"
              value={message}
              style={{ backgroundColor: 'white', borderRadius: 20, outline: 'none' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <img style={{ height: 40, width: 40 , cursor: "pointer"}} src={CameraAltIcon} onClick={camera}/>
                    <img style={{ height: 40, width: 40 , cursor: "pointer"}} src={AttachFileIcon} onClick={handleOpen}/>
                    {emojiStatus === false ? <img style={{ height: 40, width: 40 , cursor: "pointer"}} src={Emoji} onClick={changeEmojiStatus}/> : <Picker onSelect={addEmoji}/>}

                  </InputAdornment>
                )
              }}

            />

          <DropzoneDialog
              open={open}
              onSave={handleSave}
              // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={handleClose}
          />
            <img style={{ height: 40, width: 40 , cursor: "pointer"}} src={SendIcon} onClick={sendMessage}/>
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
