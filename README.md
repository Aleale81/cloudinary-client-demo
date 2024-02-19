# Uploading images with Cloudinary

## Creating a Cloudinary account (for free)

Create a new account [here](https://cloudinary.com/). (You can easily sign up with Github).

## Managing upload presets using the settings UI

To create or modify an upload preset using the Upload Preset UI, log into the [Cloudinary Console](https://console.cloudinary.com/settings/upload) (👈 you can use this link) or select **Settings** > **Upload**.
Then **scroll** to the **Upload presets** section.

![Screenshot 2024-02-19 at 21 42 22](https://gist.github.com/assets/69593297/7e8d1f5b-4973-4ae3-b7a5-aa3e6adcfb99)

- Create a new upload preset by clicking **Add upload preset** at the bottom of the upload preset list.

![Screenshot 2024-02-19 at 21 45 31](https://gist.github.com/assets/69593297/7cef4fef-fcfb-440f-b13f-e576420f5990)


1. **Upload preset name**: it gets generated randomly (no need to change it). 
> Copy this value and save it momentarily somewhere, you'll need it soon.
2. **Signing Mode**: select **UNSIGNED**
3. (Optional) **Folder**: you can choose a name for the Cloudinary folder where your images will be stored. 
> **Avoid empty spaces**.
4. **SAVE**: When you finish and Save your upload preset definition, the upload preset and its settings are displayed in the Upload page of the Console Settings:

![Screenshot 2024-02-19 at 22 13 12](https://gist.github.com/assets/69593297/71f20be0-d8b4-4b40-9752-ea1619adb5c6)
  
## 

- Go to your Dashboard and get your **Cloud Name**:

By clicking the second icon from the top, of the side-menu on the left, you'll land on your dashboard. Here you'll find your credentials. 
> Copy your **Cloud Name** and save it momentarily somewhere.

![Screenshot 2024-02-19 at 12 56 07](https://gist.github.com/assets/69593297/0bcc167f-9af5-4ff4-bd18-4cbdd17e22ea)

## Storing Cloudinary variables in .env file

1. In your React app create a new ```.env``` file in the **root directory** (if you don't have it yet). 
2. Create two variables for the Cloudinary value previously saved.
  > **Avoid empty spaces**. 
```bash
VITE_CLOUDINARY_NAME=your cloud name here
VITE_UNSIGNED_UPLOAD_PRESET=your upload preset name here
```
3. Include the `.env` inside the `.gitignore` file.

## React app implementation (check App.jsx example)

1. Add an `input` tag with a type "file" attribute, to the form that create a resource: 

```bash
<input type="file" onChange={YOUR FUNCTION} />
```

2. Create a function that after the user select an image, makes a `POST` request to your Cloudinary folder url sending the file.

```bash
const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`
```

3. Prepare the file object to be uploaded

```bash
const dataToUpload = new FormData();
dataToUpload.append("file", e.target.files[0]);
dataToUpload.append("upload_preset", import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET);
```
4. After the `axios` request, if everything worked as expected, the image public url created will be stored in the property `secure_url` of the `response.data`.

5. Post the "url from Cloudinary" in DB together with the other resource properties

##

### [DEMO](https://cloudinary-client-demo.netlify.app/)

##

### Notes on security

Even if we'll store env variables in Netlify, the two will still be exposed in production. It shouldn't be anyway "dangerous". Here 
a note from Cloudinary docs.

![Screenshot 2024-02-19 at 19 33 16](https://gist.github.com/assets/69593297/85048e35-f0e0-4b0d-8d65-0d7770bcc429)


### Additional documentation:

- [Vite environment variables](https://vitejs.dev/guide/env-and-mode)
- [Cloudinary upload](https://cloudinary.com/documentation/upload_images#basic_uploading)
