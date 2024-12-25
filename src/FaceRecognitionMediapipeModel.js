class FaceRecognitionMediapipeModel {
  constructor() {
    this.detector = null;
    this.createDetector();
  }

  loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  loadScriptsWithImport = (scriptUrl) => {
    try {
      //eslint-disable-next-line
      importScripts(scriptUrl);
      console.log("Loaded", scriptUrl);
    } catch (e) {
      console.log("Failed Loading", scriptUrl, e);
    }
  };

  createDetector = async () => {
    try {
      // Load required scripts from CDN
      await Promise.all([
        this.loadScript(
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.22.0/dist/tf-core.min.js"
        ),
        this.loadScript(
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.22.0/dist/tf-backend-webgl.min.js"
        ),
        this.loadScript(
          "https://cdn.jsdelivr.net/npm/@tensorflow-models/face-detection"
        ),
        this.loadScript(
          "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection"
        )
      ]);

      const model = window.faceDetection.SupportedModels.MediaPipeFaceDetector;

      const detectorConfig = {
        runtime: "mediapipe",
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
        modelType: "full"
      };

      try {
        this.detector = await window.faceDetection.createDetector(
          model,
          detectorConfig
        );
      } catch (e) {
        console.log("ERROR DETECTOR", e);
      }
    } catch (error) {
      console.error("Error loading face detection:", error);
    }
  };

  detectFace = async (onDetectFaces) => {
    const image = document.getElementById("sample-image");
    const faces = await this.detector.estimateFaces(image);
    console.log("FACES", faces);
    onDetectFaces(faces);
  };
}

export default FaceRecognitionMediapipeModel;
