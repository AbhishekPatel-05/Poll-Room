import React from 'react';

function PollHeader({ question, onCopyLink }) {
  return (
    <div className="header">
      <h2 className="question">{question}</h2>
      <button className="btn" onClick={onCopyLink}>
        Copy Link
      </button>
    </div>
  );
}

export default PollHeader;