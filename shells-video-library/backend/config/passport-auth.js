//import jwtSecret from './jwtConfig';
//import bcrypt from 'bcrypt';


const passport = require("passport"),
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt,
  mongoose = require("mongoose"),
  jwtSecret = require("./jwtConfig");
let userSchema = require("../Models/Users");
const createError = require('http-errors');
 


const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret,
};

// Authenticates JWT by taking id from payload and searching for user in database
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      userSchema.findById(
          jwt_payload.id
      ).then((user) => {
        if (user) {
          console.log("user found in db in passport");
          done(null, user);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      console.log("caught an error")
      done(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
 
passport.deserializeUser(function (id, cb) {
 
    cb(null, user);
 
});
