import React from 'react';

function ErrorMessage({ message, onRetry, retryText = 'Try Again' }) {
  return (
    <div className="alert">
      {message}
      {onRetry && (
        <button 
          className="btn" 
          onClick={onRetry}
          style={{ marginTop: '0.5rem' }}
        >
          {retryText}
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;