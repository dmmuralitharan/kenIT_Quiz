const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String], 
    required: true,
    validate: [arrayLengthValidator, 'Exactly four options are required'],
  },
  correctOption: {
    type: Number, 
    required: true,
    min: 0,
    max: 3, 
  },
});

function arrayLengthValidator(val) {
  return val.length === 4;
}

const Questions = mongoose.model('Questions', questionSchema,'testQuestion');
// const Questions = mongoose.model('Questions', questionSchema,'Questions');

module.exports = Questions;
