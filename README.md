## How to upload file to Google Drive

1. To get access to the Google Account (Plus) API you will first need to create an app
by visiting the google developer console: https://console.developers.google.com
- step by step tutorial how to do it : https://github.com/dwyl/hapi-auth-google/blob/master/GOOGLE-APP-STEP-BY-STEP-GUIDE.md
- make sure you enable the DRIVE API
2. Install hapi-auth-google from NPM

```npm install hapi-auth-google --save```

3. Export the Required Environment Variables

Once you've created your app you will have generated client_id and client_secret.

```
GOOGLE_CLIENT_ID=YourAppsClientId.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=SuperSecret
PORT=8000
BASE_URL=http://localhost:8000 # Must be identical to "Authorized JavaScript Origin"
```

4. Create an empty file in the lib folder and call it tokens.json (your tokens will be saved into this file see [L5](https://github.com/heron2014/learn-upload-file-to-to-google-drive/blob/master/lib/google_auth_handler.js#L5-Lundefined)) 

5. Install all needed dependencies see [L24-L31](https://github.com/heron2014/learn-upload-file-to-to-google-drive/blob/master/package.json#L24-L31)

Reference:
- What is [base64](https://en.wikipedia.org/wiki/Base64) encoded format? 
  Base64 is a group of similar **binary-to-text encoding schemes** that represent binary data in an ASCII string format. Example: 0 1 1 1 1 --> "Anvsdjek"

  To specified what file formats or format content is transimitted on the Internet, we need to define it as MIME type (Multipurpose Internet Mail Extensions) in HTTP header

  - http://stackoverflow.com/questions/3538021/why-do-we-use-base64
- How to encode/decode above format?
  - https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
  - encode and decode in Node.js
    - http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html

- REST Drive API
  - https://developers.google.com/drive/v3/web/manage-uploads#uploads
  - scopes https://developers.google.com/drive/v2/web/scopes#google_drive_scopes
