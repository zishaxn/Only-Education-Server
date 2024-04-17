const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  useranswers: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Reports", reportSchema);
