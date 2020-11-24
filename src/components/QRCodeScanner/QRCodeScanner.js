import React, { Component } from "react";
import QrReader from "react-qr-scanner";
import Button from "@material-ui/core/Button";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data) {
      this.props.handleScanQR(data);
    }

    // else {

    // }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    const previewStyle = {
      height: '100%',
      width: '100%',
      //   overflowY: "hidden",
    };

    return (
      <div
        style={{
          display: "flex",
        //   justifyContent: "center",
          flexDirection: "column",
          width:'100%',
          height:'100%',
          position:'fixed',
        //   alignItems:'center'
        }}
      >
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />

        {/* <Button
          style={{  width: 200, height: 50, marginTop:10 }}
             onClick={this.handleScan}
          variant="contained"
          color="primary"
          fullWidth
        >
          Cancel
        </Button> */}
      </div>
    );
  }
}

export default Test;
