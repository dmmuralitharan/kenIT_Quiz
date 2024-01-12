const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  participant1 : {type:String,required : true},
  participant2 : {type:String,required : true},
  collegeName : {type:String,required : true},
  answerCount: Number,
  refreshCounter : Number,
  timestamp: { type: Date, default: Date.now },
  timerTime: { type: String, required: true },
});

// const QuizResult = mongoose.model("QuizResult", quizResultSchema, "results");
const QuizResult = mongoose.model("QuizResult", quizResultSchema, "Results");

module.exports = QuizResult;
