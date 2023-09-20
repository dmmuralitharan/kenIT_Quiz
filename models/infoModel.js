const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    participant1:String,
     participant2:String,
      clgname:String,
       username: String
});

// const Info = mongoose.model('Info', infoSchema, 'testPersonalInfo');
const Info = mongoose.model('Info', infoSchema, 'Teaminfo');

module.exports = Info;
