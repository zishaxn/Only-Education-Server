const express = require("express");

const Router = express.Router();

const {
  login,
  questions,
  saveResult,
  getSubmissions,
  getuseranswers,
} = require("../controllers/controllers");

// Login route
Router.route("/login").post(login);
Router.route("/saveresult").post(saveResult);
Router.route("/questions").get(questions);
Router.route("/getsubmissions").get(getSubmissions);
Router.route("/getuseranswers").get(getuseranswers);

module.exports = Router;
