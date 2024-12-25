import * as Comlink from "comlink";

class FaceRecognitionWorker {
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
        this.loadScriptsWithImport(
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.15.0/dist/tf.min.js"
        ),
        this.loadScriptsWithImport(
          "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.22.0/dist/tf-backend-webgl.min.js"
        ),
        this.loadScriptsWithImport(
          "https://cdn.jsdelivr.net/npm/@tensorflow-models/face-detection@1.0.3/dist/face-detection.js"
        )
      ]);

      //eslint-disable-next-line
      const model = self.faceDetection.SupportedModels.MediaPipeFaceDetector;

      const detectorConfig = {
        runtime: "tfjs",
        maxFaces: 10
      };

      try {
        //eslint-disable-next-line
        this.detector = await self.faceDetection.createDetector(
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

  detectFace = async (imageBitmap, onDetectFaces) => {
    const faces = await this.detector.estimateFaces(imageBitmap);
    console.log("FACES", faces);
    onDetectFaces(faces);
  };
}

Comlink.expose(FaceRecognitionWorker);
