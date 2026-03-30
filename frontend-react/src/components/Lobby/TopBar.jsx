import React, { useState } from 'react';
import { Bell, Settings as SettingsIcon, LogOut, Hexagon, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TopBar = ({ playHover, playClick, soundOn, toggleSound, theme, toggleTheme }) => {
  const { logout } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const notifications = [
    { id: 1, text: "Your daily rewards are ready!", time: "2m ago", unread: true },
    { id: 2, text: "You ranked up to GOLD tier.", time: "1h ago", unread: false },
    { id: 3, text: "Friend request from CyberNinja.", time: "2h ago", unread: false }
  ];

  return (
    <header className="lobby-topbar premium-glass neo-border">
      <div className="brand-logo font-orbitron">
        <Hexagon className="logo-icon" size={28} />
        <span>BRAWL<span>.AI</span></span>
      </div>

      <div className="topbar-actions">
        {/* Notifications */}
        <div className="action-wrapper">
          <button 
            className="icon-btn" 
            onMouseEnter={playHover}
            onClick={() => { playClick(); setShowNotifs(!showNotifs); setShowSettings(false); }}
          >
            <Bell size={20} />
            <span className="notif-badge">1</span>
          </button>
          
          {showNotifs && (
            <div className="dropdown-menu premium-glass neo-border">
              <div className="dropdown-header font-orbitron">NOTIFICATIONS</div>
              <div className="dropdown-list">
                {notifications.map(n => (
                  <div key={n.id} className={`dropdown-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notif-dot" />
                    <div className="notif-content">
                      <p>{n.text}</p>
                      <span>{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="action-wrapper">
          <button 
            className="icon-btn" 
            onMouseEnter={playHover}
            onClick={() => { playClick(); setShowSettings(!showSettings); setShowNotifs(false); }}
          >
            <SettingsIcon size={20} />
          </button>

          {showSettings && (
            <div className="dropdown-menu premium-glass neo-border">
              <div className="dropdown-header font-orbitron">SYSTEM PREFERENCES</div>
              <div className="dropdown-list">
                <div className="settings-item">
                  <span>AUDIO FEEDBACK</span>
                  <button className="toggle-btn" onClick={() => { playClick(); toggleSound(); }}>
                    {soundOn ? <Volume2 size={16} className="text-primary"/> : <VolumeX size={16} color="#aaa"/>}
                  </button>
                </div>
                <div className="settings-item">
                  <span>THEME MODE</span>
                  <button className="toggle-btn" onClick={() => { playClick(); toggleTheme(); }}>
                    {theme === 'neon' ? <Moon size={16} className="text-secondary"/> : <Sun size={16} color="#aaa"/>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          className="icon-btn logout-btn" 
          onMouseEnter={playHover}
          onClick={() => { playClick(); logout(); }}
          title="Disconnect"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
