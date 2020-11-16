let express = require("express"),
  router = express.Router(),
  userSchema = require("../Models/Users"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  jwtSecret = require("../config/jwtConfig"),
  passport = require("passport");
require("../config/passport-auth");

router.use(passport.initialize());

const BCRYPT_SALT_ROUNDS = 12;

// Log-in
router.route("/log-in").post((req, res) => {
  console.log("in login");
  email = req.body.email;
  password = req.body.password;
  console.log(email);
  userSchema
    .findOne({
      email: email,
    })
    .then((user) => {
      if (!user) {
        console.log(user);
        console.log("invalid email");
        res.statusCode = 401;
        res.send("Invalid email or password");
      } else {
        bcrypt.compare(password, user.password).then((response) => {
          // password validation if email in database
          if (response !== true) {
            console.log("password incorrect");
            res.statusCode = 401;
            res.send("Invalid email or password");
          } else {
            console.log("user found & logged in");
            const token = jwt.sign({ id: user._id }, jwtSecret.secret); // token to store as cookie for authentication
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in",
              user: user,
            });
          }
        });
      }
    });
});

// CREATE User
router.route("/create-user").post((req, res, next) => {
  console.log(req.body);
  email = req.body.email;
  password = req.body.password;
  console.log("asdasd");
  userSchema.findOne({ email: email }).then((user) => {
    if (user != null) {
      console.log(user);
      console.log("email already taken");
      res.statusCode = 409;
      res.send("email taken");
    } else if (!isValidPassword(password)) {
      res.statusCode = 424; // "Dependency failed" (maybe use 409?)
      console.log("Invalid Password Requirements");
      res.send("Invalid Password Requirements");
    } else {
      //hash password before entering into database
      hashedPassword = bcrypt
        .hash(password, BCRYPT_SALT_ROUNDS)
        .then((hashedPassword) => {
          user = {
            email: email,
            password: hashedPassword,
          };
          console.log("Creating user...");
          userSchema.create(user, (error, data) => {
            if (error) {
              console.log(error);
              return next(error);
            } else {
              console.log("New user created!");
              console.log(data);
              res.json(data);
            }
          });
        });
    }
  });
});

// Edit user information
router.route("/edit-user").put((req, res) => {
  console.log("in edit");
  email = req.body.email;
  password = req.body.password;
  id = req.body.id;
  if (email.length === 0 && password.length === 0) {
    console.log("nothing to update");
    return res.status(401).send("nothing to update");
  } else {
    console.log(email);
    let user = userSchema.findById(id);
    if (!user) {
      console.log("invalid id");
      res.statusCode = 401;
      return res.send("invalid id");
    } else {
      // check valid email
      if (email.length === 0) {
        email = user.email;
      } else {
        console.log("checking if email is taken...");
        userSchema.find({ email: email }).then((e) => {
          console.log(e);
          if (e.length > 0) {
            console.log("email taken");
            return res.status(409).send("email taken");
          } else {
            if (password.length === 0) {
              password = user.password;
            } else {
              if (!isValidPassword(password)) {
                res.statusCode = 424; // "Dependency failed" (maybe use 409?)
                console.log("Invalid Password Requirements");
                return res.send("Invalid Password Requirements");
              }
              //hash password before entering into database
              hashedPassword = bcrypt
                .hash(password, BCRYPT_SALT_ROUNDS)
                .then((hashedPassword) => {
                  console.log("password");
                  newUser = {
                    email: email,
                    password: hashedPassword,
                  };
                  console.log("Updating user...");
                  userSchema.findByIdAndUpdate(
                    id,
                    { $set: newUser },
                    (error, data) => {
                      if (error) {
                        console.log(error);
                        return next(error);
                      } else {
                        console.log("User Updated!");
                        console.log(data);
                        return res.status(200).send(data);
                      }
                    }
                  );
                });
            }
          }
        });
      }
    }
  }
});

// Authorize user to access protected pages
router.route("/authorize").get((req, res, next) => {
  console.log(req.headers);
  passport.authenticate("jwt", { session: false }, async (error, token) => {
    console.log("authorizing...");
    console.log(token);
    if (!token) {
      console.log("no token");
    }
    if (error || !token) {
      console.log("unauthorized");
      res.status(401).send({ message: "Unauthorized" });
    } else {
      try {
        userSchema
          .findOne({
            email: token.email,
          })
          .then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            res.status(401).send(err);
          });
      } catch (error) {
        next(error);
      }
    }
  })(req, res, next);
});

/////////// helper functions

// validate password requirements
function isValidPassword(password) {
  if (password.length < 6) { //check for at least 6 characters
    return false;
  }
  if (!(/[a-z]/.test(password))) { //check for lowercase character
    return false;
  }
  if (!(/[A-Z]/.test(password))) { // check for uppercase character
    return false;
  }
  if(!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) { // check for special character
    return false;
  }
  if(!/\d/.test(password)) {
    return false;
  }

  return true;
}

module.exports = router;
