# Shells-Video-Library

## Setup
1) move your "cloudinaryConfig.js" and "dbConfig.js" files into shells-video-library/backend/database/
2) Navigate to "shells-video-library/"
3) run "npm install"
4) run "npm start"
5) In seperate terminal, navigate to "shells-video-library/backend/"
6) run "npm install"
7) run "nodemon"

## Notes
- Needs "dbConfig.js" and "cloudinaryConfig.js" files for backend to work
- Video files are stored via Cloudinary APIs, while video metadata and users are stored in a MongoDB database
- After uploading a video, wait for the alert that confirm the upload is finished before uploading another one, as uploading large files can take some time
- player will not play every type of videeo file, namely .mov files will not play
- the "Release Date" filter works by filtering out video release BEFORE the selected date