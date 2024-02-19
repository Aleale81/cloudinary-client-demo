import axios from "axios";

export const handler = async (event, context) => {
    // check if receive body of req obj
    // the obj will be in json, need to use parse before pass data in API
    console.log("EVENT", JSON.parse(event.body))
    const { file } = JSON.parse(event.body)

    // Netlify env variable
    const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
    const UNSIGN_UPLOAD = process.env.UNSIGN_UPLOAD

    // create url where send the request including your personal Cloudinary Name
    const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`;

    const dataToUpload = new FormData();
    // properties needs to have those specific names!!!
    dataToUpload.append("file", file);
    // UNSIGN_UPLOAD => name of the unsigned upload preset created in your Cloudinary account
    dataToUpload.append("upload_preset", UNSIGN_UPLOAD);

    try {
        const response = await axios.post(API_URL, dataToUpload);
        // console.log(response.data)
        return {
            statusCode: 200,
            // return only response.data to not expose API_URL with API_KEY 
            body: JSON.stringify(response.data)
        }
    } catch (error) {
        // console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: error.code
            })
        }
    }

}