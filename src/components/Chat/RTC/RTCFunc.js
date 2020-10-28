import React, { Component } from 'react'
import AgoraRTC from 'agora-rtc-sdk';

var rtc;
var option;
var divId;


export default class RTCFunc extends Component {


  componentDidMount() {
    this.join()
  }
  
    leave = () =>
    {
        // Leave the channel
    rtc.client.leave( () => {
        // Stop playing the local stream
        rtc.localStream.stop();
        // Close the local stream
        rtc.localStream.close();
        // Stop playing the remote streams and remove the views
        while (rtc.remoteStreams.length > 0) {
          var stream = rtc.remoteStreams.shift();
          var id = stream.getId();
          stream.stop();
        //   removeView(id);
        }
        console.log("client leaves channel success");
      }, (err) => {
        console.log("channel leave failed");
        // console.error(err);
      })
  }







  join = () =>{
    rtc = {
        client: null,
        joined: false,
        published: false,
        localStream: null,
        remoteStreams: [],
        params: {}
    };
    // Options for joining a channel
    option = {
        appID: "0b349f94ee5d49939f740f78e1dae3d4",
        channel: "channelName",
        uid: null,
        token: ""
    };
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    // Initialize the client
    rtc.client.init(option.appID, () => {
        console.log("init success");
         // Join a channel
    rtc.client.join(option.token, option.channel, option.uid, (uid) => {
        console.log("join channel: " + option.channel + " success, uid: " + uid);
        rtc.params.uid = uid;
         // Create a local stream
    rtc.localStream = AgoraRTC.createStream({
        streamID: rtc.params.uid,
        audio: true,
        video: true,
        screen: false,
    });
    // Initialize the local stream
    rtc.localStream.init( () => {
        console.log("init local stream success");
        // play stream with html element id "local_stream"
        rtc.localStream.play("local_stream");
        // this.startCountDown(); //counter start
        rtc.client.publish(rtc.localStream, (err) => {
            console.log("publish failed");
            console.error("errmesage", err);
            alert('err');
          });
    }, (err) => {
        console.error("init local stream failed ", err);
    });
    },  (err) => {
        console.error("client join failed", err);
    });
    rtc.client.on("stream-added", (evt) => {  
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        if (id !== rtc.params.uid) {
          rtc.client.subscribe(remoteStream, function (err) {
            // console.log("stream subscribe failed", err);
          });
        }
        // console.log("stream-added remote-uid: ", id);
      });
      rtc.client.on("stream-subscribed", function (evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Add a view for the remote stream.
       // addVedioStream(remoteStream.getId());
        // addView(id);
       /* let streamDiv = document.createElement("div");
        streamDiv.id = "remote_video_" + id;
        streamDiv.style.transform="rotateY(180deg)";
        streamDiv.style.backgroundColor = 'yellow';
         streamDiv.style.width = "300px";
        streamDiv.style.height = "300px";
        remote_container.appendChild(streamDiv);*/
        // Play the remote stream.
        remoteStream.play("remote_stream");
        // console.log("stream-subscribed remote-uid: ", id);
      });
      rtc.client.on("stream-removed", function (evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // Stop playing the remote stream.
        remoteStream.stop("remote_video_" + id);
        // Remove the view of the remote stream
        divId = "remote_video_" + id;
        divId.remove();
        // removeView(id);
        // console.log("stream-removed remote-uid: ", id);
      });
    }, (err) => {
        console.error(err);
    });
}

  render() {
    return (
      <div>
        <div id="local_stream" className="row my-stream" style={{height: '200px', width: '200px', backgroundColor: 'red'}}/>
        <div id="remote_stream" style={{ height: '200px', backgroundColor: '#000000', width: '200px'}} />
      </div>
    )
  }
}
