const mongoose = require('mongoose');

const Sch = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    votes: { type: Number, default: 0 }
  }],
  voters: [{
    identifier: String,
    ip : String,
    votedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', Sch);