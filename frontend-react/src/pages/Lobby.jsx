import React from 'react';
import './Lobby.css';

const Lobby = () => {
  return (
    <div className="lobby-wrapper">
      <div className="container">
        
        {/* LEFT SIDEBAR */}
        <div className="left">
          <div className="simple-card">
            <h3>TELEMETRY</h3>
            <p>System Online: 100%</p>
            <p>Neural Link: Active</p>
          </div>
          <div className="simple-card">
            <h3>BOUNTY BOARD</h3>
            <ul>
              <li>Neutralize 5 AI Units</li>
              <li>Complete 1 Duel</li>
            </ul>
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="center">
          <div className="center-content">
            <h1 className="mission-title">SELECT MISSION PROTOCOL</h1>
            
            <div className="mission-grid">
              <div className="mission-box">
                <h2>BATTLE AI</h2>
                <p>Train against advanced neural networks.</p>
              </div>
              <div className="mission-box">
                <h2>DUEL PLAYER</h2>
                <p>Ranked 1v1 combat engagement.</p>
              </div>
              <div className="mission-box">
                <h2>SQUAD ARENA</h2>
                <p>Team-based tactical skirmish.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="right">
          <div className="simple-card">
            <h3>PLAYER PROFILE</h3>
            <p>Username: Pilot_X</p>
            <p>Level: 12</p>
          </div>
          <div className="simple-card">
            <h3>OPERATORS</h3>
            <p>No active units deployed.</p>
          </div>
          <div className="simple-card chat-section">
            <h3>CHAT</h3>
            <div className="chat-content">
              Welcome to the Hub.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Lobby;
