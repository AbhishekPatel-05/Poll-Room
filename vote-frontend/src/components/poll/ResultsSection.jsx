import React from 'react';

function ResultsSection({ options, hasVoted, getTotalVotes, getPercentage }) {
  return (
    <div>
      <h3>
        Results {hasVoted && <span style={{ color: '#48bb78' }}> You have voted</span>}
      </h3>
      
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{option.text}</span>
              <span>{option.votes} votes ({getPercentage(option.votes)}%)</span>
            </div>
            
            <div style={{
              width: '100%',
              height: '30px',
              background: '#f0f0f0',
              borderRadius: '5px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: `${getPercentage(option.votes)}%`,
                height: '100%',
                background: '#667eea',
                position: 'absolute',
                transition: 'width 0.5s'
              }}>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsSection;