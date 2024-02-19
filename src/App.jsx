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
    // store file in variable
    const file = e.target.files[0]

    // VITE_BACKEND_URL --> Netlify .app/.netlify/functions   add/ netlify function name file
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/cloudinary-upload`, {file})
      .then((response) => {
        // to see the structure of the response
        console.log('RESPONSE ', response.data); 
        // the url we wanna use is stored in the property secure_url
        setImageUrl(response.data.secure_url); 
        setWaitingForImageUrl(false);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error.message);
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
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <br />
        <br />
        <button type="submit" disabled={waitingForImageUrl}>
          Submit
        </button>
      </form>

      {imageUrl && <img src={imageUrl} alt="my cloudinary image" />}
    </>
  );
}

export default App;
