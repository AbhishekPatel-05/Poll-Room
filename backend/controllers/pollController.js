const Poll = require('../database/Schema');

const checkStatus = async (req, res) => {
  res.json({ status: 'ok' });
}

// Create poll
const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: 'Question and at least 2 options required' });
    }

    const poll = new Poll({
      question,
      options: options.map(opt => ({ text: opt, votes: 0 }))
    });

    await poll.save();
    res.json({ pollId: poll._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create poll' });
  }
};

// Get poll by ID
const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get poll' });
  }
};

// To get IP address
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         req.ip ||
         'unknown';
};

// Vote on poll
const voteOnPoll = (io) => async (req, res) => {
  try {
    const { optionIndex, voterIdentifier } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option selected' });
    }

    const userIP = getClientIP(req);

    // #1: Check if voter identifier has already voted 
    const votedByIdentifier = poll.voters.some(v => v.identifier === voterIdentifier);
    if (votedByIdentifier) {
      return res.status(400).json({ message: 'You have already voted on this poll' });
    }

    // #2: Check if IP already voted
    const votedByIP = poll.voters.some(v => v.ip === userIP);
    if (votedByIP) {
      return res.status(400).json({ message: 'You have already voted on this poll' });
    }

    poll.options[optionIndex].votes += 1;
    
    poll.voters.push({
      identifier: voterIdentifier,
      ip: userIP,  
      votedAt: new Date()
    });

    await poll.save();

    io.to(req.params.id).emit('voteUpdate', poll);

    res.json({ success: true, poll });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ message: 'You have already voted on this poll' });
  }
};

module.exports = { createPoll, getPoll, voteOnPoll, checkStatus };
