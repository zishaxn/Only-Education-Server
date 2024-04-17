const Users = require("../models/users");

module.exports.login = async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await Users.findOne({ email });

    if (!user) {
      user = await Users.create({ email, name });
      return res.json({ status: true, user });
    }
    return res.json({ status: true });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ msg: "Login failed", status: false });
  }
};

const Question = require("../models/questions");

module.exports.questions = async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);

    // Return the array of random questions
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res
      .status(500)
      .json({ msg: "Failed to fetch questions", error: error.message });
  }
};

module.exports.getuseranswers = async (req, res) => {
  const { name } = req.body; // Get the name from the request parameters
  console.log(name);
  try {
    const userAnswers = await Reports.findOne({ name }); // Find user answers by name
    if (!userAnswers) {
      return res.status(404).json({ msg: "User answers not found" });
    }
    res.json(userAnswers); // Return the user answers
  } catch (error) {
    console.error("Error fetching user answers:", error);
    res
      .status(500)
      .json({ msg: "Failed to fetch answers", error: error.message });
  }
};


const Reports = require("../models/reports");

module.exports.saveResult = async (req, res) => {
  const { name, score, userAnswers } = req.body;

  try {
    // Find the report by name
    let existingReport = await Reports.findOne({ name });

    if (existingReport) {
      // If the report exists, update the score and userAnswers
      existingReport.score = score;
      existingReport.useranswers = userAnswers; // Update userAnswers
      await existingReport.save();
    } else {
      // If the report doesn't exist, create a new report document
      existingReport = new Reports({
        name: name,
        score: score,
        useranswers: userAnswers, // Set userAnswers for a new report
      });
      await existingReport.save();
    }

    // Respond with a success message
    res.status(200).json({ message: "Result saved successfully" });
  } catch (error) {
    console.error("Error saving result:", error);
    // Respond with an error message
    res.status(500).json({ message: "Failed to save result" });
  }
};

module.exports.getSubmissions = async (req, res) => {
  try {
    // Fetch all submissions from the database
    const submissions = await Reports.find().sort({ score: -1 });

    // Respond with the submissions
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    // Respond with an error message
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};
