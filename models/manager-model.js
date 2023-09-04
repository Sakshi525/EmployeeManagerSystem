// models/Manager.js
const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('Manager', managerSchema);
