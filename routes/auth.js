// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  // Simulate user authentication
  const { username, password } = req.body;
  if (username === 'demo' && password === '123') {
    const my = req.session.userName = username; 
    // res.redirect('/auth/dashboard');
    res.render('dashboard',{my})
  } else {
    res.render('login');
  }
});

router.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    // User is logged in, retrieve user-specific data
    res.render('dashboard');
  } else {
    // User is not logged in, redirect them to the login page
    res.redirect('/login');
  }
});

module.exports = router;
