const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let videoSchema = new Schema(
  {
    file: {
      type: String,
      unique: true,
    },

    // TODO pictureFile
    // pictureFile: {
    //     type: String,
    //     unique:true
    // },

    email: {
        type: String
    },

    userID: {
      type: String
    },

    title: {
      type: String,
    },

    releaseDate: {
        type: Date
    },

    genre: {
        type: String
    },

    synopsis: {
        type: String
    },

    rating: {
        type: {
            total: Number,
            count: Number,
            overall: Number,
            users: [String]
        }
    },

  },
  {
    collection: "videos",
  }
);


module.exports = mongoose.model("Video", videoSchema);