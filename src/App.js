import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import FaceRecognition from "./FaceRecognition";
import FaceRecognitionModel from "./FaceRecognitionModel";

function App() {
  const [image, setImage] = useState(null);

  const faceRecognitionModel = new FaceRecognitionModel();

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
        <button onClick={() => faceRecognitionModel.detectFace(image)}>
          Detect Face
        </button>
      </header>
    </div>
  );
}

export default App;
