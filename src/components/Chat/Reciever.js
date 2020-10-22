import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    }, 
    avatar: {
      height: 60,
      width: 60,
    },
    badgeImage: {
      backgroundColor: '#FF0C0C',
      color: 'white',
      
    }
  }));
export default function Reciever(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ marginTop: 20 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
            <div style={{ padding: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#f3f3f3', maxWidth: '50%' }}>
                <span>{props.recieve}</span>
            </div>
        </div>
    )
}
