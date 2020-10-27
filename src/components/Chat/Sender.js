import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import FileViewer from 'react-file-viewer';

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

export default function Sender(props) {
    const classes = useStyles();

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end',  marginTop: 20 }} >
                <div style={{ padding: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#e8f0f6', maxWidth: '50%' }}>
                    {props.type === "application/pdf" ? 
                       <FileViewer
                       fileType={"pdf" || "csv" || "xslx" || "docx" || "png" || "jpeg" || "gif" || "bmp" || "mp4" || "webm" || "mp3"}
                       filePath={props.send}
                       /> : <span>{props.send}</span>
                    } 
                    
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    )
}
