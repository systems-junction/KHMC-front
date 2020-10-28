import React, { Component } from "react";
import ChannelForm from "./ChannelForm";
import Call from "./Call";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: ""
    };
  }

  selectChannel = channel => {
    this.setState({ channel });
  };

  render() {
    return (
      <div className="App">
        {/* <ChannelForm selectChannel={this.selectChannel} /> */}
        <Call  />
      </div>
    );
  }
}

export default App;