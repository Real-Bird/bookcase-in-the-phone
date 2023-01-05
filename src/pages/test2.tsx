import React, { useEffect, useRef, useState, Fragment } from "react";

const WebcamComponent = (props: any) => {
  const [stream, setStream] = useState<any>(undefined);
  const [videoWH, setVideoWH] = useState<any>(undefined);

  const refVideo = useRef<any>(null);
  const refSelectVideo = useRef<any>(null);

  const listDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    devices.forEach((device) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      switch (device.kind) {
        case "videoinput":
          option.text =
            device.label || `camera ${refSelectVideo.current.length + 1}`;
          refSelectVideo.current.appendChild(option);
          break;
        default:
          console.log("Skipped Device: " + device.kind, device && device.label);
          break;
      }
    });
  };

  const getParams = (video: any) => {
    return {
      video: {
        deviceId: video ? { exact: video } : undefined,
        pan: true,
        tilt: true,
        zoom: true,
      },
      audio: false,
    };
  };

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(
      getParams(refSelectVideo.current.value)
    );

    refVideo.current.srcObject = stream;

    const track: any = stream.getVideoTracks()[0];
    const settings: any = track.getSettings();

    setStream(stream);
    setVideoWH("w: " + settings.width + " h: " + settings.height);
    props.onStream && props.onStream(stream);
  };

  useEffect(() => {
    listDevices();
    startWebcam();
  }, []);

  return (
    <>
      <div style={{ fontSize: "1em" }}>
        <h3>Settings</h3>
        <div>
          <div>Video: </div>
          <div>
            <select
              ref={refSelectVideo}
              onChange={(e) => startWebcam()}
            ></select>
          </div>
        </div>
      </div>
      <hr />
      <video
        ref={refVideo}
        autoPlay
        style={{ width: "20vw", margin: "auto" }}
      />
      <p style={{ fontSize: "0.8em" }}>{videoWH}</p>
    </>
  );
};

export default WebcamComponent;
