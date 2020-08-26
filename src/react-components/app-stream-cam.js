import React, { Component } from "react";

export default class AppStreamCam extends Component {
  constructor(props) {
    super(props);
    this.streamCamVideo = this.streamCamVideo.bind(this);
    this.streamCamVideo();
  }
  streamCamVideo() {
    const constraints = { audio: false, video: { width: 720, height: 720 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        const video = document.querySelector("video");

        video.srcObject = mediaStream;
        video.onloadedmetadata = function() {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
  }
  render() {
    return (
      <div>
        <div id="container">
          { !AFRAME.utils.device.isIOS()&&
            <video autoPlay={true} id="videoElement" width="240" height="240" controls />
          }
        </div>
      </div>
    );
  }
}
