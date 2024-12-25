import * as Comlink from "comlink";

class FaceRecognitionModel {
  constructor() {
    this.detector = null;
    this.faceRecognitionWorker = null;
    this.initWorker();
  }

  initWorker = async () => {
    // Dynamically import the worker
    const worker = new Worker(
      new URL("./FaceRecognitionWorker.js", import.meta.url)
    );

    const FaceRecognitionWorkerClass = Comlink.wrap(worker);

    this.faceRecognitionWorker = await new FaceRecognitionWorkerClass();
  };

  detectFace = async (onDetectFaces) => {
    const img = document.getElementById("sample-image");
    const bitmap = await createImageBitmap(img);
    await this.faceRecognitionWorker.detectFace(
      bitmap,
      Comlink.proxy(onDetectFaces)
    );
  };
}

export default FaceRecognitionModel;
