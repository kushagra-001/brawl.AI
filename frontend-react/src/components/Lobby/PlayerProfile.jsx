import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Coins, Star, Shield } from 'lucide-react';

const avatars = [
  'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=250&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=250&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop'
];

const PlayerProfile = ({ profile, playHover, playClick }) => {
  const { user } = useAuth();

  const getRankData = (level) => {
    if (level < 10) return { name: 'Rookie', color: '#00f0ff' };
    if (level < 30) return { name: 'Warrior', color: '#a238ff' };
    if (level < 50) return { name: 'Gladiator', color: '#ff0055' };
    return { name: 'Legend', color: '#ffd700' };
  };

  const rankData = getRankData(profile.level);
  const avatarSrc = avatars[user.username.length % 3];
  const coins = 12450; // Mock coins
  const xpPercentage = Math.min((profile.xp / profile.maxXP) * 100, 100);

  return (
    <div className="anime-player-profile glow-border" style={{ '--rank-color': rankData.color }}>
      <div className="profile-header-anime">
        <div className="avatar-container-anime" onMouseEnter={playHover}>
          <div className="avatar-aura-effect" style={{ borderColor: rankData.color, boxShadow: `0 0 15px ${rankData.color}, inset 0 0 10px ${rankData.color}` }}></div>
          <img src={avatarSrc} alt="avatar" className="avatar-image-anime" />
          <div className="level-badge-anime font-orbitron">LVL {profile.level}</div>
        </div>

        <div className="user-details-anime">
           <h2 className="font-orbitron cyber-text-shadow m-0 text-white">{user.username.toUpperCase()}</h2>
           <div className="rank-display font-montserrat flex items-center gap-5" style={{ color: rankData.color }}>
             <Shield size={14} fill={rankData.color} /> {rankData.name.toUpperCase()}
           </div>
           
           <div className="coins-display font-orbitron flex items-center gap-5 mt-5 text-gold">
             <Coins size={14} /> {coins.toLocaleString()} CR
           </div>
        </div>
      </div>

      <div className="xp-container-anime mt-15">
        <div className="xp-details-anime font-montserrat text-xs flex justify-between mb-5">
          <span className="text-gray text-shadow-glow">NEXT RANK: {(profile.maxXP - profile.xp)} XP</span>
          <span className="text-white font-bold">{Math.round(xpPercentage)}%</span>
        </div>
        <div className="xp-track-anime">
          <div className="xp-bar-anime" style={{ width: `${xpPercentage}%`, background: `linear-gradient(90deg, ${rankData.color}, #fff)` }}>
            <div className="xp-glow-anime"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
