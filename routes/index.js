const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require("../controllers/userController");

// router.get('/', (req, res) => {
//   res.render('index');
// });

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/../public/index.html");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get('/login', (req, res) => {
  if (req.session.userId) {
    res.render('/personalinfo');
  } else {
    res.render('login');
  }
});

router.get("/thank", (req, res) => {
    res.render("thank");
});

router.get("/loginerror", (req, res) => {
    res.render("loginerror");
});

router.get("/quiz", userController.allQuestions);

router.post("/login", userController.login);

router.post("/personalinfo", userController.insertInfo);

router.post("/answer", userController.checkAnswer);

module.exports = router;
