import { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [startDetection, setStartDetection] = useState(false);
  const [faceRecognitionModel, setFaceRecognitionModel] = useState(null);
  const [noOfFaces, setNoOfFaces] = useState(0);

  function handleImageChange(e) {
    const file = e.target.files ? e.target.files[0] : null;

    // if (file && file.size <= 5 * 1024 * 1024) {
    // Check if file size is <= 5MB
    const blobUrl = URL.createObjectURL(file);
    setImage(blobUrl);
    // } else {
    //   alert("Please select an image less than 5MB.");
    // }
  }

  const onStartDetection = async () => {
    // const { default: FaceRecognitionModel } = await import(
    //   "./FaceRecognitionModel"
    // ); // Dynamically import the class

    // const faceRecognitionModel = new FaceRecognitionModel();

    const { default: FaceRecognitionMediapipeModel } = await import(
      "./FaceRecognitionMediapipeModel.js"
    ); // Dynamically import the class

    const faceRecognitionModel = new FaceRecognitionMediapipeModel();

    setFaceRecognitionModel(faceRecognitionModel);

    setStartDetection(true);
  };

  const onClickDetectFace = () => {
    faceRecognitionModel.detectFace((faces) => {
      const noOfFaces = faces.length;
      setNoOfFaces(noOfFaces);
    });
  };

  const renderStartDetectionButton = () => {
    return <button onClick={onClickDetectFace}>Detect Face</button>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          id="sample-image"
          src={image ?? "my_local_proctored_image.png"}
          className="App-logo"
          alt="logo"
        />
        <div>
          <label>
            Upload Image:
            <input type="file" onChange={(e) => handleImageChange(e)} />
          </label>
        </div>
        {startDetection ? renderStartDetectionButton() : null}
        {startDetection ? null : (
          <button onClick={onStartDetection}>Start Detection</button>
        )}

        <p>No of Faces: {noOfFaces}</p>
      </header>
    </div>
  );
}

export default App;
