import React, { useState } from 'react';
import { Edit2, Check, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import avatar1 from '../../assets/avatar_1.png';
import avatar2 from '../../assets/avatar_2.png';
import avatar3 from '../../assets/avatar_3.png';

const avatars = [avatar1, avatar2, avatar3];

const PlayerProfile = ({ profile, playHover, playClick }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.username);

  const handleSave = () => {
    playClick();
    setIsEditing(false);
    // In a real app we'd trigger an API call to update the username here
  };

  const getRankBadge = (tier) => {
    const ranks = { 'BRONZE': '#cd7f32', 'SILVER': '#c0c0c0', 'GOLD': '#ffd700', 'PLATINUM': '#e5e4e2' };
    return ranks[tier] || '#ffd700';
  };

  const avatarSrc = avatars[user.username.length % 3] || avatar1;
  const xpPercentage = Math.min((profile.xp / profile.maxXP) * 100, 100);

  return (
    <div className="player-profile premium-glass neo-border">
      <div className="profile-header">
        <div className="avatar-wrapper" onMouseEnter={playHover}>
          <div className="avatar-preview" style={{ backgroundImage: `url(${avatarSrc})` }} />
          <div className="avatar-ring" style={{ border: `1px dashed ${getRankBadge(profile.rank)}` }} />
          <div className="rank-badge" style={{ background: getRankBadge(profile.rank) }}>
            <Star fill="#000" size={12} />
          </div>
        </div>

        <div className="user-details-edit">
          {isEditing ? (
            <div className="edit-username-form">
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)} 
                autoFocus
                className="edit-input font-orbitron text-primary"
              />
              <button className="icon-btn save-btn" onClick={handleSave} onMouseEnter={playHover}>
                <Check size={14} color="#00ff73"/>
              </button>
            </div>
          ) : (
            <div className="username-display font-orbitron">
              <h2>{tempName.toUpperCase()}</h2>
              <button className="icon-btn edit-btn" onClick={() => { playClick(); setIsEditing(true); }} onMouseEnter={playHover}>
                <Edit2 size={12} />
              </button>
            </div>
          )}
          <span className="profile-rank font-montserrat" style={{ color: getRankBadge(profile.rank) }}>{profile.rank} PILOT</span>
        </div>
      </div>

      <div className="xp-container profile-xp">
        <div className="xp-details font-montserrat">
          <span className="lvl-badge font-orbitron">LVL {profile.level}</span>
          <span className="xp-text">{profile.xp} / {profile.maxXP} XP</span>
        </div>
        <div className="xp-track">
          <div className="xp-bar" style={{ width: `${xpPercentage}%`, background: `linear-gradient(90deg, #a238ff, ${getRankBadge(profile.rank)})` }}>
            <div className="xp-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
