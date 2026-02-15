import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll';
import PollPage from './pages/PollPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>Poll Rooms</h1>
            <p>Create polls and get instant results</p>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/poll/:id" element={<PollPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;