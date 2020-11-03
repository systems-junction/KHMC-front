import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./sender.css";

import { makeStyles, withStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    height: 60,
    width: 60,
  },
  badgeImage: {
    backgroundColor: "#FF0C0C",
    color: "white",
  },
  rounded: {
    color: "#fff",
    width: "8%",
    height: "8%",
  },
}));

export default function Sender(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
    >
      {props.type === "image/jpeg" || props.type === "image/png" ? (
        <Avatar
          variant="rounded"
          className={classes.rounded}
          src={props.send}
        />
      ) : props.type === "audio/mp3" ? (
        <audio src={props.send} controls="controls" />
      ) : (
        <div
          style={{
            padding: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#e8f0f6",
            maxWidth: "50%",
          }}
        >
          <span>{props.send}</span>
          <br />
          <small style={{ fontWeight: 30, fontSize: "60%" }}>
            {props.time}
          </small>
        </div>
      )}
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        className={classes.avatar}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  );
}
