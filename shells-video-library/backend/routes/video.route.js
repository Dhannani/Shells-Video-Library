let express = require("express"),
  router = express.Router();
(userSchema = require("../Models/Users")),
  (videoSchema = require("../Models/Videos"));
fs = require("fs-extra");
let path = require("path");
var cloudinary = require("cloudinary").v2;
var multer = require("multer");

const cloudinaryConfig = require("../database/cloudinaryConfig");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./videos");
    //callback(null, "../public/videos");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ dest: "/", storage: storage });

// Store video file
router.route("/uploadVideo").post(upload.single("file"), function (req, res) {
  //console.log(req.file.filename);
  res.send(req.file);
});

// Store video metadata
router.route("/videoMetadata").post((req, res, next) => {
  console.log(req.body.userId)
  video = {
    email: req.body.email,
    userId: req.body.userId,
    file: req.body.file,
    title: req.body.title,
    genre: req.body.genre,
    synopsis: req.body.synopsis,
    releaseDate: req.body.releaseDate,
    rating: {
      overall: 0,
      total: 0,
      count: 0,
      users: [req.body.userId], // TODO add req.body.userId here so user cant rate their own video
    },
  };
  console.log(video)

  //console.log(video)
  file = req.body.file;
  src = "./videos/" + file;

  cloudinary.config(cloudinaryConfig);
  cloudinary.uploader.upload_large(src, { resource_type: "video" }, function (
    error,
    result
  ) {
    if (result) {
      console.log(result);
      video.file = result.url;
      fs.remove(src, (err) => {
        // remove video from storage
        if (err) {
          console.log(err);
        } else {
          console.log(file + " deleted");
        }
      });

      videoSchema.create(video, (error, data) => {
        if (error) {
          console.log(error);
          return next(error);
        } else {
          console.log("Video data uploaded!");
          console.log(data);
          res.json(data);
        }
      });
    } else {
      console.log(result, error);
      res.send(err);
    }
  });
});

// Get Videos
router.route("/").get((req, res) => {
  videoSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Video Rating
router.route("/rate").put((req, res) => {
  rating = req.body.rating;
  userId = req.body.userId;
  videoId = req.body.videoId;

  console.log(userId + "is rating..");
  // get video being rated
  videoSchema
    .findById(videoId)
    .then((video) => {
      if (video.rating.users.includes(userId)) {
        err = "user already rated video";
        console.log(err);
        res.status(401).send(err);
      } else {
        // calculate new rating and add userID to list of users who have rated the video
        video.rating.count = video.rating.count + 1;
        video.rating.total = video.rating.total + rating;
        video.rating.overall = video.rating.total / video.rating.count;
        if (video.rating.users) {
          video.rating.users.push(userId);
        } else {
          video.rating.users = [userId];
        }

        // newCount = video.rating.count + 1;
        // newTotal = video.rating.toal + rating;
        // newOverall = newTotal / newCount;
        // newUsers = video.rating.users.push(userId)

        // newVideoRating = {
        //   rating: {
        //     total: newTotal,
        //     count: newCount,
        //     overall: newOverall,
        //     users: newUsers,
        //   }
        //}

        videoSchema.findByIdAndUpdate(
          videoId,
          { $set: video },
          (error, data) => {
            if (error) {
              console.log(error);
              return next(error);
            } else {
              console.log("Video Rating Updated");
              console.log(data);
              return res.status(200).send(data);
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// get user's videos
router.route("/user-videos/:id").get((req, res) => {
  console.log(req.params)
  userId = req.params.id;
  console.log("getting videos of user: " + userId)
  videoSchema.find({ userId: userId }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// delete video
router.route("/delete").delete((req, res) => {
  videoId = req.query.id;
  file = req.query.file;
  console.log("deleting video with id " + videoId);

  // remove metadata from database
  videoSchema.findByIdAndDelete(videoId, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("metadata removed from db");
      // TODO remove video from cloud storage
      cloudinary.config(cloudinaryConfig);
      cloudinary.uploader.destroy(file, function (result) {
        console.log("File deleted")
        console.log(result);
      });
      res.send(data);
    }
  });
});

// update video
router.route("/edit-video").put((req, res) => {
  videoId = req.body.videoId;
  videoSchema.findById(videoId).then((video) => {
    video.title = req.body.title;
    video.genre = req.body.genre;
    video.synopsis = req.body.synopsis;

    videoSchema.findByIdAndUpdate(videoId, { $set: video }, (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log("Video Updated");
        console.log(data);
        return res.status(200).send(data);
      }
    });
  });
});

// get video by id
router.route("/:id").get((req, res) => {
  id = req.params.id;
  videoSchema
    .findById(id)
    .then((video) => {
      if (video) {
        console.log(video);
        res.send(video);
      } else {
        let str = "Video not found";
        res.status(404).send(str);
      }
    })
    .catch((err) => {
      console.log("Video not found");
      res.status(404).send(err);
    });
});

module.exports = router;

// //console.log(req);
// file = req;
// console.log(file)
// //fs.writeFileSync(configPath, parseInt(nextBlock, 10).toString())
// fs.writeFile("test.mov", req.body.file, function (err) {
//   if (err) return console.log(err);
//   console.log("file wrote");
// });

// video = {
//   email: req.body.email,
// };
