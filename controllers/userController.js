const User = require("../models/userModel");
const Info = require("../models/infoModel");
const Questions = require("../models/questionModel");
const QuizResult = require("../models/quizResult");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.userName = username;
      const sessionName = req.session.userName;
      res.render("personalinfo", { sessionName });
    } else {
      res.render("loginerror");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during login.");
  }
};

exports.insertInfo = async (req, res) => {
  const { participant1, participant2, clgname } = req.body;
  try {
    const username = req.session.userName;
    // console.log(username);
    const newInfo = await Info.create({
      participant1,
      participant2,
      clgname,
      username,
    });
    res.render("rules");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Info.");
  }
};

exports.allQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();
    const sessionName = req.session.userName;

    // timerTime = startTimer(10);

    res.render("quiz", { questions, sessionName });
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.checkAnswer = async (req, res) => {
  try {
    let count = 0;
    const questions = await Questions.find();

    for (let i = 0; i < 3; i++) {
      const answerIndex = parseInt(req.body[`answer${i}`]);
      if (answerIndex === questions[i].correctOption) {
        count = count + 1;
      }
    }

    const username = req.session.userName;
    const TimeString = req.body.hTimer;
    console.log(TimeString);
    const time1Str = "15:00";
    const time2Str = TimeString; 
    
    // Function to convert time strings to total seconds
    function timeToSeconds(timeStr) {
      const [minutesPart, secondsPart] = timeStr.split(/[:.]/).map(Number);
      return minutesPart * 60 + secondsPart;
    }
    
    
    
    const time1Seconds = timeToSeconds(time1Str);
    const time2Seconds = timeToSeconds(time2Str);
    console.log(time1Seconds);
    console.log(time2Seconds);
    
    const timeDifferenceSeconds = Math.abs(time1Seconds - time2Seconds);
    console.log(timeDifferenceSeconds);
    
    const minutesDifference = Math.floor(timeDifferenceSeconds / 60);
    console.log(minutesDifference);
    const secondsDifference = timeDifferenceSeconds % 60;
    console.log(secondsDifference);
    
    const formattedDifference = `${minutesDifference}:${secondsDifference}`;
    
    console.log(`${formattedDifference}`);

    const newResult = await QuizResult.create({
      username,
      answerCount: count,
      timerTime:formattedDifference,
    });

    res.render("thank", { count });
  } catch (err) {
    console.error("Error processing quiz result:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
