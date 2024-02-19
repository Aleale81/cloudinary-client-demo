import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);

  // *********** Upload file to Cloudinary ******************** //
  const handleFileUpload = (e) => {
    // disable the submit form button till we get the image url from Cloudinary
    setWaitingForImageUrl(true);

    //check if we receive the file path correctly
    console.log("The file to be uploaded is: ", e.target.files[0]);

    // create url where send the request including your personal Cloudinary Name
    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`;

    const dataToUpload = new FormData();
    // properties needs to have those specific names!!!
    dataToUpload.append("file", e.target.files[0]);
    // VITE_UNSIGN_UPLOAD => name of the unsigned upload preset created in your Cloudinary account
    dataToUpload.append("upload_preset", import.meta.env.VITE_UNSIGN_UPLOAD);

    axios
      .post(url, dataToUpload)
      .then((response) => {
        // to see the structure of the response
        console.log('RESPONSE ', response.data); 
        // the url we wanna use is stored in the property secure_url
        setImageUrl(response.data.secure_url); 
        setWaitingForImageUrl(false);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The image has been uploaded, now we can send the post request to DB including the imageUrl in the body of the req
  };

  return (
    <>
      <h1>Upload Image with Cloudinary - Demo</h1>
      <form onSubmit={handleSubmit}>
      {/* probably other inputs */}

        <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button type="submit" disabled={waitingForImageUrl}>
          Submit
        </button>
      </form>

      {/* here you can see a preview of the image uploaded */}
      {imageUrl && <img src={imageUrl} alt="my cloudinary image" />}
    </>
  );
}

export default App;
