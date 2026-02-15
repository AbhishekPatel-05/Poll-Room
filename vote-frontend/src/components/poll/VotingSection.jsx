import React from 'react';

function VotingSection({ 
  options, 
  selectedOption, 
  onSelectOption, 
  onSubmitVote, 
  isVoting 
}) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Give Vote</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        {options.map((option, index) => (
          <label
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              marginBottom: '0.5rem',
              border: selectedOption === index ? '2px solid #667eea' : '2px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer',
              background: selectedOption === index ? '#f0f4ff' : 'white'
            }}
          >
            <input
              type="radio"
              name="poll-option"
              value={index}
              checked={selectedOption === index}
              onChange={() => onSelectOption(index)}
              disabled={isVoting}
              style={{ marginRight: '0.75rem' }}
            />
            <span>{option.text}</span>
          </label>
        ))}
      </div>
      
      <button
        className="btn"
        onClick={onSubmitVote}
        disabled={isVoting || selectedOption === null}
      >
        {isVoting ? 'Submitting...' : 'Submit Vote'}
      </button>
    </div>
  );
}

export default VotingSection;