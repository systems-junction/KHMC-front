import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import "./reciever.css";

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

export default function Reciever(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ marginTop: 10 }}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        className={classes.avatar}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      {props.type === "image/jpeg" || props.type === "image/png" ? (
        <Avatar
          variant="rounded"
          className={classes.rounded}
          src={props.recieve}
        />
      ) : props.type === "audio/mp3" ? (
        <audio src={props.recieve} controls="controls" />
      ) : (
        <div
          style={{
            padding: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#f3f3f3",
            maxWidth: "50%",
          }}
        >
          <span>{props.recieve}</span>
          <br />
          <small style={{ fontWeight: 30, fontSize: "60%" }}>
            {props.time}
          </small>
        </div>
      )}
      &nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  );
}
