import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import MicRecorder from "mic-recorder-to-mp3";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import SendIcon from "../../assets/img/Send.png";

import Loader from "react-loader-spinner";
import SearchIcon from "../../assets/img/Search (2).png";
import ChatIcon from "../../assets/img/Chat.png";
import Emoji from "../../assets/img/Emoji.png";
import AttachFileIcon from "../../assets/img/Attach.png";
import CameraAltIcon from "../../assets/img/Camera.png";
import Header from "../../components/Header/Header";
import Back_Arrow from "../../assets/img/Back_Arrow.png";
import Badge from "@material-ui/core/Badge";
import io from "socket.io-client";
import WebRTC from "../WebRTC/webRTC";
import {
  createChat,
  uploadsUrl,
  deleteChat,
  uploadChatFile,
  socketUrl,
} from "../../public/endpoins";
import User from "../../components/Chat/User";
import Reciever from "../../components/Chat/Reciever";
import Sender from "../../components/Chat/Sender";
import axios from "axios";
import cookie from "react-cookies";
import Input from "@material-ui/core/Input";
import { DropzoneDialog } from "material-ui-dropzone";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./chat.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
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
    borderRadius: "50%",
  },
  badge: {
    backgroundColor: "#FF0C0C",
    color: "white",
    top: "16px",
    right: "-18px",
  },
  badgeImage: {
    backgroundColor: "#FF0C0C",
    color: "white",
  },
}));

