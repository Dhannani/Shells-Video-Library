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

## Future Improvements
### Functional
- update videos to reflect a user's new email when user changes email
- show password requirements and which requirements have not been met when attempting to set password
- create username, password, and video forms as components to replace repeated input forms in code
- filter video search results in the backend for scaleability
- allow user to change rating on video they have already rated
### UI
- show a loading icon while a video is being uploaded
- change login and create account to be a pop up
- move filter to top of library page with search bar always shown but the other filters being shown via dropdown button
- update landing page
- use toast messages instead of alerts
- store jwt authentication in a cookie rather than localstorage to improve security
- improve general font, size, color, and alignment with css
