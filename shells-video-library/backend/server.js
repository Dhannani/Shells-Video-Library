const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors");

const userRoute = require("../backend/routes/user.route"),
  videoRoute = require("../backend/routes/video.route");
let mongoose = require("mongoose"),
    dbConfig = require("./database/dbConfig");


// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected!");
    },
    (error) => {
      //const collection = client.db("Dev-Test").collection("Dev-Test-Collection");
      console.log("Could not connect to database : " + error);
      console.log("database uri: " + dbConfig.db);
    }
  );

const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.use("/users", userRoute); // route that handles user creation and authentication 
app.use("/videos", videoRoute); // route that handles video searches and creation

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});


