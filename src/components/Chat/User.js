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
  
export default function User(props) {
  const classes = useStyles();

    return (
        <div style={{ marginRight: 30   }} key={props.key}>
            <Badge color="primary" overlap="circle" badgeContent="2" classes={{ badge: classes.badgeImage }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  className={classes.avatar}/>
            </Badge>
            <h6 style={{marginLeft: 10}}>{props.name}</h6>
        </div>
    )
}
