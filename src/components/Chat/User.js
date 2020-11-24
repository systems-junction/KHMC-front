import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
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
  onlineAvatar: {
    border: "2px solid #13D59F",
    height: 60,
    width: 60,
  },
  badgeImage: {
    backgroundColor: "#FF0C0C",
    color: "white",
  },
}));

export default function User(props) {
  const classes = useStyles();

  const [online, setOnline] = useState(props.online);

  return (
    <div
      style={{ marginRight: 30, cursor: "pointer", width: 60 }}
      key={props.key}
      onClick={props.getChatHandler}
    >
      <Badge
        color="primary"
        overlap="circle"
        badgeContent="2"
        classes={{ badge: classes.badgeImage }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          className={online ? classes.onlineAvatar : classes.avatar}
        />
      </Badge>
      <h6 style={{ textAlign: "center", marginTop: 10 }}>{props.name}</h6>
    </div>
  );
}
