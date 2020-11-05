import React, { useState } from "react";
import PropTypes from "prop-types";
import CallIcon from "../../../assets/img/Call.png";
import VideoCallIcon from "../../../assets/img/Video Call.png";

function MainWindow({ startCall, clientId, callTo }) {
  const [friendID, setFriendID] = useState(callTo);

  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };

  return (
    <div className="container main-window">
      <div style={{ display: "none" }}>
        <h3>
          Hi, your ID is
          <input
            type="text"
            className="txt-clientId"
            defaultValue={clientId}
            readOnly
          />
        </h3>
        <h4>Get started by calling a friend below</h4>
      </div>
      <div>
        <input
          style={{ display: "none" }}
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Your friend ID"
          value={friendID}
          onChange={(event) => setFriendID(event.target.value)}
        />
        <div>
          <img
                      style={{ height: 30, width: 30, cursor: "pointer" }}
                      src={CallIcon}
                      onClick={callWithVideo(true)}
                    />
                    <img
                      style={{ height: 35, width: 35, cursor: "pointer" }}
                      src={VideoCallIcon}
                      onClick={callWithVideo(true)}
                    />
          {/* <button
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={callWithVideo(true)}
          />
          <button
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          /> */}
        </div>
      </div>
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
};

export default MainWindow;