const useStylesForTabs = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    minWidth: 360,
    width: 360,
  },
}));

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Chat(props) {
  const [chat, setChat] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setblobURL] = useState("");
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [sendButton, setSendButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [chatId, setChatId] = useState("");
  const [search, setSearch] = useState("");
  const [emojiStatus, setEmojiStatus] = useState(false);
  const [currentUser] = useState(cookie.load("current_user"));
  const [div, setDiv] = useState(false);
  const [video, setVideo] = useState(false);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const classesForTabs = useStylesForTabs();

  const [onlineUser, setOnlineUser] = useState([
    { name: currentUser.name, id: 1 },
    { name: "Mudassir", id: 2 },
    { name: "Hanan", id: 3 },
    { name: "Saad", id: 4 },
    { name: "Farhan", id: 5 },
    { name: "Noman", id: 6 },
    { name: "Itzaz", id: 7 },
    { name: "Hamza", id: 8 },
    { name: "Bilal", id: 9 },
    { name: "Saqib", id: 10 },
    { name: "Mufasal", id: 11 },
    { name: "Zeeshan", id: 12 },
    { name: "Bilal Ahmed", id: 13 },
    { name: "Mustafa", id: 14 },
    { name: "Saira", id: 15 },
    { name: "John Doe", id: 16 },
    { name: "Kim", id: 17 },
  ]);

  var socket = io(socketUrl);

  useEffect(() => {
    navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          setIsBlocked(false);
        },
        () => {
          console.log("Permission Denied");
          setIsBlocked(true);
        },
      );
  }, []);

  socket.on("chat_receive", (message) => {
    console.log("message before", message.message.sentAt);
    message.message.sentAt = convertTime();
    console.log("message after", message.message);
    let temp = [...chat, message.message];
    onChatRecieved(temp);
  });

  const onChatRecieved = (temp) => {
    setChat(temp);
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    {
      div === true &&
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [chat]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function convertTime() {
    var currentDate = new Date();
    currentDate.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    var convertedDate = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    return convertedDate;
  }

  const sendMessage = () => {
    if (message != "") {
      let objectSendToBackend = {};
      objectSendToBackend.message = message;
      if (currentUser.staffTypeId.type === "Doctor/Physician") {
        objectSendToBackend.sender = currentUser._id;
        objectSendToBackend.receiver = "5f28fbeac179170dfc2b1416";
      } else {
        objectSendToBackend.sender = currentUser._id;
        objectSendToBackend.receiver = "5f4ffff4277ba8b380f2ef3d";
        objectSendToBackend.sentAt = new Date();
      }
      let objectSendToBackend1 = {};
      objectSendToBackend1.chatId = chatId;
      let params = {
        obj1: objectSendToBackend,
        obj2: objectSendToBackend1,
      };
      console.log("objectSendToBackend", params);
      socket.emit("chat_sent", params);
      setMessage("");
      setEmojiStatus(false);
      setSendButton(false);
    }
  };

  const camera = () => {
    console.log("camera");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (file) => {
    setFiles(file);
    console.log("file.type", file[0].type);
    const data = new FormData();
    data.append("file", file[0]);
    axios
      .post(uploadChatFile, data)
      .then((res) => {
        console.log("RES", res.data.filename);
        sendingChatFile(
          `${uploadsUrl}chats/${res.data.filename}`,
          file[0].type,
        );
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
    console.log("files", file);
    setOpen(false);
  };

  const sendingChatFile = (fileUrl, type) => {
    let objectSendToBackend = {};
    objectSendToBackend.message = fileUrl;
    objectSendToBackend.msgType = type;
    if (currentUser.staffTypeId.type === "Doctor/Physician") {
      objectSendToBackend.sender = currentUser._id;
      objectSendToBackend.receiver = "5f28fbeac179170dfc2b1416";
    } else {
      objectSendToBackend.sender = currentUser._id;
      objectSendToBackend.receiver = "5f4ffff4277ba8b380f2ef3d";
    }
    let objectSendToBackend1 = {};
    objectSendToBackend1.chatId = chatId;
    let params = {
      obj1: objectSendToBackend,
      obj2: objectSendToBackend1,
    };
    console.log("objectSendToBackend", params);
    socket.emit("chat_sent", params);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
    setSendButton(true);
    console.log(e);
  };

  const changeEmojiStatus = () => {
    setEmojiStatus((value) => !value);
    console.log("emojiStatus", emojiStatus);
  };

  const onMessageSend = (e) => {
    setMessage(e.target.value);
    if (e.target.value === "") {
      setSendButton(false);
    } else {
      setSendButton(true);
    }
  };

  const searchOnlineUser = (e) => {
    setSearch(e.target.value);
  };

  const RenderUser = (user) => {
    if (
      search !== "" &&
      user.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) === -1
    ) {
      return null;
    } else {
      return (
        <User
          name={user.name}
          online={true}
          getChatHandler={onGetChatHandler}
        />
      );
    }
  };

  const onGetChatHandler = () => {
    setDiv(true);
    var obj = {};
    if (currentUser.staffTypeId.type === "Doctor/Physician") {
      obj.sender = currentUser._id;
      obj.receiver = "5f28fbeac179170dfc2b1416";
    } else {
      obj.sender = currentUser._id;
      obj.receiver = "5f4ffff4277ba8b380f2ef3d";
    }
    axios
      .post(createChat, obj)
      .then((res) => {
        console.log("res", res.data.data);
        setChatId(res.data.data._id);
        var listWithoutTel = res.data.data.chat.map((item) => item);
        changeTime(listWithoutTel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const videoCall = () => {
    props.history.push({
      pathname: "/home/webRTC",
      state: {
        userId: "5f4ffff4277ba8b380f2ef3d",
      },
    });
  };

  function changeTime(chatArr) {
    console.log(chatArr);
    for (var i in chatArr) {
      var currentDate = new Date(chatArr[i].sentAt);
      currentDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      var convertedDate = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
      chatArr[i].sentAt = convertedDate;
    }
    setChat(chatArr);
  }

  const startVoice = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const handleSaveAudio = (file) => {
    const data = new FormData();
    data.append("file", file);
    axios
      .post(uploadChatFile, data)
      .then((res) => {
        console.log("RES", res.data.filename);
        sendingChatFile(`${uploadsUrl}chats/${res.data.filename}`, file.type);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
    console.log("files", file);
    setOpen(false);
  };

  const stopVoice = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log("blob", blob);
        const blobURL = URL.createObjectURL(blob);
        console.log("blob after", blobURL);
        setblobURL(blobURL);
        setIsRecording(false);
        var file = new File([blob], "first", { type: "audio/mp3" });
        handleSaveAudio(file);
      })
      .catch((e) => console.log(e));
  };

  const cancelVoiceNote = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log("cancelled");
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  const handleKeySendMessage = (e) => {
    if (e.key === "Enter") {
      console.log("button pressed inside");
      sendMessage();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(19 213 159)",
        overflowY: "scroll",
      }}
    >
      <Header history={props.history} />

      <div style={{ marginLeft: "26px", paddingRight: 25, marginTop: -550 }}>
        <div className="subheader" style={{ marginLeft: "-10px" }}>
          <div>
            <img src={ChatIcon} />
            <div style={{ flex: 4, display: "flex", alignItems: "center" }}>
              <h4 style={{ color: "white", fontWeight: "700" }}>Chat</h4>
            </div>
          </div>
        </div>

        <div className={classesForTabs.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            TabIndicatorProps={{ style: { background: "#12387a" } }}
            centered
          >
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                fontSize: "large",
                color: value === 0 ? "#12387a" : "#3B988C",
                textTransform: "none",
              }}
              classes={{ root: classesForTabs.tab }}
              label={
                <Badge
                  color="primary"
                  badgeContent="2"
                  classes={{ badge: classes.badge }}
                >
                  Sensei
                </Badge>
              }
            />
            <Tab
              style={{
                color: "white",
                borderRadius: 5,
                outline: "none",
                fontSize: "large",
                color: value === 1 ? "#12387a" : "#3B988C",
                textTransform: "none",
              }}
              classes={{ root: classesForTabs.tab }}
              label={
                <Badge
                  color="primary"
                  badgeContent="2"
                  classes={{ badge: classes.badge }}
                >
                  Paramedics
                </Badge>
              }
            />
          </Tabs>
        </div>
        <div
          className="container-fluid"
          style={{ backgroundColor: "white", marginTop: 20, borderRadius: 5 }}
        >
          <div className="row" style={{ padding: 20 }}>
            <div className="col-md-6">
              <h4 style={{ fontWeight: "bold" }}>All Messages</h4>
            </div>

            <div
              className="col-md-6"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <img style={{ height: 40, width: 40 }} src={SearchIcon} />
              <input
                placeholder="Search Name..."
                style={{ border: "none", marginRight: -35 }}
                onChange={searchOnlineUser}
              />
            </div>
          </div>
          <div className="style-horizontal">
            <div className={classes.root} style={{}}>
              {onlineUser.map((user) => {
                return RenderUser(user);
              })}
            </div>
          </div>
        </div>

        {div ? (
          <div>
            <div
              style={{
                backgroundColor: "white",
                marginTop: 20,
                borderri: 5,
                borderLeft: 5,
                padding: 20,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            >
              <div
                className={classes.root}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    className={classes.avatar}
                  />

                  <div style={{ marginLeft: 20 }}>
                    <h4 style={{ paddingTop: 8 }}>Ingrendia Nutritia</h4>
                    <h4 style={{ color: "#2962CC" }}>Dentist Patients</h4>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "large", fontWeight: 550 }}>05 Min</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: -4,
                    }}
                  >
                    {div ? (
                      <WebRTC userId={"5f4ffff4277ba8b380f2ef3d"} />
                    ) : (
                      undefined
                    )}
                    
                  </div>
                </div>
              </div>
              <hr />
              <div id="wrapper">
                <div class="scrollbar" id="style-vertical">
                  <div class="force-overflow">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="black"
                        style={{
                          backgroundColor: "#edf3f8",
                          borderRadius: 20,
                          textTransform: "none",
                        }}
                      >
                        <span style={{ fontSize: 10 }}>Yesterday</span>
                      </Button>
                    </div>

                    {chat.map((msg) => {
                      return (
                        <div>
                          {msg.sender === currentUser._id ? (
                            <Sender
                              send={msg.message}
                              type={msg.msgType}
                              time={msg.sentAt}
                            />
                          ) : (
                            <Reciever
                              recieve={msg.message}
                              type={msg.msgType}
                              time={msg.sentAt}
                            />
                          )}
                        </div>
                      );
                    })}

                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
            </div>
            <div className="style-emoji">
              {emojiStatus === true ? (
                <Picker onSelect={addEmoji} />
              ) : (
                undefined
              )}
            </div>

            <div
              className={`${classes.root} col-md-12`}
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#e8f0f6",
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}
            >
              <div
                className={`${classes.root} row`}
                style={{
                  marginTop: 20,
                  width: "95%",
                  display: "contents",
                }}
              >
                {!isRecording ? (
                  <Input
                    disableUnderline={true}
                    placeholder="Type a message"
                    inputProps={{ "aria-label": "description" }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      height: 40,
                      backgroundColor: "white",
                      borderRadius: 20,
                      outline: "none",
                      width: "95%",
                    }}
                    className="InputForMessage"
                    value={message}
                    onKeyPress={handleKeySendMessage}
                    onChange={onMessageSend}
                    endAdornment={
                      <InputAdornment position="start">
                        <img
                          className="camera-style"
                          style={{ height: 40, width: 40, cursor: "pointer" }}
                          src={CameraAltIcon}
                          onClick={camera}
                        />
                        <img
                          style={{ height: 40, width: 40, cursor: "pointer" }}
                          src={AttachFileIcon}
                          onClick={handleOpen}
                        />
                        <img
                          style={{ height: 40, width: 40, cursor: "pointer" }}
                          src={Emoji}
                          onClick={changeEmojiStatus}
                        />
                      </InputAdornment>
                    }
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      height: 40,
                      backgroundColor: "white",
                      borderRadius: 20,
                      outline: "none",
                      width: "95%",
                    }}
                  >
                    <Loader
                      type="ThreeDots"
                      color="#13D59F"
                      height={40}
                      width={20}
                      style={{ marginTop: -9 }}
                    />
                    <span
                      style={{
                        paddingLeft: "10px",
                        marginTop: -3,
                        width: 166,
                      }}
                    >
                      Recording your voice
                    </span>

                    <Button
                      style={{
                        marginLeft: 911,
                        height: 7,
                        marginTop: 5,
                        color: "red",
                        textTransform: "none",
                      }}
                      onClick={cancelVoiceNote}
                    >
                      Cancel{" "}
                    </Button>
                  </div>
                )}

                <DropzoneDialog
                  open={open}
                  filesLimit={1}
                  onSave={handleSave}
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleClose}
                />

                {sendButton ? (
                  <img
                    style={{
                      height: 35,
                      width: 35,
                      cursor: "pointer",
                      marginTop: 10,
                    }}
                    src={SendIcon}
                    onClick={sendMessage}
                  />
                ) : (
                  <div>
                    {isRecording ? (
                      <StopIcon
                        style={{ marginTop: 2, cursor: "pointer" }}
                        fontSize="large"
                        onClick={stopVoice}
                        color="secondary"
                      />
                    ) : (
                      <MicIcon
                        style={{
                          marginTop: 3,
                          cursor: "pointer",
                          color: "#13D59F",
                        }}
                        fontSize="large"
                        onClick={startVoice}
                        color="primary"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          undefined
        )}
      </div>

      <div className="col-1" style={{ marginTop: 45, marginLeft: 16 }}>
        <img
          onClick={() => props.history.goBack()}
          src={Back_Arrow}
          style={{ maxWidth: "60%", height: "auto", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
