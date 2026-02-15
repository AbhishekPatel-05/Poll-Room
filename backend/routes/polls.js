const express = require('express');
const router = express.Router();
const { createPoll, getPoll, voteOnPoll,checkStatus } = require('../controllers/pollController');

module.exports = (io) => {
  router.post('/create-polls', createPoll);
  router.get('/polls/:id', getPoll);
  router.post('/polls/:id/vote', voteOnPoll(io));
  router.get('/health', checkStatus); 

  return router;
};