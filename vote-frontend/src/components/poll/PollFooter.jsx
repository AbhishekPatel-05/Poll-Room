import React from 'react';
import { useNavigate } from 'react-router-dom';

function PollFooter({ totalVotes, hasVoted }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="footer">
        <p>
          <strong>Total Votes: {totalVotes}</strong>
        </p>
        {hasVoted && (
          <div className="badge">
            You have voted on this poll
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <button 
          className="btn" 
          onClick={() => navigate('/')}
          style={{ width: 'auto', padding: '0.5rem 1.5rem' }}
        >
          Create New Poll
        </button>
      </div>
    </>
  );
}

export default PollFooter;