import { useEffect } from "react";
import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";

const FaceRecognition = () => {
  const detectFace = () => {
    const faces = getFaces();

    console.log(
      "Faces",
      faces
        .then((response) => {
          console.log("RESPONSE", response);
          return response;
        })
        .then((data) => {
          console.log("DATA", data);
        })
    );
  };

  const getFaces = async () => {
    const image = document.getElementById("sample-image");
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: "mediapipe", // or 'tfjs'
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
      modelType: "full"
    };
    const detector = await faceDetection.createDetector(model, detectorConfig);

    const faces = await detector.estimateFaces(image);

    return faces;
  };

  return <button onClick={detectFace}>Detect Face</button>;
};

export default FaceRecognition;
