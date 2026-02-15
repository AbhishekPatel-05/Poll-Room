import React from 'react';

function ShareSection({ onCopyLink }) {
  return (
    <div className="share">
      <h3>Share this poll</h3>
      <div className="link-box">
        <input
          type="text"
          className="link-input"
          value={window.location.href}
          readOnly
          onClick={(e) => e.target.select()}
        />
        <button className="btn" onClick={onCopyLink}>
          Copy
        </button>
      </div>
    </div>
  );
}

export default ShareSection;