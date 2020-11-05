import React, { Component } from "react";
import _ from "lodash";
import socket from "./js/socket";
import PeerConnection from "./js/PeerConnection";
import MainWindow from "./js/MainWindow";
import CallWindow from "./js/CallWindow";
import CallModal from "./js/CallModal";
import "./css/app.scss";

import cookie from "react-cookies";

class App extends Component {
  constructor() {
    super();
    this.state = {
      clientId: "",
      callWindow: "",
      callModal: "",
      callFrom: "",
      localSrc: null,
      peerSrc: null,
      currentUser: cookie.load("current_user"),

      callTo: "21",
    };
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
    this.endCallHandler = this.endCall.bind(this);
    this.rejectCallHandler = this.rejectCall.bind(this);
  }

  componentDidMount() {
    // console.log("friend ID", this.props.history.location.state.userId);
    // this.setState({ callTo: this.props.history.location.state.userId });
    socket.on("init", ({ id: clientId }) => {
      document.title = `${clientId} - VideoCall`;
      this.setState({ clientId });
    });
    // .on("request", ({ from: callFrom }) => {
    //   this.setState({ callModal: "active", callFrom });
    // })

    socket
      .on("request", ({ from: callFrom, to: callTo }) => {
        console.log("request called call from", callFrom);
        console.log("request called call to", callTo);
        // if (callTo === this.state.currentUser._id) {
        this.setState({ callModal: "active", callFrom });
        // }
      })

      .on("call", (data) => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === "offer") this.pc.createAnswer();
        } else this.pc.addIceCandidate(data.candidate);
      })
      .on("end", this.endCall.bind(this, false))
      .emit("init", this.state.currentUser._id);
  }

  startCall(isCaller, friendID, config) {
    this.config = config;
    this.pc = new PeerConnection(friendID)
      .on("localStream", (src) => {
        const newState = { callWindow: "active", localSrc: src };
        if (!isCaller) newState.callModal = "";
        this.setState(newState);
      })
      .on("peerStream", (src) => this.setState({ peerSrc: src }))
      // .start(isCaller, config);
      .start(isCaller, config, this.state.clientId);
  }

  rejectCall() {
    const { callFrom } = this.state;
    socket.emit("end", { to: callFrom });
    this.setState({ callModal: "" });
  }

  endCall(isStarter) {
    if (_.isFunction(this.pc.stop)) {
      this.pc.stop(isStarter);
    }
    this.pc = {};
    this.config = null;
    this.setState({
      callWindow: "",
      callModal: "",
      localSrc: null,
      peerSrc: null,
    });
  }

  render() {
    const {
      clientId,
      callFrom,
      callModal,
      callWindow,
      localSrc,
      peerSrc,
    } = this.state;
    console.log("userId", this.props.history.location.state.userId);
    return (
      <div>
        <MainWindow
          clientId={clientId}
          startCall={this.startCallHandler}
          callTo={
            this.props.history.location.state &&
            this.props.history.location.state.userId
              ? this.props.history.location.state.userId
              : "No Id Found"
          }
        />

        {!_.isEmpty(this.config) && (
          <CallWindow
            status={callWindow}
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={this.endCallHandler}
          />
        )}
        <CallModal
          status={callModal}
          startCall={this.startCallHandler}
          rejectCall={this.rejectCallHandler}
          callFrom={callFrom}
        />
      </div>
    );
  }
}

export default App;
