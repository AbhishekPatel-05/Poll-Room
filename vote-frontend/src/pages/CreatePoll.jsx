import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePoll() {
  const navigate = useNavigate();
  
  const [q, setQ] = useState('');
  const [opts, setOpts] = useState(['', '']);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState('');

  const addOpt = () => {
    setOpts([...opts, '']);
  };

  const removeOpt = (index) => {
    if (opts.length > 2) {
      setOpts(opts.filter((_, i) => i !== index));
    }
  };

  const changeOpt = (index, value) => {
    const newOpts = [...opts];
    newOpts[index] = value;
    setOpts(newOpts);
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr('');

    if (!q.trim()) {
      setErr('Please enter a question');
      return;
    }

    const valid = opts.filter(opt => opt.trim() !== '');
    
    if (valid.length < 2) {
      setErr('Please provide at least 2 options');
      return;
    }

    setLoad(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-polls`,
        {
          question: q.trim(),
          options: valid
        }
      );

      navigate(`/poll/${res.data.pollId}`);
    } catch (error) {
      setErr('Failed to create poll');
      setLoad(false);
    }
  };

  return (
    <div className="card">
      <h2>Create a New Poll</h2>
      <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
        Ask a question and add at least 2 options.
      </p>

      <form onSubmit={submit}>
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            className="input"
            placeholder="What's your question?"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Options</label>
          {opts.map((option, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                className="input"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => changeOpt(index, e.target.value)}
              />
              {opts.length > 2 && (
                <button
                  type="button"
                  className="btn"
                  onClick={() => removeOpt(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn"
            onClick={addOpt}
            style={{ marginTop: '0.5rem' }}
          >
            + Add Option
          </button>
        </div>

        {err && <div className="alert">{err}</div>}

        <button type="submit" className="btn" disabled={load}>
          {load ? 'Creating...' : 'Create Poll'}
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;