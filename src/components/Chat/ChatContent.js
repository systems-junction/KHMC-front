import React, { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Sender from "./Sender";
import Reciever from "./Reciever";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";

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

export default function ChatContent(props) {
  const classes = useStyles();
  const [chat, setChat] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat]);

  return (
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
      <div className={classes.root}>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          className={classes.avatar}
        />
        <div>
          <h4>Ingrendia Nutritia</h4>
          <h4 style={{ color: "#2962CC" }}>Dentist Patients</h4>
        </div>

        <div>
          <h3
            className="time-style"
            style={{ fontSize: "large", fontWeight: 550 }}
          >
            05 Min
          </h3>
        </div>
      </div>
      <hr />
      <div
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          maxHeight: "400px",
          minHeight: "400px",
        }}
      >
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
          console.log("CHAT", msg);
          return (
            <div>
              {msg.sender === props.currentUser._id ? (
                <Sender send={msg.message} />
              ) : (
                <Reciever recieve={msg.message} />
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
