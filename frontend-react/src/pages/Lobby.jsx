import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Trophy, Activity, Zap, Shield, Play, Crosshair, Users, Hexagon, Settings, Award } from 'lucide-react';
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
    // Simulated fetching for frontend demonstration without backend
    const fetchMockData = () => {
      setProfile({
        level: 12,
        xp: 1450,
        stats: { aiDefeated: 243, winRate: "72%", totalMatches: 337 },
        matches: [
          { result: 'VICTORY', opponent: 'NeuralBot_X', xpChange: 50 },
          { result: 'DEFEAT', opponent: 'AlphaOmega', xpChange: 15 },
          { result: 'VICTORY', opponent: 'CyberGrind', xpChange: 45 },
        ]
      });

      setLeaderboard([
        { username: 'FakerAI', level: 99 },
        { username: 'VoidWalker', level: 87 },
        { username: 'NeonNinja', level: 82 },
        { username: 'GlitchTrap', level: 75 },
      ]);

      setNodes([
        { name: 'N-AMR-E1', status: 'ONLINE', ping: '12ms', color: '#00ff73' },
        { name: 'EU-WST-X', status: 'ONLINE', ping: '34ms', color: '#00ff73' },
        { name: 'AS-PAC-9', status: 'HEAVY', ping: '105ms', color: '#ffb800' },
        { name: 'N-AMR-W2', status: 'OFFLINE', ping: 'ERR', color: '#ff4d4d' },
      ]);

      setLoading(false);
    };

    if (user) {
      fetchMockData();
    }
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
      {/* Background Cyberpunk Elements */}
      <div className="glitter-overlay"></div>
      <div className="cyber-grid-bg"></div>
      
      {/* HEADER / USER PANEL */}
      <header className="lobby-header glass-panel neo-border">
        <div className="header-left">
          <div className="brand-logo font-orbitron">
            <Hexagon className="logo-icon" size={28} />
            <span>BRAWL<span>.AI</span></span>
          </div>
          
          <nav className="main-nav font-montserrat">
            <button className="nav-item active"><Users size={16}/> LOBBY</button>
            <button className="nav-item"><Shield size={16}/> ARMORY</button>
            <button className="nav-item"><Award size={16}/> MISSIONS</button>
          </nav>
        </div>

        <div className="header-center xp-container">
          <div className="xp-details font-montserrat">
            <span className="lvl-badge font-orbitron">LVL {profile?.level || 1}</span>
            <span className="xp-text">{currentXP} / {maxXP} XP</span>
          </div>
          <div className="xp-track">
            <div className="xp-bar" style={{ width: `${xpPercentage}%` }}>
               <div className="xp-glow"></div>
            </div>
          </div>
        </div>

        <div className="header-right user-info">
          <div className="user-details font-montserrat">
            <span className="user-title">ELITE PILOT</span>
            <span className="username font-orbitron">{user.username.toUpperCase()}</span>
          </div>
          <div className="avatar-wrapper">
            <div className="avatar-preview" style={{ backgroundImage: `url(${getAvatar()})` }}></div>
            <div className="avatar-ring"></div>
          </div>
          
          <button className="icon-btn settings-btn"><Settings size={20} /></button>
          <button className="icon-btn logout-btn" onClick={logout} title="Disconnect">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="lobby-content">
        {/* LEFT SECTION: Modes & Features */}
        <section className="central-hub">
          <div className="section-title font-orbitron">
            <h2>WARZONE SELECTOR</h2>
            <div className="title-line"></div>
          </div>

          <div className="primary-modes">
            {/* Battle Royale Card */}
            <div className="mode-card br-card premium-glass" onClick={() => navigate('/arena')}>
              <div className="card-bg-image br-bg"></div>
              <div className="card-overlay"></div>
              <div className="card-content">
                <div className="card-header">
                  <span className="card-tag neo-tag">RANKED</span>
                  <span className="player-count"><Users size={14}/> 100/100</span>
                </div>
                <div className="card-body">
                  <h2 className="font-orbitron cyber-glitch" data-text="TURBO ARENA BR">TURBO ARENA BR</h2>
                  <p className="font-montserrat">Drop into the cyber-cityscape. Survive against 99 other mechs in the ultimate test of combat efficiency.</p>
                </div>
                <div className="card-footer">
                  <button className="action-btn deploy-btn font-orbitron">
                    <Zap size={18} /> DEPLOY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="secondary-modes">
            {/* PVE Card */}
            <div className="mode-card pve-card premium-glass" onClick={() => navigate('/battle')}>
              <div className="card-bg-image pve-bg"></div>
              <div className="card-overlay"></div>
              <div className="card-content">
                 <div className="card-header">
                  <span className="card-tag training-tag">TRAINING</span>
                </div>
                <div className="card-body">
                  <h3 className="font-orbitron">AI COMBAT SIM</h3>
                  <p>Hone your skills against our advanced neural-network bots.</p>
                </div>
                <button className="action-btn secondary-btn font-orbitron">
                  <Play size={16} fill="currentColor" /> INITIATE
                </button>
              </div>
            </div>

            {/* 1v1 Arena */}
            <div className="mode-card pvp-card premium-glass locked">
               <div className="card-bg-image pvp-bg"></div>
               <div className="card-overlay"></div>
               <div className="card-content">
                 <div className="card-header">
                  <span className="card-tag locked-tag">MAINTENANCE</span>
                </div>
                <div className="card-body">
                  <h3 className="font-orbitron">1 V 1 DUELS</h3>
                  <p>The Colosseum is currently undergoing system upgrades.</p>
                </div>
                 <button className="action-btn locked-btn font-orbitron" disabled>
                  OFFLINE
                </button>
              </div>
            </div>
          </div>

          {/* Player Stats Panel below modes */}
          <div className="stats-dashboard premium-glass neo-border">
            <h3 className="font-orbitron section-sub"><Activity size={18} color="var(--primary)" /> COMBAT TELEMETRY</h3>
            <div className="stat-grid">
              <div className="stat-cell">
                <Crosshair className="stat-icon" size={24}/>
                <div className="stat-data">
                  <span className="stat-value font-orbitron">{profile?.stats?.totalMatches || 0}</span>
                  <span className="stat-label font-montserrat">DROPS</span>
                </div>
              </div>
              <div className="stat-cell">
                <TargetIcon className="stat-icon" />
                <div className="stat-data">
                  <span className="stat-value font-orbitron text-primary">{profile?.stats?.winRate || '0%'}</span>
                  <span className="stat-label font-montserrat">WIN RATE</span>
                </div>
              </div>
              <div className="stat-cell">
                <Zap className="stat-icon" size={24}/>
                <div className="stat-data">
                  <span className="stat-value font-orbitron text-secondary">{profile?.stats?.aiDefeated || 0}</span>
                  <span className="stat-label font-montserrat">BOTS DESTROYED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION: Logs, Nodes, Leaderboard */}
        <aside className="system-panel">
          
          <div className="sys-widget premium-glass neo-border">
            <div className="widget-header">
              <Shield size={16} />
              <h3 className="font-orbitron">COMBAT LOG</h3>
            </div>
            <div className="log-list">
              {profile?.matches?.length > 0 ? (
                profile.matches.map((match, i) => (
                  <div key={i} className={`log-entry ${match.result.toLowerCase()}`}>
                    <div className="log-indicator"></div>
                    <div className="log-details">
                      <span className="log-result font-orbitron">{match.result}</span>
                      <span className="log-opponent">vs {match.opponent}</span>
                    </div>
                    <div className="log-reward font-orbitron">+{match.xpChange} XP</div>
                  </div>
                ))
              ) : (
                <div className="empty-state">No combat telemetry available.</div>
              )}
            </div>
          </div>

          <div className="sys-widget premium-glass neo-border">
            <div className="widget-header">
              <Trophy size={16} color="#ffb800" />
              <h3 className="font-orbitron">GLOBAL LEADERBOARD</h3>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((player, idx) => (
                <div key={idx} className={`rank-entry ${idx === 0 ? 'rank-1' : ''}`}>
                  <div className="rank-num font-orbitron">{idx + 1}</div>
                  <div className="rank-player">
                    <span className="rank-name font-montserrat">{player.username.toUpperCase()}</span>
                    <span className="rank-lvl font-orbitron">LVL {player.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sys-widget premium-glass neo-border nodes-widget">
            <div className="widget-header">
              <Activity size={16} color="#00ffff" />
              <h3 className="font-orbitron">NETWORK STATUS</h3>
            </div>
            <div className="nodes-list">
              {nodes.map((node, i) => (
                <div key={i} className="node-entry">
                  <div className="node-info">
                    <span className="node-dot" style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}` }}></span>
                    <span className="node-name font-orbitron">{node.name}</span>
                  </div>
                  <div className="node-stats">
                     <span className="node-ping" style={{ color: node.color }}>{node.ping}</span>
                     <span className="node-status font-montserrat">{node.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
};

// Component helper for an icon
const TargetIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

export default Lobby;

