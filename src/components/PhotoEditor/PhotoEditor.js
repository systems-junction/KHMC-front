import React, { useState } from "react";
import "./photoeditor.css";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
// import Button from "@material-ui/core/Button";
const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");
const download = require("downloadjs");
const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};
function HomePage() {
  const [imageSrc, setImageSrc] = useState("");
  const imageEditor = React.createRef();
  const saveImageToDisk = () => {
    const imageEditorInst = imageEditor.current.imageEditorInst;
    const data = imageEditorInst.toDataURL();
    if (data) {
      const mimeType = data.split(";")[0];
      const extension = data.split(";")[0].split("/")[1];
      download(data, `image.${extension}`, mimeType);
    }
  };
  return (
    <div className="home-page">
      <div className="center">
        <h1>DHR Photo Editor</h1>
      </div>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: imageSrc,
            name: "image",
          },
          theme: myTheme,
          // menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
          menu: ["draw", "shape", "text", "filter"],

          initMenu: "",
          uiSize: {
            height: `calc(100vh - 160px)`,
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={window.innerHeight}
        cssMaxWidth={window.innerWidth}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
        ref={imageEditor}
      />
      <button
        style={{ backgroundColor: "blue", float: "right", color: "white" }}
        onClick={saveImageToDisk}
      >
        Save Image to Disk
      </button>
    </div>
  );
}
export default HomePage;
