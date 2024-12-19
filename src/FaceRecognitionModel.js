import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";

class FaceRecognitionModel {
  constructor() {
    this.detector = null;
    this.createDetector();
  }

  createDetector = async () => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;

    const detectorConfig = {
      runtime: "mediapipe", // or 'tfjs'
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
      modelType: "full"
    };

    this.detector = await faceDetection.createDetector(model, detectorConfig);
  };

  detectFace = () => {
    const faces = this.getFaces();

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

  getFaces = async () => {
    const image = document.getElementById("sample-image");

    console.log("this detector", this.detector);

    const faces = await this.detector.estimateFaces(image);

    return faces;
  };
}

export default FaceRecognitionModel;
