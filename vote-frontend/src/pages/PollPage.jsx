import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import PollHeader from '../components/poll/PollHeader';
import ShareSection from '../components/poll/ShareSection';
import VotingSection from '../components/poll/VotingSection';
import ResultsSection from '../components/poll/ResultsSection';
import PollFooter from '../components/poll/PollFooter';

function PollPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState('');
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const [voterId, setVoterId] = useState('');

  useEffect(() => {
    let vid = localStorage.getItem('voterId');
    if (!vid) {
      vid = `voter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('voterId', vid);
    }
    setVoterId(vid);

    const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
    if (votedPolls.includes(id)) {
      setVoted(true);
    }

    loadPoll();

    const socket = io(process.env.REACT_APP_API_URL);
    socket.emit('joinPoll', id);
    socket.on('voteUpdate', (updated) => setPoll(updated));

    return () => {
      socket.emit('leavePoll', id);
      socket.disconnect();
    };
  }, [id]);

  const loadPoll = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/polls/${id}`);
      setPoll(res.data);
      setLoad(false);
    } catch (error) {
      setErr('Poll not found');
      setLoad(false);
    }
  };

  const submit = async () => {
    if (selected === null) {
      setErr('Please select an option');
      return;
    }

    setVoting(true);
    setErr('');

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/polls/${id}/vote`,
        { optionIndex: selected, voterIdentifier: voterId }
      );

      setVoted(true);
      const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
      votedPolls.push(id);
      localStorage.setItem('votedPolls', JSON.stringify(votedPolls));

      setPoll(res.data.poll);
      setVoting(false);
    } catch (error) {
      setErr(error.response?.data?.message || 'Failed to vote');
      setVoting(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied!'))
      .catch(() => alert('Failed to copy'));
  };

  const getTotal = () => {
    if (!poll) return 0;
    return poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  };

  const getPercent = (votes) => {
    const total = getTotal();
    if (total === 0) return 0;
    return ((votes / total) * 100).toFixed(1);
  };

  if (load) {
    return (
      <div className="card">
        <LoadingSpinner message="Loading poll..." />
      </div>
    );
  }

  if (err && !poll) {
    return (
      <div className="card">
        <ErrorMessage 
          message={err} 
          onRetry={() => navigate('/')} 
          retryText="Create New Poll" 
        />
      </div>
    );
  }

  return (
    <div className="card">
      <PollHeader question={poll.question} onCopyLink={copy} />
      <ShareSection onCopyLink={copy} />

      {err && <div className="alert">{err}</div>}

      {!voted && (
        <VotingSection
          options={poll.options}
          selectedOption={selected}
          onSelectOption={setSelected}
          onSubmitVote={submit}
          isVoting={voting}
        />
      )}

      <ResultsSection
        options={poll.options}
        hasVoted={voted}
        getTotalVotes={getTotal}
        getPercentage={getPercent}
      />

      <PollFooter totalVotes={getTotal()} hasVoted={voted} />
    </div>
  );
}

export default PollPage;