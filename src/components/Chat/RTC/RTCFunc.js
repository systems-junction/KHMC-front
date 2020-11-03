import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk";
import endCall from "../../../assets/img/end Call.jpg";
import mute1 from "../../../assets/img/mute.png";
import mute2 from "../../../assets/img/unmute.png";
import videoStopIcon from "../../../assets/img/video_stop.png";
import videoPlayIcon from "../../../assets/img/video_play.png";
import Button from "@material-ui/core/Button";
var rtc;
var option;
var divId;
const RTCFunc = (props) => {
  useEffect(() => {
    join();
    console.log("props", props);
  });
  // componentDidMount() {
  //   this.join()
  // }
  const leave = () => {
    // Leave the channel
    rtc.client.leave(
      () => {
        // Stop playing the local stream
        // rtc.localStream.stop();
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
        props.video(false);
      },
      (err) => {
        console.log("channel leave failed");
        // console.error(err);
      },
    );
  };
  const videoStop = () => {
    rtc.localStream.stop();
    var stop = document.getElementById("stopvideo");
    stop.style.display = "none";
    var play = document.getElementById("playvideo");
    play.style.display = "block";
  };
  const videoPlay = () => {
    rtc.localStream.play("local_stream");
    var stop = document.getElementById("stopvideo");
    stop.style.display = "block";
    var play = document.getElementById("playvideo");
    play.style.display = "none";
  };
  const mute = () => {
    rtc.localStream.muteAudio();
    var muteX = document.getElementById("mute");
    muteX.style.display = "none";
    var unmuteX = document.getElementById("unmute");
    unmuteX.style.display = "block";
  };
  const unmute = () => {
    rtc.localStream.unmuteAudio();
    var unmute = document.getElementById("unmute");
    unmute.style.display = "none";
    var mute = document.getElementById("mute");
    mute.style.display = "block";
  };
  const join = () => {
    rtc = {
      client: null,
      joined: false,
      published: false,
      localStream: null,
      remoteStreams: [],
      params: {},
    };
    // Options for joining a channel
    option = {
      appID: "0b349f94ee5d49939f740f78e1dae3d4",
      channel: "channelName",
      uid: null,
      token: "",
    };
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    // Initialize the client
    rtc.client.init(
      option.appID,
      () => {
        console.log("init success");
        // Join a channel
        rtc.client.join(
          option.token,
          option.channel,
          option.uid,
          (uid) => {
            console.log(
              "join channel: " + option.channel + " success, uid: " + uid,
            );
            rtc.params.uid = uid;
            // Create a local stream
            rtc.localStream = AgoraRTC.createStream({
              streamID: rtc.params.uid,
              audio: true,
              video: true,
              screen: false,
            });
            // Initialize the local stream
            rtc.localStream.init(
              () => {
                console.log("init local stream success");
                // play stream with html element id "local_stream"
                rtc.localStream.play("local_stream");
                // this.startCountDown(); //counter start
                rtc.client.publish(rtc.localStream, (err) => {
                  console.log("publish failed");
                  console.error("errmesage", err);
                  alert("err");
                });
              },
              (err) => {
                console.error("init local stream failed ", err);
              },
            );
          },
          (err) => {
            console.error("client join failed", err);
          },
        );
        rtc.client.on("stream-added", (evt) => {
          var remoteStream = evt.stream;
          var id = remoteStream.getId();
          if (id !== rtc.params.uid) {
            rtc.client.subscribe(remoteStream, function(err) {
              // console.log("stream subscribe failed", err);
            });
          }
          // console.log("stream-added remote-uid: ", id);
        });
        rtc.client.on("stream-subscribed", function(evt) {
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
        rtc.client.on("stream-removed", function(evt) {
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
      },
      (err) => {
        console.error(err);
      },
    );
  };
  return (
    <div>
      <img
        src={mute1}
        style={{
          position: "absolute",
          top: "85%",
          width: 30,
          height: 30,
          left: 90,
          cursor: "pointer",
          zIndex: 5,
        }}
        id="mute"
        onClick={mute}
      />
      <img
        src={mute2}
        style={{
          position: "absolute",
          top: "85%",
          width: 30,
          height: 30,
          left: 90,
          cursor: "pointer",
          zIndex: 5,
        }}
        id="unmute"
        style={{ display: "none" }}
        onClick={unmute}
      />
      <img
        src={videoStopIcon}
        style={{
          position: "absolute",
          top: "85%",
          width: 30,
          height: 30,
          left: 130,
          cursor: "pointer",
          zIndex: 5,
        }}
        id="stopvideo"
        onClick={videoStop}
      />
      <img
        src={videoPlayIcon}
        style={{
          position: "absolute",
          top: "85%",
          width: 30,
          height: 30,
          left: 130,
          cursor: "pointer",
          zIndex: 5,
        }}
        id="playvideo"
        style={{ display: "none" }}
        onClick={videoPlay}
      />
      <img
        style={{
          position: "absolute",
          top: "85%",
          width: 30,
          height: 30,
          left: 160,
          cursor: "pointer",
          zIndex: 5,
        }}
        src={endCall}
        onClick={leave}
      />
      <div
        id="local_stream"
        className="row my-stream"
        style={{
          backgroundColor: "red",
          position: "absolute",
          top: "78%",
          width: "160px",
          height: "100px",
          left: "71%",
          zIndex: 5,
          backgroundColor: "#DA1D1D",
        }}
      />
      <div
        id="remote_stream"
        style={{
          height: "400px",
          backgroundColor: "#000000",
          width: "550px",
          borderRadius: 5,
        }}
      />
    </div>
  );
};
export default RTCFunc;
