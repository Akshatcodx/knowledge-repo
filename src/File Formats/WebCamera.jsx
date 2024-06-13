import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const WebCamera = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loader, setLoader] = useState(true);
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  console.log(loader, "loader");
  return (
    <div>
      {" "}
      {/* add correct loader logic bywatching helper doc code */}
      {loader ? "...Loading web cam" : null}
      <Webcam
        audio={false}
        height={720}
        // onLoad={() => setLoader(false)}Sometimes this doesn't work so use the below prop
        onUserMedia={() => setLoader(false)}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        // videoConstraints={videoConstraints}
      />
      {imageSrc && <img src={imageSrc} />}
      <button onClick={capture} disabled={imageSrc}>
        {imageSrc ? "Retake" : "Capture"}
      </button>
    </div>
  );
};

export default WebCamera;
