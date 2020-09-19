/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import MicRecorder from "mic-recorder-to-mp3";
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function Items(props) {
  const [isRecording, setIsRecording] = useState(false);

  const [blobURL, setblobURL] = useState("");

  const [isBlocked, setIsBlocked] = useState(false);

  const [response, setResponse] = useState("");

  useEffect(() => {
    navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          setIsBlocked(false);
        },
        () => {
          console.log("Permission Denied");
          setIsBlocked(true);
        }
      );
  }, []);

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const uploadFile = (selectedFile) => {
    const data = new FormData();
    data.append("file", selectedFile);
    axios
      .post("http://192.168.10.29:4000/api/patient/test", data)
      .then((res) => {
        if (res.data.success) {
          console.log("response after adding item", res);
        } else if (!res.data.success) {
        }
      })
      .catch((e) => {
        console.log("error after adding item", e);
      });
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log("blob", blob);
        const blobURL = URL.createObjectURL(blob);
        console.log("blob after", blobURL);
        setblobURL(blobURL);
        setIsRecording(false);
        var file = new File([blob], "first", { type: "audio/mp3" });
        uploadFile(file);
      })
      .catch((e) => console.log(e));
  };

  const getFile = () => {
    axios
      .get("http://192.168.10.29:4000/api/patient/test2")
      .then((res) => {
        if (res.data.success) {
          console.log("response after adding item", res.data.data);
          setResponse(res.data.data);
        } else if (!res.data.success) {
        }
      })
      .catch((e) => {
        console.log("error after adding item", e);
      });
  };

  const baseUrl = "http://192.168.10.29:4000/";

  return (
    <div>
      <button
        onClick={start}
        disabled={isRecording}
        style={{
          backgroundColor: "blue",
          color: "white",
          borderRadius: 5,
          borderWidth: 0,
          width: 100,
          height: 40,
          marginRight: 10,
        }}
      >
        Record
      </button>
      <audio src={blobURL} controls="controls"  />
      <button
        onClick={stop}
        disabled={!isRecording}
        style={{
          backgroundColor: 'red',
          color: "white",
          borderRadius: 5,
          borderWidth: 0,
          width: 100,
          height: 40,
          marginLeft: 10,
        }}
      >
        Stop
      </button>
      {response &&
        response.map((link) => {
          return <audio src={`${baseUrl}${link.abc}`} controls="controls" />;
        })}
      <button type="button" style={{marginTop:10}} class="btn btn-success btn-block" onClick={getFile}>
        Get All Notes File
      </button>
    </div>
  );
}
