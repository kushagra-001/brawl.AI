import React, { useState, useEffect } from 'react';
import { User, Edit3, Coins, Zap, Trophy, Check } from 'lucide-react';

const PlayerProfilePanel = ({ playHover, playClick }) => {
  const [playerData, setPlayerData] = useState({
    username: 'PlayerX',
    level: 1,
    xp: 0,
    coins: 250
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('brawlAI_playerProfile');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setPlayerData(parsed);
      // Simulate XP gain on page load (+10 XP)
      handleXPBoost(parsed, 10);
    } else {
      // First time initialization
      localStorage.setItem('brawlAI_playerProfile', JSON.stringify(playerData));
      handleXPBoost(playerData, 10);
    }
  }, []);

  const handleXPBoost = (currentData, amount) => {
    let nextXP = currentData.xp + amount;
    let nextLevel = currentData.level;
    
    if (nextXP >= 100) {
      nextLevel += 1;
      nextXP = nextXP - 100;
      // Bonus coins for level up
      const nextCoins = currentData.coins + 100;
      updatePlayerData({ ...currentData, level: nextLevel, xp: nextXP, coins: nextCoins });
    } else {
      updatePlayerData({ ...currentData, xp: nextXP });
    }
  };

  const updatePlayerData = (newData) => {
    setPlayerData(newData);
    localStorage.setItem('brawlAI_playerProfile', JSON.stringify(newData));
  };

  const startEditing = () => {
    playClick();
    setNewUsername(playerData.username);
    setIsEditing(true);
  };

  const saveUsername = () => {
    playClick();
    if (newUsername.trim()) {
      updatePlayerData({ ...playerData, username: newUsername });
    }
    setIsEditing(false);
  };

  const addManualXP = () => {
    playClick();
    handleXPBoost(playerData, 10);
  };

  // XP Progress Percentage
  const xpPercentage = (playerData.xp / 100) * 100;

  return (
    <div className="profile-panel-container float-animation">
      <div className="profile-panel-card glass-panel neon-border-pulse" onMouseEnter={playHover}>
        
        {/* Profile Header */}
        <div className="profile-panel-header">
          <div className="profile-avatar-wrap">
            <div className="avatar-placeholder">
              <User size={30} className="text-primary" />
            </div>
            <div className="level-indicator-hex font-orbitron">
              <span>{playerData.level}</span>
            </div>
          </div>

          <div className="profile-name-section">
            {isEditing ? (
              <div className="edit-name-input-wrap">
                <input 
                  type="text" 
                  value={newUsername} 
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="username-input font-orbitron"
                  autoFocus
                  maxLength={12}
                />
                <button onClick={saveUsername} className="save-name-btn">
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div className="username-display-wrap">
                <h3 className="player-username font-orbitron text-glow-blue">{playerData.username}</h3>
                <button onClick={startEditing} className="edit-icon-btn">
                  <Edit3 size={14} />
                </button>
              </div>
            )}
            <p className="player-status font-montserrat">ELITE PILOT</p>
          </div>
        </div>

        {/* Currency Display */}
        <div className="profile-currency-wrap">
          <div className="currency-pill gold-glow">
            <Coins size={14} className="text-gold" />
            <span className="font-orbitron">{playerData.coins} CR</span>
          </div>
          <div className="currency-pill blue-glow" onClick={addManualXP} style={{ cursor: 'pointer' }}>
            <Zap size={14} className="text-primary" />
            <span className="font-orbitron">BOOST XP</span>
          </div>
        </div>

        {/* XP Progress Section */}
        <div className="profile-xp-section">
          <div className="xp-label-row font-montserrat">
            <span className="xp-title">EXPERIENCE</span>
            <span className="xp-value">{playerData.xp} / 100</span>
          </div>
          <div className="xp-progress-track">
            <div 
              className="xp-progress-fill premium-xp-pulse" 
              style={{ width: `${xpPercentage}%` }}
            >
              <div className="xp-glimmer"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlayerProfilePanel;
