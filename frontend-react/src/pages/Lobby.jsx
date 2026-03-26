import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Trophy, Activity, Zap, Shield, Play } from 'lucide-react';
import './Lobby.css';

// Import avatars (Note: in a real app these might be dynamic URLs)
import avatar1 from '../assets/avatar_1.png';
import avatar2 from '../assets/avatar_2.png';
import avatar3 from '../assets/avatar_3.png';
import avatar4 from '../assets/avatar_4.png';
import avatar5 from '../assets/avatar_5.png';

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

const Lobby = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = '/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Parallel fetching
        const [profRes, leadRes, nodeRes] = await Promise.all([
          fetch(`${API_BASE}/user/profile/${user.username}`),
          fetch(`${API_BASE}/leaderboard`),
          fetch(`${API_BASE}/system/nodes`)
        ]);

        const [profData, leadData, nodeData] = await Promise.all([
          profRes.json(),
          leadRes.json(),
          nodeRes.json()
        ]);

        setProfile(profData);
        setLeaderboard(leadData);
        setNodes(nodeData);
      } catch (err) {
        console.error("Error fetching lobby data:", err);
        // Fallback or handle error
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const getAvatar = () => {
    if (!user) return avatar1;
    let hash = 0;
    for (let i = 0; i < user.username.length; i++) {
        hash = user.username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const cleanName = user.username.trim().toLowerCase();
    const isFemale = /[aiey]$/i.test(cleanName) || ['mary', 'chloe', 'sruti', 'anishaa'].includes(cleanName);
    
    if (isFemale) {
        const femaleAvatars = [1, 4]; // 0-indexed: avatar2, avatar5
        return avatars[femaleAvatars[Math.abs(hash) % femaleAvatars.length]];
    } else {
        const maleAvatars = [0, 2, 3]; // avatar1, avatar3, avatar4
        return avatars[maleAvatars[Math.abs(hash) % maleAvatars.length]];
    }
  };

  const currentXP = profile?.xp || 0;
  const maxXP = (profile?.level || 1) * 200;
  const xpPercentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <div className="lobby-container">
      {/* Background Glitter Effect (Simulated in CSS) */}
      <div className="glitter-overlay"></div>

      {/* HEADER / USER PANEL */}
      <header className="lobby-header glass-panel">
        <div className="user-info">
          <div className="avatar-preview" style={{ backgroundImage: `url(${getAvatar()})` }}></div>
          <div className="user-details">
            <h1 className="username font-montserrat">{user.username.toUpperCase()}</h1>
            <div className="level-badge font-orbitron">LVL {profile?.level || 1}</div>
          </div>
        </div>

        <div className="xp-container">
          <div className="xp-header">
            <span>EXPERIENCE PROGRESSION</span>
            <span>{currentXP} / {maxXP} XP</span>
          </div>
          <div className="xp-track">
            <div className="xp-bar" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={20} />
          <span>LOGOUT</span>
        </button>
      </header>

      <main className="lobby-content">
        {/* LEFT SECTION: Modes & Stats */}
        <section className="modes-section">
          <div className="mode-card ai-card glass-panel">
            <div className="card-tag">PVE</div>
            <div className="card-content">
              <h2 className="font-montserrat">PLAYER VS AI</h2>
              <p>Test your strategy against our neural networks.</p>
              <button className="start-battle-btn font-orbitron" onClick={() => navigate('/battle')}>
                <Play fill="white" size={18} /> START BATTLE
              </button>
            </div>
          </div>

          <div className="modes-grid">
            <div className="mode-card glass-panel locked">
              <div className="card-tag">PVP</div>
              <h3>ARENA 1V1</h3>
              <p>Coming Soon</p>
            </div>
            <div className="mode-card glass-panel locked">
              <div className="card-tag">ROYALE</div>
              <h3>100 PLAYER BR</h3>
              <p>Coming Soon</p>
            </div>
          </div>

          <div className="stats-panel glass-panel">
            <h3 className="font-montserrat"><Activity size={18} /> COMBAT STATS</h3>
            <div className="stat-grid">
              <div className="stat-box">
                <span className="stat-label">AI DEFEATED</span>
                <span className="stat-value">{profile?.stats?.aiDefeated || 0}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">WIN RATE</span>
                <span className="stat-value">68%</span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: Logs & Leaderboard */}
        <aside className="lobby-sidebar">
          <div className="sidebar-section glass-panel">
            <h3 className="font-montserrat"><Shield size={18} /> COMBAT LOG</h3>
            <div className="log-list">
              {profile?.matches?.length > 0 ? (
                profile.matches.slice(0, 3).map((match, i) => (
                  <div key={i} className={`log-item ${match.result.toLowerCase()}`}>
                    <div className="log-info">
                      <strong>{match.result}</strong>
                      <span>vs {match.opponent}</span>
                    </div>
                    <span className="xp-change">+{match.xpChange} XP</span>
                  </div>
                ))
              ) : (
                <div className="empty-msg">No combat data found for Pilot.</div>
              )}
            </div>
          </div>

          <div className="sidebar-section glass-panel">
            <h3 className="font-montserrat"><Trophy size={18} /> GLOBAL PILOTS</h3>
            <div className="leaderboard-list">
              {leaderboard.map((player, idx) => (
                <div key={idx} className={`leader-item ${idx === 0 ? 'top-one' : ''}`}>
                  <span className="rank">#{idx + 1} {player.username.toUpperCase()}</span>
                  <span className="lvl">LVL {player.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section glass-panel">
            <h3 className="font-montserrat"><Zap size={18} /> SERVER NODES</h3>
            <div className="nodes-list">
              {nodes.map((node, i) => (
                <div key={i} className="node-item">
                  <span className="node-name">{node.name}</span>
                  <span className="node-status" style={{ color: node.color }}>
                    {node.status} [{node.ping}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Lobby;
